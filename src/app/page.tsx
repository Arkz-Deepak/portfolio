"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from '@/components/ParticleBackground'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import { profileData } from '@/data/profile'
import { experienceData } from '@/data/experience'
import { certificationsData } from '@/data/certifications'
import FeaturedProjects from '@/components/FeaturedProjects'
import ResearchSection from '@/components/ResearchSection'
import SkillsSection from '@/components/SkillsSection'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight, FaShieldAlt } from 'react-icons/fa'

export default function Home() {
  const [booting, setBooting] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Web3Forms State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('error')
      setStatusMessage('PLEASE FILL OUT ALL TRANSMISSION FIELDS.')
      return
    }

    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    if (!apiKey) {
      setStatus('error')
      setStatusMessage('WEB3FORMS ACCESS KEY MISSING (SET NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY IN .env.local).')
      return
    }

    setStatus('submitting')
    setStatusMessage('ESTABLISHING ENCRYPTED LINK...')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: apiKey,
          subject: `DEEPAK-OS Transmission from ${formState.name}`,
          from_name: 'DEEPAK-OS Portfolio',
          to_email: 'deepak121289@outlook.com',
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      })

      const result = await res.json()
      if (result.success) {
        setStatus('success')
        setStatusMessage('[ TRANSMISSION DELIVERED TO deepak121289@outlook.com ]')
        setFormState({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setStatusMessage(result.message || 'TRANSMISSION FAILED. CHECK NETWORK FREQUENCY.')
      }
    } catch {
      setStatus('error')
      setStatusMessage('SIGNAL INTERRUPTED. PLEASE RETRY AGAIN.')
    }
  }

  if (booting) {
    return (
      <div className="h-[100dvh] w-full max-w-[100vw] overflow-x-hidden flex flex-col items-center justify-center font-orbitron transition-colors bg-slate-50 dark:bg-slate-950 text-blue-900 dark:text-cyan-400">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="text-xl md:text-2xl tracking-widest text-center px-4"
        >
          INITIALIZING DEEPAK.OS V2.0...
        </motion.div>
        <div className="mt-4 w-64 h-1 overflow-hidden bg-slate-200 dark:bg-gray-900 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.4, ease: 'linear' }}
            className="h-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]"
          />
        </div>
      </div>
    )
  }

  return (
    <main className="w-full max-w-[100vw] overflow-x-hidden transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {isDark && (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <ParticleBackground />
        </div>
      )}

      {/* SECTION 1: HERO & PROFILE */}
      <section id="hero" className="min-h-[100dvh] w-full flex flex-col justify-center items-center relative px-4 md:px-8 pt-28 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto gap-5 font-orbitron"
        >
          {/* Profile Picture with Glow */}
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 shrink-0 border-blue-700 shadow-xl dark:border-cyan-400 dark:shadow-[0_0_25px_#00f0ff]">
            <img 
              src={profileData.avatarUrl} 
              alt={profileData.name} 
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/profile.jpg'
              }}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
            />
          </div>

          {/* Academic Badge & Status */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3.5 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30">
              DEEPAK.OS :: ACTIVE
            </span>
            <span className="text-xs font-mono font-bold px-3.5 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-500/30 dark:text-emerald-300">
              🎓 {profileData.degree.split(' in ')[0]} ({profileData.cgpa} CGPA)
            </span>
          </div>

          {/* Identity Header */}
          <div className="flex flex-col items-center text-center gap-1.5">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              <span>DEEPAK</span> <span className="text-blue-600 dark:text-cyan-400">R.</span>
            </h1>

            <h2 className="text-sm md:text-lg font-space tracking-wide text-blue-900 dark:text-cyan-200 font-bold max-w-2xl">
              {profileData.tagline}
            </h2>
          </div>

          {/* Bio Summary Card */}
          <p className="font-space text-xs md:text-sm leading-relaxed max-w-2xl text-slate-700 bg-white border border-slate-200 p-5 rounded-2xl shadow-md dark:text-gray-300 dark:bg-black/50 dark:border-cyan-500/20">
            {profileData.bioSummary}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a 
              href="/resume.pdf" 
              download="Deepak_R_Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2.5 text-xs font-bold font-orbitron rounded-xl tracking-wider transition-all border bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-md dark:bg-emerald-500/20 dark:hover:bg-emerald-400 dark:hover:text-black dark:border-emerald-400 dark:text-emerald-300 dark:shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2"
            >
              <FaDownload className="text-xs" />
              <span>DOWNLOAD RESUME</span>
            </a>
            <a 
              href="#projects" 
              className="px-5 py-2.5 text-xs font-bold font-orbitron rounded-xl tracking-wider transition-all border bg-blue-700 hover:bg-blue-800 text-white border-blue-700 shadow-md dark:bg-cyan-500/20 dark:hover:bg-cyan-400 dark:hover:text-black dark:border-cyan-400 dark:text-cyan-400 dark:shadow-[0_0_15px_rgba(0,240,255,0.2)] flex items-center gap-2"
            >
              <span>EXPLORE ARCHIVES</span>
              <FaArrowRight className="text-xs" />
            </a>
            <a 
              href="#research" 
              className="px-5 py-2.5 text-xs font-bold font-orbitron rounded-xl tracking-wider transition-all border bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900 shadow-sm dark:bg-black/60 dark:hover:bg-cyan-950 dark:border-cyan-500/40 dark:text-cyan-300"
            >
              RESEARCH & PAPERS
            </a>
            <a 
              href="#contact" 
              className="px-5 py-2.5 text-xs font-bold font-orbitron rounded-xl tracking-wider transition-all border bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900 shadow-sm dark:bg-black/60 dark:hover:bg-cyan-950 dark:border-cyan-500/40 dark:text-cyan-300"
            >
              COMM-LINK
            </a>
          </div>

          {/* Social Quick Links */}
          <div className="flex items-center gap-4 text-base pt-2 text-slate-600 dark:text-cyan-400">
            <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-blue-700 dark:hover:text-white transition-colors">
              <FaGithub />
            </a>
            <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700 dark:hover:text-white transition-colors">
              <FaLinkedin />
            </a>
            <a href={`mailto:${profileData.email}`} aria-label="Email" className="hover:text-blue-700 dark:hover:text-white transition-colors">
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: FEATURED PROJECTS */}
      <section id="projects" className="w-full py-20 px-4 md:px-8 border-t border-slate-200 dark:border-cyan-500/20 bg-slate-100/70 dark:bg-black/40 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
              ENGINEERING REPOSITORIES
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mt-1">
              FEATURED <span className="text-blue-700 dark:text-cyan-400">ARCHIVES</span>
            </h2>
            <p className="text-xs md:text-sm font-space uppercase tracking-widest text-slate-600 dark:text-cyan-300 font-semibold mt-1">
              Sim-to-Real Digital Twins, Active Adhesion Wall-Climbers & Autonomous AMRs
            </p>
            <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <FeaturedProjects />
        </div>
      </section>

      {/* SECTION 3: RESEARCH & PUBLICATIONS */}
      <section id="research" className="w-full py-20 px-4 md:px-8 border-t border-slate-200 dark:border-cyan-500/20 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
              SCHOLARLY PREPRINTS & DOI
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mt-1">
              RESEARCH & <span className="text-blue-700 dark:text-cyan-400">PUBLICATIONS</span>
            </h2>
            <p className="text-xs md:text-sm font-space uppercase tracking-widest text-slate-600 dark:text-cyan-300 font-semibold mt-1">
              Reinforcement Learning Traffic Optimization & Multimodal AMR Navigation
            </p>
            <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <ResearchSection />
        </div>
      </section>

      {/* SECTION 4: TECHNICAL SKILLS MATRIX */}
      <section id="skills" className="w-full py-20 px-4 md:px-8 border-t border-slate-200 dark:border-cyan-500/20 bg-slate-100/70 dark:bg-black/40 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
              DOMAIN PROFICIENCIES
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mt-1">
              TECHNICAL <span className="text-blue-700 dark:text-cyan-400">SKILL MATRIX</span>
            </h2>
            <p className="text-xs md:text-sm font-space uppercase tracking-widest text-slate-600 dark:text-cyan-300 font-semibold mt-1">
              ROS 2 Middleware, Embedded Microcontrollers, Vision Pipelines & Full-Stack Tooling
            </p>
            <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <SkillsSection />
        </div>
      </section>

      {/* SECTION 5: FIELD OPERATIONS & EXPERIENCE */}
      <section id="experience" className="w-full py-20 px-4 md:px-8 border-t border-slate-200 dark:border-cyan-500/20 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
              OPERATIONAL TIMELINE
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mt-1">
              FIELD <span className="text-blue-700 dark:text-cyan-400">OPERATIONS</span>
            </h2>
            <p className="text-xs md:text-sm font-space uppercase tracking-widest text-slate-600 dark:text-cyan-300 font-semibold mt-1">
              Industrial Internships, Autonomous Deployments & Heavy Automation Experience
            </p>
            <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-space">
            {experienceData.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="border p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between transition-all duration-300 bg-white border-slate-200 shadow-md hover:shadow-xl dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400"
              >
                <div>
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-1.5">
                    <span className="text-[10px] font-orbitron font-bold text-amber-700 dark:text-cyan-400">
                      [ {idx < 9 ? `0${idx + 1}` : idx + 1} :: {exp.domainTag.toUpperCase()} ]
                    </span>
                    {exp.ndaProtected && (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/60 dark:border-rose-500/40 dark:text-rose-300 flex items-center gap-1">
                        <FaShieldAlt className="text-[9px]" />
                        NDA PROTECTED
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-orbitron text-slate-900 dark:text-white mt-1">
                    {exp.company}
                  </h3>
                  <p className="text-xs font-semibold text-blue-800 dark:text-cyan-300 mb-1">
                    {exp.role} • <span className="text-slate-500 dark:text-slate-400 font-normal">{exp.period}</span>
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-3">
                    📍 {exp.location} ({exp.locationType})
                  </p>

                  <ul className="list-disc list-inside text-xs leading-relaxed text-slate-600 dark:text-gray-300 space-y-1.5 mb-4">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-cyan-500/20 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-black/50 dark:text-cyan-300 dark:border-cyan-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: GLOBAL EXPOS & CERTIFICATIONS */}
      <section id="certifications" className="w-full py-20 px-4 md:px-8 border-t border-slate-200 dark:border-cyan-500/20 bg-slate-100/70 dark:bg-black/40 backdrop-blur-md">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
              CREDENTIALS & EXPOS
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mt-1">
              GLOBAL EXPOS & <span className="text-blue-700 dark:text-cyan-400">CERTIFICATIONS</span>
            </h2>
            <p className="text-xs md:text-sm font-space uppercase tracking-widest text-slate-600 dark:text-cyan-300 font-semibold mt-1">
              Industrial Robotics Credentials & Defense Mechatronics Analysis
            </p>
            <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-space">
            {/* Left Column: Certifications */}
            <div className="border p-6 rounded-2xl backdrop-blur-md shadow-md bg-white border-slate-200 dark:bg-gray-900/60 dark:border-cyan-500/30">
              <h3 className="text-lg font-orbitron font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="text-blue-600 dark:text-cyan-400">◈</span> VERIFIED TECHNICAL CERTIFICATIONS
              </h3>
              <div className="space-y-3.5">
                {certificationsData.map((cert) => (
                  <div
                    key={cert.id}
                    className="border p-3.5 rounded-xl bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-900/50"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs md:text-sm font-bold font-orbitron text-slate-900 dark:text-cyan-300">
                        {cert.title}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {cert.issueDate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-gray-300 mt-0.5">
                      Issuer: <span className="font-semibold text-blue-800 dark:text-cyan-200">{cert.issuer}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cert.skillsCovered.map((sc) => (
                        <span
                          key={sc}
                          className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white text-slate-700 border border-slate-200 dark:bg-slate-900 dark:text-cyan-400/80 dark:border-cyan-900"
                        >
                          {sc}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Industrial Expos */}
            <div className="border p-6 rounded-2xl backdrop-blur-md shadow-md bg-white border-slate-200 dark:bg-gray-900/60 dark:border-cyan-500/30">
              <h3 className="text-lg font-orbitron font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="text-amber-600 dark:text-cyan-400">❖</span> INDUSTRIAL EXPOS & DEFENSE ANALYSIS
              </h3>
              <div className="space-y-4">
                <div className="border p-4 rounded-xl bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold font-orbitron text-blue-900 dark:text-cyan-300">
                      Automation India Expo 2026
                    </h4>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-cyan-400 font-bold">
                      CHENNAI
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                    Chennai Trade Centre — Explored industrial robotics, smart sensors, EtherCAT motion controllers, and factory automation architectures.
                  </p>
                </div>

                <div className="border p-4 rounded-xl bg-slate-50 border-slate-200 dark:bg-black/50 dark:border-cyan-500/20">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold font-orbitron text-blue-900 dark:text-cyan-300">
                      DEFTECH Bharat Bengaluru 2026
                    </h4>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-cyan-400 font-bold">
                      BENGALURU
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                    Defense Technology Expo — Specialized T-90 Bhishma tank propulsion systems, tactical mechatronics, and heavy armor powertrains analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LIVE COMM-LINK & CONTACT */}
      <section id="contact" className="w-full py-20 px-4 md:px-8 border-t border-slate-200 dark:border-cyan-500/20 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
              ENCRYPTED TRANSCEIVER
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mt-1">
              LIVE <span className="text-blue-700 dark:text-cyan-400">COMM-LINK</span>
            </h2>
            <p className="text-xs md:text-sm font-space uppercase tracking-widest text-slate-600 dark:text-cyan-300 font-semibold mt-1">
              LinkedIn Broadcast & Direct Encrypted Message Transmission
            </p>
            <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch font-space">
            {/* Left Column: Network Uplink */}
            <div className="border p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-md bg-white border-slate-200 dark:bg-gray-900/60 dark:border-cyan-500/30">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center border-blue-600 text-blue-700 dark:border-cyan-400 dark:text-cyan-400">
                    <span className="text-xl font-orbitron">📡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-orbitron font-bold text-slate-900 dark:text-white">
                      NETWORK UPLINK
                    </h3>
                    <p className="text-xs font-mono text-amber-700 dark:text-cyan-400 font-semibold">
                      [ LINKEDIN INTEGRATION NODE ]
                    </p>
                  </div>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[500px] pr-1">
                  <iframe 
                    src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7487740372673232896" 
                    className="w-full h-[380px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white/5" 
                    frameBorder="0" 
                    allowFullScreen 
                    title="20-Day ROS 2 Training"
                  />
                  <iframe 
                    src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7464295823774736384" 
                    className="w-full h-[380px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white/5" 
                    frameBorder="0" 
                    allowFullScreen 
                    title="DEFTECH Bharat"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Web3Forms Contact Form */}
            <div className="border p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-md bg-white border-slate-200 dark:bg-gray-900/60 dark:border-cyan-500/30">
              <div>
                <h3 className="text-xl font-orbitron font-bold text-slate-900 dark:text-white mb-1">
                  TRANSMIT SIGNAL
                </h3>
                <p className="text-xs font-mono mb-4 text-amber-700 dark:text-cyan-400 font-semibold">
                  [ DIRECT TO: deepak121289@outlook.com ]
                </p>

                {status !== 'idle' && (
                  <div className={`mb-4 p-3.5 rounded-xl text-xs font-orbitron border font-semibold ${
                    status === 'submitting' 
                      ? 'bg-blue-500/10 border-blue-400 text-blue-800 dark:text-blue-300 animate-pulse'
                      : status === 'success'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-500/20 border-rose-400 text-rose-800 dark:text-rose-300'
                  }`}>
                    {statusMessage}
                  </div>
                )}

                <form className="flex flex-col gap-3.5" onSubmit={handleFormSubmit}>
                  <div>
                    <label className="text-xs font-orbitron mb-1 block text-slate-900 dark:text-cyan-400 font-semibold">
                      IDENTITY / CALLSIGN (NAME)
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Dr. Alex Vance" 
                      className="w-full border rounded-xl p-3 text-xs outline-none transition-colors bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/60 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-300" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-orbitron mb-1 block text-slate-900 dark:text-cyan-400 font-semibold">
                      COMM FREQUENCY (EMAIL)
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. contact@domain.com" 
                      className="w-full border rounded-xl p-3 text-xs outline-none transition-colors bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/60 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-300" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-orbitron mb-1 block text-slate-900 dark:text-cyan-400 font-semibold">
                      TRANSMISSION PAYLOAD (MESSAGE)
                    </label>
                    <textarea 
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write message details, collaboration opportunities, or technical inquiries..." 
                      rows={4} 
                      className="w-full border rounded-xl p-3 text-xs outline-none transition-colors resize-none bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/60 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-300"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className={`w-full py-3.5 border font-bold font-orbitron text-xs tracking-widest rounded-xl transition-all bg-blue-700 border-blue-700 text-white hover:bg-blue-800 shadow-md dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black dark:shadow-[0_0_15px_rgba(0,240,255,0.2)] ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {status === 'submitting' ? 'TRANSMITTING...' : 'BROADCAST TRANSMISSION'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
