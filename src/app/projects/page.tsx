import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Featured Archives | Deepak R.',
  description: 'Projects and Case Studies.',
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
          FEATURED <span className="text-cyan-400">ARCHIVES</span>
        </h1>
        <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link href="/projects/aura">
          <div className="h-full bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400 p-6 rounded-lg backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">AURA</h3>
            <p className="text-xs text-cyan-400 font-orbitron tracking-widest mb-4">[ DEEP REINFORCEMENT LEARNING ]</p>
            <p className="text-sm text-gray-400 font-space mb-6 flex-grow">Acoustic-visual Urban Routing Architecture using SUMO traffic simulator and neural networks.</p>
            <span className="text-cyan-400 text-sm font-bold tracking-wider group-hover:underline mt-auto">VIEW SPECS →</span>
          </div>
        </Link>

        <Link href="/projects/sih">
          <div className="h-full bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400 p-6 rounded-lg backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">SIH 2025 AI</h3>
            <p className="text-xs text-cyan-400 font-orbitron tracking-widest mb-4">[ SMART TRAFFIC MANAGEMENT ]</p>
            <p className="text-sm text-gray-400 font-space mb-6 flex-grow">Dynamic signal optimization using OpenCV, YOLO, and real-time vehicle counting architectures.</p>
            <span className="text-cyan-400 text-sm font-bold tracking-wider group-hover:underline mt-auto">VIEW SPECS →</span>
          </div>
        </Link>

        <Link href="/projects/edge-ai">
          <div className="h-full bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400 p-6 rounded-lg backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">EDGE PERCEPTION</h3>
            <p className="text-xs text-cyan-400 font-orbitron tracking-widest mb-4">[ COMPUTER VISION ]</p>
            <p className="text-sm text-gray-400 font-space mb-6 flex-grow">High-speed vision pipelines combining YOLOv8 and MediaPipe optimized for edge computing.</p>
            <span className="text-cyan-400 text-sm font-bold tracking-wider group-hover:underline mt-auto">VIEW SPECS →</span>
          </div>
        </Link>
      </div>
    </main>
  )
}
