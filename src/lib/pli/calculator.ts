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
import {
  CalculationStep,
  PLIInput,
  PLIQuotationResult,
  SurvivalBenefitPayout,
} from './types';
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

  // 3. Conversion Status for Convertible Whole Life Assurance (Suvidha)
  const isConverted =
    input.policyType === 'CONVERTIBLE_WHOLE_LIFE' && Boolean(input.isConverted);
  const conversionStatus =
    input.policyType === 'CONVERTIBLE_WHOLE_LIFE'
      ? isConverted
        ? 'CONVERTED'
        : 'UNCONVERTED'
      : undefined;

  // 4. Whole Life vs Converted Endowment Duration & Ceasing Age Logic
  let premiumCeasingAge: number | undefined = undefined;
  let premiumPaymentDuration: number | undefined = undefined;
  let bonusAccrualDuration: number | undefined = undefined;

  let duration: number;
  let maturityAge: number;

  if (
    (input.policyType === 'WHOLE_LIFE' ||
      input.policyType === 'CONVERTIBLE_WHOLE_LIFE') &&
    !isConverted
  ) {
    premiumCeasingAge = input.premiumCeasingAge ?? 60;
    premiumPaymentDuration = Math.max(1, premiumCeasingAge - effectiveAge);
    bonusAccrualDuration = Math.max(1, 80 - effectiveAge);

    duration = premiumPaymentDuration; // Premium is paid for premiumPaymentDuration years
    maturityAge = 80; // Full maturity payout occurs at Age 80 or earlier death
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

  // 5. Bonus Calculation
  // Converted Suvidha uses Endowment bonus rate (52), Unconverted uses Whole Life rate (76)
  const bonusDuration = bonusAccrualDuration ?? duration;
  let { bonusRate, annualBonus, totalBonus } = calculateBonus(
    input.policyType,
    input.sumAssured,
    bonusDuration
  );

  if (isConverted) {
    bonusRate = 52; // Switches to Endowment bonus rate
    annualBonus = (input.sumAssured / 1000) * bonusRate;
    totalBonus = annualBonus * duration;
  }

  // 6. Mathematical Premium Engine Prediction
  // Converted Suvidha uses ENDOWMENT premium model curve
  const targetModelPolicy = isConverted ? 'ENDOWMENT' : input.policyType;
  const modelPrediction = predictMonthlyPremium({
    policyType: targetModelPolicy,
    effectiveAge,
    duration,
    sumAssured: input.sumAssured,
    ageRate: input.ageRate,
  });

  // 7. Policy-Aware Rebate
  const rebate = calculateRebate({
    policyType: input.policyType,
    sumAssured: input.sumAssured,
    overrideRebate: input.rebate,
  });

  // 8. Tax / GST Calculation
  const tax = calculateTax(
    modelPrediction.scaledGrossPremium,
    input.gstRate
  );

  // 9. Net Premium Calculation
  const netMonthlyPremium =
    modelPrediction.scaledGrossPremium - rebate + tax;

  // 10. Total Premium Paid Calculation
  const totalPremiumPaid = netMonthlyPremium * 12 * duration;

  // 11. Terminal Bonus
  const terminalBonus = calculateTerminalBonus({
    policyType: isConverted ? 'ENDOWMENT' : input.policyType,
    sumAssured: input.sumAssured,
    duration,
  });

  // 12. Periodic Survival Benefits (Anticipated Endowment / Sumangal Money-Back Schedule)
  let survivalBenefits: SurvivalBenefitPayout[] | undefined = undefined;
  let finalMaturityPayout: number = input.sumAssured + totalBonus + terminalBonus;

  if (input.policyType === 'ANTICIPATED_ENDOWMENT') {
    survivalBenefits = [];
    if (duration === 15) {
      survivalBenefits.push(
        {
          year: 6,
          percentage: 20,
          description: '1st Survival Benefit (End of 6th Year)',
          amount: input.sumAssured * 0.2,
        },
        {
          year: 9,
          percentage: 20,
          description: '2nd Survival Benefit (End of 9th Year)',
          amount: input.sumAssured * 0.2,
        },
        {
          year: 12,
          percentage: 20,
          description: '3rd Survival Benefit (End of 12th Year)',
          amount: input.sumAssured * 0.2,
        }
      );
    } else if (duration === 20) {
      survivalBenefits.push(
        {
          year: 8,
          percentage: 20,
          description: '1st Survival Benefit (End of 8th Year)',
          amount: input.sumAssured * 0.2,
        },
        {
          year: 12,
          percentage: 20,
          description: '2nd Survival Benefit (End of 12th Year)',
          amount: input.sumAssured * 0.2,
        },
        {
          year: 16,
          percentage: 20,
          description: '3rd Survival Benefit (End of 16th Year)',
          amount: input.sumAssured * 0.2,
        }
      );
    } else {
      const y1 = Math.round(duration * 0.4);
      const y2 = Math.round(duration * 0.6);
      const y3 = Math.round(duration * 0.8);
      survivalBenefits.push(
        {
          year: y1,
          percentage: 20,
          description: `1st Survival Benefit (End of Year ${y1})`,
          amount: input.sumAssured * 0.2,
        },
        {
          year: y2,
          percentage: 20,
          description: `2nd Survival Benefit (End of Year ${y2})`,
          amount: input.sumAssured * 0.2,
        },
        {
          year: y3,
          percentage: 20,
          description: `3rd Survival Benefit (End of Year ${y3})`,
          amount: input.sumAssured * 0.2,
        }
      );
    }

    finalMaturityPayout = input.sumAssured * 0.4 + totalBonus + terminalBonus;
  }

  // Total maturity / return amount across entire lifecycle
  const maturityAmount = input.sumAssured + totalBonus + terminalBonus;

  // 13. Transparent Step-by-Step Breakdown Log
  const breakdown: CalculationStep[] = [
    {
      title: '1. Policy Model & Conversion Status',
      formula:
        input.policyType === 'CONVERTIBLE_WHOLE_LIFE'
          ? 'Suvidha Policy Option (Conversion Window: 5-6 Years from Inception)'
          : input.policyType === 'JOINT_LIFE'
          ? 'Effective Age = (First Age + Second Age) / 2'
          : 'Effective Age = Current Completed Age',
      values:
        input.policyType === 'CONVERTIBLE_WHOLE_LIFE'
          ? `Status: ${isConverted ? 'Converted to Endowment Assurance (Santosh)' : 'Unconverted (Left as Whole Life - Suraksha)'}`
          : `Effective Age ${effectiveAge}`,
      result: `${effectiveAge} years`,
      note: `Selected Policy: ${policyConfig.name} (${policyConfig.code})`,
    },
    {
      title: '2. Premium Payment Term & Bonus Accumulation',
      formula:
        (input.policyType === 'WHOLE_LIFE' || input.policyType === 'CONVERTIBLE_WHOLE_LIFE') && !isConverted
          ? 'Premium Term = Ceasing Age - Entry Age | Bonus Term = 80 - Entry Age'
          : 'Duration = Target Maturity Age - Effective Age',
      values:
        (input.policyType === 'WHOLE_LIFE' || input.policyType === 'CONVERTIBLE_WHOLE_LIFE') && !isConverted
          ? `Ceasing Age ${premiumCeasingAge} (${duration} yrs payment) | Bonus Accrual until Age 80 (${bonusDuration} yrs)`
          : `Maturity Age (${maturityAge}) - Effective Age (${effectiveAge})`,
      result: `${duration} years`,
    },
    {
      title: '3. Declared Bonus Rate & Annual Bonus',
      formula: '(Sum Assured / 1,000) × Bonus Rate',
      values: `(${formatINR(input.sumAssured)} / 1,000) × ₹${bonusRate}`,
      result: `${formatINR(annualBonus)} / year`,
      note: isConverted
        ? 'Converted Suvidha uses Endowment bonus rate of ₹52 per ₹1,000 SA'
        : `Bonus rate is ₹${bonusRate} per ₹1,000 SA`,
    },
    {
      title: '4. Total Accrued Bonus',
      formula: 'Annual Bonus × Bonus Accumulation Term',
      values: `${formatINR(annualBonus)} × ${bonusDuration} years`,
      result: formatINR(totalBonus),
    },
    {
      title: '5. Mathematical Premium Model Surface Prediction',
      formula: 'Base Premium = f(Effective Age, Payment Duration) per ₹1,00,000 SA',
      values: `Effective Age ${effectiveAge}, Payment Duration ${duration} years`,
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
      formula: 'Net Monthly Premium × 12 × Premium Payment Duration',
      values: `${formatINR(netMonthlyPremium)} × 12 × ${duration} years`,
      result: formatINR(totalPremiumPaid),
    },
    {
      title: '9. Maturity Benefit & Facilities',
      formula:
        input.policyType === 'ANTICIPATED_ENDOWMENT'
          ? `3 Payouts of 20% SA + Final 40% SA + Total Bonus at Maturity (${duration} yrs)`
          : 'Full Sum Assured + Accumulated Bonuses at Maturity',
      values: `Sum Assured (${formatINR(input.sumAssured)}) + Total Bonus (${formatINR(totalBonus)})`,
      result: formatINR(maturityAmount),
      note: 'Loan facility available after 4 yrs | Surrender allowed after 3 yrs (5 yrs for bonus)',
    },
    {
      title: '10. Total Overall Returns',
      formula: 'Sum Assured + Total Accrued Bonus + Terminal Bonus',
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
    premiumCeasingAge,
    premiumPaymentDuration,
    bonusAccrualDuration,
    isConverted,
    conversionStatus,

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
    survivalBenefits,
    finalMaturityPayout,
    maturityAmount,

    loanYears: policyConfig.loanYears,
    surrenderYears: policyConfig.surrenderYears,

    isEstimated: !modelPrediction.isExactReference,
    premiumSource: modelPrediction.premiumSource,
    confidenceScore: modelPrediction.confidenceScore,
    calculationMethod: modelPrediction.calculationMethod,
    calculationVersion: CALCULATION_VERSION,

    breakdown,
  };
}
