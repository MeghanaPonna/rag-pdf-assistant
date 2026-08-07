from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
from pathlib import Path

from core.document_processor import DocumentProcessor
from core.vector_store import VectorStore

# Initialize services
processor = DocumentProcessor()
vector_store = VectorStore()

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):
    # Validate file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    # Save uploaded file
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Process document (Load PDF + Split into chunks)
    result = processor.process(str(file_path))

    # Store chunks in ChromaDB
    vector_store.add_chunks(result["chunks"])

    return {
        "message": "Document indexed successfully",
        "filename": file.filename,
        "total_pages": len(result["pages"]),
        "total_chunks": len(result["chunks"]),
        "vectors_created": len(result["chunks"])
    }