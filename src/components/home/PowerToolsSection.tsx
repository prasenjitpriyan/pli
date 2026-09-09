'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

const TOOLS = [
  {
    title: 'Instant Actuarial Calculator',
    badge: 'Core Engine',
    badgeColor: 'bg-red-100 text-red-900',
    description:
      'Official Department of Posts rate tables, rebate matrices for Sum Assured ≥ ₹1 Lakh, and 0% GST calculation.',
    icon: 'ri-calculator-line',
    iconBg: 'bg-red-50 text-(--primary-red)',
    href: '/calculator',
    ctaText: 'Launch Calculator',
    borderColor: 'hover:border-red-400',
  },
  {
    title: 'Policy Comparison Matrix',
    badge: 'New Tool',
    badgeColor: 'bg-blue-100 text-blue-900',
    description:
      'Compare 2 or 3 policies side-by-side across net premiums, accumulated bonuses, ROI, and loan eligibility.',
    icon: 'ri-scales-3-line',
    iconBg: 'bg-blue-50 text-blue-700',
    href: '/compare',
    ctaText: 'Compare Schemes',
    borderColor: 'hover:border-blue-400',
  },
  {
    title: 'Goal & Retirement Planner',
    badge: 'Reverse Solver',
    badgeColor: 'bg-amber-100 text-amber-900',
    description:
      'Input a target corpus or monthly budget; our reverse-actuarial solver plans the optimal PLI/RPLI portfolio.',
    icon: 'ri-compass-3-line',
    iconBg: 'bg-amber-50 text-amber-700',
    href: '/goal-planner',
    ctaText: 'Plan Your Goal',
    borderColor: 'hover:border-amber-400',
  },
  {
    title: 'Loan & Surrender Forecaster',
    badge: 'Policy Servicing',
    badgeColor: 'bg-emerald-100 text-emerald-900',
    description:
      'Check loan quantum at India Post’s 10% interest rate, paid-up maturity value, and surrender penalty warnings.',
    icon: 'ri-bank-card-line',
    iconBg: 'bg-emerald-50 text-emerald-700',
    href: '/policy-servicing',
    ctaText: 'Check Loan & Value',
    borderColor: 'hover:border-emerald-400',
  },
];

export function PowerToolsSection() {
  return (
    <section className="py-14 bg-white border-y border-slate-200/80">
      <div className="container-custom px-4 sm:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-900 rounded-full text-xs font-bold uppercase tracking-wider">
            Actuarial Suite & Decision Matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dedicated Tools for Policyholders & Field Advisors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            From calculating initial quotations to comparing policy structures and forecasting loan eligibility, explore our full actuarial suite.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool, idx) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className={`bg-slate-50/60 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between transition-all hover:shadow-lg ${tool.borderColor} group`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${tool.iconBg} flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform`}>
                    <i className={tool.icon}></i>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-(--primary-red) transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60">
                <Link
                  href={tool.href}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 group-hover:bg-(--primary-red) group-hover:text-white group-hover:border-red-700 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs">
                  <span>{tool.ctaText}</span>
                  <i className="ri-arrow-right-line text-sm"></i>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
