interface JointLifeInputsProps {
  jointAgeMode: 'DOB' | 'AGE'
  onJointAgeModeChange: (mode: 'DOB' | 'AGE') => void
  firstLifeDob: string
  onFirstLifeDobChange: (dob: string) => void
  secondLifeDob: string
  onSecondLifeDobChange: (dob: string) => void
  firstLifeAge: number
  onFirstLifeAgeChange: (age: number) => void
  secondLifeAge: number
  onSecondLifeAgeChange: (age: number) => void
  firstLifeEffectiveAge: number
  secondLifeEffectiveAge: number
  computedAge: number
}

export function JointLifeInputs({
  jointAgeMode,
  onJointAgeModeChange,
  firstLifeDob,
  onFirstLifeDobChange,
  secondLifeDob,
  onSecondLifeDobChange,
  firstLifeAge,
  onFirstLifeAgeChange,
  secondLifeAge,
  onSecondLifeAgeChange,
  firstLifeEffectiveAge,
  secondLifeEffectiveAge,
  computedAge,
}: JointLifeInputsProps) {
  return (
    <div className="p-4 bg-red-50/30 border border-red-200/80 rounded-xl space-y-4">
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-100 pb-3">
        <div>
          <label className="text-sm font-bold text-(--primary-dark) block">
            Joint Life Parameters (Yugal Suraksha)
          </label>
          <span className="text-[0.68rem] text-slate-500 font-medium">
            Both lives covered under a single policy with joint survival & maturity benefits
          </span>
        </div>
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onJointAgeModeChange('DOB')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              jointAgeMode === 'DOB'
                ? 'bg-white text-(--primary-red) font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="ri-calendar-line mr-1"></i> Use DOB
          </button>
          <button
            type="button"
            onClick={() => onJointAgeModeChange('AGE')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              jointAgeMode === 'AGE'
                ? 'bg-white text-(--primary-red) font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="ri-user-line mr-1"></i> Direct Age
          </button>
        </div>
      </div>

      {/* Inputs according to mode */}
      {jointAgeMode === 'DOB' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Life (Policyholder) DOB */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-(--text-dark)">
                First Life (Proposer) DOB <span className="text-red-500">*</span>
              </label>
              <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded bg-red-100 text-(--primary-red)">
                Age: {firstLifeEffectiveAge} Yrs (ANB)
              </span>
            </div>
            <input
              type="date"
              value={firstLifeDob}
              onChange={(e) => onFirstLifeDobChange(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-(--primary-red)"
            />
            <span className="text-[0.65rem] text-slate-500 block">
              Eligible entry age: 21 to 45 years
            </span>
          </div>

          {/* Second Life (Spouse) DOB */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-(--text-dark)">
                Second Life (Spouse) DOB <span className="text-red-500">*</span>
              </label>
              <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded bg-red-100 text-(--primary-red)">
                Age: {secondLifeEffectiveAge} Yrs (ANB)
              </span>
            </div>
            <input
              type="date"
              value={secondLifeDob}
              onChange={(e) => onSecondLifeDobChange(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-(--primary-red)"
            />
            <span className="text-[0.65rem] text-slate-500 block">
              Eligible entry age: 21 to 45 years
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Life Age */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-(--text-dark)">
                First Life (Proposer) Age (21 – 45 Yrs) <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="number"
              min="21"
              max="45"
              value={firstLifeAge}
              onChange={(e) => onFirstLifeAgeChange(parseInt(e.target.value, 10) || 30)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-(--primary-red)"
            />
            <span className="text-[0.65rem] text-slate-500 block">
              Completed Age Next Birthday (ANB)
            </span>
          </div>

          {/* Second Life Age */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-(--text-dark)">
                Second Life (Spouse) Age (21 – 45 Yrs) <span className="text-red-500">*</span>
              </label>
            </div>
            <input
              type="number"
              min="21"
              max="45"
              value={secondLifeAge}
              onChange={(e) => onSecondLifeAgeChange(parseInt(e.target.value, 10) || 28)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-(--primary-red)"
            />
            <span className="text-[0.65rem] text-slate-500 block">
              Completed Age Next Birthday (ANB)
            </span>
          </div>
        </div>
      )}

      {/* Joint Summary Bar */}
      <div className="p-3 bg-linear-to-r from-red-900/10 via-amber-50 to-slate-50 border border-red-200 rounded-lg text-xs font-semibold text-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <i className="ri-team-fill text-(--primary-red) text-base"></i>
          <span>
            First Life: <strong>{firstLifeEffectiveAge} yrs</strong> • Second Life:{' '}
            <strong>{secondLifeEffectiveAge} yrs</strong>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-600">Calculated Joint Equivalent Age:</span>
          <span className="text-sm font-black text-(--primary-red) bg-white px-2 py-0.5 rounded border border-red-200">
            {computedAge} Years (⌊Avg⌋)
          </span>
        </div>
      </div>
    </div>
  )
}
