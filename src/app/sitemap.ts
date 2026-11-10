import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.deepak-arkz.me'
  
  const routes: { path: string; priority: number; changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' }[] = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/about', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/projects', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/projects/vga-manipulation', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/projects/autotwin-ai', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/projects/vortex-crawler', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/projects/aura', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/projects/sih', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/projects/edge-ai', priority: 0.75, changeFrequency: 'monthly' },
    { path: '/internships', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/resume', priority: 0.85, changeFrequency: 'monthly' },
    { path: '/labs', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  ]

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
