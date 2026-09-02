'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RouteProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let active = true;
    // Schedule animation asynchronously to prevent cascading renders
    const timerStart = setTimeout(() => {
      if (active) setProgress(30);
    }, 10);

    const timer1 = setTimeout(() => {
      if (active) setProgress(75);
    }, 120);

    const timer2 = setTimeout(() => {
      if (active) setProgress(100);
    }, 320);

    const timer3 = setTimeout(() => {
      if (active) setProgress(0);
    }, 550);

    return () => {
      active = false;
      clearTimeout(timerStart);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname]);

  if (progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-9999 h-1 bg-transparent pointer-events-none"
      aria-hidden="true">
      <div
        className="h-full bg-linear-to-r from-(--primary-red) via-(--accent-gold) to-[#fcd34d] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(197,160,69,0.8)]"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
