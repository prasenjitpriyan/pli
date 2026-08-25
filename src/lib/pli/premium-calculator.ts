import { DEFAULT_AGE_RATE, REFERENCE_AGE } from './config';
import { interpolateBasePremium } from './interpolation';
import { PolicyType } from './types';

export interface PremiumEstimationResult {
  referenceBasePremium: number;
  interpolatedReferencePremium: number;
  sumAssuredFactor: number;
  ageFactor: number;
  estimatedMonthlyPremium: number;
  isExactReference: boolean;
  premiumSource: 'REFERENCE' | 'ESTIMATED';
}

export function estimateMonthlyPremium(params: {
  policyType: PolicyType;
  age: number;
  duration: number;
  sumAssured: number;
  ageRate?: number;
}): PremiumEstimationResult {
  const { policyType, age, duration, sumAssured, ageRate } = params;

  // Step 1 & 2: Exact lookup or Linear Interpolation for duration
  const interpolation = interpolateBasePremium(policyType, duration);
  const interpolatedReferencePremium = interpolation.basePremium;

  // Step 3: Sum Assured Scaling Factor (Reference is ₹1,00,000 SA)
  const sumAssuredFactor = sumAssured / 100000;

  // Step 4: Age Factor Adjustment (Reference Age is 19)
  const rate = ageRate ?? DEFAULT_AGE_RATE;
  const ageFactor = Math.pow(1 + rate, age - REFERENCE_AGE);

  // Step 5: Estimated Monthly Premium (Gross)
  const rawPremium = interpolatedReferencePremium * sumAssuredFactor * ageFactor;
  const estimatedMonthlyPremium = Math.round(rawPremium);

  const isExactReference =
    interpolation.isExact && age === REFERENCE_AGE && sumAssured === 100000;

  return {
    referenceBasePremium: interpolatedReferencePremium,
    interpolatedReferencePremium,
    sumAssuredFactor,
    ageFactor,
    estimatedMonthlyPremium,
    isExactReference,
    premiumSource: isExactReference ? 'REFERENCE' : 'ESTIMATED',
  };
}
