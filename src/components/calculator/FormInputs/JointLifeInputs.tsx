interface JointLifeInputsProps {
  firstLifeAge: number
  onFirstLifeAgeChange: (age: number) => void
  secondLifeAge: number
  onSecondLifeAgeChange: (age: number) => void
  computedAge: number
}

export function JointLifeInputs({
  firstLifeAge,
  onFirstLifeAgeChange,
  secondLifeAge,
  onSecondLifeAgeChange,
  computedAge,
}: JointLifeInputsProps) {
  return (
    <div className="p-4 bg-red-50/20 border border-red-100 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-(--primary-dark)">
          Joint Life Parameters (Yugal Suraksha)
        </label>
        <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
          Rebate: ₹7/month
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
            First Life Age (21 - 45 Years)
          </label>
          <input
            type="number"
            min="21"
            max="45"
            value={firstLifeAge}
            onChange={(e) => onFirstLifeAgeChange(parseInt(e.target.value, 10) || 30)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
            Second Life Age (21 - 45 Years)
          </label>
          <input
            type="number"
            min="21"
            max="45"
            value={secondLifeAge}
            onChange={(e) => onSecondLifeAgeChange(parseInt(e.target.value, 10) || 28)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
          />
        </div>
      </div>
      <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-between">
        <span>Calculated Joint Effective Age:</span>
        <span className="text-sm font-bold text-(--primary-red)">
          {computedAge} years (Floor Avg)
        </span>
      </div>
    </div>
  )
}
