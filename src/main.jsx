import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AdminProtectedRoute from "./AdminProtectedRoute.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import TableReservation from "./components/TableReservation.jsx";
import TableReservationProtectedRoute from "./TableReservationProtectedRoute.jsx";
import ConfirmTable from "./components/confirmTable.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/adminlogin",
    element: <AdminLogin />,
  },
  {
    path: "/confirmTable",
    element: <ConfirmTable />,
  },
  {
    path: "/tablereservation",
    element: <TableReservation />,
  },
  {
    path: "/tablereservation",
    element: <TableReservation />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminProtectedRoute>
        <Dashboard />
      </AdminProtectedRoute>
    ),
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
