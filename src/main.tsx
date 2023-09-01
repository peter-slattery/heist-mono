import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'react-jss'
import { theme } from "./theme.ts"
import './index.css'
import { LandingScreen } from './screens/Landing/LandingScreen.tsx'
import { AuthContextProvider } from './auth/AuthContext.tsx'
import { AuthenticatedRoute } from './auth/AuthenticatedRoute.tsx'
import { UserHomeScreen } from './screens/UserHome/UserHomeScreen.tsx'
import netlifyIdentity from "netlify-identity-widget"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).netlifyIdentity = netlifyIdentity;

ReactDOM.createRoot(document.getElementById('root')!).render(
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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
