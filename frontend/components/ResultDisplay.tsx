// components/ResultDisplay.tsx
interface ResultDisplayProps {
    code: string;
    explanation: string;
  }
  
  const ResultDisplay = ({ code, explanation }: ResultDisplayProps) => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-bold mb-4">Result</h2>
        <pre className="bg-gray-700 p-4 rounded-md mb-4 text-white overflow-x-auto">
          <code>{code}</code>
        </pre>
        <p className="text-gray-300">{explanation}</p>
      </div>
    );
  };
  
  export default ResultDisplay;