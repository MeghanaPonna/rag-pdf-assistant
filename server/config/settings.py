from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str
    APP_VERSION: str
    DEBUG: bool

    GOOGLE_API_KEY: str = ""
    GROQ_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()