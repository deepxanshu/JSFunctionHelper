from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_generate_code_add():
    response = client.post("/api/generate_code", json={"question": "add 2 numbers"})
    assert response.status_code == 200
    assert response.json()["code"]
    assert response.json()["explanation"]

def test_generate_code_invalid():
    response = client.post("/api/generate_code", json={"question": "are you a boy"})
    assert response.status_code == 400
    assert response.json() == {"detail": "Invalid question"}