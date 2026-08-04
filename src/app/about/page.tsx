import type { Metadata } from 'next'
import ArmLab from '@/components/labs/ArmLab'

export const metadata: Metadata = {
  title: 'About System Identity | Deepak R.',
  description: 'Biography and Core Competencies in Robotics and Machine Learning.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left font-orbitron">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-cyan-400/50 hover:border-cyan-400 transition-colors duration-300 mb-8">
            <img src="/profile.jpg" alt="Deepak R." className="w-full h-full object-cover transition-all duration-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
            DEEPAK <span className="text-cyan-400">R.</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-cyan-200 mb-6 font-space tracking-wide">
            Autonomous Systems Architect
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg font-space text-sm md:text-base leading-relaxed">
            Robotics engineering student at Anna University. Specializing in ROS2 Navigation, YOLO Vision, and Embedded IoT.
            Bridging the gap between theoretical AI and raw physical actuation.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center w-full">
          <h3 className="text-cyan-400 font-orbitron mb-4 text-center">[ 6-DOF KINEMATICS SIMULATION CANVAS ]</h3>
          <div className="w-full max-w-md mx-auto z-10 bg-black/40 p-2 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
            <ArmLab />
          </div>
        </div>
      </div>
    </main>
  )
}
