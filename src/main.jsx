import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
