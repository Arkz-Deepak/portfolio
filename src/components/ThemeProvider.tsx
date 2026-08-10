"use client"
import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const currentTheme = theme || resolvedTheme || 'light'

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme
  }
}
