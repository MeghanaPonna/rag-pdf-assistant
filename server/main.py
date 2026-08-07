from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.settings import settings

from api.routes import router
from api.upload import router as upload_router
from api.chat import router as chat_router


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Restrict later in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Existing Routes
app.include_router(router)
app.include_router(upload_router)

# Chat API
app.include_router(chat_router)


@app.get("/")
def root():
    return {
        "message": "Enterprise AI PDF Assistant API is Running 🚀"
    }