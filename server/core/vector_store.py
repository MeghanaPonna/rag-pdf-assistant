# from langchain_chroma import Chroma
# from langchain_core.documents import Document
# from core.embeddings import EmbeddingModel


# class VectorStore:

#     def __init__(self):
#         self.embedding_model = EmbeddingModel()

#         self.db = Chroma(
#             collection_name="pdf_documents",
#             embedding_function=self.embedding_model.embedding,
#             persist_directory="chroma_db"
#         )

#     def add_chunks(self, chunks):
#         documents = []

#         for chunk in chunks:
#             documents.append(
#                 Document(
#                     page_content=chunk["text"],
#                     metadata={
#                         "page": chunk["page"]
#                     }
#                 )
#             )

#         self.db.add_documents(documents)

#     def similarity_search(self, query: str, k: int = 3):
#         return self.db.similarity_search(query, k=k)

#     # Optional alias
#     def search(self, query: str, k: int = 3):
#         return self.similarity_search(query, k)


from langchain_chroma import Chroma
from langchain_core.documents import Document

from core.embeddings import EmbeddingModel


class VectorStore:

    def __init__(self):
        self.embedding_model = EmbeddingModel()

        self.db = Chroma(
            collection_name="pdf_documents",
            embedding_function=self.embedding_model.embedding,
            persist_directory="chroma_db"
        )

    def add_chunks(self, chunks):

        documents = []

        for i, chunk in enumerate(chunks):
            documents.append(
                Document(
                    page_content=chunk["text"],
                    metadata={
                        "page": chunk["page"],
                        "chunk_id": i,
                        "source": chunk["source"]
                    }
                )
            )

        self.db.add_documents(documents)

    def similarity_search(self, query: str, k: int = 8):
        return self.db.similarity_search(query, k=k)

    def search(self, query: str, k: int = 8):
        return self.similarity_search(query, k)