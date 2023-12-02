import { Purchase } from "@heist/common/types"
import { createUseStyles, useTheme } from "../theme"
import { ReactElement } from "react"
import { Body, BodyBold } from "../designSystem/Typography"
import { formatMoney } from "../utils/formatMoney"

const useStyles = createUseStyles((theme) => ({
  button: {
    cursor: "pointer",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    columnGap: 12,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 26,
  },
  boxBig: {
    width: "100%",
    paddingTop: "150%",
    backgroundColor: theme.colors.gray300,
  },
  boxSmall: {
    width: "100%",
    paddingTop: "100%",
    backgroundColor: theme.colors.gray300,
  },
  productImage: {
    width: "100%",
    objectFit: "cover",
  },
  productInfoRow: {
    display: "flex",
    justifyContent: "space-between",
  },
}))

type Props = {
  purchases?: Purchase[]
}
// TODO(PS): this should take in a specification of images/links/amounts/names etc to display
export const InvestmentsDisplay = ({ purchases }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const columns: ReactElement[][] = [[], [], [], [], []]

  if (purchases && purchases.length > 0) {
    for (let i = 0; i < purchases.length; i++) {
      const purchase = purchases[i]
      columns[i % 5].push(
        <PurchaseDisplay key={purchase.purchaseId} purchase={purchase} />
      )
    }
  } else {
    // TEMP
    for (let x = 0; x < 5; x++) {
      for (let i = 0; i < 4; i++) {
        const className = (x + i) % 2 == 0 ? styles.boxSmall : styles.boxBig
        columns[x][i] = <div key={i} className={className} />
      }
    }
  }

  return (
    <div className={styles.layout}>
      {columns.map((column, i) => (
        <div className={styles.column} key={i}>
          {column}
        </div>
      ))}
    </div>
  )
}

const PurchaseDisplay = ({ purchase }: { purchase: Purchase }) => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const navToProduct = () => {
    open(purchase.productUrl)
  }

  return (
    <div className={styles.button} onClick={navToProduct}>
      <img className={styles.productImage} src={purchase.imageUrl} />
      <div className={styles.productInfoRow}>
        <Body>{purchase.name}</Body>
        <BodyBold>{purchase.price}</BodyBold>
      </div>
    </div>
  )
}
