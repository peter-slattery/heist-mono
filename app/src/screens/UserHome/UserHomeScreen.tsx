import { createUseStyles, useTheme } from "@app/theme"
import { Layout } from "../Layout"
import { InvestmentsDisplay } from "@app/components/InvestmentsDisplay"
import { Body } from "@app/designSystem/Typography"
import { useEffectOnMount } from "@app/utils/useEffects"
import { useAuth } from "@app/auth/AuthContext"
import { Purchase } from "@heist/common/types"
import { useState } from "react"

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

  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [total, setTotal] = useState<number>(0)

  const { api } = useAuth()
  useEffectOnMount(() => {
    api.userPurchasesGet({}).then((res) => {
      setPurchases(res.purchases)
      const total = res.purchases.reduce((total, purchase) => {
        return total + parseFloat(purchase.price)
      }, 0)
      setTotal(total)
    })
  })

  return (
    <Layout>
      <div className={styles.outer}>
        <div className={styles.moneyRow}>
          <div className={styles.moneyDisplay}>${total}</div>
          <Body>Invested for your future!</Body>
        </div>
        <InvestmentsDisplay purchases={purchases} />
      </div>
    </Layout>
  )
}
