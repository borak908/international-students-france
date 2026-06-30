import type { MetadataRoute } from 'next'
import cities from '@/data/cities.json'
import { blogPosts } from '@/data/blog'

const BASE_URL = 'https://comparestudyfrance.com'

// Update this date whenever shared layout or global content changes
const SITE_LAST_UPDATED = new Date('2026-06-30')

export default function sitemap(): MetadataRoute.Sitemap {
  // Each city uses its own lastUpdated field — update that field in cities.json
  // whenever you change a city's data, so Googlebot prioritises recrawling it
  const cityEntries: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/cities/${city.slug}`,
    lastModified: new Date(city.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/cities`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(
        Math.max(...blogPosts.map((p) => new Date(p.date).getTime()))
      ),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/budget-planner`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/city-quiz`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    ...cityEntries,
    ...blogEntries,
  ]
}
