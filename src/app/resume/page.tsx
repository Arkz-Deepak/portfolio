import type { Metadata } from 'next'
import Link from 'next/link'
import { FaDownload, FaExternalLinkAlt, FaFileCode, FaArrowLeft, FaCheckCircle, FaGraduationCap, FaBriefcase, FaCodeBranch, FaBook } from 'react-icons/fa'
import { profileData } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Resume & Curriculum Vitae | Deepak R. | Robotics & Physical AI',
  description: 'Download and view the official 1-page engineering resume and LaTeX source code of Deepak R. (Robotics & Automation, Anna University, CGPA 9.2/10.0). Focus: Physical AI, LeRobot, MuJoCo, ROS 2 Jazzy, and NeuroCode.',
}

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-space">
      {/* Top Navigation Link */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-orbitron font-bold text-blue-700 dark:text-cyan-400 hover:underline"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>BACK TO SYSTEM HOME</span>
        </Link>
        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/40 font-bold flex items-center gap-1.5">
          <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 text-xs" />
          <span>VERIFIED 1-PAGE LATEX MASTER</span>
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] font-orbitron font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-500/50">
            ENGINEERING CURRICULUM VITAE
          </span>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            UPDATED NOVEMBER 2026
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mb-2">
          DEEPAK R. <span className="text-blue-700 dark:text-cyan-400">// RESUME</span>
        </h1>
        <p className="text-sm md:text-base font-semibold text-blue-800 dark:text-cyan-300 max-w-3xl leading-relaxed">
          {profileData.tagline}
        </p>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 rounded-full mt-3 dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-8 backdrop-blur-md">
        <a 
          href="/resume.pdf" 
          download="Deepak_R_Resume.pdf"
          className="px-5 py-2.5 rounded-xl border bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-md dark:bg-emerald-500/20 dark:hover:bg-emerald-400 dark:hover:text-black dark:border-emerald-400 dark:text-emerald-300 font-orbitron font-bold text-xs transition-all flex items-center gap-2"
        >
          <FaDownload className="text-xs" />
          <span>DOWNLOAD RESUME (PDF)</span>
        </a>

        <a 
          href="/resume.tex" 
          download="Deepak_R_Resume.tex"
          className="px-4 py-2.5 rounded-xl border bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm dark:bg-black/60 dark:hover:bg-cyan-950 dark:border-cyan-500/40 dark:text-cyan-300 font-orbitron font-bold text-xs transition-all flex items-center gap-2"
          title="Download 1-Page LaTeX Source Code (.tex)"
        >
          <FaFileCode className="text-xs" />
          <span>LATEX SOURCE (.TEX)</span>
        </a>

        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white font-orbitron font-bold text-xs transition-all flex items-center gap-1.5 ml-auto"
        >
          <span>OPEN IN NEW TAB</span>
          <FaExternalLinkAlt className="text-[10px]" />
        </a>
      </div>

      {/* Embedded Live PDF Document Viewer */}
      <div className="w-full rounded-2xl border bg-white border-slate-200 shadow-xl dark:bg-gray-900/50 dark:border-cyan-500/30 overflow-hidden mb-12">
        <div className="p-3 bg-slate-100 dark:bg-black/60 border-b border-slate-200 dark:border-cyan-500/20 flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-slate-700 dark:text-cyan-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE DOCUMENT VIEWER (PDF RENDERER)
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            XeTeX Engine • 1-Page Format
          </span>
        </div>

        <div className="w-full bg-slate-950 p-2 sm:p-4 flex justify-center items-center">
          <object
            data="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
            type="application/pdf"
            className="w-full h-[750px] sm:h-[900px] md:h-[1050px] rounded-lg border border-slate-800 shadow-2xl"
          >
            {/* Fallback for browsers with no embedded PDF viewer */}
            <div className="p-8 text-center bg-slate-900 text-white rounded-lg">
              <p className="font-orbitron font-bold text-base mb-3 text-cyan-400">
                INLINE PDF PREVIEW NOT SUPPORTED ON THIS BROWSER
              </p>
              <p className="text-xs text-slate-300 mb-6 font-space max-w-md mx-auto">
                Your mobile browser or device cannot render embedded PDF objects directly. Click below to download or view in fullscreen.
              </p>
              <div className="flex justify-center gap-3">
                <a
                  href="/resume.pdf"
                  download="Deepak_R_Resume.pdf"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-orbitron text-xs font-bold"
                >
                  DOWNLOAD PDF
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-orbitron text-xs font-bold"
                >
                  VIEW FULLSCREEN
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>

      {/* Quick Summary Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2 text-blue-700 dark:text-cyan-400 font-orbitron font-bold text-xs">
            <FaGraduationCap className="text-base" />
            <span>ACADEMICS</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            {profileData.degree}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-space">
            {profileData.institution} ({profileData.affiliation})<br />
            <strong className="text-blue-800 dark:text-cyan-300">CGPA: {profileData.cgpa}</strong> • 2024–2028
          </p>
        </div>

        <div className="p-5 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 font-orbitron font-bold text-xs">
            <FaBriefcase className="text-base" />
            <span>INDUSTRY</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            5 Industrial Internships
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-space">
            Wildplant (Frontend 3D, NDA), Precise3DM (AI Lead Gen), Tamizhan Skills (Nav2/ROS 2), Chennai Port, MK Auto.
          </p>
        </div>

        <div className="p-5 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2 text-purple-700 dark:text-purple-400 font-orbitron font-bold text-xs">
            <FaCodeBranch className="text-base" />
            <span>KEY PROJECTS</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Physical AI & Robotics
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-space">
            VGA Manipulation Policy (MuJoCo), NeuroCode (PyPI), AutoTwin-AI, WeldGuard-AI, Hybrid Vortex Crawler.
          </p>
        </div>

        <div className="p-5 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/20">
          <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400 font-orbitron font-bold text-xs">
            <FaBook className="text-base" />
            <span>RESEARCH</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Preprint & Investigation
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-space">
            Zenodo Preprint DOI: 10.5281/zenodo.20265628 (MARL Traffic Optimization) & AURA Acoustic-Visual Nav.
          </p>
        </div>
      </div>
    </main>
  )
}
