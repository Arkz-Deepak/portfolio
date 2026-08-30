import '@testing-library/jest-dom'
import React from 'react'

// MatchMedia Mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// ResizeObserver Mock
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// IntersectionObserver Mock
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock Framer Motion to prevent React 19 rAF animation loop deadlocks in JSDOM
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion')
  const customMotion = new Proxy(
    {},
    {
      get: (_target, prop) => {
        return React.forwardRef((props, ref) => {
          const { children, initial, animate, whileHover, whileInView, viewport, transition, ...rest } = props
          return React.createElement(prop, { ...rest, ref }, children)
        })
      }
    }
  )

  return {
    __esModule: true,
    ...actual,
    motion: customMotion,
    AnimatePresence: ({ children }) => children,
  }
})
