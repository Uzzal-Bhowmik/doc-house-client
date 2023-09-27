import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../pages/Shared/Navigation/Navigation";
import Footer from "../pages/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const pathname = useLocation().pathname;
  const isLogin = pathname.includes("login") || pathname.includes("register");
  return (
    <div>
      <Navigation />
      <Outlet />
      {!isLogin && <Footer />}

      <Toaster
        toastOptions={{
          duration: 3500,
          style: {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
};

export default MainLayout;
