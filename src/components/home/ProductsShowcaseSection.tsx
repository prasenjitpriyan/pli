import Link from 'next/link'
import { PliEmblemSvg } from '../common/PliLogo'

const PLI_PRODUCTS = [
  {
    title: 'Suraksha',
    sub: 'Whole Life Assurance',
    slug: 'suraksha',
    scheme: 'pli',
    bonus: '₹76/₹1k',
    color: 'from-blue-600 to-blue-800',
    desc: 'Cover up to age 80 with highest bonus rate.',
  },
  {
    title: 'Santosh',
    sub: 'Endowment Assurance',
    slug: 'santosh',
    scheme: 'pli',
    bonus: '₹52/₹1k',
    color: 'from-green-600 to-green-800',
    desc: 'Matures at ages 35, 40, 45, 50, 55, 58, 60.',
  },
  {
    title: 'Suvidha',
    sub: 'Convertible Whole Life',
    slug: 'suvidha',
    scheme: 'pli',
    bonus: '₹76/₹1k',
    color: 'from-purple-600 to-purple-800',
    desc: 'Convertible to Endowment after 5 years.',
  },
  {
    title: 'Sumangal',
    sub: 'Anticipated Endowment',
    slug: 'sumangal',
    scheme: 'pli',
    bonus: '₹48/₹1k',
    color: 'from-orange-500 to-red-600',
    desc: 'Periodic money back schedule (60% SA periodic).',
  },
  {
    title: 'Yugal Suraksha',
    sub: 'Joint Life Assurance',
    slug: 'yugal-suraksha',
    scheme: 'pli',
    bonus: '₹52/₹1k',
    color: 'from-pink-600 to-rose-700',
    desc: 'Joint cover for policyholder and spouse.',
  },
  {
    title: 'Bal Jeevan Bima',
    sub: 'Children Policy',
    slug: 'bal-jeevan-bima',
    scheme: 'pli',
    bonus: '₹52/₹1k',
    color: 'from-teal-500 to-cyan-700',
    desc: 'Child cover with 100% Premium Waiver on parent death.',
  },
]

const RPLI_PRODUCTS = [
  {
    title: 'Gram Suraksha',
    sub: 'RPLI Whole Life Assurance',
    slug: 'gram-suraksha',
    scheme: 'rpli',
    bonus: '₹60/₹1k',
    color: 'from-emerald-600 to-teal-800',
    desc: 'RPLI Whole Life assurance up to age 80.',
  },
  {
    title: 'Gram Suvidha',
    sub: 'RPLI Convertible Whole Life',
    slug: 'gram-suvidha',
    scheme: 'rpli',
    bonus: '₹60/₹1k',
    color: 'from-purple-600 to-indigo-800',
    desc: 'Convertible to Gram Santosh after 5 years.',
  },
  {
    title: 'Gram Santosh',
    sub: 'RPLI Endowment Assurance',
    slug: 'gram-santosh',
    scheme: 'rpli',
    bonus: '₹48/₹1k',
    color: 'from-amber-600 to-yellow-700',
    desc: 'Endowment plan with 7 preset maturity age options.',
  },
  {
    title: 'Gram Priya',
    sub: '10-Yr Short Term Money Back',
    slug: 'gram-priya',
    scheme: 'rpli',
    bonus: '₹45/₹1k',
    color: 'from-rose-500 to-red-700',
    desc: 'Fixed 10-Yr Money Back with Natural Calamity relief feature.',
  },
  {
    title: 'Gram Sumangal',
    sub: 'RPLI Anticipated Endowment',
    slug: 'gram-sumangal',
    scheme: 'rpli',
    bonus: '₹45/₹1k',
    color: 'from-orange-500 to-amber-700',
    desc: 'RPLI Money Back policy (15 or 20 year terms).',
  },
  {
    title: 'Bal Jeevan Bima',
    sub: 'RPLI Children Policy',
    slug: 'bal-jeevan-bima',
    scheme: 'rpli',
    bonus: '₹48/₹1k',
    color: 'from-teal-500 to-cyan-700',
    desc: 'Child cover up to ₹1 Lakh with Parent Death Premium Waiver.',
  },
]

export function ProductsShowcaseSection() {
  return (
    <section className="py-20 md:py-24 px-6 bg-white" id="products">
      <div className="container-custom">
        <h2 className="section-title">Complete 12-Product Insurance Suite</h2>

        {/* PLI Product Suite */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3.5">
              <div className="p-1 rounded-xl bg-slate-50 border border-slate-200 shadow-xs shrink-0 flex items-center justify-center">
                <PliEmblemSvg variant="pli" className="w-10 h-11" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-(--primary-dark) flex items-center gap-2">
                  Postal Life Insurance (PLI)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  For Govt, PSU, Defense, Educational Staff & Professionals | Max SA ₹50 Lakhs
                </p>
              </div>
            </div>
            <Link
              href="/calculator?scheme=pli"
              className="text-xs font-bold text-(--primary-red) hover:underline"
            >
              Open PLI Calculator →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLI_PRODUCTS.map((prod, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-2 bg-linear-to-r ${prod.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-(--primary-dark)">{prod.title}</h4>
                    <span className="text-[0.65rem] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Bonus {prod.bonus}
                    </span>
                  </div>
                  <p className="text-xs text-(--primary-red) font-semibold uppercase tracking-wide mb-3">
                    {prod.sub}
                  </p>
                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">{prod.desc}</p>
                  <Link
                    href={`/calculator?scheme=${prod.scheme}&policy=${prod.slug}`}
                    className="inline-flex items-center text-xs font-bold text-(--primary-red) hover:underline"
                  >
                    Calculate Premium{' '}
                    <i className="ri-arrow-right-line ml-1.5 transform group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RPLI Product Suite */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3.5">
              <div className="p-1 rounded-xl bg-slate-50 border border-slate-200 shadow-xs shrink-0 flex items-center justify-center">
                <PliEmblemSvg variant="rpli" className="w-10 h-11" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-emerald-950 flex items-center gap-2">
                  Rural Postal Life Insurance (RPLI)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  For Rural Residents, Farmers, Artisans & Small Business Owners | Max SA ₹10 Lakhs
                </p>
              </div>
            </div>
            <Link
              href="/calculator?scheme=rpli"
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Open RPLI Calculator →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RPLI_PRODUCTS.map((prod, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-2 bg-linear-to-r ${prod.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-emerald-950">{prod.title}</h4>
                    <span className="text-[0.65rem] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Bonus {prod.bonus}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide mb-3">
                    {prod.sub}
                  </p>
                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">{prod.desc}</p>
                  <Link
                    href={`/calculator?scheme=${prod.scheme}&policy=${prod.slug}`}
                    className="inline-flex items-center text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Calculate RPLI Premium{' '}
                    <i className="ri-arrow-right-line ml-1.5 transform group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
