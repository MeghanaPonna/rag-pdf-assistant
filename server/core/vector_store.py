from __future__ import annotations

from langchain_chroma import Chroma
from langchain_core.documents import Document

from core.embeddings import EmbeddingModel


class VectorStore:
    """Chroma wrapper; source, page and chunk_id metadata remain stable."""

    def __init__(self):
        self.embedding_model = EmbeddingModel()
        self.db = Chroma(collection_name="pdf_documents", embedding_function=self.embedding_model.embedding, persist_directory="chroma_db")

    def add_chunks(self, chunks: list[dict], source: str) -> None:
        documents = [Document(page_content=chunk["text"], metadata={"page": chunk["page"], "chunk_id": index, "source": source}) for index, chunk in enumerate(chunks) if chunk.get("text", "").strip()]
        if documents:
            self.db.add_documents(documents)

    def delete_by_source(self, source: str) -> None:
        """Replace an existing upload with the same filename instead of duplicating vectors."""
        self.db.delete(where={"source": source})

    def similarity_search(self, query: str, k: int = 5, source: str | None = None) -> list[Document]:
        # Keep the proven project search API and perform lightweight local reranking.
        # Some Chroma versions do not expose relevance-score search consistently.
        candidates = self.db.similarity_search(query, k=max(k * 3, k), filter={"source": source} if source else None)
        query_terms = {term.lower() for term in query.split() if len(term) > 2}
        ranked, seen = [], set()
        for position, doc in enumerate(candidates):
            content, fingerprint = doc.page_content.strip(), doc.page_content.strip()[:300].lower()
            if not content or fingerprint in seen:
                continue
            seen.add(fingerprint)
            overlap = len(query_terms.intersection(content.lower().split())) / max(len(query_terms), 1)
            ranked.append((1 - position / max(len(candidates), 1) + overlap * 0.12, doc))
        return [doc for _, doc in sorted(ranked, key=lambda item: item[0], reverse=True)[:k]]

    def search(self, query: str, k: int = 5, source: str | None = None) -> list[Document]:
        return self.similarity_search(query=query, k=k, source=source)

    def get_all_by_source(self, source: str) -> list[Document]:
        if not source:
            return []
        results = self.db.get(where={"source": source})
        documents = [Document(page_content=content, metadata=results.get("metadatas", [])[index] or {}) for index, content in enumerate(results.get("documents", []))]
        return sorted(documents, key=lambda doc: (doc.metadata.get("page", 0), doc.metadata.get("chunk_id", 0)))

    def list_documents(self) -> list[dict]:
        results = self.db.get()
        grouped: dict[str, dict] = {}
        for metadata in results.get("metadatas", []):
            if not metadata or not metadata.get("source"):
                continue
            source = metadata["source"]
            entry = grouped.setdefault(source, {"filename": source, "total_pages": 0, "total_chunks": 0})
            entry["total_chunks"] += 1
            entry["total_pages"] = max(entry["total_pages"], int(metadata.get("page", 0) or 0))
        return sorted(grouped.values(), key=lambda item: item["filename"].lower())
