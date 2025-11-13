import React, { useContext } from "react";
import { AuthContext } from "./Authcontext";
import { Navigate, useLocation } from "react-router";

const PrivateRout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
   
    window.alert("Access denied! Please log in first.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRout;
