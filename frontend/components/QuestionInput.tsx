import { useState } from 'react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
}

const QuestionInput = ({ onSubmit }: QuestionInputProps) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(question);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <div className="flex items-center w-full max-w-xl mb-4">
        <input
          type="text"
          className="flex-grow p-2 rounded-l-md border border-gray-300 bg-opacity-75 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask a question about JavaScript..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 rounded-r-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default QuestionInput;