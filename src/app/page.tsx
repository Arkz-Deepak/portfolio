"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '@/components/ParticleBackground'
import Terminal from '@/components/Terminal'
import Link from 'next/link'
import ArmLab from '@/components/labs/ArmLab'

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
          className="text-2xl tracking-widest"
        >
          INITIALIZING DEEPAK.OS...
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
    <main className="w-full overflow-x-hidden scroll-smooth">
      <ParticleBackground />

      {/* SECTION 1: HERO */}
      <section className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center relative px-4 pt-20 pb-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md mx-auto z-10">
              <ArmLab />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left font-orbitron"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
              DEEPAK <span className="text-cyan-400">R.</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-cyan-200 mb-6 font-space tracking-wide">
              Aspiring Robotics & ML Engineer
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 font-space text-sm md:text-base leading-relaxed">
              Specializing in ROS2, Deep Reinforcement Learning, and Edge AI.
              Building autonomous systems and smart architecture for the future.
            </p>
            <div className="flex gap-4 justify-center md:justify-start mb-12">
              <a href="#projects" className="px-6 py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] font-bold tracking-wider inline-block">
                VIEW LABS
              </a>
            </div>

            {/* Terminal Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full"
            >
              <Terminal />
            </motion.div>
          </motion.div>
          
          {/* Floating Telemetry Stats */}
          <div className="absolute top-24 right-4 hidden lg:flex flex-col gap-4 font-space text-xs text-cyan-400/50 pointer-events-none text-right">
            <div>SYS.MEM: 64.2TB / 128TB</div>
            <div>NET.UPLINK: 42.1 Gbps</div>
            <div>CORE.TEMP: 42°C</div>
            <div>ACTIVE_AGENTS: 4</div>
            <div className="w-24 h-px bg-cyan-400/30 ml-auto mt-2 mb-2"></div>
            <div className="animate-pulse">RUNNING KINEMATICS...</div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-cyan-400/50 hidden md:block">
          ↓ SCROLL TO EXPLORE
        </div>
      </section>

      {/* SECTION 2: PROJECTS HUB */}
      <section id="projects" className="min-h-screen w-full flex items-center justify-center relative px-4 py-20 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4">
              FEATURED <span className="text-cyan-400">ARCHIVES</span>
            </h2>
            <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <Link href="/projects/aura">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400 p-6 rounded-lg backdrop-blur-md transition-all duration-300 group cursor-pointer"
              >
                <div className="h-40 bg-black border border-gray-800 mb-4 rounded flex items-center justify-center text-cyan-400/30 group-hover:text-cyan-400/80 font-orbitron">
                  [AURA VECTOR]
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-orbitron">AURA</h3>
                <p className="text-sm text-gray-400 font-space mb-4">Deep Reinforcement Learning & SUMO Traffic Routing</p>
                <span className="text-cyan-400 text-sm font-bold tracking-wider group-hover:underline">VIEW SPECS →</span>
              </motion.div>
            </Link>

            {/* Project 2 */}
            <Link href="/projects/sih">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400 p-6 rounded-lg backdrop-blur-md transition-all duration-300 group cursor-pointer"
              >
                <div className="h-40 bg-black border border-gray-800 mb-4 rounded flex items-center justify-center text-cyan-400/30 group-hover:text-cyan-400/80 font-orbitron">
                  [SIH VISION]
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-orbitron">SIH 2025 AI</h3>
                <p className="text-sm text-gray-400 font-space mb-4">Smart Traffic Management System & Edge Analytics</p>
                <span className="text-cyan-400 text-sm font-bold tracking-wider group-hover:underline">VIEW SPECS →</span>
              </motion.div>
            </Link>

            {/* Project 3 */}
            <Link href="/projects/edge-ai">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-400 p-6 rounded-lg backdrop-blur-md transition-all duration-300 group cursor-pointer"
              >
                <div className="h-40 bg-black border border-gray-800 mb-4 rounded flex items-center justify-center text-cyan-400/30 group-hover:text-cyan-400/80 font-orbitron">
                  [YOLO PIPELINE]
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-orbitron">Edge Perception</h3>
                <p className="text-sm text-gray-400 font-space mb-4">Real-Time Object Detection with YOLOv8 & MediaPipe</p>
                <span className="text-cyan-400 text-sm font-bold tracking-wider group-hover:underline">VIEW SPECS →</span>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
