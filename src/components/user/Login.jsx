import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setActiveUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(setActiveUser({ email: user.email, userId: user.uid }));

      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const guestLogin = async () => {
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        "krishabh730@gmail.com",
        "Roshan098@"
      );
      const user = response.user;

      if (user) {
        dispatch(setActiveUser({ email: user.email, userId: user.uid }));
        toast.success("Welcome! Guest Login Successful");
        navigate("/");
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error("Guest login error:", error);
      toast.error("An error occurred during guest login.");
    } finally {
      setLoading(false);
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
              Login
            </h1>
            <form action="" className="flex flex-col" onSubmit={handleLogin}>
              <div className="my-4 relative">
                <input
                  type="email"
                  required
                  className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Your Email
                </label>
                <BiUser className="absolute top-0 right-4" />
              </div>
              <div className="my-4 relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  // placeholder="Your Password"
                  required
                  className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="absolute text-sm text-white duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Your Password
                </label>
                {passwordVisible ? (
                  <AiOutlineEye
                    className="absolute top-0 right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute top-0 right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="" id="" className="mr-2" />
                  <label htmlFor="Remember Me">Remember me</label>
                </div>
                <Link to="/reset-password" className="text-blue-600">
                  Forgot Password
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                type="submit"
                onClick={guestLogin}
                disabled={loading}
                className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-blue-600 hover:text-white py-2 transition-colors duration-300"
              >
                {loading ? "Logging in..." : "Guest Login"}
              </button>
              <div>
                <span className="m-4 ">
                  New Here?
                  <Link to="/signup" className="text-blue-600">
                    SignUp
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
