import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/slices/authSlice";

const PrivateRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;
