const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-4xl text-red-500 font-semibold mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700 text-sm mb-4">
          We apologize for the inconvenience. Please try again later.
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default Error;
