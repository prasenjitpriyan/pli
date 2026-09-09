import { describe, expect, it } from 'vitest';
import { solveGoalPlan } from '../goal-engine';

describe('Goal & Retirement Actuarial Planner Engine', () => {
  it('solves for target retirement corpus of ₹25 Lakhs over 20 years', () => {
    const result = solveGoalPlan({
      goalType: 'RETIREMENT',
      targetMode: 'CORPUS',
      targetCorpus: 2500000,
      currentAge: 35,
      horizonYears: 20,
      schemePreference: 'PLI',
    });

    expect(result.goalType).toBe('RETIREMENT');
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.primaryRecommendation).toBeDefined();

    const plan = result.primaryRecommendation;
    expect(plan.scheme).toBe('PLI');
    expect(plan.recommendedSumAssured).toBeGreaterThan(500000);
    expect(plan.estimatedMaturityAmount).toBeGreaterThanOrEqual(1500000);
    expect(plan.netMonthlyPremium).toBeGreaterThan(0);
    expect(plan.totalPremiumsPaid).toBeGreaterThan(0);
    expect(plan.milestones.length).toBeGreaterThanOrEqual(3);
    expect(plan.is1010DExempt).toBe(true);
  });

  it('solves for budget allocation of ₹4,000/month', () => {
    const result = solveGoalPlan({
      goalType: 'EDUCATION',
      targetMode: 'BUDGET',
      monthlyBudget: 4000,
      currentAge: 30,
      horizonYears: 15,
      schemePreference: 'ANY',
    });

    expect(result.recommendations.length).toBeGreaterThan(0);
    const plan = result.primaryRecommendation;
    expect(plan.recommendedSumAssured).toBeGreaterThanOrEqual(200000);
    expect(plan.totalBonusAccrued).toBeGreaterThan(0);
    expect(plan.netWealthGain).toBeGreaterThan(0);
  });
});
