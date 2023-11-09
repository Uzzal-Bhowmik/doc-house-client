import React from "react";
import useAdmin from "../../hooks/useAdmin";
import useAuthContext from "../../hooks/useAuthContext";
import { Spinner } from "@nextui-org/react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuthContext();
  const [isAdmin, adminLoading] = useAdmin();

  if (isLoading || adminLoading) {
    return <Spinner size="lg" />;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={"/404"} />;
};

export default AdminRoute;
