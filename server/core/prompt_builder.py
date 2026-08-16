class PromptBuilder:
    @staticmethod
    def build(context: str, question: str, history: str = "") -> str:
        return f'''You are an Enterprise AI Document Assistant. Answer only from the supplied PDF context.
If the answer cannot be supported by that context, say exactly: "I couldn't find this information in the uploaded PDF."
Do not use outside knowledge or invent facts. Use concise Markdown.

Conversation context (use only to resolve references such as "it"):
{history or "No previous conversation."}

PDF context:
{context}

Current question: {question}
Answer:'''
