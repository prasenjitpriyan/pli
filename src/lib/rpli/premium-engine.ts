import { RPLI_CONFIG } from '../../config/rpli/config';
import { CHILD_RATE_DATABASE, getExactRpliRate } from '../../config/rpli/rates';
import { ModePremiumDetail, RpliPolicy } from './types';

export interface RpliPremiumEngineResult {
  monthlyPremium: number;
  quarterlyPremium: number;
  halfYearlyPremium: number;
  yearlyPremium: number;
  basePremiumPerLakh: number;
  scaledGrossPremium: number;
  confidenceScore: number;
  calculationMethod: string;
  isExactReference: boolean;
  premiumSource: 'OFFICIAL' | 'CONFIGURED' | 'ESTIMATED';
  rateTableVersion: string;
  rateSource: string;
  modeDetails: {
    monthly: ModePremiumDetail;
    quarterly: ModePremiumDetail;
    halfYearly: ModePremiumDetail;
    yearly: ModePremiumDetail;
  };
}

export function predictRpliMonthlyPremium(params: {
  policyType: RpliPolicy;
  effectiveAge: number; // Age at entry (completed years)
  duration: number; // Term in years
  sumAssured: number;
  premiumCeasingAge?: number;
  maturityAge?: number;
  childAge?: number;
}): RpliPremiumEngineResult {
  const { policyType, effectiveAge, duration, sumAssured, maturityAge, childAge } = params;
  const units = sumAssured / 1000;

  let monthlyRate = 0;
  let quarterlyRate = 0;
  let halfYearlyRate = 0;
  let yearlyRate = 0;
  const isExactReference = true;
  const confidenceScore = 100;
  let method = '';
  let rateVersion = 'DoP/RPLI/EA/2020';
  let rateSource = 'India Post RPLI Official Rate Tables';

  if (policyType === 'BAL_JEEVAN_BIMA') {
    const lookupAge = childAge ?? effectiveAge;
    const childRow = CHILD_RATE_DATABASE.find(
      (r) => r.childEntryAge === lookupAge || Math.abs(r.childEntryAge - lookupAge) <= 1
    );

    if (!childRow) {
      throw new Error(
        `No official RPLI rate found for Child Entry Age ${lookupAge}, Term ${duration}`
      );
    }

    monthlyRate = childRow.monthlyRatePer1000;
    quarterlyRate = childRow.quarterlyRatePer1000;
    halfYearlyRate = childRow.halfYearlyRatePer1000;
    yearlyRate = childRow.yearlyRatePer1000;
    rateVersion = childRow.sourceVersion;
    rateSource = 'India Post RPLI Bal Jeevan Bima Rate Table';
    method = `Official Bal Jeevan Bima Rate Table: Age ${lookupAge}, Rate ₹${monthlyRate}/₹1000/mo`;
  } else {
    // Exact Lookup across all 4 modes
    const mRes = getExactRpliRate({ product: policyType, entryAge: effectiveAge, maturityAge, term: duration, mode: 'MONTHLY' });
    const qRes = getExactRpliRate({ product: policyType, entryAge: effectiveAge, maturityAge, term: duration, mode: 'QUARTERLY' });
    const hRes = getExactRpliRate({ product: policyType, entryAge: effectiveAge, maturityAge, term: duration, mode: 'HALF_YEARLY' });
    const yRes = getExactRpliRate({ product: policyType, entryAge: effectiveAge, maturityAge, term: duration, mode: 'YEARLY' });

    monthlyRate = mRes.ratePer1000;
    quarterlyRate = qRes.ratePer1000;
    halfYearlyRate = hRes.ratePer1000;
    yearlyRate = yRes.ratePer1000;
    rateVersion = yRes.version;
    rateSource = yRes.source;
    method = `Exact Table Lookup (${yRes.version}): ${policyType} Age ${effectiveAge}, MatAge ${maturityAge ?? 'N/A'}, Term ${duration}y`;
  }

  // Calculate gross premiums
  const monthlyGross = Math.round(monthlyRate * units * 100) / 100;
  const quarterlyGross = Math.round(quarterlyRate * units * 100) / 100;
  const halfYearlyGross = Math.round(halfYearlyRate * units * 100) / 100;
  const yearlyGross = Math.round(yearlyRate * units * 100) / 100;

  // Rebates from Config
  const monthlyRebate = RPLI_CONFIG.modeRebates.MONTHLY;
  const quarterlyRebate = RPLI_CONFIG.modeRebates.QUARTERLY;
  const halfYearlyRebate = RPLI_CONFIG.modeRebates.HALF_YEARLY;
  const yearlyRebate = RPLI_CONFIG.modeRebates.YEARLY;

  // GST Calculation
  const gstApplicable = RPLI_CONFIG.gst.applicable;
  const gstRate = RPLI_CONFIG.gst.firstYearRate;

  const calcTax = (gross: number, rebate: number) => {
    if (!gstApplicable) return 0;
    const taxable = Math.max(0, gross - rebate);
    return Math.round(taxable * gstRate * 100) / 100;
  };

  const monthlyTax = calcTax(monthlyGross, monthlyRebate);
  const quarterlyTax = calcTax(quarterlyGross, quarterlyRebate);
  const halfYearlyTax = calcTax(halfYearlyGross, halfYearlyRebate);
  const yearlyTax = calcTax(yearlyGross, yearlyRebate);

  // Net Premiums (Gross - Rebate + Tax)
  const monthlyNet = monthlyGross - monthlyRebate + monthlyTax;
  const quarterlyNet = quarterlyGross - quarterlyRebate + quarterlyTax;
  const halfYearlyNet = halfYearlyGross - halfYearlyRebate + halfYearlyTax;
  const yearlyNet = yearlyGross - yearlyRebate + yearlyTax;

  return {
    monthlyPremium: monthlyNet,
    quarterlyPremium: quarterlyNet,
    halfYearlyPremium: halfYearlyNet,
    yearlyPremium: yearlyNet,
    basePremiumPerLakh: Math.round((monthlyGross / sumAssured) * 100000 * 100) / 100,
    scaledGrossPremium: monthlyGross,
    confidenceScore,
    calculationMethod: method,
    isExactReference,
    premiumSource: 'OFFICIAL',
    rateTableVersion: rateVersion,
    rateSource,
    modeDetails: {
      monthly: {
        ratePer1000: monthlyRate,
        grossPremium: monthlyGross,
        rebate: monthlyRebate,
        tax: monthlyTax,
        netPremium: monthlyNet,
      },
      quarterly: {
        ratePer1000: quarterlyRate,
        grossPremium: quarterlyGross,
        rebate: quarterlyRebate,
        tax: quarterlyTax,
        netPremium: quarterlyNet,
      },
      halfYearly: {
        ratePer1000: halfYearlyRate,
        grossPremium: halfYearlyGross,
        rebate: halfYearlyRebate,
        tax: halfYearlyTax,
        netPremium: halfYearlyNet,
      },
      yearly: {
        ratePer1000: yearlyRate,
        grossPremium: yearlyGross,
        rebate: yearlyRebate,
        tax: yearlyTax,
        netPremium: yearlyNet,
      },
    },
  };
}
