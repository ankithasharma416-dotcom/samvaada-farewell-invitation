import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" works on Vercel/Netlify and GitHub Pages alike.
// For GitHub Pages you can also set base: "/samvaada-farewell-invitation/".
export default defineConfig({
  plugins: [react()],
  base: "./",
});
