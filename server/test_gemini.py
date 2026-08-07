from core.gemini_service import GeminiService

gemini = GeminiService()

answer = gemini.generate(
    "Explain Amazon EC2 in two lines."
)

print(answer)