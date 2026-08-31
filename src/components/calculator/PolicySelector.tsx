import { PliPolicy, POLICY_REGISTRY } from '@/lib/pli'
import { RpliPolicy, RPLI_POLICY_REGISTRY } from '@/lib/rpli'

interface PolicySelectorProps {
  scheme: 'PLI' | 'RPLI'
  policyType: string
  isConverted: boolean
  onSelectPolicy: (policyKey: string) => void
}

export function PolicySelector({
  scheme,
  policyType,
  isConverted,
  onSelectPolicy,
}: PolicySelectorProps) {
  const policyKeys =
    scheme === 'RPLI'
      ? (Object.keys(RPLI_POLICY_REGISTRY) as RpliPolicy[])
      : (Object.keys(POLICY_REGISTRY) as PliPolicy[])

  return (
    <div>
      <label className="block text-sm font-semibold text-(--text-dark) mb-2">
        Select {scheme} Policy (6 Products)
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {policyKeys.map((key) => {
          const config =
            scheme === 'RPLI'
              ? RPLI_POLICY_REGISTRY[key as RpliPolicy]
              : POLICY_REGISTRY[key as PliPolicy]
          const isSelected = policyType === key
          return (
            <div
              key={key}
              onClick={() => onSelectPolicy(key)}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? scheme === 'RPLI'
                    ? 'border-emerald-600 bg-emerald-50/30 shadow-xs'
                    : 'border-(--primary-red) bg-red-50/30 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-(--primary-dark)">{config.code}</span>
                <span className="text-[0.65rem] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Bonus ₹{key.includes('SUVIDHA') && isConverted ? 48 : config.bonusRate}/₹1k
                </span>
              </div>
              <p className="text-xs font-bold text-(--text-dark) truncate">
                {config.name.split('(')[0]}
              </p>
              <p className="text-[0.7rem] text-(--text-light) mt-1 line-clamp-2">
                {config.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
