import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'react-jss'
import { theme } from "./theme.ts"
import './index.css'
import { HomeScreen } from './screens/Home/HomeScreen.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />
  },
  {
    path: "/hi",
    element: <div>Hi there</div>
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
