from core.pdf_loader import PDFLoader
from core.text_splitter import TextChunker


class DocumentProcessor:

    def __init__(self):
        self.loader = PDFLoader()
        self.chunker = TextChunker()

    def process(self, file_path: str):
        pages = self.loader.load(file_path)
        chunks = self.chunker.split_pages(pages)

        return {
            "pages": pages,
            "chunks": chunks
        }