import { AuditStep, BenefitTimelineStep, PliValidationResult, PremiumFrequency, SurvivalBenefitPayout } from '../pli/types';

export type InsuranceScheme = 'PLI' | 'RPLI';

export type RpliPolicy =
  | 'GRAM_SURAKSHA'
  | 'GRAM_SUVIDHA'
  | 'GRAM_SANTOSH'
  | 'GRAM_PRIYA'
  | 'GRAM_SUMANGAL'
  | 'BAL_JEEVAN_BIMA';

export interface RpliInput {
  scheme?: InsuranceScheme;
  policyType: RpliPolicy | string;
  effectiveDate?: string; // YYYY-MM-DD
  commencementDate?: string; // YYYY-MM-DD
  dateOfBirth?: string; // YYYY-MM-DD
  age?: number;

  frequency?: PremiumFrequency;
  
  customer?: {
    fullName?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    eligibilityCategory?: string;
    pincode?: string;
  };
  
  // Children Policy Inputs
  childAge?: number;
  childName?: string;
  parentAge?: number;
  parentSumAssured?: number;
  isParentDeceased?: boolean; // Parent death state toggle

  // Whole Life Ceasing Age
  premiumCeasingAge?: number;

  // Convertible Whole Life Option
  isConverted?: boolean;

  sumAssured: number;
  maturityAge?: number;
  duration?: number;
  rebate?: number;
}

export interface RpliQuoteResult {
  scheme: InsuranceScheme;
  policyType: RpliPolicy;
  policyName: string;
  policyCode: string;

  effectiveDate: string;
  age: number;
  effectiveAge: number;
  childAge?: number;
  parentAge?: number;
  premiumCeasingAge?: number;
  premiumPaymentDuration?: number;
  bonusAccrualDuration?: number;
  isConverted?: boolean;
  conversionStatus?: 'CONVERTED' | 'UNCONVERTED';

  maturityAge: number;
  duration: number;

  sumAssured: number;
  frequency: PremiumFrequency;

  bonusRate: number; // ₹ per ₹1,000 Sum Assured
  annualBonus: number;
  totalBonus: number;

  referenceBasePremium: number;
  estimatedMonthlyPremium: number;
  frequencyPremium: number;
  frequencyDiscount: number;
  rebate: number;
  tax: number;
  netMonthlyPremium: number;
  netInstallmentPremium: number;
  annualizedPremium: number;
  totalPremiumPaid: number;

  survivalBenefits?: SurvivalBenefitPayout[];
  finalMaturityPayout?: number;
  maturityAmount: number;
  deathBenefitAmount: number;

  loanYears?: number | null;
  surrenderYears?: number | null;
  paidUpYears?: number | null;
  isPaidUpEligible?: boolean;
  specialFeatures?: string[];

  eligibility: PliValidationResult;
  isEstimated: boolean;
  premiumSource: 'OFFICIAL' | 'CONFIGURED' | 'ESTIMATED';
  confidenceScore: number;
  calculationMethod: string;
  calculationVersion: string;
  rateTableVersion: string;

  timeline?: BenefitTimelineStep[];
  breakdown: AuditStep[];
}
