"use client"
import React from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { 
  PythonLogo, 
  CppLogo, 
  UbuntuLogo, 
  RosLogo, 
  OpenCVLogo, 
  PyTorchLogo, 
  TensorFlowLogo 
} from '@/components/TechLogos'

export default function AboutPage() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const techStack = [
    { name: 'Python', category: 'Core Language & AI Engine', logo: <PythonLogo className="w-9 h-9" /> },
    { name: 'C++', category: 'Real-Time Control & Embedded', logo: <CppLogo className="w-9 h-9" /> },
    { name: 'Ubuntu Linux', category: 'Bare-Metal OS Environment', logo: <UbuntuLogo className="w-9 h-9" /> },
    { name: 'ROS 2 Jazzy', category: 'Robotics Middleware & Nav2', logo: <RosLogo className="w-9 h-9" /> },
    { name: 'OpenCV', category: 'Computer Vision Pipeline', logo: <OpenCVLogo className="w-9 h-9" /> },
    { name: 'PyTorch / TF', category: 'Edge AI & Deep Learning', logo: <PyTorchLogo className="w-9 h-9" /> },
  ]

  return (
    <main className={`min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center transition-colors duration-300 ${
      isDark ? 'text-cyan-400' : 'text-slate-900'
    }`}>
      <div className="text-center mb-12">
        <h1 className={`text-4xl md:text-6xl font-black font-orbitron mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          SYSTEM <span className={isDark ? 'text-cyan-400' : 'text-blue-700'}>IDENTITY</span>
        </h1>
        <p className={`text-xs md:text-sm font-space tracking-widest uppercase ${isDark ? 'text-cyan-300' : 'text-slate-600 font-semibold'}`}>
          Academic Background & Technical Stack
        </p>
        <div className={`h-1 w-24 mx-auto mt-3 rounded-full ${isDark ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-blue-600'}`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Card: Biography */}
        <div className={`lg:col-span-6 border p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-md transition-colors ${
          isDark 
            ? 'bg-gray-900/60 border-cyan-500/30 shadow-[0_0_25px_rgba(0,240,255,0.05)]' 
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 flex-shrink-0 ${
                isDark ? 'border-cyan-400 shadow-[0_0_15px_#00f0ff]' : 'border-blue-700 shadow-md'
              }`}>
                <img src="/profile.jpg" alt="Deepak R." className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className={`text-xs font-mono tracking-widest ${isDark ? 'text-cyan-400' : 'text-amber-700 font-semibold'}`}>
                  [ DEEPAK-OS :: VERIFIED ]
                </span>
                <h2 className={`text-2xl md:text-3xl font-black font-orbitron ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  DEEPAK R.
                </h2>
                <p className={`text-xs md:text-sm font-space ${isDark ? 'text-cyan-200' : 'text-blue-900 font-bold'}`}>
                  Robotics & Automation Engineer
                </p>
              </div>
            </div>

            <p className={`text-sm md:text-base font-space leading-relaxed p-5 rounded-xl border mb-6 ${
              isDark 
                ? 'text-gray-300 bg-black/50 border-cyan-500/20' 
                : 'text-slate-700 bg-slate-50 border-slate-200'
            }`}>
              I am Deepak R., an undergraduate Robotics & Automation student at Dhaanish Ahmed College of Engineering. I specialize in ROS 2, autonomous navigation, and edge AI, building everything from bare-metal Ubuntu setups to full Nav2 stacks.
            </p>
          </div>

          <div className={`pt-4 border-t flex flex-wrap justify-between items-center text-xs font-mono gap-2 ${
            isDark ? 'border-cyan-500/20 text-cyan-400' : 'border-slate-200 text-blue-900 font-semibold'
          }`}>
            <span>INSTITUTION: DHAANISH AHMED COLLEGE</span>
            <span>STATUS: ACTIVE UNDERGRADUATE</span>
          </div>
        </div>

        {/* Right Card: Authentic Tech Stack Grid */}
        <div className={`lg:col-span-6 border p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-md transition-colors ${
          isDark 
            ? 'bg-gray-900/60 border-cyan-500/30 shadow-[0_0_25px_rgba(0,240,255,0.05)]' 
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div>
            <h3 className={`text-xl font-orbitron font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className={isDark ? 'text-cyan-400' : 'text-amber-600'}>⚡</span> CORE ROBOTICS & ML STACK
            </h3>
            <p className={`text-xs font-mono mb-6 ${isDark ? 'text-cyan-400/80' : 'text-slate-500 font-semibold'}`}>
              [ AUTHENTIC HARDWARE & SOFTWARE ECOSYSTEM ]
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <div 
                  key={tech.name}
                  className={`border p-4 rounded-xl transition-all duration-300 group flex flex-col justify-between ${
                    isDark 
                      ? 'bg-black/60 border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                      : 'bg-slate-50 border-slate-200 hover:border-blue-400 hover:shadow-md'
                  }`}
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform">
                    {tech.logo}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold font-orbitron transition-colors ${
                      isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-900 group-hover:text-blue-800'
                    }`}>
                      {tech.name}
                    </h4>
                    <p className={`text-[10px] font-space mt-0.5 ${isDark ? 'text-cyan-400/70' : 'text-slate-500 font-medium'}`}>
                      {tech.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`mt-6 pt-4 border-t text-center ${
            isDark ? 'border-cyan-500/20' : 'border-slate-200'
          }`}>
            <span className={`text-xs font-orbitron tracking-widest ${
              isDark ? 'text-cyan-400' : 'text-amber-700 font-bold'
            }`}>
              [ REAL-TIME CONTROL & EMBEDDED PERCEPTION ]
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
