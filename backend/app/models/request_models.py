from pydantic import BaseModel

class CodeRequest(BaseModel):
    question: str