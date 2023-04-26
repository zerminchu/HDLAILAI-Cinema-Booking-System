import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Demo from "../pages/demo";
import CustomerHome from "../pages/CustomerHome";
import ManagerHome from "../pages/ManagerHome";
import ViewUserAccount from "../pages/AdminHome/ViewUserAccount";
import OwnerHome from "../pages/OwnerHome";
import CreateUserAccount from "../pages/CreateUserAccount";
import ProfilePage from "../pages/AdminHome/ProfilePage";
import DisplayRoles from "../pages/AdminHome/DisplayRoles";
import EditUserAccount from "../pages/AdminHome/EditUserAccount";
import LoginModal from "../pages/Login/LoginModal";
import CMUpdateRoomModel from "../pages/CinemaManagerUpdateRoom/CMUpdateRoomModel";
import CMCreateRoomModel from "../pages/CinemaManagerCreateRoom/CMCreateRoomModel";
import CinemaManagerCreateSeat from "../pages/CinemaManagerCreateSeat";
import CinemaManagerUpdateSeat from "../pages/CinemaManagerUpdateSeat";
import ViewHall from "../pages/ViewSeats/ViewHall";
import CMUpdateRoomModel from "../pages/CinemaManagerUpdate/CMUpdateRoomModel";
import CMCreateRoomModel from "../pages/CinemaManagerCreate/CMCreateRoomModel";
import LoginForm from "../pages/Login/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundTitle from "../pages/UnauthorizedPage";

function PageRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Demo />} />
        <Route path="/CustomerHome" element={<CustomerHome />} />
        <Route path="/ManagerHome" element={<ManagerHome />} />
        <Route path="/OwnerHome" element={<OwnerHome />} />
        <Route path="/CreateUserAccount" element={<CreateUserAccount />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/DisplayRoles" element={<DisplayRoles />} />
        <Route path="/EditUserAccount/:id" element={<EditUserAccount />} />
        <Route path="/Login" element={<LoginModal />} />
        <Route path="/UpdateRoom" element={<CMUpdateRoomModel />} />
        <Route path="/CreateRoom" element={<CMCreateRoomModel />} />
        <Route path="/CreateSeat" element={<CinemaManagerCreateSeat />} />
        <Route path="/UpdateSeat" element={<CinemaManagerUpdateSeat />} />
        <Route path="/ViewHall/:id" element={<ViewHall />} />
        <Route path="/CreateRolesPage" element={<CreateRolesPage />} />
        <Route element={<ProtectedRoute allowedRoles={["User Admin"]} />}>
          <Route path="/ViewUserAccount" element={<ViewUserAccount />} />
          <Route path="/DisplayRoles" element={<DisplayRoles />} />
          <Route path="/EditUserAccount/:id" element={<EditUserAccount />} />
        </Route>
        <Route path="/UpdateRoom" element={<CMUpdateRoomModel />} />
        <Route path="/CreateRoom" element={<CMCreateRoomModel />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Unauthorized" element={<NotFoundTitle />} />
      </Routes>
    </Router>
  );
}

export default PageRoutes;
