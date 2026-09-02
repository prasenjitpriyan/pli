'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { PliEmblemSvg } from '../common/PliLogo';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

const PLI_PRODUCTS = [
  {
    title: 'Suraksha',
    sub: 'Whole Life Assurance',
    slug: 'suraksha',
    scheme: 'pli',
    bonus: '₹76/₹1k',
    color: 'from-blue-600 to-blue-800',
    desc: 'Cover up to age 80 with highest declared simple reversionary bonus in India.',
    tag: 'Highest Bonus',
  },
  {
    title: 'Santosh',
    sub: 'Endowment Assurance',
    slug: 'santosh',
    scheme: 'pli',
    bonus: '₹52/₹1k',
    color: 'from-green-600 to-green-800',
    desc: 'Matures at ages 35, 40, 45, 50, 55, 58, 60 with guaranteed returns.',
    tag: 'Most Popular',
  },
  {
    title: 'Suvidha',
    sub: 'Convertible Whole Life',
    slug: 'suvidha',
    scheme: 'pli',
    bonus: '₹76/₹1k',
    color: 'from-purple-600 to-purple-800',
    desc: 'Convertible to Endowment Assurance at end of 5 years.',
    tag: 'Flexible Option',
  },
  {
    title: 'Sumangal',
    sub: 'Anticipated Endowment',
    slug: 'sumangal',
    scheme: 'pli',
    bonus: '₹48/₹1k',
    color: 'from-orange-500 to-red-600',
    desc: 'Periodic survival money back payouts (60% SA periodic).',
    tag: 'Periodic Cashflow',
  },
  {
    title: 'Yugal Suraksha',
    sub: 'Joint Life Assurance',
    slug: 'yugal-suraksha',
    scheme: 'pli',
    bonus: '₹52/₹1k',
    color: 'from-pink-600 to-rose-700',
    desc: 'Joint life coverage for policyholder and spouse under a single premium.',
    tag: 'Couple Coverage',
  },
  {
    title: 'Bal Jeevan Bima',
    sub: 'Children Policy',
    slug: 'bal-jeevan-bima',
    scheme: 'pli',
    bonus: '₹52/₹1k',
    color: 'from-teal-500 to-cyan-700',
    desc: 'Child cover with 100% Premium Waiver on parent demise.',
    tag: 'Child Education',
  },
];

const RPLI_PRODUCTS = [
  {
    title: 'Gram Suraksha',
    sub: 'RPLI Whole Life Assurance',
    slug: 'gram-suraksha',
    scheme: 'rpli',
    bonus: '₹60/₹1k',
    color: 'from-emerald-600 to-teal-800',
    desc: 'RPLI Whole Life assurance up to age 80 with sovereign safety.',
    tag: 'Max Bonus RPLI',
  },
  {
    title: 'Gram Suvidha',
    sub: 'RPLI Convertible Whole Life',
    slug: 'gram-suvidha',
    scheme: 'rpli',
    bonus: '₹60/₹1k',
    color: 'from-purple-600 to-indigo-800',
    desc: 'Convertible to Gram Santosh after 5 continuous years.',
    tag: 'Convertible Plan',
  },
  {
    title: 'Gram Santosh',
    sub: 'RPLI Endowment Assurance',
    slug: 'gram-santosh',
    scheme: 'rpli',
    bonus: '₹48/₹1k',
    color: 'from-amber-600 to-yellow-700',
    desc: 'Endowment plan with 7 preset maturity age choices.',
    tag: 'Guaranteed Return',
  },
  {
    title: 'Gram Priya',
    sub: '10-Yr Short Term Money Back',
    slug: 'gram-priya',
    scheme: 'rpli',
    bonus: '₹45/₹1k',
    color: 'from-rose-500 to-red-700',
    desc: 'Fixed 10-Yr Money Back with Natural Calamity premium relief.',
    tag: '10-Yr Money Back',
  },
  {
    title: 'Gram Sumangal',
    sub: 'RPLI Anticipated Endowment',
    slug: 'gram-sumangal',
    scheme: 'rpli',
    bonus: '₹45/₹1k',
    color: 'from-orange-500 to-amber-700',
    desc: 'RPLI periodic survival benefit policy with 15 or 20 year terms.',
    tag: 'Periodic Payouts',
  },
  {
    title: 'Bal Jeevan Bima',
    sub: 'RPLI Children Policy',
    slug: 'bal-jeevan-bima',
    scheme: 'rpli',
    bonus: '₹48/₹1k',
    color: 'from-teal-500 to-cyan-700',
    desc: 'Child cover up to ₹1 Lakh with Parent Death Premium Waiver.',
    tag: 'RPLI Child Plan',
  },
];

