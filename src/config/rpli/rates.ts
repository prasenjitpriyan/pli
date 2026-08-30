import { PremiumFrequency } from '../../lib/pli/types';
import { RpliPolicy } from '../../lib/rpli/types';

export interface ExactRpliRateEntry {
  product: RpliPolicy;
  entryAge: number;
  maturityAge: number;
  term?: number;
  mode: PremiumFrequency;
  ratePer1000: number;
  effectiveFrom: string;
  effectiveTo: string;
  source: string;
  version: string;
}

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
 * 1. Dedicated Official Mode Tables for RPLI Endowment Assurance (Gram Santosh)
 * Sourced directly from India Post Gazette & Official Rate Tables.
 */
export const RPLI_EA_MONTHLY: ExactRpliRateEntry[] = [
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 60, term: 21, mode: 'MONTHLY', ratePer1000: 3.95, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 58, term: 19, mode: 'MONTHLY', ratePer1000: 4.45, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 55, term: 16, mode: 'MONTHLY', ratePer1000: 5.35, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 50, term: 11, mode: 'MONTHLY', ratePer1000: 7.60, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 60, term: 20, mode: 'MONTHLY', ratePer1000: 4.20, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 58, term: 18, mode: 'MONTHLY', ratePer1000: 4.80, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 55, term: 15, mode: 'MONTHLY', ratePer1000: 5.80, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 50, term: 10, mode: 'MONTHLY', ratePer1000: 8.40, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 60, term: 30, mode: 'MONTHLY', ratePer1000: 2.60, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 58, term: 28, mode: 'MONTHLY', ratePer1000: 2.80, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 55, term: 25, mode: 'MONTHLY', ratePer1000: 3.20, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 50, term: 20, mode: 'MONTHLY', ratePer1000: 4.00, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 19, maturityAge: 60, term: 41, mode: 'MONTHLY', ratePer1000: 1.80, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
];

export const RPLI_EA_QUARTERLY: ExactRpliRateEntry[] = [
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 60, term: 21, mode: 'QUARTERLY', ratePer1000: 11.70, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 58, term: 19, mode: 'QUARTERLY', ratePer1000: 13.20, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 55, term: 16, mode: 'QUARTERLY', ratePer1000: 15.85, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 50, term: 11, mode: 'QUARTERLY', ratePer1000: 22.55, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 60, term: 20, mode: 'QUARTERLY', ratePer1000: 12.45, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 58, term: 18, mode: 'QUARTERLY', ratePer1000: 14.25, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 55, term: 15, mode: 'QUARTERLY', ratePer1000: 17.20, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 50, term: 10, mode: 'QUARTERLY', ratePer1000: 24.90, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 60, term: 30, mode: 'QUARTERLY', ratePer1000: 7.70, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 58, term: 28, mode: 'QUARTERLY', ratePer1000: 8.30, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 55, term: 25, mode: 'QUARTERLY', ratePer1000: 9.50, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 50, term: 20, mode: 'QUARTERLY', ratePer1000: 11.85, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 19, maturityAge: 60, term: 41, mode: 'QUARTERLY', ratePer1000: 5.35, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
];

export const RPLI_EA_HALF_YEARLY: ExactRpliRateEntry[] = [
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 60, term: 21, mode: 'HALF_YEARLY', ratePer1000: 23.15, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 58, term: 19, mode: 'HALF_YEARLY', ratePer1000: 26.15, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 55, term: 16, mode: 'HALF_YEARLY', ratePer1000: 31.40, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 50, term: 11, mode: 'HALF_YEARLY', ratePer1000: 44.65, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 60, term: 20, mode: 'HALF_YEARLY', ratePer1000: 24.65, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 58, term: 18, mode: 'HALF_YEARLY', ratePer1000: 28.20, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 55, term: 15, mode: 'HALF_YEARLY', ratePer1000: 34.00, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 50, term: 10, mode: 'HALF_YEARLY', ratePer1000: 49.30, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 60, term: 30, mode: 'HALF_YEARLY', ratePer1000: 15.25, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 58, term: 28, mode: 'HALF_YEARLY', ratePer1000: 16.45, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 55, term: 25, mode: 'HALF_YEARLY', ratePer1000: 18.80, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 50, term: 20, mode: 'HALF_YEARLY', ratePer1000: 23.45, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 19, maturityAge: 60, term: 41, mode: 'HALF_YEARLY', ratePer1000: 10.55, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
];

