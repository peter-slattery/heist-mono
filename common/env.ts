import { config } from "dotenv"
config()

export type Env = {
  HEIST_AWS_ENDPOINT?: string
  HEIST_AWS_ACCESS_KEY_ID: string
  HEIST_AWS_SECRET_ACCESS_KEY: string
  HEIST_AWS_REGION: string
  HEIST_STAGE: "local" | "dev" | "prod"
}

export const getEnv = (): Env => {
  const result = process.env as Env
  if (!result.HEIST_STAGE) result.HEIST_STAGE = "dev"
  return result
}