'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedCounter from '@/components/common/AnimatedCounter';

const BONUS_RATES_DATA = [
  { name: 'Suraksha (Whole Life Assurance)', scheme: 'PLI', rateVal: 76, rate: '₹76 / Year', maxBonus: true },
  {
    name: 'Suvidha (Convertible Whole Life - Unconverted)',
    scheme: 'PLI',
    rateVal: 76,
    rate: '₹76 / Year',
    maxBonus: true,
  },
  { name: 'Gram Suraksha (RPLI Whole Life)', scheme: 'RPLI', rateVal: 60, rate: '₹60 / Year', maxBonus: true },
  {
    name: 'Gram Suvidha (RPLI Convertible - Unconverted)',
    scheme: 'RPLI',
    rateVal: 60,
    rate: '₹60 / Year',
    maxBonus: true,
  },
  { name: 'Santosh (Endowment Assurance)', scheme: 'PLI', rateVal: 52, rate: '₹52 / Year' },
  {
    name: 'Yugal Suraksha (Joint Life Assurance)',
    scheme: 'PLI',
    rateVal: 52,
    rate: '₹52 / Year',
  },
  {
    name: 'Bal Jeevan Bima (PLI Children Policy)',
    scheme: 'PLI',
    rateVal: 52,
    rate: '₹52 / Year',
  },
  { name: 'Sumangal (Anticipated Endowment)', scheme: 'PLI', rateVal: 48, rate: '₹48 / Year' },
  { name: 'Gram Santosh (RPLI Endowment)', scheme: 'RPLI', rateVal: 48, rate: '₹48 / Year' },
  {
    name: 'Gram Bal Jeevan Bima (RPLI Children Policy)',
    scheme: 'RPLI',
    rateVal: 48,
    rate: '₹48 / Year',
  },
  {
    name: 'Gram Priya (10-Yr Rural Money Back)',
    scheme: 'RPLI',
    rateVal: 45,
    rate: '₹45 / Year',
  },
  {
    name: 'Gram Sumangal (RPLI Anticipated Endowment)',
    scheme: 'RPLI',
    rateVal: 45,
    rate: '₹45 / Year',
  },
];

export function BonusRatesSection() {
  const [filter, setFilter] = useState<'ALL' | 'PLI' | 'RPLI'>('ALL');

  const filteredData =
    filter === 'ALL'
      ? BONUS_RATES_DATA
      : BONUS_RATES_DATA.filter((item) => item.scheme === filter);

  return (
    <section className="py-20 px-6 bg-(--bg-light) overflow-hidden" id="rates">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
            <i className="ri-line-chart-fill text-emerald-600"></i> Financial Year Declared Returns
          </div>
          <h2 className="section-title">Official Declared Bonus Rates</h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Comparison of official declared bonus rates per ₹1,000 Sum Assured per annum across PLI
            and RPLI policies.
          </p>

          {/* Interactive Filter Tabs */}
          <div className="flex justify-center gap-2 mt-6 p-1.5 bg-slate-200/70 rounded-full max-w-xs mx-auto">
            {(['ALL', 'PLI', 'RPLI'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer z-10 ${
                  filter === tab ? 'text-white' : 'text-slate-700 hover:text-slate-950'
                }`}>
                {filter === tab && (
                  <motion.div
                    layoutId="bonusRateTabActive"
                    className="absolute inset-0 bg-(--primary-dark) rounded-full shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="max-w-4xl mx-auto overflow-hidden bg-white rounded-3xl shadow-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-(--primary-dark) text-white">
                  <th className="p-4 md:p-5 font-semibold">Policy Name</th>
                  <th className="p-4 md:p-5 font-semibold">Scheme</th>
                  <th className="p-4 md:p-5 font-semibold text-right">Bonus Rate per ₹1k SA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <AnimatePresence mode="popLayout">
                  {filteredData.map((row, i) => (
                    <motion.tr
                      key={row.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, delay: i * 0.02 }}
                      className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 md:p-5 font-bold flex flex-col gap-1">
                        <span className="flex items-center gap-2">
                          {row.name}
                          {row.maxBonus && (
                            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                              Peak Rate
                            </span>
                          )}
                        </span>
                        {/* Relative Bonus Progress Bar */}
                        <div className="w-full max-w-xs h-1.5 bg-slate-100 rounded-full overflow-hidden mt-0.5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(row.rateVal / 76) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.03 }}
                            className={`h-full rounded-full ${
                              row.scheme === 'PLI' ? 'bg-(--primary-red)' : 'bg-emerald-600'
                            }`}
                          />
                        </div>
                      </td>
                      <td className="p-4 md:p-5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[0.7rem] font-bold ${
                            row.scheme === 'PLI'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                          {row.scheme}
                        </span>
                      </td>
                      <td className="p-4 md:p-5 text-right font-extrabold text-(--primary-red) text-sm md:text-base">
                        <AnimatedCounter value={row.rateVal} prefix="₹" suffix=" / Yr" />
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
