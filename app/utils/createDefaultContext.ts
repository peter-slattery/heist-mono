import { Context, createContext } from "react"

// standardizes how to make a context with no default value
export const createContextWithoutDefault = <T,>(): Context<T> =>
  createContext<T>(undefined as unknown as T)