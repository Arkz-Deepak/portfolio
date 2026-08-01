"use client"
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/#hero" className="font-orbitron font-bold text-xl tracking-wider text-cyan-400">
            DEEPAK<span className="text-white">.OS</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-space">
            <Link href="/#hero" className="hover:text-cyan-400 text-gray-300 transition-colors text-sm">HOME</Link>
            <Link href="/#labs" className="hover:text-cyan-400 text-gray-300 transition-colors text-sm">LABS</Link>
            <Link href="/#projects" className="hover:text-cyan-400 text-gray-300 transition-colors text-sm">ARCHIVES</Link>
            <Link href="/#timeline" className="hover:text-cyan-400 text-gray-300 transition-colors text-sm">TIMELINE</Link>
            <Link href="/#terminal" className="hover:text-cyan-400 text-gray-300 transition-colors text-sm">TERMINAL</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-cyan-400 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-b border-cyan-500/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col font-space">
            <Link href="/#hero" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400">HOME</Link>
            <Link href="/#labs" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400">LABS</Link>
            <Link href="/#projects" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400">ARCHIVES</Link>
            <Link href="/#timeline" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400">TIMELINE</Link>
            <Link href="/#terminal" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-gray-300 hover:bg-cyan-900/50 hover:text-cyan-400">TERMINAL</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
