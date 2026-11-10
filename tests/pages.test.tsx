import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AboutPage from '@/app/about/page'
import ProjectsPage from '@/app/projects/page'
import InternshipsPage from '@/app/internships/page'
import VortexCrawlerProject from '@/app/projects/vortex-crawler/page'
import AutoTwinProject from '@/app/projects/autotwin-ai/page'
import VgaManipulationProject from '@/app/projects/vga-manipulation/page'

// Mock RobotViewer because WebGL Canvas is mocked in jsdom
jest.mock('@/components/RobotViewer', () => {
  return function DummyRobotViewer() {
    return <div data-testid="robot-viewer">Mocked 3D Robot Viewer</div>
  }
})

describe('Page Routes Suite Tests', () => {
  test('AboutPage renders academic info and core stack', () => {
    render(<AboutPage />)
    expect(screen.getByText('SYSTEM')).toBeInTheDocument()
    expect(screen.getByText('DEEPAK R.')).toBeInTheDocument()
    expect(screen.getAllByText(/Dhaanish Ahmed College/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('ROS 2 Jazzy')).toBeInTheDocument()
  })

  test('ProjectsPage renders featured archives and research', () => {
    render(<ProjectsPage />)
    expect(screen.getByText('ENGINEERING')).toBeInTheDocument()
    expect(screen.getAllByText(/AutoTwin-AI/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Hybrid Vortex Crawler/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/WeldGuard-AI/i).length).toBeGreaterThanOrEqual(1)
  })

  test('InternshipsPage renders operational timeline and NDA notices', () => {
    render(<InternshipsPage />)
    expect(screen.getByText('OPERATIONAL')).toBeInTheDocument()
    expect(screen.getByText('Wildplant Terrestrial Solutions Pvt Ltd')).toBeInTheDocument()
    expect(screen.getByText('Precise3DM')).toBeInTheDocument()
    expect(screen.getAllByText('NDA PROTECTED').length).toBeGreaterThanOrEqual(1)
  })

  test('VortexCrawlerProject renders 3D viewer and CAD specs', () => {
    render(<VortexCrawlerProject />)
    expect(screen.getAllByText(/Hybrid Vortex Crawler/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByTestId('robot-viewer')).toBeInTheDocument()
    expect(screen.getAllByText(/Autodesk Fusion/i).length).toBeGreaterThanOrEqual(1)
  })

  test('AutoTwinProject renders automotive chassis digital twin and metrics', () => {
    render(<AutoTwinProject />)
    expect(screen.getAllByText(/AutoTwin-AI/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/AUTOMOTIVE CHASSIS INSPECTION/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/CONVOLUTIONAL AUTOENCODER/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/361,174 CAD VERTICES/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/HACKNIMA PITCH DECK/i).length).toBeGreaterThanOrEqual(1)
  })

  test('VgaManipulationProject renders policy architecture, MuJoCo videos, and benchmark metrics', () => {
    render(<VgaManipulationProject />)
    expect(screen.getAllByText(/VGA Policy/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/MUJOCO SIMULATION/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/CentroidRayRoPE/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/SmolVLA-450M/i).length).toBeGreaterThanOrEqual(1)
  })
})
