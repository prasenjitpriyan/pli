import { PolicyType } from './types';

/**
 * Calculates Terminal Bonus according to PLI rules.
 * For Endowment Assurance with duration >= 20 years:
 * ₹20 per ₹10,000 Sum Assured, subject to max ₹1,000.
 */
export function calculateTerminalBonus(params: {
  policyType: PolicyType;
  sumAssured: number;
  duration: number;
}): number {
  const { policyType, sumAssured, duration } = params;

  if (policyType === 'ENDOWMENT' && duration >= 20) {
    const rawTerminalBonus = (sumAssured / 10000) * 20;
    return Math.min(rawTerminalBonus, 1000);
  }

  return 0;
}
