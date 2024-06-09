import json
from app.models.request_models import CodeRequest
from fastapi import APIRouter, HTTPException, Request
from app.services.code_generator import generate_code_and_explanation, validate_question
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


# class CodeRequest(BaseModel):
#     question: str

@router.post("/generate_code")
@limiter.limit("10/minute")
async def generate_code(request: Request):
    try:
        body = await request.json()
        code_request = CodeRequest(**body)
    except (json.JSONDecodeError, TypeError) as e:
        raise HTTPException(status_code=400, detail=f"Error parsing request body: {str(e)}")

    if not validate_question(code_request.question):
        raise HTTPException(status_code=400, detail="The question is not relevant for generating JavaScript code.")

    try:
        result = generate_code_and_explanation(code_request.question)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
