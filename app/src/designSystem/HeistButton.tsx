import classNames from "classnames"
import { createUseStyles, useTheme } from "../theme"
import { BodyBold } from "./Typography"

const useStyles = createUseStyles((theme) => ({
  outer: {
    cursor: "pointer",
    backgroundColor: theme.colors.orange,
    color: theme.colors.pink,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "11px 24px",
    border: "none",
  },
}))

type Props = {
  className?: string
  onClick?: () => void
} & React.PropsWithChildren

export const HeistButton = ({ children, className, onClick }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  return (
    <button className={classNames(styles.outer, className)} onClick={onClick}>
      <BodyBold>{children}</BodyBold>
    </button>
  )
}
