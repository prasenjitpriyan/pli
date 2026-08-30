import { RPLI_CONFIG } from '../../config/rpli/config';
import { RPLI_FREQUENCY_CONFIG } from '../../config/rpli/frequencies';
import { RPLI_POLICY_REGISTRY } from '../../config/rpli/policies';
import { calculateAge, calculateDurationAndMaturityAge, calculateEffectiveAge } from '../pli/age-calculator';
import { generatePliAuditTrail } from '../pli/audit-engine';
import { calculateRpliBenefits } from './benefit-engine';
import { predictRpliMonthlyPremium } from './premium-engine';
import { RpliInput, RpliPolicy, RpliQuoteResult } from './types';
import { mapToCanonicalRpliPolicy, validateRpliInput } from './validation';

export function calculateRpliQuote(input: RpliInput): RpliQuoteResult {
  const canonicalPolicy: RpliPolicy = mapToCanonicalRpliPolicy(input.policyType);
  const policyConfig = RPLI_POLICY_REGISTRY[canonicalPolicy];

  // 1. Validation Check
  const eligibility = validateRpliInput(input);

  // 2. Base Age & Effective Date Derivation (Exact Completed Years)
  const { age, effectiveDate } = calculateAge(
    input.dateOfBirth,
    input.effectiveDate ?? input.commencementDate,
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

  let premiumCeasingAge: number | undefined = undefined;
  let premiumPaymentDuration: number | undefined = undefined;
  let bonusAccrualDuration: number | undefined = undefined;

  let duration: number;
  let maturityAge: number;

  if (canonicalPolicy === 'GRAM_PRIYA') {
    duration = 10; // Fixed 10 Years Term
    maturityAge = effectiveAge + 10;
  } else if (canonicalPolicy === 'GRAM_SUMANGAL') {
    duration = input.duration ?? 20;
    maturityAge = effectiveAge + duration;
  } else if ((canonicalPolicy === 'GRAM_SURAKSHA' || canonicalPolicy === 'GRAM_SUVIDHA') && !isConverted) {
    premiumCeasingAge = input.premiumCeasingAge ?? 60;
    premiumPaymentDuration = Math.max(1, premiumCeasingAge - effectiveAge);
    bonusAccrualDuration = premiumPaymentDuration;

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

  // 5. Bonus Engine
  let bonusRate = policyConfig.bonusRate;
  if (isConverted) {
    bonusRate = 48; // Gram Santosh bonus rate upon conversion
  }

  const bonusDuration = bonusAccrualDuration ?? duration;
  const annualBonus = (input.sumAssured / 1000) * bonusRate;
  const totalBonus = annualBonus * bonusDuration;

  // 6. Table-Driven Premium Engine
  const modelPrediction = predictRpliMonthlyPremium({
    policyType: canonicalPolicy,
    effectiveAge,
    duration,
    sumAssured: input.sumAssured,
    premiumCeasingAge,
    maturityAge,
    childAge: input.childAge,
  });

  // 7. Payment Frequency Adjustments
  const frequency = input.frequency ?? 'MONTHLY';
  const freqConfig = RPLI_FREQUENCY_CONFIG[frequency];

  let selectedModeDetail = modelPrediction.modeDetails.monthly;
  if (frequency === 'QUARTERLY') selectedModeDetail = modelPrediction.modeDetails.quarterly;
  else if (frequency === 'HALF_YEARLY') selectedModeDetail = modelPrediction.modeDetails.halfYearly;
  else if (frequency === 'YEARLY') selectedModeDetail = modelPrediction.modeDetails.yearly;

  const rawInstallment = selectedModeDetail.grossPremium;
  const rebate = selectedModeDetail.rebate;
  const tax = selectedModeDetail.tax;
  const netInstallmentPremium = selectedModeDetail.netPremium;
  const netMonthlyPremium = modelPrediction.modeDetails.monthly.netPremium;
  const annualizedPremium = modelPrediction.modeDetails.yearly.netPremium;

  // 8. Total Premium Paid over Policy Term
  const totalPremiumPaid = Math.round(netInstallmentPremium * freqConfig.paymentsPerYear * duration);

  // 9. Benefit Engine
  const benefits = calculateRpliBenefits({
    policy: canonicalPolicy,
    sumAssured: input.sumAssured,
    duration,
    totalBonus,
    terminalBonus: 0,
    isConverted,
  });

  // 10. Medical Requirement Flag
  const medicalRequired = input.sumAssured > RPLI_CONFIG.medical.sumAssuredThreshold || effectiveAge > RPLI_CONFIG.medical.ageThreshold;
  const medicalRuleStatus = medicalRequired ? 'MEDICAL REQUIRED' : 'MEDICAL RULE NOT TRIGGERED';

  // 11. Audit Trail
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
    frequencyDiscount: 0,
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
    terminalBonus: 0,

    modeDetails: modelPrediction.modeDetails,

    referenceBasePremium: modelPrediction.basePremiumPerLakh,
    estimatedMonthlyPremium: modelPrediction.scaledGrossPremium,
    frequencyPremium: rawInstallment,
    frequencyDiscount: 0,
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

    medicalRequired,
    medicalRuleStatus,

    loanYears: policyConfig.loanYears,
    surrenderYears: policyConfig.surrenderYears,
    paidUpYears: policyConfig.paidUpYears,
    isPaidUpEligible,
    specialFeatures: policyConfig.specialFeatures,

    eligibility,
    isEstimated: !modelPrediction.isExactReference,
    premiumSource: modelPrediction.premiumSource,
    confidenceScore: modelPrediction.confidenceScore,
    calculationMethod: modelPrediction.calculationMethod,
    calculationVersion: '2.0-RPLI-TABLE-DRIVEN',
    rateTableVersion: modelPrediction.rateTableVersion,

    timeline: benefits.timeline,
    breakdown,
  };
}
