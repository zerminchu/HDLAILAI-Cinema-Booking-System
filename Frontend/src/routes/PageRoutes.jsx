import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Demo from "../pages/demo";
import CustomerHome from "../pages/CustomerHome";
import ManagerHome from "../pages/ManagerHome";
import ViewUserAccount from "../pages/AdminHome/ViewUserAccount";
import OwnerHome from "../pages/OwnerHome";
import Login from "../pages/Login/Login";
import TestPage from "../pages/Login/TestPage";
import LoginModalTest from "../pages/LoginTest/LoginModalTest";
import CreateUserAccount from "../pages/CreateUserAccount";
import CreateRolesPage from "../pages/AdminHome/CreateRolesPage";
import DisplayRoles from "../pages/AdminHome/DisplayRoles";

function PageRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Demo />} />
        <Route path="/CustomerHome" element={<CustomerHome />} />
        <Route path="/ManagerHome" element={<ManagerHome />} />
        <Route path="/OwnerHome" element={<OwnerHome />} />
        <Route path="/Login" element={<LoginModalTest />} />
        <Route path="/ViewUserAccount" element={<ViewUserAccount />} />
        <Route path="/CreateUserAccount" element={<CreateUserAccount />} />
        <Route path="/CreateRolesPage" element={<CreateRolesPage />} />
        <Route path="/DisplayRoles" element={<DisplayRoles />} />
      </Routes>
    </Router>
  );
}

export default PageRoutes;
