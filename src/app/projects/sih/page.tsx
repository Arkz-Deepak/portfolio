"use client"
import VisionLab from '@/components/labs/VisionLab'

export default function SihProject() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
          SIH 2025 <span className="text-cyan-400">VISION</span>
        </h1>
        <div className="h-1 w-24 bg-cyan-400 mb-8 rounded-full shadow-[0_0_10px_#00f0ff]" />
        
        <p className="text-gray-300 font-space text-lg leading-relaxed mb-6">
          Smart Traffic Management System & Edge Analytics. A custom neural perception engine capable of processing 
          RGB, Depth, and Thermal modalities for precise semantic tracking and rigid body collision detection in unstructured environments.
        </p>
      </div>

      <div className="bg-gray-900/40 border border-cyan-500/20 p-6 rounded-lg backdrop-blur-sm mb-12">
        <h2 className="text-2xl font-orbitron text-cyan-400 mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          MULTI-MODAL PERCEPTION SIMULATION
        </h2>
        <p className="text-sm text-gray-400 font-space mb-6">
          Toggle between RGB, DEPTH, and THERMAL vision modes to observe how the detection confidence bounds react to the environment.
        </p>
        <VisionLab />
      </div>
    </main>
  )
}
