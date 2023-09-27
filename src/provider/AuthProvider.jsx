import React from "react";
import { useState } from "react";
import { createContext } from "react";
import {} from "firebase";

export const AuthContext = createContext(null);
// const auth =

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // sign up with email/pass
  const signUp = (email, password) => {
    return create;
  };

  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
