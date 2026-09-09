import { describe, expect, it } from 'vitest';
import { calculateAge, calculateDurationAndMaturityAge, calculateEffectiveAge } from '../age-calculator';
import { calculatePliQuote } from '../calculator';
import { predictMonthlyPremium } from '../premium-model';
import { calculateRebate } from '../rebate-calculator';
import { validatePliInput } from '../validation';

describe('PLI Age Calculator Module', () => {
  it('calculates completed age and Age Next Birthday (ANB) accurately from date of birth', () => {
    const dob = '1995-06-15';
    const effectiveDate = '2025-06-15';
    const { completedAge, ageNextBirthday, age } = calculateAge(dob, effectiveDate);
    expect(completedAge).toBe(30);
    expect(ageNextBirthday).toBe(31);
    expect(age).toBe(31);
  });

  it('calculates ANB consistently when current completed age is provided with isCurrentAge flag', () => {
    const effectiveDate = '2025-06-15';
    const { completedAge, ageNextBirthday, age } = calculateAge(undefined, effectiveDate, 30, true);
    expect(completedAge).toBe(30);
    expect(ageNextBirthday).toBe(31);
    expect(age).toBe(31);
  });

  it('calculates joint life effective age as floor average of both lives', () => {
    const effAge = calculateEffectiveAge({
      policyType: 'YUGAL_SURAKSHA',
      firstLifeAge: 35,
      secondLifeAge: 30,
    });
    expect(effAge).toBe(32); // Math.floor((35 + 30) / 2) = 32
  });

  it('calculates policy term correctly for fixed target maturity ages', () => {
    const res = calculateDurationAndMaturityAge({
      policyType: 'SANTOSH',
      age: 30,
      maturityAge: 60,
    });
    expect(res.duration).toBe(30);
    expect(res.maturityAge).toBe(60);
  });
});

describe('PLI Official Rate Table Engine', () => {
  it('returns exact official rate values for benchmark points from Table II (Santosh)', () => {
    const res = predictMonthlyPremium({
      policyType: 'ENDOWMENT',
      effectiveAge: 31,
      duration: 20,
      sumAssured: 100000,
    });
    expect(res.isExactReference).toBe(true);
    expect(res.confidenceScore).toBe(100);
    // Table II rate for term 20 is ₹4.00 per ₹1,000 SA -> ₹400/month
    expect(res.monthlyRatePer1000).toBe(4.00);
    expect(res.monthlyPremium).toBe(400);
    // Yearly premium includes official 2% advance rebate: 400 * 12 * 0.98 = 4704
    expect(res.yearlyPremium).toBe(4704);
  });

  it('calculates official whole life rate for Suraksha by term to ceasing age', () => {
    const res = predictMonthlyPremium({
      policyType: 'SURAKSHA',
      effectiveAge: 31,
      duration: 29,
      sumAssured: 500000,
      premiumCeasingAge: 60,
    });
    // Term = 60 - 31 = 29. Table I rate is ₹2.15 per ₹1,000 SA -> 500 * 2.15 = ₹1,075/month
    expect(res.yearlyRatePer1000).toBe(25.28);
    expect(res.yearlyPremium).toBe(12640); // 25.28 * 500
  });

  it('actuarially charges higher rates for shorter terms to same maturity', () => {
    // 25-year-old maturing at 55 (term 30) vs 45-year-old maturing at 55 (term 10)
    const youngQuote = predictMonthlyPremium({
      policyType: 'SANTOSH',
      effectiveAge: 25,
      duration: 30,
      sumAssured: 100000,
    });
    const olderQuote = predictMonthlyPremium({
      policyType: 'SANTOSH',
      effectiveAge: 45,
      duration: 10,
      sumAssured: 100000,
    });
    // Shorter term has higher monthly rate (term 10: ₹8.25/k vs term 30: ₹2.45/k)
    expect(olderQuote.monthlyRatePer1000).toBeGreaterThan(youngQuote.monthlyRatePer1000);
  });
});

describe('PLI High Sum Assured Rebate Calculation', () => {
  it('correctly applies ₹1 per ₹20,000 SA for single life policies', () => {
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 20000 })).toBe(1);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 40000 })).toBe(2);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 100000 })).toBe(5);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 500000 })).toBe(25);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 1000000 })).toBe(50);
  });

  it('applies ₹1 per ₹10,000 SA for Yugal Suraksha joint life policies', () => {
    expect(calculateRebate({ policyType: 'YUGAL_SURAKSHA', sumAssured: 100000 })).toBe(10);
    expect(calculateRebate({ policyType: 'YUGAL_SURAKSHA', sumAssured: 500000 })).toBe(50);
  });
});

