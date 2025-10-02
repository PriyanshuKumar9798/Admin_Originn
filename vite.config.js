// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ✅ If you're using Tailwind via PostCSS (which is typical), you don't need to import `tailwindcss` here.
export default defineConfig({
  plugins: [ react(),tailwindcss()],
});
