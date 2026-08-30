import type { Metadata } from 'next'
import { projectsData } from '@/data/projects'
import Link from 'next/link'
import { FaArrowLeft, FaCheck, FaBrain, FaCamera } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'AutoTwin-AI | Sim-to-Real Digital Twin Case Study | Deepak R.',
  description: 'Unsupervised convolutional autoencoder anomaly detection with 4,851 Blender OptiX ray-traced domain-randomized synthetic renders.',
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
            SIM-TO-REAL DIGITAL TWIN
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

      {/* Theoretical Formulation */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <FaBrain className="text-blue-600 dark:text-cyan-400" />
          MATHEMATICAL & UNSUPERVISED FORMULATION
        </h2>
        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          AutoTwin-AI sidesteps the costly requirement of capturing physical defective parts by training an unsupervised deep convolutional autoencoder on <strong>4,851 ray-traced pristine CAD renders</strong> under randomized lux (200–1200), specular noise, and camera poses. Anomaly localization is derived directly from the reconstruction residual error:
        </p>

        <div className="p-4 rounded-xl border bg-slate-100 border-slate-300 dark:bg-black/60 dark:border-cyan-500/40 text-center font-mono text-xs md:text-sm font-bold text-slate-900 dark:text-cyan-300 mb-4">
          Residual Loss L(X) = || X - X̂ ||² = ∑ ( x_(i,j) - x̂_(i,j) )²
        </div>

        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300">
          When an anomaly (crack, dent, misaligned weld, or surface flaw) passes under the inspection line camera, the autoencoder fails to reconstruct the unfamiliar defect geometry, generating a sharp spike in residual loss that instantly triggers automated PLC line-trip alerts.
        </p>
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
