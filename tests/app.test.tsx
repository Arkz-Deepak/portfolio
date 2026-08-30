import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/app/page'
import { ThemeProvider } from '@/components/ThemeProvider'

// Mock ParticleBackground
jest.mock('@/components/ParticleBackground', () => {
  return function DummyParticleBackground() {
    return <div data-testid="particle-bg">Particle Background Mock</div>
  }
})

describe('Portfolio Home Page', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should render the boot sequence initially and transition to hero', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Home />
      </ThemeProvider>
    )
    
    // Boot sequence initially visible
    expect(screen.getByText('INITIALIZING DEEPAK.OS V2.0...')).toBeInTheDocument()

    // Advance timer past boot duration (1500ms)
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    // Hero title
    expect(screen.getByText('DEEPAK')).toBeInTheDocument()
    expect(screen.getAllByText(/Robotics & Automation Engineer/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/9.2 \/ 10.0/)).toBeInTheDocument()

    // Featured Projects
    expect(screen.getAllByText(/AutoTwin-AI/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Hybrid Vortex Crawler/i).length).toBeGreaterThanOrEqual(1)

    // Research Section
    expect(screen.getAllByText(/Sensor-Fusion Driven Deep Reinforcement Learning/i).length).toBeGreaterThanOrEqual(1)
  })

  it('should render particle background when in dark mode', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <Home />
      </ThemeProvider>
    )

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(screen.getByTestId('particle-bg')).toBeInTheDocument()
  })
})
