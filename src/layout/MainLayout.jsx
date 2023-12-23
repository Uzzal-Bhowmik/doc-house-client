import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../pages/Shared/Navigation/Navigation";
import Footer from "../pages/Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "../component/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  const pathname = useLocation().pathname;
  const hideFooter =
    pathname.includes("login") ||
    pathname.includes("register") ||
    pathname.includes("dashboard");
  return (
    <div>
      <ScrollToTop />
      <Navigation />
      <Outlet />
      {!hideFooter && <Footer />}

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
