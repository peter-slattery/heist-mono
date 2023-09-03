import fs from "fs"
import path from "path"
import { getEnv, Env } from "../../env"
import { client as dynamoDbClient } from "../../dynamoDbClient"

const initMigrations = async (env: Env) => {
  try {
    await dynamoDbClient.createTable({
      TableName: "migrations",
      AttributeDefinitions: [
        {
          AttributeName: "migrationId",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "migrationId",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    })
  } catch (e) {
    console.log(`Migration Table already created for stage: ${env.HEIST_STAGE}`)
  }
}

const shouldRunMigration = async (filename: string): Promise<boolean> => {
  const item = await dynamoDbClient.getItem({
    TableName: "migrations",
    Key: {
      migrationId: filename,
    },
  })
  return item.Item === undefined
}

const migrationFileRunSuccess = async (filename: string) => {
  await dynamoDbClient.putItem({
    TableName: "migrations",
    Item: {
      migrationId: filename,
    },
  })
}

const main = async () => {
  console.log(" ==== Running Migrations ==== ")
  const thisFile = path.basename(__filename)
  const migrationsDir = path.resolve(__dirname)
  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((file: string) => {
      return file !== thisFile
    })
    .sort()

  const env = getEnv()
  await initMigrations(env)

  for (let i = 0; i < migrationFiles.length; i++) {
    const migrationFile = migrationFiles[i]
    if (await shouldRunMigration(migrationFile)) {
      console.log(`Running Migration: ${migrationFile}`)
      if (await (await import(`./${migrationFile}`)).up(dynamoDbClient, env)) {
        await migrationFileRunSuccess(migrationFile)
      }
    }
  }

  console.log(" ==== Migrations Complete ==== ")
}

main()
