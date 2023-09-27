import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Spinner } from "@nextui-org/react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
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
