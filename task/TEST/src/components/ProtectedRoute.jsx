// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user");

  if (!isLoggedIn) {
    // if not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  return children; // if logged in, show the page
};

export default ProtectedRoute;
