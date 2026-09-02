'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { calculatePliQuote, mapToCanonicalPolicy } from '@/lib/pli';
import { calculateRpliQuote, mapToCanonicalRpliPolicy } from '@/lib/rpli';
import AnimatedCounter from '@/components/common/AnimatedCounter';

export function QuickCalculatorWidget() {
  const [previewScheme, setPreviewScheme] = useState<'PLI' | 'RPLI'>('PLI');
  const [previewPolicy, setPreviewPolicy] = useState<string>('SANTOSH');
  const [previewAge, setPreviewAge] = useState<number>(30);
  const [previewSumAssured, setPreviewSumAssured] = useState<number>(500000);

  // Quick Calculator Preview Calculation
  const previewQuote = useMemo(() => {
    if (previewScheme === 'RPLI') {
      return calculateRpliQuote({
        scheme: 'RPLI',
        policyType: mapToCanonicalRpliPolicy(previewPolicy),
        age: previewAge,
        sumAssured: Math.min(previewSumAssured, 1000000),
        duration: previewPolicy.includes('PRIYA') ? 10 : 20,
      });
    }
    return calculatePliQuote({
      policyType: mapToCanonicalPolicy(previewPolicy),
      age: previewAge,
      sumAssured: Math.min(previewSumAssured, 5000000),
      duration: 20,
    });
  }, [previewScheme, previewPolicy, previewAge, previewSumAssured]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-white/95 backdrop-blur-2xl text-slate-900 rounded-2xl p-5 lg:p-5.5 shadow-[0_15px_40px_rgba(0,0,0,0.35)] border border-white/60 relative overflow-hidden">
      {/* Header Gradient Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-red-600 via-amber-400 to-emerald-500"></div>

      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-red-700 flex items-center gap-1">
            <i className="ri-flashlight-fill text-amber-500 text-xs"></i> Live Quotation Estimator
          </span>
          <p className="text-[0.65rem] text-slate-500 font-medium">
            Table-driven official rate engine
          </p>
        </div>
        <span className="text-[0.62rem] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span> Live Rate
        </span>
      </div>

      {/* Scheme Toggle Pill with Motion Shared Layout */}
      <div className="grid grid-cols-2 gap-1.5 mb-3 bg-slate-100 p-1 rounded-lg border border-slate-200 relative">
        <button
          type="button"
          onClick={() => {
            setPreviewScheme('PLI');
            setPreviewPolicy('SANTOSH');
          }}
          className={`relative py-1.5 px-2 rounded-md text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer z-10 ${
            previewScheme === 'PLI' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}>
          {previewScheme === 'PLI' && (
            <motion.div
              layoutId="quickCalcScheme"
              className="absolute inset-0 bg-red-700 rounded-md shadow-xs -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
          )}
          <span>PLI</span>
          <span className="text-[0.62rem] opacity-80 font-normal">(Govt/Urban)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setPreviewScheme('RPLI');
            setPreviewPolicy('GRAM_SANTOSH');
          }}
          className={`relative py-1.5 px-2 rounded-md text-xs font-extrabold transition-all flex items-center justify-center gap-1 cursor-pointer z-10 ${
            previewScheme === 'RPLI' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
          }`}>
          {previewScheme === 'RPLI' && (
            <motion.div
              layoutId="quickCalcScheme"
              className="absolute inset-0 bg-emerald-700 rounded-md shadow-xs -z-10"
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            />
          )}
          <span>RPLI</span>
          <span className="text-[0.62rem] opacity-80 font-normal">(Rural Life)</span>
        </button>
      </div>

      <div className="space-y-2.5 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-0.5 text-[0.72rem]">
            Select Policy Plan
          </label>
          <select
            value={previewPolicy}
            onChange={(e) => setPreviewPolicy(e.target.value)}
            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:border-red-600 focus:bg-white outline-none transition-all cursor-pointer">
            {previewScheme === 'PLI' ? (
              <>
                <option value="SANTOSH">Santosh — Endowment Assurance (EA)</option>
                <option value="SURAKSHA">Suraksha — Whole Life Assurance (WLA)</option>
                <option value="SUVIDHA">Suvidha — Convertible Whole Life (CWLA)</option>
                <option value="SUMANGAL">Sumangal — Anticipated Endowment (AEA)</option>
                <option value="YUGAL_SURAKSHA">Yugal Suraksha — Joint Life (JLEA)</option>
                <option value="BAL_JEEVAN_BIMA">Bal Jeevan Bima — Children Policy</option>
              </>
            ) : (
              <>
                <option value="GRAM_SANTOSH">Gram Santosh — RPLI Endowment (EA)</option>
                <option value="GRAM_SURAKSHA">Gram Suraksha — RPLI Whole Life (WLA)</option>
                <option value="GRAM_SUVIDHA">Gram Suvidha — RPLI Convertible (CWLA)</option>
                <option value="GRAM_PRIYA">Gram Priya — 10-Year Money Back</option>
                <option value="GRAM_SUMANGAL">Gram Sumangal — RPLI Anticipated (AEA)</option>
                <option value="BAL_JEEVAN_BIMA">Bal Jeevan Bima — RPLI Children</option>
              </>
            )}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="flex items-center justify-between font-bold text-slate-700 mb-0.5 text-[0.72rem]">
              <span>Age (ANB)</span>
              <span className="text-[0.62rem] text-slate-400 font-normal">Next B&apos;day</span>
            </label>
            <input
              type="number"
              min="19"
              max="55"
              value={previewAge}
              onChange={(e) => setPreviewAge(parseInt(e.target.value, 10) || 30)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 outline-none focus:border-red-600 focus:bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-0.5 text-[0.72rem]">
              Sum Assured (₹)
            </label>
            <input
              type="number"
              step="50000"
              min="10000"
              max={previewScheme === 'RPLI' ? 1000000 : 5000000}
              value={previewSumAssured}
              onChange={(e) => setPreviewSumAssured(parseInt(e.target.value, 10) || 500000)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 outline-none focus:border-red-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Sum Assured Quick Chips with Spring Tap */}
        <div className="flex gap-1">
          {(previewScheme === 'RPLI'
            ? [100000, 500000, 1000000]
            : [500000, 1000000, 2000000]
          ).map((presetVal) => (
            <motion.button
              key={presetVal}
              type="button"
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setPreviewSumAssured(presetVal)}
              className={`flex-1 py-1 rounded-md text-[0.65rem] font-bold border transition-all cursor-pointer ${
                previewSumAssured === presetVal
                  ? 'bg-slate-900 text-amber-300 border-slate-900'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}>
              ₹{presetVal >= 100000 ? `${presetVal / 100000}L` : presetVal}
            </motion.button>
          ))}
        </div>

        {/* Calculated Quote Output Preview Card with Live Animated Counter */}
        <div className="p-3 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white rounded-xl space-y-2 mt-2 shadow-md border border-slate-700/50">
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-[0.68rem] font-medium">Monthly Net Premium:</span>
            <span className="font-black text-amber-400 text-lg tracking-tight">
              <AnimatedCounter
                value={previewQuote.netMonthlyPremium}
                prefix="₹"
                formatIndian
                duration={0.8}
              />
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-300 text-[0.68rem]">
            <span>Declared Bonus Rate:</span>
            <span className="font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
              ₹{previewQuote.bonusRate} / ₹1k SA / yr
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-300 border-t border-white/10 pt-1.5 font-bold">
            <span className="text-[0.68rem]">Est. Maturity Return:</span>
            <span className="text-white text-sm font-extrabold">
              <AnimatedCounter
                value={previewQuote.maturityAmount}
                prefix="₹"
                formatIndian
                duration={0.9}
              />
            </span>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={`/calculator?scheme=${previewScheme.toLowerCase()}&policy=${previewPolicy.toLowerCase().replace('_', '-')}`}
            className="w-full py-2.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold rounded-lg text-center text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5">
            <span>Open Comprehensive 11-Step Calculator</span>
            <i className="ri-arrow-right-line"></i>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
