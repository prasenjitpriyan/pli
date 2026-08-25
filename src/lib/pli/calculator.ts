import { FREQUENCY_CONFIG } from '../../config/pli/frequencies';
import { POLICY_REGISTRY } from '../../config/pli/policies';
import { calculateAge, calculateDurationAndMaturityAge, calculateEffectiveAge } from './age-calculator';
import { generatePliAuditTrail } from './audit-engine';
import { calculatePliBenefits } from './benefit-engine';
import { calculateBonus } from './bonus-calculator';
import { CALCULATION_VERSION } from './config';
import { predictMonthlyPremium } from './premium-model';
import { calculateRebate } from './rebate-calculator';
import { calculateTax } from './tax-calculator';
import { calculateTerminalBonus } from './terminal-bonus';
import {
  PliInput,
  PliPolicy,
  PliQuoteResult,
  PLIInput,
  PLIQuotationResult,
} from './types';
import { validatePliInput, mapToCanonicalPolicy } from './validation';

export function calculatePliQuote(input: PliInput): PliQuoteResult {
  const canonicalPolicy: PliPolicy = mapToCanonicalPolicy(input.policyType);
  const policyConfig = POLICY_REGISTRY[canonicalPolicy];

  // 1. Validation Check
  const eligibility = validatePliInput(input);

  // 2. Base Age & Effective Date Derivation
  const { age, effectiveDate } = calculateAge(
    input.dateOfBirth,
    input.effectiveDate,
    input.age
  );

  // 3. Effective Age Derivation
  const effectiveAge = calculateEffectiveAge({
    policyType: input.policyType,
    age,
    firstLifeAge: input.firstLifeAge,
    secondLifeAge: input.secondLifeAge,
    childAge: input.childAge,
  });

  // 4. Suvidha Conversion Option Check
  const isConverted = canonicalPolicy === 'SUVIDHA' && Boolean(input.isConverted);
  const conversionStatus = canonicalPolicy === 'SUVIDHA' ? (isConverted ? 'CONVERTED' : 'UNCONVERTED') : undefined;

  // 5. Whole Life Ceasing Age vs Standard Duration Logic
  let premiumCeasingAge: number | undefined = undefined;
  let premiumPaymentDuration: number | undefined = undefined;
  let bonusAccrualDuration: number | undefined = undefined;

  let duration: number;
  let maturityAge: number;

  if ((canonicalPolicy === 'SURAKSHA' || canonicalPolicy === 'SUVIDHA') && !isConverted) {
    premiumCeasingAge = input.premiumCeasingAge ?? 60;
    premiumPaymentDuration = Math.max(1, premiumCeasingAge - effectiveAge);
    bonusAccrualDuration = Math.max(1, 80 - effectiveAge);

    duration = premiumPaymentDuration;
    maturityAge = 80;
  } else {
    const durationRes = calculateDurationAndMaturityAge({
      policyType: input.policyType,
      age: effectiveAge,
      maturityAge: input.maturityAge,
      duration: input.duration,
    });
    duration = durationRes.duration;
    maturityAge = durationRes.maturityAge;
  }

  // 6. Bonus Engine
  const bonusDuration = bonusAccrualDuration ?? duration;
  let { bonusRate, annualBonus, totalBonus } = calculateBonus(
    input.policyType,
    input.sumAssured,
    bonusDuration
  );

  if (isConverted) {
    bonusRate = 52; // Endowment bonus rate
    annualBonus = (input.sumAssured / 1000) * bonusRate;
    totalBonus = annualBonus * duration;
  }

  // 7. Premium Surface Engine
  const targetModelPolicy = isConverted ? 'ENDOWMENT' : input.policyType;
  const modelPrediction = predictMonthlyPremium({
    policyType: targetModelPolicy,
    effectiveAge,
    duration,
    sumAssured: input.sumAssured,
    ageRate: input.ageRate,
  });

  // 8. Policy-Aware Rebate
  const rebate = calculateRebate({
    policyType: input.policyType,
    sumAssured: input.sumAssured,
    overrideRebate: input.rebate,
  });

  // 9. Tax Engine
  const tax = calculateTax(
    modelPrediction.scaledGrossPremium,
    input.gstRate
  );

  // 10. Net Monthly Premium
  const netMonthlyPremium = modelPrediction.scaledGrossPremium - rebate + tax;

  // 11. Premium Frequency Adjustment & Advance Discount
  const frequency = input.frequency ?? 'MONTHLY';
  const freqConfig = FREQUENCY_CONFIG[frequency];
  const rawInstallment = netMonthlyPremium * (12 / freqConfig.paymentsPerYear);
  const frequencyDiscount = rawInstallment * (freqConfig.rebatePercent / 100);
  const netInstallmentPremium = rawInstallment - frequencyDiscount;
  const annualizedPremium = netInstallmentPremium * freqConfig.paymentsPerYear;

  // 12. Total Premium Paid
  const totalPremiumPaid = netMonthlyPremium * 12 * duration;

  // 13. Terminal Bonus
  const terminalBonus = calculateTerminalBonus({
    policyType: isConverted ? 'ENDOWMENT' : input.policyType,
    sumAssured: input.sumAssured,
    duration,
  });

  // 14. Benefit Engine (Maturity, Death, Money-Back Timeline)
  const benefits = calculatePliBenefits({
    policy: canonicalPolicy,
    sumAssured: input.sumAssured,
    duration,
    totalBonus,
    terminalBonus,
    isConverted,
  });

  // 15. Audit Engine
  const breakdown = generatePliAuditTrail({
    policyName: policyConfig.name,
    policyCode: policyConfig.code,
    effectiveAge,
    maturityAge,
    duration,
    bonusRate,
    annualBonus,
    totalBonus,
    sumAssured: input.sumAssured,
    frequency,
    basePremium: modelPrediction.basePremiumPerLakh,
    rebate,
    frequencyDiscount,
    tax,
    netMonthlyPremium,
    netInstallmentPremium,
    totalPremiumPaid,
    maturityAmount: benefits.maturityAmount,
    confidenceScore: modelPrediction.confidenceScore,
    calculationMethod: modelPrediction.calculationMethod,
    isConverted,
  });

  return {
    policyType: canonicalPolicy,
    policyName: policyConfig.name,
    policyCode: policyConfig.code,

    customer: input.customer,
    dateOfBirth: input.dateOfBirth,
    effectiveDate,
    age,
    effectiveAge,
    firstLifeAge: input.firstLifeAge,
    secondLifeAge: input.secondLifeAge,
    childAge: input.childAge,
    premiumCeasingAge,
    premiumPaymentDuration,
    bonusAccrualDuration,
    isConverted,
    conversionStatus,

    maturityAge,
    duration,

    sumAssured: input.sumAssured,
    frequency,

    bonusRate,
    annualBonus,
    totalBonus,

    referenceBasePremium: modelPrediction.basePremiumPerLakh,
    interpolatedReferencePremium: modelPrediction.basePremiumPerLakh,
    sumAssuredFactor: input.sumAssured / 100000,
    ageFactor: 1.0,
    estimatedMonthlyPremium: modelPrediction.scaledGrossPremium,
    frequencyPremium: rawInstallment,
    frequencyDiscount,
    rebate,
    tax,
    netMonthlyPremium,
    netInstallmentPremium,
    annualizedPremium,
    totalPremiumPaid,

    terminalBonus,
    survivalBenefits: benefits.survivalBenefits,
    finalMaturityPayout: benefits.finalMaturityPayout,
    maturityAmount: benefits.maturityAmount,
    deathBenefitAmount: benefits.deathBenefitAmount,

    loanYears: policyConfig.loanYears,
    surrenderYears: policyConfig.surrenderYears,

    eligibility,
    isEstimated: !modelPrediction.isExactReference,
    premiumSource: modelPrediction.isExactReference ? 'OFFICIAL' : 'ESTIMATED',
    confidenceScore: modelPrediction.confidenceScore,
    calculationMethod: modelPrediction.calculationMethod,
    calculationVersion: CALCULATION_VERSION,
    rateTableVersion: '2.0-OFFICIAL-SCHEDULE',

    timeline: benefits.timeline,
    breakdown,
  };
}

// Export calculatePLIQuotation for 100% backward compatibility
export const calculatePLIQuotation = (input: PLIInput): PLIQuotationResult => {
  return calculatePliQuote(input);
};
