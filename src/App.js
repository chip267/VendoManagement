import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboard from "./views/Onboard/onboard";
import Login from "./views/Login/login";
import Signup from "./views/Signup/Signup";
import Sidebar from "./views/Sidebar/sidebar";
export default function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}

        <Routes>
          <Route path="/" exact={true} element={<Onboard />} />
          <Route path="/login" exact={true} element={<Login />} />
          <Route path="/signup" exact={true} element={<Signup />} />
          <Route path="/sidebar" exact={true} element={<Sidebar />} />
        </Routes>
      </Router>
    </>
  );
}
