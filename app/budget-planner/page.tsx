import type { Metadata } from 'next'
import BudgetPlannerClient from './BudgetPlannerClient'

export const metadata: Metadata = {
  title: 'Student Budget Planner — France City Cost Calculator',
  description:
    'Calculate your monthly student budget for any French city. See rent, food, transport, and living costs broken down — and find out which city fits your budget.',
  keywords: [
    'student budget France',
    'cost of living France student',
    'student budget planner France',
    'how much does it cost to study in France',
    'France student monthly budget',
  ],
  openGraph: {
    title: 'Student Budget Planner — France City Cost Calculator',
    description:
      'Calculate your monthly student budget for any French city. Compare rent, food, transport, and living costs across 12 cities.',
    type: 'website',
  },
}

export default function BudgetPlannerPage() {
  return <BudgetPlannerClient />
}
