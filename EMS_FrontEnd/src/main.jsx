import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContext from "./context/authContext.jsx";

// Wrap the App component with the authContext component
createRoot(document.getElementById("root")).render(
  <AuthContext>
    <App />
  </AuthContext>
);
