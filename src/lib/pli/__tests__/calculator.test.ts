import { describe, expect, it } from 'vitest';
import { calculateAge, calculateDurationAndMaturityAge, calculateEffectiveAge } from '../age-calculator';
import { calculatePliQuote } from '../calculator';
import { predictMonthlyPremium } from '../premium-model';
import { calculateRebate } from '../rebate-calculator';
import { validatePliInput } from '../validation';

describe('1. Age Calculator & Next Birthday (ANB) Derivation', () => {
  it('calculates completed age and Age Next Birthday (ANB) accurately from date of birth', () => {
    const dob = '1995-06-15';
    const effectiveDate = '2025-06-15';
    const { completedAge, ageNextBirthday, age } = calculateAge(dob, effectiveDate);
    expect(completedAge).toBe(30);
    expect(ageNextBirthday).toBe(31);
    expect(age).toBe(31);
  });

  it('calculates ANB consistently when current completed age is provided with isCurrentAge flag', () => {
    const effectiveDate = '2025-06-15';
    const { completedAge, ageNextBirthday, age } = calculateAge(undefined, effectiveDate, 30, true);
    expect(completedAge).toBe(30);
    expect(ageNextBirthday).toBe(31);
    expect(age).toBe(31);
  });

  it('calculates joint life effective age as floor average of both lives', () => {
    const effAge = calculateEffectiveAge({
      policyType: 'YUGAL_SURAKSHA',
      firstLifeAge: 35,
      secondLifeAge: 30,
    });
    expect(effAge).toBe(32); // Math.floor((35 + 30) / 2) = 32
  });

  it('calculates policy term correctly for fixed target maturity ages', () => {
    const res = calculateDurationAndMaturityAge({
      policyType: 'SANTOSH',
      age: 30,
      maturityAge: 60,
    });
    expect(res.duration).toBe(30);
    expect(res.maturityAge).toBe(60);
  });

  it('resiliently handles invalid or malformed date strings without throwing', () => {
    const res = calculateAge('not-a-valid-date', 'also-invalid', 28, true);
    expect(res.completedAge).toBe(28);
    expect(res.ageNextBirthday).toBe(29);
    expect(res.effectiveDate).toBeDefined();
  });
});

