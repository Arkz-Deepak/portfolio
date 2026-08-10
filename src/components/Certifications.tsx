"use client"
import React from 'react'
import { Cpu, Cloud, Network, Award, Code, ExternalLink, CheckCircle2, Video, Terminal } from 'lucide-react'

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  credentialId?: string
  skills?: string[]
  verifyUrl?: string
}

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: 'ibm-supervised-learning',
    title: 'Supervised Learning Methods',
    issuer: 'IBM',
    date: 'Jun 2026',
    verifyUrl: 'https://skillsbuild.org/'
  },
  {
    id: 'ibm-data-analysis',
    title: 'Data Analysis Using Python',
    issuer: 'IBM',
    date: 'Jun 2026',
    verifyUrl: 'https://skillsbuild.org/'
  },
  {
    id: 'ibm-unsupervised-learning',
    title: 'Unsupervised Learning Methods',
    issuer: 'IBM',
    date: 'Jun 2026',
    verifyUrl: 'https://skillsbuild.org/'
  },
  {
    id: 'google-cts-jan-26',
    title: 'CTS Jan 26 Badge',
    issuer: 'Google Cloud Skills Boost',
    date: 'Feb 2026',
    verifyUrl: 'https://www.cloudskillsboost.google/'
  },
  {
    id: 'nptel-digital-circuits',
    title: 'Digital Circuits',
    issuer: 'NPTEL',
    date: 'Nov 2025',
    credentialId: 'NPTEL25EE125S1154009277',
    skills: ['Microprocessors', 'Logical Design'],
    verifyUrl: 'https://nptel.ac.in/noc'
  },
  {
    id: 'nptel-industrial-robotics',
    title: 'Industrial Robotics Theories for Implementation',
    issuer: 'NPTEL',
    date: 'Nov 2025',
    credentialId: 'NPTEL25ME161S1254009474',
    skills: ['Robotics', 'Kinematics'],
    verifyUrl: 'https://nptel.ac.in/noc'
  },
  {
    id: 'ibm-ai-fundamentals',
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM',
    date: 'Aug 2025',
    verifyUrl: 'https://skillsbuild.org/'
  },
  {
    id: 'cisco-hardware-basics',
    title: 'Computer Hardware Basics',
    issuer: 'Cisco',
    date: 'Jul 2025',
    verifyUrl: 'https://www.netacad.com/'
  },
  {
    id: 'nptel-joy-of-computing',
    title: 'Joy of Computing using Python',
    issuer: 'NPTEL',
    date: 'May 2025',
    verifyUrl: 'https://nptel.ac.in/noc'
  },
  {
    id: 'unstop-coding-challenge',
    title: 'Weekly Coding Challenge 26',
    issuer: 'Unstop',
    date: 'Apr 2025',
    credentialId: '3dc431aa-a8db-4827-9b74-40e00d356b9b',
    verifyUrl: 'https://unstop.com/'
  },
  {
    id: 'canva-promotional-video',
    title: 'Create a Promotional Video using Canva',
    issuer: 'United Latino Students',
    date: 'Mar 2025',
    credentialId: 'MJL10F4I8EX0',
    verifyUrl: 'https://coursera.org/verify/MJL10F4I8EX0'
  },
  {
    id: 'tcs-resume-writer',
    title: 'Certified Basic Resume Writer',
    issuer: 'TCS iON',
    date: 'Mar 2025',
    verifyUrl: 'https://learning.tcsionhub.in/'
  },
  {
    id: 'coursera-wordpress',
    title: 'Build a free website with WordPress',
    issuer: 'Coursera',
    date: 'Mar 2025',
    credentialId: 'RDD8RJ6MWZEU',
    verifyUrl: 'https://coursera.org/verify/RDD8RJ6MWZEU'
  },
  {
    id: 'pearson-mepro',
    title: 'Pearson MePro Level 10 Expert',
    issuer: 'Pearson',
    date: 'Feb 2025',
    verifyUrl: 'https://mepro.pearson.com/'
  },
  {
    id: 'upgrad-python',
    title: 'Introduction to Programming Using Python',
    issuer: 'upGrad',
    date: 'Feb 2022',
    credentialId: 'cb560194-63da-4524-898b-8d57b772a149',
    verifyUrl: 'https://www.upgrad.com/'
  }
]

function getIssuerIcon(issuer: string) {
  const normalized = issuer.toLowerCase()
  if (normalized.includes('google')) return <Cloud className="w-5 h-5 text-cyan-500" />
  if (normalized.includes('ibm')) return <Network className="w-5 h-5 text-blue-500" />
  if (normalized.includes('nptel') || normalized.includes('cisco')) return <Cpu className="w-5 h-5 text-amber-500 dark:text-cyan-400" />
  if (normalized.includes('unstop') || normalized.includes('upgrad')) return <Code className="w-5 h-5 text-emerald-500" />
  if (normalized.includes('canva') || normalized.includes('latino')) return <Video className="w-5 h-5 text-purple-500" />
  if (normalized.includes('tcs') || normalized.includes('pearson') || normalized.includes('coursera')) return <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-cyan-300" />
  return <Award className="w-5 h-5 text-cyan-400" />
}

export default function Certifications() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {CERTIFICATIONS_DATA.map((cert) => (
          <div
            key={cert.id}
            className="border p-6 rounded-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-full group bg-white border-slate-200 shadow-md hover:shadow-lg dark:bg-gray-900/60 dark:border-cyan-500/30 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
          >
            <div>
              {/* Header: Icon & Date */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-cyan-500/30 flex items-center justify-center">
                  {getIssuerIcon(cert.issuer)}
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-blue-900 border border-slate-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-500/40">
                  🗓 {cert.date}
                </span>
              </div>

              {/* Title & Issuer */}
              <h3 className="text-lg font-bold font-orbitron text-slate-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-cyan-400 transition-colors mb-1 leading-snug">
                {cert.title}
              </h3>
              <p className="text-xs font-orbitron text-amber-700 dark:text-cyan-400 font-semibold mb-3">
                {cert.issuer}
              </p>

              {/* Credential ID */}
              {cert.credentialId && (
                <div className="mb-3 p-2 rounded bg-slate-50 border border-slate-200 dark:bg-black/40 dark:border-cyan-900/60">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-gray-400 block mb-0.5 uppercase tracking-wider">
                    CREDENTIAL ID
                  </span>
                  <code className="text-xs font-mono text-blue-900 dark:text-cyan-300 font-semibold break-all">
                    {cert.credentialId}
                  </code>
                </div>
              )}

              {/* Skills Tags */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 dark:bg-cyan-950/80 dark:text-cyan-300 dark:border-cyan-500/30 font-medium"
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Verification Link Button */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-cyan-500/20">
              <a
                href={cert.verifyUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg border font-orbitron text-xs font-bold transition-all flex items-center justify-between text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:text-cyan-400 dark:border-cyan-500/40 dark:bg-cyan-950/30 dark:hover:bg-cyan-400 dark:hover:text-black dark:hover:border-cyan-400 dark:shadow-[0_0_10px_rgba(0,240,255,0.1)]"
              >
                <span>VERIFY CREDENTIAL</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
