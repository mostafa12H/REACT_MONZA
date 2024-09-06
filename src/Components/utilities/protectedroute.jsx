import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const ProtectedRoute = ({ element, ...rest }) => {
  const user = useSelector(selectUser);
  const isAuthenticated = !!user.token;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
