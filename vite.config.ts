import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://lawrence565.github.io/e-commerce-demo/",
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
