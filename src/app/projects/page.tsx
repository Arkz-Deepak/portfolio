import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Featured Archives | Deepak R.',
  description: 'Projects and Engineering Case Studies in ROS 2, Edge AI, and Autonomous Systems.',
}

export default function ProjectsPage() {
  const projects = [
    {
      id: 'aura',
      title: 'VisionX (AURA)',
      badge: 'RL & SUMO',
      subtitle: '[ TRAFFIC SIGNAL OPTIMIZATION ]',
      description: 'Sensor-Fusion Deep Reinforcement Learning for Dynamic Traffic Signal Optimization & Emergency Routing using SUMO traffic simulator and YOLO edge computing.',
      link: '/projects/aura'
    },
    {
      id: 'rover',
      title: 'Autonomous ROS 2 Rover',
      badge: 'ROS 2 & NAV2',
      subtitle: '[ SKID-STEER AUTONOMY ]',
      description: 'Custom 4-wheel skid-steer rover built from scratch using ROS 2 Jazzy, Gazebo Harmonic, SLAM Toolbox, and Nav2 with EKF sensor fusion.',
      link: '/projects/sih'
    },
    {
      id: 'cv-robot',
      title: 'CV Autonomous Robot',
      badge: 'OPENCV & PD',
      subtitle: '[ EDGE PERCEPTION ]',
      description: 'Custom line-following & obstacle avoidance robot using OpenCV, ROS 2, and dynamic PD Control logic.',
      link: '/projects/edge-ai'
    },
    {
      id: 'reactive-skid',
      title: 'Reactive Obstacle Avoidance Skid-Steer',
      badge: '360° LIDAR SLICING',
      subtitle: '[ ROS 2 & GAZEBO HARMONIC ]',
      description: 'High-speed obstacle evasion rover using ROS 2, Gazebo Harmonic simulation, and custom 360° LiDAR scan slicing algorithms.',
      link: '/projects/sih'
    },
    {
      id: 'motor-control',
      title: 'Decentralized Motor Control System',
      badge: 'PYTHON & ROS 2 PUB/SUB',
      subtitle: '[ MULTI-ACTUATOR TELEMETRY ]',
      description: 'High-concurrency Python & ROS 2 Pub/Sub node architecture for multi-actuator telemetry synchronization.',
      link: '/projects/edge-ai'
    },
    {
      id: 'scholarship-bot',
      title: 'Hybrid AI Scholarship Bot',
      badge: 'SCIKIT-LEARN & STREAMLIT',
      subtitle: '[ ANOMALY DETECTION & AUTOMATION ]',
      description: 'Intelligent automated filtering bot built using Python, Scikit-Learn Isolation Forest, and Streamlit dashboard interface.',
      link: '/projects/aura'
    }
  ]

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-3">
          FEATURED <span className="text-cyan-400">ARCHIVES</span>
        </h1>
        <p className="text-xs md:text-sm font-space text-cyan-300 tracking-widest uppercase">Autonomous Systems, Robotics & AI Repositories</p>
        <div className="h-1 w-24 bg-cyan-400 mx-auto mt-3 rounded-full shadow-[0_0_10px_#00f0ff]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <Link key={p.id} href={p.link} className="h-full">
            <div className="h-full bg-gray-900/60 border border-cyan-500/30 hover:border-cyan-400 p-6 rounded-xl backdrop-blur-md transition-all duration-300 group cursor-pointer flex flex-col justify-between shadow-[0_0_15px_rgba(0,240,255,0.05)]">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white font-orbitron group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                  <span className="text-[10px] font-orbitron bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded whitespace-nowrap">{p.badge}</span>
                </div>
                <p className="text-xs text-cyan-400 font-orbitron tracking-wider mb-3">{p.subtitle}</p>
                <p className="text-sm text-gray-300 font-space leading-relaxed">{p.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-cyan-500/20 flex justify-between items-center text-xs font-orbitron font-bold text-cyan-400">
                <span>VIEW SPECS</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
