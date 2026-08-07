from core.groq_service import GroqService

groq = GroqService()

answer = groq.generate(
    "Explain Amazon EC2 in two lines."
)

print(answer)