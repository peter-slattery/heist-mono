import { config as baseConfig } from "dotenv"

export type Env = {
  HEIST_AWS_ENDPOINT?: string
  HEIST_AWS_ACCESS_KEY_ID: string
  HEIST_AWS_SECRET_ACCESS_KEY: string
  HEIST_S3_AWS_ACCESS_KEY_ID: string
  HEIST_S3_AWS_SECRET_ACCESS_KEY: string
  HEIST_AWS_REGION: string
  HEIST_PUBLIC_STAGE: "local" | "dev" | "prod"

  HEIST_PLUGIN_ENDPOINT: string
}

let configCalled = false
export const config = (...args: Parameters<typeof baseConfig>) => {
  configCalled = true
  return baseConfig(...args)
}

export const getEnv = (): Env => {
  if (!configCalled) config()
  const result = process.env as Env
  if (!result.HEIST_PUBLIC_STAGE) result.HEIST_PUBLIC_STAGE = "dev"
  return result
}
