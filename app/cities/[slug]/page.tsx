import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import cities from '@/data/cities.json'
import type { City } from '@/types/city'
import RelatedCities from '@/components/RelatedCities'
import NewsletterSignup from '@/components/NewsletterSignup'

const cityData = cities as City[]

// ── Static params ──────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return cityData.map((city) => ({ slug: city.slug }))
}

// ── SEO metadata ──────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const city = cityData.find((c) => c.slug === params.slug)
  if (!city) return {}

  // Use `absolute` to bypass the layout template — keeps <title> under 60 chars
  // OG title can be longer (social previews aren't truncated the same way)
  return {
    title: {
      absolute: `Study in ${city.name} — International Student Guide`,
    },
    description: city.metaDescription,
    alternates: {
      canonical: `https://comparestudyfrance.com/cities/${city.slug}`,
    },
    keywords: [
      `study in ${city.name}`,
      `international students ${city.name}`,
      `${city.name} universities`,
      `student visa France`,
      `cost of living ${city.name} student`,
    ],
    openGraph: {
      title: `Study in ${city.name}, France — International Student Guide`,
      description: city.metaDescription,
      type: 'article',
      url: `https://comparestudyfrance.com/cities/${city.slug}`,
    },
  }
}

// ── Reusable section wrapper ───────────────────────────────────────────────────
function Section({
  id,
  emoji,
  title,
  children,
}: {
  id: string
  emoji: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{emoji}</span>
        <h2 className="text-xl font-bold text-stone-800">{title}</h2>
      </div>
      {children}
    </section>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  const isEstimated = value.includes('est.')
  const displayValue = value.replace(' est.', '')
  return (
    <div className="bg-[#F5F2ED] rounded-xl p-4 border border-stone-100">
      <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className="text-lg font-bold text-stone-800 flex items-center gap-1.5 flex-wrap">
        {displayValue}
        {isEstimated && (
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded-full leading-none">
            est.
          </span>
        )}
      </p>
      {sub && <p className="text-xs text-stone-500 mt-0.5">{sub}</p>}
    </div>
  )
}

// ── Info row ─────────────────────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-stone-100 last:border-0">
      <span className="text-xs text-stone-400 font-semibold uppercase tracking-wide sm:w-44 flex-shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-stone-700 text-sm leading-relaxed">{value}</span>
    </div>
  )
}

// ── Tag pill ─────────────────────────────────────────────────────────────────
function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block bg-[#EDF0F8] text-[#1E3A6E] text-xs font-medium px-2.5 py-1 rounded-full">
      {children}
    </span>
  )
}