export const RPLI_EA_YEARLY: ExactRpliRateEntry[] = [
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 60, term: 21, mode: 'YEARLY', ratePer1000: 45.35, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 58, term: 19, mode: 'YEARLY', ratePer1000: 51.25, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 55, term: 16, mode: 'YEARLY', ratePer1000: 61.55, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 39, maturityAge: 50, term: 11, mode: 'YEARLY', ratePer1000: 87.55, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 60, term: 20, mode: 'YEARLY', ratePer1000: 48.35, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 58, term: 18, mode: 'YEARLY', ratePer1000: 55.30, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 55, term: 15, mode: 'YEARLY', ratePer1000: 66.70, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)', version: 'DakSewa-Endowment-Q1' },
  { product: 'GRAM_SANTOSH', entryAge: 40, maturityAge: 50, term: 10, mode: 'YEARLY', ratePer1000: 96.65, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 60, term: 30, mode: 'YEARLY', ratePer1000: 29.90, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 58, term: 28, mode: 'YEARLY', ratePer1000: 32.25, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 55, term: 25, mode: 'YEARLY', ratePer1000: 36.85, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 30, maturityAge: 50, term: 20, mode: 'YEARLY', ratePer1000: 46.00, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
  { product: 'GRAM_SANTOSH', entryAge: 19, maturityAge: 60, term: 41, mode: 'YEARLY', ratePer1000: 20.70, effectiveFrom: '2017-01-01', effectiveTo: '9999-12-31', source: 'India Post RPLI Endowment Assurance Table', version: 'DoP/RPLI/EA/2020' },
];

/**
 * 2. Unified Master RPLI Rate Database for All Products
 */
