import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-(--bg-light) flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-(--primary-red)/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-(--accent-gold)/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full text-center space-y-8 relative z-10">
        {/* Emblem & 404 Hero Graphic */}
        <div className="inline-flex flex-col items-center">
          <div className="relative">
            <span className="text-8xl md:text-9xl font-black text-slate-200 select-none tracking-tighter">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-(--primary-red) to-[#961b2d] flex items-center justify-center text-white shadow-lg border-2 border-(--accent-gold) animate-pulse-glow">
                <i className="ri-compass-3-fill text-3xl text-(--accent-gold)"></i>
              </div>
            </div>
          </div>
          <span className="px-4 py-1.5 rounded-full bg-(--primary-red)/10 text-(--primary-red) text-xs font-bold uppercase tracking-wider mt-2 border border-(--primary-red)/20">
            Resource Relocated or Missing
          </span>
        </div>

        {/* Title & Explainer */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-extrabold text-(--primary-dark) tracking-tight">
            Looking for a Postal Life Insurance Page?
          </h1>
          <p className="text-sm md:text-base text-(--text-light) leading-relaxed">
            The policy document or URL you requested could not be located. Explore our official schemes, calculate sovereign guaranteed quotations, or return to the main portal.
          </p>
        </div>

        {/* Quick Shortcut Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
          {[
            {
              title: 'Premium Calculator',
              desc: 'Instant actuarial quotes',
              href: '/calculator',
              icon: 'ri-calculator-line',
              color: 'text-(--primary-red)',
            },
            {
              title: 'All Schemes',
              desc: 'PLI & RPLI policy portfolio',
              href: '/schemes',
              icon: 'ri-shield-star-line',
              color: 'text-(--accent-gold)',
            },
            {
              title: 'Bonus Rates',
              desc: 'Declared up to ₹76/₹1,000',
              href: '/bonus-rates',
              icon: 'ri-line-chart-line',
              color: 'text-emerald-600',
            },
            {
              title: 'Helpdesk & FAQ',
              desc: 'Claims, loans & eligibility',
              href: '/faq',
              icon: 'ri-questionnaire-line',
              color: 'text-blue-600',
            },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-(--accent-gold) shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl mb-3 group-hover:bg-(--accent-gold)/10 transition-colors">
                <i className={`${card.icon} ${card.color}`}></i>
              </div>
              <h2 className="text-sm font-bold text-(--primary-dark) group-hover:text-(--primary-red) transition-colors">
                {card.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">{card.desc}</p>
            </Link>
          ))}
        </div>

        {/* Primary Action Button */}
        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/"
            className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl">
            <i className="ri-arrow-left-line"></i>
            Return to Home Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
