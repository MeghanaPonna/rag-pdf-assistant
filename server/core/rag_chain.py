# # # # # from core.vector_store import VectorStore
# # # # # from core.prompt_builder import PromptBuilder
# # # # # from core.groq_service import GroqService


# # # # # class RAGChain:

# # # # #     def __init__(self):
# # # # #         self.vector_store = VectorStore()
# # # # #         self.llm = GroqService()

# # # # #     def ask(self, question: str):

# # # # #         docs = self.vector_store.search(question, k=4)

# # # # #         context = "\n\n".join(
# # # # #             doc.page_content for doc in docs
# # # # #         )

# # # # #         prompt = PromptBuilder.build(
# # # # #             context=context,
# # # # #             question=question
# # # # #         )

# # # # #         answer = self.llm.generate(prompt)

# # # # #         return {
# # # # #             "answer": answer,
# # # # #             "sources": docs
# # # # #         }


# # # # from core.vector_store import VectorStore
# # # # from core.prompt_builder import PromptBuilder
# # # # from core.groq_service import GroqService


# # # # class RAGChain:

# # # #     def __init__(self):

# # # #         self.vector_store = VectorStore()
# # # #         self.llm = GroqService()

# # # #     def ask(
# # # #         self,
# # # #         question: str,
# # # #         source: str
# # # #     ):

# # # #         # Retrieve only from selected PDF
# # # #         docs = self.vector_store.search(
# # # #             question,
# # # #             k=5,
# # # #             source=source
# # # #         )

# # # #         # Build context
# # # #         context = "\n\n".join(
# # # #             doc.page_content
# # # #             for doc in docs
# # # #         )

# # # #         # Build prompt
# # # #         prompt = PromptBuilder.build(
# # # #             context=context,
# # # #             question=question
# # # #         )

# # # #         # Generate answer
# # # #         answer = self.llm.generate(prompt)

# # # #         return {
# # # #             "answer": answer,
# # # #             "sources": docs
# # # #         }


# # # from core.vector_store import VectorStore
# # # from core.prompt_builder import PromptBuilder
# # # from core.groq_service import GroqService


# # # class RAGChain:

# # #     def __init__(self):
# # #         self.vector_store = VectorStore()
# # #         self.llm = GroqService()

# # #     def ask(self, question: str):

# # #         # ==========================================
# # #         # 1. RETRIEVE RELEVANT DOCUMENT CHUNKS
# # #         # ==========================================

# # #         docs = self.vector_store.search(
# # #             question,
# # #             k=5
# # #         )

# # #         # ==========================================
# # #         # 2. BUILD CONTEXT
# # #         # ==========================================

# # #         context = "\n\n".join(
# # #             doc.page_content
# # #             for doc in docs
# # #         )

# # #         # ==========================================
# # #         # 3. BUILD PROMPT
# # #         # ==========================================

# # #         prompt = PromptBuilder.build(
# # #             context=context,
# # #             question=question
# # #         )

# # #         # ==========================================
# # #         # 4. GENERATE ANSWER
# # #         # ==========================================

# # #         answer = self.llm.generate(prompt)

# # #         # ==========================================
# # #         # 5. RETURN ANSWER + SOURCES
# # #         # ==========================================

# # #         return {
# # #             "answer": answer,
# # #             "sources": docs
# # #         }


# # from core.vector_store import VectorStore
# # from core.prompt_builder import PromptBuilder
# # from core.groq_service import GroqService


# # class RAGChain:

# #     def __init__(self):
# #         self.vector_store = VectorStore()
# #         self.llm = GroqService()

# #     def ask(self, question: str, source: str = None):

# #         # ==========================================
# #         # 1. VALIDATE QUESTION
# #         # ==========================================

# #         if not question or not question.strip():
# #             return {
# #                 "answer": "Please enter a question.",
# #                 "sources": []
# #             }

# #         question = question.strip()

# #         print("\n======================================")
# #         print("RAG QUESTION:")
# #         print(question)
# #         print("======================================")

