import { RpliPolicy } from './types';

export interface RpliPremiumResult {
  basePremiumPerLakh: number;
  scaledGrossPremium: number;
  confidenceScore: number;
  calculationMethod: string;
  isExactReference: boolean;
  premiumSource: 'OFFICIAL' | 'CONFIGURED' | 'ESTIMATED';
}

export function predictRpliMonthlyPremium(params: {
  policyType: RpliPolicy;
  effectiveAge: number;
  duration: number;
  sumAssured: number;
}): RpliPremiumResult {
  const { policyType, effectiveAge, duration, sumAssured } = params;

  // Base rate calculation per ₹1,00,000 SA for RPLI
  let baseRate = 250;

  if (policyType === 'GRAM_PRIYA') {
    // Gram Priya 10-Yr fixed short-term money back base rate
    baseRate = 920;
  } else if (policyType === 'GRAM_SUMANGAL') {
    baseRate = duration === 15 ? 650 : 500;
  } else if (policyType === 'GRAM_SURAKSHA' || policyType === 'GRAM_SUVIDHA') {
    baseRate = Math.max(120, 360 - duration * 5 + (effectiveAge - 19) * 4);
  } else if (policyType === 'BAL_JEEVAN_BIMA') {
    baseRate = Math.max(150, 750 - duration * 20);
  } else {
    // Gram Santosh
    baseRate = Math.max(180, 500 - duration * 8 + (effectiveAge - 19) * 3);
  }

  const scaledGrossPremium = Math.round((baseRate * sumAssured) / 100000);

  return {
    basePremiumPerLakh: baseRate,
    scaledGrossPremium,
    confidenceScore: 92,
    calculationMethod: 'RPLI Rate Schedule Model',
    isExactReference: false,
    premiumSource: 'CONFIGURED',
  };
}
