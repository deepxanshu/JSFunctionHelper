interface ErrorMessageProps {
    message: string;
  }
  
  const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
      <div className="bg-red-500 text-white p-4 rounded-md mt-4">
        <p>{message}</p>
      </div>
    );
  };
  
  export default ErrorMessage;