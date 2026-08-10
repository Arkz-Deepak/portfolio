import type { Metadata } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Deepak R',
  jobTitle: 'Robotics & Autonomous Systems Architect',
  description: 'Official portfolio of Deepak R, a Robotics & Automation Engineering student specializing in ROS 2, YOLO computer vision, and embedded machine learning.',
  knowsAbout: ['ROS 2', 'YOLO Vision', 'Embedded IoT', 'Machine Learning', 'Robotics', 'Control Systems', 'Computer Vision', 'Autonomous Systems'],
  almaMater: {
    '@type': 'EducationalOrganization',
    name: 'Dhaanish Ahmed College of Engineering',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL('https://arkz-deepak-portfolio.vercel.app'),
  title: 'Deepak R',
  description: 'Official portfolio of Deepak R, a Robotics & Automation Engineering student specializing in ROS 2, YOLO computer vision, and embedded machine learning.',
  keywords: [
    'Deepak R',
    'Deepak R portfolio',
    'Robotics Engineer',
    'ROS 2',
    'Chennai',
    'Autonomous Systems'
  ],
  authors: [{ name: 'Deepak R' }],
  creator: 'Deepak R',
  openGraph: {
    title: 'Deepak R',
    description: 'Official portfolio of Deepak R, a Robotics & Automation Engineering student specializing in ROS 2, YOLO computer vision, and embedded machine learning.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Deepak R Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepak R',
    description: 'Official portfolio of Deepak R, a Robotics & Automation Engineering student specializing in ROS 2, YOLO computer vision, and embedded machine learning.',
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
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
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
      </body>
    </html>
  )
}
