'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import cities from '@/data/cities.json'

// Parse shared room range like "€400–550" → midpoint number
function parseSharedRoom(str: string): number {
  const nums = str.replace(/[€\s]/g, '').split(/[–\-]/).map(Number).filter(Boolean)
  if (nums.length === 2) return Math.round((nums[0] + nums[1]) / 2)
  if (nums.length === 1) return nums[0]
  return 450
}

function computeBreakdown(city: (typeof cities)[0], rentType: 'studio' | 'shared') {
  const rent =
    rentType === 'studio'
      ? city.housing.studioRentMonthly
      : parseSharedRoom(city.housing.sharedRoomMonthly)

  const living = city.housing.totalMonthlyBudget // excludes rent per Numbeo methodology
  const transport = city.transport.studentPassMonthly
  const remaining = living - transport
  const food = Math.round(remaining * 0.52)
  const utilities = Math.round(remaining * 0.16)
  const phone = 15
  const leisure = Math.round(remaining * 0.20)
  const misc = Math.max(0, remaining - food - utilities - phone - leisure)

  return { rent, food, transport, utilities, phone, leisure, misc, total: rent + living }
}

const savingTips: Record<string, string[]> = {
  montpellier: [
    'Public transport is completely FREE for metro residents — save €35+/month vs other cities.',
    'Université de Montpellier has one of the best CROUS networks — meals at €3.30.',
    'Sunday Marché du Lez has affordable fresh produce and a great student atmosphere.',
  ],
  grenoble: [
    'Grenoble is the cheapest major student city in France — your budget goes furthest here.',
    'Metrovélo annual pass is just €30/year — cycling is free and the city is very bike-friendly.',
    'The mountains are free — hiking and skiing are budget-friendly activities.',
    'CROUS restaurants at UGA campus are plentiful and very affordable.',
  ],
  rennes: [
    'STAR Rennes has excellent student discounts — monthly pass just €32.',
    'The Saturday market near Les Lices is one of the best in France for cheap fresh food.',
    'Rennes has a very active student association scene — many free or cheap events.',
  ],
  nantes: [
    'Nantes regularly ranks as the most liveable French city — good value for quality of life.',
    'Sunday Marché de Talensac for affordable fresh produce.',
    'Bicloo bike-share is cheap and cycling infrastructure is excellent.',
  ],
  lille: [
    'V\'Lille monthly pass is just €30 for students — one of the cheapest in France.',
    'Wazemmes market on Sunday mornings is huge, cheap, and a Lille institution.',
    'Close to Belgium — Ghent and Brussels are cheap day trips.',
    'Eurostar access means London is reachable — useful for internship opportunities.',
  ],
  toulouse: [
    'Tisséo Pastel card is just €30/month for students.',
    'As France\'s #1 student city, Toulouse has the most student discounts in the country.',
    'Victor Hugo market for great prices on local produce.',
    'Many free events organised by the student associations (BDEs) throughout the year.',
  ],
  bordeaux: [
    'TBM student pass is just €20.80/month — the cheapest in France for a major city.',
    'Sunday market at Marché des Capucins for affordable food.',
    'V3 bike-share is a great way to avoid extra costs.',
    'KEDGE and Sciences Po students have access to great networking events.',
  ],
  lyon: [
    'Apply for CAF housing benefit immediately — you can get €150–220/month back.',
    'CROUS restaurants across campus serve meals at €3.30 — use them regularly.',
    'Croix-Rousse Saturday market has excellent prices for fresh produce.',
    'Vélo\'v annual pass is affordable — cycling in Lyon saves on daily transport.',
  ],
  paris: [
    'CAF housing benefit is essential in Paris — apply the day you sign your lease.',
    'Under-26 Navigo pass is €32.80/month — use it exclusively for all transport.',
    'National museums are FREE for EU residents under 26 — a huge lifestyle perk.',
    'CROUS restaurants are scattered across Paris — always check locations near campus.',
    'Shop at Lidl, Aldi, or local markets rather than Monoprix or Franprix.',
  ],
  strasbourg: [
    'Strasbourg is extremely bike-friendly — Vélo\'Hop plus cycling paths reduce transport costs.',
    'EU institutions host many free public events — take advantage as a student.',
    'The Christmas market has free entry and is a major city event.',
  ],
  nice: [
    'The beach is completely free — factor this into your leisure budget.',
    'Sophia Antipolis is accessible by bus — useful for tech internships.',
    'Nice is expensive — consider shared accommodation to reduce rent significantly.',
    'Shop at the Marché du Cours Saleya early morning for best prices.',
  ],
  'aix-en-provence': [
    'Local bus pass is just €8.30/month — extremely affordable transport.',
    'Aix is walkable — you may not need transport at all for daily life.',
    'Connected to Marseille by bus — broader job market accessible cheaply.',
    'The Saturday market on Cours Mirabeau is excellent for weekly shopping.',
  ],
}

