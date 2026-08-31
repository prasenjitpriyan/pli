import { calculateAge } from '@/lib/pli'

interface ChildPolicyInputsProps {
  scheme: 'PLI' | 'RPLI'
  childDateOfBirth: string
  onChildDobChange: (dob: string) => void
  effectiveDate: string
  childAge: number
  onChildAgeChange: (age: number) => void
  parentAge: number
  onParentAgeChange: (age: number) => void
  isParentDeceased: boolean
  onToggleParentDeceased: () => void
}

export function ChildPolicyInputs({
  scheme,
  childDateOfBirth,
  onChildDobChange,
  effectiveDate,
  childAge,
  onChildAgeChange,
  parentAge,
  onParentAgeChange,
  isParentDeceased,
  onToggleParentDeceased,
}: ChildPolicyInputsProps) {
  return (
    <div className="p-4 bg-blue-50/30 border border-blue-200 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
          <i className="ri-heart-pulse-line text-blue-600 text-base"></i>
          Children Policy Parameters (Bal Jeevan Bima)
        </label>
        <span className="text-[0.65rem] font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">
          Max SA: {scheme === 'RPLI' ? '₹1 Lakh' : '₹3 Lakhs'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
            Child Date of Birth (Optional)
          </label>
          <input
            type="date"
            value={childDateOfBirth}
            onChange={(e) => {
              onChildDobChange(e.target.value)
              if (e.target.value) {
                const { age } = calculateAge(e.target.value, effectiveDate)
                onChildAgeChange(Math.max(5, Math.min(20, age)))
              }
            }}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none"
          />
          {new Date(childDateOfBirth) > new Date() && (
            <p className="text-[0.68rem] text-red-600 font-bold mt-1">
              ⚠️ INVALID - Child DOB is in the future.
            </p>
          )}
          {new Date(childDateOfBirth) > new Date(effectiveDate) &&
            new Date(childDateOfBirth) <= new Date() && (
              <p className="text-[0.68rem] text-red-600 font-bold mt-1">
                ⚠️ INVALID - Child DOB is after Policy Start Date.
              </p>
            )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
            Child Completed Age (5 – 20 Years)
          </label>
          <input
            type="number"
            min="5"
            max="20"
            value={childAge}
            onChange={(e) => onChildAgeChange(parseInt(e.target.value, 10) || 5)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-(--text-dark) mb-1">
          Parent Age at Entry (Max 45 Years)
        </label>
        <input
          type="number"
          min="19"
          max="45"
          value={parentAge}
          onChange={(e) => onParentAgeChange(parseInt(e.target.value, 10) || 35)}
          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
        />
      </div>

      {/* Parent Death Premium Waiver Toggle for RPLI */}
      {scheme === 'RPLI' && (
        <div className="p-3 bg-white border border-blue-200 rounded-lg flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">
            Simulate Parent Deceased State:
          </span>
          <button
            type="button"
            onClick={onToggleParentDeceased}
            className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
              isParentDeceased
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isParentDeceased ? 'Parent Deceased (0 Premium)' : 'Parent Alive'}
          </button>
        </div>
      )}

      {/* Key Guidelines Callout */}
      <div className="p-3 bg-white border border-blue-100 rounded-lg space-y-2 text-[0.72rem] text-slate-700">
        <p className="font-bold text-blue-900 flex items-center gap-1">
          <i className="ri-shield-user-line text-blue-600"></i> Rules & Facilities:
        </p>
        <ul className="list-disc pl-4 space-y-1 leading-relaxed">
          <li>
            <strong>Premium Waiver:</strong> No premium payable on Children Policy after parent
            death; full SA + accrued bonus paid on maturity.
          </li>
          <li>
            <strong>Loan & Surrender:</strong>{' '}
            {scheme === 'RPLI'
              ? 'Not Available. Paid-Up eligible after 5 years.'
              : 'No loan facility. Paid-up option after 5 years.'}
          </li>
        </ul>
      </div>
    </div>
  )
}
