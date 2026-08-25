import { JOINT_LIFE_REBATE, STANDARD_REBATE } from './config';
import { PolicyType } from './types';

export function calculateRebate(params: {
  policyType: PolicyType;
  sumAssured: number;
  overrideRebate?: number;
}): number {
  if (params.overrideRebate !== undefined) {
    return params.overrideRebate;
  }

  if (params.policyType === 'JOINT_LIFE') {
    return JOINT_LIFE_REBATE;
  }

  return STANDARD_REBATE;
}
