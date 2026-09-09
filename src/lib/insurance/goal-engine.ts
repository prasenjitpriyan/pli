import { calculateQuote } from './index';

export type GoalType = 'RETIREMENT' | 'EDUCATION' | 'MARRIAGE' | 'WEALTH';
export type TargetMode = 'CORPUS' | 'BUDGET';

export interface GoalPlannerInput {
  goalType: GoalType;
  targetMode: TargetMode;
  targetCorpus?: number; // Target lumpsum at maturity (e.g. ₹25,00,000)
  monthlyBudget?: number; // Monthly investment capacity (e.g. ₹5,000)
  currentAge: number;
  horizonYears: number;
  schemePreference?: 'PLI' | 'RPLI' | 'ANY';
}

export interface GoalRecommendationPlan {
  rank: number;
  category: 'WEALTH_MAXIMIZER' | 'FAMILY_SHIELD' | 'PERIODIC_LIQUIDITY';
  badge: string;
  scheme: 'PLI' | 'RPLI';
  policyType: string;
  policyName: string;
  bonusRate: number;
  recommendedSumAssured: number;
  durationYears: number;
  maturityAge: number;
  netMonthlyPremium: number;
  netAnnualPremium: number;
  totalPremiumsPaid: number;
  totalBonusAccrued: number;
  estimatedMaturityAmount: number;
  netWealthGain: number; // Maturity - Total Premiums Paid
  annualTaxSavings80C: number; // Estimated 80C deduction tax shield (approx 20% slab)
  is1010DExempt: boolean;
  highlightNote: string;
  milestones: {
    year: number;
    age: number;
    cumulativePaid: number;
    accruedCorpus: number;
    deathCover: number;
  }[];
}

export interface GoalPlannerResult {
  goalType: GoalType;
  targetMode: TargetMode;
  targetCorpus: number;
  monthlyBudget: number;
  currentAge: number;
  horizonYears: number;
  maturityAge: number;
  recommendations: GoalRecommendationPlan[];
  primaryRecommendation: GoalRecommendationPlan;
}

interface SchemeProfile {
  scheme: 'PLI' | 'RPLI';
  policyType: Parameters<typeof calculateQuote>[0]['policyType'];
  policyName: string;
  category: 'WEALTH_MAXIMIZER' | 'FAMILY_SHIELD' | 'PERIODIC_LIQUIDITY';
  badge: string;
  bonusRate: number;
  minSA: number;
  maxSA: number;
  minAge: number;
  maxAge: number;
  minTerm: number;
  maxTerm: number;
  highlightNote: string;
}

const SCHEME_PROFILES: SchemeProfile[] = [
  // PLI Schemes
  {
    scheme: 'PLI',
    policyType: 'SANTOSH',
    policyName: 'PLI Santosh (Endowment Assurance)',
    category: 'WEALTH_MAXIMIZER',
    badge: '🏆 Best Net Maturity Return',
    bonusRate: 52,
    minSA: 20000,
    maxSA: 5000000,
    minAge: 19,
    maxAge: 55,
    minTerm: 5,
    maxTerm: 55,
    highlightNote: 'Guaranteed endowment payout with stable ₹52/₹1,000 declared bonus. Ideal for planned wealth milestones.',
  },
  {
    scheme: 'PLI',
    policyType: 'SURAKSHA',
    policyName: 'PLI Suraksha (Whole Life Assurance)',
    category: 'FAMILY_SHIELD',
    badge: '🛡️ Highest Bonus (₹76/₹1k)',
    bonusRate: 76,
    minSA: 20000,
    maxSA: 5000000,
    minAge: 19,
    maxAge: 55,
    minTerm: 5,
    maxTerm: 60,
    highlightNote: 'Industry-leading ₹76/₹1,000 bonus rate with maximum sovereign life coverage until age 80.',
  },
  {
    scheme: 'PLI',
    policyType: 'SUMANGAL',
    policyName: 'PLI Sumangal (Anticipated Endowment)',
    category: 'PERIODIC_LIQUIDITY',
    badge: '💧 Money-Back Liquidity',
    bonusRate: 48,
    minSA: 20000,
    maxSA: 5000000,
    minAge: 19,
    maxAge: 45,
    minTerm: 15,
    maxTerm: 20,
    highlightNote: 'Provides periodic survival benefits during the term + remaining 40% SA and bonus at maturity.',
  },
  // RPLI Schemes
  {
    scheme: 'RPLI',
    policyType: 'GRAM_SANTOSH',
    policyName: 'RPLI Gram Santosh (Rural Endowment)',
    category: 'WEALTH_MAXIMIZER',
    badge: '🌾 Open to All Citizens',
    bonusRate: 48,
    minSA: 10000,
    maxSA: 1000000,
    minAge: 19,
    maxAge: 55,
    minTerm: 5,
    maxTerm: 55,
    highlightNote: 'Accessible to all rural citizens and professionals with ₹48/₹1,000 bonus rate.',
  },
  {
    scheme: 'RPLI',
    policyType: 'GRAM_SURAKSHA',
    policyName: 'RPLI Gram Suraksha (Rural Whole Life)',
    category: 'FAMILY_SHIELD',
    badge: '🌾 High Bonus (₹60/₹1k)',
    bonusRate: 60,
    minSA: 10000,
    maxSA: 1000000,
    minAge: 19,
    maxAge: 55,
    minTerm: 5,
    maxTerm: 60,
    highlightNote: 'Affordable rural whole life plan with ₹60/₹1,000 bonus rate and low monthly outflow.',
  },
];

