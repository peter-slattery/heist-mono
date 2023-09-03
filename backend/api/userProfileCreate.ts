import { tableUserProfiles } from "../infra/tableUserProfiles"
import { makeAuthenticatedHandler } from "../functionHandler"

export const handler = makeAuthenticatedHandler(async (_event, context) => {
  const user = context.clientContext.user
  if (!user.user_metadata.userId) throw new Error("No userId")
  tableUserProfiles.create({
    userId: user.user_metadata.userId,
    name: user.user_metadata.full_name ?? "Unknown",
  })
})
