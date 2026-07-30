"use client"
import { useEffect, useRef, useState } from 'react'

export default function VisionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visionMode, setVisionMode] = useState<'rgb' | 'depth' | 'thermal'>('rgb')

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

    let rigidBodies = [
      { x: 100, y: 50, vx: 2.5, vy: 1.2, radius: 25, label: 'Robot Manipulator Joint', color: '#00f0ff', conf: '98.6' },
      { x: 260, y: 80, vx: -1.8, vy: 2.1, radius: 30, label: 'Human Worker (Safety)', color: '#ff007f', conf: '92.4' },
      { x: 180, y: 160, vx: 1.5, vy: -1.5, radius: 20, label: 'Target Payload Box', color: '#00ff9d', conf: '99.1' }
    ]

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (visionMode === 'rgb') {
        ctx.fillStyle = '#030816'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else if (visionMode === 'depth') {
        const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 20, canvas.width / 2, canvas.height / 2, 250)
        grad.addColorStop(0, '#00f0ff')
        grad.addColorStop(0.5, '#001a33')
        grad.addColorStop(1, '#000000')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else if (visionMode === 'thermal') {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        grad.addColorStop(0, '#ff007f')
        grad.addColorStop(0.5, '#ffb800')
        grad.addColorStop(1, '#0b001a')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Pseudo-3D Perspective Grid
      ctx.strokeStyle = visionMode === 'thermal' ? 'rgba(255, 184, 0, 0.15)' : 'rgba(0, 240, 255, 0.15)'
      ctx.lineWidth = 1
      const time = Date.now() * 0.001
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      for (let z = 1; z < 15; z++) {
        let scale = 150 / (z + (time % 1))
        let yLine = cy + scale * 10
        if (yLine < canvas.height) {
          ctx.beginPath(); ctx.moveTo(0, yLine); ctx.lineTo(canvas.width, yLine); ctx.stroke()
        }
        let yLineUp = cy - scale * 10
        if (yLineUp > 0) {
          ctx.beginPath(); ctx.moveTo(0, yLineUp); ctx.lineTo(canvas.width, yLineUp); ctx.stroke()
        }
      }
      for (let x = -10; x <= 10; x++) {
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + (x * 200), canvas.height); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + (x * 200), 0); ctx.stroke()
      }

      rigidBodies.forEach((b, idx) => {
        b.vy += 0.15
        b.x += b.vx
        b.y += b.vy

        // Strict Max Velocity Caps (requested by user)
        if (b.vx > 8) b.vx = 8;
        if (b.vx < -8) b.vx = -8;
        if (b.vy > 8) b.vy = 8;
        if (b.vy < -8) b.vy = -8;

        if (b.x - b.radius < 0) { b.x = b.radius; b.vx *= -0.85 }
        if (b.x + b.radius > canvas.width) { b.x = canvas.width - b.radius; b.vx *= -0.85 }
        if (b.y - b.radius < 0) { b.y = b.radius; b.vy *= -0.85 }
        if (b.y + b.radius > canvas.height) { b.y = canvas.height - b.radius; b.vy *= -0.85 }

        for (let j = idx + 1; j < rigidBodies.length; j++) {
          let b2 = rigidBodies[j]
          let dx = b2.x - b.x
          let dy = b2.y - b.y
          let dist = Math.sqrt(dx * dx + dy * dy)
          let minDist = b.radius + b2.radius
          if (dist < minDist && dist > 0.001) {
            let overlap = minDist - dist
            let nx = dx / dist
            let ny = dy / dist
            
            b.x -= nx * overlap * 0.5
            b.y -= ny * overlap * 0.5
            b2.x += nx * overlap * 0.5
            b2.y += ny * overlap * 0.5
            
            let vDiffX = b.vx - b2.vx
            let vDiffY = b.vy - b2.vy
            let dot = vDiffX * nx + vDiffY * ny
            if (dot > 0) {
              let impulse = dot * 0.9
              b.vx -= impulse * nx
              b.vy -= impulse * ny
              b2.vx += impulse * nx
              b2.vy += impulse * ny
            }
          }
        }

        ctx.fillStyle = b.color
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
        ctx.fill()

        const bx = b.x - b.radius - 8
        const by = b.y - b.radius - 8
        const bw = b.radius * 2 + 16
        const bh = b.radius * 2 + 16

        let depth = b.radius * 0.4
        ctx.strokeStyle = b.color
        ctx.lineWidth = 1.5
        
        ctx.strokeRect(bx + depth, by - depth, bw, bh)
        ctx.strokeRect(bx, by, bw, bh)
        
        ctx.beginPath()
        ctx.moveTo(bx, by); ctx.lineTo(bx + depth, by - depth)
        ctx.moveTo(bx + bw, by); ctx.lineTo(bx + bw + depth, by - depth)
        ctx.moveTo(bx, by + bh); ctx.lineTo(bx + depth, by + bh - depth)
        ctx.moveTo(bx + bw, by + bh); ctx.lineTo(bx + bw + depth, by + bh - depth)
        ctx.stroke()

        ctx.fillStyle = b.color
        ctx.fillRect(bx, by - 24, bw + depth, 20)
        ctx.fillStyle = '#000'
        ctx.font = '10px var(--font-orbitron, sans-serif)'
        ctx.fillText(`${b.label} [${b.conf}%]`, bx + 4, by - 10)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', fitCanvas)
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
      <div className="w-full aspect-video border border-cyan-500/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  )
}
