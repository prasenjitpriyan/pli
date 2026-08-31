const BONUS_RATES_DATA = [
  { name: 'Suraksha (Whole Life Assurance)', scheme: 'PLI', rate: '₹76 / Year' },
  {
    name: 'Suvidha (Convertible Whole Life - Unconverted)',
    scheme: 'PLI',
    rate: '₹76 / Year',
  },
  { name: 'Gram Suraksha (RPLI Whole Life)', scheme: 'RPLI', rate: '₹60 / Year' },
  {
    name: 'Gram Suvidha (RPLI Convertible - Unconverted)',
    scheme: 'RPLI',
    rate: '₹60 / Year',
  },
  { name: 'Santosh (Endowment Assurance)', scheme: 'PLI', rate: '₹52 / Year' },
  {
    name: 'Yugal Suraksha (Joint Life Assurance)',
    scheme: 'PLI',
    rate: '₹52 / Year',
  },
  {
    name: 'Bal Jeevan Bima (PLI Children Policy)',
    scheme: 'PLI',
    rate: '₹52 / Year',
  },
  { name: 'Sumangal (Anticipated Endowment)', scheme: 'PLI', rate: '₹48 / Year' },
  { name: 'Gram Santosh (RPLI Endowment)', scheme: 'RPLI', rate: '₹48 / Year' },
  {
    name: 'Gram Bal Jeevan Bima (RPLI Children Policy)',
    scheme: 'RPLI',
    rate: '₹48 / Year',
  },
  {
    name: 'Gram Priya (10-Yr Rural Money Back)',
    scheme: 'RPLI',
    rate: '₹45 / Year',
  },
  {
    name: 'Gram Sumangal (RPLI Anticipated Endowment)',
    scheme: 'RPLI',
    rate: '₹45 / Year',
  },
]

export function BonusRatesSection() {
  return (
    <section className="py-20 px-6 bg-(--bg-light)" id="rates">
      <div className="container-custom">
        <h2 className="section-title">Official Declared Bonus Rates</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 text-sm">
          Comparison of official declared bonus rates per ₹1,000 Sum Assured per annum across PLI
          and RPLI policies.
        </p>

        <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-3xl shadow-lg border border-slate-200 animate-on-scroll">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-(--primary-dark) text-white">
                <th className="p-4 md:p-5 font-semibold">Policy Name</th>
                <th className="p-4 md:p-5 font-semibold">Scheme</th>
                <th className="p-4 md:p-5 font-semibold text-right">Bonus Rate per ₹1,000 SA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {BONUS_RATES_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 md:p-5 font-bold">{row.name}</td>
                  <td className="p-4 md:p-5">
                    <span
                      className={`px-2 py-0.5 rounded text-[0.7rem] font-bold ${
                        row.scheme === 'PLI'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {row.scheme}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 text-right font-extrabold text-(--primary-red)">
                    {row.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
