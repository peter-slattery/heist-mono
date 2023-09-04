import { ApiClient } from "@heist/common/contracts"
import { authenticatedFetch } from "./utils/authenticatedFetch"

const API_ROOT = "/.netlify/functions"

export const makeApiClient = (jwt: string | null) => {
  const result: ApiClient = {
    userProfileGet: async (_req) => {
      const resp = await authenticatedFetch(jwt, `${API_ROOT}/userProfileGet`, {
        method: "GET",
      })
      return resp.json()
    },
    userProfileCreate: async (_req) => {
      const resp = await authenticatedFetch(
        jwt,
        `${API_ROOT}/userProfileCreate`,
        {
          method: "POST",
        }
      )
      return resp.json()
    },
    userPurchasesGet: async (_req) => {
      const resp = await authenticatedFetch(
        jwt,
        `${API_ROOT}/userPurchasesGet`,
        {
          method: "POST",
          body: JSON.stringify(_req),
        }
      )
      console.log("Resp", resp)
      return resp.json()
    },
    userPurchaseCreate: async (_req) => {
      const resp = await authenticatedFetch(
        jwt,
        `${API_ROOT}/userPurchaseCreate`,
        {
          method: "POST",
          body: JSON.stringify(_req),
        }
      )
      return resp.json()
    },
  }
  return result
}
