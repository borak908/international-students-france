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

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
        {/* Subtle tricolour strip */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#002395]" />
          <div className="flex-1 bg-white/60" />
          <div className="flex-1 bg-[#ED2939]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest text-blue-300 uppercase mb-4">
            The complete guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-balance mb-6">
            Where should international students<br className="hidden sm:block" /> study in France?
          </h1>
          <p className="text-blue-200 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Compare cities by housing cost, universities, transport, visa rules, and student life.
            Real data. No fluff.
          </p>
          <a
            href="#cities"
            className="inline-flex items-center gap-2 bg-white text-blue-900 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 transition-colors text-sm shadow-lg"
          >
            Explore cities
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-stone-50" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* ── City cards ── */}
      <section id="cities" className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-800">Browse Cities</h2>
          <p className="text-stone-500 mt-2 text-sm">
            Click a city for the full breakdown — housing, unis, transport and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cityData.map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="group bg-white rounded-2xl border border-stone-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              {/* Card top colour bar */}
              <div className={`h-1.5 ${city.slug === 'paris' ? 'bg-gradient-to-r from-[#002395] via-white to-[#ED2939]' : 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500'}`} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-stone-800 group-hover:text-blue-700 transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">{city.region}, France</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-stone-300 group-hover:text-blue-500 transition-colors mt-0.5"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                <p className="text-stone-500 text-sm leading-relaxed mb-5">{city.tagline}</p>

                {/* Hero stats */}
                <div className="grid grid-cols-2 gap-3">
                  {city.heroStats.map((stat) => (
                    <div key={stat.label} className="bg-stone-50 rounded-xl p-3">
                      <p className="text-xs text-stone-400 font-medium mb-0.5">{stat.label}</p>
                      <p className="text-base font-bold text-stone-800">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {city.universities.grandesEcoles.slice(0, 3).map((school) => (
                    <span
                      key={school}
                      className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full"
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

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left px-5 py-4 text-stone-400 font-medium text-xs uppercase tracking-wider w-1/3">
                  Metric
                </th>
                {cityData.map((city) => (
                  <th key={city.slug} className="px-5 py-4 text-center font-bold text-stone-800">
                    {city.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? 'bg-stone-50/50' : 'bg-white'}
                >
                  <td className="px-5 py-3.5 text-stone-600 font-medium">{row.label}</td>
                  {cityData.map((city) => (
                    <td key={city.slug} className="px-5 py-3.5 text-center text-stone-700 font-semibold">
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
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
