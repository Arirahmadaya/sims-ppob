import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TopUp from "./pages/TopUp";
import Transaction from "./pages/Transaction";
import Akun from "./pages/Akun";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

const App = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />, // Lindungi semua rute di dalamnya
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/topup",
            element: <TopUp />,
          },
          {
            path: "/transaction",
            element: <Transaction />,
          },
          {
            path: "/akun",
            element: <Akun />,
          },
          {
            path: "/history",
            element: <History />,
          },
        ],
      },
      {
        path: "/register",
        element: <Register />, // Tidak dilindungi
      },
      {
        path: "/login",
        element: <Login />, // Tidak dilindungi
      },
    ],
  },
]);

export default App;
