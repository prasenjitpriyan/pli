import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Official PLI & RPLI Premium Calculator | 11-Step Mathematical Audit Trail',
  description:
    'Calculate exact table-driven premiums, declared bonus returns up to ₹76/₹1,000 SA, GST exemptions, and maturity benefits across all 12 Postal Life Insurance schemes.',
  alternates: {
    canonical: 'https://pli-hazel.vercel.app/calculator',
  },
  openGraph: {
    title: 'Official PLI & RPLI Premium Calculator | Postal Life Insurance',
    description:
      'Instant official calculation for Whole Life, Endowment, Convertible, and Anticipated Endowment policies with verifiable 11-step mathematical breakdown.',
    url: 'https://pli-hazel.vercel.app/calculator',
    images: [
      {
        url: 'https://pli-hazel.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Postal Life Insurance & RPLI Calculator',
      },
    ],
  },
  twitter: {
    title: 'Official PLI & RPLI Premium Calculator | Postal Life Insurance',
    description:
      'Instant official calculation for Whole Life, Endowment, Convertible, and Anticipated Endowment policies with verifiable 11-step mathematical breakdown.',
    images: ['https://pli-hazel.vercel.app/opengraph-image'],
  },
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
