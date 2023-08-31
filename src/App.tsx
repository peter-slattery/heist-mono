import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createUseStyles, useTheme } from './theme'

const useStyles = createUseStyles((theme) => ({
  logo: {
    height: "6em",
    padding: "1.5em",
    willChange: "filter",
    transition: "filter 300ms",
    "&:hover": {
      filter: "drop-shadow(0 0 2em #646cffaa)",
    },
  },
  card: {
    padding: "2em",
  },
  readTheDocs: {
    color: theme.colors.gray,
  },
  header: {
    fontFamily: theme.fonts.archivoBlack
  }
}))

export const App: React.FC = () => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={styles.logo} alt="React logo" />
        </a>
      </div>
      <h1 className={styles.header}>Vite + React</h1>
      <div className={styles.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