// ── Temp badge ────────────────────────────────────────────────────────────────
function TempBadge({ label, tempC }: { label: string; tempC: number }) {
  const warm = tempC >= 20
  return (
    <div className="bg-[#F5F2ED] rounded-xl p-4 border border-stone-100 text-center">
      <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-lg font-bold ${warm ? 'text-orange-600' : 'text-blue-600'}`}>
        {tempC}°C
      </p>
      <p className="text-xs text-stone-400 mt-0.5">{warm ? 'Avg. summer' : 'Avg. winter'}</p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CityPage({ params }: { params: { slug: string } }) {
  const city = cityData.find((c) => c.slug === params.slug)
  if (!city) notFound()

  const sections = [
    { id: 'overview',      label: 'Overview' },
    { id: 'housing',       label: 'Housing & Cost' },
    { id: 'universities',  label: 'Universities' },
    ...(city.rankings?.length ? [{ id: 'rankings', label: 'Rankings' }] : []),
    { id: 'transport',     label: 'Transport' },
    { id: 'work-visa',     label: 'Work & Visa' },
    { id: 'city-life',     label: 'City Life' },
    { id: 'related-cities', label: 'Similar Cities' },
  ]

  // Top 3 budget-nearest cities for the sidebar (excluding self)
  const sidebarCities = cityData
    .filter((c) => c.slug !== city.slug)
    .sort(
      (a, b) =>
        Math.abs(a.housing.totalMonthlyBudget - city.housing.totalMonthlyBudget) -
        Math.abs(b.housing.totalMonthlyBudget - city.housing.totalMonthlyBudget)
    )
    .slice(0, 5)

  return (
    <>
      {/* ── JSON-LD structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://comparestudyfrance.com' },
                { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://comparestudyfrance.com/cities' },
                { '@type': 'ListItem', position: 3, name: city.name, item: `https://comparestudyfrance.com/cities/${city.slug}` },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'City',
              name: city.name,
              description: city.metaDescription,
              containedInPlace: {
                '@type': 'Country',
                name: 'France',
              },
              additionalProperty: [
                { '@type': 'PropertyValue', name: 'Student Population', value: city.overview.studentPopulation },
                { '@type': 'PropertyValue', name: 'Monthly Budget', value: `€${city.housing.totalMonthlyBudget}` },
                { '@type': 'PropertyValue', name: 'City Population', value: city.cityLife.cityPopulation },
              ],
            },
          ]),
        }}
      />

      {/* ── Hero banner ── */}
      <div className="bg-gradient-to-br from-[#0D1B35] via-[#122240] to-[#182C50] text-white">
        <div className="absolute top-16 left-0 right-0 h-0.5 flex pointer-events-none" aria-hidden>
          <div className="flex-1 bg-[#4A70C4]" />
          <div className="flex-1 bg-white/40" />
          <div className="flex-1 bg-[#B03232]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[#90ADDA] text-xs mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Cities</span>
            <span>/</span>
            <span className="text-white font-medium">{city.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            Study in {city.name}
          </h1>
          <p className="text-[#B8CAE8] text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
            {city.tagline}
          </p>

          {/* Hero stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {city.heroStats.map((stat) => {
              const isEst = stat.value.includes('est.')
              const display = stat.value.replace(' est.', '')
              return (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-[#90ADDA] text-xs font-medium mb-1">{stat.label}</p>
                <p className="text-white text-xl font-bold flex items-center gap-1.5 flex-wrap">
                  {display}
                  {isEst && (
                    <span className="text-[10px] font-semibold text-amber-300 bg-amber-900/40 border border-amber-600/40 px-1.5 py-0.5 rounded-full leading-none">
                      est.
                    </span>
                  )}
                </p>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* ── Sticky section nav ── */}
      <div className="sticky top-[3.625rem] z-40 bg-[#0D1B35] border-b border-[#1E3A6E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex gap-1 overflow-x-auto no-scrollbar py-1" aria-label="Page sections">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 text-xs font-medium text-[#90ADDA] hover:text-white hover:bg-[#1E3A6E] px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main column */}
          <div className="flex-1 min-w-0 space-y-14">

            {/* 1 — Overview */}
            <Section id="overview" emoji="🏙️" title="Overview">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <StatCard label="Total Students" value={city.overview.studentPopulation} />
                <StatCard label="International %" value={city.overview.internationalStudentPct} />
                <StatCard label="Safety Rating"   value={city.overview.safetyRating} />
              </div>
              <div className="bg-white rounded-xl border border-stone-100 px-5 divide-y divide-stone-100">
                <InfoRow label="City vibe"            value={city.overview.overallVibe} />
                <InfoRow label="City population"      value={city.cityLife.cityPopulation + ' residents'} />
                <InfoRow
                  label="English programs"
                  value={
                    city.overview.englishProgramsAvailable
                      ? '✅ Available — see universities section'
                      : '❌ Limited'
                  }
                />
              </div>
            </Section>

            {/* 2 — Housing & Cost */}
            <Section id="housing" emoji="🏠" title="Housing & Cost of Living">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <StatCard
                  label="Studio rent"
                  value={`€${city.housing.studioRentMonthly}/mo`}
                  sub="Avg. unfurnished"
                />
                <StatCard
                  label="Shared room"
                  value={`${city.housing.sharedRoomMonthly}/mo`}
                  sub="Colocation"
                />
                <StatCard
                  label="Monthly budget"
                  value={`€${city.housing.totalMonthlyBudget}`}
                  sub="All-in estimate"
                />
                <StatCard
                  label="CAF aid"
                  value={city.housing.cafAidMonthly}
                  sub="Housing benefit"
                />
              </div>

              {/* Cost breakdown */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <StatCard
                  label="Groceries"
                  value={`€${city.cityLife.costBreakdown.groceriesMonthly}/mo`}
                  sub="Supermarket estimate"
                />
                <StatCard
                  label="Dining out"
                  value={`€${city.cityLife.costBreakdown.diningOutAvgMeal} avg`}
                  sub="Per meal (restaurant)"
                />
                <StatCard
                  label="Utilities"
                  value={`€${city.cityLife.costBreakdown.utilitiesMonthly}/mo`}
                  sub="Electricity, water, internet"
                />
              </div>

              <div className="bg-white rounded-xl border border-stone-100 px-5 divide-y divide-stone-100">
                <InfoRow
                  label="Best neighborhoods"
                  value={
                    <div className="flex flex-wrap gap-2 mt-1">
                      {city.housing.bestNeighborhoods.map((n) => (
                        <Tag key={n}>{n}</Tag>
                      ))}
                    </div>
                  }
                />
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
                <strong>💡 CAF tip:</strong> Apply for CAF housing benefit as soon as you have a signed lease.
                Students from most countries are eligible for €100–300/month.
              </div>
            </Section>

            {/* 3 — Universities */}
            <Section id="universities" emoji="🎓" title="Universities & Tuition">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <StatCard
                  label="EU tuition"
                  value={`€${city.universities.tuitionEUPerYear}/yr`}
                  sub="Public universities"
                />
                <StatCard
                  label="Non-EU tuition"
                  value={`€${city.universities.tuitionNonEUPerYear}/yr`}
                  sub="Différenciation tarifaire"
                />
              </div>

              <div className="bg-white rounded-xl border border-stone-100 overflow-hidden mb-5">
                <div className="px-5 py-4 border-b border-stone-100">
                  <h3 className="text-sm font-semibold text-stone-700">Main Universities</h3>
                </div>
                <ul className="px-5 py-3 divide-y divide-stone-50">
                  {city.universities.main.map((u) => (
                    <li key={u} className="py-2.5 text-sm text-stone-700 flex items-center gap-2">
                      <span className="text-blue-400">🏛</span> {u}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-stone-100 overflow-hidden mb-5">
                <div className="px-5 py-4 border-b border-stone-100">
                  <h3 className="text-sm font-semibold text-stone-700">Grandes Écoles</h3>
                </div>
                <div className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {city.universities.grandesEcoles.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-stone-100 px-5 divide-y divide-stone-100">
                <InfoRow
                  label="Best fields"
                  value={
                    <div className="flex flex-wrap gap-2 mt-1">
                      {city.universities.bestFields.map((f) => (
                        <Tag key={f}>{f}</Tag>
                      ))}
                    </div>
                  }
                />
              </div>
            </Section>

            {/* 4 — Rankings (only for cities with confirmed data) */}
            {city.rankings && city.rankings.length > 0 && (
              <Section id="rankings" emoji="🏆" title="School Rankings">
                <div className="space-y-3">
                  {city.rankings.map((r, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col sm:flex-row sm:items-start gap-3"
                    >
                      {/* Rank badge */}
                      <div className="flex-shrink-0">
                        <span className="inline-block bg-[#0D1B35] text-white text-sm font-bold px-3 py-1.5 rounded-lg min-w-[80px] text-center">
                          {r.rank}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-stone-800 text-sm leading-snug">{r.school}</p>
                        {r.program && (
                          <p className="text-xs text-stone-500 mt-0.5">{r.program}</p>
                        )}
                        <p className="text-xs text-[#1E3A6E] font-medium mt-1">{r.rankingType}</p>
                        {r.note && (
                          <p className="text-xs text-stone-400 mt-1 italic">{r.note}</p>
                        )}
                      </div>

                      {/* Source link */}
                      <a
                        href={r.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-[10px] text-stone-400 hover:text-[#1E3A6E] transition-colors flex items-center gap-1 mt-1 sm:mt-0"
                      >
                        Source
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-stone-400 mt-3">
                  Source: QS World University Rankings 2026 and QS Business Master&apos;s Rankings 2026. Rankings updated annually — verify at{' '}
                  <a href="https://www.topuniversities.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-600">topuniversities.com</a>.
                </p>
              </Section>
            )}

            {/* — Transport */}
            <Section id="transport" emoji="🚇" title="Transport & Getting Around">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <StatCard
                  label="Student pass"
                  value={city.transport.studentPassMonthly === 0 ? 'FREE 🎉' : `€${city.transport.studentPassMonthly}/mo`}
                  sub={city.transport.studentPassMonthly === 0 ? 'Public transport free for residents' : 'With student discount'}
                />
                <StatCard
                  label="Regular pass"
                  value={city.transport.regularPassMonthly === 0 ? 'FREE' : `€${city.transport.regularPassMonthly}/mo`}
                  sub="Without discount"
                />
                <StatCard
                  label="Bike-friendly"
                  value={city.transport.bikeFriendly ? 'Yes ✅' : 'Limited'}
                  sub={city.transport.bikeShareName}
                />
              </div>
              <div className="bg-white rounded-xl border border-stone-100 px-5 divide-y divide-stone-100">
                <InfoRow label="Airport connection" value={city.transport.airportConnection} />
                <InfoRow label="Bike-share"          value={city.transport.bikeShareName} />
              </div>
            </Section>

            {/* 5 — Work & Visa */}
            <Section id="work-visa" emoji="💼" title="Work & Visa">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="bg-[#F5F2ED] rounded-xl p-4 border border-stone-100 col-span-1 sm:col-span-2">
                  <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-1">Part-time work allowance</p>
                  <p className="text-xl font-bold text-stone-800">{city.workVisa.partTimeHours}</p>
                  <p className="text-xs text-stone-500 mt-1">Applies to all student visa holders in France</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-stone-100 px-5 divide-y divide-stone-100">
                <InfoRow label="Visa type"        value={city.workVisa.visaType} />
                <InfoRow label="Job market"       value={city.workVisa.studentJobMarket} />
                <InfoRow label="Internship scene" value={city.workVisa.internshipScene} />
              </div>
              <div className="mt-4 bg-[#EDF0F8] border border-[#C5D0EC] rounded-xl p-4 text-sm text-[#162D58]">
                <strong>📋 Visa tip:</strong> Apply for your long-stay student visa (VLS-TS) through
                Campus France in your home country. After arrival, validate it online via the ANEF portal
                — no prefecture appointment needed.
              </div>
            </Section>

            {/* 6 — City Life & Climate */}
            <Section id="city-life" emoji="🌤️" title="City Life & Climate">
              {/* Climate */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <TempBadge label="Summer" tempC={city.cityLife.climate.avgSummerTempC} />
                <TempBadge label="Winter" tempC={city.cityLife.climate.avgWinterTempC} />
                <div className="bg-[#F5F2ED] rounded-xl p-4 border border-stone-100 text-center">
                  <p className="text-xs text-stone-400 font-medium uppercase tracking-wide leading-none mb-1">Sunshine</p>
                  <p className="text-lg font-bold text-stone-700">{city.cityLife.climate.sunshineDaysPerYear}</p>
                  <p className="text-xs text-stone-400 mt-0.5">days/year</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-stone-100 px-5 divide-y divide-stone-100 mb-5">
                <InfoRow label="Climate character" value={city.cityLife.climate.character} />
                <InfoRow label="Language barrier"  value={city.cityLife.languageBarrier} />
                {city.cityLife.notableStatus && (
                  <InfoRow label="Notable for" value={city.cityLife.notableStatus} />
                )}
              </div>
            </Section>

            {/* Newsletter */}
            <NewsletterSignup variant="city" />

            {/* 7 — Related Cities */}
            <RelatedCities currentCity={city} allCities={cityData} />

          </div>

          {/* ── Sticky sidebar ── */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-36 space-y-4">
              {/* Quick facts card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5">
                <h3 className="text-sm font-bold text-stone-700 mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Region</span>
                    <span className="font-medium text-stone-700">{city.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Population</span>
                    <span className="font-medium text-stone-700">{city.cityLife.cityPopulation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Monthly budget</span>
                    <span className="font-medium text-stone-700">€{city.housing.totalMonthlyBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Studio rent</span>
                    <span className="font-medium text-stone-700">€{city.housing.studioRentMonthly}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Transport</span>
                    <span className="font-medium text-stone-700">
                      {city.transport.studentPassMonthly === 0 ? 'FREE' : `€${city.transport.studentPassMonthly}/mo`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Summer avg</span>
                    <span className="font-medium text-orange-600">{city.cityLife.climate.avgSummerTempC}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Sunshine</span>
                    <span className="font-medium text-stone-700">{city.cityLife.climate.sunshineDaysPerYear} days/yr</span>
                  </div>
                </div>
              </div>

              {/* Budget-nearest cities */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5">
                <h3 className="text-sm font-bold text-stone-700 mb-1">Similar budget</h3>
                <p className="text-xs text-stone-400 mb-3">Cities closest to €{city.housing.totalMonthlyBudget}/mo</p>
                <div className="space-y-2">
                  {sidebarCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/cities/${c.slug}`}
                      className="flex items-center justify-between text-sm text-stone-600 hover:text-[#1E3A6E] transition-colors group"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-stone-300 group-hover:text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        {c.name}
                      </span>
                      <span className="text-xs text-stone-400">€{c.housing.totalMonthlyBudget}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CampusFrance CTA */}
              <a
                href="https://www.campusfrance.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#1E3A6E] hover:bg-[#162D58] text-white rounded-2xl p-5 text-sm transition-colors"
              >
                <p className="font-bold mb-1">Apply via CampusFrance</p>
                <p className="text-[#B8CAE8] text-xs leading-relaxed">
                  Official gateway for international student applications to French universities.
                </p>
                <p className="text-white text-xs mt-2 flex items-center gap-1">
                  campusfrance.org
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </p>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
