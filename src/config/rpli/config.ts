import { PremiumFrequency } from '../../lib/pli/types';

export interface RpliConfiguration {
  minEntryAge: number;
  maxEntryAgeStandard: number;
  maxEntryAgeNonStandard: number;
  minSumAssured: number;
  maxSumAssured: number;
  sumAssuredStep: number;
  modeRebates: Record<PremiumFrequency, number>;
  gst: {
    applicable: boolean;
    firstYearRate: number;
    renewalRate: number;
  };
  medical: {
    sumAssuredThreshold: number;
    ageThreshold: number;
  };
  childPolicy: {
    minAge: number;
    maxAge: number;
    maxSumAssured: number;
    maxParentAge: number;
  };
  terminalBonusDefault: 'EXCLUDED' | 'INCLUDED' | 'MANUAL';
}

export const RPLI_CONFIG: RpliConfiguration = {
  minEntryAge: 19,
  maxEntryAgeStandard: 55,
  maxEntryAgeNonStandard: 45,
  minSumAssured: 10000,
  maxSumAssured: 1000000,
  sumAssuredStep: 5000,
  modeRebates: {
    MONTHLY: 50,
    QUARTERLY: 150,
    HALF_YEARLY: 300,
    YEARLY: 600,
  },
  gst: {
    applicable: false, // Default matching Dak Sewa quotations (0.00)
    firstYearRate: 0.045, // 4.5% if enabled
    renewalRate: 0.0225, // 2.25% if enabled
  },
  medical: {
    sumAssuredThreshold: 25000,
    ageThreshold: 35,
  },
  childPolicy: {
    minAge: 5,
    maxAge: 20,
    maxSumAssured: 100000,
    maxParentAge: 45,
  },
  terminalBonusDefault: 'EXCLUDED',
};
