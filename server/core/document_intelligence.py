from __future__ import annotations

import json
import re
from collections import defaultdict

from core.groq_service import GroqService
from core.vector_store import VectorStore


class DocumentIntelligence:
    """Token-bounded map/reduce analysis for a single indexed source."""

    def __init__(self):
        self.vector_store = VectorStore()
        self.llm = GroqService()

    def documents(self, source: str):
        docs = self.vector_store.get_all_by_source(source)
        if not docs:
            raise ValueError("No indexed content was found for this document.")
        return docs

    @staticmethod
    def _groups(docs, max_chars: int = 9000):
        groups, current, size = [], [], 0
        for doc in docs:
            text = doc.page_content.strip()
            if not text:
                continue
            item = f"[Page {doc.metadata.get('page', 'Unknown')}]\n{text}"
            if current and size + len(item) > max_chars:
                groups.append("\n\n".join(current))
                current, size = [], 0
            current.append(item)
            size += len(item)
        if current:
            groups.append("\n\n".join(current))
        return groups

    def summary(self, source: str) -> str:
        groups = self._groups(self.documents(source))
        map_prompt = "Summarize only the supplied PDF extract. Capture facts, topics, and key concepts. Do not invent information.\n\n"
        partials = [self.llm.generate(map_prompt + group) for group in groups]
        # Partial summaries are deliberately small, avoiding the prior oversized direct request.
        combined = "\n\n".join(partials)
        if len(combined) > 18000:
            combined = combined[:18000]
        return self.llm.generate(f'''Create a clean Markdown document summary from these grounded partial summaries.
Use exactly these headings: # Document Summary, ## Document Overview, ## Main Topics, ## Important Concepts, ## Key Takeaways.
Do not add unsupported information.\n\n{combined}''')

    def structured(self, source: str, kind: str) -> list[dict]:
        docs = self.documents(source)
        context = "\n\n".join(self._groups(docs, max_chars=7000)[:3])
        schemas = {
            "topics": '[{"title":"string","description":"string","pages":[1]}]',
            "sections": '[{"title":"string","description":"string","pages":[1]}]',
            "questions": '[{"question":"string","answer":"string","difficulty":"Easy|Medium|Hard","pages":[1]}]',
        }
        instructions = {
            "topics": "Extract 4 to 8 distinct key topics.",
            "sections": "Identify the document's actual sections; prefer explicit headings. Return 3 to 12.",
            "questions": "Create 6 interview questions grounded in the text, including Easy, Medium and Hard questions.",
        }
        raw = self.llm.generate(f'''{instructions[kind]} Use only this document content. Include only pages supported by the text.
Return JSON only, matching this schema: {schemas[kind]}
Document content:\n{context}''')
        return self._parse_json(raw, kind)

    @staticmethod
    def _parse_json(raw: str, kind: str) -> list[dict]:
        candidate = re.sub(r"^```(?:json)?|```$", "", raw.strip(), flags=re.IGNORECASE | re.MULTILINE).strip()
        match = re.search(r"\[.*\]", candidate, flags=re.DOTALL)
        if not match:
            raise ValueError("The analysis service returned an invalid response.")
        data = json.loads(match.group(0))
        if not isinstance(data, list):
            raise ValueError("The analysis service returned an invalid response.")
        cleaned = []
        for item in data[:12]:
            if not isinstance(item, dict):
                continue
            pages = sorted({int(page) for page in item.get("pages", []) if str(page).isdigit()})
            if kind == "questions":
                if item.get("question") and item.get("answer"):
                    cleaned.append({"question": str(item["question"]), "answer": str(item["answer"]), "difficulty": item.get("difficulty") if item.get("difficulty") in {"Easy", "Medium", "Hard"} else "Medium", "pages": pages})
            elif item.get("title"):
                cleaned.append({"title": str(item["title"]), "description": str(item.get("description", "")), "pages": pages})
        return cleaned
