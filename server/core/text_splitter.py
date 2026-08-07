# from langchain_text_splitters import RecursiveCharacterTextSplitter


# class TextChunker:
#     def __init__(self, chunk_size=800, chunk_overlap=200):
#         self.splitter = RecursiveCharacterTextSplitter(
#             chunk_size=chunk_size,
#             chunk_overlap=chunk_overlap,
#             separators=[
#                 "\n\n",
#                 "\n",
#                 ". ",
#                 " ",
#                 ""
#             ],
#         )

#     def split_pages(self, pages):
#         chunks = []

#         for page in pages:
#             texts = self.splitter.split_text(page["text"])

#             for text in texts:
#                 chunks.append({
#                     "page": page["page"],
#                     "text": text
#                 })

#         return chunks



from langchain_text_splitters import RecursiveCharacterTextSplitter


class TextChunker:

    def __init__(self):

        self.splitter = RecursiveCharacterTextSplitter(

            chunk_size=500,
            chunk_overlap=100,

            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                ""
            ]
        )

    def split_pages(self, pages):

        chunks = []

        for page in pages:

            texts = self.splitter.split_text(page["text"])

            for text in texts:

                chunks.append({
                    "page": page["page"],
                    "text": text,
                    "source": page["source"]
                })

        return chunks