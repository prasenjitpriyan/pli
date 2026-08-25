import { DEFAULT_GST_RATE } from './config';

export function calculateTax(
  grossPremium: number,
  gstRate?: number
): number {
  const rate = gstRate ?? DEFAULT_GST_RATE;
  return grossPremium * rate;
}
