import { Handler } from "@netlify/functions"
import { v4 as uuidv4 } from "uuid"

export const handler: Handler = async function(event) {
  if (!event.body) {
    return {
      statusCode: 400, // Bad Request
    }
  }
  const user = JSON.parse(event.body).user;
  const userId = uuidv4()
  console.log("User Signup")
  console.log(user)
  console.log("User Id", userId)

  return {
    body: JSON.stringify({
      ...user,
      user_metadata: {
        ...user.user_metadata,
        userId,
      }
    }),
    statusCode: 200,
  }
}