export function solveGoalPlan(input: GoalPlannerInput): GoalPlannerResult {
  const {
    goalType,
    targetMode,
    currentAge,
    horizonYears,
    schemePreference = 'ANY',
  } = input;

  const effectiveTerm = Math.max(5, Math.min(40, horizonYears));
  const maturityAge = currentAge + effectiveTerm;

  // Filter candidates matching age, term, and scheme
  let candidates = SCHEME_PROFILES.filter((p) => {
    if (schemePreference !== 'ANY' && p.scheme !== schemePreference) return false;
    if (currentAge < p.minAge || currentAge > p.maxAge) return false;
    if (effectiveTerm < p.minTerm || effectiveTerm > p.maxTerm) return false;
    return true;
  });

  if (candidates.length === 0) {
    candidates = SCHEME_PROFILES.filter((p) => p.category === 'WEALTH_MAXIMIZER');
  }

  const recommendations: GoalRecommendationPlan[] = [];

  for (const profile of candidates) {
    let chosenSA = 100000;

    if (targetMode === 'CORPUS') {
      const targetCorpus = input.targetCorpus || 2500000;
      // Reverse Actuarial Formula:
      // Maturity = SA + (SA / 1000 * BonusRate * Duration)
      // Maturity = SA * (1 + (BonusRate * Duration / 1000))
      // SA = Maturity / (1 + (BonusRate * Duration / 1000))
      const bonusMultiplier = (profile.bonusRate * effectiveTerm) / 1000;
      const rawSA = targetCorpus / (1 + bonusMultiplier);
      // Round to nearest 10,000
      chosenSA = Math.round(rawSA / 10000) * 10000;
      chosenSA = Math.max(profile.minSA, Math.min(profile.maxSA, chosenSA));
    } else {
      // BUDGET Mode
      const monthlyBudget = input.monthlyBudget || 5000;
      // Rough base estimate: ₹3.5 per ₹1k SA monthly
      const roughSA = (monthlyBudget / 3.5) * 1000;
      chosenSA = Math.round(roughSA / 20000) * 20000;
      chosenSA = Math.max(profile.minSA, Math.min(profile.maxSA, chosenSA));
    }

    try {
      const quote = calculateQuote({
        scheme: profile.scheme,
        policyType: profile.policyType,
        age: currentAge,
        sumAssured: chosenSA,
        duration: effectiveTerm,
        maturityAge,
        premiumCeasingAge: maturityAge,
        frequency: 'MONTHLY',
      });

      const netMonthly = quote.netMonthlyPremium;
      const netAnnual = quote.netMonthlyPremium * 12;
      const totalPaid = quote.totalPremiumPaid || netAnnual * effectiveTerm;
      const totalBonus = quote.totalBonus;
      const maturityAmt = quote.maturityAmount;
      const netGain = maturityAmt - totalPaid;

      // Tax savings under 80C (assume standard 20% slab + 4% cess = 20.8%)
      const eligible80CAmount = Math.min(150000, netAnnual);
      const taxSavings = Math.round(eligible80CAmount * 0.208);

      // Milestones projection
      const milestoneInterval = Math.max(3, Math.floor(effectiveTerm / 4));
      const milestones: GoalRecommendationPlan['milestones'] = [];

      for (let yr = milestoneInterval; yr <= effectiveTerm; yr += milestoneInterval) {
        const fraction = yr / effectiveTerm;
        const cumPaid = Math.round(totalPaid * fraction);
        const cumBonus = Math.round((chosenSA / 1000) * profile.bonusRate * yr);
        milestones.push({
          year: yr,
          age: currentAge + yr,
          cumulativePaid: cumPaid,
          accruedCorpus: chosenSA + cumBonus,
          deathCover: chosenSA + cumBonus,
        });
      }

      // Ensure exact final milestone
      if (!milestones.some((m) => m.year === effectiveTerm)) {
        milestones.push({
          year: effectiveTerm,
          age: maturityAge,
          cumulativePaid: totalPaid,
          accruedCorpus: maturityAmt,
          deathCover: maturityAmt,
        });
      }

      recommendations.push({
        rank: recommendations.length + 1,
        category: profile.category,
        badge: profile.badge,
        scheme: profile.scheme,
        policyType: profile.policyType,
        policyName: profile.policyName,
        bonusRate: profile.bonusRate,
        recommendedSumAssured: chosenSA,
        durationYears: effectiveTerm,
        maturityAge,
        netMonthlyPremium: netMonthly,
        netAnnualPremium: netAnnual,
        totalPremiumsPaid: totalPaid,
        totalBonusAccrued: totalBonus,
        estimatedMaturityAmount: maturityAmt,
        netWealthGain: netGain,
        annualTaxSavings80C: taxSavings,
        is1010DExempt: true,
        highlightNote: profile.highlightNote,
        milestones,
      });
    } catch {
      // If specific scheme quote fails due to age/term restrictions, continue
    }
  }

  // Sort: prioritize Wealth Maximizers first, then Family Shield
  recommendations.sort((a, b) => b.netWealthGain - a.netWealthGain);
  recommendations.forEach((r, idx) => {
    r.rank = idx + 1;
  });

  const primaryRecommendation =
    recommendations.find((r) => r.category === 'WEALTH_MAXIMIZER') || recommendations[0];

  return {
    goalType,
    targetMode,
    targetCorpus: input.targetCorpus || 2500000,
    monthlyBudget: input.monthlyBudget || 5000,
    currentAge,
    horizonYears: effectiveTerm,
    maturityAge,
    recommendations,
    primaryRecommendation,
  };
}
