import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_URL,
  server: {
    allowedHosts: [
      "3dc3-2407-4d00-1c00-8841-3968-6998-2fc0-9572.ngrok-free.app",
    ],
    strictPort: true,
    cors: true,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
