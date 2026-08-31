import { formatINR } from '@/lib/pli'

interface SumAssuredSelectorProps {
  scheme: 'PLI' | 'RPLI'
  policyType: string
  sumAssured: number
  customSumAssured: string
  onSelectPreset: (val: number) => void
  onCustomSumAssuredChange: (val: string) => void
}

const SUM_ASSURED_PRESETS_PLI = [100000, 200000, 500000, 1000000, 2000000, 5000000]
const SUM_ASSURED_PRESETS_RPLI = [20000, 50000, 100000, 200000, 500000, 1000000]

export function SumAssuredSelector({
  scheme,
  policyType,
  sumAssured,
  customSumAssured,
  onSelectPreset,
  onCustomSumAssuredChange,
}: SumAssuredSelectorProps) {
  const presets = scheme === 'RPLI' ? SUM_ASSURED_PRESETS_RPLI : SUM_ASSURED_PRESETS_PLI
  const maxLimit =
    scheme === 'RPLI'
      ? policyType === 'BAL_JEEVAN_BIMA'
        ? 100000
        : 1000000
      : policyType === 'BAL_JEEVAN_BIMA'
        ? 300000
        : 5000000

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-semibold text-(--text-dark)">Sum Assured (₹)</label>
        <span className="text-[0.68rem] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
          {scheme === 'RPLI'
            ? policyType === 'BAL_JEEVAN_BIMA'
              ? 'RPLI Max: ₹1 Lakh'
              : 'RPLI Max: ₹10 Lakhs'
            : policyType === 'BAL_JEEVAN_BIMA'
              ? 'PLI Max: ₹3 Lakhs'
              : 'PLI Max: ₹50 Lakhs'}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {presets
          .filter(
            (val) =>
              policyType !== 'BAL_JEEVAN_BIMA' || val <= (scheme === 'RPLI' ? 100000 : 300000)
          )
          .map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onSelectPreset(val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sumAssured === val
                  ? scheme === 'RPLI'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-(--primary-red) text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {val >= 100000 ? `₹${val / 100000} Lakh` : formatINR(val)}
            </button>
          ))}
      </div>
      <input
        type="number"
        min="10000"
        max={maxLimit}
        step="1000"
        value={customSumAssured}
        onChange={(e) => onCustomSumAssuredChange(e.target.value)}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-(--primary-red) outline-none"
      />
    </div>
  )
}
