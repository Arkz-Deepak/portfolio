"use client"
import Link from 'next/link'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-black/80 border-cyan-500/30 text-cyan-400' 
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/#hero" className={`font-orbitron font-bold text-xl tracking-wider ${
            isDark ? 'text-cyan-400' : 'text-blue-900'
          }`}>
            DEEPAK<span className={isDark ? 'text-white' : 'text-amber-600'}>.OS</span>
          </Link>
          
          {/* Desktop Menu & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6 font-space">
            <Link href="/" className={`text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-slate-700 hover:text-blue-800 font-semibold'}`}>HOME</Link>
            <Link href="/about" className={`text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-slate-700 hover:text-blue-800 font-semibold'}`}>ABOUT</Link>
            <Link href="/labs" className={`text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-slate-700 hover:text-blue-800 font-semibold'}`}>LABS</Link>
            <Link href="/projects" className={`text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-slate-700 hover:text-blue-800 font-semibold'}`}>ARCHIVES</Link>
            <Link href="/internships" className={`text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-slate-700 hover:text-blue-800 font-semibold'}`}>TIMELINE</Link>
            <Link href="/contact" className={`text-sm transition-colors ${isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-slate-700 hover:text-blue-800 font-semibold'}`}>TERMINAL</Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-lg border transition-all duration-300 flex items-center gap-2 text-xs font-orbitron font-bold ${
                isDark 
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                  : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 shadow-sm'
              }`}
            >
              {isDark ? (
                <>
                  <Sun size={16} className="text-amber-400 animate-spin-slow" />
                  <span>CORPORATE</span>
                </>
              ) : (
                <>
                  <Moon size={16} className="text-blue-900" />
                  <span>CYBERPUNK</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-lg border ${
                isDark ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300' : 'bg-amber-50 border-amber-300 text-amber-800'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className={isDark ? 'text-cyan-400 p-2' : 'text-blue-900 p-2'}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden border-b ${
          isDark ? 'bg-black/95 border-cyan-500/30' : 'bg-white/95 border-slate-200'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col font-space">
            <Link href="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400' : 'text-slate-800 hover:bg-slate-100 hover:text-blue-900'}`}>HOME</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className={`block px-3 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400' : 'text-slate-800 hover:bg-slate-100 hover:text-blue-900'}`}>ABOUT</Link>
            <Link href="/labs" onClick={() => setIsOpen(false)} className={`block px-3 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400' : 'text-slate-800 hover:bg-slate-100 hover:text-blue-900'}`}>LABS</Link>
            <Link href="/projects" onClick={() => setIsOpen(false)} className={`block px-3 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400' : 'text-slate-800 hover:bg-slate-100 hover:text-blue-900'}`}>ARCHIVES</Link>
            <Link href="/internships" onClick={() => setIsOpen(false)} className={`block px-3 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400' : 'text-slate-800 hover:bg-slate-100 hover:text-blue-900'}`}>TIMELINE</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className={`block px-3 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400' : 'text-slate-800 hover:bg-slate-100 hover:text-blue-900'}`}>TERMINAL</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
