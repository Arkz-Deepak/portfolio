import type { Metadata } from 'next'
import FeaturedProjects from '@/components/FeaturedProjects'
import ResearchSection from '@/components/ResearchSection'
import Certifications from '@/components/Certifications'

export const metadata: Metadata = {
  title: 'Engineering Archives & Research | Deepak R.',
  description: 'Projects, Digital Twins, Robotics Hardware, and Peer-Reviewed Preprints by Deepak R.',
}

export default function ProjectsPage() {
  return (
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400">
      <div className="text-center mb-12">
        <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
          OPEN-SOURCE & HARDWARE REPOSITORIES
        </span>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mb-2">
          ENGINEERING <span className="text-blue-700 dark:text-cyan-400">ARCHIVES</span>
        </h1>
        <p className="text-xs md:text-sm font-space text-slate-600 dark:text-cyan-300 tracking-widest uppercase font-semibold">
          Autonomous Mobile Robots, Sim-to-Real Digital Twins, and Embedded Hardware Systems
        </p>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 mx-auto mt-3 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      {/* Automated Documentation Hub Banner */}
      <div className="mb-12 p-5 rounded-2xl border border-emerald-300 bg-emerald-50/80 dark:border-emerald-500/40 dark:bg-black/60 shadow-md backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/30 flex items-center justify-center text-2xl shrink-0">
            📚
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:border dark:border-emerald-500/50">
                17+ ACTIVE REPOSITORIES
              </span>
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-cyan-300">
                lab.deepak-arkz.me
              </span>
            </div>
            <h2 className="text-sm md:text-base font-bold font-orbitron text-slate-900 dark:text-white">
              AUTOMATED JEKYLL DOCUMENTATION ECOSYSTEM
            </h2>
            <p className="text-xs font-space text-slate-600 dark:text-slate-300 max-w-2xl mt-0.5">
              Every production ROS 2 package, space robotics model, and edge AI pipeline is accompanied by automated architectural specifications and deployment blueprints hosted under our custom engineering documentation hub.
            </p>
          </div>
        </div>

        <a
          href="https://lab.deepak-arkz.me"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 dark:border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-400 dark:hover:text-black font-orbitron font-bold text-xs tracking-wider transition-all shadow-md flex items-center gap-2 shrink-0"
        >
          <span>OPEN LAB HUB</span>
          <span>↗</span>
        </a>
      </div>

      {/* Featured Projects Grid */}
      <div className="mb-20">
        <FeaturedProjects />
      </div>

      {/* Research & Publications Section */}
      <div className="pt-12 border-t border-slate-200 dark:border-cyan-500/20 mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
            SCHOLARLY PREPRINTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-slate-900 dark:text-white mb-2">
            RESEARCH & <span className="text-blue-700 dark:text-cyan-400">PUBLICATIONS</span>
          </h2>
          <p className="text-xs md:text-sm font-space text-slate-600 dark:text-cyan-300 tracking-widest uppercase font-semibold">
            Indexed Preprints, DOI Registrations & Multi-Agent RL Formulations
          </p>
          <div className="h-1 w-20 bg-blue-600 dark:bg-cyan-400 mx-auto mt-3 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
        </div>
        <ResearchSection />
      </div>

      {/* Certifications Section */}
      <div className="pt-12 border-t border-slate-200 dark:border-cyan-500/20">
        <div className="text-center mb-10">
          <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
            VERIFIED CREDENTIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-slate-900 dark:text-white mb-2">
            TECHNICAL <span className="text-blue-700 dark:text-cyan-400">LICENSES & CERTIFICATIONS</span>
          </h2>
          <p className="text-xs md:text-sm font-space text-slate-600 dark:text-cyan-300 tracking-widest uppercase font-semibold">
            Industrial Robotics Career Programs, IBM Machine Learning & Linux Systems
          </p>
          <div className="h-1 w-20 bg-blue-600 dark:bg-cyan-400 mx-auto mt-3 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
        </div>
        <Certifications />
      </div>
    </main>
  )
}
