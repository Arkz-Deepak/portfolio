"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronUp } from 'react-icons/fa'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const currentProgress = Math.min(
              100,
              Math.max(0, Math.round((window.scrollY / totalHeight) * 100))
            )
            setScrollProgress(currentProgress)
          }
          setIsVisible(window.scrollY > 280)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 group flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-md border shadow-lg transition-all duration-300 bg-white/90 border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-blue-500 hover:shadow-xl dark:bg-black/85 dark:border-cyan-500/40 dark:text-cyan-300 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        >
          {/* Circular progress HUD indicator */}
          <div className="relative w-5 h-5 flex items-center justify-center">
            <svg className="w-5 h-5 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-cyan-950"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-600 dark:text-cyan-400 transition-all duration-150"
                strokeDasharray={`${scrollProgress}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <FaChevronUp className="w-2.5 h-2.5 absolute transition-transform group-hover:-translate-y-0.5" />
          </div>

          <span className="text-[10px] font-mono font-bold tracking-wider">
            {scrollProgress}%
          </span>

          <span className="hidden sm:inline text-[9px] font-orbitron font-bold tracking-widest uppercase border-l pl-2 border-slate-300 dark:border-cyan-500/30 text-slate-500 dark:text-cyan-400/80">
            TOP
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
