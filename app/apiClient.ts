import { ApiClient } from "@heist/common/contracts"
import { authenticatedFetch } from "./utils/authenticatedFetch"

export const makeApiClient = (jwt: string | null) => {
  const result: ApiClient = {
    userProfileGet: async (_req) => {
      const resp = await authenticatedFetch(jwt, "/api/userProfileGet", {
        method: "GET",
      })
      return resp.json()
    },
    userProfileCreate: async (_req) => {
      const resp = await authenticatedFetch(jwt, "/api/userProfilesCreate", {
        method: "POST",
      })
      return resp.json()
    },
  }
  return result
}
