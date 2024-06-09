import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export async function generateCodeAndExplanation(question: string): Promise<{ code: string; explanation: string }> {
  const response = await axios.post(`${API_URL}/generate_code`, { question },
  {
    headers: {
        'Content-Type': 'application/json',
    },
}
  );
  const { code, explanation } = response.data;
  return { code, explanation };
}