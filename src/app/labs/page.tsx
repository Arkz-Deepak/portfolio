import type { Metadata } from 'next'
import SlamLab from '@/components/labs/SlamLab'
import VisionLab from '@/components/labs/VisionLab'
import PidLab from '@/components/labs/PidLab'

export const metadata: Metadata = {
  title: 'Core Physics Labs | Deepak R.',
  description: 'Interactive Physics Simulations and AI algorithms.',
}

export default function LabsPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
          CORE <span className="text-cyan-400">PHYSICS LABS</span>
        </h1>
        <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col w-full max-w-md mx-auto">
          <h2 className="text-2xl font-orbitron text-cyan-300 mb-2">{'>'} LiDAR SLAM Navigation</h2>
          <p className="text-gray-400 font-space mb-6">Responsive canvas showing raycasting and path computation using Artificial Potential Fields.</p>
          <div className="w-full bg-black/40 p-2 rounded-lg border border-cyan-500/20 backdrop-blur-md">
            <SlamLab />
          </div>
        </div>

        <div className="flex flex-col gap-12 w-full max-w-md mx-auto">
          <div>
            <h2 className="text-2xl font-orbitron text-cyan-300 mb-2">{'>'} Neural Perception</h2>
            <p className="text-gray-400 font-space mb-6">Drone surveillance feed simulation with dynamic object tracking and bounding boxes.</p>
            <div className="w-full bg-black/40 p-2 rounded-lg border border-cyan-500/20 backdrop-blur-md">
              <VisionLab />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-orbitron text-cyan-300 mb-2">{'>'} PID Dynamics</h2>
            <p className="text-gray-400 font-space mb-6">Oscilloscope slider for Mass-Spring-Damper tuning.</p>
            <div className="w-full bg-black/40 p-2 rounded-lg border border-cyan-500/20 backdrop-blur-md">
              <PidLab />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
