'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import PageTransition from '@/components/common/PageTransition';
import AnimatedCounter from '@/components/common/AnimatedCounter';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

export default function BonusRatesPage() {
  const [demoSA, setDemoSA] = useState(1000000); // 10 Lakhs default
  const [demoYears, setDemoYears] = useState(20);

  const calculatedPliWlBonus = (demoSA / 1000) * 76 * demoYears;
  const calculatedPliEaBonus = (demoSA / 1000) * 52 * demoYears;
  const calculatedRpliWlBonus = (demoSA / 1000) * 65 * demoYears;
  const calculatedRpliEaBonus = (demoSA / 1000) * 50 * demoYears;

  return (
    <PageTransition className="min-h-screen bg-(--bg-light) pb-24">
      {/* Hero Header with Motion */}
      <section className="bg-linear-to-r from-(--primary-dark) via-[#242f42] to-(--primary-dark) text-white py-16 px-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="container-custom text-center max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-(--accent-gold) text-xs font-bold uppercase tracking-wider border border-white/10">
            <i className="ri-award-fill"></i>
            India&apos;s Highest Declared Insurance Bonus
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Official Declared Bonus Rates
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Postal Life Insurance offers unparalleled bonus returns backed by the Sovereign Guarantee of the Government of India with 0% GST deductions.
          </p>
        </motion.div>
      </section>

      {/* Bonus Rates Master Cards */}
      <section className="container-custom py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* PLI Rates Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="px-3 py-1 rounded-full bg-(--primary-red)/10 text-(--primary-red) text-xs font-bold uppercase tracking-wider">
                  Urban / Salaried / Professionals
                </span>
                <h2 className="text-2xl font-black text-(--primary-dark) mt-2">
                  Postal Life Insurance (PLI)
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-(--primary-red) text-white flex items-center justify-center text-2xl shadow-md">
                <i className="ri-building-2-line"></i>
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3">
              {[
                {
                  scheme: 'Whole Life Assurance (Suraksha / Suvidha)',
                  bonus: 76,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Highest Bonus in India',
                  color: 'text-(--primary-red)',
                  bgColor: 'bg-rose-50',
                },
                {
                  scheme: 'Endowment Assurance (Santosh)',
                  bonus: 52,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Most Popular',
                  color: 'text-(--accent-gold)',
                  bgColor: 'bg-amber-50',
                },
                {
                  scheme: 'Anticipated Endowment / Money Back (Sumangal)',
                  bonus: 48,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Periodic Cashbacks',
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50',
                },
                {
                  scheme: 'Joint Life Assurance (Yugal Suraksha)',
                  bonus: 52,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Husband & Wife',
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-50',
                },
                {
                  scheme: 'Children Policy (Bal Jeevan Bima)',
                  bonus: 52,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Future Premium Waiver',
                  color: 'text-emerald-600',
                  bgColor: 'bg-emerald-50',
                },
              ].map((row) => (
                <motion.div
                  key={row.scheme}
                  variants={fadeUpVariant}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 transition-all">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {row.tag}
                    </span>
                    <h3 className="text-sm font-bold text-(--primary-dark)">
                      {row.scheme}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-xl font-black ${row.color}`}>
                      ₹{row.bonus}
                    </div>
                    <div className="text-[10px] text-slate-500">{row.unit}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RPLI Rates Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  Rural Citizens / Universal
                </span>
                <h2 className="text-2xl font-black text-(--primary-dark) mt-2">
                  Rural Postal Life Insurance (RPLI)
                </h2>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-md">
                <i className="ri-landscape-line"></i>
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3">
              {[
                {
                  scheme: 'Gram Suraksha (Rural Whole Life)',
                  bonus: 65,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Top Rural Bonus',
                  color: 'text-emerald-700',
                  bgColor: 'bg-emerald-50',
                },
                {
                  scheme: 'Gram Santosh (Rural Endowment)',
                  bonus: 50,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Fixed Term Savings',
                  color: 'text-(--accent-gold)',
                  bgColor: 'bg-amber-50',
                },
                {
                  scheme: 'Gram Suvidha (Rural Convertible Whole Life)',
                  bonus: 65,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Convertible at Year 5',
                  color: 'text-teal-600',
                  bgColor: 'bg-teal-50',
                },
                {
                  scheme: 'Gram Sumangal (Rural Money Back)',
                  bonus: 45,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Survival Cashbacks',
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50',
                },
                {
                  scheme: 'Gram Priya (10-Year Rural Policy)',
                  bonus: 45,
                  unit: 'per ₹1,000 SA / Year',
                  tag: 'Short 10-Year Term',
                  color: 'text-indigo-600',
                  bgColor: 'bg-indigo-50',
                },
              ].map((row) => (
                <motion.div
                  key={row.scheme}
                  variants={fadeUpVariant}
                  whileHover={{ scale: 1.01, x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 transition-all">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {row.tag}
                    </span>
                    <h3 className="text-sm font-bold text-(--primary-dark)">
                      {row.scheme}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-xl font-black ${row.color}`}>
                      ₹{row.bonus}
                    </div>
                    <div className="text-[10px] text-slate-500">{row.unit}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Bonus Growth Estimator */}
      <section className="container-custom py-8 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-linear-to-br from-(--primary-dark) to-[#2d3748] rounded-3xl p-8 md:p-12 text-white shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Interactive Bonus Growth Estimator
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              See how declared simple reversionary bonuses accumulate across your policy tenure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Slider 1: Sum Assured */}
            <div className="bg-white/10 p-6 rounded-2xl border border-white/15 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-200">Sum Assured</span>
                <span className="text-lg font-black text-(--accent-gold)">
                  <AnimatedCounter value={demoSA} prefix="₹" formatIndian duration={0.4} />
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={demoSA}
                onChange={(e) => setDemoSA(Number(e.target.value))}
                className="w-full accent-(--accent-gold) cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>₹1 Lakh</span>
                <span>₹50 Lakhs</span>
              </div>
            </div>

            {/* Slider 2: Duration */}
            <div className="bg-white/10 p-6 rounded-2xl border border-white/15 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-200">Policy Term</span>
                <span className="text-lg font-black text-(--accent-gold)">
                  {demoYears} Years
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={demoYears}
                onChange={(e) => setDemoYears(Number(e.target.value))}
                className="w-full accent-(--accent-gold) cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>5 Years</span>
                <span>35 Years</span>
              </div>
            </div>
          </div>

          {/* Results Comparison Grid with Live Animated Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white/10 p-5 rounded-2xl border border-white/15 text-center space-y-1">
              <span className="text-[11px] font-semibold text-slate-300">PLI Whole Life (@ ₹76)</span>
              <div className="text-xl font-black text-(--accent-gold)">
                <AnimatedCounter value={calculatedPliWlBonus} prefix="₹" formatIndian duration={0.6} />
              </div>
              <span className="text-[10px] text-slate-400">Bonus Accumulation</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white/10 p-5 rounded-2xl border border-white/15 text-center space-y-1">
              <span className="text-[11px] font-semibold text-slate-300">PLI Endowment (@ ₹52)</span>
              <div className="text-xl font-black text-emerald-400">
                <AnimatedCounter value={calculatedPliEaBonus} prefix="₹" formatIndian duration={0.6} />
              </div>
              <span className="text-[10px] text-slate-400">Bonus Accumulation</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white/10 p-5 rounded-2xl border border-white/15 text-center space-y-1">
              <span className="text-[11px] font-semibold text-slate-300">RPLI Whole Life (@ ₹65)</span>
              <div className="text-xl font-black text-amber-300">
                <AnimatedCounter value={calculatedRpliWlBonus} prefix="₹" formatIndian duration={0.6} />
              </div>
              <span className="text-[10px] text-slate-400">Bonus Accumulation</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white/10 p-5 rounded-2xl border border-white/15 text-center space-y-1">
              <span className="text-[11px] font-semibold text-slate-300">RPLI Endowment (@ ₹50)</span>
              <div className="text-xl font-black text-cyan-300">
                <AnimatedCounter value={calculatedRpliEaBonus} prefix="₹" formatIndian duration={0.6} />
              </div>
              <span className="text-[10px] text-slate-400">Bonus Accumulation</span>
            </motion.div>
          </div>

          <div className="text-center pt-2">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/calculator"
                className="btn-primary inline-flex items-center gap-2 shadow-xl">
                <i className="ri-calculator-line"></i>
                Calculate Full Actuarial Quote with Monthly Breakdown
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Comparison with Commercial Private Insurers */}
      <section className="container-custom py-12 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-(--primary-dark) text-center">
            How PLI Compares Against Commercial Private Insurers
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                  <th className="py-3 px-4">Feature / Parameter</th>
                  <th className="py-3 px-4 text-(--primary-red) bg-rose-50/50">Postal Life Insurance (PLI)</th>
                  <th className="py-3 px-4 text-slate-600">Commercial Private Insurers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-(--primary-dark)">Declared Bonus Rate</td>
                  <td className="py-3.5 px-4 font-black text-emerald-700 bg-rose-50/50">Up to ₹76 / ₹1,000 SA</td>
                  <td className="py-3.5 px-4 text-slate-600">Typically ₹32 - ₹46 / ₹1,000 SA</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-(--primary-dark)">GST on Premiums</td>
                  <td className="py-3.5 px-4 font-black text-emerald-700 bg-rose-50/50">0% GST (Completely Exempt)</td>
                  <td className="py-3.5 px-4 text-slate-600">Up to 18% GST Added to Premium</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-(--primary-dark)">Security / Guarantee</td>
                  <td className="py-3.5 px-4 font-black text-emerald-700 bg-rose-50/50">100% Sovereign Guarantee (Govt of India)</td>
                  <td className="py-3.5 px-4 text-slate-600">Commercial Solvency Reserves</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-(--primary-dark)">Tax Exemption (Maturity)</td>
                  <td className="py-3.5 px-4 font-black text-emerald-700 bg-rose-50/50">100% Tax Free under Sec 10(10D)</td>
                  <td className="py-3.5 px-4 text-slate-600">Subject to ₹5 Lakh annual cap</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-(--primary-dark)">Loan Interest Rates</td>
                  <td className="py-3.5 px-4 font-black text-emerald-700 bg-rose-50/50">10% p.a. (Half-Yearly)</td>
                  <td className="py-3.5 px-4 text-slate-600">10.5% - 14% p.a.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
