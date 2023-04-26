import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  // To ensure that user is retrieved and set into the state inside useEffect before the children are rendered
  // Info taken from https://youtu.be/PKwu15ldZ7k?t=1528
  // const [loading, setLoading] = useState(true);

  const value = {
    currentUser,
    setCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
