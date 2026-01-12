import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      workbox: {
        // allow larger route chunks (CheckoutInfo) to be precached
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        // 離線快取策略
        runtimeCaching: [
          {
            // 圖片快取策略
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 天
              },
            },
          },
          {
            // API 請求快取策略
            urlPattern: /\/api\/.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5, // 5 分鐘
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            // 靜態資源快取
            urlPattern: /\.(?:js|css)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-resources",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 天
              },
            },
          },
        ],
      },
      manifest: {
        name: "Cultural Market E-commerce",
        short_name: "CulturalMarket",
        description:
          "An e-commerce platform for cultural and creative market vendors",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    // Bundle 分析器 - 建置時產生報告
    visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }) as PluginOption,
  ],
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
    // 使用 modern Sass API
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // 分割 chunk 優化
    rollupOptions: {
      output: {
        manualChunks: {
          // 將 vendor 分離
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["framer-motion"],
          "data-vendor": ["@tanstack/react-query", "zustand", "axios"],
          "form-vendor": ["react-hook-form", "zod", "@hookform/resolvers"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
