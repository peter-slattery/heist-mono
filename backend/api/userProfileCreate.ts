import { tableUserProfiles } from "../infra/tableUserProfiles"
import { makeAuthenticatedHandler } from "../functionHandler"
import { UserProfileCreateHandler } from "@heist/common/contracts"

export const handler = makeAuthenticatedHandler<UserProfileCreateHandler>(
  async (_request, _event, context) => {
    const user = context.clientContext.user
    if (!user.user_metadata.userId) throw new Error("No userId")
    await tableUserProfiles.create({
      userId: user.user_metadata.userId,
      name: user.user_metadata.full_name ?? "Unknown",
    })
    const profile = await tableUserProfiles.getItem(user.user_metadata.userId)
    return {
      profile: profile ?? undefined,
    }
  }
)
