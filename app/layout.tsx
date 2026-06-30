import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import cities from '@/data/cities.json'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'Compare Study France — Compare French Cities for International Students',
    template: '%s | Compare Study France',
  },
  description:
    'The complete comparison guide for international students choosing where to study in France. Compare 12 cities by housing costs, universities, transport, visa rules, and student life.',
  keywords: ['study in France', 'international students France', 'French universities', 'student visa France', 'compare French cities'],
  alternates: {
    canonical: 'https://comparestudyfrance.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Compare Study France',
    url: 'https://comparestudyfrance.com',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@comparestudyfr',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#F5F2ED]">
        {/* ── Nav ── */}
        <header className="sticky top-0 z-50 bg-[#0D1B35]/95 backdrop-blur-md border-b border-[#1E3A6E]">
          {/* Thin tricolour line at very top of navbar */}
          <div className="h-0.5 flex">
            <div className="flex-1 bg-[#4A70C4]" />
            <div className="flex-1 bg-[#F5F2ED]" />
            <div className="flex-1 bg-[#B86040]" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 group">
              <span className="flex items-center justify-center bg-white rounded-md p-1 shadow-sm">
                <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M50 80 C50 80 10 52 10 30 C10 18 20 10 32 14 C39 16 45 22 50 30 C50 30 50 80 50 80Z" fill="#002395"/>
                  <path d="M50 30 C55 22 61 16 68 14 C80 10 90 18 90 30 C90 52 50 80 50 80 Z" fill="#ED2939"/>
                  <circle cx="68" cy="34" r="9" fill="white"/>
                </svg>
              </span>
              <span className="font-semibold text-white text-sm sm:text-base tracking-widest uppercase group-hover:text-[#90ADDA] transition-colors">
                Compare Study France
              </span>
            </a>
            <nav className="flex items-center gap-1 sm:gap-2 text-sm text-[#90ADDA]">
              <a href="/" className="hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-[#1E3A6E]">Cities</a>
              <a href="/budget-planner" className="hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-[#1E3A6E] hidden sm:block">Budget</a>
              <a href="/city-quiz" className="hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-[#1E3A6E] hidden sm:block">Quiz</a>
              <a href="/blog" className="hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-[#1E3A6E]">Blog</a>
              <a
                href="/city-quiz"
                className="ml-2 bg-[#B86040] hover:bg-[#9E5234] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors whitespace-nowrap"
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
        <footer className="bg-[#0D1B35] mt-16">
          {/* Tricolour top stripe */}
          <div className="h-0.5 flex">
            <div className="flex-1 bg-[#4A70C4]" />
            <div className="flex-1 bg-[#F5F2ED]" />
            <div className="flex-1 bg-[#B86040]" />
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M50 80 C50 80 10 52 10 30 C10 18 20 10 32 14 C39 16 45 22 50 30 C50 30 50 80 50 80Z" fill="#002395"/>
                    <path d="M50 30 C55 22 61 16 68 14 C80 10 90 18 90 30 C90 52 50 80 50 80 Z" fill="#ED2939"/>
                    <circle cx="68" cy="34" r="9" fill="white"/>
                  </svg>
                  <p className="font-semibold text-white text-sm tracking-widest uppercase">Compare Study France</p>
                </div>
                <p className="text-xs text-[#90ADDA] leading-relaxed">
                  The independent comparison guide for international students choosing where to study in France.
                </p>
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-3">Tools</p>
                <div className="space-y-2">
                  <a href="/budget-planner" className="block text-xs text-[#90ADDA] hover:text-white transition-colors">Budget Planner</a>
                  <a href="/city-quiz" className="block text-xs text-[#90ADDA] hover:text-white transition-colors">City Quiz</a>
                  <a href="/#compare" className="block text-xs text-[#90ADDA] hover:text-white transition-colors">City Comparison Table</a>
                </div>
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-3">Cities</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {cities.map((city) => (
                    <a key={city.slug} href={`/cities/${city.slug}`} className="text-xs text-[#90ADDA] hover:text-white transition-colors">
                      {city.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-[#1E3A6E] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-xs text-[#90ADDA]">
                Data sourced from Numbeo, CampusFrance, CAF.fr, and university websites.
              </p>
              <p className="text-xs text-[#90ADDA]">
                © {new Date().getFullYear()} Compare Study France · For informational purposes only
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
