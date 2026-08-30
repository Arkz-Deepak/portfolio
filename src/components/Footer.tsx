import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="w-full py-6 border-t transition-colors duration-300 bg-white/80 border-slate-200 text-slate-700 dark:bg-black/80 dark:border-cyan-500/30 dark:text-cyan-400 font-space text-xs">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
        <p className="font-medium">
          © 2026 Deepak R. All rights reserved. | B.E. Robotics & Automation
        </p>
        <div className="flex items-center space-x-6 text-lg">
          <a
            href="https://github.com/Arkz-Deepak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="transition-colors hover:text-blue-700 dark:hover:text-white"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/robotics-deepak/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="transition-colors hover:text-blue-700 dark:hover:text-white"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:deepak121289@outlook.com"
            aria-label="Email Deepak R"
            className="transition-colors hover:text-blue-700 dark:hover:text-white"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  )
}
