from langchain_huggingface import HuggingFaceEmbeddings


class EmbeddingModel:

    def __init__(self):
        self.embedding = HuggingFaceEmbeddings(
            model_name="BAAI/bge-small-en-v1.5",
            model_kwargs={
                "device": "cpu"
            },
            encode_kwargs={
                "normalize_embeddings": True
            }
        )

    def embed_documents(self, texts):
        return self.embedding.embed_documents(texts)

    def embed_query(self, query):
        return self.embedding.embed_query(query)