import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Schemes & Policies | PLI & RPLI',
  description:
    'Explore all 12 Postal Life Insurance (PLI) and Rural Postal Life Insurance (RPLI) policies. Suraksha, Santosh, Suvidha, Sumangal, Yugal Suraksha, Bal Jeevan Bima, Gram Suraksha, Gram Santosh, Gram Suvidha, Gram Sumangal, Gram Priya.',
  openGraph: {
    title: 'Postal Life Insurance & RPLI Schemes Portfolio',
    description:
      'India Post 100% sovereign guaranteed life insurance schemes with high bonus rates and 0% GST premiums.',
  },
};

export default function SchemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
