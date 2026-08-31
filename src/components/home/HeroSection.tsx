'use client'

import Link from 'next/link'
import { QuickCalculatorWidget } from './QuickCalculatorWidget'

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative bg-radial-[at_top_right] from-[#961b2d] via-[#751121] to-[#0f172a] text-white py-12 lg:py-0 lg:min-h-[calc(100svh-4.5rem)] flex items-center overflow-hidden border-b border-red-900/40">
      {/* Glowing Ambient Mesh Orbs & Geometry Watermark */}
      <div className="absolute top-0 right-0 w-137.5 h-137.5 bg-linear-to-br from-amber-400/20 to-red-600/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-112.5 h-112.5 bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px] opacity-40 pointer-events-none"></div>

      <div className="container-custom relative z-10 w-full py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 lg:space-y-4.5">
            {/* Sovereign Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-xl border border-white/20 px-3.5 py-1 rounded-full text-[0.7rem] font-bold text-amber-300 shadow-md tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Government of India • Ministry of Communications • Sovereign Guarantee</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3rem] font-black tracking-tight leading-[1.12] text-white drop-shadow-sm">
              Secure Your Family with India&apos;s{' '}
              <span className="bg-linear-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                Highest-Bonus
              </span>{' '}
              Life Insurance
            </h1>

            {/* Subheadline */}
            <p className="text-xs sm:text-sm md:text-base text-slate-200 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              Official Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI). Enjoy
              declared bonuses up to{' '}
              <strong className="text-amber-300 font-bold">₹76/₹1,000 SA</strong>, zero GST, and
              100% tax-free maturity benefits under Sec 80C & Sec 10(10D).
            </p>

            {/* Feature Value Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[0.68rem] font-semibold text-white">
                <i className="ri-shield-check-fill text-amber-300 text-xs"></i> 100% Sovereign
                Safety
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[0.68rem] font-semibold text-white">
                <i className="ri-money-dollar-circle-fill text-emerald-300 text-xs"></i> ₹76/₹1k
                Highest Bonus
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[0.68rem] font-semibold text-white">
                <i className="ri-percent-fill text-amber-300 text-xs"></i> 0% GST / Tax-Free
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[0.68rem] font-semibold text-white">
                <i className="ri-building-4-fill text-sky-300 text-xs"></i> 140+ Years of Trust
              </span>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
              <Link
                href="/calculator"
                className="bg-linear-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 py-3 px-6 rounded-xl font-extrabold text-sm hover:from-amber-300 hover:to-yellow-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <i className="ri-calculator-fill text-lg"></i>
                <span>Launch Official Calculator</span>
                <i className="ri-arrow-right-line text-sm"></i>
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection('products')}
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white py-3 px-6 rounded-xl font-bold text-sm hover:bg-white/20 hover:border-white/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="ri-layout-grid-fill text-sm text-amber-300"></i>
                <span>Explore 12 Plans</span>
              </button>
            </div>

            {/* Verified Key Statistics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-center lg:text-left">
              <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                <p className="text-xl font-black text-amber-300">₹76/₹1k</p>
                <p className="text-[0.62rem] text-slate-300 uppercase tracking-wider font-semibold">
                  Max Bonus
                </p>
              </div>
              <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                <p className="text-xl font-black text-emerald-300">0% GST</p>
                <p className="text-[0.62rem] text-slate-300 uppercase tracking-wider font-semibold">
                  Tax Savings
                </p>
              </div>
              <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                <p className="text-xl font-black text-white">₹50 Lakhs</p>
                <p className="text-[0.62rem] text-slate-300 uppercase tracking-wider font-semibold">
                  Max Cover
                </p>
              </div>
              <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                <p className="text-xl font-black text-amber-300">100%</p>
                <p className="text-[0.62rem] text-slate-300 uppercase tracking-wider font-semibold">
                  Govt Backing
                </p>
              </div>
            </div>
          </div>

          {/* Right Interactive Quick-Calculator Card */}
          <div className="lg:col-span-5">
            <QuickCalculatorWidget />
          </div>
        </div>
      </div>
    </section>
  )
}
