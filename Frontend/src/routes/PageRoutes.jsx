import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Demo from "../pages/demo";
import CustomerHome from "../pages/Customer/CustomerHome";
// import ManagerHome from "../pages/ManagerHome";
// import ViewUserAccount from "../pages/UserAdmin/ViewUserAccount";
import OwnerHome from "../pages/Owner/OwnerHome";
import CreateUserAccount from "../pages/UserAdmin/CreateUserAccount";
import ProfilePage from "../pages/UserAdmin/ViewAllUserProfiles";
/* import DisplayRoles from "../pages/UserAdmin/DisplayRoles"; */
import EditUserAccount from "../pages/UserAdmin/EditUserAccount";
import EditUserProfile from "../pages/UserAdmin/EditUserProfile";
import LoginModal from "../pages/Login/LoginModal";
import ViewHall from "../pages/CinemaManager/ViewHall";
import LoginForm from "../pages/Login/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundTitle from "../pages/UnauthorizedPage";
import CinemaManagerHome from "../pages/CinemaManager/CinemaManagerHome";
import ViewMovies from "../pages/CinemaManager/ViewMovies";
import AddMovie from "../pages/CinemaManager/AddMovie";
import UpdateMovie from "../pages/CinemaManager/UpdateMovie";
import CreateAccountModal from "../pages/Customer/CreateAccountModal";
import ViewAccount from "../pages/Customer/ViewAccount";
import ViewMovieDetails from "../pages/Customer/ViewMovieDetails";
import CreateMSModal from "../pages/CinemaManager/CreateMSModal";
import ViewMovieSession from "../pages/CinemaManager/ViewMovieSession";
import UpdateMovieSession from "../pages/CinemaManager/UpdateMovieSession";
import UserAdminHome from "../pages/UserAdmin/UserAdminHome";
import CustomerViewMovieSession from "../pages/Customer/CustomerViewMovieSession";
// import ViewMovieSessionsByMovie from "../pages/Customer/Components/ViewMovieDetails/ViewMovieSessionsByMovie";
import TicketCheckout from "../pages/Customer/TicketCheckout";
import TicketSummary from "../pages/Customer/TicketSummary";
/* import TestPurchaseForm from "../pages/Customer/testPurchaseForm";
import ViewMovieSessionsByMovie from "../pages/Customer/ViewMovieSessionsByMovie"; */
import CinemaManagerFNBAdd from "../pages/CinemaManager/CinemaManagerFNBAdd";
import CinemaManagerFNB from "../pages/CinemaManager/CinemaManagerFNB";
import CinemaManagerFNBEdit from "../pages/CinemaManager/CinemaManagerFNBEdit";
import FnbPurchase from "../pages/Customer/Components/PurchaseProcess/FnbPurchase";
import FnbSummary from "../pages/Customer/Components/PurchaseProcess/FnbSummary";
import CustomerPurchaseHistory from "../pages/Customer/Components/PurchaseProcess/CustomerPurchaseHistory";
import ViewAllTicketTypes from "../pages/CinemaManager/ViewAllTicketTypes";
import UpdateTicketType from "../pages/CinemaManager/UpdateTicketType";
import AddTicketType from "../pages/CinemaManager/AddTicketType";
import FnbPurchaseReceipt from "../pages/Customer/Components/PurchaseProcess/FnbPurchaseReceipt";
import { HeaderResponsive } from "../components/Navbar";
import ViewAllUserProfiles from "../pages/UserAdmin/ViewAllUserProfiles";
import RoleBasedHome from "./RoleBasedHome";

function PageRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <RoleBasedHome
            roleHome={{
              "User Admin": "/UserAdminHome",
              "Cinema Manager": "/CinemaManagerHome",
              Customer: "/CustomerHome",
              Owner: "/OwnerHome",
            }}
          />
        }
      />
      <Route path="/CustomerHome" element={<CustomerHome />} />
      <Route path="/OwnerHome" element={<OwnerHome />} />
      <Route path="/CreateAccount" element={<CreateAccountModal />} />
      {/*       <Route path="/Login" element={<LoginModal />} />
      <Route path="/Login" element={<LoginForm />} /> */}
      <Route path="/Unauthorized" element={<NotFoundTitle />} />
      <Route element={<ProtectedRoute allowedRoles={["User Admin"]} />}>
        <Route path="/CreateUserAccount" element={<CreateUserAccount />} />
        <Route path="/ViewAllUserProfiles" element={<ViewAllUserProfiles />} />
        {/* <Route path="/DisplayRoles" element={<DisplayRoles />} /> */}
        <Route path="/EditUserAccount/:id" element={<EditUserAccount />} />
        <Route path="/EditUserProfile/:id" element={<EditUserProfile />} />
        {/* <Route path="/ViewUserAccount" element={<ViewUserAccount />} /> */}
        {/* <Route path="/DisplayRoles" element={<DisplayRoles />} /> */}
        <Route path="/EditUserAccount/:id" element={<EditUserAccount />} />
        <Route path="/UserAdminHome" element={<UserAdminHome />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["Cinema Manager"]} />}>
        <Route path="/ViewHall/:id" element={<ViewHall />} />
        <Route path="/UpdateMovie/:id" element={<UpdateMovie />} />
        <Route path="/CinemaManagerHome" element={<CinemaManagerHome />} />
        <Route path="/CinemaManagerFNB" element={<CinemaManagerFNB />} />
        <Route path="/CinemaManagerFNBAdd" element={<CinemaManagerFNBAdd />} />
        <Route
          path="/CinemaManagerFNBEdit/:id"
          element={<CinemaManagerFNBEdit />}
        />
        <Route path="/ViewAllTicketTypes" element={<ViewAllTicketTypes />} />
        <Route path="/UpdateTicketType/:id" element={<UpdateTicketType />} />
        <Route path="/AddTicketType" element={<AddTicketType />} />
        <Route path="/UpdateMovie" element={<UpdateMovie />} />
        <Route path="/CreateMS" element={<CreateMSModal />} />
        <Route path="/ViewMovieSession" element={<ViewMovieSession />} />
        <Route path="/EditMovieSession/:id" element={<UpdateMovieSession />} />
        <Route path="/ViewMovies" element={<ViewMovies />} />
        <Route path="/AddMovie" element={<AddMovie />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
        <Route
          path="/CustomerViewMovieSession/:moviesessionid"
          element={<CustomerViewMovieSession />}
        />
        <Route path="/ViewAccount/:id" element={<ViewAccount />} />
        <Route path="/ViewMovieDetails/:id" element={<ViewMovieDetails />} />
        <Route path="/ticketcheckout" element={<TicketCheckout />} />
        <Route path="/ticketsummary" element={<TicketSummary />} />
        <Route path="/FnbPurchase" element={<FnbPurchase />} />
        <Route path="/FnbSummary" element={<FnbSummary />} />
        <Route path="/ticketcheckout" element={<TicketCheckout />} />
        <Route path="/ticketsummary" element={<TicketSummary />} />
        <Route path="/FnbPurchaseReceipt" element={<FnbPurchaseReceipt />} />
        <Route
          path="/CustomerPurchaseHistory/:id"
          element={<CustomerPurchaseHistory />}
        />
      </Route>
    </Routes>
  );
}

export default PageRoutes;
