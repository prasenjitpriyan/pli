interface ValidationNoticeProps {
  scheme: 'PLI' | 'RPLI'
}

export function ValidationNotice({ scheme }: ValidationNoticeProps) {
  return (
    <div className="container-custom pt-4 no-print">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3">
        <i className="ri-error-warning-fill text-amber-600 text-xl shrink-0 mt-0.5"></i>
        <div>
          <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide">
            Indicative {scheme} Calculation Disclaimer
          </h4>
          <p className="text-amber-800 text-xs md:text-sm mt-0.5 leading-relaxed">
            This calculator provides an indicative calculation based on configured {scheme} rules
            and rates. Final premium and benefits are subject to official India Post quotation and
            applicable rules at the time of policy issuance.
          </p>
        </div>
      </div>
    </div>
  )
}
