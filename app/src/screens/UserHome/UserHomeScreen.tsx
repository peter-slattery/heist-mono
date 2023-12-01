import { createUseStyles, useTheme } from "@app/theme"
import { Layout } from "../Layout"
import { InvestmentsDisplay } from "@app/components/InvestmentsDisplay"
import { Body } from "@app/designSystem/Typography"
import { useEffectOnMount } from "@app/utils/useEffects"
import { useAuth } from "@app/auth/AuthContext"
import { Purchase } from "@heist/common/types"
import { useState } from "react"
import classNames from "classnames"
import { useUserPurchases } from "../../hooks/useUserPurchases"

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
    justifyContent: "space-between",
    alignItems: "center",
  },
  moneyColumn: {
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
  horizontalLine: {
    margin: [0, 10, 0, 10],
    flexGrow: 1,
    height: 0,
    borderBottom: `1px solid ${theme.colors.black}`,
  },
  rightAlign: {
    justifyContent: "flex-end",
    textAlign: "right",
  },
}))

export const UserHomeScreen = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const { purchases, total } = useUserPurchases()

  return (
    <Layout>
      <div className={styles.outer}>
        <span className={styles.moneyRow}>
          <div className={styles.moneyColumn}>
            <div className={styles.moneyDisplay}>${total.today.toFixed(2)}</div>
            <Body>Invested for your future!</Body>
          </div>
          <div className={styles.horizontalLine}></div>
          <div className={classNames(styles.moneyColumn, styles.rightAlign)}>
            <div className={styles.moneyDisplay}>
              ${total.atGoal.toFixed(2)}
            </div>
            <Body>how this will grow by your big day</Body>
          </div>
        </span>
        <InvestmentsDisplay purchases={purchases} />
      </div>
    </Layout>
  )
}
