"use client"
import { useEffect, useRef, useState, useCallback } from 'react'

interface VisionObject {
  id: number
  trackId: string
  label: string
  category: 'car' | 'suv' | 'truck' | 'pedestrian' | 'cyclist' | 'traffic_sign'
  x: number
  y: number
  w: number
  h: number
  vx: number
  vy: number
  confidence: number
  distance: number
  temp: number
  history: { x: number; y: number }[]
}

type ScenarioType = 'highway' | 'crosswalk' | 'industrial' | 'sandbox'

export default function VisionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Interactive UI States
  const [visionMode, setVisionMode] = useState<'rgb' | 'depth' | 'thermal'>('rgb')
  const [scenario, setScenario] = useState<ScenarioType>('highway')
  const [confidenceThreshold, setConfidenceThreshold] = useState(60)
  const [lockedTargetId, setLockedTargetId] = useState<number | null>(null)
  const [showKeypoints, setShowKeypoints] = useState(true)
  const [showTrails, setShowTrails] = useState(true)
  const [fps, setFps] = useState(60)

  // High-Contrast Inspector Telemetry (Throttled 10Hz)
  const [inspector, setInspector] = useState({
    label: 'NO TARGET LOCKED',
    trackId: '---',
    confidence: '---',
    distance: '---',
    temp: '---',
    velocity: '---',
    box: '---',
    status: 'SEARCHING' as 'SEARCHING' | 'TRACKING' | 'LOCKED',
    detectedCount: 0,
    latency: '7.8ms'
  })

  // Persistent Refs (Animation cycle)
  const visionModeRef = useRef(visionMode)
  visionModeRef.current = visionMode

  const scenarioRef = useRef(scenario)
  scenarioRef.current = scenario

  const confThresholdRef = useRef(confidenceThreshold)
  confThresholdRef.current = confidenceThreshold

  const lockedTargetIdRef = useRef(lockedTargetId)
  lockedTargetIdRef.current = lockedTargetId

  const showKeypointsRef = useRef(showKeypoints)
  showKeypointsRef.current = showKeypoints

  const showTrailsRef = useRef(showTrails)
  showTrailsRef.current = showTrails

  const mousePosRef = useRef({ x: 250, y: 150, isHovering: false })
  const objectsRef = useRef<VisionObject[]>([])

  // Load Preset Scenarios
  const loadScenario = useCallback((type: ScenarioType, cw: number, ch: number) => {
    setLockedTargetId(null)

    if (type === 'highway') {
      objectsRef.current = [
        {
          id: 101,
          trackId: 'TRK-01',
          label: 'SEDAN',
          category: 'car',
          x: cw * 0.2,
          y: ch * 0.6,
          w: 70,
          h: 38,
          vx: 2.2,
          vy: 0,
          confidence: 96.8,
          distance: 12.4,
          temp: 86.2,
          history: []
        },
        {
          id: 102,
          trackId: 'TRK-02',
          label: 'SUV_AUTONOMOUS',
          category: 'suv',
          x: cw * 0.75,
          y: ch * 0.72,
          w: 80,
          h: 44,
          vx: -2.6,
          vy: 0,
          confidence: 95.1,
          distance: 7.2,
          temp: 94.0,
          history: []
        },
        {
          id: 103,
          trackId: 'TRK-03',
          label: 'SEMI_TRUCK',
          category: 'truck',
          x: cw * 0.05,
          y: ch * 0.45,
          w: 110,
          h: 52,
          vx: 1.4,
          vy: 0,
          confidence: 98.4,
          distance: 28.6,
          temp: 104.5,
          history: []
        },
        {
          id: 104,
          trackId: 'TRK-04',
          label: 'ELECTRIC_CAR',
          category: 'car',
          x: cw * 0.55,
          y: ch * 0.52,
          w: 68,
          h: 36,
          vx: 1.9,
          vy: 0,
          confidence: 93.7,
          distance: 18.0,
          temp: 45.2,
          history: []
        }
      ]
    } else if (type === 'crosswalk') {
      objectsRef.current = [
        {
          id: 201,
          trackId: 'TRK-11',
          label: 'PEDESTRIAN',
          category: 'pedestrian',
          x: cw * 0.35,
          y: ch * 0.48,
          w: 24,
          h: 46,
          vx: 0.6,
          vy: 0.2,
          confidence: 92.4,
          distance: 14.8,
          temp: 37.2,
          history: []
        },
        {
          id: 202,
          trackId: 'TRK-12',
          label: 'PEDESTRIAN',
          category: 'pedestrian',
          x: cw * 0.58,
          y: ch * 0.6,
          w: 22,
          h: 44,
          vx: -0.5,
          vy: -0.15,
          confidence: 89.6,
          distance: 10.5,
          temp: 36.8,
          history: []
        },
        {
          id: 203,
          trackId: 'TRK-13',
          label: 'CYCLIST',
          category: 'cyclist',
          x: cw * 0.8,
          y: ch * 0.52,
          w: 42,
          h: 42,
          vx: -1.8,
          vy: 0,
          confidence: 94.2,
          distance: 16.4,
          temp: 38.5,
          history: []
        },
        {
          id: 204,
          trackId: 'TRK-14',
          label: 'CITY_TAXI',
          category: 'car',
          x: cw * 0.15,
          y: ch * 0.68,
          w: 72,
          h: 40,
          vx: 1.1,
          vy: 0,
          confidence: 97.1,
          distance: 8.8,
          temp: 88.6,
          history: []
        },
        {
          id: 205,
          trackId: 'TRK-15',
          label: 'TRAFFIC_LIGHT',
          category: 'traffic_sign',
          x: cw * 0.88,
          y: ch * 0.25,
          w: 26,
          h: 48,
          vx: 0,
          vy: 0,
          confidence: 99.2,
          distance: 22.0,
          temp: 28.4,
          history: []
        }
      ]
    } else if (type === 'industrial') {
      objectsRef.current = [
        {
          id: 301,
          trackId: 'TRK-21',
          label: 'AGV_FORKLIFT',
          category: 'truck',
          x: cw * 0.3,
          y: ch * 0.55,
          w: 68,
          h: 48,
          vx: 0.9,
          vy: 0,
          confidence: 96.0,
          distance: 15.2,
          temp: 68.4,
          history: []
        },
        {
          id: 302,
          trackId: 'TRK-22',
          label: 'WORKER',
          category: 'pedestrian',
          x: cw * 0.68,
          y: ch * 0.5,
          w: 22,
          h: 44,
          vx: -0.4,
          vy: 0.1,
          confidence: 91.8,
          distance: 19.5,
          temp: 37.0,
          history: []
        },
        {
          id: 303,
          trackId: 'TRK-23',
          label: 'PALLET_LOAD',
          category: 'traffic_sign',
          x: cw * 0.15,
          y: ch * 0.65,
          w: 48,
          h: 38,
          vx: 0,
          vy: 0,
          confidence: 88.5,
          distance: 11.2,
          temp: 24.1,
          history: []
        },
        {
          id: 304,
          trackId: 'TRK-24',
          label: 'INSPECTION_ROVER',
          category: 'suv',
          x: cw * 0.5,
          y: ch * 0.75,
          w: 58,
          h: 38,
          vx: 1.5,
          vy: 0,
          confidence: 97.6,
          distance: 6.8,
          temp: 48.2,
          history: []
        }
      ]
    } else {
      // Sandbox: empty or initial items
      objectsRef.current = [
        {
          id: 401,
          trackId: 'TRK-31',
          label: 'ROBOT_TARGET',
          category: 'car',
          x: cw * 0.4,
          y: ch * 0.55,
          w: 65,
          h: 38,
          vx: 1.0,
          vy: 0,
          confidence: 95.0,
          distance: 14.0,
          temp: 72.0,
          history: []
        }
      ]
    }
  }, [])

  // Spawning manual items in Sandbox mode
  const spawnObject = (category: 'car' | 'truck' | 'pedestrian' | 'cyclist') => {
    const canvas = canvasRef.current
    const cw = canvas?.width || 500
    const ch = canvas?.height || 320

    const labels = {
      car: 'AUTONOMOUS_CAR',
      truck: 'HEAVY_TRUCK',
      pedestrian: 'PEDESTRIAN',
      cyclist: 'CYCLIST'
    }

    const dims = {
      car: { w: 70, h: 38, temp: 85.0 },
      truck: { w: 100, h: 50, temp: 98.0 },
      pedestrian: { w: 22, h: 44, temp: 37.0 },
      cyclist: { w: 40, h: 40, temp: 38.2 }
    }

    const d = dims[category]
    const newObj: VisionObject = {
      id: Date.now(),
      trackId: `TRK-${Math.floor(Math.random() * 80) + 10}`,
      label: labels[category],
      category,
      x: 40,
      y: ch * 0.4 + Math.random() * (ch * 0.35),
      w: d.w,
      h: d.h,
      vx: (Math.random() * 1.5 + 0.8) * (Math.random() > 0.5 ? 1 : -1),
      vy: 0,
      confidence: Number((88 + Math.random() * 11).toFixed(1)),
      distance: Number((6 + Math.random() * 25).toFixed(1)),
      temp: d.temp,
      history: []
    }

    objectsRef.current.push(newObj)
  }

  const clearAllObjects = () => {
    objectsRef.current = []
    setLockedTargetId(null)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fitCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const w = Math.floor(rect.width > 0 ? rect.width : (parent.clientWidth || 500))
      const h = Math.floor(rect.height > 0 ? rect.height : (parent.clientHeight || 320))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        if (objectsRef.current.length === 0) {
          loadScenario(scenarioRef.current, w, h)
        }
      }
    }

    fitCanvas()

    const resizeObserver = new ResizeObserver(() => fitCanvas())
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }
    window.addEventListener('resize', fitCanvas)

    // Pointer Handlers
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (e.type === 'touchmove') e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      let clientX = 0
      let clientY = 0

      if (window.TouchEvent && e instanceof TouchEvent) {
        if (e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX
          clientY = e.touches[0].clientY
        }
      } else {
        clientX = (e as MouseEvent).clientX
        clientY = (e as MouseEvent).clientY
      }

      mousePosRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        isHovering: true
      }
    }

    const handlePointerLeave = () => {
      mousePosRef.current.isHovering = false
    }

    const handleCanvasClick = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      let clientX = 0
      let clientY = 0

      if (window.TouchEvent && e instanceof TouchEvent) {
        if (e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX
          clientY = e.touches[0].clientY
        }
      } else {
        clientX = (e as MouseEvent).clientX
        clientY = (e as MouseEvent).clientY
      }

      const clickX = clientX - rect.left
      const clickY = clientY - rect.top

      // Check if clicked an object
      let clickedObj: VisionObject | null = null
      objectsRef.current.forEach((obj) => {
        if (
          clickX >= obj.x - obj.w / 2 - 12 &&
          clickX <= obj.x + obj.w / 2 + 12 &&
          clickY >= obj.y - obj.h / 2 - 12 &&
          clickY <= obj.y + obj.h / 2 + 12
        ) {
          clickedObj = obj
        }
      })

      if (clickedObj) {
        const targetId = (clickedObj as VisionObject).id
        setLockedTargetId((prev) => (prev === targetId ? null : targetId))
      } else {
        setLockedTargetId(null)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleMouseMove, { passive: false })
    canvas.addEventListener('touchstart', handleMouseMove, { passive: false })
    canvas.addEventListener('mouseleave', handlePointerLeave)
    canvas.addEventListener('click', handleCanvasClick)

    let animationFrameId: number
    let frameCount = 0
    let lastFpsTime = performance.now()
    let lastUiUpdateTime = 0

    const render = (timestamp: number) => {
      if (!ctx) return
      const cw = canvas.width || 500
      const ch = canvas.height || 320
      const mode = visionModeRef.current
      const confThresh = confThresholdRef.current
      const lockedId = lockedTargetIdRef.current
      const { x: mx, y: my, isHovering } = mousePosRef.current

      // FPS Count
      frameCount++
      if (timestamp - lastFpsTime >= 1000) {
        setFps(frameCount)
        frameCount = 0
        lastFpsTime = timestamp
      }

      ctx.clearRect(0, 0, cw, ch)

      // 1. Draw Scene Backdrop based on Vision Mode & Scenario
      if (mode === 'rgb') {
        // High-Contrast Clear Urban/Highway Scene
        ctx.fillStyle = '#0f172a'
        ctx.fillRect(0, 0, cw, ch)

        // Sky & Horizon
        const skyGrad = ctx.createLinearGradient(0, 0, 0, ch * 0.4)
        skyGrad.addColorStop(0, '#020617')
        skyGrad.addColorStop(1, '#1e293b')
        ctx.fillStyle = skyGrad
        ctx.fillRect(0, 0, cw, ch * 0.4)

        // Horizon line
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, ch * 0.4)
        ctx.lineTo(cw, ch * 0.4)
        ctx.stroke()

        // Road Surface
        ctx.fillStyle = '#0a0f1d'
        ctx.beginPath()
        ctx.moveTo(0, ch * 0.4)
        ctx.lineTo(cw, ch * 0.4)
        ctx.lineTo(cw, ch)
        ctx.lineTo(0, ch)
        ctx.closePath()
        ctx.fill()

        // Lane Lines
        ctx.strokeStyle = '#38bdf8'
        ctx.lineWidth = 2
        ctx.setLineDash([18, 14])
        ctx.beginPath()
        ctx.moveTo(0, ch * 0.58)
        ctx.lineTo(cw, ch * 0.58)
        ctx.moveTo(0, ch * 0.76)
        ctx.lineTo(cw, ch * 0.76)
        ctx.stroke()
        ctx.setLineDash([])

        // Curb & Crosswalk
        if (scenarioRef.current === 'crosswalk') {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.18)'
          for (let cx = cw * 0.35; cx < cw * 0.65; cx += 22) {
            ctx.fillRect(cx, ch * 0.42, 12, ch * 0.55)
          }
        }
      } else if (mode === 'depth') {
        // Stereo Depth Map (Distance Gradient)
        const depthGrad = ctx.createLinearGradient(0, 0, 0, ch)
        depthGrad.addColorStop(0, '#020617')
        depthGrad.addColorStop(0.4, '#0f172a')
        depthGrad.addColorStop(0.7, '#1e3a5f')
        depthGrad.addColorStop(1, '#0e4a68')
        ctx.fillStyle = depthGrad
        ctx.fillRect(0, 0, cw, ch)

        // Depth Contour Grid
        ctx.strokeStyle = 'rgba(0, 255, 157, 0.15)'
        ctx.lineWidth = 1
        for (let y = ch * 0.4; y < ch; y += 18) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(cw, y)
          ctx.stroke()
        }
      } else {
        // Thermal (FLIR Infrared)
        const thermalGrad = ctx.createLinearGradient(0, 0, 0, ch)
        thermalGrad.addColorStop(0, '#020024')
        thermalGrad.addColorStop(0.4, '#090979')
        thermalGrad.addColorStop(0.7, '#240046')
        thermalGrad.addColorStop(1, '#3c096c')
        ctx.fillStyle = thermalGrad
        ctx.fillRect(0, 0, cw, ch)

        ctx.fillStyle = 'rgba(123, 44, 191, 0.2)'
        ctx.fillRect(0, ch * 0.4, cw, ch * 0.6)
      }

      // 2. Scanline HUD Filter
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)'
      for (let sl = 0; sl < ch; sl += 4) {
        ctx.fillRect(0, sl, cw, 1)
      }

      // 3. Update & Render Objects
      let closestObj: VisionObject | null = null
      let minCursorDist = Infinity
      let validDetections = 0

      objectsRef.current.forEach((obj) => {
        // Physical motion step
        obj.x += obj.vx
        obj.y += obj.vy

        // Wrap around borders
        if (obj.vx > 0 && obj.x - obj.w / 2 > cw + 30) {
          obj.x = -obj.w / 2 - 15
        } else if (obj.vx < 0 && obj.x + obj.w / 2 < -30) {
          obj.x = cw + obj.w / 2 + 15
        }

        // History Trail
        obj.history.push({ x: obj.x, y: obj.y })
        if (obj.history.length > 20) obj.history.shift()

        // Confidence filter
        if (obj.confidence < confThresh) return
        validDetections++

        const cursorDist = Math.hypot(mx - obj.x, my - obj.y)
        if (cursorDist < minCursorDist) {
          minCursorDist = cursorDist
          closestObj = obj
        }

        const isLocked = lockedId === obj.id
        const isHovered = isHovering && cursorDist < 60

        // Theme palette for current mode
        let mainColor = '#00f0ff'
        let fillColor = 'rgba(0, 240, 255, 0.15)'
        let badgeBg = '#00f0ff'

        if (mode === 'depth') {
          mainColor = obj.distance < 12 ? '#00ff9d' : obj.distance < 20 ? '#00f0ff' : '#818cf8'
          fillColor = 'rgba(0, 255, 157, 0.18)'
          badgeBg = mainColor
        } else if (mode === 'thermal') {
          mainColor = obj.temp > 80 ? '#fbbf24' : obj.temp > 50 ? '#ff007f' : '#38bdf8'
          fillColor = obj.temp > 80 ? 'rgba(251, 191, 36, 0.3)' : 'rgba(255, 0, 127, 0.25)'
          badgeBg = mainColor
        }

        if (isLocked) {
          mainColor = '#ff007f'
          fillColor = 'rgba(255, 0, 127, 0.35)'
          badgeBg = '#ff007f'
        } else if (isHovered) {
          mainColor = '#00ff9d'
          fillColor = 'rgba(0, 255, 157, 0.25)'
          badgeBg = '#00ff9d'
        }

        // Render Motion Trail
        if (showTrailsRef.current && obj.history.length > 1) {
          ctx.strokeStyle = fillColor
          ctx.lineWidth = 2
          ctx.beginPath()
          obj.history.forEach((pt, i) => {
            if (i === 0) ctx.moveTo(pt.x, pt.y)
            else ctx.lineTo(pt.x, pt.y)
          })
          ctx.stroke()
        }

        // Render Object Body Silhouette
        ctx.save()
        ctx.translate(obj.x, obj.y)

        if (mode === 'thermal') {
          const rad = Math.max(obj.w, obj.h) * 0.75
          const heat = ctx.createRadialGradient(0, 0, 0, 0, 0, rad)
          heat.addColorStop(0, obj.temp > 80 ? '#ffffff' : '#fbbf24')
          heat.addColorStop(0.5, obj.temp > 80 ? '#fbbf24' : '#ff007f')
          heat.addColorStop(1, 'rgba(123, 44, 191, 0)')
          ctx.fillStyle = heat
          ctx.beginPath()
          ctx.arc(0, 0, rad, 0, Math.PI * 2)
          ctx.fill()
        }

        if (obj.category === 'car' || obj.category === 'suv' || obj.category === 'truck') {
          // Vehicle Chassis
          ctx.fillStyle = mode === 'thermal' ? '#ffffff' : mode === 'depth' ? mainColor : '#1e293b'
          ctx.strokeStyle = mainColor
          ctx.lineWidth = 1.5
          ctx.fillRect(-obj.w / 2 + 3, -obj.h / 2 + 3, obj.w - 6, obj.h - 6)
          ctx.strokeRect(-obj.w / 2 + 3, -obj.h / 2 + 3, obj.w - 6, obj.h - 6)

          // Wheels
          ctx.fillStyle = '#0f172a'
          ctx.fillRect(-obj.w / 2, -obj.h / 2 + 2, 6, 6)
          ctx.fillRect(obj.w / 2 - 6, -obj.h / 2 + 2, 6, 6)
          ctx.fillRect(-obj.w / 2, obj.h / 2 - 8, 6, 6)
          ctx.fillRect(obj.w / 2 - 6, obj.h / 2 - 8, 6, 6)
        } else if (obj.category === 'pedestrian' || obj.category === 'cyclist') {
          // Person Silhouette
          ctx.fillStyle = mainColor
          ctx.beginPath()
          ctx.arc(0, -obj.h / 2 + 6, 5, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillRect(-3.5, -obj.h / 2 + 11, 7, obj.h - 18)
        } else {
          // Sign / Barrel
          ctx.fillStyle = mainColor
          ctx.fillRect(-obj.w / 2 + 2, -obj.h / 2 + 2, obj.w - 4, obj.h - 4)
        }
        ctx.restore()

        // Render Bounding Box
        const bx = obj.x - obj.w / 2
        const by = obj.y - obj.h / 2

        ctx.fillStyle = fillColor
        ctx.fillRect(bx, by, obj.w, obj.h)

        // Corner Brackets
        ctx.strokeStyle = mainColor
        ctx.lineWidth = 2.5
        const cl = Math.min(10, obj.w / 3)
        ctx.beginPath(); ctx.moveTo(bx, by + cl); ctx.lineTo(bx, by); ctx.lineTo(bx + cl, by); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(bx + obj.w - cl, by); ctx.lineTo(bx + obj.w, by); ctx.lineTo(bx + obj.w, by + cl); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(bx, by + obj.h - cl); ctx.lineTo(bx, by + obj.h); ctx.lineTo(bx + cl, by + obj.h); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(bx + obj.w - cl, by + obj.h); ctx.lineTo(bx + obj.w, by + obj.h); ctx.lineTo(bx + obj.w, by + obj.h - cl); ctx.stroke()

        // Class & Confidence Badge Tag
        const badgeW = Math.max(80, obj.w + 6)
        ctx.fillStyle = badgeBg
        ctx.fillRect(bx, by - 16, badgeW, 16)

        ctx.fillStyle = '#000000'
        ctx.font = 'bold 9px monospace'
        const labelText = mode === 'thermal'
          ? `${obj.label} ${obj.temp}°C`
          : mode === 'depth'
          ? `${obj.label} ${obj.distance}m`
          : `${obj.label} ${obj.confidence}%`
        ctx.fillText(labelText, bx + 4, by - 4)

        // Keypoint Node
        if (showKeypointsRef.current) {
          ctx.fillStyle = mainColor
          ctx.beginPath()
          ctx.arc(obj.x, obj.y, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // 4. Focus Target Identification
      let activeObj = objectsRef.current.find((o) => o.id === lockedId)
      if (!activeObj && isHovering && minCursorDist < 70) {
        activeObj = closestObj || undefined
      }

      // 5. Crosshair & Target Lock Vector
      if (isHovering) {
        ctx.strokeStyle = activeObj ? '#ff007f' : '#00f0ff'
        ctx.lineWidth = 1.5

        ctx.beginPath()
        ctx.arc(mx, my, 28, 0, Math.PI * 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(mx - 38, my); ctx.lineTo(mx - 8, my)
        ctx.moveTo(mx + 8, my); ctx.lineTo(mx + 38, my)
        ctx.moveTo(mx, my - 38); ctx.lineTo(mx, my - 8)
        ctx.moveTo(mx, my + 8); ctx.lineTo(mx, my + 38)
        ctx.stroke()

        if (activeObj) {
          ctx.strokeStyle = '#00ff9d'
          ctx.lineWidth = 1.5
          ctx.setLineDash([4, 4])
          ctx.beginPath()
          ctx.moveTo(mx, my)
          ctx.lineTo(activeObj.x, activeObj.y)
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      // 6. Throttle React State Updates (10Hz)
      if (timestamp - lastUiUpdateTime > 100) {
        lastUiUpdateTime = timestamp
        if (activeObj) {
          setInspector({
            label: activeObj.label,
            trackId: activeObj.trackId,
            confidence: `${activeObj.confidence}%`,
            distance: `${activeObj.distance}m`,
            temp: `${activeObj.temp}°C`,
            velocity: `${(Math.hypot(activeObj.vx, activeObj.vy) * 18).toFixed(1)} km/h`,
            box: `[${Math.round(activeObj.x - activeObj.w / 2)}, ${Math.round(activeObj.y - activeObj.h / 2)}, ${activeObj.w}x${activeObj.h}]`,
            status: lockedId === activeObj.id ? 'LOCKED' : 'TRACKING',
            detectedCount: validDetections,
            latency: `${(6.4 + Math.random() * 1.8).toFixed(1)}ms`
          })
        } else {
          setInspector({
            label: 'SEARCHING SCENE...',
            trackId: '---',
            confidence: '---',
            distance: '---',
            temp: '---',
            velocity: '---',
            box: '---',
            status: 'SEARCHING',
            detectedCount: validDetections,
            latency: '7.1ms'
          })
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', fitCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleMouseMove)
      canvas.removeEventListener('touchstart', handleMouseMove)
      canvas.removeEventListener('mouseleave', handlePointerLeave)
      canvas.removeEventListener('click', handleCanvasClick)
    }
  }, [loadScenario])

  return (
    <div className="w-full flex flex-col gap-4 font-space">
      {/* Top Header Controls: Scenario Switcher & Pipeline Modes */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-300 dark:border-cyan-500/30 shadow-sm">
        {/* Modality Selector */}
        <div className="flex flex-wrap gap-2">
          {(['rgb', 'depth', 'thermal'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setVisionMode(mode)}
              className={`px-3 py-1.5 text-xs font-orbitron font-bold rounded-lg border transition-all flex items-center gap-1.5 ${
                visionMode === mode
                  ? 'bg-blue-600 text-white border-blue-600 dark:bg-cyan-500/25 dark:border-cyan-400 dark:text-cyan-300 shadow-sm'
                  : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-black/40 dark:border-slate-800 dark:text-slate-400 hover:border-blue-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                mode === 'rgb' ? 'bg-cyan-400' : mode === 'depth' ? 'bg-emerald-400' : 'bg-rose-400'
              }`} />
              {mode.toUpperCase()} PIPELINE
            </button>
          ))}
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-slate-900 dark:text-cyan-300 font-orbitron text-xs font-bold whitespace-nowrap">
            SCENARIO:
          </label>
          <select
            value={scenario}
            onChange={(e) => {
              const newScen = e.target.value as ScenarioType
              setScenario(newScen)
              if (canvasRef.current) {
                loadScenario(newScen, canvasRef.current.width, canvasRef.current.height)
              }
            }}
            className="p-1.5 bg-slate-50 dark:bg-black text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 rounded-lg text-xs font-mono font-bold outline-none"
          >
            <option value="highway">HIGHWAY DRONE</option>
            <option value="crosswalk">CITY CROSSWALK</option>
            <option value="industrial">INDUSTRIAL ROVER</option>
            <option value="sandbox">INTERACTIVE SANDBOX</option>
          </select>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      <div className="relative w-full aspect-video border-2 border-slate-300 dark:border-cyan-500/40 rounded-xl overflow-hidden bg-slate-950 min-h-[260px] shadow-lg">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair block" />

        {/* Top-Left Target Status Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-700 dark:border-cyan-500/40 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 flex items-center gap-2 backdrop-blur-md">
          <span className={`w-2.5 h-2.5 rounded-full ${
            inspector.status === 'LOCKED'
              ? 'bg-rose-500 animate-ping'
              : inspector.status === 'TRACKING'
              ? 'bg-emerald-400 animate-pulse'
              : 'bg-cyan-400'
          }`} />
          <span className="font-bold text-white font-orbitron">YOLOv8:</span>
          <span className={
            inspector.status === 'LOCKED'
              ? 'text-rose-400 font-bold'
              : inspector.status === 'TRACKING'
              ? 'text-emerald-400 font-bold'
              : 'text-cyan-300'
          }>
            {inspector.status} {inspector.trackId !== '---' ? `[${inspector.trackId}]` : ''}
          </span>
        </div>

        {/* Top-Right Telemetry */}
        <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700 dark:border-cyan-500/40 px-3 py-1 rounded-md text-xs font-mono text-white backdrop-blur-md hidden sm:block">
          LATENCY: <span className="text-emerald-400 font-bold">{inspector.latency}</span> | {fps} FPS
        </div>

        {/* Bottom Click Hint */}
        <div className="absolute bottom-2 left-3 text-xs font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded pointer-events-none border border-slate-700">
          💡 HOVER OVER OBJECTS TO INSPECT | CLICK TO PIN / LOCK TRACKING TARGET
        </div>
      </div>

      {/* Target Inspector Card (High Contrast Light & Dark) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-300 dark:border-cyan-500/30 shadow-sm text-xs font-mono">
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-2.5 rounded border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">CLASSIFIED TARGET:</span>
          <span className="text-slate-900 dark:text-white font-bold text-sm truncate">{inspector.label}</span>
        </div>
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-2.5 rounded border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">YOLO CONFIDENCE:</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">{inspector.confidence}</span>
        </div>
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-2.5 rounded border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">
            {visionMode === 'thermal' ? 'HEAT SIGNATURE:' : 'STEREO DEPTH:'}
          </span>
          <span className="text-blue-700 dark:text-cyan-300 font-bold text-sm">
            {visionMode === 'thermal' ? inspector.temp : inspector.distance}
          </span>
        </div>
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-2.5 rounded border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">SPATIAL VELOCITY:</span>
          <span className="text-amber-700 dark:text-amber-400 font-bold text-sm">{inspector.velocity}</span>
        </div>
      </div>

      {/* Interactive Controls & Spawner */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-black/60 p-4 rounded-xl border border-slate-300 dark:border-cyan-500/30 shadow-sm">
        {/* Confidence Threshold Slider */}
        <div className="flex items-center gap-3 flex-grow max-w-xs">
          <label className="text-slate-900 dark:text-cyan-300 font-orbitron text-xs whitespace-nowrap font-bold">
            CONF THRESHOLD:
          </label>
          <input
            type="range"
            min="40"
            max="95"
            step="5"
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
            className="flex-grow accent-blue-600 dark:accent-cyan-400 cursor-pointer"
          />
          <span className="text-slate-900 dark:text-cyan-300 font-bold text-xs w-10">{confidenceThreshold}%</span>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {scenario === 'sandbox' && (
            <>
              <button
                onClick={() => spawnObject('car')}
                className="px-2.5 py-1.5 bg-blue-50 text-blue-800 border border-blue-400 dark:bg-cyan-950 dark:border-cyan-500/40 dark:text-cyan-300 font-orbitron text-xs font-bold rounded-lg hover:bg-blue-100"
              >
                + CAR
              </button>
              <button
                onClick={() => spawnObject('truck')}
                className="px-2.5 py-1.5 bg-blue-50 text-blue-800 border border-blue-400 dark:bg-cyan-950 dark:border-cyan-500/40 dark:text-cyan-300 font-orbitron text-xs font-bold rounded-lg hover:bg-blue-100"
              >
                + TRUCK
              </button>
              <button
                onClick={() => spawnObject('pedestrian')}
                className="px-2.5 py-1.5 bg-blue-50 text-blue-800 border border-blue-400 dark:bg-cyan-950 dark:border-cyan-500/40 dark:text-cyan-300 font-orbitron text-xs font-bold rounded-lg hover:bg-blue-100"
              >
                + PEDESTRIAN
              </button>
              <button
                onClick={clearAllObjects}
                className="px-2.5 py-1.5 bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/40 dark:border-rose-500/50 dark:text-rose-300 font-orbitron text-xs font-bold rounded-lg hover:bg-rose-200"
              >
                CLEAR
              </button>
            </>
          )}

          <button
            onClick={() => setShowKeypoints((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-orbitron font-bold rounded-lg border transition-all ${
              showKeypoints
                ? 'bg-blue-50 text-blue-800 border-blue-400 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300'
                : 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400'
            }`}
          >
            {showKeypoints ? 'KEYPOINTS: ON' : 'KEYPOINTS: OFF'}
          </button>

          <button
            onClick={() => setShowTrails((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-orbitron font-bold rounded-lg border transition-all ${
              showTrails
                ? 'bg-blue-50 text-blue-800 border-blue-400 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300'
                : 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400'
            }`}
          >
            {showTrails ? 'TRAILS: ON' : 'TRAILS: OFF'}
          </button>

          {lockedTargetId && (
            <button
              onClick={() => setLockedTargetId(null)}
              className="px-3 py-1.5 text-xs font-orbitron font-bold rounded-lg border bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:border-rose-500 dark:text-rose-300 hover:bg-rose-200 transition-all"
            >
              UNLOCK TARGET
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
