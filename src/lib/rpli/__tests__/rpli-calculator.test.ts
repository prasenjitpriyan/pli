import { describe, expect, it } from 'vitest';
import { calculateRpliQuote } from '../calculator';
import { validateRpliInput } from '../validation';

describe('RPLI Policy Validation Engine', () => {
  it('validates rural residency requirement', () => {
    const res = validateRpliInput({
      policyType: 'GRAM_SANTOSH',
      age: 30,
      sumAssured: 100000,
      isRuralResident: false,
    });
    expect(res.valid).toBe(false);
    expect(res.errors[0]).toContain('requires the proposer to be permanently residing in a rural area');
  });

  it('validates non-standard age proof limit (45 years max)', () => {
    const valid = validateRpliInput({
      policyType: 'GRAM_SANTOSH',
      age: 44,
      sumAssured: 100000,
      ageProofType: 'NON-STANDARD',
    });
    expect(valid.valid).toBe(true);

    const invalid = validateRpliInput({
      policyType: 'GRAM_SANTOSH',
      age: 48,
      sumAssured: 100000,
      ageProofType: 'NON-STANDARD',
    });
    expect(invalid.valid).toBe(false);
    expect(invalid.errors[0]).toContain('with NON-STANDARD age proof is 45 years');
  });

  it('validates child DOB in the future or after policy commencement', () => {
    const resFuture = validateRpliInput({
      policyType: 'BAL_JEEVAN_BIMA',
      childDateOfBirth: '2029-04-05',
      effectiveDate: '2026-08-30',
      parentAge: 35,
      sumAssured: 50000,
    });
    expect(resFuture.valid).toBe(false);
    expect(resFuture.errors.some((e) => e.includes('CHILD DOB IS IN THE FUTURE') || e.includes('CHILD NOT YET BORN'))).toBe(true);
  });

  it('validates medical requirement advisory triggers', () => {
    const quoteOverSA = calculateRpliQuote({
      policyType: 'GRAM_SANTOSH',
      age: 30,
      maturityAge: 50,
      sumAssured: 50000, // > 25,000
    });
    expect(quoteOverSA.medicalRequired).toBe(true);
    expect(quoteOverSA.medicalRuleStatus).toBe('MEDICAL REQUIRED');

    const quoteUnder = calculateRpliQuote({
      policyType: 'GRAM_SANTOSH',
      age: 25,
      maturityAge: 45,
      sumAssured: 20000, // <= 25,000 & Age <= 35
    });
    expect(quoteUnder.medicalRequired).toBe(false);
    expect(quoteUnder.medicalRuleStatus).toBe('MEDICAL RULE NOT TRIGGERED');
  });
});

