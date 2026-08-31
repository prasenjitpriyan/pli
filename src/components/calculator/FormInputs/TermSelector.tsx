interface TermSelectorProps {
  policyType: string
  isConverted: boolean
  computedAge: number
  termInputMode: 'MATURITY_AGE' | 'DURATION'
  onTermInputModeChange: (mode: 'MATURITY_AGE' | 'DURATION') => void
  maturityAge: number
  onMaturityAgeChange: (age: number) => void
  duration: number
  onDurationChange: (dur: number) => void
  calculatedDuration: number
  calculatedMaturityAge: number
}

export function TermSelector({
  policyType,
  isConverted,
  computedAge,
  termInputMode,
  onTermInputModeChange,
  maturityAge,
  onMaturityAgeChange,
  duration,
  onDurationChange,
  calculatedDuration,
  calculatedMaturityAge,
}: TermSelectorProps) {
  // Whole life plans without conversion don't need term inputs
  if (
    policyType.includes('SURAKSHA') ||
    (policyType.includes('SUVIDHA') && !isConverted)
  ) {
    return null
  }

  return (
    <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
      {policyType === 'GRAM_PRIYA' ? (
        <div className="p-3 bg-white border border-rose-200 rounded-lg space-y-1">
          <label className="text-xs font-bold text-rose-950 block">
            Fixed Gram Priya Policy Term:
          </label>
          <div className="text-sm font-extrabold text-rose-700">
            10 Years Fixed Term (Non-changeable)
          </div>
          <p className="text-[0.68rem] text-slate-500">
            Payouts: 20% SA at Year 4, 20% SA at Year 7, 60% SA + Bonus at Year 10.
          </p>
        </div>
      ) : policyType.includes('SUMANGAL') ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-orange-950 flex items-center gap-1.5">
              <i className="ri-calendar-event-line text-orange-600 text-base"></i>
              Money-Back Policy Term (15 or 20 Years)
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={computedAge > 45}
              onClick={() => {
                onTermInputModeChange('DURATION')
                onDurationChange(15)
              }}
              className={`p-3 rounded-lg text-center border-2 transition-all cursor-pointer ${
                computedAge > 45
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  : duration === 15
                    ? 'border-orange-600 bg-white font-bold text-orange-950 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="text-sm font-bold">15 Years Term</div>
            </button>

            <button
              type="button"
              disabled={computedAge > 40}
              onClick={() => {
                onTermInputModeChange('DURATION')
                onDurationChange(20)
              }}
              className={`p-3 rounded-lg text-center border-2 transition-all cursor-pointer ${
                computedAge > 40
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  : duration === 20
                    ? 'border-orange-600 bg-white font-bold text-orange-950 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="text-sm font-bold">20 Years Term</div>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-(--primary-dark)">
              Policy Duration Parameter
            </label>
            <div className="flex bg-slate-200 p-1 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => onTermInputModeChange('MATURITY_AGE')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  termInputMode === 'MATURITY_AGE'
                    ? 'bg-white text-(--primary-dark) shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                Maturity Age
              </button>
              <button
                type="button"
                onClick={() => onTermInputModeChange('DURATION')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  termInputMode === 'DURATION'
                    ? 'bg-white text-(--primary-dark) shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                Duration (Years)
              </button>
            </div>
          </div>

          {termInputMode === 'MATURITY_AGE' ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {[35, 40, 45, 50, 55, 58, 60].map((mAge) => (
                  <button
                    key={mAge}
                    type="button"
                    disabled={mAge <= computedAge}
                    onClick={() => onMaturityAgeChange(mAge)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      mAge <= computedAge
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : maturityAge === mAge
                          ? 'bg-(--primary-red) text-white shadow-xs'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Age {mAge}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-(--text-light) mb-1">
                    Target Maturity Age
                  </label>
                  <input
                    type="number"
                    min={computedAge + 5}
                    max="80"
                    value={maturityAge}
                    onChange={(e) => onMaturityAgeChange(parseInt(e.target.value, 10) || 50)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center justify-between text-xs font-semibold text-(--text-light) mb-1">
                    <span>Calculated Policy Duration</span>
                    <span className="text-[0.62rem] text-emerald-700 font-bold">
                      Maturity Age – ANB
                    </span>
                  </label>
                  <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-lg text-sm font-bold text-emerald-950 flex items-center justify-between">
                    <span>{calculatedDuration} Years</span>
                    <span className="text-[0.7rem] text-slate-600 font-medium">
                      ({maturityAge} – {computedAge})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-(--text-light) mb-1">
                  Policy Duration (Years)
                </label>
                <input
                  type="number"
                  min="5"
                  max="55"
                  value={duration}
                  onChange={(e) => onDurationChange(parseInt(e.target.value, 10) || 20)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-(--text-light) mb-1">
                  Calculated Maturity Age
                </label>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-(--primary-red)">
                  {calculatedMaturityAge} Years Old
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
