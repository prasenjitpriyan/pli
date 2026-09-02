'use client';

import Link from 'next/link';
import { PliLogo } from './common/PliLogo';
import { FloatingDock, FloatingDockItem } from './ui/floating-dock';

const DOCK_ITEMS: FloatingDockItem[] = [
  {
    title: 'Home Portal',
    icon: <i className="ri-home-5-line"></i>,
    href: '/',
  },
  {
    title: 'Actuarial Calculator',
    icon: <i className="ri-calculator-line text-(--accent-gold)"></i>,
    href: '/calculator',
  },
  {
    title: 'All 12 Schemes',
    icon: <i className="ri-shield-star-line text-sky-400"></i>,
    href: '/schemes',
  },
  {
    title: 'WhatsApp Advisor',
    icon: <i className="ri-whatsapp-fill text-[#25D366]"></i>,
    href: 'https://wa.me/919038332076?text=Hello%2C%20I%20want%20to%20know%20about%20PLI%20policies.',
    external: true,
  },
  {
    title: 'Facebook Community',
    icon: <i className="ri-facebook-fill text-blue-400"></i>,
    href: 'https://facebook.com',
    external: true,
  },
  {
    title: 'X / Twitter Updates',
    icon: <i className="ri-twitter-x-line text-slate-100"></i>,
    href: 'https://x.com',
    external: true,
  },
  {
    title: 'Instagram',
    icon: <i className="ri-instagram-line text-pink-400"></i>,
    href: 'https://instagram.com',
    external: true,
  },
  {
    title: 'LinkedIn Network',
    icon: <i className="ri-linkedin-fill text-sky-400"></i>,
    href: 'https://linkedin.com',
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="bg-(--primary-dark) text-[#e0e0e0] pt-16 mt-20 text-[0.95rem] overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 pb-12 border-b border-white/10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <PliLogo variant="combined" size="md" showText={true} showSubtitle={true} />
            </div>
            <p className="leading-relaxed opacity-80 text-sm text-slate-300">
              Postal Life Insurance & Rural Postal Life Insurance, serving the nation since 1884.
              Providing financial security with sovereign guarantee and GST-free premiums.
            </p>

            {/* Aceternity macOS Floating Dock Navigation & Social Hub */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Connect & Quick Navigate
              </span>
              <FloatingDock items={DOCK_ITEMS} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-6 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-10 after:h-0.5 after:bg-(--accent-gold)">
              Explore Portal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block">
                  Home Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block">
                  All 12 Schemes
                </Link>
              </li>
              <li>
                <Link
                  href="/bonus-rates"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block">
                  Declared Bonus Rates
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block">
                  Actuarial Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-6 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-10 after:h-0.5 after:bg-(--accent-gold)">
              Official Tools
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://share.google/NHDWnZ0xIYZgnilIi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--accent-gold) hover:underline hover:translate-x-1 transition-all inline-flex items-center gap-1 font-bold">
                  <i className="ri-google-fill"></i> Google Business Profile
                </a>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-white hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block font-semibold">
                  Quote Calculation Procedure
                </Link>
              </li>
              <li>
                <Link
                  href="/bonus-rates"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block">
                  ₹76/₹1,000 Bonus Table
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block">
                  PLI vs RPLI Comparison
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-6 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-10 after:h-0.5 after:bg-(--accent-gold)">
              Contact Us
            </h3>
            <ul className="space-y-4 text-[#ccc]">
              <li className="flex gap-4 items-start">
                <i className="ri-map-pin-line text-(--accent-gold) text-xl mt-0.5"></i>
                <span>
                  Haltu, 57, P. Majumder Road
                  <br />
                  Opposite Moitre Sangha Club, Kolkata - 700078
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <i className="ri-phone-line text-(--accent-gold) text-xl mt-0.5"></i>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <a href="tel:9038332076" className="hover:text-white transition-colors font-bold">
                      +91 9038332076
                    </a>
                    <a
                      href="https://wa.me/919038332076?text=Hello%2C%20I%20want%20to%20know%20about%20PLI%20policies."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold transition-all inline-flex items-center gap-1"
                      title="Chat on WhatsApp">
                      <i className="ri-whatsapp-fill"></i> WhatsApp
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="tel:8620935473" className="hover:text-white transition-colors font-bold">
                      +91 8620935473
                    </a>
                    <a
                      href="https://wa.me/918620935473?text=Hello%2C%20I%20want%20to%20know%20about%20PLI%20policies."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white font-semibold transition-all inline-flex items-center gap-1"
                      title="Chat on WhatsApp">
                      <i className="ri-whatsapp-fill"></i> WhatsApp
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <i className="ri-mail-line text-(--accent-gold) text-xl mt-0.5"></i>
                <a
                  href="mailto:pli@indiapost.gov.in"
                  className="hover:text-white transition-colors">
                  prasenjitpriyan@gmail.com
                </a>
              </li>
              <li className="flex gap-4 items-start">
                <i className="ri-global-line text-(--accent-gold) text-xl mt-0.5"></i>
                <a
                  href="https://pli.indiapost.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors">
                  pli.indiapost.gov.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-col md:flex-row justify-between items-center text-sm opacity-70 gap-4 text-center md:text-left">
          <p>
            &copy; <span id="current-year">{new Date().getFullYear()}</span> PLI & RPLI - PD. All
            Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
