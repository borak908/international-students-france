import { ImageResponse } from 'next/og'
import { blogPosts } from '@/data/blog'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export function generateAlt({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  return post ? post.metaTitle : 'Compare Study France — Student Guide'
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return new Response('Not found', { status: 404 })

  // Shorten title for display if over ~60 chars — truncate at last word boundary
  const MAX = 62
  const displayTitle =
    post.title.length > MAX
      ? post.title.slice(0, MAX).replace(/\s+\S*$/, '') + '…'
      : post.title

  // Format date as "12 May 2025"
  const dateLabel = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D1B35',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Tricolour stripe top */}
        <div style={{ display: 'flex', height: 8, width: '100%' }}>
          <div style={{ flex: 1, background: '#4A70C4' }} />
          <div style={{ flex: 1, background: '#F5F2ED' }} />
          <div style={{ flex: 1, background: '#B03232' }} />
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '56px 80px',
            justifyContent: 'space-between',
          }}
        >
          {/* Top: site brand + category pill */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#90ADDA', fontSize: 18, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Compare Study France
            </span>
            <div
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(144,173,218,0.25)',
                borderRadius: 999,
                padding: '8px 20px',
                color: '#90ADDA',
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Student Guide · {dateLabel}
            </div>
          </div>

          {/* Centre: article title + excerpt */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ color: '#90ADDA', fontSize: 20, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              International Student Blog
            </div>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: displayTitle.length > 48 ? 52 : 62,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                maxWidth: 900,
              }}
            >
              {displayTitle}
            </div>
            <div style={{ color: '#B8CAE8', fontSize: 22, lineHeight: 1.45, maxWidth: 800, marginTop: 4 }}>
              {post.excerpt.length > 110 ? post.excerpt.slice(0, 110).replace(/\s+\S*$/, '') + '…' : post.excerpt}
            </div>
          </div>

          {/* Bottom: read time pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(144,173,218,0.2)',
                borderRadius: 12,
                padding: '12px 20px',
                color: '#90ADDA',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {post.readTime}
            </div>
            <div
              style={{
                background: 'rgba(176,50,50,0.25)',
                border: '1px solid rgba(176,50,50,0.4)',
                borderRadius: 12,
                padding: '12px 20px',
                color: '#F0A0A0',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              comparestudyfrance.com
            </div>
          </div>
        </div>

        {/* Tricolour stripe bottom */}
        <div style={{ display: 'flex', height: 8, width: '100%' }}>
          <div style={{ flex: 1, background: '#4A70C4' }} />
          <div style={{ flex: 1, background: '#F5F2ED' }} />
          <div style={{ flex: 1, background: '#B03232' }} />
        </div>
      </div>
    ),
    { ...size },
  )
}
