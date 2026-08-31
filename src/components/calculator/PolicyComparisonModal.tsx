import { formatINR, PliQuoteResult } from '@/lib/pli'
import { RpliQuoteResult } from '@/lib/rpli'

interface PolicyComparisonModalProps {
  isOpen: boolean
  onClose: () => void
  scheme: 'PLI' | 'RPLI'
  computedAge: number
  sumAssured: number
  comparisonResults: (PliQuoteResult | RpliQuoteResult)[]
}

export function PolicyComparisonModal({
  isOpen,
  onClose,
  scheme,
  computedAge,
  sumAssured,
  comparisonResults,
}: PolicyComparisonModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 no-print">
      <div className="bg-white rounded-2xl max-w-5xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-xl font-bold text-(--primary-dark)">
              {scheme} Policy Options Comparison
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Effective Age {computedAge} years | Sum Assured {formatINR(sumAssured)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-(--primary-dark) text-white">
                <th className="p-3 font-semibold">Policy Name</th>
                <th className="p-3 font-semibold text-right">Bonus Rate</th>
                <th className="p-3 font-semibold text-right">Net Monthly</th>
                <th className="p-3 font-semibold text-right">Total Bonus</th>
                <th className="p-3 font-semibold text-right">Maturity Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {comparisonResults.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-(--primary-dark)">{item.policyName}</td>
                  <td className="p-3 text-right">₹{item.bonusRate}/₹1k</td>
                  <td className="p-3 text-right font-bold text-(--primary-red)">
                    {formatINR(item.netMonthlyPremium)}
                  </td>
                  <td className="p-3 text-right text-emerald-600">
                    +{formatINR(item.totalBonus)}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    {formatINR(item.maturityAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
