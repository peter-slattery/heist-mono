import { UserPurchasesGetHandler } from "@heist/common/contracts"
import { getUserInfo, makeAuthenticatedHandler } from "../functionHandler"
import { tableUserPurchases } from "../infra/tableUserPurchases"

export const handler = makeAuthenticatedHandler<UserPurchasesGetHandler>(
  async (_req, _event, context) => {
    const { userId } = getUserInfo(context)
    // TODO: include the purchaseId if provided
    const purchases = await tableUserPurchases.getItemsForUser(userId)
    console.log(purchases)
    return {
      purchases,
    }
  }
)
