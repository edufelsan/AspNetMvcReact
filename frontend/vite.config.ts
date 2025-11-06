import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { mkdirSync } from "fs";

// Auto-initialize the default output directory
const outDir = "../wwwroot/build";

try {
  mkdirSync(outDir, { recursive: true });
} catch (e) {
  // Ignore if directory already exists
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173,
    host: true,
    cors: true,
    strictPort: true,
  },
  build: {
    outDir,
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.tsx")
      }
    }
  },
});