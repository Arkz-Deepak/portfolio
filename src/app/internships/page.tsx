import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Operational History | Deepak R.',
  description: 'Internships and Industrial Experience timeline.',
}

export default function InternshipsPage() {
  const experiences = [
    {
      id: 'mk-auto',
      title: 'MK Autocomponents',
      role: 'Industrial Intern',
      domain: '[ MANUFACTURING & CNC/VMC ]',
      description: '15-day Industrial Manufacturing Internship focusing on CNC/VMC Operations, Cold Forging, Casting & precision manufacturing.',
    },
    {
      id: 'novitech',
      title: 'Novi Tech',
      role: 'Web Dev Trainee',
      domain: '[ FULL-STACK WEB DEV ]',
      description: '30-day Basic Full-Stack Web Dev Course covering HTML, CSS, JavaScript, and responsive UI fundamentals.',
    },
    {
      id: 'build-a-bot',
      title: 'Build-a-Bot Hackathon',
      role: 'Hackathon Contender',
      domain: '[ AI & POLICY AUTOMATION ]',
      description: 'Developed an automated Scholarship Policy Compliance Bot for anomaly detection and eligibility filtering.',
    },
    {
      id: 'cyber-hackathon',
      title: 'Cyber Hackathon v4',
      role: 'Pitch Specialist',
      domain: '[ DEEPFAKE DETECTION ]',
      description: 'Designed and pitched an AI-driven multi-modal Deepfake Detection platform for media authenticity.',
    },
    {
      id: 'mechamind',
      title: 'MechaMind Labs',
      role: 'Robotics Accelerator',
      domain: '[ HANDS-ON ROBOTICS ]',
      description: 'Hands-on Robotics Accelerator program mastering ROS 2 Jazzy, Gazebo Harmonic, and skid-steer navigation.',
    },
    {
      id: 'infosys-springboard',
      title: 'Infosys Springboard',
      role: 'AI Intern & Certified',
      domain: '[ INTERNSHIP 7.0 & GEN AI ]',
      description: 'Completed Internship 7.0 alongside Generative AI & Deep Learning certification programs.',
    },
    {
      id: 'aura-research',
      title: 'AURA Research',
      role: 'Lead Researcher',
      domain: '[ PUBLISHED PAPER ]',
      description: 'Published paper on Acoustic-visual Urban Routing Architecture (AURA) using DRL & SUMO traffic simulation.',
    },
  ]

  return (
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-slate-900 dark:text-white mb-3">
          CHRONOLOGICAL <span className="text-blue-700 dark:text-cyan-400">TIMELINE</span>
        </h1>
        <p className="text-xs md:text-sm font-space text-slate-600 dark:text-cyan-300 tracking-widest uppercase font-semibold">
          Industrial Internships, Hackathons & Key Milestones
        </p>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 mx-auto mt-3 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp, index) => (
          <div 
            key={exp.id} 
            className="border p-6 rounded-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between group bg-white border-slate-200 shadow-md hover:shadow-lg dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-amber-700 dark:text-cyan-400 font-bold">0{index + 1} :: MILESTONE</span>
                <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40 font-semibold">{exp.role}</span>
              </div>
              <h3 className="text-xl font-bold font-orbitron text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400 transition-colors mb-1">{exp.title}</h3>
              <p className="text-xs font-orbitron text-amber-700 dark:text-cyan-400/80 mb-4 font-semibold">{exp.domain}</p>
              <p className="text-sm font-space text-slate-600 dark:text-gray-300 leading-relaxed">{exp.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-cyan-500/20 text-right">
              <span className="text-xs font-mono text-slate-400 dark:text-cyan-400/60 font-semibold">VERIFIED MILESTONE</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
