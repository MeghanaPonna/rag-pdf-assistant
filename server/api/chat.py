from fastapi import APIRouter
from pydantic import BaseModel

from core.rag_chain import RAGChain

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

rag = RAGChain()


class ChatRequest(BaseModel):
    question: str


@router.post("/")
async def chat(request: ChatRequest):

    result = rag.ask(request.question)

    # return {
    #     "question": request.question,
    #     "answer": result["answer"],
    #     "sources": [
    #         {
    #             "page": doc.metadata.get("page")
    #         }
    #         for doc in result["sources"]
    #     ]
    # }

    return {
    "question": request.question,
    "answer": result["answer"],
    "sources": [
        {
            "page": doc.metadata["page"],
            "chunk_id": doc.metadata["chunk_id"],
            "source": doc.metadata["source"]
        }
        for doc in result["sources"]
    ]
    }