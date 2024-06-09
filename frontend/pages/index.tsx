import { useState } from 'react';
import QuestionInput from '../components/QuestionInput';
import ResultDisplay from '../components/ResultDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {generateCodeAndExplanation} from './api/generate';

const IndexPage = () => {
  const [result, setResult] = useState({ code: '', explanation: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async (question: string) => {
    setLoading(true);
    setError('');
    setResult({ code: '', explanation: '' });
    try {
      const response = await generateCodeAndExplanation(question)
      setResult(response);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError('Invalid Input. Please check your question.');
      } else {
        setError('An error occurred while fetching data from the backend.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start py-8 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center text-white">JS Helper App</h1>
      <div className="w-full max-w-xl mt-4">
        <QuestionInput onSubmit={handleQuestionSubmit} />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {result.code && <ResultDisplay code={result.code} explanation={result.explanation} />}
      </div>
    </div>
  );
};

export default IndexPage;