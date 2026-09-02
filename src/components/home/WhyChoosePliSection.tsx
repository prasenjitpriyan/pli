'use client';

import { motion } from 'motion/react';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

const ADVANTAGES = [
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
];

export function WhyChoosePliSection() {
  return (
    <section className="py-20 px-6 bg-white overflow-hidden" id="why">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
            <i className="ri-medal-fill text-amber-500"></i> India Post Heritage Since 1884
          </div>
          <h2 className="section-title">The Unmatched PLI & RPLI Advantage</h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Discover why millions of government officers, defense personnel, and rural citizens trust
            PLI & RPLI for life cover and long-term wealth creation.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ADVANTAGES.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="group p-8 rounded-3xl bg-(--bg-light) border border-slate-100 hover:border-(--accent-gold) hover:bg-white transition-colors duration-300 shadow-xs hover:shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6 text-2xl group-hover:bg-(--primary-red) group-hover:text-white transition-colors duration-300">
                  <i className={`${item.icon} ${item.color} group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="text-xl font-bold text-(--primary-dark) mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
