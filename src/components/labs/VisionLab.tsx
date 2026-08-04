"use client"
import { useEffect, useRef, useState } from 'react'

export default function VisionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visionMode, setVisionMode] = useState<'rgb' | 'depth' | 'thermal'>('rgb')
  const mousePos = useRef({ x: 250, y: 150 })

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

    const drawGrid = (color: string, cw: number, ch: number) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      for (let x = 0; x < cw; x += 50) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke()
      }
      for (let y = 0; y < ch; y += 50) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke()
      }
    }

    // Dynamic targets ratio relative to canvas size
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

      // Draw Drone Feed Background
      if (visionMode === 'rgb') {
        ctx.fillStyle = '#0a101d'
        ctx.fillRect(0, 0, cw, ch)
        drawGrid('rgba(0, 240, 255, 0.05)', cw, ch)
      } else if (visionMode === 'depth') {
        const grad = ctx.createRadialGradient(cw / 2, ch / 2, 50, cw / 2, ch / 2, cw)
        grad.addColorStop(0, '#001a33')
        grad.addColorStop(1, '#000000')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, cw, ch)
        drawGrid('rgba(0, 240, 255, 0.1)', cw, ch)
      } else if (visionMode === 'thermal') {
        ctx.fillStyle = '#1a001a'
        ctx.fillRect(0, 0, cw, ch)
        drawGrid('rgba(255, 0, 127, 0.05)', cw, ch)
      }

      // Draw Drone Crosshair
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

      // Calculate targeting and draw boxes
      let lockedOn = false
      let telemetryData = 'SEARCHING...'

      targetRatios.forEach(t => {
        const drift = Math.sin(Date.now() * 0.001 + t.id) * 0.5
        const tx = cw * t.rx + drift * 5
        const ty = ch * t.ry + drift * 3

        const dx = mx - tx
        const dy = my - ty
        const dist = Math.sqrt(dx * dx + dy * dy)

        let color = 'rgba(255, 255, 255, 0.25)'
        let boxColor = 'rgba(255, 255, 255, 0.08)'

        if (dist < 90) {
          color = visionMode === 'thermal' ? '#ff007f' : '#00ff9d'
          boxColor = visionMode === 'thermal' ? 'rgba(255, 0, 127, 0.2)' : 'rgba(0, 255, 157, 0.2)'
          lockedOn = true

          const confidence = (90 + Math.random() * 9).toFixed(1)
          telemetryData = `TRK ID: ${t.id} | TYPE: ${t.label.toUpperCase()} | CONF: ${confidence}% | DIST: ${dist.toFixed(1)}m`

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

        if (dist < 90) {
          ctx.fillStyle = color
          ctx.font = '10px sans-serif'
          ctx.fillText(t.label, bx, by - 5)
        }
      })

      // Draw HUD text
      ctx.fillStyle = lockedOn ? (visionMode === 'thermal' ? '#ff007f' : '#00ff9d') : '#00f0ff'
      ctx.font = '12px sans-serif'
      ctx.fillText(`MODE: ${visionMode.toUpperCase()}`, 15, 25)
      ctx.fillText(`STATUS: ${lockedOn ? 'TRACKING' : 'IDLE'}`, 15, 45)
      ctx.fillText(telemetryData, 15, 65)

      if (Math.random() < 0.08) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
        ctx.fillRect(0, Math.random() * ch, cw, 2)
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
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {(['rgb', 'depth', 'thermal'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setVisionMode(mode)}
            className={`px-4 py-2 text-sm font-bold font-orbitron border ${
              visionMode === mode 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400' 
                : 'bg-transparent border-cyan-900 text-cyan-700 hover:border-cyan-500 hover:text-cyan-500'
            }`}
          >
            {mode.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="w-full aspect-video border border-cyan-500/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur relative min-h-[220px]">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-40"></div>
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair relative z-0 block" />
      </div>
    </div>
  )
}
