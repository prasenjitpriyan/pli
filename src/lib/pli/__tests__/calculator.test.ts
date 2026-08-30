import { describe, expect, it } from 'vitest';
import { calculateAge, calculateDurationAndMaturityAge, calculateEffectiveAge } from '../age-calculator';
import { calculatePliQuote } from '../calculator';
import { predictMonthlyPremium } from '../premium-model';
import { validatePliInput } from '../validation';

describe('PLI Age Calculator Module', () => {
  it('calculates completed age accurately from date of birth', () => {
    const dob = '1995-06-15';
    const effectiveDate = '2025-06-15';
    const { age } = calculateAge(dob, effectiveDate);
    expect(age).toBe(30);
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

describe('PLI Premium Surface Model Engine', () => {
  it('returns exact official rate values for benchmark points', () => {
    const res = predictMonthlyPremium({
      policyType: 'ENDOWMENT',
      effectiveAge: 31,
      duration: 20,
      sumAssured: 100000,
    });
    expect(res.isExactReference).toBe(true);
    expect(res.confidenceScore).toBe(100);
    // Rate for term 20 is 5.2% -> 5200/yr -> 433/mo
    expect(res.yearlyPremium).toBe(5200);
    expect(res.monthlyPremium).toBe(433);
  });

  it('calculates official whole life rate for Suraksha by ceasing age', () => {
    const res = predictMonthlyPremium({
      policyType: 'SURAKSHA',
      effectiveAge: 31,
      duration: 29,
      sumAssured: 500000,
      premiumCeasingAge: 60,
    });
    expect(res.yearlyPremium).toBe((500000 / 1000) * 34); // ₹17,000/yr
    expect(res.monthlyPremium).toBe(Math.round(17000 / 12)); // ₹1,417/mo
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
  it('calculates Santosh (Endowment Assurance) quotation correctly', () => {
    const result = calculatePliQuote({
      policyType: 'SANTOSH',
      age: 30,
      maturityAge: 60,
      sumAssured: 500000,
    });

    expect(result.policyType).toBe('SANTOSH');
    expect(result.duration).toBe(29); // ANB = 31, 60 - 31 = 29
    expect(result.bonusRate).toBe(52);
    expect(result.annualBonus).toBe(26000);
    expect(result.totalBonus).toBe(754000); // 26000 * 29
    expect(result.maturityAmount).toBe(1254000); // SA ₹5L + Bonus ₹7.54L
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
    expect(result.premiumPaymentDuration).toBe(29); // 60 - 31 = 29
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

  it('calculates multi-frequency installment premiums without frequency discount', () => {
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

    expect(yearly.frequencyDiscount).toBe(0);
    expect(yearly.netInstallmentPremium).toBe(yearly.annualizedPremium);
    expect(monthly.netInstallmentPremium * 12).toBe(yearly.annualizedPremium);
  });
});
