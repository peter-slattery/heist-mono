import { useAuth } from "@heist/app/auth/AuthContext"
import { useEffect } from "react"
import { Layout } from "../Layout"
import { Body, BodyBold } from "@heist/app/designSystem/Typography"
import { createUseStyles, useTheme } from "@heist/app/theme"
import netlifyIdentity from "netlify-identity-widget"
import { useLocation, useParams } from "react-router-dom"
import { PluginInvestData } from "@heist/common/pluginContract"

const useStyles = createUseStyles((theme) => ({
  layout: {
    padding: "30px 60px",
  },
  hr: {
    marginTop: 20,
    marginBottom: 20,
  },
  gridRow: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 2fr",
    columnGap: 20,
  },
  rightJustify: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  image: {
    width: "100%",
    backgroundColor: theme.colors.gray300,
  },
  productInfo: {},
  investButton: {
    backgroundColor: theme.colors.black,
    color: theme.colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "none",
    borderRadius: 40,
    padding: "16px 32px",
  },
}))

export const PurchaseScreen = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const location = useLocation()
  const params = Object.fromEntries(
    new URLSearchParams(location.search)
  ) as PluginInvestData

  const { user, api, openLoginForm } = useAuth()
  useEffect(() => {
    if (!user) {
      openLoginForm("login")
    }
  }, [user])

  const onInvest = () => {
    /* TODO */
  }

  return (
    <Layout>
      <div className={styles.layout}>
        <Body>Shopping Bag</Body>
        <hr className={styles.hr} />
        <div className={styles.gridRow}>
          <div />
          <BodyBold>Item:</BodyBold>
          <div className={styles.rightJustify}>
            <BodyBold>Total Price</BodyBold>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.gridRow}>
          <img className={styles.image} src={params.image} />
          <div className={styles.productInfo}>
            <Body>
              <p>{params.name}</p>
            </Body>
          </div>
          <div className={styles.rightJustify}>
            <BodyBold>{params.price}</BodyBold>
            <br />
            <button className={styles.investButton}>Invest</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
