import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "react-jss"
import { theme } from "./theme.ts"
import "./index.css"
import { LandingScreen } from "./screens/Landing/LandingScreen.tsx"
import { AuthContextProvider } from "./auth/AuthContext.tsx"
import { AuthenticatedRoute } from "./auth/AuthenticatedRoute.tsx"
import { UserHomeScreen } from "./screens/UserHome/UserHomeScreen.tsx"
import netlifyIdentity from "netlify-identity-widget"
import { OnboardingLayout } from "./screens/Onboarding/OnboardingLayout.tsx"
import { OnboardingDaydreaming } from "./screens/Onboarding/OnboardingDaydreaming.tsx"
import { OnboardingChooseADate } from "./screens/Onboarding/OnboardingChooseADate.tsx"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).netlifyIdentity = netlifyIdentity

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/test" element={<div>Test</div>} />
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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
