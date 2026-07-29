// client/vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite"; 

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      disableType: true,
      autoCodeSplitting: true,
    }),
    react(),
  ],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },

      "/uploads": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
