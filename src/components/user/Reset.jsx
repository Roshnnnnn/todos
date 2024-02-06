import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

const Reset = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();
    console.log("Click");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Check your email for the password reset link");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.code === "auth/user-not-found"
          ? "User not found. Please check your email address."
          : "Error sending password reset email. Please try again later.";
      toast.error(errorMessage);
      navigate("/login");
    }
  };

  return (
    <div>
      <div
        className="bg-cover bg-center h-screen flex justify-center items-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/11911068/pexels-photo-11911068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <div>
            <h1 className="text-4xl font-bold text-white mb-6 text-center">
              Reset
            </h1>
            <form action="" className="flex flex-col" onSubmit={resetPassword}>
              <div className="my-4 relative">
                <input
                  type="email"
                  required
                  className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Your Email
                </label>
                <button
                  type="submit"
                  className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300"
                >
                  Reset
                </button>

                <div>
                  <span className="m-4 ">
                    New Here?
                    <Link to="/login" className="text-blue-600">
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