# #         # ==========================================
# #         # 2. RETRIEVE RELEVANT CHUNKS
# #         # ==========================================

# #         try:

# #             # If a source is provided, search only
# #             # inside that PDF.
# #             if source:
# #                 docs = self.vector_store.search(
# #                     question,
# #                     k=8,
# #                     source=source
# #                 )

# #             # Otherwise search the vector database
# #             # normally.
# #             else:
# #                 docs = self.vector_store.search(
# #                     question,
# #                     k=8
# #                 )

# #         except Exception as error:

# #             print("Vector search error:", error)

# #             return {
# #                 "answer": "I couldn't search the uploaded PDF.",
# #                 "sources": []
# #             }

# #         # ==========================================
# #         # 3. CHECK RETRIEVED DOCUMENTS
# #         # ==========================================

# #         if not docs:

# #             return {
# #                 "answer": (
# #                     "I couldn't find relevant information "
# #                     "in the uploaded PDF."
# #                 ),
# #                 "sources": []
# #             }

# #         print("\nRetrieved documents:")

# #         for index, doc in enumerate(docs):

# #             print(
# #                 f"\n--- Chunk {index + 1} ---"
# #             )

# #             print(
# #                 "Page:",
# #                 getattr(doc, "metadata", {}).get("page")
# #             )

# #             print(
# #                 "Source:",
# #                 getattr(doc, "metadata", {}).get("source")
# #             )

# #             print(
# #                 "Content:",
# #                 doc.page_content[:500]
# #             )

# #         # ==========================================
# #         # 4. REMOVE DUPLICATE CHUNKS
# #         # ==========================================

# #         unique_docs = []

# #         seen = set()

# #         for doc in docs:

# #             content = doc.page_content.strip()

# #             if not content:
# #                 continue

# #             # Use first part of content as duplicate key
# #             key = content[:300]

# #             if key not in seen:

# #                 seen.add(key)

# #                 unique_docs.append(doc)

# #         docs = unique_docs

# #         # ==========================================
# #         # 5. BUILD CONTEXT
# #         # ==========================================

# #         context_parts = []

# #         for doc in docs:

# #             metadata = getattr(
# #                 doc,
# #                 "metadata",
# #                 {}
# #             )

# #             page = metadata.get(
# #                 "page",
# #                 "Unknown"
# #             )

# #             source_name = metadata.get(
# #                 "source",
# #                 "Uploaded PDF"
# #             )

# #             content = doc.page_content.strip()

# #             context_parts.append(
# #                 f"""
# # SOURCE: {source_name}
# # PAGE: {page}

# # CONTENT:
# # {content}
# # """
# #             )

# #         context = "\n\n".join(
# #             context_parts
# #         )

# #         # ==========================================
# #         # 6. DEBUG CONTEXT
# #         # ==========================================

# #         print("\n======================================")
# #         print("CONTEXT SENT TO LLM")
# #         print("======================================")

# #         print(
# #             context[:5000]
# #         )

# #         # ==========================================
# #         # 7. BUILD PROMPT
# #         # ==========================================

# #         prompt = PromptBuilder.build(
# #             context=context,
# #             question=question
# #         )

# #         # ==========================================
# #         # 8. GENERATE ANSWER
# #         # ==========================================

# #         try:

# #             answer = self.llm.generate(
# #                 prompt
# #             )

# #         except Exception as error:

# #             print(
# #                 "LLM generation error:",
# #                 error
# #             )

# #             return {
# #                 "answer": (
# #                     "An error occurred while "
# #                     "generating the answer."
# #                 ),
# #                 "sources": []
# #             }

# #         # ==========================================
# #         # 9. ENSURE ANSWER IS STRING
# #         # ==========================================

# #         if answer is None:

# #             answer = (
# #                 "I couldn't generate an answer "
# #                 "from the uploaded PDF."
# #             )

# #         elif not isinstance(answer, str):

# #             answer = str(answer)

# #         # ==========================================
# #         # 10. RETURN ANSWER + SOURCES
# #         # ==========================================

