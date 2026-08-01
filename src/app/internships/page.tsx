import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Operational History | Deepak R.',
  description: 'Internships and Experience timeline.',
}

export default function InternshipsPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
          ENGINEERING <span className="text-cyan-400">TIMELINE</span>
        </h1>
        <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_10px_#00f0ff]" />
      </div>
      
      <div className="relative w-full">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan-900/50 -translate-y-1/2 hidden md:block"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Timeline 1 */}
          <div className="flex flex-col items-center text-center relative">
            <div className="w-6 h-6 rounded-full border-4 border-cyan-400 bg-black z-10 mb-6 shadow-[0_0_15px_#00f0ff]"></div>
            <h3 className="text-xl font-orbitron text-white mb-2">TAMIZHAN SKILLS</h3>
            <p className="text-cyan-400 font-space text-sm mb-4">RISE Program</p>
            <p className="text-gray-400 font-space text-sm">Core robotics foundation and autonomous systems architecture.</p>
          </div>
          
          {/* Timeline 2 */}
          <div className="flex flex-col items-center text-center relative md:-mt-16">
            <div className="w-6 h-6 rounded-full border-4 border-cyan-400 bg-black z-10 mb-6 shadow-[0_0_15px_#00f0ff] md:absolute md:top-16"></div>
            <h3 className="text-xl font-orbitron text-white mb-2 md:mt-24">CODEALPHA</h3>
            <p className="text-cyan-400 font-space text-sm mb-4">Software Engineering</p>
            <p className="text-gray-400 font-space text-sm">Development of algorithmic pipelines and data structures.</p>
          </div>
          
          {/* Timeline 3 */}
          <div className="flex flex-col items-center text-center relative">
            <div className="w-6 h-6 rounded-full border-4 border-cyan-400 bg-black z-10 mb-6 shadow-[0_0_15px_#00f0ff]"></div>
            <h3 className="text-xl font-orbitron text-white mb-2">CHENNAI PORT</h3>
            <p className="text-cyan-400 font-space text-sm mb-4">Authority Intern</p>
            <p className="text-gray-400 font-space text-sm">Industrial automation and heavy mechatronics observation.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
