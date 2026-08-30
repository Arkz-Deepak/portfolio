import type { Metadata } from 'next'
import RobotViewer from '@/components/RobotViewer'
import { projectsData } from '@/data/projects'
import Link from 'next/link'
import { FaArrowLeft, FaCheck, FaMicrochip, FaShieldAlt } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Hybrid Vortex Crawler | NeX-Gen 2026 Case Study | Deepak R.',
  description: 'Negative-pressure aerodynamic vortex wall-climbing robot for industrial NDE inspection with 45N holding force and dual-tier ROS 2/FreeRTOS control.',
}

export default function VortexCrawlerProject() {
  const project = projectsData.find((p) => p.id === 'hybrid-vortex-crawler') || projectsData[0]

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-5xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-space">
      {/* Back Link */}
      <Link 
        href="/projects" 
        className="inline-flex items-center gap-2 text-xs font-orbitron font-bold text-blue-700 dark:text-cyan-400 mb-6 hover:underline"
      >
        <FaArrowLeft className="text-[10px]" />
        <span>BACK TO ARCHIVES</span>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] font-orbitron font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-500/50">
            NEX-GEN ROBOTICS 2026 (IDREA)
          </span>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            {project.date}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mb-2">
          {project.title}
        </h1>
        <p className="text-sm md:text-base font-semibold text-blue-800 dark:text-cyan-300 mb-4">
          {project.subtitle}
        </p>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      {/* 3D Robot Digital Twin Viewer */}
      <div className="mb-12">
        <h2 className="text-lg font-orbitron font-bold text-slate-900 dark:text-cyan-300 mb-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse" />
          INTERACTIVE 3D CAD DIGITAL TWIN
        </h2>
        <RobotViewer modelUrl="/models/vortex-crawler.glb" height="460px" />
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 font-mono text-xs">
        {project.stats?.map((stat, idx) => (
          <div 
            key={idx} 
            className="p-3 rounded-xl border bg-white border-slate-200 shadow-sm dark:bg-gray-900/60 dark:border-cyan-900/60 flex flex-col"
          >
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-orbitron uppercase">
              {stat.label}
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-cyan-300 mt-1">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* System Overview */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3">
          SYSTEM ARCHITECTURE & ACTIVE ADHESION
        </h2>
        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          {project.summary}
        </p>

        <div className="space-y-2 bg-slate-50 dark:bg-black/50 p-4 rounded-xl border border-slate-200 dark:border-cyan-900/50">
          <span className="text-xs font-orbitron font-bold text-slate-900 dark:text-cyan-300 block">
            CORE DESIGN HIGHLIGHTS:
          </span>
          <ul className="list-disc list-inside text-xs leading-relaxed text-slate-600 dark:text-slate-300 space-y-1.5">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Autodesk Fusion Parametric Assembly Specs */}
      {project.cadSpecs && (
        <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
          <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3">
            AUTODESK FUSION PARAMETRIC BILL OF MATERIALS (BOM)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.cadSpecs.map((spec, sIdx) => (
              <div 
                key={sIdx} 
                className="p-2.5 rounded-lg border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40 text-xs flex items-center gap-2"
              >
                <FaCheck className="text-emerald-600 dark:text-emerald-400 text-xs shrink-0" />
                <span className="text-slate-800 dark:text-gray-200">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-slate-100 text-slate-800 border border-slate-300 dark:bg-slate-950 dark:text-cyan-400 dark:border-cyan-900"
          >
            {tech}
          </span>
        ))}
      </div>
    </main>
  )
}
