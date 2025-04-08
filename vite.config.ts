import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Adjust this to match your GitHub repo name
const repoName = "Brayden-Academic-Website2";

export default defineConfig({
  base: `/${repoName}/`,
  plugins: [react()],
});