export function ProductsShowcaseSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'pli' | 'rpli'>('all');

  const filteredPli = activeTab === 'all' || activeTab === 'pli' ? PLI_PRODUCTS : [];
  const filteredRpli = activeTab === 'all' || activeTab === 'rpli' ? RPLI_PRODUCTS : [];

  return (
    <section className="py-20 md:py-24 px-6 bg-white overflow-hidden" id="products">
      <div className="container-custom">
        {/* Section Heading with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-(--primary-red) uppercase tracking-wider mb-3">
            <i className="ri-shield-star-fill text-amber-500"></i> Government Sovereign Insurance
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-(--primary-dark) tracking-tight">
            Complete 12-Product Insurance Suite
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Explore official government-backed life insurance schemes tailored for government employees, defense personnel, professionals, and rural citizens.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="flex justify-center gap-2 mt-6 p-1.5 bg-slate-100 rounded-full max-w-md mx-auto border border-slate-200">
            {(['all', 'pli', 'rpli'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer z-10 ${
                  activeTab === tab ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                }`}>
                {activeTab === tab && (
                  <motion.div
                    layoutId="productTabActive"
                    className="absolute inset-0 bg-(--primary-red) rounded-full shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                {tab === 'all' ? 'All 12 Plans' : tab === 'pli' ? 'PLI (Govt/Urban)' : 'RPLI (Rural Life)'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* PLI Product Suite */}
        <AnimatePresence mode="wait">
          {filteredPli.length > 0 && (
            <motion.div
              key="pli-suite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-16">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-1 rounded-xl bg-slate-50 border border-slate-200 shadow-xs shrink-0 flex items-center justify-center">
                    <PliEmblemSvg variant="pli" className="w-10 h-11" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-(--primary-dark) flex items-center gap-2">
                      Postal Life Insurance (PLI)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      For Govt, PSU, Defense, Educational Staff & Professionals | Max SA ₹50 Lakhs
                    </p>
                  </div>
                </div>
                <Link
                  href="/calculator?scheme=pli"
                  className="text-xs font-bold text-(--primary-red) hover:underline flex items-center gap-1 group">
                  <span>Open PLI Calculator</span>
                  <i className="ri-arrow-right-line transform group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPli.map((prod, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariant}
                    whileHover={{ y: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                    <div>
                      <div className={`h-2 bg-linear-to-r ${prod.color}`}></div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-(--primary-dark)">{prod.title}</h4>
                          <span className="text-[0.65rem] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            Bonus {prod.bonus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs text-(--primary-red) font-semibold uppercase tracking-wide">
                            {prod.sub}
                          </p>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                            {prod.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{prod.desc}</p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2 border-t border-slate-50">
                      <Link
                        href={`/calculator?scheme=${prod.scheme}&policy=${prod.slug}`}
                        className="inline-flex items-center text-xs font-bold text-(--primary-red) hover:underline">
                        Calculate Premium{' '}
                        <i className="ri-arrow-right-line ml-1.5 transform group-hover:translate-x-1 transition-transform"></i>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RPLI Product Suite */}
        <AnimatePresence mode="wait">
          {filteredRpli.length > 0 && (
            <motion.div
              key="rpli-suite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-1 rounded-xl bg-slate-50 border border-slate-200 shadow-xs shrink-0 flex items-center justify-center">
                    <PliEmblemSvg variant="rpli" className="w-10 h-11" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-emerald-950 flex items-center gap-2">
                      Rural Postal Life Insurance (RPLI)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      For Rural Residents, Farmers, Artisans & Small Business Owners | Max SA ₹10 Lakhs
                    </p>
                  </div>
                </div>
                <Link
                  href="/calculator?scheme=rpli"
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 group">
                  <span>Open RPLI Calculator</span>
                  <i className="ri-arrow-right-line transform group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRpli.map((prod, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUpVariant}
                    whileHover={{ y: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                    <div>
                      <div className={`h-2 bg-linear-to-r ${prod.color}`}></div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-emerald-950">{prod.title}</h4>
                          <span className="text-[0.65rem] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            Bonus {prod.bonus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">
                            {prod.sub}
                          </p>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                            {prod.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{prod.desc}</p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2 border-t border-slate-50">
                      <Link
                        href={`/calculator?scheme=${prod.scheme}&policy=${prod.slug}`}
                        className="inline-flex items-center text-xs font-bold text-emerald-700 hover:underline">
                        Calculate RPLI Premium{' '}
                        <i className="ri-arrow-right-line ml-1.5 transform group-hover:translate-x-1 transition-transform"></i>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
