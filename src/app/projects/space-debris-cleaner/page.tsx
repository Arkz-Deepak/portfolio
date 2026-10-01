import type { Metadata } from 'next'
import { projectsData } from '@/data/projects'
import Link from 'next/link'
import { FaArrowLeft, FaCheck, FaRocket, FaSatellite, FaBolt, FaMicrochip, FaGlobe, FaShieldAlt } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Orbital ADR: Autonomous Space Debris Cleaner | SIH 2026 Case Study | Deepak R.',
  description: 'Active Debris Removal (ADR) orbital spacecraft with octagonal bus, 4-piston kinetic compression damping, electroadhesive capture, and Jetson/STM32 segregated dual-compute (SIH26226).',
}

export default function SpaceDebrisCleanerProject() {
  const project = projectsData.find((p) => p.id === 'sih-space-debris-cleaner') || projectsData[0]

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
            SMART INDIA HACKATHON 2026 (HARDWARE EDITION | SPACE TECH)
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
            <FaGlobe className="text-xs" />
            <span>MISSION CONTROL HUD</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}
        {project.docsUrl && (
          <a
            href={project.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-400 dark:hover:text-black font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
          >
            <span>JEKYLL DOCS (ARCHITECT)</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}
        {project.cadUrl && (
          <a
            href={project.cadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-indigo-600 bg-indigo-50 text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-indigo-400 dark:hover:text-black font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
          >
            <FaSatellite className="text-xs" />
            <span>AUTODESK FUSION 3D CAD</span>
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
        <a
          href="https://drive.google.com/file/d/12JVw7FkFINbGMeh3Hg4Ox7ZEKTkyOzMo/view?usp=drivesdk"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl border border-amber-500 bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/40 dark:border-amber-400 dark:text-amber-300 dark:hover:bg-amber-400 dark:hover:text-black font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
        >
          <span>SIH PITCH DECK</span>
          <span className="text-[10px]">↗</span>
        </a>
      </div>

      {/* Visual Render Banner */}
      <div className="mb-10 rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-cyan-500/40 shadow-xl bg-slate-950 relative group">
        <img
          src="/images/projects/sih-space-debris-preview.png"
          alt="Orbital ADR Autonomous Space Debris Cleaner"
          className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-3 left-3 bg-slate-950/85 border border-slate-700 dark:border-cyan-500/40 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 backdrop-blur-md shadow-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-orbitron font-bold text-white text-[10px] sm:text-xs">DIGITAL TWIN:</span>
          <span className="text-[10px] sm:text-xs">OCTAGONAL BUS & ELECTROADHESIVE CAPTURE IN LEO</span>
        </div>
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
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <FaRocket className="text-blue-600 dark:text-cyan-400" />
          SYSTEM ARCHITECTURE & ACTIVE DEBRIS REMOVAL (ADR)
        </h2>
        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          {project.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-cyan-400 font-orbitron font-bold text-xs">
              <FaSatellite className="text-sm" />
              <span>PHASE 1: CHASER RENDEZVOUS</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Vision-guided autonomous proximity operations and attitude synchronization matching the rotational axes of tumbling, non-cooperative orbital debris targets.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-cyan-400 font-orbitron font-bold text-xs">
              <FaShieldAlt className="text-sm" />
              <span>PHASE 2: DEORBIT BRAKING</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Deploys dedicated solid-rocket braking booster modules onto massive defunct satellites to execute safe atmospheric reentry burns without depleting the mothership's main Δv reserves.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-cyan-400 font-orbitron font-bold text-xs">
              <FaGlobe className="text-sm" />
              <span>PHASE 3: REUSABLE ORBITAL TUG</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Serves as an enduring in-orbit logistics and positioning platform capable of station-keeping, orbital transfer, and commercial space station module berthing.
            </p>
          </div>
        </div>
      </div>

      {/* Hardware & Kinetic Damping Engineering */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <FaBolt className="text-blue-600 dark:text-cyan-400" />
          ELECTROADHESION & 4-PISTON KINETIC DAMPING
        </h2>
        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          Capturing uncooperative space debris presents two fundamental mechanical challenges: docking collision kinetics and non-magnetic material compositions. This architecture overcomes both through integrated mechanical and electrodynamic design:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <span className="font-orbitron font-bold text-xs text-blue-700 dark:text-cyan-400 block mb-1">
              4-PISTON KINETIC COMPRESSION SYSTEM (CS)
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Quad mechanical shock-absorbing compression pistons absorb kinetic impact energy during high-mass debris contact, stabilizing the chaser bus and eliminating rebound oscillations.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <span className="font-orbitron font-bold text-xs text-blue-700 dark:text-cyan-400 block mb-1">
              COMPLIANT ELECTROADHESIVE CAPTURE SURFACE
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Uses high-voltage, low-current electrostatic polarization to generate compliant clamping force across non-conductive carbon fiber composites, solar panel glass, and painted satellite hulls.
            </p>
          </div>
        </div>
      </div>

      {/* Dual-Compute Architecture */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <FaMicrochip className="text-blue-600 dark:text-cyan-400" />
          SEGREGATED DUAL-COMPUTE EMBEDDED HIERARCHY
        </h2>
        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          Mission safety in microgravity requires strict compute segregation between heavy neural vision pipelines and time-critical reaction control thruster actuation:
        </p>

        <div className="p-4 rounded-xl border bg-slate-100 border-slate-300 dark:bg-black/60 dark:border-cyan-500/40 font-mono text-xs md:text-sm leading-relaxed text-slate-900 dark:text-cyan-300 mb-4">
          [Stereo Vision + SpaceYOLO (Jetson Nano)] ──UART──&gt; [STM32 MCU (Microsecond Cold-Gas Thrusters + Damping CS)]
        </div>

        <ul className="list-disc list-inside text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
          <li><strong>High-Level Compute (NVIDIA Jetson Nano)</strong>: Ingests dual stereo camera frames to run SpaceYOLO and OpenCV feature extraction, estimating relative 6-DOF pose vectors and rotation velocity vectors of tumbling targets in real-time.</li>
          <li><strong>Low-Level Real-Time Controller (STM32)</strong>: Executes deterministic, microsecond-accurate cold-gas Reaction Control System (RCS) pulse-width firings to maintain precise orbital station-keeping within millimeter tolerances.</li>
          <li><strong>Telemetry Downlink (FastAPI + WebSockets)</strong>: Streams live orbital coordinates, capture plate status, and attitude matrices into a real-time Three.js WebGL mission control console at <a href="http://sih-space-tech.deepak-arkz.me/" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-cyan-300 underline font-bold">sih-space-tech.deepak-arkz.me</a>.</li>
        </ul>
      </div>

      {/* Engineering Highlights */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3">
          TECHNICAL HIGHLIGHTS & MISSION READINESS
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
