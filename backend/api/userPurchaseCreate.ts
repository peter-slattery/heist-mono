import { v4 as uuidv4 } from "uuid"
import { UserPurchaseCreateHandler } from "@heist/common/contracts"
import { getUserInfo, makeAuthenticatedHandler } from "../functionHandler"
import { Purchase } from "@heist/common/types"
import { tableUserPurchases } from "../infra/tableUserPurchases"
import { makeS3Client } from "../s3Client"
import { getEnv } from "@heist/common/env"
import { PutObjectCommand } from "@aws-sdk/client-s3"

export const handler = makeAuthenticatedHandler<UserPurchaseCreateHandler>(
  async (req, _event, context) => {
    const { userId } = getUserInfo(context)

    const image = await fetch(req.imageUrl)

    const env = getEnv()
    const s3Client = makeS3Client(env)

    // TODO: check if the image exists
    let imageUrl = req.imageUrl
    try {
      const Bucket = `heist-${env.HEIST_PUBLIC_STAGE}-storage`
      const imageIdentifier = req.imageUrl
        .replace("https://", "")
        .replace("http://", "")
        .split("/")
        .join("_")
      const command = new PutObjectCommand({
        Bucket,
        Key: `purchaseImages/${imageIdentifier}`,
        Body: new Uint8Array(await image.arrayBuffer()),
      })
      await s3Client.send(command)
      imageUrl = `https://${Bucket}.s3.us-east-2.amazonaws.com/purchaseImages/${imageIdentifier}`
    } catch (e) {
      console.log("Unable to save purchase image")
      console.log(e)
    }

    const purchase: Purchase = {
      userId,
      purchaseId: uuidv4(),
      name: req.name,
      price: req.price,
      imageUrl: imageUrl,
      productUrl: req.productUrl,
    }
    const r = await tableUserPurchases.create(purchase)
    console.log("Complete", r)

    return {
      purchaseId: purchase.purchaseId,
    }
  }
)
