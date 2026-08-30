import { AuditStep, PremiumFrequency } from './types';
import { formatINR } from './utils';

export interface AuditTrailInput {
  policyName: string;
  policyCode: string;
  effectiveAge: number;
  maturityAge: number;
  duration: number;
  bonusDuration?: number;
  bonusRate: number;
  annualBonus: number;
  totalBonus: number;
  sumAssured: number;
  frequency: PremiumFrequency;
  basePremium: number;
  rebate: number;
  frequencyDiscount: number;
  tax: number;
  netMonthlyPremium: number;
  netInstallmentPremium: number;
  totalPremiumPaid: number;
  maturityAmount: number;
  confidenceScore: number;
  calculationMethod: string;
  isConverted?: boolean;
}

export function generatePliAuditTrail(input: AuditTrailInput): AuditStep[] {
  const bonusYears = input.bonusDuration ?? input.duration;
  return [
    {
      title: '1. Policy Identification & Entry Age',
      formula: 'Effective Age = Current Completed Age (or Joint Avg for Yugal)',
      values: `Policy: ${input.policyName} (${input.policyCode}) | Effective Age: ${input.effectiveAge} years`,
      result: `${input.effectiveAge} years`,
      note: `Policy Code: ${input.policyCode}`,
    },
    {
      title: '2. Policy Payment Duration & Target Maturity',
      formula: 'Duration = Target Maturity Age - Effective Age',
      values: `Maturity Age (${input.maturityAge}) - Effective Age (${input.effectiveAge})`,
      result: `${input.duration} years`,
    },
    {
      title: '3. Declared Bonus Rate & Annual Projection',
      formula: 'Annual Bonus = (Sum Assured / 1,000) × Bonus Rate',
      values: `(${formatINR(input.sumAssured)} / 1,000) × ₹${input.bonusRate}`,
      result: `${formatINR(input.annualBonus)} / year`,
      note: input.isConverted
        ? 'Converted Suvidha earns Endowment bonus rate of ₹52 per ₹1,000 SA'
        : `Declared bonus rate is ₹${input.bonusRate} per ₹1,000 SA`,
    },
    {
      title: '4. Total Accrued Bonus Projection',
      formula: 'Total Bonus = Annual Bonus × Bonus Accrual Years',
      values: `${formatINR(input.annualBonus)} × ${bonusYears} years`,
      result: formatINR(input.totalBonus),
    },
    {
      title: '5. Premium Rate Table Surface Estimation',
      formula: 'Base Premium = f(Effective Age, Duration) per ₹1,00,000 SA',
      values: `Effective Age ${input.effectiveAge}, Payment Duration ${input.duration} years`,
      result: `₹${input.basePremium}/month (Base per ₹1L SA)`,
      note: `Estimation Model: ${input.calculationMethod} (Confidence ${input.confidenceScore}%)`,
    },
    {
      title: '6. Sum Assured Scaling & Rebate Adjustments',
      formula: 'Net Monthly Premium = Base Premium × (SA / 100,000) - Rebate + Tax',
      values: `Base ₹${input.basePremium} × ${input.sumAssured / 100000} - Rebate ₹${input.rebate} + Tax ₹${input.tax}`,
      result: `${formatINR(input.netMonthlyPremium)} / month`,
    },
    {
      title: '7. Payment Frequency & Advance Rebates',
      formula: 'Installment Premium = (Net Monthly × Months) - Frequency Discount',
      values: `Mode: ${input.frequency} | Monthly Net: ${formatINR(input.netMonthlyPremium)} | Discount: ${formatINR(input.frequencyDiscount)}`,
      result: `${formatINR(input.netInstallmentPremium)} / installment`,
    },
    {
      title: '8. Total Premium Paid Over Policy Lifecycle',
      formula: 'Total Paid = Net Monthly Premium × 12 × Duration',
      values: `${formatINR(input.netMonthlyPremium)} × 12 × ${input.duration} years`,
      result: formatINR(input.totalPremiumPaid),
    },
    {
      title: '9. Total Overall Returns & Benefits',
      formula: 'Total Maturity Return = Sum Assured + Total Accrued Bonus + Terminal Bonus',
      values: `Sum Assured (${formatINR(input.sumAssured)}) + Accrued Bonus (${formatINR(input.totalBonus)})`,
      result: formatINR(input.maturityAmount),
    },
  ];
}
