import { HeistDynamoDBClient } from "../../dynamoDbClient"
import {
  S3Client,
  CreateBucketCommand,
  PutPublicAccessBlockCommand,
  PutBucketPolicyCommand,
  BucketAlreadyOwnedByYou,
  BucketAlreadyExists,
} from "@aws-sdk/client-s3"
import { getEnv } from "../../../common/env"

const env = getEnv()
const stage = env.HEIST_PUBLIC_STAGE

export const up = async (
  _dynamoDbClient: HeistDynamoDBClient
): Promise<boolean> => {
  const s3Client = new S3Client({
    region: env.HEIST_AWS_REGION,
    credentials: {
      accessKeyId: env.HEIST_S3_AWS_ACCESS_KEY_ID,
      secretAccessKey: env.HEIST_S3_AWS_SECRET_ACCESS_KEY,
    },
  })

  const Bucket = `heist-${stage}-storage`
  try {
    const command = new CreateBucketCommand({
      Bucket,
      CreateBucketConfiguration: {
        LocationConstraint: env.HEIST_AWS_REGION,
      },
    })
    const result = await s3Client.send(command)
    console.log("Bucket created", result)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (
      !(
        e.Code === "BucketAlreadyOwnedByYou" || e.Code === "BucketAlreadyExists"
      )
    ) {
      console.log(e)
      return false
    }
  }

  try {
    const command = new PutPublicAccessBlockCommand({
      Bucket,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        IgnorePublicAcls: false,
        BlockPublicPolicy: false,
        RestrictPublicBuckets: false,
      },
    })
    await s3Client.send(command)
  } catch (e) {
    console.log(e)
    return false
  }

  try {
    const command = new PutBucketPolicyCommand({
      Policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "PublicReadGetObject",
            Effect: "Allow",
            Principal: "*",
            Action: "s3:GetObject",
            Resource: `arn:aws:s3:::${Bucket}/*`,
          },
        ],
      }),
      // Apply the preceding policy to this bucket.
      Bucket,
    })
    await s3Client.send(command)
  } catch (e) {
    console.log(e)
    return false
  }

  return true
}
