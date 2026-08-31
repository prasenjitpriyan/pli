import { formatINR, FREQUENCY_CONFIG, PliQuoteResult, PremiumFrequency } from '@/lib/pli'
import { RpliQuoteResult } from '@/lib/rpli'

interface PremiumSummaryCardProps {
  scheme: 'PLI' | 'RPLI'
  frequency: PremiumFrequency
  quotationResult: PliQuoteResult | RpliQuoteResult
  copied: boolean
  onCopySummary: () => void
  onOpenCompareModal: () => void
  onPrint: () => void
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
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
            {formatINR(quotationResult.netInstallmentPremium)}
          </span>
          <span className="text-sm font-medium text-slate-300">
            / {FREQUENCY_CONFIG[frequency].label.toLowerCase().split(' ')[0]}
          </span>
        </div>

        <p className="text-xs text-slate-300 mt-2">
          Net Monthly Equivalent: <strong>{formatINR(quotationResult.netMonthlyPremium)}</strong> |
          Annualized: <strong>{formatINR(quotationResult.annualizedPremium)}</strong>
        </p>
      </div>

      {/* Key Metrics Breakdown */}
      <div className="p-6 space-y-3 text-sm">
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
                  className="flex justify-between items-center py-1 border-b border-emerald-100/70"
                >
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

        {/* Maturity Highlight Box */}
        <div className="bg-linear-to-br from-amber-50 to-orange-50/50 p-5 rounded-xl border border-amber-200 text-center mt-4">
          <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-1">
            Estimated Maturity Benefit (Age {quotationResult.maturityAge})
          </span>
          <span className="text-3xl font-extrabold text-(--primary-dark)">
            {formatINR(quotationResult.maturityAmount)}
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
                }`}
              >
                {(quotationResult as RpliQuoteResult).medicalRuleStatus}
              </span>
            )}
          </div>
        </div>

        {/* Official Table-Driven Mode Breakdown Grid (RPLI Standard) */}
        {scheme === 'RPLI' && (quotationResult as RpliQuoteResult).modeDetails && (
          <div className="mt-4 p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3">
            <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <i className="ri-table-line text-emerald-700 text-sm"></i>
                  Official RPLI Mode Breakdown Table
                </span>
                <span className="text-[0.65rem] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                  {(quotationResult as RpliQuoteResult).rateTableVersion}
                </span>
              </div>
              <div className="text-[0.68rem] text-slate-600 space-y-0.5">
                <p>
                  <strong>Rate Source:</strong>{' '}
                  {(quotationResult as RpliQuoteResult).rateSource}
                </p>
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
                        data: (quotationResult as RpliQuoteResult).modeDetails.monthly,
                      },
                      {
                        label: 'Quarterly',
                        mode: 'QUARTERLY',
                        data: (quotationResult as RpliQuoteResult).modeDetails.quarterly,
                      },
                      {
                        label: 'Half-Yearly',
                        mode: 'HALF_YEARLY',
                        data: (quotationResult as RpliQuoteResult).modeDetails.halfYearly,
                      },
                      {
                        label: 'Yearly',
                        mode: 'YEARLY',
                        data: (quotationResult as RpliQuoteResult).modeDetails.yearly,
                      },
                    ] as const
                  ).map((row, rIdx) => {
                    const isCurrentMode = frequency === row.mode
                    return (
                      <tr
                        key={rIdx}
                        className={
                          isCurrentMode
                            ? 'bg-emerald-50/80 font-bold text-emerald-950'
                            : 'hover:bg-slate-100/50'
                        }
                      >
                        <td className="p-2 flex items-center gap-1">
                          {isCurrentMode && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          )}
                          {row.label}
                        </td>
                        <td className="p-2 text-right">₹{row.data.ratePer1000.toFixed(2)}</td>
                        <td className="p-2 text-right">{formatINR(row.data.grossPremium)}</td>
                        <td className="p-2 text-right text-emerald-700">
                          -{formatINR(row.data.rebate)}
                        </td>
                        <td className="p-2 text-right">{formatINR(row.data.tax)}</td>
                        <td className="p-2 text-right font-extrabold text-slate-900">
                          {formatINR(row.data.netPremium)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Actions Toolbar */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-2 justify-between no-print">
        <button
          onClick={onCopySummary}
          type="button"
          className="flex-1 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-(--primary-dark) hover:bg-slate-100 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <i
            className={
              copied ? 'ri-check-line text-green-600' : 'ri-file-copy-line text-blue-600'
            }
          ></i>
          {copied ? 'Copied!' : 'Copy Summary'}
        </button>
        <button
          onClick={onOpenCompareModal}
          type="button"
          className="flex-1 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-(--primary-dark) hover:bg-slate-100 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <i className="ri-scales-3-line text-amber-600"></i> Compare {scheme} Policies
        </button>
        <button
          onClick={onPrint}
          type="button"
          className="flex-1 py-2.5 px-3 bg-(--primary-red) text-white rounded-lg text-xs font-bold hover:bg-red-700 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <i className="ri-printer-line"></i> Print / PDF
        </button>
      </div>
    </div>
  )
}
