import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // Check if token exists in local storage
  const token = localStorage.getItem("jwt-token");

  // Assuming token presence means authentication
  const isAuthenticated = !!token;

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default PrivateRoutes;
