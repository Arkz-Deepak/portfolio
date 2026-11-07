"use client"
import React, { useState } from 'react'
import { FaPlay, FaRobot, FaCheckCircle, FaBolt, FaWaveSquare } from 'react-icons/fa'

interface TaskVideo {
  id: string;
  name: string;
  taskNum: number;
  videoUrl: string;
  description: string;
  stats: {
    baseSuccess: string;
    smoothJerk: string;
    chunkJump: string;
    vgaLatency: string;
  };
}

const TASKS: TaskVideo[] = [
  {
    id: "task-0",
    name: "Task 0: Canonical Pick & Place",
    taskNum: 0,
    videoUrl: "/videos/vga-libero-t0-multitile.mp4",
    description: "6-variant comparative rollout matrix on LIBERO-Spatial Task 0. Compares Compact Baseline, Depth Supervision, Camera Rays, Smooth Chunk Joins, All Three Add-ons, and SmolVLA-450M with synchronized wrist-camera insets.",
    stats: {
      baseSuccess: "65.0% (10 demos)",
      smoothJerk: "4.82 m/s³ RMS",
      chunkJump: "1.06× normal step",
      vgaLatency: "18 ms (vs SmolVLA ~1,050 ms)"
    }
  },
  {
    id: "task-4",
    name: "Task 4: Spatial Insertion",
    taskNum: 4,
    videoUrl: "/videos/vga-libero-t4-multitile.mp4",
    description: "Multi-variant rollouts on spatial slot insertion. Evaluates how kinematic jerk regularization prevents gripper oscillation and motor chatter at high precision contact surfaces.",
    stats: {
      baseSuccess: "63.5% (10 demos)",
      smoothJerk: "5.05 m/s³ RMS",
      chunkJump: "1.05× normal step",
      vgaLatency: "20 ms"
    }
  },
  {
    id: "task-6",
    name: "Task 6: Articulated Push & Align",
    taskNum: 6,
    videoUrl: "/videos/vga-libero-t6-multitile.mp4",
    description: "Multi-policy execution showing trajectory tracking under non-prehensile manipulation. Smooth chunk joins eliminate erratic trajectory snaps between successive 16-step chunks.",
    stats: {
      baseSuccess: "64.8% (10 demos)",
      smoothJerk: "5.25 m/s³ RMS",
      chunkJump: "1.04× normal step",
      vgaLatency: "22 ms"
    }
  },
  {
    id: "task-9",
    name: "Task 9: Complex Multi-Object Reorientation",
    taskNum: 9,
    videoUrl: "/videos/vga-libero-t9-multitile.mp4",
    description: "Long-horizon manipulation requiring sequenced grasping and orientation correction. Demonstrates multi-seed generalization and robustness under high initial state variance.",
    stats: {
      baseSuccess: "63.0% (10 demos)",
      smoothJerk: "4.82 m/s³ RMS",
      chunkJump: "1.05× normal step",
      vgaLatency: "26 ms"
    }
  }
]

