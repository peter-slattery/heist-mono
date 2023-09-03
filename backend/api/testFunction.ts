import { Handler } from "@netlify/functions"
import { tableUserProfiles } from "../infra/tableUserProfiles"

export const handler: Handler = async (_event, context) => {
  if (context.clientContext) {
    console.log(context.clientContext)

    const profile = await tableUserProfiles.getItem(
      context.clientContext.user.user_metadata.userId
    )
    console.log(profile)

    return {
      statusCode: 200,
      body: "Got it",
    }
  } else {
    return {
      statusCode: 200,
      body: "No context",
    }
  }
}
