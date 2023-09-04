import { Handler, HandlerResponse } from "@netlify/functions"
import {
  ApiAuthenticatedHandler,
  AuthenticatedHandlerContext,
} from "@heist/common/contracts"

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

export const makeAuthenticatedHandler = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  THandler extends ApiAuthenticatedHandler<any, any>
>(
  handler: THandler
): Handler => {
  return async (event, context) => {
    if (!context.clientContext) {
      return makeResponse(
        400,
        "No clientContext provided for authenticated route"
      )
    }
    try {
      const request = (
        event.body ? JSON.parse(event.body) : {}
      ) as Parameters<THandler>[0]
      const result = await handler(
        request,
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

export const getUserInfo = (
  context: AuthenticatedHandlerContext
): { userId: string; full_name?: string } => {
  const user = context.clientContext.user
  if (!user.user_metadata.userId) throw new Error("No userId")
  return {
    userId: user.user_metadata.userId,
    full_name: user.user_metadata.full_name,
  }
}
