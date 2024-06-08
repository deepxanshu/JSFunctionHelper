# app/views/generate_code_view.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.code_generator import generate_code_and_explanation, validate_question

router = APIRouter()

class CodeRequest(BaseModel):
    question: str

@router.post("/generate_code")
async def generate_code(request: CodeRequest):
    if not validate_question(request.question):
        raise HTTPException(status_code=400, detail="The question is not relevant for generating JavaScript code.")
    
    try:
        result = generate_code_and_explanation(request.question)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))