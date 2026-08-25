import { CALIBRATION_DATASET } from './reference-data';
import { PolicyType } from './types';

export interface InterpolationResult {
  basePremium: number;
  isExact: boolean;
  lowerPoint?: { duration: number; premium: number };
  upperPoint?: { duration: number; premium: number };
}

/**
 * Interpolates or matches base premium for ₹1,00,000 SA.
 */
export function interpolateBasePremium(
  policyType: PolicyType,
  duration: number
): InterpolationResult {
  const points = CALIBRATION_DATASET[policyType] || [];

  if (points.length === 0) {
    return { basePremium: 380, isExact: false };
  }

  // Exact match check
  const exact = points.find((p) => p.duration === duration);
  if (exact) {
    return {
      basePremium: exact.premium,
      isExact: true,
      lowerPoint: exact,
      upperPoint: exact,
    };
  }

  // If duration is lower than lowest reference duration
  if (duration <= points[0].duration) {
    return {
      basePremium: points[0].premium,
      isExact: false,
      lowerPoint: points[0],
      upperPoint: points[0],
    };
  }

  // If duration is higher than highest reference duration
  if (duration >= points[points.length - 1].duration) {
    return {
      basePremium: points[points.length - 1].premium,
      isExact: false,
      lowerPoint: points[points.length - 1],
      upperPoint: points[points.length - 1],
    };
  }

  // Find lower and upper bound for interpolation
  let lower = points[0];
  let upper = points[points.length - 1];

  for (let i = 0; i < points.length - 1; i++) {
    if (duration >= points[i].duration && duration <= points[i + 1].duration) {
      lower = points[i];
      upper = points[i + 1];
      break;
    }
  }

  // Linear Interpolation: P = P1 + ((D - D1) / (D2 - D1)) * (P2 - P1)
  const dRatio = (duration - lower.duration) / (upper.duration - lower.duration);
  const interpolated = lower.premium + dRatio * (upper.premium - lower.premium);

  return {
    basePremium: Math.round(interpolated * 100) / 100,
    isExact: false,
    lowerPoint: lower,
    upperPoint: upper,
  };
}
