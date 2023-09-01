import { BodyButtonSmall, H4 } from "../../designSystem/Typography"
import { createUseStyles, useTheme } from "../../theme"
import { useOnboarding, daydreamOptions, DaydreamOptionKey } from "./OnboardingContext"

const useStyles = createUseStyles((theme) => ({
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
    gap: 8
  },
  button: {
    backgroundColor: theme.colors.pukeYellow,
    color: theme.colors.white,
    borderRadius: 6,
    padding: [13, 17],
    border: "none",
    cursor: "pointer",
  }
}))

const daydreamMessages: Record<DaydreamOptionKey, string> = {
  "wedding": "Great, let’s get you wedding ready.\nWhen are you planning the big day to be?\n\nAn estimate is fine!",
  "home": "Great, let’s get you ready to find your home.\nWhen are you planning to pull the trigger?\n\nAn estimate is fine!",
  "travel": "Great, let’s get you travel ready.\nWhen are you planning on leaving?\n\nAn estimate is fine!",
  "financial_flexibility": "Uh, Cloj, what do I put here?",
}

export const OnboardingChooseADate = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const { daydreamOption, advance } = useOnboarding()
  if (!daydreamOption) throw new Error("daydreamOption must be set")

  const message = daydreamMessages[daydreamOption]

  return (
    <div className={styles.layout}>
      <div className={styles.contentBox}>
        <H4>{message}</H4>
        <div className={styles.buttonRow}>
          
        </div>
      </div>
    </div>
  )
}