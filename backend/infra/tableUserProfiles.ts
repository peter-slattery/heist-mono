import { client as dynamoDbClient } from "../dynamoDbClient"
import { DaydreamOptionKey, UserProfile } from "@heist/common/types"

export const tableUserProfiles = {
  create: async (userProfile: UserProfile) => {
    return dynamoDbClient.putItem({
      TableName: "user-profiles",
      Item: {
        userId: userProfile.userId,
        name: userProfile.name,
        daydreamOption: userProfile.daydreamOption,
        daydreamDate: userProfile.daydreamDate,
      },
    })
  },
  getItem: async (userId: string): Promise<UserProfile | null> => {
    console.log("Getting item", userId)
    const res = await dynamoDbClient.getItem({
      TableName: "user-profiles",
      Key: {
        userId,
      },
    })
    console.log("Got Item", res.Item)
    if (!res.Item) return null
    const { Item } = res
    return {
      userId: Item.userId.S!,
      name: Item.name.S!,
      daydreamOption: Item.daydreamOption?.S as DaydreamOptionKey,
      daydreamDate: Item.daydreamDate?.S,
    }
  },
}
