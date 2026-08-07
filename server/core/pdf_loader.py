from pathlib import Path
from pypdf import PdfReader

from pathlib import Path
# filename = Path(pdf_path).name

class PDFLoader:

    def load(self, file_path: str):
        """
        Reads a PDF and returns a list of pages.
        """

        pdf_path = Path(file_path)
        filename = Path(pdf_path).name

        reader = PdfReader(pdf_path)

        pages = []

        for page_number, page in enumerate(reader.pages, start=1):

            text = page.extract_text()

            pages.append({
                "page": page_number,
                "text": text if text else "",
                "source": filename
            })

        return pages