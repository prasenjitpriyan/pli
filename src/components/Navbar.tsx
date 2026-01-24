'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] bg-gradient-to-br from-[var(--primary-red)] to-[#a82333] text-white shadow-md py-4">
      <div className="container-custom flex justify-between items-center">
        <div className="logo-area">
          <Link href="/" className="text-2xl font-bold tracking-[2px]">
            PLI
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
        <ul className="hidden md:flex gap-8 list-none">
          <li>
            <Link
              href="/#about"
              className="hover:opacity-80 transition-opacity text-[0.95rem]">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/#why"
              className="hover:opacity-80 transition-opacity text-[0.95rem]">
              Why PLI
            </Link>
          </li>
          <li>
            <Link
              href="/#products"
              className="hover:opacity-80 transition-opacity text-[0.95rem]">
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="hover:opacity-80 transition-opacity text-[0.95rem]">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-[70%] max-w-[300px] bg-gradient-to-br from-[var(--primary-red)] to-[#a82333] shadow-[-5px_0_15px_rgba(0,0,0,0.2)] z-[100] flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <ul className="flex flex-col gap-8 list-none text-center">
            <li>
              <Link
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl hover:opacity-80">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/#why"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl hover:opacity-80">
                Why PLI
              </Link>
            </li>
            <li>
              <Link
                href="/#products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl hover:opacity-80">
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl hover:opacity-80">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
