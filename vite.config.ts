import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "app",
  build: {
    outDir: "../dist",
  },
  resolve: {
    alias: {
      "@heist": path.resolve(__dirname, "."),
    },
  },
})
