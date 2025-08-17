import { Navigate } from "react-router-dom";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/" replace />;
  }

  return children; // Tampilkan konten jika token ada
};

export default ProtectedRoute;
