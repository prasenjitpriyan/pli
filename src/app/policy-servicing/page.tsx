'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { calculatePolicyServicing, formatINR } from '@/lib/insurance';
import { POLICY_REGISTRY } from '@/config/pli/policies';
import { RPLI_POLICY_REGISTRY } from '@/config/rpli/policies';

export default function PolicyServicingPage() {
  const [scheme, setScheme] = useState<'PLI' | 'RPLI'>('PLI');
  const [policyType, setPolicyType] = useState<string>('SANTOSH');
  const [sumAssured, setSumAssured] = useState<number>(1000000); // ₹10 Lakhs
  const [entryAge, setEntryAge] = useState<number>(30);
  const [policyTermYears, setPolicyTermYears] = useState<number>(20);
  const [yearsPaid, setYearsPaid] = useState<number>(5);
  const [monthsPaid, setMonthsPaid] = useState<number>(0);

  // Policy options
  const currentRegistry = scheme === 'PLI' ? POLICY_REGISTRY : RPLI_POLICY_REGISTRY;
  const policyOptions = Object.keys(currentRegistry).map((key) => {
    const item = currentRegistry[key as keyof typeof currentRegistry];
    return {
      key,
      name: item.name,
      loanYears: 'loanYears' in item ? item.loanYears : null,
    };
  });

  const handleSchemeChange = (newScheme: 'PLI' | 'RPLI') => {
    setScheme(newScheme);
    setPolicyType(newScheme === 'PLI' ? 'SANTOSH' : 'GRAM_SANTOSH');
    if (newScheme === 'RPLI' && sumAssured > 1000000) {
      setSumAssured(1000000);
    }
  };

  // Run calculation
  const servicingResult = useMemo(() => {
    return calculatePolicyServicing({
      scheme,
      policyType,
      sumAssured,
      entryAge,
      policyTermYears,
      yearsPaid,
      monthsPaid,
    });
  }, [scheme, policyType, sumAssured, entryAge, policyTermYears, yearsPaid, monthsPaid]);

  const potentialPaidUpMaturity =
    servicingResult.paidUpSumAssured +
    (servicingResult.totalMonthsPaid >= 60 ? servicingResult.accruedBonusTotal : 0);
  const immediateSurrenderLoss = Math.max(
    0,
    potentialPaidUpMaturity - servicingResult.estimatedSurrenderValue
  );
  const lossRatio =
    potentialPaidUpMaturity > 0
      ? Math.round((immediateSurrenderLoss / potentialPaidUpMaturity) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Breadcrumbs & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-xs font-bold">
            <i className="ri-customer-service-2-line text-sm"></i> Official Policy Servicing Desk
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loan, Paid-Up & Surrender Value Forecaster
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Check your current policy valuation, loan eligibility at India Post’s 10% interest rate, paid-up maturity benefits, and surrender payouts under official Department of Posts rules.
          </p>
        </div>

        {/* Inputs Configuration Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <i className="ri-file-list-3-line text-(--primary-red)"></i> Existing Policy Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Scheme Toggle */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Insurance Scheme</label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleSchemeChange('PLI')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    scheme === 'PLI' ? 'bg-(--primary-red) text-white shadow-xs' : 'text-slate-600'
                  }`}>
                  🏛️ PLI
                </button>
                <button
                  type="button"
                  onClick={() => handleSchemeChange('RPLI')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    scheme === 'RPLI' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600'
                  }`}>
                  🌾 RPLI
                </button>
              </div>
            </div>

            {/* Policy Dropdown */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Policy</label>
              <select
                value={policyType}
                onChange={(e) => setPolicyType(e.target.value)}
                className="w-full text-xs font-bold p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900">
                {policyOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sum Assured */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Sum Assured: <span className="text-(--primary-red) font-extrabold">{formatINR(sumAssured)}</span>
              </label>
              <input
                type="range"
                min="50000"
                max={scheme === 'RPLI' ? 1000000 : 5000000}
                step="50000"
                value={sumAssured}
                onChange={(e) => setSumAssured(Number(e.target.value))}
                className="w-full accent-red-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹50K</span>
                <span>{scheme === 'RPLI' ? '₹10 Lakhs' : '₹50 Lakhs'}</span>
              </div>
            </div>

            {/* Entry Age */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Entry Age: <span className="text-(--primary-red) font-extrabold">{entryAge} Years</span>
              </label>
              <input
                type="range"
                min="19"
                max="55"
                value={entryAge}
                onChange={(e) => setEntryAge(Number(e.target.value))}
                className="w-full accent-red-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>19 Yrs</span>
                <span>55 Yrs</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
            {/* Policy Term */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Total Policy Term: <span className="text-(--primary-red) font-extrabold">{policyTermYears} Years</span>
              </label>
              <input
                type="range"
                min="5"
                max="40"
                value={policyTermYears}
                onChange={(e) => setPolicyTermYears(Number(e.target.value))}
                className="w-full accent-red-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>5 Yrs</span>
                <span>40 Yrs</span>
              </div>
            </div>

            {/* Completed Years Paid */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Completed Years Paid: <span className="text-emerald-700 font-extrabold">{yearsPaid} Years</span>
              </label>
              <input
                type="range"
                min="0"
                max={policyTermYears}
                value={yearsPaid}
                onChange={(e) => setYearsPaid(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 Yrs</span>
                <span>{policyTermYears} Yrs</span>
              </div>
            </div>

            {/* Additional Months Paid */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Additional Months Paid: <span className="text-emerald-700 font-extrabold">{monthsPaid} Months</span>
              </label>
              <input
                type="range"
                min="0"
                max="11"
                value={monthsPaid}
                onChange={(e) => setMonthsPaid(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 Mo</span>
                <span>11 Mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Valuation Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Loan Facility (Traffic Light: Emerald / Safe) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border-2 flex flex-col justify-between shadow-md transition-all ${
              servicingResult.isLoanEligible
                ? 'border-emerald-500 ring-2 ring-emerald-300/40 bg-linear-to-b from-emerald-50/30 to-white'
                : 'border-slate-200 bg-white'
            }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg">
                    <i className="ri-bank-card-line"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">1. Loan Facility</h3>
                    <span className="text-[10px] text-emerald-700 font-bold block">Recommended Alternative</span>
                  </div>
                </div>
                {servicingResult.isLoanEligible ? (
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded-full text-[10px] font-extrabold">
                    ✓ Eligible Now
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-bold">
                    ⏳ Ineligible
                  </span>
                )}
              </div>

              {servicingResult.isLoanEligible ? (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                      Maximum Loan Quantum Available
                    </span>
                    <span className="text-3xl font-black text-emerald-950">
                      {formatINR(servicingResult.maxLoanAmount)}
                    </span>
                    <span className="text-[10px] text-emerald-700 block mt-0.5">
                      Up to 90% of Surrender Value
                    </span>
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-slate-100 text-slate-700">
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Official Interest Rate</span>
                      <span className="font-bold text-slate-900">10.0% p.a. (Half-Yearly)</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Half-Yearly Interest Amount</span>
                      <span className="font-bold text-red-700">
                        {formatINR(servicingResult.halfYearlyInterestPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Policy Life Cover Active?</span>
                      <span className="font-bold text-emerald-700">✓ 100% Retained</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Bonus Accrual Continues?</span>
                      <span className="font-bold text-emerald-700">✓ Yes, Full Bonus</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-amber-50/70 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-2">
                  <p className="font-bold">Loan not currently available.</p>
                  {servicingResult.minLoanYearsRequired !== null ? (
                    <p>
                      This policy requires at least <strong>{servicingResult.minLoanYearsRequired} completed years</strong> of premium payments before a loan can be sanctioned. (
                      {servicingResult.yearsUntilLoanEligible > 0
                        ? `${servicingResult.yearsUntilLoanEligible} more year(s) needed`
                        : 'Minimum duration not reached'}
                      ).
                    </p>
                  ) : (
                    <p>Loan facility is not available for Anticipated Endowment (Money Back) or Gram Priya policies.</p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              Apply at your nearest Head Post Office (HPO) with the original policy bond.
            </div>
          </motion.div>

          {/* Card 2: Paid-Up Valuation (Traffic Light: Blue / Retain Wealth) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl border-2 flex flex-col justify-between shadow-md transition-all ${
              servicingResult.isPaidUpEligible
                ? 'border-blue-500 ring-2 ring-blue-300/40 bg-linear-to-b from-blue-50/30 to-white'
                : 'border-slate-200 bg-white'
            }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-lg">
                    <i className="ri-shield-check-line"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">2. Paid-Up Policy Value</h3>
                    <span className="text-[10px] text-blue-700 font-bold block">Zero Future Premiums</span>
                  </div>
                </div>
                {servicingResult.isPaidUpEligible ? (
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 rounded-full text-[10px] font-extrabold">
                    ✓ Paid-Up Ready
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold">
                    Min 3 Yrs
                  </span>
                )}
              </div>

              {servicingResult.isPaidUpEligible ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-blue-800 block">
                      Guaranteed Paid-Up Maturity Payout
                    </span>
                    <span className="text-3xl font-black text-blue-950">
                      {formatINR(servicingResult.paidUpSumAssured)}
                    </span>
                    <span className="text-[10px] text-blue-700 block mt-0.5">
                      Payable at End of Original Term ({policyTermYears} Yrs)
                    </span>
                  </div>

                  <div className="space-y-2 text-xs divide-y divide-slate-100 text-slate-700">
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Total Premiums Paid</span>
                      <span className="font-bold text-slate-900">{formatINR(servicingResult.totalPremiumsPaid)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Term Completion Ratio</span>
                      <span className="font-bold text-slate-900">{servicingResult.completionPercentage}%</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Future Premiums Required?</span>
                      <span className="font-bold text-emerald-700">₹0 (No more payments)</span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Accrued Bonus Retained?</span>
                      <span className="font-bold text-slate-900">
                        {servicingResult.totalMonthsPaid >= 60 ? 'Proportionate Bonus' : 'No bonus (<5 yrs)'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-xs space-y-2">
                  <p className="font-bold text-slate-800">Minimum 36 months required.</p>
                  <p>
                    A policy acquires Paid-Up status only after continuous premium payment for at least 3 years. Early lapse results in forfeiture of benefits.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              Paid-up policy remains alive on post office books until the predetermined maturity date.
            </div>
          </motion.div>

          {/* Card 3: Surrender Valuation (Traffic Light: Crimson / Warning) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-2xl border-2 flex flex-col justify-between shadow-md transition-all ${
              servicingResult.isSurrenderEligible
                ? 'border-rose-400 ring-2 ring-rose-200/50 bg-linear-to-b from-rose-50/40 to-white'
                : 'border-slate-200 bg-white'
            }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center text-lg">
                    <i className="ri-logout-box-r-line"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">3. Surrender Valuation</h3>
                    <span className="text-[10px] text-rose-700 font-bold block">Permanent Exit</span>
                  </div>
                </div>
                {servicingResult.isSurrenderEligible ? (
                  <span className="px-2.5 py-0.5 bg-rose-100 text-rose-900 rounded-full text-[10px] font-extrabold">
                    Permitted (High Loss)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold">
                    Not Allowed (&lt;3 Yrs)
                  </span>
                )}
              </div>

              {servicingResult.isSurrenderEligible ? (
                <div className="space-y-3.5">
                  <div className="p-4 bg-rose-50/80 rounded-xl border border-rose-200 text-center">
                    <span className="text-[10px] uppercase font-bold text-rose-800 block">
                      Immediate Cash Surrender Payout
                    </span>
                    <span className="text-3xl font-black text-rose-950">
                      {formatINR(servicingResult.estimatedSurrenderValue)}
                    </span>
                    <span className="text-[10px] text-rose-800 block mt-0.5 font-semibold">
                      Actuarial Factor Applied: {servicingResult.surrenderFactorPercentage}%
                    </span>
                  </div>

                  {/* Immediate Financial Loss Meter & Recommendation */}
                  {immediateSurrenderLoss > 0 && (
                    <div className="p-3.5 bg-rose-100/70 border border-rose-300 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase text-rose-900 flex items-center gap-1.5">
                          <i className="ri-alarm-warning-fill text-rose-600 text-base"></i> Immediate Loss on Surrender
                        </span>
                        <span className="px-2 py-0.5 bg-rose-200 text-rose-950 rounded-full text-[10px] font-extrabold">
                          -{lossRatio}% Value Lost
                        </span>
                      </div>
                      <p className="text-xs text-rose-950 leading-snug">
                        Surrendering now permanently forfeits <span className="font-extrabold text-rose-950">{formatINR(immediateSurrenderLoss)}</span> compared to keeping your policy as <strong>Paid-Up</strong> until maturity!
                      </p>
                      {/* Visual Penalty Bar */}
                      <div className="h-2 w-full bg-rose-200/80 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(8, lossRatio))}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-rose-900 font-medium leading-relaxed">
                        💡 <strong>Actuarial Tip:</strong> Avoid surrendering. Either take a 10% loan (up to {formatINR(servicingResult.maxLoanAmount)}) or convert to Paid-Up with ₹0 future payments.
                      </p>
                    </div>
                  )}

                  {/* Warning on Bonus Forfeiture if < 5 years */}
                  {servicingResult.isBonusForfeitedOnSurrender && (
                    <div className="p-3 bg-red-100/80 border border-red-300 rounded-xl text-[11px] text-red-950 space-y-1">
                      <p className="font-bold flex items-center gap-1">
                        <i className="ri-error-warning-line text-red-600"></i> 100% Bonus Forfeiture Rule!
                      </p>
                      <p>
                        Under DoP rules, surrendering before 5 completed years forfeits all accrued bonus of{' '}
                        <strong>{formatINR(servicingResult.accruedBonusTotal)}</strong>!
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 text-xs divide-y divide-slate-100 text-slate-700">
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Accrued Bonus Status</span>
                      <span
                        className={`font-bold ${
                          servicingResult.isBonusForfeitedOnSurrender ? 'text-red-600' : 'text-emerald-700'
                        }`}>
                        {servicingResult.isBonusForfeitedOnSurrender
                          ? '100% Forfeited'
                          : `+${formatINR(servicingResult.eligibleBonusForSurrender)} included`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1.5">
                      <span className="text-slate-500">Life Cover After Surrender</span>
                      <span className="font-bold text-red-600">Terminated Immediately</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-xs space-y-2">
                  <p className="font-bold text-slate-800">Cannot surrender yet.</p>
                  <p>
                    A policy must be in force for at least 3 years (36 continuous months) to qualify for surrender payout.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              ⚠️ Surrendering permanently forfeits future sovereign guarantee returns.
            </div>
          </motion.div>
        </div>

        {/* Smart Advisory Decision Matrix */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg">
              <i className="ri-scales-line"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Actuarial Decision Matrix: What should you do?</h3>
              <p className="text-xs text-slate-500">Objective financial comparison between the three alternatives.</p>
            </div>
          </div>

          <div className="space-y-2">
            {servicingResult.advisoryNotes.map((note, nIdx) => (
              <div key={nIdx} className="p-3 bg-slate-50 rounded-xl text-xs text-slate-800 font-medium leading-relaxed">
                {note}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-emerald-950 block">Option 1: Take Loan (Recommended)</span>
              <p className="text-[11px] text-emerald-800">
                You get immediate cash while keeping your full life cover and annual bonus returns intact.
              </p>
            </div>
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-blue-950 block">Option 2: Make Paid-Up</span>
              <p className="text-[11px] text-blue-800">
                Stop future payments without surrendering. Receive a proportionate guaranteed lump sum at maturity.
              </p>
            </div>
            <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-red-950 block">Option 3: Surrender (Last Resort)</span>
              <p className="text-[11px] text-red-800">
                Immediate cash out, but you lose life cover and heavily penalize your accrued bonus.
              </p>
            </div>
          </div>
        </div>

        {/* Consultation Action Bar */}
        <div className="p-6 bg-linear-to-r from-slate-900 to-red-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Need assistance with your physical policy bond or claim?</h3>
            <p className="text-xs text-white/80 mt-1">
              Connect with Senior Advisor Prasenjit Das for official loan paperwork and claim guidance.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/calculator"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all">
              <i className="ri-calculator-line"></i> New Quote
            </Link>
            <a
              href="https://wa.me/919038332076?text=Hello!%20I%20need%20assistance%20with%20my%20existing%20Postal%20Life%20Insurance%20policy%20servicing%20(loan/surrender/paid-up)."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shrink-0">
              <i className="ri-whatsapp-fill text-base"></i> Consult Advisor (+91 9038332076)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
