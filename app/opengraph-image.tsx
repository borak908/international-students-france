import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Compare Study France — Compare French Cities for International Students'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
            padding: '64px 80px',
            justifyContent: 'space-between',
          }}
        >
          {/* Top: logo mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Simplified pin logo */}
            <div
              style={{
                width: 48,
                height: 48,
                background: 'white',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              📍
            </div>
            <span style={{ color: '#90ADDA', fontSize: 18, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Compare Study France
            </span>
          </div>

          {/* Centre: headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ color: '#90ADDA', fontSize: 20, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              The complete guide
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 68, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Where should you<br />study in France?
            </div>
            <div style={{ color: '#B8CAE8', fontSize: 26, lineHeight: 1.4, maxWidth: 700 }}>
              Compare 12 cities by housing cost, universities,<br />
              climate, and student life. Real data. No fluff.
            </div>
          </div>

          {/* Bottom: stat pills */}
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: '12 cities', sub: 'compared' },
              { label: '€800–€1,100', sub: 'monthly budget range' },
              { label: '€178/yr', sub: 'EU tuition (all cities)' },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(144,173,218,0.25)',
                  borderRadius: 12,
                  padding: '14px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <span style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700 }}>{s.label}</span>
                <span style={{ color: '#90ADDA', fontSize: 14 }}>{s.sub}</span>
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
