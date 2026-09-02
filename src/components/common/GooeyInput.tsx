'use client';

import { useState, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export interface GooeyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  collapsedWidth?: number;
  expandedWidth?: number;
  expandedOffset?: number;
  gooeyBlur?: number;
  onOpenChange?: (open: boolean) => void;
  classNames?: {
    root?: string;
    input?: string;
    bubble?: string;
    suggestions?: string;
  };
  className?: string;
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  resultCount?: number;
}

export function GooeyFilter({ id, blur = 5 }: { id: string; blur?: number }) {
  return (
    <svg
      className="absolute top-0 left-0 w-0 h-0 pointer-events-none overflow-hidden"
      aria-hidden="true">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

export default function GooeyInput({
  value,
  onChange,
  placeholder = 'Search topics, policies, claims, tax 80C...',
  collapsedWidth = 140,
  expandedWidth = 520,
  expandedOffset = 45,
  gooeyBlur = 5,
  onOpenChange,
  classNames,
  className,
  suggestions = ['Loan Terms', 'Bonus Rates', 'Section 80C', 'Maturity Claim', '0% GST', 'Surrender Policy'],
  onSelectSuggestion,
  resultCount,
}: GooeyInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const filterId = useId().replace(/:/g, '') + '-gooey-filter';

  const isExpanded = isFocused || Boolean(value.trim().length > 0);

  const handleOpen = () => {
    setIsFocused(true);
    onOpenChange?.(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative flex flex-col items-center w-full mx-auto select-none', className, classNames?.root)}>
      <GooeyFilter id={filterId} blur={gooeyBlur} />

      {/* Main Search Capsule Wrapper */}
      <div className="relative flex items-center justify-center w-full py-2">
        {/* Gooey Filter Background Container */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ filter: `url(#${filterId})` }}>
          {/* Main Expanding Liquid Pill */}
          <motion.div
            layout
            animate={{
              width: isExpanded ? expandedWidth : collapsedWidth,
              borderRadius: '9999px',
            }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 26,
            }}
            className="h-12 bg-white shadow-xl max-w-[92vw]"
          />

          {/* Liquid Icon Bubble Anchor */}
          <motion.div
            layout
            animate={{
              x: isExpanded ? -(expandedWidth / 2) + expandedOffset : 0,
              scale: isExpanded ? 0.95 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 26,
            }}
            className="w-10 h-10 rounded-full bg-white absolute"
          />
        </div>

        {/* Sharp Foreground Content Layer */}
        <motion.div
          animate={{
            width: isExpanded ? expandedWidth : collapsedWidth,
          }}
          transition={{
            type: 'spring',
            stiffness: 340,
            damping: 26,
          }}
          className="relative z-10 flex items-center justify-between h-12 px-3 max-w-[92vw]">
          {/* Left Icon / Trigger */}
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Search"
            className="flex items-center gap-1.5 text-(--primary-red) font-bold text-xs shrink-0 cursor-pointer p-1">
            <i className="ri-search-2-line text-lg"></i>
            {!isExpanded && <span className="text-slate-700 font-semibold pr-1">Search</span>}
          </button>

          {/* Input field (Visible when expanded) */}
          <div className={cn('flex-1 px-2 transition-opacity duration-200', isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                onOpenChange?.(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                if (!value.trim()) {
                  onOpenChange?.(false);
                }
              }}
              placeholder={placeholder}
              className={cn(
                'w-full bg-transparent text-slate-800 placeholder:text-slate-400 text-xs sm:text-sm font-semibold focus:outline-none',
                classNames?.input
              )}
            />
          </div>

          {/* Right Action Elements */}
          <div className="flex items-center gap-1.5 shrink-0">
            {typeof resultCount === 'number' && value && (
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                {resultCount} {resultCount === 1 ? 'match' : 'matches'}
              </span>
            )}

            <AnimatePresence>
              {value && (
                <motion.button
                  key="clear-btn"
                  type="button"
                  onClick={handleClear}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  aria-label="Clear search"
                  className="w-6 h-6 rounded-full bg-slate-700 hover:bg-slate-900 text-white flex items-center justify-center text-xs transition-colors cursor-pointer shadow-xs">
                  <i className="ri-close-line"></i>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Suggested Search Chips */}
      {suggestions && suggestions.length > 0 && (
        <div className={cn('pt-2 flex flex-wrap items-center justify-center gap-1.5 relative z-10 max-w-xl', classNames?.suggestions)}>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 mr-1 flex items-center gap-1">
            <i className="ri-sparkling-fill text-(--accent-gold)"></i> Suggested:
          </span>
          {suggestions.map((suggestion) => (
            <motion.button
              key={suggestion}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (onSelectSuggestion) {
                  onSelectSuggestion(suggestion);
                } else {
                  onChange(suggestion);
                }
                setIsFocused(true);
              }}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs border',
                value.toLowerCase() === suggestion.toLowerCase()
                  ? 'bg-(--accent-gold) text-(--primary-dark) font-bold border-transparent shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/15 backdrop-blur-xs'
              )}>
              {suggestion}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
