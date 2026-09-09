import { describe, expect, it } from 'vitest';
import { calculatePolicyServicing } from '../servicing-engine';

describe('Policy Servicing Actuarial Engine', () => {
  it('correctly calculates paid-up and loan availability for a 5-year paid PLI Santosh policy', () => {
    const result = calculatePolicyServicing({
      scheme: 'PLI',
      policyType: 'SANTOSH',
      sumAssured: 1000000, // ₹10 Lakhs
      entryAge: 30,
      policyTermYears: 20,
      yearsPaid: 5,
    });

    expect(result.scheme).toBe('PLI');
    expect(result.policyType).toBe('SANTOSH');
    expect(result.isPaidUpEligible).toBe(true);
    // 5 years out of 20 = 25% completed
    expect(result.paidUpSumAssured).toBe(250000);
    // At 5 years, bonus is NOT forfeited on surrender
    expect(result.isBonusForfeitedOnSurrender).toBe(false);
    expect(result.isSurrenderEligible).toBe(true);
    expect(result.estimatedSurrenderValue).toBeGreaterThan(0);

    // Loan eligibility: Santosh requires 3 years, so 5 years is eligible
    expect(result.isLoanEligible).toBe(true);
    expect(result.maxLoanAmount).toBeGreaterThan(0);
    expect(result.annualLoanInterestRate).toBe(10);
    expect(result.halfYearlyInterestPayment).toBe(Math.round(result.maxLoanAmount * 0.05));
  });

  it('enforces 100% bonus forfeiture rule when policy surrendered between 3 and 4.99 years', () => {
    const result = calculatePolicyServicing({
      scheme: 'PLI',
      policyType: 'SANTOSH',
      sumAssured: 500000,
      entryAge: 25,
      policyTermYears: 25,
      yearsPaid: 3, // 3 years paid
    });

    expect(result.isSurrenderEligible).toBe(true);
    expect(result.isBonusForfeitedOnSurrender).toBe(true);
    expect(result.eligibleBonusForSurrender).toBe(0);
    expect(result.advisoryNotes.some((n) => n.includes('forfeit'))).toBe(true);
  });

  it('disallows loan and surrender when less than 3 years have been paid', () => {
    const result = calculatePolicyServicing({
      scheme: 'PLI',
      policyType: 'SURAKSHA',
      sumAssured: 500000,
      entryAge: 30,
      policyTermYears: 30,
      yearsPaid: 2, // 2 years paid
    });

    expect(result.isPaidUpEligible).toBe(false);
    expect(result.isSurrenderEligible).toBe(false);
    expect(result.isLoanEligible).toBe(false);
    expect(result.maxLoanAmount).toBe(0);
    expect(result.estimatedSurrenderValue).toBe(0);
  });

  it('correctly calculates for RPLI Gram Suraksha', () => {
    const result = calculatePolicyServicing({
      scheme: 'RPLI',
      policyType: 'GRAM_SURAKSHA',
      sumAssured: 500000,
      entryAge: 25,
      policyTermYears: 30,
      yearsPaid: 6,
    });

    expect(result.scheme).toBe('RPLI');
    expect(result.bonusRate).toBe(60);
    expect(result.isLoanEligible).toBe(true);
    expect(result.isBonusForfeitedOnSurrender).toBe(false);
  });
});
