import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Postal Life Insurance',
  description:
    'Comprehensive official FAQ on PLI and RPLI eligibility, bonus rates calculation, claim settlement, policy loans, surrender values, and 80C/10(10D) tax benefits.',
  openGraph: {
    title: 'Postal Life Insurance FAQ & Knowledgebase',
    description:
      'Answers to common queries regarding PLI and RPLI schemes, bonuses, loans, and tax exemptions.',
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
