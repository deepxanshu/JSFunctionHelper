// pages/index.tsx
import { useState } from 'react';
import axios from 'axios';
import QuestionInput from '../components/QuestionInput';
import ResultDisplay from '../components/ResultDisplay';

const IndexPage = () => {
  const [result, setResult] = useState({ code: '', explanation: '' });

  const handleQuestionSubmit = async (question: string) => {
    try {
      const response = await axios.post('/api/generate', { question });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Blink Labs Coding Assistant</h1>
      <QuestionInput onSubmit={handleQuestionSubmit} />
      {result.code && <ResultDisplay code={result.code} explanation={result.explanation} />}
    </div>
  );
};

export default IndexPage;