"use client"
import { useState } from 'react'
import Terminal from '@/components/Terminal'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

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
      setStatusMessage('WEB3FORMS ACCESS KEY MISSING IN ENVIRONMENT.')
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
          subject: `DEEPAK-OS Terminal Transmission from ${formState.name}`,
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

  return (
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400 font-space">
      <div className="text-center mb-12">
        <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-2 inline-block">
          DIRECT TRANSMISSION UPLINK
        </span>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron mb-2 text-slate-900 dark:text-white">
          DEEPAK-OS <span className="text-blue-700 dark:text-cyan-400">TERMINAL</span>
        </h1>
        <p className="text-xs md:text-sm font-space text-slate-600 dark:text-cyan-300 tracking-widest uppercase font-semibold">
          CLI Command Telemetry & Encrypted Web3Forms Communication Channel
        </p>
        <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="w-full">
          <Terminal />
        </div>

        <div className="w-full border p-8 rounded-2xl backdrop-blur-md bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30">
          <h2 className="text-2xl font-orbitron font-bold mb-2 text-slate-900 dark:text-white">
            ENCRYPTED TRANSMISSION
          </h2>
          <p className="text-xs md:text-sm mb-6 text-slate-600 dark:text-gray-300 leading-relaxed">
            Transmit direct signals, research inquiries, or technical collaboration requests directly to <code className="text-blue-800 dark:text-cyan-300 font-bold font-mono">deepak121289@outlook.com</code>.
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

          <form className="flex flex-col gap-4 font-space" onSubmit={handleFormSubmit}>
            <div>
              <label className="text-xs font-orbitron mb-1 block text-slate-900 dark:text-cyan-400 font-semibold">
                IDENTITY / CALLSIGN (NAME)
              </label>
              <input 
                type="text" 
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="e.g. Commander Sheppard" 
                className="w-full border rounded-xl p-3 text-xs outline-none transition-colors bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/60 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-300" 
              />
            </div>
            <div>
              <label className="text-xs font-orbitron mb-1 block text-slate-900 dark:text-cyan-400 font-semibold">
                RETURN PATH (EMAIL)
              </label>
              <input 
                type="email" 
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="e.g. signal@domain.com" 
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
                placeholder="Write message details..." 
                rows={4} 
                className="w-full border rounded-xl p-3 text-xs outline-none transition-colors resize-none bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/60 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-300" 
              />
            </div>
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className={`w-full py-3.5 border font-bold font-orbitron text-xs tracking-widest rounded-xl mt-2 transition-all bg-blue-700 border-blue-700 text-white hover:bg-blue-800 shadow-md dark:bg-cyan-500/20 dark:border-cyan-400 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-black ${status === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {status === 'submitting' ? 'TRANSMITTING...' : 'TRANSMIT SIGNAL'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
