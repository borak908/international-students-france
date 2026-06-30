import { ImageResponse } from 'next/og'
import cities from '@/data/cities.json'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Pre-generate for all city slugs at build time
export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }))
}

export function generateAlt({ params }: { params: { slug: string } }) {
  const city = cities.find((c) => c.slug === params.slug)
  return city
    ? `Study in ${city.name}, France — International Student Guide`
    : 'Compare Study France'
}

export default function Image({ params }: { params: { slug: string } }) {
  const city = cities.find((c) => c.slug === params.slug)
  if (!city) return new Response('Not found', { status: 404 })

  const budgetLabel =
    city.housing.totalMonthlyBudget <= 850
      ? 'Budget-friendly'
      : city.housing.totalMonthlyBudget <= 1000
        ? 'Mid-range'
        : 'Premium'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D1B35',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
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
          {/* Top: site brand */}
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
              {budgetLabel} · {city.region}
            </div>
          </div>

          {/* Centre: city headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ color: '#90ADDA', fontSize: 22, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              International Student Guide
            </div>
            <div style={{ color: '#FFFFFF', fontSize: city.name.length > 12 ? 72 : 84, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
              Study in {city.name}
            </div>
            <div style={{ color: '#B8CAE8', fontSize: 22, lineHeight: 1.45, maxWidth: 720, marginTop: 8 }}>
              {city.tagline}
            </div>
          </div>

          {/* Bottom: four key stats */}
          <div style={{ display: 'flex', gap: 14 }}>
            {[
              { label: 'Monthly budget',   value: `€${city.housing.totalMonthlyBudget}` },
              { label: 'Students',          value: city.overview.studentPopulation },
              { label: 'Summer avg',        value: `${city.cityLife.climate.avgSummerTempC}°C` },
              { label: 'Sunshine',          value: `${city.cityLife.climate.sunshineDaysPerYear} days/yr` },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(144,173,218,0.2)',
                  borderRadius: 14,
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span style={{ color: '#90ADDA', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {s.label}
                </span>
                <span style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 700 }}>{s.value}</span>
              </div>
            ))}
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
