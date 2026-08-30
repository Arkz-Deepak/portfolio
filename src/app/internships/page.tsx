import type { Metadata } from 'next'
import { experienceData } from '@/data/experience'
import { FaShieldAlt, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Operational History & Industrial Internships | Deepak R.',
  description: 'Chronological timeline of industrial internships and robotics engineering experience by Deepak R.',
}

export default function InternshipsPage() {
  return (
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400">
      <div className="text-center mb-12">
        <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
          CHRONOLOGICAL LOGS
        </span>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mb-2">
          OPERATIONAL <span className="text-blue-700 dark:text-cyan-400">TIMELINE</span>
        </h1>
        <p className="text-xs md:text-sm font-space text-slate-600 dark:text-cyan-300 tracking-widest uppercase font-semibold">
          AI & Robotics Internships, Industrial Engineering Roles & Key Milestones
        </p>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 mx-auto mt-3 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-space">
        {experienceData.map((exp, index) => (
          <div 
            key={exp.id} 
            className="border p-6 rounded-2xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-full group bg-white border-slate-200 shadow-md hover:shadow-xl dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400"
          >
            <div>
              <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                <span className="text-xs font-mono text-amber-700 dark:text-cyan-400 font-bold">
                  {index < 9 ? `0${index + 1}` : index + 1} :: MILESTONE
                </span>
                {exp.ndaProtected ? (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/60 dark:border-rose-500/40 dark:text-rose-300 flex items-center gap-1">
                    <FaShieldAlt className="text-[9px]" />
                    NDA PROTECTED
                  </span>
                ) : (
                  <span className="text-[10px] font-orbitron border px-2 py-0.5 rounded bg-blue-50 text-blue-800 border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40 font-semibold">
                    {exp.role}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold font-orbitron text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400 transition-colors mb-1">
                {exp.company}
              </h3>

              <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] font-mono text-blue-900 dark:text-cyan-300 font-semibold">
                <span className="bg-slate-100 dark:bg-black/40 px-2 py-0.5 rounded border border-slate-200 dark:border-cyan-900 flex items-center gap-1">
                  <FaCalendarAlt className="text-[10px]" />
                  {exp.period}
                </span>
                <span className="bg-slate-100 dark:bg-black/40 px-2 py-0.5 rounded border border-slate-200 dark:border-cyan-900 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[10px]" />
                  {exp.location} ({exp.locationType})
                </span>
              </div>

              <p className="text-xs font-orbitron text-amber-700 dark:text-cyan-400 mb-3 font-semibold">
                [ {exp.domainTag.toUpperCase()} ]
              </p>

              {exp.ndaNotice && (
                <p className="text-[11px] font-mono italic text-rose-700 dark:text-rose-400 mb-3 bg-rose-50 dark:bg-rose-950/30 p-2 rounded border border-rose-200 dark:border-rose-900/50">
                  ⚠️ {exp.ndaNotice}
                </p>
              )}

              <ul className="list-disc list-inside text-xs md:text-sm text-slate-600 dark:text-gray-300 leading-relaxed space-y-1.5 mb-4">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx}>{resp}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-cyan-500/20 flex flex-wrap gap-1.5">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-black/50 dark:text-cyan-300 dark:border-cyan-900"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
