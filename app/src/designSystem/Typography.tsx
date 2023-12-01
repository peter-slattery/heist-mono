import classNames from "classnames"
import { createUseStyles, useTheme } from "../theme"

const useStyles = createUseStyles((theme) => ({
  h1: {
    fontFamily: theme.fonts.archivoBlack,
    fontSize: "20px",
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
  h4: {
    fontFamily: theme.fonts.inter,
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
  },
  body: {
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
  bodyBold: {
    fontFamily: theme.fonts.archivoBlack,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  },
  bodyButton: {
    fontFamily: theme.fonts.inter,
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "150%",
  },
  bodyButtonSmall: {
    fontFamily: theme.fonts.inter,
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "100%",
  },
}))

type Props = {
  className?: string
} & React.PropsWithChildren

export const H1 = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  return <h1 className={classNames(styles.h1, className)}>{children}</h1>
}

export const H3 = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  return <h3 className={classNames(styles.h3, className)}>{children}</h3>
}

export const H4 = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  return <h3 className={classNames(styles.h4, className)}>{children}</h3>
}

export const Body = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  return <span className={classNames(styles.body, className)}>{children}</span>
}

export const BodyBold = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  return (
    <span className={classNames(styles.bodyBold, className)}>{children}</span>
  )
}

export const BodyButton = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  return (
    <span className={classNames(styles.bodyButton, className)}>{children}</span>
  )
}

export const BodyButtonSmall = ({ children, className }: Props) => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  return (
    <span className={classNames(styles.bodyButtonSmall, className)}>
      {children}
    </span>
  )
}
