import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, selectIsLoggedIn } from "../state/slices/authSlice";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="">
      <div className="hidden lg:flex justify-around rounded-md bg-slate-700 p-4">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `hover:bg-gray-600 duration-500 px-4 py-2 rounded-md ${
              isActive ? "text-black bg-white" : "text-white"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/all-task"}
          className={({ isActive }) =>
            `hover:bg-gray-600 duration-500 px-4 py-2 rounded-md ${
              isActive ? "text-black bg-white" : "text-white"
            }`
          }
        >
          Tasks
        </NavLink>
        {isLoggedIn ? (
          <div>
            <button
              onClick={handleLogout}
              className="hover:bg-red-600 duration-500 px-4 py-2 rounded-md text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to={"/login"}
            className="hover:bg-gray-600 duration-500 px-4 py-2 rounded-md text-white"
          >
            Login
          </NavLink>
        )}
      </div>
      <div className="lg:hidden flex justify-between items-center bg-slate-700 p-4">
        <button onClick={toggle} className="text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div
          to={"/"}
          className={`lg:hidden fixed top-0 right-0 h-full bg-slate-700 p-10 transform ${
            open ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col items-center my-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `hover:bg-gray-600 duration-500 px-4 py-2 rounded-md ${
                  isActive ? "text-black bg-white" : "text-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/all-task"}
              className={({ isActive }) =>
                `hover:bg-gray-600 duration-500 px-4 py-2 rounded-md ${
                  isActive ? "text-black bg-white" : "text-white"
                }`
              }
            >
              Tasks
            </NavLink>
            {isLoggedIn ? (
              <div>
                <button
                  onClick={handleLogout}
                  className="hover:bg-red-600 duration-500 px-4 py-2 rounded-md text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to={"login"}
                className="hover:bg-gray-600 duration-500 px-4 py-2 rounded-md text-white"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
