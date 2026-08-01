"use client"
import { useEffect, useRef, useState } from 'react'

export default function VisionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visionMode, setVisionMode] = useState<'rgb' | 'depth' | 'thermal'>('rgb')
  const mousePos = useRef({ x: 400, y: 300 })

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

    // Simulated targets on the ground
    const targets = [
      { x: canvas.width * 0.3, y: canvas.height * 0.4, w: 60, h: 40, label: 'vehicle_sedan', id: 1 },
      { x: canvas.width * 0.6, y: canvas.height * 0.7, w: 80, h: 50, label: 'vehicle_suv', id: 2 },
      { x: canvas.width * 0.8, y: canvas.height * 0.3, w: 20, h: 20, label: 'person', id: 3 },
      { x: canvas.width * 0.2, y: canvas.height * 0.8, w: 70, h: 45, label: 'vehicle_truck', id: 4 },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, w: 25, h: 25, label: 'person', id: 5 },
    ]

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (e.type === 'touchmove') e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      let clientX, clientY
      if (window.TouchEvent && e instanceof TouchEvent) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
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

    const drawGrid = (color: string) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw Drone Feed Background
      if (visionMode === 'rgb') {
        ctx.fillStyle = '#0a101d'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawGrid('rgba(0, 240, 255, 0.05)')
      } else if (visionMode === 'depth') {
        const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 50, canvas.width/2, canvas.height/2, canvas.width)
        grad.addColorStop(0, '#001a33')
        grad.addColorStop(1, '#000000')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawGrid('rgba(0, 240, 255, 0.1)')
      } else if (visionMode === 'thermal') {
        ctx.fillStyle = '#1a001a'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawGrid('rgba(255, 0, 127, 0.05)')
      }

      // Draw Drone Crosshair
      const { x: mx, y: my } = mousePos.current
      ctx.strokeStyle = visionMode === 'thermal' ? '#ff007f' : '#00f0ff'
      ctx.lineWidth = 1.5
      
      ctx.beginPath()
      ctx.arc(mx, my, 40, 0, Math.PI * 2)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(mx, my - 60); ctx.lineTo(mx, my + 60)
      ctx.moveTo(mx - 60, my); ctx.lineTo(mx + 60, my)
      ctx.stroke()

      // Calculate targeting and draw boxes
      let lockedOn = false
      let telemetryData = 'SEARCHING...'

      targets.forEach(t => {
        // Move targets slightly to simulate camera drift or target movement
        const drift = Math.sin(Date.now() * 0.001 + t.id) * 0.5
        t.x += drift * 0.2
        t.y += drift * 0.1

        const dx = mx - t.x
        const dy = my - t.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        
        let color = 'rgba(255, 255, 255, 0.2)'
        let boxColor = 'rgba(255, 255, 255, 0.1)'
        
        if (dist < 100) {
          // Locked On
          color = visionMode === 'thermal' ? '#ff007f' : '#00ff9d'
          boxColor = visionMode === 'thermal' ? 'rgba(255, 0, 127, 0.2)' : 'rgba(0, 255, 157, 0.2)'
          lockedOn = true
          
          const confidence = (90 + Math.random() * 9).toFixed(1)
          telemetryData = `TRK ID: ${t.id} | TYPE: ${t.label.toUpperCase()} | CONF: ${confidence}% | DIST: ${dist.toFixed(1)}m`
          
          // Draw targeting lines from crosshair to object
          ctx.strokeStyle = color
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(mx, my)
          ctx.lineTo(t.x, t.y)
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Draw bounding box
        ctx.strokeStyle = color
        ctx.fillStyle = boxColor
        ctx.lineWidth = 2
        
        const bx = t.x - t.w/2
        const by = t.y - t.h/2
        ctx.fillRect(bx, by, t.w, t.h)
        
        // Draw corners
        const l = 10
        ctx.beginPath()
        ctx.moveTo(bx, by + l); ctx.lineTo(bx, by); ctx.lineTo(bx + l, by)
        ctx.moveTo(bx + t.w - l, by); ctx.lineTo(bx + t.w, by); ctx.lineTo(bx + t.w, by + l)
        ctx.moveTo(bx, by + t.h - l); ctx.lineTo(bx, by + t.h); ctx.lineTo(bx + l, by + t.h)
        ctx.moveTo(bx + t.w - l, by + t.h); ctx.lineTo(bx + t.w, by + t.h); ctx.lineTo(bx + t.w, by + t.h - l)
        ctx.stroke()

        if (dist < 100) {
          ctx.fillStyle = color
          ctx.font = '10px var(--font-orbitron, sans-serif)'
          ctx.fillText(t.label, bx, by - 5)
        }
      })

      // Draw HUD
      ctx.fillStyle = lockedOn ? (visionMode === 'thermal' ? '#ff007f' : '#00ff9d') : '#00f0ff'
      ctx.font = '12px var(--font-space, sans-serif)'
      ctx.fillText(`MODE: ${visionMode.toUpperCase()}`, 20, 30)
      ctx.fillText(`STATUS: ${lockedOn ? 'TRACKING' : 'IDLE'}`, 20, 50)
      ctx.fillText(telemetryData, 20, 70)
      
      // Fake noise
      if (Math.random() < 0.1) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, 2)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
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
      <div className="w-full aspect-video border border-cyan-500/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur relative">
        {/* CRT Scanline effect overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-40"></div>
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair relative z-0" />
      </div>
    </div>
  )
}
