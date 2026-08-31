import { calculateAge } from '@/lib/pli'

interface AgeAndDobInputsProps {
  ageInputMode: 'DOB' | 'AGE'
  onAgeInputModeChange: (mode: 'DOB' | 'AGE') => void
  dateOfBirth: string
  onDateOfBirthChange: (dob: string) => void
  effectiveDate: string
  manualAge: number
  onManualAgeChange: (age: number) => void
  computedAge: number
}

export function AgeAndDobInputs({
  ageInputMode,
  onAgeInputModeChange,
  dateOfBirth,
  onDateOfBirthChange,
  effectiveDate,
  manualAge,
  onManualAgeChange,
  computedAge,
}: AgeAndDobInputsProps) {
  return (
    <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-(--primary-dark)">Policy Holder Age</label>
        <div className="flex bg-slate-200 p-1 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => onAgeInputModeChange('DOB')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              ageInputMode === 'DOB'
                ? 'bg-white text-(--primary-dark) shadow-xs'
                : 'text-slate-600'
            }`}
          >
            Option A: Date of Birth
          </button>
          <button
            type="button"
            onClick={() => onAgeInputModeChange('AGE')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              ageInputMode === 'AGE'
                ? 'bg-white text-(--primary-dark) shadow-xs'
                : 'text-slate-600'
            }`}
          >
            Option B: Current Age
          </button>
        </div>
      </div>

      {ageInputMode === 'DOB' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-(--text-light) mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => onDateOfBirthChange(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-(--primary-red) outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-(--text-light) mb-1">
                Completed Age
              </label>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                {calculateAge(dateOfBirth, effectiveDate).completedAge} years
              </div>
            </div>
            <div>
              <label className="flex items-center justify-between text-xs font-semibold text-(--text-light) mb-1">
                <span>Entry Age (ANB)</span>
                <span className="text-[0.62rem] text-emerald-700 font-bold">Official</span>
              </label>
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-300 rounded-lg text-sm font-bold text-emerald-950">
                {computedAge} yrs
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <label className="flex items-center justify-between text-xs font-semibold text-(--text-light) mb-1">
            <span>Age on Next Birthday (ANB)</span>
            <span className="text-[0.62rem] text-emerald-700 font-bold">19 – 55 Years</span>
          </label>
          <input
            type="number"
            min="19"
            max="55"
            value={manualAge}
            onChange={(e) => onManualAgeChange(parseInt(e.target.value, 10) || 30)}
            onWheel={(e) => e.currentTarget.blur()}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-(--primary-red) outline-none"
          />
        </div>
      )}
    </div>
  )
}
