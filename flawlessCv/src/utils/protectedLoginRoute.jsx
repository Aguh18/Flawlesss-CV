import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedLoginRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/dashboard" replace />;
  }

  return children; // Tampilkan konten jika token ada
};

export default ProtectedLoginRoute;
