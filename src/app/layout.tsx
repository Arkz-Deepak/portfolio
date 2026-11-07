import type { Metadata, Viewport } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://www.deepak-arkz.me/#person',
      name: 'Deepak R',
      givenName: 'Deepak',
      familyName: 'R',
      additionalName: 'Rajender',
      alternateName: [
        'Deepak R',
        'Robotics Deepak',
        'Deepak Robotics',
        'Deepak Rajender',
        'Arkz Deepak',
        'DACE Deepak',
        'Deepak DACE',
        'Deepak R DACE',
        'Deepak R Dhaanish Ahmed College of Engineering',
        'Deepak R (Robotics & Automation)'
      ],
      url: 'https://www.deepak-arkz.me',
      image: 'https://www.deepak-arkz.me/deepak.png',
      jobTitle: 'Robotics & Automation Engineer | Physical AI Researcher',
      description: 'Official engineering portfolio and research archives of Deepak R (Robotics Deepak) — B.E. Robotics & Automation engineering student at Dhaanish Ahmed College of Engineering (DACE, Anna University) specializing in Physical AI, Embodied Robotics (MuJoCo/LeRobot), ROS 2 Jazzy, Autonomous Mobile Robots, Sim-to-Real Digital Twins, and Computer Vision.',
      sameAs: [
        'https://www.linkedin.com/in/robotics-deepak/',
        'https://github.com/Arkz-Deepak',
        'https://orcid.org/0009-0000-2500-9093',
        'https://openreview.net/profile?id=~Deepak_R2',
        'https://huggingface.co/Arkz121',
        'https://www.deepak-arkz.me'
      ],
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Dhaanish Ahmed College of Engineering',
          alternateName: 'DACE',
          url: 'https://dhaanish.org/'
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Anna University',
          url: 'https://www.annauniv.edu/'
        }
      ],
      award: [
        'Top Finalist — Build 2026 × ByteAsk Open Source Challenge',
        'Finalist — HackNIMA 2026 International Hackathon (AutoTwin-AI)',
        'Team Lead — Smart India Hackathon 2026 (Problem Statement SIH26226)',
        'Selected Interviewee — IIT Mandi CAIR Project RAHAT (Trauma Robotics)'
      ],
      knowsAbout: [
        'ROS 2 Jazzy',
        'Physical AI',
        'Embodied AI',
        'MuJoCo',
        'LeRobot',
        'Nav2',
        'SLAM Toolbox',
        'Autonomous Navigation',
        'Sim-to-Real Digital Twins',
        'AutoTwin-AI',
        'Computer Vision',
        'YOLOv8',
        'Deep Reinforcement Learning',
        'Verilog HDL',
        'VGA Signal Generation',
        'Embedded RTOS',
        'Aerodynamic Wall-Climbing Robotics',
        'Robotics Engineering'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.deepak-arkz.me/#website',
      url: 'https://www.deepak-arkz.me',
      name: 'Deepak R | Robotics & Automation Engineer',
      description: 'Official portfolio, project archives, and research publications of Deepak R — Physical AI, ROS 2 Jazzy, Autonomous Systems & Sim-to-Real Digital Twins.',
      publisher: {
        '@id': 'https://www.deepak-arkz.me/#person'
      },
      inLanguage: 'en-US'
    }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.deepak-arkz.me'),
  title: {
    default: 'Deepak R | Robotics & Automation Engineer | Physical AI & ROS 2',
    template: '%s | Deepak R'
  },
  description: 'Official portfolio of Deepak R (Robotics Deepak) — B.E. Robotics & Automation engineer at Dhaanish Ahmed College of Engineering (DACE, Anna University) specializing in Physical AI, ROS 2 Jazzy, Autonomous Mobile Robots (AMR), Sim-to-Real Digital Twins, and Computer Vision.',
  keywords: [
    'Deepak R',
    'Deepak R Robotics',
    'Robotics Deepak',
    'Deepak Robotics',
    'Deepak Rajender',
    'Arkz Deepak',
    'DACE Deepak',
    'Deepak DACE',
    'Dhaanish Ahmed College of Engineering Deepak',
    'Dhaanish College Deepak',
    'Danish College of Engineering Deepak',
    'Deepak R Engineer',
    'Deepak R Portfolio',
    'Robotics Engineer Chennai',
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
  publisher: 'Deepak R',
  alternates: {
    canonical: 'https://www.deepak-arkz.me',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/deepak.png',
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://www.deepak-arkz.me',
    title: 'Deepak R | Robotics & Automation Engineer',
    description: 'Official portfolio of Deepak R (Robotics Deepak) — Physical AI, ROS 2 Jazzy, Autonomous Systems & Sim-to-Real Digital Twins.',
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
    description: 'Physical AI, ROS 2 Jazzy, Autonomous Systems & Sim-to-Real Digital Twins.',
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
        <meta name="author" content="Deepak R" />
        <meta name="profile:first_name" content="Deepak" />
        <meta name="profile:last_name" content="R" />
        <meta name="profile:username" content="Arkz-Deepak" />
        <meta name="msvalidate.01" content="7F5D6CB96D38AE70012DCEDBA213D60F" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300 overflow-x-hidden w-full max-w-[100vw] font-sans antialiased selection:bg-cyan-500/30 flex flex-col min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          <div className="flex-grow w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">
            {children}
          </div>
          <BackToTop />
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
