import type { Metadata } from 'next'
import Link from 'next/link'
import cities from '@/data/cities.json'
import type { City } from '@/types/city'

const cityData = cities as City[]

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    absolute: 'Compare Cities to Study in France — All 12 Student Cities',
  },
  description:
    'Compare all 12 major French student cities side by side — monthly budget, top universities, climate, safety, and student life. Find the best city in France for your degree.',
  alternates: {
    canonical: 'https://comparestudyfrance.com/cities',
  },
  openGraph: {
    title: 'Compare All 12 Cities to Study in France',
    description:
      'Monthly budgets from €800 to €1,100. 12 cities. Compare housing costs, universities, climate, and internship scenes to find your perfect French student city.',
    type: 'website',
    url: 'https://comparestudyfrance.com/cities',
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getBudgetTier(budget: number): { label: string; className: string } {
  if (budget <= 850)  return { label: 'Budget-friendly', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  if (budget <= 1000) return { label: 'Mid-range',       className: 'bg-amber-50  text-amber-700  border-amber-200'  }
  return               { label: 'Premium',          className: 'bg-rose-50   text-rose-700   border-rose-200'   }
}

function ClimateBar({ city }: { city: City }) {
  const { avgSummerTempC, sunshineDaysPerYear } = city.cityLife.climate
  return (
    <div className="flex items-center gap-3 text-xs text-stone-500">
      <span>☀️ {sunshineDaysPerYear} days/yr</span>
      <span className="text-stone-300">·</span>
      <span>🌡️ {avgSummerTempC}°C summer</span>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CitiesPage() {
  // Sort cheapest first — most useful ordering for comparison intent
  const sorted = [...cityData].sort(
    (a, b) => a.housing.totalMonthlyBudget - b.housing.totalMonthlyBudget
  )

  const budgetFriendly = sorted.filter((c) => c.housing.totalMonthlyBudget <= 850)
  const midRange       = sorted.filter((c) => c.housing.totalMonthlyBudget > 850 && c.housing.totalMonthlyBudget <= 1000)
  const premium        = sorted.filter((c) => c.housing.totalMonthlyBudget > 1000)

  const groups = [
    { label: 'Budget-friendly',  sublabel: 'Under €850/month all-in', cities: budgetFriendly, accent: 'bg-emerald-500' },
    { label: 'Mid-range',        sublabel: '€850–€1,000/month all-in', cities: midRange,       accent: 'bg-amber-500'  },
    { label: 'Premium',          sublabel: 'Over €1,000/month all-in', cities: premium,        accent: 'bg-rose-500'   },
  ]

  // JSON-LD: BreadcrumbList + ItemList
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://comparestudyfrance.com' },
        { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://comparestudyfrance.com/cities' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Cities to Study in France for International Students',
      description: metadata.description,
      numberOfItems: cityData.length,
      itemListElement: sorted.map((city, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: city.name,
        url: `https://comparestudyfrance.com/cities/${city.slug}`,
        description: city.tagline,
      })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#0D1B35] via-[#122240] to-[#182C50] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14">
          <nav className="flex items-center gap-2 text-[#90ADDA] text-xs mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Cities</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Compare All 12 Cities<br className="hidden sm:block" /> to Study in France
          </h1>
          <p className="text-[#B8CAE8] text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
            Monthly budgets range from <strong className="text-white">€800 in Grenoble</strong> to{' '}
            <strong className="text-white">€1,100 in Nice</strong>. Every city offers the same
            national tuition rates — your choice comes down to cost of living, career access,
            climate, and vibe. This page ranks all 12 from cheapest to most expensive so you
            can compare at a glance.
          </p>

          {/* Summary stat pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Cities compared',        value: '12' },
              { label: 'Cheapest monthly budget', value: '€800' },
              { label: 'EU tuition (all cities)', value: '€178/yr' },
              { label: 'Avg international %',     value: '~16%' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl px-4 py-2.5">
                <p className="text-[#90ADDA] text-[10px] font-semibold uppercase tracking-wider leading-none mb-1">
                  {s.label}
                </p>
                <p className="text-white font-bold text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {groups.map((group) => (
          <section key={group.label}>
            {/* Group header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-3 h-3 rounded-full ${group.accent} flex-shrink-0`} />
              <div>
                <h2 className="text-xl font-bold text-stone-800">{group.label}</h2>
                <p className="text-sm text-stone-400">{group.sublabel}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.cities.map((city) => {
                const tier = getBudgetTier(city.housing.totalMonthlyBudget)
                return (
                  <Link
                    key={city.slug}
                    href={`/cities/${city.slug}`}
                    className="group flex flex-col bg-white rounded-2xl border border-stone-200 hover:border-[#90ADDA] hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    {/* Tricolour top stripe */}
                    <div className="h-1 bg-gradient-to-r from-[#4A70C4] via-white to-[#B86040] flex-shrink-0" />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Name + budget badge */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-lg font-bold text-stone-800 group-hover:text-[#1E3A6E] transition-colors leading-tight">
                          {city.name}
                        </h3>
                        <span className={`flex-shrink-0 text-[10px] font-semibold border px-2 py-0.5 rounded-full ${tier.className}`}>
                          {tier.label}
                        </span>
                      </div>

                      {/* Region */}
                      <p className="text-xs text-stone-400 mb-3">{city.region}</p>

                      {/* Tagline */}
                      <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-1">
                        {city.tagline}
                      </p>

                      {/* Key stats row */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-[#F5F2ED] rounded-lg py-2 px-1 text-center">
                          <p className="text-[10px] text-stone-400 uppercase tracking-wide font-medium leading-none mb-1">Budget</p>
                          <p className="text-sm font-bold text-stone-700">€{city.housing.totalMonthlyBudget}</p>
                        </div>
                        <div className="bg-[#F5F2ED] rounded-lg py-2 px-1 text-center">
                          <p className="text-[10px] text-stone-400 uppercase tracking-wide font-medium leading-none mb-1">Students</p>
                          <p className="text-sm font-bold text-stone-700">{city.overview.studentPopulation}</p>
                        </div>
                        <div className="bg-[#F5F2ED] rounded-lg py-2 px-1 text-center">
                          <p className="text-[10px] text-stone-400 uppercase tracking-wide font-medium leading-none mb-1">Intl %</p>
                          <p className="text-sm font-bold text-stone-700">{city.overview.internationalStudentPct.split(' ')[0]}</p>
                        </div>
                      </div>

                      {/* Climate */}
                      <ClimateBar city={city} />

                      {/* CTA */}
                      <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-xs text-stone-400">{city.cityLife.cityPopulation} residents</span>
                        <span className="text-xs font-semibold text-[#1E3A6E] flex items-center gap-1 group-hover:gap-2 transition-all">
                          Full guide
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}

        {/* ── Quiz CTA ── */}
        <section className="bg-gradient-to-r from-[#EDF0F8] to-[#F5F6FC] border border-[#C5D0EC] rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-stone-800 mb-2">Not sure which city is right for you?</h2>
          <p className="text-stone-500 text-sm mb-6 max-w-md mx-auto">
            Answer 5 questions about your priorities — budget, climate, career, and lifestyle —
            and get a personalised recommendation.
          </p>
          <Link
            href="/city-quiz"
            className="inline-flex items-center gap-2 bg-[#1E3A6E] hover:bg-[#162D58] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
          >
            Take the City Quiz
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

      </div>
    </>
  )
}
