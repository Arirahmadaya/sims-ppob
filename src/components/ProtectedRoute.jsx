
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  console.log("Token yang ditemukan:", token);

  // Jika token ada, render halaman anak (Outlet)
  // Jika tidak, arahkan pengguna ke halaman login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
