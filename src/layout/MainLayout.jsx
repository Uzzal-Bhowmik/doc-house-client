import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../pages/Shared/Navigation/Navigation";
import Footer from "../pages/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
