import { NavLink } from "react-router-dom";

const NoTask = () => {
  return (
    <div className="flex items-center justify-center h-[23rem]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Not Task Found</h1>

        <NavLink className="text-blue-500 hover:underline" to="/">
          Go back to the home page
        </NavLink>
      </div>
    </div>
  );
};

export default NoTask;
