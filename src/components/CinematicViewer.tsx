"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import Link from 'next/link'
import ProfileAvatar from '@/components/ProfileAvatar'
import { profileData } from '@/data/profile'
import { FaChevronDown, FaChevronUp, FaTimes, FaExternalLinkAlt, FaCube, FaSatellite, FaRobot, FaMicrochip, FaBook } from 'react-icons/fa'

interface StageInfo {
  id: string
  tag: string
  title: string
  subtitle: string
  description: string
  stats: { label: string; value: string }[]
  links: { label: string; url: string; external?: boolean }[]
  cameraPos: [number, number, number]
  targetPos: [number, number, number]
  modelRotation: [number, number, number]
}

const STAGES: StageInfo[] = [
  {
    id: 'intro',
    tag: 'PHYSICAL AI & ROBOTICS ARCHITECT',
    title: 'DEEPAK.OS :: 3D DIGITAL TWIN',
    subtitle: 'Sim-to-Real Digital Twins, Active Adhesion Wall-Climbers & Space Debris Robotics',
    description: 'Engineering intelligent autonomous systems bridging low-level embedded RTOS actuation with high-level deep reinforcement learning and computer vision pipelines.',
    stats: [
      { label: 'CGPA', value: '9.2 / 10.0' },
      { label: 'Specialization', value: 'ROS 2 Jazzy & Nav2' },
      { label: 'Hardware BOM', value: 'STM32 / ESP32 / Jetson' },
      { label: 'Documentation', value: '17+ Repositories Deployed' }
    ],
    links: [
      { label: 'EXPLORE ARCHIVES', url: '/projects' },
      { label: 'LABS SANDBOX', url: '/labs' }
    ],
    cameraPos: [0, 1.8, 5.2],
    targetPos: [0, 0, 0],
    modelRotation: [0, 0, 0]
  },
  {
    id: 'vortex-crawler',
    tag: 'NE-X GEN ROBOTICS 2026 | IDREA',
    title: 'HYBRID VORTEX CRAWLER',
    subtitle: '45N Active Vortex Wall-Climbing Inspection Robot',
    description: 'Generates 45 N aerodynamic holding force via a 70mm Electric Ducted Fan (EDF) and passive N52 magnetic arrays. Dual-tier ROS 2 Jazzy supervisor paired via UART with an ESP32 FreeRTOS deterministic motor node.',
    stats: [
      { label: 'Downforce', value: '45 N (EDF Vortex)' },
      { label: 'Payload', value: '1.5 kg (NDE Probes)' },
      { label: 'Drive', value: '4x 164 RPM Motors' },
      { label: 'Control Loop', value: '20 kHz PWM' }
    ],
    links: [
      { label: 'CASE STUDY', url: '/projects/vortex-crawler' },
      { label: 'AUTODESK CAD ↗', url: 'https://a360.co/3TZt13C', external: true }
    ],
    cameraPos: [2.8, 1.4, 3.2],
    targetPos: [0, 0, 0],
    modelRotation: [-Math.PI / 4, Math.PI / 3, 0]
  },
  {
    id: 'space-debris',
    tag: 'SMART INDIA HACKATHON 2026 (PS SIH26226)',
    title: 'ORBITAL ADR: SPACE DEBRIS CLEANER',
    subtitle: 'Autonomous Active Debris Removal Spacecraft in Low Earth Orbit',
    description: 'Octagonal bus with a 4-piston mechanical Compression System for kinetic energy dampening and a high-voltage electroadhesive capture plate for irregular, non-magnetic debris capture in microgravity.',
    stats: [
      { label: 'Guidance', value: 'SpaceYOLO + ROS 2' },
      { label: 'Actuation', value: 'Cold-Gas Thrusters' },
      { label: 'Compute', value: 'Jetson Nano + STM32' },
      { label: 'Docs Theme', value: 'Architect Theme' }
    ],
    links: [
      { label: 'CASE STUDY', url: '/projects/space-debris-cleaner' },
      { label: 'MISSION HUD ↗', url: 'http://sih-space-tech.deepak-arkz.me/', external: true },
      { label: 'JEKYLL DOCS ↗', url: 'https://lab.deepak-arkz.me/sih2026-isro-space-tech/', external: true }
    ],
    cameraPos: [-2.6, 2.0, 3.8],
    targetPos: [0, 0.2, 0],
    modelRotation: [Math.PI / 6, -Math.PI / 4, Math.PI / 12]
  },
  {
    id: 'autotwin-ai',
    tag: 'HACKNIMA 2026 INTERNATIONAL FINALIST',
    title: 'AUTOTWIN-AI v2: 5D SPATIOTEMPORAL',
    subtitle: 'ConvLSTM2d Robotic Welding Monitoring & 3D Digital Twin',
    description: 'Buffers streaming 30 FPS radiometric thermal video into 5D PyTorch tensors. TimeDistributed CNNs and ConvLSTM2d cells detect transient voids, cooling rate drops, and spatter bursts in under 40ms on TensorRT.',
    stats: [
      { label: 'Tensor Shape', value: '(B, T, C, H, W)' },
      { label: 'Inference', value: '<40 ms (TensorRT)' },
      { label: 'Sensing', value: 'Eye-in-Hand LWIR' },
      { label: 'Visualization', value: 'Three.js 3D Twin' }
    ],
    links: [
      { label: 'CASE STUDY', url: '/projects/autotwin-ai' },
      { label: 'PITCH DECK ↗', url: 'https://docs.google.com/presentation/d/1sPcQ4e1_jjpj0JXypPtbesnlkwDpOdKaJvuFtlF2hcU/edit', external: true },
      { label: 'DOCS HUB ↗', url: 'https://lab.deepak-arkz.me/AutoTwin-AI/', external: true }
    ],
    cameraPos: [0, 2.5, 4.2],
    targetPos: [0, -0.1, 0],
    modelRotation: [Math.PI / 3, 0, Math.PI / 4]
  },
  {
    id: 'fleet-hub',
    tag: 'OPEN ARCHITECTURE BLUEPRINTS',
    title: '17+ REPOSITORIES :: lab.deepak-arkz.me',
    subtitle: 'Automated Jekyll Engineering Documentation Fleet',
    description: 'Every autonomous mobile robot, embedded RTOS node, and machine learning pipeline is documented with automated architecture specifications, circuit schematics, and deployment guides.',
    stats: [
      { label: 'Jekyll Hub', value: 'lab.deepak-arkz.me' },
      { label: 'Themes', value: 'Architect, Slate, Cayman' },
      { label: 'Repositories', value: '17 Active Packages' },
      { label: 'Status', value: 'Verified & Deployed' }
    ],
    links: [
      { label: 'OPEN LAB HUB ↗', url: 'https://lab.deepak-arkz.me', external: true },
      { label: 'DOWNLOAD RESUME ⤓', url: profileData.resumeUrl, external: true }
    ],
    cameraPos: [2.2, 1.8, 4.0],
    targetPos: [0, 0, 0],
    modelRotation: [0.2, 0.8, -0.2]
  }
]

