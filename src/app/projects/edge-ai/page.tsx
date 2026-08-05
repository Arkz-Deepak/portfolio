import type { Metadata } from 'next'
import ArmLab from '@/components/labs/ArmLab'
import PidLab from '@/components/labs/PidLab'

export const metadata: Metadata = {
  title: 'Edge AI & Robotics | Deepak R.',
  description: 'Real-Time Object Detection, Inverse Kinematics, and PID control loops.',
}

export default function EdgeAiProject() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 max-w-5xl mx-auto transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-cyan-400">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-slate-900 dark:text-white mb-4">
          EDGE AI <span className="text-blue-700 dark:text-cyan-400">& ROBOTICS</span>
        </h1>
        <div className="h-1 w-24 bg-blue-600 dark:bg-cyan-400 mb-8 rounded-full dark:shadow-[0_0_10px_#00f0ff]" />
        
        <p className="text-slate-700 dark:text-gray-300 font-space text-lg leading-relaxed mb-6">
          Real-Time Object Detection with YOLOv8 & MediaPipe integrated directly into control loops. 
          The physical kinematics are driven by Inverse Kinematics (IK) and Proportional-Integral-Derivative (PID) controllers 
          for stable, real-world actuation.
        </p>
      </div>

      <div className="p-6 rounded-xl border backdrop-blur-md mb-12 bg-white border-slate-200 shadow-md dark:bg-gray-900/40 dark:border-cyan-500/20">
        <h2 className="text-2xl font-orbitron text-blue-900 dark:text-cyan-400 mb-6 flex items-center gap-2 font-bold">
          <span className="w-2.5 h-2.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse" />
          6-DOF INVERSE KINEMATICS (IK)
        </h2>
        <p className="text-sm text-slate-600 dark:text-gray-400 font-space mb-6">
          Move your cursor inside the bounding box to calculate real-time joint angles (θ1, θ2) for the robotic arm. 
          Trigger an impulse to test physical damping and rigidity.
        </p>
        <ArmLab />
      </div>

      <div className="p-6 rounded-xl border backdrop-blur-md mb-12 bg-white border-slate-200 shadow-md dark:bg-gray-900/40 dark:border-cyan-500/20">
        <h2 className="text-2xl font-orbitron text-blue-900 dark:text-cyan-400 mb-6 flex items-center gap-2 font-bold">
          <span className="w-2.5 h-2.5 bg-blue-600 dark:bg-cyan-400 rounded-full animate-pulse" />
          PID DYNAMICS CONTROLLER
        </h2>
        <p className="text-sm text-slate-600 dark:text-gray-400 font-space mb-6">
          Tune the Kp, Ki, and Kd coefficients to observe how the sliding mass stabilizes around the setpoint.
          Trigger a step disturbance to watch the control loop react in real time.
        </p>
        <PidLab />
      </div>
    </main>
  )
}
