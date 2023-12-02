import { Body } from "@app/designSystem/Typography"
import classNames from "classnames"
import { createUseStyles, useTheme } from "../theme"
import { formatMoney } from "../utils/formatMoney"

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
  gray: {
    color: theme.colors.gray350,
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

type Props = {
  total: {
    today: number
    atGoal: number
  }
}
export const InvestmentsMoneyRow = ({ total }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const totalToday = formatMoney(total.today)
  const totalAtGoal = formatMoney(total.atGoal)
  return (
    <span className={styles.moneyRow}>
      <div className={styles.moneyColumn}>
        <div className={classNames(styles.moneyDisplay, styles.gray)}>
          {totalToday}
        </div>
        <Body className={styles.gray}>invested for your future!</Body>
      </div>
      <div className={styles.horizontalLine}></div>
      <div className={classNames(styles.moneyColumn, styles.rightAlign)}>
        <div className={styles.moneyDisplay}>{totalAtGoal}</div>
        <Body>how this will grow by your big day</Body>
      </div>
    </span>
  )
}
