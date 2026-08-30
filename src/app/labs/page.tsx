import type { Metadata } from 'next'
import SlamLab from '@/components/labs/SlamLab'
import VisionLab from '@/components/labs/VisionLab'
import PidLab from '@/components/labs/PidLab'
import ArmLab from '@/components/labs/ArmLab'

export const metadata: Metadata = {
  title: 'Interactive Robotics & AI Labs | Deepak R.',
  description: 'Interactive simulations in LiDAR SLAM Navigation, YOLOv8 Multi-Modal Perception, PID Tuning, and 2-DOF Robotic Arm Kinematics.',
}

export default function LabsPage() {
  return (
    <main className="min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Header Banner */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono tracking-widest text-blue-700 dark:text-cyan-400 font-bold px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-cyan-950/40 dark:border-cyan-500/30 mb-3 inline-block">
          DEEPAK.OS :: INTERACTIVE SIMULATION LABS
        </span>
        <h1 className="text-4xl md:text-5xl font-black font-orbitron text-slate-900 dark:text-white mt-2">
          ROBOTICS & <span className="text-blue-700 dark:text-cyan-400">AI SANDBOX</span>
        </h1>
        <p className="text-sm font-space text-slate-700 dark:text-slate-300 mt-2 max-w-2xl mx-auto">
          Test real-time autonomous navigation, neural computer vision perception, and closed-loop feedback control systems in an interactive browser sandbox.
        </p>
        <div className="h-1 w-24 mx-auto rounded-full bg-blue-600 dark:bg-cyan-400 mt-4 dark:shadow-[0_0_10px_#00f0ff]" />
      </div>

      {/* Lab 1 & 2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-12">
        {/* Lab 1: SLAM Nav2 */}
        <div className="flex flex-col w-full p-6 rounded-2xl border bg-white border-slate-300 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-cyan-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
              LiDAR SLAM & A* Navigation
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40">
              NAV2 STACK
            </span>
          </div>
          <p className="font-space text-xs text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
            360° laser sweep with A* global path planning and obstacle clearance. Click to set new waypoints or drop custom obstacle crates.
          </p>
          <SlamLab />
        </div>

        {/* Lab 2: YOLO Neural Vision */}
        <div className="flex flex-col w-full p-6 rounded-2xl border bg-white border-slate-300 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-cyan-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
              YOLOv8 Multi-Modal Perception
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40">
              EDGE AI
            </span>
          </div>
          <p className="font-space text-xs text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
            Object detection across RGB, Depth, and Thermal modalities. Hover or click vehicles and pedestrians to inspect neural activations and tracking IDs.
          </p>
          <VisionLab />
        </div>
      </div>

      {/* Lab 3 & 4 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Lab 3: PID Control */}
        <div className="flex flex-col w-full p-6 rounded-2xl border bg-white border-slate-300 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-cyan-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
              PID Feedback Control Loop
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40">
              CONTROL SYSTEMS
            </span>
          </div>
          <p className="font-space text-xs text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
            Tune Proportional (Kp), Integral (Ki), and Derivative (Kd) gains on a Mass-Spring-Damper system. Trigger step disturbances to observe damping stability.
          </p>
          <PidLab />
        </div>

        {/* Lab 4: 2-DOF Robotic Arm Kinematics */}
        <div className="flex flex-col w-full p-6 rounded-2xl border bg-white border-slate-300 shadow-md dark:bg-gray-900/60 dark:border-cyan-500/30">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-orbitron font-bold text-slate-900 dark:text-cyan-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400" />
              2-DOF Inverse Kinematics (IK)
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-500/40">
              ROBOTICS KINEMATICS
            </span>
          </div>
          <p className="font-space text-xs text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
            Move your cursor inside the workspace to calculate real-time joint angles (θ1, θ2). Trigger impulse testing to verify physical mass rigidity and damping.
          </p>
          <ArmLab />
        </div>
      </div>
    </main>
  )
}
