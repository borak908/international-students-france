import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import cities from '@/data/cities.json'
import type { City } from '@/types/city'

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

  return {
    title: `Study in ${city.name}, France — International Student Guide`,
    description: city.metaDescription,
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
  return (
    <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
      <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-1">{label}</p>
      <p className="text-lg font-bold text-stone-800">{value}</p>
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
    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
      {children}
    </span>
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
    { id: 'transport',     label: 'Transport' },
    { id: 'work-visa',     label: 'Work & Visa' },
    { id: 'international', label: 'International' },
  ]

  return (
    <>
      {/* ── Hero banner ── */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
        <div className="absolute top-16 left-0 right-0 h-0.5 flex pointer-events-none" aria-hidden>
          <div className="flex-1 bg-[#002395]" />
          <div className="flex-1 bg-white/40" />
          <div className="flex-1 bg-[#ED2939]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-blue-300 text-xs mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Cities</span>
            <span>/</span>
            <span className="text-white font-medium">{city.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            Study in {city.name}
          </h1>
          <p className="text-blue-200 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
            {city.tagline}
          </p>

          {/* Hero stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {city.heroStats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-blue-300 text-xs font-medium mb-1">{stat.label}</p>
                <p className="text-white text-xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky section nav ── */}
      <div className="sticky top-16 z-40 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex gap-1 overflow-x-auto no-scrollbar py-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 text-xs font-medium text-stone-500 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
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

            {/* 4 — Transport */}
            <Section id="transport" emoji="🚇" title="Transport & Getting Around">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <StatCard
                  label="Student pass"
                  value={`€${city.transport.studentPassMonthly}/mo`}
                  sub="With student discount"
                />
                <StatCard
                  label="Regular pass"
                  value={`€${city.transport.regularPassMonthly}/mo`}
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
                <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 col-span-1 sm:col-span-2">
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
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                <strong>📋 Visa tip:</strong> Apply for your long-stay student visa (VLS-TS) through
                Campus France in your home country. After arrival, validate it online via the ANEF portal
                — no prefecture appointment needed.
              </div>
            </Section>

            {/* 6 — International Experience */}
            <Section id="international" emoji="🌍" title="International Experience">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <StatCard label="Students"       value={city.internationalExperience.studentPopulation} />
                <StatCard label="International %" value={city.internationalExperience.internationalStudentPct} />
                <StatCard label="Safety"          value={city.internationalExperience.safetyRating} />
              </div>
              <div className="bg-white rounded-xl border border-stone-100 px-5 divide-y divide-stone-100">
                <InfoRow label="English programs" value={city.internationalExperience.englishPrograms} />
                <InfoRow label="City vibe"        value={city.internationalExperience.overallVibe} />
              </div>
            </Section>

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
                    <span className="text-stone-500">Monthly budget</span>
                    <span className="font-medium text-stone-700">€{city.housing.totalMonthlyBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">EU tuition</span>
                    <span className="font-medium text-stone-700">€{city.universities.tuitionEUPerYear}/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Non-EU tuition</span>
                    <span className="font-medium text-stone-700">€{city.universities.tuitionNonEUPerYear}/yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Transport (student)</span>
                    <span className="font-medium text-stone-700">€{city.transport.studentPassMonthly}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Work hours</span>
                    <span className="font-medium text-stone-700">964 hrs/yr</span>
                  </div>
                </div>
              </div>

              {/* Other cities */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5">
                <h3 className="text-sm font-bold text-stone-700 mb-3">Other cities</h3>
                <div className="space-y-2">
                  {cityData
                    .filter((c) => c.slug !== city.slug)
                    .map((c) => (
                      <Link
                        key={c.slug}
                        href={`/cities/${c.slug}`}
                        className="flex items-center gap-2 text-sm text-stone-600 hover:text-blue-700 transition-colors group"
                      >
                        <svg className="w-4 h-4 text-stone-300 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        {c.name}
                      </Link>
                    ))}
                </div>
              </div>

              {/* CampusFrance CTA */}
              <a
                href="https://www.campusfrance.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-blue-700 hover:bg-blue-800 text-white rounded-2xl p-5 text-sm transition-colors"
              >
                <p className="font-bold mb-1">Apply via CampusFrance</p>
                <p className="text-blue-200 text-xs leading-relaxed">
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
