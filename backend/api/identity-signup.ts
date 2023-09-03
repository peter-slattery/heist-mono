import { Handler } from "@netlify/functions"
import { v4 as uuidv4 } from "uuid"
import { tableUserProfiles } from "../infra/tableUserProfiles"

export const handler: Handler = async function (event) {
  if (!event.body) {
    return {
      statusCode: 400, // Bad Request
    }
  }
  const user = JSON.parse(event.body).user
  const userId = uuidv4()

  tableUserProfiles.create({
    userId,
    name: user.user_metadata.name,
  })

  return {
    body: JSON.stringify({
      ...user,
      user_metadata: {
        ...user.user_metadata,
        userId,
      },
    }),
    statusCode: 200,
  }
}
