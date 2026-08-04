"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '@/components/ParticleBackground'
import Link from 'next/link'
import ArmLab from '@/components/labs/ArmLab'
import { useTheme } from '@/components/ThemeProvider'

export default function Home() {
  const [booting, setBooting] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Web3Forms state
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

    setStatus('submitting')
    setStatusMessage('ESTABLISHING ENCRYPTED LINK...')

    try {
      // WEB3FORMS INTEGRATION
      // Replace 'YOUR_WEB3FORMS_ACCESS_KEY' with your actual key from https://web3forms.com
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // <-- PASTE YOUR WEB3FORMS ACCESS KEY HERE
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
      <div className={`h-screen w-full flex flex-col items-center justify-center font-orbitron transition-colors ${
        isDark ? 'bg-black text-cyan-400' : 'bg-slate-50 text-blue-900'
      }`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-2xl tracking-widest text-center px-4"
        >
          INITIALIZING DEEPAK.OS V2.0...
        </motion.div>
        <div className={`mt-4 w-64 h-1 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-slate-200'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'linear' }}
            className={`h-full ${isDark ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-blue-600'}`}
          />
        </div>
      </div>
    )
  }

  return (
    <main className={`snap-y snap-mandatory h-screen w-full overflow-y-scroll overflow-x-hidden scroll-smooth relative transition-colors duration-300 ${
      isDark ? 'bg-black text-cyan-400' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Particle space background in Dark Mode */}
      {isDark && (
        <div className="fixed inset-0 z-[-1]">
          <ParticleBackground />
        </div>
      )}

      {/* SLIDE 1: SYSTEM INITIATION (HERO) */}
      <section id="hero" className="snap-center h-screen w-full flex flex-col justify-center items-center relative px-4 md:px-8 py-6">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left/Top: 6-DOF Robot Arm impulse test canvas */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center w-full order-2 lg:order-1"
          >
            <div className="w-full text-center mb-3">
              <span className={`text-xs font-orbitron tracking-widest px-3 py-1 rounded-full border ${
                isDark 
                  ? 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30' 
                  : 'text-blue-900 bg-blue-50 border-blue-200 font-semibold'
              }`}>
                [ 6-DOF KINEMATICS SIMULATION CANVAS ]
              </span>
            </div>
            <div className={`w-full max-w-lg mx-auto z-10 p-3 rounded-xl border backdrop-blur-md transition-colors ${
              isDark 
                ? 'bg-black/60 border-cyan-500/30 shadow-[0_0_25px_rgba(0,240,255,0.15)]' 
                : 'bg-white border-slate-200 shadow-xl'
            }`}>
              <ArmLab />
            </div>
          </motion.div>

          {/* Right/Bottom: Identity & DEEPAK.OS Status */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left font-orbitron order-1 lg:order-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 flex-shrink-0 ${
                isDark ? 'border-cyan-400 shadow-[0_0_15px_#00f0ff]' : 'border-blue-700 shadow-md'
              }`}>
                <img src="/profile.jpg" alt="Deepak R." className="w-full h-full object-cover transition-all duration-500" />
              </div>
              <div className="flex flex-col text-left">
                <span className={`text-xs font-mono tracking-widest ${isDark ? 'text-cyan-400' : 'text-amber-600 font-semibold'}`}>
                  DEEPAK.OS :: ONLINE
                </span>
                <h1 className={`text-3xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  DEEPAK <span className={isDark ? 'text-cyan-400' : 'text-blue-700'}>R.</span>
                </h1>
              </div>
            </div>

            <h2 className={`text-xl md:text-2xl mb-2 font-space tracking-wide ${isDark ? 'text-cyan-200' : 'text-blue-900 font-bold'}`}>
              Autonomous Systems Architect
            </h2>
            <p className={`text-xs md:text-sm font-orbitron mb-4 tracking-widest ${isDark ? 'text-cyan-400/90' : 'text-amber-700 font-semibold'}`}>
              Deepak R. | Robotics & ML Engineer
            </p>
            <p className={`font-space text-xs md:text-sm leading-relaxed max-w-lg mb-6 p-4 rounded-lg border backdrop-blur-sm ${
              isDark 
                ? 'text-gray-300 bg-black/40 border-cyan-500/20' 
                : 'text-slate-700 bg-white border-slate-200 shadow-sm'
            }`}>
              Robotics engineering student at Anna University. Specializing in ROS2 Navigation, YOLO Vision, and Embedded IoT. Bridging theoretical AI with raw physical actuation.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#projects" className={`px-5 py-2.5 text-xs font-bold font-orbitron rounded tracking-wider transition-all border ${
                isDark 
                  ? 'bg-cyan-500/20 hover:bg-cyan-400 hover:text-black border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                  : 'bg-blue-700 hover:bg-blue-800 text-white border-blue-700 shadow-md'
              }`}>
                EXPLORE ARCHIVES →
              </a>
              <a href="#contact" className={`px-5 py-2.5 text-xs font-bold font-orbitron rounded tracking-wider transition-all border ${
                isDark 
                  ? 'bg-black/60 hover:bg-cyan-950 border-cyan-500/40 text-cyan-300' 
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}>
                COMM-LINK
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SLIDE 2: FEATURED ARCHIVES (PROJECTS) */}
      <section id="projects" className={`snap-center h-screen w-full flex flex-col justify-center items-center relative px-4 md:px-8 py-6 transition-colors ${
        isDark ? 'bg-black/50 backdrop-blur-md' : 'bg-slate-100/80'
      }`}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              FEATURED <span className={isDark ? 'text-cyan-400' : 'text-blue-700'}>ARCHIVES</span>
            </h2>
            <p className={`text-xs font-space tracking-widest uppercase ${isDark ? 'text-cyan-300' : 'text-slate-600 font-semibold'}`}>
              Autonomous Navigation, Edge AI & Robotics Repositories
            </p>
            <div className={`h-1 w-20 mx-auto mt-2 rounded-full ${isDark ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-blue-600'}`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[68vh] overflow-y-auto pr-1">
            {/* Project 1 */}
            <Link href="/projects/aura" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className={`h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                isDark 
                  ? 'bg-gray-900/60 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                  : 'bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg'
              }`}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-bold font-orbitron transition-colors ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-700'}`}>VisionX (AURA)</h3>
                    <span className={`text-[10px] font-orbitron border px-2 py-0.5 rounded ${
                      isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40' : 'bg-blue-50 text-blue-800 border-blue-200 font-semibold'
                    }`}>RL & SUMO</span>
                  </div>
                  <p className={`text-[11px] font-orbitron tracking-wider mb-2 ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ TRAFFIC SIGNAL OPTIMIZATION ]</p>
                  <p className={`text-xs font-space leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Sensor-Fusion Deep Reinforcement Learning for Dynamic Traffic Signal Optimization & Emergency Routing using SUMO traffic simulator and YOLO edge computing.
                  </p>
                </div>
                <div className={`mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold ${
                  isDark ? 'border-cyan-500/20 text-cyan-400' : 'border-slate-200 text-blue-700'
                }`}>
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 2 */}
            <Link href="/projects/sih" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className={`h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                isDark 
                  ? 'bg-gray-900/60 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                  : 'bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg'
              }`}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-bold font-orbitron transition-colors ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-700'}`}>Autonomous ROS 2 Rover</h3>
                    <span className={`text-[10px] font-orbitron border px-2 py-0.5 rounded ${
                      isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40' : 'bg-blue-50 text-blue-800 border-blue-200 font-semibold'
                    }`}>ROS 2 & NAV2</span>
                  </div>
                  <p className={`text-[11px] font-orbitron tracking-wider mb-2 ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ SKID-STEER AUTONOMY ]</p>
                  <p className={`text-xs font-space leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Custom 4-wheel skid-steer rover built from scratch using ROS 2 Jazzy, Gazebo Harmonic, SLAM Toolbox, and Nav2 with EKF sensor fusion.
                  </p>
                </div>
                <div className={`mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold ${
                  isDark ? 'border-cyan-500/20 text-cyan-400' : 'border-slate-200 text-blue-700'
                }`}>
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 3 */}
            <Link href="/projects/edge-ai" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className={`h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                isDark 
                  ? 'bg-gray-900/60 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                  : 'bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg'
              }`}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-bold font-orbitron transition-colors ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-700'}`}>CV Autonomous Robot</h3>
                    <span className={`text-[10px] font-orbitron border px-2 py-0.5 rounded ${
                      isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40' : 'bg-blue-50 text-blue-800 border-blue-200 font-semibold'
                    }`}>OPENCV & PD</span>
                  </div>
                  <p className={`text-[11px] font-orbitron tracking-wider mb-2 ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ EDGE PERCEPTION ]</p>
                  <p className={`text-xs font-space leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Custom line-following & obstacle avoidance robot using OpenCV, ROS 2, and dynamic PD Control logic.
                  </p>
                </div>
                <div className={`mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold ${
                  isDark ? 'border-cyan-500/20 text-cyan-400' : 'border-slate-200 text-blue-700'
                }`}>
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 4 */}
            <Link href="/projects/sih" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className={`h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                isDark 
                  ? 'bg-gray-900/60 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                  : 'bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg'
              }`}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-bold font-orbitron transition-colors ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-700'}`}>Reactive Obstacle Avoidance Skid-Steer</h3>
                    <span className={`text-[10px] font-orbitron border px-2 py-0.5 rounded ${
                      isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40' : 'bg-blue-50 text-blue-800 border-blue-200 font-semibold'
                    }`}>LIDAR SLICING</span>
                  </div>
                  <p className={`text-[11px] font-orbitron tracking-wider mb-2 ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ ROS 2 & GAZEBO ]</p>
                  <p className={`text-xs font-space leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    High-speed obstacle evasion rover using ROS 2, Gazebo Harmonic simulation, and custom 360° LiDAR scan slicing algorithm.
                  </p>
                </div>
                <div className={`mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold ${
                  isDark ? 'border-cyan-500/20 text-cyan-400' : 'border-slate-200 text-blue-700'
                }`}>
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 5 */}
            <Link href="/projects/edge-ai" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className={`h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                isDark 
                  ? 'bg-gray-900/60 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                  : 'bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg'
              }`}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-bold font-orbitron transition-colors ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-700'}`}>Decentralized Motor Control System</h3>
                    <span className={`text-[10px] font-orbitron border px-2 py-0.5 rounded ${
                      isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40' : 'bg-blue-50 text-blue-800 border-blue-200 font-semibold'
                    }`}>PUB/SUB</span>
                  </div>
                  <p className={`text-[11px] font-orbitron tracking-wider mb-2 ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ MULTI-ACTUATOR TELEMETRY ]</p>
                  <p className={`text-xs font-space leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    High-concurrency Python & ROS 2 Pub/Sub node architecture for multi-actuator telemetry synchronization.
                  </p>
                </div>
                <div className={`mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold ${
                  isDark ? 'border-cyan-500/20 text-cyan-400' : 'border-slate-200 text-blue-700'
                }`}>
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 6 */}
            <Link href="/projects/aura" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className={`h-full border p-5 rounded-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                isDark 
                  ? 'bg-gray-900/60 border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.05)]' 
                  : 'bg-white border-slate-200 hover:border-blue-500 shadow-md hover:shadow-lg'
              }`}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-lg font-bold font-orbitron transition-colors ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-700'}`}>Hybrid AI Scholarship Bot</h3>
                    <span className={`text-[10px] font-orbitron border px-2 py-0.5 rounded ${
                      isDark ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40' : 'bg-blue-50 text-blue-800 border-blue-200 font-semibold'
                    }`}>SCIKIT & STREAMLIT</span>
                  </div>
                  <p className={`text-[11px] font-orbitron tracking-wider mb-2 ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ ANOMALY DETECTION ]</p>
                  <p className={`text-xs font-space leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Intelligent automated filtering bot built using Python, Scikit-Learn Isolation Forest, and Streamlit dashboard interface.
                  </p>
                </div>
                <div className={`mt-4 pt-3 border-t flex justify-between items-center text-xs font-orbitron font-bold ${
                  isDark ? 'border-cyan-500/20 text-cyan-400' : 'border-slate-200 text-blue-700'
                }`}>
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* SLIDE 3: FIELD OPERATIONS (INTERNSHIPS & TRAINING) */}
      <section id="experience" className={`snap-center h-screen w-full flex flex-col justify-center items-center relative px-4 md:px-8 py-6 transition-colors ${
        isDark ? 'bg-black/70 backdrop-blur-md' : 'bg-slate-200/60'
      }`}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              FIELD <span className={isDark ? 'text-cyan-400' : 'text-blue-700'}>OPERATIONS</span>
            </h2>
            <p className={`text-xs font-space tracking-widest uppercase ${isDark ? 'text-cyan-300' : 'text-slate-600 font-semibold'}`}>
              Complete Industrial Experience & Internship History
            </p>
            <div className={`h-1 w-20 mx-auto mt-2 rounded-full ${isDark ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-blue-600'}`} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[68vh] overflow-y-auto pr-1">
            {/* Op 1 */}
            <div className={`border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors ${
              isDark ? 'bg-gray-900/50 border-cyan-500/30 hover:border-cyan-400' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'
            }`}>
              <div>
                <span className={`text-[10px] font-orbitron tracking-wider ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ 01 :: METROLOGY ]</span>
                <h3 className={`text-base font-bold font-orbitron mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Precise3DM</h3>
                <p className={`text-xs font-space mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-800 font-semibold'}`}>Intern</p>
                <p className={`text-xs font-space leading-normal ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  3D Scan Based Solutions & Metrology inspection pipelines.
                </p>
              </div>
            </div>

            {/* Op 2 */}
            <div className={`border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors ${
              isDark ? 'bg-gray-900/50 border-cyan-500/30 hover:border-cyan-400' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'
            }`}>
              <div>
                <span className={`text-[10px] font-orbitron tracking-wider ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ 02 :: AI & CV ]</span>
                <h3 className={`text-base font-bold font-orbitron mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Tamizhan Skills</h3>
                <p className={`text-xs font-space mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-800 font-semibold'}`}>RISE AI Intern</p>
                <p className={`text-xs font-space leading-normal ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  RISE AI for Autonomous Systems Intern (Computer Vision, YOLOv8, Path Planning).
                </p>
              </div>
            </div>

            {/* Op 3 */}
            <div className={`border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors ${
              isDark ? 'bg-gray-900/50 border-cyan-500/30 hover:border-cyan-400' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'
            }`}>
              <div>
                <span className={`text-[10px] font-orbitron tracking-wider ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ 03 :: ML PIPELINES ]</span>
                <h3 className={`text-base font-bold font-orbitron mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>CodeAlpha</h3>
                <p className={`text-xs font-space mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-800 font-semibold'}`}>ML Intern</p>
                <p className={`text-xs font-space leading-normal ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  Development of machine learning models using XGBoost, CNNs, and PyTorch.
                </p>
              </div>
            </div>

            {/* Op 4 */}
            <div className={`border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors ${
              isDark ? 'bg-gray-900/50 border-cyan-500/30 hover:border-cyan-400' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'
            }`}>
              <div>
                <span className={`text-[10px] font-orbitron tracking-wider ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ 04 :: EDP & LOCO ]</span>
                <h3 className={`text-base font-bold font-orbitron mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Chennai Port</h3>
                <p className={`text-xs font-space mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-800 font-semibold'}`}>Authority Inplant</p>
                <p className={`text-xs font-space leading-normal ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  Vocational Inplant Training (Locomotives, Diesel Engines, Heavy Machinery).
                </p>
              </div>
            </div>

            {/* Op 5 */}
            <div className={`border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors ${
              isDark ? 'bg-gray-900/50 border-cyan-500/30 hover:border-cyan-400' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'
            }`}>
              <div>
                <span className={`text-[10px] font-orbitron tracking-wider ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ 05 :: ROS 2 NAV ]</span>
                <h3 className={`text-base font-bold font-orbitron mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>KarthiKesh</h3>
                <p className={`text-xs font-space mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-800 font-semibold'}`}>Robotics Program</p>
                <p className={`text-xs font-space leading-normal ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  20-Day Industrial Career Uplifting Program (Advanced ROS 2 & Autonomous Navigation).
                </p>
              </div>
            </div>

            {/* Op 6 */}
            <div className={`border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors ${
              isDark ? 'bg-gray-900/50 border-cyan-500/30 hover:border-cyan-400' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'
            }`}>
              <div>
                <span className={`text-[10px] font-orbitron tracking-wider ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ 06 :: MANUFACTURING ]</span>
                <h3 className={`text-base font-bold font-orbitron mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>MK Auto</h3>
                <p className={`text-xs font-space mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-800 font-semibold'}`}>Industrial Intern</p>
                <p className={`text-xs font-space leading-normal ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  CNC/VMC Operations, Cold Forging, Casting & precision manufacturing.
                </p>
              </div>
            </div>

            {/* Op 7 */}
            <div className={`border p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm transition-colors sm:col-span-2 lg:col-span-2 ${
              isDark ? 'bg-gray-900/50 border-cyan-500/30 hover:border-cyan-400' : 'bg-white border-slate-200 shadow-sm hover:border-blue-400'
            }`}>
              <div>
                <span className={`text-[10px] font-orbitron tracking-wider ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>[ 07 :: VIRTUAL SPRINT ]</span>
                <h3 className={`text-base font-bold font-orbitron mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Kodacy</h3>
                <p className={`text-xs font-space mb-2 ${isDark ? 'text-cyan-300' : 'text-blue-800 font-semibold'}`}>Virtual Robotics Intern</p>
                <p className={`text-xs font-space leading-normal ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  15-Day Virtual Robotics Intern focusing on embedded systems & robotics simulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 4: GLOBAL EXPOS & CERTIFICATIONS */}
      <section id="expos-certs" className={`snap-center h-screen w-full flex flex-col justify-center items-center relative px-4 md:px-8 py-6 transition-colors ${
        isDark ? 'bg-black/50 backdrop-blur-md' : 'bg-slate-100/80'
      }`}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              GLOBAL EXPOS & <span className={isDark ? 'text-cyan-400' : 'text-blue-700'}>CERTIFICATIONS</span>
            </h2>
            <p className={`text-xs font-space tracking-widest uppercase ${isDark ? 'text-cyan-300' : 'text-slate-600 font-semibold'}`}>
              Defense Expo Analysis & Verified Technical Badges
            </p>
            <div className={`h-1 w-20 mx-auto mt-2 rounded-full ${isDark ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-blue-600'}`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: EXPOS */}
            <div className={`border p-6 rounded-xl backdrop-blur-md shadow-md ${
              isDark ? 'bg-gray-900/60 border-cyan-500/30' : 'bg-white border-slate-200'
            }`}>
              <h3 className={`text-lg font-orbitron font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className={isDark ? 'text-cyan-400' : 'text-amber-600'}>❖</span> INDUSTRIAL EXPOS & DEFENSE ANALYSIS
              </h3>
              <div className="space-y-4 font-space">
                <div className={`border p-4 rounded-lg ${isDark ? 'bg-black/50 border-cyan-500/20' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`text-sm font-bold font-orbitron ${isDark ? 'text-cyan-300' : 'text-blue-900'}`}>Automation India Expo 2026</h4>
                    <span className={`text-[10px] font-mono ${isDark ? 'text-cyan-400' : 'text-amber-700 font-bold'}`}>CHENNAI</span>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Chennai Trade Centre — Explored industrial robotics, smart sensors, and factory automation architectures.
                  </p>
                </div>

                <div className={`border p-4 rounded-lg ${isDark ? 'bg-black/50 border-cyan-500/20' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`text-sm font-bold font-orbitron ${isDark ? 'text-cyan-300' : 'text-blue-900'}`}>DEFTECH Bharat Bengaluru 2026</h4>
                    <span className={`text-[10px] font-mono ${isDark ? 'text-cyan-400' : 'text-amber-700 font-bold'}`}>BENGALURU</span>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    Defense Technology Expo — Specialized T-90 Bhishma tank propulsion & heavy mechatronics analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: CERTIFICATIONS */}
            <div className={`border p-6 rounded-xl backdrop-blur-md shadow-md ${
              isDark ? 'bg-gray-900/60 border-cyan-500/30' : 'bg-white border-slate-200'
            }`}>
              <h3 className={`text-lg font-orbitron font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <span className={isDark ? 'text-cyan-400' : 'text-amber-600'}>◈</span> VERIFIED CERTIFICATIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-space">
                <div className={`border p-3 rounded-lg ${isDark ? 'bg-black/50 border-cyan-500/20' : 'bg-slate-50 border-slate-200'}`}>
                  <h4 className={`text-xs font-bold font-orbitron ${isDark ? 'text-cyan-300' : 'text-blue-900'}`}>IBM SkillsBuild</h4>
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>AI Fundamentals & Advanced Python Data Analysis</p>
                </div>
                <div className={`border p-3 rounded-lg ${isDark ? 'bg-black/50 border-cyan-500/20' : 'bg-slate-50 border-slate-200'}`}>
                  <h4 className={`text-xs font-bold font-orbitron ${isDark ? 'text-cyan-300' : 'text-blue-900'}`}>Cisco</h4>
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Computer Hardware Basics</p>
                </div>
                <div className={`border p-3 rounded-lg ${isDark ? 'bg-black/50 border-cyan-500/20' : 'bg-slate-50 border-slate-200'}`}>
                  <h4 className={`text-xs font-bold font-orbitron ${isDark ? 'text-cyan-300' : 'text-blue-900'}`}>NPTEL</h4>
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Industrial Robotics & Joy of Computing using Python</p>
                </div>
                <div className={`border p-3 rounded-lg ${isDark ? 'bg-black/50 border-cyan-500/20' : 'bg-slate-50 border-slate-200'}`}>
                  <h4 className={`text-xs font-bold font-orbitron ${isDark ? 'text-cyan-300' : 'text-blue-900'}`}>NoviTech</h4>
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Full Stack Web Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 5: LIVE COMM-LINK (NETWORK & CONTACT) */}
      <section id="contact" className={`snap-center h-screen w-full flex flex-col justify-center items-center relative px-4 md:px-8 py-6 transition-colors ${
        isDark ? 'bg-black/70 backdrop-blur-md' : 'bg-slate-200/60'
      }`}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-3xl md:text-4xl font-orbitron font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              LIVE <span className={isDark ? 'text-cyan-400' : 'text-blue-700'}>COMM-LINK</span>
            </h2>
            <p className={`text-xs font-space tracking-widest uppercase ${isDark ? 'text-cyan-300' : 'text-slate-600 font-semibold'}`}>
              Network Feed & Encrypted Transmission
            </p>
            <div className={`h-1 w-20 mx-auto mt-2 rounded-full ${isDark ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-blue-600'}`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left Column: Network Uplink Placeholder */}
            <div className={`border p-6 rounded-xl backdrop-blur-md flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-md ${
              isDark ? 'bg-gray-900/60 border-cyan-500/30' : 'bg-white border-slate-200'
            }`}>
              <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 ${
                isDark ? 'border-cyan-400/60 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'border-blue-600 text-blue-700 shadow-sm'
              }`}>
                <span className="text-2xl font-orbitron">📡</span>
              </div>
              <h3 className={`text-xl font-orbitron font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>NETWORK UPLINK</h3>
              <p className={`text-xs font-mono tracking-wider mb-4 ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>
                [ LINKEDIN INTEGRATION NODE ]
              </p>
              <div className={`border p-6 rounded-lg max-w-md w-full ${
                isDark ? 'bg-black/70 border-cyan-500/40' : 'bg-slate-50 border-slate-200'
              }`}>
                <p className={`text-sm font-space leading-relaxed italic ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  &quot;Live LinkedIn Feed integration pending...&quot;
                </p>
                <p className={`text-xs font-mono mt-3 ${isDark ? 'text-cyan-400/80' : 'text-blue-700 font-semibold'}`}>
                  (I will embed the iframe later)
                </p>
              </div>
            </div>

            {/* Right Column: Web3Forms Cyberpunk Contact Form */}
            <div className={`border p-6 rounded-xl backdrop-blur-md flex flex-col justify-center shadow-md ${
              isDark ? 'bg-gray-900/60 border-cyan-500/30' : 'bg-white border-slate-200'
            }`}>
              <h3 className={`text-xl font-orbitron font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>TRANSMIT SIGNAL</h3>
              <p className={`text-xs font-mono mb-4 tracking-wider ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>
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
                  <label className={`text-[10px] font-orbitron mb-1 block ${isDark ? 'text-cyan-400' : 'text-blue-900 font-semibold'}`}>
                    IDENTITY (NAME)
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Commander Sheppard" 
                    className={`w-full border rounded p-2.5 text-xs outline-none transition-colors ${
                      isDark 
                        ? 'bg-black/60 border-cyan-900 focus:border-cyan-400 text-cyan-300' 
                        : 'bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900'
                    }`} 
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-orbitron mb-1 block ${isDark ? 'text-cyan-400' : 'text-blue-900 font-semibold'}`}>
                    COMM FREQUENCY (EMAIL)
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. signal@domain.com" 
                    className={`w-full border rounded p-2.5 text-xs outline-none transition-colors ${
                      isDark 
                        ? 'bg-black/60 border-cyan-900 focus:border-cyan-400 text-cyan-300' 
                        : 'bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900'
                    }`} 
                  />
                </div>
                <div>
                  <label className={`text-[10px] font-orbitron mb-1 block ${isDark ? 'text-cyan-400' : 'text-blue-900 font-semibold'}`}>
                    TRANSMISSION DATA (MESSAGE)
                  </label>
                  <textarea 
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write encrypted message body..." 
                    rows={3} 
                    className={`w-full border rounded p-2.5 text-xs outline-none transition-colors resize-none ${
                      isDark 
                        ? 'bg-black/60 border-cyan-900 focus:border-cyan-400 text-cyan-300' 
                        : 'bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900'
                    }`}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className={`w-full py-3 border font-bold font-orbitron text-xs tracking-widest rounded mt-1 transition-all ${
                    isDark 
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                      : 'bg-blue-700 border-blue-700 text-white hover:bg-blue-800 shadow-md'
                  } ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
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
