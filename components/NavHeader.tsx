'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/cities',         label: 'Cities' },
  { href: '/budget-planner', label: 'Budget Planner' },
  { href: '/city-quiz',      label: 'City Quiz' },
  { href: '/blog',           label: 'Blog' },
]

export default function NavHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#0D1B35]/95 backdrop-blur-md border-b border-[#1E3A6E]">
      {/* Tricolour stripe */}
      <div className="h-0.5 flex" aria-hidden="true">
        <div className="flex-1 bg-[#4A70C4]" />
        <div className="flex-1 bg-[#F5F2ED]" />
        <div className="flex-1 bg-[#B03232]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
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
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1 sm:gap-2 text-sm text-[#90ADDA]" aria-label="Main navigation">
          <Link href="/cities"         className="hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-[#1E3A6E]">Cities</Link>
          <Link href="/budget-planner" className="hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-[#1E3A6E]">Budget</Link>
          <Link href="/city-quiz"      className="hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-[#1E3A6E]">Quiz</Link>
          <Link href="/blog"           className="hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-[#1E3A6E]">Blog</Link>
          <Link
            href="/city-quiz"
            className="ml-2 bg-[#B03232] hover:bg-[#8C2020] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors whitespace-nowrap"
          >
            Find my city →
          </Link>
        </nav>

        {/* Mobile: CTA + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/city-quiz"
            className="bg-[#B03232] hover:bg-[#8C2020] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors whitespace-nowrap"
          >
            Find my city →
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="text-[#90ADDA] hover:text-white p-2 rounded-lg hover:bg-[#1E3A6E] transition-colors"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <nav
          id="mobile-menu"
          className="sm:hidden bg-[#0D1B35] border-t border-[#1E3A6E] px-4 py-3 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[#90ADDA] hover:text-white hover:bg-[#1E3A6E] px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
