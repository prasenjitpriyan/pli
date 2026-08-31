import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pli.indiapost.gov.in'),
  title: {
    default: 'Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI)',
    template: '%s | Postal Life Insurance (PLI)',
  },
  description:
    'Official Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI) portal. Sovereign guarantee by the Government of India, declared bonus up to ₹76/₹1,000 SA, and 0% GST premiums.',
  keywords: [
    'Postal Life Insurance',
    'PLI',
    'RPLI',
    'Rural Postal Life Insurance',
    'India Post Insurance',
    'PLI Calculator',
    'Gram Suraksha',
    'Santosh',
    'Suvidha',
    'Sumangal',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/images/pli-logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/images/pli-logo.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI)',
    description:
      "India's Highest-Bonus & Sovereign Guaranteed Life Insurance Schemes. 0% GST and 100% Tax-Free Returns.",
    siteName: 'Postal Life Insurance (India Post)',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI)',
    description: "India's Highest-Bonus & Sovereign Guaranteed Life Insurance Schemes.",
  },
};

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
      </head>
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <Navbar />
        <div className="grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
