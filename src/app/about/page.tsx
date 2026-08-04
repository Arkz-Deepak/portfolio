import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About System Identity | Deepak R.',
  description: 'Biography, Academic background, and Tech Stack of Deepak R.',
}

export default function AboutPage() {
  const techStack = [
    { name: 'Python', category: 'Core Language', icon: '🐍' },
    { name: 'C++', category: 'Core Language', icon: '⚡' },
    { name: 'ROS 2 Jazzy', category: 'Robotics Middleware', icon: '🤖' },
    { name: 'Gazebo Harmonic', category: 'Physics Simulation', icon: '🌐' },
    { name: 'OpenCV', category: 'Computer Vision', icon: '👁️' },
    { name: 'YOLO', category: 'Edge Perception', icon: '🎯' },
    { name: 'Tailwind CSS', category: 'Frontend Styling', icon: '🎨' },
  ]

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black font-orbitron text-white mb-3">
          SYSTEM <span className="text-cyan-400">IDENTITY</span>
        </h1>
        <p className="text-xs md:text-sm font-space text-cyan-300 tracking-widest uppercase">Academic Background & Technical Stack</p>
        <div className="h-1 w-24 bg-cyan-400 mx-auto mt-3 rounded-full shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Card: Biography */}
        <div className="lg:col-span-6 bg-gray-900/60 border border-cyan-500/30 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-[0_0_25px_rgba(0,240,255,0.05)]">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_#00f0ff] flex-shrink-0">
                <img src="/profile.jpg" alt="Deepak R." className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-cyan-400 tracking-widest">[ DEEPAK-OS :: VERIFIED ]</span>
                <h2 className="text-2xl md:text-3xl font-black font-orbitron text-white">DEEPAK R.</h2>
                <p className="text-xs md:text-sm font-space text-cyan-200">Robotics & Automation Engineer</p>
              </div>
            </div>

            <p className="text-sm md:text-base font-space text-gray-300 leading-relaxed bg-black/50 p-5 rounded-xl border border-cyan-500/20 mb-6">
              I am Deepak R., an undergraduate Robotics & Automation student at Dhaanish Ahmed College of Engineering. I specialize in ROS 2, autonomous navigation, and edge AI, building everything from bare-metal Ubuntu setups to full Nav2 stacks.
            </p>
          </div>

          <div className="pt-4 border-t border-cyan-500/20 flex flex-wrap justify-between items-center text-xs font-mono text-cyan-400 gap-2">
            <span>INSTITUTION: DHAANISH AHMED COLLEGE</span>
            <span>STATUS: ACTIVE UNDERGRADUATE</span>
          </div>
        </div>

        {/* Right Card: Glowing Tech Stack Grid */}
        <div className="lg:col-span-6 bg-gray-900/60 border border-cyan-500/30 p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-[0_0_25px_rgba(0,240,255,0.05)]">
          <div>
            <h3 className="text-xl font-orbitron font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-cyan-400">⚡</span> CORE TECH STACK
            </h3>
            <p className="text-xs font-mono text-cyan-400/80 mb-6">[ HARDWARE & SOFTWARE TOOLKIT ]</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {techStack.map((tech) => (
                <div 
                  key={tech.name}
                  className="bg-black/60 border border-cyan-500/30 hover:border-cyan-400 p-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] group flex flex-col justify-between"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{tech.icon}</div>
                  <div>
                    <h4 className="text-xs font-bold font-orbitron text-white group-hover:text-cyan-400 transition-colors">{tech.name}</h4>
                    <p className="text-[10px] font-space text-cyan-400/70">{tech.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-cyan-500/20 text-center">
            <span className="text-xs font-orbitron text-cyan-400 tracking-widest">
              [ REAL-TIME CONTROL & EMBEDDED PERCEPTION ]
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
