import type { Metadata } from 'next'
import { projectsData } from '@/data/projects'
import Link from 'next/link'
import { FaArrowLeft, FaCheck, FaMicrochip, FaBolt, FaWifi, FaVideo, FaChartLine } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'EdgeVision NPU Profiler | iQOO Hackathon 2026 Case Study | Deepak R.',
  description: 'Bare-Metal On-Device Edge AI Evaluation Testbench for Qualcomm Snapdragon NPU with Zero-ADB sync and zero-copy 30-60 FPS camera pipeline.',
}

export default function EdgeVisionProject() {
  const project = projectsData.find((p) => p.id === 'edgevision-npu-profiler') || projectsData[0]

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
            iQOO HACKATHON 2026 GRAND FINALE (DEV TOOLS)
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

      {/* Action Links Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-md"
          >
            <span>HACKATHON PITCH DECK</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300 font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
          >
            <span>VIEW SOURCE CODE</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}
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

      {/* System Architecture Overview */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <FaMicrochip className="text-blue-600 dark:text-cyan-400" />
          SYSTEM ARCHITECTURE & NPU BENCHMARKING
        </h2>
        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          {project.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-cyan-400 font-orbitron font-bold text-xs">
              <FaBolt className="text-sm" />
              <span>BARE-METAL NPU</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Bypasses standard CPU emulation by offloading quantized .tflite and ONNX weights directly onto Qualcomm Snapdragon Hexagon NPU tensor accelerators.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-cyan-400 font-orbitron font-bold text-xs">
              <FaWifi className="text-sm" />
              <span>ZERO-ADB WIRELESS</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Eliminates physical USB tethering friction via high-speed Office Kit wireless synchronization, enabling drag-and-drop model delivery in seconds.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-cyan-400 font-orbitron font-bold text-xs">
              <FaVideo className="text-sm" />
              <span>ZERO-COPY CAMERA</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Feeds native Android Camera2 frames directly into NPU input memory buffers, sustaining 30–60 FPS real-time computer vision inference.
            </p>
          </div>
        </div>
      </div>

      {/* Telemetry & Pipeline Highlights */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <FaChartLine className="text-blue-600 dark:text-cyan-400" />
          TECHNICAL HIGHLIGHTS & DEPLOYMENT METRICS
        </h2>
        <div className="space-y-2 bg-slate-50 dark:bg-black/50 p-4 rounded-xl border border-slate-200 dark:border-cyan-900/50">
          <ul className="list-disc list-inside text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

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