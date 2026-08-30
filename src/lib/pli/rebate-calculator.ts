import { PolicyType } from './types';

export function calculateRebate(params: {
  policyType: PolicyType;
  sumAssured: number;
  overrideRebate?: number;
}): number {
  if (params.overrideRebate !== undefined) {
    return params.overrideRebate;
  }

  const saInLakhs = params.sumAssured / 100000;

  if (params.policyType === 'JOINT_LIFE' || params.policyType === 'YUGAL_SURAKSHA') {
    // ₹9.7 per ₹1,00,000 SA (e.g. ₹97 for ₹10 Lakhs)
    return Math.round(saInLakhs * 9.7);
  }

  // Standard PLI single life policy rebate: ₹5 per ₹1,00,000 SA
  return Math.round(saInLakhs * 5);
}
