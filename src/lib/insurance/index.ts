import { calculatePliQuote } from '../pli/calculator';
import { PliInput, PliQuoteResult } from '../pli/types';
import { calculateRpliQuote } from '../rpli/calculator';
import { RpliInput, RpliQuoteResult } from '../rpli/types';

export type UniversalInsuranceInput = (PliInput | RpliInput) & {
  scheme?: 'PLI' | 'RPLI';
};

export type UniversalQuoteResult = PliQuoteResult | RpliQuoteResult;

export function calculateQuote(input: UniversalInsuranceInput): UniversalQuoteResult {
  const scheme = input.scheme ?? (typeof input.policyType === 'string' && input.policyType.toUpperCase().startsWith('GRAM') ? 'RPLI' : 'PLI');

  if (scheme === 'RPLI') {
    return calculateRpliQuote(input as RpliInput);
  }

  return calculatePliQuote(input as PliInput);
}

export * from '../pli';
export * from '../rpli';
