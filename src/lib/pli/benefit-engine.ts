import { BenefitTimelineStep, PliPolicy, SurvivalBenefitPayout } from './types';

export interface BenefitCalculationInput {
  policy: PliPolicy;
  sumAssured: number;
  duration: number;
  totalBonus: number;
  terminalBonus: number;
  isConverted?: boolean;
}

export interface BenefitCalculationResult {
  maturityAmount: number;
  deathBenefitAmount: number;
  finalMaturityPayout: number;
  survivalBenefits?: SurvivalBenefitPayout[];
  timeline: BenefitTimelineStep[];
}

export function calculatePliBenefits(input: BenefitCalculationInput): BenefitCalculationResult {
  const { policy, sumAssured, duration, totalBonus, terminalBonus } = input;
  const timeline: BenefitTimelineStep[] = [];

  // Death benefit across all policies: Full Sum Assured + Accrued Bonus to date + Terminal Bonus
  const deathBenefitAmount = sumAssured + totalBonus + terminalBonus;
  const maturityAmount = sumAssured + totalBonus + terminalBonus;
  let finalMaturityPayout = sumAssured + totalBonus + terminalBonus;

  let survivalBenefits: SurvivalBenefitPayout[] | undefined = undefined;

  timeline.push({
    year: 0,
    type: 'PAYMENT',
    description: 'Policy Commencement — Premium Payments Begin & Full Life Cover Active',
    amount: 0,
  });

  if (policy === 'SUMANGAL') {
    survivalBenefits = [];
    if (duration === 15) {
      survivalBenefits.push(
        {
          year: 6,
          percentage: 20,
          description: '1st Survival Benefit (End of 6th Year)',
          amount: sumAssured * 0.2,
        },
        {
          year: 9,
          percentage: 20,
          description: '2nd Survival Benefit (End of 9th Year)',
          amount: sumAssured * 0.2,
        },
        {
          year: 12,
          percentage: 20,
          description: '3rd Survival Benefit (End of 12th Year)',
          amount: sumAssured * 0.2,
        }
      );
    } else if (duration === 20) {
      survivalBenefits.push(
        {
          year: 8,
          percentage: 20,
          description: '1st Survival Benefit (End of 8th Year)',
          amount: sumAssured * 0.2,
        },
        {
          year: 12,
          percentage: 20,
          description: '2nd Survival Benefit (End of 12th Year)',
          amount: sumAssured * 0.2,
        },
        {
          year: 16,
          percentage: 20,
          description: '3rd Survival Benefit (End of 16th Year)',
          amount: sumAssured * 0.2,
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
          amount: sumAssured * 0.2,
        },
        {
          year: y2,
          percentage: 20,
          description: `2nd Survival Benefit (End of Year ${y2})`,
          amount: sumAssured * 0.2,
        },
        {
          year: y3,
          percentage: 20,
          description: `3rd Survival Benefit (End of Year ${y3})`,
          amount: sumAssured * 0.2,
        }
      );
    }

    survivalBenefits.forEach((sb) => {
      timeline.push({
        year: sb.year,
        type: 'PAYOUT',
        description: `${sb.description} (20% Sum Assured)`,
        amount: sb.amount,
      });
    });

    finalMaturityPayout = sumAssured * 0.4 + totalBonus + terminalBonus;

    timeline.push({
      year: duration,
      type: 'MATURITY',
      description: `Final Maturity Payout (Remaining 40% Sum Assured + Total Accrued Bonus)`,
      amount: finalMaturityPayout,
    });
  } else {
    timeline.push({
      year: duration,
      type: 'MATURITY',
      description: `Full Maturity Benefit Payout (100% Sum Assured + Accrued Bonus)`,
      amount: maturityAmount,
    });
  }

  return {
    maturityAmount,
    deathBenefitAmount,
    finalMaturityPayout,
    survivalBenefits,
    timeline,
  };
}
