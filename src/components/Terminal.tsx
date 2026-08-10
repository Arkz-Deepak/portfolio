"use client"
import { useState, useRef, useEffect } from 'react'

interface QueryPreset {
  id: string
  label: string
  command: string
  output: string[]
}

const PRESET_QUERIES: QueryPreset[] = [
  {
    id: 'whoami',
    label: '> WHOAMI',
    command: 'whoami',
    output: [
      'IDENTITY: Deepak R.',
      'ROLE: Autonomous Systems Architect & Robotics Engineer.',
      'INSTITUTION: Dhaanish Ahmed College of Engineering.',
      'SPECIALIZATION: ROS 2 Jazzy, YOLO Vision, Skid-Steer Nav2, Edge AI.'
    ]
  },
  {
    id: 'skills',
    label: '> EXECUTE SKILLS_LIST',
    command: 'execute skills_list',
    output: [
      'CORE LANGUAGES: Python, C++, Bash Shell, SQL.',
      'ROBOTICS MIDDLEWARE: ROS 2 Jazzy, SLAM Toolbox, Nav2, Gazebo Harmonic.',
      'PERCEPTION & ML: YOLOv8, OpenCV, PyTorch, Scikit-Learn, SUMO.',
      'HARDWARE & EMBEDDED: STM32, Arduino, ESP32, LiDAR, CNC/VMC.'
    ]
  },
  {
    id: 'ros2',
    label: '> INITIATE ROS2_STACK',
    command: 'initiate ros2_stack',
    output: [
      '[ROS2_NODE]: Telemetry pub/sub initialized at 50Hz.',
      '[NAV2_MAP]: EKF Sensor fusion active (LiDAR + Wheel Odometry).',
      '[PATH_PLANNING]: APF & Dynamic Window Approach (DWA) loaded.',
      'STATUS: AUTONOMOUS ROVER NAVIGATION ACTIVE.'
    ]
  },
  {
    id: 'experience',
    label: '> SHOW EXPERIENCE',
    command: 'show experience',
    output: [
      '1. Wildplant Terrestrial Solutions: Artificial Intelligence Intern (Jul 2026 - Present).',
      '2. KarthiKesh Robotics: 20-Day ROS 2 Industrial Program (Aug 2026).',
      '3. Precise3DM: Artificial Intelligence Intern - Data Engineering (Jun 2026 - Jul 2026).',
      '4. Tamizhan Skills: AI for Autonomous System Intern - RISE Program (Dec 2025).',
      '5. Kodacy: Robotics Intern (Dec 2025).',
      '6. Chennai Port Authority: Engineering Intern (Dec 2025).',
      '7. MK Autocomponents: Industrial Manufacturing Intern - CNC/VMC (15-Days).',
      '8. Build-a-Bot Hackathon: Scholarship Policy Compliance Bot.',
      '9. Cyber Hackathon v4: Deepfake Detection Pitch.',
      '10. AURA Research: Published Acoustic-visual Urban Routing Architecture paper.',
      '11. Infosys Springboard: Internship 7.0 & Generative AI Certified.',
      '12. Novi Tech: 30-day Full-Stack Web Development Course.'
    ]
  },
  {
    id: 'projects',
    label: '> LIST PROJECTS',
    command: 'list projects',
    output: [
      '• VisionX (AURA): RL & SUMO Traffic Signal Optimization.',
      '• Autonomous ROS 2 Rover: Skid-Steer Nav2 & EKF Sensor Fusion.',
      '• CV Autonomous Robot: OpenCV & PD Line Following.',
      '• Reactive Evasion Rover: 360° LiDAR Scan Slicing in Gazebo.',
      '• Hybrid AI Scholarship Bot: Isolation Forest Anomaly Detection.'
    ]
  },
  {
    id: 'certs',
    label: '> DISPLAY CERTIFICATIONS',
    command: 'display certifications',
    output: [
      '✔ IBM SkillsBuild: AI Fundamentals & Advanced Data Analysis',
      '✔ Cisco Networking Academy: Computer Hardware Basics',
      '✔ NPTEL: Industrial Robotics & Joy of Computing with Python',
      '✔ NoviTech: Full Stack Web Development'
    ]
  },
  {
    id: 'contact',
    label: '> TRANSMIT CONTACT_INFO',
    command: 'transmit contact_info',
    output: [
      'EMAIL: wssedd18@gmail.com',
      'GITHUB: https://github.com/Arkz-Deepak',
      'LINKEDIN: https://linkedin.com/in/deepak-r',
      'LOCATION: Chennai, India'
    ]
  }
]

