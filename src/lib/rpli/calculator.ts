import { RPLI_FREQUENCY_CONFIG } from '../../config/rpli/frequencies';
import { RPLI_POLICY_REGISTRY } from '../../config/rpli/policies';
import { calculateAge, calculateDurationAndMaturityAge, calculateEffectiveAge } from '../pli/age-calculator';
import { generatePliAuditTrail } from '../pli/audit-engine';
import { calculateTax } from '../pli/tax-calculator';
import { calculateRpliBenefits } from './benefit-engine';
import { predictRpliMonthlyPremium } from './premium-engine';
import { RpliInput, RpliPolicy, RpliQuoteResult } from './types';
import { mapToCanonicalRpliPolicy, validateRpliInput } from './validation';

export function calculateRpliQuote(input: RpliInput): RpliQuoteResult {
  const canonicalPolicy: RpliPolicy = mapToCanonicalRpliPolicy(input.policyType);
  const policyConfig = RPLI_POLICY_REGISTRY[canonicalPolicy];

  // 1. Validation Check
  const eligibility = validateRpliInput(input);

  // 2. Base Age & Effective Date Derivation
  const { age, effectiveDate } = calculateAge(
    input.dateOfBirth,
    input.effectiveDate,
    input.age
  );

  // 3. Effective Age Derivation
  const effectiveAge = calculateEffectiveAge({
    policyType: canonicalPolicy === 'BAL_JEEVAN_BIMA' ? 'CHILDREN' : 'ENDOWMENT',
    age,
    childAge: input.childAge,
  });

  // 4. Suvidha Conversion Check
  const isConverted = canonicalPolicy === 'GRAM_SUVIDHA' && Boolean(input.isConverted);
  const conversionStatus = canonicalPolicy === 'GRAM_SUVIDHA' ? (isConverted ? 'CONVERTED' : 'UNCONVERTED') : undefined;

  // 5. Whole Life Ceasing Age vs Fixed Term vs Maturity Age
  let premiumCeasingAge: number | undefined = undefined;
  let premiumPaymentDuration: number | undefined = undefined;
  let bonusAccrualDuration: number | undefined = undefined;

  let duration: number;
  let maturityAge: number;

  if (canonicalPolicy === 'GRAM_PRIYA') {
    duration = 10; // Fixed 10 Years Term
    maturityAge = effectiveAge + 10;
  } else if ((canonicalPolicy === 'GRAM_SURAKSHA' || canonicalPolicy === 'GRAM_SUVIDHA') && !isConverted) {
    premiumCeasingAge = input.premiumCeasingAge ?? 60;
    premiumPaymentDuration = Math.max(1, premiumCeasingAge - effectiveAge);
    bonusAccrualDuration = Math.max(1, 80 - effectiveAge);

    duration = premiumPaymentDuration;
    maturityAge = 80;
  } else {
    const durationRes = calculateDurationAndMaturityAge({
      policyType: 'ENDOWMENT',
      age: effectiveAge,
      maturityAge: input.maturityAge,
      duration: input.duration,
    });
    duration = durationRes.duration;
    maturityAge = durationRes.maturityAge;
  }

  // 6. Bonus Engine
  let bonusRate = policyConfig.bonusRate;
  if (isConverted) {
    bonusRate = 48; // Gram Santosh bonus rate upon conversion
  }

  const bonusDuration = bonusAccrualDuration ?? duration;
  const annualBonus = (input.sumAssured / 1000) * bonusRate;
  const totalBonus = annualBonus * bonusDuration;

  // 7. Premium Engine
  const modelPrediction = predictRpliMonthlyPremium({
    policyType: canonicalPolicy,
    effectiveAge,
    duration,
    sumAssured: input.sumAssured,
  });

  // 8. Rebate & Tax
  const rebate = input.sumAssured >= 100000 ? 5 : 0;
  const tax = calculateTax(modelPrediction.scaledGrossPremium, 0);

  // 9. Net Monthly Premium
  const netMonthlyPremium = Math.max(10, modelPrediction.scaledGrossPremium - rebate + tax);

  // 10. Payment Frequency Adjustments
  const frequency = input.frequency ?? 'MONTHLY';
  const freqConfig = RPLI_FREQUENCY_CONFIG[frequency];
  const rawInstallment = netMonthlyPremium * (12 / freqConfig.paymentsPerYear);
  const frequencyDiscount = rawInstallment * (freqConfig.rebatePercent / 100);
  const netInstallmentPremium = rawInstallment - frequencyDiscount;
  const annualizedPremium = netInstallmentPremium * freqConfig.paymentsPerYear;

  // 11. Total Premium Paid
  const totalPremiumPaid = netMonthlyPremium * 12 * duration;

  // 12. Benefit Engine
  const benefits = calculateRpliBenefits({
    policy: canonicalPolicy,
    sumAssured: input.sumAssured,
    duration,
    totalBonus,
    terminalBonus: 0,
    isConverted,
  });

  // 13. Audit Trail
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

  const isPaidUpEligible = Boolean(policyConfig.paidUpYears && duration >= policyConfig.paidUpYears);

  return {
    scheme: 'RPLI',
    policyType: canonicalPolicy,
    policyName: policyConfig.name,
    policyCode: policyConfig.code,

    effectiveDate,
    age,
    effectiveAge,
    childAge: input.childAge,
    parentAge: input.parentAge,
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
    estimatedMonthlyPremium: modelPrediction.scaledGrossPremium,
    frequencyPremium: rawInstallment,
    frequencyDiscount,
    rebate,
    tax,
    netMonthlyPremium,
    netInstallmentPremium,
    annualizedPremium,
    totalPremiumPaid,

    survivalBenefits: benefits.survivalBenefits,
    finalMaturityPayout: benefits.finalMaturityPayout,
    maturityAmount: benefits.maturityAmount,
    deathBenefitAmount: benefits.deathBenefitAmount,

    loanYears: policyConfig.loanYears,
    surrenderYears: policyConfig.surrenderYears,
    paidUpYears: policyConfig.paidUpYears,
    isPaidUpEligible,
    specialFeatures: policyConfig.specialFeatures,

    eligibility,
    isEstimated: true,
    premiumSource: 'CONFIGURED',
    confidenceScore: modelPrediction.confidenceScore,
    calculationMethod: modelPrediction.calculationMethod,
    calculationVersion: '2.0-RPLI',
    rateTableVersion: '2.0-RPLI-OFFICIAL',

    timeline: benefits.timeline,
    breakdown,
  };
}
