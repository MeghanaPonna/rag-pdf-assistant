import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from config.settings import settings
from core.rag_chain import RAGChain

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["Chat"])
rag = RAGChain()


class HistoryMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=4000)
    source: str = Field(min_length=1, max_length=255)
    history: list[HistoryMessage] = Field(default_factory=list, max_length=20)


@router.post("/")
async def chat(request: ChatRequest):
    try:
        result = rag.ask(request.question, request.source, [item.model_dump() for item in request.history[-settings.CHAT_HISTORY_MESSAGES:]])
        unique_sources = {}
        for doc in result.get("sources", []):
            metadata = doc.metadata
            item = {"page": metadata.get("page", "Unknown"), "chunk_id": metadata.get("chunk_id"), "source": metadata.get("source", request.source)}
            unique_sources.setdefault((item["source"], item["page"]), item)
        return {"question": request.question, "answer": str(result.get("answer") or "No answer was generated."), "sources": list(unique_sources.values())}
    except Exception as error:
        logger.exception("Chat request failed: %s", error)
        raise HTTPException(status_code=502, detail="Unable to answer the question right now. Please try again.")
