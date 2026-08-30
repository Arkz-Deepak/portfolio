"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { skillsData } from '@/data/skills'

export default function SkillsSection() {
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 font-space">
      {skillsData.map((cat, idx) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="border p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
              <h3 className="text-base md:text-lg font-bold font-orbitron text-slate-900 dark:text-white">
                {cat.category}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-gray-400 mb-4 leading-relaxed">
              {cat.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1 text-xs font-mono font-bold rounded-lg border transition-all bg-slate-50 text-slate-800 border-slate-300 hover:border-blue-500 dark:bg-black/50 dark:text-cyan-300 dark:border-cyan-500/40 dark:hover:border-cyan-300"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
