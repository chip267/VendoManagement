import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboard from "./views/Onboard/onboard";
import Login from "./views/Login/login";
import Signup from "./views/Signup/Signup";
import Sidebar from "./views/Sidebar/sidebar";
import { RouterProvider } from "react-router-dom";
import router from "./route";

export default function App() {
  return (

    <RouterProvider router={router} />

  );
}
