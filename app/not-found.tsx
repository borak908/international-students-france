import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h2 className="text-2xl font-bold text-stone-800 mb-2">Page not found</h2>
      <p className="text-stone-500 text-sm mb-8 max-w-sm leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist. It may have been moved, or the URL
        might be wrong.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="bg-[#1E3A6E] hover:bg-[#162D58] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Back to homepage
        </Link>
        <Link
          href="/cities"
          className="bg-white border border-stone-200 hover:border-stone-300 text-stone-700 font-semibold px-6 py-3 rounded-full text-sm transition-colors"
        >
          Browse all cities
        </Link>
      </div>
    </div>
  )
}
