import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Demo from "../pages/demo";
import CustomerHome from "../pages/CustomerHome";
import ManagerHome from "../pages/ManagerHome";
import AdminHome from "../pages/AdminHome/AdminHome";
import OwnerHome from "../pages/OwnerHome";
import Login from "../pages/Login/Login";
import TestPage from "../pages/Login/TestPage";
import LoginForm from "../pages/Login/TestForm";

function PageRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Demo />} />
        <Route path="/CustomerHome" element={<CustomerHome />} />
        <Route path="/ManagerHome" element={<ManagerHome />} />
        <Route path="/OwnerHome" element={<OwnerHome />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/TestPage" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default PageRoutes;
