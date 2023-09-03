import { DynamoDB, CreateTableInput } from "@aws-sdk/client-dynamodb";
import { Env } from "../../utils/env";

export const up = async (dynamoDbClient: DynamoDB, env: Env): Promise<boolean> => {
  const table: CreateTableInput = {
    TableName: `heist-${env.HEIST_STAGE}-user-profiles`,
    AttributeDefinitions: [
      {
        AttributeName: "userId",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "userId",
        KeyType: "HASH",
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
  const result = await dynamoDbClient.createTable(table)
  return result.TableDescription !== undefined
}