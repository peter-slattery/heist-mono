import { tableUserProfiles } from "../infra/tableUserProfiles"
import { makeAuthenticatedHandler } from "../functionHandler"

export const handler = makeAuthenticatedHandler(async (_event, context) => {
  const user = context.clientContext.user
  if (!user.user_metadata.userId) throw new Error("No userId")
  const result = await tableUserProfiles.getItem(user.user_metadata.userId)
  if (result) {
    return {
      profile: result,
    }
  }
})
