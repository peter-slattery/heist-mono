import { useAuth } from "../auth/AuthContext"
import { BodyButton, H1 } from "../designSystem/Typography"
import { createUseStyles, useTheme } from "../theme"
import { PropsWithChildren, ReactElement } from "react"

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    padding: "8px 16px",
    width: "100%",
    backgroundColor: theme.colors.white,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    background: "none",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}))

type Props = {
  buttons?: ReactElement
} & PropsWithChildren

export const Layout = ({ buttons, children }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const { user, openLoginForm, logout } = useAuth()

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <div></div>
        <div className={styles.center}>
          <H1>HEIST</H1>
        </div>
        <div className={styles.right}>
          {buttons}
          {user ? (
            <button className={styles.button} onClick={logout}>
              <BodyButton>Log Out</BodyButton>
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={() => openLoginForm("login")}
            >
              <BodyButton>Log In</BodyButton>
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
