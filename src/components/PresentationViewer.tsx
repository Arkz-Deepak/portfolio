"use client"
import React, { useState } from 'react'
import { FaFilePowerpoint, FaExpand, FaTimes } from 'react-icons/fa'

interface PresentationViewerProps {
  title: string
  embedUrl: string
  sourceUrl?: string
  competition?: string
  defaultOpen?: boolean
}

export default function PresentationViewer({
  title,
  embedUrl,
  sourceUrl,
  competition,
  defaultOpen = false
}: PresentationViewerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="w-full my-6 border border-amber-300/60 dark:border-amber-500/30 rounded-2xl bg-amber-50/40 dark:bg-black/50 overflow-hidden shadow-md backdrop-blur-md font-space">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-100/50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-900/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-700 dark:text-amber-400 text-lg shrink-0">
            <FaFilePowerpoint />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                OFFICIAL PITCH DECK
              </span>
              {competition && (
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-amber-400">
                  {competition}
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-bold font-orbitron text-slate-900 dark:text-white mt-0.5">
              {title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1 shadow-sm"
              title="Open Presentation in Google Docs"
            >
              <span>OPEN EXTERNAL</span>
              <span className="text-[10px]">↗</span>
            </a>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3.5 py-1.5 rounded-lg border border-amber-500 bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-500/20 dark:border-amber-400 dark:text-amber-300 dark:hover:bg-amber-400 dark:hover:text-black text-xs font-orbitron font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            {isOpen ? (
              <>
                <FaTimes className="text-[10px]" />
                <span>COLLAPSE DECK</span>
              </>
            ) : (
              <>
                <FaExpand className="text-[10px]" />
                <span>VIEW SLIDE DECK</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Embedded Slide Viewer */}
      {isOpen && (
        <div className="p-3 sm:p-4 bg-slate-950">
          <div className="relative w-full aspect-[16/9] min-h-[300px] sm:min-h-[460px] rounded-xl overflow-hidden border border-slate-800 bg-black shadow-inner">
            <iframe
              src={embedUrl}
              className="w-full h-full border-none"
              allowFullScreen
              title={`${title} Presentation`}
            />
          </div>
          <div className="mt-2 text-right">
            <span className="text-[10px] font-mono text-slate-400">
              💡 Use presentation controls inside the frame to navigate slides or toggle full-screen.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
