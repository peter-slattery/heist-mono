import { useAuth } from "@heist/app/src/auth/AuthContext"
import { useEffect, useState } from "react"
import { Layout } from "../Layout"
import { Body, BodyBold, H1 } from "../../designSystem/Typography"
import { createUseStyles, useTheme } from "../../theme"
import { useLocation, useNavigate } from "react-router-dom"
import { PluginInvestData } from "@heist/common/pluginContract"
import { Input } from "../../components/Input"
import { useUserPurchases } from "../../hooks/useUserPurchases"
import { InvestmentsDisplay } from "../../components/InvestmentsDisplay"
import { HeistButton } from "../../designSystem/HeistButton"
import { InvestmentsMoneyRow } from "../../components/InvestmentsMoneyRow"
import { formatMoney } from "../../utils/formatMoney"

const useStyles = createUseStyles((theme) => ({
  layout: {
    padding: "30px 60px",
  },
  outer: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    paddingTop: 42,
    marginLeft: 54,
    marginRight: 54,
  },
  popupBackground: {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.overlayBackground,
  },
  popupForeground: {
    backgroundColor: theme.colors.white,
    maxWidth: 924,
    borderRadius: 6,
    padding: [67, 64, 31, 64],
  },
  popupColumns: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: 177,
    marginBottom: 12,
  },
  productInfoRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  centered: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 50,
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
  heistButton: {
    width: "100%",
    backgroundColor: theme.colors.orange,
    padding: [11, 0],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.pink,
  },
}))

export const PurchaseScreen = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const location = useLocation()
  const params = Object.fromEntries(
    new URLSearchParams(location.search)
  ) as PluginInvestData

  const [price, setPrice] = useState<number>(0.0)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [productName, setProductName] = useState<string>("")

  const { user, api, openLoginForm } = useAuth()

  const { purchases, total } = useUserPurchases()

  useEffect(() => {
    setPrice(parseFloat(params.price))
    setImageUrl(params.imageUrl)
    setProductName(params.name)
  }, [])

  const openLogin = () => {
    openLoginForm("login")
  }

  const onInvest = () => {
    setLoading(true)
    api
      .userPurchaseCreate({
        name: productName,
        price: price.toString(),
        imageUrl,
        productUrl: params.productUrl,
      })
      .then(() => {
        setLoading(false)
        navigate("/home")
      })
  }

  const priceString = formatMoney(price)

  return (
    <Layout>
      <div className={styles.outer}>
        <InvestmentsMoneyRow total={total} />
        <InvestmentsDisplay purchases={purchases} />
      </div>

      <div className={styles.popupBackground}>
        <div className={styles.popupForeground}>
          <div className={styles.popupColumns}>
            <div>
              <img className={styles.image} src={imageUrl} />
              <div className={styles.productInfoRow}>
                <Input value={productName} setValue={setProductName} />
                <Input value={price} setValue={setPrice} right step={"0.01"} />
              </div>
            </div>
            <div className={styles.centered}>
              <div className={styles.centered}>
                <H1>Ooh, good find.</H1>
                <Body>
                  Save it as an option for now, and make {priceString} on it in
                  the mean time.
                </Body>
              </div>
              <div className={styles.productInfoRow}>
                <BodyBold>Put away now:</BodyBold>
                <BodyBold>{priceString}</BodyBold>
              </div>
              <Body>
                We’ll save this for you today, and remind you to put the money
                away soon so you can earn interest while you mull it over.
              </Body>
            </div>
          </div>
          {user ? (
            <HeistButton onClick={onInvest}>
              Earn {priceString} for future you
            </HeistButton>
          ) : (
            <HeistButton onClick={openLogin}>Log In to Invest</HeistButton>
          )}
        </div>
      </div>
    </Layout>
  )
}
