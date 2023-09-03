import { PropsWithChildren, useContext, useState } from "react"
import { createContextWithoutDefault } from "../../utils/createDefaultContext"
import { DaydreamOptionKey } from "../../../common/types"
import { useLocation, useNavigate } from "react-router-dom"

type DaydreamOption = { name: string; key: DaydreamOptionKey }

export const daydreamOptions: DaydreamOption[] = [
  { name: "Wedding", key: "wedding" },
  { name: "Home", key: "home" },
  { name: "Travel", key: "travel" },
  { name: "Financial Flexibility", key: "financial_flexibility" },
]

type OnboardingContext = {
  daydreamOption: DaydreamOptionKey | null
  setDaydreamOption: (value: DaydreamOptionKey | null) => void
  advance: () => void
}

const Context = createContextWithoutDefault<OnboardingContext>()

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [daydreamOption, setDaydreamOption] =
    useState<DaydreamOptionKey | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  const advance = () => {
    const lastElement = location.pathname.split("/").slice(-1)[0]
    const currentIndex = parseInt(lastElement)
    if (isNaN(currentIndex)) {
      navigate("/onboarding/1")
    } else {
      navigate(`/onboarding/${currentIndex + 1}`)
    }
  }

  return (
    <Context.Provider
      value={{
        daydreamOption,
        setDaydreamOption,
        advance,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useOnboarding = () => useContext(Context)