describe('2. Boundary Entry Age Validations (TDD)', () => {
  it('Santosh: validates minimum entry age boundary (19 years)', () => {
    const validMin = validatePliInput({ policyType: 'SANTOSH', age: 19, sumAssured: 100000 });
    expect(validMin.valid).toBe(true);

    const invalidBelowMin = validatePliInput({ policyType: 'SANTOSH', age: 18, sumAssured: 100000 });
    expect(invalidBelowMin.valid).toBe(false);
    expect(invalidBelowMin.errors[0]).toContain('Minimum entry age for Endowment Assurance (Santosh) is 19');
  });

  it('Santosh: validates maximum entry age boundary (55 years)', () => {
    const validMax = validatePliInput({ policyType: 'SANTOSH', age: 55, sumAssured: 100000 });
    expect(validMax.valid).toBe(true);

    const invalidAboveMax = validatePliInput({ policyType: 'SANTOSH', age: 56, sumAssured: 100000 });
    expect(invalidAboveMax.valid).toBe(false);
    expect(invalidAboveMax.errors[0]).toContain('Maximum entry age for Endowment Assurance (Santosh) is 55');
  });

  it('Suraksha: validates entry age boundaries (19 to 55 years)', () => {
    expect(validatePliInput({ policyType: 'SURAKSHA', age: 19, sumAssured: 100000 }).valid).toBe(true);
    expect(validatePliInput({ policyType: 'SURAKSHA', age: 55, sumAssured: 100000 }).valid).toBe(true);
    expect(validatePliInput({ policyType: 'SURAKSHA', age: 18, sumAssured: 100000 }).valid).toBe(false);
    expect(validatePliInput({ policyType: 'SURAKSHA', age: 56, sumAssured: 100000 }).valid).toBe(false);
  });

  it('Suvidha: validates convertible whole life maximum entry age boundary (50 years)', () => {
    expect(validatePliInput({ policyType: 'SUVIDHA', age: 19, sumAssured: 100000 }).valid).toBe(true);
    expect(validatePliInput({ policyType: 'SUVIDHA', age: 50, sumAssured: 100000 }).valid).toBe(true);
    const invalidAge51 = validatePliInput({ policyType: 'SUVIDHA', age: 51, sumAssured: 100000 });
    expect(invalidAge51.valid).toBe(false);
    expect(invalidAge51.errors[0]).toContain('Maximum entry age for Convertible Whole Life Assurance (Suvidha) is 50');
  });

  it('Sumangal: validates 15-year term max entry age of 45 years', () => {
    expect(validatePliInput({ policyType: 'SUMANGAL', age: 19, duration: 15, sumAssured: 100000 }).valid).toBe(true);
    expect(validatePliInput({ policyType: 'SUMANGAL', age: 45, duration: 15, sumAssured: 100000 }).valid).toBe(true);
    const invalidAge46 = validatePliInput({ policyType: 'SUMANGAL', age: 46, duration: 15, sumAssured: 100000 });
    expect(invalidAge46.valid).toBe(false);
    expect(invalidAge46.errors[0]).toContain('Maximum entry age for 15-year Sumangal (Anticipated Endowment) is 45 years');
  });

  it('Sumangal: validates 20-year term max entry age of 40 years', () => {
    expect(validatePliInput({ policyType: 'SUMANGAL', age: 19, duration: 20, sumAssured: 100000 }).valid).toBe(true);
    expect(validatePliInput({ policyType: 'SUMANGAL', age: 40, duration: 20, sumAssured: 100000 }).valid).toBe(true);
    const invalidAge41 = validatePliInput({ policyType: 'SUMANGAL', age: 41, duration: 20, sumAssured: 100000 });
    expect(invalidAge41.valid).toBe(false);
    expect(invalidAge41.errors[0]).toContain('Maximum entry age for 20-year Sumangal (Anticipated Endowment) is 40 years');
  });

  it('Sumangal: rejects terms other than 15 and 20 years', () => {
    const invalidTerm10 = validatePliInput({ policyType: 'SUMANGAL', age: 30, duration: 10, sumAssured: 100000 });
    expect(invalidTerm10.valid).toBe(false);
    expect(invalidTerm10.errors[0]).toContain('only permits policy terms of 15 or 20 years');

    const invalidTerm25 = validatePliInput({ policyType: 'SUMANGAL', age: 30, duration: 25, sumAssured: 100000 });
    expect(invalidTerm25.valid).toBe(false);
  });

  it('Yugal Suraksha: validates both spouse age boundaries (min 21, elder max 45)', () => {
    // Valid: younger 21, elder 45
    expect(validatePliInput({ policyType: 'YUGAL_SURAKSHA', firstLifeAge: 45, secondLifeAge: 21, sumAssured: 100000 }).valid).toBe(true);

    // Invalid: younger spouse under 21
    const invalidYounger = validatePliInput({ policyType: 'YUGAL_SURAKSHA', firstLifeAge: 30, secondLifeAge: 20, sumAssured: 100000 });
    expect(invalidYounger.valid).toBe(false);
    expect(invalidYounger.errors[0]).toContain('Both spouses must be at least 21 years of age');

    // Invalid: elder spouse over 45
    const invalidElder = validatePliInput({ policyType: 'YUGAL_SURAKSHA', firstLifeAge: 46, secondLifeAge: 25, sumAssured: 100000 });
    expect(invalidElder.valid).toBe(false);
    expect(invalidElder.errors[0]).toContain('elder spouse must not exceed 45 years');
  });

  it('Bal Jeevan Bima: validates child entry age (5 to 20) and parent max age (45)', () => {
    // Valid boundaries
    expect(validatePliInput({ policyType: 'BAL_JEEVAN_BIMA', childAge: 5, parentAge: 45, sumAssured: 100000 }).valid).toBe(true);
    expect(validatePliInput({ policyType: 'BAL_JEEVAN_BIMA', childAge: 20, parentAge: 35, sumAssured: 100000 }).valid).toBe(true);

    // Child < 5
    const childTooYoung = validatePliInput({ policyType: 'BAL_JEEVAN_BIMA', childAge: 4, parentAge: 35, sumAssured: 100000 });
    expect(childTooYoung.valid).toBe(false);
    expect(childTooYoung.errors[0]).toContain('Child entry age must be between 5 and 20 years');

    // Child > 20
    const childTooOld = validatePliInput({ policyType: 'BAL_JEEVAN_BIMA', childAge: 21, parentAge: 35, sumAssured: 100000 });
    expect(childTooOld.valid).toBe(false);

    // Parent > 45
    const parentTooOld = validatePliInput({ policyType: 'BAL_JEEVAN_BIMA', childAge: 10, parentAge: 46, sumAssured: 100000 });
    expect(parentTooOld.valid).toBe(false);
    expect(parentTooOld.errors[0]).toContain('Parent/Policyholder age must not exceed 45 years');
  });
});

