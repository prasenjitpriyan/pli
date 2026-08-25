import {
  calculateAge,
  calculateDurationAndMaturityAge,
  calculateEffectiveAge,
} from './age-calculator';
import { calculateBonus } from './bonus-calculator';
import { CALCULATION_VERSION, POLICY_CONFIG } from './config';
import { predictMonthlyPremium } from './premium-model';
import { calculateRebate } from './rebate-calculator';
import { calculateTax } from './tax-calculator';
import { calculateTerminalBonus } from './terminal-bonus';
import { CalculationStep, PLIInput, PLIQuotationResult } from './types';
import { formatINR } from './utils';

export function calculatePLIQuotation(input: PLIInput): PLIQuotationResult {
  const policyConfig = POLICY_CONFIG[input.policyType];

  // 1. Base Age & Date of Birth Derivation
  const { age, effectiveDate } = calculateAge(
    input.dateOfBirth,
    input.effectiveDate,
    input.age
  );

  // 2. Effective Age Derivation (Handles Single Life, Joint Life, Children)
  const effectiveAge = calculateEffectiveAge({
    policyType: input.policyType,
    age,
    firstLifeAge: input.firstLifeAge,
    secondLifeAge: input.secondLifeAge,
    childAge: input.childAge,
  });

  // 3. Duration & Target Maturity Age
  const { duration, maturityAge } = calculateDurationAndMaturityAge({
    policyType: input.policyType,
    age: effectiveAge,
    maturityAge: input.maturityAge,
    duration: input.duration,
  });

  // 4. Bonus Calculation
  const { bonusRate, annualBonus, totalBonus } = calculateBonus(
    input.policyType,
    input.sumAssured,
    duration
  );

  // 5. Mathematical Premium Engine Prediction
  const modelPrediction = predictMonthlyPremium({
    policyType: input.policyType,
    effectiveAge,
    duration,
    sumAssured: input.sumAssured,
    ageRate: input.ageRate,
  });

  // 6. Policy-Aware Rebate
  const rebate = calculateRebate({
    policyType: input.policyType,
    sumAssured: input.sumAssured,
    overrideRebate: input.rebate,
  });

  // 7. Tax / GST Calculation
  const tax = calculateTax(
    modelPrediction.scaledGrossPremium,
    input.gstRate
  );

  // 8. Net Premium Calculation
  const netMonthlyPremium =
    modelPrediction.scaledGrossPremium - rebate + tax;

  // 9. Total Premium Paid Calculation
  const totalPremiumPaid = netMonthlyPremium * 12 * duration;

  // 10. Terminal Bonus
  const terminalBonus = calculateTerminalBonus({
    policyType: input.policyType,
    sumAssured: input.sumAssured,
    duration,
  });

  // 11. Maturity Amount
  const maturityAmount = input.sumAssured + totalBonus + terminalBonus;

  // 12. Transparent Step-by-Step Breakdown Log
  const breakdown: CalculationStep[] = [
    {
      title: '1. Policy Model & Effective Age',
      formula:
        input.policyType === 'JOINT_LIFE'
          ? 'Effective Age = (First Age + Second Age) / 2'
          : 'Effective Age = Current Completed Age',
      values:
        input.policyType === 'JOINT_LIFE'
          ? `First Life (${input.firstLifeAge ?? age}) + Second Life (${input.secondLifeAge ?? 28}) / 2`
          : `Age ${effectiveAge}`,
      result: `${effectiveAge} years`,
      note: `Selected Policy: ${policyConfig.name} (${policyConfig.code})`,
    },
    {
      title: '2. Policy Duration & Target Maturity',
      formula: 'Duration = Target Maturity Age - Effective Age',
      values: `Maturity Age (${maturityAge}) - Effective Age (${effectiveAge})`,
      result: `${duration} years`,
    },
    {
      title: '3. Declared Bonus Rate & Annual Bonus',
      formula: '(Sum Assured / 1,000) × Bonus Rate',
      values: `(${formatINR(input.sumAssured)} / 1,000) × ₹${bonusRate}`,
      result: `${formatINR(annualBonus)} / year`,
      note: `Declared bonus rate is ₹${bonusRate} per ₹1,000 SA`,
    },
    {
      title: '4. Total Accrued Bonus',
      formula: 'Annual Bonus × Policy Term',
      values: `${formatINR(annualBonus)} × ${duration} years`,
      result: formatINR(totalBonus),
    },
    {
      title: '5. Mathematical Premium Model Surface Prediction',
      formula: 'Base Premium = f(Effective Age, Duration) per ₹1,00,000 SA',
      values: `Effective Age ${effectiveAge}, Duration ${duration} years`,
      result: `₹${modelPrediction.basePremiumPerLakh}/month (Base)`,
      note: `Method: ${modelPrediction.calculationMethod}`,
    },
    {
      title: '6. Sum Assured Scaling & Gross Monthly Premium',
      formula: 'Gross Monthly Premium = Base Premium × (Sum Assured / 100,000)',
      values: `₹${modelPrediction.basePremiumPerLakh} × (${formatINR(input.sumAssured)} / ₹1,00,000)`,
      result: `${formatINR(modelPrediction.scaledGrossPremium)}/month`,
      note: `Model Confidence Score: ${modelPrediction.confidenceScore}%`,
    },
    {
      title: '7. Policy-Aware Rebate & Net Premium',
      formula: 'Gross Monthly Premium - Rebate + Tax',
      values: `₹${modelPrediction.scaledGrossPremium} - ₹${rebate} + ₹${tax}`,
      result: `${formatINR(netMonthlyPremium)}/month`,
      note:
        input.policyType === 'JOINT_LIFE'
          ? 'Joint Life Rebate of ₹7 applied'
          : 'Standard Rebate of ₹5 applied',
    },
    {
      title: '8. Estimated Total Premium Paid',
      formula: 'Net Monthly Premium × 12 × Duration',
      values: `${formatINR(netMonthlyPremium)} × 12 × ${duration} years`,
      result: formatINR(totalPremiumPaid),
    },
    {
      title: '9. Terminal Bonus Calculation',
      formula:
        input.policyType === 'ENDOWMENT' && duration >= 20
          ? 'MIN((Sum Assured / 10,000) × 20, 1,000)'
          : 'Not Applicable for this policy type / term',
      values: `Sum Assured ${formatINR(input.sumAssured)}, Duration ${duration} years`,
      result: formatINR(terminalBonus),
      note: terminalBonus > 0 ? 'Terminal bonus capped at max ₹1,000' : undefined,
    },
    {
      title: '10. Estimated Maturity Amount',
      formula: 'Sum Assured + Total Bonus + Terminal Bonus',
      values: `${formatINR(input.sumAssured)} + ${formatINR(totalBonus)} + ${formatINR(terminalBonus)}`,
      result: formatINR(maturityAmount),
    },
  ];

  return {
    policyType: input.policyType,
    policyName: policyConfig.name,
    policyCode: policyConfig.code,

    dateOfBirth: input.dateOfBirth,
    effectiveDate,
    age,
    effectiveAge,
    firstLifeAge: input.firstLifeAge,
    secondLifeAge: input.secondLifeAge,
    childAge: input.childAge,

    maturityAge,
    duration,

    sumAssured: input.sumAssured,

    bonusRate,
    annualBonus,
    totalBonus,

    referenceBasePremium: modelPrediction.basePremiumPerLakh,
    interpolatedReferencePremium: modelPrediction.basePremiumPerLakh,
    sumAssuredFactor: input.sumAssured / 100000,
    ageFactor: 1.0,
    estimatedMonthlyPremium: modelPrediction.scaledGrossPremium,
    rebate,
    tax,
    netMonthlyPremium,
    totalPremiumPaid,

    terminalBonus,
    maturityAmount,

    isEstimated: !modelPrediction.isExactReference,
    premiumSource: modelPrediction.premiumSource,
    confidenceScore: modelPrediction.confidenceScore,
    calculationMethod: modelPrediction.calculationMethod,
    calculationVersion: CALCULATION_VERSION,

    breakdown,
  };
}
