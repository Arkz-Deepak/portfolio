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
