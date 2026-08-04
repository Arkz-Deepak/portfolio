"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ 
  children,
  defaultTheme = 'dark'
}: { 
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
}) {
  const [theme, setThemeState] = useState<Theme>((defaultTheme as Theme) || 'dark')

  useEffect(() => {
    const saved = localStorage.getItem('deepak-os-theme') as Theme | null
    if (saved === 'light' || saved === 'dark') {
      setThemeState(saved)
      if (saved === 'light') {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      }
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }, [])

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme)
    localStorage.setItem('deepak-os-theme', nextTheme)
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
