import { useAuth } from "@heist/app/auth/AuthContext"
import { useEffect } from "react"
import { Layout } from "../Layout"
import { Body, BodyBold } from "@heist/app/designSystem/Typography"
import { createUseStyles, useTheme } from "@heist/app/theme"
import netlifyIdentity from "netlify-identity-widget"

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
    paddingTop: "150%",
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
          <div className={styles.image}></div>
          <div className={styles.productInfo}>
            <Body>
              <p>Emit Floor Lamp</p>
              <p>
                <BodyBold>Style:</BodyBold> #63501183
              </p>
              <p>
                <BodyBold>Color:</BodyBold> Ivory
              </p>
            </Body>
          </div>
          <div className={styles.rightJustify}>
            <BodyBold>$499.00</BodyBold>
            <br />
            <button className={styles.investButton}>Invest</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
