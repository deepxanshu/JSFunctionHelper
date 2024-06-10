from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "JS Helper App"
    cors_origins: list = ["*"]

settings = Settings()