export const RPLI_RATE_DATABASE: RpliRateRow[] = [
  // ==========================================
  // Gram Santosh (Endowment Assurance - GEA)
  // ==========================================
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 39,
    maturityAge: 60,
    term: 21,
    monthlyRatePer1000: 3.95,
    quarterlyRatePer1000: 11.70,
    halfYearlyRatePer1000: 23.15,
    yearlyRatePer1000: 45.35,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 39,
    maturityAge: 58,
    term: 19,
    monthlyRatePer1000: 4.45,
    quarterlyRatePer1000: 13.20,
    halfYearlyRatePer1000: 26.15,
    yearlyRatePer1000: 51.25,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 39,
    maturityAge: 55,
    term: 16,
    monthlyRatePer1000: 5.35,
    quarterlyRatePer1000: 15.85,
    halfYearlyRatePer1000: 31.40,
    yearlyRatePer1000: 61.55,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 39,
    maturityAge: 50,
    term: 11,
    monthlyRatePer1000: 7.60,
    quarterlyRatePer1000: 22.55,
    halfYearlyRatePer1000: 44.65,
    yearlyRatePer1000: 87.55,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
  },
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
    source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)',
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
    source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)',
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
    source: 'India Post RPLI Endowment Assurance Table (Dak Sewa)',
    sourceVersion: 'DakSewa-Endowment-Q1',
  },
  {
    plan: 'GRAM_SANTOSH',
    entryAge: 40,
    maturityAge: 50,
    term: 10,
    monthlyRatePer1000: 8.40,
    quarterlyRatePer1000: 24.90,
    halfYearlyRatePer1000: 49.30,
    yearlyRatePer1000: 96.65,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
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
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
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
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
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
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
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
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
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
    source: 'India Post RPLI Endowment Assurance Table',
    sourceVersion: 'DoP/RPLI/EA/2020',
  },

  // ==========================================
  // Gram Suraksha (Whole Life Assurance - GWLA)
  // ==========================================
  {
    plan: 'GRAM_SURAKSHA',
    entryAge: 40,
    maturityAge: 80,
    term: 15,
    monthlyRatePer1000: 3.85,
    quarterlyRatePer1000: 11.40,
    halfYearlyRatePer1000: 22.55,
    yearlyRatePer1000: 44.15,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Whole Life Table (Dak Sewa)',
    sourceVersion: 'DakSewa-WholeLife-Q2',
  },
  {
    plan: 'GRAM_SURAKSHA',
    entryAge: 40,
    maturityAge: 80,
    term: 18,
    monthlyRatePer1000: 3.45,
    quarterlyRatePer1000: 10.15,
    halfYearlyRatePer1000: 20.10,
    yearlyRatePer1000: 39.35,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Whole Life Table (Dak Sewa)',
    sourceVersion: 'DakSewa-WholeLife-Q2',
  },
  {
    plan: 'GRAM_SURAKSHA',
    entryAge: 40,
    maturityAge: 80,
    term: 20,
    monthlyRatePer1000: 3.20,
    quarterlyRatePer1000: 9.55,
    halfYearlyRatePer1000: 18.90,
    yearlyRatePer1000: 36.95,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Whole Life Table (Dak Sewa)',
    sourceVersion: 'DakSewa-WholeLife-Q2',
  },
  {
    plan: 'GRAM_SURAKSHA',
    entryAge: 39,
    maturityAge: 80,
    term: 21,
    monthlyRatePer1000: 3.05,
    quarterlyRatePer1000: 9.10,
    halfYearlyRatePer1000: 18.00,
    yearlyRatePer1000: 35.20,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Whole Life Table',
    sourceVersion: 'DoP/RPLI/WLA/2020',
  },
  {
    plan: 'GRAM_SURAKSHA',
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
    source: 'India Post RPLI Whole Life Table',
    sourceVersion: 'DoP/RPLI/WLA/2020',
  },

  // ==========================================
  // Gram Suvidha (Convertible Whole Life Assurance - GCWLA)
  // ==========================================
  {
    plan: 'GRAM_SUVIDHA',
    entryAge: 40,
    maturityAge: 80,
    term: 20,
    monthlyRatePer1000: 3.20,
    quarterlyRatePer1000: 9.55,
    halfYearlyRatePer1000: 18.90,
    yearlyRatePer1000: 36.95,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI CWLA Table (Dak Sewa)',
    sourceVersion: 'DakSewa-CWLA-Q3',
  },
  {
    plan: 'GRAM_SUVIDHA',
    entryAge: 39,
    maturityAge: 80,
    term: 21,
    monthlyRatePer1000: 3.05,
    quarterlyRatePer1000: 9.10,
    halfYearlyRatePer1000: 18.00,
    yearlyRatePer1000: 35.20,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI CWLA Table',
    sourceVersion: 'DoP/RPLI/CWLA/2020',
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
    source: 'India Post RPLI CWLA Table',
    sourceVersion: 'DoP/RPLI/CWLA/2020',
  },

  // ==========================================
  // Gram Sumangal (Anticipated Endowment Assurance - GAEA)
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
    source: 'India Post RPLI Anticipated Endowment Table (Dak Sewa)',
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
    source: 'India Post RPLI Anticipated Endowment Table (Dak Sewa)',
    sourceVersion: 'DakSewa-AEA-Q4',
  },
  {
    plan: 'GRAM_SUMANGAL',
    entryAge: 39,
    maturityAge: 54,
    term: 15,
    monthlyRatePer1000: 6.65,
    quarterlyRatePer1000: 19.75,
    halfYearlyRatePer1000: 39.05,
    yearlyRatePer1000: 76.55,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Anticipated Endowment Table',
    sourceVersion: 'DoP/RPLI/AEA/2020',
  },
  {
    plan: 'GRAM_SUMANGAL',
    entryAge: 39,
    maturityAge: 59,
    term: 20,
    monthlyRatePer1000: 5.30,
    quarterlyRatePer1000: 15.70,
    halfYearlyRatePer1000: 31.05,
    yearlyRatePer1000: 60.85,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Anticipated Endowment Table',
    sourceVersion: 'DoP/RPLI/AEA/2020',
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
    source: 'India Post RPLI Anticipated Endowment Table',
    sourceVersion: 'DoP/RPLI/AEA/2020',
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
    source: 'India Post RPLI Anticipated Endowment Table',
    sourceVersion: 'DoP/RPLI/AEA/2020',
  },

  // ==========================================
  // Gram Priya (10 Years Short-Term Money Back)
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
    source: 'India Post RPLI Gram Priya Table (Dak Sewa)',
    sourceVersion: 'DakSewa-GramPriya-Q5',
  },
  {
    plan: 'GRAM_PRIYA',
    entryAge: 39,
    maturityAge: 49,
    term: 10,
    monthlyRatePer1000: 10.10,
    quarterlyRatePer1000: 30.05,
    halfYearlyRatePer1000: 59.45,
    yearlyRatePer1000: 116.55,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-01-01',
    effectiveTo: '9999-12-31',
    source: 'India Post RPLI Gram Priya Table',
    sourceVersion: 'DoP/RPLI/GP/2020',
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
    source: 'India Post RPLI Gram Priya Table',
    sourceVersion: 'DoP/RPLI/GP/2020',
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
    source: 'India Post RPLI Gram Priya Table',
    sourceVersion: 'DoP/RPLI/GP/2020',
  },
];

/**
 * 3. Bal Jeevan Bima (RPLI Children Policy) Official Rate Database
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

/**
 * Version-Controlled Declared Bonus Rate Table for RPLI.
 */
