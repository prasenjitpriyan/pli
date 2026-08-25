import { describe, expect, it } from 'vitest';
import { calculateAge, calculateDurationAndMaturityAge, calculateEffectiveAge } from '../age-calculator';
import { calculatePLIQuotation } from '../calculator';
import { predictMonthlyPremium } from '../premium-model';

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

  describe('Whole Life Assurance (Suraksha & Suvidha) Ceasing Age Rules', () => {
    it('should calculate Whole Life premiums for ceasing age 60, 58, 55 with bonus accruing to age 80', () => {
      // Age 30, SA ₹1L, Ceasing Age 60 (Term 30)
      const quote60 = calculatePLIQuotation({
        policyType: 'WHOLE_LIFE',
        age: 30,
        premiumCeasingAge: 60,
        sumAssured: 100000,
      });

      expect(quote60.duration).toBe(30); // 60 - 30 = 30 yrs premium payment
      expect(quote60.bonusAccrualDuration).toBe(50); // 80 - 30 = 50 yrs bonus accrual
      expect(quote60.estimatedMonthlyPremium).toBe(200);
      expect(quote60.netMonthlyPremium).toBe(195);
      expect(quote60.totalBonus).toBe(76 * 100 * 50); // 380,000
      expect(quote60.maturityAmount).toBe(100000 + 380000); // 480,000

      // Age 30, SA ₹1L, Ceasing Age 58 (Term 28)
      const quote58 = calculatePLIQuotation({
        policyType: 'WHOLE_LIFE',
        age: 30,
        premiumCeasingAge: 58,
        sumAssured: 100000,
      });

      expect(quote58.duration).toBe(28); // 58 - 30 = 28 yrs payment
      expect(quote58.estimatedMonthlyPremium).toBe(220);
      expect(quote58.netMonthlyPremium).toBe(215);

      // Age 30, SA ₹1L, Ceasing Age 55 (Term 25)
      const quote55 = calculatePLIQuotation({
        policyType: 'WHOLE_LIFE',
        age: 30,
        premiumCeasingAge: 55,
        sumAssured: 100000,
      });

      expect(quote55.duration).toBe(25); // 55 - 30 = 25 yrs payment
      expect(quote55.estimatedMonthlyPremium).toBe(220);
      expect(quote55.netMonthlyPremium).toBe(215);
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

  describe('Anticipated Endowment (Sumangal) Survival Benefits Schedule', () => {
    it('should generate exact survival benefits schedule for 15-Year AEA Policy', () => {
      const quote = calculatePLIQuotation({
        policyType: 'ANTICIPATED_ENDOWMENT',
        age: 30,
        sumAssured: 100000,
        duration: 15,
      });

      expect(quote.survivalBenefits).toBeDefined();
      expect(quote.survivalBenefits).toHaveLength(3);
      expect(quote.survivalBenefits![0]).toEqual({
        year: 6,
        percentage: 20,
        description: '1st Survival Benefit (End of 6th Year)',
        amount: 20000,
      });
      expect(quote.survivalBenefits![1]).toEqual({
        year: 9,
        percentage: 20,
        description: '2nd Survival Benefit (End of 9th Year)',
        amount: 20000,
      });
      expect(quote.survivalBenefits![2]).toEqual({
        year: 12,
        percentage: 20,
        description: '3rd Survival Benefit (End of 12th Year)',
        amount: 20000,
      });

      // Total bonus = 48 * 100 * 15 = 72,000
      // Final maturity payout = 40% SA (40,000) + Total Bonus (72,000) = 112,000
      expect(quote.finalMaturityPayout).toBe(112000);
      expect(quote.maturityAmount).toBe(172000); // Total lifecycle returns = 60k + 112k = 172,000
    });

    it('should generate exact survival benefits schedule for 20-Year AEA Policy', () => {
      const quote = calculatePLIQuotation({
        policyType: 'ANTICIPATED_ENDOWMENT',
        age: 30,
        sumAssured: 100000,
        duration: 20,
      });

      expect(quote.survivalBenefits).toBeDefined();
      expect(quote.survivalBenefits).toHaveLength(3);
      expect(quote.survivalBenefits![0].year).toBe(8);
      expect(quote.survivalBenefits![1].year).toBe(12);
      expect(quote.survivalBenefits![2].year).toBe(16);

      // Total bonus = 48 * 100 * 20 = 96,000
      // Final maturity payout = 40% SA (40,000) + Total Bonus (96,000) = 136,000
      expect(quote.finalMaturityPayout).toBe(136000);
      expect(quote.maturityAmount).toBe(196000); // Total lifecycle returns = 60k + 136k = 196,000
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