describe('3. Boundary Sum Assured & Policy Term Validations', () => {
  it('validates minimum Sum Assured boundary of ₹20,000 across single life policies', () => {
    expect(validatePliInput({ policyType: 'SANTOSH', age: 30, sumAssured: 20000 }).valid).toBe(true);
    const belowMin = validatePliInput({ policyType: 'SANTOSH', age: 30, sumAssured: 19999 });
    expect(belowMin.valid).toBe(false);
    expect(belowMin.errors[0]).toContain('Minimum Sum Assured permitted');
  });

  it('validates maximum Sum Assured boundary of ₹50,00,000 for standard policies', () => {
    expect(validatePliInput({ policyType: 'SANTOSH', age: 30, sumAssured: 5000000 }).valid).toBe(true);
    const aboveMax = validatePliInput({ policyType: 'SANTOSH', age: 30, sumAssured: 5000001 });
    expect(aboveMax.valid).toBe(false);
    expect(aboveMax.errors[0]).toContain('Maximum Sum Assured permitted');
  });

  it('validates maximum Sum Assured cap of ₹3,00,000 for Bal Jeevan Bima', () => {
    expect(validatePliInput({ policyType: 'BAL_JEEVAN_BIMA', childAge: 10, parentAge: 35, sumAssured: 300000 }).valid).toBe(true);
    const aboveCap = validatePliInput({ policyType: 'BAL_JEEVAN_BIMA', childAge: 10, parentAge: 35, sumAssured: 300001 });
    expect(aboveCap.valid).toBe(false);
    expect(aboveCap.errors[0]).toContain('Maximum Sum Assured for Bal Jeevan Bima is ₹3,00,000');
  });

  it('enforces minimum policy term of 5 years', () => {
    // Term 5 years: valid
    expect(validatePliInput({ policyType: 'SANTOSH', age: 55, maturityAge: 60, sumAssured: 100000 }).valid).toBe(true);
    expect(validatePliInput({ policyType: 'SANTOSH', age: 30, duration: 5, sumAssured: 100000 }).valid).toBe(true);

    // Term 4 years: invalid
    const termTooShortByMaturity = validatePliInput({ policyType: 'SANTOSH', age: 55, maturityAge: 58, sumAssured: 100000 });
    expect(termTooShortByMaturity.valid).toBe(false);
    expect(termTooShortByMaturity.errors[0]).toContain('less than the minimum required term of 5 years');

    const termTooShortByDuration = validatePliInput({ policyType: 'SANTOSH', age: 30, duration: 4, sumAssured: 100000 });
    expect(termTooShortByDuration.valid).toBe(false);

    // Suraksha ceasing age term < 5
    const ceasingTooShort = validatePliInput({ policyType: 'SURAKSHA', age: 55, premiumCeasingAge: 58, sumAssured: 100000 });
    expect(ceasingTooShort.valid).toBe(false);
  });
});

