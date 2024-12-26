// src/layouts/MainLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const location = useLocation();

  const excludedPaths = ["/login", "/register"];
  const shouldShowNavbar = !excludedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavbar && <Navbar />}
      <main className={shouldShowNavbar ? "flex-grow pt-4" : "flex-grow"}>
        <Outlet />
      </main>
      
    </div>
  );
}
