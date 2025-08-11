import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-cname-after-build",
      closeBundle: () => {
        const src = path.resolve(__dirname, "CNAME");
        const dest = path.resolve(__dirname, "docs/CNAME");
        try {
          fs.copyFileSync(src, dest);
          console.log("✅ CNAME copied to docs/ after build");
        } catch (err) {
          console.warn("⚠️ Failed to copy CNAME:", err);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  server: {
    allowedHosts: [
      "professional-referred-code-polyhonic.trycloudflare.com"
    ]
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "docs"),
    emptyOutDir: true,
  },
  base: "/",
});