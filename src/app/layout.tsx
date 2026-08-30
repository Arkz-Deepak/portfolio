import type { Metadata } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Deepak R',
  url: 'https://www.deepak-arkz.me',
  jobTitle: 'Robotics & Automation Engineer',
  description: 'Portfolio of Deepak R — B.E. Robotics & Automation engineer specializing in Physical AI, ROS 2 Jazzy, Autonomous Mobile Robots (AMR), Sim-to-Real Digital Twins, and Computer Vision.',
  knowsAbout: [
    'ROS 2 Jazzy',
    'Physical AI',
    'Nav2',
    'SLAM Toolbox',
    'Autonomous Navigation',
    'Sim-to-Real Digital Twins',
    'AutoTwin-AI',
    'Computer Vision',
    'Deep Reinforcement Learning',
    'Embedded RTOS'
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Dhaanish Ahmed College of Engineering (Anna University)',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.deepak-arkz.me'),
  title: {
    default: 'Deepak R | Robotics & Automation Engineer | Physical AI & ROS 2',
    template: '%s | Deepak R'
  },
  description: 'Portfolio of Deepak R — B.E. Robotics & Automation engineer specializing in Physical AI, ROS 2 Jazzy, Autonomous Mobile Robots (AMR), Sim-to-Real Digital Twins, and Computer Vision.',
  keywords: [
    'Deepak R',
    'Robotics Engineer',
    'ROS 2 Jazzy',
    'Physical AI',
    'Autonomous Navigation',
    'Nav2',
    'SLAM',
    'AutoTwin-AI',
    'Sim-to-Real Digital Twin',
    'Computer Vision',
    'Deep Reinforcement Learning'
  ],
  authors: [{ name: 'Deepak R', url: 'https://www.deepak-arkz.me' }],
  creator: 'Deepak R',
  alternates: {
    canonical: 'https://www.deepak-arkz.me',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.deepak-arkz.me',
    title: 'Deepak R | Robotics & Automation Engineer',
    description: 'Physical AI, ROS 2 Jazzy, Autonomous Navigation & Sim-to-Real Digital Twins.',
    siteName: 'Deepak R Portfolio',
    images: [
      {
        url: '/images/og-card.png',
        width: 1200,
        height: 630,
        alt: 'Deepak R Portfolio HUD'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak R | Robotics & Automation Engineer',
    description: 'Physical AI, ROS 2 Jazzy, Autonomous Navigation & Sim-to-Real Digital Twins.',
    images: ['/images/og-card.png']
  },
  verification: {
    google: 'EKpIS6UNRNpVPF-jDOJP4EqSZTAx_5HKQ-0QaxpFwRo',
    other: {
      'msvalidate.01': '7F5D6CB96D38AE70012DCEDBA213D60F',
    },
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
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <meta name="msvalidate.01" content="7F5D6CB96D38AE70012DCEDBA213D60F" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300 overflow-x-hidden w-full max-w-[100vw] font-sans antialiased selection:bg-cyan-500/30 flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
