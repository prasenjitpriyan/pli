'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service or console
    console.error('PLI Portal Exception Captured:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] bg-(--bg-light) flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Top Header Strip */}
        <div className="bg-linear-to-r from-(--primary-red) to-[#961b2d] px-8 py-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20">
              <i className="ri-error-warning-fill text-(--accent-gold)"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold">Unable to Complete Request</h1>
              <p className="text-xs text-white/80 font-medium">
                Postal Life Insurance Security & Reliability Layer
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-white/15 rounded-full text-xs font-semibold tracking-wide uppercase border border-white/20">
            System Notice
          </span>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-(--primary-dark)">
              An unexpected system error occurred
            </h2>
            <p className="text-sm text-(--text-light) leading-relaxed">
              We encountered a temporary issue while processing this view. Your policy calculations and data remain safe with sovereign assurance. Please retry or navigate back to the home page.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => reset()}
              type="button"
              className="px-6 py-3 rounded-full bg-(--primary-red) hover:bg-[#b01c2f] text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer">
              <i className="ri-restart-line text-lg"></i>
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-(--accent-gold) hover:bg-[#b5923b] text-(--primary-dark) font-bold text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95">
              <i className="ri-home-4-line text-lg"></i>
              Return to Home
            </Link>
            <Link
              href="/calculator"
              className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-(--primary-dark) font-semibold text-sm flex items-center gap-2 transition-all">
              <i className="ri-calculator-line text-lg"></i>
              Open Calculator
            </Link>
          </div>

          {/* Emergency Assistance & Contacts */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mt-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-(--text-dark) flex items-center gap-2">
              <i className="ri-customer-service-2-fill text-(--primary-red)"></i>
              Direct Assistance & Support Contacts
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <a
                href="https://wa.me/919038332076?text=Hello%2C%20I%20faced%20an%20issue%20on%20the%20PLI%20portal%2C%20please%20assist%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-[#25D366] flex items-center gap-2 font-medium transition-colors">
                <i className="ri-whatsapp-fill text-[#25D366] text-base"></i>
                <span>WhatsApp: 9038332076</span>
              </a>
              <a
                href="https://wa.me/918620935473?text=Hello%2C%20I%20faced%20an%20issue%20on%20the%20PLI%20portal%2C%20please%20assist%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-[#25D366] flex items-center gap-2 font-medium transition-colors">
                <i className="ri-whatsapp-fill text-[#25D366] text-base"></i>
                <span>WhatsApp: 8620935473</span>
              </a>
              <a
                href="tel:9038332076"
                className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-(--primary-red) flex items-center gap-2 font-medium transition-colors">
                <i className="ri-phone-line text-(--primary-red) text-sm"></i>
                Call: 9038332076 / 8620935473
              </a>
              <a
                href="mailto:prasenjitpriyan@gmail.com"
                className="p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-(--primary-red) flex items-center gap-2 font-medium transition-colors">
                <i className="ri-mail-line text-(--primary-red) text-sm"></i>
                prasenjitpriyan@gmail.com
              </a>
            </div>
          </div>

          {/* Diagnostic Details Accordion */}
          <div className="pt-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-slate-500 hover:text-(--primary-dark) flex items-center gap-1.5 font-medium cursor-pointer transition-colors">
              <i className={`ri-arrow-${showDetails ? 'down' : 'right'}-s-line text-sm`}></i>
              {showDetails ? 'Hide technical diagnostics' : 'Show technical diagnostics'}
            </button>
            {showDetails && (
              <div className="mt-3 p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono overflow-x-auto space-y-2 border border-slate-800">
                <p className="text-rose-400 font-semibold">{error.message || 'Unknown runtime error'}</p>
                {error.digest && (
                  <p className="text-slate-400">Error Digest: {error.digest}</p>
                )}
                {error.stack && (
                  <pre className="text-[11px] text-slate-400 whitespace-pre-wrap leading-tight mt-2">
                    {error.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
