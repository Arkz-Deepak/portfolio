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
      'ROLE: Robotics & Automation Engineering Student | Physical AI & Sim-to-Real Digital Twins.',
      'INSTITUTION: Dhaanish Ahmed College of Engineering (Anna University) | CGPA: 9.2/10.0.',
      'SPECIALIZATION: ROS 2 Jazzy, Nav2, SLAM Toolbox, PyTorch Autoencoders, Computer Vision, Embedded RTOS.'
    ]
  },
  {
    id: 'skills',
    label: '> EXECUTE SKILLS_LIST',
    command: 'execute skills_list',
    output: [
      'CORE LANGUAGES: Python, C++, C, Rust, Bash, SQL, JavaScript.',
      'ROBOTICS & SIMULATION: ROS 2 Jazzy, Nav2, SLAM Toolbox, Gazebo / Ignition, MoveIt 2, URDF/Xacro, BCD Coverage.',
      'AI & COMPUTER VISION: PyTorch, Autoencoders, YOLOv8/v11, OpenCV, MediaPipe, Blender OptiX, Multi-Agent RL.',
      'EMBEDDED & HARDWARE: Raspberry Pi 4, ESP32 (FreeRTOS), BTS7960 H-Bridges, Arduino, OpenPLC.'
    ]
  },
  {
    id: 'projects',
    label: '> LIST PROJECTS',
    command: 'list projects',
    output: [
      '• SIH 2026: Orbital ADR Autonomous Space Debris Cleaner (Active Debris Removal, Electroadhesive capture).',
      '• EdgeVision NPU Profiler: Bare-metal Qualcomm NPU evaluation testbench (iQOO Hackathon Grand Finale).',
      '• AutoTwin-AI v2: Spatiotemporal ConvLSTM Robotic Welding Inspection & 3D Digital Twin (HackNIMA 2026).',
      '• Hybrid Vortex Crawler: 45N Active Vortex EDF Wall-Climber (NeX-Gen Robotics 2026 | IDREA).',
      '• OOMWOO: Autonomous Robot Vacuum System (ROS 2 Jazzy, Nav2, Boustrophedon Coverage Planning).'
    ]
  },
  {
    id: 'experience',
    label: '> SHOW EXPERIENCE',
    command: 'show experience',
    output: [
      '1. Wildplant Terrestrial Solutions: Frontend & 3D Web Development Intern (Three.js/WebGL - Under NDA).',
      '2. Precise3DM: AI & Data Engineering Intern (Gemini API, Google Maps API, Playwright/Selenium).',
      '3. Tamizhan Skills (RISE): AI & Autonomous Systems Intern (ROS 2 Nav2, Sensor Fusion in Gazebo).',
      '4. Chennai Port Authority: Industrial Engineering Intern (Diesel Powertrains & Industrial PLCs).',
      '5. MK Autocomponents: Industrial Automation Intern (CNC/VMC Machining).'
    ]
  },
  {
    id: 'research',
    label: '> SHOW RESEARCH',
    command: 'show research',
    output: [
      '📄 PREPRINT (Aug 2026): "Sensor-Fusion Driven Deep RL for Dynamic Traffic Signal Optimization".',
      '   DOI: 10.5281/zenodo.20265628 (Indexed on Zenodo).',
      '🔬 IN PROGRESS: AURA (Acoustic-visual Urban Routing Architecture for AMRs).'
    ]
  },
  {
    id: 'certs',
    label: '> DISPLAY CERTIFICATIONS',
    command: 'display certifications',
    output: [
      '✔ Karthikesh Robotics: 20-Day ROS 2 Industrial Program (Nav2, SLAM, Jazzy)',
      '✔ IBM SkillsBuild: Advanced Python & Machine Learning Track',
      '✔ The Construct Institute: Linux Basics for Robotics',
      '✔ IBM SkillsBuild: AI Fundamentals'
    ]
  },
  {
    id: 'contact',
    label: '> TRANSMIT CONTACT_INFO',
    command: 'transmit contact_info',
    output: [
      'EMAIL: deepak121289@outlook.com',
      'PORTFOLIO: https://www.deepak-arkz.me',
      'GITHUB: https://github.com/Arkz-Deepak',
      'LINKEDIN: https://www.linkedin.com/in/robotics-deepak/',
      'LOCATION: Chennai, Tamil Nadu, India'
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

    // Special commands & Easter eggs
    if (cmd === 'help') {
      typeWriterOutput([
        'DEEPAK.OS TERMINAL HELP DIRECTIVES:',
        '• Directives: whoami, skills, projects, experience, research, certs, contact, clear',
        '• Easter Eggs: try "easteregg", "matrix", "sudo", "arkz", "cat", "robot"',
        '• Click any directive button above for instant telemetry.'
      ])
      return
    }

    if (cmd === 'easteregg' || cmd === 'egg') {
      typeWriterOutput([
        '🥚 [EASTER EGG DETECTED]',
        'Reviewer: "Is the interactive 3D Digital Twin the Easter egg?!"',
        'DEEPAK.OS: "The 3D CAD viewer is standard engineering rigor. The real Easter egg is here in the terminal!"',
        'Bonus triggers unlocked: try typing "matrix", "sudo", "arkz", "cat", or "robot"!'
      ])
      return
    }

    if (cmd === 'matrix') {
      typeWriterOutput([
        'Wake up, Neo...',
        'Follow the white rabbit. 🐇',
        '01000100 01000101 01000101 01010000 01000001 01001011 (D-E-E-P-A-K)',
        '[DEEPAK.OS KERNEL]: Physical AI & Autonomous Robotics Systems Online.'
      ])
      return
    }

    if (cmd === 'sudo') {
      typeWriterOutput([
        'root@deepak-os:~$ sudo rm -rf /',
        'ACCESS DENIED: User "visitor" is not in the sudoers file.',
        'This incident has been logged and reported to Deepak R.'
      ])
      return
    }

    if (cmd === 'arkz') {
      typeWriterOutput([
        '   _   ___  _  ______',
        '  /_\ | _ \\| |/ /_  /',
        ' / _ \\|   /| \' < / / ',
        '/_/ \\_\\_|_\\_|_|\\_\\/___|',
        'ARKZ LABS :: Autonomous Robotics, Kinematics & Zero-G Orbital Systems.'
      ])
      return
    }

    if (cmd === 'cat') {
      typeWriterOutput([
        '(=^･ω･^=) Robotic Quadruped / Cat node online.',
        'CAN bus heartbeat: Nominal. Ultrasonic whiskers: Active. Purring at 45Hz.'
      ])
      return
    }

    if (cmd === 'robot') {
      typeWriterOutput([
        '🤖 [HYBRID VORTEX CRAWLER TELEMETRY]',
        'Hold-down Force: 45N Active Vortex EDF LOCKED.',
        'Tread Actuation: 4x 164 RPM Planetary Motors Nominal.',
        'Surface Orientation: Vertical Steel Wall (Pitch: 90.0°).'
      ])
      return
    }

    const matchedPreset = PRESET_QUERIES.find(
      p => p.command === cmd || p.id === cmd || p.label.toLowerCase().includes(cmd)
    )

    if (matchedPreset) {
      typeWriterOutput(matchedPreset.output)
    } else {
      typeWriterOutput([
        `COMMAND UNRECOGNIZED: "${rawInput}"`,
        'TYPE "help" TO VIEW ALL DIRECTIVES & EASTER EGGS, OR CLICK A PRESET ABOVE.'
      ])
    }
  }

  return (
    <div className="w-full max-w-3xl bg-white border border-slate-300 rounded-xl backdrop-blur-md overflow-hidden font-space flex flex-col h-[480px] shadow-lg dark:bg-black/90 dark:border-cyan-500/40 dark:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-colors duration-300">
      {/* Terminal Title Bar */}
      <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between dark:bg-cyan-950/60 dark:border-cyan-500/30">
        <span className="text-blue-900 dark:text-cyan-400 text-xs font-orbitron font-bold tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          DEEPAK-OS :: INTERACTIVE TERMINAL
        </span>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Preset Directive Buttons */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2 dark:bg-black/60 dark:border-cyan-500/20">
        {PRESET_QUERIES.map((preset) => (
          <button
            key={preset.id}
            onClick={() => runPresetQuery(preset)}
            disabled={isTyping}
            className="px-2.5 py-1 text-[11px] font-mono rounded border transition-all bg-white border-slate-300 text-slate-800 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 dark:bg-cyan-950/40 dark:border-cyan-500/40 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black dark:hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Console Display */}
      <div className="flex-1 p-4 overflow-y-auto text-xs md:text-sm font-mono space-y-1 bg-slate-950 text-cyan-300 dark:bg-transparent">
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
      <form onSubmit={handleCommandSubmit} className="p-3 border-t border-slate-200 dark:border-cyan-500/30 flex items-center bg-slate-900 dark:bg-black/80 gap-2">
        <span className="text-cyan-400 font-bold">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          className="bg-transparent border-none outline-none text-cyan-300 text-base sm:text-xs md:text-sm flex-1 placeholder-cyan-700 font-mono"
          placeholder="TYPE DIRECTIVE (e.g., 'help', 'easteregg', 'whoami')..."
          autoComplete="off"
          spellCheck="false"
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white dark:bg-cyan-500/20 dark:border dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black font-orbitron text-xs font-bold rounded transition-colors disabled:opacity-50"
        >
          EXECUTE
        </button>
      </form>

      {/* Interactive Command Suggestion Bar */}
      <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between flex-wrap gap-1">
        <span className="text-cyan-400/90 font-semibold">💡 DIRECTIVES & SECRETS:</span>
        <div className="flex gap-1.5 flex-wrap">
          {['help', 'whoami', 'projects', 'easteregg', 'matrix', 'clear'].map((hint) => (
            <button
              key={hint}
              type="button"
              onClick={() => setInput(hint)}
              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {hint}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
