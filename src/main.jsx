import React from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App.jsx";
import "./styles.css";
import "./theme.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* reducedMotion="user" honours prefers-reduced-motion for transforms */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>
);