describe('PLI Policy Validation System', () => {
  it('validates entry age boundaries for Suraksha', () => {
    const validRes = validatePliInput({
      policyType: 'SURAKSHA',
      age: 30,
      sumAssured: 100000,
    });
    expect(validRes.valid).toBe(true);

    const invalidRes = validatePliInput({
      policyType: 'SURAKSHA',
      age: 60, // Above max 55
      sumAssured: 100000,
    });
    expect(invalidRes.valid).toBe(false);
    expect(invalidRes.errors[0]).toContain('Maximum entry age');
  });

  it('enforces maximum sum assured cap of ₹3 Lakhs for Bal Jeevan Bima', () => {
    const res = validatePliInput({
      policyType: 'BAL_JEEVAN_BIMA',
      childAge: 10,
      parentAge: 35,
      sumAssured: 500000, // Exceeds ₹3L cap
    });
    expect(res.valid).toBe(false);
    expect(res.errors[0]).toContain('Maximum Sum Assured for Bal Jeevan Bima is ₹3,00,000');
  });

  it('validates spouse entry age boundary for Yugal Suraksha', () => {
    const res = validatePliInput({
      policyType: 'YUGAL_SURAKSHA',
      firstLifeAge: 48, // Elder spouse > 45
      secondLifeAge: 30,
      sumAssured: 100000,
    });
    expect(res.valid).toBe(false);
    expect(res.errors[0]).toContain('elder spouse must not exceed 45 years');
  });
});

describe('PLI Comprehensive 6-Policy Engine (calculatePliQuote)', () => {
  it('calculates Santosh (Endowment Assurance) quotation correctly with rebate', () => {
    const result = calculatePliQuote({
      policyType: 'SANTOSH',
      age: 30,
      maturityAge: 60,
      sumAssured: 500000,
    });

    expect(result.policyType).toBe('SANTOSH');
    expect(result.duration).toBe(30); // 60 - 30 = 30
    expect(result.bonusRate).toBe(52);
    expect(result.annualBonus).toBe(26000);
    expect(result.totalBonus).toBe(780000); // 26000 * 30
    expect(result.maturityAmount).toBe(1280000); // SA ₹5L + Bonus ₹7.80L
    expect(result.rebate).toBe(25); // ₹1 per ₹20,000 on ₹5,00,000 = ₹25/month
    // Gross monthly: 500 * 2.45 = 1225. Net monthly: 1225 - 25 = 1200
    expect(result.netMonthlyPremium).toBe(1200);
    expect(result.breakdown.length).toBeGreaterThan(0);
  });

  it('calculates Suraksha (Whole Life Assurance) with ceasing age 60', () => {
    const result = calculatePliQuote({
      policyType: 'SURAKSHA',
      age: 30,
      premiumCeasingAge: 60,
      sumAssured: 500000,
    });

    expect(result.policyType).toBe('SURAKSHA');
    expect(result.premiumPaymentDuration).toBe(30); // 60 - 30 = 30
    expect(result.bonusRate).toBe(76);
  });

  it('handles Suvidha conversion state machine correctly', () => {
    const unconverted = calculatePliQuote({
      policyType: 'SUVIDHA',
      age: 30,
      isConverted: false,
      sumAssured: 500000,
    });
    expect(unconverted.bonusRate).toBe(76);

    const converted = calculatePliQuote({
      policyType: 'SUVIDHA',
      age: 30,
      isConverted: true,
      sumAssured: 500000,
    });
    expect(converted.bonusRate).toBe(52);
  });

  it('generates 15-year Sumangal money-back survival payout schedule', () => {
    const result = calculatePliQuote({
      policyType: 'SUMANGAL',
      age: 30,
      duration: 15,
      sumAssured: 500000,
    });

    expect(result.policyType).toBe('SUMANGAL');
    expect(result.survivalBenefits).toBeDefined();
    expect(result.survivalBenefits?.length).toBe(3);
    expect(result.survivalBenefits?.[0].year).toBe(6);
    expect(result.survivalBenefits?.[0].amount).toBe(100000); // 20% of ₹5L
    expect(result.finalMaturityPayout).toBe(200000 + result.totalBonus);
  });

  it('calculates Bal Jeevan Bima with child entry age & parent waiver metadata', () => {
    const result = calculatePliQuote({
      policyType: 'BAL_JEEVAN_BIMA',
      childAge: 8,
      parentAge: 35,
      duration: 15,
      sumAssured: 200000,
    });

    expect(result.policyType).toBe('BAL_JEEVAN_BIMA');
    expect(result.childAge).toBe(8);
    expect(result.bonusRate).toBe(52);
    expect(result.eligibility.valid).toBe(true);
  });

  it('calculates multi-frequency installment premiums with official advance discount', () => {
    const monthly = calculatePliQuote({
      policyType: 'SANTOSH',
      age: 30,
      duration: 20,
      frequency: 'MONTHLY',
      sumAssured: 100000,
    });

    const yearly = calculatePliQuote({
      policyType: 'SANTOSH',
      age: 30,
      duration: 20,
      frequency: 'YEARLY',
      sumAssured: 100000,
    });

    expect(yearly.frequencyDiscount).toBeGreaterThan(0);
    expect(yearly.annualizedPremium).toBeLessThan(monthly.netInstallmentPremium * 12);
  });
});