export default function CinematicViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStageIdx, setCurrentStageIdx] = useState(0)
  const [fps, setFps] = useState(60)

  // Smooth interpolated camera and model values
  const currentCamPos = useRef(new THREE.Vector3(0, 1.8, 5.2))
  const targetCamPos = useRef(new THREE.Vector3(0, 1.8, 5.2))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const targetModelRot = useRef(new THREE.Euler(0, 0, 0))
  const currentModelRot = useRef(new THREE.Euler(0, 0, 0))

  const activeStage = STAGES[currentStageIdx]

  // Update target positions when stage changes
  useEffect(() => {
    const stage = STAGES[currentStageIdx]
    targetCamPos.current.set(...stage.cameraPos)
    targetLookAt.current.set(...stage.targetPos)
    targetModelRot.current.set(...stage.modelRotation)
  }, [currentStageIdx])

  const nextStage = useCallback(() => {
    setCurrentStageIdx((prev) => (prev < STAGES.length - 1 ? prev + 1 : 0))
  }, [])

  const prevStage = useCallback(() => {
    setCurrentStageIdx((prev) => (prev > 0 ? prev - 1 : STAGES.length - 1))
  }, [])

  // Wheel debounce for desktop scrollytelling
  const lastScrollTime = useRef(0)
  const handleWheel = useCallback((e: WheelEvent) => {
    const now = Date.now()
    if (now - lastScrollTime.current < 600) return
    if (Math.abs(e.deltaY) > 30) {
      lastScrollTime.current = now
      if (e.deltaY > 0) {
        nextStage()
      } else {
        prevStage()
      }
    }
  }, [nextStage, prevStage])

  // Touch gesture handling for mobile
  const touchStartY = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(deltaY) > 40) {
      if (deltaY > 0) nextStage()
      else prevStage()
    }
  }

  // Three.js Scene Setup
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x030712)
    scene.fog = new THREE.FogExp2(0x030712, 0.08)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.copy(currentCamPos.current)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const cyanLight = new THREE.DirectionalLight(0x00f0ff, 3.2)
    cyanLight.position.set(5, 8, 5)
    scene.add(cyanLight)

    const pinkLight = new THREE.DirectionalLight(0xff007f, 2.5)
    pinkLight.position.set(-5, 4, -4)
    scene.add(pinkLight)

    const pointLight = new THREE.PointLight(0x00ff9d, 2.0, 10)
    pointLight.position.set(0, 3, 0)
    scene.add(pointLight)

    // Grid Floor
    const grid = new THREE.GridHelper(24, 32, 0x00f0ff, 0x1e293b)
    grid.position.y = -1.2
    scene.add(grid)

    // Background Particle Starfield
    const particlesCount = 450
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 30
      particlePositions[i + 1] = (Math.random() - 0.5) * 20
      particlePositions[i + 2] = (Math.random() - 0.5) * 30
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    })
    const particleField = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleField)

    // Central Robot Group
    const robotGroup = new THREE.Group()
    scene.add(robotGroup)

    // Chassis Base
    const chassisGeo = new THREE.BoxGeometry(2.4, 0.28, 1.8)
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false
    })
    const chassis = new THREE.Mesh(chassisGeo, chassisMat)
    robotGroup.add(chassis)

    // EDF Duct Cylinder
    const edfGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.45, 32)
    const edfMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0x003344
    })
    const edf = new THREE.Mesh(edfGeo, edfMat)
    edf.position.y = 0.3
    robotGroup.add(edf)

    // EDF Rotating Blades
    const fanGeo = new THREE.BoxGeometry(0.95, 0.04, 0.16)
    const fanMat = new THREE.MeshBasicMaterial({ color: 0xff007f })
    const fanBlade = new THREE.Mesh(fanGeo, fanMat)
    fanBlade.position.y = 0.3
    robotGroup.add(fanBlade)

    // Tracks Left & Right
    const trackGeo = new THREE.BoxGeometry(2.6, 0.35, 0.3)
    const trackMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 })
    const leftTrack = new THREE.Mesh(trackGeo, trackMat)
    leftTrack.position.set(0, -0.05, 0.9)
    robotGroup.add(leftTrack)
    const rightTrack = leftTrack.clone()
    rightTrack.position.set(0, -0.05, -0.9)
    robotGroup.add(rightTrack)

    // Glowing Sensor Ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.02, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ff9d, wireframe: true })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    ring.position.y = -0.2
    robotGroup.add(ring)

    // FPS Meter tracking
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('wheel', handleWheel, { passive: true })

    // Render loop with smooth damping
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Lerp camera position
      currentCamPos.current.lerp(targetCamPos.current, 0.05)
      camera.position.copy(currentCamPos.current)

      // Lerp lookAt
      currentLookAt.current.lerp(targetLookAt.current, 0.05)
      camera.lookAt(currentLookAt.current)

      // Lerp model rotation
      currentModelRot.current.x += (targetModelRot.current.x - currentModelRot.current.x) * 0.05
      currentModelRot.current.y += (targetModelRot.current.y - currentModelRot.current.y) * 0.05
      currentModelRot.current.z += (targetModelRot.current.z - currentModelRot.current.z) * 0.05

      robotGroup.rotation.x = currentModelRot.current.x
      robotGroup.rotation.y = currentModelRot.current.y + performance.now() * 0.0003
      robotGroup.rotation.z = currentModelRot.current.z

      // Animate blades & sensor ring
      fanBlade.rotation.y += 0.25
      ring.rotation.z += 0.01
      particleField.rotation.y += 0.0005

      renderer.render(scene, camera)

      // FPS Calculation
      frameCount++
      const now = performance.now()
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)))
        frameCount = 0
        lastTime = now
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('wheel', handleWheel)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [handleWheel])

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-slate-950 text-white font-space select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D WebGL Canvas Layer */}
      <div ref={containerRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

      {/* TOP-LEFT PINNED PROFILE HUD (User Requirement) */}
      <div className="absolute top-4 left-4 z-30 max-w-[280px] sm:max-w-xs bg-slate-900/90 border border-cyan-500/40 p-3 sm:p-4 rounded-2xl backdrop-blur-xl shadow-[0_0_25px_rgba(0,240,255,0.15)] flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400 shrink-0 shadow-[0_0_10px_#00f0ff]">
            <ProfileAvatar priority={true} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold block flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              DEEPAK.OS :: 3D MODE
            </span>
            <h1 className="text-sm sm:text-base font-black font-orbitron text-white">
              DEEPAK R.
            </h1>
            <p className="text-[10px] font-space text-cyan-300 font-semibold leading-tight line-clamp-1">
              Engineering Student
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
          <span className="text-amber-400 font-bold">🎓 9.2 CGPA • Anna Univ</span>
          <span className="text-emerald-400 font-bold">{fps} FPS • WebGL</span>
        </div>

        <Link
          href="/"
          className="mt-1 w-full py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-orbitron font-bold text-[10px] text-center transition-all flex items-center justify-center gap-1.5"
        >
          <FaTimes className="text-[10px] text-rose-400" />
          <span>EXIT 3D MODE (CLASSIC OS)</span>
        </Link>
      </div>

      {/* TOP-RIGHT CONTROLS */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        <Link
          href="/projects"
          className="hidden sm:flex px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-black/60 hover:bg-cyan-950 text-cyan-300 text-xs font-orbitron font-bold transition-all items-center gap-1.5 shadow-md backdrop-blur-md"
        >
          <span>ALL PROJECTS</span>
          <span className="text-[10px]">↗</span>
        </Link>
        <Link
          href="/labs"
          className="hidden sm:flex px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-black/60 hover:bg-cyan-950 text-cyan-300 text-xs font-orbitron font-bold transition-all items-center gap-1.5 shadow-md backdrop-blur-md"
        >
          <span>SIMULATION LABS</span>
          <span className="text-[10px]">↗</span>
        </Link>
      </div>

      {/* RIGHT STAGE PROGRESS NAVIGATOR */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-2.5 bg-black/40 border border-slate-800 p-2 rounded-full backdrop-blur-md">
        {STAGES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentStageIdx(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentStageIdx
                ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_#00f0ff]'
                : 'bg-slate-700 hover:bg-slate-500'
            }`}
            title={s.title}
          />
        ))}
      </div>

      {/* BOTTOM FLOATING SCROLLYTELLING HUD CARD */}
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-30 max-w-xl mx-auto md:mx-0 bg-slate-900/90 border border-cyan-500/40 p-5 md:p-6 rounded-2xl backdrop-blur-xl shadow-[0_0_35px_rgba(0,240,255,0.2)]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-orbitron font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
            {activeStage.tag}
          </span>
          <span className="text-xs font-mono font-bold text-amber-400">
            SYSTEM [0{currentStageIdx + 1} / 0{STAGES.length}]
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-black font-orbitron text-white mb-1">
          {activeStage.title}
        </h2>
        <p className="text-xs md:text-sm font-space font-semibold text-cyan-300 mb-3">
          {activeStage.subtitle}
        </p>

        <p className="text-xs leading-relaxed text-slate-300 mb-4 line-clamp-3 md:line-clamp-none">
          {activeStage.description}
        </p>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-mono text-[10px] sm:text-xs">
          {activeStage.stats.map((stat, sIdx) => (
            <div key={sIdx} className="p-2 rounded-lg bg-black/60 border border-slate-800 flex flex-col">
              <span className="text-[9px] text-slate-400 uppercase font-orbitron">{stat.label}</span>
              <span className="font-bold text-cyan-300 mt-0.5">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons & Stage Steppers */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            {activeStage.links.map((link, lIdx) => (
              <a
                key={lIdx}
                href={link.url}
                target={link.external ? '_blank' : '_self'}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="px-3.5 py-1.5 rounded-xl border border-cyan-400 bg-cyan-500/20 hover:bg-cyan-400 hover:text-black font-orbitron font-bold text-[10px] sm:text-xs transition-all shadow-sm flex items-center gap-1.5 text-cyan-300"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={prevStage}
              className="p-2 rounded-lg border border-slate-700 bg-black/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs"
              title="Previous System"
            >
              <FaChevronUp />
            </button>
            <button
              onClick={nextStage}
              className="px-3 py-1.5 rounded-lg border border-cyan-400 bg-cyan-500/30 hover:bg-cyan-400 hover:text-black text-cyan-300 font-orbitron font-bold text-xs transition-all flex items-center gap-1"
              title="Next System"
            >
              <span>NEXT</span>
              <FaChevronDown className="text-[10px]" />
            </button>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-2 text-center text-[10px] font-mono text-slate-500 sm:hidden">
          💡 Swipe Up / Down or tap NEXT to navigate systems
        </div>
      </div>
    </div>
  )
}
