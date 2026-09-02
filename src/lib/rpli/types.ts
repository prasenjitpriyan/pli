import { AuditStep, BenefitTimelineStep, PliValidationResult, PremiumFrequency, SurvivalBenefitPayout } from '../pli/types';

export type InsuranceScheme = 'PLI' | 'RPLI';

export type RpliPolicy =
  | 'GRAM_SURAKSHA'
  | 'GRAM_SUVIDHA'
  | 'GRAM_SANTOSH'
  | 'GRAM_PRIYA'
  | 'GRAM_SUMANGAL'
  | 'BAL_JEEVAN_BIMA';

export type AgeProofType = 'STANDARD' | 'NON-STANDARD';

export interface RpliInput {
  scheme?: InsuranceScheme;
  policyType: RpliPolicy | string;
  effectiveDate?: string; // YYYY-MM-DD (Policy Start Date)
  commencementDate?: string; // YYYY-MM-DD
  dateOfBirth?: string; // YYYY-MM-DD (Policyholder DOB)
  age?: number; // Exact completed age

  isRuralResident?: boolean;
  hasOperativeSBAccount?: boolean;
  bankAccountType?: 'POSB' | 'SCHEDULED_BANK' | 'NONE';
  ageProofType?: AgeProofType;

  frequency?: PremiumFrequency;
  
  customer?: {
    fullName?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    eligibilityCategory?: string;
    pincode?: string;
  };
  
  // Children Policy Inputs
  childDateOfBirth?: string; // YYYY-MM-DD
  childAge?: number;
  childName?: string;
  childPolicyRequired?: boolean;
  childSumAssured?: number;
  parentAge?: number;
  parentSumAssured?: number;
  isParentDeceased?: boolean;

  // Whole Life Ceasing Age
  premiumCeasingAge?: number;

  // Convertible Whole Life Option
  isConverted?: boolean;

  sumAssured: number;
  maturityAge?: number;
  duration?: number;
  rebate?: number;
}

import type { ModePremiumDetail } from '../pli/types';
export type { ModePremiumDetail };

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
  terminalBonus?: number;

  // Mode-wise Breakdown Grid
  modeDetails: {
    monthly: ModePremiumDetail;
    quarterly: ModePremiumDetail;
    halfYearly: ModePremiumDetail;
    yearly: ModePremiumDetail;
  };

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

  medicalRequired: boolean;
  medicalRuleStatus: string;

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
  rateSource: string;

  timeline?: BenefitTimelineStep[];
  breakdown: AuditStep[];
}
