import { describe, expect, it } from 'vitest';
import { calculateRpliQuote } from '../calculator';
import { validateRpliInput } from '../validation';

describe('RPLI Policy Validation Engine', () => {
  it('validates entry age limits for Gram Priya (20 to 45 years)', () => {
    const valid = validateRpliInput({
      policyType: 'GRAM_PRIYA',
      age: 30,
      sumAssured: 100000,
    });
    expect(valid.valid).toBe(true);

    const invalidUnderage = validateRpliInput({
      policyType: 'GRAM_PRIYA',
      age: 18, // Below 20
      sumAssured: 100000,
    });
    expect(invalidUnderage.valid).toBe(false);
    expect(invalidUnderage.errors[0]).toContain('must be between 20 and 45 years');
  });

  it('enforces maximum sum assured cap of ₹1 Lakh for RPLI Bal Jeevan Bima', () => {
    const res = validateRpliInput({
      policyType: 'BAL_JEEVAN_BIMA',
      childAge: 10,
      parentAge: 35,
      sumAssured: 200000, // Exceeds ₹1 Lakh cap
    });
    expect(res.valid).toBe(false);
    expect(res.errors[0]).toContain('Maximum Sum Assured for RPLI Bal Jeevan Bima is ₹1,00,000');
  });

  it('validates parent age limit of 45 years for RPLI Bal Jeevan Bima', () => {
    const res = validateRpliInput({
      policyType: 'BAL_JEEVAN_BIMA',
      childAge: 10,
      parentAge: 48, // Exceeds 45
      sumAssured: 50000,
    });
    expect(res.valid).toBe(false);
    expect(res.errors[0]).toContain('Parent/Policyholder age must not exceed 45 years');
  });
});

describe('RPLI Calculation Engine (calculateRpliQuote)', () => {
  it('calculates Gram Santosh quotation with declared ₹48/₹1k bonus rate', () => {
    const result = calculateRpliQuote({
      scheme: 'RPLI',
      policyType: 'GRAM_SANTOSH',
      age: 30,
      maturityAge: 60,
      sumAssured: 500000,
    });

    expect(result.scheme).toBe('RPLI');
    expect(result.policyType).toBe('GRAM_SANTOSH');
    expect(result.duration).toBe(30);
    expect(result.bonusRate).toBe(48);
    expect(result.annualBonus).toBe(24000);
    expect(result.totalBonus).toBe(720000);
    expect(result.maturityAmount).toBe(1220000); // SA ₹5L + Bonus ₹7.2L
    expect(result.loanYears).toBe(3);
    expect(result.surrenderYears).toBe(3);
  });

  it('calculates Gram Priya with fixed 10-Yr term and 20%/20%/60% payout timeline', () => {
    const result = calculateRpliQuote({
      scheme: 'RPLI',
      policyType: 'GRAM_PRIYA',
      age: 30,
      sumAssured: 500000,
    });

    expect(result.policyType).toBe('GRAM_PRIYA');
    expect(result.duration).toBe(10); // Fixed 10 Years
    expect(result.bonusRate).toBe(45);
    expect(result.survivalBenefits).toBeDefined();
    expect(result.survivalBenefits?.length).toBe(2);
    expect(result.survivalBenefits?.[0].year).toBe(4);
    expect(result.survivalBenefits?.[0].amount).toBe(100000); // 20% of ₹5L
    expect(result.survivalBenefits?.[1].year).toBe(7);
    expect(result.survivalBenefits?.[1].amount).toBe(100000); // 20% of ₹5L
    expect(result.finalMaturityPayout).toBe(300000 + result.totalBonus); // 60% of ₹5L + Bonus
    expect(result.deathBenefitAmount).toBe(500000 + result.totalBonus); // Prior survival benefits NOT deducted
    expect(result.specialFeatures?.[0]).toContain('Natural Calamity');
  });

  it('calculates Gram Sumangal with death benefit non-deduction rule', () => {
    const result = calculateRpliQuote({
      scheme: 'RPLI',
      policyType: 'GRAM_SUMANGAL',
      age: 30,
      duration: 15,
      sumAssured: 500000,
    });

    expect(result.policyType).toBe('GRAM_SUMANGAL');
    expect(result.bonusRate).toBe(45);
    expect(result.survivalBenefits?.length).toBe(3);
    expect(result.deathBenefitAmount).toBe(500000 + result.totalBonus); // Full SA + Bonus
  });

  it('calculates RPLI Bal Jeevan Bima with ₹1 Lakh SA cap, disabled loan/surrender, and Gram Santosh bonus', () => {
    const result = calculateRpliQuote({
      scheme: 'RPLI',
      policyType: 'BAL_JEEVAN_BIMA',
      childAge: 8,
      parentAge: 35,
      duration: 15,
      sumAssured: 100000,
    });

    expect(result.policyType).toBe('BAL_JEEVAN_BIMA');
    expect(result.bonusRate).toBe(48); // Inherits Gram Santosh rate ₹48/₹1k
    expect(result.loanYears).toBeNull(); // Loan not available
    expect(result.surrenderYears).toBeNull(); // Surrender not available
    expect(result.paidUpYears).toBe(5); // Paid-Up eligible after 5 yrs
    expect(result.specialFeatures?.[1]).toContain('Parent Death Premium Waiver');
  });
});
