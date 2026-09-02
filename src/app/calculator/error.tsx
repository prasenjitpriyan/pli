'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function CalculatorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Calculator calculation error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] bg-(--bg-light) flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto text-3xl">
          <i className="ri-calculator-line"></i>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-(--primary-dark)">
            Calculator Calculation Error
          </h2>
          <p className="text-sm text-slate-600">
            We were unable to compute the actuarial table quote for the selected parameters. Resetting the form will restore standard official table values.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-(--primary-red) hover:bg-[#b01c2f] text-white text-sm font-semibold cursor-pointer transition-all shadow-md">
            Reset Parameters
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-(--primary-dark) text-sm font-medium transition-all">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
