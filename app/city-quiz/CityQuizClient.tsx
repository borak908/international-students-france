'use client'

import { useState } from 'react'
import Link from 'next/link'
import cities from '@/data/cities.json'

interface Question {
  id: string
  text: string
  options: { label: string; scores: Record<string, number> }[]
}

const questions: Question[] = [
  {
    id: 'budget',
    text: 'What is your total monthly budget (rent + living)?',
    options: [
      {
        label: 'Under €1,500/month',
        scores: { grenoble: 3, rennes: 3, nantes: 2, montpellier: 2, lille: 2, toulouse: 1, bordeaux: 0, lyon: 0, strasbourg: 0, paris: 0, nice: 0, 'aix-en-provence': 0 },
      },
      {
        label: '€1,500 – €1,800/month',
        scores: { grenoble: 2, rennes: 2, nantes: 3, montpellier: 3, lille: 3, toulouse: 3, bordeaux: 2, strasbourg: 3, lyon: 1, paris: 0, nice: 0, 'aix-en-provence': 1 },
      },
      {
        label: '€1,800 – €2,200/month',
        scores: { grenoble: 1, rennes: 1, nantes: 2, montpellier: 2, lille: 2, toulouse: 2, bordeaux: 3, strasbourg: 2, lyon: 3, paris: 1, nice: 1, 'aix-en-provence': 3 },
      },
      {
        label: 'Over €2,200/month',
        scores: { grenoble: 0, rennes: 0, nantes: 1, montpellier: 1, lille: 1, toulouse: 1, bordeaux: 2, strasbourg: 1, lyon: 2, paris: 3, nice: 3, 'aix-en-provence': 2 },
      },
    ],
  },
  {
    id: 'climate',
    text: 'What kind of climate do you prefer?',
    options: [
      {
        label: '☀️ Sunny and warm (Mediterranean)',
        scores: { montpellier: 3, nice: 3, 'aix-en-provence': 3, toulouse: 3, bordeaux: 2, nantes: 0, lille: 0, strasbourg: 0, grenoble: 0, rennes: 0, lyon: 1, paris: 0 },
      },
      {
        label: '🌤️ Mild / Atlantic',
        scores: { bordeaux: 3, nantes: 3, rennes: 2, paris: 2, lyon: 2, lille: 1, toulouse: 2, montpellier: 2, nice: 1, 'aix-en-provence': 2, grenoble: 1, strasbourg: 1 },
      },
      {
        label: '❄️ Cold — I don\'t mind winter',
        scores: { strasbourg: 3, lille: 3, grenoble: 3, rennes: 2, paris: 2, lyon: 2, nantes: 2, toulouse: 1, bordeaux: 1, montpellier: 0, nice: 0, 'aix-en-provence': 0 },
      },
      {
        label: '⛰️ Alpine (mountains nearby)',
        scores: { grenoble: 3, nice: 2, strasbourg: 1, lyon: 2, toulouse: 0, bordeaux: 0, montpellier: 0, rennes: 0, nantes: 0, lille: 0, paris: 0, 'aix-en-provence': 1 },
      },
    ],
  },
  {
    id: 'size',
    text: 'What city size suits you best?',
    options: [
      {
        label: '🏙️ Huge metropolis (1M+ people)',
        scores: { paris: 3, lyon: 2, toulouse: 1, bordeaux: 1, lille: 1, nantes: 1, marseille: 2, montpellier: 0, strasbourg: 0, nice: 0, grenoble: 0, rennes: 0, 'aix-en-provence': 0 },
      },
      {
        label: '🌆 Large city (300k–1M)',
        scores: { lyon: 3, toulouse: 3, bordeaux: 3, nantes: 3, lille: 3, nice: 2, strasbourg: 2, montpellier: 2, rennes: 2, paris: 1, grenoble: 1, 'aix-en-provence': 1 },
      },
      {
        label: '🏘️ Medium city (100k–300k)',
        scores: { strasbourg: 3, montpellier: 3, nice: 3, rennes: 3, grenoble: 2, 'aix-en-provence': 2, nantes: 2, bordeaux: 1, toulouse: 1, lyon: 1, paris: 0, lille: 1 },
      },
      {
        label: '🌿 Compact and walkable',
        scores: { grenoble: 3, 'aix-en-provence': 3, strasbourg: 3, rennes: 2, montpellier: 2, nice: 2, nantes: 1, toulouse: 1, bordeaux: 1, lyon: 0, paris: 0, lille: 0 },
      },
    ],
  },
  {
    id: 'field',
    text: 'What is your field of study?',
    options: [
      {
        label: '⚙️ Engineering, Tech & Computer Science',
        scores: { grenoble: 3, toulouse: 3, nantes: 2, lyon: 2, rennes: 2, paris: 2, strasbourg: 1, bordeaux: 1, lille: 1, montpellier: 1, nice: 1, 'aix-en-provence': 0 },
      },
      {
        label: '💼 Business, Management & Finance',
        scores: { paris: 3, lyon: 3, toulouse: 2, bordeaux: 3, strasbourg: 2, nice: 2, lille: 2, nantes: 2, montpellier: 2, grenoble: 2, rennes: 1, 'aix-en-provence': 2 },
      },
      {
        label: '⚕️ Medicine, Sciences & Life Sciences',
        scores: { montpellier: 3, paris: 3, lyon: 3, toulouse: 2, strasbourg: 2, bordeaux: 2, grenoble: 2, rennes: 1, nantes: 1, lille: 2, nice: 1, 'aix-en-provence': 1 },
      },
      {
        label: '⚖️ Law, Political Science & European Studies',
        scores: { paris: 3, strasbourg: 3, 'aix-en-provence': 3, rennes: 3, bordeaux: 2, toulouse: 2, montpellier: 2, lyon: 1, lille: 2, nantes: 1, grenoble: 1, nice: 1 },
      },
      {
        label: '🎨 Arts, Humanities & Languages',
        scores: { paris: 3, 'aix-en-provence': 3, montpellier: 2, lyon: 2, bordeaux: 2, toulouse: 1, strasbourg: 2, rennes: 1, nantes: 1, lille: 1, grenoble: 1, nice: 1 },
      },
    ],
  },
  {
    id: 'career',
    text: 'How important is access to internships and jobs?',
    options: [
      {
        label: '🚀 Top priority — I want the best career opportunities',
        scores: { paris: 3, lyon: 3, toulouse: 3, grenoble: 3, strasbourg: 2, nantes: 2, bordeaux: 2, lille: 2, montpellier: 1, rennes: 2, nice: 1, 'aix-en-provence': 1 },
      },
      {
        label: '📊 Important but not the only thing',
        scores: { paris: 2, lyon: 2, toulouse: 2, grenoble: 2, strasbourg: 3, nantes: 3, bordeaux: 3, lille: 2, montpellier: 2, rennes: 2, nice: 2, 'aix-en-provence': 2 },
      },
      {
        label: '😊 I care more about lifestyle than career right now',
        scores: { montpellier: 3, 'aix-en-provence': 3, nice: 3, bordeaux: 3, toulouse: 2, rennes: 2, grenoble: 2, nantes: 2, strasbourg: 2, lille: 1, lyon: 1, paris: 0 },
      },
    ],
  },
  {
    id: 'lifestyle',
    text: 'Which lifestyle fits you best?',
    options: [
      {
        label: '🎉 Vibrant nightlife and a big social scene',
        scores: { toulouse: 3, lyon: 3, montpellier: 3, paris: 3, bordeaux: 3, lille: 3, rennes: 3, nice: 2, nantes: 2, strasbourg: 1, grenoble: 1, 'aix-en-provence': 0 },
      },
      {
        label: '⚖️ Balanced — good social life and time to study',
        scores: { nantes: 3, strasbourg: 3, rennes: 2, grenoble: 2, bordeaux: 2, lyon: 2, toulouse: 2, lille: 2, montpellier: 2, paris: 1, nice: 2, 'aix-en-provence': 2 },
      },
      {
        label: '📚 Quiet and studious — I\'m here to focus',
        scores: { grenoble: 3, 'aix-en-provence': 3, strasbourg: 2, rennes: 2, nantes: 2, lille: 1, bordeaux: 1, lyon: 1, toulouse: 1, montpellier: 1, paris: 0, nice: 1 },
      },
    ],
  },
  {
    id: 'language',
    text: 'How important are English-taught programmes?',
    options: [
      {
        label: '🇬🇧 Essential — I need programmes fully in English',
        scores: { paris: 3, grenoble: 3, nice: 3, strasbourg: 3, lyon: 2, lille: 2, bordeaux: 2, toulouse: 2, nantes: 2, rennes: 2, montpellier: 1, 'aix-en-provence': 2 },
      },
      {
        label: '🗣️ Some English is fine — I can manage French too',
        scores: { paris: 2, grenoble: 2, nice: 2, strasbourg: 2, lyon: 3, lille: 3, bordeaux: 3, toulouse: 3, nantes: 3, rennes: 3, montpellier: 3, 'aix-en-provence': 3 },
      },
      {
        label: '🇫🇷 I want full immersion in French',
        scores: { paris: 3, lyon: 3, toulouse: 3, bordeaux: 3, nantes: 3, rennes: 3, montpellier: 3, lille: 3, strasbourg: 2, grenoble: 2, nice: 2, 'aix-en-provence': 2 },
      },
    ],
  },
  {
    id: 'nature',
    text: 'What matters to you outside the city?',
    options: [
      {
        label: '⛷️ Mountains and skiing',
        scores: { grenoble: 3, nice: 2, strasbourg: 1, lyon: 2, toulouse: 0, bordeaux: 0, montpellier: 0, rennes: 0, nantes: 0, lille: 0, paris: 0, 'aix-en-provence': 1 },
      },
      {
        label: '🏖️ Beach and coast',
        scores: { nice: 3, montpellier: 3, bordeaux: 2, nantes: 2, 'aix-en-provence': 2, toulouse: 0, grenoble: 0, rennes: 1, strasbourg: 0, lyon: 0, paris: 0, lille: 0 },
      },
      {
        label: '🌳 Countryside and parks are enough',
        scores: { 'aix-en-provence': 3, toulouse: 3, rennes: 3, nantes: 3, strasbourg: 3, bordeaux: 2, lyon: 2, paris: 2, montpellier: 2, grenoble: 2, nice: 2, lille: 1 },
      },
      {
        label: '🏙️ I\'m a city person — nature isn\'t important',
        scores: { paris: 3, lyon: 2, toulouse: 2, bordeaux: 2, lille: 2, nantes: 2, rennes: 2, montpellier: 1, strasbourg: 1, grenoble: 1, nice: 1, 'aix-en-provence': 1 },
      },
    ],
  },
]

