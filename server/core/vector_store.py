# # # from langchain_chroma import Chroma
# # # from langchain_core.documents import Document
# # # from core.embeddings import EmbeddingModel


# # # class VectorStore:

# # #     def __init__(self):
# # #         self.embedding_model = EmbeddingModel()

# # #         self.db = Chroma(
# # #             collection_name="pdf_documents",
# # #             embedding_function=self.embedding_model.embedding,
# # #             persist_directory="chroma_db"
# # #         )

# # #     def add_chunks(self, chunks):
# # #         documents = []

# # #         for chunk in chunks:
# # #             documents.append(
# # #                 Document(
# # #                     page_content=chunk["text"],
# # #                     metadata={
# # #                         "page": chunk["page"]
# # #                     }
# # #                 )
# # #             )

# # #         self.db.add_documents(documents)

# # #     def similarity_search(self, query: str, k: int = 3):
# # #         return self.db.similarity_search(query, k=k)

# # #     # Optional alias
# # #     def search(self, query: str, k: int = 3):
# # #         return self.similarity_search(query, k)


# # from langchain_chroma import Chroma
# # from langchain_core.documents import Document

# # from core.embeddings import EmbeddingModel


# # class VectorStore:

# #     def __init__(self):
# #         self.embedding_model = EmbeddingModel()

# #         self.db = Chroma(
# #             collection_name="pdf_documents",
# #             embedding_function=self.embedding_model.embedding,
# #             persist_directory="chroma_db"
# #         )

# #     def add_chunks(self, chunks):

# #         documents = []

# #         for i, chunk in enumerate(chunks):
# #             documents.append(
# #                 Document(
# #                     page_content=chunk["text"],
# #                     metadata={
# #                         "page": chunk["page"],
# #                         "chunk_id": i,
# #                         "source": chunk["source"]
# #                     }
# #                 )
# #             )

# #         self.db.add_documents(documents)

# #     def similarity_search(self, query: str, k: int = 8):
# #         return self.db.similarity_search(query, k=k)

# #     def search(self, query: str, k: int = 8):
# #         return self.similarity_search(query, k)




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

#     def add_chunks(self, chunks, source):

#         documents = []

#         for index, chunk in enumerate(chunks):

#             documents.append(
#                 Document(
#                     page_content=chunk["text"],
#                     metadata={
#                         "page": chunk["page"],
#                         "chunk_id": index,
#                         "source": source
#                     }
#                 )
#             )

#         self.db.add_documents(documents)

#     def similarity_search(
#         self,
#         query: str,
#         k: int = 5,
#         source: str = None
#     ):

#         if source:

#             return self.db.similarity_search(
#                 query,
#                 k=k,
#                 filter={
#                     "source": source
#                 }
#             )

#         return self.db.similarity_search(
#             query,
#             k=k
#         )

#     def search(
#         self,
#         query: str,
#         k: int = 5,
#         source: str = None
#     ):

#         return self.similarity_search(
#             query,
#             k=k,
#             source=source
#         )


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

    # ==========================================
    # ADD PDF CHUNKS
    # ==========================================

    def add_chunks(self, chunks, source):

        documents = []

        for index, chunk in enumerate(chunks):

            documents.append(
                Document(
                    page_content=chunk["text"],
                    metadata={
                        "page": chunk["page"],
                        "chunk_id": index,
                        "source": source
                    }
                )
            )

        if documents:
            self.db.add_documents(documents)

    # ==========================================
    # SIMILARITY SEARCH
    # ==========================================

    def similarity_search(
        self,
        query: str,
        k: int = 5,
        source: str = None
    ):

        # Search only inside selected PDF
        if source:

            return self.db.similarity_search(
                query,
                k=k,
                filter={
                    "source": source
                }
            )

        # Search across all PDFs
        return self.db.similarity_search(
            query,
            k=k
        )

    # ==========================================
    # SEARCH
    # ==========================================

    def search(
        self,
        query: str,
        k: int = 5,
        source: str = None
    ):

        return self.similarity_search(
            query=query,
            k=k,
            source=source
        )

    # ==========================================
    # GET ALL CHUNKS FROM ONE PDF
    # ==========================================

    def get_all_by_source(self, source: str):

        if not source:
            return []

        results = self.db.get(
            where={
                "source": source
            }
        )

        documents = []

        documents_data = results.get(
            "documents",
            []
        )

        metadatas = results.get(
            "metadatas",
            []
        )

        for index, content in enumerate(
            documents_data
        ):

            metadata = (
                metadatas[index]
                if index < len(metadatas)
                else {}
            )

            documents.append(
                Document(
                    page_content=content,
                    metadata=metadata
                )
            )

        # Sort chunks by page and chunk ID
        documents.sort(
            key=lambda doc: (
                doc.metadata.get("page", 0),
                doc.metadata.get("chunk_id", 0)
            )
        )

        return documents