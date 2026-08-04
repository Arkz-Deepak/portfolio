import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Operational History | Deepak R.',
  description: 'Internships and Industrial Experience timeline.',
}

export default function InternshipsPage() {
  const experiences = [
    {
      id: 'precise3dm',
      title: 'Precise3DM',
      role: 'Intern',
      domain: '[ 3D SCANNING & METROLOGY ]',
      description: '3D Scan Based Solutions & Metrology inspection pipelines.',
    },
    {
      id: 'tamizhan-skills',
      title: 'Tamizhan Skills',
      role: 'RISE AI Intern',
      domain: '[ AUTONOMOUS SYSTEMS & AI ]',
      description: 'RISE AI for Autonomous Systems Intern (Computer Vision, YOLOv8, Path Planning).',
    },
    {
      id: 'codealpha',
      title: 'CodeAlpha',
      role: 'ML Intern',
      domain: '[ MACHINE LEARNING PIPELINES ]',
      description: 'Development of machine learning models using XGBoost, CNNs, and PyTorch.',
    },
    {
      id: 'chennai-port',
      title: 'Chennai Port Authority',
      role: 'Vocational Inplant Trainee',
      domain: '[ HEAVY MACHINERY & EDP ]',
      description: 'Vocational Inplant Training (Locomotives, Diesel Engines, Mechanical/Electrical EDP).',
    },
    {
      id: 'karthikesh',
      title: 'KarthiKesh Robotics',
      role: 'Robotics Trainee',
      domain: '[ ADVANCED ROS 2 SPRINT ]',
      description: '20-Day Industrial Career Uplifting Program (Advanced ROS 2 & Autonomous Navigation).',
    },
    {
      id: 'mk-auto',
      title: 'MK Auto Components',
      role: 'Industrial Intern',
      domain: '[ CNC / VMC MANUFACTURING ]',
      description: 'CNC/VMC Operations, Cold Forging, Casting & precision manufacturing.',
    },
    {
      id: 'kodacy',
      title: 'Kodacy',
      role: 'Virtual Robotics Intern',
      domain: '[ VIRTUAL ROBOTICS SPRINT ]',
      description: '15-Day Virtual Robotics Intern focusing on embedded systems & robotics simulations.',
    },
  ]

  return (
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-black text-slate-900 dark:text-cyan-400">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-slate-900 dark:text-white mb-3">
          FIELD <span className="text-blue-700 dark:text-cyan-400">OPERATIONS</span>
        </h1>
        <p className="text-xs md:text-sm font-space text-slate-600 dark:text-cyan-300 tracking-widest uppercase font-semibold">Complete Industrial & Internship Timeline</p>
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
                <span className="text-xs font-mono text-amber-700 dark:text-cyan-400 font-bold">0{index + 1} :: EXP</span>
                <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40 font-semibold">{exp.role}</span>
              </div>
              <h3 className="text-xl font-bold font-orbitron text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400 transition-colors mb-1">{exp.title}</h3>
              <p className="text-xs font-orbitron text-amber-700 dark:text-cyan-400/80 mb-4 font-semibold">{exp.domain}</p>
              <p className="text-sm font-space text-slate-600 dark:text-gray-300 leading-relaxed">{exp.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-cyan-500/20 text-right">
              <span className="text-xs font-mono text-slate-400 dark:text-cyan-400/60 font-semibold">VERIFIED ENTRY</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