# #         return {
# #             "answer": answer,
# #             "sources": docs
# #         }






# from core.vector_store import VectorStore
# from core.prompt_builder import PromptBuilder
# from core.groq_service import GroqService


# class RAGChain:

#     def __init__(self):
#         self.vector_store = VectorStore()
#         self.llm = GroqService()

#     def ask(self, question: str):

#         # ==========================================
#         # 1. SEARCH PDF
#         # ==========================================

#         docs = self.vector_store.search(
#             question,
#             k=5,
#                 source=source

#         )

#         # ==========================================
#         # 2. CHECK IF DOCUMENTS WERE FOUND
#         # ==========================================

#         if not docs:
#             return {
#                 "answer": (
#                     "I couldn't find information related to "
#                     "this question in the uploaded PDF."
#                 ),
#                 "sources": []
#             }

#         # ==========================================
#         # 3. BUILD CONTEXT
#         # ==========================================

#         context_parts = []

#         for doc in docs:

#             page = doc.metadata.get("page", "Unknown")

#             source = doc.metadata.get(
#                 "source",
#                 "Unknown"
#             )

#             context_parts.append(
#                 f"""
# Source: {source}
# Page: {page}

# {doc.page_content}
# """
#             )

#         context = "\n\n".join(context_parts)

#         # ==========================================
#         # 4. BUILD PROMPT
#         # ==========================================

#         prompt = PromptBuilder.build(
#             context=context,
#             question=question
#         )

#         # ==========================================
#         # 5. GENERATE ANSWER
#         # ==========================================

#         answer = self.llm.generate(prompt)

#         # ==========================================
#         # 6. RETURN RESULT
#         # ==========================================

#         return {
#             "answer": answer,
#             "sources": docs
#         }



from core.vector_store import VectorStore
from core.prompt_builder import PromptBuilder
from core.groq_service import GroqService


class RAGChain:

    # ==========================================
    # INITIALIZE
    # ==========================================

    def __init__(self):

        self.vector_store = VectorStore()
        self.llm = GroqService()

    # ==========================================
    # ASK QUESTION
    # ==========================================

    def ask(
        self,
        question: str,
        source: str
    ):

        # ==========================================
        # CLEAN INPUT
        # ==========================================

        question = question.strip()
        source = source.strip()

        print("\n" + "=" * 50)
        print("RAG CHAIN")
        print("=" * 50)

        print("Question:", question)
        print("Source:", source)

        # ==========================================
        # 1. SEARCH ONLY SELECTED PDF
        # ==========================================

        docs = self.vector_store.search(
            query=question,
            k=5,
            source=source
        )

        print(
            "Retrieved chunks:",
            len(docs)
        )

        # ==========================================
        # 2. CHECK IF DOCUMENTS WERE FOUND
        # ==========================================

        if not docs:

            return {
                "answer": (
                    "I couldn't find information related "
                    "to this question in the uploaded PDF."
                ),
                "sources": []
            }

        # ==========================================
        # 3. BUILD CONTEXT
        # ==========================================

        context_parts = []

        for doc in docs:

            page = doc.metadata.get(
                "page",
                "Unknown"
            )

            document_source = doc.metadata.get(
                "source",
                source
            )

            content = doc.page_content.strip()

            context_parts.append(
                f"""
Source: {document_source}
Page: {page}

{content}
"""
            )

        context = "\n\n".join(
            context_parts
        )

        # ==========================================
        # 4. BUILD PROMPT
        # ==========================================

        prompt = PromptBuilder.build(
            context=context,
            question=question
        )

        print(
            "Context characters:",
            len(context)
        )

        print(
            "Prompt characters:",
            len(prompt)
        )

        # ==========================================
        # 5. GENERATE ANSWER
        # ==========================================

        answer = self.llm.generate(
            prompt
        )

        # ==========================================
        # 6. RETURN ANSWER + SOURCES
        # ==========================================

        return {
            "answer": answer,
            "sources": docs
        }