describe('4. Official Rate Table Lookups & Mode Calculations', () => {
  it('accurately looks up Table II (Santosh) rates across duration milestones', () => {
    // Term 5: ₹17.00/k
    const t5 = predictMonthlyPremium({ policyType: 'SANTOSH', effectiveAge: 30, duration: 5, sumAssured: 100000 });
    expect(t5.monthlyRatePer1000).toBe(17.00);
    expect(t5.monthlyPremium).toBe(1700);

    // Term 15: ₹5.60/k
    const t15 = predictMonthlyPremium({ policyType: 'SANTOSH', effectiveAge: 30, duration: 15, sumAssured: 100000 });
    expect(t15.monthlyRatePer1000).toBe(5.60);
    expect(t15.monthlyPremium).toBe(560);

    // Term 20: ₹4.00/k
    const t20 = predictMonthlyPremium({ policyType: 'SANTOSH', effectiveAge: 30, duration: 20, sumAssured: 100000 });
    expect(t20.monthlyRatePer1000).toBe(4.00);
    expect(t20.monthlyPremium).toBe(400);

    // Term 30: ₹2.45/k
    const t30 = predictMonthlyPremium({ policyType: 'SANTOSH', effectiveAge: 30, duration: 30, sumAssured: 100000 });
    expect(t30.monthlyRatePer1000).toBe(2.45);
    expect(t30.monthlyPremium).toBe(245);

    // Term 40: ₹1.70/k
    const t40 = predictMonthlyPremium({ policyType: 'SANTOSH', effectiveAge: 20, duration: 40, sumAssured: 100000 });
    expect(t40.monthlyRatePer1000).toBe(1.70);
    expect(t40.monthlyPremium).toBe(170);
  });

  it('accurately looks up Table I (Suraksha) rates across ceasing age terms', () => {
    // Term 10: ₹7.75/k
    const s10 = predictMonthlyPremium({ policyType: 'SURAKSHA', effectiveAge: 50, duration: 10, premiumCeasingAge: 60, sumAssured: 100000 });
    expect(s10.monthlyRatePer1000).toBe(7.75);
    expect(s10.monthlyPremium).toBe(775);

    // Term 20: ₹3.55/k
    const s20 = predictMonthlyPremium({ policyType: 'SURAKSHA', effectiveAge: 40, duration: 20, premiumCeasingAge: 60, sumAssured: 100000 });
    expect(s20.monthlyRatePer1000).toBe(3.55);
    expect(s20.monthlyPremium).toBe(355);

    // Term 30: ₹2.05/k
    const s30 = predictMonthlyPremium({ policyType: 'SURAKSHA', effectiveAge: 30, duration: 30, premiumCeasingAge: 60, sumAssured: 100000 });
    expect(s30.monthlyRatePer1000).toBe(2.05);
    expect(s30.monthlyPremium).toBe(205);
  });

  it('calculates quarterly mode without advance discount (3x monthly)', () => {
    const res = predictMonthlyPremium({ policyType: 'SANTOSH', effectiveAge: 30, duration: 20, sumAssured: 100000 });
    expect(res.quarterlyRatePer1000).toBe(12.00); // 4.00 * 3
    expect(res.quarterlyPremium).toBe(1200);
  });

  it('calculates half-yearly mode with official 1% advance discount', () => {
    const res = predictMonthlyPremium({ policyType: 'SANTOSH', effectiveAge: 30, duration: 20, sumAssured: 100000 });
    // 4.00 * 6 * 0.99 = 23.76
    expect(res.halfYearlyRatePer1000).toBe(23.76);
    expect(res.halfYearlyPremium).toBe(2376);
  });

  it('calculates yearly mode with official 2% advance discount', () => {
    const res = predictMonthlyPremium({ policyType: 'SANTOSH', effectiveAge: 30, duration: 20, sumAssured: 100000 });
    // 4.00 * 12 * 0.98 = 47.04
    expect(res.yearlyRatePer1000).toBe(47.04);
    expect(res.yearlyPremium).toBe(4704);
  });

  it('correctly calculates High Sum Assured rebates across boundary tiers', () => {
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 20000 })).toBe(1);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 39999 })).toBe(1);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 40000 })).toBe(2);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 100000 })).toBe(5);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 500000 })).toBe(25);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 1000000 })).toBe(50);
    expect(calculateRebate({ policyType: 'SANTOSH', sumAssured: 5000000 })).toBe(250);
  });

  it('deducts mode-scaled rebates properly in calculatePliQuote', () => {
    const quote = calculatePliQuote({
      policyType: 'SANTOSH',
      age: 30,
      duration: 20,
      sumAssured: 500000,
    });

    expect(quote.modeDetails).toBeDefined();
    const modeDetails = quote.modeDetails!;

    // Rebate = ₹25/mo
    expect(modeDetails.monthly.rebate).toBe(25);
    expect(modeDetails.quarterly.rebate).toBe(75);
    expect(modeDetails.halfYearly.rebate).toBe(150);
    expect(modeDetails.yearly.rebate).toBe(300);

    // Gross monthly = 500 * 4.00 = 2000. Net monthly = 2000 - 25 = 1975
    expect(modeDetails.monthly.grossPremium).toBe(2000);
    expect(modeDetails.monthly.netPremium).toBe(1975);

    // Gross yearly = 500 * 47.04 = 23520. Net yearly = 23520 - 300 = 23220
    expect(modeDetails.yearly.grossPremium).toBe(23520);
    expect(modeDetails.yearly.netPremium).toBe(23220);
  });
});

