import { PremiumFrequency } from '../../lib/pli/types';

export interface FrequencyConfig {
  frequency: PremiumFrequency;
  label: string;
  paymentsPerYear: number;
  rebatePercent: number; // Advance payment discount percentage
  description: string;
}

export const FREQUENCY_CONFIG: Record<PremiumFrequency, FrequencyConfig> = {
  MONTHLY: {
    frequency: 'MONTHLY',
    label: 'Monthly',
    paymentsPerYear: 12,
    rebatePercent: 0.0,
    description: 'Standard monthly premium payment mode.',
  },
  QUARTERLY: {
    frequency: 'QUARTERLY',
    label: 'Quarterly (3 Months)',
    paymentsPerYear: 4,
    rebatePercent: 0.0,
    description: 'Pay premium every 3 months.',
  },
  HALF_YEARLY: {
    frequency: 'HALF_YEARLY',
    label: 'Half-Yearly (6 Months)',
    paymentsPerYear: 2,
    rebatePercent: 0.0,
    description: 'Pay premium every 6 months.',
  },
  YEARLY: {
    frequency: 'YEARLY',
    label: 'Yearly (Annual)',
    paymentsPerYear: 1,
    rebatePercent: 0.0,
    description: 'Pay premium once annually.',
  },
};
