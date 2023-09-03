import { H4 } from "../../designSystem/Typography"
import { createUseStyles, useTheme } from "../../theme"
import { useOnboarding } from "./OnboardingContext"
import { DaydreamOptionKey } from "@heist/common/types"

const useStyles = createUseStyles(() => ({
  layout: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentBox: {
    maxWidth: 425,
    textAlign: "center",
  },
  buttonRow: {
    marginTop: 15,
    display: "flex",
    gap: 8,
  },
}))

const daydreamMessages: Record<DaydreamOptionKey, string> = {
  wedding:
    "Great, let’s get you wedding ready.\nWhen are you planning the big day to be?\n\nAn estimate is fine!",
  home: "Great, let’s get you ready to find your home.\nWhen are you planning to pull the trigger?\n\nAn estimate is fine!",
  travel:
    "Great, let’s get you travel ready.\nWhen are you planning on leaving?\n\nAn estimate is fine!",
  financial_flexibility: "Uh, Cloj, what do I put here?",
}

export const OnboardingChooseADate = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const { daydreamOption } = useOnboarding()
  if (!daydreamOption) throw new Error("daydreamOption must be set")

  const message = daydreamMessages[daydreamOption]

  return (
    <div className={styles.layout}>
      <div className={styles.contentBox}>
        <H4>{message}</H4>
        <div className={styles.buttonRow}></div>
      </div>
    </div>
  )
}
