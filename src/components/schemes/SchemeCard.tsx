'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { fadeUpVariant } from '@/lib/animations';
import { CardSvgBackground } from './CardSvgBackground';

export interface PolicyDetail {
  id: string;
  scheme: 'PLI' | 'RPLI';
  name: string;
  hindiName: string;
  type: string;
  bonusRate: string;
  minAge: number;
  maxAge: number;
  minSA: string;
  maxSA: string;
  loanAfter: string;
  surrenderAfter: string;
  description: string;
  highlights: string[];
  recommendedFor: string;
  calculatorPolicyId: string;
}

export function SchemeCard({ policy }: { policy: PolicyDetail }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse spotlight coordinates tracking cursor smoothly across card surface
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(200);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const isPli = policy.scheme === 'PLI';

  // Dynamic radial gradient spotlight following cursor coordinates
  const spotlightBg = isPli
    ? useMotionTemplate`radial-gradient(350px circle at ${springX}px ${springY}px, rgba(217, 35, 59, 0.12), transparent 80%)`
    : useMotionTemplate`radial-gradient(350px circle at ${springX}px ${springY}px, rgba(16, 185, 129, 0.12), transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUpVariant}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group w-full">
      {/* 1. High-Performance Animated Background SVG Component */}
      <CardSvgBackground
        id={policy.id}
        scheme={policy.scheme}
        isHovered={isHovered}
        spotlightBg={spotlightBg}
      />

      {/* 2. Front Card Content with High Legibility & Responsive Spacing */}
      <div className="relative z-10 flex flex-col grow">
        {/* Card Header Section: Fluid responsive padding p-4 sm:p-6 */}
        <div className="p-4 sm:p-6 border-b border-slate-100/80 space-y-3">
          {/* Top Badges Row: flex-wrap ensures no overflow on narrow mobile screens (320px+) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`text-[10px] sm:text-[11px] font-black tracking-wider uppercase px-2.5 sm:px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 ${
                isPli
                  ? 'bg-rose-50 text-(--primary-red) border border-red-200/60'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
              }`}>
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  isPli ? 'bg-(--primary-red)' : 'bg-emerald-600'
                }`}
              />
              <span className="truncate max-w-50 sm:max-w-none">
                {policy.scheme} • {policy.type}
              </span>
            </span>

            <span className="text-[11px] sm:text-xs font-black text-amber-900 bg-linear-to-r from-amber-50 to-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300/60 shadow-xs flex items-center gap-1 shrink-0 ml-auto sm:ml-0">
              <i className="ri-award-fill text-(--accent-gold)"></i>
              <span>{policy.bonusRate}</span>
            </span>
          </div>

          {/* Title and Hindi Subtitle */}
          <div>
            <h2 className="text-lg sm:text-xl font-black text-(--primary-dark) group-hover:text-(--primary-red) transition-colors flex items-start justify-between gap-2">
              <span className="wrap-break-word leading-tight">{policy.name}</span>
              <i className="ri-arrow-right-up-line opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-(--primary-red) text-base sm:text-lg shrink-0 mt-0.5"></i>
            </h2>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-400 mt-1 tracking-wide wrap-break-word">
              {policy.hindiName}
            </p>
          </div>

          {/* Full description without clipping to ensure accessibility */}
          <p className="text-xs text-slate-600 leading-relaxed wrap-break-word">
            {policy.description}
          </p>
        </div>

        {/* Specifications Matrix: Responsive 2-column grid */}
        <div className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-100/80 grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
          <div className="bg-white/90 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs backdrop-blur-xs min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
              Age Eligibility
            </span>
            <span className="font-extrabold text-(--primary-dark) text-xs sm:text-sm block mt-0.5 truncate">
              {policy.minAge} – {policy.maxAge} Yrs
            </span>
          </div>

          <div className="bg-white/90 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs backdrop-blur-xs min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
              Max Sum Assured
            </span>
            <span className="font-extrabold text-(--primary-dark) text-xs sm:text-sm block mt-0.5 truncate">
              {policy.maxSA}
            </span>
          </div>

          <div className="bg-white/90 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs backdrop-blur-xs min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
              Loan Facility
            </span>
            <span className="font-extrabold text-(--primary-dark) text-xs sm:text-sm block mt-0.5 truncate">
              {policy.loanAfter}
            </span>
          </div>

          <div className="bg-white/90 p-2.5 sm:p-3 rounded-xl border border-slate-200/80 shadow-2xs backdrop-blur-xs min-w-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
              Surrender Facility
            </span>
            <span className="font-extrabold text-(--primary-dark) text-xs sm:text-sm block mt-0.5 truncate">
              {policy.surrenderAfter}
            </span>
          </div>
        </div>

        {/* Key Feature Highlights */}
        <div className="p-4 sm:p-6 space-y-2.5 grow">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Policy Highlights
          </span>
          <div className="space-y-2">
            {policy.highlights.map((h, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <i className="ri-checkbox-circle-fill text-emerald-500 mt-0.5 shrink-0 text-sm"></i>
                <span className="leading-snug wrap-break-word flex-1 min-w-0">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Card Footer with Tactile Action Trigger */}
      <div className="relative z-10 p-4 sm:p-6 pt-0 mt-auto">
        <div className="mb-3.5 sm:mb-4 p-3 bg-amber-50/80 rounded-xl border border-amber-200/60 text-[11px] text-amber-950 flex items-start gap-2 shadow-2xs">
          <i className="ri-user-heart-line text-amber-700 mt-0.5 shrink-0 text-sm"></i>
          <span className="leading-snug wrap-break-word flex-1 min-w-0">
            <strong className="font-bold">Recommended:</strong> {policy.recommendedFor}
          </span>
        </div>

        <Link
          href={`/calculator?scheme=${policy.scheme.toLowerCase()}&policy=${policy.calculatorPolicyId
            .toLowerCase()
            .replace('_', '-')}`}
          className="w-full min-h-11 py-3 px-4 rounded-xl bg-linear-to-r from-(--primary-red) to-[#961b2d] hover:from-[#b01c2f] hover:to-[#7e1625] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98">
          <i className="ri-calculator-line text-base shrink-0"></i>
          <span>Calculate Actuarial Quote</span>
        </Link>
      </div>
    </motion.div>
  );
}
