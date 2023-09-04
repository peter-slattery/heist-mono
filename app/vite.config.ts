import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src",
  build: {
    outDir: "../../dist",
  },
  envDir: path.resolve(__dirname, "../"),
  envPrefix: "HEIST_PUBLIC_",
  resolve: {
    alias: {
      "@heist": path.resolve(__dirname, "../"),
      "@app": path.resolve(__dirname, "./src/"),
    },
  },
})
