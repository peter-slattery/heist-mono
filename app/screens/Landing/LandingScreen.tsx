import classNames from "classnames"
import { PillButton } from "../../designSystem/PillButton"
import { H1, H3 } from "../../designSystem/Typography"
import { createUseStyles, useTheme } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import { Layout } from "../Layout"

const useStyles = createUseStyles((theme) => ({
  fullWidthSection: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroHeader: {
    textAlign: "center",
    color: theme.colors.black,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 26,
    paddingTop: 100,
    paddingBottom: 100,
  },
  heroHeaderText: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  videoPlaceholder: {
    backgroundColor: theme.colors.gray300,
    paddingTop: "25%",
    paddingBottom: "25%",
    color: theme.colors.gray400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))

export const LandingScreen = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const { openLoginForm } = useAuth()

  return (
    <Layout>
      <div className={styles.fullWidthSection}>
        <div className={styles.heroHeader}>
          <div className={styles.heroHeaderText}>
            <H1>Heist</H1>
            <H3>
              You do the daydreaming, <br />
              we'll do the investing to make it happen.
            </H3>
          </div>
          <PillButton onClick={() => openLoginForm("signup")}>
            Start Building
          </PillButton>
        </div>
      </div>
      <div
        className={classNames(styles.fullWidthSection, styles.videoPlaceholder)}
      >
        <H1>How It Works Video</H1>
      </div>
    </Layout>
  )
}
