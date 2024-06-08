# app/models/request_models.py
from pydantic import BaseModel

class CodeRequest(BaseModel):
    question: str