describe('5. Maturity & Benefit Calculation Suite', () => {
  it('Santosh: computes exact maturity amount across terms and sums assured', () => {
    // Case A: ₹1 Lakh SA for 20 years. Bonus = 100 * 52 * 20 = ₹1,04,000. Maturity = ₹2,04,000
    const q1 = calculatePliQuote({ policyType: 'SANTOSH', age: 30, duration: 20, sumAssured: 100000 });
    expect(q1.bonusRate).toBe(52);
    expect(q1.annualBonus).toBe(5200);
    expect(q1.totalBonus).toBe(104000);
    expect(q1.maturityAmount).toBe(204000);

    // Case B: ₹10 Lakhs SA for 30 years. Bonus = 1000 * 52 * 30 = ₹15,60,000. Maturity = ₹25,60,000
    const q2 = calculatePliQuote({ policyType: 'SANTOSH', age: 30, duration: 30, sumAssured: 1000000 });
    expect(q2.bonusRate).toBe(52);
    expect(q2.annualBonus).toBe(52000);
    expect(q2.totalBonus).toBe(1560000);
    expect(q2.maturityAmount).toBe(2560000);
  });

  it('Suraksha: bonus accrues from entry age until age 80', () => {
    // 30-year-old taking Suraksha with ceasing age 60
    const quote = calculatePliQuote({ policyType: 'SURAKSHA', age: 30, premiumCeasingAge: 60, sumAssured: 500000 });
    expect(quote.premiumPaymentDuration).toBe(30); // Pays premium for 30 yrs (30 to 60)
    expect(quote.bonusAccrualDuration).toBe(50); // Accrues bonus for 50 yrs (30 to 80)
    expect(quote.bonusRate).toBe(76);
    // Annual bonus = 500 * 76 = 38000. Total bonus for duration = 38000 * 30 = 1140000 (minimum guaranteed)
    expect(quote.annualBonus).toBe(38000);
    expect(quote.maturityAge).toBe(80);
  });

  it('Suvidha: reflects bonus rate transition from unconverted (₹76/k) to converted (₹52/k)', () => {
    const unconverted = calculatePliQuote({ policyType: 'SUVIDHA', age: 30, isConverted: false, sumAssured: 500000, duration: 25 });
    expect(unconverted.bonusRate).toBe(76);
    expect(unconverted.annualBonus).toBe(38000);

    const converted = calculatePliQuote({ policyType: 'SUVIDHA', age: 30, isConverted: true, sumAssured: 500000, duration: 25 });
    expect(converted.bonusRate).toBe(52);
    expect(converted.annualBonus).toBe(26000);
  });

  it('Sumangal 15-Year: verifies 20-20-20-40 survival benefit distribution', () => {
    const quote = calculatePliQuote({ policyType: 'SUMANGAL', age: 30, duration: 15, sumAssured: 500000 });
    const benefits = quote.survivalBenefits!;
    expect(benefits).toHaveLength(3);

    // Survival payout 1 at Year 6: 20% of 5L = 1L
    expect(benefits[0].year).toBe(6);
    expect(benefits[0].amount).toBe(100000);
    expect(benefits[0].percentage).toBe(20);

    // Survival payout 2 at Year 9: 20% of 5L = 1L
    expect(benefits[1].year).toBe(9);
    expect(benefits[1].amount).toBe(100000);
    expect(benefits[1].percentage).toBe(20);

    // Survival payout 3 at Year 12: 20% of 5L = 1L
    expect(benefits[2].year).toBe(12);
    expect(benefits[2].amount).toBe(100000);
    expect(benefits[2].percentage).toBe(20);

    // Final maturity payout at Year 15: remaining 40% (2L) + total bonus (48 * 500 * 15 = 3.6L) = 5.6L
    const expectedBonus = (500000 / 1000) * 48 * 15;
    expect(quote.finalMaturityPayout).toBe(200000 + expectedBonus);

    // Sum of all survival benefits + final non-bonus maturity payout === 100% Sum Assured
    const totalSurvivalReceived = benefits.reduce((acc, b) => acc + b.amount, 0);
    expect(totalSurvivalReceived + 200000).toBe(500000);
  });

  it('Sumangal 20-Year: verifies 20-20-20-40 survival benefit distribution', () => {
    const quote = calculatePliQuote({ policyType: 'SUMANGAL', age: 30, duration: 20, sumAssured: 500000 });
    const benefits = quote.survivalBenefits!;
    expect(benefits).toHaveLength(3);

    // Milestones at Year 8, 12, 16
    expect(benefits[0].year).toBe(8);
    expect(benefits[0].amount).toBe(100000);
    expect(benefits[1].year).toBe(12);
    expect(benefits[1].amount).toBe(100000);
    expect(benefits[2].year).toBe(16);
    expect(benefits[2].amount).toBe(100000);

    // Final maturity payout at Year 20: 40% (2L) + total bonus (48 * 500 * 20 = 4.8L) = 6.8L
    const expectedBonus = (500000 / 1000) * 48 * 20;
    expect(quote.finalMaturityPayout).toBe(200000 + expectedBonus);
  });

  it('Yugal Suraksha: computes joint life maturity benefit', () => {
    const quote = calculatePliQuote({
      policyType: 'YUGAL_SURAKSHA',
      firstLifeAge: 35,
      secondLifeAge: 30,
      duration: 20,
      sumAssured: 500000,
    });
    expect(quote.bonusRate).toBe(52);
    expect(quote.annualBonus).toBe(26000);
    expect(quote.totalBonus).toBe(520000);
    expect(quote.maturityAmount).toBe(1020000); // 5L SA + 5.2L Bonus
  });

  it('Bal Jeevan Bima: computes children policy maturity benefit', () => {
    const quote = calculatePliQuote({
      policyType: 'BAL_JEEVAN_BIMA',
      childAge: 8,
      parentAge: 35,
      duration: 15,
      sumAssured: 200000,
    });
    expect(quote.bonusRate).toBe(52);
    expect(quote.annualBonus).toBe(104000 / 10); // (200000/1000)*52 = 10400
    expect(quote.totalBonus).toBe(10400 * 15); // 156000
    expect(quote.maturityAmount).toBe(356000); // 2L SA + 1.56L Bonus
  });
});
