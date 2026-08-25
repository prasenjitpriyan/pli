export type PliPolicy =
  | 'SURAKSHA'
  | 'SANTOSH'
  | 'SUVIDHA'
  | 'SUMANGAL'
  | 'YUGAL_SURAKSHA'
  | 'BAL_JEEVAN_BIMA';

// Legacy PolicyType type alias for backward compatibility
export type PolicyType =
  | PliPolicy
  | 'ANTICIPATED_ENDOWMENT'
  | 'CONVERTIBLE_WHOLE_LIFE'
  | 'ENDOWMENT'
  | 'CHILDREN'
  | 'WHOLE_LIFE'
  | 'JOINT_LIFE';

export type PolicyTypeAlias = 'WLA' | 'EA' | 'CWLA' | 'AEA' | 'CHILDREN' | 'JLEA';

export type AgeInputMode = 'DOB' | 'AGE';
export type TermInputMode = 'DURATION' | 'MATURITY_AGE';
export type PremiumFrequency = 'MONTHLY' | 'QUARTERLY' | 'HALF_YEARLY' | 'YEARLY';

export interface PliCustomerInput {
  fullName?: string;
  dateOfBirth?: string; // YYYY-MM-DD
  age?: number;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  occupation?: string;
  eligibilityCategory?: string;
  mobileNumber?: string;
  email?: string;
  pincode?: string;
  state?: string;
}

export interface PliInput {
  policyType: PolicyType;
  effectiveDate?: string; // YYYY-MM-DD
  commencementDate?: string; // YYYY-MM-DD
  dateOfBirth?: string; // YYYY-MM-DD
  age?: number;

  // Premium Frequency
  frequency?: PremiumFrequency;
  
  // Customer details
  customer?: PliCustomerInput;
  
  // Joint Life Inputs (Yugal Suraksha)
  firstLifeAge?: number;
  secondLifeAge?: number;
  firstLifeName?: string;
  secondLifeName?: string;
  
  // Children Policy Inputs (Bal Jeevan Bima)
  childAge?: number;
  childName?: string;
  parentAge?: number;
  parentSumAssured?: number;

  // Whole Life Ceasing Age (55, 58, 60)
  premiumCeasingAge?: number;

  // Convertible Whole Life Option (Suvidha conversion to Endowment)
  isConverted?: boolean;
  
  spouseDateOfBirth?: string; // YYYY-MM-DD
  spouseAge?: number;
  
  sumAssured: number;
  maturityAge?: number;
  duration?: number;
  ageRate?: number;
  rebate?: number;
  gstRate?: number;
}

export type PLIInput = PliInput; // Alias for backward compatibility

export interface CalculationStep {
  title: string;
  formula: string;
  values: string;
  result: string;
  note?: string;
}

export type AuditStep = CalculationStep;

export interface SurvivalBenefitPayout {
  year: number;
  percentage: number;
  description: string;
  amount: number;
}

export interface BenefitTimelineStep {
  year: number;
  type: 'PAYMENT' | 'PAYOUT' | 'MATURITY';
  description: string;
  amount: number;
}

export interface PliValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface PliQuoteResult {
  policyType: PliPolicy;
  policyName: string;
  policyCode: PolicyTypeAlias;
  
  // Customer & Age details
  customer?: PliCustomerInput;
  dateOfBirth?: string;
  effectiveDate: string;
  age: number;
  effectiveAge: number;
  firstLifeAge?: number;
  secondLifeAge?: number;
  childAge?: number;
  premiumCeasingAge?: number;
  premiumPaymentDuration?: number;
  bonusAccrualDuration?: number;
  isConverted?: boolean;
  conversionStatus?: 'CONVERTED' | 'UNCONVERTED';
  maturityAge: number;
  duration: number;
  
  // Amounts
  sumAssured: number;
  frequency: PremiumFrequency;
  
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
  frequencyPremium: number; // Premium per installment frequency
  frequencyDiscount: number; // Advance frequency rebate
  rebate: number;
  tax: number;
  netMonthlyPremium: number;
  netInstallmentPremium: number;
  annualizedPremium: number;
  totalPremiumPaid: number;

  // Terminal Bonus & Maturity
  terminalBonus: number;
  survivalBenefits?: SurvivalBenefitPayout[];
  finalMaturityPayout?: number;
  maturityAmount: number;
  deathBenefitAmount: number;

  // Facility Metadata
  loanYears?: number | null;
  surrenderYears?: number | null;

  // Validation & Audit Flags
  eligibility: PliValidationResult;
  isEstimated: boolean;
  premiumSource: 'OFFICIAL' | 'CONFIGURED' | 'ESTIMATED';
  confidenceScore: number; // Percentage 0-100%
  calculationMethod: string;
  calculationVersion: string;
  rateTableVersion: string;
  
  // Visual Timeline & Breakdown
  timeline?: BenefitTimelineStep[];
  breakdown: CalculationStep[];
}

export type PLIQuotationResult = PliQuoteResult; // Alias for backward compatibility

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
  loanYears?: number | null; // Years required for loan eligibility (null if not available)
  surrenderYears?: number | null; // Years required for surrender eligibility
  presetMaturityAges?: number[];
}
