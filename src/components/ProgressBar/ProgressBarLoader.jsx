import { useState, useEffect } from "react";

const ProgressBarLoader = () => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev < 100 ? prev + 1 : prev));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-300">
      <div
        className={`h-full bg-green-500 transition-all duration-500 ease-in-out w-${counter}`}
      ></div>
    </div>
  );
};

export default ProgressBarLoader;
