## Enterprise AI PDF Assistant

React/Vite frontend and FastAPI backend for grounded PDF chat and document intelligence.

### Run locally

1. Copy `server/.env.example` to `server/.env` and set `GROQ_API_KEY`.
2. From `server`, install dependencies and run `uvicorn main:app --reload`.
3. From `client`, run `npm install` and `npm run dev`.

Set `VITE_API_URL` in the client environment when the API is not hosted at `http://127.0.0.1:8000`. Set `CORS_ORIGINS` in the backend to the deployed frontend URL.

### API

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/upload/` | Validate, process and index a PDF |
| POST | `/chat/` | Grounded document chat; accepts optional bounded `history` |
| POST | `/document/summary` | Token-aware document summary |
| POST | `/document/topics` | Key topic extraction |
| POST | `/document/sections` | Section analysis |
| POST | `/document/interview-questions` | Grounded interview questions |
