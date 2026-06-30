import Link from 'next/link'
import type { City } from '@/types/city'

// Regions grouped by geographic proximity for scoring
const REGION_NEIGHBOURS: Record<string, string[]> = {
  'Hauts-de-France':              ['Île-de-France', 'Grand Est'],
  'Île-de-France':                ['Hauts-de-France', 'Grand Est', 'Pays de la Loire'],
  'Grand Est':                    ['Hauts-de-France', 'Île-de-France', 'Auvergne-Rhône-Alpes'],
  'Auvergne-Rhône-Alpes':        ['Grand Est', 'Occitanie', 'Provence-Alpes-Côte d\'Azur'],
  'Occitanie':                    ['Nouvelle-Aquitaine', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur'],
  'Provence-Alpes-Côte d\'Azur': ['Occitanie', 'Auvergne-Rhône-Alpes'],
  'Nouvelle-Aquitaine':           ['Occitanie', 'Pays de la Loire', 'Bretagne'],
  'Pays de la Loire':             ['Bretagne', 'Nouvelle-Aquitaine', 'Île-de-France'],
  'Bretagne':                     ['Pays de la Loire', 'Nouvelle-Aquitaine'],
}

function scoreRelation(current: City, candidate: City): number {
  let score = 0

  // Budget proximity (max 5 pts) — primary driver
  const budgetDiff = Math.abs(current.housing.totalMonthlyBudget - candidate.housing.totalMonthlyBudget)
  score += Math.max(0, 5 - Math.floor(budgetDiff / 60))

  // Same region (3 pts)
  if (current.region === candidate.region) {
    score += 3
  } else {
    // Adjacent region (1 pt)
    const neighbours = REGION_NEIGHBOURS[current.region] ?? []
    if (neighbours.includes(candidate.region)) score += 1
  }

  // Similar student population size (1 pt)
  const popA = parseInt(current.overview.studentPopulation.replace(/[^0-9]/g, ''), 10)
  const popB = parseInt(candidate.overview.studentPopulation.replace(/[^0-9]/g, ''), 10)
  if (!isNaN(popA) && !isNaN(popB) && Math.abs(popA - popB) / Math.max(popA, popB) < 0.4) {
    score += 1
  }

  return score
}

function getBudgetLabel(budget: number): string {
  if (budget <= 850) return 'Budget-friendly'
  if (budget <= 950) return 'Mid-range'
  return 'Premium'
}

interface RelatedCitiesProps {
  currentCity: City
  allCities: City[]
}

export default function RelatedCities({ currentCity, allCities }: RelatedCitiesProps) {
  const related = allCities
    .filter((c) => c.slug !== currentCity.slug)
    .map((c) => ({ city: c, score: scoreRelation(currentCity, c) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ city }) => city)

  if (related.length === 0) return null

  return (
    <section id="related-cities" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">🗺️</span>
        <h2 className="text-xl font-bold text-stone-800">Compare to Similar Cities</h2>
      </div>
      <p className="text-sm text-stone-500 mb-5 -mt-2">
        Matched by budget range and geographic proximity to {currentCity.name}.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((city) => (
          <Link
            key={city.slug}
            href={`/cities/${city.slug}`}
            className="group block bg-white rounded-xl border border-stone-200 hover:border-[#1E3A6E] hover:shadow-sm transition-all p-5"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className="font-bold text-stone-800 group-hover:text-[#1E3A6E] transition-colors">
                  {city.name}
                </p>
                <p className="text-xs text-stone-400">{city.region}</p>
              </div>
              <span className="flex-shrink-0 text-xs font-semibold bg-[#EDF0F8] text-[#1E3A6E] px-2.5 py-1 rounded-full">
                {getBudgetLabel(city.housing.totalMonthlyBudget)}
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed mb-4 line-clamp-2">
              {city.tagline}
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#F5F2ED] rounded-lg py-2 px-1">
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wide leading-none mb-1">Budget</p>
                <p className="text-sm font-bold text-stone-700">€{city.housing.totalMonthlyBudget}</p>
              </div>
              <div className="bg-[#F5F2ED] rounded-lg py-2 px-1">
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wide leading-none mb-1">Students</p>
                <p className="text-sm font-bold text-stone-700">{city.overview.studentPopulation}</p>
              </div>
              <div className="bg-[#F5F2ED] rounded-lg py-2 px-1">
                <p className="text-[10px] text-stone-400 font-medium uppercase tracking-wide leading-none mb-1">Safety</p>
                <p className="text-sm font-bold text-stone-700">{city.overview.safetyRating.split(' ')[0]}</p>
              </div>
            </div>
            <p className="text-xs text-[#1E3A6E] font-semibold mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
              View full guide
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
