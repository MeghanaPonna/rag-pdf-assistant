from langchain_groq import ChatGroq
from config.settings import settings


class GroqService:

    def __init__(self):
        self.llm = ChatGroq(
            groq_api_key=settings.GROQ_API_KEY,
            model_name="llama-3.3-70b-versatile",
            temperature=0.2,
        )

    def generate(self, prompt: str):
        response = self.llm.invoke(prompt)
        return response.content