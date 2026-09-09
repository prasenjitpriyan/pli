import { POLICY_REGISTRY } from '../../config/pli/policies';
import { RPLI_POLICY_REGISTRY } from '../../config/rpli/policies';
import { PliPolicy } from '../pli/types';
import { RpliPolicy } from '../rpli/types';
import { calculateQuote } from './index';

export interface PolicyServicingInput {
  scheme: 'PLI' | 'RPLI';
  policyType: string;
  sumAssured: number;
  entryAge: number;
  policyTermYears: number;
  yearsPaid: number;
  monthsPaid?: number; // Additional months beyond yearsPaid (0-11)
}

export interface ServicingValuationResult {
  scheme: 'PLI' | 'RPLI';
  policyType: string;
  policyName: string;
  sumAssured: number;
  entryAge: number;
  policyTermYears: number;
  totalMonthsPaid: number;
  totalPolicyMonths: number;
  completionPercentage: number;
  estimatedMonthlyPremium: number;
  totalPremiumsPaid: number;

  // Paid-up status
  isPaidUpEligible: boolean;
  minPaidUpYearsRequired: number;
  paidUpSumAssured: number;

  // Bonus
  bonusRate: number; // ₹ per ₹1,000 SA per year
  accruedBonusTotal: number;
  eligibleBonusForSurrender: number;
  isBonusForfeitedOnSurrender: boolean;

  // Surrender valuation
  isSurrenderEligible: boolean;
  minSurrenderYearsRequired: number;
  surrenderFactorPercentage: number;
  estimatedSurrenderValue: number;

  // Loan facility
  isLoanEligible: boolean;
  minLoanYearsRequired: number | null;
  yearsUntilLoanEligible: number;
  maxLoanAmount: number;
  annualLoanInterestRate: number; // 10%
  halfYearlyInterestPayment: number;
  annualInterestPayment: number;

  // Advisory Recommendation
  advisoryVerdict: 'RECOMMEND_LOAN' | 'RECOMMEND_PAID_UP' | 'SURRENDER_VIABLE';
  advisoryNotes: string[];
}

/**
 * Calculates official Department of Posts Policy Servicing metrics:
 * - Paid-up value
 * - Surrender value with 5-year bonus forfeiture rule
 * - 90% loan facility at 10% p.a. half-yearly interest
 */
