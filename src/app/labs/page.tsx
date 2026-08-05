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
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">
          CORE <span className="text-blue-700 dark:text-cyan-400">PHYSICS LABS</span>
        </h1>
        <div className="h-1 w-24 mx-auto rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full mb-12">
        <div className="flex flex-col w-full max-w-xl mx-auto">
          <h2 className="text-2xl font-orbitron mb-2 text-blue-900 dark:text-cyan-300 font-bold">
            {'>'} LiDAR SLAM Navigation
          </h2>
          <p className="font-space mb-6 text-slate-600 dark:text-gray-400">
            Responsive canvas showing raycasting and path computation using Artificial Potential Fields.
          </p>
          <div className="w-full p-3 rounded-xl border backdrop-blur-md bg-white border-slate-200 shadow-md dark:bg-black/40 dark:border-cyan-500/20">
            <SlamLab />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-xl mx-auto">
          <h2 className="text-2xl font-orbitron mb-2 text-blue-900 dark:text-cyan-300 font-bold">
            {'>'} Neural Perception
          </h2>
          <p className="font-space mb-6 text-slate-600 dark:text-gray-400">
            Drone surveillance feed simulation with dynamic object tracking, YOLOv8 confidence scores, and depth perception.
          </p>
          <div className="w-full p-3 rounded-xl border backdrop-blur-md bg-white border-slate-200 shadow-md dark:bg-black/40 dark:border-cyan-500/20">
            <VisionLab />
          </div>
        </div>
      </div>

      {/* PID Dynamics Centered Full-Width Container */}
      <div className="flex justify-center items-center mx-auto w-full max-w-3xl">
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-orbitron mb-2 text-blue-900 dark:text-cyan-300 font-bold text-center">
            {'>'} PID Dynamics & Step Response
          </h2>
          <p className="font-space mb-6 text-slate-600 dark:text-gray-400 text-center">
            Oscilloscope slider for Mass-Spring-Damper tuning, step disturbance impulse, and gain optimization.
          </p>
          <div className="w-full p-4 rounded-xl border backdrop-blur-md bg-white border-slate-200 shadow-md dark:bg-black/40 dark:border-cyan-500/20">
            <PidLab />
          </div>
        </div>
      </div>
    </main>
  )
}
