# from __future__ import annotations

# import logging
# from datetime import datetime, timezone

# from pymongo import ASCENDING, MongoClient

# from config.settings import settings

# logger = logging.getLogger(__name__)


# class MongoStore:
#     """Application persistence. Chroma remains the source of embedding retrieval."""

#     def __init__(self):
#         self._db = None
#         if not settings.MONGO_URI:
#             return
#         try:
#             client = MongoClient(settings.MONGO_URI, serverSelectionTimeoutMS=3000)
#             client.admin.command("ping")
#             self._db = client[settings.MONGO_DATABASE]
#             self._db.documents.create_index([("client_id", ASCENDING), ("filename", ASCENDING)], unique=True)
#             self._db.chat_sessions.create_index([("client_id", ASCENDING), ("source", ASCENDING)], unique=True)
#         except Exception as error:
#             logger.warning("MongoDB is unavailable; persistence is disabled: %s", error)

#     @property
#     def enabled(self) -> bool:
#         return self._db is not None

#     def save_document(self, client_id: str, document: dict) -> None:
#         if not self._db:
#             return
#         try:
#             now = datetime.now(timezone.utc)
#             self._db.documents.update_one(
#                 {"client_id": client_id, "filename": document["filename"]},
#                 {"$set": {**document, "client_id": client_id, "updated_at": now}, "$setOnInsert": {"created_at": now}},
#                 upsert=True,
#             )
#         except Exception as error:
#             logger.warning("Could not save document metadata: %s", error)

#     def list_documents(self, client_id: str) -> list[dict]:
#         if not self._db:
#             return []
#         try:
#             return [{key: value for key, value in item.items() if key not in {"_id", "client_id", "created_at", "updated_at"}} for item in self._db.documents.find({"client_id": client_id}).sort("updated_at", -1)]
#         except Exception as error:
#             logger.warning("Could not load document metadata: %s", error)
#             return []

#     def append_exchange(self, client_id: str, source: str, question: str, answer: str, sources: list[dict]) -> None:
#         if not self._db:
#             return
#         try:
#             now = datetime.now(timezone.utc)
#             messages = [{"role": "user", "content": question, "created_at": now}, {"role": "assistant", "content": answer, "sources": sources, "created_at": now}]
#             self._db.chat_sessions.update_one(
#                 {"client_id": client_id, "source": source},
#                 {"$push": {"messages": {"$each": messages}}, "$set": {"updated_at": now}, "$setOnInsert": {"created_at": now}},
#                 upsert=True,
#             )
#         except Exception as error:
#             logger.warning("Could not save chat history: %s", error)

#     def history(self, client_id: str, source: str) -> list[dict]:
#         if not self._db:
#             return []
#         try:
#             session = self._db.chat_sessions.find_one({"client_id": client_id, "source": source}, {"messages": {"$slice": -100}})
#         except Exception as error:
#             logger.warning("Could not load chat history: %s", error)
#             return []
#         if not session:
#             return []
#         return [{key: value for key, value in message.items() if key != "created_at"} for message in session.get("messages", [])]



from __future__ import annotations

import logging
from datetime import datetime, timezone

from pymongo import ASCENDING, MongoClient

from config.settings import settings


logger = logging.getLogger(__name__)


