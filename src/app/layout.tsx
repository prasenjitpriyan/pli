import RouteProgressBar from '@/components/common/RouteProgressBar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://pli-hazel.vercel.app';

export const viewport: Viewport = {
  themeColor: '#961b2d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI) | Govt of India',
    template: '%s | Postal Life Insurance (PLI)',
  },
  description:
    "Official Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI) Portal. 100% Sovereign Guarantee by Government of India, India's highest declared bonus rates up to ₹76/₹1,000 SA, and 0% GST premiums with complete Section 80C & 10(10D) tax exemptions.",
  applicationName: 'Postal Life Insurance',
  authors: [{ name: 'Postal Life Insurance (India Post)', url: SITE_URL }],
  generator: 'Next.js',
  keywords: [
    'Postal Life Insurance',
    'PLI',
    'RPLI',
    'Rural Postal Life Insurance',
    'India Post Life Insurance',
    'PLI Calculator',
    'RPLI Premium Calculator',
    'Suraksha Whole Life Assurance',
    'Santosh Endowment Assurance',
    'Suvidha Convertible Whole Life',
    'Sumangal Anticipated Endowment',
    'Yugal Suraksha Joint Life',
    'Bal Jeevan Bima Children Policy',
    'Gram Suraksha',
    'Gram Santosh',
    'Gram Suvidha',
    'Gram Sumangal',
    'Gram Priya 10 Year Policy',
    'Highest Bonus Life Insurance India',
    'Sovereign Guarantee Life Insurance',
    'Tax Free Life Insurance 80C',
    '0% GST Insurance Policy',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Postal Life Insurance (India Post)',
  publisher: 'Ministry of Communications, Government of India',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/pli-logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/images/pli-logo.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Postal Life Insurance (PLI & RPLI)',
    title: 'Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI)',
    description:
      "India's Highest-Bonus & Sovereign Guaranteed Life Insurance Schemes. 0% GST and 100% Tax-Free Returns under Sec 80C & 10(10D). Serving since 1884.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI) - Sovereign Guaranteed Protection',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@IndiaPostOffice',
    creator: '@IndiaPostOffice',
    title: 'Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI)',
    description:
      "India's Highest-Bonus & Sovereign Guaranteed Life Insurance Schemes. 0% GST and 100% Tax-Free Returns.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Finance & Government Insurance',
};

// JSON-LD Structured Data Schema for Government Financial Product / Organization
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'GovernmentOrganization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Postal Life Insurance (India Post)',
      alternateName: 'PLI & RPLI',
      url: SITE_URL,
      logo: `${SITE_URL}/images/pli-logo.png`,
      foundingDate: '1884-02-01',
      parentOrganization: {
        '@type': 'GovernmentOrganization',
        name: 'Department of Posts, Ministry of Communications, Government of India',
        url: 'https://www.indiapost.gov.in',
      },
      description:
        'Oldest life insurer in India providing sovereign guaranteed life insurance policies with the highest declared bonuses and 0% GST.',
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
    },
    {
      '@type': 'FinancialProduct',
      '@id': `${SITE_URL}/#product`,
      name: 'Postal Life Insurance & Rural Postal Life Insurance',
      url: SITE_URL,
      provider: {
        '@id': `${SITE_URL}/#organization`,
      },
      category: 'Life Insurance',
      description:
        'Table-driven life insurance schemes with up to ₹50 Lakhs sum assured, 100% sovereign guarantee, up to ₹76/₹1,000 bonus rates, and tax exemptions under 80C & 10(10D).',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: '0',
        description: 'Instant official quote calculation with mathematical audit trail',
      },
    },
  ],
};

import WhatsAppFloatingWidget from '@/components/common/WhatsAppFloatingWidget';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <RouteProgressBar />
        <Navbar />
        <div className="grow">{children}</div>
        <Footer />
        <WhatsAppFloatingWidget />
      </body>
    </html>
  );
}
