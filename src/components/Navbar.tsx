'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      className={`sticky top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--primary-red)]/90 backdrop-blur-md shadow-md py-3'
          : 'bg-[var(--primary-red)] py-5'
      } text-white`}>
      <div className="container-custom flex justify-between items-center">
        <div className="logo-area flex items-center gap-2">
          {/* Add a logo image here if available, using text for now */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-wider flex items-center gap-2">
            <i className="ri-government-fill text-[var(--accent-gold)] text-3xl"></i>
            <span>PLI</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn block md:hidden p-2 focus:outline-none ${
            isMobileMenuOpen ? 'active' : ''
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation">
          <span
            className={`block w-[25px] h-[3px] bg-white my-[5px] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span
            className={`block w-[25px] h-[3px] bg-white my-[5px] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span
            className={`block w-[25px] h-[3px] bg-white my-[5px] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 list-none items-center">
          {[
            { name: 'About', href: '/#about' },
            { name: 'Why PLI', href: '/#why' },
            { name: 'Products', href: '/#products' },
            { name: 'Calculator', href: '/calculator' },
            { name: 'Contact', href: '/#contact' },
          ].map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-[0.95rem] font-medium transition-all hover:text-[var(--accent-gold)] ${
                  isActive(link.href)
                    ? 'text-[var(--accent-gold)] font-bold'
                    : 'opacity-90'
                }`}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-[70%] max-w-[300px] bg-[var(--primary-dark)] shadow-[-5px_0_15px_rgba(0,0,0,0.2)] z-[100] flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <ul className="flex flex-col gap-8 list-none text-center">
            {[
              { name: 'About', href: '/#about' },
              { name: 'Why PLI', href: '/#why' },
              { name: 'Products', href: '/#products' },
              { name: 'Calculator', href: '/calculator' },
              { name: 'Contact', href: '/#contact' },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl hover:text-[var(--accent-gold)] text-white/90 font-medium">
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