class MongoStore:
    """
    Application persistence layer.

    MongoDB stores:
    - Uploaded document metadata
    - Chat history

    ChromaDB remains responsible for:
    - Embeddings
    - Vector storage
    - Similarity search
    """

    def __init__(self):
        self._db = None

        # ==========================================
        # CHECK MONGODB CONFIGURATION
        # ==========================================

        if not settings.MONGO_URI:
            logger.warning(
                "MONGO_URI is not configured. "
                "MongoDB persistence is disabled."
            )
            return

        try:

            # ==========================================
            # CONNECT TO MONGODB
            # ==========================================

            client = MongoClient(
                settings.MONGO_URI,
                serverSelectionTimeoutMS=3000,
            )

            # Test connection
            client.admin.command("ping")

            # Select database
            self._db = client[
                settings.MONGO_DATABASE
            ]

            # ==========================================
            # CREATE INDEXES
            # ==========================================

            self._db.documents.create_index(
                [
                    ("client_id", ASCENDING),
                    ("filename", ASCENDING),
                ],
                unique=True,
            )

            self._db.chat_sessions.create_index(
                [
                    ("client_id", ASCENDING),
                    ("source", ASCENDING),
                ],
                unique=True,
            )

            logger.info(
                "MongoDB connected successfully."
            )

        except Exception as error:

            logger.warning(
                "MongoDB is unavailable; "
                "persistence is disabled: %s",
                error,
            )

            self._db = None

    # ==========================================
    # MONGODB STATUS
    # ==========================================

    @property
    def enabled(self) -> bool:
        """
        Return True when MongoDB is available.
        """

        return self._db is not None

    # ==========================================
    # SAVE DOCUMENT
    # ==========================================

    def save_document(
        self,
        client_id: str,
        document: dict,
    ) -> None:

        # IMPORTANT:
        # Do not use:
        # if not self._db
        #
        # PyMongo Database objects do not support
        # boolean evaluation.

        if self._db is None:
            logger.warning(
                "MongoDB is disabled. "
                "Document metadata will not be saved."
            )
            return

        try:

            now = datetime.now(
                timezone.utc
            )

            self._db.documents.update_one(

                {
                    "client_id": client_id,
                    "filename": document["filename"],
                },

                {
                    "$set": {
                        **document,
                        "client_id": client_id,
                        "updated_at": now,
                    },

                    "$setOnInsert": {
                        "created_at": now,
                    },
                },

                upsert=True,
            )

            logger.info(
                "Document metadata saved: %s",
                document["filename"],
            )

        except Exception as error:

            logger.warning(
                "Could not save document metadata: %s",
                error,
            )

    # ==========================================
    # LIST DOCUMENTS
    # ==========================================

    def list_documents(
        self,
        client_id: str,
    ) -> list[dict]:

        if self._db is None:
            logger.warning(
                "MongoDB is disabled. "
                "Returning empty document list."
            )
            return []

        try:

            documents = self._db.documents.find(
                {
                    "client_id": client_id
                }
            ).sort(
                "updated_at",
                -1,
            )

            result = []

            for item in documents:

                cleaned_item = {
                    key: value
                    for key, value in item.items()
                    if key not in {
                        "_id",
                        "client_id",
                        "created_at",
                        "updated_at",
                    }
                }

                result.append(
                    cleaned_item
                )

            return result

        except Exception as error:

            logger.warning(
                "Could not load document metadata: %s",
                error,
            )

            return []

    # ==========================================
    # SAVE CHAT EXCHANGE
    # ==========================================

    def append_exchange(
        self,
        client_id: str,
        source: str,
        question: str,
        answer: str,
        sources: list[dict],
    ) -> None:

        if self._db is None:
            logger.warning(
                "MongoDB is disabled. "
                "Chat history will not be saved."
            )
            return

        try:

            now = datetime.now(
                timezone.utc
            )

            messages = [

                {
                    "role": "user",
                    "content": question,
                    "created_at": now,
                },

                {
                    "role": "assistant",
                    "content": answer,
                    "sources": sources,
                    "created_at": now,
                },

            ]

            self._db.chat_sessions.update_one(

                {
                    "client_id": client_id,
                    "source": source,
                },

                {
                    "$push": {
                        "messages": {
                            "$each": messages
                        }
                    },

                    "$set": {
                        "updated_at": now
                    },

                    "$setOnInsert": {
                        "created_at": now
                    },
                },

                upsert=True,
            )

        except Exception as error:

            logger.warning(
                "Could not save chat history: %s",
                error,
            )

    # ==========================================
    # LOAD CHAT HISTORY
    # ==========================================

    def history(
        self,
        client_id: str,
        source: str,
    ) -> list[dict]:

        if self._db is None:
            logger.warning(
                "MongoDB is disabled. "
                "Returning empty chat history."
            )
            return []

        try:

            session = (
                self._db.chat_sessions.find_one(
                    {
                        "client_id": client_id,
                        "source": source,
                    },
                    {
                        "messages": {
                            "$slice": -100
                        }
                    },
                )
            )

        except Exception as error:

            logger.warning(
                "Could not load chat history: %s",
                error,
            )

            return []

        if session is None:
            return []

        messages = session.get(
            "messages",
            [],
        )

        return [
            {
                key: value
                for key, value in message.items()
                if key != "created_at"
            }
            for message in messages
        ]