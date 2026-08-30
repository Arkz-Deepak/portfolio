"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { projectsData } from '@/data/projects'
import { FaGithub, FaArrowRight, FaCogs } from 'react-icons/fa'

export default function FeaturedProjects() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
      {/* Top 2 Hero Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projectsData.slice(0, 2).map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="border-2 p-6 md:p-7 rounded-2xl backdrop-blur-md flex flex-col justify-between transition-all duration-300 bg-white border-slate-300 shadow-lg hover:shadow-2xl dark:bg-gray-900/70 dark:border-cyan-500/40 dark:hover:border-cyan-400"
          >
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                <span className="text-[10px] font-orbitron font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-500/50">
                  {project.category === 'ai-vision' ? 'PHYSICAL AI & DIGITAL TWIN' : 'ROBOTICS & HARDWARE'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  {project.date}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl md:text-2xl font-black font-orbitron text-slate-900 dark:text-white mb-1.5 leading-tight">
                {project.title}
              </h3>
              <p className="text-xs md:text-sm font-space font-semibold text-blue-800 dark:text-cyan-300 mb-4">
                {project.subtitle}
              </p>

              {/* Key Metrics Grid */}
              {project.stats && (
                <div className="grid grid-cols-2 gap-2.5 mb-4 font-mono text-xs">
                  {project.stats.map((stat, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 rounded-lg border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/60 flex flex-col"
                    >
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase font-orbitron">
                        {stat.label}
                      </span>
                      <span className="text-xs font-black text-slate-900 dark:text-cyan-300 mt-0.5">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-xs md:text-sm font-space leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
                {project.summary}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-5 bg-slate-50 dark:bg-black/40 p-3.5 rounded-xl border border-slate-200 dark:border-cyan-900/40">
                <span className="text-[11px] font-orbitron font-bold text-slate-800 dark:text-cyan-300 block">
                  TECHNICAL ACHIEVEMENTS:
                </span>
                <ul className="list-disc list-inside text-xs font-space text-slate-600 dark:text-slate-300 space-y-1">
                  {project.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-[11px] font-mono font-semibold rounded bg-slate-100 text-slate-800 border border-slate-300 dark:bg-slate-950 dark:text-cyan-400 dark:border-cyan-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-cyan-500/30 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={project.caseStudySlug || '/projects'}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white dark:bg-cyan-500/20 dark:border dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black font-orbitron font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md"
              >
                <span>VIEW CASE STUDY & SPECS</span>
                <FaArrowRight className="text-[10px]" />
              </Link>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-black/60 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300 font-orbitron font-bold text-xs rounded-xl transition-all flex items-center gap-2"
                >
                  <FaGithub />
                  <span>SOURCE CODE</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Key Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectsData.slice(2).map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="border p-5 rounded-2xl backdrop-blur-md flex flex-col justify-between bg-white border-slate-200 shadow-md hover:shadow-xl dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40">
                  {project.category.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                  {project.date}
                </span>
              </div>

              <h4 className="text-base font-bold font-orbitron text-slate-900 dark:text-white mb-1.5">
                {project.title}
              </h4>
              <p className="text-xs font-space text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-black/50 dark:text-cyan-400/90 dark:border-cyan-900"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-cyan-500/20 flex justify-between items-center text-xs font-orbitron font-bold text-blue-700 dark:text-cyan-400">
              <Link href={project.caseStudySlug || '/projects'} className="hover:underline flex items-center gap-1">
                <span>VIEW ARCHIVE</span>
                <span>→</span>
              </Link>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white">
                  <FaGithub className="text-sm" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
