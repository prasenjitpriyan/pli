import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Divisional Support | Postal Life Insurance',
  description:
    'Contact Postal Life Insurance divisional offices, toll-free helpline, consultation bookings, and grievance redressal officer hierarchy.',
  openGraph: {
    title: 'Postal Life Insurance Contact & Divisional Support',
    description:
      'Connect with India Post PLI & RPLI authorized insurance advisors and grievance redressal officers.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
