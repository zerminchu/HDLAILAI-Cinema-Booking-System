import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Demo from "../pages/demo";
import CustomerHome from "../pages/Customer/CustomerHome";
// import ManagerHome from "../pages/ManagerHome";
import ViewUserAccount from "../pages/UserAdmin/ViewUserAccount";
import OwnerHome from "../pages/Owner/OwnerHome";
import CreateUserAccount from "../pages/UserAdmin/CreateUserAccount";
import ProfilePage from "../pages/UserAdmin/ProfilePage";
import DisplayRoles from "../pages/UserAdmin/DisplayRoles";
import EditUserAccount from "../pages/UserAdmin/EditUserAccount";
import LoginModal from "../pages/Login/LoginModal";
import ViewHall from "../pages/CinemaManager/ViewSeats";
import LoginForm from "../pages/Login/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundTitle from "../pages/UnauthorizedPage";
import CinemaManagerHome from "../pages/CinemaManager/CinemaManagerHome";
import ViewMovies from "../pages/CinemaManager/ViewMovies";
import AddMovie from "../pages/CinemaManager/AddMovie";
import UpdateMovie from "../pages/CinemaManager/UpdateMovie";
function PageRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Demo />} />
        <Route path="/CustomerHome" element={<CustomerHome />} />
        <Route path="/OwnerHome" element={<OwnerHome />} />
        <Route path="/CreateUserAccount" element={<CreateUserAccount />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/DisplayRoles" element={<DisplayRoles />} />
        <Route path="/EditUserAccount/:id" element={<EditUserAccount />} />
        <Route path="/Login" element={<LoginModal />} />
        <Route path="/ViewHall/:id" element={<ViewHall />} />
        {/*  <Route element={<ProtectedRoute allowedRoles={["User Admin"]} />}> */}
        <Route path="/ViewUserAccount" element={<ViewUserAccount />} />
        <Route path="/DisplayRoles" element={<DisplayRoles />} />
        <Route path="/EditUserAccount/:id" element={<EditUserAccount />} />
        {/*  </Route> */}
        <Route path="/CinemaManagerHome" element={<CinemaManagerHome />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Unauthorized" element={<NotFoundTitle />} />
        <Route path="/ViewMovies" element={<ViewMovies />} />
        <Route path="/AddMovie" element={<AddMovie />} />
        <Route path="/UpdateMovie" element={<UpdateMovie />} />
      </Routes>
    </Router>
  );
}

export default PageRoutes;
