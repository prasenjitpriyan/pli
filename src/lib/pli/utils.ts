/**
 * Formats a number using Indian currency numbering (e.g. ₹2,09,200).
 */
export function formatINR(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat('en-IN').format(rounded);
  return `₹${formatted}`;
}

/**
 * Formats a number in Indian style without currency symbol (e.g. 2,09,200).
 */
export function formatIndianNumber(amount: number): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('en-IN').format(rounded);
}
