import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'CompareStudyFrance — Compare French Cities for International Students',
    template: '%s | CompareStudyFrance',
  },
  description:
    'The complete comparison guide for international students choosing where to study in France. Compare 12 cities by housing costs, universities, transport, visa rules, and student life.',
  keywords: ['study in France', 'international students France', 'French universities', 'student visa France', 'compare French cities'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CompareStudyFrance',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        {/* ── Nav ── */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              {/* French flag mini */}
              <span className="flex h-5 w-8 rounded-sm overflow-hidden shadow-sm">
                <span className="flex-1 bg-[#002395]" />
                <span className="flex-1 bg-white" />
                <span className="flex-1 bg-[#ED2939]" />
              </span>
              <span className="font-semibold text-stone-800 text-sm sm:text-base group-hover:text-blue-700 transition-colors">
                CompareStudyFrance
              </span>
            </a>
            <nav className="flex items-center gap-1 sm:gap-2 text-sm text-stone-500">
              <a href="/" className="hover:text-stone-800 transition-colors px-2 py-1 rounded-lg hover:bg-stone-50">Cities</a>
              <a href="/budget-planner" className="hover:text-stone-800 transition-colors px-2 py-1 rounded-lg hover:bg-stone-50 hidden sm:block">Budget</a>
              <a href="/city-quiz" className="hover:text-stone-800 transition-colors px-2 py-1 rounded-lg hover:bg-stone-50 hidden sm:block">Quiz</a>
              <a href="/blog" className="hover:text-stone-800 transition-colors px-2 py-1 rounded-lg hover:bg-stone-50">Blog</a>
              <a
                href="/city-quiz"
                className="ml-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors whitespace-nowrap"
              >
                Find my city →
              </a>
            </nav>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="flex-1">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-stone-200 bg-white mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-4 w-6 rounded-sm overflow-hidden shadow-sm">
                    <span className="flex-1 bg-[#002395]" />
                    <span className="flex-1 bg-white border-y border-stone-200" />
                    <span className="flex-1 bg-[#ED2939]" />
                  </span>
                  <p className="font-semibold text-stone-700 text-sm">CompareStudyFrance</p>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  The independent comparison guide for international students choosing where to study in France.
                </p>
              </div>
              <div>
                <p className="font-semibold text-stone-700 text-sm mb-3">Tools</p>
                <div className="space-y-2">
                  <a href="/budget-planner" className="block text-xs text-stone-400 hover:text-stone-600 transition-colors">Budget Planner</a>
                  <a href="/city-quiz" className="block text-xs text-stone-400 hover:text-stone-600 transition-colors">City Quiz</a>
                  <a href="/#compare" className="block text-xs text-stone-400 hover:text-stone-600 transition-colors">City Comparison Table</a>
                </div>
              </div>
              <div>
                <p className="font-semibold text-stone-700 text-sm mb-3">Cities</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {['paris','lyon','toulouse','bordeaux','montpellier','strasbourg','nantes','grenoble','rennes','nice'].map((slug) => (
                    <a key={slug} href={`/cities/${slug}`} className="text-xs text-stone-400 hover:text-stone-600 transition-colors capitalize">
                      {slug === 'aix-en-provence' ? 'Aix-en-Provence' : slug.charAt(0).toUpperCase() + slug.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-xs text-stone-400">
                Data sourced from Numbeo, CampusFrance, CAF.fr, and university websites.
              </p>
              <p className="text-xs text-stone-400">
                © {new Date().getFullYear()} CompareStudyFrance · For informational purposes only
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
