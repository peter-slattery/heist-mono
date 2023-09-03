import fs from "fs"
import path from "path"
import { getEnv, Env } from "../../utils/env"
import { client as dynamoDbClient } from "../../utils/dynamoDbClient"

const getMigrationsTableName = (env: Env) => `heist-${env.HEIST_STAGE}-migrations`

const initMigrations = async (env: Env) => {
  try {
    await dynamoDbClient.createTable({
      TableName: getMigrationsTableName(env),
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
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    })
  } catch (e) {
    console.log(`Migration Table already created for stage: ${env.HEIST_STAGE}`)
  }
}

const shouldRunMigration = async (filename: string, env: Env): Promise<boolean> => {
  const item = await dynamoDbClient.getItem({
    TableName: getMigrationsTableName(env),
    Key: {
      migrationId: {
        S: filename
      }
    }
  })
  return item.Item === undefined
}

const migrationFileRunSuccess = async (filename: string, env: Env) => {
  await dynamoDbClient.putItem({
    TableName: getMigrationsTableName(env),
    Item: {
      migrationId: {
        S: filename
      }
    }
  })
}

const main = async () => {
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
    if (await shouldRunMigration(migrationFile, env)) {
      console.log(`Running Migration: ${migrationFile}`)
      if (await (await import(`./${migrationFile}`)).up(dynamoDbClient, env)) {
        await migrationFileRunSuccess(migrationFile, env)
      }
    }
  }
}

main()