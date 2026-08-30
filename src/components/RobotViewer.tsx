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
}

export default function RobotViewer({
  modelUrl = '/models/vortex-crawler.glb',
  autoRotateSpeed = 1.2,
  height = '440px'
}: RobotViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [modelType, setModelType] = useState<'glb' | 'procedural-cad'>('procedural-cad')
  const [isRotating, setIsRotating] = useState(true)
  const [rotX, setRotX] = useState<number>(-Math.PI / 2) // Default -90 deg to lay flat horizontally
  const [rotY, setRotY] = useState<number>(0)
  const [rotZ, setRotZ] = useState<number>(0)

  const loadedModelRef = useRef<THREE.Group | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || 520
    const heightPx = container.clientHeight || 440

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x030712) // Slate-950

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100)
    camera.position.set(3.4, 2.5, 3.6)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, heightPx)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = isRotating
    controls.autoRotateSpeed = autoRotateSpeed
    controls.maxPolarAngle = Math.PI / 2 + 0.1
    controls.minDistance = 1.0
    controls.maxDistance = 12

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
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

    let edfBlades: THREE.Mesh | null = null

    // Helper to build procedural CAD model of the Vortex Crawler as fallback
    const buildProceduralModel = () => {
      const chassisGeo = new THREE.BoxGeometry(2.0, 0.08, 1.4)
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.4,
        metalness: 0.8
      })
      const chassis = new THREE.Mesh(chassisGeo, chassisMat)
      chassis.position.y = 0.4
      chassis.castShadow = true
      robotGroup.add(chassis)

      const edfDuctGeo = new THREE.CylinderGeometry(0.48, 0.45, 0.6, 32, 1, true)
      const edfMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        roughness: 0.3,
        metalness: 0.9,
        side: THREE.DoubleSide
      })
      const edfDuct = new THREE.Mesh(edfDuctGeo, edfMat)
      edfDuct.position.set(0, 0.65, 0)
      robotGroup.add(edfDuct)

      const bladesGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 12)
      const bladesMat = new THREE.MeshStandardMaterial({
        color: 0xff007f,
        roughness: 0.2,
        metalness: 0.8
      })
      edfBlades = new THREE.Mesh(bladesGeo, bladesMat)
      edfBlades.position.set(0, 0.65, 0)
      robotGroup.add(edfBlades)

      const trackGeo = new THREE.BoxGeometry(2.2, 0.35, 0.28)
      const trackMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        roughness: 0.9,
        metalness: 0.1
      })
      const leftTrack = new THREE.Mesh(trackGeo, trackMat)
      leftTrack.position.set(0, 0.25, 0.75)
      leftTrack.castShadow = true
      robotGroup.add(leftTrack)

      const rightTrack = new THREE.Mesh(trackGeo, trackMat)
      rightTrack.position.set(0, 0.25, -0.75)
      rightTrack.castShadow = true
      robotGroup.add(rightTrack)

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
        robotGroup.add(motor)
      })

      const pcbGeo = new THREE.BoxGeometry(0.6, 0.05, 0.5)
      const pcbMat = new THREE.MeshStandardMaterial({
        color: 0x059669,
        roughness: 0.5,
        metalness: 0.5
      })
      const pcb = new THREE.Mesh(pcbGeo, pcbMat)
      pcb.position.set(-0.55, 0.48, 0)
      robotGroup.add(pcb)

      const ledGeo = new THREE.SphereGeometry(0.06, 16, 16)
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x00ff9d })
      const led = new THREE.Mesh(ledGeo, ledMat)
      led.position.set(-0.55, 0.55, 0.15)
      robotGroup.add(led)
    }

    // Load Autodesk Fusion GLB model with Horizontal Placement
    const loader = new GLTFLoader()
    loader.load(
      modelUrl,
      (gltf) => {
        const loadedScene = gltf.scene
        loadedModelRef.current = loadedScene

        // 1. Apply Horizontal Orientation (Convert Fusion 360 Z-Up to Three.js Y-Up)
        loadedScene.rotation.set(rotX, rotY, rotZ)
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

        robotGroup.add(loadedScene)
        setModelType('glb')
        setLoading(false)
      },
      undefined,
      () => {
        buildProceduralModel()
        setModelType('procedural-cad')
        setLoading(false)
      }
    )

    // Animation Loop
    let animationFrameId: number
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (edfBlades) {
        edfBlades.rotation.y += 0.15
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth || 520
      const h = container.clientHeight || 440
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
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
  }, [modelUrl, autoRotateSpeed, isRotating, rotX, rotY, rotZ])

  // Quick Orientation Toggles
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

  const rotate90Z = () => {
    setRotZ((prev) => (prev + Math.PI / 2) % (Math.PI * 2))
  }

  return (
    <div className="w-full flex flex-col gap-3 font-space">
      {/* 3D Viewport Box */}
      <div 
        ref={containerRef} 
        style={{ height }}
        className="relative w-full rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-cyan-500/40 bg-slate-950 shadow-xl cursor-grab active:cursor-grabbing"
      >
        {/* Top-Left Telemetry Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-slate-900/90 border border-slate-700 dark:border-cyan-500/40 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white font-orbitron">3D DIGITAL TWIN:</span>
          <span className="text-cyan-300">
            {modelType === 'glb' ? 'HORIZONTAL CAD ALIGNED' : 'PROCEDURAL FUSION MODEL'}
          </span>
        </div>

        {/* Top-Right Controls */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 flex-wrap">
          <button
            onClick={setHorizontalFlat}
            className="px-2.5 py-1.5 rounded-lg border bg-slate-900/90 border-slate-700 text-xs font-orbitron font-bold text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/50 transition-all flex items-center gap-1"
            title="Reset to Horizontal Belly Placement"
          >
            <span>FLAT (HORIZONTAL)</span>
          </button>

          <button
            onClick={rotate90X}
            className="p-1.5 px-2 rounded-lg border bg-slate-900/90 border-slate-700 text-xs font-orbitron font-bold text-slate-300 hover:border-cyan-400 hover:text-white transition-all"
            title="Rotate +90° Pitch (X)"
          >
            PITCH 90°
          </button>

          <button
            onClick={rotate90Y}
            className="p-1.5 px-2 rounded-lg border bg-slate-900/90 border-slate-700 text-xs font-orbitron font-bold text-slate-300 hover:border-cyan-400 hover:text-white transition-all"
            title="Rotate +90° Yaw (Y)"
          >
            YAW 90°
          </button>

          <button
            onClick={() => setIsRotating((prev) => !prev)}
            className={`p-2 rounded-lg border text-xs font-orbitron font-bold transition-all ${
              isRotating
                ? 'bg-blue-600 text-white border-blue-500 dark:bg-cyan-500/30 dark:border-cyan-400 dark:text-cyan-300'
                : 'bg-slate-900/80 text-slate-400 border-slate-700'
            }`}
            title="Toggle Auto-Rotation"
          >
            <FaSyncAlt className={isRotating ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 text-cyan-400 font-orbitron text-xs gap-3">
            <FaCube className="text-3xl animate-bounce text-cyan-400" />
            <span>ALIGNING HORIZONTAL CAD MESH...</span>
          </div>
        )}

        {/* Bottom Hint */}
        <div className="absolute bottom-3 left-3 z-10 text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700 pointer-events-none">
          💡 DRAG TO ORBIT • SCROLL TO ZOOM • RIGHT-CLICK TO PAN
        </div>
      </div>
    </div>
  )
}
