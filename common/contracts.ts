import { type HandlerContext, type HandlerEvent } from "@netlify/functions"

import { HeistUser, UserProfile } from "./types"

export type AuthenticatedHandlerContext = Omit<
  HandlerContext,
  "clientContext"
> & {
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

export type ApiHandler<TRequest, TResponse, TContext = HandlerContext> = (
  request: TRequest,
  event: HandlerEvent,
  context: TContext
) => Promise<TResponse>

export type ApiAuthenticatedHandler<TRequest, TResponse> = ApiHandler<
  TRequest,
  TResponse,
  AuthenticatedHandlerContext
>

export type UserProfileGetRequest = object
export type UserProfileGetResponse = {
  profile?: UserProfile
}
export type UserProfileGetHandler = ApiAuthenticatedHandler<
  UserProfileGetRequest,
  UserProfileGetResponse
>

export type UserProfileCreateHandler = ApiAuthenticatedHandler<
  UserProfileGetRequest,
  UserProfileGetResponse
>

//////////////// API ////////////////

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClientHandler<THandler extends ApiHandler<any, any, any>> = (
  req: Parameters<THandler>[0]
) => ReturnType<THandler>

export type ApiClient = {
  userProfileGet: ApiClientHandler<UserProfileGetHandler>
  userProfileCreate: ApiClientHandler<UserProfileCreateHandler>
}
