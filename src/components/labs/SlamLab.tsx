"use client"
import { useEffect, useRef, useState, useCallback } from 'react'
import { FaSyncAlt, FaLayerGroup, FaWaveSquare, FaShieldAlt } from 'react-icons/fa'

interface Obstacle {
  id: number
  x: number
  y: number
  w: number
  h: number
}

interface Point {
  x: number
  y: number
}

interface PoseGraphNode {
  id: number
  x: number
  y: number
  odomX: number
  odomY: number
  angle: number
}

export default function SlamLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // User Interactive Settings
  const [speed, setSpeed] = useState(3.0)
  const [showRays, setShowRays] = useState(true)
  const [showCostmap, setShowCostmap] = useState(true)
  const [showPoseGraph, setShowPoseGraph] = useState(true)
  const [simulateDrift, setSimulateDrift] = useState(true)
  const [addObstacleMode, setAddObstacleMode] = useState(false)
  const [statusText, setStatusText] = useState('NAVIGATING')
  const [loopClosureAlert, setLoopClosureAlert] = useState(false)
  const [mapPointCount, setMapPointCount] = useState(0)
  const [telemetry, setTelemetry] = useState({
    x: 80,
    y: 80,
    odomX: 80,
    odomY: 80,
    angle: 0,
    v: 0,
    driftErr: 0,
    loopClosures: 0,
    waypointsLeft: 0
  })

  // Persistent Refs for Animation Loop
  const speedRef = useRef(speed)
  speedRef.current = speed

  const showRaysRef = useRef(showRays)
  showRaysRef.current = showRays

  const showCostmapRef = useRef(showCostmap)
  showCostmapRef.current = showCostmap

  const showPoseGraphRef = useRef(showPoseGraph)
  showPoseGraphRef.current = showPoseGraph

  const simulateDriftRef = useRef(simulateDrift)
  simulateDriftRef.current = simulateDrift

  const addObstacleModeRef = useRef(addObstacleMode)
  addObstacleModeRef.current = addObstacleMode

  const robotRef = useRef({
    x: 70,
    y: 70,
    angle: 0.5,
    vx: 0,
    vy: 0,
    omega: 0,
    radius: 14,
    odomX: 70,
    odomY: 70,
    odomAngle: 0.5,
    driftX: 0,
    driftY: 0,
    loopClosuresCount: 0
  })

  const goalPosRef = useRef<Point>({ x: 390, y: 220 })
  const plannedPathRef = useRef<Point[]>([])
  const pathHistoryRef = useRef<Point[]>([])
  const odomHistoryRef = useRef<Point[]>([])
  const poseGraphRef = useRef<PoseGraphNode[]>([])
  const slamMapRef = useRef<Point[]>([])
  const lidarSweepAngleRef = useRef(0)
  const activeLoopConstraintRef = useRef<{ from: Point; to: Point; alpha: number } | null>(null)

  const obstaclesRef = useRef<Obstacle[]>([
    { id: 1, x: 160, y: 40, w: 55, h: 130 },
    { id: 2, x: 260, y: 150, w: 120, h: 55 },
    { id: 3, x: 80, y: 190, w: 65, h: 60 }
  ])

  // A* Pathfinding with Costmap Inflation Layer & Strict Diagonal Clearance
  const planAStarPath = useCallback((startX: number, startY: number, targetX: number, targetY: number) => {
    const canvas = canvasRef.current
    const cw = canvas?.width || 520
    const ch = canvas?.height || 330

    const CELL_SIZE = 14
    const cols = Math.floor(cw / CELL_SIZE)
    const rows = Math.floor(ch / CELL_SIZE)

    const startCol = Math.max(0, Math.min(cols - 1, Math.floor(startX / CELL_SIZE)))
    const startRow = Math.max(0, Math.min(rows - 1, Math.floor(startY / CELL_SIZE)))
    const targetCol = Math.max(0, Math.min(cols - 1, Math.floor(targetX / CELL_SIZE)))
    const targetRow = Math.max(0, Math.min(rows - 1, Math.floor(targetY / CELL_SIZE)))

    // 1. Build Nav2 Inflation Costmap Grid
    // Inscribed lethal radius: 18px (~1.3 cells)
    // Inflation decay radius: 36px (~2.6 cells)
    const INSCRIBED_RADIUS = 18
    const INFLATION_RADIUS = 36

    const costGrid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0))

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * CELL_SIZE + CELL_SIZE / 2
        const cy = r * CELL_SIZE + CELL_SIZE / 2

        // Check arena boundary distance
        const boundDist = Math.min(cx, cw - cx, cy, ch - cy)
        if (boundDist < INSCRIBED_RADIUS) {
          costGrid[r][c] = 254 // Lethal boundary
          continue
        } else if (boundDist < INFLATION_RADIUS) {
          const decay = Math.exp(-0.15 * (boundDist - INSCRIBED_RADIUS))
          costGrid[r][c] = Math.max(costGrid[r][c], Math.floor(253 * decay))
        }

        // Check obstacles
        for (const obs of obstaclesRef.current) {
          const closestX = Math.max(obs.x, Math.min(cx, obs.x + obs.w))
          const closestY = Math.max(obs.y, Math.min(cy, obs.y + obs.h))
          const dist = Math.hypot(cx - closestX, cy - closestY)

          if (dist <= INSCRIBED_RADIUS) {
            costGrid[r][c] = 254 // Lethal obstacle
            break
          } else if (dist <= INFLATION_RADIUS) {
            const decay = Math.exp(-0.16 * (dist - INSCRIBED_RADIUS))
            const inflationCost = Math.floor(253 * decay)
            costGrid[r][c] = Math.max(costGrid[r][c], inflationCost)
          }
        }
      }
    }

    interface Node {
      c: number
      r: number
      g: number
      h: number
      f: number
      parent: Node | null
    }

    const openList: Node[] = []
    const closedSet = new Set<string>()

    const key = (c: number, r: number) => `${c},${r}`
    const heuristic = (c1: number, r1: number, c2: number, r2: number) => {
      // Octile distance heuristic
      const dx = Math.abs(c1 - c2)
      const dy = Math.abs(r1 - r2)
      return (dx + dy) + (1.414 - 2) * Math.min(dx, dy)
    }

    openList.push({
      c: startCol,
      r: startRow,
      g: 0,
      h: heuristic(startCol, startRow, targetCol, targetRow),
      f: heuristic(startCol, startRow, targetCol, targetRow),
      parent: null
    })

    const neighbors = [
      { dc: 1, dr: 0, cost: 1.0, isDiag: false },
      { dc: -1, dr: 0, cost: 1.0, isDiag: false },
      { dc: 0, dr: 1, cost: 1.0, isDiag: false },
      { dc: 0, dr: -1, cost: 1.0, isDiag: false },
      { dc: 1, dr: 1, cost: 1.414, isDiag: true },
      { dc: -1, dr: 1, cost: 1.414, isDiag: true },
      { dc: 1, dr: -1, cost: 1.414, isDiag: true },
      { dc: -1, dr: -1, cost: 1.414, isDiag: true }
    ]

    let foundNode: Node | null = null
    let iterations = 0
    const MAX_ITERATIONS = 1500

    while (openList.length > 0 && iterations < MAX_ITERATIONS) {
      iterations++
      openList.sort((a, b) => a.f - b.f)
      const current = openList.shift()!

      if (current.c === targetCol && current.r === targetRow) {
        foundNode = current
        break
      }

      closedSet.add(key(current.c, current.r))

      for (const n of neighbors) {
        const nc = current.c + n.dc
        const nr = current.r + n.dr

        if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue
        if (closedSet.has(key(nc, nr))) continue

        // Check lethal cost
        const cellCost = costGrid[nr][nc]
        if (cellCost >= 254 && !(nc === targetCol && nr === targetRow)) continue

        // B. PREVENT DIAGONAL CORNER-CLIPPING (Wall Squeeze Bug)
        // For diagonal movement, both orthogonal neighbors MUST be free of lethal obstacles
        if (n.isDiag) {
          const ortho1Cost = costGrid[current.r][current.c + n.dc] ?? 254
          const ortho2Cost = costGrid[current.r + n.dr][current.c] ?? 254
          if (ortho1Cost >= 254 || ortho2Cost >= 254) {
            continue // Block cutting through corner vertices
          }
        }

        // Inflation layer cost penalty
        const inflationPenalty = (cellCost / 28) ** 1.8
        const stepCost = n.cost + inflationPenalty
        const gScore = current.g + stepCost

        let neighborNode = openList.find((node) => node.c === nc && node.r === nr)

        if (!neighborNode) {
          const hScore = heuristic(nc, nr, targetCol, targetRow)
          neighborNode = {
            c: nc,
            r: nr,
            g: gScore,
            h: hScore,
            f: gScore + hScore,
            parent: current
          }
          openList.push(neighborNode)
        } else if (gScore < neighborNode.g) {
          neighborNode.g = gScore
          neighborNode.f = gScore + neighborNode.h
          neighborNode.parent = current
        }
      }
    }

    if (foundNode) {
      const rawPath: Point[] = []
      let curr: Node | null = foundNode
      while (curr) {
        rawPath.unshift({
          x: curr.c * CELL_SIZE + CELL_SIZE / 2,
          y: curr.r * CELL_SIZE + CELL_SIZE / 2
        })
        curr = curr.parent
      }

      // Smooth path for realistic Pure Pursuit tracking
      if (rawPath.length > 2) {
        const smoothed: Point[] = [rawPath[0]]
        for (let i = 1; i < rawPath.length - 1; i += 2) {
          smoothed.push(rawPath[i])
        }
        smoothed.push({ x: targetX, y: targetY })
        plannedPathRef.current = smoothed
      } else {
        plannedPathRef.current = [{ x: targetX, y: targetY }]
      }
    } else {
      plannedPathRef.current = [{ x: targetX, y: targetY }]
    }
  }, [])

  // Generate randomized obstacles
  const generateObstacles = useCallback(() => {
    const canvas = canvasRef.current
    const cw = canvas?.width || 520
    const ch = canvas?.height || 330

    const newObs: Obstacle[] = []
    const count = 4

    for (let i = 0; i < count; i++) {
      const w = Math.floor(Math.random() * 45) + 45
      const h = Math.floor(Math.random() * 45) + 45
      const x = Math.floor(Math.random() * (cw - w - 80)) + 40
      const y = Math.floor(Math.random() * (ch - h - 80)) + 40

      const rx = robotRef.current.x
      const ry = robotRef.current.y
      const gx = goalPosRef.current.x
      const gy = goalPosRef.current.y

      if (Math.hypot(x + w / 2 - rx, y + h / 2 - ry) > 65 && Math.hypot(x + w / 2 - gx, y + h / 2 - gy) > 65) {
        newObs.push({ id: Date.now() + i, x, y, w, h })
      }
    }
    obstaclesRef.current = newObs
    planAStarPath(robotRef.current.x, robotRef.current.y, goalPosRef.current.x, goalPosRef.current.y)
  }, [planAStarPath])

  const clearObstacles = useCallback(() => {
    obstaclesRef.current = []
    planAStarPath(robotRef.current.x, robotRef.current.y, goalPosRef.current.x, goalPosRef.current.y)
  }, [planAStarPath])

  const clearSlamMap = useCallback(() => {
    slamMapRef.current = []
    pathHistoryRef.current = []
    odomHistoryRef.current = []
    poseGraphRef.current = []
    setMapPointCount(0)
  }, [])

  const resetRobotPose = useCallback(() => {
    robotRef.current.x = 70
    robotRef.current.y = 70
    robotRef.current.angle = 0.5
    robotRef.current.vx = 0
    robotRef.current.vy = 0
    robotRef.current.omega = 0
    robotRef.current.odomX = 70
    robotRef.current.odomY = 70
    robotRef.current.driftX = 0
    robotRef.current.driftY = 0
    pathHistoryRef.current = []
    odomHistoryRef.current = []
    poseGraphRef.current = []
    planAStarPath(70, 70, goalPosRef.current.x, goalPosRef.current.y)
  }, [planAStarPath])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fitCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const w = Math.floor(rect.width > 0 ? rect.width : (parent.clientWidth || 520))
      const h = Math.floor(rect.height > 0 ? rect.height : (parent.clientHeight || 330))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        planAStarPath(robotRef.current.x, robotRef.current.y, goalPosRef.current.x, goalPosRef.current.y)
      }
    }

    fitCanvas()

    const resizeObserver = new ResizeObserver(() => fitCanvas())
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }
    window.addEventListener('resize', fitCanvas)

    // Continuous DDA / Ray-Box AABB Intersection for 2D LiDAR (C. Fault Fix)
    const rayAABBIntersection = (
      roX: number,
      roY: number,
      rdX: number,
      rdY: number,
      boxX: number,
      boxY: number,
      boxW: number,
      boxH: number
    ): number | null => {
      const invDirX = 1 / (rdX === 0 ? 0.00001 : rdX)
      const invDirY = 1 / (rdY === 0 ? 0.00001 : rdY)

      let tMin = (boxX - roX) * invDirX
      let tMax = (boxX + boxW - roX) * invDirX
      if (tMin > tMax) [tMin, tMax] = [tMax, tMin]

      let tyMin = (boxY - roY) * invDirY
      let tyMax = (boxY + boxH - roY) * invDirY
      if (tyMin > tyMax) [tyMin, tyMax] = [tyMax, tyMin]

      if (tMin > tyMax || tyMin > tMax) return null

      const realTMin = Math.max(tMin, tyMin)
      const realTMax = Math.min(tMax, tyMax)

      if (realTMax < 0) return null
      return realTMin > 0 ? realTMin : realTMax
    }

    // Pointer Handler (Click to set Goal or Place Obstacle)
    const handlePointerAction = (e: MouseEvent | TouchEvent) => {
      if (e.type === 'touchstart') e.preventDefault()
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

      const clickX = Math.max(25, Math.min(canvas.width - 25, clientX - rect.left))
      const clickY = Math.max(25, Math.min(canvas.height - 25, clientY - rect.top))

      if (addObstacleModeRef.current) {
        obstaclesRef.current.push({
          id: Date.now(),
          x: clickX - 25,
          y: clickY - 25,
          w: 50,
          h: 50
        })
        planAStarPath(robotRef.current.x, robotRef.current.y, goalPosRef.current.x, goalPosRef.current.y)
      } else {
        goalPosRef.current = { x: clickX, y: clickY }
        planAStarPath(robotRef.current.x, robotRef.current.y, clickX, clickY)
      }
    }

    canvas.addEventListener('click', handlePointerAction)
    canvas.addEventListener('touchstart', handlePointerAction, { passive: false })

    planAStarPath(robotRef.current.x, robotRef.current.y, goalPosRef.current.x, goalPosRef.current.y)

    let animationFrameId: number
    let lastUiUpdateTime = 0
    let lastKeyframeDistance = 0

    const render = (timestamp: number) => {
      if (!ctx) return
      const cw = canvas.width || 520
      const ch = canvas.height || 330
      const robot = robotRef.current
      const goal = goalPosRef.current
      const currentSpeed = speedRef.current

      ctx.clearRect(0, 0, cw, ch)

      // 1. Radar Background Grid
      ctx.fillStyle = '#050b18'
      ctx.fillRect(0, 0, cw, ch)

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)'
      ctx.lineWidth = 1
      const gridSize = 25
      for (let x = 0; x < cw; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, ch)
        ctx.stroke()
      }
      for (let y = 0; y < ch; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(cw, y)
        ctx.stroke()
      }

      // 2. Costmap Inflation Layer Rendering (Visual Feedback for Nav2 Footprint Clearance)
      if (showCostmapRef.current) {
        obstaclesRef.current.forEach((obs) => {
          // Inflation Halo
          const grad = ctx.createRadialGradient(
            obs.x + obs.w / 2, obs.y + obs.h / 2, Math.max(obs.w, obs.h) / 2,
            obs.x + obs.w / 2, obs.y + obs.h / 2, Math.max(obs.w, obs.h) / 2 + 36
          )
          grad.addColorStop(0, 'rgba(0, 240, 255, 0.15)')
          grad.addColorStop(0.5, 'rgba(255, 0, 127, 0.08)')
          grad.addColorStop(1, 'rgba(0, 240, 255, 0)')

          ctx.fillStyle = grad
          ctx.fillRect(obs.x - 36, obs.y - 36, obs.w + 72, obs.h + 72)

          // Inscribed Footprint Buffer Border (18px)
          ctx.strokeStyle = 'rgba(255, 0, 127, 0.35)'
          ctx.lineWidth = 1
          ctx.setLineDash([3, 3])
          ctx.strokeRect(obs.x - 18, obs.y - 18, obs.w + 36, obs.h + 36)
          ctx.setLineDash([])
        })
      }

      // Outer Arena Border
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)'
      ctx.lineWidth = 2
      ctx.strokeRect(1, 1, cw - 2, ch - 2)

      // 3. Continuous DDA / Raycasting 2D LiDAR Scan (C. Fault Fix)
      const NUM_RAYS = 84
      const MAX_LIDAR_RANGE = 190
      const lidarHits: { x: number; y: number; dist: number; angle: number }[] = []
      lidarSweepAngleRef.current = (lidarSweepAngleRef.current + 0.08) % (Math.PI * 2)

      for (let i = 0; i < NUM_RAYS; i++) {
        const rayAngle = robot.angle + (i / NUM_RAYS) * Math.PI * 2
        const cos = Math.cos(rayAngle)
        const sin = Math.sin(rayAngle)

        let minT = MAX_LIDAR_RANGE

        // Canvas boundaries intersection
        if (cos > 0) minT = Math.min(minT, (cw - robot.x) / cos)
        else if (cos < 0) minT = Math.min(minT, (0 - robot.x) / cos)

        if (sin > 0) minT = Math.min(minT, (ch - robot.y) / sin)
        else if (sin < 0) minT = Math.min(minT, (0 - robot.y) / sin)

        // Obstacles intersection with strict edge termination
        obstaclesRef.current.forEach((obs) => {
          const t = rayAABBIntersection(robot.x, robot.y, cos, sin, obs.x, obs.y, obs.w, obs.h)
          if (t !== null && t < minT) {
            minT = t
          }
        })

        const hitX = robot.x + cos * minT
        const hitY = robot.y + sin * minT
        lidarHits.push({ x: hitX, y: hitY, dist: minT, angle: rayAngle })

        // SLAM Occupancy Mapping: Record point cloud
        if (minT < MAX_LIDAR_RANGE - 2) {
          const isUnique = !slamMapRef.current.some((p) => Math.hypot(p.x - hitX, p.y - hitY) < 5)
          if (isUnique) {
            slamMapRef.current.push({ x: hitX, y: hitY })
            if (slamMapRef.current.length > 700) slamMapRef.current.shift()
          }
        }
      }

      // 4. Render SLAM Point Cloud Map
      ctx.fillStyle = '#00f0ff'
      slamMapRef.current.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      })

      // 5. Render LiDAR Rays
      if (showRaysRef.current) {
        lidarHits.forEach((hit) => {
          const isNear = hit.dist < 50
          ctx.strokeStyle = isNear ? 'rgba(255, 0, 127, 0.4)' : 'rgba(0, 240, 255, 0.12)'
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(robot.x, robot.y)
          ctx.lineTo(hit.x, hit.y)
          ctx.stroke()

          if (hit.dist < MAX_LIDAR_RANGE - 2) {
            ctx.fillStyle = isNear ? '#ff007f' : '#00ff9d'
            ctx.beginPath()
            ctx.arc(hit.x, hit.y, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        // LiDAR Sweep Cone
        ctx.save()
        ctx.translate(robot.x, robot.y)
        ctx.rotate(lidarSweepAngleRef.current)
        const sweep = ctx.createRadialGradient(0, 0, 0, 0, 0, 110)
        sweep.addColorStop(0, 'rgba(0, 240, 255, 0.25)')
        sweep.addColorStop(1, 'rgba(0, 240, 255, 0)')
        ctx.fillStyle = sweep
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.arc(0, 0, 110, -0.35, 0.35)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      // 6. Render Obstacles
      obstaclesRef.current.forEach((obs) => {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)'
        ctx.strokeStyle = '#00f0ff'
        ctx.lineWidth = 1.5
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h)
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h)

        // Hazard Stripes
        ctx.save()
        ctx.beginPath()
        ctx.rect(obs.x, obs.y, obs.w, obs.h)
        ctx.clip()
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)'
        ctx.lineWidth = 2
        for (let ix = -obs.h; ix < obs.w + obs.h; ix += 12) {
          ctx.beginPath()
          ctx.moveTo(obs.x + ix, obs.y)
          ctx.lineTo(obs.x + ix + obs.h, obs.y + obs.h)
          ctx.stroke()
        }
        ctx.restore()
      })

      // 7. Navigation & Pure Pursuit Trajectory Tracking
      const path = plannedPathRef.current
      let targetWaypoint: Point | null = null

      if (path.length > 0) {
        const nextWp = path[0]
        const distToWp = Math.hypot(nextWp.x - robot.x, nextWp.y - robot.y)
        if (distToWp < 20) {
          path.shift()
        }
        targetWaypoint = path.length > 0 ? path[0] : goal
      } else {
        targetWaypoint = goal
      }

      const totalDistToGoal = Math.hypot(goal.x - robot.x, goal.y - robot.y)
      let currentNavStatus = 'NAVIGATING'

      if (totalDistToGoal > 12 && targetWaypoint) {
        const steerDx = targetWaypoint.x - robot.x
        const steerDy = targetWaypoint.y - robot.y
        const targetAngle = Math.atan2(steerDy, steerDx)
        const angleDiff = Math.atan2(Math.sin(targetAngle - robot.angle), Math.cos(targetAngle - robot.angle))

        // Smooth steering PID
        robot.omega = angleDiff * 0.2
        robot.angle += robot.omega
        robot.angle = Math.atan2(Math.sin(robot.angle), Math.cos(robot.angle))

        // Speed alignment
        const alignCoeff = Math.max(0.2, Math.cos(angleDiff))
        const stepSpeed = currentSpeed * alignCoeff

        robot.vx = Math.cos(robot.angle) * stepSpeed
        robot.vy = Math.sin(robot.angle) * stepSpeed

        currentNavStatus = path.length > 1 ? 'PATH TRACKING' : 'APPROACHING GOAL'
      } else {
        robot.vx *= 0.5
        robot.vy *= 0.5
        robot.omega *= 0.5
        currentNavStatus = 'WAYPOINT REACHED'
      }

      // Physics step
      robot.x += robot.vx
      robot.y += robot.vy

      // D. Odometry Drift Simulation & Pose Graph Accumulation
      if (simulateDriftRef.current && Math.hypot(robot.vx, robot.vy) > 0.1) {
        // Accumulate slight rotational and translation odometry drift
        robot.driftX += (Math.random() - 0.48) * 0.04
        robot.driftY += (Math.random() - 0.48) * 0.04
        robot.odomX = robot.x + robot.driftX
        robot.odomY = robot.y + robot.driftY
        robot.odomAngle = robot.angle + (Math.random() - 0.5) * 0.01

        odomHistoryRef.current.push({ x: robot.odomX, y: robot.odomY })
        if (odomHistoryRef.current.length > 200) odomHistoryRef.current.shift()
      } else {
        robot.odomX = robot.x + robot.driftX
        robot.odomY = robot.y + robot.driftY
      }

      // Pose Graph Keyframe Node Placement (every ~35px)
      lastKeyframeDistance += Math.hypot(robot.vx, robot.vy)
      if (lastKeyframeDistance > 35) {
        lastKeyframeDistance = 0
        const newNode: PoseGraphNode = {
          id: poseGraphRef.current.length + 1,
          x: robot.x,
          y: robot.y,
          odomX: robot.odomX,
          odomY: robot.odomY,
          angle: robot.angle
        }

        // Loop Closure Detection (D. Fault Fix)
        // Check if robot returned to proximity of a historical keyframe
        if (poseGraphRef.current.length > 6) {
          const historicalMatch = poseGraphRef.current.slice(0, -5).find((node) => {
            return Math.hypot(node.x - robot.x, node.y - robot.y) < 36
          })

          if (historicalMatch) {
            // Trigger Loop Closure Optimization!
            robot.driftX *= 0.15
            robot.driftY *= 0.15
            robot.loopClosuresCount += 1
            activeLoopConstraintRef.current = {
              from: { x: robot.x, y: robot.y },
              to: { x: historicalMatch.x, y: historicalMatch.y },
              alpha: 1.0
            }
            setLoopClosureAlert(true)
            setTimeout(() => setLoopClosureAlert(false), 2400)
          }
        }

        poseGraphRef.current.push(newNode)
        if (poseGraphRef.current.length > 40) poseGraphRef.current.shift()
      }

      // Boundary safety
      const r = robot.radius
      if (robot.x - r < 4) { robot.x = 4 + r; robot.vx = 0 }
      if (robot.x + r > cw - 4) { robot.x = cw - 4 - r; robot.vx = 0 }
      if (robot.y - r < 4) { robot.y = 4 + r; robot.vy = 0 }
      if (robot.y + r > ch - 4) { robot.y = ch - 4 - r; robot.vy = 0 }

      // Obstacle rigid body collision resolution
      obstaclesRef.current.forEach((obs) => {
        const closestX = Math.max(obs.x, Math.min(robot.x, obs.x + obs.w))
        const closestY = Math.max(obs.y, Math.min(robot.y, obs.y + obs.h))
        const cdx = robot.x - closestX
        const cdy = robot.y - closestY
        const cdist = Math.hypot(cdx, cdy)

        if (cdist < r && cdist > 0.0001) {
          const overlap = r - cdist
          robot.x += (cdx / cdist) * overlap
          robot.y += (cdy / cdist) * overlap
          planAStarPath(robot.x, robot.y, goal.x, goal.y)
        }
      })

      // Ground truth path history
      if (Math.hypot(robot.vx, robot.vy) > 0.2) {
        pathHistoryRef.current.push({ x: robot.x, y: robot.y })
        if (pathHistoryRef.current.length > 250) pathHistoryRef.current.shift()
      }

      // 8. Render Pose Graph Nodes & Odometry Drift Trajectory (D. Visualizer)
      if (showPoseGraphRef.current) {
        // Drifted Odometry trajectory (Red/Cyan dotted)
        if (simulateDriftRef.current && odomHistoryRef.current.length > 1) {
          ctx.strokeStyle = 'rgba(255, 0, 127, 0.45)'
          ctx.lineWidth = 1.2
          ctx.setLineDash([3, 3])
          ctx.beginPath()
          odomHistoryRef.current.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y)
            else ctx.lineTo(pt.x, pt.y)
          })
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Pose Graph Edges
        ctx.strokeStyle = 'rgba(0, 255, 157, 0.4)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        poseGraphRef.current.forEach((node, idx) => {
          if (idx === 0) ctx.moveTo(node.x, node.y)
          else ctx.lineTo(node.x, node.y)
        })
        ctx.stroke()

        // Pose Graph Keyframe Nodes
        poseGraphRef.current.forEach((node) => {
          ctx.fillStyle = '#00ff9d'
          ctx.beginPath()
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
          ctx.fill()

          ctx.strokeStyle = 'rgba(0, 255, 157, 0.6)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(node.x, node.y, 6, 0, Math.PI * 2)
          ctx.stroke()
        })

        // Active Loop Closure Constraint Pulse
        if (activeLoopConstraintRef.current && activeLoopConstraintRef.current.alpha > 0.05) {
          const lc = activeLoopConstraintRef.current
          ctx.strokeStyle = `rgba(255, 230, 0, ${lc.alpha})`
          ctx.lineWidth = 3
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(lc.from.x, lc.from.y)
          ctx.lineTo(lc.to.x, lc.to.y)
          ctx.stroke()
          ctx.setLineDash([])

          // Flash target node
          ctx.fillStyle = `rgba(255, 230, 0, ${lc.alpha})`
          ctx.beginPath()
          ctx.arc(lc.to.x, lc.to.y, 10, 0, Math.PI * 2)
          ctx.fill()

          lc.alpha -= 0.02
        }
      }

      // 9. Render Planned A* Path Ribbon (Avoids Inscribed Obstacles)
      if (path.length > 0) {
        ctx.strokeStyle = '#00ff9d'
        ctx.lineWidth = 2.5
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(robot.x, robot.y)
        path.forEach((pt) => ctx.lineTo(pt.x, pt.y))
        ctx.stroke()
        ctx.setLineDash([])

        path.forEach((pt, i) => {
          ctx.fillStyle = i === path.length - 1 ? '#00ff9d' : '#00f0ff'
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, 3.5, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      // 10. Render Goal Marker
      ctx.fillStyle = 'rgba(0, 255, 157, 0.15)'
      ctx.beginPath()
      ctx.arc(goal.x, goal.y, 22, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = '#00ff9d'
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.arc(goal.x, goal.y, 16 + Math.sin(timestamp * 0.005) * 3, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = '#00ff9d'
      ctx.beginPath()
      ctx.arc(goal.x, goal.y, 4.5, 0, Math.PI * 2)
      ctx.fill()

      // 11. Render Robot Hull & Steering Heading
      ctx.save()
      ctx.translate(robot.x, robot.y)
      ctx.rotate(robot.angle)

      // Skid tracks
      ctx.fillStyle = '#0f172a'
      ctx.strokeStyle = '#00f0ff'
      ctx.lineWidth = 1.5
      ctx.fillRect(-14, -15, 28, 6)
      ctx.strokeRect(-14, -15, 28, 6)
      ctx.fillRect(-14, 9, 28, 6)
      ctx.strokeRect(-14, 9, 28, 6)

      // Hull
      ctx.fillStyle = '#020617'
      ctx.strokeStyle = '#00f0ff'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // LiDAR Turret
      ctx.fillStyle = '#ff007f'
      ctx.beginPath()
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2)
      ctx.fill()

      // Directional arrow
      ctx.strokeStyle = '#00ff9d'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(r + 6, 0)
      ctx.stroke()

      ctx.restore()

      // 12. Throttle UI Telemetry Updates (10Hz)
      if (timestamp - lastUiUpdateTime > 100) {
        lastUiUpdateTime = timestamp
        setStatusText(currentNavStatus)
        setMapPointCount(slamMapRef.current.length)
        setTelemetry({
          x: Math.round(robot.x),
          y: Math.round(robot.y),
          odomX: Math.round(robot.odomX),
          odomY: Math.round(robot.odomY),
          angle: Math.round((robot.angle * 180) / Math.PI),
          v: Number((Math.hypot(robot.vx, robot.vy) * 0.8).toFixed(1)),
          driftErr: Number(Math.hypot(robot.driftX, robot.driftY).toFixed(1)),
          loopClosures: robot.loopClosuresCount,
          waypointsLeft: path.length
        })
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', fitCanvas)
      canvas.removeEventListener('click', handlePointerAction)
      canvas.removeEventListener('touchstart', handlePointerAction)
    }
  }, [planAStarPath])

  return (
    <div className="w-full flex flex-col gap-4 font-space">
      {/* Simulation Canvas Container */}
      <div className="relative w-full aspect-video border-2 border-slate-300 dark:border-cyan-500/40 rounded-2xl overflow-hidden bg-slate-950 min-h-[280px] shadow-xl">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair block" />

        {/* Live HUD Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 z-10">
          <div className="bg-slate-900/90 border border-slate-700 dark:border-cyan-500/40 px-3 py-1 rounded-lg text-xs font-mono text-cyan-300 flex items-center gap-2 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-white font-orbitron">NAV2 / SLAM:</span>
            <span className={statusText === 'WAYPOINT REACHED' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {statusText}
            </span>
          </div>

          {loopClosureAlert && (
            <div className="bg-amber-500/20 border border-amber-400 text-amber-300 px-3 py-1 rounded-lg text-xs font-orbitron font-bold flex items-center gap-1.5 backdrop-blur-md animate-bounce">
              <FaSyncAlt className="animate-spin text-xs" />
              <span>LOOP CLOSURE DETECTED (POSE GRAPH OPTIMIZED)</span>
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700 dark:border-cyan-500/40 px-3 py-1 rounded-lg text-xs font-mono text-white backdrop-blur-md hidden sm:flex items-center gap-3">
          <span>POINTS: <strong className="text-emerald-400">{mapPointCount}</strong></span>
          <span>KEYFRAMES: <strong className="text-cyan-300">{poseGraphRef.current.length}</strong></span>
        </div>

        {/* Canvas Click Hint */}
        <div className="absolute bottom-2 left-3 text-xs font-mono text-slate-300 bg-slate-900/85 px-3 py-1 rounded-md pointer-events-none border border-slate-700">
          {addObstacleMode ? '📍 CLICK ANYWHERE TO PLACE OBSTACLE CRATE' : '🎯 CLICK ANYWHERE TO SET DESTINATION WAYPOINT'}
        </div>
      </div>

      {/* High-Contrast Telemetry Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-300 dark:border-cyan-500/30 shadow-sm text-xs font-mono">
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-3 rounded-xl border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">GROUND TRUTH POSE:</span>
          <span className="text-slate-900 dark:text-white font-bold text-sm">[{telemetry.x}, {telemetry.y}] @ {telemetry.angle}°</span>
        </div>
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-3 rounded-xl border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">ESTIMATED ODOMETRY:</span>
          <span className="text-blue-800 dark:text-cyan-300 font-bold text-sm">[{telemetry.odomX}, {telemetry.odomY}] (Δ {telemetry.driftErr}px)</span>
        </div>
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-3 rounded-xl border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">LOOP CLOSURES:</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">{telemetry.loopClosures} OPTIMIZATIONS</span>
        </div>
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-3 rounded-xl border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">DISTANCE TO GOAL:</span>
          <span className="text-blue-700 dark:text-cyan-300 font-bold text-sm">{telemetry.waypointsLeft} wps left</span>
        </div>
      </div>

      {/* Controls & Interactive Toggles */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-black/60 p-4 rounded-2xl border border-slate-300 dark:border-cyan-500/30 shadow-sm">
        {/* Speed Adjustment */}
        <div className="flex items-center gap-3 flex-grow max-w-xs">
          <label className="text-slate-900 dark:text-cyan-300 font-orbitron text-xs whitespace-nowrap font-bold">
            ROBOT SPEED:
          </label>
          <input 
            type="range" 
            min="1" 
            max="6" 
            step="0.5" 
            value={speed} 
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="flex-grow accent-blue-600 dark:accent-cyan-400 cursor-pointer"
          />
          <span className="text-slate-900 dark:text-cyan-300 font-bold text-xs w-8">{speed}x</span>
        </div>

        {/* Feature Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCostmap((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-orbitron font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
              showCostmap
                ? 'bg-blue-50 text-blue-800 border-blue-400 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300'
                : 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400'
            }`}
          >
            <FaLayerGroup className="text-[10px]" />
            <span>INFLATION: {showCostmap ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setSimulateDrift((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-orbitron font-bold rounded-xl border transition-all flex items-center gap-1.5 ${
              simulateDrift
                ? 'bg-emerald-50 text-emerald-800 border-emerald-400 dark:bg-emerald-500/20 dark:border-emerald-400 dark:text-emerald-300'
                : 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400'
            }`}
          >
            <FaWaveSquare className="text-[10px]" />
            <span>ODOM DRIFT: {simulateDrift ? 'ACTIVE' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setAddObstacleMode((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-orbitron font-bold rounded-xl border transition-all ${
              addObstacleMode
                ? 'bg-amber-100 text-amber-900 border-amber-500 dark:bg-amber-500/30 dark:border-amber-400 dark:text-amber-300 shadow-md'
                : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 hover:border-amber-500'
            }`}
          >
            {addObstacleMode ? '✏️ PLACING CRATE' : '+ ADD CRATE'}
          </button>

          <button 
            onClick={generateObstacles} 
            className="px-3 py-1.5 bg-blue-700 text-white hover:bg-blue-800 dark:bg-cyan-900/40 dark:border dark:border-cyan-500/50 dark:text-cyan-300 dark:hover:bg-cyan-500 dark:hover:text-black transition-colors font-orbitron text-xs font-bold rounded-xl shadow-sm"
          >
            GENERATE
          </button>

          <button 
            onClick={clearObstacles} 
            className="px-3 py-1.5 bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200 dark:bg-rose-950/40 dark:border-rose-500/50 dark:text-rose-300 dark:hover:bg-rose-500 dark:hover:text-black transition-colors font-orbitron text-xs font-bold rounded-xl"
          >
            CLEAR
          </button>

          <button 
            onClick={resetRobotPose} 
            className="px-3 py-1.5 bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400 transition-colors font-orbitron text-xs font-bold rounded-xl"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  )
}
