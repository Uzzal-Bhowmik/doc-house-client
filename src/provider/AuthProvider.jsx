import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // sign up with email/pass
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const updateUserProfile = (name, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  // sign in with email/pass
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign out
  const logout = () => {
    return signOut(auth);
  };

  // auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // setUser(currentUser);
      if (currentUser) {
        axios
          .post("http://localhost:5000/jwt", {
            userEmail: currentUser.email,
          })
          .then((res) => {
            localStorage.setItem("doc-house-jwt-token", res.data.token); // set jwt token to local-storage when user logged in

            setUser(currentUser);
            setIsLoading(false);
          });
      } else {
        localStorage.removeItem("doc-house-jwt-token"); // remove jwt token when user logged out

        setUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const value = { signIn, signUp, logout, updateUserProfile, user, isLoading };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
