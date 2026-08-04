"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '@/components/ParticleBackground'
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
    <main className="snap-y snap-mandatory h-screen w-full overflow-y-scroll overflow-x-hidden scroll-smooth relative">
      <div className="fixed inset-0 z-[-1]">
        <ParticleBackground />
      </div>

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
              <span className="text-xs font-orbitron text-cyan-400 tracking-widest bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
                [ 6-DOF KINEMATICS SIMULATION CANVAS ]
              </span>
            </div>
            <div className="w-full max-w-lg mx-auto z-10 bg-black/60 p-3 rounded-xl border border-cyan-500/30 shadow-[0_0_25px_rgba(0,240,255,0.15)] backdrop-blur-md">
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
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_#00f0ff] flex-shrink-0">
                <img src="/profile.jpg" alt="Deepak R." className="w-full h-full object-cover transition-all duration-500" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono text-cyan-400 tracking-widest">DEEPAK.OS :: ONLINE</span>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                  DEEPAK <span className="text-cyan-400">R.</span>
                </h1>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl text-cyan-200 mb-2 font-space tracking-wide">
              Autonomous Systems Architect
            </h2>
            <p className="text-xs md:text-sm text-cyan-400/90 font-orbitron mb-4 tracking-widest">
              Deepak R. | Robotics & ML Engineer
            </p>
            <p className="text-gray-300 font-space text-xs md:text-sm leading-relaxed max-w-lg mb-6 bg-black/40 p-4 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
              Robotics engineering student at Anna University. Specializing in ROS2 Navigation, YOLO Vision, and Embedded IoT. Bridging theoretical AI with raw physical actuation.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#projects" className="px-5 py-2.5 bg-cyan-500/20 hover:bg-cyan-400 hover:text-black border border-cyan-400 text-cyan-400 text-xs font-bold font-orbitron rounded tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                EXPLORE ARCHIVES →
              </a>
              <a href="#contact" className="px-5 py-2.5 bg-black/60 hover:bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold font-orbitron rounded tracking-wider transition-all">
                COMM-LINK
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SLIDE 2: FEATURED ARCHIVES (PROJECTS) */}
      <section id="projects" className="snap-center h-screen w-full flex flex-col justify-center items-center relative px-4 md:px-8 py-6 bg-black/50 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
              FEATURED <span className="text-cyan-400">ARCHIVES</span>
            </h2>
            <p className="text-xs font-space text-cyan-300 tracking-widest uppercase">Autonomous Navigation, Edge AI & Robotics Repositories</p>
            <div className="h-1 w-20 bg-cyan-400 mx-auto mt-2 rounded-full shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[68vh] overflow-y-auto pr-1">
            {/* Project 1 */}
            <Link href="/projects/aura" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full bg-gray-900/60 border border-cyan-500/30 hover:border-cyan-400 p-5 rounded-xl backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white font-orbitron group-hover:text-cyan-400 transition-colors">VisionX (AURA)</h3>
                    <span className="text-[10px] font-orbitron bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">RL & SUMO</span>
                  </div>
                  <p className="text-[11px] text-cyan-400 font-orbitron tracking-wider mb-2">[ TRAFFIC SIGNAL OPTIMIZATION ]</p>
                  <p className="text-xs text-gray-300 font-space leading-relaxed">
                    Sensor-Fusion Deep Reinforcement Learning for Dynamic Traffic Signal Optimization & Emergency Routing using SUMO traffic simulator and YOLO edge computing.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex justify-between items-center text-xs font-orbitron font-bold text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 2 */}
            <Link href="/projects/sih" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full bg-gray-900/60 border border-cyan-500/30 hover:border-cyan-400 p-5 rounded-xl backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white font-orbitron group-hover:text-cyan-400 transition-colors">Autonomous ROS 2 Rover</h3>
                    <span className="text-[10px] font-orbitron bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">ROS 2 & NAV2</span>
                  </div>
                  <p className="text-[11px] text-cyan-400 font-orbitron tracking-wider mb-2">[ SKID-STEER AUTONOMY ]</p>
                  <p className="text-xs text-gray-300 font-space leading-relaxed">
                    Custom 4-wheel skid-steer rover built from scratch using ROS 2 Jazzy, Gazebo Harmonic, SLAM Toolbox, and Nav2 with EKF sensor fusion.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex justify-between items-center text-xs font-orbitron font-bold text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 3 */}
            <Link href="/projects/edge-ai" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full bg-gray-900/60 border border-cyan-500/30 hover:border-cyan-400 p-5 rounded-xl backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white font-orbitron group-hover:text-cyan-400 transition-colors">CV Autonomous Robot</h3>
                    <span className="text-[10px] font-orbitron bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">OPENCV & PD</span>
                  </div>
                  <p className="text-[11px] text-cyan-400 font-orbitron tracking-wider mb-2">[ EDGE PERCEPTION ]</p>
                  <p className="text-xs text-gray-300 font-space leading-relaxed">
                    Custom line-following & obstacle avoidance robot using OpenCV, ROS 2, and dynamic PD Control logic.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex justify-between items-center text-xs font-orbitron font-bold text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 4 */}
            <Link href="/projects/sih" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full bg-gray-900/60 border border-cyan-500/30 hover:border-cyan-400 p-5 rounded-xl backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white font-orbitron group-hover:text-cyan-400 transition-colors">Reactive Obstacle Avoidance Skid-Steer</h3>
                    <span className="text-[10px] font-orbitron bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">LIDAR SLICING</span>
                  </div>
                  <p className="text-[11px] text-cyan-400 font-orbitron tracking-wider mb-2">[ ROS 2 & GAZEBO ]</p>
                  <p className="text-xs text-gray-300 font-space leading-relaxed">
                    High-speed obstacle evasion rover using ROS 2, Gazebo Harmonic simulation, and custom 360° LiDAR scan slicing algorithm.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex justify-between items-center text-xs font-orbitron font-bold text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 5 */}
            <Link href="/projects/edge-ai" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full bg-gray-900/60 border border-cyan-500/30 hover:border-cyan-400 p-5 rounded-xl backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white font-orbitron group-hover:text-cyan-400 transition-colors">Decentralized Motor Control System</h3>
                    <span className="text-[10px] font-orbitron bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">PUB/SUB</span>
                  </div>
                  <p className="text-[11px] text-cyan-400 font-orbitron tracking-wider mb-2">[ MULTI-ACTUATOR TELEMETRY ]</p>
                  <p className="text-xs text-gray-300 font-space leading-relaxed">
                    High-concurrency Python & ROS 2 Pub/Sub node architecture for multi-actuator telemetry synchronization.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex justify-between items-center text-xs font-orbitron font-bold text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>

            {/* Project 6 */}
            <Link href="/projects/aura" className="h-full">
              <motion.div whileHover={{ scale: 1.01 }} className="h-full bg-gray-900/60 border border-cyan-500/30 hover:border-cyan-400 p-5 rounded-xl backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white font-orbitron group-hover:text-cyan-400 transition-colors">Hybrid AI Scholarship Bot</h3>
                    <span className="text-[10px] font-orbitron bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">SCIKIT & STREAMLIT</span>
                  </div>
                  <p className="text-[11px] text-cyan-400 font-orbitron tracking-wider mb-2">[ ANOMALY DETECTION ]</p>
                  <p className="text-xs text-gray-300 font-space leading-relaxed">
                    Intelligent automated filtering bot built using Python, Scikit-Learn Isolation Forest, and Streamlit dashboard interface.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex justify-between items-center text-xs font-orbitron font-bold text-cyan-400">
                  <span>SPECS & LOGS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* SLIDE 3: FIELD OPERATIONS (INTERNSHIPS & TRAINING) */}
      <section id="experience" className="snap-center h-screen w-full flex flex-col justify-center items-center relative px-4 md:px-8 py-6 bg-black/70 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
              FIELD <span className="text-cyan-400">OPERATIONS</span>
            </h2>
            <p className="text-xs font-space text-cyan-300 tracking-widest uppercase">Complete Industrial Experience & Internship History</p>
            <div className="h-1 w-20 bg-cyan-400 mx-auto mt-2 rounded-full shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[68vh] overflow-y-auto pr-1">
            {/* Op 1 */}
            <div className="bg-gray-900/50 border border-cyan-500/30 p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm hover:border-cyan-400 transition-colors">
              <div>
                <span className="text-[10px] font-orbitron text-cyan-400 tracking-wider">[ 01 :: METROLOGY ]</span>
                <h3 className="text-base font-bold text-white font-orbitron mt-1">Precise3DM</h3>
                <p className="text-xs text-cyan-300 font-space mb-2">Intern</p>
                <p className="text-xs text-gray-300 font-space leading-normal">
                  3D Scan Based Solutions & Metrology inspection pipelines.
                </p>
              </div>
            </div>

            {/* Op 2 */}
            <div className="bg-gray-900/50 border border-cyan-500/30 p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm hover:border-cyan-400 transition-colors">
              <div>
                <span className="text-[10px] font-orbitron text-cyan-400 tracking-wider">[ 02 :: AI & CV ]</span>
                <h3 className="text-base font-bold text-white font-orbitron mt-1">Tamizhan Skills</h3>
                <p className="text-xs text-cyan-300 font-space mb-2">RISE AI Intern</p>
                <p className="text-xs text-gray-300 font-space leading-normal">
                  RISE AI for Autonomous Systems Intern (Computer Vision, YOLOv8, Path Planning).
                </p>
              </div>
            </div>

            {/* Op 3 */}
            <div className="bg-gray-900/50 border border-cyan-500/30 p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm hover:border-cyan-400 transition-colors">
              <div>
                <span className="text-[10px] font-orbitron text-cyan-400 tracking-wider">[ 03 :: ML PIPELINES ]</span>
                <h3 className="text-base font-bold text-white font-orbitron mt-1">CodeAlpha</h3>
                <p className="text-xs text-cyan-300 font-space mb-2">ML Intern</p>
                <p className="text-xs text-gray-300 font-space leading-normal">
                  Development of machine learning models using XGBoost, CNNs, and PyTorch.
                </p>
              </div>
            </div>

            {/* Op 4 */}
            <div className="bg-gray-900/50 border border-cyan-500/30 p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm hover:border-cyan-400 transition-colors">
              <div>
                <span className="text-[10px] font-orbitron text-cyan-400 tracking-wider">[ 04 :: EDP & LOCO ]</span>
                <h3 className="text-base font-bold text-white font-orbitron mt-1">Chennai Port</h3>
                <p className="text-xs text-cyan-300 font-space mb-2">Authority Inplant</p>
                <p className="text-xs text-gray-300 font-space leading-normal">
                  Vocational Inplant Training (Locomotives, Diesel Engines, Heavy Machinery).
                </p>
              </div>
            </div>

            {/* Op 5 */}
            <div className="bg-gray-900/50 border border-cyan-500/30 p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm hover:border-cyan-400 transition-colors">
              <div>
                <span className="text-[10px] font-orbitron text-cyan-400 tracking-wider">[ 05 :: ROS 2 NAV ]</span>
                <h3 className="text-base font-bold text-white font-orbitron mt-1">KarthiKesh</h3>
                <p className="text-xs text-cyan-300 font-space mb-2">Robotics Program</p>
                <p className="text-xs text-gray-300 font-space leading-normal">
                  20-Day Industrial Career Uplifting Program (Advanced ROS 2 & Autonomous Navigation).
                </p>
              </div>
            </div>

            {/* Op 6 */}
            <div className="bg-gray-900/50 border border-cyan-500/30 p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm hover:border-cyan-400 transition-colors">
              <div>
                <span className="text-[10px] font-orbitron text-cyan-400 tracking-wider">[ 06 :: MANUFACTURING ]</span>
                <h3 className="text-base font-bold text-white font-orbitron mt-1">MK Auto</h3>
                <p className="text-xs text-cyan-300 font-space mb-2">Industrial Intern</p>
                <p className="text-xs text-gray-300 font-space leading-normal">
                  CNC/VMC Operations, Cold Forging, Casting & precision manufacturing.
                </p>
              </div>
            </div>

            {/* Op 7 */}
            <div className="bg-gray-900/50 border border-cyan-500/30 p-4 rounded-lg flex flex-col justify-between backdrop-blur-sm hover:border-cyan-400 transition-colors sm:col-span-2 lg:col-span-2">
              <div>
                <span className="text-[10px] font-orbitron text-cyan-400 tracking-wider">[ 07 :: VIRTUAL SPRINT ]</span>
                <h3 className="text-base font-bold text-white font-orbitron mt-1">Kodacy</h3>
                <p className="text-xs text-cyan-300 font-space mb-2">Virtual Robotics Intern</p>
                <p className="text-xs text-gray-300 font-space leading-normal">
                  15-Day Virtual Robotics Intern focusing on embedded systems & robotics simulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 4: GLOBAL EXPOS & CERTIFICATIONS */}
      <section id="expos-certs" className="snap-center h-screen w-full flex flex-col justify-center items-center relative px-4 md:px-8 py-6 bg-black/50 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
              GLOBAL EXPOS & <span className="text-cyan-400">CERTIFICATIONS</span>
            </h2>
            <p className="text-xs font-space text-cyan-300 tracking-widest uppercase">Defense Expo Analysis & Verified Technical Badges</p>
            <div className="h-1 w-20 bg-cyan-400 mx-auto mt-2 rounded-full shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: EXPOS */}
            <div className="bg-gray-900/60 border border-cyan-500/30 p-6 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.05)]">
              <h3 className="text-lg font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">❖</span> INDUSTRIAL EXPOS & DEFENSE ANALYSIS
              </h3>
              <div className="space-y-4 font-space">
                <div className="bg-black/50 border border-cyan-500/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-cyan-300 font-orbitron">Automation India Expo 2026</h4>
                    <span className="text-[10px] text-cyan-400 font-mono">CHENNAI</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Chennai Trade Centre — Explored industrial robotics, smart sensors, and factory automation architectures.
                  </p>
                </div>

                <div className="bg-black/50 border border-cyan-500/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold text-cyan-300 font-orbitron">DEFTECH Bharat Bengaluru 2026</h4>
                    <span className="text-[10px] text-cyan-400 font-mono">BENGALURU</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Defense Technology Expo — Specialized T-90 Bhishma tank propulsion & heavy mechatronics analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: CERTIFICATIONS */}
            <div className="bg-gray-900/60 border border-cyan-500/30 p-6 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.05)]">
              <h3 className="text-lg font-orbitron font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">◈</span> VERIFIED CERTIFICATIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-space">
                <div className="bg-black/50 border border-cyan-500/20 p-3 rounded-lg">
                  <h4 className="text-xs font-bold text-cyan-300 font-orbitron">IBM SkillsBuild</h4>
                  <p className="text-[11px] text-gray-300 mt-1">AI Fundamentals & Advanced Python Data Analysis</p>
                </div>
                <div className="bg-black/50 border border-cyan-500/20 p-3 rounded-lg">
                  <h4 className="text-xs font-bold text-cyan-300 font-orbitron">Cisco</h4>
                  <p className="text-[11px] text-gray-300 mt-1">Computer Hardware Basics</p>
                </div>
                <div className="bg-black/50 border border-cyan-500/20 p-3 rounded-lg">
                  <h4 className="text-xs font-bold text-cyan-300 font-orbitron">NPTEL</h4>
                  <p className="text-[11px] text-gray-300 mt-1">Industrial Robotics & Joy of Computing using Python</p>
                </div>
                <div className="bg-black/50 border border-cyan-500/20 p-3 rounded-lg">
                  <h4 className="text-xs font-bold text-cyan-300 font-orbitron">NoviTech</h4>
                  <p className="text-[11px] text-gray-300 mt-1">Full Stack Web Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 5: LIVE COMM-LINK (NETWORK & CONTACT) */}
      <section id="contact" className="snap-center h-screen w-full flex flex-col justify-center items-center relative px-4 md:px-8 py-6 bg-black/70 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
              LIVE <span className="text-cyan-400">COMM-LINK</span>
            </h2>
            <p className="text-xs font-space text-cyan-300 tracking-widest uppercase">Network Feed & Encrypted Transmission</p>
            <div className="h-1 w-20 bg-cyan-400 mx-auto mt-2 rounded-full shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left Column: Network Uplink Placeholder */}
            <div className="bg-gray-900/60 border border-cyan-500/30 p-6 rounded-xl backdrop-blur-md flex flex-col justify-center items-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-cyan-500/5 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="w-16 h-16 rounded-full border-2 border-cyan-400/60 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <span className="text-cyan-400 text-2xl font-orbitron">📡</span>
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white mb-2">NETWORK UPLINK</h3>
              <p className="text-xs text-cyan-400 font-mono tracking-wider mb-4">[ LINKEDIN INTEGRATION NODE ]</p>
              <div className="bg-black/70 border border-cyan-500/40 p-6 rounded-lg max-w-md w-full">
                <p className="text-sm font-space text-gray-300 leading-relaxed italic">
                  &quot;Live LinkedIn Feed integration pending...&quot;
                </p>
                <p className="text-xs font-mono text-cyan-400/80 mt-3">
                  (I will embed the iframe later)
                </p>
              </div>
            </div>

            {/* Right Column: Cyberpunk Contact Form */}
            <div className="bg-gray-900/60 border border-cyan-500/30 p-6 rounded-xl backdrop-blur-md flex flex-col justify-center shadow-[0_0_25px_rgba(0,240,255,0.05)]">
              <h3 className="text-xl font-orbitron font-bold text-white mb-1">TRANSMIT SIGNAL</h3>
              <p className="text-xs text-cyan-400 font-mono mb-4 tracking-wider">[ ENCRYPTED DIRECT CHANNEL ]</p>
              <form className="flex flex-col gap-3 font-space" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-[10px] font-orbitron text-cyan-400 mb-1 block">IDENTITY (NAME)</label>
                  <input type="text" placeholder="e.g. Commander Sheppard" className="w-full bg-black/60 border border-cyan-900 focus:border-cyan-400 rounded p-2.5 text-xs text-cyan-300 outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-orbitron text-cyan-400 mb-1 block">COMM FREQUENCY (EMAIL)</label>
                  <input type="email" placeholder="e.g. signal@domain.com" className="w-full bg-black/60 border border-cyan-900 focus:border-cyan-400 rounded p-2.5 text-xs text-cyan-300 outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-orbitron text-cyan-400 mb-1 block">TRANSMISSION DATA (MESSAGE)</label>
                  <textarea placeholder="Write encrypted message body..." rows={3} className="w-full bg-black/60 border border-cyan-900 focus:border-cyan-400 rounded p-2.5 text-xs text-cyan-300 outline-none transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition-all font-bold font-orbitron text-xs tracking-widest rounded mt-1 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                  BROADCAST TRANSMISSION
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

