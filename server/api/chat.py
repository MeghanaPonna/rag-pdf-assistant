# # # # # from fastapi import APIRouter
# # # # # from pydantic import BaseModel

# # # # # from core.rag_chain import RAGChain

# # # # # router = APIRouter(
# # # # #     prefix="/chat",
# # # # #     tags=["Chat"]
# # # # # )

# # # # # rag = RAGChain()


# # # # # class ChatRequest(BaseModel):
# # # # #     question: str


# # # # # @router.post("/")
# # # # # async def chat(request: ChatRequest):

# # # # #     result = rag.ask(request.question)

# # # # #     # return {
# # # # #     #     "question": request.question,
# # # # #     #     "answer": result["answer"],
# # # # #     #     "sources": [
# # # # #     #         {
# # # # #     #             "page": doc.metadata.get("page")
# # # # #     #         }
# # # # #     #         for doc in result["sources"]
# # # # #     #     ]
# # # # #     # }

# # # # #     return {
# # # # #     "question": request.question,
# # # # #     "answer": result["answer"],
# # # # #     "sources": [
# # # # #         {
# # # # #             "page": doc.metadata["page"],
# # # # #             "chunk_id": doc.metadata["chunk_id"],
# # # # #             "source": doc.metadata["source"]
# # # # #         }
# # # # #         for doc in result["sources"]
# # # # #     ]
# # # # #     }



# # # # from fastapi import APIRouter
# # # # from pydantic import BaseModel

# # # # from core.rag_chain import RAGChain


# # # # router = APIRouter(
# # # #     prefix="/chat",
# # # #     tags=["Chat"]
# # # # )

# # # # rag = RAGChain()


# # # # class ChatRequest(BaseModel):

# # # #     question: str
# # # #     source: str


# # # # @router.post("/")
# # # # async def chat(
# # # #     request: ChatRequest
# # # # ):

# # # #     result = rag.ask(
# # # #         question=request.question,
# # # #         source=request.source
# # # #     )

# # # #     return {
# # # #         "question": request.question,

# # # #         "answer": result["answer"],

# # # #         "sources": [
# # # #             {
# # # #                 "page": doc.metadata.get("page"),
# # # #                 "chunk_id": doc.metadata.get("chunk_id"),
# # # #                 "source": doc.metadata.get("source")
# # # #             }

# # # #             for doc in result["sources"]
# # # #         ]
# # # #     }



# # # from fastapi import APIRouter
# # # from pydantic import BaseModel

# # # from core.rag_chain import RAGChain


# # # router = APIRouter(
# # #     prefix="/chat",
# # #     tags=["Chat"]
# # # )


# # # rag = RAGChain()


# # # class ChatRequest(BaseModel):
# # #     question: str


# # # @router.post("/")
# # # async def chat(request: ChatRequest):

# # #     result = rag.ask(request.question)

# # #     return {
# # #         "question": request.question,
# # #         "answer": result["answer"],
# # #         "sources": [
# # #             {
# # #                 "page": doc.metadata.get("page"),
# # #                 "chunk_id": doc.metadata.get("chunk_id"),
# # #                 "source": doc.metadata.get("source")
# # #             }
# # #             for doc in result["sources"]
# # #         ]
# # #     }


# # from fastapi import APIRouter
# # from pydantic import BaseModel

# # from core.rag_chain import RAGChain


# # router = APIRouter(
# #     prefix="/chat",
# #     tags=["Chat"]
# # )


# # rag = RAGChain()


# # class ChatRequest(BaseModel):
# #     question: str


# # @router.post("/")
# # async def chat(request: ChatRequest):

# #     result = rag.ask(request.question)

# #     return {
# #         "question": request.question,
# #         "answer": result["answer"],
# #         "sources": [
# #             {
# #                 "page": doc.metadata.get("page"),
# #                 "chunk_id": doc.metadata.get("chunk_id"),
# #                 "source": doc.metadata.get("source")
# #             }
# #             for doc in result["sources"]
# #         ]
# #     }




# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel

# from core.rag_chain import RAGChain


# # ==========================================
# # ROUTER
# # ==========================================

# router = APIRouter(
#     prefix="/chat",
#     tags=["Chat"]
# )


# # ==========================================
# # RAG INSTANCE
# # ==========================================

# rag = RAGChain()


# # ==========================================
# # REQUEST MODEL
# # ==========================================

# class ChatRequest(BaseModel):
#     question: str
#     source: str


