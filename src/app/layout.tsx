import type { Metadata } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  title: 'Deepak R. | Robotics & ML Engineer',
  description: 'Portfolio of Deepak R., an aspiring Robotics and Machine Learning Engineer specializing in ROS2, computer vision, YOLO, and autonomous systems.',
  verification: {
    google: 'EKpIS6UNRNpVPF-jDOJP4EqSZTAx_5HKQ-0QaxpFwRo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-black text-cyan-400 font-sans antialiased selection:bg-cyan-500/30">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
