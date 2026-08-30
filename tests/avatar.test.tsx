import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProfileAvatar from '@/components/ProfileAvatar'
import { profileData } from '@/data/profile'

describe('ProfileAvatar Component Fallback Suite', () => {
  test('renders initial avatar pointing to GitHub repository local asset', () => {
    render(<ProfileAvatar />)
    const img = screen.getByTestId('profile-avatar-img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', profileData.avatarUrl || '/deepak.png')
    expect(img).toHaveAttribute('alt', profileData.name)
  })

  test('falls back to Google Drive CDN URL on first load error', () => {
    render(<ProfileAvatar />)
    const img = screen.getByTestId('profile-avatar-img')
    
    // Simulate first load error on local asset
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', profileData.driveAvatarUrl)
  })

  test('falls back to legacy /profile.jpg on second load error', () => {
    render(<ProfileAvatar />)
    const img = screen.getByTestId('profile-avatar-img')
    
    // First error: fallback to Drive
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', profileData.driveAvatarUrl)

    // Second error: fallback to profile.jpg
    fireEvent.error(img)
    expect(img).toHaveAttribute('src', '/profile.jpg')
  })

  test('respects custom alt text and eager/lazy loading props', () => {
    render(<ProfileAvatar alt="Deepak Headshot" priority={true} />)
    const img = screen.getByTestId('profile-avatar-img')
    expect(img).toHaveAttribute('alt', 'Deepak Headshot')
    expect(img).toHaveAttribute('loading', 'eager')
  })
})
