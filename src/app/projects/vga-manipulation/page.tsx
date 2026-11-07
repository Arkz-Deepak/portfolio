import type { Metadata } from 'next'
import { projectsData } from '@/data/projects'
import Link from 'next/link'
import { FaArrowLeft, FaCheck, FaRobot, FaBrain, FaWaveSquare, FaChartLine, FaGithub, FaPlay } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'VGA Policy: Vision-Geometry-Action Robotic Manipulation | Case Study | Deepak R.',
  description: 'Hard real-time embodied AI policy running at 154-215 Hz in closed-loop MuJoCo physics with 89.1% jerk reduction on LIBERO-Spatial.',
}

export default function VgaManipulationProject() {
  const project = projectsData.find((p) => p.id === 'vga-robotic-manipulation') || projectsData[0]

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
            EMBODIED AI & ROBOTIC MANIPULATION (OCT 2026)
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
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-md"
          >
            <FaGithub className="text-xs" />
            <span>VIEW GITHUB REPOSITORY</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}
        <a
          href="https://openreview.net/profile?id=~Deepak_R2"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300 font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
        >
          <FaBrain className="text-xs" />
          <span>OPENREVIEW PROFILE</span>
          <span className="text-[10px]">↗</span>
        </a>
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
            <span className="text-xs sm:text-sm font-black text-blue-900 dark:text-cyan-300 mt-1">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Video Demonstration 1: Closed-Loop MuJoCo Pick-and-Place */}
      <section className="mb-12 p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/50 dark:border-cyan-500/30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-lg md:text-xl font-bold font-orbitron text-slate-900 dark:text-white">
              CLOSED-LOOP MUJOCO SIMULATION
            </h2>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-cyan-50 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40">
            AUTONOMOUS PICK & PLACE (STEP 118)
          </span>
        </div>
        
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-cyan-500/40 bg-black aspect-video shadow-lg">
          <video
            src="/videos/vga-mujoco-pickplace.mp4"
            poster="/images/projects/vga-manipulation-preview.png"
            controls
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-xs font-space text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          Closed-loop physical rollout executing inside MuJoCo physics middleware on LIBERO-Spatial. 
          The VGA policy ingests RGB camera views (256x256), predicts 16-step action chunks via Flow Matching Diffusion, 
          and grasps the object smoothly with finite-difference jerk suppression.
        </p>
      </section>

      {/* Side-by-Side Video Demonstration: VGA vs SmolVLA */}
      <section className="mb-12 p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/50 dark:border-cyan-500/30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-lg md:text-xl font-bold font-orbitron text-slate-900 dark:text-white">
              BENCHMARK COMPARISON: VGA vs SmolVLA-450M
            </h2>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40">
            89.1% JERK REDUCTION & 8.7x CONTROL SPEED
          </span>
        </div>
        
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-cyan-500/40 bg-black aspect-video shadow-lg">
          <video
            src="/videos/vga-vs-smolvla-comparison.mp4"
            controls
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-xs font-space text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          Side-by-side benchmark comparison running identical tasks. SmolVLA-450M baseline exhibits high-frequency joint chatter 
          and latency limits (&lt;25 Hz), whereas the VGA Policy with Flow Matching and Kinematic Jerk Loss achieves smooth, 
          stable end-effector trajectories operating at 154–215 Hz.
        </p>
      </section>

      {/* Screencast Video: Workstation Real-Time Telemetry */}
      <section className="mb-12 p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/50 dark:border-cyan-500/30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            <h2 className="text-lg md:text-xl font-bold font-orbitron text-slate-900 dark:text-white">
              WORKSTATION SIMULATION & TELEMETRY SCREENCAST
            </h2>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300 dark:border-purple-500/40">
            4.6ms INFERENCE LATENCY
          </span>
        </div>
        
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-cyan-500/40 bg-black aspect-video shadow-lg">
          <video
            src="/videos/vga-live-simulation-screencast.webm"
            controls
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-xs font-space text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          Full workstation recording showing live execution: Python evaluation runtime streaming actions into MuJoCo 
          with real-time control frequency monitors, memory profiling, and zero-drop trajectory adherence.
        </p>
      </section>

      {/* Architecture & Formulation */}
      <section className="mb-12 p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/50 dark:border-cyan-500/30 backdrop-blur-md">
        <h2 className="text-lg md:text-xl font-bold font-orbitron text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <FaBrain className="text-blue-600 dark:text-cyan-400" />
          <span>NEURAL ARCHITECTURE & MATHEMATICAL FORMULATION</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/40 dark:border-cyan-900/60">
            <h3 className="text-xs font-orbitron font-bold text-blue-800 dark:text-cyan-300 mb-2">
              1. CENTROID-RAY ROTARY POSITION EMBEDDING (CentroidRayRoPE)
            </h3>
            <p className="text-xs font-space text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Maps 2D pixel coordinates directly to physical 3D camera rays relative to focal lengths and principal center:
            </p>
            <div className="p-2 rounded bg-slate-100 dark:bg-slate-900 font-mono text-[11px] text-cyan-600 dark:text-cyan-300 border border-slate-200 dark:border-cyan-900/50 mb-2">
              r_(u,v) = [(u - c_x)/f_x, (v - c_y)/f_y, 1]^T
            </div>
            <p className="text-xs font-space text-slate-600 dark:text-slate-300 leading-relaxed">
              Rotary embeddings are modulated by spatial ray angles, granting the transformer scale-invariant geometric awareness without depth sensors.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/40 dark:border-cyan-900/60">
            <h3 className="text-xs font-orbitron font-bold text-blue-800 dark:text-cyan-300 mb-2">
              2. KINEMATIC JERK ANNEALING LOSS
            </h3>
            <p className="text-xs font-space text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Standard diffusion policies suffer from high-frequency velocity jitter. We enforce finite-difference acceleration and jerk regularizers:
            </p>
            <div className="p-2 rounded bg-slate-100 dark:bg-slate-900 font-mono text-[11px] text-cyan-600 dark:text-cyan-300 border border-slate-200 dark:border-cyan-900/50 mb-2">
              L_kin = alpha * ||d^2 q / dt^2||^2 + beta * ||d^3 q / dt^3||^2
            </div>
            <p className="text-xs font-space text-slate-600 dark:text-slate-300 leading-relaxed">
              Annealed dynamically over training to eliminate motor vibration while preserving rapid grasp initiation.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <h3 className="text-xs font-orbitron font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">
          CORE STACK & MIDDLEWARE
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-slate-100 text-slate-800 border border-slate-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-500/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Engineering Highlights */}
      <section className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/50 dark:border-cyan-500/30 backdrop-blur-md">
        <h2 className="text-lg md:text-xl font-bold font-orbitron text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <FaCheck className="text-emerald-500" />
          <span>EMPIRICAL MILESTONES</span>
        </h2>
        <ul className="space-y-3 font-space text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {project.highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
