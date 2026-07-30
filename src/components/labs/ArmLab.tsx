"use client"
import { useEffect, useRef, useState } from 'react'

export default function ArmLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [telemetry, setTelemetry] = useState({ x: 0, y: 0, t1: 0, t2: 0 })

  const targetPos = useRef({ x: 140, y: -120 })
  const endEffectorPos = useRef({ x: 140, y: -120, vx: 0, vy: 0 })
  const currentAngles = useRef({ theta1: 0, theta2: 0 })
  const plasmaSparks = useRef<{x: number, y: number, vx: number, vy: number, life: number}[]>([])

  const l1 = 120
  const l2 = 100
  const massRigidity = 0.22
  const damping = 0.82

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fitCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    fitCanvas()
    window.addEventListener('resize', fitCanvas)

    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetPos.current.x = e.clientX - rect.left - canvas.width / 2
      targetPos.current.y = e.clientY - rect.top - (canvas.height * 0.85)
      if (targetPos.current.y > 0) targetPos.current.y = 0

      if (Math.random() < 0.4) {
        plasmaSparks.current.push({
          x: canvas.width / 2 + endEffectorPos.current.x,
          y: canvas.height * 0.85 + endEffectorPos.current.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1.0
        })
      }
    }
    canvas.addEventListener('mousemove', handleMouseMove)

    const calculateIK = (tx: number, ty: number) => {
      const dist = Math.sqrt(tx * tx + ty * ty)
      const maxReach = l1 + l2 - 5
      let x = tx
      let y = ty
      if (dist > maxReach) {
        x = (tx / dist) * maxReach
        y = (ty / dist) * maxReach
      }

      const D = (x * x + y * y - l1 * l1 - l2 * l2) / (2 * l1 * l2)
      const clampedD = Math.max(-1, Math.min(1, D))
      const theta2 = Math.atan2(-Math.sqrt(1 - clampedD * clampedD), clampedD)
      const theta1 = Math.atan2(y, x) - Math.atan2(l2 * Math.sin(theta2), l1 + l2 * Math.cos(theta2))

      return { theta1, theta2 }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height * 0.85

      const ax = (targetPos.current.x - endEffectorPos.current.x) * massRigidity
      const ay = (targetPos.current.y - endEffectorPos.current.y) * massRigidity

      endEffectorPos.current.vx = (endEffectorPos.current.vx + ax) * damping
      endEffectorPos.current.vy = (endEffectorPos.current.vy + ay) * damping
      
      // Strict caps to prevent glitching
      if (endEffectorPos.current.vx > 50) endEffectorPos.current.vx = 50
      if (endEffectorPos.current.vx < -50) endEffectorPos.current.vx = -50
      if (endEffectorPos.current.vy > 50) endEffectorPos.current.vy = 50
      if (endEffectorPos.current.vy < -50) endEffectorPos.current.vy = -50

      endEffectorPos.current.x += endEffectorPos.current.vx
      endEffectorPos.current.y += endEffectorPos.current.vy
      
      if (endEffectorPos.current.y > 0) {
        endEffectorPos.current.y = 0
        endEffectorPos.current.vy *= -0.5
      }

      const ik = calculateIK(endEffectorPos.current.x, endEffectorPos.current.y)
      currentAngles.current.theta1 += (ik.theta1 - currentAngles.current.theta1) * 0.3
      currentAngles.current.theta2 += (ik.theta2 - currentAngles.current.theta2) * 0.3

      const j0 = { x: centerX, y: centerY }
      const j1 = {
        x: j0.x + l1 * Math.cos(currentAngles.current.theta1),
        y: j0.y + l1 * Math.sin(currentAngles.current.theta1)
      }
      const j2 = {
        x: j1.x + l2 * Math.cos(currentAngles.current.theta1 + currentAngles.current.theta2),
        y: j1.y + l2 * Math.sin(currentAngles.current.theta1 + currentAngles.current.theta2)
      }

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      ctx.strokeStyle = 'rgba(255, 0, 127, 0.35)'
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(centerX + targetPos.current.x, centerY + targetPos.current.y)
      ctx.lineTo(j2.x, j2.y)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.fillStyle = '#0a1226'
      ctx.strokeStyle = '#00f0ff'
      ctx.lineWidth = 2
      ctx.fillRect(centerX - 40, centerY, 80, 25)
      ctx.strokeRect(centerX - 40, centerY, 80, 25)

      ctx.strokeStyle = '#00f0ff'
      ctx.lineWidth = 14
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(j0.x, j0.y)
      ctx.lineTo(j1.x, j1.y)
      ctx.stroke()

      ctx.strokeStyle = '#ff007f'
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.moveTo(j1.x, j1.y)
      ctx.lineTo(j2.x, j2.y)
      ctx.stroke()

      ;[j0, j1, j2].forEach((j, idx) => {
        ctx.fillStyle = idx === 2 ? '#00ff9d' : '#ffffff'
        ctx.beginPath()
        ctx.arc(j.x, j.y, 9, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.strokeStyle = '#ffb800'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(centerX + targetPos.current.x, centerY + targetPos.current.y, 12, 0, Math.PI * 2)
      ctx.stroke()

      for (let i = plasmaSparks.current.length - 1; i >= 0; i--) {
        const s = plasmaSparks.current[i]
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.03
        if (s.life <= 0) {
          plasmaSparks.current.splice(i, 1)
          continue
        }
        ctx.fillStyle = `rgba(0, 255, 157, ${s.life})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 2.5 * s.life, 0, Math.PI * 2)
        ctx.fill()
      }

      setTelemetry({
        x: endEffectorPos.current.x,
        y: -endEffectorPos.current.y,
        t1: currentAngles.current.theta1 * (180/Math.PI),
        t2: currentAngles.current.theta2 * (180/Math.PI)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', fitCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const triggerImpulse = () => {
    endEffectorPos.current.vx += (Math.random() - 0.5) * 180
    endEffectorPos.current.vy += (Math.random() - 0.5) * 180
    for (let i = 0; i < 20; i++) {
      plasmaSparks.current.push({
        x: (canvasRef.current?.width || 0) / 2 + endEffectorPos.current.x,
        y: (canvasRef.current?.height || 0) * 0.85 + endEffectorPos.current.y,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        life: 1.0
      })
    }
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full aspect-video border border-cyan-500/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur">
        <canvas ref={canvasRef} className="w-full h-full cursor-none" />
      </div>
      
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/50 p-4 border border-cyan-500/20 rounded font-orbitron text-sm">
        <div><span className="text-gray-500">X:</span> <span className="text-cyan-400">{telemetry.x.toFixed(1)}</span></div>
        <div><span className="text-gray-500">Y:</span> <span className="text-cyan-400">{telemetry.y.toFixed(1)}</span></div>
        <div><span className="text-gray-500">θ1:</span> <span className="text-cyan-400">{telemetry.t1.toFixed(1)}°</span></div>
        <div><span className="text-gray-500">θ2:</span> <span className="text-cyan-400">{telemetry.t2.toFixed(1)}°</span></div>
      </div>
      
      <div className="flex gap-4">
        <button onClick={triggerImpulse} className="px-4 py-2 border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black font-bold font-orbitron transition-colors">
          IMPULSE TEST
        </button>
        <button onClick={() => { targetPos.current = {x: 140, y: -120}; endEffectorPos.current = {x: 140, y: -120, vx: 0, vy: 0} }} className="px-4 py-2 border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-black font-bold font-orbitron transition-colors">
          RESET POS
        </button>
      </div>
    </div>
  )
}
