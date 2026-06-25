import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// nothing fancy here, just react + tailwind v4
// base is set so it works on github pages too (project subpath)
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
