import { PliQuoteResult } from '@/lib/pli'
import { RpliQuoteResult } from '@/lib/rpli'

interface AuditBreakdownProps {
  showBreakdown: boolean
  onToggleBreakdown: () => void
  quotationResult: PliQuoteResult | RpliQuoteResult
}

export function AuditBreakdown({
  showBreakdown,
  onToggleBreakdown,
  quotationResult,
}: AuditBreakdownProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden no-print">
      <button
        onClick={onToggleBreakdown}
        type="button"
        className="w-full p-4 text-left font-bold text-sm text-(--primary-dark) flex items-center justify-between hover:bg-slate-50 cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <i className="ri-calculator-line text-(--primary-red)"></i>
          How was this calculated? (Auditable Trace)
        </span>
        <i className={showBreakdown ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}></i>
      </button>

      {showBreakdown && (
        <div className="p-4 pt-0 border-t border-slate-100 space-y-4 text-xs">
          {quotationResult.breakdown.map((step, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-1">
              <p className="font-bold text-(--primary-dark)">{step.title}</p>
              <p className="text-slate-500 font-mono">{step.formula}</p>
              <p className="text-slate-700">
                <strong>Values:</strong> {step.values}
              </p>
              <p className="text-(--primary-red) font-bold">
                <strong>Result:</strong> {step.result}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
