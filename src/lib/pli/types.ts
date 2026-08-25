export type PolicyType =
  | 'ANTICIPATED_ENDOWMENT'
  | 'CONVERTIBLE_WHOLE_LIFE'
  | 'ENDOWMENT'
  | 'CHILDREN'
  | 'WHOLE_LIFE'
  | 'JOINT_LIFE';

export type PolicyTypeAlias = 'WLA' | 'EA' | 'CWLA' | 'AEA' | 'CHILDREN' | 'JLEA';

export type AgeInputMode = 'DOB' | 'AGE';
export type TermInputMode = 'DURATION' | 'MATURITY_AGE';

export interface PLIInput {
  policyType: PolicyType;
  effectiveDate?: string; // YYYY-MM-DD
  dateOfBirth?: string; // YYYY-MM-DD
  age?: number;
  
  // Joint Life Inputs
  firstLifeAge?: number;
  secondLifeAge?: number;
  
  // Children Policy Inputs
  childAge?: number;
  
  spouseDateOfBirth?: string; // YYYY-MM-DD
  spouseAge?: number;
  
  sumAssured: number;
  maturityAge?: number;
  duration?: number;
  ageRate?: number;
  rebate?: number;
  gstRate?: number;
}

export interface CalculationStep {
  title: string;
  formula: string;
  values: string;
  result: string;
  note?: string;
}

export interface PLIQuotationResult {
  policyType: PolicyType;
  policyName: string;
  policyCode: PolicyTypeAlias;
  
  // Inputs & Age / Duration
  dateOfBirth?: string;
  effectiveDate: string;
  age: number;
  effectiveAge: number;
  firstLifeAge?: number;
  secondLifeAge?: number;
  childAge?: number;
  maturityAge: number;
  duration: number;
  
  // Amounts
  sumAssured: number;
  
  // Bonus details
  bonusRate: number; // ₹ per ₹1,000 Sum Assured
  annualBonus: number;
  totalBonus: number;

  // Premium details
  referenceBasePremium: number; // Base premium for ₹1L SA
  interpolatedReferencePremium: number;
  sumAssuredFactor: number; // sumAssured / 100000
  ageFactor: number;
  estimatedMonthlyPremium: number; // Gross monthly premium
  rebate: number;
  tax: number;
  netMonthlyPremium: number;
  totalPremiumPaid: number;

  // Terminal Bonus & Maturity
  terminalBonus: number;
  maturityAmount: number;

  // Transparency & Confidence Flags
  isEstimated: boolean;
  premiumSource: 'REFERENCE' | 'ESTIMATED';
  confidenceScore: number; // Percentage 0-100%
  calculationMethod: string;
  calculationVersion: string;
  
  // Breakdown
  breakdown: CalculationStep[];
}

export interface PolicyConfigItem {
  name: string;
  code: PolicyTypeAlias;
  bonusRate: number;
  minSumAssured: number;
  maxSumAssured: number;
  minAge: number;
  maxAge: number;
  minTerm: number;
  maxTerm: number;
  description: string;
}
