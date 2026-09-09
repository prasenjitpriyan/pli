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
  // effectiveAge is already Age as on Next Birthday (ANB)
  let premiumCeasingAge: number | undefined = undefined;
  let premiumPaymentDuration: number | undefined = undefined;
  let bonusAccrualDuration: number | undefined = undefined;

  let duration: number;
  let maturityAge: number;

  if ((canonicalPolicy === 'SURAKSHA' || canonicalPolicy === 'SUVIDHA') && !isConverted) {
    premiumCeasingAge = input.premiumCeasingAge ?? 60;
    // Duration (premium paying term) = ceasing age - ANB
    premiumPaymentDuration = Math.max(1, premiumCeasingAge - effectiveAge);
    // Bonus accrues from ANB until age 80
    bonusAccrualDuration = Math.max(1, 80 - effectiveAge);

    duration = premiumPaymentDuration;
    maturityAge = 80;
  } else {
    // For endowment-style policies: duration = maturityAge - ANB
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
  const bonusDuration = duration;
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

  // 7. Premium Rate Engine (Official India Post Tables I to VI)
  const targetModelPolicy = isConverted ? 'ENDOWMENT' : input.policyType;
  const modelPrediction = predictMonthlyPremium({
    policyType: targetModelPolicy,
    effectiveAge,    // Always use ANB for premium table
    duration,
    sumAssured: input.sumAssured,
    premiumCeasingAge,                // For Suraksha/Suvidha ceasing age tiers
    maturityAge,
    childAge: input.childAge,
    isConverted,
    ageRate: input.ageRate,
  });

  // 8. Policy-Aware Rebate (₹1 per ₹20k SA for single life, ₹1 per ₹10k for joint life)
  const rebate = calculateRebate({
    policyType: canonicalPolicy,
    sumAssured: input.sumAssured,
    overrideRebate: input.rebate,
  });

  // 9. Tax Engine
  const tax = calculateTax(
    Math.max(0, modelPrediction.scaledGrossPremium - rebate),
    input.gstRate
  );

  // 10. Mode-wise Breakdown Details (Monthly, Quarterly, Half-Yearly, Yearly)
  const monthlyTax = tax;
  const quarterlyTax = calculateTax(Math.max(0, modelPrediction.quarterlyPremium - rebate * 3), input.gstRate);
  const halfYearlyTax = calculateTax(Math.max(0, modelPrediction.halfYearlyPremium - rebate * 6), input.gstRate);
  const yearlyTax = calculateTax(Math.max(0, modelPrediction.yearlyPremium - rebate * 12), input.gstRate);

  const netMonthlyPremium = Math.max(0, modelPrediction.monthlyPremium - rebate + monthlyTax);
  const netQuarterlyPremium = Math.max(0, modelPrediction.quarterlyPremium - rebate * 3 + quarterlyTax);
  const netHalfYearlyPremium = Math.max(0, modelPrediction.halfYearlyPremium - rebate * 6 + halfYearlyTax);
  const netYearlyPremium = Math.max(0, modelPrediction.yearlyPremium - rebate * 12 + yearlyTax);

  const modeDetails = {
    monthly: {
      ratePer1000: modelPrediction.monthlyRatePer1000,
      grossPremium: modelPrediction.monthlyPremium,
      rebate: Math.round(rebate),
      tax: monthlyTax,
      netPremium: netMonthlyPremium,
    },
    quarterly: {
      ratePer1000: modelPrediction.quarterlyRatePer1000,
      grossPremium: modelPrediction.quarterlyPremium,
      rebate: Math.round(rebate * 3),
      tax: quarterlyTax,
      netPremium: netQuarterlyPremium,
    },
    halfYearly: {
      ratePer1000: modelPrediction.halfYearlyRatePer1000,
      grossPremium: modelPrediction.halfYearlyPremium,
      rebate: Math.round(rebate * 6),
      tax: halfYearlyTax,
      netPremium: netHalfYearlyPremium,
    },
    yearly: {
      ratePer1000: modelPrediction.yearlyRatePer1000,
      grossPremium: modelPrediction.yearlyPremium,
      rebate: Math.round(rebate * 12),
      tax: yearlyTax,
      netPremium: netYearlyPremium,
    },
  };

  // 11. Premium Frequency Adjustment
  const frequency = input.frequency ?? 'MONTHLY';
  const freqConfig = FREQUENCY_CONFIG[frequency];

  let rawInstallment: number;
  let netInstallmentPremium: number;
  let frequencyDiscount = 0;

  switch (frequency) {
    case 'QUARTERLY':
      rawInstallment = modeDetails.quarterly.grossPremium;
      netInstallmentPremium = modeDetails.quarterly.netPremium;
      frequencyDiscount = 0;
      break;
    case 'HALF_YEARLY':
      rawInstallment = modeDetails.halfYearly.grossPremium;
      netInstallmentPremium = modeDetails.halfYearly.netPremium;
      frequencyDiscount = Math.max(0, Math.round(modelPrediction.monthlyPremium * 6 - modelPrediction.halfYearlyPremium));
      break;
    case 'YEARLY':
      rawInstallment = modeDetails.yearly.grossPremium;
      netInstallmentPremium = modeDetails.yearly.netPremium;
      frequencyDiscount = Math.max(0, Math.round(modelPrediction.monthlyPremium * 12 - modelPrediction.yearlyPremium));
      break;
    case 'MONTHLY':
    default:
      rawInstallment = modeDetails.monthly.grossPremium;
      netInstallmentPremium = modeDetails.monthly.netPremium;
      frequencyDiscount = 0;
      break;
  }

  const annualizedPremium = netInstallmentPremium * freqConfig.paymentsPerYear;

  // 12. Total Premium Paid = installment × payments per year × duration
  const totalPremiumPaid = Math.round(netInstallmentPremium * freqConfig.paymentsPerYear * duration);

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
    bonusDuration,
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
    modeDetails,
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
