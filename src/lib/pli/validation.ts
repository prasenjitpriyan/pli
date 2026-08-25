import { POLICY_REGISTRY } from '../../config/pli/policies';
import { PliInput, PliPolicy, PliValidationResult } from './types';

export function mapToCanonicalPolicy(policyInput: string): PliPolicy {
  const upper = policyInput.toUpperCase();
  if (upper === 'SURAKSHA' || upper === 'WHOLE_LIFE' || upper === 'WLA') return 'SURAKSHA';
  if (upper === 'SANTOSH' || upper === 'ENDOWMENT' || upper === 'EA') return 'SANTOSH';
  if (upper === 'SUVIDHA' || upper === 'CONVERTIBLE_WHOLE_LIFE' || upper === 'CWLA') return 'SUVIDHA';
  if (upper === 'SUMANGAL' || upper === 'ANTICIPATED_ENDOWMENT' || upper === 'AEA') return 'SUMANGAL';
  if (upper === 'YUGAL_SURAKSHA' || upper === 'JOINT_LIFE' || upper === 'JLEA') return 'YUGAL_SURAKSHA';
  if (upper === 'BAL_JEEVAN_BIMA' || upper === 'CHILDREN') return 'BAL_JEEVAN_BIMA';
  return 'SANTOSH';
}

export function validatePliInput(input: PliInput): PliValidationResult {
  const canonicalPolicy = mapToCanonicalPolicy(input.policyType);
  const config = POLICY_REGISTRY[canonicalPolicy];

  const errors: string[] = [];
  const warnings: string[] = [];

  const age = input.age ?? 30;

  // 1. Age Validation
  if (canonicalPolicy === 'YUGAL_SURAKSHA') {
    const firstAge = input.firstLifeAge ?? age;
    const secondAge = input.secondLifeAge ?? 28;
    const elderAge = Math.max(firstAge, secondAge);
    const youngerAge = Math.min(firstAge, secondAge);

    if (youngerAge < 21) {
      errors.push('Both spouses must be at least 21 years of age for Joint Life Assurance (Yugal Suraksha).');
    }
    if (elderAge > 45) {
      errors.push('The elder spouse must not exceed 45 years of age at entry for Yugal Suraksha.');
    }
  } else if (canonicalPolicy === 'BAL_JEEVAN_BIMA') {
    const childAge = input.childAge ?? age;
    const parentAge = input.parentAge ?? 35;

    if (childAge < 5 || childAge > 20) {
      errors.push('Child entry age must be between 5 and 20 years for Bal Jeevan Bima.');
    }
    if (parentAge > 45) {
      errors.push('Parent/Policyholder age must not exceed 45 years at entry for Bal Jeevan Bima.');
    }
  } else if (canonicalPolicy === 'SUMANGAL') {
    const duration = input.duration ?? 20;
    if (duration === 15 && age > 45) {
      errors.push('Maximum entry age for 15-year Sumangal (Anticipated Endowment) is 45 years.');
    }
    if (duration === 20 && age > 40) {
      errors.push('Maximum entry age for 20-year Sumangal (Anticipated Endowment) is 40 years.');
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
    const parentSA = input.parentSumAssured ?? 500000;
    const maxPermitted = Math.min(300000, parentSA);
    if (input.sumAssured > maxPermitted) {
      errors.push(`Maximum Sum Assured for Bal Jeevan Bima is ₹3,00,000 (or equal to parent's Sum Assured of ₹${parentSA.toLocaleString('en-IN')}, whichever is less).`);
    }
  } else if (input.sumAssured > config.maxSumAssured) {
    errors.push(`Maximum Sum Assured permitted for ${config.name} is ₹${config.maxSumAssured.toLocaleString('en-IN')}.`);
  }

  // 3. Maturity Age / Term Validation
  if (canonicalPolicy === 'SANTOSH' || canonicalPolicy === 'SURAKSHA' || (canonicalPolicy === 'SUVIDHA' && input.isConverted)) {
    if (input.maturityAge) {
      const term = input.maturityAge - age;
      if (term < config.minTerm) {
        errors.push(`Calculated policy term (${term} years) is less than the minimum required term of ${config.minTerm} years.`);
      }
    }
  }

  // Warnings
  if (input.sumAssured < 100000) {
    warnings.push('Sum Assured below ₹1,00,000 does not qualify for standard premium rebates.');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
