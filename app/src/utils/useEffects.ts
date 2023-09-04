import { useEffect } from "react"

type UseEffectEffectArg = Parameters<typeof useEffect>[0]

export const useEffectOnMount = (effect: UseEffectEffectArg) => {
  useEffect(effect, [])
}