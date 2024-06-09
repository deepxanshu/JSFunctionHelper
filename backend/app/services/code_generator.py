from cachetools import cached, TTLCache
from app.ai.ai import chat_completion_request
from app.models.response_models import CodeResponse


# Create a TTLCache with a max size of 100 items and a TTL (Time to Live) of 600 seconds (10 minutes)
validate_question_cache = TTLCache(maxsize=100, ttl=600)
generate_code_cache = TTLCache(maxsize=100, ttl=600)

@cached(validate_question_cache)
def validate_question(question: str) -> bool:
    messages = [
        {"role": "system", "content": "You are an assistant that validates if a question is relevant to generating JavaScript functions. The question must involve generating JavaScript code."},
        {"role": "user", "content": f"Is the following question relevant? {question}"}
    ]

    response = chat_completion_request(messages)
    answer = response['choices'][0]['message']['content'].strip().lower()

    return "yes" in answer

@cached(generate_code_cache)
def generate_code_and_explanation(question: str):
    messages = [
        {"role": "system", "content": "You are the best JavaScript code tutor who simplifies solutions and examples. Provide a JavaScript function followed by a one-line explanation. The response should be in the format: \n\n<code>\n\nExplanation: <explanation>."},
        {"role": "user", "content": question}
    ]

    response = chat_completion_request(messages)
    answer = response['choices'][0]['message']['content'].strip()

    # Ensure the response is in the expected format
    try:
        code, explanation = answer.split("\nExplanation: ")
        code = code.strip()
        # Remove any markdown code block formatting
        if code.startswith("```javascript"):
            code = code[len("```javascript"):].strip()
        if code.startswith("```"):
            code = code[len("```"):].strip()
        if code.endswith("```"):
            code = code[:-len("```")].strip()
        explanation = explanation.strip()
    except ValueError:
        raise ValueError("The response format is not as expected")
    
    code_response = CodeResponse(code=code, explanation=explanation)
    return code_response
