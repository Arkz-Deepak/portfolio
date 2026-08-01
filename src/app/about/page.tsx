import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About System Identity | Deepak R.',
  description: 'Biography and Core Competencies in Robotics and Machine Learning.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
          SYSTEM <span className="text-cyan-400">IDENTITY</span>
        </h1>
        <div className="h-1 w-24 bg-cyan-400 mb-8 rounded-full shadow-[0_0_10px_#00f0ff]" />
        
        <div className="bg-gray-900/40 border border-cyan-500/20 p-8 rounded-lg backdrop-blur-sm prose prose-invert max-w-none">
          <h2 className="text-2xl font-orbitron text-cyan-400 mb-4">BIOGRAPHY</h2>
          <p className="font-space text-gray-300 leading-relaxed mb-8">
            I am Deepak R., an ambitious Robotics and Machine Learning Engineering student currently 
            pursuing my Bachelor of Engineering in Robotics & Automation. My core focus is bridging the gap 
            between advanced theoretical AI (like Deep Reinforcement Learning) and raw physical actuation.
          </p>
          
          <h2 className="text-2xl font-orbitron text-cyan-400 mb-4">CORE COMPETENCIES</h2>
          <ul className="font-space text-gray-300 space-y-2 list-disc pl-6">
            <li><strong className="text-white">Robotics Frameworks:</strong> ROS2 (Robot Operating System), Gazebo Simulation</li>
            <li><strong className="text-white">Computer Vision & ML:</strong> YOLOv8, MediaPipe, Deep Reinforcement Learning, OpenCV</li>
            <li><strong className="text-white">Hardware Integration:</strong> Kinematics, PID Controllers, LiDAR SLAM pathfinding</li>
            <li><strong className="text-white">Software Architecture:</strong> Python, C++, React/Next.js, Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
