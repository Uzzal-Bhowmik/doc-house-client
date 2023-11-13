import React from "react";
import { Spinner } from "@nextui-org/react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading === true) {
    return (
      <Spinner
        color="success"
        size="lg"
        className="block my-40 text-center w-fit mx-auto"
      />
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
