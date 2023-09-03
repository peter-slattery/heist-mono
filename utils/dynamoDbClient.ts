import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { getEnv } from "./env"

const { HEIST_AWS_ENDPOINT, HEIST_AWS_REGION, HEIST_AWS_ACCESS_KEY_ID, HEIST_AWS_SECRET_ACCESS_KEY } = getEnv()

export const client = new DynamoDB({
  endpoint: HEIST_AWS_ENDPOINT,
  credentials: {
    accessKeyId: HEIST_AWS_ACCESS_KEY_ID,
    secretAccessKey: HEIST_AWS_SECRET_ACCESS_KEY
  },
  region: HEIST_AWS_REGION,
})