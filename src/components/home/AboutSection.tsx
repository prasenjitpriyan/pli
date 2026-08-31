export function AboutSection() {
  return (
    <section className="py-20 md:py-24 px-6 relative" id="about">
      <div className="container-custom">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-(--shadow-card) border border-slate-100 animate-on-scroll">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-(--primary-red)"></span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-(--primary-red)">
              Legacy of Trust & Sovereign Assurance
            </span>
          </div>
          <h2 className="section-title mb-8 text-left">140+ Years of Financial Security</h2>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-5">
              <p className="text-base md:text-lg text-(--text-dark) leading-relaxed">
                Established on <strong className="text-(--primary-red)">1st February 1884</strong>
                , Postal Life Insurance (PLI) is the oldest life insurer in India. Originally
                introduced as a welfare scheme for Post Office employees, it has expanded to cover
                central and state government staff, defense personnel, public sector employees,
                educational institution staff, professionals, and rural citizens under Rural
                Postal Life Insurance (RPLI).
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Unlike commercial life insurance companies, PLI & RPLI operate with an ultra-low
                administrative cost ratio because services are delivered through the extensive
                network of over 1.5 Lakh post offices across India. These administrative cost
                savings are directly passed on to policyholders as{' '}
                <strong>the highest bonus rates in the insurance industry</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                  <i className="ri-shield-keyhole-line text-emerald-600 text-2xl shrink-0 mt-1"></i>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">Sovereign Guarantee</h4>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      100% capital & returns guaranteed by the Union Government of India under PLI
                      rules.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-start gap-3">
                  <i className="ri-percent-line text-purple-600 text-2xl shrink-0 mt-1"></i>
                  <div>
                    <h4 className="font-bold text-purple-950 text-sm">GST Free Status</h4>
                    <p className="text-xs text-purple-800 mt-0.5">
                      Effective 22.09.2025, PLI/RPLI premium payments are 100% GST Exempt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-linear-to-br from-(--primary-dark) via-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-(--accent-gold) opacity-10 rounded-full blur-2xl"></div>

                <h3 className="text-2xl font-bold text-(--accent-gold) border-b border-white/10 pb-4 flex items-center justify-between">
                  <span>The Cost Savings Advantage</span>
                  <i className="ri-line-chart-line text-2xl"></i>
                </h3>

                <div className="space-y-4 text-sm text-slate-200">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span>Expense Ratio Comparison:</span>
                    <span className="font-bold text-emerald-400">PLI ~5% vs Private ~20%</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span>Maximum Whole Life Bonus:</span>
                    <span className="font-bold text-(--accent-gold)">₹76 / ₹1,000 SA</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span>Tax Deductions (Sec 80C):</span>
                    <span className="font-bold text-white">Up to ₹1,50,000 / yr</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span>Maturity Tax Exemption:</span>
                    <span className="font-bold text-emerald-400">
                      100% Tax-Free under Sec 10(10D)
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs text-slate-300 leading-relaxed">
                  💡 <strong>Pro Tip:</strong> By eliminating agent commissions and third-party
                  overheads, PLI policyholders receive up to{' '}
                  <strong>30-40% higher net maturity payouts</strong> compared to conventional
                  commercial plans.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
