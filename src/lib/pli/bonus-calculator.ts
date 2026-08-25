import { POLICY_CONFIG } from './config';
import { PolicyType } from './types';
import { mapToCanonicalPolicy } from './validation';

export interface BonusCalculationResult {
  bonusRate: number; // ₹ per ₹1,000 Sum Assured
  annualBonus: number;
  totalBonus: number;
}

export function calculateBonus(
  policyType: PolicyType,
  sumAssured: number,
  duration: number
): BonusCalculationResult {
  const canonical = mapToCanonicalPolicy(policyType);
  const config = POLICY_CONFIG[canonical];
  const bonusRate = config ? config.bonusRate : 52;
  
  const annualBonus = (sumAssured / 1000) * bonusRate;
  const totalBonus = annualBonus * duration;

  return {
    bonusRate,
    annualBonus,
    totalBonus,
  };
}
