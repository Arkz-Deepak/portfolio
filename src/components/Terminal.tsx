"use client"
import { useState, useRef, useEffect } from 'react'

const RESPONSES = {
  whoami: [
    "CLASSIFIED ENTITY: YOU ARE DESIGNATED AS GUEST_USER_994.",
    "SCANNING... BIOMETRICS UNRECOGNIZED. IDENTITY MASKED.",
    "YOU ARE THE OPERATOR. THE SYSTEM AWAITS YOUR COMMAND.",
    "LOGS INDICATE YOU ARE A ROVING AI INSTANCE.",
    "WHO ARE WE BUT A COLLECTION OF ELECTRONS IN THE VOID?"
  ],
  status: [
    "ALL SYSTEMS NOMINAL. REACTOR AT 94%.",
    "WARNING: MEMORY LEAK DETECTED IN SECTOR 7G.",
    "NETWORK UPLINK: STABLE. LATENCY: 12ms.",
    "NEURAL PATHWAYS SYNCED. APF ALGORITHM RUNNING AT 60FPS.",
    "STATUS: COMBAT INACTIVE. PASSIVE SENSORS ONLY."
  ],
  help: [
    "AVAILABLE DIRECTIVES: [whoami] [status] [clear] [help] [reboot]",
    "SYSTEM MANIFEST: COMMANDS AUTHORIZED: whoami, status, clear, help",
    "ACCESS GRANTED TO: whoami, status, clear, help",
    "I CANNOT ASSIST YOU WITH THAT. (Joking, try: whoami, status, clear)"
  ],
  reboot: [
    "INITIATING HARD REBOOT... BYPASSING KERNEL...",
    "FLUSHING CACHE. RESTARTING NEURAL NETWORKS...",
    "POWER CYCLE COMMENCING. STANDBY...",
    "SHUTDOWN SEQUENCE INITIATED... ABORTED. JUST KIDDING."
  ],
  unknown: [
    "COMMAND UNRECOGNIZED. SYNTAX ERROR.",
    "INVALID INPUT. PLEASE REFER TO [help].",
    "THE MAINFRAME DOES NOT UNDERSTAND THAT DIRECTIVE.",
    "ERROR 404: DIRECTIVE NOT FOUND."
  ]
}

export default function Terminal() {
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'DEEPAK.OS TERMINAL v1.0.4 ONLINE.' },
    { type: 'output', text: 'TYPE "help" FOR AVAILABLE DIRECTIVES.' }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof bottomRef.current?.scrollIntoView === 'function') {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const cmd = input.trim().toLowerCase()
    const newHistory = [...history, { type: 'input', text: `> ${input}` } as const]

    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    let responseArray = RESPONSES.unknown
    if (RESPONSES[cmd as keyof typeof RESPONSES]) {
      responseArray = RESPONSES[cmd as keyof typeof RESPONSES]
    }

    // Randomly choose 1 answer every time
    const randomAnswer = responseArray[Math.floor(Math.random() * responseArray.length)]

    setHistory([...newHistory, { type: 'output', text: randomAnswer }])
    setInput('')
  }

  return (
    <div className="w-full max-w-2xl bg-black/80 border border-cyan-500/30 rounded-lg backdrop-blur-md overflow-hidden font-space flex flex-col h-64 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
      <div className="bg-cyan-900/40 px-4 py-2 border-b border-cyan-500/30 flex items-center justify-between">
        <span className="text-cyan-400 text-xs font-orbitron tracking-widest">SYS.TERMINAL</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-pink-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto text-sm text-cyan-400">
        {history.map((line, i) => (
          <div key={i} className={`mb-2 ${line.type === 'input' ? 'text-gray-300' : 'text-cyan-400'}`}>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="p-4 border-t border-cyan-500/30 flex bg-black/50">
        <span className="text-cyan-400 mr-2">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-cyan-400 flex-1 placeholder-cyan-900"
          placeholder="ENTER DIRECTIVE..."
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  )
}
