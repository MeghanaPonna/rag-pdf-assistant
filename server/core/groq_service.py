from langchain_groq import ChatGroq
from config.settings import settings


class GroqService:

    def __init__(self):
        if not settings.GROQ_API_KEY:
            raise RuntimeError("GROQ_API_KEY is not configured.")
        self.llm = ChatGroq(
            groq_api_key=settings.GROQ_API_KEY,
            model_name="llama-3.3-70b-versatile",
            temperature=0.2,
        )

    def generate(self, prompt: str) -> str:
        response = self.llm.invoke(prompt)
        return str(response.content)
