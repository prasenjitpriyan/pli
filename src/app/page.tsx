'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  const scrollObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Scroll Animation similar to script.js
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    scrollObserver.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation =
            'fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = '0'; // Initial state
      scrollObserver.current?.observe(el);
    });

    return () => {
      scrollObserver.current?.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-light)]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#d9233b] via-[#9e1c2e] to-[#1a202c] text-white py-32 md:py-40 px-6 overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent-gold)] opacity-10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="container-custom relative z-10 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight drop-shadow-lg">
            Postal Life Insurance
          </h1>
          <p className="text-2xl md:text-3xl font-medium text-[var(--accent-gold)] mb-4 tracking-wide uppercase">
            Insuring Lives, Assuring Happiness
          </p>
          <div className="h-1 w-24 bg-[var(--accent-gold)] rounded-full mb-8"></div>

          <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
            Experience the trust of India&apos;s oldest life insurer.{' '}
            <br className="hidden md:block" />
            Backed by a{' '}
            <span className="font-semibold text-white">
              Sovereign Guarantee
            </span>{' '}
            from the Government of India.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <button
              onClick={() => scrollToSection('about')}
              className="btn-primary shadow-lg shadow-black/20">
              Discover More
            </button>
            <Link
              href="/calculator"
              className="bg-transparent border-2 border-[var(--accent-gold)] text-[var(--accent-gold)] py-3 px-8 rounded-full font-bold text-lg hover:bg-[var(--accent-gold)] hover:text-[var(--primary-dark)] hover:-translate-y-1 transition-all duration-300">
              Calculate Premium
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-24 px-6 relative" id="about">
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[var(--shadow-card)] border border-gray-100 animate-on-scroll">
            <h2 className="section-title !mb-8">Heritage Meets Modernity</h2>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <p className="text-lg text-[var(--text-dark)] leading-loose mb-6 font-light">
                  Established in{' '}
                  <strong className="text-[var(--primary-red)]">1884</strong>,
                  Postal Life Insurance (PLI) is the oldest and most trusted
                  life insurance provider in the country. Unlike commercial
                  insurers, we operate with a primary goal of welfare, offering
                  distinct advantages like low premiums and high bonus rates.
                </p>
                <p className="text-lg text-[var(--text-light)] leading-loose">
                  Your policy is secured by the sovereign guarantee of the
                  Government of India, ensuring your investment is 100% safe.
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-gradient-to-br from-[var(--primary-dark)] to-slate-800 text-white p-8 rounded-2xl shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-4 text-[var(--accent-gold)] border-b border-white/10 pb-4">
                    Why is it cheaper?
                  </h3>
                  <p className="mb-4 opacity-90">
                    Operations are managed through the existing postal network,
                    significantly reducing administrative costs. These savings
                    are passed directly to you as{' '}
                    <strong>Higher Bonuses</strong>.
                  </p>
                  <div className="bg-[var(--accent-gold)]/20 p-4 rounded-lg border border-[var(--accent-gold)]/30 mt-6">
                    <span className="block text-sm uppercase tracking-wider text-[var(--accent-gold)] font-bold mb-1">
                      Update
                    </span>
                    <p className="text-sm font-medium">
                      Effective 22.09.2025, PLI premiums are{' '}
                      <span className="text-white bg-[var(--primary-red)] px-2 py-0.5 rounded text-xs ml-1">
                        GST FREE
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white" id="why">
        <div className="container-custom">
          <h2 className="section-title">The PLI Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: 'ri-shield-check-fill',
                title: 'Sovereign Guarantee',
                desc: '100% security of capital and returns, backed by the Union Government.',
              },
              {
                icon: 'ri-money-diamond-circle-fill',
                title: 'Low Premium, High Bonus',
                desc: 'Unmatched returns compared to any other insurer in the market.',
              },
              {
                icon: 'ri-bar-chart-grouped-fill',
                title: 'Consistently High Bonus',
                desc: 'We consistently declare higher bonus rates due to low operational costs.',
              },
              {
                icon: 'ri-percent-line',
                title: 'Tax Benefits',
                desc: 'Tax exemptions under Sec 80C (Premium) and Sec 10(10D) (Maturity).',
              },
              {
                icon: 'ri-hand-coin-fill',
                title: 'GST-Free Premiums',
                desc: 'Save flat 18% instantly compared to private insurers. Full value for money.',
              },
              {
                icon: 'ri-safe-2-fill',
                title: 'Systematic Investment',
                desc: "A disciplined way to build a corpus for retirement or child's education.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-[var(--bg-light)] border border-transparent hover:border-[var(--accent-gold)] hover:bg-white card-hover relative overflow-hidden animate-on-scroll">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-gold)] opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity"></div>
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-[var(--primary-red)] text-2xl group-hover:bg-[var(--primary-red)] group-hover:text-white transition-colors duration-300">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[var(--text-light)] text-[0.95rem] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section - Clean Modern List */}
      <section className="py-20 px-6 bg-[var(--bg-light)]">
        <div className="container-custom">
          <h2 className="section-title">Who Can Apply?</h2>
          <p className="text-center text-[var(--text-light)] max-w-2xl mx-auto mb-16">
            Previously exclusive to postal employees, PLI is now available to a
            wide range of professionals and employees across India.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Government Sector',
                icon: 'ri-building-2-line',
                items: [
                  'Central & State Govt.',
                  'Defense & Paramilitary',
                  'PSUs & Banks',
                  'Local Bodies',
                ],
              },
              {
                title: 'Education',
                icon: 'ri-book-open-line',
                items: [
                  'Govt. Aided Schools',
                  'Universities',
                  'AICTE/CBSE/NAAC Inst.',
                  'Private School Staff',
                ],
              },
              {
                title: 'Private Sector',
                icon: 'ri-briefcase-4-line',
                items: [
                  'NSE/BSE Listed Co.',
                  'IT & Banking',
                  'Manufacturing',
                  'Joint Ventures',
                ],
              },
              {
                title: 'Professionals',
                icon: 'ri-stethoscope-line',
                items: [
                  'Doctors & Engineers',
                  'CAs & Architects',
                  'Lawyers & Bankers',
                  'Diploma Holders',
                ],
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100/50 animate-on-scroll hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <i
                    className={`${category.icon} text-2xl text-[var(--primary-red)]`}></i>
                  <h4 className="text-[var(--primary-dark)] font-bold text-lg leading-tight">
                    {category.title}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[var(--text-light)] text-sm font-medium">
                      <i className="ri-check-line text-green-500 mt-0.5 font-bold"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 md:py-24 px-6 bg-white" id="products">
        <div className="container-custom">
          <h2 className="section-title">Our Premium Product Suite</h2>

          <div className="lg:max-w-4xl mx-auto bg-gradient-to-r from-[var(--primary-dark)] to-slate-800 text-white rounded-2xl p-6 md:p-10 mb-16 shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 animate-on-scroll">
            <div className="text-center md:text-left">
              <span className="text-[var(--accent-gold)] uppercase tracking-widest text-xs font-bold mb-2 block">
                Coverage Limits
              </span>
              <h3 className="text-2xl md:text-3xl font-bold">
                Sum Assured Flexibility
              </h3>
            </div>
            <div className="flex gap-8 md:gap-16 text-center">
              <div>
                <p className="text-sm opacity-60 mb-1">Minimum</p>
                <p className="text-2xl md:text-4xl font-bold text-[var(--accent-gold)]">
                  ₹20K
                </p>
              </div>
              <div className="w-[1px] bg-white/10"></div>
              <div>
                <p className="text-sm opacity-60 mb-1">Maximum</p>
                <p className="text-2xl md:text-4xl font-bold text-[var(--accent-gold)]">
                  ₹50L
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Suraksha',
                sub: 'Whole Life Assurance',
                color: 'from-blue-600 to-blue-800',
              },
              {
                title: 'Santosh',
                sub: 'Endowment Assurance',
                color: 'from-green-600 to-green-800',
              },
              {
                title: 'Suvidha',
                sub: 'Convertible Whole Life',
                color: 'from-purple-600 to-purple-800',
              },
              {
                title: 'Sumangal',
                sub: 'Anticipated Endowment',
                color: 'from-orange-500 to-red-600',
              },
              {
                title: 'Yugal Suraksha',
                sub: 'Joint Life Assurance',
                color: 'from-pink-600 to-rose-700',
              },
              {
                title: 'Bal Jeevan Bima',
                sub: 'Children Policy',
                color: 'from-teal-500 to-cyan-700',
              },
            ].map((prod, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 animate-on-scroll">
                <div className={`h-2 bg-gradient-to-r ${prod.color}`}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[var(--primary-dark)] mb-1">
                    {prod.title}
                  </h3>
                  <p className="text-sm text-[var(--primary-red)] font-semibold uppercase tracking-wide mb-6">
                    {prod.sub}
                  </p>
                  <Link
                    href="/calculator"
                    className="inline-flex items-center text-sm font-bold text-[var(--text-light)] group-hover:text-[var(--primary-red)] transition-colors">
                    Check Premium{' '}
                    <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Rates Table */}
      <section className="py-20 px-6 bg-[var(--bg-light)]">
        <div className="container-custom">
          <h2 className="section-title">High Bonus Rates</h2>
          <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-2xl shadow-lg animate-on-scroll">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--primary-dark)] text-white">
                  <th className="p-5 font-semibold">Policy Type</th>
                  <th className="p-5 font-semibold text-right">
                    Bonus per ₹1,000 SA
                  </th>
                </tr>
              </thead>
              <tbody className="text-[var(--text-dark)] divide-y divide-gray-100">
                {[
                  { name: 'Whole Life Assurance (Suraksha)', rate: '₹76' },
                  { name: 'Endowment Assurance (Santosh)', rate: '₹52' },
                  { name: 'Anticipated Endowment (Sumangal)', rate: '₹48' },
                  { name: 'Convertible Whole Life (Suvidha)', rate: '₹76' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-5 font-medium">{row.name}</td>
                    <td className="p-5 text-right font-bold text-[var(--primary-red)]">
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-[var(--text-light)] mt-6 italic">
            * Bonus rates are subject to revision by GoI.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 px-6 bg-[var(--primary-red)] text-white text-center"
        id="contact">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Secure Your Future Today
          </h2>
          <p className="text-xl opacity-90 mb-10 leading-relaxed">
            Join millions of satisfied customers who trust Postal Life Insurance
            for their financial security. Get a quote in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/calculator"
              className="bg-white text-[var(--primary-red)] py-4 px-10 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              Calculate Premium
            </Link>
            <a
              href="#contact"
              className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Locate Post Office
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
