import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-5xl mb-4">🗺️</p>
      <h2 className="text-2xl font-bold text-stone-800 mb-2">City not found</h2>
      <p className="text-stone-500 mb-6">We don't have data for that city yet.</p>
      <Link
        href="/"
        className="bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-800 transition-colors"
      >
        Back to all cities
      </Link>
    </div>
  )
}
