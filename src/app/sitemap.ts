import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.deepak-arkz.me'
  const routes = [
    '',
    '/about',
    '/projects',
    '/projects/autotwin-ai',
    '/projects/vortex-crawler',
    '/projects/aura',
    '/projects/sih',
    '/projects/edge-ai',
    '/internships',
    '/labs',
    '/contact',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
