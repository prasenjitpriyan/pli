'use client';

import { motion } from 'motion/react';
import { formatINR, FREQUENCY_CONFIG, PliQuoteResult, PremiumFrequency } from '@/lib/pli';
import { RpliQuoteResult } from '@/lib/rpli';
import AnimatedCounter from '@/components/common/AnimatedCounter';

interface PremiumSummaryCardProps {
  scheme: 'PLI' | 'RPLI';
  frequency: PremiumFrequency;
  quotationResult: PliQuoteResult | RpliQuoteResult;
  copied: boolean;
  onCopySummary: () => void;
  onOpenCompareModal: () => void;
  onPrint: () => void;
}

export function PremiumSummaryCard({
  scheme,
  frequency,
  quotationResult,
  copied,
  onCopySummary,
  onOpenCompareModal,
  onPrint,
}: PremiumSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-(--primary-dark) text-white p-6 relative">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Estimated {FREQUENCY_CONFIG[frequency].label} Net Premium
          </span>
          <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-slate-800 text-slate-200 border border-slate-700">
            {scheme === 'RPLI'
              ? `Table: ${(quotationResult as RpliQuoteResult).rateTableVersion}`
              : `${quotationResult.confidenceScore}% Confidence | ${quotationResult.premiumSource}`}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl md:text-5xl font-extrabold text-(--accent-gold)">
            <AnimatedCounter
              value={quotationResult.netInstallmentPremium}
              prefix="₹"
              formatIndian
              duration={0.8}
            />
          </span>
          <span className="text-sm font-medium text-slate-300">
            / {FREQUENCY_CONFIG[frequency].label.toLowerCase().split(' ')[0]}
          </span>
        </div>

        {/* Explicit Rebate & Gross Calculation Ribbon */}
        <div className="mt-3 pt-3 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Gross Premium:</span>
            <span className="text-slate-200 line-through font-mono">
              {formatINR(quotationResult.frequencyPremium)}
            </span>
          </div>
          {quotationResult.rebate > 0 ? (
            <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
              <i className="ri-discount-percent-fill text-emerald-400"></i>
              <span>Rebate Deducted: -{formatINR(quotationResult.rebate)}</span>
            </div>
          ) : (
            <span className="text-slate-400 font-mono">Rebate: ₹0</span>
          )}
        </div>

        <p className="text-xs text-slate-300 mt-2">
          Net Monthly Equivalent: <strong>{formatINR(quotationResult.netMonthlyPremium)}</strong> |
          Annualized: <strong>{formatINR(quotationResult.annualizedPremium)}</strong>
        </p>
      </div>

      {/* Key Metrics Breakdown */}
      <div className="p-6 space-y-3 text-sm">
        {/* Detailed Rebate Calculation Line */}
        <div className="flex justify-between py-1.5 border-b border-slate-100 items-center">
          <span className="text-(--text-light) flex items-center gap-1">
            <i className="ri-shield-check-line text-emerald-600"></i>
            Rebate Benefit (High SA & Frequency Discount)
          </span>
          <span className="font-bold text-emerald-600">
            {quotationResult.rebate > 0 ? `-${formatINR(quotationResult.rebate)} deducted` : 'Nil'}
          </span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-slate-100">
          <span className="text-(--text-light)">Declared Bonus Rate</span>
          <span className="font-semibold text-(--text-dark)">
            ₹{quotationResult.bonusRate} / ₹1,000 SA
          </span>
        </div>

        <div className="flex justify-between py-1.5 border-b border-slate-100">
          <span className="text-(--text-light)">
            Total Accrued Bonus ({quotationResult.duration} yrs)
          </span>
          <span className="font-semibold text-emerald-600">
            +{formatINR(quotationResult.totalBonus)}
          </span>
        </div>

        {/* Money-Back Periodic Survival Benefits Schedule */}
        {quotationResult.survivalBenefits && quotationResult.survivalBenefits.length > 0 && (
          <div className="mt-4 p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <i className="ri-hand-coin-line text-emerald-600 text-sm"></i>
                Periodic Survival Benefits Schedule
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              {quotationResult.survivalBenefits.map((b, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-1 border-b border-emerald-100/70">
                  <span className="text-slate-700 font-medium">{b.description}</span>
                  <span className="font-bold text-emerald-700">{formatINR(b.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-2 font-bold text-slate-900 pt-2 border-t border-emerald-200">
                <span>Final Maturity Payout ({quotationResult.duration} yrs)</span>
                <span className="text-base text-(--primary-red) font-extrabold">
                  {formatINR(quotationResult.finalMaturityPayout ?? 0)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Maturity Highlight Box with Animated Counter */}
        <div className="bg-linear-to-br from-amber-50 to-orange-50/50 p-5 rounded-xl border border-amber-200 text-center mt-4">
          <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-1">
            Estimated Maturity Benefit (Age {quotationResult.maturityAge})
          </span>
          <span className="text-3xl font-extrabold text-(--primary-dark)">
            <AnimatedCounter
              value={quotationResult.maturityAmount}
              prefix="₹"
              formatIndian
              duration={0.9}
            />
          </span>
        </div>

        {/* Policy Facilities Bar */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-[0.72rem] mt-3">
          <div className="flex items-center justify-between font-bold text-slate-800">
            <span>Policy Facilities & Rules</span>
          </div>
          <div className="flex flex-wrap gap-1.5 font-medium text-slate-700">
            {quotationResult.loanYears ? (
              <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-semibold">
                Loan: After {quotationResult.loanYears} Yrs
              </span>
            ) : (
              <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                No Loan Facility
              </span>
            )}
            {quotationResult.surrenderYears ? (
              <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-semibold">
                Surrender: After {quotationResult.surrenderYears} Yrs
              </span>
            ) : (
              <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                No Surrender Option
              </span>
            )}
            {scheme === 'RPLI' && (
              <span
                className={`px-2 py-0.5 rounded font-semibold ${
                  (quotationResult as RpliQuoteResult).medicalRequired
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-emerald-100 text-emerald-900'
                }`}>
                {(quotationResult as RpliQuoteResult).medicalRuleStatus}
              </span>
            )}
          </div>
        </div>

        {/* Official Table-Driven Mode Breakdown Grid (PLI & RPLI Standard) */}
        {quotationResult.modeDetails && (
          <div className="mt-4 p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3">
            <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <i
                    className={`ri-table-line text-sm ${
                      scheme === 'RPLI' ? 'text-emerald-700' : 'text-(--primary-red)'
                    }`}></i>
                  Official {scheme} Mode Breakdown Table
                </span>
                <span className="text-[0.65rem] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                  {quotationResult.rateTableVersion || '2.0-OFFICIAL'}
                </span>
              </div>
              <div className="text-[0.68rem] text-slate-600 space-y-0.5">
                <p>
                  <strong>Entry Age (ANB):</strong> {quotationResult.effectiveAge} Years |{' '}
                  <strong>Target Maturity Age:</strong> {quotationResult.maturityAge} Years |{' '}
                  <strong>Policy Duration (Term):</strong> {quotationResult.duration} Years (
                  {quotationResult.maturityAge} – {quotationResult.effectiveAge})
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[0.72rem] text-left border-collapse">
                <thead>
                  <tr className="bg-slate-200/70 text-slate-800 font-bold">
                    <th className="p-2 rounded-l">Mode</th>
                    <th className="p-2 text-right">Rate/₹1k</th>
                    <th className="p-2 text-right">Gross (₹)</th>
                    <th className="p-2 text-right">Rebate (₹)</th>
                    <th className="p-2 text-right">Tax (₹)</th>
                    <th className="p-2 text-right rounded-r">Net (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-700">
                  {(
                    [
                      {
                        label: 'Monthly',
                        mode: 'MONTHLY',
                        data: quotationResult.modeDetails.monthly,
                      },
                      {
                        label: 'Quarterly',
                        mode: 'QUARTERLY',
                        data: quotationResult.modeDetails.quarterly,
                      },
                      {
                        label: 'Half-Yearly',
                        mode: 'HALF_YEARLY',
                        data: quotationResult.modeDetails.halfYearly,
                      },
                      {
                        label: 'Yearly',
                        mode: 'YEARLY',
                        data: quotationResult.modeDetails.yearly,
                      },
                    ] as const
                  ).map((row, rIdx) => {
                    const isCurrentMode = frequency === row.mode;
                    return (
                      <tr
                        key={rIdx}
                        className={
                          isCurrentMode
                            ? scheme === 'RPLI'
                              ? 'bg-emerald-50/80 font-bold text-emerald-950'
                              : 'bg-red-50/80 font-bold text-red-950'
                            : 'hover:bg-slate-100/50'
                        }>
                        <td className="p-2 flex items-center gap-1">
                          {isCurrentMode && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                scheme === 'RPLI' ? 'bg-emerald-600' : 'bg-(--primary-red)'
                              }`}></span>
                          )}
                          {row.label}
                        </td>
                        <td className="p-2 text-right">₹{row.data.ratePer1000.toFixed(2)}</td>
                        <td className="p-2 text-right">{formatINR(row.data.grossPremium)}</td>
                        <td
                          className={`p-2 text-right ${
                            scheme === 'RPLI' ? 'text-emerald-700' : 'text-green-700'
                          }`}>
                          -{formatINR(row.data.rebate)}
                        </td>
                        <td className="p-2 text-right">{formatINR(row.data.tax)}</td>
                        <td className="p-2 text-right font-extrabold text-slate-900">
                          {formatINR(row.data.netPremium)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Actions Toolbar with Spring Touch Feedback */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-2 justify-between no-print">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCopySummary}
          type="button"
          className="flex-1 min-w-32.5 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-(--primary-dark) hover:bg-slate-100 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
          <i
            className={
              copied ? 'ri-check-line text-green-600' : 'ri-file-copy-line text-blue-600'
            }></i>
          {copied ? 'Copied!' : 'Copy Summary'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCompareModal}
          type="button"
          className="flex-1 min-w-32.5 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-(--primary-dark) hover:bg-slate-100 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
          <i className="ri-scales-3-line text-amber-600"></i> Compare
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrint}
          type="button"
          className="flex-1 min-w-27.5 py-2.5 px-3 bg-(--primary-red) text-white rounded-lg text-xs font-bold hover:bg-red-700 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
          <i className="ri-printer-line"></i> Print / PDF
        </motion.button>
        <motion.a
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          href={`https://wa.me/919038332076?text=${encodeURIComponent(
            `Hello! I calculated a quotation on the PLI portal for ${scheme} policy.\n- Sum Assured: ₹${quotationResult.sumAssured.toLocaleString('en-IN')}\n- ${FREQUENCY_CONFIG[frequency].label} Premium: ₹${quotationResult.netInstallmentPremium.toLocaleString('en-IN')}\n- Estimated Maturity Benefit: ₹${quotationResult.maturityAmount.toLocaleString('en-IN')}\nPlease assist me with the policy issuance.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs">
          <i className="ri-whatsapp-fill text-sm"></i> Send Quote to WhatsApp Advisor (+91 9038332076 / 8620935473)
        </motion.a>
      </div>
    </motion.div>
  );
}
