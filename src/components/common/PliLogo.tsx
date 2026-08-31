'use client'

import Link from 'next/link'

export function PliEmblemSvg({
  className = 'w-10 h-10',
  variant = 'pli',
}: {
  className?: string
  variant?: 'pli' | 'rpli'
}) {
  if (variant === 'rpli') {
    return (
      <svg
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* RPLI Dark Green Oval */}
        <ellipse cx="50" cy="57" rx="46" ry="54" fill="#15803d" />
        
        {/* White Hand Base */}
        <path
          d="M32 90C32 90 32 96 50 96C68 96 68 90 68 90V76C68 76 77 72 77 56C77 48 74 46 72 46C70 46 68 49 68 54V30C68 25 64 25 64 30V48H60V22C60 17 56 17 56 22V48H52V18C52 13 48 13 48 18V48H44V26C44 21 40 21 40 26V62C36 58 31 60 30 64C29 68 32 76 32 90Z"
          fill="#ffffff"
        />
        {/* Green Sapling with 3 Leaves in Palm */}
        <path
          d="M50 82V66"
          stroke="#15803d"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Top Leaf */}
        <path
          d="M50 56C47 61 47 66 50 67C53 66 53 61 50 56Z"
          fill="#15803d"
        />
        {/* Left Leaf */}
        <path
          d="M48 67C41 64 38 68 40 73C45 74 47 70 48 67Z"
          fill="#15803d"
        />
        {/* Right Leaf */}
        <path
          d="M52 67C59 64 62 68 60 73C55 74 53 70 52 67Z"
          fill="#15803d"
        />
      </svg>
    )
  }

  // PLI Variant: White oval with Red border and Red Hand with White Sprout
  return (
    <svg
      viewBox="0 0 100 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* PLI Red Border & White Oval */}
      <ellipse cx="50" cy="57" rx="46" ry="54" fill="#ffffff" stroke="#961b2d" strokeWidth="4" />
      
      {/* Red Hand */}
      <path
        d="M32 90C32 90 32 96 50 96C68 96 68 90 68 90V76C68 76 77 72 77 56C77 48 74 46 72 46C70 46 68 49 68 54V30C68 25 64 25 64 30V48H60V22C60 17 56 17 56 22V48H52V18C52 13 48 13 48 18V48H44V26C44 21 40 21 40 26V62C36 58 31 60 30 64C29 68 32 76 32 90Z"
        fill="#961b2d"
      />
      {/* White Sapling with 3 Leaves in Palm */}
      <path
        d="M50 82V66"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Top Leaf */}
      <path
        d="M50 56C47 61 47 66 50 67C53 66 53 61 50 56Z"
        fill="#ffffff"
      />
      {/* Left Leaf */}
      <path
        d="M48 67C41 64 38 68 40 73C45 74 47 70 48 67Z"
        fill="#ffffff"
      />
      {/* Right Leaf */}
      <path
        d="M52 67C59 64 62 68 60 73C55 74 53 70 52 67Z"
        fill="#ffffff"
      />
    </svg>
  )
}

interface PliLogoProps {
  variant?: 'pli' | 'rpli' | 'combined'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  showSubtitle?: boolean
  className?: string
  href?: string
}

export function PliLogo({
  variant = 'combined',
  size = 'md',
  showText = true,
  showSubtitle = true,
  className = '',
  href = '/',
}: PliLogoProps) {
  const isSm = size === 'sm'
  const isLg = size === 'lg'

  const content = (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Emblems */}
      {variant === 'combined' ? (
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="p-0.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 shadow-sm flex items-center justify-center">
            <PliEmblemSvg
              variant="pli"
              className={isSm ? 'w-7.5 h-8.5' : isLg ? 'w-11 h-12.5' : 'w-9 h-10'}
            />
          </div>
          <div className="p-0.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 shadow-sm flex items-center justify-center">
            <PliEmblemSvg
              variant="rpli"
              className={isSm ? 'w-7.5 h-8.5' : isLg ? 'w-11 h-12.5' : 'w-9 h-10'}
            />
          </div>
        </div>
      ) : (
        <div className="p-0.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 shadow-sm flex items-center justify-center shrink-0">
          <PliEmblemSvg
            variant={variant}
            className={isSm ? 'w-8 h-9' : isLg ? 'w-12 h-13.5' : 'w-10 h-11'}
          />
        </div>
      )}

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight leading-none text-white ${
                isSm ? 'text-lg sm:text-xl' : isLg ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
              }`}
            >
              {variant === 'rpli' ? (
                <span>
                  RPLI <span className="text-emerald-300 text-xs font-normal">ग्रामीण डाक</span>
                </span>
              ) : variant === 'pli' ? (
                <span>
                  PLI <span className="text-amber-300 text-xs font-normal">डाक जीवन बीमा</span>
                </span>
              ) : (
                <span>
                  PLI <span className="text-amber-300 text-sm font-light">&</span> RPLI
                </span>
              )}
            </span>
          </div>

          {showSubtitle && (
            <span
              className={`font-medium tracking-wide uppercase text-slate-200 mt-0.5 opacity-90 leading-tight ${
                isSm ? 'text-[0.6rem]' : isLg ? 'text-xs' : 'text-[0.68rem]'
              }`}
            >
              {variant === 'rpli'
                ? 'Rural Postal Life Insurance • Govt of India'
                : variant === 'pli'
                  ? 'Postal Life Insurance • Since 1884'
                  : 'Postal Life Insurance • Government of India'}
            </span>
          )}
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-95 transition-opacity inline-flex items-center">
        {content}
      </Link>
    )
  }

  return content
}
