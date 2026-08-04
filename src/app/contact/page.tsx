import type { Metadata } from 'next'
import Terminal from '@/components/Terminal'

export const metadata: Metadata = {
  title: 'Encrypted Transmission | Deepak R.',
  description: 'Terminal and Contact form.',
}

export default function ContactPage() {
  return (
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-24 pb-12 px-4 max-w-7xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-black text-slate-900 dark:text-cyan-400">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-slate-900 dark:text-white">
          DEEPAK-OS <span className="text-blue-700 dark:text-cyan-400">TERMINAL</span>
        </h1>
        <div className="h-1 w-24 mx-auto rounded-full bg-blue-600 dark:bg-cyan-400 dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="w-full">
          <Terminal />
        </div>
        <div className="w-full border p-8 rounded-xl backdrop-blur-md bg-white border-slate-200 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30">
          <h2 className="text-2xl font-orbitron mb-6 text-slate-900 dark:text-white">ENCRYPTED TRANSMISSION</h2>
          <p className="font-space text-sm mb-8 text-slate-600 dark:text-gray-400">
            Interactive CLI terminal and secure contact form to transmit direct signals to my inbox.
          </p>
          <form className="flex flex-col gap-4 font-space">
            <input type="text" placeholder="IDENTITY (NAME)" className="w-full border rounded p-3 text-xs outline-none transition-colors bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/50 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-400" />
            <input type="email" placeholder="RETURN_PATH (EMAIL)" className="w-full border rounded p-3 text-xs outline-none transition-colors bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/50 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-400" />
            <textarea placeholder="PAYLOAD (MESSAGE)" rows={4} className="w-full border rounded p-3 text-xs outline-none transition-colors resize-none bg-slate-50 border-slate-300 focus:border-blue-600 text-slate-900 dark:bg-black/50 dark:border-cyan-900 dark:focus:border-cyan-400 dark:text-cyan-400"></textarea>
            <button type="button" className="w-full py-3 border font-bold font-orbitron text-xs tracking-widest rounded mt-2 transition-all bg-blue-700 border-blue-700 text-white hover:bg-blue-800 shadow-md dark:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-black">
              TRANSMIT SIGNAL
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
