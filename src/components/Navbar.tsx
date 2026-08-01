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
          <Link href="/" className="font-orbitron font-bold text-xl tracking-wider text-cyan-400">
            DEEPAK<span className="text-white">.OS</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/#projects" className="hover:text-white transition-colors">Labs</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/internships" className="hover:text-white transition-colors">Experience</Link>
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-cyan-900/50">Home</Link>
            <Link href="/#projects" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-cyan-900/50">Labs</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-cyan-900/50">About</Link>
            <Link href="/internships" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-cyan-900/50">Experience</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
