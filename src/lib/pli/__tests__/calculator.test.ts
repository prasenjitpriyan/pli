import { describe, expect, it } from 'vitest';
import { calculateAge, calculateDurationAndMaturityAge, calculateEffectiveAge } from '../age-calculator';
import { calculatePLIQuotation } from '../calculator';
import { predictMonthlyPremium } from '../premium-model';
import { calculateTerminalBonus } from '../terminal-bonus';

describe('PLI Calculation Engine Test Suite (6 Policy Types & Continuous Model)', () => {
  describe('Age and Effective Age Derivations', () => {
    it('should calculate completed age correctly from Date of Birth', () => {
      const { age, effectiveDate } = calculateAge('2005-01-15', '2024-04-01');
      expect(age).toBe(19);
      expect(effectiveDate).toBe('2024-04-01');
    });

    it('should calculate Joint Life Effective Age as floor((First + Second) / 2)', () => {
      const effAge = calculateEffectiveAge({
        policyType: 'JOINT_LIFE',
        age: 30,
        firstLifeAge: 30,
        secondLifeAge: 28,
      });
      expect(effAge).toBe(29);
    });

    it('should use Child Age for Children Policy', () => {
      const effAge = calculateEffectiveAge({
        policyType: 'CHILDREN',
        age: 30,
        childAge: 5,
      });
      expect(effAge).toBe(5);
    });
  });

  describe('Policy-Aware Rebates', () => {
    it('should apply ₹7 rebate for Joint Life Assurance', () => {
      const quote = calculatePLIQuotation({
        policyType: 'JOINT_LIFE',
        firstLifeAge: 30,
        secondLifeAge: 28,
        sumAssured: 100000,
        duration: 20,
      });
      expect(quote.rebate).toBe(7);
      expect(quote.netMonthlyPremium).toBe(423); // 430 - 7
    });

    it('should apply ₹5 rebate for standard policies', () => {
      const quote = calculatePLIQuotation({
        policyType: 'ENDOWMENT',
        age: 30,
        sumAssured: 100000,
        duration: 20,
      });
      expect(quote.rebate).toBe(5);
      expect(quote.netMonthlyPremium).toBe(395); // 400 - 5
    });
  });

  describe('Model Confidence & Proximity Scores', () => {
    it('should return 100% confidence for exact reference points', () => {
      const pred = predictMonthlyPremium({
        policyType: 'ENDOWMENT',
        effectiveAge: 30,
        duration: 20,
        sumAssured: 100000,
      });
      expect(pred.confidenceScore).toBe(100);
      expect(pred.isExactReference).toBe(true);
      expect(pred.scaledGrossPremium).toBe(400);
    });

    it('should return high confidence (>=90%) for 1D duration interpolation', () => {
      const pred = predictMonthlyPremium({
        policyType: 'ENDOWMENT',
        effectiveAge: 30,
        duration: 18,
        sumAssured: 100000,
      });
      expect(pred.confidenceScore).toBeGreaterThanOrEqual(90);
      expect(pred.isExactReference).toBe(false);
    });
  });

  describe('Calibration Dataset Regression Tests (from PDF)', () => {
    it('1. Age 30 Endowment Assurance calibration curve (SA ₹1L)', () => {
      const terms = [5, 10, 15, 20, 25, 28, 30];
      const expected = [1720, 840, 560, 400, 320, 280, 260];

      terms.forEach((t, i) => {
        const quote = calculatePLIQuotation({
          policyType: 'ENDOWMENT',
          age: 30,
          sumAssured: 100000,
          duration: t,
        });
        expect(quote.estimatedMonthlyPremium).toBe(expected[i]);
      });
    });

    it('2. Age 5 Children Policy (Bal Jeevan Bima) calibration curve (SA ₹1L)', () => {
      const terms = [13, 14, 15, 16, 17, 18, 19, 20];
      const expected = [813, 767, 727, 693, 663, 636, 613, 592];

      terms.forEach((t, i) => {
        const quote = calculatePLIQuotation({
          policyType: 'CHILDREN',
          childAge: 5,
          sumAssured: 100000,
          duration: t,
        });
        expect(quote.estimatedMonthlyPremium).toBe(expected[i]);
        expect(quote.bonusRate).toBe(52);
      });
    });

    it('3. Joint Life Assurance (Effective Age 29) calibration curve (SA ₹1L)', () => {
      const terms = [6, 10, 15, 20];
      const expected = [1590, 940, 600, 430];

      terms.forEach((t, i) => {
        const quote = calculatePLIQuotation({
          policyType: 'JOINT_LIFE',
          firstLifeAge: 30,
          secondLifeAge: 28,
          sumAssured: 100000,
          duration: t,
        });
        expect(quote.effectiveAge).toBe(29);
        expect(quote.estimatedMonthlyPremium).toBe(expected[i]);
        expect(quote.rebate).toBe(7);
      });
    });

    it('4. Arbitrary Unseen Combination Estimation (Age 27, Term 18, SA ₹3,00,000)', () => {
      const quote = calculatePLIQuotation({
        policyType: 'ENDOWMENT',
        age: 27,
        sumAssured: 300000,
        duration: 18,
      });

      expect(quote.estimatedMonthlyPremium).toBeGreaterThan(1000);
      expect(quote.sumAssuredFactor).toBe(3);
      expect(quote.isEstimated).toBe(true);
      expect(quote.totalBonus).toBe(52 * 300 * 18); // 280,800
      expect(quote.maturityAmount).toBe(300000 + 280800); // 580,800
    });
  });
});
