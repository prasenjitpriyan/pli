'use client';

import { ReactNode } from 'react';
import { motion, MotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 28,
  duration = 0.5,
  once = true,
  ...props
}: ScrollRevealProps) {
  const getInitialOffsets = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialOffsets(),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay,
        duration,
      }}
      className={cn('will-change-transform', className)}
      {...props}>
      {children}
    </motion.div>
  );
}
