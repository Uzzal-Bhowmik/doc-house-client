import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./provider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="light text-foreground bg-background">
        <HelmetProvider>
          <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
          </AuthProvider>
        </HelmetProvider>
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
