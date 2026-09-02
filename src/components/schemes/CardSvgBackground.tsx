'use client'

import { motion, MotionValue } from 'motion/react'

export interface CardSvgBackgroundProps {
  id: string
  scheme: 'PLI' | 'RPLI'
  isHovered: boolean
  spotlightBg?: MotionValue<string> | string
  className?: string
}
export function CardSvgBackground({
  id,
  scheme,
  isHovered,
  spotlightBg,
  className = '',
}: CardSvgBackgroundProps) {
  const isPli = scheme === 'PLI'

  // Configurable color tokens tailored to project brand identity
  const primaryColor = isPli ? '#d9233b' : '#059669' // PLI Crimson vs. RPLI Emerald
  const accentColor = isPli ? '#f5a623' : '#34d399' // Indian Gold vs. Fresh Jade
  const gridDotColor = isPli ? 'rgba(217, 35, 59, 0.25)' : 'rgba(5, 150, 105, 0.25)'
  const gridLineColor = isPli ? 'rgba(217, 35, 59, 0.06)' : 'rgba(5, 150, 105, 0.06)'

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Interactive Cursor Radial Spotlight */}
      {spotlightBg && (
        <motion.div
          className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-transform"
          style={{ background: spotlightBg }}
        />
      )}

      {/* 2. Vector Canvas with Dynamic Mathematical Paths */}
      <svg
        className="absolute top-0 right-0 w-full h-full opacity-35 group-hover:opacity-70 transition-opacity duration-500 will-change-[opacity]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 480"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Main Dynamic Flow Gradient */}
          <linearGradient id={`grad-flow-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.5" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Laser Highlight Gradient */}
          <linearGradient id={`grad-beam-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </linearGradient>

          {/* Micro Grid Dot Matrix */}
          <pattern id={`pattern-grid-${id}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke={gridLineColor} strokeWidth="1" />
            <circle cx="28" cy="0" r="1.2" fill={gridDotColor} />
            <circle cx="0" cy="28" r="1.2" fill={gridDotColor} />
          </pattern>
        </defs>

        {/* Structural Grid Matrix Background */}
        <rect width="100%" height="100%" fill={`url(#pattern-grid-${id})`} />

        {/* Harmonic Laser Path 1 (Upper Arc) */}
        <motion.path
          d="M -40 70 Q 160 10 440 130"
          stroke={`url(#grad-flow-${id})`}
          strokeWidth="1.6"
          strokeDasharray="14 10"
          animate={{
            strokeDashoffset: isHovered ? [0, -120] : [0, -40],
          }}
          transition={{
            repeat: Infinity,
            duration: isHovered ? 3.5 : 8,
            ease: 'linear',
          }}
        />

        {/* Harmonic Laser Path 2 (Mid Cross Arc) */}
        <motion.path
          d="M -20 220 Q 220 150 420 300"
          stroke={`url(#grad-flow-${id})`}
          strokeWidth="1.4"
          strokeDasharray="10 8"
          animate={{
            strokeDashoffset: isHovered ? [0, 100] : [0, 35],
          }}
          transition={{
            repeat: Infinity,
            duration: isHovered ? 4 : 10,
            ease: 'linear',
          }}
        />

        {/* Harmonic Laser Path 3 (Lower Base Sweep) */}
        <motion.path
          d="M 10 360 Q 260 280 440 400"
          stroke={`url(#grad-flow-${id})`}
          strokeWidth="1.2"
          strokeDasharray="18 12"
          animate={{
            strokeDashoffset: isHovered ? [0, -140] : [0, -50],
          }}
          transition={{
            repeat: Infinity,
            duration: isHovered ? 4.5 : 11,
            ease: 'linear',
          }}
        />

        {/* Heritage Sovereign Rosette / Postal Seal Motif (Top-Right) */}
        <g transform="translate(325, 22) scale(0.65)" opacity={isHovered ? '0.85' : '0.45'}>
          {/* Outer Dashed Orbital Ring */}
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            stroke={primaryColor}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 26, ease: 'linear' }}
          />

          {/* Inner Counter-Rotating Ring */}
          <motion.circle
            cx="40"
            cy="40"
            r="26"
            stroke={accentColor}
            strokeWidth="1.4"
            strokeDasharray="4 4"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          />

          {/* Central Sovereign Pip */}
          <circle cx="40" cy="40" r="9" fill={primaryColor} fillOpacity="0.3" />
          <circle cx="40" cy="40" r="4" fill={accentColor} />
        </g>
      </svg>

      {/* 3. Top Glowing Edge Beam (Animated Spring Reveal) */}
      <motion.div
        className="absolute top-0 inset-x-0 h-1 bg-linear-to-r"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${primaryColor}, ${accentColor}, transparent)`,
        }}
        initial={{ opacity: 0.3, scaleX: 0.3 }}
        animate={{
          opacity: isHovered ? 1 : 0.3,
          scaleX: isHovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
    </div>
  )
}
