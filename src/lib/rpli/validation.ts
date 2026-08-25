import { RPLI_POLICY_REGISTRY } from '../../config/rpli/policies';
import { PliValidationResult } from '../pli/types';
import { RpliInput, RpliPolicy } from './types';

export function mapToCanonicalRpliPolicy(policyInput: string): RpliPolicy {
  const upper = policyInput.toUpperCase();
  if (upper.includes('SURAKSHA') || upper === 'GWLA') return 'GRAM_SURAKSHA';
  if (upper.includes('SUVIDHA') || upper === 'GCWLA') return 'GRAM_SUVIDHA';
  if (upper.includes('SANTOSH') || upper === 'GEA') return 'GRAM_SANTOSH';
  if (upper.includes('PRIYA') || upper === 'GPRIYA') return 'GRAM_PRIYA';
  if (upper.includes('SUMANGAL') || upper === 'GAEA') return 'GRAM_SUMANGAL';
  if (upper.includes('BAL') || upper.includes('CHILDREN') || upper === 'RCHILDREN') return 'BAL_JEEVAN_BIMA';
  return 'GRAM_SANTOSH';
}

export function validateRpliInput(input: RpliInput): PliValidationResult {
  const canonicalPolicy = mapToCanonicalRpliPolicy(input.policyType);
  const config = RPLI_POLICY_REGISTRY[canonicalPolicy];

  const errors: string[] = [];
  const warnings: string[] = [];

  const age = input.age ?? 30;

  // 1. Entry Age Validation
  if (canonicalPolicy === 'BAL_JEEVAN_BIMA') {
    const childAge = input.childAge ?? age;
    const parentAge = input.parentAge ?? 35;

    if (childAge < 5 || childAge > 20) {
      errors.push('Child entry age must be between 5 and 20 years for RPLI Bal Jeevan Bima.');
    }
    if (parentAge > 45) {
      errors.push('Parent/Policyholder age must not exceed 45 years at entry for RPLI Bal Jeevan Bima.');
    }
  } else if (canonicalPolicy === 'GRAM_PRIYA') {
    if (age < 20 || age > 45) {
      errors.push('Entry age for Gram Priya (10 Years Rural PLI) must be between 20 and 45 years.');
    }
  } else if (canonicalPolicy === 'GRAM_SUMANGAL') {
    const duration = input.duration ?? 20;
    if (duration === 15 && age > 45) {
      errors.push('Maximum entry age for 15-year Gram Sumangal is 45 years.');
    }
    if (duration === 20 && age > 40) {
      errors.push('Maximum entry age for 20-year Gram Sumangal is 40 years.');
    }
    if (age < config.minAge) {
      errors.push(`Minimum entry age for ${config.name} is ${config.minAge} years.`);
    }
  } else {
    if (age < config.minAge) {
      errors.push(`Minimum entry age for ${config.name} is ${config.minAge} years.`);
    }
    if (age > config.maxAge) {
      errors.push(`Maximum entry age for ${config.name} is ${config.maxAge} years.`);
    }
  }

  // 2. Sum Assured Validation
  if (input.sumAssured < config.minSumAssured) {
    errors.push(`Minimum Sum Assured permitted for ${config.name} is ₹${config.minSumAssured.toLocaleString('en-IN')}.`);
  }

  if (canonicalPolicy === 'BAL_JEEVAN_BIMA') {
    const parentSA = input.parentSumAssured ?? 100000;
    const maxPermitted = Math.min(100000, parentSA);
    if (input.sumAssured > maxPermitted) {
      errors.push(`Maximum Sum Assured for RPLI Bal Jeevan Bima is ₹1,00,000 (or equal to parent's Sum Assured of ₹${parentSA.toLocaleString('en-IN')}, whichever is lower).`);
    }
  } else if (input.sumAssured > config.maxSumAssured) {
    errors.push(`Maximum Sum Assured permitted for ${config.name} is ₹${config.maxSumAssured.toLocaleString('en-IN')}.`);
  }

  // 3. Maturity Age / Term Validation
  if (canonicalPolicy === 'GRAM_SANTOSH' || canonicalPolicy === 'GRAM_SURAKSHA' || (canonicalPolicy === 'GRAM_SUVIDHA' && input.isConverted)) {
    if (input.maturityAge) {
      const term = input.maturityAge - age;
      if (term < config.minTerm) {
        errors.push(`Calculated policy term (${term} years) is less than the minimum required term of ${config.minTerm} years.`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
