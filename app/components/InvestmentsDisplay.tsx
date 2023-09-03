import { createUseStyles, useTheme } from "../theme"

const useStyles = createUseStyles((theme) => ({
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
}))

// TODO(PS): this should take in a specification of images/links/amounts/names etc to display
export const InvestmentsDisplay = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  return (
    <div className={styles.layout}>
      <div className={styles.column}>
        <div className={styles.boxBig}></div>
        <div className={styles.boxSmall}></div>
        <div className={styles.boxBig}></div>
        <div className={styles.boxSmall}></div>
      </div>
      <div className={styles.column}>
        <div className={styles.boxSmall}></div>
        <div className={styles.boxBig}></div>
        <div className={styles.boxSmall}></div>
        <div className={styles.boxBig}></div>
      </div>
      <div className={styles.column}>
        <div className={styles.boxBig}></div>
        <div className={styles.boxSmall}></div>
        <div className={styles.boxBig}></div>
        <div className={styles.boxSmall}></div>
      </div>
      <div className={styles.column}>
        <div className={styles.boxSmall}></div>
        <div className={styles.boxBig}></div>
        <div className={styles.boxSmall}></div>
        <div className={styles.boxBig}></div>
      </div>
      <div className={styles.column}>
        <div className={styles.boxBig}></div>
        <div className={styles.boxSmall}></div>
        <div className={styles.boxBig}></div>
        <div className={styles.boxSmall}></div>
      </div>
    </div>
  )
}
