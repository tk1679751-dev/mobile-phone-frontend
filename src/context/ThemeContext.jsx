import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('mobimart-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { window.localStorage.setItem('mobimart-theme', theme) } catch { /* ignore */ }
  }, [theme])
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  const value = { theme, toggleTheme }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
