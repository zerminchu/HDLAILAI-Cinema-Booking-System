import { Route, redirect } from "react-router-dom";
import * as jose from "jose";

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
//import AuthContext from "../Context/authProvider";

import React from "react";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  const { role, name } = currentUser;

  if (allowedRoles.find((allowedRole) => allowedRole.includes(role))) {
    return <Outlet />;
  }
  if (name) {
    return <Navigate to="/Unauthorized" state={{ from: location }} replace />;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
