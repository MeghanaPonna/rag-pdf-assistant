from core.pdf_loader import PDFLoader
from core.text_splitter import TextChunker
from core.vector_store import VectorStore

# Load PDF
loader = PDFLoader()
pages = loader.load("uploads/CS_GATE2027_Syllabus.pdf")

# Split into chunks
chunker = TextChunker()
chunks = chunker.split_pages(pages)

# Store vectors
store = VectorStore()
store.add_chunks(chunks)

print("Chunks stored successfully!")

# Search
results = store.similarity_search(
    "Operating Systems",
    k=3
)

print("\nSearch Results:\n")

for i, result in enumerate(results, start=1):
    print("=" * 60)
    print(f"Result {i}")
    print(f"Page : {result.metadata['page']}")
    print(result.page_content[:300])
    print()