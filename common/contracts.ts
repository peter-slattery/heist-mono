import { type HandlerContext, type HandlerEvent } from "@netlify/functions"

import { HeistUser, Purchase, UserProfile } from "./types"

export type Html_Extractor_Get_Attribute = {
  type: "getAttribute"
  selector: string
  attribute: string
}

export type Html_Extractor_Text_Content = {
  type: "textContent"
  selector: string
}

export type Html_Extractor_Desc =
  | Html_Extractor_Get_Attribute
  | Html_Extractor_Text_Content

export type Vendor_Information_Accessor = {
  id: string
  placement: string
  price: Html_Extractor_Desc
  image: Html_Extractor_Desc
  name: Html_Extractor_Desc
}

export type Vendor_Spec = {
  vendor: string
  url: string
  information_accessors?: Vendor_Information_Accessor[]
  placement: string[]
  price_id_selectors: string[]
  image_selectors: string[]
  name_selectors: string[]
}

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

export type UserPurchaseCreateRequest = {
  name: string
  price: string
  imageUrl: string
  productUrl: string
}
export type UserPurchaseCreateResponse = {
  purchaseId: string
}
export type UserPurchaseCreateHandler = ApiAuthenticatedHandler<
  UserPurchaseCreateRequest,
  UserPurchaseCreateResponse
>

export type UserPurchasesGetRequest = {
  purchaseId?: string
}
export type UserPurchasesGetResponse = {
  purchases: Purchase[]
}
export type UserPurchasesGetHandler = ApiAuthenticatedHandler<
  UserPurchasesGetRequest,
  UserPurchasesGetResponse
>

//////////////// API ////////////////

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClientHandler<THandler extends ApiHandler<any, any, any>> = (
  req: Parameters<THandler>[0]
) => ReturnType<THandler>

export type ApiClient = {
  userProfileGet: ApiClientHandler<UserProfileGetHandler>
  userProfileCreate: ApiClientHandler<UserProfileCreateHandler>

  userPurchaseCreate: ApiClientHandler<UserPurchaseCreateHandler>
  userPurchasesGet: ApiClientHandler<UserPurchasesGetHandler>
}
