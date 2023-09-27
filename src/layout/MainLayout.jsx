import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../pages/Shared/Navigation/Navigation";
import Footer from "../pages/Shared/Footer/Footer";

const MainLayout = () => {
  const pathname = useLocation().pathname;
  const isLogin = pathname.includes("login") || pathname.includes("register");
  return (
    <div>
      <Navigation />
      <Outlet />
      {!isLogin && <Footer />}
    </div>
  );
};

export default MainLayout;
