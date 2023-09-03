import { tableUserProfiles } from "../infra/tableUserProfiles"
import { makeAuthenticatedHandler } from "../functionHandler"
import { UserProfileGetHandler } from "@heist/common/contracts"

export const handler = makeAuthenticatedHandler<UserProfileGetHandler>(
  async (_request, _event, context) => {
    const user = context.clientContext.user
    if (!user.user_metadata.userId) throw new Error("No userId")
    const profile = await tableUserProfiles.getItem(user.user_metadata.userId)
    return { profile: profile ?? undefined }
  }
)
