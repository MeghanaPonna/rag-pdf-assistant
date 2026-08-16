from __future__ import annotations

from core.groq_service import GroqService
from core.prompt_builder import PromptBuilder
from core.vector_store import VectorStore


class RAGChain:
    def __init__(self):
        self.vector_store = VectorStore()
        self.llm = GroqService()

    def ask(self, question: str, source: str, history: list[dict] | None = None) -> dict:
        question, source = question.strip(), source.strip()
        history_text = "\n".join(f"{item.get('role', 'user').title()}: {str(item.get('content', ''))[:700]}" for item in (history or [])[-8:] if item.get("content"))
        retrieval_query = f"{history_text}\nCurrent question: {question}" if history_text else question
        docs = self.vector_store.search(query=retrieval_query, k=5, source=source)
        if not docs:
            return {"answer": "I couldn't find information related to this question in the uploaded PDF.", "sources": []}
        context_parts, context_size = [], 0
        for doc in docs:
            text = doc.page_content.strip()
            if context_size + len(text) > 14000:
                break
            context_parts.append(f"Source: {doc.metadata.get('source', source)}\nPage: {doc.metadata.get('page', 'Unknown')}\n\n{text}")
            context_size += len(text)
        prompt = PromptBuilder.build(context="\n\n---\n\n".join(context_parts), question=question, history=history_text)
        return {"answer": self.llm.generate(prompt), "sources": docs}
