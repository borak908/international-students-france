import type { MetadataRoute } from 'next'
import cities from '@/data/cities.json'

const BASE_URL = 'https://comparestudyfrance.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const cityEntries: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/cities/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/cities`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...cityEntries,
  ]
}
