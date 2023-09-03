import { Navigate, Outlet, useLocation } from "react-router-dom"
import { createUseStyles, useTheme } from "../../theme"
import { OnboardingProvider } from "./OnboardingContext"
import { InvestmentsDisplay } from "@heist/app/components/InvestmentsDisplay"

const useStyles = createUseStyles((theme) => ({
  layout: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    outline: "1px solid black",
  },
  topSection: {
    width: "100%",
    minHeight: 400,
  },
  bottomSection: {
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

export const OnboardingLayout = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })

  const location = useLocation()
  if (
    location.pathname === "/onboarding" ||
    location.pathname === "/onboarding/"
  ) {
    return <Navigate to="/onboarding/1" replace />
  }

  return (
    <OnboardingProvider>
      <div className={styles.layout}>
        <div className={styles.topSection}>
          <Outlet />
        </div>
        <InvestmentsDisplay />
      </div>
    </OnboardingProvider>
  )
}
