import baseS3, { S3Client } from "@aws-sdk/client-s3"
import { Env } from "@heist/common/env"

export const makeS3Client = (env: Env) => {
  return new S3Client({
    region: env.HEIST_AWS_REGION,
    credentials: {
      accessKeyId: env.HEIST_S3_AWS_ACCESS_KEY_ID,
      secretAccessKey: env.HEIST_S3_AWS_SECRET_ACCESS_KEY,
    },
  })
}

export const s3 = baseS3
