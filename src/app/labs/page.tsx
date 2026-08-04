"use client"
import SlamLab from '@/components/labs/SlamLab'
import VisionLab from '@/components/labs/VisionLab'
import PidLab from '@/components/labs/PidLab'
import { useTheme } from '@/components/ThemeProvider'

export default function LabsPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <main className={`min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto transition-colors duration-300 ${
      isDark ? 'text-cyan-400' : 'text-slate-900'
    }`}>
      <div className="text-center mb-16">
        <h1 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          CORE <span className={isDark ? 'text-cyan-400' : 'text-blue-700'}>PHYSICS LABS</span>
        </h1>
        <div className={`h-1 w-24 mx-auto rounded-full ${isDark ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-blue-600'}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col w-full max-w-xl mx-auto">
          <h2 className={`text-2xl font-orbitron mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-900 font-bold'}`}>
            {'>'} LiDAR SLAM Navigation
          </h2>
          <p className={`font-space mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Responsive canvas showing raycasting and path computation using Artificial Potential Fields.
          </p>
          <div className={`w-full p-3 rounded-xl border backdrop-blur-md ${
            isDark ? 'bg-black/40 border-cyan-500/20' : 'bg-white border-slate-200 shadow-md'
          }`}>
            <SlamLab />
          </div>
        </div>

        <div className="flex flex-col gap-12 w-full max-w-xl mx-auto">
          <div>
            <h2 className={`text-2xl font-orbitron mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-900 font-bold'}`}>
              {'>'} Neural Perception
            </h2>
            <p className={`font-space mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Drone surveillance feed simulation with dynamic object tracking, YOLOv8 confidence scores, and depth perception.
            </p>
            <div className={`w-full p-3 rounded-xl border backdrop-blur-md ${
              isDark ? 'bg-black/40 border-cyan-500/20' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <VisionLab />
            </div>
          </div>

          <div>
            <h2 className={`text-2xl font-orbitron mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-900 font-bold'}`}>
              {'>'} PID Dynamics
            </h2>
            <p className={`font-space mb-6 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              Oscilloscope slider for Mass-Spring-Damper tuning.
            </p>
            <div className={`w-full p-3 rounded-xl border backdrop-blur-md ${
              isDark ? 'bg-black/40 border-cyan-500/20' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <PidLab />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
