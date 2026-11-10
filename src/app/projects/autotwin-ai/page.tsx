import type { Metadata } from 'next'
import { projectsData } from '@/data/projects'
import Link from 'next/link'
import { FaArrowLeft, FaCheck, FaBrain, FaCamera, FaEye, FaChartLine, FaRobot, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import PresentationViewer from '@/components/PresentationViewer'

export const metadata: Metadata = {
  title: 'AutoTwin-AI: Automotive Chassis Digital Twin & Structural Defect Detection | Case Study | Deepak R.',
  description: 'AI-powered digital twin and visual inspection platform for vehicle ladder-frame chassis assemblies combining Blender Cycles OptiX synthetic CAD data, PyTorch convolutional autoencoders, and React Three Fiber 3D WebGL cockpit.',
}

export default function AutoTwinProject() {
  const project = projectsData.find((p) => p.id === 'autotwin-ai') || projectsData[1]

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-5xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-space">
      {/* Back Link */}
      <Link 
        href="/projects" 
        className="inline-flex items-center gap-2 text-xs font-orbitron font-bold text-blue-700 dark:text-cyan-400 mb-6 hover:underline"
      >
        <FaArrowLeft className="text-[10px]" />
        <span>BACK TO ARCHIVES</span>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] font-orbitron font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-500/50">
            AUTOMOTIVE CHASSIS INSPECTION & DIGITAL TWIN
          </span>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            {project.date}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mb-2">
          {project.title}
        </h1>
        <p className="text-sm md:text-base font-semibold text-blue-800 dark:text-cyan-300 mb-4">
          {project.subtitle}
        </p>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      {/* Action Links Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-md"
          >
            <FaGithub className="text-xs" />
            <span>VIEW GITHUB REPOSITORY</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}
        {project.docsUrl && (
          <a
            href={project.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-400 dark:hover:text-black font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
          >
            <span>LIVE JEKYLL DOCS</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300 font-orbitron font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
          >
            <span>HACKNIMA PITCH DECK</span>
            <span className="text-[10px]">↗</span>
          </a>
        )}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 font-mono text-xs">
        {project.stats?.map((stat, idx) => (
          <div 
            key={idx} 
            className="p-3 rounded-xl border bg-white border-slate-200 shadow-sm dark:bg-gray-900/60 dark:border-cyan-900/60 flex flex-col"
          >
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-orbitron uppercase">
              {stat.label}
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-cyan-300 mt-1">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Visual Showcase 1: Autoencoder Reconstruction & Anomaly Heatmap */}
      <section className="mb-12 p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/50 dark:border-cyan-500/30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-lg md:text-xl font-bold font-orbitron text-slate-900 dark:text-white">
              AI STRUCTURAL ANOMALY DETECTION & RECONSTRUCTION HEATMAP
            </h2>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-blue-300 dark:border-cyan-500/40">
            PYTORCH CONV AUTOENCODER
          </span>
        </div>
        
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-cyan-500/40 bg-black shadow-lg p-2">
          <img
            src="/images/projects/autotwin-reconstruction-analysis.png"
            alt="AutoTwin-AI Convolutional Autoencoder Reconstruction and Residual Error Anomaly Heatmap"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
        <p className="text-xs font-space text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          The trained PyTorch Convolutional Autoencoder reconstructs baseline nominal vehicle chassis joints and isolates physical anomalies via high-intensity residual error heatmaps (|I - Î|). Structural flaws such as weld slag, spatter bursts, and porosity voids produce immediate divergence spikes.
        </p>
      </section>

      {/* Visual Showcase 2: True Structural CAD Joint Mapping */}
      <section className="mb-12 p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/50 dark:border-cyan-500/30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-lg md:text-xl font-bold font-orbitron text-slate-900 dark:text-white">
              VEHICLE LADDER-FRAME CHASSIS & CAD JOINT MAPPING
            </h2>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40">
            361,174 CAD VERTICES
          </span>
        </div>
        
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-cyan-500/40 bg-black shadow-lg p-2">
          <img
            src="/images/projects/autotwin-chassis-top-view.png"
            alt="Full Top View of Vehicle Ladder-Frame Chassis and True CAD Structural Joint"
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>
        <p className="text-xs font-space text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          Top-down orthographic and isometric chassis mapping generated in Blender Cycles (OptiX Ray-Tracing Engine). High-density 3D spatial voxel clustering isolates structural load-bearing suspension junctions across 361,174 CAD vertices, enabling automated sensor framing and defect localization.
        </p>
      </section>

      {/* Embedded HackNIMA Pitch Deck */}
      <PresentationViewer
        title="AutoTwin-AI: Automotive Chassis Digital Twin Presentation"
        embedUrl="https://docs.google.com/presentation/d/1sPcQ4e1_jjpj0JXypPtbesnlkwDpOdKaJvuFtlF2hcU/embed?start=false&loop=false&delayms=3000"
        sourceUrl="https://docs.google.com/presentation/d/1sPcQ4e1_jjpj0JXypPtbesnlkwDpOdKaJvuFtlF2hcU/edit"
        competition="HackNIMA 2026 International Online Hackathon (Finalist Presentation)"
        defaultOpen={false}
      />

      {/* Synthetic Generation & Autoencoder Architecture */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <FaBrain className="text-blue-600 dark:text-cyan-400" />
          SYNTHETIC CAD PIPELINE & CONVOLUTIONAL AUTOENCODER
        </h2>
        <p className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-gray-300 mb-4">
          Training vision models on physical vehicle chassis defects typically requires months of destructive testing. AutoTwin-AI solves this through an automated synthetic generation pipeline in Blender Cycles with OptiX GPU acceleration:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <span className="font-orbitron font-bold text-xs text-blue-700 dark:text-cyan-400 block mb-1">
              BLENDER CYCLES OPTIX PIPELINE
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Generates 5,000+ domain-randomized photorealistic training frames with procedural lighting, metallic PBR roughness, camera angles, and synthetic weld slag injection.
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/40">
            <span className="font-orbitron font-bold text-xs text-blue-700 dark:text-cyan-400 block mb-1">
              RESIDUAL ANOMALY ISOLATION
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Trained exclusively on nominal structural joints; anomalous spatter and porosity produce intense reconstruction residuals (|I - Î|) flagged in under 42ms.
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Highlights */}
      <div className="p-6 rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30 mb-10">
        <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-3">
          PERFORMANCE BENCHMARKS & DIGITAL TWIN DEPLOYMENT
        </h2>
        <ul className="list-disc list-inside text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-2">
          {project.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-slate-100 text-slate-800 border border-slate-300 dark:bg-slate-950 dark:text-cyan-400 dark:border-cyan-900"
          >
            {tech}
          </span>
        ))}
      </div>
    </main>
  )
}
