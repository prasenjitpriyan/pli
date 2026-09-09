'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { PliLogo } from './common/PliLogo';

interface NavItem {
  name: string;
  href: string;
  icon?: string;
}

const TOOL_SUB_ITEMS = [
  {
    name: 'Actuarial Calculator',
    href: '/calculator',
    icon: 'ri-calculator-line',
    desc: 'Official table-driven rate quotations',
  },
  {
    name: 'Policy Comparison',
    href: '/compare',
    icon: 'ri-scales-3-line',
    desc: 'Side-by-side metrics & bonus diffs',
  },
  {
    name: 'Goal & Retirement Planner',
    href: '/goal-planner',
    icon: 'ri-compass-3-line',
    desc: 'Reverse-solve wealth & education targets',
  },
  {
    name: 'Loan & Policy Servicing',
    href: '/policy-servicing',
    icon: 'ri-bank-card-line',
    desc: '10% loan quantum & surrender valuation',
  },
];

const MOBILE_NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/', icon: 'ri-home-4-line' },
  { name: 'Calculator', href: '/calculator', icon: 'ri-calculator-line' },
  { name: 'Compare', href: '/compare', icon: 'ri-scales-3-line' },
  { name: 'Goal Planner', href: '/goal-planner', icon: 'ri-compass-3-line' },
  { name: 'Loan & Servicing', href: '/policy-servicing', icon: 'ri-bank-card-line' },
  { name: 'Schemes', href: '/schemes', icon: 'ri-shield-star-line' },
  { name: 'Bonus Rates', href: '/bonus-rates', icon: 'ri-percent-line' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const toolsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const isActive = (path: string) => {
    if (path.startsWith('/#') && pathname === '/') return false;
    return pathname === path;
  };

  const isToolsActive = TOOL_SUB_ITEMS.some((t) => t.href === pathname);

  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setIsToolsOpen(true);
  };

  const handleToolsMouseLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => {
      setIsToolsOpen(false);
    }, 150);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-100 flex w-full justify-center transition-all duration-300 pointer-events-none',
        isScrolled ? 'px-3 sm:px-6' : 'px-0'
      )}>
      <motion.nav
        initial={{
          width: '100%',
          maxWidth: '100%',
          borderRadius: '0px',
          marginTop: '0px',
          boxShadow: 'none',
        }}
        animate={{
          width: isScrolled ? '92%' : '100%',
          maxWidth: isScrolled ? '64rem' : '100%',
          borderRadius: isScrolled ? '9999px' : '0px',
          marginTop: isScrolled ? '12px' : '0px',
          paddingTop: isScrolled ? '8px' : '16px',
          paddingBottom: isScrolled ? '8px' : '16px',
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          'pointer-events-auto transition-colors duration-300 relative text-white',
          isScrolled
            ? 'bg-(--primary-red)/90 backdrop-blur-xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.3)]'
            : 'w-full bg-(--primary-red) border-b border-red-900/40 shadow-md'
        )}>
        <div
          className={cn(
            'flex items-center justify-between mx-auto transition-all',
            isScrolled ? 'px-4 sm:px-6' : 'container-custom px-4 sm:px-6'
          )}>
          {/* Brand Logo Area */}
          <motion.div layout transition={{ duration: 0.2 }} className="logo-area flex items-center shrink-0">
            <PliLogo
              variant="combined"
              size={isScrolled ? 'sm' : 'sm'}
              showText={true}
              showSubtitle={!isScrolled}
            />
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center gap-1 list-none m-0 p-0">
              {/* 1. Home */}
              <li className="relative">
                <Link
                  href="/"
                  onMouseEnter={() => setHoveredIndex(0)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 z-10',
                    isActive('/') ? 'text-(--accent-gold)' : 'text-white/90 hover:text-white'
                  )}>
                  {hoveredIndex === 0 && (
                    <motion.span
                      layoutId="navHoverBackdrop"
                      className="absolute inset-0 bg-white/15 rounded-full -z-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {isActive('/') && (
                    <motion.span
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-black/25 border border-(--accent-gold)/40 rounded-full -z-1 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>Home</span>
                </Link>
              </li>

              {/* 2. Schemes */}
              <li className="relative">
                <Link
                  href="/schemes"
                  onMouseEnter={() => setHoveredIndex(1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 z-10',
                    isActive('/schemes') ? 'text-(--accent-gold)' : 'text-white/90 hover:text-white'
                  )}>
                  {hoveredIndex === 1 && (
                    <motion.span
                      layoutId="navHoverBackdrop"
                      className="absolute inset-0 bg-white/15 rounded-full -z-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {isActive('/schemes') && (
                    <motion.span
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-black/25 border border-(--accent-gold)/40 rounded-full -z-1 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>Schemes</span>
                </Link>
              </li>

              {/* 3. Actuarial Tools Dropdown */}
              <li
                className="relative"
                onMouseEnter={handleToolsMouseEnter}
                onMouseLeave={handleToolsMouseLeave}>
                <button
                  type="button"
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1 z-10 cursor-pointer',
                    isToolsActive ? 'text-(--accent-gold)' : 'text-white/90 hover:text-white'
                  )}>
                  {isToolsActive && (
                    <motion.span
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-black/25 border border-(--accent-gold)/40 rounded-full -z-1 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>Actuarial Tools</span>
                  {isToolsActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block ml-0.5" />
                  )}
                  <i
                    className={cn(
                      'ri-arrow-down-s-line text-sm transition-transform duration-200',
                      isToolsOpen && 'rotate-180'
                    )}></i>
                </button>

                {/* Dropdown Menu Card */}
                <AnimatePresence>
                  {isToolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-2 z-50">
                      <div className="space-y-1">
                        {TOOL_SUB_ITEMS.map((item) => {
                          const itemActive = isActive(item.href);
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsToolsOpen(false)}
                              className={cn(
                                'p-2.5 rounded-xl flex items-start gap-2.5 transition-all text-left',
                                itemActive
                                  ? 'bg-(--primary-red) text-white shadow-sm'
                                  : 'hover:bg-white/10 text-slate-200 hover:text-white'
                              )}>
                              <div
                                className={cn(
                                  'w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0',
                                  itemActive
                                    ? 'bg-white/20 text-white'
                                    : 'bg-white/10 text-(--accent-gold)'
                                )}>
                                <i className={item.icon}></i>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-bold leading-tight">{item.name}</span>
                                <span className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                                  {item.desc}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* 4. Bonus Rates */}
              <li className="relative">
                <Link
                  href="/bonus-rates"
                  onMouseEnter={() => setHoveredIndex(3)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 z-10',
                    isActive('/bonus-rates') ? 'text-(--accent-gold)' : 'text-white/90 hover:text-white'
                  )}>
                  {hoveredIndex === 3 && (
                    <motion.span
                      layoutId="navHoverBackdrop"
                      className="absolute inset-0 bg-white/15 rounded-full -z-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {isActive('/bonus-rates') && (
                    <motion.span
                      layoutId="navActivePill"
                      className="absolute inset-0 bg-black/25 border border-(--accent-gold)/40 rounded-full -z-1 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>Bonus Rates</span>
                </Link>
              </li>
            </ul>

            {/* Quick Quote CTA Button */}
            <motion.div layout className="ml-3 pl-3 border-l border-white/20">
              <Link
                href="/calculator"
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95',
                  isActive('/calculator')
                    ? 'bg-white text-(--primary-red) ring-2 ring-(--accent-gold) shadow-lg'
                    : 'bg-(--accent-gold) hover:bg-[#b59139] text-(--primary-dark)'
                )}>
                <i className="ri-flashlight-fill text-sm"></i>
                <span>Get Quote</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/calculator"
              className="px-3 py-1 rounded-full bg-(--accent-gold) text-(--primary-dark) text-[11px] font-black uppercase tracking-wider shadow-xs">
              Quote
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-xl transition-all cursor-pointer">
              <i className={isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
            </button>
          </div>
        </div>

        {/* Mobile Animated Dropdown Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden lg:hidden border-t border-white/15 bg-(--primary-dark)/95 backdrop-blur-2xl rounded-b-3xl">
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {MOBILE_NAV_ITEMS.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'p-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all',
                          active
                            ? 'bg-(--primary-red) text-white shadow-md'
                            : 'bg-white/5 hover:bg-white/10 text-slate-200'
                        )}>
                        <i
                          className={cn(
                            item.icon,
                            active ? 'text-(--accent-gold)' : 'text-slate-400'
                          )}></i>
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Direct Action Chips */}
                <div className="pt-2 border-t border-white/10 flex gap-2">
                  <Link
                    href="/calculator"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-(--accent-gold) text-(--primary-dark) text-center text-xs font-black uppercase tracking-wider shadow-md">
                    Calculate Quote
                  </Link>
                  <a
                    href="https://wa.me/919038332076?text=Hello%20Prasenjit%20Das%2C%20I%20want%20to%20consult%20regarding%20PLI%20policies."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-center text-xs font-bold flex items-center justify-center gap-1">
                    <i className="ri-whatsapp-fill text-sm"></i>
                    <span>Chat</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
