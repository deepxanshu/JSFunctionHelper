interface ResultDisplayProps {
    code: string;
    explanation: string;
  }
  
  const ResultDisplay = ({ code, explanation }: ResultDisplayProps) => {
    return (
      <div className="bg-gray-800 p-4 rounded-md shadow-md w-full mt-4">
        <h2 className="text-xl font-bold text-white mb-2">Result</h2>
        <pre className="bg-gray-700 p-4 rounded-md text-white overflow-auto">{code}</pre>
        <p className="text-gray-300 mt-2">{explanation}</p>
      </div>
    );
  };
  
  export default ResultDisplay;