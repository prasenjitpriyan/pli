import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Declared Bonus Rates | Postal Life Insurance (PLI & RPLI)',
  description:
    "India's highest declared bonus rates up to ₹76 per ₹1,000 Sum Assured with 100% Sovereign Guarantee and 0% GST premiums. Full table of declared bonuses for PLI and RPLI.",
  openGraph: {
    title: 'Declared Bonus Rates - Postal Life Insurance (Govt of India)',
    description:
      'Official declared simple reversionary bonuses for Suraksha, Santosh, Suvidha, Gram Suraksha, and more.',
  },
};

export default function BonusRatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
