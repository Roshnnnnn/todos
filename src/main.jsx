import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./components/redux/store.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/home/Home.jsx";
import Login from "./components/user/Login.jsx";
import Signup from "./components/user/Signup.jsx";
import Reset from "./components/user/Reset.jsx";
import PrivateRoute from "./components/user/PrivateRoute.jsx";
import AllTask from "./components/tasks/AllTask.jsx";
import Today from "./components/tasks/Today.jsx";
import Completed from "./components/tasks/Completed.jsx";
import Scheduled from "./components/tasks/Scheduled.jsx";
import Error from "./components/features/Error.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="reset-password" element={<Reset />} />
      {/* PrivateRoute */}
      <Route element={<PrivateRoute />}>
        <Route path="all-task" element={<AllTask />} />
        <Route path="today-task" element={<Today />} />
        <Route path="completed-task" element={<Completed />} />
        <Route path="scheduled-task" element={<Scheduled />} />
      </Route>
      {/* PrivateRoute */}
      <Route path="*" element={<Error />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
