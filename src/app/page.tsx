'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { calculatePliQuote, formatINR, mapToCanonicalPolicy } from '../lib/pli';
import { calculateRpliQuote, mapToCanonicalRpliPolicy } from '../lib/rpli';

export default function Home() {
  const scrollObserver = useRef<IntersectionObserver | null>(null);

  // Quick Calculator Preview Widget State
  const [previewScheme, setPreviewScheme] = useState<'PLI' | 'RPLI'>('PLI');
  const [previewPolicy, setPreviewPolicy] = useState<string>('SANTOSH');
  const [previewAge, setPreviewAge] = useState<number>(30);
  const [previewSumAssured, setPreviewSumAssured] = useState<number>(500000);

  useEffect(() => {
    // Intersection Observer for scroll animations
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
      (el as HTMLElement).style.opacity = '0';
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

  // Quick Calculator Preview Calculation
  const previewQuote = useMemo(() => {
    if (previewScheme === 'RPLI') {
      return calculateRpliQuote({
        scheme: 'RPLI',
        policyType: mapToCanonicalRpliPolicy(previewPolicy),
        age: previewAge,
        sumAssured: Math.min(previewSumAssured, 1000000),
        duration: previewPolicy.includes('PRIYA') ? 10 : 20,
      });
    }
    return calculatePliQuote({
      policyType: mapToCanonicalPolicy(previewPolicy),
      age: previewAge,
      sumAssured: Math.min(previewSumAssured, 5000000),
      duration: 20,
    });
  }, [previewScheme, previewPolicy, previewAge, previewSumAssured]);

  return (
    <main className="min-h-screen bg-(--bg-light)">
      {/* 1. ULTRA-PREMIUM 100svh HERO SECTION */}
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
                Official Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI). Enjoy declared bonuses up to <strong className="text-amber-300 font-bold">₹76/₹1,000 SA</strong>, zero GST, and 100% tax-free maturity benefits under Sec 80C & Sec 10(10D).
              </p>

              {/* Feature Value Pills */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[0.68rem] font-semibold text-white">
                  <i className="ri-shield-check-fill text-amber-300 text-xs"></i> 100% Sovereign Safety
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[0.68rem] font-semibold text-white">
                  <i className="ri-money-dollar-circle-fill text-emerald-300 text-xs"></i> ₹76/₹1k Highest Bonus
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
                  className="bg-linear-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 py-3 px-6 rounded-xl font-extrabold text-sm hover:from-amber-300 hover:to-yellow-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 shadow-lg">
                  <i className="ri-calculator-fill text-lg"></i>
                  <span>Launch Official Calculator</span>
                  <i className="ri-arrow-right-line text-sm"></i>
                </Link>
                <button
                  onClick={() => scrollToSection('products')}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 text-white py-3 px-6 rounded-xl font-bold text-sm hover:bg-white/20 hover:border-white/35 transition-all flex items-center justify-center gap-2">
                  <i className="ri-layout-grid-fill text-sm text-amber-300"></i>
                  <span>Explore 12 Plans</span>
                </button>
              </div>

              {/* Verified Key Statistics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-white/15 text-center lg:text-left">
                <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                  <p className="text-xl font-black text-amber-300">₹76/₹1k</p>
                  <p className="text-[0.62rem] text-slate-300 uppercase tracking-wider font-semibold">Max Bonus</p>
                </div>
                <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                  <p className="text-xl font-black text-emerald-300">0% GST</p>
                  <p className="text-[0.62rem] text-slate-300 uppercase tracking-wider font-semibold">Tax Savings</p>
                </div>
                <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                  <p className="text-xl font-black text-white">₹50 Lakhs</p>
                  <p className="text-[0.62rem] text-slate-300 uppercase tracking-wider font-semibold">Max Cover</p>
                </div>
                <div className="p-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10">
                  <p className="text-xl font-black text-amber-300">100%</p>
                  <p className="text-[0.62rem] text-slate-300 uppercase tracking-wider font-semibold">Govt Backing</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Quick-Calculator Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-2xl text-slate-900 rounded-2xl p-5 lg:p-5.5 shadow-[0_15px_40px_rgba(0,0,0,0.35)] border border-white/60 relative overflow-hidden">
                {/* Header Gradient Top Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-red-600 via-amber-400 to-emerald-500"></div>

                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-red-700 flex items-center gap-1">
                      <i className="ri-flashlight-fill text-amber-500 text-xs"></i> Live Quotation Estimator
                    </span>
                    <p className="text-[0.65rem] text-slate-500 font-medium">Table-driven official rate engine</p>
                  </div>
                  <span className="text-[0.62rem] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span> Live Rate
                  </span>
                </div>

                {/* Scheme Toggle Pill */}
                <div className="grid grid-cols-2 gap-1.5 mb-3 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewScheme('PLI');
                      setPreviewPolicy('SANTOSH');
                    }}
                    className={`py-1.5 px-2 rounded-md text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                      previewScheme === 'PLI'
                        ? 'bg-red-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}>
                    <span>PLI</span>
                    <span className="text-[0.62rem] opacity-80 font-normal">(Govt/Urban)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewScheme('RPLI');
                      setPreviewPolicy('GRAM_SANTOSH');
                    }}
                    className={`py-1.5 px-2 rounded-md text-xs font-extrabold transition-all flex items-center justify-center gap-1 ${
                      previewScheme === 'RPLI'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}>
                    <span>RPLI</span>
                    <span className="text-[0.62rem] opacity-80 font-normal">(Rural Life)</span>
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-0.5 text-[0.72rem]">Select Policy Plan</label>
                    <select
                      value={previewPolicy}
                      onChange={(e) => setPreviewPolicy(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:border-red-600 focus:bg-white outline-none transition-all">
                      {previewScheme === 'PLI' ? (
                        <>
                          <option value="SANTOSH">Santosh — Endowment Assurance (EA)</option>
                          <option value="SURAKSHA">Suraksha — Whole Life Assurance (WLA)</option>
                          <option value="SUVIDHA">Suvidha — Convertible Whole Life (CWLA)</option>
                          <option value="SUMANGAL">Sumangal — Anticipated Endowment (AEA)</option>
                          <option value="YUGAL_SURAKSHA">Yugal Suraksha — Joint Life (JLEA)</option>
                          <option value="BAL_JEEVAN_BIMA">Bal Jeevan Bima — Children Policy</option>
                        </>
                      ) : (
                        <>
                          <option value="GRAM_SANTOSH">Gram Santosh — RPLI Endowment (EA)</option>
                          <option value="GRAM_SURAKSHA">Gram Suraksha — RPLI Whole Life (WLA)</option>
                          <option value="GRAM_SUVIDHA">Gram Suvidha — RPLI Convertible (CWLA)</option>
                          <option value="GRAM_PRIYA">Gram Priya — 10-Year Money Back</option>
                          <option value="GRAM_SUMANGAL">Gram Sumangal — RPLI Anticipated (AEA)</option>
                          <option value="BAL_JEEVAN_BIMA">Bal Jeevan Bima — RPLI Children</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="flex items-center justify-between font-bold text-slate-700 mb-0.5 text-[0.72rem]">
                        <span>Age (ANB)</span>
                        <span className="text-[0.62rem] text-slate-400 font-normal">Next B&apos;day</span>
                      </label>
                      <input
                        type="number"
                        min="19"
                        max="55"
                        value={previewAge}
                        onChange={(e) => setPreviewAge(parseInt(e.target.value, 10) || 30)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-0.5 text-[0.72rem]">Sum Assured (₹)</label>
                      <input
                        type="number"
                        step="50000"
                        min="10000"
                        max={previewScheme === 'RPLI' ? 1000000 : 5000000}
                        value={previewSumAssured}
                        onChange={(e) => setPreviewSumAssured(parseInt(e.target.value, 10) || 500000)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 outline-none focus:border-red-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Sum Assured Quick Chips */}
                  <div className="flex gap-1">
                    {(previewScheme === 'RPLI' ? [100000, 500000, 1000000] : [500000, 1000000, 2000000]).map((presetVal) => (
                      <button
                        key={presetVal}
                        type="button"
                        onClick={() => setPreviewSumAssured(presetVal)}
                        className={`flex-1 py-1 rounded-md text-[0.65rem] font-bold border transition-all ${
                          previewSumAssured === presetVal
                            ? 'bg-slate-900 text-amber-300 border-slate-900'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}>
                        ₹{presetVal >= 100000 ? `${presetVal / 100000}L` : presetVal}
                      </button>
                    ))}
                  </div>

                  {/* Calculated Quote Output Preview Card */}
                  <div className="p-3 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white rounded-xl space-y-2 mt-2 shadow-md border border-slate-700/50">
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-[0.68rem] font-medium">Monthly Net Premium:</span>
                      <span className="font-black text-amber-400 text-lg tracking-tight">
                        {formatINR(previewQuote.netMonthlyPremium)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300 text-[0.68rem]">
                      <span>Declared Bonus Rate:</span>
                      <span className="font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                        ₹{previewQuote.bonusRate} / ₹1k SA / yr
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300 border-t border-white/10 pt-1.5 font-bold">
                      <span className="text-[0.68rem]">Est. Maturity Return:</span>
                      <span className="text-white text-sm font-extrabold">
                        {formatINR(previewQuote.maturityAmount)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/calculator?scheme=${previewScheme.toLowerCase()}&policy=${previewPolicy.toLowerCase().replace('_', '-')}`}
                    className="w-full py-2.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold rounded-lg text-center text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5">
                    <span>Open Comprehensive 11-Step Calculator</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT & HERITAGE SECTION */}
      <section className="py-20 md:py-24 px-6 relative" id="about">
        <div className="container-custom">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-(--shadow-card) border border-slate-100 animate-on-scroll">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-(--primary-red)"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-(--primary-red)">
                Legacy of Trust & Sovereign Assurance
              </span>
            </div>
            <h2 className="section-title mb-8 text-left">140+ Years of Financial Security</h2>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-5">
                <p className="text-base md:text-lg text-(--text-dark) leading-relaxed">
                  Established on <strong className="text-(--primary-red)">1st February 1884</strong>, Postal Life Insurance (PLI) is the oldest life insurer in India. Originally introduced as a welfare scheme for Post Office employees, it has expanded to cover central and state government staff, defense personnel, public sector employees, educational institution staff, professionals, and rural citizens under Rural Postal Life Insurance (RPLI).
                </p>

                <p className="text-base text-slate-600 leading-relaxed">
                  Unlike commercial life insurance companies, PLI & RPLI operate with an ultra-low administrative cost ratio because services are delivered through the extensive network of over 1.5 Lakh post offices across India. These administrative cost savings are directly passed on to policyholders as <strong>the highest bonus rates in the insurance industry</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                    <i className="ri-shield-keyhole-line text-emerald-600 text-2xl shrink-0 mt-1"></i>
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm">Sovereign Guarantee</h4>
                      <p className="text-xs text-emerald-800 mt-0.5">100% capital & returns guaranteed by the Union Government of India under PLI rules.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-start gap-3">
                    <i className="ri-percent-line text-purple-600 text-2xl shrink-0 mt-1"></i>
                    <div>
                      <h4 className="font-bold text-purple-950 text-sm">GST Free Status</h4>
                      <p className="text-xs text-purple-800 mt-0.5">Effective 22.09.2025, PLI/RPLI premium payments are 100% GST Exempt.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="bg-linear-to-br from-(--primary-dark) via-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-(--accent-gold) opacity-10 rounded-full blur-2xl"></div>
                  
                  <h3 className="text-2xl font-bold text-(--accent-gold) border-b border-white/10 pb-4 flex items-center justify-between">
                    <span>The Cost Savings Advantage</span>
                    <i className="ri-line-chart-line text-2xl"></i>
                  </h3>

                  <div className="space-y-4 text-sm text-slate-200">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span>Expense Ratio Comparison:</span>
                      <span className="font-bold text-emerald-400">PLI ~5% vs Private ~20%</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span>Maximum Whole Life Bonus:</span>
                      <span className="font-bold text-(--accent-gold)">₹76 / ₹1,000 SA</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span>Tax Deductions (Sec 80C):</span>
                      <span className="font-bold text-white">Up to ₹1,50,000 / yr</span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span>Maturity Tax Exemption:</span>
                      <span className="font-bold text-emerald-400">100% Tax-Free under Sec 10(10D)</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs text-slate-300 leading-relaxed">
                    💡 <strong>Pro Tip:</strong> By eliminating agent commissions and third-party overheads, PLI policyholders receive up to <strong>30-40% higher net maturity payouts</strong> compared to conventional commercial plans.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ADVANTAGES & KEY FEATURES GRID */}
      <section className="py-20 px-6 bg-white" id="why">
        <div className="container-custom">
          <h2 className="section-title">The Unmatched PLI & RPLI Advantage</h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16 text-sm md:text-base">
            Discover why millions of government officers, defense personnel, and rural citizens trust PLI & RPLI for life cover and long-term wealth creation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-shield-check-fill',
                title: 'Sovereign Guarantee',
                desc: '100% security of capital and accrued returns backed directly by the Union Government of India.',
                color: 'text-amber-500',
              },
              {
                icon: 'ri-money-dollar-circle-fill',
                title: 'Lowest Premiums, Highest Bonus',
                desc: 'Unmatched maturity yields per rupee invested due to ultra-low operational expenses.',
                color: 'text-emerald-500',
              },
              {
                icon: 'ri-hand-coin-fill',
                title: 'GST-Free Premiums',
                desc: 'Zero GST charged on premiums, saving policyholders flat 18% compared to commercial life policies.',
                color: 'text-blue-500',
              },
              {
                icon: 'ri-percent-line',
                title: 'Tax Exemption (Sec 80C & 10(10D))',
                desc: 'Premiums qualify for Sec 80C tax deduction, and maturity returns are 100% tax-free under Sec 10(10D).',
                color: 'text-purple-500',
              },
              {
                icon: 'ri-bank-card-line',
                title: 'Loan & Surrender Facilities',
                desc: 'Policyholders can avail low-interest policy loans after 3 years and surrender options after qualifying periods.',
                color: 'text-red-500',
              },
              {
                icon: 'ri-heart-pulse-line',
                title: 'Premium Waiver Benefit (Children Policy)',
                desc: 'Under Bal Jeevan Bima, 100% of future premiums are waived upon parent passing; policy stays active until maturity.',
                color: 'text-teal-500',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl bg-(--bg-light) border border-slate-100 hover:border-(--accent-gold) hover:bg-white transition-all duration-300 shadow-xs hover:shadow-xl relative overflow-hidden animate-on-scroll">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 text-2xl group-hover:bg-(--primary-red) group-hover:text-white transition-colors duration-300">
                  <i className={`${item.icon} ${item.color} group-hover:text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-(--primary-dark) mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ELIGIBILITY GUIDE SECTION */}
      <section className="py-20 px-6 bg-(--bg-light)" id="eligibility">
        <div className="container-custom">
          <h2 className="section-title">Who Is Eligible for PLI & RPLI?</h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16 text-sm md:text-base">
            Postal Life Insurance serves public sector personnel & professionals, while Rural PLI is open to all rural area residents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Government & Defense',
                icon: 'ri-building-2-line',
                schemeTag: 'PLI Eligible',
                items: [
                  'Central & State Govt Staff',
                  'Defense & Paramilitary Forces',
                  'Public Sector Undertakings (PSUs)',
                  'Reserve Bank & Nationalized Banks',
                ],
              },
              {
                title: 'Education & Institutions',
                icon: 'ri-book-open-line',
                schemeTag: 'PLI Eligible',
                items: [
                  'Govt. & Govt-Aided Schools',
                  'Central & State Universities',
                  'AICTE / CBSE / NAAC Institutions',
                  'Recognized Private School Staff',
                ],
              },
              {
                title: 'Corporate Professionals',
                icon: 'ri-briefcase-4-line',
                schemeTag: 'PLI Eligible',
                items: [
                  'Doctors, Engineers & CAs',
                  'Lawyers & Architects',
                  'NSE / BSE Listed Companies',
                  'IT & Banking Professionals',
                ],
              },
              {
                title: 'Rural Residents & Farmers',
                icon: 'ri-plant-line',
                schemeTag: 'RPLI Eligible',
                items: [
                  'Rural Residents & Panchayats',
                  'Farmers & Agricultural Workers',
                  'Rural Artisans & Craftsmen',
                  'Rural Small Business Owners',
                ],
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/70 animate-on-scroll hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <i className={`${category.icon} text-2xl text-(--primary-red)`}></i>
                  <span className="text-[0.65rem] font-extrabold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full">
                    {category.schemeTag}
                  </span>
                </div>
                <h4 className="text-(--primary-dark) font-bold text-base mb-4">
                  {category.title}
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ri-check-line text-emerald-600 font-bold shrink-0 mt-0.5"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ALL 12 PRODUCTS SECTION (PLI + RPLI) */}
      <section className="py-20 md:py-24 px-6 bg-white" id="products">
        <div className="container-custom">
          <h2 className="section-title">Complete 12-Product Insurance Suite</h2>

          {/* PLI Product Suite */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-2xl font-bold text-(--primary-dark) flex items-center gap-2">
                  <i className="ri-building-line text-(--primary-red)"></i> Postal Life Insurance (PLI)
                </h3>
                <p className="text-xs text-slate-500 mt-1">For Govt, PSU, Defense, Educational Staff & Professionals | Max SA ₹50 Lakhs</p>
              </div>
              <Link href="/calculator?scheme=pli" className="text-xs font-bold text-(--primary-red) hover:underline">
                Open PLI Calculator →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Suraksha', sub: 'Whole Life Assurance', slug: 'suraksha', scheme: 'pli', bonus: '₹76/₹1k', color: 'from-blue-600 to-blue-800', desc: 'Cover up to age 80 with highest bonus rate.' },
                { title: 'Santosh', sub: 'Endowment Assurance', slug: 'santosh', scheme: 'pli', bonus: '₹52/₹1k', color: 'from-green-600 to-green-800', desc: 'Matures at ages 35, 40, 45, 50, 55, 58, 60.' },
                { title: 'Suvidha', sub: 'Convertible Whole Life', slug: 'suvidha', scheme: 'pli', bonus: '₹76/₹1k', color: 'from-purple-600 to-purple-800', desc: 'Convertible to Endowment after 5 years.' },
                { title: 'Sumangal', sub: 'Anticipated Endowment', slug: 'sumangal', scheme: 'pli', bonus: '₹48/₹1k', color: 'from-orange-500 to-red-600', desc: 'Periodic money back schedule (60% SA periodic).' },
                { title: 'Yugal Suraksha', sub: 'Joint Life Assurance', slug: 'yugal-suraksha', scheme: 'pli', bonus: '₹52/₹1k', color: 'from-pink-600 to-rose-700', desc: 'Joint cover for policyholder and spouse.' },
                { title: 'Bal Jeevan Bima', sub: 'Children Policy', slug: 'bal-jeevan-bima', scheme: 'pli', bonus: '₹52/₹1k', color: 'from-teal-500 to-cyan-700', desc: 'Child cover with 100% Premium Waiver on parent death.' },
              ].map((prod, idx) => (
                <div key={idx} className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className={`h-2 bg-linear-to-r ${prod.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-(--primary-dark)">{prod.title}</h4>
                      <span className="text-[0.65rem] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Bonus {prod.bonus}
                      </span>
                    </div>
                    <p className="text-xs text-(--primary-red) font-semibold uppercase tracking-wide mb-3">{prod.sub}</p>
                    <p className="text-xs text-slate-600 mb-5 leading-relaxed">{prod.desc}</p>
                    <Link href={`/calculator?scheme=${prod.scheme}&policy=${prod.slug}`} className="inline-flex items-center text-xs font-bold text-(--primary-red) hover:underline">
                      Calculate Premium <i className="ri-arrow-right-line ml-1.5 transform group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RPLI Product Suite */}
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-2xl font-bold text-emerald-950 flex items-center gap-2">
                  <i className="ri-plant-line text-emerald-600"></i> Rural Postal Life Insurance (RPLI)
                </h3>
                <p className="text-xs text-slate-500 mt-1">For Rural Residents, Farmers, Artisans & Small Business Owners | Max SA ₹10 Lakhs</p>
              </div>
              <Link href="/calculator?scheme=rpli" className="text-xs font-bold text-emerald-700 hover:underline">
                Open RPLI Calculator →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Gram Suraksha', sub: 'RPLI Whole Life Assurance', slug: 'gram-suraksha', scheme: 'rpli', bonus: '₹60/₹1k', color: 'from-emerald-600 to-teal-800', desc: 'RPLI Whole Life assurance up to age 80.' },
                { title: 'Gram Suvidha', sub: 'RPLI Convertible Whole Life', slug: 'gram-suvidha', scheme: 'rpli', bonus: '₹60/₹1k', color: 'from-purple-600 to-indigo-800', desc: 'Convertible to Gram Santosh after 5 years.' },
                { title: 'Gram Santosh', sub: 'RPLI Endowment Assurance', slug: 'gram-santosh', scheme: 'rpli', bonus: '₹48/₹1k', color: 'from-amber-600 to-yellow-700', desc: 'Endowment plan with 7 preset maturity age options.' },
                { title: 'Gram Priya', sub: '10-Yr Short Term Money Back', slug: 'gram-priya', scheme: 'rpli', bonus: '₹45/₹1k', color: 'from-rose-500 to-red-700', desc: 'Fixed 10-Yr Money Back with Natural Calamity relief feature.' },
                { title: 'Gram Sumangal', sub: 'RPLI Anticipated Endowment', slug: 'gram-sumangal', scheme: 'rpli', bonus: '₹45/₹1k', color: 'from-orange-500 to-amber-700', desc: 'RPLI Money Back policy (15 or 20 year terms).' },
                { title: 'Bal Jeevan Bima', sub: 'RPLI Children Policy', slug: 'bal-jeevan-bima', scheme: 'rpli', bonus: '₹48/₹1k', color: 'from-teal-500 to-cyan-700', desc: 'Child cover up to ₹1 Lakh with Parent Death Premium Waiver.' },
              ].map((prod, idx) => (
                <div key={idx} className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className={`h-2 bg-linear-to-r ${prod.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-emerald-950">{prod.title}</h4>
                      <span className="text-[0.65rem] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Bonus {prod.bonus}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide mb-3">{prod.sub}</p>
                    <p className="text-xs text-slate-600 mb-5 leading-relaxed">{prod.desc}</p>
                    <Link href={`/calculator?scheme=${prod.scheme}&policy=${prod.slug}`} className="inline-flex items-center text-xs font-bold text-emerald-700 hover:underline">
                      Calculate RPLI Premium <i className="ri-arrow-right-line ml-1.5 transform group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. OFFICIAL BONUS RATES COMPARISON TABLE */}
      <section className="py-20 px-6 bg-(--bg-light)" id="rates">
        <div className="container-custom">
          <h2 className="section-title">Official Declared Bonus Rates</h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 text-sm">
            Comparison of official declared bonus rates per ₹1,000 Sum Assured per annum across PLI and RPLI policies.
          </p>

          <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-3xl shadow-lg border border-slate-200 animate-on-scroll">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-(--primary-dark) text-white">
                  <th className="p-4 md:p-5 font-semibold">Policy Name</th>
                  <th className="p-4 md:p-5 font-semibold">Scheme</th>
                  <th className="p-4 md:p-5 font-semibold text-right">Bonus Rate per ₹1,000 SA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {[
                  { name: 'Suraksha (Whole Life Assurance)', scheme: 'PLI', rate: '₹76 / Year' },
                  { name: 'Suvidha (Convertible Whole Life - Unconverted)', scheme: 'PLI', rate: '₹76 / Year' },
                  { name: 'Gram Suraksha (RPLI Whole Life)', scheme: 'RPLI', rate: '₹60 / Year' },
                  { name: 'Gram Suvidha (RPLI Convertible - Unconverted)', scheme: 'RPLI', rate: '₹60 / Year' },
                  { name: 'Santosh (Endowment Assurance)', scheme: 'PLI', rate: '₹52 / Year' },
                  { name: 'Yugal Suraksha (Joint Life Assurance)', scheme: 'PLI', rate: '₹52 / Year' },
                  { name: 'Bal Jeevan Bima (PLI Children Policy)', scheme: 'PLI', rate: '₹52 / Year' },
                  { name: 'Sumangal (Anticipated Endowment)', scheme: 'PLI', rate: '₹48 / Year' },
                  { name: 'Gram Santosh (RPLI Endowment)', scheme: 'RPLI', rate: '₹48 / Year' },
                  { name: 'Gram Bal Jeevan Bima (RPLI Children Policy)', scheme: 'RPLI', rate: '₹48 / Year' },
                  { name: 'Gram Priya (10-Yr Rural Money Back)', scheme: 'RPLI', rate: '₹45 / Year' },
                  { name: 'Gram Sumangal (RPLI Anticipated Endowment)', scheme: 'RPLI', rate: '₹45 / Year' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 md:p-5 font-bold">{row.name}</td>
                    <td className="p-4 md:p-5">
                      <span className={`px-2 py-0.5 rounded text-[0.7rem] font-bold ${
                        row.scheme === 'PLI' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {row.scheme}
                      </span>
                    </td>
                    <td className="p-4 md:p-5 text-right font-extrabold text-(--primary-red)">
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. GOOGLE BUSINESS PROFILE & LIVE LOCATION MAP SECTION */}
      <section className="py-20 md:py-24 px-6 bg-white border-t border-slate-200" id="google-business">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50 text-(--primary-red) px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <i className="ri-map-pin-user-line text-sm"></i> Official Google Business Profile
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-(--primary-dark)">
              Visit Our Authorized Business Portal
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2">
              Connect directly with our authorized Postal Life Insurance advisory location on Google Maps for in-person consultation, policy servicing, and documentation assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Google Business Profile Information Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 rounded-3xl shadow-xl space-y-6 border border-slate-700">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-(--primary-red) flex items-center justify-center text-white text-2xl shadow-md">
                      <i className="ri-google-fill"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">PLI & RPLI Business Portal</h3>
                      <p className="text-xs text-(--accent-gold) font-medium">Verified Google Business Profile</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <i className="ri-map-pin-2-fill text-(--accent-gold) text-lg shrink-0 mt-0.5"></i>
                    <div>
                      <strong className="text-white block">Official Address:</strong>
                      <span>Directorate of Postal Life Insurance, Chanakyapuri, New Delhi - 110021</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <i className="ri-time-fill text-(--accent-gold) text-lg shrink-0 mt-0.5"></i>
                    <div>
                      <strong className="text-white block">Business Operating Hours:</strong>
                      <span>Monday – Saturday: 09:00 AM – 06:00 PM (IST)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <i className="ri-phone-fill text-(--accent-gold) text-lg shrink-0 mt-0.5"></i>
                    <div>
                      <strong className="text-white block">Toll-Free National Helpline:</strong>
                      <a href="tel:18002666868" className="text-white hover:text-(--accent-gold) font-bold">1800 266 6868</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <i className="ri-mail-send-fill text-(--accent-gold) text-lg shrink-0 mt-0.5"></i>
                    <div>
                      <strong className="text-white block">Official Email:</strong>
                      <a href="mailto:pli@indiapost.gov.in" className="text-slate-200 hover:underline">pli@indiapost.gov.in</a>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons for Google Business Link */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://share.google/NHDWnZ0xIYZgnilIi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-(--primary-red) hover:bg-red-700 text-white font-bold rounded-xl text-center text-xs transition-colors flex items-center justify-center gap-2 shadow-md">
                    <i className="ri-google-line text-base"></i> Open Google Business Profile
                  </a>
                  <a
                    href="https://share.google/NHDWnZ0xIYZgnilIi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-center text-xs transition-colors flex items-center justify-center gap-2 border border-white/20">
                    <i className="ri-direction-line text-base"></i> Get Live Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Live Interactive Google Map Frame */}
            <div className="lg:col-span-7">
              <div className="bg-white p-3 rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative group">
                <div className="w-full h-112 rounded-2xl overflow-hidden relative">
                  <iframe
                    title="Postal Life Insurance Google Business Profile Map Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.27581177651!2d77.1895696763435!3d28.591500375686008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d644d67362f%3A0xc47e307dbdd1752b!2sChanakyapuri%2C%20New%20Delhi%2C%20Delhi%20110021!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full rounded-2xl"></iframe>
                </div>

                <div className="p-4 bg-slate-50 rounded-b-2xl flex items-center justify-between text-xs text-slate-700">
                  <span className="font-semibold flex items-center gap-1.5">
                    <i className="ri-checkbox-circle-fill text-emerald-600"></i> Live Interactive Location Map
                  </span>
                  <a
                    href="https://share.google/NHDWnZ0xIYZgnilIi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-(--primary-red) hover:underline flex items-center gap-1">
                    View on Google Business Profile <i className="ri-external-link-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className="py-24 px-6 bg-(--primary-red) text-white text-center" id="contact">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Secure Your Family&apos;s Financial Future Today
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-light">
            Join millions of satisfied policyholders who trust Postal Life Insurance and Rural Postal Life Insurance for guaranteed security, highest returns, and zero GST premiums.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="bg-white text-(--primary-red) py-4 px-10 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Calculate Instant Quote
            </Link>
            <a
              href="https://share.google/NHDWnZ0xIYZgnilIi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <i className="ri-google-line text-xl"></i> Google Business Profile
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
