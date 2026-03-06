import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Base URL is injected by the CI pipeline via VITE_BASE env var.
// For local preview just run: vite --config vite.showcase.config.ts
export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_BASE ?? "/",
});
