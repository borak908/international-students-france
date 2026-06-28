import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

// ── Simple markdown-lite renderer ─────────────────────────────────────────────
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let listBuffer: string[] = []
  let key = 0

  function flushList() {
    if (listBuffer.length === 0) return
    elements.push(
      <ul key={key++} className="list-disc list-outside pl-5 space-y-1.5 mb-5">
        {listBuffer.map((item, i) => (
          <li key={i} className="text-stone-700 text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseInline(item) }}
          />
        ))}
      </ul>
    )
    listBuffer = []
  }

  function parseInline(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#3464A8] underline hover:text-[#1A2E4A] font-medium">$1</a>')
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={key++} className="text-xl sm:text-2xl font-bold text-stone-800 mt-10 mb-4 scroll-mt-24">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={key++} className="text-lg font-bold text-stone-800 mt-6 mb-3">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2))
    } else if (line.trim() === '') {
      flushList()
    } else {
      flushList()
      elements.push(
        <p
          key={key++}
          className="text-stone-700 text-base leading-relaxed mb-5"
          dangerouslySetInnerHTML={{ __html: parseInline(line) }}
        />
      )
    }
  }
  flushList()
  return elements
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#2D3F6B] via-[#3A4F80] to-[#4A6090] text-white">
        <div className="h-0.5 bg-gradient-to-r from-[#6B8EC9] via-white/50 to-[#C97878]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <nav className="flex items-center gap-2 text-[#93BAD9] text-xs mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold leading-snug mb-4 max-w-2xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-[#93BAD9] text-xs">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article */}
          <article className="flex-1 min-w-0 max-w-2xl">
            <p className="text-stone-500 text-base leading-relaxed mb-8 text-lg border-l-4 border-[#C0D9F0] pl-4 italic">
              {post.excerpt}
            </p>
            {renderContent(post.content)}

            {/* Bottom CTA */}
            <div className="mt-10 bg-[#EBF3FB] border border-[#D0E4F7] rounded-2xl p-6">
              <h3 className="font-bold text-stone-800 mb-2">Find your ideal city</h3>
              <p className="text-stone-600 text-sm mb-4">
                Take our city quiz to get a personalised match across all 12 French cities.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/city-quiz"
                  className="inline-flex items-center gap-2 bg-[#3464A8] hover:bg-[#2A4E82] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                >
                  Take the city quiz →
                </Link>
                <Link
                  href="/budget-planner"
                  className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                >
                  Budget planner →
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-36 space-y-5">
              {/* Related articles */}
              <div className="bg-white rounded-2xl border border-stone-200 p-5">
                <h3 className="text-sm font-bold text-stone-700 mb-4">More articles</h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="block group"
                    >
                      <p className="text-sm text-stone-700 group-hover:text-[#3464A8] transition-colors font-medium leading-snug mb-1">
                        {r.title}
                      </p>
                      <p className="text-xs text-stone-400">{r.readTime}</p>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/blog"
                  className="block mt-4 text-xs text-[#3464A8] hover:text-[#2A4E82] font-medium"
                >
                  All articles →
                </Link>
              </div>

              {/* City quiz CTA */}
              <Link
                href="/city-quiz"
                className="block bg-[#3464A8] hover:bg-[#2A4E82] text-white rounded-2xl p-5 text-sm transition-colors"
              >
                <p className="font-bold mb-1">Not sure where to study?</p>
                <p className="text-[#BAD4EB] text-xs leading-relaxed">
                  Take our 8-question quiz to find your best-matched French city.
                </p>
                <p className="text-white text-xs mt-2 font-medium">Take the quiz →</p>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
