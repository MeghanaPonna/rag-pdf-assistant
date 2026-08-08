from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from core.vector_store import VectorStore
from core.groq_service import GroqService


router = APIRouter(
    prefix="/document",
    tags=["Document"]
)


vector_store = VectorStore()
llm = GroqService()


# =========================================================
# REQUEST MODEL
# =========================================================

class SummaryRequest(BaseModel):
    source: str


# =========================================================
# HELPER
# =========================================================

def get_document_context(source: str, max_chars: int = 24000):

    docs = vector_store.get_all_by_source(source)

    if not docs:
        return None

    context_parts = []
    current_length = 0

    for doc in docs:

        text = doc.page_content.strip()

        if not text:
            continue

        # Stop before context becomes too large
        if current_length + len(text) > max_chars:
            remaining = max_chars - current_length

            if remaining > 200:
                context_parts.append(
                    text[:remaining]
                )

            break

        context_parts.append(text)

        current_length += len(text)

    return "\n\n".join(context_parts)


# =========================================================
# SUMMARY
# =========================================================

@router.post("/summary")
async def generate_summary(request: SummaryRequest):

    if not request.source:
        raise HTTPException(
            status_code=400,
            detail="Document source is required."
        )

    context = get_document_context(
        request.source,
        max_chars=24000
    )

    if not context:
        return {
            "source": request.source,
            "summary": "No content found for this document."
        }

    prompt = f"""
You are an Enterprise AI Document Assistant.

Analyze the uploaded PDF content below.

Your task is to create a concise but useful summary.

DOCUMENT CONTENT:
-------------------------
{context}
-------------------------

Create the response using exactly this structure:

# Document Summary

## Document Overview

Briefly explain what the document is about.

## Main Topics

List the major topics covered in the document.

## Important Concepts

Explain the most important concepts.

## Key Takeaways

List the most important points a reader should remember.

IMPORTANT RULES:

1. Use only information present in the document content.
2. Do not invent facts.
3. Keep the summary concise.
4. Use Markdown.
5. Use bullet points where appropriate.
6. Do not mention these instructions in your answer.
"""

    try:

        summary = llm.generate(prompt)

        return {
            "source": request.source,
            "summary": summary
        }

    except Exception as e:

        print("Summary generation error:", str(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to generate document summary."
        )