const defaultTips = [
  'Apply for CAF housing benefit on the day you sign your lease — €100–300/month back.',
  'Always use the student CROUS restaurants — €3.30 for a full hot meal.',
  'Get your student transport pass immediately — discounts are significant.',
  'Shop at Lidl, Aldi, or local weekend markets for the best grocery prices.',
]

export default function BudgetPlannerClient() {
  const [selectedSlug, setSelectedSlug] = useState(cities[0].slug)
  const [rentType, setRentType] = useState<'studio' | 'shared'>('studio')
  const [userBudget, setUserBudget] = useState('')

  const city = cities.find((c) => c.slug === selectedSlug)!
  const breakdown = useMemo(() => computeBreakdown(city, rentType), [city, rentType])
  const tips = savingTips[selectedSlug] ?? defaultTips

  const budget = parseFloat(userBudget)
  const delta = !isNaN(budget) ? budget - breakdown.total : null
  const surplus = delta !== null && delta >= 0
  const deficit = delta !== null && delta < 0

  const rows = [
    { label: 'Rent', emoji: '🏠', value: breakdown.rent, note: rentType === 'studio' ? 'Studio (avg.)' : 'Shared room (avg.)' },
    { label: 'Food & Groceries', emoji: '🍽️', value: breakdown.food, note: 'Supermarkets + restaurants' },
    { label: 'Transport', emoji: '🚇', value: breakdown.transport, note: 'Student monthly pass' + (breakdown.transport === 0 ? ' — FREE here!' : '') },
    { label: 'Utilities & Bills', emoji: '💡', value: breakdown.utilities, note: 'Electricity, internet, water' },
    { label: 'Phone', emoji: '📱', value: breakdown.phone, note: 'Sim-only plan' },
    { label: 'Leisure & Social', emoji: '🎉', value: breakdown.leisure, note: 'Nights out, sport, hobbies' },
    { label: 'Misc / Clothing', emoji: '📦', value: breakdown.misc, note: 'Unexpected costs' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-3">Student Budget Planner</h1>
        <p className="text-stone-500 text-base max-w-xl mx-auto">
          See exactly how far your money goes in each French city — and find out if you can afford it.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* City selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
              City
            </label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-stone-800 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-[#1E7A5E]"
            >
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Rent type */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
              Accommodation type
            </label>
            <div className="flex rounded-xl border border-stone-200 overflow-hidden bg-stone-50">
              <button
                onClick={() => setRentType('studio')}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${rentType === 'studio' ? 'bg-[#1E7A5E] text-white' : 'text-stone-600 hover:bg-stone-100'}`}
              >
                Studio
              </button>
              <button
                onClick={() => setRentType('shared')}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${rentType === 'shared' ? 'bg-[#1E7A5E] text-white' : 'text-stone-600 hover:bg-stone-100'}`}
              >
                Shared room
              </button>
            </div>
          </div>

          {/* Budget input */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
              Your monthly budget (€)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-medium">€</span>
              <input
                type="number"
                min="0"
                max="5000"
                placeholder="e.g. 1500"
                value={userBudget}
                onChange={(e) => setUserBudget(e.target.value)}
                className="w-full border border-stone-200 rounded-xl pl-8 pr-4 py-2.5 text-stone-800 text-sm bg-stone-50 focus:outline-none focus:ring-2 focus:ring-[#1E7A5E]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-stone-800">
              Monthly Cost Breakdown — {city.name}
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              {rentType === 'studio' ? 'Studio apartment' : 'Shared room'} · All estimates in EUR
            </p>
          </div>
          <Link
            href={`/cities/${city.slug}`}
            className="text-xs text-[#1E7A5E] hover:text-[#185F49] font-medium flex items-center gap-1"
          >
            Full city guide →
          </Link>
        </div>

        <div className="divide-y divide-stone-50">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center px-6 py-4">
              <span className="text-xl w-8 flex-shrink-0">{row.emoji}</span>
              <div className="flex-1 min-w-0 ml-3">
                <p className="text-sm font-medium text-stone-800">{row.label}</p>
                <p className="text-xs text-stone-400 mt-0.5">{row.note}</p>
              </div>
              <span className={`text-sm font-bold ml-4 ${row.value === 0 ? 'text-green-600' : 'text-stone-800'}`}>
                {row.value === 0 ? 'FREE' : `€${row.value}`}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t-2 border-stone-200 bg-stone-50 px-6 py-4 flex items-center justify-between">
          <span className="font-bold text-stone-800">Total per month</span>
          <span className="text-xl font-bold text-[#1E7A5E]">€{breakdown.total}</span>
        </div>
      </div>

      {/* Surplus / deficit */}
      {delta !== null && (
        <div className={`rounded-2xl p-5 mb-8 border ${surplus ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{surplus ? '✅' : '⚠️'}</span>
            <div>
              <p className={`font-bold text-base ${surplus ? 'text-green-800' : 'text-red-800'}`}>
                {surplus
                  ? `You have €${delta} surplus each month in ${city.name}`
                  : `You're €${Math.abs(delta)} short each month in ${city.name}`}
              </p>
              <p className={`text-sm mt-0.5 ${surplus ? 'text-green-700' : 'text-red-700'}`}>
                {surplus
                  ? 'Great — you can save, travel, or build an emergency fund.'
                  : 'Consider a shared room, a cheaper city, or part-time work (up to 964 hrs/yr allowed).'}
              </p>
            </div>
          </div>
          {deficit && (
            <div className="mt-4 flex flex-wrap gap-2">
              {cities
                .filter((c) => {
                  const b = computeBreakdown(c, rentType)
                  return b.total <= budget && c.slug !== selectedSlug
                })
                .slice(0, 3)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/cities/${c.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium bg-white border border-red-200 text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors"
                  >
                    Try {c.name} (€{computeBreakdown(c, rentType).total}/mo) →
                  </Link>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Saving tips */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
          <span>💡</span> How to save in {city.name}
        </h3>
        <ul className="space-y-2.5">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-amber-900">
              <span className="mt-0.5 text-amber-500 flex-shrink-0">→</span>
              {tip}
            </li>
          ))}
          <li className="flex items-start gap-2.5 text-sm text-amber-900">
            <span className="mt-0.5 text-amber-500 flex-shrink-0">→</span>
            Apply for CAF housing benefit — save €100–300/month. See our{' '}
            <Link href="/blog/how-to-apply-caf-housing-aid-international-students" className="underline font-medium">
              step-by-step CAF guide
            </Link>.
          </li>
        </ul>
      </div>

      {/* Other tools */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/city-quiz"
          className="block bg-[#1E7A5E] hover:bg-[#185F49] text-white rounded-2xl p-5 transition-colors"
        >
          <p className="font-bold mb-1">Not sure which city to pick?</p>
          <p className="text-[#B8E0D5] text-sm">Take our 8-question quiz →</p>
        </Link>
        <Link
          href="/"
          className="block bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 rounded-2xl p-5 transition-colors"
        >
          <p className="font-bold mb-1">Compare all 12 cities</p>
          <p className="text-stone-500 text-sm">See the full comparison table →</p>
        </Link>
      </div>
    </div>
  )
}
