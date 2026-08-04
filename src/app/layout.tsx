import type { Metadata } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Deepak R.',
  jobTitle: 'Autonomous Systems Architect & Robotics Engineer',
  description: 'Robotics engineering student at Anna University specializing in ROS2 Navigation, YOLO Vision, and Embedded IoT.',
  knowsAbout: ['ROS2', 'YOLO Vision', 'Embedded IoT', 'Machine Learning', 'Robotics', 'Control Systems', 'Computer Vision'],
  almaMater: {
    '@type': 'EducationalOrganization',
    name: 'Anna University',
  },
}

export const metadata: Metadata = {
  title: {
    default: 'Deepak R. | Robotics & ML Engineer',
    template: '%s | Deepak R.',
  },
  description: 'Portfolio of Deepak R., an Autonomous Systems Architect & Robotics Engineering student specializing in ROS2, computer vision, YOLO, and autonomous systems.',
  keywords: [
    'Deepak R',
    'Robotics Engineer',
    'Machine Learning Engineer',
    'ROS2',
    'YOLO',
    'Computer Vision',
    'Autonomous Systems Architect',
    'Anna University',
    'Robotics Portfolio'
  ],
  authors: [{ name: 'Deepak R.' }],
  creator: 'Deepak R.',
  openGraph: {
    title: 'Deepak R. | Robotics & ML Engineer',
    description: 'Autonomous Systems Architect specializing in ROS2, YOLO Vision, and Embedded IoT.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Deepak R. Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak R. | Robotics & ML Engineer',
    description: 'Autonomous Systems Architect specializing in ROS2, YOLO Vision, and Embedded IoT.',
  },
  verification: {
    google: 'EKpIS6UNRNpVPF-jDOJP4EqSZTAx_5HKQ-0QaxpFwRo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-cyan-400 font-sans antialiased selection:bg-cyan-500/30 transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
