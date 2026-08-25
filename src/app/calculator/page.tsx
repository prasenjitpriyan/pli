'use client';

import {
  calculateAge,
  calculatePLIQuotation,
  formatINR,
  POLICY_CONFIG,
  PolicyType,
  PLIQuotationResult,
} from '@/lib/pli';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const SUM_ASSURED_PRESETS = [100000, 200000, 500000, 1000000, 5000000];

export default function CalculatorPage() {
  // Form State
  const [policyType, setPolicyType] = useState<PolicyType>('ENDOWMENT');
  const [effectiveDate, setEffectiveDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  // Single Life Age Input Options
  const [ageInputMode, setAgeInputMode] = useState<'DOB' | 'AGE'>('DOB');
  const [dateOfBirth, setDateOfBirth] = useState<string>('2005-01-15');
  const [manualAge, setManualAge] = useState<number>(30);

  // Joint Life Inputs
  const [firstLifeAge, setFirstLifeAge] = useState<number>(30);
  const [secondLifeAge, setSecondLifeAge] = useState<number>(28);

  // Children Policy Inputs
  const [childAge, setChildAge] = useState<number>(5);

  // Spouse Details Option for Single Life Policies
  const [includeSpouse, setIncludeSpouse] = useState<boolean>(false);
  const [spouseDob, setSpouseDob] = useState<string>('');
  const [spouseAge, setSpouseAge] = useState<number>(28);

  // Sum Assured State
  const [sumAssured, setSumAssured] = useState<number>(100000);
  const [customSumAssured, setCustomSumAssured] = useState<string>('100000');

  // Term / Duration Input Options
  const [termInputMode, setTermInputMode] = useState<'MATURITY_AGE' | 'DURATION'>(
    'MATURITY_AGE'
  );
  const [maturityAge, setMaturityAge] = useState<number>(50);
  const [duration, setDuration] = useState<number>(20);

  // UI Expansion & Modal States
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Derived Completed Age
  const computedAge = useMemo(() => {
    if (policyType === 'CHILDREN') {
      return childAge;
    }
    if (policyType === 'JOINT_LIFE') {
      return Math.floor((firstLifeAge + secondLifeAge) / 2);
    }
    if (ageInputMode === 'DOB' && dateOfBirth) {
      const { age } = calculateAge(dateOfBirth, effectiveDate);
      return age;
    }
    return manualAge;
  }, [
    policyType,
    childAge,
    firstLifeAge,
    secondLifeAge,
    ageInputMode,
    dateOfBirth,
    effectiveDate,
    manualAge,
  ]);

  // Quotation Calculation Result
  const quotationResult: PLIQuotationResult = useMemo(() => {
    return calculatePLIQuotation({
      policyType,
      effectiveDate,
      dateOfBirth: ageInputMode === 'DOB' ? dateOfBirth : undefined,
      age: computedAge,
      firstLifeAge: policyType === 'JOINT_LIFE' ? firstLifeAge : undefined,
      secondLifeAge: policyType === 'JOINT_LIFE' ? secondLifeAge : undefined,
      childAge: policyType === 'CHILDREN' ? childAge : undefined,
      sumAssured,
      maturityAge: termInputMode === 'MATURITY_AGE' ? maturityAge : undefined,
      duration: termInputMode === 'DURATION' ? duration : undefined,
      spouseDateOfBirth: includeSpouse && spouseDob ? spouseDob : undefined,
      spouseAge: includeSpouse ? spouseAge : undefined,
    });
  }, [
    policyType,
    effectiveDate,
    ageInputMode,
    dateOfBirth,
    computedAge,
    firstLifeAge,
    secondLifeAge,
    childAge,
    sumAssured,
    termInputMode,
    maturityAge,
    duration,
    includeSpouse,
    spouseDob,
    spouseAge,
  ]);

  // Comparison Results Across All 6 Policies
  const comparisonResults = useMemo(() => {
    const policies: PolicyType[] = [
      'ENDOWMENT',
      'WHOLE_LIFE',
      'CONVERTIBLE_WHOLE_LIFE',
      'ANTICIPATED_ENDOWMENT',
      'CHILDREN',
      'JOINT_LIFE',
    ];

    return policies.map((p) =>
      calculatePLIQuotation({
        policyType: p,
        effectiveDate,
        dateOfBirth: ageInputMode === 'DOB' ? dateOfBirth : undefined,
        age: computedAge,
        firstLifeAge: p === 'JOINT_LIFE' ? firstLifeAge : undefined,
        secondLifeAge: p === 'JOINT_LIFE' ? secondLifeAge : undefined,
        childAge: p === 'CHILDREN' ? childAge : undefined,
        sumAssured,
        maturityAge: termInputMode === 'MATURITY_AGE' ? maturityAge : undefined,
        duration: termInputMode === 'DURATION' ? duration : undefined,
      })
    );
  }, [
    effectiveDate,
    ageInputMode,
    dateOfBirth,
    computedAge,
    firstLifeAge,
    secondLifeAge,
    childAge,
    sumAssured,
    termInputMode,
    maturityAge,
    duration,
  ]);

  // Input Handlers
  const handleSumAssuredPreset = (value: number) => {
    setSumAssured(value);
    setCustomSumAssured(value.toString());
  };

  const handleCustomSumAssuredChange = (val: string) => {
    setCustomSumAssured(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 20000) {
      setSumAssured(num);
    }
  };

  const handleResetForm = () => {
    setPolicyType('ENDOWMENT');
    setEffectiveDate(new Date().toISOString().split('T')[0]);
    setAgeInputMode('DOB');
    setDateOfBirth('2005-01-15');
    setManualAge(30);
    setFirstLifeAge(30);
    setSecondLifeAge(28);
    setChildAge(5);
    setIncludeSpouse(false);
    setSpouseDob('');
    setSpouseAge(28);
    setSumAssured(100000);
    setCustomSumAssured('100000');
    setTermInputMode('MATURITY_AGE');
    setMaturityAge(50);
    setDuration(20);
    setShowBreakdown(false);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <main className="min-h-screen bg-(--bg-light) pb-20 print:bg-white print:pb-0">
      {/* Printable CSS overrides */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          nav, footer, .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .printable-card {
            border: 1px solid #cbd5e1 !important;
            box-shadow: none !important;
            break-inside: avoid;
          }
        }
      `}</style>

      {/* Header Banner */}
      <section className="bg-(--primary-dark) text-white py-10 px-6 no-print">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-(--accent-gold) text-(--primary-dark) text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Continuous Mathematical Estimation Engine v2.0
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Postal Life Insurance Calculator
            </h1>
            <p className="opacity-80 text-sm md:text-base mt-1">
              Real-time premium calculation across 6 PLI policies using surface curve estimation.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center text-(--accent-gold) hover:text-white font-medium transition-colors">
            <i className="ri-arrow-left-line mr-2 text-lg"></i> Back to Overview
          </Link>
        </div>
      </section>

      {/* Mandatory Estimation & Transparency Notice */}
      <div className="container-custom pt-8 no-print">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3">
          <i className="ri-error-warning-fill text-amber-600 text-xl shrink-0 mt-0.5"></i>
          <div>
            <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide">
              Estimated PLI Calculation Notice
            </h4>
            <p className="text-amber-800 text-xs md:text-sm mt-0.5 leading-relaxed">
              This calculator uses a formula-based estimation model derived from reference PLI quotation data. It is not an official PLI quotation. Actual PLI premium and benefits are subject to applicable official PLI rules and rates.
            </p>
          </div>
        </div>
      </div>

      {/* Printable Header (Visible only when printing) */}
      <div className="hidden print-only p-8 text-center border-b border-gray-300">
        <h1 className="text-3xl font-bold text-gray-900">POSTAL LIFE INSURANCE</h1>
        <p className="text-sm text-gray-600">Official Formula-Based Quotation Statement</p>
        <p className="text-xs text-gray-500 mt-1">Generated Date: {effectiveDate}</p>
      </div>

      <section className="py-8 px-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-7 no-print">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-(--primary-dark) flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-(--primary-red) text-white flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    Policy & Age Parameters
                  </h2>
                  <button
                    onClick={handleResetForm}
                    type="button"
                    className="text-xs text-slate-500 hover:text-(--primary-red) flex items-center gap-1 font-medium transition-colors">
                    <i className="ri-refresh-line"></i> Reset Form
                  </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {/* 1. Policy Type Grid (All 6 Policies) */}
                  <div>
                    <label className="block text-sm font-semibold text-(--text-dark) mb-2">
                      Select Policy Type (6 Supported Policies)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {(Object.keys(POLICY_CONFIG) as PolicyType[]).map((key) => {
                        const config = POLICY_CONFIG[key];
                        const isSelected = policyType === key;
                        return (
                          <div
                            key={key}
                            onClick={() => setPolicyType(key)}
                            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-(--primary-red) bg-red-50/30 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                            }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs text-(--primary-dark)">
                                {config.code}
                              </span>
                              <span className="text-[0.65rem] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                Bonus ₹{config.bonusRate}/₹1k
                              </span>
                            </div>
                            <p className="text-xs font-bold text-(--text-dark) truncate">
                              {config.name.split('(')[0]}
                            </p>
                            <p className="text-[0.7rem] text-(--text-light) mt-1 line-clamp-2">
                              {config.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Effective Date */}
                  <div>
                    <label className="block text-sm font-semibold text-(--text-dark) mb-2">
                      Effective Date of Quotation
                    </label>
                    <input
                      type="date"
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-(--primary-red) outline-none"
                    />
                  </div>

                  {/* 3. Dynamic Age Inputs based on Policy Type */}
                  {policyType === 'JOINT_LIFE' ? (
                    <div className="p-4 bg-red-50/20 border border-red-100 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-(--primary-dark)">
                          Joint Life Parameters (Yugal Suraksha)
                        </label>
                        <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                          Rebate: ₹7/month
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                            First Life Age (Years)
                          </label>
                          <input
                            type="number"
                            min="19"
                            max="45"
                            value={firstLifeAge}
                            onChange={(e) => setFirstLifeAge(parseInt(e.target.value, 10) || 30)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                            Second Life Age (Years)
                          </label>
                          <input
                            type="number"
                            min="19"
                            max="45"
                            value={secondLifeAge}
                            onChange={(e) => setSecondLifeAge(parseInt(e.target.value, 10) || 28)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                          />
                        </div>
                      </div>
                      <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 flex items-center justify-between">
                        <span>Calculated Joint Effective Age:</span>
                        <span className="text-sm font-bold text-(--primary-red)">
                          {computedAge} years (Floor Avg)
                        </span>
                      </div>
                    </div>
                  ) : policyType === 'CHILDREN' ? (
                    <div className="p-4 bg-blue-50/20 border border-blue-100 rounded-xl space-y-4">
                      <label className="text-sm font-bold text-(--primary-dark) block">
                        Children Policy Parameters (Bal Jeevan Bima)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                            Child Completed Age (5 - 12 Years)
                          </label>
                          <input
                            type="number"
                            min="5"
                            max="12"
                            value={childAge}
                            onChange={(e) => setChildAge(parseInt(e.target.value, 10) || 5)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-(--text-light) mb-1">
                            Declared Bonus Rate
                          </label>
                          <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-emerald-600">
                            ₹52 per ₹1,000 SA
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-(--primary-dark)">
                          Policy Holder Age
                        </label>
                        <div className="flex bg-slate-200 p-1 rounded-lg text-xs font-semibold">
                          <button
                            type="button"
                            onClick={() => setAgeInputMode('DOB')}
                            className={`px-3 py-1 rounded-md transition-all ${
                              ageInputMode === 'DOB'
                                ? 'bg-white text-(--primary-dark) shadow-xs'
                                : 'text-slate-600'
                            }`}>
                            Option A: Date of Birth
                          </button>
                          <button
                            type="button"
                            onClick={() => setAgeInputMode('AGE')}
                            className={`px-3 py-1 rounded-md transition-all ${
                              ageInputMode === 'AGE'
                                ? 'bg-white text-(--primary-dark) shadow-xs'
                                : 'text-slate-600'
                            }`}>
                            Option B: Current Age
                          </button>
                        </div>
                      </div>

                      {ageInputMode === 'DOB' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-(--text-light) mb-1">
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              value={dateOfBirth}
                              onChange={(e) => setDateOfBirth(e.target.value)}
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-(--primary-red) outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-(--text-light) mb-1">
                              Calculated Completed Age
                            </label>
                            <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-(--primary-red)">
                              {computedAge} years
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs font-semibold text-(--text-light) mb-1">
                            Completed Age (Years)
                          </label>
                          <input
                            type="number"
                            min="19"
                            max="55"
                            value={manualAge}
                            onChange={(e) => setManualAge(parseInt(e.target.value, 10) || 30)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-(--primary-red) outline-none"
                          />
                        </div>
                      )}

                      {/* Optional Spouse Info */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => setIncludeSpouse(!includeSpouse)}
                          className="text-xs text-(--primary-red) font-semibold hover:underline flex items-center gap-1">
                          <i className={includeSpouse ? 'ri-subtract-line' : 'ri-add-line'}></i>
                          {includeSpouse ? 'Remove Spouse Details' : '+ Add Spouse Details (Optional)'}
                        </button>

                        {includeSpouse && (
                          <div className="mt-3 p-3.5 bg-red-50/20 border border-red-100 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeIn_0.3s_ease-out]">
                            <div>
                              <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                                Spouse Date of Birth
                              </label>
                              <input
                                type="date"
                                value={spouseDob}
                                onChange={(e) => setSpouseDob(e.target.value)}
                                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                                Spouse Age
                              </label>
                              <input
                                type="number"
                                min="19"
                                max="55"
                                value={spouseAge}
                                onChange={(e) => setSpouseAge(parseInt(e.target.value, 10) || 28)}
                                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 4. Sum Assured */}
                  <div>
                    <label className="block text-sm font-semibold text-(--text-dark) mb-2">
                      Sum Assured (₹)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {SUM_ASSURED_PRESETS.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleSumAssuredPreset(val)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            sumAssured === val
                              ? 'bg-(--primary-red) text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}>
                          {val >= 100000 ? `₹${val / 100000} Lakh` : formatINR(val)}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min="20000"
                      step="1000"
                      value={customSumAssured}
                      onChange={(e) => handleCustomSumAssuredChange(e.target.value)}
                      placeholder="Enter Sum Assured (min ₹20,000)"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-(--primary-red) outline-none"
                    />
                    <p className="text-[0.75rem] text-(--text-light) mt-1">
                      Current Selection: <strong className="text-(--primary-dark)">{formatINR(sumAssured)}</strong>
                    </p>
                  </div>

                  {/* 5. Policy Term / Maturity Age */}
                  <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-(--primary-dark)">
                        Policy Duration Parameter
                      </label>
                      <div className="flex bg-slate-200 p-1 rounded-lg text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => setTermInputMode('MATURITY_AGE')}
                          className={`px-3 py-1 rounded-md transition-all ${
                            termInputMode === 'MATURITY_AGE'
                              ? 'bg-white text-(--primary-dark) shadow-xs'
                              : 'text-slate-600'
                          }`}>
                          Maturity Age
                        </button>
                        <button
                          type="button"
                          onClick={() => setTermInputMode('DURATION')}
                          className={`px-3 py-1 rounded-md transition-all ${
                            termInputMode === 'DURATION'
                              ? 'bg-white text-(--primary-dark) shadow-xs'
                              : 'text-slate-600'
                          }`}>
                          Duration (Years)
                        </button>
                      </div>
                    </div>

                    {termInputMode === 'MATURITY_AGE' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-(--text-light) mb-1">
                            Target Maturity Age
                          </label>
                          <input
                            type="number"
                            min={computedAge + 5}
                            max="80"
                            value={maturityAge}
                            onChange={(e) => setMaturityAge(parseInt(e.target.value, 10) || 50)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-(--text-light) mb-1">
                            Calculated Policy Duration
                          </label>
                          <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-(--primary-red)">
                            {quotationResult.duration} Years
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-(--text-light) mb-1">
                            Policy Duration (Years)
                          </label>
                          <input
                            type="number"
                            min="5"
                            max="55"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value, 10) || 20)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-(--text-light) mb-1">
                            Calculated Maturity Age
                          </label>
                          <div className="p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-(--primary-red)">
                            {quotationResult.maturityAge} Years Old
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-5 printable-card">
              <div className="sticky top-6 space-y-6">
                {/* Result Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  {/* Top Result Banner */}
                  <div className="bg-(--primary-dark) text-white p-6 relative">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Estimated Monthly Net Premium
                      </span>
                      <span
                        className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          quotationResult.confidenceScore >= 95
                            ? 'bg-emerald-500 text-white'
                            : quotationResult.confidenceScore >= 80
                            ? 'bg-amber-500 text-slate-900'
                            : 'bg-orange-500 text-white'
                        }`}>
                        {quotationResult.confidenceScore}% Confidence | {quotationResult.premiumSource === 'REFERENCE' ? 'Reference' : 'Estimated'}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-extrabold text-(--accent-gold)">
                        {formatINR(quotationResult.netMonthlyPremium)}
                      </span>
                      <span className="text-sm font-medium text-slate-300">/ month</span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2">
                      Annualized Net Premium: <strong>{formatINR(quotationResult.netMonthlyPremium * 12)}</strong>
                    </p>
                  </div>

                  {/* Key Metrics Breakdown */}
                  <div className="p-6 space-y-3 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-(--text-light)">Gross Monthly Premium</span>
                      <span className="font-semibold text-(--text-dark)">
                        {formatINR(quotationResult.estimatedMonthlyPremium)}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-(--text-light)">Monthly Rebate Benefit</span>
                      <span className="font-semibold text-emerald-600">
                        -{formatINR(quotationResult.rebate)}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-(--text-light)">Tax / GST Rate (0%)</span>
                      <span className="font-semibold text-(--text-dark)">
                        {formatINR(quotationResult.tax)}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100 bg-slate-50 -mx-6 px-6 font-bold">
                      <span className="text-(--primary-dark)">Net Monthly Premium</span>
                      <span className="text-(--primary-red)">
                        {formatINR(quotationResult.netMonthlyPremium)}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-(--text-light)">Total Premium Paid ({quotationResult.duration} yrs)</span>
                      <span className="font-semibold text-(--text-dark)">
                        {formatINR(quotationResult.totalPremiumPaid)}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-(--text-light)">Declared Bonus Rate</span>
                      <span className="font-semibold text-(--text-dark)">
                        ₹{quotationResult.bonusRate} / ₹1,000 SA
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-(--text-light)">Total Accrued Bonus</span>
                      <span className="font-semibold text-emerald-600">
                        +{formatINR(quotationResult.totalBonus)}
                      </span>
                    </div>

                    {quotationResult.terminalBonus > 0 && (
                      <div className="flex justify-between py-1.5 border-b border-slate-100">
                        <span className="text-(--text-light)">Terminal Bonus</span>
                        <span className="font-semibold text-emerald-600">
                          +{formatINR(quotationResult.terminalBonus)}
                        </span>
                      </div>
                    )}

                    {/* Maturity Highlight Box */}
                    <div className="bg-linear-to-br from-amber-50 to-orange-50/50 p-5 rounded-xl border border-amber-200 text-center mt-4">
                      <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-1">
                        Estimated Maturity Amount
                      </span>
                      <span className="text-3xl font-extrabold text-(--primary-dark)">
                        {formatINR(quotationResult.maturityAmount)}
                      </span>
                      <p className="text-[0.7rem] text-slate-500 mt-1">
                        Sum Assured ({formatINR(quotationResult.sumAssured)}) + Bonus ({formatINR(quotationResult.totalBonus)}) {quotationResult.terminalBonus > 0 ? `+ Terminal Bonus (${formatINR(quotationResult.terminalBonus)})` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-2 justify-between no-print">
                    <button
                      onClick={() => setIsCompareModalOpen(true)}
                      type="button"
                      className="flex-1 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-(--primary-dark) hover:bg-slate-100 flex items-center justify-center gap-1.5">
                      <i className="ri-scales-3-line text-amber-600"></i> Compare 6 Policies
                    </button>
                    <button
                      onClick={handlePrint}
                      type="button"
                      className="flex-1 py-2.5 px-3 bg-(--primary-red) text-white rounded-lg text-xs font-bold hover:bg-red-700 flex items-center justify-center gap-1.5">
                      <i className="ri-printer-line"></i> Print / Download PDF
                    </button>
                  </div>
                </div>

                {/* Formula Transparency Breakdown Accordion */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden no-print">
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    type="button"
                    className="w-full p-4 text-left font-bold text-sm text-(--primary-dark) flex items-center justify-between hover:bg-slate-50">
                    <span className="flex items-center gap-2">
                      <i className="ri-calculator-line text-(--primary-red)"></i>
                      How was this calculated?
                    </span>
                    <i className={showBreakdown ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}></i>
                  </button>

                  {showBreakdown && (
                    <div className="p-4 pt-0 border-t border-slate-100 space-y-4 text-xs">
                      {quotationResult.breakdown.map((step, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 rounded-xl space-y-1">
                          <p className="font-bold text-(--primary-dark)">{step.title}</p>
                          <p className="text-slate-500 font-mono">{step.formula}</p>
                          <p className="text-slate-700">
                            <strong>Values:</strong> {step.values}
                          </p>
                          <p className="text-(--primary-red) font-bold">
                            <strong>Result:</strong> {step.result}
                          </p>
                          {step.note && (
                            <p className="text-[0.7rem] italic text-slate-500">{step.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Comparison Modal (All 6 Policies) */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 no-print">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-(--primary-dark)">
                  PLI 6-Policy Options Comparison
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Effective Age {computedAge} years | Sum Assured {formatINR(sumAssured)} | Term {quotationResult.duration} years
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-(--primary-dark) text-white">
                    <th className="p-3 font-semibold">Policy Name</th>
                    <th className="p-3 font-semibold text-right">Bonus Rate</th>
                    <th className="p-3 font-semibold text-right">Net Monthly</th>
                    <th className="p-3 font-semibold text-right">Total Premium</th>
                    <th className="p-3 font-semibold text-right">Total Bonus</th>
                    <th className="p-3 font-semibold text-right">Maturity Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {comparisonResults.map((item, idx) => (
                    <tr
                      key={idx}
                      className={item.policyType === policyType ? 'bg-amber-50 font-semibold' : 'hover:bg-slate-50'}>
                      <td className="p-3">
                        <div className="font-bold text-(--primary-dark)">{item.policyName}</div>
                        <div className="text-[0.7rem] text-slate-500">Code: {item.policyCode}</div>
                      </td>
                      <td className="p-3 text-right font-medium text-slate-700">₹{item.bonusRate} / ₹1k</td>
                      <td className="p-3 text-right font-bold text-(--primary-red)">
                        {formatINR(item.netMonthlyPremium)}
                      </td>
                      <td className="p-3 text-right">{formatINR(item.totalPremiumPaid)}</td>
                      <td className="p-3 text-right text-emerald-600 font-medium">
                        +{formatINR(item.totalBonus)}
                      </td>
                      <td className="p-3 text-right font-bold text-slate-900">
                        {formatINR(item.maturityAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="py-2 px-6 bg-(--primary-dark) text-white rounded-lg text-xs font-bold">
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
