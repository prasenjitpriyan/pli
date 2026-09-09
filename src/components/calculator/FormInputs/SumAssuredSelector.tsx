import { formatINR } from '@/lib/pli';

interface SumAssuredSelectorProps {
  scheme: 'PLI' | 'RPLI';
  policyType: string;
  sumAssured: number;
  customSumAssured: string;
  onSelectPreset: (val: number) => void;
  onCustomSumAssuredChange: (val: string) => void;
}

const SUM_ASSURED_PRESETS_PLI = [100000, 200000, 500000, 1000000, 2000000, 5000000];
const SUM_ASSURED_PRESETS_RPLI = [20000, 50000, 100000, 200000, 500000, 1000000];

export function SumAssuredSelector({
  scheme,
  policyType,
  sumAssured,
  customSumAssured,
  onSelectPreset,
  onCustomSumAssuredChange,
}: SumAssuredSelectorProps) {
  const presets = scheme === 'RPLI' ? SUM_ASSURED_PRESETS_RPLI : SUM_ASSURED_PRESETS_PLI;
  const maxLimit =
    scheme === 'RPLI'
      ? policyType === 'BAL_JEEVAN_BIMA'
        ? 100000
        : 1000000
      : policyType === 'BAL_JEEVAN_BIMA'
        ? 300000
        : 5000000;

  const minLimit = scheme === 'RPLI' ? 10000 : 20000;

  const applyDelta = (delta: number) => {
    const nextVal = Math.max(minLimit, Math.min(maxLimit, sumAssured + delta));
    onSelectPreset(nextVal);
  };

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

      {/* Preset Pills */}
      <div className="flex flex-wrap gap-1.5 mb-2.5">
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
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                sumAssured === val
                  ? scheme === 'RPLI'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-(--primary-red) text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}>
              {val >= 100000 ? `₹${val / 100000} Lakh` : formatINR(val)}
            </button>
          ))}
      </div>

      {/* Input + Quick Steppers */}
      <div className="space-y-2">
        <div className="relative flex items-center">
          <input
            type="number"
            min={minLimit}
            max={maxLimit}
            step="1000"
            value={customSumAssured}
            onChange={(e) => onCustomSumAssuredChange(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-(--primary-red) outline-none"
          />
          <span className="absolute right-3 text-xs font-bold text-slate-400 pointer-events-none">
            {formatINR(sumAssured)}
          </span>
        </div>

        {/* Stepper Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-1 text-[10px]">
          <div className="flex items-center gap-1">
            <span className="text-slate-400 font-medium">Quick Stepper:</span>
            <button
              type="button"
              onClick={() => applyDelta(-50000)}
              disabled={sumAssured <= minLimit}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold disabled:opacity-40 cursor-pointer">
              -₹50K
            </button>
            <button
              type="button"
              onClick={() => applyDelta(50000)}
              disabled={sumAssured >= maxLimit}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold disabled:opacity-40 cursor-pointer">
              +₹50K
            </button>
            <button
              type="button"
              onClick={() => applyDelta(100000)}
              disabled={sumAssured >= maxLimit}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold disabled:opacity-40 cursor-pointer">
              +₹1 Lakh
            </button>
            <button
              type="button"
              onClick={() => applyDelta(500000)}
              disabled={sumAssured >= maxLimit}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold disabled:opacity-40 cursor-pointer">
              +₹5 Lakhs
            </button>
          </div>
          {sumAssured >= 100000 && (
            <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
              <i className="ri-checkbox-circle-fill"></i> ₹1/₹1k High SA Rebate Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
