import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from core.document_intelligence import DocumentIntelligence
from core.vector_store import VectorStore

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/document", tags=["Document"])


class SourceRequest(BaseModel):
    source: str = Field(min_length=1, max_length=255)


def intelligence() -> DocumentIntelligence:
    return DocumentIntelligence()


@router.get("/list")
async def list_documents():
    """Returns all indexed sources so a browser refresh does not lose document selection."""
    try:
        return {"success": True, "documents": VectorStore().list_documents()}
    except Exception as error:
        logger.exception("Document list failed: %s", error)
        raise HTTPException(status_code=503, detail="Unable to load indexed documents.")


def analysis_error(error: Exception) -> HTTPException:
    logger.exception("Document intelligence failed: %s", error)
    if isinstance(error, ValueError):
        return HTTPException(status_code=404, detail=str(error))
    return HTTPException(status_code=502, detail="Document analysis is temporarily unavailable. Please try again.")


@router.post("/summary")
async def generate_summary(request: SourceRequest):
    try:
        return {"success": True, "source": request.source, "summary": intelligence().summary(request.source)}
    except Exception as error:
        raise analysis_error(error)


@router.post("/topics")
async def get_topics(request: SourceRequest):
    try:
        return {"success": True, "source": request.source, "topics": intelligence().structured(request.source, "topics")}
    except Exception as error:
        raise analysis_error(error)


@router.post("/sections")
async def get_sections(request: SourceRequest):
    try:
        return {"success": True, "source": request.source, "sections": intelligence().structured(request.source, "sections")}
    except Exception as error:
        raise analysis_error(error)


@router.post("/interview-questions")
async def interview_questions(request: SourceRequest):
    try:
        return {"success": True, "source": request.source, "questions": intelligence().structured(request.source, "questions")}
    except Exception as error:
        raise analysis_error(error)
