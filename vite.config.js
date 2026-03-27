
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // or "./" if no src
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-three": ["three", "postprocessing"],
          "vendor-mui": ["@mui/material", "@mui/icons-material"],
          "vendor-chakra": ["@chakra-ui/react", "@emotion/react", "@emotion/styled"],
          "vendor-gsap": ["gsap"],
          "vendor-lottie": ["lottie-react"],
        },
      },
    },
  },
});
