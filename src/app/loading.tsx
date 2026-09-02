import React from 'react';

export default function RootLoading() {
  return (
    <div className="min-h-[85vh] bg-(--bg-light) flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-(--primary-red)/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-(--accent-gold)/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Branded Loader Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md border border-slate-200/80 p-8 md:p-10 rounded-3xl shadow-xl max-w-md w-full text-center flex flex-col items-center">
        {/* Emblem Pulse Graphic */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-(--primary-red) to-[#961b2d] flex items-center justify-center text-white shadow-lg animate-pulse-glow">
            <i className="ri-shield-check-fill text-4xl text-(--accent-gold)"></i>
          </div>
          {/* Orbiting Spinner Ring */}
          <div className="absolute -inset-2 rounded-2xl border-2 border-(--accent-gold)/40 border-t-(--accent-gold) animate-spin" />
        </div>

        {/* Portal Title & Subtitle */}
        <h2 className="text-xl md:text-2xl font-black text-(--primary-dark) tracking-tight mb-2">
          Postal Life Insurance
        </h2>
        <p className="text-xs uppercase tracking-wider font-semibold text-(--accent-gold) mb-6 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-(--accent-gold) animate-ping" />
          Government of India • Estd. 1884
        </p>

        {/* Shimmering Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
          <div className="h-full bg-linear-to-r from-(--primary-red) via-(--accent-gold) to-(--primary-red) rounded-full skeleton-shimmer w-full" />
        </div>

        {/* Reassurance Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/60 rounded-full px-4 py-1.5 text-xs text-slate-600 font-medium">
          <i className="ri-lock-2-line text-emerald-600"></i>
          <span>100% Sovereign Guaranteed Portal</span>
        </div>
      </div>

      {/* Skeleton Previews in Background Grid */}
      <div className="max-w-5xl w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 pointer-events-none">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-6 border border-slate-200/60 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-200 skeleton-shimmer" />
            <div className="h-5 bg-slate-200 rounded-md skeleton-shimmer w-3/4" />
            <div className="h-3 bg-slate-200 rounded-md skeleton-shimmer w-full" />
            <div className="h-3 bg-slate-200 rounded-md skeleton-shimmer w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
