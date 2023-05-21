import { Route, redirect } from "react-router-dom";
import * as jose from "jose";

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
//import AuthContext from "../Context/authProvider";

import React from "react";
import { useAuth } from "../AuthContext";

const RoleBasedHome = ({ roleHome }) => {
  const location = useLocation();
  const { currentUser } = useAuth();

  if (currentUser) {
    const { role } = currentUser;
    return <Navigate to={roleHome[role]} state={{ from: location }} replace />;
  }

  return <Navigate to="/CustomerHome" state={{ from: location }} />;
};

export default RoleBasedHome;
