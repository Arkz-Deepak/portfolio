"use client"
import { useEffect, useRef, useState } from 'react'

export default function VisionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visionMode, setVisionMode] = useState<'rgb' | 'depth' | 'thermal'>('rgb')
  const mousePos = useRef({ x: 250, y: 150 })
  const [activeTarget, setActiveTarget] = useState<{
    id: number
    label: string
    confidence: string
    distance: string
    status: 'TRACKING' | 'SEARCHING'
  }>({
    id: 0,
    label: 'SEARCHING...',
    confidence: '0.0%',
    distance: '0.00m',
    status: 'SEARCHING'
  })

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
      const h = Math.floor(rect.height > 0 ? rect.height : (parent.clientHeight || 300))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    fitCanvas()

    const resizeObserver = new ResizeObserver(() => {
      fitCanvas()
    })
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    window.addEventListener('resize', fitCanvas)

    let animationFrameId: number

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
      mousePos.current.x = clientX - rect.left
      mousePos.current.y = clientY - rect.top
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('touchmove', handleMouseMove, { passive: false })
    canvas.addEventListener('touchstart', handleMouseMove, { passive: false })

    const targetRatios = [
      { rx: 0.3, ry: 0.4, w: 60, h: 40, label: 'vehicle_sedan', id: 1 },
      { rx: 0.6, ry: 0.7, w: 80, h: 50, label: 'vehicle_suv', id: 2 },
      { rx: 0.78, ry: 0.3, w: 22, h: 22, label: 'person', id: 3 },
      { rx: 0.22, ry: 0.75, w: 70, h: 45, label: 'vehicle_truck', id: 4 },
      { rx: 0.5, ry: 0.48, w: 25, h: 25, label: 'person', id: 5 },
    ]

    const render = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        fitCanvas()
      }

      const cw = canvas.width || 500
      const ch = canvas.height || 300

      ctx.clearRect(0, 0, cw, ch)

      // Drone Crosshair
      const { x: mx, y: my } = mousePos.current
      ctx.strokeStyle = visionMode === 'thermal' ? '#ff007f' : '#00f0ff'
      ctx.lineWidth = 1.5

      ctx.beginPath()
      ctx.arc(mx, my, 35, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(mx, my - 50); ctx.lineTo(mx, my + 50)
      ctx.moveTo(mx - 50, my); ctx.lineTo(mx + 50, my)
      ctx.stroke()

      let closestTarget = null

      targetRatios.forEach(t => {
        const drift = Math.sin(Date.now() * 0.001 + t.id) * 0.5
        const tx = cw * t.rx + drift * 5
        const ty = ch * t.ry + drift * 3

        const dx = mx - tx
        const dy = my - ty
        const dist = Math.sqrt(dx * dx + dy * dy)

        let color = 'rgba(255, 255, 255, 0.4)'
        let boxColor = 'rgba(255, 255, 255, 0.08)'

        if (dist < 90) {
          color = visionMode === 'thermal' ? '#ff007f' : '#00ff9d'
          boxColor = visionMode === 'thermal' ? 'rgba(255, 0, 127, 0.2)' : 'rgba(0, 255, 157, 0.2)'

          const confVal = (92 + (t.id * 1.5)).toFixed(1)
          const distVal = (dist * 0.03).toFixed(2)
          closestTarget = {
            id: t.id,
            label: t.label.toUpperCase(),
            confidence: `${confVal}%`,
            distance: `${distVal}m`,
            status: 'TRACKING' as const
          }

          ctx.strokeStyle = color
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(mx, my)
          ctx.lineTo(tx, ty)
          ctx.stroke()
          ctx.setLineDash([])
        }

        ctx.strokeStyle = color
        ctx.fillStyle = boxColor
        ctx.lineWidth = 2

        const bx = tx - t.w / 2
        const by = ty - t.h / 2
        ctx.fillRect(bx, by, t.w, t.h)

        const l = 8
        ctx.beginPath()
        ctx.moveTo(bx, by + l); ctx.lineTo(bx, by); ctx.lineTo(bx + l, by)
        ctx.moveTo(bx + t.w - l, by); ctx.lineTo(bx + t.w, by); ctx.lineTo(bx + t.w, by + l)
        ctx.moveTo(bx, by + t.h - l); ctx.lineTo(bx, by + t.h); ctx.lineTo(bx + l, by + t.h)
        ctx.moveTo(bx + t.w - l, by + t.h); ctx.lineTo(bx + t.w, by + t.h); ctx.lineTo(bx + t.w, by + t.h - l)
        ctx.stroke()

        ctx.fillStyle = color
        ctx.font = '10px monospace'
        ctx.fillText(`${t.label} (id:${t.id})`, bx, by - 5)
      })

      if (closestTarget) {
        setActiveTarget(closestTarget)
      } else {
        setActiveTarget({
          id: 0,
          label: 'SEARCHING AREA...',
          confidence: '---',
          distance: '---',
          status: 'SEARCHING'
        })
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', fitCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('touchmove', handleMouseMove)
      canvas.removeEventListener('touchstart', handleMouseMove)
    }
  }, [visionMode])

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Mode Selector Buttons */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2">
          {(['rgb', 'depth', 'thermal'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setVisionMode(mode)}
              className={`px-3 py-1.5 text-xs font-bold font-orbitron border rounded transition-all ${
                visionMode === mode 
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                  : 'bg-black/40 border-cyan-900 text-cyan-600 hover:border-cyan-500 hover:text-cyan-400'
              }`}
            >
              {mode.toUpperCase()} PIPELINE
            </button>
          ))}
        </div>
        <span className="text-[11px] font-mono text-cyan-400/80 font-bold">
          [ INFERENCE ENGINE: YOLOv8-NANO ]
        </span>
      </div>

      {/* Main Canvas View with Realistic Background Image */}
      <div className="w-full aspect-video border border-cyan-500/30 rounded-lg overflow-hidden bg-black/80 backdrop-blur relative min-h-[220px]">
        {/* Realistic Urban Street Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80" 
          alt="Urban Street Traffic Scene Visual Context"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 pointer-events-none ${
            visionMode === 'rgb' 
              ? 'opacity-65 contrast-110' 
              : visionMode === 'depth' 
              ? 'opacity-40 grayscale contrast-200 blur-[1px]' 
              : 'opacity-40 sepia hue-rotate-180 contrast-200'
          }`}
        />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-40"></div>
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair relative z-20 block" />
      </div>

      {/* Terminal Readout & Legend Overlay Panel */}
      <div className="bg-black/70 border border-cyan-500/30 rounded-lg p-4 font-mono text-xs">
        <div className="flex justify-between items-center mb-2 pb-2 border-b border-cyan-500/20">
          <span className="text-cyan-400 font-bold font-orbitron">
            💡 SIMULATION INSTRUCTIONS & LEGEND
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            activeTarget.status === 'TRACKING' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
          }`}>
            {activeTarget.status}
          </span>
        </div>

        <p className="text-gray-300 text-[11px] mb-3 leading-relaxed">
          Hover or move your cursor across the canvas to simulate YOLOv8 bounding box detection, real-time confidence scores, and stereo depth perception on urban street traffic.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-900/60 p-3 rounded border border-cyan-500/20">
          <div>
            <span className="text-cyan-500 text-[10px] block font-orbitron">TARGET IDENT:</span>
            <span className="text-white font-bold text-xs">{activeTarget.label}</span>
          </div>
          <div>
            <span className="text-cyan-500 text-[10px] block font-orbitron">YOLO CONFIDENCE:</span>
            <span className="text-emerald-400 font-bold text-xs">{activeTarget.confidence}</span>
          </div>
          <div>
            <span className="text-cyan-500 text-[10px] block font-orbitron">ESTIMATED DEPTH:</span>
            <span className="text-cyan-300 font-bold text-xs">{activeTarget.distance}</span>
          </div>
          <div>
            <span className="text-cyan-500 text-[10px] block font-orbitron">STREAM MODE:</span>
            <span className="text-amber-400 font-bold text-xs">{visionMode.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
