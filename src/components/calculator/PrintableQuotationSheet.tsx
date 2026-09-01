import { formatINR, FREQUENCY_CONFIG, PliQuoteResult, PremiumFrequency } from '@/lib/pli'
import { RpliQuoteResult } from '@/lib/rpli'
import { PliEmblemSvg } from '../common/PliLogo'

interface PrintableQuotationSheetProps {
  scheme: 'PLI' | 'RPLI'
  fullName: string
  gender: string
  eligibilityCategory: string
  dateOfBirth: string
  effectiveDate: string
  computedAge: number
  ageProofType: 'STANDARD' | 'NON-STANDARD'
  isRuralResident: boolean
  bankAccountType: 'POSB' | 'SCHEDULED_BANK' | 'NONE'
  policyType: string
  isConverted: boolean
  premiumCeasingAge: number
  sumAssured: number
  frequency: PremiumFrequency
  quotationResult: PliQuoteResult | RpliQuoteResult
}

export function PrintableQuotationSheet({
  scheme,
  fullName,
  gender,
  eligibilityCategory,
  dateOfBirth,
  effectiveDate,
  computedAge,
  ageProofType,
  isRuralResident,
  bankAccountType,
  policyType,
  isConverted,
  premiumCeasingAge,
  sumAssured,
  frequency,
  quotationResult,
}: PrintableQuotationSheetProps) {
  const isRpli = scheme === 'RPLI'
  const displayDate = effectiveDate || 'Immediate Commencement'
  const referenceCode = `PLI-Q-${(effectiveDate || '2026').replace(/-/g, '')}-${computedAge}-${(sumAssured / 1000).toFixed(0)}`

  return (
    <div className="hidden print:block print:w-full print:bg-white text-slate-900 font-sans text-xs leading-tight">
      {/* Container calibrated for exact A4 page fit */}
      <div className="max-w-[190mm] mx-auto p-4 space-y-3.5 border-2 border-red-900/40 rounded-xl">
        {/* 1. Official Government Header */}
        <div className="flex items-center justify-between border-b-2 border-(--primary-red) pb-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-16 flex items-center justify-center shrink-0">
              <PliEmblemSvg variant={isRpli ? 'rpli' : 'pli'} className="w-14 h-16" />
            </div>
            <div>
              <div className="text-[0.65rem] font-bold text-slate-600 uppercase tracking-wider">
                भारत सरकार • Government of India • Ministry of Communications
              </div>
              <h1 className="text-lg font-black text-(--primary-red) leading-none mt-0.5">
                {isRpli ? 'RURAL POSTAL LIFE INSURANCE (RPLI)' : 'POSTAL LIFE INSURANCE (PLI)'}
              </h1>
              <div className="text-[0.68rem] font-semibold text-slate-700 mt-0.5">
                Department of Posts (India Post) • Estd. 1884 • Sovereign Guaranteed
              </div>
            </div>
          </div>

          <div className="text-right space-y-0.5">
            <span className="inline-block bg-(--primary-red) text-white font-black text-[0.65rem] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Official Quotation
            </span>
            <p className="text-[0.62rem] text-slate-500 font-mono">
              Commencement Date: <strong>{displayDate}</strong>
            </p>
            <p className="text-[0.62rem] text-slate-500 font-mono">
              Ref: <strong>{referenceCode}</strong>
            </p>
          </div>
        </div>

        {/* 2. Customer & Selected Policy Grid */}
        <div className="grid grid-cols-2 gap-3 text-[0.72rem]">
          {/* Customer Profile Box */}
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-(--primary-dark) border-b border-slate-200 pb-1 flex items-center gap-1">
              <i className="ri-user-star-fill text-(--primary-red)"></i>
              Customer & Eligibility Profile
            </div>
            <div className="grid grid-cols-2 gap-1 pt-0.5">
              <div>
                <span className="text-slate-500 block text-[0.65rem]">Proposer Name:</span>
                <strong className="text-slate-900 text-[0.75rem]">
                  {fullName || 'Prospective Policyholder'}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[0.65rem]">Gender:</span>
                <strong className="text-slate-900">{gender || 'Male'}</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[0.65rem]">Entry Age (ANB):</span>
                <strong className="text-slate-900">
                  {computedAge} Years {dateOfBirth ? `(DOB: ${dateOfBirth})` : ''}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[0.65rem]">Age Proof:</span>
                <strong className="text-slate-900">{ageProofType}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[0.65rem]">Category:</span>
                <span className="text-slate-800 font-semibold truncate block">
                  {eligibilityCategory}
                </span>
              </div>
              {isRpli && (
                <div className="col-span-2 text-[0.65rem] text-emerald-800 font-medium">
                  ✓ Rural Resident: {isRuralResident ? 'Yes' : 'No'} | Bank Account:{' '}
                  {bankAccountType}
                </div>
              )}
            </div>
          </div>

          {/* Policy Specifications Box */}
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1">
            <div className="font-bold text-(--primary-dark) border-b border-slate-200 pb-1 flex items-center gap-1">
              <i className="ri-file-shield-2-fill text-emerald-700"></i>
              Policy Plan Specifications
            </div>
            <div className="grid grid-cols-2 gap-1 pt-0.5">
              <div className="col-span-2">
                <span className="text-slate-500 block text-[0.65rem]">Plan Chosen:</span>
                <strong className="text-(--primary-red) text-[0.75rem]">
                  {quotationResult.policyName}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[0.65rem]">Sum Assured (SA):</span>
                <strong className="text-slate-900 text-[0.75rem]">
                  {formatINR(sumAssured)}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[0.65rem]">Payment Mode:</span>
                <strong className="text-slate-900">
                  {FREQUENCY_CONFIG[frequency].label.split('(')[0]}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[0.65rem]">Policy Duration (Term):</span>
                <strong className="text-slate-900">{quotationResult.duration} Years</strong>
              </div>
              <div>
                <span className="text-slate-500 block text-[0.65rem]">Maturity Age:</span>
                <strong className="text-slate-900">Age {quotationResult.maturityAge}</strong>
              </div>
              {policyType.includes('SURAKSHA') && (
                <div className="col-span-2">
                  <span className="text-slate-500 block text-[0.65rem]">
                    Premium Ceasing Age:
                  </span>
                  <strong className="text-slate-900">Age {premiumCeasingAge}</strong>
                </div>
              )}
              {(policyType === 'SUVIDHA' || policyType === 'GRAM_SUVIDHA') && (
                <div className="col-span-2 text-[0.65rem] text-purple-900 font-semibold">
                  Conversion Plan: {isConverted ? 'Converted to Endowment at 5 Yrs' : 'Whole Life Assurance'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Premium & Rebate Breakdown Card (High-Impact Gradient Banner) */}
        <div className="bg-linear-to-r from-red-950 via-[#751121] to-slate-900 text-white p-3.5 rounded-xl shadow-xs space-y-2">
          <div className="flex items-center justify-between border-b border-red-800/80 pb-1.5">
            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-amber-300">
              Net Premium Payable ({FREQUENCY_CONFIG[frequency].label})
            </span>
            <span className="text-[0.65rem] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
              0% GST Exemption • 100% Tax-Free
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-amber-300">
                {formatINR(quotationResult.netInstallmentPremium)}
                <span className="text-xs text-slate-300 font-normal ml-1">
                  / {FREQUENCY_CONFIG[frequency].label.toLowerCase().split(' ')[0]}
                </span>
              </div>
              <div className="text-[0.68rem] text-slate-300 mt-0.5">
                Monthly Equivalent: <strong>{formatINR(quotationResult.netMonthlyPremium)}</strong> |
                Annualized: <strong>{formatINR(quotationResult.annualizedPremium)}</strong>
              </div>
            </div>

            <div className="text-right text-[0.7rem] space-y-0.5">
              <div className="text-slate-300">
                Gross Table Premium: <span className="line-through font-mono">{formatINR(quotationResult.frequencyPremium)}</span>
              </div>
              <div className="text-emerald-300 font-bold">
                Total Rebate Deducted: -{formatINR(quotationResult.rebate)}
              </div>
              <div className="text-amber-200 font-bold">
                Total Net Investment ({quotationResult.duration} yrs): {formatINR(quotationResult.totalPremiumPaid)}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Maturity Benefits & Bonus Accrual Illustration */}
        <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-300/80 space-y-2">
          <div className="flex items-center justify-between border-b border-amber-200 pb-1">
            <span className="font-bold text-amber-950 text-[0.75rem] flex items-center gap-1">
              <i className="ri-medal-fill text-amber-600"></i>
              Guaranteed Maturity Benefits & Accrued Bonus Illustration
            </span>
            <span className="text-[0.65rem] font-bold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded">
              Declared Bonus: ₹{quotationResult.bonusRate} / ₹1k SA / yr
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[0.72rem]">
            <div className="bg-white p-2 rounded-lg border border-amber-200/60">
              <span className="text-slate-500 block text-[0.65rem]">Basic Sum Assured:</span>
              <strong className="text-base text-slate-900 font-black">
                {formatINR(sumAssured)}
              </strong>
            </div>
            <div className="bg-white p-2 rounded-lg border border-amber-200/60">
              <span className="text-slate-500 block text-[0.65rem]">
                Total Accrued Bonus ({quotationResult.duration} yrs):
              </span>
              <strong className="text-base text-emerald-700 font-black">
                +{formatINR(quotationResult.totalBonus)}
              </strong>
            </div>
            <div className="bg-emerald-100/70 p-2 rounded-lg border border-emerald-300">
              <span className="text-emerald-900 font-bold block text-[0.65rem]">
                Total Indicative Maturity:
              </span>
              <strong className="text-base text-emerald-950 font-black">
                {formatINR(quotationResult.maturityAmount)}
              </strong>
            </div>
          </div>

          {/* Money Back Schedule (if applicable) */}
          {quotationResult.survivalBenefits && quotationResult.survivalBenefits.length > 0 && (
            <div className="mt-1 pt-1.5 border-t border-amber-200/70 text-[0.68rem] text-slate-700">
              <span className="font-bold text-amber-950 block mb-0.5">
                Periodic Survival Benefit Milestones:
              </span>
              <div className="flex flex-wrap gap-2">
                {quotationResult.survivalBenefits.map((sb, i) => (
                  <span key={i} className="bg-white px-2 py-0.5 rounded border border-amber-200">
                    {sb.description}: <strong>{formatINR(sb.amount)}</strong>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. Statutory Guarantees, Tax Exemptions & Authorized Seal */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-[0.65rem]">
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <strong className="text-slate-900 flex items-center gap-1">
              <i className="ri-government-fill text-amber-600"></i> Sovereign Guarantee
            </strong>
            <p className="text-slate-600 mt-0.5 leading-snug">
              100% backed by the Consolidated Fund of India under Post Office rules.
            </p>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <strong className="text-slate-900 flex items-center gap-1">
              <i className="ri-hand-coin-fill text-emerald-600"></i> Tax Exemptions
            </strong>
            <p className="text-slate-600 mt-0.5 leading-snug">
              Section 80C deduction on premiums; Section 10(10D) tax-free maturity.
            </p>
          </div>
          <div className="p-2 bg-slate-50 rounded border border-slate-200">
            <strong className="text-slate-900 flex items-center gap-1">
              <i className="ri-checkbox-circle-fill text-blue-600"></i> Low Expense Ratio
            </strong>
            <p className="text-slate-600 mt-0.5 leading-snug">
              India&apos;s lowest operational expense ratio ~1% ensuring maximum bonus returns.
            </p>
          </div>
        </div>

        {/* 6. Footer Stamp & Portal Verification */}
        <div className="pt-2 border-t border-slate-300 flex items-center justify-between text-[0.62rem] text-slate-500">
          <div>
            Generated via <strong>Postal Life Insurance Online Portal</strong> (pli-hazel.vercel.app)
          </div>
          <div className="font-semibold">
            For Official Inquiries & Policy Issuance, Visit Nearest Post Office
          </div>
        </div>
      </div>
    </div>
  )
}
