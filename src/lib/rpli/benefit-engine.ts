import { BenefitTimelineStep, SurvivalBenefitPayout } from '../pli/types';
import { RpliPolicy } from './types';

export interface RpliBenefitCalculationInput {
  policy: RpliPolicy;
  sumAssured: number;
  duration: number;
  totalBonus: number;
  terminalBonus: number;
  isConverted?: boolean;
}

export interface RpliBenefitCalculationResult {
  maturityAmount: number;
  deathBenefitAmount: number;
  finalMaturityPayout: number;
  survivalBenefits?: SurvivalBenefitPayout[];
  timeline: BenefitTimelineStep[];
}

export function calculateRpliBenefits(input: RpliBenefitCalculationInput): RpliBenefitCalculationResult {
  const { policy, sumAssured, duration, totalBonus, terminalBonus } = input;
  const timeline: BenefitTimelineStep[] = [];

  // Death benefit: Full Sum Assured + Accrued Bonus (prior survival payouts are NOT deducted)
  const deathBenefitAmount = sumAssured + totalBonus + terminalBonus;
  const maturityAmount = sumAssured + totalBonus + terminalBonus;
  let finalMaturityPayout = sumAssured + totalBonus + terminalBonus;

  let survivalBenefits: SurvivalBenefitPayout[] | undefined = undefined;

  timeline.push({
    year: 0,
    type: 'PAYMENT',
    description: 'Policy Commencement — RPLI Premium Payments Begin & Full Life Cover Active',
    amount: 0,
  });

  if (policy === 'GRAM_PRIYA') {
    // Gram Priya Fixed 10-Year Schedule: Year 4 (20%), Year 7 (20%), Year 10 (60% + Accrued Bonus)
    survivalBenefits = [
      {
        year: 4,
        percentage: 20,
        description: '1st Survival Benefit (End of 4th Year)',
        amount: sumAssured * 0.2,
      },
      {
        year: 7,
        percentage: 20,
        description: '2nd Survival Benefit (End of 7th Year)',
        amount: sumAssured * 0.2,
      },
    ];

    survivalBenefits.forEach((sb) => {
      timeline.push({
        year: sb.year,
        type: 'PAYOUT',
        description: `${sb.description} (20% Sum Assured)`,
        amount: sb.amount,
      });
    });

    finalMaturityPayout = sumAssured * 0.6 + totalBonus + terminalBonus;

    timeline.push({
      year: 10,
      type: 'MATURITY',
      description: 'Final Maturity Payout (Remaining 60% Sum Assured + Accrued Bonus)',
      amount: finalMaturityPayout,
    });
  } else if (policy === 'GRAM_SUMANGAL') {
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
    } else {
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
      description: 'Final Maturity Payout (Remaining 40% Sum Assured + Accrued Bonus)',
      amount: finalMaturityPayout,
    });
  } else {
    timeline.push({
      year: duration,
      type: 'MATURITY',
      description: 'Full Maturity Benefit Payout (100% Sum Assured + Accrued Bonus)',
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
