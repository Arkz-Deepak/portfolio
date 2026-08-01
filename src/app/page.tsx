"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '@/components/ParticleBackground'
import Link from 'next/link'
import ArmLab from '@/components/labs/ArmLab'
import SlamLab from '@/components/labs/SlamLab'
import VisionLab from '@/components/labs/VisionLab'
import PidLab from '@/components/labs/PidLab'
import Terminal from '@/components/Terminal'

export default function Home() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (booting) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-cyan-400 font-orbitron">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-2xl tracking-widest text-center px-4"
        >
          INITIALIZING DEEPAK.OS V2.0...
        </motion.div>
        <div className="mt-4 w-64 h-1 bg-gray-900 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'linear' }}
            className="h-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]"
          />
        </div>
      </div>
    )
  }

  return (
    <main className="snap-y snap-proximity h-screen w-full overflow-y-scroll overflow-x-hidden scroll-smooth relative">
      <div className="fixed inset-0 z-[-1]">
        <ParticleBackground />
      </div>

      {/* SECTION 01: HERO & KINEMATICS */}
      <section id="hero" className="snap-start min-h-screen w-full flex items-center justify-center relative px-4 py-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left font-orbitron"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-cyan-400/50 hover:border-cyan-400 transition-colors duration-300 mb-8">
              <img src="/profile.jpg" alt="Deepak R." className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <h3 className="text-cyan-400 font-orbitron mb-4 text-center">[ 6-DOF KINEMATICS SIMULATION CANVAS ]</h3>
            <div className="w-full max-w-md mx-auto z-10 bg-black/40 p-2 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
              <ArmLab />
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-cyan-400/50 text-xs font-space tracking-widest hidden md:block">
          ↓ SYSTEM OVERRIDE ↓
        </div>
      </section>

      {/* SECTION 02: CORE PHYSICS LABS */}
      <section id="labs" className="snap-start min-h-screen w-full flex items-center justify-center relative px-4 py-20 bg-black/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">
              CORE <span className="text-cyan-400">PHYSICS LABS</span>
            </h2>
            <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_10px_#00f0ff]" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Lab 1 */}
            <div className="flex flex-col w-full max-w-md mx-auto">
              <h3 className="text-xl font-orbitron text-cyan-300 mb-2">{'>'} LiDAR SLAM Navigation</h3>
              <p className="text-gray-400 font-space text-sm mb-4">Responsive canvas showing raycasting and path computation.</p>
              <div className="w-full bg-black/40 p-2 rounded-lg border border-cyan-500/20">
                <SlamLab />
              </div>
            </div>
            
            <div className="flex flex-col gap-12 w-full max-w-md mx-auto">
              {/* Lab 2 */}
              <div>
                <h3 className="text-xl font-orbitron text-cyan-300 mb-2">{'>'} Neural Perception</h3>
                <p className="text-gray-400 font-space text-sm mb-4">Vision grid with target payload bounding boxes.</p>
                <div className="w-full bg-black/40 p-2 rounded-lg border border-cyan-500/20">
                  <VisionLab />
                </div>
              </div>
              
              {/* Lab 3 */}
              <div>
                <h3 className="text-xl font-orbitron text-cyan-300 mb-2">{'>'} PID Dynamics</h3>
                <p className="text-gray-400 font-space text-sm mb-4">Oscilloscope slider for Mass-Spring-Damper tuning.</p>
                <div className="w-full bg-black/40 p-2 rounded-lg border border-cyan-500/20">
                  <PidLab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: FEATURED ARCHIVES */}
      <section id="projects" className="snap-start min-h-screen w-full flex items-center justify-center relative px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">
              FEATURED <span className="text-cyan-400">ARCHIVES</span>
            </h2>
            <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/projects/aura">
              <motion.div whileHover={{ scale: 1.02 }} className="h-full bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400 p-6 rounded-lg backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">AURA</h3>
                <p className="text-xs text-cyan-400 font-orbitron tracking-widest mb-4">[ DEEP REINFORCEMENT LEARNING ]</p>
                <p className="text-sm text-gray-400 font-space mb-6 flex-grow">Acoustic-visual Urban Routing Architecture using SUMO traffic simulator and neural networks.</p>
                <span className="text-cyan-400 text-sm font-bold tracking-wider group-hover:underline mt-auto">VIEW SPECS →</span>
              </motion.div>
            </Link>

            <Link href="/projects/sih">
              <motion.div whileHover={{ scale: 1.02 }} className="h-full bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400 p-6 rounded-lg backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">SIH 2025 AI</h3>
                <p className="text-xs text-cyan-400 font-orbitron tracking-widest mb-4">[ SMART TRAFFIC MANAGEMENT ]</p>
                <p className="text-sm text-gray-400 font-space mb-6 flex-grow">Dynamic signal optimization using OpenCV, YOLO, and real-time vehicle counting architectures.</p>
                <span className="text-cyan-400 text-sm font-bold tracking-wider group-hover:underline mt-auto">VIEW SPECS →</span>
              </motion.div>
            </Link>

            <Link href="/projects/edge-ai">
              <motion.div whileHover={{ scale: 1.02 }} className="h-full bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400 p-6 rounded-lg backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">EDGE PERCEPTION</h3>
                <p className="text-xs text-cyan-400 font-orbitron tracking-widest mb-4">[ COMPUTER VISION ]</p>
                <p className="text-sm text-gray-400 font-space mb-6 flex-grow">High-speed vision pipelines combining YOLOv8 and MediaPipe optimized for edge computing.</p>
                <span className="text-cyan-400 text-sm font-bold tracking-wider group-hover:underline mt-auto">VIEW SPECS →</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 04: ENGINEERING TIMELINE */}
      <section id="timeline" className="snap-start min-h-screen w-full flex items-center justify-center relative px-4 py-20 bg-black/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">
              ENGINEERING <span className="text-cyan-400">TIMELINE</span>
            </h2>
            <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_10px_#00f0ff]" />
          </div>
          
          <div className="relative w-full">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan-900/50 -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Timeline 1 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-6 h-6 rounded-full border-4 border-cyan-400 bg-black z-10 mb-6 shadow-[0_0_15px_#00f0ff]"></div>
                <h3 className="text-xl font-orbitron text-white mb-2">TAMIZHAN SKILLS</h3>
                <p className="text-cyan-400 font-space text-sm mb-4">RISE Program</p>
                <p className="text-gray-400 font-space text-sm">Core robotics foundation and autonomous systems architecture.</p>
              </div>
              
              {/* Timeline 2 */}
              <div className="flex flex-col items-center text-center relative md:-mt-16">
                <div className="w-6 h-6 rounded-full border-4 border-cyan-400 bg-black z-10 mb-6 shadow-[0_0_15px_#00f0ff] md:absolute md:top-16"></div>
                <h3 className="text-xl font-orbitron text-white mb-2 md:mt-24">CODEALPHA</h3>
                <p className="text-cyan-400 font-space text-sm mb-4">Software Engineering</p>
                <p className="text-gray-400 font-space text-sm">Development of algorithmic pipelines and data structures.</p>
              </div>
              
              {/* Timeline 3 */}
              <div className="flex flex-col items-center text-center relative">
                <div className="w-6 h-6 rounded-full border-4 border-cyan-400 bg-black z-10 mb-6 shadow-[0_0_15px_#00f0ff]"></div>
                <h3 className="text-xl font-orbitron text-white mb-2">CHENNAI PORT</h3>
                <p className="text-cyan-400 font-space text-sm mb-4">Authority Intern</p>
                <p className="text-gray-400 font-space text-sm">Industrial automation and heavy mechatronics observation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: DEEPAK-OS TERMINAL & CONTACT */}
      <section id="terminal" className="snap-start min-h-screen w-full flex items-center justify-center relative px-4 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">
              DEEPAK-OS <span className="text-cyan-400">TERMINAL</span>
            </h2>
            <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full">
              <Terminal />
            </div>
            <div className="w-full bg-gray-900/40 p-8 rounded-lg border border-cyan-500/20 backdrop-blur-md">
              <h3 className="text-2xl font-orbitron text-white mb-6">ENCRYPTED TRANSMISSION</h3>
              <p className="text-gray-400 font-space text-sm mb-8">
                Final scroll-snap section containing the interactive CLI terminal and the secure contact form to transmit direct signals to my inbox.
              </p>
              <form className="flex flex-col gap-4 font-space" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="IDENTITY (NAME)" className="w-full bg-black/50 border border-cyan-900 focus:border-cyan-400 rounded p-3 text-cyan-400 outline-none transition-colors" />
                <input type="email" placeholder="RETURN_PATH (EMAIL)" className="w-full bg-black/50 border border-cyan-900 focus:border-cyan-400 rounded p-3 text-cyan-400 outline-none transition-colors" />
                <textarea placeholder="PAYLOAD (MESSAGE)" rows={4} className="w-full bg-black/50 border border-cyan-900 focus:border-cyan-400 rounded p-3 text-cyan-400 outline-none transition-colors resize-none"></textarea>
                <button type="submit" className="w-full py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-bold tracking-widest mt-2">
                  TRANSMIT SIGNAL
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
