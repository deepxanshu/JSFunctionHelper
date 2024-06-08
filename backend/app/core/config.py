# app/core/config.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Code Tutor AI"
    cors_origins: list = ["*"]

settings = Settings()