import classNames from "classnames"
import { createUseStyles, useTheme } from "../theme"
import { BodyButton } from "./Typography"

const useStyles = createUseStyles(theme => ({
  outer: {
    cursor: "pointer",
    backgroundColor: theme.colors.orange,
    color: theme.colors.yellow,
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "11px 24px",
    border: "none",
    borderRadius: 30,
  }
}))

type Props = {
  className?: string,
  onClick?: () => void
} & React.PropsWithChildren

export const PillButton = ({ children, className, onClick }: Props) => {
  const theme = useTheme()
  const styles = useStyles({theme})
  return (
    <button className={classNames(styles.outer, className)} onClick={onClick}>
      <BodyButton>
        { children }
      </BodyButton>
    </button>
  )
}