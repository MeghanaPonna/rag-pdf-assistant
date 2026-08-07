from core.pdf_loader import PDFLoader


loader = PDFLoader()

pages = loader.load("uploads/AWS.pdf")

print(f"Total pages: {len(pages)}")
print(pages[0])