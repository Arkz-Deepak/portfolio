import type { Metadata } from 'next'
import VisionLab from '@/components/labs/VisionLab'

export const metadata: Metadata = {
  title: 'SIH 2025 AI | Deepak R.',
  description: 'Smart Traffic Management System & Edge Analytics.',
}

export default function SihProject() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-slate-900 dark:text-white mb-4">
          SIH 2025 <span className="text-blue-700 dark:text-cyan-400">VISION</span>
        </h1>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 mb-8 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
        
        <p className="text-slate-700 dark:text-gray-300 font-space text-lg leading-relaxed mb-6">
          Smart Traffic Management System & Edge Analytics. A custom neural perception engine capable of processing 
          RGB, Depth, and Thermal modalities for precise semantic tracking and rigid body collision detection in unstructured environments.
        </p>
      </div>

      <div className="p-6 rounded-xl border backdrop-blur-md mb-12 bg-white border-slate-200 shadow-md dark:bg-gray-900/40 dark:border-cyan-500/20">
        <h2 className="text-2xl font-orbitron text-blue-900 dark:text-cyan-400 mb-6 flex items-center gap-2 font-bold">
          <span className="w-2.5 h-2.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse" />
          MULTI-MODAL PERCEPTION SIMULATION
        </h2>
        <p className="text-sm text-slate-600 dark:text-gray-400 font-space mb-6">
          Toggle between RGB, DEPTH, and THERMAL vision modes to observe how the detection confidence bounds react to the environment.
        </p>
        <VisionLab />
      </div>
    </main>
  )
}
