'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { calculateQuote, formatINR } from '@/lib/insurance';
import { POLICY_REGISTRY } from '@/config/pli/policies';
import { RPLI_POLICY_REGISTRY } from '@/config/rpli/policies';
import { ProposalModal } from '@/components/common/ProposalModal';

interface PolicySlotConfig {
  scheme: 'PLI' | 'RPLI';
  policyType: string;
}

export default function PolicyComparisonPage() {
  const [age, setAge] = useState<number>(30);
  const [sumAssured, setSumAssured] = useState<number>(1000000); // ₹10 Lakhs
  const [duration, setDuration] = useState<number>(25);

  const [slots, setSlots] = useState<PolicySlotConfig[]>([
    { scheme: 'PLI', policyType: 'SANTOSH' },
    { scheme: 'PLI', policyType: 'SURAKSHA' },
    { scheme: 'RPLI', policyType: 'GRAM_SANTOSH' },
  ]);

  // Proposal modal state
  const [selectedProposalIndex, setSelectedProposalIndex] = useState<number | null>(null);

  // Available options
  const pliPolicies = Object.keys(POLICY_REGISTRY).map((key) => ({
    key,
    name: POLICY_REGISTRY[key as keyof typeof POLICY_REGISTRY].name,
    bonusRate: POLICY_REGISTRY[key as keyof typeof POLICY_REGISTRY].bonusRate,
  }));

  const rpliPolicies = Object.keys(RPLI_POLICY_REGISTRY).map((key) => ({
    key,
    name: RPLI_POLICY_REGISTRY[key as keyof typeof RPLI_POLICY_REGISTRY].name,
    bonusRate: RPLI_POLICY_REGISTRY[key as keyof typeof RPLI_POLICY_REGISTRY].bonusRate,
  }));

  // Calculate quotes for all active slots
  const computedSlots = useMemo(() => {
    return slots.map((slot) => {
      const maturityAge = age + duration;
      try {
        const quote = calculateQuote({
          scheme: slot.scheme,
          policyType: slot.policyType as Parameters<typeof calculateQuote>[0]['policyType'],
          age,
          sumAssured: slot.scheme === 'RPLI' ? Math.min(1000000, sumAssured) : sumAssured,
          duration,
          maturityAge,
          premiumCeasingAge: maturityAge,
          frequency: 'MONTHLY',
        });

        const totalPaid = quote.totalPremiumPaid || quote.netMonthlyPremium * 12 * duration;
        const netGain = quote.maturityAmount - totalPaid;
        const roi = Math.round((netGain / Math.max(1, totalPaid)) * 100);

        return {
          valid: true,
          slot,
          quote,
          totalPaid,
          netGain,
          roi,
        };
      } catch (err: unknown) {
        return {
          valid: false,
          slot,
          error: err instanceof Error ? err.message : 'Configuration out of bounds',
        };
      }
    });
  }, [slots, age, sumAssured, duration]);

  // Determine winners
  const lowestPremiumIdx = useMemo(() => {
    let minVal = Infinity;
    let minIdx = -1;
    computedSlots.forEach((c, idx) => {
      if (c.valid && c.quote && c.quote.netMonthlyPremium < minVal) {
        minVal = c.quote.netMonthlyPremium;
        minIdx = idx;
      }
    });
    return minIdx;
  }, [computedSlots]);

  const highestMaturityIdx = useMemo(() => {
    let maxVal = -Infinity;
    let maxIdx = -1;
    computedSlots.forEach((c, idx) => {
      if (c.valid && c.quote && c.quote.maturityAmount > maxVal) {
        maxVal = c.quote.maturityAmount;
        maxIdx = idx;
      }
    });
    return maxIdx;
  }, [computedSlots]);

  const updateSlot = (index: number, scheme: 'PLI' | 'RPLI', policyType: string) => {
    setSlots((prev) => {
      const copy = [...prev];
      copy[index] = { scheme, policyType };
      return copy;
    });
  };

  const selectedProposal = selectedProposalIndex !== null && computedSlots[selectedProposalIndex]?.valid
    ? {
        scheme: slots[selectedProposalIndex].scheme,
        policyName: computedSlots[selectedProposalIndex].quote!.policyName,
        age,
        sumAssured: computedSlots[selectedProposalIndex].quote!.sumAssured,
        durationYears: duration,
        maturityAge: age + duration,
        installmentPremium: computedSlots[selectedProposalIndex].quote!.netMonthlyPremium,
        netMonthlyPremium: computedSlots[selectedProposalIndex].quote!.netMonthlyPremium,
        annualPremium: computedSlots[selectedProposalIndex].quote!.netMonthlyPremium * 12,
        bonusRate: computedSlots[selectedProposalIndex].quote!.bonusRate,
        totalBonus: computedSlots[selectedProposalIndex].quote!.totalBonus,
        estimatedMaturityAmount: computedSlots[selectedProposalIndex].quote!.maturityAmount,
        totalPremiumPaid: computedSlots[selectedProposalIndex].totalPaid!,
        loanEligibleYears: computedSlots[selectedProposalIndex].quote!.loanYears,
        surrenderEligibleYears: computedSlots[selectedProposalIndex].quote!.surrenderYears,
        survivalBenefitsSchedule: computedSlots[selectedProposalIndex].quote!.survivalBenefits?.map((b) => ({
          year: b.year,
          amount: b.amount,
          description: b.description,
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Breadcrumbs & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-900 rounded-full text-xs font-bold">
            <i className="ri-scales-3-line text-sm"></i> Side-by-Side Actuarial Matrix
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compare Postal Life Insurance Schemes
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Evaluate premiums, declared bonus accumulation, total maturity payouts, and policy facilities across PLI and RPLI policies in real time.
          </p>
        </div>

        {/* Global Parameter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Current Age: <span className="text-(--primary-red) font-extrabold">{age} Years</span>
            </label>
            <input
              type="range"
              min="19"
              max="55"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
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
              Sum Assured: <span className="text-(--primary-red) font-extrabold">{formatINR(sumAssured)}</span>
            </label>
            <input
              type="range"
              min="50000"
              max="5000000"
              step="50000"
              value={sumAssured}
              onChange={(e) => setSumAssured(Number(e.target.value))}
              className="w-full accent-red-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹50K</span>
              <span>₹10 Lakhs</span>
              <span>₹50 Lakhs</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Policy Term: <span className="text-(--primary-red) font-extrabold">{duration} Years</span> (Maturity at {age + duration})
            </label>
            <input
              type="range"
              min="5"
              max="40"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-red-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>5 Yrs</span>
              <span>20 Yrs</span>
              <span>40 Yrs</span>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slots.map((slot, idx) => {
            const comp = computedSlots[idx];
            const isLowest = lowestPremiumIdx === idx;
            const isHighestMaturity = highestMaturityIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`bg-white rounded-2xl border-2 flex flex-col justify-between shadow-md transition-all overflow-hidden ${
                  isHighestMaturity ? 'border-amber-400 ring-2 ring-amber-300/40' : 'border-slate-200'
                }`}>
                {/* Column Selector Header */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Comparison Slot #{idx + 1}
                    </span>
                    <div className="flex gap-1">
                      {isLowest && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded-full text-[10px] font-bold">
                          ⚡ Lowest Premium
                        </span>
                      )}
                      {isHighestMaturity && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold">
                          🏆 Max Maturity
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Scheme Toggle & Policy Dropdown */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateSlot(
                          idx,
                          'PLI',
                          slot.scheme === 'PLI' ? slot.policyType : 'SANTOSH'
                        )
                      }
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        slot.scheme === 'PLI'
                          ? 'bg-(--primary-red) text-white border-red-800'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}>
                      🏛️ PLI
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        updateSlot(
                          idx,
                          'RPLI',
                          slot.scheme === 'RPLI' ? slot.policyType : 'GRAM_SANTOSH'
                        )
                      }
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        slot.scheme === 'RPLI'
                          ? 'bg-emerald-700 text-white border-emerald-900'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}>
                      🌾 RPLI
                    </button>
                  </div>

                  <select
                    value={slot.policyType}
                    onChange={(e) => updateSlot(idx, slot.scheme, e.target.value)}
                    className="w-full text-xs font-bold p-2 bg-white border border-slate-300 rounded-lg text-slate-900">
                    {slot.scheme === 'PLI'
                      ? pliPolicies.map((p) => (
                          <option key={p.key} value={p.key}>
                            {p.name} (Bonus: ₹{p.bonusRate})
                          </option>
                        ))
                      : rpliPolicies.map((p) => (
                          <option key={p.key} value={p.key}>
                            {p.name} (Bonus: ₹{p.bonusRate})
                          </option>
                        ))}
                  </select>
                </div>

                {/* Metrics Body */}
                <div className="p-5 space-y-4 flex-1">
                  {comp.valid && comp.quote ? (
                    <>
                      {/* Monthly & Maturity Hero Numbers */}
                      <div className="text-center p-4 bg-slate-50/80 rounded-xl border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          Net Monthly Premium
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-(--primary-red)">
                          {formatINR(comp.quote.netMonthlyPremium)}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          (₹{(comp.quote.netMonthlyPremium * 12).toLocaleString('en-IN')}/year • 0% GST)
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs text-slate-700 divide-y divide-slate-100">
                        <div className="flex justify-between items-center pt-1.5">
                          <span className="text-slate-500 font-medium">Declared Bonus Rate</span>
                          <span className="font-bold text-slate-900">₹{comp.quote.bonusRate} / ₹1k SA</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5">
                          <span className="text-slate-500 font-medium">Sum Assured</span>
                          <span className="font-bold text-slate-900">{formatINR(comp.quote.sumAssured)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5">
                          <span className="text-slate-500 font-medium">Total Bonus Accrued</span>
                          <span className="font-bold text-emerald-700">+{formatINR(comp.quote.totalBonus)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5">
                          <span className="text-slate-500 font-medium">Total Premiums Paid</span>
                          <span className="font-bold text-slate-900">{formatINR(comp.totalPaid!)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 bg-amber-50/60 p-2 rounded-lg">
                          <span className="font-bold text-amber-900">Estimated Maturity</span>
                          <span className="font-black text-amber-950 text-sm">{formatINR(comp.quote.maturityAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5">
                          <span className="text-slate-500 font-medium">Net Profit / Wealth Gain</span>
                          <span className="font-bold text-emerald-600">+{formatINR(comp.netGain!)} ({comp.roi}%)</span>
                        </div>
                      </div>

                      {/* Policy Rules & Facilities */}
                      <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-[11px] border border-slate-200/60">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Loan Facility:</span>
                          <span className="font-bold text-slate-900">
                            {comp.quote.loanYears ? `After ${comp.quote.loanYears} Yrs @ 10%` : 'Not Available'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Surrender Option:</span>
                          <span className="font-bold text-slate-900">
                            {comp.quote.surrenderYears ? `After ${comp.quote.surrenderYears} Yrs` : 'Not Available'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">Tax Exemption:</span>
                          <span className="font-bold text-emerald-800">100% Tax Free 10(10D)</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 text-center text-red-600 bg-red-50 rounded-xl text-xs">
                      {comp.error || 'Unable to calculate quote for this combination.'}
                    </div>
                  )}
                </div>

                {/* Slot Actions Bar */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProposalIndex(idx)}
                    disabled={!comp.valid}
                    className="w-full py-2 px-3 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50">
                    <i className="ri-file-pdf-line text-red-600"></i> Official Proposal Kit
                  </button>
                  <Link
                    href={`/calculator?scheme=${slot.scheme}&policy=${slot.policyType}&sa=${sumAssured}&age=${age}&term=${duration}`}
                    className="w-full py-2 px-3 bg-(--primary-red) hover:bg-red-700 text-white rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5">
                    <i className="ri-calculator-line"></i> Full Calculator View
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Help & Advisory Banner */}
        <div className="p-6 bg-linear-to-r from-red-900 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Unsure which policy suits your financial profile?</h3>
            <p className="text-xs text-white/80 mt-1">
              Connect directly with an India Post Authorized Senior Advisor for a personalized feasibility review.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/goal-planner"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-xs font-bold text-white flex items-center gap-1.5">
              <i className="ri-compass-3-line"></i> Try Goal Planner
            </Link>
            <a
              href="https://wa.me/919038332076"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md">
              <i className="ri-whatsapp-fill text-sm"></i> WhatsApp Advisor
            </a>
          </div>
        </div>
      </div>

      {/* Official Proposal Modal */}
      {selectedProposal && (
        <ProposalModal
          isOpen={selectedProposalIndex !== null}
          onClose={() => setSelectedProposalIndex(null)}
          proposalData={selectedProposal}
        />
      )}
    </div>
  );
}
