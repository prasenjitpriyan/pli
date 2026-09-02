'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { PliLogo } from './common/PliLogo'

interface NavItem {
  name: string
  href: string
  icon?: string
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/', icon: 'ri-home-4-line' },
  { name: 'Schemes', href: '/schemes', icon: 'ri-shield-star-line' },
  { name: 'Bonus Rates', href: '/bonus-rates', icon: 'ri-percent-line' },
  { name: 'FAQ', href: '/faq', icon: 'ri-questionnaire-line' },
  { name: 'Contact', href: '/contact', icon: 'ri-customer-service-line' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  const isActive = (path: string) => {
    if (path.startsWith('/#') && pathname === '/') return false
    return pathname === path
  }

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
          )}
        >
          {/* Brand Logo Area */}
          <motion.div
            layout
            transition={{ duration: 0.2 }}
            className="logo-area flex items-center shrink-0"
          >
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
              {NAV_ITEMS.map((item, idx) => {
                const active = isActive(item.href)
                return (
                  <li key={item.name} className="relative">
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={cn(
                        'relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 z-10',
                        active ? 'text-(--accent-gold)' : 'text-white/90 hover:text-white'
                      )}
                    >
                      {/* Animated Hover Backdrop */}
                      {hoveredIndex === idx && (
                        <motion.span
                          layoutId="navHoverBackdrop"
                          className="absolute inset-0 bg-white/15 rounded-full -z-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}

                      {/* Active State Pill Background */}
                      {active && (
                        <motion.span
                          layoutId="navActivePill"
                          className="absolute inset-0 bg-black/25 border border-(--accent-gold)/40 rounded-full -z-1 shadow-inner"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
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
                )}
              >
                <i className="ri-flashlight-fill text-sm"></i>
                <span>Get Quote</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/calculator"
              className="px-3 py-1 rounded-full bg-(--accent-gold) text-(--primary-dark) text-[11px] font-black uppercase tracking-wider shadow-xs"
            >
              Quote
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-xl transition-all cursor-pointer"
            >
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
              className="overflow-hidden lg:hidden border-t border-white/15 bg-(--primary-dark)/95 backdrop-blur-2xl rounded-b-3xl"
            >
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href)
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
                        )}
                      >
                        <i
                          className={cn(
                            item.icon,
                            active ? 'text-(--accent-gold)' : 'text-slate-400'
                          )}
                        ></i>
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>

                {/* Direct Action Chips */}
                <div className="pt-2 border-t border-white/10 flex gap-2">
                  <Link
                    href="/calculator"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-(--accent-gold) text-(--primary-dark) text-center text-xs font-black uppercase tracking-wider shadow-md"
                  >
                    Calculate Quote
                  </Link>
                  <a
                    href="https://wa.me/919038332076?text=Hello%2C%20I%20want%20to%20consult%20regarding%20PLI%20policies."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-center text-xs font-bold flex items-center justify-center gap-1"
                  >
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
  )
}
