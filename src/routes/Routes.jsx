import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DynamicDoctor from "../pages/DynamicDoctor/DynamicDoctor";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Appointments from "../pages/Appointments/Appointments";
import DashboardLayout from "../layout/DashboardLayout";
import MyAppointments from "../pages/Dashboard/MyAppointments/MyAppointments";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";

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
        loader: async ({ params }) =>
          await fetch(`http://localhost:5000/doctors/${params.id}`),
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
      {
        path: "appointment",
        element: (
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        ),
      },

      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "myAppointments",
            element: <MyAppointments />,
          },
          {
            path: "allUsers",
            element: <AllUsers />,
          },
        ],
      },
    ],
  },
]);

export default router;
