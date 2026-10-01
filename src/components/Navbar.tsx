"use client"
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)

      if (currentScrollY <= 20) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down -> hide navbar dynamically so it never blocks page content
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> reveal navbar
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleToggle = () => {
    toggleTheme()
  }

  const showNavbar = isVisible || isOpen

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 transform ${
        showNavbar ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      } ${
        isScrolled || isOpen
          ? 'bg-white/95 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-cyan-500/30 shadow-sm'
          : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border-b border-slate-200/50 dark:border-cyan-500/10'
      } text-slate-900 dark:text-cyan-400`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 md:h-16">
          <Link href="/#hero" className="font-orbitron font-bold text-base sm:text-lg md:text-xl tracking-wider text-blue-900 dark:text-cyan-400 shrink-0">
            DEEPAK<span className="text-amber-600 dark:text-white">.OS</span>
          </Link>
          
          {/* Desktop Menu & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-6 font-space">
            <Link href="/" className="text-xs lg:text-sm font-semibold transition-colors text-slate-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-cyan-400">HOME</Link>
            <Link href="/about" className="text-xs lg:text-sm font-semibold transition-colors text-slate-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-cyan-400">ABOUT</Link>
            <Link href="/labs" className="text-xs lg:text-sm font-semibold transition-colors text-slate-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-cyan-400">LABS</Link>
            <Link href="/projects" className="text-xs lg:text-sm font-semibold transition-colors text-slate-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-cyan-400">ARCHIVES</Link>
            <Link href="/internships" className="text-xs lg:text-sm font-semibold transition-colors text-slate-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-cyan-400">TIMELINE</Link>
            <Link href="/contact" className="text-xs lg:text-sm font-semibold transition-colors text-slate-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-cyan-400">TERMINAL</Link>

            {/* Resume Download Button */}
            <a
              href="https://docs.google.com/document/d/1V8XjDHoHC8vaw_bTTNxZjhv8CYjbHddVax9KLsOTZk8/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border font-orbitron text-xs font-bold transition-all flex items-center gap-1.5 bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-sm dark:bg-emerald-500/20 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-400 dark:hover:text-black dark:shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            >
              <span>RESUME</span>
              <span className="text-[10px]">⤓</span>
            </a>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={handleToggle}
                aria-label="Toggle Theme"
                className="p-1.5 lg:p-2 rounded-lg border transition-all duration-300 flex items-center gap-1.5 text-xs font-orbitron font-bold bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 shadow-sm dark:bg-cyan-950/40 dark:border-cyan-500/40 dark:text-cyan-300 dark:hover:bg-cyan-900/60 dark:shadow-[0_0_10px_rgba(0,240,255,0.2)]"
              >
                {isDark ? (
                  <>
                    <Sun size={15} className="text-amber-400 animate-spin-slow" />
                    <span>LIGHT</span>
                  </>
                ) : (
                  <>
                    <Moon size={15} className="text-blue-900" />
                    <span>DARK</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2">
            <a
              href="https://docs.google.com/document/d/1V8XjDHoHC8vaw_bTTNxZjhv8CYjbHddVax9KLsOTZk8/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 rounded-lg border font-orbitron text-[11px] font-bold transition-all flex items-center gap-1 bg-emerald-600 text-white border-emerald-600 dark:bg-emerald-500/20 dark:border-emerald-400 dark:text-emerald-300 shadow-sm"
            >
              <span>CV</span>
              <span className="text-[10px]">⤓</span>
            </a>
            {mounted && (
              <button
                onClick={handleToggle}
                aria-label="Toggle Theme"
                className="p-1.5 rounded-lg border bg-amber-50 border-amber-300 text-amber-800 dark:bg-cyan-950/40 dark:border-cyan-500/40 dark:text-cyan-300 transition-colors shadow-sm"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              className="p-1.5 rounded-lg text-blue-900 dark:text-cyan-400 hover:bg-slate-100 dark:hover:bg-cyan-950/50 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b bg-white/95 border-slate-200 dark:bg-black/95 dark:border-cyan-500/30">
          <div className="px-3 pt-2 pb-3 space-y-1 flex flex-col font-space">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 hover:text-blue-900 dark:text-gray-300 dark:hover:bg-cyan-900/50 dark:hover:text-cyan-400">HOME</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 hover:text-blue-900 dark:text-gray-300 dark:hover:bg-cyan-900/50 dark:hover:text-cyan-400">ABOUT</Link>
            <Link href="/labs" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 hover:text-blue-900 dark:text-gray-300 dark:hover:bg-cyan-900/50 dark:hover:text-cyan-400">LABS</Link>
            <Link href="/projects" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 hover:text-blue-900 dark:text-gray-300 dark:hover:bg-cyan-900/50 dark:hover:text-cyan-400">ARCHIVES</Link>
            <Link href="/internships" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 hover:text-blue-900 dark:text-gray-300 dark:hover:bg-cyan-900/50 dark:hover:text-cyan-400">TIMELINE</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 hover:text-blue-900 dark:text-gray-300 dark:hover:bg-cyan-900/50 dark:hover:text-cyan-400">TERMINAL</Link>
            <a
              href="https://docs.google.com/document/d/1V8XjDHoHC8vaw_bTTNxZjhv8CYjbHddVax9KLsOTZk8/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm font-bold font-orbitron text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            >
              DOWNLOAD RESUME (PDF) ⤓
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
