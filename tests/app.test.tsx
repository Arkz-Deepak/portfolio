import { render, screen, act } from '@testing-library/react'
import Home from '@/app/page'

// Mock the ParticleBackground because Three.js canvas in jsdom can be problematic
jest.mock('@/components/ParticleBackground', () => {
  return function DummyParticleBackground() {
    return <div data-testid="particle-bg">Particle Background Mock</div>
  }
})

describe('Portfolio Home Page', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should render the boot sequence initially', () => {
    render(<Home />)
    expect(screen.getByText('INITIALIZING DEEPAK.OS...')).toBeInTheDocument()
  })

  it('should reveal the hero section after booting', () => {
    render(<Home />)
    
    act(() => {
      jest.advanceTimersByTime(2500)
    })
    
    // Check if hero title is rendered
    expect(screen.getByText('DEEPAK')).toBeInTheDocument()
    expect(screen.getByText('Aspiring Robotics & ML Engineer')).toBeInTheDocument()
    
    // Check if the mock background is rendered
    expect(screen.getByTestId('particle-bg')).toBeInTheDocument()
    
    // Check if project grids are present
    expect(screen.getByText('AURA')).toBeInTheDocument()
    expect(screen.getByText('SIH 2025 AI')).toBeInTheDocument()
    expect(screen.getByText('Edge Perception')).toBeInTheDocument()
  })
})