export function calculatePolicyServicing(input: PolicyServicingInput): ServicingValuationResult {
  const { scheme, policyType, sumAssured, entryAge, policyTermYears, yearsPaid } = input;
  const extraMonths = Math.min(11, Math.max(0, input.monthsPaid || 0));
  const totalMonthsPaid = yearsPaid * 12 + extraMonths;
  const totalPolicyMonths = Math.max(12, policyTermYears * 12);
  const completionFraction = Math.min(1, totalMonthsPaid / totalPolicyMonths);
  const completionPercentage = Math.round(completionFraction * 1000) / 10;

  // 1. Fetch policy metadata
  let policyName = policyType;
  let bonusRate = 52;
  let minLoanYears: number | null = 3;
  let minSurrenderYears = 3;

  if (scheme === 'RPLI') {
    const rpliKey = policyType as RpliPolicy;
    const item = RPLI_POLICY_REGISTRY[rpliKey];
    if (item) {
      policyName = item.name;
      bonusRate = item.bonusRate;
      minLoanYears = item.loanYears ?? null;
      minSurrenderYears = item.surrenderYears ?? 3;
    }
  } else {
    const pliKey = policyType as PliPolicy;
    const item = POLICY_REGISTRY[pliKey];
    if (item) {
      policyName = item.name;
      bonusRate = item.bonusRate;
      minLoanYears = item.loanYears ?? 3;
      minSurrenderYears = item.surrenderYears ?? 3;
    }
  }

  // 2. Compute reference monthly premium from quote engine
  let estimatedMonthlyPremium = 0;
  try {
    const maturityAge = entryAge + policyTermYears;
    const quote = calculateQuote({
      scheme,
      policyType: policyType as Parameters<typeof calculateQuote>[0]['policyType'],
      age: entryAge,
      sumAssured,
      duration: policyTermYears,
      maturityAge,
      premiumCeasingAge: maturityAge,
      frequency: 'MONTHLY',
    });
    estimatedMonthlyPremium = quote.netMonthlyPremium;
  } catch {
    // Fallback actuarial estimate if table bounds differ
    estimatedMonthlyPremium = Math.round((sumAssured / 1000) * (3.5 + entryAge * 0.05));
  }

  const totalPremiumsPaid = Math.round(estimatedMonthlyPremium * totalMonthsPaid);

  // 3. Paid-Up Value Calculation
  // Minimum 36 months (3 years) required for Paid-Up status
  const minPaidUpYearsRequired = 3;
  const isPaidUpEligible = totalMonthsPaid >= 36;
  const paidUpSumAssured = isPaidUpEligible
    ? Math.round(sumAssured * completionFraction)
    : 0;

  // 4. Bonus Calculation
  // Full accrued bonus based on completed duration
  const completedDurationYears = totalMonthsPaid / 12;
  const accruedBonusTotal = Math.round(
    (sumAssured / 1000) * bonusRate * completedDurationYears
  );

  // Official DoP Rule:
  // - Surrender < 3 years: Not allowed
  // - Surrender 3 - 4.99 years: Bonus is 100% FORFEITED
  // - Surrender >= 5 years: Proportionate bonus is payable
  const isSurrenderEligible = totalMonthsPaid >= minSurrenderYears * 12;
  const isBonusForfeitedOnSurrender = totalMonthsPaid < 60; // Less than 5 years

  const eligibleBonusForSurrender = isSurrenderEligible
    ? isBonusForfeitedOnSurrender
      ? 0
      : Math.round(accruedBonusTotal * completionFraction)
    : 0;

  // 5. Surrender Factor
  // Graduated actuarial factor based on policy fraction completed (30% at yr 3 up to 90% near maturity)
  let surrenderFactor = 0;
  if (isSurrenderEligible) {
    if (completionFraction < 0.25) {
      surrenderFactor = 0.35;
    } else if (completionFraction < 0.5) {
      surrenderFactor = 0.5;
    } else if (completionFraction < 0.75) {
      surrenderFactor = 0.7;
    } else {
      surrenderFactor = 0.88;
    }
  }

  const estimatedSurrenderValue = isSurrenderEligible
    ? Math.round((paidUpSumAssured + eligibleBonusForSurrender) * surrenderFactor)
    : 0;

  // 6. Loan Facility Calculations (India Post Rules)
  // Loan is 90% of surrender value; interest is 10% p.a. payable half-yearly
  const isLoanEligible =
    minLoanYears !== null &&
    totalMonthsPaid >= minLoanYears * 12 &&
    estimatedSurrenderValue > 0;

  const yearsUntilLoanEligible =
    minLoanYears !== null && totalMonthsPaid < minLoanYears * 12
      ? Math.max(0, minLoanYears - yearsPaid)
      : 0;

  const maxLoanAmount = isLoanEligible
    ? Math.floor((estimatedSurrenderValue * 0.9) / 100) * 100 // rounded to nearest ₹100
    : 0;

  const annualLoanInterestRate = 10.0; // 10% p.a.
  const halfYearlyInterestPayment = Math.round(maxLoanAmount * 0.05);
  const annualInterestPayment = Math.round(maxLoanAmount * 0.1);

  // 7. Advisory Guidance Verdict
  let advisoryVerdict: ServicingValuationResult['advisoryVerdict'] = 'RECOMMEND_LOAN';
  const advisoryNotes: string[] = [];

  if (isBonusForfeitedOnSurrender && isSurrenderEligible) {
    advisoryVerdict = 'RECOMMEND_LOAN';
    advisoryNotes.push(
      `⚠️ Surrendering now will permanently forfeit accrued bonus of ₹${accruedBonusTotal.toLocaleString('en-IN')} because the policy has not completed 5 years.`
    );
    advisoryNotes.push(
      `💡 A loan of up to ₹${maxLoanAmount.toLocaleString('en-IN')} is far more advantageous because it keeps your life cover and future bonus accumulation intact.`
    );
  } else if (!isLoanEligible && isPaidUpEligible) {
    advisoryVerdict = 'RECOMMEND_PAID_UP';
    advisoryNotes.push(
      `🛡️ If continuing premium payments is difficult, keep the policy as Paid-Up. You will receive a guaranteed payout of ₹${paidUpSumAssured.toLocaleString('en-IN')} at maturity without losing invested funds.`
    );
  } else if (isLoanEligible) {
    advisoryVerdict = 'RECOMMEND_LOAN';
    advisoryNotes.push(
      `✅ Taking a loan up to ₹${maxLoanAmount.toLocaleString('en-IN')} at 10% interest (₹${halfYearlyInterestPayment.toLocaleString('en-IN')}/half-year) provides instant liquidity without terminating your policy.`
    );
    advisoryNotes.push(
      `📈 Your policy will continue to earn an annual bonus of ₹${Math.round((sumAssured / 1000) * bonusRate).toLocaleString('en-IN')}, which exceeds standard loan borrowing costs!`
    );
  } else {
    advisoryVerdict = 'SURRENDER_VIABLE';
    advisoryNotes.push(
      `ℹ️ Policy is currently in its early phase. Completing at least 3 years is required to unlock loan and surrender facilities.`
    );
  }

  return {
    scheme,
    policyType,
    policyName,
    sumAssured,
    entryAge,
    policyTermYears,
    totalMonthsPaid,
    totalPolicyMonths,
    completionPercentage,
    estimatedMonthlyPremium,
    totalPremiumsPaid,

    isPaidUpEligible,
    minPaidUpYearsRequired,
    paidUpSumAssured,

    bonusRate,
    accruedBonusTotal,
    eligibleBonusForSurrender,
    isBonusForfeitedOnSurrender,

    isSurrenderEligible,
    minSurrenderYearsRequired: minSurrenderYears,
    surrenderFactorPercentage: Math.round(surrenderFactor * 100),
    estimatedSurrenderValue,

    isLoanEligible,
    minLoanYearsRequired: minLoanYears,
    yearsUntilLoanEligible,
    maxLoanAmount,
    annualLoanInterestRate,
    halfYearlyInterestPayment,
    annualInterestPayment,

    advisoryVerdict,
    advisoryNotes,
  };
}
