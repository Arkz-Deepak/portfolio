"use client"
import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function useTheme() {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const activeTheme = resolvedTheme || theme || 'light'
  const isDark = activeTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return {
    theme: activeTheme,
    resolvedTheme,
    isDark,
    setTheme,
    toggleTheme
  }
}
