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
    expect(screen.getByText('INITIALIZING DEEPAK.OS V2.0...')).toBeInTheDocument()
  })

  it('should reveal the hero section after booting', () => {
    render(<Home />)
    
    act(() => {
      jest.advanceTimersByTime(2500)
    })
    
    // Check if hero title is rendered
    expect(screen.getByText('DEEPAK')).toBeInTheDocument()
    expect(screen.getByText('Autonomous Systems Architect')).toBeInTheDocument()
    
    // Check if the mock background is rendered
    expect(screen.getByTestId('particle-bg')).toBeInTheDocument()
    
    // Check if project grids are present
    expect(screen.getByText('VisionX (AURA)')).toBeInTheDocument()
    expect(screen.getByText('Autonomous ROS 2 Rover')).toBeInTheDocument()
    expect(screen.getByText('CV Autonomous Robot')).toBeInTheDocument()
  })
})
