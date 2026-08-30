"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { researchData } from '@/data/research'
import { FaFilePdf, FaCopy, FaCheck, FaExternalLinkAlt } from 'react-icons/fa'

export default function ResearchSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {researchData.map((paper) => (
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
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40">
                    DOI: {paper.doi}
                  </span>
                </div>
              )}

              <p className="text-xs md:text-sm font-space leading-relaxed text-slate-600 dark:text-gray-300 mb-4 bg-slate-50 dark:bg-black/40 p-3.5 rounded-xl border border-slate-200 dark:border-cyan-900/50">
                {paper.abstract}
              </p>

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
        ))}
      </div>
    </div>
  )
}
