import type { Metadata } from 'next'
import { TIMELINE_DATA } from '@/data/timeline'

export const metadata: Metadata = {
  title: 'Operational History | Deepak R.',
  description: 'Internships and Industrial Experience timeline.',
}

export default function InternshipsPage() {
  return (
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-slate-900 dark:text-white mb-3">
          CHRONOLOGICAL <span className="text-blue-700 dark:text-cyan-400">TIMELINE</span>
        </h1>
        <p className="text-xs md:text-sm font-space text-slate-600 dark:text-cyan-300 tracking-widest uppercase font-semibold">
          AI & Robotics Internships, Industrial Experience & Key Milestones
        </p>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 mx-auto mt-3 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {TIMELINE_DATA.map((exp, index) => (
          <div 
            key={exp.id} 
            className="border p-6 rounded-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-full group bg-white border-slate-200 shadow-md hover:shadow-lg dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
          >
            <div>
              <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                <span className="text-xs font-mono text-amber-700 dark:text-cyan-400 font-bold">
                  {index < 9 ? `0${index + 1}` : index + 1} :: MILESTONE
                </span>
                <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40 font-semibold">
                  {exp.role}
                </span>
              </div>

              <h3 className="text-xl font-bold font-orbitron text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400 transition-colors mb-1">
                {exp.title}
              </h3>

              <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] font-mono text-blue-900 dark:text-cyan-300 font-semibold">
                <span className="bg-slate-100 dark:bg-black/40 px-2 py-0.5 rounded border border-slate-200 dark:border-cyan-900">
                  🗓 {exp.period}
                </span>
                {exp.location && (
                  <span className="bg-slate-100 dark:bg-black/40 px-2 py-0.5 rounded border border-slate-200 dark:border-cyan-900">
                    📍 {exp.location}
                  </span>
                )}
              </div>

              <p className="text-xs font-orbitron text-amber-700 dark:text-cyan-400/80 mb-3 font-semibold">
                {exp.domain}
              </p>

              <p className="text-xs md:text-sm font-space text-slate-600 dark:text-gray-300 leading-relaxed">
                {exp.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-cyan-500/20 flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 dark:text-cyan-400/60 font-semibold">VERIFIED RECORD</span>
              <span className="text-blue-600 dark:text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">✓</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
