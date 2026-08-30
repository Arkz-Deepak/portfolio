import React from 'react'
import { 
  PythonLogo, 
  CppLogo, 
  UbuntuLogo, 
  RosLogo, 
  OpenCVLogo, 
  PyTorchLogo 
} from '@/components/TechLogos'
import { profileData } from '@/data/profile'
import { skillsData } from '@/data/skills'
import SkillsSection from '@/components/SkillsSection'

export const metadata = {
  title: 'About System Identity | Deepak R.',
  description: 'Biography, Academic background, and Tech Stack of Deepak R. (B.E. Robotics & Automation, Anna University).',
}

export default function AboutPage() {
  const techStack = [
    { name: 'Python', category: 'Core Language & AI Engine', logo: <PythonLogo className="w-9 h-9" /> },
    { name: 'C++', category: 'Real-Time Control & Embedded', logo: <CppLogo className="w-9 h-9" /> },
    { name: 'Ubuntu Linux', category: 'Bare-Metal OS Environment', logo: <UbuntuLogo className="w-9 h-9" /> },
    { name: 'ROS 2 Jazzy', category: 'Robotics Middleware & Nav2', logo: <RosLogo className="w-9 h-9" /> },
    { name: 'OpenCV', category: 'Computer Vision Pipeline', logo: <OpenCVLogo className="w-9 h-9" /> },
    { name: 'PyTorch / TF', category: 'Edge AI & Deep Learning', logo: <PyTorchLogo className="w-9 h-9" /> },
  ]

  return (
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400">
      <div className="text-center mb-12">
        <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
          ENGINEERING DOSSIER
        </span>
        <h1 className="text-4xl md:text-6xl font-black font-orbitron mb-2 text-slate-900 dark:text-white">
          SYSTEM <span className="text-blue-700 dark:text-cyan-400">IDENTITY</span>
        </h1>
        <p className="text-xs md:text-sm font-space tracking-widest uppercase text-slate-600 dark:text-cyan-300 font-semibold">
          Academic Background, Research Focus & Comprehensive Technical Stack
        </p>
        <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        {/* Left Card: Biography */}
        <div className="lg:col-span-6 border p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-md transition-colors bg-white border-slate-200 shadow-xl dark:bg-gray-900/60 dark:border-cyan-500/30 dark:shadow-[0_0_25px_rgba(0,240,255,0.05)]">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 flex-shrink-0 border-blue-700 shadow-md dark:border-cyan-400 dark:shadow-[0_0_15px_#00f0ff]">
                <img 
                  src={profileData.avatarUrl} 
                  alt={profileData.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono tracking-widest text-amber-700 dark:text-cyan-400 font-semibold">
                  [ DEEPAK-OS :: VERIFIED ]
                </span>
                <h2 className="text-2xl md:text-3xl font-black font-orbitron text-slate-900 dark:text-white">
                  DEEPAK R.
                </h2>
                <p className="text-xs md:text-sm font-space text-blue-900 dark:text-cyan-200 font-bold">
                  {profileData.tagline}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs md:text-sm font-space leading-relaxed text-slate-700 dark:text-gray-300">
              <p className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                {profileData.bioSummary}
              </p>
              <p className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                🎓 <strong>Academic standing:</strong> {profileData.degree} at {profileData.institution} ({profileData.affiliation}), maintaining a cumulative CGPA of <strong>{profileData.cgpa}</strong>.
              </p>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t flex flex-wrap justify-between items-center text-xs font-mono gap-2 border-slate-200 text-blue-900 dark:border-cyan-500/20 dark:text-cyan-400 font-semibold">
            <span>INSTITUTION: DHAANISH AHMED COLLEGE</span>
            <span>AFFILIATION: ANNA UNIVERSITY</span>
          </div>
        </div>

        {/* Right Card: Authentic Tech Stack Grid */}
        <div className="lg:col-span-6 border p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-md transition-colors bg-white border-slate-200 shadow-xl dark:bg-gray-900/60 dark:border-cyan-500/30 dark:shadow-[0_0_25px_rgba(0,240,255,0.05)]">
          <div>
            <h3 className="text-xl font-orbitron font-bold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="text-amber-600 dark:text-cyan-400">⚡</span> CORE ROBOTICS & ML STACK
            </h3>
            <p className="text-xs font-mono mb-6 text-slate-500 dark:text-cyan-400/80 font-semibold">
              [ AUTHENTIC HARDWARE & SOFTWARE ECOSYSTEM ]
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <div 
                  key={tech.name}
                  className="border p-4 rounded-xl transition-all duration-300 group flex flex-col justify-between bg-slate-50 border-slate-200 hover:border-blue-400 hover:shadow-md dark:bg-black/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform">
                    {tech.logo}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-orbitron transition-colors text-slate-900 group-hover:text-blue-800 dark:text-white dark:group-hover:text-cyan-400">
                      {tech.name}
                    </h4>
                    <p className="text-[10px] font-space mt-0.5 text-slate-500 dark:text-cyan-400/70 font-medium">
                      {tech.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-center border-slate-200 dark:border-cyan-500/20">
            <span className="text-xs font-orbitron tracking-widest text-amber-700 dark:text-cyan-400 font-bold">
              [ REAL-TIME CONTROL & EMBEDDED PERCEPTION ]
            </span>
          </div>
        </div>
      </div>

      {/* Full Categorized Skills Matrix */}
      <div className="w-full mt-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-black font-orbitron text-slate-900 dark:text-white">
            DETAILED <span className="text-blue-700 dark:text-cyan-400">SKILL DOMAINS</span>
          </h3>
          <div className="h-1 w-20 mx-auto mt-2 rounded-full bg-blue-600 dark:bg-cyan-400" />
        </div>
        <SkillsSection />
      </div>
    </main>
  )
}
