import type { Metadata } from 'next'
import Terminal from '@/components/Terminal'

export const metadata: Metadata = {
  title: 'Encrypted Transmission | Deepak R.',
  description: 'Terminal and Contact form.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
          DEEPAK-OS <span className="text-cyan-400">TERMINAL</span>
        </h1>
        <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="w-full">
          <Terminal />
        </div>
        <div className="w-full bg-gray-900/40 p-8 rounded-lg border border-cyan-500/20 backdrop-blur-md">
          <h2 className="text-2xl font-orbitron text-white mb-6">ENCRYPTED TRANSMISSION</h2>
          <p className="text-gray-400 font-space text-sm mb-8">
            Interactive CLI terminal and secure contact form to transmit direct signals to my inbox.
          </p>
          {/* Note: since this is a Server Component natively (because we didn't add "use client"), 
              a form with just standard HTML works visually. The Terminal component handles its own state. */}
          <form className="flex flex-col gap-4 font-space" onSubmit={undefined}>
            <input type="text" placeholder="IDENTITY (NAME)" className="w-full bg-black/50 border border-cyan-900 focus:border-cyan-400 rounded p-3 text-cyan-400 outline-none transition-colors" />
            <input type="email" placeholder="RETURN_PATH (EMAIL)" className="w-full bg-black/50 border border-cyan-900 focus:border-cyan-400 rounded p-3 text-cyan-400 outline-none transition-colors" />
            <textarea placeholder="PAYLOAD (MESSAGE)" rows={4} className="w-full bg-black/50 border border-cyan-900 focus:border-cyan-400 rounded p-3 text-cyan-400 outline-none transition-colors resize-none"></textarea>
            <button type="button" className="w-full py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all font-bold tracking-widest mt-2">
              TRANSMIT SIGNAL
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
