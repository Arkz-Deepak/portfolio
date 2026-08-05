import type { Metadata } from 'next'
import SlamLab from '@/components/labs/SlamLab'

export const metadata: Metadata = {
  title: 'AURA Project | Deepak R.',
  description: 'Deep Reinforcement Learning & SUMO Traffic Routing Simulation.',
}

export default function AuraProject() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-slate-900 dark:text-white mb-4">
          AURA <span className="text-blue-700 dark:text-cyan-400">VECTOR</span>
        </h1>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 mb-8 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
        
        <p className="text-slate-700 dark:text-gray-300 font-space text-lg leading-relaxed mb-6">
          Deep Reinforcement Learning & SLAM Pathfinding applied to Autonomous Mobile Robots (AMR). 
          The AURA system uses artificial potential fields and LiDAR-like scans to dynamically route 
          around obstacles while maintaining velocity caps and collision avoidance.
        </p>
      </div>

      <div className="p-6 rounded-xl border backdrop-blur-md mb-12 bg-white border-slate-200 shadow-md dark:bg-gray-900/40 dark:border-cyan-500/20">
        <h2 className="text-2xl font-orbitron text-blue-900 dark:text-cyan-400 mb-6 flex items-center gap-2 font-bold">
          <span className="w-2.5 h-2.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse" />
          LIVE SLAM SIMULATION
        </h2>
        <p className="text-sm text-slate-600 dark:text-gray-400 font-space mb-6">
          Click anywhere on the grid to set a new waypoint for the AMR. Watch it calculate repelling forces from obstacles.
        </p>
        <SlamLab />
      </div>
    </main>
  )
}
