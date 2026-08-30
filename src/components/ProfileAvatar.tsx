"use client"
import React, { useState } from 'react'
import { profileData } from '@/data/profile'

interface ProfileAvatarProps {
  className?: string
  alt?: string
  priority?: boolean
}

export default function ProfileAvatar({
  className = "w-full h-full object-cover",
  alt = profileData.name,
  priority = false
}: ProfileAvatarProps) {
  // Source fallback chain: 1. GitHub local asset -> 2. Google Drive CDN -> 3. Legacy profile.jpg
  const sources = [
    profileData.avatarUrl || '/deepak.png',
    profileData.driveAvatarUrl || 'https://lh3.googleusercontent.com/d/1t6hQ1fs7cHKKlhqdNVc4k9VxU5aJFZ51',
    '/profile.jpg'
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleError = () => {
    if (currentIndex < sources.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  return (
    <img
      src={sources[currentIndex]}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      onError={handleError}
      className={className}
      data-testid="profile-avatar-img"
    />
  )
}
