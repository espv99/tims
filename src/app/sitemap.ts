import type { MetadataRoute } from 'next'
import { siteUrl } from './metadata'

const publicRoutes = ['/', '/timeline', '/club', '/consejo-estudiantil', '/personal-docente']

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route === '/' ? '' : route}`,
    changeFrequency: route === '/timeline' ? 'daily' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}
