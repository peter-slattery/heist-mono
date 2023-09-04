import { client as dynamoDbClient } from "../dynamoDbClient"
import { Purchase } from "@heist/common/types"

export const tableUserPurchases = {
  create: async (purchase: Purchase) => {
    return dynamoDbClient.putItem({
      TableName: "user-purchases",
      Item: purchase,
    })
  },
  getItemsForUser: async (userId: string): Promise<Purchase[]> => {
    const res = await dynamoDbClient.query({
      TableName: "user-purchases",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
      },
    })
    const items = res.Items ?? []
    const result = items.map((item) => {
      const purchase: Purchase = {
        userId: item.userId.S!,
        purchaseId: item.purchaseId.S!,
        name: item.name.S!,
        price: item.price.S!,
        imageUrl: item.imageUrl.S!,
        productUrl: item.productUrl.S!,
      }
      return purchase
    })
    return result
  },
  getItem: async (
    userId: string,
    purchaseId: string
  ): Promise<Purchase | null> => {
    console.log("Getting item", userId)
    const res = await dynamoDbClient.getItem({
      TableName: "user-purchases",
      Key: {
        userId,
        purchaseId,
      },
    })
    console.log("Got Item", res.Item)
    if (!res.Item) return null
    const { Item } = res
    return {
      userId: Item.userId.S!,
      purchaseId: Item.purchaseId.S!,
      name: Item.name.S!,
      price: Item.cost.S!,
      imageUrl: Item.imageUrl.S!,
      productUrl: Item.productUrl.S!,
    }
  },
}
