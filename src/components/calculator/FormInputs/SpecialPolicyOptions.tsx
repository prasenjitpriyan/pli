import { FREQUENCY_CONFIG, PremiumFrequency } from '@/lib/pli'

interface SpecialPolicyOptionsProps {
  scheme: 'PLI' | 'RPLI'
  policyType: string
  frequency: PremiumFrequency
  onFrequencyChange: (freq: PremiumFrequency) => void
  isConverted: boolean
  onToggleConverted: (converted: boolean) => void
  premiumCeasingAge: number
  onPremiumCeasingAgeChange: (age: number) => void
  computedAge: number
}

export function SpecialPolicyOptions({
  scheme,
  policyType,
  frequency,
  onFrequencyChange,
  isConverted,
  onToggleConverted,
  premiumCeasingAge,
  onPremiumCeasingAgeChange,
  computedAge,
}: SpecialPolicyOptionsProps) {
  return (
    <div className="space-y-6">
      {/* Premium Payment Mode Frequency */}
      <div>
        <label className="block text-sm font-semibold text-(--text-dark) mb-2">
          Premium Payment Mode Frequency
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(FREQUENCY_CONFIG) as PremiumFrequency[]).map((fKey) => {
            const fItem = FREQUENCY_CONFIG[fKey]
            const isSelected = frequency === fKey
            return (
              <button
                key={fKey}
                type="button"
                onClick={() => onFrequencyChange(fKey)}
                className={`p-2.5 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
                  isSelected
                    ? scheme === 'RPLI'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-(--primary-red) text-white border-(--primary-red) shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div>{fItem.label.split('(')[0]}</div>
                {fItem.rebatePercent > 0 && (
                  <div className="text-[0.65rem] font-normal opacity-90">
                    {fItem.rebatePercent}% Off
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Gram Priya Special Natural Calamity Feature Badge */}
      {policyType === 'GRAM_PRIYA' && (
        <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2 text-xs">
          <p className="font-bold text-rose-950 flex items-center gap-1.5">
            <i className="ri-umbrella-line text-rose-600 text-base"></i>
            Gram Priya Special Policy Feature:
          </p>
          <p className="text-slate-700 leading-relaxed">
            🌧️ <strong>Natural Calamity Premium Relief:</strong> No interest is charged for up to 1
            year of premium arrears in case of natural calamities such as floods, drought,
            earthquake, or cyclone.
          </p>
        </div>
      )}

      {/* Convertible Whole Life (Suvidha) Special Option Card */}
      {(policyType === 'SUVIDHA' || policyType === 'GRAM_SUVIDHA') && (
        <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-purple-900 flex items-center gap-1.5">
              <i className="ri-swap-box-line text-purple-600 text-base"></i>
              Suvidha Conversion Option (At 5-Year Mark)
            </label>
            <span className="text-[0.65rem] font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full">
              Conversion Window: 5–6 Yrs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onToggleConverted(false)}
              className={`p-3 rounded-lg text-left border-2 transition-all cursor-pointer ${
                !isConverted
                  ? 'border-purple-600 bg-white shadow-xs'
                  : 'border-slate-200 bg-purple-50/30 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-purple-950">Option A: Unconverted</span>
                <span className="text-[0.65rem] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                  Bonus ₹{scheme === 'RPLI' ? 60 : 76}/₹1k
                </span>
              </div>
              <p className="text-[0.72rem] text-slate-600">
                Remains Whole Life. Pays out at age 80 or death.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onToggleConverted(true)}
              className={`p-3 rounded-lg text-left border-2 transition-all cursor-pointer ${
                isConverted
                  ? 'border-purple-600 bg-white shadow-xs'
                  : 'border-slate-200 bg-purple-50/30 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-purple-950">
                  Option B: Converted to Endowment
                </span>
                <span className="text-[0.65rem] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                  Bonus ₹48/₹1k
                </span>
              </div>
              <p className="text-[0.72rem] text-slate-600">
                Converts to Endowment after 5 yrs without medical re-exam.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Whole Life Ceasing Age Selector */}
      {(policyType.includes('SURAKSHA') || (policyType.includes('SUVIDHA') && !isConverted)) && (
        <div className="p-4 bg-amber-50/40 border border-amber-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-amber-900">Select Premium Ceasing Age</label>
            <span className="text-xs font-semibold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
              Pay till Age {premiumCeasingAge}
            </span>
          </div>
          <div className="flex gap-3">
            {[55, 58, 60].map((ageVal) => (
              <button
                key={ageVal}
                type="button"
                onClick={() => onPremiumCeasingAgeChange(ageVal)}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  premiumCeasingAge === ageVal
                    ? scheme === 'RPLI'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-(--primary-red) text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Age {ageVal} ({ageVal - computedAge} yrs pay)
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
