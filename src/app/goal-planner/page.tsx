'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { solveGoalPlan, GoalType, TargetMode, formatINR } from '@/lib/insurance';
import { ProposalModal, ProposalModalProps } from '@/components/common/ProposalModal';

export default function GoalPlannerPage() {
  const [goalType, setGoalType] = useState<GoalType>('RETIREMENT');
  const [targetMode, setTargetMode] = useState<TargetMode>('CORPUS');
  const [targetCorpus, setTargetCorpus] = useState<number>(3000000); // ₹30 Lakhs
  const [monthlyBudget, setMonthlyBudget] = useState<number>(6000); // ₹6,000/mo
  const [currentAge, setCurrentAge] = useState<number>(32);
  const [horizonYears, setHorizonYears] = useState<number>(25);
  const [schemePreference, setSchemePreference] = useState<'PLI' | 'RPLI' | 'ANY'>('ANY');

  // Proposal modal state
  const [selectedPlanForProposal, setSelectedPlanForProposal] = useState<ProposalModalProps['proposalData'] | null>(null);

  const goalPresets: { type: GoalType; icon: string; title: string; defaultHorizon: number; desc: string }[] = [
    {
      type: 'RETIREMENT',
      icon: 'ri-umbrella-line',
      title: 'Retirement Corpus',
      defaultHorizon: 25,
      desc: 'Build a secure, tax-free retirement nest egg backed by the sovereign guarantee of Govt of India.',
    },
    {
      type: 'EDUCATION',
      icon: 'ri-graduation-cap-line',
      title: "Child's Higher Education",
      defaultHorizon: 15,
      desc: 'Lock in guaranteed funds for university admissions with zero market risk.',
    },
    {
      type: 'MARRIAGE',
      icon: 'ri-heart-3-line',
      title: "Child's Marriage Fund",
      defaultHorizon: 18,
      desc: 'Accumulate guaranteed wealth for life milestone celebrations.',
    },
    {
      type: 'WEALTH',
      icon: 'ri-bank-line',
      title: 'Wealth Accumulation',
      defaultHorizon: 20,
      desc: 'Maximize returns with high declared bonus rates (up to ₹76/₹1,000 SA) and 0% GST.',
    },
  ];

  const handleSelectGoal = (type: GoalType, defaultTerm: number) => {
    setGoalType(type);
    setHorizonYears(defaultTerm);
  };

  // Solve plan
  const planResult = useMemo(() => {
    return solveGoalPlan({
      goalType,
      targetMode,
      targetCorpus,
      monthlyBudget,
      currentAge,
      horizonYears,
      schemePreference,
    });
  }, [goalType, targetMode, targetCorpus, monthlyBudget, currentAge, horizonYears, schemePreference]);

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Breadcrumbs & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
            <i className="ri-compass-3-line text-sm"></i> Reverse Actuarial Goal Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Financial Goal & Retirement Planner
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Set your target maturity corpus or monthly budget. Our engine reverse-solves the optimal Postal Life Insurance portfolio for your life stage.
          </p>
        </div>

        {/* Goal Type Presets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {goalPresets.map((preset) => {
            const isSelected = goalType === preset.type;
            return (
              <button
                key={preset.type}
                type="button"
                onClick={() => handleSelectGoal(preset.type, preset.defaultHorizon)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-red-50/80 border-(--primary-red) ring-2 ring-red-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                      isSelected ? 'bg-(--primary-red) text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                    <i className={preset.icon}></i>
                  </div>
                  <span className="font-bold text-xs text-slate-900">{preset.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">{preset.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive Controls Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          {/* Target Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Planning Mode:</span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setTargetMode('CORPUS')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    targetMode === 'CORPUS'
                      ? 'bg-white text-(--primary-red) shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}>
                  🎯 Target Maturity Corpus
                </button>
                <button
                  type="button"
                  onClick={() => setTargetMode('BUDGET')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    targetMode === 'BUDGET'
                      ? 'bg-white text-(--primary-red) shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}>
                  💰 Monthly Savings Budget
                </button>
              </div>
            </div>

            {/* Scheme Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Scheme Eligibility:</span>
              <select
                value={schemePreference}
                onChange={(e) => setSchemePreference(e.target.value as 'PLI' | 'RPLI' | 'ANY')}
                className="text-xs font-bold p-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900">
                <option value="ANY">All Schemes (PLI & RPLI)</option>
                <option value="PLI">PLI Only (Govt / PSUs / Professionals)</option>
                <option value="RPLI">RPLI Only (Rural / All Citizens)</option>
              </select>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {targetMode === 'CORPUS' ? (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Target Maturity Corpus:{' '}
                  <span className="text-(--primary-red) font-extrabold">{formatINR(targetCorpus)}</span>
                </label>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="250000"
                  value={targetCorpus}
                  onChange={(e) => setTargetCorpus(Number(e.target.value))}
                  className="w-full accent-red-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>₹5 Lakhs</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1 Crore</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Monthly Savings Budget:{' '}
                  <span className="text-(--primary-red) font-extrabold">{formatINR(monthlyBudget)}/mo</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  step="500"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full accent-red-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>₹1,000</span>
                  <span>₹15,000</span>
                  <span>₹30,000</span>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Your Current Age: <span className="text-(--primary-red) font-extrabold">{currentAge} Years</span>
              </label>
              <input
                type="range"
                min="19"
                max="55"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full accent-red-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>19 Yrs</span>
                <span>35 Yrs</span>
                <span>55 Yrs</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Investment Horizon: <span className="text-(--primary-red) font-extrabold">{horizonYears} Years</span>{' '}
                (Maturity at Age {currentAge + horizonYears})
              </label>
              <input
                type="range"
                min="5"
                max="40"
                value={horizonYears}
                onChange={(e) => setHorizonYears(Number(e.target.value))}
                className="w-full accent-red-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>5 Yrs</span>
                <span>20 Yrs</span>
                <span>40 Yrs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Ranked Scheme Recommendations ({planResult.recommendations.length} Options)
            </h2>
            <span className="text-xs text-slate-500">
              Target Horizon: {horizonYears} Years | Maturity at Age {currentAge + horizonYears}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planResult.recommendations.map((plan, idx) => {
              const isPrimary = plan.category === 'WEALTH_MAXIMIZER';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className={`bg-white rounded-2xl border-2 flex flex-col justify-between shadow-md transition-all overflow-hidden ${
                    isPrimary ? 'border-amber-400 ring-2 ring-amber-300/30' : 'border-slate-200'
                  }`}>
                  {/* Card Header */}
                  <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        Rank #{plan.rank}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        {plan.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900">{plan.policyName}</h3>
                    <p className="text-[11px] text-slate-500 leading-snug">{plan.highlightNote}</p>
                  </div>

                  {/* Card Key Metrics */}
                  <div className="p-5 space-y-4 flex-1">
                    {/* Primary Highlight */}
                    <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        Recommended Sum Assured
                      </span>
                      <span className="text-2xl font-black text-slate-900">{formatINR(plan.recommendedSumAssured)}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Bonus: ₹{plan.bonusRate}/₹1,000 SA per year
                      </span>
                    </div>

                    <div className="space-y-2 text-xs divide-y divide-slate-100 text-slate-700">
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-slate-500 font-medium">Monthly Outflow</span>
                        <span className="font-extrabold text-(--primary-red) text-sm">
                          {formatINR(plan.netMonthlyPremium)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-slate-500 font-medium">Annual Outflow</span>
                        <span className="font-bold text-slate-800">{formatINR(plan.netAnnualPremium)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-slate-500 font-medium">Total Outflow ({horizonYears} Yrs)</span>
                        <span className="font-bold text-slate-800">{formatINR(plan.totalPremiumsPaid)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-slate-500 font-medium">Total Accrued Bonus</span>
                        <span className="font-bold text-emerald-700">+{formatINR(plan.totalBonusAccrued)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 bg-amber-50/70 p-2 rounded-lg">
                        <span className="font-bold text-amber-900">Estimated Maturity Benefit</span>
                        <span className="font-black text-amber-950 text-sm">
                          {formatINR(plan.estimatedMaturityAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5">
                        <span className="text-slate-500 font-medium">Annual 80C Tax Savings</span>
                        <span className="font-bold text-emerald-800">~{formatINR(plan.annualTaxSavings80C)}/yr</span>
                      </div>
                    </div>

                    {/* Milestones Preview */}
                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-[10px] border border-slate-200/60">
                      <span className="font-bold text-slate-700 block uppercase">Growth Milestones:</span>
                      {plan.milestones.slice(0, 3).map((m, mIdx) => (
                        <div key={mIdx} className="flex justify-between text-slate-600">
                          <span>Yr {m.year} (Age {m.age}):</span>
                          <span className="font-semibold text-slate-900">{formatINR(m.accruedCorpus)} Cover</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPlanForProposal({
                          scheme: plan.scheme,
                          policyName: plan.policyName,
                          age: currentAge,
                          sumAssured: plan.recommendedSumAssured,
                          durationYears: horizonYears,
                          maturityAge: currentAge + horizonYears,
                          installmentPremium: plan.netMonthlyPremium,
                          netMonthlyPremium: plan.netMonthlyPremium,
                          annualPremium: plan.netAnnualPremium,
                          bonusRate: plan.bonusRate,
                          totalBonus: plan.totalBonusAccrued,
                          estimatedMaturityAmount: plan.estimatedMaturityAmount,
                          totalPremiumPaid: plan.totalPremiumsPaid,
                          loanEligibleYears: plan.scheme === 'PLI' ? 3 : 3,
                          surrenderEligibleYears: 3,
                        })
                      }
                      className="w-full py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-center gap-1.5 cursor-pointer">
                      <i className="ri-file-pdf-line text-red-600"></i> Proposal PDF & Schedule
                    </button>
                    <Link
                      href={`/calculator?scheme=${plan.scheme}&policy=${plan.policyType}&sa=${plan.recommendedSumAssured}&age=${currentAge}&term=${horizonYears}`}
                      className="w-full py-2 px-3 bg-(--primary-red) hover:bg-red-700 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5">
                      <i className="ri-calculator-line"></i> Open in Calculator
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tax & Sovereign Guarantee Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-base">
              <i className="ri-shield-check-line"></i>
            </div>
            <h4 className="font-bold text-xs text-slate-900">100% Sovereign Guarantee</h4>
            <p className="text-[11px] text-slate-500">
              Backed by the Consolidated Fund of India under Section 24 of Post Office Life Insurance Rules.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-base">
              <i className="ri-percent-line"></i>
            </div>
            <h4 className="font-bold text-xs text-slate-900">0% GST Advantage</h4>
            <p className="text-[11px] text-slate-500">
              Save 18% GST charged by private insurers on protection & savings premiums.
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-base">
              <i className="ri-money-dollar-circle-line"></i>
            </div>
            <h4 className="font-bold text-xs text-slate-900">Section 10(10D) Tax-Free</h4>
            <p className="text-[11px] text-slate-500">
              The entire maturity amount and accrued bonus payouts are completely exempt from income tax.
            </p>
          </div>
        </div>
      </div>

      {/* Proposal Modal */}
      {selectedPlanForProposal && (
        <ProposalModal
          isOpen={selectedPlanForProposal !== null}
          onClose={() => setSelectedPlanForProposal(null)}
          proposalData={selectedPlanForProposal}
        />
      )}
    </div>
  );
}
