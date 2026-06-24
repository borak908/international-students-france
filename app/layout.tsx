import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: 'International Students France — Study in France Guide',
    template: '%s | International Students France',
  },
  description:
    'The complete guide for international students choosing where to study in France. Compare cities, universities, housing costs, visa rules, and student life.',
  keywords: ['study in France', 'international students France', 'French universities', 'student visa France'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'International Students France',
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
                InternationalStudentsFrance
              </span>
            </a>
            <nav className="flex items-center gap-6 text-sm text-stone-500">
              <a href="/" className="hover:text-stone-800 transition-colors">Cities</a>
              <a href="/#compare" className="hover:text-stone-800 transition-colors">Compare</a>
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-stone-700 text-sm">InternationalStudentsFrance</p>
                <p className="text-xs text-stone-400 mt-1">
                  Data sourced from Numbeo, CampusFrance, CAF.fr, and university websites.
                </p>
              </div>
              <p className="text-xs text-stone-400">
                © {new Date().getFullYear()} · For informational purposes only
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
