import { getExactPliRate, getOfficialPliEaTermRates } from '../../config/pli/rates';
import { PolicyType } from './types';
import { mapToCanonicalPolicy } from './validation';

export interface ModelPredictionResult {
  yearlyPremium: number;         // Annual gross premium (base before mode rebate)
  monthlyPremium: number;        // Monthly gross premium
  quarterlyPremium: number;      // Quarterly gross premium
  halfYearlyPremium: number;     // Half-yearly gross premium
  basePremiumPerLakh: number;    // Monthly per ₹1L SA (kept for backward compat)
  scaledGrossPremium: number;    // Monthly gross premium (kept for backward compat)
  confidenceScore: number;
  calculationMethod: string;
  isExactReference: boolean;
  premiumSource: 'REFERENCE' | 'ESTIMATED';
  monthlyRatePer1000: number;
  quarterlyRatePer1000: number;
  halfYearlyRatePer1000: number;
  yearlyRatePer1000: number;
}

/**
 * Official India Post PLI Premium Rate Engine.
 * Sourced from official Post Office Life Insurance Rules (Tables I to VI).
 */
export function predictMonthlyPremium(params: {
  policyType: PolicyType;
  effectiveAge: number;          // ANB (age next birthday)
  duration: number;              // Policy term in years
  sumAssured: number;
  premiumCeasingAge?: number;    // For Suraksha/Suvidha (55, 58, or 60)
  maturityAge?: number;          // For Santosh
  childAge?: number;             // For Bal Jeevan Bima
  isConverted?: boolean;         // For Suvidha
  ageRate?: number;              // Unused — kept for backward compat
}): ModelPredictionResult {
  const {
    policyType,
    effectiveAge,
    duration,
    sumAssured,
    premiumCeasingAge,
    maturityAge,
    childAge,
    isConverted,
  } = params;
  const canonical = mapToCanonicalPolicy(policyType);
  const units = sumAssured / 1000;

  const mRes = getExactPliRate({
    product: canonical,
    entryAge: effectiveAge,
    term: duration,
    mode: 'MONTHLY',
    ceasingAge: premiumCeasingAge,
    maturityAge,
    childAge,
    isConverted,
  });

  const qRes = getExactPliRate({
    product: canonical,
    entryAge: effectiveAge,
    term: duration,
    mode: 'QUARTERLY',
    ceasingAge: premiumCeasingAge,
    maturityAge,
    childAge,
    isConverted,
  });

  const hRes = getExactPliRate({
    product: canonical,
    entryAge: effectiveAge,
    term: duration,
    mode: 'HALF_YEARLY',
    ceasingAge: premiumCeasingAge,
    maturityAge,
    childAge,
    isConverted,
  });

  const yRes = getExactPliRate({
    product: canonical,
    entryAge: effectiveAge,
    term: duration,
    mode: 'YEARLY',
    ceasingAge: premiumCeasingAge,
    maturityAge,
    childAge,
    isConverted,
  });

  const monthlyRatePer1000 = mRes.ratePer1000;
  const quarterlyRatePer1000 = qRes.ratePer1000;
  const halfYearlyRatePer1000 = hRes.ratePer1000;
  const yearlyRatePer1000 = yRes.ratePer1000;

  const monthlyPremium = Math.round(monthlyRatePer1000 * units);
  const quarterlyPremium = Math.round(quarterlyRatePer1000 * units);
  const halfYearlyPremium = Math.round(halfYearlyRatePer1000 * units);
  const yearlyPremium = Math.round(yearlyRatePer1000 * units);

  const basePremiumPerLakh = Math.round(((monthlyPremium / sumAssured) * 100000) * 100) / 100;
  const method = `${mRes.source}: Age ${effectiveAge} (ANB), Term ${duration}yr, Rate ₹${monthlyRatePer1000}/₹1k/mo`;

  return {
    yearlyPremium,
    monthlyPremium,
    quarterlyPremium,
    halfYearlyPremium,
    basePremiumPerLakh,
    scaledGrossPremium: monthlyPremium,
    confidenceScore: 100,
    calculationMethod: method,
    isExactReference: true,
    premiumSource: 'REFERENCE',
    monthlyRatePer1000,
    quarterlyRatePer1000,
    halfYearlyRatePer1000,
    yearlyRatePer1000,
  };
}

/**
 * @deprecated Legacy helper kept for backward compatibility with older tests.
 * Computes base rate for endowment term from official PLI Table II.
 */
export function getSantoshYearlyRate(term: number): number {
  const rates = getOfficialPliEaTermRates(term);
  return (rates.monthly * 12) / 1000;
}
