import logging

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from config.settings import settings
from core.rag_chain import RAGChain
from core.mongo_store import MongoStore

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["Chat"])
rag = RAGChain()
store = MongoStore()


class HistoryMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=4000)
    source: str = Field(min_length=1, max_length=255)
    history: list[HistoryMessage] = Field(default_factory=list, max_length=20)
    client_id: str = Field(default="anonymous", min_length=1, max_length=100)


@router.get("/history")
async def chat_history(source: str = Query(min_length=1, max_length=255), client_id: str = Query(default="anonymous", min_length=1, max_length=100)):
    return {"source": source, "messages": store.history(client_id, source), "persistent": store.enabled}


@router.post("/")
async def chat(request: ChatRequest):
    try:
        result = rag.ask(request.question, request.source, [item.model_dump() for item in request.history[-settings.CHAT_HISTORY_MESSAGES:]])
        unique_sources = {}
        for doc in result.get("sources", []):
            metadata = doc.metadata
            item = {"page": metadata.get("page", "Unknown"), "chunk_id": metadata.get("chunk_id"), "source": metadata.get("source", request.source)}
            unique_sources.setdefault((item["source"], item["page"]), item)
        answer, sources = str(result.get("answer") or "No answer was generated."), list(unique_sources.values())
        try:
            store.append_exchange(request.client_id, request.source, request.question, answer, sources)
        except Exception as persistence_error:
            # A temporary database issue must never discard a valid RAG answer.
            logger.exception("Could not persist chat exchange: %s", persistence_error)
        return {"question": request.question, "answer": answer, "sources": sources, "persistent": store.enabled}
    except Exception as error:
        logger.exception("Chat request failed: %s", error)
        raise HTTPException(status_code=502, detail="Unable to answer the question right now. Please try again.")
