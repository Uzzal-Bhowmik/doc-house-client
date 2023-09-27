import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DynamicDoctor from "../pages/DynamicDoctor/DynamicDoctor";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "doctor/:id",
        element: (
          <PrivateRoute>
            <DynamicDoctor />
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
