import { PolicyConfigItem, PolicyType } from './types';

export const REFERENCE_AGE = 19;
export const DEFAULT_AGE_RATE = 0.025;
export const STANDARD_REBATE = 5;
export const JOINT_LIFE_REBATE = 7;
export const DEFAULT_GST_RATE = 0;
export const CALCULATION_VERSION = '2.0';

export const MIN_PREMIUM_BOUND = 100;
export const MAX_PREMIUM_BOUND = 100000;

export const POLICY_CONFIG: Record<PolicyType, PolicyConfigItem> = {
  ENDOWMENT: {
    name: 'Endowment Assurance (Santosh)',
    code: 'EA',
    bonusRate: 52,
    minSumAssured: 20000,
    maxSumAssured: 5000000,
    minAge: 19,
    maxAge: 55,
    minTerm: 5,
    maxTerm: 55,
    loanYears: 3,
    surrenderYears: 3,
    presetMaturityAges: [35, 40, 45, 50, 55, 58, 60],
    description: 'Provides sum assured with accrued bonus at maturity or to nominee upon death.',
  },
  ANTICIPATED_ENDOWMENT: {
    name: 'Anticipated Endowment Assurance (Sumangal)',
    code: 'AEA',
    bonusRate: 48,
    minSumAssured: 20000,
    maxSumAssured: 5000000,
    minAge: 19,
    maxAge: 45,
    minTerm: 15,
    maxTerm: 20,
    loanYears: null, // No loan facility available for Sumangal
    surrenderYears: 3,
    description: 'Money back policy providing periodic survival benefits and full maturity benefits.',
  },
  CHILDREN: {
    name: 'Children Policy (Bal Jeevan Bima)',
    code: 'CHILDREN',
    bonusRate: 52,
    minSumAssured: 20000,
    maxSumAssured: 1000000,
    minAge: 5,
    maxAge: 12,
    minTerm: 5,
    maxTerm: 20,
    loanYears: null,
    surrenderYears: 3,
    description: 'Provides insurance cover for children of PLI policyholders with high bonus benefits.',
  },
  CONVERTIBLE_WHOLE_LIFE: {
    name: 'Convertible Whole Life Assurance (Suvidha)',
    code: 'CWLA',
    bonusRate: 76,
    minSumAssured: 20000,
    maxSumAssured: 5000000,
    minAge: 19,
    maxAge: 50,
    minTerm: 5,
    maxTerm: 55,
    loanYears: 4,
    surrenderYears: 3,
    presetMaturityAges: [35, 40, 45, 50, 55, 58, 60],
    description: 'Whole Life policy convertible into Endowment Assurance after 5 years.',
  },
  WHOLE_LIFE: {
    name: 'Whole Life Assurance (Suraksha)',
    code: 'WLA',
    bonusRate: 76,
    minSumAssured: 20000,
    maxSumAssured: 5000000,
    minAge: 19,
    maxAge: 55,
    minTerm: 5,
    maxTerm: 60,
    loanYears: 4,
    surrenderYears: 3,
    presetMaturityAges: [55, 58, 60],
    description: 'Assures payment of sum assured plus bonus upon attaining age 80 or earlier death.',
  },
  JOINT_LIFE: {
    name: 'Joint Life Assurance (Yugal Suraksha)',
    code: 'JLEA',
    bonusRate: 52,
    minSumAssured: 20000,
    maxSumAssured: 5000000,
    minAge: 19,
    maxAge: 45,
    minTerm: 5,
    maxTerm: 45,
    loanYears: 3,
    surrenderYears: 3,
    presetMaturityAges: [35, 40, 45, 50, 55, 58, 60],
    description: 'Joint life cover for couples where both lives are covered under a single policy.',
  },
};
