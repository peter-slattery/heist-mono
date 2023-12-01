import { useAuth } from "@heist/app/src/auth/AuthContext"
import { useEffect, useState } from "react"
import { Layout } from "../Layout"
import { Body, BodyBold } from "../../designSystem/Typography"
import { createUseStyles, useTheme } from "../../theme"
import { useLocation, useNavigate } from "react-router-dom"
import { PluginInvestData } from "@heist/common/pluginContract"
import { Input } from "../../components/Input"

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

  useEffect(() => {
    setPrice(parseFloat(params.price))
    setImageUrl(params.imageUrl)
    setProductName(params.name)
  }, [])

  useEffect(() => {
    console.log(user)
    if (!user) {
      openLoginForm("login")
    }
  }, [user])

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
          <img className={styles.image} src={imageUrl} />
          <div className={styles.productInfo}>
            <Input value={productName} setValue={setProductName} />
          </div>
          <div className={styles.rightJustify}>
            <Input value={price} setValue={setPrice} right step={"0.01"} />
            <br />
            {!loading && (
              <button className={styles.investButton} onClick={onInvest}>
                Invest
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
