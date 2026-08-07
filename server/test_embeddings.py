from core.pdf_loader import PDFLoader
from core.text_splitter import TextChunker
from core.embeddings import EmbeddingModel

# Step 1: Load PDF
loader = PDFLoader()
pages = loader.load("uploads/CS_GATE2027_Syllabus.pdf")

print(f"Pages: {len(pages)}")

# Step 2: Chunk PDF
chunker = TextChunker()
chunks = chunker.split_pages(pages)

print(f"Chunks: {len(chunks)}")

# Step 3: Create Embeddings
model = EmbeddingModel()

texts = [chunk["text"] for chunk in chunks]

vectors = model.embed_documents(texts)

print(f"Embeddings: {len(vectors)}")
print(f"Vector Dimension: {len(vectors[0])}")

print("\nFirst Chunk:\n")
print(chunks[0]["text"][:300])

print("\nFirst Vector (First 10 values):\n")
print(vectors[0][:10])