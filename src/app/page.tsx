"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '@/components/ParticleBackground'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'

export default function Home() {
  const [booting, setBooting] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Web3Forms State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('error')
      setStatusMessage('PLEASE FILL OUT ALL TRANSMISSION FIELDS.')
      return
    }

    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!apiKey) {
      setStatus('error')
      setStatusMessage('WEB3FORMS ACCESS KEY MISSING IN ENVIRONMENT (NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY).')
      return
    }

    setStatus('submitting')
    setStatusMessage('ESTABLISHING ENCRYPTED LINK...')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: apiKey,
          subject: `DEEPAK-OS Transmission from ${formState.name}`,
          from_name: 'DEEPAK-OS Portfolio',
          to_email: 'wssedd18@gmail.com',
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      })

      const result = await res.json()
      if (result.success) {
        setStatus('success')
        setStatusMessage('[ TRANSMISSION DELIVERED TO wssedd18@gmail.com ]')
        setFormState({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setStatusMessage(result.message || 'TRANSMISSION FAILED. CHECK NETWORK FREQUENCY.')
      }
    } catch (err) {
      setStatus('error')
      setStatusMessage('SIGNAL INTERRUPTED. PLEASE RETRY AGAIN.')
    }
  }

  if (booting) {
    return (
      <div className="h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex flex-col items-center justify-center font-orbitron transition-colors bg-slate-50 dark:bg-slate-950 text-blue-900 dark:text-cyan-400">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-2xl tracking-widest text-center px-4"
        >
          INITIALIZING DEEPAK.OS V2.0...
        </motion.div>
        <div className="mt-4 w-64 h-1 overflow-hidden bg-slate-200 dark:bg-gray-900">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'linear' }}
            className="h-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]"
          />
        </div>
      </div>
    )
  }

  return (
    <main className="snap-y snap-mandatory h-[100dvh] w-full max-w-[100vw] overflow-y-scroll overflow-x-hidden scroll-smooth relative transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {isDark && (
        <div className="fixed inset-0 z-[-1]">
          <ParticleBackground />
        </div>
      )}

      {/* SLIDE 1: SYSTEM INITIATION (HERO - PERSONAL PROFILE ONLY) */}
      <section id="hero" className="snap-center h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex flex-col justify-center items-center relative px-4 md:px-8 py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center w-full h-full max-w-4xl mx-auto gap-6 font-orbitron"
        >
          {/* Profile Picture */}
          <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-2 shrink-0 border-blue-700 shadow-xl dark:border-cyan-400 dark:shadow-[0_0_20px_#00f0ff]">
            <img src="/profile.jpg" alt="Deepak R." className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
          </div>

          {/* Identity Header & Titles */}
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-cyan-400 font-semibold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30">
              DEEPAK.OS :: ONLINE
            </span>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              <span className="sr-only">Deepak R</span>
              <span>DEEPAK</span> <span className="text-blue-600 dark:text-cyan-400">R.</span>
            </h1>

            <h2 className="text-xl md:text-3xl font-space tracking-wide text-blue-900 dark:text-cyan-200 font-bold">
              Autonomous Systems Architect & Robotics Engineer
            </h2>
          </div>

          {/* Intro Paragraph */}
          <p className="font-space text-sm md:text-base leading-relaxed max-w-2xl text-slate-700 bg-white border border-slate-200 p-5 rounded-2xl shadow-md dark:text-gray-300 dark:bg-black/50 dark:border-cyan-500/20">
            Robotics engineering student at Anna University. Specializing in ROS 2 Navigation, YOLO Vision, and Embedded IoT. Bridging theoretical AI with raw physical actuation.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#projects" className="px-6 py-3 text-xs md:text-sm font-bold font-orbitron rounded-xl tracking-wider transition-all border bg-blue-700 hover:bg-blue-800 text-white border-blue-700 shadow-lg dark:bg-cyan-500/20 dark:hover:bg-cyan-400 dark:hover:text-black dark:border-cyan-400 dark:text-cyan-400 dark:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              EXPLORE ARCHIVES →
            </a>
            <a href="#contact" className="px-6 py-3 text-xs md:text-sm font-bold font-orbitron rounded-xl tracking-wider transition-all border bg-white hover:bg-slate-100 border-slate-300 text-slate-900 shadow-md dark:bg-black/60 dark:hover:bg-cyan-950 dark:border-cyan-500/40 dark:text-cyan-300">
              COMM-LINK
            </a>
          </div>
        </motion.div>
      </section>

      {/* SLIDE 2: FEATURED ARCHIVES (PROJECTS) */}
      <section id="projects" className="snap-center h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex flex-col justify-center items-center relative px-4 md:px-8 py-6 transition-colors bg-slate-100/80 dark:bg-black/50 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-2 text-slate-900 dark:text-white">
              FEATURED <span className="text-blue-700 dark:text-cyan-400">ARCHIVES</span>
            </h2>
            <p className="text-xs font-space tracking-widest uppercase text-slate-600 dark:text-cyan-300 font-semibold">
              Autonomous Navigation, Edge AI & Robotics Repositories
            </p>
            <div className="h-1 w-20 mx-auto mt-2 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[68vh] overflow-y-auto pr-1">
            {/* Project 1 */}
            <Link href="/projects/aura" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-orbitron transition-colors text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400">VisionX (AURA)</h3>
                    <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-500/40 font-semibold">RL & SUMO</span>
                  </div>
                  <p className="text-[11px] font-orbitron tracking-wider mb-2 text-amber-700 dark:text-cyan-400 font-semibold">[ TRAFFIC SIGNAL OPTIMIZATION ]</p>
                  <p className="text-xs font-space leading-relaxed text-slate-600 dark:text-gray-300">
                    Sensor-Fusion Deep Reinforcement Learning for Dynamic Traffic Signal Optimization & Emergency Routing using SUMO traffic simulator and YOLO edge computing.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold border-slate-200 text-blue-700 dark:border-cyan-500/20 dark:text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 2 */}
            <Link href="/projects/sih" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-orbitron transition-colors text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400">Autonomous ROS 2 Rover</h3>
                    <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-500/40 font-semibold">ROS 2 & NAV2</span>
                  </div>
                  <p className="text-[11px] font-orbitron tracking-wider mb-2 text-amber-700 dark:text-cyan-400 font-semibold">[ SKID-STEER AUTONOMY ]</p>
                  <p className="text-xs font-space leading-relaxed text-slate-600 dark:text-gray-300">
                    Custom 4-wheel skid-steer rover built from scratch using ROS 2 Jazzy, Gazebo Harmonic, SLAM Toolbox, and Nav2 with EKF sensor fusion.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold border-slate-200 text-blue-700 dark:border-cyan-500/20 dark:text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 3 */}
            <Link href="/projects/edge-ai" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-orbitron transition-colors text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400">CV Autonomous Robot</h3>
                    <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-500/40 font-semibold">OPENCV & PD</span>
                  </div>
                  <p className="text-[11px] font-orbitron tracking-wider mb-2 text-amber-700 dark:text-cyan-400 font-semibold">[ EDGE PERCEPTION ]</p>
                  <p className="text-xs font-space leading-relaxed text-slate-600 dark:text-gray-300">
                    Custom line-following & obstacle avoidance robot using OpenCV, ROS 2, and dynamic PD Control logic.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold border-slate-200 text-blue-700 dark:border-cyan-500/20 dark:text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 4 */}
            <Link href="/projects/sih" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-orbitron transition-colors text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400">Reactive Obstacle Avoidance Skid-Steer</h3>
                    <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-500/40 font-semibold">LIDAR SLICING</span>
                  </div>
                  <p className="text-[11px] font-orbitron tracking-wider mb-2 text-amber-700 dark:text-cyan-400 font-semibold">[ ROS 2 & GAZEBO ]</p>
                  <p className="text-xs font-space leading-relaxed text-slate-600 dark:text-gray-300">
                    High-speed obstacle evasion rover using ROS 2, Gazebo Harmonic simulation, and custom 360° LiDAR scan slicing algorithm.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold border-slate-200 text-blue-700 dark:border-cyan-500/20 dark:text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 5 */}
            <Link href="/projects/edge-ai" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-orbitron transition-colors text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400">Decentralized Motor Control System</h3>
                    <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-500/40 font-semibold">PUB/SUB</span>
                  </div>
                  <p className="text-[11px] font-orbitron tracking-wider mb-2 text-amber-700 dark:text-cyan-400 font-semibold">[ MULTI-ACTUATOR TELEMETRY ]</p>
                  <p className="text-xs font-space leading-relaxed text-slate-600 dark:text-gray-300">
                    High-concurrency Python & ROS 2 Pub/Sub node architecture for multi-actuator telemetry synchronization.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold border-slate-200 text-blue-700 dark:border-cyan-500/20 dark:text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 6 */}
            <Link href="/projects/aura" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-orbitron transition-colors text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400">Hybrid AI Scholarship Bot</h3>
                    <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-500/40 font-semibold">SCIKIT & STREAMLIT</span>
                  </div>
                  <p className="text-[11px] font-orbitron tracking-wider mb-2 text-amber-700 dark:text-cyan-400 font-semibold">[ ANOMALY DETECTION ]</p>
                  <p className="text-xs font-space leading-relaxed text-slate-600 dark:text-gray-300">
                    Intelligent automated filtering bot built using Python, Scikit-Learn Isolation Forest, and Streamlit dashboard interface.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold border-slate-200 text-blue-700 dark:border-cyan-500/20 dark:text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* SLIDE 3: FIELD OPERATIONS (INTERNSHIPS & TRAINING) */}
      <section id="experience" className="snap-center h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex flex-col justify-center items-center relative px-4 md:px-8 py-6 transition-colors bg-slate-200/60 dark:bg-black/70 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-2 text-slate-900 dark:text-white">
              FIELD <span className="text-blue-700 dark:text-cyan-400">OPERATIONS</span>
            </h2>
            <p className="text-xs font-space tracking-widest uppercase text-slate-600 dark:text-cyan-300 font-semibold">
              Complete Industrial Experience & Internship History
            </p>
            <div className="h-1 w-20 mx-auto mt-2 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[68vh] overflow-y-auto pr-1">
            {/* Op 1 */}
            <div className="border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors bg-white border-slate-200 shadow-sm hover:border-blue-400 dark:bg-gray-900/50 dark:border-cyan-500/30 dark:hover:border-cyan-400">
              <div>
                <span className="text-[10px] font-orbitron tracking-wider text-amber-700 dark:text-cyan-400 font-semibold">[ 01 :: METROLOGY ]</span>
                <h3 className="text-base font-bold font-orbitron mt-1 text-slate-900 dark:text-white">Precise3DM</h3>
                <p className="text-xs font-space mb-2 text-blue-800 dark:text-cyan-300 font-semibold">Intern</p>
                <p className="text-xs font-space leading-normal text-slate-600 dark:text-gray-300">
                  3D Scan Based Solutions & Metrology inspection pipelines.
                </p>
              </div>
            </div>

            {/* Op 2 */}
            <div className="border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors bg-white border-slate-200 shadow-sm hover:border-blue-400 dark:bg-gray-900/50 dark:border-cyan-500/30 dark:hover:border-cyan-400">
              <div>
                <span className="text-[10px] font-orbitron tracking-wider text-amber-700 dark:text-cyan-400 font-semibold">[ 02 :: AI & CV ]</span>
                <h3 className="text-base font-bold font-orbitron mt-1 text-slate-900 dark:text-white">Tamizhan Skills</h3>
                <p className="text-xs font-space mb-2 text-blue-800 dark:text-cyan-300 font-semibold">RISE AI Intern</p>
                <p className="text-xs font-space leading-normal text-slate-600 dark:text-gray-300">
                  RISE AI for Autonomous Systems Intern (Computer Vision, YOLOv8, Path Planning).
                </p>
              </div>
            </div>

            {/* Op 3 */}
            <div className="border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors bg-white border-slate-200 shadow-sm hover:border-blue-400 dark:bg-gray-900/50 dark:border-cyan-500/30 dark:hover:border-cyan-400">
              <div>
                <span className="text-[10px] font-orbitron tracking-wider text-amber-700 dark:text-cyan-400 font-semibold">[ 03 :: ML PIPELINES ]</span>
                <h3 className="text-base font-bold font-orbitron mt-1 text-slate-900 dark:text-white">CodeAlpha</h3>
                <p className="text-xs font-space mb-2 text-blue-800 dark:text-cyan-300 font-semibold">ML Intern</p>
                <p className="text-xs font-space leading-normal text-slate-600 dark:text-gray-300">
                  Development of machine learning models using XGBoost, CNNs, and PyTorch.
                </p>
              </div>
            </div>

            {/* Op 4 */}
            <div className="border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors bg-white border-slate-200 shadow-sm hover:border-blue-400 dark:bg-gray-900/50 dark:border-cyan-500/30 dark:hover:border-cyan-400">
              <div>
                <span className="text-[10px] font-orbitron tracking-wider text-amber-700 dark:text-cyan-400 font-semibold">[ 04 :: EDP & LOCO ]</span>
                <h3 className="text-base font-bold font-orbitron mt-1 text-slate-900 dark:text-white">Chennai Port</h3>
                <p className="text-xs font-space mb-2 text-blue-800 dark:text-cyan-300 font-semibold">Authority Inplant</p>
                <p className="text-xs font-space leading-normal text-slate-600 dark:text-gray-300">
                  Vocational Inplant Training (Locomotives, Diesel Engines, Heavy Machinery).
                </p>
              </div>
            </div>

            {/* Op 5 */}
            <div className="border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors bg-white border-slate-200 shadow-sm hover:border-blue-400 dark:bg-gray-900/50 dark:border-cyan-500/30 dark:hover:border-cyan-400">
              <div>
                <span className="text-[10px] font-orbitron tracking-wider text-amber-700 dark:text-cyan-400 font-semibold">[ 05 :: ROS 2 NAV ]</span>
                <h3 className="text-base font-bold font-orbitron mt-1 text-slate-900 dark:text-white">KarthiKesh</h3>
                <p className="text-xs font-space mb-2 text-blue-800 dark:text-cyan-300 font-semibold">Robotics Program</p>
                <p className="text-xs font-space leading-normal text-slate-600 dark:text-gray-300">
                  20-Day Industrial Career Uplifting Program (Advanced ROS 2 & Autonomous Navigation).
                </p>
              </div>
            </div>

            {/* Op 6 */}
            <div className="border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors bg-white border-slate-200 shadow-sm hover:border-blue-400 dark:bg-gray-900/50 dark:border-cyan-500/30 dark:hover:border-cyan-400">
              <div>
                <span className="text-[10px] font-orbitron tracking-wider text-amber-700 dark:text-cyan-400 font-semibold">[ 06 :: MANUFACTURING ]</span>
                <h3 className="text-base font-bold font-orbitron mt-1 text-slate-900 dark:text-white">MK Auto</h3>
                <p className="text-xs font-space mb-2 text-blue-800 dark:text-cyan-300 font-semibold">Industrial Intern</p>
                <p className="text-xs font-space leading-normal text-slate-600 dark:text-gray-300">
                  CNC/VMC Operations, Cold Forging, Casting & precision manufacturing.
                </p>
              </div>
            </div>

            {/* Op 7 */}
            <div className="border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors sm:col-span-2 lg:col-span-2 bg-white border-slate-200 shadow-sm hover:border-blue-400 dark:bg-gray-900/50 dark:border-cyan-500/30 dark:hover:border-cyan-400">
              <div>
                <span className="text-[10px] font-orbitron tracking-wider text-amber-700 dark:text-cyan-400 font-semibold">[ 07 :: VIRTUAL SPRINT ]</span>
                <h3 className="text-base font-bold font-orbitron mt-1 text-slate-900 dark:text-white">Kodacy</h3>
                <p className="text-xs font-space mb-2 text-blue-800 dark:text-cyan-300 font-semibold">Virtual Robotics Intern</p>
                <p className="text-xs font-space leading-normal text-slate-600 dark:text-gray-300">
                  15-Day Virtual Robotics Intern focusing on embedded systems & robotics simulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 4: GLOBAL EXPOS & CERTIFICATIONS */}
      <section id="expos-certs" className="snap-center h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex flex-col justify-center items-center relative px-4 md:px-8 py-6 transition-colors bg-slate-100/80 dark:bg-black/50 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-2 text-slate-900 dark:text-white">
              GLOBAL EXPOS & <span className="text-blue-700 dark:text-cyan-400">CERTIFICATIONS</span>
            </h2>
            <p className="text-xs font-space tracking-widest uppercase text-slate-600 dark:text-cyan-300 font-semibold">
              Defense Expo Analysis & Verified Technical Badges
            </p>
            <div className="h-1 w-20 mx-auto mt-2 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: EXPOS */}
            <div className="border p-6 rounded-xl backdrop-blur-md shadow-md bg-white border-slate-200 dark:bg-gray-900/60 dark:border-cyan-500/30">
              <h3 className="text-lg font-orbitron font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="text-amber-600 dark:text-cyan-400">❖</span> INDUSTRIAL EXPOS & DEFENSE ANALYSIS
              </h3>
              <div className="space-y-4 font-space">
                <div className="border p-4 rounded-lg bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold font-orbitron text-blue-900 dark:text-cyan-300">Automation India Expo 2026</h4>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-cyan-400 font-bold">CHENNAI</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-gray-300">
                    Chennai Trade Centre — Explored industrial robotics, smart sensors, and factory automation architectures.
                  </p>
                </div>

                <div className="border p-4 rounded-lg bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold font-orbitron text-blue-900 dark:text-cyan-300">DEFTECH Bharat Bengaluru 2026</h4>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-cyan-400 font-bold">BENGALURU</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-gray-300">
                    Defense Technology Expo — Specialized T-90 Bhishma tank propulsion & heavy mechatronics analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: CERTIFICATIONS */}
            <div className="border p-6 rounded-xl backdrop-blur-md shadow-md bg-white border-slate-200 dark:bg-gray-900/60 dark:border-cyan-500/30">
              <h3 className="text-lg font-orbitron font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="text-amber-600 dark:text-cyan-400">◈</span> VERIFIED CERTIFICATIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-space">
                <div className="border p-3 rounded-lg bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                  <h4 className="text-xs font-bold font-orbitron text-blue-900 dark:text-cyan-300">IBM SkillsBuild</h4>
                  <p className="text-[11px] mt-1 text-slate-600 dark:text-gray-300">AI Fundamentals & Advanced Python Data Analysis</p>
                </div>
                <div className="border p-3 rounded-lg bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                  <h4 className="text-xs font-bold font-orbitron text-blue-900 dark:text-cyan-300">Cisco</h4>
                  <p className="text-[11px] mt-1 text-slate-600 dark:text-gray-300">Computer Hardware Basics</p>
                </div>
                <div className="border p-3 rounded-lg bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                  <h4 className="text-xs font-bold font-orbitron text-blue-900 dark:text-cyan-300">NPTEL</h4>
                  <p className="text-[11px] mt-1 text-slate-600 dark:text-gray-300">Industrial Robotics & Joy of Computing using Python</p>
                </div>
                <div className="border p-3 rounded-lg bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                  <h4 className="text-xs font-bold font-orbitron text-blue-900 dark:text-cyan-300">NoviTech</h4>
                  <p className="text-[11px] mt-1 text-slate-600 dark:text-gray-300">Full Stack Web Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 5: LIVE COMM-LINK (NETWORK & CONTACT) */}
      <section id="contact" className="snap-center h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex flex-col justify-center items-center relative px-4 md:px-8 py-6 transition-colors bg-slate-200/60 dark:bg-black/70 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-2 text-slate-900 dark:text-white">
              LIVE <span className="text-blue-700 dark:text-cyan-400">COMM-LINK</span>
            </h2>
            <p className="text-xs font-space tracking-widest uppercase text-slate-600 dark:text-cyan-300 font-semibold">
              Network Feed & Encrypted Transmission
            </p>
            <div className="h-1 w-20 mx-auto mt-2 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left Column: Network Uplink LinkedIn Feed */}
            <div className="border p-6 rounded-xl backdrop-blur-md flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-md bg-white border-slate-200 dark:bg-gray-900/60 dark:border-cyan-500/30">
              <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 border-blue-600 text-blue-700 shadow-sm dark:border-cyan-400/60 dark:text-cyan-400 dark:shadow-[0_0_15px_rgba(0,240,255,0.2)] flex-shrink-0">
                <span className="text-2xl font-orbitron">📡</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold mb-2 text-slate-900 dark:text-white">NETWORK UPLINK</h3>
              <p className="text-xs font-mono tracking-wider mb-4 text-amber-700 dark:text-cyan-400 font-semibold">
                [ LINKEDIN INTEGRATION NODE ]
              </p>
              <div className="w-full flex flex-col gap-6 overflow-y-auto max-h-[60vh] pr-2 rounded-lg overflow-x-hidden">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7487740372673232896" className="w-full h-[450px] md:h-[650px] rounded-xl border-none bg-white/5" frameBorder="0" allowFullScreen title="20-Day ROS 2 Training"></iframe>
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7464295823774736384" className="w-full h-[450px] md:h-[650px] rounded-xl border-none bg-white/5" frameBorder="0" allowFullScreen title="DEFTECH Bharat"></iframe>
              </div>
            </div>

            {/* Right Column: Web3Forms Cyberpunk Contact Form */}
            <div className="border p-6 rounded-xl backdrop-blur-md flex flex-col justify-center shadow-md bg-white border-slate-200 dark:bg-gray-900/60 dark:border-cyan-500/30">
              <h3 className="text-xl font-orbitron font-bold mb-1 text-slate-900 dark:text-white">TRANSMIT SIGNAL</h3>
              <p className="text-xs font-mono mb-4 tracking-wider text-amber-700 dark:text-cyan-400 font-semibold">
                [ ENCRYPTED DIRECT CHANNEL ]
              </p>

              {/* Status Feedback Notice */}
              {status !== 'idle' && (
                <div className={`mb-4 p-3 rounded-lg text-xs font-orbitron border font-semibold ${
                  status === 'submitting' 
                    ? 'bg-blue-500/10 border-blue-400 text-blue-300 animate-pulse'
                    : status === 'success'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-rose-500/20 border-rose-400 text-rose-300'
                }`}>
                  {statusMessage}
                </div>
              )}

              <form className="flex flex-col gap-3 font-space" onSubmit={handleFormSubmit}>
                <div>
                  <label className="text-[10px] font-orbitron mb-1 block text-blue-900 dark:text-cyan-400 font-semibold">
                    IDENTITY (NAME)
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Commander Sheppard" 
                    className="w-full border rounded p-2.5 text-xs outline-none transition-colors bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/60 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-300" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-orbitron mb-1 block text-blue-900 dark:text-cyan-400 font-semibold">
                    COMM FREQUENCY (EMAIL)
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. signal@domain.com" 
                    className="w-full border rounded p-2.5 text-xs outline-none transition-colors bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/60 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-300" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-orbitron mb-1 block text-blue-900 dark:text-cyan-400 font-semibold">
                    TRANSMISSION DATA (MESSAGE)
                  </label>
                  <textarea 
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write encrypted message body..." 
                    rows={3} 
                    className="w-full border rounded p-2.5 text-xs outline-none transition-colors resize-none bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/60 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-300"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className={`w-full py-3 border font-bold font-orbitron text-xs tracking-widest rounded mt-1 transition-all bg-blue-700 border-blue-700 text-white hover:bg-blue-800 shadow-md dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black dark:shadow-[0_0_15px_rgba(0,240,255,0.2)] ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {status === 'submitting' ? 'TRANSMITTING...' : 'BROADCAST TRANSMISSION'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
