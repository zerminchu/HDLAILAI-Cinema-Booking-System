import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Demo from "../pages/demo";
import CustomerHome from "../pages/CustomerHome";
import ManagerHome from "../pages/ManagerHome";
import ViewUserAccount from "../pages/AdminHome/ViewUserAccount";
import OwnerHome from "../pages/OwnerHome";
import CreateUserAccount from "../pages/CreateUserAccount";
import CreateRolesPage from "../pages/AdminHome/CreateRolesPage";
import DisplayRoles from "../pages/AdminHome/DisplayRoles";
import EditUserAccount from "../pages/AdminHome/EditUserAccount";

function PageRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Demo />} />
        <Route path="/CustomerHome" element={<CustomerHome />} />
        <Route path="/ManagerHome" element={<ManagerHome />} />
        <Route path="/OwnerHome" element={<OwnerHome />} />
        <Route path="/ViewUserAccount" element={<ViewUserAccount />} />
        <Route path="/CreateUserAccount" element={<CreateUserAccount />} />
        <Route path="/CreateRolesPage" element={<CreateRolesPage />} />
        <Route path="/DisplayRoles" element={<DisplayRoles />} />
        <Route path="/EditUserAccount/:id" element={<EditUserAccount />} />
      </Routes>
    </Router>
  );
}

export default PageRoutes;