export default function VgaRolloutGallery() {
  const [selectedTask, setSelectedTask] = useState<TaskVideo>(TASKS[0])

  return (
    <div className="rounded-2xl border bg-white border-slate-200 shadow-md dark:bg-gray-900/50 dark:border-cyan-500/30 backdrop-blur-md p-6 mb-12">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <h2 className="text-lg md:text-xl font-bold font-orbitron text-slate-900 dark:text-white">
            LIBERO-SPATIAL MULTI-POLICY ROLLOUT MATRIX
          </h2>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-blue-300 dark:border-cyan-500/40">
          6 VARIANTS SIDE-BY-SIDE
        </span>
      </div>

      {/* Task selector tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        {TASKS.map((task) => (
          <button
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className={`px-3.5 py-2 text-xs font-orbitron font-bold rounded-xl whitespace-nowrap transition-all border ${
              selectedTask.id === task.id
                ? 'bg-blue-600 border-blue-600 text-white shadow-md dark:bg-cyan-500 dark:border-cyan-400 dark:text-black dark:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-black/50 dark:border-cyan-900/60 dark:text-gray-300 dark:hover:border-cyan-500/40'
            }`}
          >
            TASK {task.taskNum}
          </button>
        ))}
      </div>

      {/* Video Container */}
      <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-cyan-500/40 bg-black aspect-video shadow-lg mb-4">
        <video
          key={selectedTask.videoUrl}
          src={selectedTask.videoUrl}
          controls
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>

      {/* Description & Key Metrics */}
      <div className="bg-slate-50 dark:bg-black/40 p-4 rounded-xl border border-slate-200 dark:border-cyan-900/50 mb-6">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <h3 className="text-sm font-orbitron font-bold text-slate-900 dark:text-cyan-300">
            {selectedTask.name}
          </h3>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
            Rendered at 20 Hz • 220 Step Limit
          </span>
        </div>
        <p className="text-xs font-space text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {selectedTask.description}
        </p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-900/40">
            <span className="text-[10px] font-orbitron block text-slate-500 dark:text-slate-400">SUCCESS RATE</span>
            <span className="text-xs font-bold text-slate-900 dark:text-emerald-400 mt-0.5 block">{selectedTask.stats.baseSuccess}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-900/40">
            <span className="text-[10px] font-orbitron block text-slate-500 dark:text-slate-400">GRIPPER JERK</span>
            <span className="text-xs font-bold text-slate-900 dark:text-cyan-300 mt-0.5 block">{selectedTask.stats.smoothJerk}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-900/40">
            <span className="text-[10px] font-orbitron block text-slate-500 dark:text-slate-400">CHUNK JOIN JUMP</span>
            <span className="text-xs font-bold text-slate-900 dark:text-cyan-300 mt-0.5 block">{selectedTask.stats.chunkJump}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-cyan-900/40">
            <span className="text-[10px] font-orbitron block text-slate-500 dark:text-slate-400">INFERENCE LATENCY</span>
            <span className="text-xs font-bold text-slate-900 dark:text-cyan-300 mt-0.5 block">{selectedTask.stats.vgaLatency}</span>
          </div>
        </div>
      </div>

      {/* Empirical Ablation Benchmark Table */}
      <div>
        <h3 className="text-xs font-orbitron font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider flex items-center gap-1.5">
          <FaWaveSquare className="text-blue-600 dark:text-cyan-400" />
          <span>EMPIRICAL ABLATION SUITE (5 & 10 DEMOS ON RTX 4060 LAPTOP)</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px] border border-slate-200 dark:border-cyan-900/60 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-black/60 text-slate-700 dark:text-cyan-300 font-orbitron text-[10px] uppercase">
              <tr>
                <th className="p-2.5 border-b border-slate-200 dark:border-cyan-900/60">Policy Variant</th>
                <th className="p-2.5 border-b border-slate-200 dark:border-cyan-900/60">Demos</th>
                <th className="p-2.5 border-b border-slate-200 dark:border-cyan-900/60">Success (95% CI)</th>
                <th className="p-2.5 border-b border-slate-200 dark:border-cyan-900/60">Gripper Jerk</th>
                <th className="p-2.5 border-b border-slate-200 dark:border-cyan-900/60">Boundary Jump</th>
                <th className="p-2.5 border-b border-slate-200 dark:border-cyan-900/60">Inference Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-cyan-900/40 text-slate-800 dark:text-slate-300">
              <tr className="hover:bg-slate-50 dark:hover:bg-cyan-950/20">
                <td className="p-2.5 font-bold">VGA Compact Baseline</td>
                <td className="p-2.5">5</td>
                <td className="p-2.5">55.2 ± 4.0%</td>
                <td className="p-2.5">7.64 m/s³</td>
                <td className="p-2.5">2.88×</td>
                <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">18 ms</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-cyan-950/20 bg-emerald-50/40 dark:bg-cyan-950/30">
                <td className="p-2.5 font-bold text-blue-900 dark:text-cyan-300">+ Smooth Chunk Joins</td>
                <td className="p-2.5">5</td>
                <td className="p-2.5">51.0 ± 4.0%</td>
                <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">4.82 m/s³ (−37%)</td>
                <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">1.06× (seamless)</td>
                <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">20 ms</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-cyan-950/20">
                <td className="p-2.5 font-bold">All Three Add-ons</td>
                <td className="p-2.5">5</td>
                <td className="p-2.5">54.3 ± 4.0%</td>
                <td className="p-2.5">5.04 m/s³</td>
                <td className="p-2.5">1.05×</td>
                <td className="p-2.5">26 ms</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-cyan-950/20 text-slate-500">
                <td className="p-2.5">SmolVLA-450M (Equal Budget)</td>
                <td className="p-2.5">5</td>
                <td className="p-2.5">54.5 ± 6.9%</td>
                <td className="p-2.5">7.32 m/s³</td>
                <td className="p-2.5">2.20×</td>
                <td className="p-2.5 text-rose-500 dark:text-rose-400 font-bold">~1,050 ms (58× slower)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-cyan-950/20">
                <td className="p-2.5 font-bold">VGA Compact Baseline</td>
                <td className="p-2.5">10</td>
                <td className="p-2.5">65.0 ± 3.8%</td>
                <td className="p-2.5">7.95 m/s³</td>
                <td className="p-2.5">2.83×</td>
                <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">25 ms</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-cyan-950/20 bg-emerald-50/40 dark:bg-cyan-950/30">
                <td className="p-2.5 font-bold text-blue-900 dark:text-cyan-300">+ Smooth Chunk Joins</td>
                <td className="p-2.5">10</td>
                <td className="p-2.5">62.5 ± 3.9%</td>
                <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">5.05 m/s³ (−36%)</td>
                <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">1.05× (seamless)</td>
                <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">24 ms</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-cyan-950/20">
                <td className="p-2.5 font-bold">X-VLA-0.9B (Equal Budget)</td>
                <td className="p-2.5">10</td>
                <td className="p-2.5">71.0 ± 6.3%</td>
                <td className="p-2.5 text-rose-500 dark:text-rose-400">8.90 m/s³ (jerkiest)</td>
                <td className="p-2.5 text-rose-500 dark:text-rose-400">3.42× (severe jump)</td>
                <td className="p-2.5">182 ms</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200 dark:bg-cyan-950/40 dark:border-cyan-500/30 text-xs font-space text-slate-700 dark:text-gray-300">
          <span className="font-bold font-orbitron text-blue-900 dark:text-cyan-300 block mb-1">
            KEY EMPIRICAL TAKEAWAY:
          </span>
          Smooth chunk joins are the single add-on with a clear, repeatable physical benefit: gripper jerk drops by ~37% across all demo budgets, and chunk-boundary trajectory jumps drop from 2.88× down to 1.05× with hard real-time latency (18–24 ms), running on consumer hardware without large VLA inference bottlenecks.
        </div>
      </div>
    </div>
  )
}
