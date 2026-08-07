from core.rag_chain import RAGChain

rag = RAGChain()

question = input("Ask: ")

response = rag.ask(question)

print("\nAnswer:\n")
print(response["answer"])

print("\nSources:\n")

for doc in response["sources"]:
    page = doc.metadata.get("page", "Unknown")
    print(f"Page {page}")