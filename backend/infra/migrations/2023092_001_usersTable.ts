import { CreateTableInput } from "@aws-sdk/client-dynamodb"
import { HeistDynamoDBClient } from "../../dynamoDbClient"

export const up = async (
  dynamoDbClient: HeistDynamoDBClient
): Promise<boolean> => {
  const table: CreateTableInput = {
    TableName: `user-profiles`,
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
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  }
  const result = await dynamoDbClient.createTable(table)
  return result.TableDescription !== undefined
}
