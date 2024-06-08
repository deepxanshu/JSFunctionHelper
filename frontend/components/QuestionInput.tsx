// components/QuestionInput.tsx
import { useState } from 'react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
}

const QuestionInput = ({ onSubmit }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleQuestionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(question);
    setQuestion('');
  };

  return (
    <form onSubmit={handleQuestionSubmit} className="bg-gray-800 p-4 rounded-lg shadow-md flex">
      <input
        type="text"
        value={question}
        onChange={handleQuestionChange}
        placeholder="Ask a question about JavaScript"
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
      >
        Submit
      </button>
    </form>
  );
};

export default QuestionInput;