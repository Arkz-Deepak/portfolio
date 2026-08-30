"use client"
import { useEffect, useRef, useState } from 'react'

export default function PidLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const [kp, setKp] = useState(1.8)
  const [ki, setKi] = useState(0.2)
  const [kd, setKd] = useState(0.65)
  const [targetSetpoint, setTargetSetpoint] = useState(140)

  const [metrics, setMetrics] = useState({
    error: 0,
    currentPos: 0,
    controlEffort: 0
  })

  // Physics state
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
    let lastMetricTime = 0

    const render = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = '#060d1f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

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
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(0, canvas.height - targetSetpoint)
      ctx.lineTo(canvas.width, canvas.height - targetSetpoint)
      ctx.stroke()
      ctx.setLineDash([])

      // Setpoint label
      ctx.font = '10px monospace'
      ctx.fillStyle = '#ff007f'
      ctx.fillText(`SETPOINT [${targetSetpoint}px]`, 10, canvas.height - targetSetpoint - 6)

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
      ctx.lineWidth = 1.5
      ctx.strokeRect(mX - 15, mY - 15, 30, 30)

      // Update metrics at 10Hz
      if (timestamp - lastMetricTime > 100) {
        lastMetricTime = timestamp
        setMetrics({
          error: Number(Math.abs(error).toFixed(1)),
          currentPos: Number(massState.current.x.toFixed(1)),
          controlEffort: Number(clampedFControl.toFixed(1))
        })
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', fitCanvas)
    }
  }, [kp, ki, kd, targetSetpoint])

  const handleStep = () => {
    setTargetSetpoint((prev) => (prev === 140 ? 70 : 140))
    massState.current.v += (Math.random() - 0.5) * 40
  }

  return (
    <div className="w-full flex flex-col gap-4 font-space">
      {/* Canvas Viewport */}
      <div className="w-full aspect-video border-2 border-slate-300 dark:border-cyan-500/40 rounded-xl overflow-hidden bg-slate-950 min-h-[220px] shadow-lg">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-300 dark:border-cyan-500/30 text-xs font-mono shadow-sm">
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-2.5 rounded border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">CURRENT POS:</span>
          <span className="text-slate-900 dark:text-white font-bold text-sm">{metrics.currentPos}px</span>
        </div>
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-2.5 rounded border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">TRACKING ERROR:</span>
          <span className="text-rose-700 dark:text-rose-400 font-bold text-sm">{metrics.error}px</span>
        </div>
        <div className="flex flex-col bg-slate-50 dark:bg-black/50 p-2.5 rounded border border-slate-200 dark:border-cyan-900">
          <span className="text-slate-600 dark:text-cyan-400 text-[11px] font-bold font-orbitron">CONTROL EFFORT:</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">{metrics.controlEffort}N</span>
        </div>
      </div>
      
      {/* Tuning Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white dark:bg-black/60 p-4 rounded-xl border border-slate-300 dark:border-cyan-500/30 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-bold font-orbitron text-slate-900 dark:text-cyan-300">
            <span>PROPORTIONAL (Kp):</span>
            <span className="text-blue-700 dark:text-cyan-400 font-mono">{kp.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="10" 
            step="0.1" 
            value={kp} 
            onChange={(e) => setKp(parseFloat(e.target.value))} 
            className="accent-blue-600 dark:accent-cyan-400 cursor-pointer" 
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-bold font-orbitron text-slate-900 dark:text-cyan-300">
            <span>INTEGRAL (Ki):</span>
            <span className="text-blue-700 dark:text-cyan-400 font-mono">{ki.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.05" 
            value={ki} 
            onChange={(e) => setKi(parseFloat(e.target.value))} 
            className="accent-blue-600 dark:accent-cyan-400 cursor-pointer" 
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-bold font-orbitron text-slate-900 dark:text-cyan-300">
            <span>DERIVATIVE (Kd):</span>
            <span className="text-blue-700 dark:text-cyan-400 font-mono">{kd.toFixed(2)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="5" 
            step="0.1" 
            value={kd} 
            onChange={(e) => setKd(parseFloat(e.target.value))} 
            className="accent-blue-600 dark:accent-cyan-400 cursor-pointer" 
          />
        </div>
      </div>
      
      <button 
        onClick={handleStep}
        className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white dark:bg-cyan-500/20 dark:border dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black font-orbitron font-bold text-xs tracking-wider rounded-xl transition-all shadow-md"
      >
        TRIGGER STEP DISTURBANCE (TEST DAMPING RESPONSE)
      </button>
    </div>
  )
}
