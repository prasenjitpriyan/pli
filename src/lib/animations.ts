import { Variants } from 'motion/react';

/**
 * Common Motion transition curves optimized for 60fps mobile execution
 */
export const springSmooth = {
  type: 'spring',
  stiffness: 350,
  damping: 30,
};

export const springBouncy = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
};

export const springGentle = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

/**
 * Motion animation variants for container staggering and reveals
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 25,
    },
  },
};

export const cardHoverMobile = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: springSmooth },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};
