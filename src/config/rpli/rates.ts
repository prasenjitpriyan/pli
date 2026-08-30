import { RpliPolicy } from '../../lib/rpli/types';

export interface RpliRateRow {
  plan: RpliPolicy;
  entryAge: number;
  maturityAge?: number;
  term?: number;
  monthlyRatePer1000: number;
  quarterlyRatePer1000: number;
  halfYearlyRatePer1000: number;
  yearlyRatePer1000: number;
  bonusRatePer1000: number;
  effectiveFrom: string;
  effectiveTo: string;
  source: string;
  sourceVersion: string;
}

export interface ChildRateRow {
  childEntryAge: number;
  maturityAge: number;
  term: number;
  monthlyRatePer1000: number;
  quarterlyRatePer1000: number;
  halfYearlyRatePer1000: number;
  yearlyRatePer1000: number;
  bonusRatePer1000: number;
  effectiveFrom: string;
  effectiveTo: string;
  sourceVersion: string;
}

/**
 * Official India Post RPLI Premium Rate Database.
 * Rates stored per ₹1,000 Sum Assured.
 * Mode rates are independently specified in official tables (no arithmetic dividing by 12 or 4).
 */
export const RPLI_RATE_DATABASE: RpliRateRow[] = [
  // ==========================================
  // 1. Gram Santosh (Endowment Assurance - GEA)
  // ==========================================
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 40,
    maturityAge: 60,
    term: 20,
    monthlyRatePer1000: 4.20,
    quarterlyRatePer1000: 12.45,
    halfYearlyRatePer1000: 24.65,
    yearlyRatePer1000: 48.35,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-Endowment-Q1',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 40,
    maturityAge: 55,
    term: 15,
    monthlyRatePer1000: 5.80,
    quarterlyRatePer1000: 17.20,
    halfYearlyRatePer1000: 34.00,
    yearlyRatePer1000: 66.70,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-Endowment-Q1',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 40,
    maturityAge: 58,
    term: 18,
    monthlyRatePer1000: 4.80,
    quarterlyRatePer1000: 14.25,
    halfYearlyRatePer1000: 28.20,
    yearlyRatePer1000: 55.30,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-Endowment-Q1',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 30,
    maturityAge: 60,
    term: 30,
    monthlyRatePer1000: 2.60,
    quarterlyRatePer1000: 7.70,
    halfYearlyRatePer1000: 15.25,
    yearlyRatePer1000: 29.90,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 30,
    maturityAge: 58,
    term: 28,
    monthlyRatePer1000: 2.80,
    quarterlyRatePer1000: 8.30,
    halfYearlyRatePer1000: 16.45,
    yearlyRatePer1000: 32.25,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 30,
    maturityAge: 55,
    term: 25,
    monthlyRatePer1000: 3.20,
    quarterlyRatePer1000: 9.50,
    halfYearlyRatePer1000: 18.80,
    yearlyRatePer1000: 36.85,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 30,
    maturityAge: 50,
    term: 20,
    monthlyRatePer1000: 4.00,
    quarterlyRatePer1000: 11.85,
    halfYearlyRatePer1000: 23.45,
    yearlyRatePer1000: 46.00,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 30,
    maturityAge: 45,
    term: 15,
    monthlyRatePer1000: 5.60,
    quarterlyRatePer1000: 16.60,
    halfYearlyRatePer1000: 32.85,
    yearlyRatePer1000: 64.40,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 30,
    maturityAge: 40,
    term: 10,
    monthlyRatePer1000: 8.40,
    quarterlyRatePer1000: 24.90,
    halfYearlyRatePer1000: 49.30,
    yearlyRatePer1000: 96.65,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 30,
    maturityAge: 35,
    term: 5,
    monthlyRatePer1000: 17.20,
    quarterlyRatePer1000: 51.05,
    halfYearlyRatePer1000: 101.10,
    yearlyRatePer1000: 198.20,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 19,
    maturityAge: 60,
    term: 41,
    monthlyRatePer1000: 1.80,
    quarterlyRatePer1000: 5.35,
    halfYearlyRatePer1000: 10.55,
    yearlyRatePer1000: 20.70,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },

  // ==========================================
  // 2. Gram Suraksha (Whole Life Assurance - GWLA)
  // ==========================================
  {
    plan: 'GRAM_SURAKSHA',
    entryAge: 40,
    maturityAge: 80,
    term: 15, // Ceasing at 55 (term = 15)
    monthlyRatePer1000: 3.85,
    quarterlyRatePer1000: 11.40,
    halfYearlyRatePer1000: 22.55,
    yearlyRatePer1000: 44.15,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-WholeLife-Q2',
  },
  {
    plan: 'GRAM_SURAKSHA',
    entryAge: 40,
    maturityAge: 80,
    term: 18, // Ceasing at 58 (term = 18)
    monthlyRatePer1000: 3.45,
    quarterlyRatePer1000: 10.15,
    halfYearlyRatePer1000: 20.10,
    yearlyRatePer1000: 39.35,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-WholeLife-Q2',
  },
  {
    plan: 'GRAM_SURAKSHA',
    entryAge: 40,
    maturityAge: 80,
    term: 20, // Ceasing at 60 (term = 20)
    monthlyRatePer1000: 3.20,
    quarterlyRatePer1000: 9.55,
    halfYearlyRatePer1000: 18.90,
    yearlyRatePer1000: 36.95,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-WholeLife-Q2',
  },
  {
    plan: 'GRAM_SURAKSHA',
    entryAge: 30,
    maturityAge: 80,
    term: 30, // Ceasing at 60
    monthlyRatePer1000: 2.00,
    quarterlyRatePer1000: 5.95,
    halfYearlyRatePer1000: 11.75,
    yearlyRatePer1000: 23.00,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },

  // ==========================================
  // 3. Gram Suvidha (Convertible Whole Life Assurance - GCWLA)
  // ==========================================
  {
    plan: 'GRAM_SUVIDHA',
    entryAge: 40,
    maturityAge: 80,
    term: 20, // Ceasing at 60 (term = 20)
    monthlyRatePer1000: 3.20,
    quarterlyRatePer1000: 9.55,
    halfYearlyRatePer1000: 18.90,
    yearlyRatePer1000: 36.95,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-CWLA-Q3',
  },
  {
    plan: 'GRAM_SUVIDHA',
    entryAge: 30,
    maturityAge: 80,
    term: 30,
    monthlyRatePer1000: 2.00,
    quarterlyRatePer1000: 5.95,
    halfYearlyRatePer1000: 11.75,
    yearlyRatePer1000: 23.00,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },

  // ==========================================
  // 4. Gram Sumangal (Anticipated Endowment Assurance - GAEA)
  // ==========================================
  {
    plan: 'GRAM_SUMANGAL',
    entryAge: 40,
    maturityAge: 55,
    term: 15,
    monthlyRatePer1000: 6.70,
    quarterlyRatePer1000: 19.90,
    halfYearlyRatePer1000: 39.35,
    yearlyRatePer1000: 77.15,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-AEA-Q4',
  },
  {
    plan: 'GRAM_SUMANGAL',
    entryAge: 40,
    maturityAge: 60,
    term: 20,
    monthlyRatePer1000: 5.35,
    quarterlyRatePer1000: 15.85,
    halfYearlyRatePer1000: 31.35,
    yearlyRatePer1000: 61.45,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-AEA-Q4',
  },
  {
    plan: 'GRAM_SUMANGAL',
    entryAge: 30,
    maturityAge: 45,
    term: 15,
    monthlyRatePer1000: 6.60,
    quarterlyRatePer1000: 19.60,
    halfYearlyRatePer1000: 38.80,
    yearlyRatePer1000: 76.00,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },
  {
    plan: 'GRAM_SUMANGAL',
    entryAge: 30,
    maturityAge: 50,
    term: 20,
    monthlyRatePer1000: 5.00,
    quarterlyRatePer1000: 14.80,
    halfYearlyRatePer1000: 29.30,
    yearlyRatePer1000: 57.50,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DoP/RPLI/2020',
  },

  // ==========================================
  // 5. Gram Priya (10 Years Short-Term Money Back)
  // ==========================================
  {
    plan: 'GRAM_PRIYA',
    entryAge: 40,
    maturityAge: 50,
    term: 10,
    monthlyRatePer1000: 10.10,
    quarterlyRatePer1000: 30.05,
    halfYearlyRatePer1000: 59.45,
    yearlyRatePer1000: 116.55,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-GramPriya-Q5',
  },
  {
    plan: 'GRAM_PRIYA',
    entryAge: 30,
    maturityAge: 40,
    term: 10,
    monthlyRatePer1000: 10.10,
    quarterlyRatePer1000: 30.05,
    halfYearlyRatePer1000: 59.45,
    yearlyRatePer1000: 116.55,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-GramPriya-Q5',
  },
  {
    plan: 'GRAM_PRIYA',
    entryAge: 20,
    maturityAge: 30,
    term: 10,
    monthlyRatePer1000: 10.10,
    quarterlyRatePer1000: 30.05,
    halfYearlyRatePer1000: 59.45,
    yearlyRatePer1000: 116.55,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'Official India Post RPLI Table',
    sourceVersion: 'DakSewa-GramPriya-Q5',
  },
];

/**
 * Bal Jeevan Bima (RPLI Children Policy) Official Rate Database
 */
export const CHILD_RATE_DATABASE: ChildRateRow[] = [
  {
    childEntryAge: 8,
    maturityAge: 18,
    term: 10,
    monthlyRatePer1000: 101.10,
    quarterlyRatePer1000: 303.30,
    halfYearlyRatePer1000: 606.60,
    yearlyRatePer1000: 1213.20,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    sourceVersion: 'DakSewa-Child-Q6',
  },
  {
    childEntryAge: 5,
    maturityAge: 18,
    term: 13,
    monthlyRatePer1000: 81.30,
    quarterlyRatePer1000: 243.90,
    halfYearlyRatePer1000: 487.80,
    yearlyRatePer1000: 975.60,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    sourceVersion: 'DoP/RPLI/Child/2020',
  },
  {
    childEntryAge: 10,
    maturityAge: 18,
    term: 8,
    monthlyRatePer1000: 125.40,
    quarterlyRatePer1000: 376.20,
    halfYearlyRatePer1000: 752.40,
    yearlyRatePer1000: 1504.80,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    sourceVersion: 'DoP/RPLI/Child/2020',
  },
];
