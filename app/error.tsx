'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-stone-800 mb-2">Something went wrong</h2>
      <p className="text-stone-500 text-sm mb-8 max-w-sm leading-relaxed">
        An unexpected error occurred. You can try again or head back to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="bg-[#1E3A6E] hover:bg-[#162D58] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-white border border-stone-200 hover:border-stone-300 text-stone-700 font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
