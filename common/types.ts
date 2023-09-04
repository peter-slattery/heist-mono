import { User } from "netlify-identity-widget"

export type DaydreamOptionKey =
  | "wedding"
  | "home"
  | "travel"
  | "financial_flexibility"

export type UserProfile = {
  userId: string
  name: string
  daydreamOption?: DaydreamOptionKey
  daydreamDate?: string
}

export interface HeistUser extends User {
  user_metadata: {
    avatar_url?: string
    full_name?: string
    userId?: string
  }
}

export type Purchase = {
  userId: string
  purchaseId: string
  name: string
  price: string
  imageUrl: string
  productUrl: string
}
