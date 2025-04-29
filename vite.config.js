import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/2024-hex-react-training-week03/",
  plugins: [react()],
});
