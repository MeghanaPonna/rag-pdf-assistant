from core.vector_store import VectorStore
from core.prompt_builder import PromptBuilder
from core.groq_service import GroqService


class RAGChain:

    def __init__(self):
        self.vector_store = VectorStore()
        self.llm = GroqService()

    def ask(self, question: str):

        docs = self.vector_store.search(question, k=4)

        context = "\n\n".join(
            doc.page_content for doc in docs
        )

        prompt = PromptBuilder.build(
            context=context,
            question=question
        )

        answer = self.llm.generate(prompt)

        return {
            "answer": answer,
            "sources": docs
        }