# # ==========================================
# # CHAT ENDPOINT
# # ==========================================

# @router.post("/")
# async def chat(request: ChatRequest):

#     # ==========================================
#     # VALIDATE QUESTION
#     # ==========================================

#     question = request.question.strip()

#     if not question:
#         raise HTTPException(
#             status_code=400,
#             detail="Question cannot be empty."
#         )

#     try:

#         # ==========================================
#         # ASK RAG SYSTEM
#         # ==========================================

#         # result = rag.ask(question)
#         result = rag.ask(
#             request.question,
#             request.source
#         )

#         # ==========================================
#         # GET SOURCES
#         # ==========================================

#         sources = []

#         for doc in result.get("sources", []):

#             metadata = getattr(
#                 doc,
#                 "metadata",
#                 {}
#             )

#             sources.append({
#                 "page": metadata.get(
#                     "page",
#                     "Unknown"
#                 ),

#                 "chunk_id": metadata.get(
#                     "chunk_id",
#                     None
#                 ),

#                 "source": metadata.get(
#                     "source",
#                     "Uploaded PDF"
#                 )
#             })

#         # ==========================================
#         # RETURN RESPONSE
#         # ==========================================

#         return {
#             "question": question,

#             "answer": result.get(
#                 "answer",
#                 "No answer was generated."
#             ),

#             "sources": sources
#         }

#     except Exception as error:

#         print(
#             f"Chat error: {error}"
#         )

#         raise HTTPException(
#             status_code=500,
#             detail="Failed to process the question."
#         )





from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from core.rag_chain import RAGChain


# ==========================================
# ROUTER
# ==========================================

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


# ==========================================
# RAG INSTANCE
# ==========================================

rag = RAGChain()


# ==========================================
# REQUEST MODEL
# ==========================================

class ChatRequest(BaseModel):
    question: str
    source: str


# ==========================================
# CHAT ENDPOINT
# ==========================================

@router.post("/")
async def chat(request: ChatRequest):

    # ==========================================
    # CLEAN INPUT
    # ==========================================

    question = request.question.strip()
    source = request.source.strip()

    # ==========================================
    # VALIDATE QUESTION
    # ==========================================

    if not question:

        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty."
        )

    # ==========================================
    # VALIDATE SOURCE
    # ==========================================

    if not source:

        raise HTTPException(
            status_code=400,
            detail="Document source is required."
        )

    try:

        print("\n" + "=" * 50)
        print("CHAT REQUEST")
        print("=" * 50)

        print("Question:", question)
        print("Source:", source)

        # ==========================================
        # ASK RAG SYSTEM
        # ==========================================

        result = rag.ask(
            question=question,
            source=source
        )

        # ==========================================
        # GET ANSWER
        # ==========================================

        answer = result.get(
            "answer",
            "No answer was generated."
        )

        # Make sure answer is a string
        if answer is None:
            answer = "No answer was generated."

        if not isinstance(answer, str):
            answer = str(answer)

        # ==========================================
        # GET SOURCES
        # ==========================================

        sources = []

        documents = result.get(
            "sources",
            []
        )

        for doc in documents:

            metadata = getattr(
                doc,
                "metadata",
                {}
            )

            sources.append({
                "page": metadata.get(
                    "page",
                    "Unknown"
                ),

                "chunk_id": metadata.get(
                    "chunk_id",
                    None
                ),

                "source": metadata.get(
                    "source",
                    source
                )
            })

        # ==========================================
        # REMOVE DUPLICATE PAGES
        # ==========================================

        unique_sources = {}

        for source_item in sources:

            page = source_item.get("page")

            if page not in unique_sources:

                unique_sources[page] = source_item

        sources = list(
            unique_sources.values()
        )

        # ==========================================
        # FINAL RESPONSE
        # ==========================================

        response = {
            "question": question,

            "answer": answer,

            "sources": sources
        }

        print("\nAnswer generated successfully.")
        print("Sources:", sources)
        print("=" * 50 + "\n")

        return response

    # ==========================================
    # HTTP EXCEPTION
    # ==========================================

    except HTTPException:

        raise

    # ==========================================
    # OTHER ERRORS
    # ==========================================

    except Exception as error:

        print("\n" + "=" * 50)
        print("CHAT ERROR")
        print("=" * 50)

        print("Error type:", type(error).__name__)
        print("Error:", repr(error))

        print("=" * 50 + "\n")

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )