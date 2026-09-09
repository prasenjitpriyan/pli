'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PliLogo } from './common/PliLogo';
import { FloatingDock, FloatingDockItem } from './ui/floating-dock';
import { WHATSAPP_CONTACTS, getWhatsAppLink } from '@/config/whatsapp';
import { AnimatePresence, motion } from 'motion/react';

const DOCK_ITEMS: FloatingDockItem[] = [
  {
    title: 'Home Portal',
    icon: <i className="ri-home-5-line"></i>,
    href: '/',
  },
  {
    title: 'Actuarial Calculator',
    icon: <i className="ri-calculator-line text-(--accent-gold)"></i>,
    href: '/calculator',
  },
  {
    title: 'All 12 Schemes',
    icon: <i className="ri-shield-star-line text-sky-400"></i>,
    href: '/schemes',
  },
  {
    title: 'Declared Bonus Rates',
    icon: <i className="ri-percent-line text-emerald-400"></i>,
    href: '/bonus-rates',
  },
  {
    title: 'WhatsApp Advisor',
    icon: <i className="ri-whatsapp-fill text-[#25D366]"></i>,
    href: getWhatsAppLink('9038332076', 'Hello Prasenjit Das, I want to consult regarding PLI & RPLI policy options.'),
    external: true,
  },
  {
    title: 'Google Profile',
    icon: <i className="ri-google-fill text-amber-400"></i>,
    href: 'https://share.google/NHDWnZ0xIYZgnilIi',
    external: true,
  },
  {
    title: 'Citizen FAQs',
    icon: <i className="ri-questionnaire-line text-purple-400"></i>,
    href: '/faq',
  },
  {
    title: 'Contact Support',
    icon: <i className="ri-customer-service-2-line text-rose-400"></i>,
    href: '/contact',
  },
];

const TRUST_PILLARS = [
  {
    icon: 'ri-shield-check-fill',
    title: '100% Sovereign Guarantee',
    desc: 'Backed by Govt of India under POLI Fund',
    highlight: 'Govt Guaranteed',
  },
  {
    icon: 'ri-percent-fill',
    title: '0% GST on Premiums',
    desc: 'Complete tax exemption on all deposits',
    highlight: 'Zero Tax Added',
  },
  {
    icon: 'ri-funds-box-line',
    title: 'Highest Declared Bonus',
    desc: 'Up to ₹76/₹1,000 SA annual return',
    highlight: 'Market Leading',
  },
  {
    icon: 'ri-file-shield-2-line',
    title: 'Dual Tax Exemption',
    desc: 'Sec 80C deduction & 10(10D) tax-free maturity',
    highlight: '100% Tax Free',
  },
  {
    icon: 'ri-history-line',
    title: 'Legacy Since 1884',
    desc: '140+ years of trusted citizen protection',
    highlight: 'Oldest in India',
  },
];

// Target personas for New Customer Interactive Guidance Prompt
interface CustomerPersona {
  id: 'govt' | 'rural' | 'family' | 'switcher';
  icon: string;
  badge: string;
  label: string;
  headline: string;
  recommendedScheme: string;
  schemeTag: string;
  bonusRate: string;
  pitch: string;
  savingsInsight: string;
  calculatorLink: string;
  whatsappMessage: string;
}

const CUSTOMER_PERSONAS: CustomerPersona[] = [
  {
    id: 'govt',
    icon: 'ri-government-fill',
    badge: 'Govt / Professionals',
    label: 'Government & Professionals',
    headline: 'Salaried Employees, Officers & Certified Professionals',
    recommendedScheme: 'Suraksha (Whole Life) & Santosh (Endowment)',
    schemeTag: 'Postal Life Insurance (PLI)',
    bonusRate: 'Up to ₹76 / ₹1,000 SA per year',
    pitch: 'Eligible for Central/State Govt, PSU, Defense, Education, Doctors & Engineers. Maximise retirement wealth with Sovereign Guarantee & 0% GST.',
    savingsInsight: 'Save ₹15,000+ in commercial GST taxes + gain highest declared bonus in India.',
    calculatorLink: '/calculator',
    whatsappMessage: 'Hello Prasenjit Das, I am a salaried/professional citizen looking for PLI Suraksha/Santosh quote calculation.',
  },
  {
    id: 'rural',
    icon: 'ri-home-heart-fill',
    badge: 'Rural Citizen',
    label: 'Rural & Semi-Urban',
    headline: 'Citizens Residing in Rural & Town Areas',
    recommendedScheme: 'Gram Santosh (Endowment) & Gram Suraksha',
    schemeTag: 'Rural Postal Life Insurance (RPLI)',
    bonusRate: 'Up to ₹60 / ₹1,000 SA per year',
    pitch: 'Open to all Indian residents in rural areas. Accessible premiums starting from just ₹10,000 Sum Assured with doorstep postman service.',
    savingsInsight: 'Zero medical checkup required up to ₹1,00,000 SA. Full Sovereign Guarantee by Central Govt.',
    calculatorLink: '/schemes',
    whatsappMessage: 'Hello Prasenjit Das, I am interested in RPLI Gram Santosh / Gram Suraksha policies for rural citizens.',
  },
  {
    id: 'family',
    icon: 'ri-parent-fill',
    badge: 'Family & Children',
    label: 'Family & Children Wealth',
    headline: 'Parents & Couples Planning Future Milestones',
    recommendedScheme: 'Bal Jeevan Bima & Yugal Suraksha (Joint Life)',
    schemeTag: 'Child & Spousal Security',
    bonusRate: '₹52 / ₹1,000 SA + Premium Waiver',
    pitch: 'Secure your child’s higher education and marriage. In event of parent demise, future premiums are completely waived while bonuses continue accumulating.',
    savingsInsight: 'Single comprehensive policy covering both husband and wife under Yugal Suraksha.',
    calculatorLink: '/calculator',
    whatsappMessage: 'Hello Prasenjit Das, I would like guidance on Bal Jeevan Bima Children Plan & Joint Life insurance.',
  },
  {
    id: 'switcher',
    icon: 'ri-exchange-box-fill',
    badge: 'Switch & Save',
    label: 'Switch from Private Insurer',
    headline: 'Comparing with Commercial Private Insurance?',
    recommendedScheme: 'Direct Transition to PLI High-Bonus Schemes',
    schemeTag: '0% GST vs 4.5% Commercial Fee',
    bonusRate: '₹76/₹1k vs ₹35-₹45/₹1k in Private Plans',
    pitch: 'Commercial private insurers charge up to 4.5% GST on first-year premiums and 2.25% subsequently. PLI is 100% GST-exempt by statutory law.',
    savingsInsight: 'Save 4.5% immediately on every premium payment + enjoy sovereign backed safety.',
    calculatorLink: '/bonus-rates',
    whatsappMessage: 'Hello Prasenjit Das, I want to compare my existing private policy with PLI declared bonus and 0% GST benefits.',
  },
];

type ModalType = 'privacy' | 'terms' | 'disclaimer' | null;

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activePersonaId, setActivePersonaId] = useState<'govt' | 'rural' | 'family' | 'switcher'>('govt');

  // Mobile Accordion open state for collapsible footer columns
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const activePersona = CUSTOMER_PERSONAS.find((p) => p.id === activePersonaId) || CUSTOMER_PERSONAS[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <footer
      role="contentinfo"
      className="relative bg-linear-to-b from-[#0e131d] via-[#0b0f17] to-[#07090e] text-slate-300 pt-10 pb-16 mt-20 border-t border-white/10 overflow-hidden shadow-2xl">
      
      {/* ========================================================================= */}
      {/* ANIMATED SVG BACKGROUND MESH & CONSTELLATION NODES */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800">
          <defs>
            <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d9233b" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#c5a045" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.25" />
            </linearGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c5a045" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c5a045" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Connected Network Wave Paths */}
          <path
            d="M-50,150 Q360,50 720,180 T1500,120"
            fill="none"
            stroke="url(#networkGradient)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            className="animate-pulse"
          />
          <path
            d="M-50,280 Q400,200 800,320 T1500,240"
            fill="none"
            stroke="url(#networkGradient)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M-50,450 Q350,380 750,480 T1500,400"
            fill="none"
            stroke="url(#networkGradient)"
            strokeWidth="1"
            strokeDasharray="5 7"
            className="opacity-60"
          />

          {/* Postal Network Constellation Nodes */}
          <circle cx="180" cy="115" r="4" fill="#c5a045" />
          <circle cx="180" cy="115" r="14" fill="url(#nodeGlow)" />
          <circle cx="480" cy="110" r="3.5" fill="#d9233b" />
          <circle cx="720" cy="180" r="5" fill="#38bdf8" />
          <circle cx="720" cy="180" r="18" fill="url(#nodeGlow)" />
          <circle cx="1050" cy="130" r="4" fill="#c5a045" />
          <circle cx="1280" cy="150" r="4.5" fill="#d9233b" />

          <circle cx="280" cy="240" r="3.5" fill="#38bdf8" />
          <circle cx="620" cy="270" r="4.5" fill="#c5a045" />
          <circle cx="920" cy="300" r="4" fill="#d9233b" />
          <circle cx="1320" cy="260" r="3.5" fill="#c5a045" />
        </svg>
      </div>

      {/* Subtle Ambient Radial Halos */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-56 bg-(--primary-red)/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-56 bg-(--accent-gold)/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Animated Golden Laser Strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-(--accent-gold) to-transparent opacity-80" />

      <div className="container-custom relative z-10 space-y-12">
        {/* ========================================================================= */}
        {/* TOP SECTION: Sovereign Trust Pillars (Responsive Grid) */}
        {/* ========================================================================= */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {TRUST_PILLARS.map((pillar) => (
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                key={pillar.title}
                className="group relative p-3 sm:p-4 rounded-2xl bg-white/3 hover:bg-white/7 border border-white/10 hover:border-(--accent-gold)/40 transition-colors flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-(--accent-gold)/15 text-(--accent-gold) group-hover:bg-(--accent-gold) group-hover:text-(--primary-dark) transition-all duration-300 flex items-center justify-center text-lg sm:text-xl shadow-xs">
                      <i className={pillar.icon}></i>
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 group-hover:text-white">
                      {pillar.highlight}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mb-1 group-hover:text-(--accent-gold) transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STATE-OF-THE-ART: NEW CUSTOMER INTERACTIVE GUIDANCE PROMPT ENGINE */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl p-5 sm:p-8 bg-linear-to-br from-white/6 via-white/3 to-transparent border border-white/15 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Animated SVG Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-(--primary-red) via-(--accent-gold) to-sky-400"></div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            {/* Header with SVG Animated Sovereign Shield */}
            <div className="flex items-center gap-4">
              {/* SVG Animated Orbital Sovereign Shield */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full absolute inset-0 animate-[spin_16s_linear_infinite]" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(197, 160, 69, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                  />
                </svg>
                <svg className="w-full h-full absolute inset-0 animate-[spin_24s_linear_infinite_reverse]" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="rgba(217, 35, 59, 0.5)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                  />
                </svg>
                {/* Center Core Emblem */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-linear-to-tr from-(--primary-red) to-amber-600 flex items-center justify-center text-white text-xl shadow-lg shadow-red-900/50">
                  <i className="ri-shield-star-fill text-amber-200"></i>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-(--accent-gold) px-2 py-0.5 rounded-md bg-(--accent-gold)/15 border border-(--accent-gold)/30 inline-flex items-center gap-1">
                    <i className="ri-sparkling-fill text-amber-300"></i> First Time Citizen Guide
                  </span>
                  <span className="hidden sm:inline-block text-[11px] text-emerald-400 font-semibold">
                    • 100% Tax-Free
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight mt-1">
                  Which Policy Best Matches Your Family Profile?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Select your profile below for instant actuarial recommendations and 0% GST savings insights.
                </p>
              </div>
            </div>

            {/* Direct Instant Action Badge */}
            <div className="hidden xl:flex items-center gap-3">
              <a
                href={getWhatsAppLink('9038332076', 'Hello Prasenjit Das, I am a new citizen looking for quick policy advice.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg transition-transform active:scale-95">
                <i className="ri-whatsapp-fill text-base"></i>
                <span>Ask Senior Advisor</span>
              </a>
            </div>
          </div>

          {/* Persona Selector Tabs (Touch-scrollable for mobile first) */}
          <div className="pt-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
              {CUSTOMER_PERSONAS.map((persona) => {
                const isActive = persona.id === activePersonaId;
                return (
                  <button
                    key={persona.id}
                    onClick={() => setActivePersonaId(persona.id)}
                    className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                      isActive
                        ? 'bg-(--accent-gold) text-(--primary-dark) border-(--accent-gold) shadow-lg shadow-amber-900/30'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}>
                    <i className={`${persona.icon} text-sm ${isActive ? 'text-(--primary-dark)' : 'text-(--accent-gold)'}`}></i>
                    <span>{persona.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Display with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePersona.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-5 p-5 sm:p-6 rounded-2xl bg-white/4 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Left Side: Headline & Explanation */}
                <div className="md:col-span-8 space-y-2.5">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-white bg-(--primary-red) px-2.5 py-0.5 rounded-full">
                      {activePersona.schemeTag}
                    </span>
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      <i className="ri-award-fill"></i> {activePersona.bonusRate}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {activePersona.headline}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activePersona.pitch}
                  </p>

                  <div className="p-3 rounded-xl bg-(--accent-gold)/10 border border-(--accent-gold)/30 text-xs text-amber-200 flex items-start gap-2">
                    <i className="ri-lightbulb-flash-fill text-amber-400 text-sm mt-0.5 shrink-0"></i>
                    <span>
                      <strong>Citizen Advantage:</strong> {activePersona.savingsInsight}
                    </span>
                  </div>
                </div>

                {/* Right Side: Direct 1-Tap CTA Actions */}
                <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
                  <Link
                    href={activePersona.calculatorLink}
                    className="w-full py-3 px-4 rounded-xl bg-(--primary-red) hover:bg-red-700 text-white text-xs font-bold text-center inline-flex items-center justify-center gap-2 shadow-md hover:shadow-red-900/40 transition-all active:scale-95">
                    <i className="ri-calculator-line text-sm"></i>
                    <span>Calculate Instant Quote</span>
                  </Link>

                  <a
                    href={getWhatsAppLink('9038332076', activePersona.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 text-xs font-bold text-center inline-flex items-center justify-center gap-2 transition-all active:scale-95">
                    <i className="ri-whatsapp-fill text-base"></i>
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE FAST-ACCESS DOCK SECTION */}
        {/* ========================================================================= */}
        <div className="py-6 border-y border-white/10 flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Instant Navigation & Advisor Dock
            </span>
          </div>
          <div className="w-full flex justify-center overflow-x-auto py-1">
            <FloatingDock items={DOCK_ITEMS} />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN NAVIGATION: DESKTOP GRID + MOBILE TOUCH ACCORDIONS */}
        {/* ========================================================================= */}
        
        {/* --- DESKTOP VIEW (hidden on mobile, visible on lg:) --- */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 py-4 border-b border-white/10">
          {/* Column 1: Brand & National Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <PliLogo variant="combined" size="md" showText={true} showSubtitle={true} />

            <p className="text-sm text-slate-300/90 leading-relaxed">
              <strong>Postal Life Insurance (PLI)</strong> & <strong>Rural Postal Life Insurance (RPLI)</strong> are premier life insurance institutions under the <em>Department of Posts, Ministry of Communications, Government of India</em>.
            </p>

            <div className="p-4 rounded-2xl bg-white/3 border border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <i className="ri-checkbox-circle-fill text-sm"></i>
                <span>Statutory Sovereign Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Exempt from Section 3(2) of Insurance Act, 1938. 100% of claims unconditionally guaranteed by the Central Government.
              </p>
              <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <i className="ri-building-4-line text-(--accent-gold)"></i> 1.59+ Lakh Post Offices
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <i className="ri-time-line text-sky-400"></i> Est. 1884
                </span>
              </div>
            </div>

            <div>
              <a
                href="https://pli.indiapost.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white hover:text-(--accent-gold) transition-all">
                <i className="ri-external-link-line"></i>
                <span>Official India Post PLI Portal</span>
              </a>
            </div>
          </div>

          {/* Column 2: Flagship Schemes Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white text-sm font-bold tracking-wide uppercase relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-0.5 after:bg-(--accent-gold)">
              Flagship Schemes
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/schemes"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors">
                  <span className="group-hover:translate-x-1 transition-transform">
                    Suraksha (Whole Life)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    ₹76 Bonus
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors">
                  <span className="group-hover:translate-x-1 transition-transform">
                    Santosh (Endowment)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    Most Popular
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors">
                  <span className="group-hover:translate-x-1 transition-transform">
                    Suvidha (Convertible)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Convertible</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors">
                  <span className="group-hover:translate-x-1 transition-transform">
                    Sumangal (Anticipated)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Money Back
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors">
                  <span className="group-hover:translate-x-1 transition-transform">
                    Yugal Suraksha (Joint Life)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Dual Life</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors">
                  <span className="group-hover:translate-x-1 transition-transform">
                    Gram Suraksha & Santosh
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
                    RPLI
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors">
                  <span className="group-hover:translate-x-1 transition-transform">
                    Bal Jeevan Bima
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Child Plan</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Actuarial Tools & Resources (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white text-sm font-bold tracking-wide uppercase relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-0.5 after:bg-(--accent-gold)">
              Citizen Tools
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/calculator"
                  className="text-slate-300 hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-flex items-center gap-1.5 font-medium">
                  <i className="ri-calculator-line text-(--accent-gold)"></i>
                  <span>Quote Calculator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-slate-300 hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-flex items-center gap-1.5 font-medium">
                  <i className="ri-scales-3-line text-blue-400"></i>
                  <span>Compare Policies Matrix</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/goal-planner"
                  className="text-slate-300 hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-flex items-center gap-1.5 font-medium">
                  <i className="ri-compass-3-line text-amber-400"></i>
                  <span>Goal & Retirement Planner</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/policy-servicing"
                  className="text-slate-300 hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-flex items-center gap-1.5 font-medium">
                  <i className="ri-bank-card-line text-emerald-400"></i>
                  <span>Loan & Surrender Value</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/bonus-rates"
                  className="text-slate-300 hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-flex items-center gap-1.5 font-medium">
                  <i className="ri-percent-line text-purple-400"></i>
                  <span>Bonus Rates Matrix</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/schemes"
                  className="text-slate-300 hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-flex items-center gap-1.5 font-medium">
                  <i className="ri-shield-star-line text-sky-400"></i>
                  <span>Schemes Catalog</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-300 hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-flex items-center gap-1.5 font-medium">
                  <i className="ri-questionnaire-line text-purple-400"></i>
                  <span>Claims & FAQ Guide</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-flex items-center gap-1.5 font-medium">
                  <i className="ri-customer-service-2-line text-rose-400"></i>
                  <span>Branch Helpline</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://share.google/NHDWnZ0xIYZgnilIi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--accent-gold) hover:underline inline-flex items-center gap-1.5 font-bold">
                  <i className="ri-google-fill"></i>
                  <span>Google Profile</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Authorized Advisor & Regional Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white text-sm font-bold tracking-wide uppercase relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-8 after:h-0.5 after:bg-(--accent-gold)">
              Advisor & Helpdesk
            </h3>

            {/* Advisor Profile Card */}
            <div className="p-3.5 rounded-2xl bg-white/4 border border-white/10 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-(--accent-gold)/20 border border-(--accent-gold)/40 text-(--accent-gold) flex items-center justify-center text-base font-bold">
                  <i className="ri-user-star-line"></i>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">
                    {WHATSAPP_CONTACTS[0].name}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {WHATSAPP_CONTACTS[0].role}
                  </p>
                </div>
              </div>

              {/* Direct Dial & WhatsApp Contacts */}
              <div className="space-y-1.5 pt-1 border-t border-white/10 text-[11px]">
                <div className="flex items-center justify-between">
                  <a
                    href="tel:9038332076"
                    className="font-bold text-white hover:text-(--accent-gold) transition-colors flex items-center gap-1">
                    <i className="ri-phone-fill text-(--accent-gold)"></i>
                    <span>+91 9038332076</span>
                  </a>
                  <a
                    href={getWhatsAppLink('9038332076', 'Hello Prasenjit Das, I would like to consult regarding PLI schemes.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold transition-all text-[10px] inline-flex items-center gap-1">
                    <i className="ri-whatsapp-fill"></i> WhatsApp
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href="tel:8620935473"
                    className="font-bold text-white hover:text-(--accent-gold) transition-colors flex items-center gap-1">
                    <i className="ri-phone-line text-(--accent-gold)"></i>
                    <span>+91 8620935473</span>
                  </a>
                  <a
                    href={getWhatsAppLink('8620935473', 'Hello PLI Support Desk, I need assistance with quote details.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold transition-all text-[10px] inline-flex items-center gap-1">
                    <i className="ri-whatsapp-fill"></i> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Office Physical Address */}
            <address className="not-italic space-y-1 text-[11px] text-slate-300">
              <div className="flex items-start gap-2">
                <i className="ri-map-pin-2-fill text-(--accent-gold) text-sm shrink-0 mt-0.5"></i>
                <div className="leading-relaxed">
                  <span>Haltu, 57, P. Majumder Road, Kolkata - 700078</span>
                  <br />
                  <a
                    href="https://maps.google.com/?q=Haltu,+57,+P.+Majumder+Road,+Kolkata+-+700078"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--accent-gold) hover:underline text-[10px] font-semibold inline-flex items-center gap-1">
                    <i className="ri-direction-line"></i> View Map Directions
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-0.5">
                <i className="ri-mail-line text-(--accent-gold) text-sm shrink-0"></i>
                <a
                  href="mailto:prasenjitpriyan@gmail.com"
                  className="hover:text-white transition-colors">
                  prasenjitpriyan@gmail.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* --- MOBILE ACCORDIONS VIEW (visible on mobile <lg, hidden on desktop) --- */}
        <div className="lg:hidden space-y-3 py-2 border-b border-white/10">
          {/* Brand Card on Mobile */}
          <div className="p-4 rounded-2xl bg-white/4 border border-white/10 space-y-3">
            <PliLogo variant="combined" size="sm" showText={true} showSubtitle={true} />
            <p className="text-xs text-slate-300 leading-relaxed">
              Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI) are sovereign guaranteed life insurance schemes under the Ministry of Communications, Government of India.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <i className="ri-shield-check-fill"></i>
              <span>100% Sovereign Guarantee • 0% GST</span>
            </div>
          </div>

          {/* Accordion 1: Flagship Schemes */}
          <div className="rounded-2xl bg-white/3 border border-white/10 overflow-hidden">
            <button
              onClick={() => toggleAccordion('schemes')}
              className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-white cursor-pointer">
              <span className="flex items-center gap-2">
                <i className="ri-shield-star-line text-sky-400"></i>
                <span>Flagship Schemes Directory</span>
              </span>
              <motion.i
                animate={{ rotate: openAccordion === 'schemes' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ri-arrow-down-s-line text-lg text-slate-400"
              />
            </button>
            <AnimatePresence>
              {openAccordion === 'schemes' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-4 space-y-2 border-t border-white/5 pt-3 text-xs">
                  <Link href="/schemes" className="flex justify-between items-center py-1 text-slate-300 hover:text-white">
                    <span>Suraksha (Whole Life)</span>
                    <span className="text-[10px] text-amber-300 font-bold">₹76 Bonus</span>
                  </Link>
                  <Link href="/schemes" className="flex justify-between items-center py-1 text-slate-300 hover:text-white">
                    <span>Santosh (Endowment)</span>
                    <span className="text-[10px] text-sky-300 font-bold">Most Popular</span>
                  </Link>
                  <Link href="/schemes" className="flex justify-between items-center py-1 text-slate-300 hover:text-white">
                    <span>Suvidha (Convertible)</span>
                    <span className="text-[10px] text-slate-400">Convertible</span>
                  </Link>
                  <Link href="/schemes" className="flex justify-between items-center py-1 text-slate-300 hover:text-white">
                    <span>Sumangal (Anticipated)</span>
                    <span className="text-[10px] text-emerald-300 font-bold">Money Back</span>
                  </Link>
                  <Link href="/schemes" className="flex justify-between items-center py-1 text-slate-300 hover:text-white">
                    <span>Gram Suraksha & Santosh</span>
                    <span className="text-[10px] text-green-300 font-bold">RPLI</span>
                  </Link>
                  <Link href="/schemes" className="flex justify-between items-center py-1 text-slate-300 hover:text-white">
                    <span>Bal Jeevan Bima (Child Plan)</span>
                    <span className="text-[10px] text-slate-400">Child Security</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 2: Citizen Tools */}
          <div className="rounded-2xl bg-white/3 border border-white/10 overflow-hidden">
            <button
              onClick={() => toggleAccordion('tools')}
              className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-white cursor-pointer">
              <span className="flex items-center gap-2">
                <i className="ri-calculator-line text-(--accent-gold)"></i>
                <span>Citizen Tools & Tables</span>
              </span>
              <motion.i
                animate={{ rotate: openAccordion === 'tools' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ri-arrow-down-s-line text-lg text-slate-400"
              />
            </button>
            <AnimatePresence>
              {openAccordion === 'tools' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-4 space-y-2.5 border-t border-white/5 pt-3 text-xs">
                  <Link href="/calculator" className="flex items-center gap-2 py-1 text-slate-300 hover:text-white">
                    <i className="ri-flashlight-line text-(--accent-gold)"></i>
                    <span>Instant Quote Calculator</span>
                  </Link>
                  <Link href="/compare" className="flex items-center gap-2 py-1 text-slate-300 hover:text-white">
                    <i className="ri-scales-3-line text-blue-400"></i>
                    <span>Compare Schemes Matrix</span>
                  </Link>
                  <Link href="/goal-planner" className="flex items-center gap-2 py-1 text-slate-300 hover:text-white">
                    <i className="ri-compass-3-line text-amber-400"></i>
                    <span>Goal & Retirement Planner</span>
                  </Link>
                  <Link href="/policy-servicing" className="flex items-center gap-2 py-1 text-slate-300 hover:text-white">
                    <i className="ri-bank-card-line text-emerald-400"></i>
                    <span>Loan & Surrender Value Forecaster</span>
                  </Link>
                  <Link href="/bonus-rates" className="flex items-center gap-2 py-1 text-slate-300 hover:text-white">
                    <i className="ri-percent-line text-purple-400"></i>
                    <span>Official Declared Bonus Rates</span>
                  </Link>
                  <Link href="/schemes" className="flex items-center gap-2 py-1 text-slate-300 hover:text-white">
                    <i className="ri-shield-star-line text-sky-400"></i>
                    <span>Schemes Catalog</span>
                  </Link>
                  <Link href="/faq" className="flex items-center gap-2 py-1 text-slate-300 hover:text-white">
                    <i className="ri-questionnaire-line text-purple-400"></i>
                    <span>Citizen FAQ & Claim Guidelines</span>
                  </Link>
                  <a
                    href="https://share.google/NHDWnZ0xIYZgnilIi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-1 text-(--accent-gold) font-semibold">
                    <i className="ri-google-fill"></i>
                    <span>Google Business Profile</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accordion 3: Advisor & Office Details */}
          <div className="rounded-2xl bg-white/3 border border-white/10 overflow-hidden">
            <button
              onClick={() => toggleAccordion('advisor')}
              className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-white cursor-pointer">
              <span className="flex items-center gap-2">
                <i className="ri-user-star-line text-amber-300"></i>
                <span>Kolkata Helpdesk & Senior Advisor</span>
              </span>
              <motion.i
                animate={{ rotate: openAccordion === 'advisor' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ri-arrow-down-s-line text-lg text-slate-400"
              />
            </button>
            <AnimatePresence>
              {openAccordion === 'advisor' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3 text-xs">
                  <div>
                    <h5 className="font-bold text-white text-sm">Prasenjit Das</h5>
                    <p className="text-[11px] text-slate-400">Senior Insurance Advisor & Officer</p>
                  </div>
                  
                  {/* Action row with Call and WhatsApp for Mobile */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href="tel:9038332076"
                      className="py-2.5 px-3 rounded-xl bg-white/10 text-white font-bold text-center inline-flex items-center justify-center gap-1.5 active:scale-95">
                      <i className="ri-phone-fill text-(--accent-gold)"></i>
                      <span>Call 9038332076</span>
                    </a>
                    <a
                      href={getWhatsAppLink('9038332076', 'Hello Prasenjit Das, I need assistance with PLI policies.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-center inline-flex items-center justify-center gap-1.5 active:scale-95">
                      <i className="ri-whatsapp-fill"></i>
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                    <strong>Address:</strong> Haltu, 57, P. Majumder Road, Opp. Moitre Sangha Club, Kolkata - 700078
                  </p>
                  <a
                    href="https://maps.google.com/?q=Haltu,+57,+P.+Majumder+Road,+Kolkata+-+700078"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--accent-gold) hover:underline text-xs font-semibold inline-flex items-center gap-1">
                    <i className="ri-direction-line"></i> View on Google Maps
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM UTILITY BAR: Legal Modals, Copyright, Back-to-Top */}
        {/* ========================================================================= */}
        <div className="pt-2 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <div className="text-center md:text-left space-y-1">
            <p>
              &copy; {new Date().getFullYear()} Postal Life Insurance & Rural Postal Life Insurance. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-500">
              Department of Posts, Ministry of Communications, Government of India.
            </p>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">
              Terms of Use
            </button>
            <button
              onClick={() => setActiveModal('disclaimer')}
              className="hover:text-white transition-colors cursor-pointer underline-offset-4 hover:underline">
              Government Disclaimer
            </button>

            {/* Inline Back to Top Action */}
            <button
              onClick={scrollToTop}
              title="Return to top of page"
              aria-label="Scroll back to top"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-(--primary-red) text-white font-bold text-xs inline-flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-sm">
              <span>Top</span>
              <i className="ri-arrow-up-line text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE COMPLIANCE MODALS (Privacy / Terms / Disclaimer) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
              className="relative w-full max-w-xl bg-[#161c28] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-slate-300 space-y-4 max-h-[85vh] overflow-y-auto">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-(--accent-gold)/20 text-(--accent-gold) flex items-center justify-center text-lg">
                    {activeModal === 'privacy' && <i className="ri-lock-shield-line"></i>}
                    {activeModal === 'terms' && <i className="ri-file-list-3-line"></i>}
                    {activeModal === 'disclaimer' && <i className="ri-alert-line"></i>}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {activeModal === 'privacy' && 'Citizen Privacy & Data Policy'}
                    {activeModal === 'terms' && 'Terms of Use & Actuarial Calculator'}
                    {activeModal === 'disclaimer' && 'Government Guarantee & Disclaimer'}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer">
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>

              {/* Body */}
              <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
                {activeModal === 'privacy' && (
                  <>
                    <p>
                      <strong>Privacy Commitment:</strong> The Postal Life Insurance & RPLI Citizen Portal complies with the Digital Personal Data Protection (DPDP) Act and Government of India IT Security Directives.
                    </p>
                    <p>
                      <strong>Data Collection:</strong> Age, sum assured, policy terms, and contact details inputted into the quotation calculator are solely used for mathematical computation of life insurance quotes and direct advisor assistance upon your consent.
                    </p>
                    <p>
                      <strong>Zero Data Sale:</strong> We never sell, rent, or lease citizen contact information to third-party telemarketers or commercial financial brokers.
                    </p>
                    <p>
                      <strong>Secure WhatsApp Consultation:</strong> Conversations initiated via the official WhatsApp button connect directly to certified Postal Life Insurance advisors.
                    </p>
                  </>
                )}

                {activeModal === 'terms' && (
                  <>
                    <p>
                      <strong>Actuarial Quotation Accuracy:</strong> Calculations displayed on this website are generated using official table rates promulgated by the Directorate of Postal Life Insurance, Department of Posts, Government of India.
                    </p>
                    <p>
                      <strong>Non-Binding Quotations:</strong> Quotes provided through this calculator are illustrative based on current declared bonus rates (e.g., ₹76/₹1,000 for Whole Life and ₹52/₹1,000 for Endowment). Final acceptance is subject to medical examination (where applicable), age verification, and departmental sanction.
                    </p>
                    <p>
                      <strong>Rebates & Frequency:</strong> Premium computations automatically factor official discounts including the ₹1/₹10,000 SA high-sum assured discount and advance payment rebates.
                    </p>
                  </>
                )}

                {activeModal === 'disclaimer' && (
                  <>
                    <p>
                      <strong>Sovereign Guarantee:</strong> Postal Life Insurance (est. 1884) and Rural Postal Life Insurance (est. 1995) are backed by the Sovereign Guarantee of the Government of India through the Post Office Life Insurance Fund.
                    </p>
                    <p>
                      <strong>Advisor Representation:</strong> This advisory portal is administered by authorized Postal Life Insurance Advisors (led by Senior Advisor Prasenjit Das, Kolkata) to provide citizens with seamless quotation tools, scheme education, and doorstep service.
                    </p>
                    <p>
                      <strong>Statutory Exemption:</strong> Unlike commercial life insurance corporations, PLI and RPLI policies carry 0% GST and are exempt from Section 3(2) of the Insurance Act of 1938.
                    </p>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 rounded-xl bg-(--accent-gold) hover:bg-[#b59139] text-(--primary-dark) text-xs font-bold transition-all cursor-pointer">
                  Understood & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top Button (Available across entire page when scrolled) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            title="Scroll to Top"
            aria-label="Scroll to top of page"
            className="fixed bottom-6 right-22 sm:right-24 z-80 w-11 h-11 rounded-full bg-(--primary-dark) hover:bg-(--primary-red) border border-white/20 text-white shadow-xl flex items-center justify-center transition-colors cursor-pointer group">
            <i className="ri-arrow-up-line text-lg group-hover:-translate-y-0.5 transition-transform"></i>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
