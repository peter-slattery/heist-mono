import AWS, { DynamoDB, AttributeValue } from "@aws-sdk/client-dynamodb"
import { getEnv } from "../common/env"

const {
  HEIST_AWS_ENDPOINT,
  HEIST_AWS_REGION,
  HEIST_AWS_ACCESS_KEY_ID,
  HEIST_AWS_SECRET_ACCESS_KEY,
  HEIST_STAGE,
} = getEnv()

export const dynamoDb = new DynamoDB({
  endpoint: HEIST_AWS_ENDPOINT,
  credentials: {
    accessKeyId: HEIST_AWS_ACCESS_KEY_ID,
    secretAccessKey: HEIST_AWS_SECRET_ACCESS_KEY,
  },
  region: HEIST_AWS_REGION,
})

type PutItemCommandInput = {
  TableName: string
  Item: Record<string, unknown>
}

type GetItemCommandInput = {
  TableName: string
  Key: Record<string, unknown>
}

export const translateObjectToAttributeValueRecord = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  o: any
): Record<string, AttributeValue> => {
  const result = Object.keys(o).reduce<Record<string, AttributeValue>>(
    (acc, key) => {
      const value = o[key]
      if (value === undefined || value === null) return acc
      let entry: AttributeValue
      if (typeof value === "string") {
        entry = { S: value }
      } else {
        throw new Error(
          `Unknow type when putting item: ${typeof value} for value: ${key} = ${value}`
        )
      }
      acc[key] = entry
      return acc
    },
    {}
  )
  return result
}

const getTableNameForEnv = (tableName: string): string => {
  return `heist-${HEIST_STAGE}-${tableName}`
}

export const client = {
  createTable: (input: AWS.CreateTableCommandInput) => {
    if (input.TableName!.includes("heist-")) {
      throw new Error(
        "Attempting to create a table name that already includes the environment specifier"
      )
    }
    input.TableName = getTableNameForEnv(input.TableName!)
    return dynamoDb.createTable(input)
  },
  putItem: ({ TableName, Item }: PutItemCommandInput) => {
    const input: AWS.PutItemCommandInput = {
      TableName: getTableNameForEnv(TableName),
      Item: translateObjectToAttributeValueRecord(Item),
    }
    return dynamoDb.putItem(input)
  },
  getItem: ({ TableName, Key }: GetItemCommandInput) => {
    const input: AWS.GetItemCommandInput = {
      TableName: getTableNameForEnv(TableName),
      Key: translateObjectToAttributeValueRecord(Key),
    }
    return dynamoDb.getItem(input)
  },
} as const

export type HeistDynamoDBClient = typeof client
