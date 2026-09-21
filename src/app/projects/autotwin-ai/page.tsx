import type { Metadata } from 'next'
import { projectsData } from '@/data/projects'
import Link from 'next/link'
import { FaArrowLeft, FaCheck, FaBrain, FaCamera, FaEye, FaChartLine, FaRobot } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'AutoTwin-AI v2: Spatiotemporal ConvLSTM | HackNIMA 2026 Case Study | Deepak R.',
  description: 'In-situ predictive robotic weld monitoring fusing eye-in-hand thermal imaging with ConvLSTM2d networks, next-frame MSE anomaly spikes (<40ms TensorRT), and Three.js 3D Digital Twin HUD.',
}

export default function AutoTwinProject() {
  const project = projectsData.find((p) => p.id === 'autotwin-ai') || projectsData[1]

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
            HACKNIMA 2026 ROUND 2 (DOMAIN 2: AI ENHANCEMENT)
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
            <span>HACKNIMA PITCH DECK</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}
        {project.paperUrl && (
          <a
            href={project.paperUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-400 dark:hover:text-black font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
          >
            <span>TECHNICAL SPECIFICATION</span>
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

      {/* Theoretical & Spatiotemporal Formulation */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <FaBrain className="text-blue-600 dark:text-cyan-400" />
          SPATIOTEMPORAL 5D TENSOR & NEXT-FRAME PREDICTION
        </h2>
        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          AutoTwin-AI v2 advances beyond static 2D image analysis into a continuous predictive spatiotemporal deep learning framework. Streaming 30 FPS radiometric thermal video is ingested into 5D PyTorch tensors:
        </p>

        <div className="p-4 rounded-xl border bg-slate-100 border-slate-300 dark:bg-black/60 dark:border-cyan-500/40 text-center font-mono text-xs md:text-sm font-bold text-slate-900 dark:text-cyan-300 mb-4">
          Tensor Shape: [Batch, Time, Channels, Height, Width] = (B, T, C, H, W)
        </div>

        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          The network couples <strong>TimeDistributed 2D CNNs</strong> (which extract spatial molten weld pool boundary geometries) with <strong>ConvLSTM2d recurrent layers</strong> (which model thermodynamic fluid flow and non-linear cooling rates across time). The model operates via unsupervised next-frame prediction:
        </p>

        <div className="p-4 rounded-xl border bg-slate-100 border-slate-300 dark:bg-black/60 dark:border-cyan-500/40 text-center font-mono text-xs md:text-sm font-bold text-slate-900 dark:text-cyan-300 mb-4">
          Prediction Loss: L_MSE = (1 / (C × H × W)) ∑ || X_(t+1) - X̂_(t+1) ||²
        </div>

        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300">
          Under nominal steady-state welding, predicted thermal frames match the actual cooling curve, maintaining a near-zero MSE residual. When a transient anomaly occurs—such as a subsurface porosity void, spatter burst, or lack of sidewall fusion—the ConvLSTM prediction diverges sharply, triggering real-time line-trip alerts in <strong>under 40ms on NVIDIA TensorRT</strong>.
        </p>
      </div>

      {/* Eye-in-Hand TCP Telemetry & Digital Twin HUD */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <FaRobot className="text-blue-600 dark:text-cyan-400" />
          EYE-IN-HAND TCP TELEMETRY & 3D DIGITAL TWIN HUD
        </h2>
        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          The physical sensing rig features a Long-Wave Infrared (LWIR) radiometric thermal camera mounted directly on the robotic manipulator end-effector, locked to the <strong>Tool Center Point (TCP)</strong>. Real-time telemetry is streamed via FastAPI and WebSockets into a React 18 + Three.js 3D inspection dashboard:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <span className="font-orbitron font-bold text-xs text-blue-700 dark:text-cyan-400 block mb-1">
              EYE-IN-HAND TCP STABILIZATION
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Maintains constant focal distance and viewing angle relative to the active arc regardless of 6-DOF robot arm kinematic maneuvers.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <span className="font-orbitron font-bold text-xs text-blue-700 dark:text-cyan-400 block mb-1">
              REAL-TIME SPATTER DENSITY (S_DOT)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Computes active arc duration, localized peak temperature gradients, and spatter ejection rate mapped directly onto the 3D digital twin mesh.
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Highlights */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3">
          PERFORMANCE BENCHMARKS & EDGE DEPLOYMENT
        </h2>
        <ul className="list-disc list-inside text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
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
