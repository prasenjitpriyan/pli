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
    rebatePercent: 0.5, // 0.5% advance payment discount
    description: 'Pay premium every 3 months in advance.',
  },
  HALF_YEARLY: {
    frequency: 'HALF_YEARLY',
    label: 'Half-Yearly (6 Months)',
    paymentsPerYear: 2,
    rebatePercent: 1.0, // 1% advance payment discount
    description: 'Pay premium every 6 months in advance with 1% discount.',
  },
  YEARLY: {
    frequency: 'YEARLY',
    label: 'Yearly (Annual)',
    paymentsPerYear: 1,
    rebatePercent: 1,
    description: 'Pay premium once annually with 2% discount.',
  },
};
