"use client"

export default function InternshipsPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
          OPERATIONAL <span className="text-cyan-400">HISTORY</span>
        </h1>
        <div className="h-1 w-24 bg-cyan-400 mb-12 rounded-full shadow-[0_0_10px_#00f0ff]" />
        
        <div className="space-y-8">
          {/* Timeline Item 1 */}
          <div className="bg-gray-900/40 border border-cyan-500/20 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400 shadow-[0_0_15px_#00f0ff]" />
            <h3 className="text-2xl font-orbitron text-white mb-2">Tamizhan Skills</h3>
            <p className="text-cyan-400 font-space text-sm mb-4">Machine Learning Intern | 2024</p>
            <p className="text-gray-300 font-space text-base">
              Developed production-grade computer vision models. Specialized in data augmentation, neural network training, 
              and optimizing real-time inference pipelines for edge devices.
            </p>
          </div>

          {/* Timeline Item 2 */}
          <div className="bg-gray-900/40 border border-cyan-500/20 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-pink-500 shadow-[0_0_15px_#ff007f]" />
            <h3 className="text-2xl font-orbitron text-white mb-2">CodeAlpha</h3>
            <p className="text-pink-400 font-space text-sm mb-4">Software Engineering Intern | 2023</p>
            <p className="text-gray-300 font-space text-base">
              Built robust backend systems and APIs. Focused on scalable architectures, database optimization, 
              and strict version control practices within an agile environment.
            </p>
          </div>

          {/* Timeline Item 3 */}
          <div className="bg-gray-900/40 border border-cyan-500/20 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00ff9d] shadow-[0_0_15px_#00ff9d]" />
            <h3 className="text-2xl font-orbitron text-white mb-2">Chennai Port Authority</h3>
            <p className="text-[#00ff9d] font-space text-sm mb-4">Industrial Automation Intern | 2022</p>
            <p className="text-gray-300 font-space text-base">
              Analyzed heavy machinery PLCs and SCADA networks. Gained hands-on experience with industrial automation, 
              port logistics technology, and large-scale sensor integration.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
