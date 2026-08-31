interface SchemeSelectorProps {
  scheme: 'PLI' | 'RPLI'
  onSchemeChange: (scheme: 'PLI' | 'RPLI') => void
}

export function SchemeSelector({ scheme, onSchemeChange }: SchemeSelectorProps) {
  return (
    <div className="container-custom pt-8 no-print">
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => onSchemeChange('PLI')}
          className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            scheme === 'PLI'
              ? 'bg-(--primary-red) text-white shadow-md'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <i className="ri-building-line text-lg"></i>
          <span>Postal Life Insurance (PLI)</span>
          <span className="text-[0.68rem] bg-white/20 px-2 py-0.5 rounded-full ml-1 font-semibold">
            Max SA ₹50L
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSchemeChange('RPLI')}
          className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            scheme === 'RPLI'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <i className="ri-plant-line text-lg"></i>
          <span>Rural Postal Life Insurance (RPLI)</span>
          <span className="text-[0.68rem] bg-white/20 px-2 py-0.5 rounded-full ml-1 font-semibold">
            Max SA ₹10L
          </span>
        </button>
      </div>
    </div>
  )
}
