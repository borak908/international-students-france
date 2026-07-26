import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Blog — International Student Guides for France',
  description:
    'Guides, data breakdowns, and honest first-person articles for international students studying in France. Housing, costs, visas, and city comparisons.',
  alternates: {
    canonical: 'https://comparestudyfrance.com/blog',
  },
  openGraph: {
    title: 'Blog — International Student Guides for France',
    description:
      'Guides, data breakdowns, and honest articles for international students studying in France.',
    type: 'website',
    url: 'https://comparestudyfrance.com/blog',
  },
}

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-stone-400 text-xs mb-6">
          <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-stone-600">Blog</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-3">
          Student Guides for France
        </h1>
        <p className="text-stone-500 text-base max-w-xl">
          Honest articles from student perspectives — housing tips, city comparisons, visa guides, and more.
        </p>
      </div>

      {/* Featured post */}
      <Link
        href={`/blog/${blogPosts[0].slug}`}
        className="group block bg-gradient-to-br from-[#0D1B35] via-[#122240] to-[#182C50] text-white rounded-2xl overflow-hidden mb-8 hover:shadow-xl transition-all duration-200"
      >
        <div className="h-1 bg-gradient-to-r from-[#4A70C4] via-white/50 to-[#B03232]" />
        <div className="p-7 sm:p-10">
          <span className="inline-block text-xs font-semibold text-[#90ADDA] uppercase tracking-widest mb-4">
            Featured
          </span>
          <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-[#B8CAE8] transition-colors">
            {blogPosts[0].title}
          </h2>
          <p className="text-[#B8CAE8] text-sm leading-relaxed mb-6 max-w-2xl">
            {blogPosts[0].excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-[#90ADDA]">
            <span>{blogPosts[0].date}</span>
            <span>·</span>
            <span>{blogPosts[0].readTime}</span>
            <span className="ml-auto text-white font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
              Read article →
            </span>
          </div>
        </div>
      </Link>

      {/* Rest of posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {blogPosts.slice(1).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-[#FDFBF7] rounded-2xl border border-stone-200 hover:border-[#90ADDA] hover:shadow-md transition-all duration-200 p-6 flex flex-col"
          >
            <div className="flex-1">
              <h2 className="text-base font-bold text-stone-800 group-hover:text-[#1E3A6E] transition-colors mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-stone-100 text-xs text-stone-400">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTAs */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/city-quiz"
          className="block text-center bg-[#1E3A6E] hover:bg-[#162D58] text-white rounded-xl px-5 py-4 text-sm font-semibold transition-colors"
        >
          Take the city quiz
        </Link>
        <Link
          href="/budget-planner"
          className="block text-center bg-[#FDFBF7] hover:bg-[#F5F2ED] border border-stone-200 text-stone-700 rounded-xl px-5 py-4 text-sm font-semibold transition-colors"
        >
          Budget planner
        </Link>
        <Link
          href="/"
          className="block text-center bg-[#FDFBF7] hover:bg-[#F5F2ED] border border-stone-200 text-stone-700 rounded-xl px-5 py-4 text-sm font-semibold transition-colors"
        >
          Compare all cities
        </Link>
      </div>
    </div>
  )
}
