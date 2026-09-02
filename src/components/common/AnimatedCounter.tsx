'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  formatIndian?: boolean;
  className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.2,
  decimals = 0,
  formatIndian = false,
  className = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const countRef = useRef({ val: 0 });
  const elementRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);

  const formatNumber = (num: number): string => {
    if (formatIndian) {
      const fixed = num.toFixed(decimals);
      const [intPart, decPart] = fixed.split('.');
      const lastThree = intPart.slice(-3);
      const otherNumbers = intPart.slice(0, -3);
      const formattedInt =
        otherNumbers !== ''
          ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree
          : lastThree;
      return decPart !== undefined && decimals > 0
        ? `${formattedInt}.${decPart}`
        : formattedInt;
    }
    return decimals > 0 ? num.toFixed(decimals) : Math.round(num).toLocaleString('en-IN');
  };

  useEffect(() => {
    isFirstRender.current = false;

    const tween = gsap.to(countRef.current, {
      val: value,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(countRef.current.val);
      },
    });

    return () => {
      tween.kill();
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}
