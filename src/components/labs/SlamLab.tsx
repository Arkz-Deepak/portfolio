"use client"
import { useEffect, useRef, useState } from 'react'

export default function SlamLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [speed, setSpeed] = useState(3.5)
  const cratesRef = useRef([
    { x: 180, y: 60, w: 50, h: 140, vx: 0, vy: 0 },
    { x: 280, y: 190, w: 100, h: 45, vx: 0, vy: 0 }
  ])

  const generateObstacles = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const newCrates = []
    for(let i = 0; i < 5; i++) {
      newCrates.push({
        x: Math.random() * (canvas.width - 100) + 20,
        y: Math.random() * (canvas.height - 100) + 20,
        w: Math.random() * 80 + 30,
        h: Math.random() * 80 + 30,
        vx: 0, vy: 0
      })
    }
    cratesRef.current = newCrates
  }

  const clearObstacles = () => {
    cratesRef.current = []
  }

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

    let robot = {
      x: 90, y: 90, angle: 0,
      vx: 0, vy: 0, omega: 0, friction: 0.88
    }
    let goalPos = { x: 320, y: 220 }

    const handleClick = (e: MouseEvent | TouchEvent) => {
      // Prevent default scrolling when interacting with canvas
      if (e.type === 'touchstart') e.preventDefault()
      
      const rect = canvas.getBoundingClientRect()
      let clientX, clientY
      if (window.TouchEvent && e instanceof TouchEvent) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = (e as MouseEvent).clientX
        clientY = (e as MouseEvent).clientY
      }
      goalPos.x = clientX - rect.left
      goalPos.y = clientY - rect.top
    }
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('touchstart', handleClick, { passive: false })

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Crates Physics (Static)
      cratesRef.current.forEach((c) => {
        c.vx = 0
        c.vy = 0
        ctx.fillStyle = 'rgba(10, 18, 38, 0.9)'
        ctx.strokeStyle = '#00f0ff'
        ctx.lineWidth = 1.5
        ctx.fillRect(c.x, c.y, c.w, c.h)
        ctx.strokeRect(c.x, c.y, c.w, c.h)
      })

      // Robot Navigation
      const dx = goalPos.x - robot.x
      const dy = goalPos.y - robot.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist > 8) {
        let attractiveX = (dx / dist) * 40
        let attractiveY = (dy / dist) * 40
        let repelX = 0
        let repelY = 0
        
        cratesRef.current.forEach(c => {
          let testX = robot.x
          let testY = robot.y
          if (robot.x < c.x) testX = c.x
          else if (robot.x > c.x + c.w) testX = c.x + c.w
          if (robot.y < c.y) testY = c.y
          else if (robot.y > c.y + c.h) testY = c.y + c.h

          let cdx = robot.x - testX
          let cdy = robot.y - testY
          let cdist = Math.sqrt(cdx*cdx + cdy*cdy)
          let safeDist = 60
          
          if (cdist < safeDist) {
            // Prevent division by zero
            if (cdist === 0) {
              cdist = 1; cdx = 1; cdy = 0;
            }
            let force = (safeDist - cdist) * 4.5
            repelX += (cdx / cdist) * force
            repelY += (cdy / cdist) * force
            
            // Tangential (curl) field to slide around obstacles
            let cross = dx * cdy - dy * cdx
            let direction = cross > 0 ? 1 : -1
            repelX += -(cdy / cdist) * force * direction * 2.5
            repelY +=  (cdx / cdist) * force * direction * 2.5
          }
        })
        
        const targetAngle = Math.atan2(attractiveY + repelY, attractiveX + repelX)
        let angleDiff = targetAngle - robot.angle
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2

        robot.omega += angleDiff * 0.08
        robot.omega *= 0.75
        robot.angle += robot.omega

        robot.vx += Math.cos(robot.angle) * speed * 0.4
        robot.vy += Math.sin(robot.angle) * speed * 0.4
      }

      robot.vx *= robot.friction
      robot.vy *= robot.friction
      
      const steps = 4
      const stepVx = robot.vx / steps
      const stepVy = robot.vy / steps

      for (let s = 0; s < steps; s++) {
        robot.x += stepVx
        robot.y += stepVy

        if (robot.x - 14 < 0) { robot.x = 14; robot.vx *= -0.5 }
        if (robot.x + 14 > canvas.width) { robot.x = canvas.width - 14; robot.vx *= -0.5 }
        if (robot.y - 14 < 0) { robot.y = 14; robot.vy *= -0.5 }
        if (robot.y + 14 > canvas.height) { robot.y = canvas.height - 14; robot.vy *= -0.5 }

        cratesRef.current.forEach(c => {
          let testX = robot.x
          let testY = robot.y
          if (robot.x < c.x) testX = c.x
          else if (robot.x > c.x + c.w) testX = c.x + c.w
          if (robot.y < c.y) testY = c.y
          else if (robot.y > c.y + c.h) testY = c.y + c.h

          let distX = robot.x - testX
          let distY = robot.y - testY
          let distance = Math.sqrt(distX*distX + distY*distY)
          
          if (distance <= 14) {
            if (distance === 0) {
              distX = 1
              distY = 0
              distance = 1
            }
            let overlap = 14 - distance
            let nx = distX / distance
            let ny = distY / distance
            robot.x += nx * overlap
            robot.y += ny * overlap
            let dot = robot.vx * nx + robot.vy * ny
            robot.vx -= dot * nx * 1.5
            robot.vy -= dot * ny * 1.5
          }
        })
      }

      // Render Goal
      ctx.fillStyle = 'rgba(0, 255, 157, 0.1)'
      ctx.beginPath()
      ctx.arc(goalPos.x, goalPos.y, 25, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#00ff9d'
      ctx.beginPath()
      ctx.arc(goalPos.x, goalPos.y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#00ff9d'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(goalPos.x, goalPos.y, 15, 0, Math.PI * 2)
      ctx.stroke()

      // Render Robot
      ctx.save()
      ctx.translate(robot.x, robot.y)
      ctx.rotate(robot.angle)
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.arc(0, 0, 14, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#ff007f'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(20, 0)
      ctx.stroke()
      ctx.fillStyle = '#ff007f'
      ctx.fillRect(4, -12, 10, 4)
      ctx.fillRect(4, 8, 10, 4)
      ctx.fillStyle = '#00f0ff'
      ctx.beginPath()
      ctx.arc(5, 0, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', fitCanvas)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('touchstart', handleClick)
    }
  }, [speed])

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full aspect-video border border-cyan-500/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
      </div>
      <div className="w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-grow">
          <label className="text-cyan-400 font-orbitron text-sm whitespace-nowrap">ROBOT SPEED:</label>
          <input 
            type="range" 
            min="1" max="10" step="0.5" 
            value={speed} 
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="flex-grow accent-cyan-400 max-w-[200px]"
          />
          <span className="text-cyan-400 font-space text-sm w-8">{speed}x</span>
        </div>
        <div className="flex gap-2">
          <button onClick={generateObstacles} className="px-4 py-2 bg-cyan-900/40 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors font-orbitron text-xs">
            GENERATE OBS
          </button>
          <button onClick={clearObstacles} className="px-4 py-2 bg-pink-900/40 border border-pink-500/50 text-pink-400 hover:bg-pink-500 hover:text-black transition-colors font-orbitron text-xs">
            CLEAR
          </button>
        </div>
      </div>
    </div>
  )
}
