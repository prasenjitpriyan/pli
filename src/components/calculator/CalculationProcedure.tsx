import { formatINR, PremiumFrequency } from '@/lib/pli'
import { RpliQuoteResult } from '@/lib/rpli'

interface CalculationProcedureProps {
  scheme: 'PLI' | 'RPLI'
  dateOfBirth: string
  effectiveDate: string
  frequency: PremiumFrequency
  quotationResult: RpliQuoteResult
}

export function CalculationProcedure({
  scheme,
  dateOfBirth,
  effectiveDate,
  frequency,
  quotationResult,
}: CalculationProcedureProps) {
  if (scheme !== 'RPLI') return null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-3 text-xs no-print">
      <h3 className="font-bold text-sm text-(--primary-dark) flex items-center gap-1.5 border-b border-slate-100 pb-2">
        <i className="ri-functions text-emerald-700 text-base"></i>
        RPLI Table-Driven Step-by-Step Calculation Procedure
      </h3>

      <div className="space-y-2 text-slate-700 font-mono text-[0.7rem]">
        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">
            1. Entry Age (Age on Next Birthday - ANB):
          </span>
          <code>
            DATEDIF({dateOfBirth || 'DOB'}, {effectiveDate}, &quot;Y&quot;) + 1 ={' '}
            {quotationResult.effectiveAge} Years (ANB)
          </code>
        </div>

        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">2. Exact Maturity Age:</span>
          <code>{quotationResult.maturityAge}</code>
        </div>

        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">
            3. Policy Duration Parameter (Term):
          </span>
          <code>
            Policy Term = Maturity Age ({quotationResult.maturityAge}) – Entry Age ANB (
            {quotationResult.effectiveAge}) = {quotationResult.duration} Years
          </code>
        </div>

        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">
            4. Sum Assured Premium Units:
          </span>
          <code>
            {formatINR(quotationResult.sumAssured)} / ₹1,000 = {quotationResult.sumAssured / 1000}
          </code>
        </div>

        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">
            5. Exact Yearly Table Lookup:
          </span>
          <code>
            Age {quotationResult.effectiveAge} → Age {quotationResult.maturityAge} = ₹
            {quotationResult.modeDetails.yearly.ratePer1000.toFixed(2)} / ₹1,000
          </code>
        </div>

        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">6. Gross Premium:</span>
          <code>
            ₹
            {quotationResult.modeDetails[
              frequency === 'MONTHLY'
                ? 'monthly'
                : frequency === 'QUARTERLY'
                  ? 'quarterly'
                  : frequency === 'HALF_YEARLY'
                    ? 'halfYearly'
                    : 'yearly'
            ].ratePer1000.toFixed(2)}{' '}
            × {quotationResult.sumAssured / 1000} = {formatINR(quotationResult.frequencyPremium)}
          </code>
        </div>

        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">7. Mode Rebate:</span>
          <code>{formatINR(quotationResult.rebate)}</code>
        </div>

        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">8. Tax / GST:</span>
          <code>{formatINR(quotationResult.tax)}</code>
        </div>

        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">9. Net Payable Premium:</span>
          <code>{formatINR(quotationResult.netInstallmentPremium)}</code>
        </div>

        <div className="p-2 bg-slate-50 rounded border border-slate-100">
          <span className="font-bold text-slate-900 block font-sans">10. Accrued Bonus:</span>
          <code>
            {quotationResult.sumAssured / 1000} × ₹{quotationResult.bonusRate} ×{' '}
            {quotationResult.duration} = {formatINR(quotationResult.totalBonus)} (Declared bonus
            rate: ₹{quotationResult.bonusRate}/₹1k/yr)
          </code>
        </div>

        <div className="p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-950 font-bold">
          <span className="font-bold text-emerald-900 block font-sans">
            11. Indicative Maturity Benefit:
          </span>
          <code>
            {formatINR(quotationResult.sumAssured)} + {formatINR(quotationResult.totalBonus)} ={' '}
            {formatINR(quotationResult.maturityAmount)}
          </code>
        </div>
      </div>
    </div>
  )
}
