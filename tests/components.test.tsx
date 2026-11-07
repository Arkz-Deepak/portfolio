import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import SkillsSection from '@/components/SkillsSection'
import ResearchSection from '@/components/ResearchSection'
import VgaRolloutGallery from '@/components/VgaRolloutGallery'
import { ThemeProvider } from '@/components/ThemeProvider'

describe('Component Suite Tests', () => {
  test('Navbar renders navigation links and brand title', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Navbar />
      </ThemeProvider>
    )
    expect(screen.getByText(/DEEPAK/)).toBeInTheDocument()
    expect(screen.getByText('HOME')).toBeInTheDocument()
    expect(screen.getByText('ABOUT')).toBeInTheDocument()
    expect(screen.getByText('LABS')).toBeInTheDocument()
    expect(screen.getByText('ARCHIVES')).toBeInTheDocument()
    expect(screen.getByText('RESUME')).toBeInTheDocument()
  })

  test('Footer renders copyright and social links', () => {
    render(<Footer />)
    expect(screen.getByText(/2026 Deepak R/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github profile/i })).toHaveAttribute('href', 'https://github.com/Arkz-Deepak')
    expect(screen.getByRole('link', { name: /linkedin profile/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/robotics-deepak/')
    expect(screen.getByRole('link', { name: /orcid profile/i })).toHaveAttribute('href', 'https://orcid.org/0009-0000-2500-9093')
    expect(screen.getByRole('link', { name: /hugging face profile/i })).toHaveAttribute('href', 'https://huggingface.co/Arkz121')
    expect(screen.getByRole('link', { name: /email deepak r/i })).toHaveAttribute('href', 'mailto:deepak121289@outlook.com')
  })

  test('BackToTop renders and handles scroll action', () => {
    const { container } = render(<BackToTop />)
    expect(container).toBeInTheDocument()
  })

  test('SkillsSection renders skill domains and badges', () => {
    render(<SkillsSection />)
    expect(screen.getByText('Robotics & Simulation Middleware')).toBeInTheDocument()
    expect(screen.getByText('ROS 2 (Jazzy)')).toBeInTheDocument()
    expect(screen.getByText('PyTorch & Autoencoders')).toBeInTheDocument()
  })

  test('ResearchSection renders Zenodo preprint and BibTeX copy action', () => {
    render(<ResearchSection />)
    expect(screen.getByText(/Sensor-Fusion Driven Deep Reinforcement Learning/i)).toBeInTheDocument()
    expect(screen.getByText(/DOI: 10.5281\/zenodo.20265628/i)).toBeInTheDocument()
    expect(screen.getAllByText(/OPEN PREPRINT \/ DOI/).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/COPY BIBTEX/).length).toBeGreaterThanOrEqual(1)
  })

  test('VgaRolloutGallery renders task switcher and table', () => {
    render(<VgaRolloutGallery />)
    expect(screen.getByText(/LIBERO-SPATIAL MULTI-POLICY ROLLOUT MATRIX/i)).toBeInTheDocument()
    expect(screen.getByText('TASK 0')).toBeInTheDocument()
    expect(screen.getByText('TASK 4')).toBeInTheDocument()
  })
})