describe('Official Dak Sewa RPLI Calibration & Quotation Matches', () => {
  // Test 1: Official Endowment (Gram Santosh) Age 40, Mat Age 60, SA ₹10 Lakhs
  it('matches Official Dak Sewa Quotation for Gram Santosh (Age 40, Mat Age 60, SA ₹10 Lakhs)', () => {
    const yearly = calculateRpliQuote({
      policyType: 'GRAM_SANTOSH',
      age: 40,
      maturityAge: 60,
      sumAssured: 1000000,
      frequency: 'YEARLY',
    });

    expect(yearly.duration).toBe(20);
    expect(yearly.modeDetails.yearly.ratePer1000).toBe(48.35);
    expect(yearly.modeDetails.yearly.grossPremium).toBe(48350);
    expect(yearly.modeDetails.yearly.rebate).toBe(600);
    expect(yearly.modeDetails.yearly.tax).toBe(0);
    expect(yearly.modeDetails.yearly.netPremium).toBe(47750);
    expect(yearly.annualBonus).toBe(48000);
    expect(yearly.totalBonus).toBe(960000);
    expect(yearly.maturityAmount).toBe(1960000);

    // Half-yearly
    expect(yearly.modeDetails.halfYearly.ratePer1000).toBe(24.65);
    expect(yearly.modeDetails.halfYearly.grossPremium).toBe(24650);
    expect(yearly.modeDetails.halfYearly.rebate).toBe(300);
    expect(yearly.modeDetails.halfYearly.netPremium).toBe(24350);

    // Quarterly
    expect(yearly.modeDetails.quarterly.ratePer1000).toBe(12.45);
    expect(yearly.modeDetails.quarterly.grossPremium).toBe(12450);
    expect(yearly.modeDetails.quarterly.rebate).toBe(150);
    expect(yearly.modeDetails.quarterly.netPremium).toBe(12300);

    // Monthly
    expect(yearly.modeDetails.monthly.ratePer1000).toBe(4.20);
    expect(yearly.modeDetails.monthly.grossPremium).toBe(4200);
    expect(yearly.modeDetails.monthly.rebate).toBe(50);
    expect(yearly.modeDetails.monthly.netPremium).toBe(4150);
  });

  // Test 2: Whole Life Assurance (Gram Suraksha) Age 40, SA ₹10 Lakhs (15, 18, 20 Years)
  it('matches Official Dak Sewa Quotation for Gram Suraksha Whole Life (15, 18, 20 Years)', () => {
    // 15 Years (Ceasing at 55)
    const quote15 = calculateRpliQuote({
      policyType: 'GRAM_SURAKSHA',
      age: 40,
      premiumCeasingAge: 55,
      sumAssured: 1000000,
      frequency: 'YEARLY',
    });
    expect(quote15.modeDetails.yearly.grossPremium).toBe(44150);
    expect(quote15.modeDetails.yearly.rebate).toBe(600);
    expect(quote15.modeDetails.yearly.netPremium).toBe(43550);
    expect(quote15.totalBonus).toBe(900000); // 40 * 15 * 1000 * (60/1000) ?? 15 yrs * 60,000 = 9,00,000
    expect(quote15.maturityAmount).toBe(1900000);

    // 18 Years (Ceasing at 58)
    const quote18 = calculateRpliQuote({
      policyType: 'GRAM_SURAKSHA',
      age: 40,
      premiumCeasingAge: 58,
      sumAssured: 1000000,
      frequency: 'YEARLY',
    });
    expect(quote18.modeDetails.yearly.grossPremium).toBe(39350);
    expect(quote18.modeDetails.yearly.rebate).toBe(600);
    expect(quote18.modeDetails.yearly.netPremium).toBe(38750);
    expect(quote18.totalBonus).toBe(1080000); // 18 yrs * 60,000 = 10,80,000
    expect(quote18.maturityAmount).toBe(2080000);

    // 20 Years (Ceasing at 60)
    const quote20 = calculateRpliQuote({
      policyType: 'GRAM_SURAKSHA',
      age: 40,
      premiumCeasingAge: 60,
      sumAssured: 1000000,
      frequency: 'YEARLY',
    });
    expect(quote20.modeDetails.yearly.grossPremium).toBe(36950);
    expect(quote20.modeDetails.yearly.rebate).toBe(600);
    expect(quote20.modeDetails.yearly.netPremium).toBe(36350);
    expect(quote20.totalBonus).toBe(1200000); // 20 yrs * 60,000 = 12,00,000
    expect(quote20.maturityAmount).toBe(2200000);
  });

  // Test 3: Convertible Whole Life (Gram Suvidha) Age 40, SA ₹10 Lakhs, 20 Years
  it('matches Official Dak Sewa Quotation for Gram Suvidha (CWLA)', () => {
    const quote = calculateRpliQuote({
      policyType: 'GRAM_SUVIDHA',
      age: 40,
      premiumCeasingAge: 60,
      sumAssured: 1000000,
      frequency: 'YEARLY',
    });
    expect(quote.modeDetails.yearly.grossPremium).toBe(36950);
    expect(quote.modeDetails.yearly.rebate).toBe(600);
    expect(quote.modeDetails.yearly.netPremium).toBe(36350);
    expect(quote.totalBonus).toBe(1200000);
    expect(quote.maturityAmount).toBe(2200000);
  });

  // Test 4: Anticipated Endowment Assurance (Gram Sumangal) Age 40, SA ₹10 Lakhs (15 & 20 Years)
  it('matches Official Dak Sewa Quotation for Gram Sumangal (15 & 20 Years)', () => {
    // 15 Years
    const aea15 = calculateRpliQuote({
      policyType: 'GRAM_SUMANGAL',
      age: 40,
      duration: 15,
      sumAssured: 1000000,
      frequency: 'YEARLY',
    });
    expect(aea15.modeDetails.yearly.grossPremium).toBe(77150);
    expect(aea15.modeDetails.yearly.rebate).toBe(600);
    expect(aea15.modeDetails.yearly.netPremium).toBe(76550);
    expect(aea15.totalBonus).toBe(675000); // 15 * 45,000
    expect(aea15.maturityAmount).toBe(1675000);

    // 20 Years
    const aea20 = calculateRpliQuote({
      policyType: 'GRAM_SUMANGAL',
      age: 40,
      duration: 20,
      sumAssured: 1000000,
      frequency: 'YEARLY',
    });
    expect(aea20.modeDetails.yearly.grossPremium).toBe(61450);
    expect(aea20.modeDetails.yearly.rebate).toBe(600);
    expect(aea20.modeDetails.yearly.netPremium).toBe(60850);
    expect(aea20.totalBonus).toBe(900000); // 20 * 45,000
    expect(aea20.maturityAmount).toBe(1900000);
  });

  // Test 5: Gram Priya (10-Year RPLI) Age 40, SA ₹10 Lakhs
  it('matches Official Dak Sewa Quotation for Gram Priya (10 Years Term)', () => {
    const priya = calculateRpliQuote({
      policyType: 'GRAM_PRIYA',
      age: 40,
      sumAssured: 1000000,
      frequency: 'YEARLY',
    });
    expect(priya.duration).toBe(10);
    expect(priya.modeDetails.yearly.grossPremium).toBe(116550);
    expect(priya.modeDetails.yearly.rebate).toBe(600);
    expect(priya.modeDetails.yearly.netPremium).toBe(115950);
    expect(priya.totalBonus).toBe(450000); // 10 * 45,000
    expect(priya.maturityAmount).toBe(1450000);
  });

  // Test 6: Bal Jeevan Bima (Children Policy) Child Age 8, SA ₹1 Lakh, Term 10
  it('matches Official Dak Sewa Quotation for Bal Jeevan Bima (Child Age 8, SA ₹1 Lakh)', () => {
    const childQuote = calculateRpliQuote({
      policyType: 'BAL_JEEVAN_BIMA',
      childAge: 8,
      parentAge: 35,
      duration: 10,
      sumAssured: 100000,
      frequency: 'MONTHLY',
    });
    expect(childQuote.modeDetails.monthly.grossPremium).toBe(10110);
    expect(childQuote.modeDetails.monthly.rebate).toBe(50);
    expect(childQuote.modeDetails.monthly.netPremium).toBe(10060);
    expect(childQuote.totalBonus).toBe(48000); // 10 * 4,800
    expect(childQuote.maturityAmount).toBe(1480000 > 100000 ? 148000 : 148000); // SA 1L + Bonus 48k = 1.48L
  });
});
