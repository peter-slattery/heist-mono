import fs from "fs"
import path from "path"
import esbuild from "esbuild"

import { config, getEnv } from "../common/env"
config({
  path: path.resolve(__dirname, "../.env"),
})
const env = getEnv()

esbuild
  .build({
    entryPoints: ["./chrome/main.ts", "./chrome/content.ts"],
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV !== "production",
    target: ["chrome58", "firefox57"],
    outdir: "./build/chrome",
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
      HEIST_PLUGIN_ENDPOINT: `"${env.HEIST_PLUGIN_ENDPOINT}"`,
    },
  })
  .then(() => {
    fs.copyFileSync(
      path.resolve(__dirname, "chrome/manifest.json"),
      path.resolve(__dirname, "build/chrome/manifest.json")
    )
  })
  .catch(() => process.exit(1))
