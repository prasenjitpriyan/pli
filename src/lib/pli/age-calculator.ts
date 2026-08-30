import { PolicyType } from './types';
import { mapToCanonicalPolicy } from './validation';

/**
 * Calculates completed age in years and Age as on Next Birthday (ANB) as of the effective date.
 * Under India Post PLI and RPLI official rules, entry age is determined by "Age as on next birthday" (ANB).
 * If dateOfBirth is provided, it takes precedence.
 */
export function calculateAge(
  dateOfBirth?: string,
  effectiveDateStr?: string,
  providedAge?: number
): {
  completedAge: number;
  ageNextBirthday: number;
  age: number; // Returns ageNextBirthday for official PLI/RPLI calculation
  effectiveDate: string;
} {
  const effectiveDate = effectiveDateStr
    ? new Date(effectiveDateStr)
    : new Date();
  
  const formattedEffectiveDate = effectiveDate.toISOString().split('T')[0];

  if (dateOfBirth) {
    const dob = new Date(dateOfBirth);
    let completed = effectiveDate.getFullYear() - dob.getFullYear();
    const monthDiff = effectiveDate.getMonth() - dob.getMonth();
    
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && effectiveDate.getDate() < dob.getDate())
    ) {
      completed--;
    }

    const completedAge = Math.max(0, completed);
    // Under India Post PLI & RPLI rules, entry age is Age as on Next Birthday (ANB)
    const ageNextBirthday = completedAge + 1;

    return {
      completedAge,
      ageNextBirthday,
      age: ageNextBirthday,
      effectiveDate: formattedEffectiveDate,
    };
  }

  const baseAge = Math.max(0, providedAge ?? 20);
  return {
    completedAge: baseAge,
    ageNextBirthday: baseAge,
    age: baseAge,
    effectiveDate: formattedEffectiveDate,
  };
}

/**
 * Calculates effective age for single life, joint life, or children policy.
 */
export function calculateEffectiveAge(params: {
  policyType: PolicyType;
  age?: number;
  firstLifeAge?: number;
  secondLifeAge?: number;
  childAge?: number;
}): number {
  const { policyType, age, firstLifeAge, secondLifeAge, childAge } = params;
  const canonical = mapToCanonicalPolicy(policyType);

  if (canonical === 'YUGAL_SURAKSHA') {
    const first = firstLifeAge ?? age ?? 30;
    const second = secondLifeAge ?? 28;
    return Math.floor((first + second) / 2);
  }

  if (canonical === 'BAL_JEEVAN_BIMA') {
    return childAge ?? 5;
  }

  return age ?? 30;
}

/**
 * Calculates policy duration and maturity age.
 */
export function calculateDurationAndMaturityAge(params: {
  policyType: PolicyType;
  age: number;
  maturityAge?: number;
  duration?: number;
}): { duration: number; maturityAge: number } {
  const { policyType, age, maturityAge, duration } = params;
  const canonical = mapToCanonicalPolicy(policyType);

  if (maturityAge !== undefined && maturityAge !== null && !isNaN(maturityAge)) {
    const calculatedDuration = Math.max(1, maturityAge - age);
    return {
      duration: calculatedDuration,
      maturityAge,
    };
  }

  if (duration !== undefined && duration !== null && !isNaN(duration)) {
    const calculatedMaturityAge = age + duration;
    return {
      duration,
      maturityAge: calculatedMaturityAge,
    };
  }

  if (canonical === 'SURAKSHA') {
    const defaultMaturityAge = 80;
    const defaultDuration = Math.max(1, defaultMaturityAge - age);
    return {
      duration: defaultDuration,
      maturityAge: defaultMaturityAge,
    };
  }

  if (canonical === 'SUVIDHA') {
    const defaultMaturityAge = 80;
    const defaultDuration = Math.max(1, defaultMaturityAge - age);
    return {
      duration: defaultDuration,
      maturityAge: defaultMaturityAge,
    };
  }

  if (canonical === 'SUMANGAL') {
    const defaultDuration = 15;
    return {
      duration: defaultDuration,
      maturityAge: age + defaultDuration,
    };
  }

  // Default fallback
  const defaultDuration = 20;
  return {
    duration: defaultDuration,
    maturityAge: age + defaultDuration,
  };
}