export default function Terminal() {
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'DEEPAK.OS TERMINAL v2.0.4 ONLINE.' },
    { type: 'output', text: 'SELECT A PRESET QUERY DIRECTIVE BELOW OR TYPE A COMMAND.' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof bottomRef.current?.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history, isTyping])

  const typeWriterOutput = (lines: string[]) => {
    setIsTyping(true)
    let lineIdx = 0

    const printNextLine = () => {
      if (lineIdx < lines.length) {
        const text = lines[lineIdx]
        setHistory(prev => [...prev, { type: 'output', text }])
        lineIdx++
        setTimeout(printNextLine, 120)
      } else {
        setIsTyping(false)
      }
    }

    setTimeout(printNextLine, 100)
  }

  const runPresetQuery = (preset: QueryPreset) => {
    if (isTyping) return
    setHistory(prev => [...prev, { type: 'input', text: preset.label }])
    typeWriterOutput(preset.output)
  }

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const rawInput = input.trim()
    const cmd = rawInput.toLowerCase()
    setInput('')

    if (cmd === 'clear') {
      setHistory([])
      return
    }

    setHistory(prev => [...prev, { type: 'input', text: `> ${rawInput}` }])

    const matchedPreset = PRESET_QUERIES.find(
      p => p.command === cmd || p.id === cmd || p.label.toLowerCase().includes(cmd)
    )

    if (matchedPreset) {
      typeWriterOutput(matchedPreset.output)
    } else {
      typeWriterOutput([
        `COMMAND UNRECOGNIZED: "${rawInput}"`,
        'TYPE "help" OR CLICK ONE OF THE 7 PRESET QUERY BUTTONS BELOW.'
      ])
    }
  }

  return (
    <div className="w-full max-w-3xl bg-black/90 border border-cyan-500/40 rounded-xl backdrop-blur-md overflow-hidden font-space flex flex-col h-[480px] shadow-[0_0_25px_rgba(0,240,255,0.15)]">
      {/* Terminal Title Bar */}
      <div className="bg-cyan-950/60 px-4 py-2.5 border-b border-cyan-500/30 flex items-center justify-between">
        <span className="text-cyan-400 text-xs font-orbitron font-bold tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          DEEPAK-OS :: INTERACTIVE TERMINAL
        </span>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Preset Directive Buttons */}
      <div className="p-3 bg-black/60 border-b border-cyan-500/20 flex flex-wrap gap-2">
        {PRESET_QUERIES.map((preset) => (
          <button
            key={preset.id}
            onClick={() => runPresetQuery(preset)}
            disabled={isTyping}
            className="px-2.5 py-1 text-[11px] font-mono rounded border transition-all bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Console Display */}
      <div className="flex-1 p-4 overflow-y-auto text-xs md:text-sm font-mono space-y-1 text-cyan-300">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'input' ? 'text-amber-400 font-bold' : 'text-cyan-300 leading-relaxed'}>
            {line.text}
          </div>
        ))}
        {isTyping && (
          <div className="text-emerald-400 animate-pulse text-xs font-mono">
            [ PROCESSING DIRECTIVE STREAM... ]
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Command Input Bar */}
      <form onSubmit={handleCommandSubmit} className="p-3 border-t border-cyan-500/30 flex items-center bg-black/80 gap-2">
        <span className="text-cyan-400 font-bold">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          className="bg-transparent border-none outline-none text-cyan-300 text-xs md:text-sm flex-1 placeholder-cyan-800 font-mono"
          placeholder="TYPE DIRECTIVE OR CLICK PRESET ABOVE..."
          autoComplete="off"
          spellCheck="false"
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="px-3 py-1 bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black font-orbitron text-xs rounded transition-colors disabled:opacity-50"
        >
          EXECUTE
        </button>
      </form>
    </div>
  )
}
