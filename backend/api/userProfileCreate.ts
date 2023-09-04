import { tableUserProfiles } from "../infra/tableUserProfiles"
import { getUserInfo, makeAuthenticatedHandler } from "../functionHandler"
import { UserProfileCreateHandler } from "@heist/common/contracts"

export const handler = makeAuthenticatedHandler<UserProfileCreateHandler>(
  async (_request, _event, context) => {
    const { userId, full_name } = getUserInfo(context)
    await tableUserProfiles.create({
      userId: userId,
      name: full_name ?? "Unknown",
    })
    const profile = await tableUserProfiles.getItem(userId)
    return {
      profile: profile ?? undefined,
    }
  }
)
