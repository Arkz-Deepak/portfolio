"use client"
import { useEffect, useRef, useState } from 'react'

export default function PidLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [kp, setKp] = useState(1.8)
  const [ki, setKi] = useState(0.2)
  const [kd, setKd] = useState(0.65)
  const [targetSetpoint, setTargetSetpoint] = useState(140)

  // We use refs for physics state that mutates rapidly outside React's render cycle
  const massState = useRef({ x: 0, v: 0, a: 0, mass: 2.5, k: 4.0, c: 0.45 })
  const pidPoints = useRef<number[]>([])
  const integral = useRef(0)
  const lastError = useRef(0)

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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const error = targetSetpoint - massState.current.x
      integral.current += error * 0.04
      const derivative = (error - lastError.current) / 0.04
      const fControl = kp * error + ki * integral.current + kd * derivative
      lastError.current = error

      let clampedFControl = Math.max(-1000, Math.min(1000, fControl))
      const fNet = clampedFControl - massState.current.c * massState.current.v
      massState.current.a = fNet / massState.current.mass
      massState.current.v += massState.current.a * 0.04
      massState.current.x += massState.current.v * 0.04

      pidPoints.current.push(massState.current.x)
      if (pidPoints.current.length > canvas.width) pidPoints.current.shift()

      // Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)'
      ctx.lineWidth = 1
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Setpoint Line
      ctx.strokeStyle = '#ff007f'
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - targetSetpoint)
      ctx.lineTo(canvas.width, canvas.height - targetSetpoint)
      ctx.stroke()
      ctx.setLineDash([])

      // Oscilloscope Curve
      ctx.strokeStyle = '#00f0ff'
      ctx.lineWidth = 2.5
      ctx.beginPath()
      for (let i = 0; i < pidPoints.current.length; i++) {
        const x = i
        const y = canvas.height - pidPoints.current[i]
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Sliding Mass Widget
      const mX = canvas.width - 50
      const mY = canvas.height - massState.current.x
      ctx.fillStyle = '#00ff9d'
      ctx.fillRect(mX - 15, mY - 15, 30, 30)
      ctx.strokeStyle = '#fff'
      ctx.strokeRect(mX - 15, mY - 15, 30, 30)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', fitCanvas)
    }
  }, [kp, ki, kd, targetSetpoint])

  const handleStep = () => {
    setTargetSetpoint(prev => prev === 140 ? 70 : 140)
    massState.current.v += (Math.random() - 0.5) * 40
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full aspect-video border border-cyan-500/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-cyan-400 font-orbitron text-sm">Kp: {kp.toFixed(2)}</label>
          <input type="range" min="0" max="10" step="0.1" value={kp} onChange={e => setKp(parseFloat(e.target.value))} className="accent-cyan-400" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-cyan-400 font-orbitron text-sm">Ki: {ki.toFixed(2)}</label>
          <input type="range" min="0" max="2" step="0.05" value={ki} onChange={e => setKi(parseFloat(e.target.value))} className="accent-cyan-400" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-cyan-400 font-orbitron text-sm">Kd: {kd.toFixed(2)}</label>
          <input type="range" min="0" max="5" step="0.1" value={kd} onChange={e => setKd(parseFloat(e.target.value))} className="accent-cyan-400" />
        </div>
      </div>
      
      <button 
        onClick={handleStep}
        className="px-6 py-2 bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-orbitron font-bold transition-all"
      >
        TRIGGER STEP DISTURBANCE
      </button>
    </div>
  )
}
