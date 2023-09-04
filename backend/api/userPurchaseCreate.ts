import { v4 as uuidv4 } from "uuid"
import { UserPurchaseCreateHandler } from "@heist/common/contracts"
import { getUserInfo, makeAuthenticatedHandler } from "../functionHandler"
import { Purchase } from "@heist/common/types"
import { tableUserPurchases } from "../infra/tableUserPurchases"

export const handler = makeAuthenticatedHandler<UserPurchaseCreateHandler>(
  async (req, _event, context) => {
    const { userId } = getUserInfo(context)

    // TODO: download the image to an S3 bucket and
    // reference that URL instead

    const purchase: Purchase = {
      userId,
      purchaseId: uuidv4(),
      name: req.name,
      price: req.price,
      imageUrl: req.imageUrl,
      productUrl: req.productUrl,
    }
    tableUserPurchases.create(purchase)

    return {
      purchaseId: purchase.purchaseId,
    }
  }
)
