import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "react-jss"
import { theme } from "./theme"
import "./index.css"
import { LandingScreen } from "./screens/Landing/LandingScreen"
import { AuthContextProvider } from "./auth/AuthContext"
import { AuthenticatedRoute } from "./auth/AuthenticatedRoute"
import { UserHomeScreen } from "./screens/UserHome/UserHomeScreen"
import netlifyIdentity from "netlify-identity-widget"
import { OnboardingLayout } from "./screens/Onboarding/OnboardingLayout"
import { OnboardingDaydreaming } from "./screens/Onboarding/OnboardingDaydreaming"
import { OnboardingChooseADate } from "./screens/Onboarding/OnboardingChooseADate"
import { PurchaseScreen } from "./screens/Purchase/PurchaseScreen"
import { ChromePluginDownload } from "./screens/ChromePluginDownload"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).netlifyIdentity = netlifyIdentity

console.log(import.meta.env)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route
              path="/home"
              element={
                <AuthenticatedRoute>
                  <UserHomeScreen />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/onboarding"
              element={
                <AuthenticatedRoute>
                  <OnboardingLayout />
                </AuthenticatedRoute>
              }
            >
              <Route path="/onboarding/1" element={<OnboardingDaydreaming />} />
              <Route path="/onboarding/2" element={<OnboardingChooseADate />} />
            </Route>
            <Route path="/invest" element={<PurchaseScreen />} />
            <Route path="/extension" element={<ChromePluginDownload />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
