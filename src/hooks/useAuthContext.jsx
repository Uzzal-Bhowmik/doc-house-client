import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
