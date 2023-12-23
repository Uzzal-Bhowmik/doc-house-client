import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-day-picker/dist/style.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="light text-foreground bg-background">
        <HelmetProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
          </AuthProvider>
        </HelmetProvider>
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
