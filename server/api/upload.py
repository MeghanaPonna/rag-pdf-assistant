import logging
import re
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from config.settings import settings
from core.document_processor import DocumentProcessor
from core.vector_store import VectorStore
from core.mongo_store import MongoStore

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/upload", tags=["Upload"])
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
processor, vector_store = DocumentProcessor(), VectorStore()


def safe_filename(filename: str | None) -> str:
    name = Path(filename or "").name
    name = re.sub(r"[^A-Za-z0-9._ -]", "_", name)
    if not name.lower().endswith(".pdf") or name in {".pdf", ""}:
        raise HTTPException(status_code=400, detail="Only valid PDF files are allowed.")
    return name


@router.post("/")
async def upload_pdf(file: UploadFile = File(...), client_id: str = Form(default="anonymous", max_length=100)):
    filename = safe_filename(file.filename)
    if file.content_type not in {"application/pdf", "application/x-pdf", None}:
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    content = await file.read(settings.MAX_UPLOAD_BYTES + 1)
    if len(content) > settings.MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="PDF is larger than the allowed upload size.")
    if not content.startswith(b"%PDF"):
        raise HTTPException(status_code=400, detail="The uploaded file is not a valid PDF.")
    path = UPLOAD_DIR / filename
    try:
        path.write_bytes(content)
        result = processor.process(str(path))
        if not result["chunks"]:
            raise HTTPException(status_code=422, detail="No readable text was found in this PDF.")
        try:
            vector_store.delete_by_source(filename)
        except Exception as delete_error:
            # Older Chroma installs may not support metadata deletion; indexing must still work.
            logger.warning("Could not remove existing vectors for %s: %s", filename, delete_error)
        vector_store.add_chunks(result["chunks"], source=filename)
        document = {"filename": filename, "total_pages": len(result["pages"]), "total_chunks": len(result["chunks"])}
        MongoStore().save_document(client_id, document)
        return {"message": "Document indexed successfully", **document, "vectors_created": len(result["chunks"])}
    except HTTPException:
        raise
    except Exception as error:
        logger.exception("PDF upload failed: %s", error)
        raise HTTPException(status_code=422, detail="The PDF could not be processed.")
    finally:
        await file.close()
