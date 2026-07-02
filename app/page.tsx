import Link from 'next/link'
import cities from '@/data/cities.json'
import type { City } from '@/types/city'

const cityData = cities as City[]

// ── Small comparison table data ────────────────────────────────────────────────
const compareRows = [
  {
    label: 'Monthly Budget',
    values: (c: City) => `€${c.housing.totalMonthlyBudget}`,
  },
  {
    label: 'Studio Rent',
    values: (c: City) => `€${c.housing.studioRentMonthly}/mo`,
  },
  {
    label: 'Shared Room',
    values: (c: City) => c.housing.sharedRoomMonthly + '/mo',
  },
  {
    label: 'EU Tuition / yr',
    values: (c: City) => `€${c.universities.tuitionEUPerYear}`,
  },
  {
    label: 'Non-EU Tuition / yr',
    values: (c: City) => `€${c.universities.tuitionNonEUPerYear}`,
  },
  {
    label: 'Student Transport',
    values: (c: City) => `€${c.transport.studentPassMonthly}/mo`,
  },
  {
    label: 'Part-time Work',
    values: (c: City) => c.workVisa.partTimeHours,
  },
  {
    label: 'Safety Rating',
    values: (c: City) => c.overview.safetyRating,
  },
]

export const metadata = {
  alternates: {
    canonical: 'https://comparestudyfrance.com',
  },
}

export default function HomePage() {
  const homepageJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Compare Study France',
      url: 'https://comparestudyfrance.com',
      description:
        'The complete comparison guide for international students choosing where to study in France. Compare 12 cities by housing costs, universities, transport, visa rules, and student life.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://comparestudyfrance.com/cities/{search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Compare Study France — Compare French Cities for International Students',
      url: 'https://comparestudyfrance.com',
      description:
        'The complete comparison guide for international students choosing where to study in France. Compare 12 cities by housing costs, universities, transport, visa rules, and student life.',
      inLanguage: 'en',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0D1B35] via-[#122240] to-[#182C50] text-white overflow-hidden">
        {/* Subtle tricolour strip */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#4A70C4]" />
          <div className="flex-1 bg-white/60" />
          <div className="flex-1 bg-[#B03232]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#90ADDA] uppercase mb-4">
            The complete guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-balance mb-6">
            Where should international students<br className="hidden sm:block" /> study in France?
          </h1>
          <p className="text-[#B8CAE8] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Compare cities by housing cost, universities, transport, visa rules, and student life.
            Real data. No fluff.
          </p>
          <a
            href="#cities"
            className="inline-flex items-center gap-2 bg-[#FDFBF7] text-[#0D1B35] font-semibold px-6 py-3 rounded-full hover:bg-[#EDF0F8] transition-colors text-sm shadow-lg"
          >
            Explore cities
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#F5F2ED]" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* ── City cards ── */}
      <section id="cities" className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800">Browse Cities</h2>
          <p className="text-stone-500 mt-2 text-sm">
            Click a city for the full breakdown — housing, unis, transport and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cityData.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="group bg-[#FDFBF7] rounded-2xl border border-stone-200 hover:border-[#90ADDA] hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              {/* Card top colour bar — French tricolour for all */}
              <div className="h-1.5 bg-gradient-to-r from-[#4A70C4] via-white to-[#B03232]" />

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-stone-800 group-hover:text-[#1E3A6E] transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">{city.region}, France</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-stone-300 group-hover:text-[#1E3A6E] transition-colors mt-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <p className="text-stone-500 text-sm leading-relaxed mb-5">{city.tagline}</p>

                {/* Hero stats */}
                <div className="grid grid-cols-2 gap-3">
                  {city.heroStats.map((stat) => (
                    <div key={stat.label} className="bg-[#F5F2ED] rounded-xl p-3">
                      <p className="text-xs text-stone-400 font-medium mb-0.5">{stat.label}</p>
                      <p className="text-base font-bold text-stone-800">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {city.universities.grandesEcoles.slice(0, 3).map((school) => (
                    <span
                      key={school}
                      className="bg-[#EDF0F8] text-[#1E3A6E] text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {school}
                    </span>
                  ))}
                  {city.universities.grandesEcoles.length > 3 && (
                    <span className="bg-stone-100 text-stone-500 text-xs font-medium px-2.5 py-1 rounded-full">
                      +{city.universities.grandesEcoles.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Side-by-side comparison table ── */}
      <section id="compare" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800">Quick Comparison</h2>
          <p className="text-stone-500 mt-2 text-sm">Key numbers side by side</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 overflow-x-auto shadow-sm">
          <table className="text-sm" style={{ minWidth: '900px' }}>
            <thead>
              <tr className="bg-[#0D1B35] border-b border-[#1E3A6E]">
                <th className="text-left px-4 py-4 text-white font-bold text-xs uppercase tracking-wider sticky left-0 bg-[#0D1B35] z-20 min-w-[140px]">
                  Metric
                </th>
                {cityData.map((city) => (
                  <th key={city.slug} className="px-3 py-4 text-center font-bold text-white whitespace-nowrap min-w-[110px]">
                    <Link href={`/cities/${city.slug}`} className="hover:text-[#90ADDA] transition-colors">
                      {city.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? 'bg-[#F5F2ED]/50' : 'bg-white'}
                >
                  <td className="px-4 py-3 text-white font-semibold sticky left-0 z-20 text-xs bg-[#0D1B35]">{row.label}</td>
                  {cityData.map((city) => (
                    <td key={city.slug} className="px-3 py-3 text-center text-stone-700 font-semibold text-xs whitespace-nowrap">
                      {row.values(city)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Visa info banner ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-gradient-to-r from-[#EDF0F8] to-[#F5F6FC] border border-[#C5D0EC] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="text-3xl">🎓</div>
          <div className="flex-1">
            <h3 className="font-bold text-stone-800 text-base mb-1">Tuition fees are the same across all French public universities</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              EU students pay <strong>€178/year</strong> and non-EU students pay <strong>€2,895/year</strong> — regardless of whether you study in Paris or any other city.
              Your choice of city should be driven by cost of living, career goals, and vibe.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
