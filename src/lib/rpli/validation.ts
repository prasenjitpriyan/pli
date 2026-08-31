import { RPLI_CONFIG } from '../../config/rpli/config';
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
  const isRural = input.isRuralResident !== false; // Default true
  const hasOperativeSB = input.hasOperativeSBAccount !== false; // Default true if specified
  const ageProof = input.ageProofType ?? 'STANDARD';

  // 1. Rural & Bank Account Eligibility (DG Postal Services OM No. 29-26/2024-LI dated 23.01.2025)
  if (!isRural && !hasOperativeSB) {
    errors.push('Rural Postal Life Insurance (RPLI) requires either permanent residency in a rural area OR maintaining an active, KYC-compliant operative Savings Bank account with Post Office Savings Bank (POSB) or any Scheduled Bank in India (OM No. 29-26/2024-LI dated 23.01.2025).');
  }

  // 2. Proposer Entry Age & Age Proof Validation
  if (canonicalPolicy === 'BAL_JEEVAN_BIMA') {
    const childAge = input.childAge ?? age;
    const parentAge = input.parentAge ?? 35;

    // Future Child DOB validation
    if (input.childDateOfBirth) {
      const childDob = new Date(input.childDateOfBirth);
      const today = new Date();
      const policyDate = input.effectiveDate ? new Date(input.effectiveDate) : today;

      if (childDob > today) {
        errors.push('INVALID - CHILD DOB IS IN THE FUTURE.');
      }
      if (childDob > policyDate) {
        errors.push('INVALID - CHILD NOT YET BORN (Child DOB cannot be after Policy Start Date).');
      }
    }

    if (childAge < RPLI_CONFIG.childPolicy.minAge || childAge > RPLI_CONFIG.childPolicy.maxAge) {
      errors.push(`Child entry age must be between ${RPLI_CONFIG.childPolicy.minAge} and ${RPLI_CONFIG.childPolicy.maxAge} years for RPLI Bal Jeevan Bima.`);
    }
    if (parentAge > RPLI_CONFIG.childPolicy.maxParentAge) {
      errors.push(`Parent/Policyholder age must not exceed ${RPLI_CONFIG.childPolicy.maxParentAge} years at entry for RPLI Bal Jeevan Bima.`);
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
    if (age < RPLI_CONFIG.minEntryAge) {
      errors.push(`Minimum entry age for ${config.name} is ${RPLI_CONFIG.minEntryAge} years.`);
    }
  } else {
    // Standard / Non-Standard Proof Max Age
    const maxAllowedAge = ageProof === 'NON-STANDARD' ? RPLI_CONFIG.maxEntryAgeNonStandard : RPLI_CONFIG.maxEntryAgeStandard;

    if (age < RPLI_CONFIG.minEntryAge) {
      errors.push(`Minimum entry age for ${config.name} is ${RPLI_CONFIG.minEntryAge} years.`);
    }
    if (age > maxAllowedAge) {
      errors.push(`Maximum entry age for ${config.name} with ${ageProof} age proof is ${maxAllowedAge} years.`);
    }
  }

  // 3. Sum Assured Validation
  if (input.sumAssured < RPLI_CONFIG.minSumAssured) {
    errors.push(`Minimum Sum Assured permitted for ${config.name} is ₹${RPLI_CONFIG.minSumAssured.toLocaleString('en-IN')}.`);
  }

  if (canonicalPolicy === 'BAL_JEEVAN_BIMA') {
    const parentSA = input.parentSumAssured ?? RPLI_CONFIG.childPolicy.maxSumAssured;
    const maxPermitted = Math.min(RPLI_CONFIG.childPolicy.maxSumAssured, parentSA);
    if (input.sumAssured > maxPermitted) {
      errors.push(`Maximum Sum Assured for RPLI Bal Jeevan Bima is ₹${maxPermitted.toLocaleString('en-IN')}.`);
    }
  } else if (input.sumAssured > RPLI_CONFIG.maxSumAssured) {
    errors.push(`Maximum Sum Assured permitted for ${config.name} is ₹${RPLI_CONFIG.maxSumAssured.toLocaleString('en-IN')}.`);
  }

  // 4. Maturity Age / Term Validation
  if (canonicalPolicy === 'GRAM_SANTOSH' || canonicalPolicy === 'GRAM_SURAKSHA' || (canonicalPolicy === 'GRAM_SUVIDHA' && input.isConverted)) {
    if (input.maturityAge) {
      const term = input.maturityAge - age;
      if (term < config.minTerm) {
        errors.push(`Calculated policy term (${term} years) is less than the minimum required term of ${config.minTerm} years.`);
      }
    }
  }

  // 5. Medical Requirement Advisory
  if (input.sumAssured > RPLI_CONFIG.medical.sumAssuredThreshold || age > RPLI_CONFIG.medical.ageThreshold) {
    warnings.push(`Medical Examination is mandatory (Sum Assured > ₹${RPLI_CONFIG.medical.sumAssuredThreshold.toLocaleString('en-IN')} or Age > ${RPLI_CONFIG.medical.ageThreshold} years).`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