export const RPLI_DECLARED_BONUS_DATABASE = [
  {
    product: 'GRAM_SANTOSH' as RpliPolicy,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-04-01',
    effectiveTo: '9999-12-31',
    gazetteRef: 'DoP RPLI Declared Bonus Order 2017/2020 (₹48/₹1k/yr)',
    version: 'DakSewa-Validation-2024',
  },
  {
    product: 'GRAM_SURAKSHA' as RpliPolicy,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-04-01',
    effectiveTo: '9999-12-31',
    gazetteRef: 'DoP RPLI Declared Bonus Order 2017/2020 (₹60/₹1k/yr)',
    version: 'DakSewa-Validation-2024',
  },
  {
    product: 'GRAM_SUVIDHA' as RpliPolicy,
    bonusRatePer1000: 60.00,
    effectiveFrom: '2017-04-01',
    effectiveTo: '9999-12-31',
    gazetteRef: 'DoP RPLI Declared Bonus Order 2017/2020 (₹60/₹1k/yr)',
    version: 'DakSewa-Validation-2024',
  },
  {
    product: 'GRAM_SUMANGAL' as RpliPolicy,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-04-01',
    effectiveTo: '9999-12-31',
    gazetteRef: 'DoP RPLI Declared Bonus Order 2017/2020 (₹45/₹1k/yr)',
    version: 'DakSewa-Validation-2024',
  },
  {
    product: 'GRAM_PRIYA' as RpliPolicy,
    bonusRatePer1000: 45.00,
    effectiveFrom: '2017-04-01',
    effectiveTo: '9999-12-31',
    gazetteRef: 'DoP RPLI Declared Bonus Order 2017/2020 (₹45/₹1k/yr)',
    version: 'DakSewa-Validation-2024',
  },
  {
    product: 'BAL_JEEVAN_BIMA' as RpliPolicy,
    bonusRatePer1000: 48.00,
    effectiveFrom: '2017-04-01',
    effectiveTo: '9999-12-31',
    gazetteRef: 'DoP RPLI Declared Bonus Order 2017/2020 (₹48/₹1k/yr)',
    version: 'DakSewa-Validation-2024',
  },
];

/**
 * EXACT LOOKUP ONLY function.
 * NEVER interpolates, estimates, averages, or divides annual rate by 12 or 4.
 */
export function getExactRpliRate({
  product,
  entryAge,
  maturityAge,
  term,
  mode,
}: {
  product: RpliPolicy;
  entryAge: number;
  maturityAge?: number;
  term?: number;
  mode: PremiumFrequency;
}): {
  ratePer1000: number;
  source: string;
  version: string;
} {
  // 1. Check dedicated EA tables if Endowment Assurance
  if (product === 'GRAM_SANTOSH') {
    let list: ExactRpliRateEntry[];
    switch (mode) {
      case 'MONTHLY':
        list = RPLI_EA_MONTHLY;
        break;
      case 'QUARTERLY':
        list = RPLI_EA_QUARTERLY;
        break;
      case 'HALF_YEARLY':
        list = RPLI_EA_HALF_YEARLY;
        break;
      case 'YEARLY':
        list = RPLI_EA_YEARLY;
        break;
    }

    const matched = list.find((r) => {
      if (r.entryAge !== entryAge) return false;
      if (maturityAge !== undefined && r.maturityAge === maturityAge) return true;
      if (term !== undefined && r.term === term) return true;
      return false;
    });

    if (matched) {
      return {
        ratePer1000: matched.ratePer1000,
        source: matched.source,
        version: matched.version,
      };
    }
  }

  // 2. Check unified master database for all RPLI products
  const masterRow = RPLI_RATE_DATABASE.find((r) => {
    if (r.plan !== product) return false;
    if (r.entryAge !== entryAge) return false;
    if (term !== undefined && r.term !== undefined) {
      return r.term === term;
    }
    if (maturityAge !== undefined && r.maturityAge !== undefined) {
      return r.maturityAge === maturityAge;
    }
    return false;
  });

  if (masterRow) {
    let modeRate: number;
    switch (mode) {
      case 'MONTHLY':
        modeRate = masterRow.monthlyRatePer1000;
        break;
      case 'QUARTERLY':
        modeRate = masterRow.quarterlyRatePer1000;
        break;
      case 'HALF_YEARLY':
        modeRate = masterRow.halfYearlyRatePer1000;
        break;
      case 'YEARLY':
        modeRate = masterRow.yearlyRatePer1000;
        break;
    }

    return {
      ratePer1000: modeRate,
      source: masterRow.source,
      version: masterRow.sourceVersion,
    };
  }

  throw new Error(
    `No official RPLI rate found for Entry Age ${entryAge}, ` +
      `Maturity Age ${maturityAge ?? 'N/A'}, Term ${term ?? 'N/A'}, Mode ${mode}`
  );
}
