import { createUseStyles, useTheme } from "@heist/app/theme"
import { Layout } from "../Layout"
import { InvestmentsDisplay } from "@heist/app/components/InvestmentsDisplay"
import { Body } from "@heist/app/designSystem/Typography"

const useStyles = createUseStyles((theme) => ({
  outer: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    paddingTop: 42,
    marginLeft: 54,
    marginRight: 54,
  },
  moneyRow: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  moneyDisplay: {
    color: theme.colors.black,
    fontFamily: theme.fonts.archivoBlack,
    fontSize: 50,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
}))

export const UserHomeScreen = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  return (
    <Layout>
      <div className={styles.outer}>
        <div className={styles.moneyRow}>
          <div className={styles.moneyDisplay}>$14,879.22</div>
          <Body>Invested for your future!</Body>
        </div>
        <InvestmentsDisplay />
      </div>
    </Layout>
  )
}
