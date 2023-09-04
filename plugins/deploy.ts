import fs from "fs"
import path from "path"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { config, getEnv } from "../common/env"
import JSZip from "jszip"

config({ path: "../.env" })
const main = async () => {
  const env = getEnv()
  const s3Client = new S3Client({
    region: env.HEIST_AWS_REGION,
    credentials: {
      accessKeyId: env.HEIST_S3_AWS_ACCESS_KEY_ID,
      secretAccessKey: env.HEIST_S3_AWS_SECRET_ACCESS_KEY,
    },
  })

  console.log("Zipping chrome plugin...")
  const chromePluginPath = path.resolve(__dirname, "build/chrome")
  const chromePluginZip = new JSZip()
  chromePluginZip.folder("plugin")
  fs.readdirSync(chromePluginPath).forEach((file) => {
    const fp = path.resolve(chromePluginPath, file)
    const data = fs.readFileSync(fp)
    chromePluginZip.file(`plugin/${file}`, data)
  })
  const data = await chromePluginZip.generateAsync({
    type: "uint8array",
    streamFiles: true,
  })
  console.log("  Done")

  console.log("Uploading chrome plugin...")
  try {
    const command = new PutObjectCommand({
      Bucket: `heist-${env.HEIST_PUBLIC_STAGE}-storage`,
      Key: `heistChromePlugin.zip`,
      Body: data,
    })
    await s3Client.send(command)
    console.log("  Uploaded chrome plugin")
  } catch (e) {
    console.log("Error uploading chrome plugin:")
    console.log(e)
    return 1
  }

  return 0
}

main().then((result) => {
  if (result) process.exit(1)
})
