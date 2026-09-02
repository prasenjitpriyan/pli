'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from 'motion/react';
import { cn } from '@/lib/utils';

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
}

export interface FloatingDockProps {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  className?: string;
  mobileMode?: 'toggle' | 'row';
}

export function FloatingDock({
  items,
  desktopClassName,
  mobileClassName,
  className,
  mobileMode = 'row',
}: FloatingDockProps) {
  return (
    <div className={cn('relative', className)}>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      {mobileMode === 'row' ? (
        <FloatingDockMobileRow items={items} className={mobileClassName} />
      ) : (
        <FloatingDockMobileToggle items={items} className={mobileClassName} />
      )}
    </div>
  );
}

function FloatingDockDesktop({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'hidden md:flex h-16 items-end gap-3 rounded-2xl bg-neutral-900/90 px-4 pb-3 border border-white/10 backdrop-blur-xl shadow-2xl w-fit',
        className
      )}>
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  external,
}: FloatingDockItem & {
  mouseX: MotionValue;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [42, 70, 42]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [42, 70, 42]);

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 36, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 36, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-neutral-800 text-neutral-200 hover:bg-(--primary-red) hover:text-white transition-colors duration-200 shadow-md cursor-pointer">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 w-fit whitespace-pre rounded-md bg-neutral-950 border border-neutral-700 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-xl pointer-events-none z-50">
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center text-lg">
        {icon}
      </motion.div>
    </motion.div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="focus:outline-none">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={title} className="focus:outline-none">
      {content}
    </Link>
  );
}

function FloatingDockMobileRow({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex md:hidden items-center gap-2 overflow-x-auto py-2 px-3 bg-neutral-900/90 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl max-w-full no-scrollbar',
        className
      )}>
      {items.map((item) => {
        const content = (
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-neutral-200 active:bg-(--primary-red) active:text-white transition-colors shadow-sm">
            <div className="flex items-center justify-center text-base">{item.icon}</div>
          </motion.div>
        );

        if (item.external) {
          return (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.title}>
              {content}
            </a>
          );
        }

        return (
          <Link key={item.title} href={item.href} aria-label={item.title}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}

function FloatingDockMobileToggle({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('relative block md:hidden', className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="floating-dock-mobile-menu"
            className="absolute bottom-full mb-3 flex flex-col gap-2.5 z-50">
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.8,
                  transition: {
                    delay: idx * 0.04,
                  },
                }}
                transition={{
                  delay: (items.length - 1 - idx) * 0.04,
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                }}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 border border-white/20 text-white shadow-lg active:scale-95 transition-transform"
                    aria-label={item.title}>
                    <div className="flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 border border-white/20 text-white shadow-lg active:scale-95 transition-transform"
                    aria-label={item.title}>
                    <div className="flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        aria-label="Toggle Navigation Dock"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 border border-white/20 text-white shadow-xl active:scale-95 transition-transform cursor-pointer">
        <motion.i
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={open ? 'ri-close-line text-xl' : 'ri-apps-2-line text-xl text-(--accent-gold)'}
        />
      </button>
    </div>
  );
}
