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
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute/AdminRoute";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import MyReview from "../pages/Dashboard/MyReview/MyReview";
import ManageDoctors from "../pages/Dashboard/ManageDoctors/ManageDoctors";
import AddDoctor from "../pages/Dashboard/AddDoctor/AddDoctor";
import AllAppointments from "../pages/Dashboard/AllApointments/AllAppointments";

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
            path: "userhome",
            element: <UserHome />,
          },
          {
            path: "myAppointments",
            element: <MyAppointments />,
          },
          {
            path: "paymentHistory",
            element: <PaymentHistory />,
          },
          {
            path: "myReview",
            element: <MyReview />,
          },
          {
            path: "adminhome",
            element: (
              <AdminRoute>
                <AdminHome />
              </AdminRoute>
            ),
          },
          {
            path: "allUsers",
            element: (
              <AdminRoute>
                <AllUsers />
              </AdminRoute>
            ),
          },
          {
            path: "allAppointments",
            element: (
              <AdminRoute>
                <AllAppointments />
              </AdminRoute>
            ),
          },
          {
            path: "allDoctors",
            element: (
              <AdminRoute>
                <ManageDoctors />
              </AdminRoute>
            ),
          },
          {
            path: "addDoctor",
            element: (
              <AdminRoute>
                <AddDoctor />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
