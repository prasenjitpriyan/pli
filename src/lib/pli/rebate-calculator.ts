import { PolicyType } from './types';

/**
 * Calculates the High Sum Assured monthly rebate.
 * Under official India Post PLI rules:
 * - Single Life policies: ₹1 per ₹20,000 Sum Assured (e.g. ₹5/month for ₹1,00,000 SA, ₹25/month for ₹5,00,000 SA).
 * - Joint Life (Yugal Suraksha): ₹1 per ₹10,000 Sum Assured (e.g. ₹10/month for ₹1,00,000 SA).
 */
export function calculateRebate(params: {
  policyType: PolicyType;
  sumAssured: number;
  overrideRebate?: number;
}): number {
  if (params.overrideRebate !== undefined) {
    return params.overrideRebate;
  }

  if (params.policyType === 'JOINT_LIFE' || params.policyType === 'YUGAL_SURAKSHA') {
    // ₹1 per ₹10,000 SA for Joint Life
    return Math.floor(params.sumAssured / 10000);
  }

  // Standard PLI single life policy rebate: ₹1 per ₹20,000 SA
  return Math.floor(params.sumAssured / 20000);
}
