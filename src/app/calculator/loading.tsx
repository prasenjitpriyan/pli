import React from 'react';

export default function CalculatorLoading() {
  return (
    <div className="min-h-screen bg-(--bg-light) pb-20">
      {/* Header Skeleton */}
      <div className="bg-linear-to-r from-(--primary-dark) to-[#2d3748] text-white py-8 border-b border-white/10">
        <div className="container-custom flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-3">
            <div className="h-8 bg-white/20 rounded-lg w-72 skeleton-shimmer" />
            <div className="h-4 bg-white/10 rounded w-96 skeleton-shimmer" />
          </div>
          <div className="h-10 bg-white/10 rounded-full w-44 skeleton-shimmer" />
        </div>
      </div>

      {/* Scheme Tab Selector Skeleton */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="container-custom flex justify-center gap-4">
          <div className="h-11 w-48 rounded-full bg-slate-200 skeleton-shimmer" />
          <div className="h-11 w-48 rounded-full bg-slate-200 skeleton-shimmer" />
        </div>
      </div>

      {/* Main Grid Skeleton */}
      <section className="py-8 px-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Column Skeleton */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="h-6 w-60 bg-slate-200 rounded skeleton-shimmer" />
                <div className="h-4 w-20 bg-slate-200 rounded skeleton-shimmer" />
              </div>

              {/* Policy Selector Cards Skeleton */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-24 rounded-xl bg-slate-100 border border-slate-200/80 p-3 space-y-2">
                    <div className="h-4 bg-slate-200 rounded skeleton-shimmer w-3/4" />
                    <div className="h-3 bg-slate-200 rounded skeleton-shimmer w-1/2" />
                  </div>
                ))}
              </div>

              {/* Form Input Skeletons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-12 bg-slate-100 rounded-lg skeleton-shimmer" />
                <div className="h-12 bg-slate-100 rounded-lg skeleton-shimmer" />
                <div className="h-12 bg-slate-100 rounded-lg skeleton-shimmer" />
                <div className="h-12 bg-slate-100 rounded-lg skeleton-shimmer" />
              </div>
            </div>

            {/* Premium Summary Column Skeleton */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-linear-to-br from-(--primary-dark) to-[#2d3748] rounded-3xl p-6 md:p-8 text-white space-y-6 shadow-xl">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="h-5 w-40 bg-white/20 rounded skeleton-shimmer" />
                  <div className="h-6 w-24 bg-white/20 rounded-full skeleton-shimmer" />
                </div>
                <div className="text-center py-6 space-y-3">
                  <div className="h-4 w-32 bg-white/20 rounded mx-auto skeleton-shimmer" />
                  <div className="h-12 w-56 bg-white/30 rounded-xl mx-auto skeleton-shimmer" />
                </div>
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="h-4 bg-white/10 rounded skeleton-shimmer w-full" />
                  <div className="h-4 bg-white/10 rounded skeleton-shimmer w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
