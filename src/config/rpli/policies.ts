import { RpliPolicy } from '../../lib/rpli/types';

export interface RpliPolicyConfigItem {
  name: string;
  code: string;
  bonusRate: number; // ₹ per ₹1,000 Sum Assured
  bonusSourcePolicy?: RpliPolicy;
  minSumAssured: number;
  maxSumAssured: number;
  minAge: number;
  maxAge: number;
  minTerm: number;
  maxTerm: number;
  description: string;
  loanYears?: number | null; // Years required for loan eligibility (null if not available)
  surrenderYears?: number | null; // Years required for surrender eligibility
  paidUpYears?: number | null; // Years required for paid-up status
  presetMaturityAges?: number[];
  specialFeatures?: string[];
}

export const RPLI_POLICY_REGISTRY: Record<RpliPolicy, RpliPolicyConfigItem> = {
  GRAM_SURAKSHA: {
    name: 'Gram Suraksha (Whole Life Assurance)',
    code: 'GWLA',
    bonusRate: 60,
    minSumAssured: 10000,
    maxSumAssured: 1000000, // ₹10 Lakhs max for RPLI
    minAge: 19,
    maxAge: 55,
    minTerm: 5,
    maxTerm: 60,
    loanYears: 4,
    surrenderYears: 3,
    presetMaturityAges: [55, 58, 60],
    description: 'RPLI Whole Life plan assuring payment of sum assured plus bonus upon attaining age 80 or earlier death.',
  },
  GRAM_SUVIDHA: {
    name: 'Gram Suvidha (Convertible Whole Life Assurance)',
    code: 'GCWLA',
    bonusRate: 60,
    minSumAssured: 10000,
    maxSumAssured: 1000000,
    minAge: 19,
    maxAge: 45,
    minTerm: 5,
    maxTerm: 55,
    loanYears: 4,
    surrenderYears: 3,
    presetMaturityAges: [35, 40, 45, 50, 55, 58, 60],
    description: 'Convertible Whole Life policy allowing conversion to Endowment Assurance after 5 years without medical re-exam.',
  },
  GRAM_SANTOSH: {
    name: 'Gram Santosh (Endowment Assurance)',
    code: 'GEA',
    bonusRate: 48,
    minSumAssured: 10000,
    maxSumAssured: 1000000,
    minAge: 19,
    maxAge: 55,
    minTerm: 5,
    maxTerm: 55,
    loanYears: 3,
    surrenderYears: 3,
    presetMaturityAges: [35, 40, 45, 50, 55, 58, 60],
    description: 'RPLI Endowment plan assuring sum assured plus accrued bonus at predetermined maturity age.',
  },
  GRAM_PRIYA: {
    name: 'Gram Priya (10 Years Short-Term Money Back)',
    code: 'GPRIYA',
    bonusRate: 45,
    minSumAssured: 10000,
    maxSumAssured: 1000000,
    minAge: 20,
    maxAge: 45,
    minTerm: 10,
    maxTerm: 10, // Fixed 10 Years Term
    loanYears: null,
    surrenderYears: null,
    specialFeatures: [
      'Natural Calamity Premium Relief: No interest charged for up to 1 year arrear of premium in case of flood, drought, earthquake, cyclone, etc.',
    ],
    description: '10-Year short-term Money Back scheme providing 20% SA payouts at Year 4 & 7, and 60% SA + Bonus at Year 10.',
  },
  GRAM_SUMANGAL: {
    name: 'Gram Sumangal (Anticipated Endowment Assurance)',
    code: 'GAEA',
    bonusRate: 45,
    minSumAssured: 10000,
    maxSumAssured: 1000000,
    minAge: 19,
    maxAge: 40, // Max 40 for 20-yr, 45 for 15-yr
    minTerm: 15,
    maxTerm: 20,
    loanYears: null,
    surrenderYears: 3,
    description: 'RPLI Money Back policy providing periodic survival benefits (60% SA) and 40% SA + bonus at maturity.',
  },
  BAL_JEEVAN_BIMA: {
    name: 'Bal Jeevan Bima (RPLI Children Policy)',
    code: 'RCHILDREN',
    bonusRate: 48, // Inherits Gram Santosh bonus rate
    bonusSourcePolicy: 'GRAM_SANTOSH',
    minSumAssured: 10000,
    maxSumAssured: 100000, // ₹1 Lakh max for RPLI child (or parent's SA, whichever is lower)
    minAge: 5,
    maxAge: 20,
    minTerm: 5,
    maxTerm: 20,
    loanYears: null, // Loan not available
    surrenderYears: null, // Surrender not available
    paidUpYears: 5, // Paid-Up eligible after 5 years
    specialFeatures: [
      'No medical examination required for child.',
      'Parent Death Premium Waiver: No premium payable after parent death; full SA + bonus paid on maturity.',
    ],
    description: 'RPLI Children Policy providing life cover up to ₹1 Lakh with 100% premium waiver upon parent death.',
  },
};
