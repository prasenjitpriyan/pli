'use client';

import React from 'react';
import { formatINR } from '@/lib/pli';
import { PliEmblemSvg } from './PliLogo';

export interface ProposalScheduleItem {
  year: number;
  age: number;
  premiumPaid: number;
  cumulativePaid: number;
  accruedBonus: number;
  deathCover: number;
  survivalPayout?: number;
}

export interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalData: {
    referenceNumber?: string;
    clientName?: string;
    age: number;
    dob?: string;
    scheme: 'PLI' | 'RPLI';
    policyName: string;
    policyCode?: string;
    sumAssured: number;
    durationYears: number;
    maturityAge: number;
    frequency?: string;
    installmentPremium: number;
    netMonthlyPremium: number;
    annualPremium: number;
    bonusRate: number;
    totalBonus: number;
    estimatedMaturityAmount: number;
    totalPremiumPaid: number;
    loanEligibleYears?: number | null;
    surrenderEligibleYears?: number | null;
    survivalBenefitsSchedule?: { year: number; amount: number; description: string }[];
  };
}

export function ProposalModal({ isOpen, onClose, proposalData }: ProposalModalProps) {
  if (!isOpen) return null;

  const {
    referenceNumber = `PLI-PROP-${Date.now().toString().slice(-6)}`,
    clientName = 'Valued Policyholder',
    age,
    dob = 'Provided on Application',
    scheme,
    policyName,
    sumAssured,
    durationYears,
    maturityAge,
    frequency = 'MONTHLY',
    installmentPremium,
    netMonthlyPremium,
    annualPremium,
    bonusRate,
    totalBonus,
    estimatedMaturityAmount,
    totalPremiumPaid,
    loanEligibleYears,
    surrenderEligibleYears,
    survivalBenefitsSchedule = [],
  } = proposalData;

  // Generate Year-by-Year Cashflow Schedule
  const schedule: ProposalScheduleItem[] = [];
  let cumPaid = 0;
  for (let yr = 1; yr <= durationYears; yr++) {
    cumPaid += annualPremium;
    const accruedBonus = Math.round((sumAssured / 1000) * bonusRate * yr);
    const survivalMatch = survivalBenefitsSchedule.find((s) => s.year === yr);

    schedule.push({
      year: yr,
      age: age + yr,
      premiumPaid: annualPremium,
      cumulativePaid: cumPaid,
      accruedBonus,
      deathCover: sumAssured + accruedBonus,
      survivalPayout: survivalMatch ? survivalMatch.amount : undefined,
    });
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <i className="ri-file-pdf-2-line text-red-400 text-xl"></i>
            <h2 className="font-bold text-base sm:text-lg">Official Policy Proposal & Cashflow Illustration</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-(--primary-red) hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer">
              <i className="ri-printer-line text-sm"></i> Print / Download PDF
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer">
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* Printable Proposal Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto print:p-0 print:overflow-visible text-slate-800 text-xs">
          {/* Government Header */}
          <div className="border-b-2 border-red-800 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12">
                <PliEmblemSvg />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-red-900 tracking-wide uppercase">
                  Postal Life Insurance (PLI) & RPLI
                </h1>
                <p className="text-[10px] text-slate-500 font-semibold tracking-wider">
                  DEPARTMENT OF POSTS • MINISTRY OF COMMUNICATIONS • GOVT OF INDIA
                </p>
                <p className="text-[10px] text-emerald-800 font-bold mt-0.5">
                  100% Sovereign Guarantee under Section 24 of Post Office Life Insurance Rules
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-2.5 py-0.5 bg-red-100 text-red-900 rounded font-mono font-bold text-[11px]">
                {referenceNumber}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">Generated: {new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          {/* Proposal Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Proposed Insured</span>
              <span className="font-bold text-slate-900 text-sm">{clientName}</span>
              <span className="text-[9px] text-slate-400 block">{dob}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Entry Age / Maturity</span>
              <span className="font-bold text-slate-900">{age} Yrs → Age {maturityAge}</span>
              <span className="text-[9px] text-slate-400 block">Term: {durationYears} Yrs</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Payment Mode</span>
              <span className="font-bold text-slate-900">{frequency}</span>
              <span className="text-[9px] text-blue-700 font-semibold block">{formatINR(installmentPremium)}/installment</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-medium">Selected Scheme ({scheme})</span>
              <span className="font-bold text-red-900">{policyName}</span>
              <span className="text-[9px] text-slate-500 block">Total Paid: {formatINR(totalPremiumPaid)}</span>
            </div>
          </div>

          {/* Financial Summary Highlight Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 text-center">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-red-800 block">Sum Assured</span>
              <span className="text-base font-black text-red-950">{formatINR(sumAssured)}</span>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-blue-800 block">Net Monthly Premium</span>
              <span className="text-base font-black text-blue-950">{formatINR(netMonthlyPremium)}</span>
              <span className="text-[9px] text-slate-500 block">({formatINR(annualPremium)}/yr)</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">Total Bonus Accrued</span>
              <span className="text-base font-black text-emerald-950">+{formatINR(totalBonus)}</span>
              <span className="text-[9px] text-emerald-700 block">@ ₹{bonusRate}/₹1k SA</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-amber-900 block">Estimated Maturity</span>
              <span className="text-base font-black text-amber-950">{formatINR(estimatedMaturityAmount)}</span>
              <span className="text-[9px] text-amber-800 block">100% Tax Free 10(10D)</span>
            </div>
          </div>

          {/* Facilities Summary */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px]">
            <span className="font-bold text-slate-700">Official Policy Facilities:</span>
            {loanEligibleYears ? (
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-semibold">
                ✓ Loan Eligible after {loanEligibleYears} Years @ 10% Interest
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded">No Loan Facility</span>
            )}
            {surrenderEligibleYears ? (
              <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-semibold">
                ✓ Surrender Allowed after {surrenderEligibleYears} Years
              </span>
            ) : null}
            <span className="px-2 py-0.5 bg-purple-100 text-purple-900 rounded font-semibold">
              ✓ 0% GST Applicable on Premium
            </span>
          </div>

          {/* Detailed Year-by-Year Cashflow Table */}
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Actuarial Cashflow & Coverage Schedule</span>
            <span className="text-[10px] text-slate-500 font-normal">All amounts in Indian Rupees (₹)</span>
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="max-h-72 overflow-y-auto print:max-h-none">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 print:static">
                  <tr>
                    <th className="p-2 border-b border-slate-200">Year</th>
                    <th className="p-2 border-b border-slate-200">Age</th>
                    <th className="p-2 border-b border-slate-200 text-right">Annual Premium</th>
                    <th className="p-2 border-b border-slate-200 text-right">Cumulative Paid</th>
                    <th className="p-2 border-b border-slate-200 text-right">Accrued Bonus</th>
                    <th className="p-2 border-b border-slate-200 text-right">Death Benefit Cover</th>
                    {survivalBenefitsSchedule.length > 0 && (
                      <th className="p-2 border-b border-slate-200 text-right">Survival Payout</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-slate-900">Yr {row.year}</td>
                      <td className="p-2 text-slate-600">{row.age} yrs</td>
                      <td className="p-2 text-right text-slate-700">{formatINR(row.premiumPaid)}</td>
                      <td className="p-2 text-right font-medium text-slate-900">{formatINR(row.cumulativePaid)}</td>
                      <td className="p-2 text-right text-emerald-700">+{formatINR(row.accruedBonus)}</td>
                      <td className="p-2 text-right font-bold text-red-900">{formatINR(row.deathCover)}</td>
                      {survivalBenefitsSchedule.length > 0 && (
                        <td className="p-2 text-right font-bold text-amber-700">
                          {row.survivalPayout ? formatINR(row.survivalPayout) : '-'}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tax & Sovereign Guarantee Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-600">
            <div>
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                <i className="ri-shield-check-line text-emerald-700 text-xs"></i> Tax Deductions & Guarantees
              </h4>
              <p>• Premium qualifies for tax deduction under Section 80C up to ₹1,50,000 per financial year.</p>
              <p>• All maturity and death payouts are 100% tax-exempt under Section 10(10D) of Income Tax Act.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                <i className="ri-customer-service-2-line text-blue-700 text-xs"></i> Authorized Advisory Desk
              </h4>
              <p>• <strong>Senior Advisor:</strong> Prasenjit Das (+91 9038332076 / 8620935473)</p>
              <p>• <strong>Verification Portal:</strong> plipost.indiapost.gov.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
