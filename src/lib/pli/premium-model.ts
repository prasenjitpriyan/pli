import {
  DEFAULT_AGE_RATE,
  MAX_PREMIUM_BOUND,
  MIN_PREMIUM_BOUND,
  REFERENCE_AGE,
} from './config';
import { CALIBRATION_DATASET, CalibrationPoint } from './reference-data';
import { PolicyType } from './types';
import { mapToCanonicalPolicy } from './validation';

export interface ModelPredictionResult {
  basePremiumPerLakh: number; // Base monthly premium for ₹1,00,000 SA
  scaledGrossPremium: number; // Scaled by sumAssured
  confidenceScore: number; // Percentage 0-100%
  calculationMethod: string;
  isExactReference: boolean;
  premiumSource: 'REFERENCE' | 'ESTIMATED';
}

/**
 * Continuous Mathematical Estimation Model for PLI Premium Rates.
 */
export function predictMonthlyPremium(params: {
  policyType: PolicyType;
  effectiveAge: number;
  duration: number;
  sumAssured: number;
  ageRate?: number;
}): ModelPredictionResult {
  const { policyType, effectiveAge, duration, sumAssured, ageRate } = params;

  const dataset =
    CALIBRATION_DATASET[policyType] ||
    CALIBRATION_DATASET[mapToCanonicalPolicy(policyType)] ||
    [];

  // 1. Exact Reference Match Check
  const exactMatch = dataset.find(
    (p) => p.age === effectiveAge && p.duration === duration
  );

  if (exactMatch) {
    const gross = Math.round(exactMatch.premium * (sumAssured / 100000));
    return {
      basePremiumPerLakh: exactMatch.premium,
      scaledGrossPremium: Math.max(
        MIN_PREMIUM_BOUND,
        Math.min(MAX_PREMIUM_BOUND, gross)
      ),
      confidenceScore: 100,
      calculationMethod: 'Exact Reference Calibration Dataset Match',
      isExactReference: true,
      premiumSource: 'REFERENCE',
    };
  }

  // 2. Filter dataset for exact age match if available
  const sameAgePoints = dataset.filter((p) => p.age === effectiveAge);

  if (sameAgePoints.length > 0) {
    const interpolatedBase = interpolate1D(sameAgePoints, duration);
    const gross = Math.round(interpolatedBase * (sumAssured / 100000));
    return {
      basePremiumPerLakh: interpolatedBase,
      scaledGrossPremium: Math.max(
        MIN_PREMIUM_BOUND,
        Math.min(MAX_PREMIUM_BOUND, gross)
      ),
      confidenceScore: 95,
      calculationMethod: `Interpolated 1D Duration Curve (Age ${effectiveAge})`,
      isExactReference: false,
      premiumSource: 'ESTIMATED',
    };
  }

  // 3. Multi-Variable Surface Interpolation across Age & Duration Tiers
  // Group dataset by age
  const uniqueAges = Array.from(new Set(dataset.map((p) => p.age))).sort(
    (a, b) => a - b
  );

  if (uniqueAges.length >= 2) {
    const lowerAge = uniqueAges.reduce(
      (prev, curr) => (curr <= effectiveAge ? curr : prev),
      uniqueAges[0]
    );
    const upperAge = uniqueAges.reduce(
      (next, curr) => (curr >= effectiveAge && next === uniqueAges[0] ? curr : next),
      uniqueAges[uniqueAges.length - 1]
    );

    if (lowerAge !== upperAge) {
      const lowerPoints = dataset.filter((p) => p.age === lowerAge);
      const upperPoints = dataset.filter((p) => p.age === upperAge);

      const premAtLower = interpolate1D(lowerPoints, duration);
      const premAtUpper = interpolate1D(upperPoints, duration);

      const ageRatio = (effectiveAge - lowerAge) / (upperAge - lowerAge);
      const surfaceBase = premAtLower + ageRatio * (premAtUpper - premAtLower);

      const confidenceScore = Math.max(70, Math.min(92, Math.round(92 - Math.abs(effectiveAge - (lowerAge + upperAge) / 2) * 2)));

      const gross = Math.round(surfaceBase * (sumAssured / 100000));
      return {
        basePremiumPerLakh: Math.round(surfaceBase * 100) / 100,
        scaledGrossPremium: Math.max(
          MIN_PREMIUM_BOUND,
          Math.min(MAX_PREMIUM_BOUND, gross)
        ),
        confidenceScore,
        calculationMethod: `Bi-Linear Surface Model (Ages ${lowerAge} & ${upperAge})`,
        isExactReference: false,
        premiumSource: 'ESTIMATED',
      };
    }
  }

  // 4. Fallback Hybrid Model: Reference Base Curve + Exponential Age Factor
  // Find nearest reference age points (e.g. 19 or 30)
  const baseAge = uniqueAges[0] || REFERENCE_AGE;
  const basePoints = dataset.filter((p) => p.age === baseAge);
  const baseDurationPrem = interpolate1D(basePoints, duration);

  const rate = ageRate ?? DEFAULT_AGE_RATE;
  const ageExponent = effectiveAge - baseAge;
  const ageFactor = Math.pow(1 + rate, ageExponent);

  const hybridBase = baseDurationPrem * ageFactor;
  const gross = Math.round(hybridBase * (sumAssured / 100000));

  // Compute confidence score based on distance from reference data
  const minAgeDist = Math.min(...dataset.map((p) => Math.abs(p.age - effectiveAge)));
  const minDurDist = Math.min(...dataset.map((p) => Math.abs(p.duration - duration)));
  const dist = Math.sqrt(minAgeDist * minAgeDist + minDurDist * minDurDist);

  let confidenceScore = 90;
  if (dist > 15) confidenceScore = 65;
  else if (dist > 8) confidenceScore = 78;
  else if (dist > 3) confidenceScore = 85;

  return {
    basePremiumPerLakh: Math.round(hybridBase * 100) / 100,
    scaledGrossPremium: Math.max(
      MIN_PREMIUM_BOUND,
      Math.min(MAX_PREMIUM_BOUND, gross)
    ),
    confidenceScore,
    calculationMethod: `Hybrid Power-Law Age Adjustment Model (Base Age ${baseAge})`,
    isExactReference: false,
    premiumSource: 'ESTIMATED',
  };
}

/**
 * 1D linear interpolation along duration axis.
 */
function interpolate1D(points: CalibrationPoint[], duration: number): number {
  if (points.length === 0) return 380;

  const sorted = [...points].sort((a, b) => a.duration - b.duration);

  // Exact match
  const exact = sorted.find((p) => p.duration === duration);
  if (exact) return exact.premium;

  // Below bounds
  if (duration <= sorted[0].duration) return sorted[0].premium;

  // Above bounds
  if (duration >= sorted[sorted.length - 1].duration) {
    return sorted[sorted.length - 1].premium;
  }

  // Find bounding duration interval
  for (let i = 0; i < sorted.length - 1; i++) {
    if (duration >= sorted[i].duration && duration <= sorted[i + 1].duration) {
      const lower = sorted[i];
      const upper = sorted[i + 1];
      const ratio = (duration - lower.duration) / (upper.duration - lower.duration);
      return lower.premium + ratio * (upper.premium - lower.premium);
    }
  }

  return sorted[0].premium;
}
