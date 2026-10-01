import type { Metadata } from 'next'
import CinematicViewer from '@/components/CinematicViewer'

export const metadata: Metadata = {
  title: '3D Cinematic Digital Twin Experience | Deepak R.',
  description: 'Interactive 3D WebGL scrollytelling experience showcasing Hybrid Vortex Crawler, SIH 2026 Space Debris Cleaner, and AutoTwin-AI by Deepak R.',
}

export default function CinematicPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-slate-950">
      <CinematicViewer />
    </main>
  )
}
