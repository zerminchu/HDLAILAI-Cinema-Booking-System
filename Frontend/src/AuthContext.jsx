import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // To ensure that user is retrieved and set into the state inside useEffect before the children are rendered
  // Info taken from https://youtu.be/PKwu15ldZ7k?t=1528
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (currentUser) {
      setLoading(false);
      return;
    }
    if (localStorage.getItem("user")) {
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
      setLoading(false);
    }
    if (loading) {
      setLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    loading,
    setCurrentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
