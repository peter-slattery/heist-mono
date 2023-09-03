import {
  Handler,
  HandlerContext,
  HandlerEvent,
  HandlerResponse,
} from "@netlify/functions"
import { HeistUser } from "../common/types"

const makeResponse = (statusCode: number, body: unknown): HandlerResponse => {
  const result: HandlerResponse = {
    statusCode,
  }
  if (body) result.body = JSON.stringify(body)
  return result
}

export const makeHandler = (handler: Handler): Handler => {
  return async (event, context) => {
    try {
      const result = await handler(event, context)
      return makeResponse(200, result)
    } catch (e) {
      return makeResponse(400, e)
    }
  }
}

type AuthenticatedHandlerContext = Omit<HandlerContext, "clientContext"> & {
  clientContext: {
    user: HeistUser
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}
export type AuthenticatedHandler = (
  event: HandlerEvent,
  context: AuthenticatedHandlerContext
) => unknown | undefined

export const makeAuthenticatedHandler = (
  handler: AuthenticatedHandler
): Handler => {
  return async (event, context) => {
    if (!context.clientContext) {
      return makeResponse(
        400,
        "No clientContext provided for authenticated route"
      )
    }
    try {
      const result = await handler(
        event,
        context as AuthenticatedHandlerContext
      )
      return makeResponse(200, result)
    } catch (e) {
      console.log("Error", e)
      return makeResponse(400, e)
    }
  }
}
