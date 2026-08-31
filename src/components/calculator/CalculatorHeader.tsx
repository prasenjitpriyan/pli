import Link from 'next/link'

interface CalculatorHeaderProps {
  scheme: 'PLI' | 'RPLI'
  calculationVersion: string
  effectiveDate: string
}

export function CalculatorHeader({
  scheme,
  calculationVersion,
  effectiveDate,
}: CalculatorHeaderProps) {
  return (
    <>
      {/* Printable CSS overrides */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          nav,
          footer,
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .printable-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            break-inside: avoid;
          }
        }
      `,
        }}
      />

      {/* Header Banner */}
      <section className="relative bg-linear-to-r from-[#801323] via-[#5c0f1b] to-[#0f172a] text-white py-12 px-6 overflow-hidden border-b border-red-900/50 no-print">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="container-custom relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[0.68rem] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Official {scheme} Table Engine v{calculationVersion}
              </span>
              <span className="text-[0.68rem] bg-white/10 text-slate-300 border border-white/15 px-2.5 py-1 rounded-full font-bold">
                0% GST Exemption
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
              {scheme === 'RPLI'
                ? 'Rural Postal Life Insurance (RPLI) Calculator'
                : 'Postal Life Insurance (PLI) Calculator'}
            </h1>
            <p className="text-slate-300 text-sm md:text-base font-normal max-w-2xl">
              Strict table-driven premium calculations, official mode rebates, declared bonus rates,
              and an 11-step verifiable mathematical audit trail.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-amber-300 hover:text-white px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md shrink-0"
          >
            <i className="ri-arrow-left-line text-base"></i>
            <span>Back to Portal Overview</span>
          </Link>
        </div>
      </section>

      {/* Printable Header */}
      <div className="hidden print-only p-8 text-center border-b border-gray-300">
        <h1 className="text-3xl font-bold text-gray-900">
          {scheme === 'RPLI' ? 'RURAL POSTAL LIFE INSURANCE' : 'POSTAL LIFE INSURANCE'}
        </h1>
        <p className="text-sm text-gray-600">Official Formula-Based Quotation Statement</p>
        <p className="text-xs text-gray-500 mt-1" suppressHydrationWarning>
          Generated Date: {effectiveDate}
        </p>
      </div>
    </>
  )
}
