import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  return <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
}
