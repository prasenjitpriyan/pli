'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PliLogo } from './common/PliLogo';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path.startsWith('/#') && pathname === '/') return false; // Handled by hash
    return pathname === path;
  };

  return (
    <nav
      className={`sticky top-0 z-100 transition-all duration-300 ${
        scrolled
          ? 'bg-(--primary-red)/90 backdrop-blur-md shadow-md py-3'
          : 'bg-(--primary-red) py-5'
      } text-white`}>
      <div className="container-custom flex justify-between items-center">
        <div className="logo-area flex items-center gap-3">
          <PliLogo variant="combined" size="sm" showText={true} showSubtitle={true} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn block md:hidden p-2 focus:outline-none ${
            isMobileMenuOpen ? 'active' : ''
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation">
          <span
            className={`block w-6.25 h-0.75 bg-white my-1.25 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span
            className={`block w-6.25 h-0.75 bg-white my-1.25 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span
            className={`block w-6.25 h-0.75 bg-white my-1.25 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-7 list-none items-center">
          {[
            { name: 'Home', href: '/' },
            { name: 'Schemes', href: '/schemes' },
            { name: 'Bonus Rates', href: '/bonus-rates' },
            { name: 'Calculator', href: '/calculator' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Contact', href: '/contact' },
          ].map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-[0.92rem] font-medium transition-all hover:text-(--accent-gold) ${
                  isActive(link.href)
                    ? 'text-(--accent-gold) font-bold underline underline-offset-6 decoration-2'
                    : 'opacity-90'
                }`}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-[75%] max-w-80 bg-(--primary-dark) shadow-[-5px_0_15px_rgba(0,0,0,0.3)] z-100 flex flex-col items-center justify-center gap-6 transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="absolute top-6 right-6 text-white text-2xl hover:text-(--accent-gold) p-2">
            <i className="ri-close-line"></i>
          </button>
          <ul className="flex flex-col gap-6 list-none text-center w-full px-6">
            {[
              { name: 'Home', href: '/' },
              { name: 'Schemes', href: '/schemes' },
              { name: 'Bonus Rates', href: '/bonus-rates' },
              { name: 'Calculator', href: '/calculator' },
              { name: 'FAQ', href: '/faq' },
              { name: 'Contact', href: '/contact' },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg transition-colors font-medium block py-2 rounded-xl ${
                    isActive(link.href)
                      ? 'bg-white/10 text-(--accent-gold) font-bold'
                      : 'text-white/90 hover:text-(--accent-gold)'
                  }`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
