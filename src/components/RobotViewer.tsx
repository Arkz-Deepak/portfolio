"use client"
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FaCube, FaSyncAlt, FaRedo, FaUndo } from 'react-icons/fa'

interface RobotViewerProps {
  modelUrl?: string
  autoRotateSpeed?: number
  height?: string
  compact?: boolean
  showControls?: boolean
}

export default function RobotViewer({
  modelUrl = '/models/vortex-crawler.glb',
  autoRotateSpeed = 1.2,
  height = '440px',
  compact = false,
  showControls = true
}: RobotViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const robotGroupRef = useRef<THREE.Group | null>(null)
  const loadedModelRef = useRef<THREE.Group | null>(null)
  const proceduralModelRef = useRef<THREE.Group | null>(null)
  const edfBladesRef = useRef<THREE.Mesh | null>(null)

  const [webglSupported, setWebglSupported] = useState(true)
  const [loading, setLoading] = useState(true)
  const [modelType, setModelType] = useState<'glb' | 'procedural-cad'>('procedural-cad')
  const [isRotating, setIsRotating] = useState(true)
  const [rotX, setRotX] = useState<number>(-Math.PI / 2) // Default -90 deg to lay flat horizontally
  const [rotY, setRotY] = useState<number>(0)
  const [rotZ, setRotZ] = useState<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Safe WebGL check
    try {
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')
      if (!gl) {
        setWebglSupported(false)
        return
      }
    } catch {
      setWebglSupported(false)
      return
    }

    const width = container.clientWidth || 520
    const heightPx = container.clientHeight || (compact ? 280 : 440)

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x030712) // Slate-950 CAD Viewport
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100)
    camera.position.set(3.4, 2.5, 3.6)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(width, heightPx)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = isRotating
    controls.autoRotateSpeed = autoRotateSpeed
    controls.maxPolarAngle = Math.PI / 2 + 0.1
    controls.minDistance = 1.0
    controls.maxDistance = 12
    controlsRef.current = controls

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0x00f0ff, 2.8)
    mainLight.position.set(5, 8, 5)
    mainLight.castShadow = true
    scene.add(mainLight)

    const rimLight = new THREE.DirectionalLight(0xff007f, 2.2)
    rimLight.position.set(-5, 5, -4)
    scene.add(rimLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.4)
    fillLight.position.set(0, -3, 4)
    scene.add(fillLight)

    const pointLight = new THREE.PointLight(0x00ff9d, 1.8, 8)
    pointLight.position.set(0, 2, 0)
    scene.add(pointLight)

    // Ground Grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x00f0ff, 0x1e293b)
    gridHelper.position.y = -0.01
    scene.add(gridHelper)

    // Root Group
    const robotGroup = new THREE.Group()
    scene.add(robotGroup)
    robotGroupRef.current = robotGroup

    // Helper: Build procedural CAD model of the Vortex Crawler as instant preview
    const buildProceduralModel = (): THREE.Group => {
      const group = new THREE.Group()

      // Chassis Plate
      const chassisGeo = new THREE.BoxGeometry(2.0, 0.08, 1.4)
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.4,
        metalness: 0.8
      })
      const chassis = new THREE.Mesh(chassisGeo, chassisMat)
      chassis.position.y = 0.4
      chassis.castShadow = true
      group.add(chassis)

      // 70mm EDF Shroud
      const edfDuctGeo = new THREE.CylinderGeometry(0.48, 0.45, 0.6, 32, 1, true)
      const edfMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        roughness: 0.3,
        metalness: 0.9,
        side: THREE.DoubleSide
      })
      const edfDuct = new THREE.Mesh(edfDuctGeo, edfMat)
      edfDuct.position.set(0, 0.65, 0)
      group.add(edfDuct)

      // EDF Impeller Blades
      const bladesGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 12)
      const bladesMat = new THREE.MeshStandardMaterial({
        color: 0xff007f,
        roughness: 0.2,
        metalness: 0.8
      })
      const blades = new THREE.Mesh(bladesGeo, bladesMat)
      blades.position.set(0, 0.65, 0)
      edfBladesRef.current = blades
      group.add(blades)

      // Left Track
      const trackGeo = new THREE.BoxGeometry(2.2, 0.35, 0.28)
      const trackMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        roughness: 0.9,
        metalness: 0.1
      })
      const leftTrack = new THREE.Mesh(trackGeo, trackMat)
      leftTrack.position.set(0, 0.25, 0.75)
      leftTrack.castShadow = true
      group.add(leftTrack)

      // Right Track
      const rightTrack = new THREE.Mesh(trackGeo, trackMat)
      rightTrack.position.set(0, 0.25, -0.75)
      rightTrack.castShadow = true
      group.add(rightTrack)

      // 4x Planetary Gear Motors
      const motorGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16)
      const motorMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9 })
      const motorPositions = [
        [0.7, 0.25, 0.6],
        [-0.7, 0.25, 0.6],
        [0.7, 0.25, -0.6],
        [-0.7, 0.25, -0.6]
      ]
      motorPositions.forEach(([mx, my, mz]) => {
        const motor = new THREE.Mesh(motorGeo, motorMat)
        motor.rotation.x = Math.PI / 2
        motor.position.set(mx, my, mz)
        group.add(motor)
      })

      // Electronics PCB
      const pcbGeo = new THREE.BoxGeometry(0.6, 0.05, 0.5)
      const pcbMat = new THREE.MeshStandardMaterial({
        color: 0x059669,
        roughness: 0.5,
        metalness: 0.5
      })
      const pcb = new THREE.Mesh(pcbGeo, pcbMat)
      pcb.position.set(-0.55, 0.48, 0)
      group.add(pcb)

      // Power/Status LED
      const ledGeo = new THREE.SphereGeometry(0.06, 16, 16)
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x00ff9d })
      const led = new THREE.Mesh(ledGeo, ledMat)
      led.position.set(-0.55, 0.55, 0.15)
      group.add(led)

      return group
    }

    // Instantly add procedural model so viewport is NEVER blank
    const proc = buildProceduralModel()
    proceduralModelRef.current = proc
    robotGroup.add(proc)
    setModelType('procedural-cad')

    // Asynchronously stream Fusion 360 GLTF model
    setLoading(true)
    const loader = new GLTFLoader()
    loader.load(
      modelUrl,
      (gltf) => {
        const loadedScene = gltf.scene
        loadedModelRef.current = loadedScene

        // 1. Horizontal Belly Placement (Convert Fusion 360 Z-Up to Three.js Y-Up)
        loadedScene.rotation.set(-Math.PI / 2, 0, 0)
        loadedScene.updateMatrixWorld(true)

        // 2. Normalize and Center Bounding Box
        const initialBox = new THREE.Box3().setFromObject(loadedScene)
        const size = initialBox.getSize(new THREE.Vector3())
        const maxAxis = Math.max(size.x, size.y, size.z)

        if (maxAxis > 0) {
          const targetScale = 2.6 / maxAxis
          loadedScene.scale.setScalar(targetScale)
          loadedScene.updateMatrixWorld(true)

          const scaledBox = new THREE.Box3().setFromObject(loadedScene)
          const scaledCenter = scaledBox.getCenter(new THREE.Vector3())

          // Center horizontally on X-Z plane and sit cleanly on Y=0
          loadedScene.position.x -= scaledCenter.x
          loadedScene.position.z -= scaledCenter.z
          loadedScene.position.y -= scaledBox.min.y
        }

        // 3. Enable shadows & specular highlights
        loadedScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            mesh.castShadow = true
            mesh.receiveShadow = true
          }
        })

        // Seamlessly replace procedural placeholder with full-fidelity GLB
        if (proceduralModelRef.current) {
          robotGroup.remove(proceduralModelRef.current)
        }
        robotGroup.add(loadedScene)
        setModelType('glb')
        setLoading(false)
      },
      undefined,
      (error) => {
        console.warn('GLTF loading notice: using high-performance procedural CAD model', error)
        setLoading(false)
      }
    )

    // Animation Loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (edfBladesRef.current) {
        edfBladesRef.current.rotation.y += 0.15
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return
      const w = container.clientWidth || 520
      const h = container.clientHeight || (compact ? 280 : 440)
      cameraRef.current.aspect = w / h
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [modelUrl, compact])

  // Decoupled Auto-Rotate Effect (Updates OrbitControls without recreating Scene)
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isRotating
      controlsRef.current.autoRotateSpeed = autoRotateSpeed
    }
  }, [isRotating, autoRotateSpeed])

  // Decoupled Orientation Effect (Mutates Rotation Matrix without re-downloading GLB)
  useEffect(() => {
    if (loadedModelRef.current) {
      loadedModelRef.current.rotation.set(rotX, rotY, rotZ)
    }
    if (proceduralModelRef.current) {
      proceduralModelRef.current.rotation.set(rotX + Math.PI / 2, rotY, rotZ)
    }
  }, [rotX, rotY, rotZ])

  // Quick Orientation Actions
  const setHorizontalFlat = () => {
    setRotX(-Math.PI / 2)
    setRotY(0)
    setRotZ(0)
  }

  const rotate90X = () => {
    setRotX((prev) => (prev + Math.PI / 2) % (Math.PI * 2))
  }

  const rotate90Y = () => {
    setRotY((prev) => (prev + Math.PI / 2) % (Math.PI * 2))
  }

  const resetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(3.4, 2.5, 3.6)
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
      setHorizontalFlat()
    }
  }

  if (!webglSupported) {
    return (
      <div 
        data-testid="robot-viewer"
        style={{ height }}
        className="w-full rounded-2xl flex flex-col items-center justify-center border-2 border-slate-300 dark:border-cyan-500/40 bg-slate-950 p-6 text-center text-white font-space"
      >
        <FaCube className="text-4xl text-cyan-400 mb-3" />
        <span className="font-orbitron font-bold text-sm text-cyan-300 mb-1">
          3D CAD DIGITAL TWIN: HYBRID VORTEX CRAWLER
        </span>
        <p className="text-xs text-slate-400 max-w-sm">
          WebGL acceleration disabled. Explore full 3D assembly in Autodesk A360 Cloud Viewer.
        </p>
        <a
          href="https://a360.co/3TZt13C"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 px-4 py-2 rounded-xl border border-cyan-400 bg-cyan-500/20 text-cyan-300 text-xs font-orbitron font-bold hover:bg-cyan-400 hover:text-black transition-all"
        >
          LAUNCH AUTODESK CLOUD VIEWER ↗
        </a>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-2.5 font-space" data-testid="robot-viewer">
      {/* 3D Viewport Box */}
      <div 
        ref={containerRef} 
        style={{ height }}
        className="relative w-full rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-cyan-500/40 bg-slate-950 shadow-xl cursor-grab active:cursor-grabbing select-none"
      >
        {/* Top-Left Telemetry Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-2 bg-slate-900/90 border border-slate-700 dark:border-cyan-500/40 px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white font-orbitron text-[10px] sm:text-xs">3D DIGITAL TWIN:</span>
          <span className="text-cyan-300 text-[10px] sm:text-xs font-semibold">
            {modelType === 'glb' ? 'AUTODESK CAD (HORIZONTAL)' : 'PROCEDURAL FUSION CAD'}
          </span>
        </div>

        {/* Top-Right Interactive Controls */}
        {showControls && (
          <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 flex-wrap justify-end">
            <button
              onClick={setHorizontalFlat}
              className="px-2.5 py-1 rounded-lg border bg-slate-900/90 border-slate-700 text-[10px] sm:text-xs font-orbitron font-bold text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/50 transition-all flex items-center gap-1 shadow-sm"
              title="Reset to Horizontal Belly Placement"
            >
              <span>FLAT</span>
            </button>

            <button
              onClick={rotate90X}
              className="px-2 py-1 rounded-lg border bg-slate-900/90 border-slate-700 text-[10px] sm:text-xs font-orbitron font-bold text-slate-300 hover:border-cyan-400 hover:text-white transition-all shadow-sm"
              title="Rotate +90° Pitch"
            >
              PITCH
            </button>

            <button
              onClick={rotate90Y}
              className="px-2 py-1 rounded-lg border bg-slate-900/90 border-slate-700 text-[10px] sm:text-xs font-orbitron font-bold text-slate-300 hover:border-cyan-400 hover:text-white transition-all shadow-sm"
              title="Rotate +90° Yaw"
            >
              YAW
            </button>

            <button
              onClick={() => setIsRotating((prev) => !prev)}
              className={`p-1.5 px-2 rounded-lg border text-[10px] sm:text-xs font-orbitron font-bold transition-all shadow-sm ${
                isRotating
                  ? 'bg-blue-600 text-white border-blue-500 dark:bg-cyan-500/30 dark:border-cyan-400 dark:text-cyan-300'
                  : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Toggle Auto-Rotation"
            >
              <FaSyncAlt className={`text-xs ${isRotating ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}

        {/* Streaming Background Badge */}
        {loading && (
          <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-2 bg-slate-900/90 border border-cyan-500/30 px-2.5 py-1 rounded-lg text-[10px] font-mono text-cyan-400 backdrop-blur-md">
            <FaCube className="animate-spin text-cyan-400 text-xs" />
            <span>STREAMING HIGH-POLY CAD MESH...</span>
          </div>
        )}

        {/* Bottom Hint */}
        <div className="absolute bottom-2.5 left-2.5 z-10 text-[10px] sm:text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-700 pointer-events-none">
          💡 DRAG TO ORBIT • SCROLL TO ZOOM • RIGHT-CLICK TO PAN
        </div>
      </div>
    </div>
  )
}

