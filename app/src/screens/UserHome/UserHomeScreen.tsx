import { createUseStyles, useTheme } from "@app/theme"
import { Layout } from "../Layout"
import { InvestmentsDisplay } from "@app/components/InvestmentsDisplay"
import { useUserPurchases } from "../../hooks/useUserPurchases"
import { InvestmentsMoneyRow } from "../../components/InvestmentsMoneyRow"

const useStyles = createUseStyles((theme) => ({
  outer: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    paddingTop: 42,
    marginLeft: 54,
    marginRight: 54,
  },
}))

export const UserHomeScreen = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const { purchases, total } = useUserPurchases()

  return (
    <Layout>
      <div className={styles.outer}>
        <InvestmentsMoneyRow total={total} />
        <InvestmentsDisplay purchases={purchases} />
      </div>
    </Layout>
  )
}
