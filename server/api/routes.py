from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root():
    return {
        "message": "Welcome to Enterprise AI PDF Assistant!"
    }


@router.get("/health")
def health():
    return {
        "status": "healthy"
    }