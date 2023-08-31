import classNames from "classnames"
import { createUseStyles, useTheme } from "../theme"

const useStyles = createUseStyles(theme => ({
  h1: {
    fontFamily: theme.fonts.archivoBlack,
    fontSize: "36px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  h3: {
    fontFamily: theme.fonts.inter,
    fontSize: "22px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  bodyButton: {
    fontFamily: theme.fonts.inter,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "150%",
  }
}))

type Props = {
  className?: string
} & React.PropsWithChildren

export const H1 = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({theme})
  return (
    <h1 className={classNames(styles.h1, className)}>{children}</h1>
  )
}

export const H3 = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({theme})
  return (
    <h3 className={classNames(styles.h3, className)}>{children}</h3>
  )
}

export const BodyButton = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({theme})
  return (
    <div className={classNames(styles.bodyButton, className)}>{children}</div>
  )
}