const MAX_SCORE = questions.length * 3

export default function CityQuizClient() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({}) // questionId → optionIndex
  const [done, setDone] = useState(false)
  const [scores, setScores] = useState<Record<string, number>>({})

  function handleAnswer(optionIndex: number) {
    const q = questions[current]
    const option = q.options[optionIndex]
    const newAnswers = { ...answers, [q.id]: optionIndex }
    setAnswers(newAnswers)

    // Accumulate scores
    const newScores = { ...scores }
    Object.entries(option.scores).forEach(([slug, pts]) => {
      newScores[slug] = (newScores[slug] ?? 0) + pts
    })
    setScores(newScores)

    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent(current + 1)
    }
  }

  function reset() {
    setCurrent(0)
    setAnswers({})
    setDone(false)
    setScores({})
  }

  if (done) {
    // Rank cities
    const ranked = cities
      .map((c) => ({
        city: c,
        score: scores[c.slug] ?? 0,
        pct: Math.round(((scores[c.slug] ?? 0) / MAX_SCORE) * 100),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">🎯</span>
          <h2 className="text-3xl font-bold text-stone-800 mb-2">Your top French cities</h2>
          <p className="text-stone-500">Based on your budget, lifestyle, and academic goals</p>
        </div>

        <div className="space-y-5 mb-10">
          {ranked.map((r, i) => (
            <div
              key={r.city.slug}
              className={`bg-white rounded-2xl border p-6 shadow-sm ${i === 0 ? 'border-blue-300 ring-2 ring-blue-100' : 'border-stone-200'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
                  <div>
                    <h3 className="text-xl font-bold text-stone-800">{r.city.name}</h3>
                    <p className="text-xs text-stone-400">{r.city.region}, France</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${i === 0 ? 'text-blue-700' : 'text-stone-700'}`}>
                    {r.pct}%
                  </span>
                  <p className="text-xs text-stone-400">match</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-stone-100 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full transition-all ${i === 0 ? 'bg-blue-600' : 'bg-stone-400'}`}
                  style={{ width: `${r.pct}%` }}
                />
              </div>

              <p className="text-stone-500 text-sm mb-4">{r.city.tagline}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {r.city.heroStats.map((stat) => (
                  <div key={stat.label} className="bg-stone-50 rounded-xl p-3">
                    <p className="text-xs text-stone-400 mb-0.5">{stat.label}</p>
                    <p className="text-sm font-bold text-stone-800">{stat.value}</p>
                  </div>
                ))}
              </div>

              <Link
                href={`/cities/${r.city.slug}`}
                className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors ${
                  i === 0
                    ? 'bg-blue-700 text-white hover:bg-blue-800'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Full guide for {r.city.name} →
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={reset}
            className="flex-1 border border-stone-200 text-stone-600 hover:bg-stone-50 font-medium py-3 rounded-full transition-colors text-sm"
          >
            ← Retake quiz
          </button>
          <Link
            href="/budget-planner"
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 rounded-full transition-colors text-sm text-center"
          >
            Check your budget →
          </Link>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2">
          Which French city is right for you?
        </h1>
        <p className="text-stone-500 text-sm">
          Answer {questions.length} quick questions — get your top 3 matches
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-stone-400 mb-2">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-stone-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-stone-800 mb-6">{q.text}</h2>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left bg-stone-50 hover:bg-blue-50 hover:border-blue-300 border border-stone-100 rounded-xl px-5 py-4 text-sm text-stone-700 font-medium transition-all duration-150 group"
            >
              <span className="group-hover:text-blue-700 transition-colors">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Skip / back */}
      {current > 0 && (
        <button
          onClick={() => setCurrent(current - 1)}
          className="mt-4 text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          ← Back
        </button>
      )}
    </div>
  )
}
