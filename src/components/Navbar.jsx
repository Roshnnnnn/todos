import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="hidden lg:flex justify-around bg-slate-700 p-4">
        <div>Home</div>
        <div>Tasks</div>
        <div>Login</div>
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
          className={`lg:hidden fixed top-0 right-0 h-full bg-slate-700 p-10 transform ${
            open ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col items-center">
            <div className="my-4 ">Home</div>
            <div className="my-4">Tasks</div>
            <div className="my-4">Login</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
