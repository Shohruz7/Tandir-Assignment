import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// react + tailwind v4. served from the Express server root in production,
// so base is "/". in dev, proxy the REST API to the backend on :5001.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // macOS AirPlay Receiver uses :5000, so the API runs on :5001
      "/api": "http://localhost:5001",
    },
  },
});
