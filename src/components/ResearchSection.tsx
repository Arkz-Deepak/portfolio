"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { researchData, ResearchFigure } from '@/data/research'
import { FaFilePdf, FaCopy, FaCheck, FaExternalLinkAlt, FaChartBar, FaVideo } from 'react-icons/fa'

export default function ResearchSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeFigureIdx, setActiveFigureIdx] = useState<Record<string, number>>({})

  const handleCopyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const setFigure = (paperId: string, idx: number) => {
    setActiveFigureIdx(prev => ({ ...prev, [paperId]: idx }))
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {researchData.map((paper) => {
          const currentFigIdx = activeFigureIdx[paper.id] || 0
          const currentFigure: ResearchFigure | undefined = paper.figures?.[currentFigIdx]

          return (
            <motion.div
              key={paper.id}
              whileHover={{ y: -3 }}
              className="border p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between transition-all duration-300 bg-white border-slate-200 shadow-md hover:shadow-xl dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                  <span className={`text-[10px] font-orbitron font-bold px-2.5 py-1 rounded-full border ${
                    paper.status === 'Published Preprint'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:border-emerald-400 dark:text-emerald-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:border-amber-400 dark:text-amber-300'
                  }`}>
                    {paper.status.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                    {paper.publicationDate}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold font-orbitron text-slate-900 dark:text-white mb-2 leading-snug">
                  {paper.title}
                </h3>

                <p className="text-xs font-mono text-blue-700 dark:text-cyan-400 font-semibold mb-3">
                  Author: {paper.authors.join(', ')} • {paper.venue}
                </p>

                {paper.doi && paper.doi !== 'In Progress' && (
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40 break-all">
                      DOI: {paper.doi}
                    </span>
                  </div>
                )}

                <p className="text-xs md:text-sm font-space leading-relaxed text-slate-600 dark:text-gray-300 mb-4 bg-slate-50 dark:bg-black/40 p-3.5 rounded-xl border border-slate-200 dark:border-cyan-900/50">
                  {paper.abstract}
                </p>

                {/* Key Contributions */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-orbitron font-bold text-slate-800 dark:text-cyan-300 block">
                    KEY CONTRIBUTIONS:
                  </span>
                  <ul className="list-disc list-inside text-xs font-space text-slate-600 dark:text-slate-300 space-y-1">
                    {paper.keyContributions.map((kc, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {kc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optional Research Video Preview */}
                {paper.video && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-cyan-500/30 bg-slate-950 p-2.5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-orbitron font-bold text-cyan-400 flex items-center gap-1.5">
                        <FaVideo className="text-xs text-cyan-400" />
                        <span>{paper.video.title}</span>
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        ROLLOUT MATRIX
                      </span>
                    </div>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                      <video
                        src={paper.video.url}
                        controls
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[11px] font-space text-slate-400 mt-2 leading-relaxed">
                      {paper.video.caption}
                    </p>
                  </div>
                )}

                {/* Research Figures & Empirical Telemetry Gallery */}
                {paper.figures && paper.figures.length > 0 && currentFigure && (
                  <div className="mb-5 rounded-xl border p-3 bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/60">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-1.5">
                        <FaChartBar className="text-xs text-blue-600 dark:text-cyan-400" />
                        <span className="text-[11px] font-orbitron font-bold text-slate-800 dark:text-cyan-300">
                          EMPIRICAL RESEARCH FIGURES ({paper.figures.length})
                        </span>
                      </div>
                      
                      {/* Figure selector tabs */}
                      <div className="flex items-center gap-1 flex-wrap">
                        {paper.figures.map((_, fIdx) => (
                          <button
                            key={fIdx}
                            onClick={() => setFigure(paper.id, fIdx)}
                            className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded transition-colors ${
                              currentFigIdx === fIdx
                                ? 'bg-blue-600 text-white dark:bg-cyan-500 dark:text-black'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }`}
                          >
                            FIG {fIdx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Figure Display */}
                    <div className="relative w-full rounded-lg overflow-hidden border border-slate-200 dark:border-cyan-900/60 bg-white dark:bg-slate-950 p-1 mb-2">
                      <img
                        src={currentFigure.url}
                        alt={currentFigure.alt}
                        className="w-full h-48 sm:h-56 object-contain rounded"
                      />
                    </div>

                    <div className="text-[11px] font-space">
                      <span className="font-bold text-slate-900 dark:text-cyan-300 block mb-0.5">
                        {currentFigure.title}
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[10px] sm:text-[11px]">
                        {currentFigure.caption}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={paper.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white dark:bg-cyan-500/20 dark:border dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black text-xs font-orbitron font-bold rounded-lg transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>OPEN PREPRINT / DOI</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>

                <button
                  onClick={() => handleCopyBibtex(paper.id, paper.citationBibtex)}
                  className="px-3 py-1.5 border border-slate-300 text-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-black/60 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-1.5"
                >
                  {copiedId === paper.id ? (
                    <>
                      <FaCheck className="text-emerald-500 text-xs" />
                      <span className="text-emerald-600 dark:text-emerald-400">BIBTEX COPIED</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="text-xs" />
                      <span>COPY BIBTEX</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
