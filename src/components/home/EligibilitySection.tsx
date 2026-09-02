'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

const ELIGIBILITY_CATEGORIES = [
  {
    title: 'Graduates & Diploma Holders',
    icon: 'ri-graduation-cap-line',
    schemeTag: 'PLI (Rule 6(14))',
    items: [
      'All Central/State Recognized Graduates',
      'Govt-Recognized Technical Diploma Holders',
      'Polytechnic & Engineering Diplomas',
      'Post-Graduates & Doctorate Holders',
    ],
  },
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
    title: 'Institutions & Corporate',
    icon: 'ri-briefcase-4-line',
    schemeTag: 'PLI Eligible',
    items: [
      'Teachers & University Staff (Govt/Aided/Private)',
      'Doctors, Engineers, CAs & Lawyers',
      'NSE / BSE Listed Companies Staff',
      'IT, Banking & Autonomous Bodies',
    ],
  },
  {
    title: 'Rural & Bank Account Holders',
    icon: 'ri-plant-line',
    schemeTag: 'RPLI (2025 Expanded)',
    items: [
      'All Rural Residents & Panchayats',
      'Operative POSB Account Holders',
      'Operative Scheduled Bank Account Holders',
      'Farmers, Artisans & Rural Entrepreneurs',
    ],
  },
];

export function EligibilitySection() {
  return (
    <section className="py-20 px-6 bg-(--bg-light) overflow-hidden" id="eligibility">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-(--primary-red) uppercase tracking-wider mb-3">
            <i className="ri-user-follow-fill text-amber-500"></i> Statutory Eligibility Rules
          </div>
          <h2 className="section-title">Who Is Eligible for PLI & RPLI?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Postal Life Insurance serves public sector employees, professionals, and all recognized
            graduates/diploma holders, while Rural PLI is open to all rural residents and active savings account holders.
          </p>
        </motion.div>

        {/* Official Gazette & Directorate Notification Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* PLI Gazette Notification */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="p-6 rounded-3xl bg-linear-to-br from-red-500/10 via-amber-500/10 to-red-900/5 border border-red-900/20 shadow-sm space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-(--primary-red) text-white text-[0.62rem] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <i className="ri-government-fill"></i> PLI Gazette Notification
                </span>
                <span className="text-[0.68rem] font-bold text-slate-500">F. No. 25-01/2022-LI</span>
              </div>
              <h3 className="text-base font-black text-(--primary-dark)">
                Rule 6(14): All Recognized Graduates & Diploma Holders
              </h3>
              <p className="text-slate-700 text-xs leading-relaxed">
                Under Rule 3 of Post Office Life Insurance Rules (2011),{' '}
                <strong className="text-slate-900 font-bold">
                  &ldquo;All Graduates/Diploma holders from recognized Universities/Institutions&rdquo;
                </strong>{' '}
                are entitled to subscribe to Postal Life Insurance (PLI).
              </p>
            </div>
            <Link
              href="/calculator?scheme=pli"
              className="self-start mt-2 py-2 px-4 bg-(--primary-red) hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5">
              <span>Calculate PLI</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </motion.div>

          {/* RPLI 2025 Expansion Directive */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="p-6 rounded-3xl bg-linear-to-br from-emerald-500/10 via-blue-500/10 to-emerald-900/5 border border-emerald-900/20 shadow-sm space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-700 text-white text-[0.62rem] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <i className="ri-bank-card-line"></i> RPLI 2025 Expansion Order
                </span>
                <span className="text-[0.68rem] font-bold text-slate-500">
                  OM No. 29-26/2024-LI (23.01.2025)
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900">
                Operative Savings Bank Account Holders Eligible for RPLI
              </h3>
              <p className="text-slate-700 text-xs leading-relaxed">
                In addition to rural residents,{' '}
                <strong className="text-slate-900 font-bold">
                  any person with an active, KYC-compliant Operative Savings Bank Account
                </strong>{' '}
                with Post Office Savings Bank (POSB) or any Scheduled Bank in India is eligible for
                RPLI.
              </p>
            </div>
            <Link
              href="/calculator?scheme=rpli"
              className="self-start mt-2 py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5">
              <span>Calculate RPLI</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </motion.div>
        </div>

        {/* 4 Eligibility Categories with Motion Stagger */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ELIGIBILITY_CATEGORIES.map((category, idx) => (
            <motion.div
              key={idx}
              variants={fadeUpVariant}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/70 hover:shadow-xl transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <i className={`${category.icon} text-2xl text-(--primary-red)`}></i>
                  <span className="text-[0.65rem] font-extrabold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full">
                    {category.schemeTag}
                  </span>
                </div>
                <h4 className="text-(--primary-dark) font-bold text-base mb-4">{category.title}</h4>
                <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="ri-check-line text-emerald-600 font-bold shrink-0 mt-0.5"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
