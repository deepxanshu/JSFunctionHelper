from pydantic import BaseModel

class CodeResponse(BaseModel):
    code: str
    explanation: str