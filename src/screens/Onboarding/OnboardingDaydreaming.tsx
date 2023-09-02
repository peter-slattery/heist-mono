import { BodyButtonSmall, H4 } from "../../designSystem/Typography"
import { createUseStyles, useTheme } from "../../theme"
import { useOnboarding, daydreamOptions } from "./OnboardingContext"

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
    padding: "13px 17px",
    border: "none",
    cursor: "pointer",
  }
}))

export const OnboardingDaydreaming = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const { setDaydreamOption, advance } = useOnboarding()

  return (
    <div className={styles.layout}>
      <div className={styles.contentBox}>
        <H4>What’re you daydreaming of? Choose one goal to start, this will help us figure out to get you there.</H4>
        <div className={styles.buttonRow}>
          {
            daydreamOptions.map((option) => (
              <button 
                className={styles.button} 
                key={option.key} 
                onClick={() => {
                  setDaydreamOption(option.key)
                  advance()
                }}
              >
                <BodyButtonSmall>{ option.name }</BodyButtonSmall>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}