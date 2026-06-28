import type { Metadata } from 'next'
import CityQuizClient from './CityQuizClient'

export const metadata: Metadata = {
  title: 'Which French City is Right for Me? — Student City Quiz',
  description:
    'Answer 8 questions about your budget, lifestyle, and study goals — get your top 3 French cities matched to your profile. Free quiz for international students.',
  keywords: [
    'which French city should I study in',
    'best city to study in France quiz',
    'France student city match',
    'where to study in France',
    'French city quiz international student',
  ],
  openGraph: {
    title: 'Which French City is Right for Me? — Student City Quiz',
    description:
      'Answer 8 questions and get your top 3 French city matches. Free quiz for international students choosing where to study in France.',
    type: 'website',
  },
}

export default function CityQuizPage() {
  return <CityQuizClient />
}
