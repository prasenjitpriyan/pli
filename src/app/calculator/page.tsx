'use client'

import {
  calculateAge,
  calculatePliQuote,
  ELIGIBILITY_CATEGORIES,
  formatINR,
  FREQUENCY_CONFIG,
  mapToCanonicalPolicy,
  PliPolicy,
  PliQuoteResult,
  POLICY_REGISTRY,
  PremiumFrequency,
} from '@/lib/pli'
import {
  calculateRpliQuote,
  mapToCanonicalRpliPolicy,
  RPLI_ELIGIBILITY_CATEGORIES,
  RPLI_POLICY_REGISTRY,
  RpliPolicy,
  RpliQuoteResult,
} from '@/lib/rpli'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

const SUM_ASSURED_PRESETS_PLI = [100000, 200000, 500000, 1000000, 2000000, 5000000]
const SUM_ASSURED_PRESETS_RPLI = [20000, 50000, 100000, 200000, 500000, 1000000]

export default function CalculatorPage() {
  // Scheme State (PLI vs RPLI)
  const [scheme, setScheme] = useState<'PLI' | 'RPLI'>('PLI')

  // Form State
  const [policyType, setPolicyType] = useState<string>('SANTOSH')
  const [effectiveDate, setEffectiveDate] = useState<string>(
    () => new Date().toISOString().split('T')[0]
  )

  // Premium Payment Mode Frequency (Monthly, Quarterly, Half-Yearly, Yearly)
  const [frequency, setFrequency] = useState<PremiumFrequency>('MONTHLY')

  // Customer Information Details
  const [fullName, setFullName] = useState<string>('')
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE')
  const [eligibilityCategory, setEligibilityCategory] = useState<string>('GOVT_CENTRAL_STATE')
  const [pincode, setPincode] = useState<string>('')

  // Single Life Age Input Options
  const [ageInputMode, setAgeInputMode] = useState<'DOB' | 'AGE'>('DOB')
  const [dateOfBirth, setDateOfBirth] = useState<string>('2005-01-15')
  const [manualAge, setManualAge] = useState<number>(30)

  // Joint Life Inputs (Yugal Suraksha)
  const [firstLifeAge, setFirstLifeAge] = useState<number>(30)
  const [secondLifeAge, setSecondLifeAge] = useState<number>(28)

  // Children Policy Inputs (Bal Jeevan Bima)
  const [childDateOfBirth, setChildDateOfBirth] = useState<string>('2020-05-10')
  const [childAge, setChildAge] = useState<number>(5)
  const [parentAge, setParentAge] = useState<number>(35)
  const [isParentDeceased, setIsParentDeceased] = useState<boolean>(false)

  // RPLI Specific Eligibility Toggles
  const [isRuralResident, setIsRuralResident] = useState<boolean>(true)
  const [ageProofType, setAgeProofType] = useState<'STANDARD' | 'NON-STANDARD'>('STANDARD')

  // Whole Life Premium Ceasing Age Option (55, 58, 60)
  const [premiumCeasingAge, setPremiumCeasingAge] = useState<number>(60)

  // Convertible Whole Life (Suvidha) Conversion Toggle
  const [isConverted, setIsConverted] = useState<boolean>(false)

  // Sum Assured State
  const [sumAssured, setSumAssured] = useState<number>(100000)
  const [customSumAssured, setCustomSumAssured] = useState<string>('100000')

  // Term / Duration Input Options
  const [termInputMode, setTermInputMode] = useState<'MATURITY_AGE' | 'DURATION'>('MATURITY_AGE')
  const [maturityAge, setMaturityAge] = useState<number>(50)
  const [duration, setDuration] = useState<number>(20)

  // UI Expansion, Copy & Modal States
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false)
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  // Read URL query parameters ?scheme=rpli&policy=gram-priya on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const sParam = params.get('scheme')
      const pParam = params.get('policy')

      const targetScheme = sParam && sParam.toUpperCase() === 'RPLI' ? 'RPLI' : 'PLI'

      const timer = setTimeout(() => {
        setScheme(targetScheme)
        if (pParam) {
          if (targetScheme === 'RPLI') {
            setPolicyType(mapToCanonicalRpliPolicy(pParam))
          } else {
            setPolicyType(mapToCanonicalPolicy(pParam))
          }
        } else {
          setPolicyType(targetScheme === 'RPLI' ? 'GRAM_SANTOSH' : 'SANTOSH')
        }
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [])

  // Sync default policy when switching schemes manually
  const handleSchemeChange = (newScheme: 'PLI' | 'RPLI') => {
    setScheme(newScheme)
    if (newScheme === 'RPLI') {
      setPolicyType('GRAM_SANTOSH')
      setSumAssured(100000)
      setCustomSumAssured('100000')
    } else {
      setPolicyType('SANTOSH')
      setSumAssured(100000)
      setCustomSumAssured('100000')
    }
  }

  // Derived Completed Age
  const computedAge = useMemo(() => {
    if (policyType === 'BAL_JEEVAN_BIMA') {
      return childAge
    }
    if (policyType === 'YUGAL_SURAKSHA') {
      return Math.floor((firstLifeAge + secondLifeAge) / 2)
    }
    if (ageInputMode === 'DOB' && dateOfBirth) {
      const { age } = calculateAge(dateOfBirth, effectiveDate)
      return age
    }
    return manualAge
  }, [
    policyType,
    childAge,
    firstLifeAge,
    secondLifeAge,
    ageInputMode,
    dateOfBirth,
    effectiveDate,
    manualAge,
  ])

  // Quotation Calculation Result (Dispatches to PLI or RPLI engine)
  const quotationResult: PliQuoteResult | RpliQuoteResult = useMemo(() => {
    if (scheme === 'RPLI') {
      const canonicalRpli = mapToCanonicalRpliPolicy(policyType)
      return calculateRpliQuote({
        scheme: 'RPLI',
        policyType: canonicalRpli,
        effectiveDate,
        dateOfBirth: ageInputMode === 'DOB' ? dateOfBirth : undefined,
        age: computedAge,
        frequency,
        customer: { fullName, gender, eligibilityCategory, pincode },
        childAge: canonicalRpli === 'BAL_JEEVAN_BIMA' ? childAge : undefined,
        parentAge: canonicalRpli === 'BAL_JEEVAN_BIMA' ? parentAge : undefined,
        isParentDeceased: canonicalRpli === 'BAL_JEEVAN_BIMA' ? isParentDeceased : undefined,
        premiumCeasingAge:
          (canonicalRpli === 'GRAM_SURAKSHA' || canonicalRpli === 'GRAM_SUVIDHA') && !isConverted
            ? premiumCeasingAge
            : undefined,
        isConverted: canonicalRpli === 'GRAM_SUVIDHA' ? isConverted : undefined,
        sumAssured: Math.min(sumAssured, canonicalRpli === 'BAL_JEEVAN_BIMA' ? 100000 : 1000000),
        maturityAge: termInputMode === 'MATURITY_AGE' ? maturityAge : undefined,
        duration:
          canonicalRpli === 'GRAM_PRIYA' ? 10 : termInputMode === 'DURATION' ? duration : undefined,
      })
    }

    const canonicalPli = mapToCanonicalPolicy(policyType)
    return calculatePliQuote({
      policyType: canonicalPli,
      effectiveDate,
      dateOfBirth: ageInputMode === 'DOB' ? dateOfBirth : undefined,
      age: computedAge,
      frequency,
      customer: { fullName, gender, eligibilityCategory, pincode },
      firstLifeAge: canonicalPli === 'YUGAL_SURAKSHA' ? firstLifeAge : undefined,
      secondLifeAge: canonicalPli === 'YUGAL_SURAKSHA' ? secondLifeAge : undefined,
      childAge: canonicalPli === 'BAL_JEEVAN_BIMA' ? childAge : undefined,
      parentAge: canonicalPli === 'BAL_JEEVAN_BIMA' ? parentAge : undefined,
      premiumCeasingAge:
        (canonicalPli === 'SURAKSHA' || canonicalPli === 'SUVIDHA') && !isConverted
          ? premiumCeasingAge
          : undefined,
      isConverted: canonicalPli === 'SUVIDHA' ? isConverted : undefined,
      sumAssured: Math.min(sumAssured, canonicalPli === 'BAL_JEEVAN_BIMA' ? 300000 : 5000000),
      maturityAge: termInputMode === 'MATURITY_AGE' ? maturityAge : undefined,
      duration: termInputMode === 'DURATION' ? duration : undefined,
    })
  }, [
    scheme,
    policyType,
    effectiveDate,
    ageInputMode,
    dateOfBirth,
    computedAge,
    frequency,
    fullName,
    gender,
    eligibilityCategory,
    pincode,
    firstLifeAge,
    secondLifeAge,
    childAge,
    parentAge,
    isParentDeceased,
    premiumCeasingAge,
    isConverted,
    sumAssured,
    termInputMode,
    maturityAge,
    duration,
  ])

  // Comparison Results Across All Policies of Current Scheme
  const comparisonResults = useMemo(() => {
    if (scheme === 'RPLI') {
      const rpliList: RpliPolicy[] = [
        'GRAM_SANTOSH',
        'GRAM_SURAKSHA',
        'GRAM_SUVIDHA',
        'GRAM_PRIYA',
        'GRAM_SUMANGAL',
        'BAL_JEEVAN_BIMA',
      ]
      return rpliList.map((p) =>
        calculateRpliQuote({
          scheme: 'RPLI',
          policyType: p,
          effectiveDate,
          dateOfBirth: ageInputMode === 'DOB' ? dateOfBirth : undefined,
          age: computedAge,
          frequency,
          childAge: p === 'BAL_JEEVAN_BIMA' ? childAge : undefined,
          parentAge: p === 'BAL_JEEVAN_BIMA' ? parentAge : undefined,
          premiumCeasingAge:
            p === 'GRAM_SURAKSHA' || p === 'GRAM_SUVIDHA' ? premiumCeasingAge : undefined,
          sumAssured: Math.min(sumAssured, p === 'BAL_JEEVAN_BIMA' ? 100000 : 1000000),
          maturityAge: termInputMode === 'MATURITY_AGE' ? maturityAge : undefined,
          duration: p === 'GRAM_PRIYA' ? 10 : termInputMode === 'DURATION' ? duration : undefined,
        })
      )
    }

    const pliList: PliPolicy[] = [
      'SANTOSH',
      'SURAKSHA',
      'SUVIDHA',
      'SUMANGAL',
      'BAL_JEEVAN_BIMA',
      'YUGAL_SURAKSHA',
    ]
    return pliList.map((p) =>
      calculatePliQuote({
        policyType: p,
        effectiveDate,
        dateOfBirth: ageInputMode === 'DOB' ? dateOfBirth : undefined,
        age: computedAge,
        frequency,
        firstLifeAge: p === 'YUGAL_SURAKSHA' ? firstLifeAge : undefined,
        secondLifeAge: p === 'YUGAL_SURAKSHA' ? secondLifeAge : undefined,
        childAge: p === 'BAL_JEEVAN_BIMA' ? childAge : undefined,
        parentAge: p === 'BAL_JEEVAN_BIMA' ? parentAge : undefined,
        premiumCeasingAge: p === 'SURAKSHA' || p === 'SUVIDHA' ? premiumCeasingAge : undefined,
        sumAssured: Math.min(sumAssured, p === 'BAL_JEEVAN_BIMA' ? 300000 : 5000000),
        maturityAge: termInputMode === 'MATURITY_AGE' ? maturityAge : undefined,
        duration: termInputMode === 'DURATION' ? duration : undefined,
      })
    )
  }, [
    scheme,
    effectiveDate,
    ageInputMode,
    dateOfBirth,
    computedAge,
    frequency,
    firstLifeAge,
    secondLifeAge,
    childAge,
    parentAge,
    premiumCeasingAge,
    sumAssured,
    termInputMode,
    maturityAge,
    duration,
  ])

  // Handlers
  const handleSumAssuredPreset = (value: number) => {
    setSumAssured(value)
    setCustomSumAssured(value.toString())
  }

  const handleCustomSumAssuredChange = (val: string) => {
    setCustomSumAssured(val)
    const num = parseInt(val, 10)
    if (!isNaN(num) && num >= 10000) {
      const maxAllowed =
        scheme === 'RPLI'
          ? policyType === 'BAL_JEEVAN_BIMA'
            ? 100000
            : 1000000
          : policyType === 'BAL_JEEVAN_BIMA'
            ? 300000
            : 5000000
      setSumAssured(Math.min(num, maxAllowed))
    }
  }

  const handleResetForm = () => {
    setScheme('PLI')
    setPolicyType('SANTOSH')
    setEffectiveDate(new Date().toISOString().split('T')[0])
    setFrequency('MONTHLY')
    setFullName('')
    setGender('MALE')
    setEligibilityCategory('GOVT_CENTRAL_STATE')
    setPincode('')
    setAgeInputMode('DOB')
    setDateOfBirth('2005-01-15')
    setManualAge(30)
    setFirstLifeAge(30)
    setSecondLifeAge(28)
    setChildAge(5)
    setParentAge(35)
    setIsParentDeceased(false)
    setPremiumCeasingAge(60)
    setIsConverted(false)
    setSumAssured(100000)
    setCustomSumAssured('100000')
    setTermInputMode('MATURITY_AGE')
    setMaturityAge(50)
    setDuration(20)
    setShowBreakdown(false)
  }

  const handleCopySummary = () => {
    if (typeof window === 'undefined') return
    const text = `📌 ${scheme} QUOTATION ESTIMATE
Scheme: ${scheme === 'RPLI' ? 'Rural Postal Life Insurance (RPLI)' : 'Postal Life Insurance (PLI)'}
Policy: ${quotationResult.policyName} (${quotationResult.policyCode})
Sum Assured: ${formatINR(quotationResult.sumAssured)}
Net Monthly Premium: ${formatINR(quotationResult.netMonthlyPremium)}
Net Installment (${FREQUENCY_CONFIG[frequency].label}): ${formatINR(quotationResult.netInstallmentPremium)}
Policy Term: ${quotationResult.duration} Years
Estimated Maturity Amount: ${formatINR(quotationResult.maturityAmount)}
Generated via PLI Calculator: ${window.location.origin}/calculator?scheme=${scheme.toLowerCase()}&policy=${policyType.toLowerCase().replace('_', '-')}`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <main className="min-h-screen bg-(--bg-light) pb-20 print:bg-white print:pb-0">
      {/* Printable CSS overrides */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          nav,
          footer,
          .no-print {
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
      `,
        }}
      />

      {/* Header Banner */}
      <section className="bg-(--primary-dark) text-white py-10 px-6 no-print">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-(--accent-gold) text-(--primary-dark) text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {scheme} Engine v{quotationResult.calculationVersion}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {scheme === 'RPLI'
                ? 'Rural Postal Life Insurance (RPLI) Calculator'
                : 'Postal Life Insurance (PLI) Calculator'}
            </h1>
            <p className="opacity-80 text-sm md:text-base mt-1">
              Policy-aware premium & benefit calculation across all 6 official {scheme} products.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center text-(--accent-gold) hover:text-white font-medium transition-colors"
          >
            <i className="ri-arrow-left-line mr-2 text-lg"></i> Back to Overview
          </Link>
        </div>
      </section>

      {/* Scheme Selector Tabs (PLI vs RPLI) */}
      <div className="container-custom pt-8 no-print">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => handleSchemeChange('PLI')}
            className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              scheme === 'PLI'
                ? 'bg-(--primary-red) text-white shadow-md'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i className="ri-building-line text-lg"></i>
            <span>Postal Life Insurance (PLI)</span>
            <span className="text-[0.68rem] bg-white/20 px-2 py-0.5 rounded-full ml-1 font-semibold">
              Max SA ₹50L
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSchemeChange('RPLI')}
            className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              scheme === 'RPLI'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i className="ri-plant-line text-lg"></i>
            <span>Rural Postal Life Insurance (RPLI)</span>
            <span className="text-[0.68rem] bg-white/20 px-2 py-0.5 rounded-full ml-1 font-semibold">
              Max SA ₹10L
            </span>
          </button>
        </div>
      </div>

      {/* Mandatory Estimation & Transparency Notice */}
      <div className="container-custom pt-4 no-print">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl shadow-sm flex items-start gap-3">
          <i className="ri-error-warning-fill text-amber-600 text-xl shrink-0 mt-0.5"></i>
          <div>
            <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide">
              Indicative {scheme} Calculation Disclaimer
            </h4>
            <p className="text-amber-800 text-xs md:text-sm mt-0.5 leading-relaxed">
              This calculator provides an indicative calculation based on configured {scheme} rules
              and rates. Final premium and benefits are subject to official India Post quotation and
              applicable rules at the time of policy issuance.
            </p>
          </div>
        </div>
      </div>

      {/* Printable Header */}
      <div className="hidden print-only p-8 text-center border-b border-gray-300">
        <h1 className="text-3xl font-bold text-gray-900">
          {scheme === 'RPLI' ? 'RURAL POSTAL LIFE INSURANCE' : 'POSTAL LIFE INSURANCE'}
        </h1>
        <p className="text-sm text-gray-600">Official Formula-Based Quotation Statement</p>
        <p className="text-xs text-gray-500 mt-1" suppressHydrationWarning>
          Generated Date: {effectiveDate}
        </p>
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
                    {scheme} Policy & Personal Parameters
                  </h2>
                  <button
                    onClick={handleResetForm}
                    type="button"
                    className="text-xs text-slate-500 hover:text-(--primary-red) flex items-center gap-1 font-medium transition-colors"
                  >
                    <i className="ri-refresh-line"></i> Reset Form
                  </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {/* 1. Policy Type Selection Cards */}
                  <div>
                    <label className="block text-sm font-semibold text-(--text-dark) mb-2">
                      Select {scheme} Policy (6 Products)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {(scheme === 'RPLI'
                        ? (Object.keys(RPLI_POLICY_REGISTRY) as RpliPolicy[])
                        : (Object.keys(POLICY_REGISTRY) as PliPolicy[])
                      ).map((key) => {
                        const config =
                          scheme === 'RPLI'
                            ? RPLI_POLICY_REGISTRY[key as RpliPolicy]
                            : POLICY_REGISTRY[key as PliPolicy]
                        const isSelected = policyType === key
                        return (
                          <div
                            key={key}
                            onClick={() => setPolicyType(key)}
                            className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? scheme === 'RPLI'
                                  ? 'border-emerald-600 bg-emerald-50/30 shadow-xs'
                                  : 'border-(--primary-red) bg-red-50/30 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs text-(--primary-dark)">
                                {config.code}
                              </span>
                              <span className="text-[0.65rem] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                Bonus ₹
                                {key.includes('SUVIDHA') && isConverted ? 48 : config.bonusRate}/₹1k
                              </span>
                            </div>
                            <p className="text-xs font-bold text-(--text-dark) truncate">
                              {config.name.split('(')[0]}
                            </p>
                            <p className="text-[0.7rem] text-(--text-light) mt-1 line-clamp-2">
                              {config.description}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Customer Information (Common Fields) */}
                  <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
                    <label className="text-sm font-bold text-(--primary-dark) block">
                      Customer & Eligibility Details
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                          Full Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                          Employment / Category
                        </label>
                        <select
                          value={eligibilityCategory}
                          onChange={(e) => setEligibilityCategory(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
                        >
                          {(scheme === 'RPLI'
                            ? RPLI_ELIGIBILITY_CATEGORIES
                            : ELIGIBILITY_CATEGORIES
                          ).map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* RPLI Specific Eligibility Toggles */}
                    {scheme === 'RPLI' && (
                      <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1.5">
                          <label className="font-bold text-slate-800 block">
                            Policyholder Rural Residency:
                          </label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setIsRuralResident(true)}
                              className={`flex-1 py-1.5 rounded font-bold transition-all ${
                                isRuralResident
                                  ? 'bg-emerald-700 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              YES (Rural)
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsRuralResident(false)}
                              className={`flex-1 py-1.5 rounded font-bold transition-all ${
                                !isRuralResident
                                  ? 'bg-red-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              NO (Urban)
                            </button>
                          </div>
                        </div>

                        <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1.5">
                          <label className="font-bold text-slate-800 block">Age Proof Type:</label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setAgeProofType('STANDARD')}
                              className={`flex-1 py-1.5 rounded font-bold transition-all ${
                                ageProofType === 'STANDARD'
                                  ? 'bg-emerald-700 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              Standard (Max 55)
                            </button>
                            <button
                              type="button"
                              onClick={() => setAgeProofType('NON-STANDARD')}
                              className={`flex-1 py-1.5 rounded font-bold transition-all ${
                                ageProofType === 'NON-STANDARD'
                                  ? 'bg-amber-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              Non-Std (Max 45)
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Premium Payment Mode Frequency */}
                  <div>
                    <label className="block text-sm font-semibold text-(--text-dark) mb-2">
                      Premium Payment Mode Frequency
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(Object.keys(FREQUENCY_CONFIG) as PremiumFrequency[]).map((fKey) => {
                        const fItem = FREQUENCY_CONFIG[fKey]
                        const isSelected = frequency === fKey
                        return (
                          <button
                            key={fKey}
                            type="button"
                            onClick={() => setFrequency(fKey)}
                            className={`p-2.5 rounded-lg text-xs font-bold text-center border transition-all ${
                              isSelected
                                ? scheme === 'RPLI'
                                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                                  : 'bg-(--primary-red) text-white border-(--primary-red) shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div>{fItem.label.split('(')[0]}</div>
                            {fItem.rebatePercent > 0 && (
                              <div className="text-[0.65rem] font-normal opacity-90">
                                {fItem.rebatePercent}% Off
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Gram Priya Special Natural Calamity Feature Badge */}
                  {policyType === 'GRAM_PRIYA' && (
                    <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2 text-xs">
                      <p className="font-bold text-rose-950 flex items-center gap-1.5">
                        <i className="ri-umbrella-line text-rose-600 text-base"></i>
                        Gram Priya Special Policy Feature:
                      </p>
                      <p className="text-slate-700 leading-relaxed">
                        🌧️ <strong>Natural Calamity Premium Relief:</strong> No interest is charged
                        for up to 1 year of premium arrears in case of natural calamities such as
                        floods, drought, earthquake, or cyclone.
                      </p>
                    </div>
                  )}

                  {/* Convertible Whole Life (Suvidha) Special Option Card */}
                  {(policyType === 'SUVIDHA' || policyType === 'GRAM_SUVIDHA') && (
                    <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-purple-900 flex items-center gap-1.5">
                          <i className="ri-swap-box-line text-purple-600 text-base"></i>
                          Suvidha Conversion Option (At 5-Year Mark)
                        </label>
                        <span className="text-[0.65rem] font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full">
                          Conversion Window: 5–6 Yrs
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIsConverted(false)}
                          className={`p-3 rounded-lg text-left border-2 transition-all ${
                            !isConverted
                              ? 'border-purple-600 bg-white shadow-xs'
                              : 'border-slate-200 bg-purple-50/30 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-purple-950">
                              Option A: Unconverted
                            </span>
                            <span className="text-[0.65rem] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                              Bonus ₹{scheme === 'RPLI' ? 60 : 76}/₹1k
                            </span>
                          </div>
                          <p className="text-[0.72rem] text-slate-600">
                            Remains Whole Life. Pays out at age 80 or death.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsConverted(true)}
                          className={`p-3 rounded-lg text-left border-2 transition-all ${
                            isConverted
                              ? 'border-purple-600 bg-white shadow-xs'
                              : 'border-slate-200 bg-purple-50/30 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-purple-950">
                              Option B: Converted to Endowment
                            </span>
                            <span className="text-[0.65rem] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                              Bonus ₹48/₹1k
                            </span>
                          </div>
                          <p className="text-[0.72rem] text-slate-600">
                            Converts to Endowment after 5 yrs without medical re-exam.
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Effective Date */}
                  <div>
                    <label className="block text-sm font-semibold text-(--text-dark) mb-2">
                      Effective Date of Quotation / Policy Commencement Date
                    </label>
                    <input
                      type="date"
                      value={effectiveDate}
                      suppressHydrationWarning
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-(--primary-red) outline-none"
                    />
                  </div>

                  {/* Dynamic Age Inputs based on Policy Type */}
                  {policyType === 'YUGAL_SURAKSHA' ? (
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
                            First Life Age (21 - 45 Years)
                          </label>
                          <input
                            type="number"
                            min="21"
                            max="45"
                            value={firstLifeAge}
                            onChange={(e) => setFirstLifeAge(parseInt(e.target.value, 10) || 30)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                            Second Life Age (21 - 45 Years)
                          </label>
                          <input
                            type="number"
                            min="21"
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
                  ) : policyType === 'BAL_JEEVAN_BIMA' ? (
                    <div className="p-4 bg-blue-50/30 border border-blue-200 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                          <i className="ri-heart-pulse-line text-blue-600 text-base"></i>
                          Children Policy Parameters (Bal Jeevan Bima)
                        </label>
                        <span className="text-[0.65rem] font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">
                          Max SA: {scheme === 'RPLI' ? '₹1 Lakh' : '₹3 Lakhs'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                            Child Date of Birth (Optional)
                          </label>
                          <input
                            type="date"
                            value={childDateOfBirth}
                            onChange={(e) => {
                              setChildDateOfBirth(e.target.value)
                              if (e.target.value) {
                                const { age } = calculateAge(e.target.value, effectiveDate)
                                setChildAge(Math.max(5, Math.min(20, age)))
                              }
                            }}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none"
                          />
                          {new Date(childDateOfBirth) > new Date() && (
                            <p className="text-[0.68rem] text-red-600 font-bold mt-1">
                              ⚠️ INVALID - Child DOB is in the future.
                            </p>
                          )}
                          {new Date(childDateOfBirth) > new Date(effectiveDate) &&
                            new Date(childDateOfBirth) <= new Date() && (
                              <p className="text-[0.68rem] text-red-600 font-bold mt-1">
                                ⚠️ INVALID - Child DOB is after Policy Start Date.
                              </p>
                            )}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                            Child Completed Age (5 – 20 Years)
                          </label>
                          <input
                            type="number"
                            min="5"
                            max="20"
                            value={childAge}
                            onChange={(e) => setChildAge(parseInt(e.target.value, 10) || 5)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-(--text-dark) mb-1">
                          Parent Age at Entry (Max 45 Years)
                        </label>
                        <input
                          type="number"
                          min="19"
                          max="45"
                          value={parentAge}
                          onChange={(e) => setParentAge(parseInt(e.target.value, 10) || 35)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                        />
                      </div>

                      {/* Parent Death Premium Waiver Toggle for RPLI */}
                      {scheme === 'RPLI' && (
                        <div className="p-3 bg-white border border-blue-200 rounded-lg flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            Simulate Parent Deceased State:
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsParentDeceased(!isParentDeceased)}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                              isParentDeceased
                                ? 'bg-red-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isParentDeceased ? 'Parent Deceased (0 Premium)' : 'Parent Alive'}
                          </button>
                        </div>
                      )}

                      {/* Key Guidelines Callout */}
                      <div className="p-3 bg-white border border-blue-100 rounded-lg space-y-2 text-[0.72rem] text-slate-700">
                        <p className="font-bold text-blue-900 flex items-center gap-1">
                          <i className="ri-shield-user-line text-blue-600"></i> Rules & Facilities:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 leading-relaxed">
                          <li>
                            <strong>Premium Waiver:</strong> No premium payable on Children Policy
                            after parent death; full SA + accrued bonus paid on maturity.
                          </li>
                          <li>
                            <strong>Loan & Surrender:</strong>{' '}
                            {scheme === 'RPLI'
                              ? 'Not Available. Paid-Up eligible after 5 years.'
                              : 'No loan facility. Paid-up option after 5 years.'}
                          </li>
                        </ul>
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
                            }`}
                          >
                            Option A: Date of Birth
                          </button>
                          <button
                            type="button"
                            onClick={() => setAgeInputMode('AGE')}
                            className={`px-3 py-1 rounded-md transition-all ${
                              ageInputMode === 'AGE'
                                ? 'bg-white text-(--primary-dark) shadow-xs'
                                : 'text-slate-600'
                            }`}
                          >
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
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-semibold text-(--text-light) mb-1">
                                Completed Age
                              </label>
                              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                                {calculateAge(dateOfBirth, effectiveDate).completedAge} years
                              </div>
                            </div>
                            <div>
                              <label className="flex items-center justify-between text-xs font-semibold text-(--text-light) mb-1">
                                <span>Entry Age (ANB)</span>
                                <span className="text-[0.62rem] text-emerald-700 font-bold">Official</span>
                              </label>
                              <div className="p-2.5 bg-emerald-50/70 border border-emerald-300 rounded-lg text-sm font-bold text-emerald-950">
                                {computedAge} yrs
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="flex items-center justify-between text-xs font-semibold text-(--text-light) mb-1">
                            <span>Age on Next Birthday (ANB)</span>
                            <span className="text-[0.62rem] text-emerald-700 font-bold">19 – 55 Years</span>
                          </label>
                          <input
                            type="number"
                            min="19"
                            max="55"
                            value={manualAge}
                            onChange={(e) => setManualAge(parseInt(e.target.value, 10) || 30)}
                            onWheel={(e) => e.currentTarget.blur()}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:border-(--primary-red) outline-none"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Whole Life Ceasing Age Selector */}
                  {(policyType.includes('SURAKSHA') ||
                    (policyType.includes('SUVIDHA') && !isConverted)) && (
                    <div className="p-4 bg-amber-50/40 border border-amber-200 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-amber-900">
                          Select Premium Ceasing Age
                        </label>
                        <span className="text-xs font-semibold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                          Pay till Age {premiumCeasingAge}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        {[55, 58, 60].map((ageVal) => (
                          <button
                            key={ageVal}
                            type="button"
                            onClick={() => setPremiumCeasingAge(ageVal)}
                            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                              premiumCeasingAge === ageVal
                                ? scheme === 'RPLI'
                                  ? 'bg-emerald-700 text-white shadow-xs'
                                  : 'bg-(--primary-red) text-white shadow-xs'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            Age {ageVal} ({ageVal - computedAge} yrs pay)
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sum Assured Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-(--text-dark)">
                        Sum Assured (₹)
                      </label>
                      <span className="text-[0.68rem] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {scheme === 'RPLI'
                          ? policyType === 'BAL_JEEVAN_BIMA'
                            ? 'RPLI Max: ₹1 Lakh'
                            : 'RPLI Max: ₹10 Lakhs'
                          : policyType === 'BAL_JEEVAN_BIMA'
                            ? 'PLI Max: ₹3 Lakhs'
                            : 'PLI Max: ₹50 Lakhs'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(scheme === 'RPLI' ? SUM_ASSURED_PRESETS_RPLI : SUM_ASSURED_PRESETS_PLI)
                        .filter(
                          (val) =>
                            policyType !== 'BAL_JEEVAN_BIMA' ||
                            val <= (scheme === 'RPLI' ? 100000 : 300000)
                        )
                        .map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleSumAssuredPreset(val)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              sumAssured === val
                                ? scheme === 'RPLI'
                                  ? 'bg-emerald-700 text-white shadow-xs'
                                  : 'bg-(--primary-red) text-white shadow-xs'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {val >= 100000 ? `₹${val / 100000} Lakh` : formatINR(val)}
                          </button>
                        ))}
                    </div>
                    <input
                      type="number"
                      min="10000"
                      max={
                        scheme === 'RPLI'
                          ? policyType === 'BAL_JEEVAN_BIMA'
                            ? 100000
                            : 1000000
                          : policyType === 'BAL_JEEVAN_BIMA'
                            ? 300000
                            : 5000000
                      }
                      step="1000"
                      value={customSumAssured}
                      onChange={(e) => handleCustomSumAssuredChange(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:border-(--primary-red) outline-none"
                    />
                  </div>

                  {/* Policy Term Controls */}
                  {!policyType.includes('SURAKSHA') &&
                    (!policyType.includes('SUVIDHA') || isConverted) && (
                      <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
                        {policyType === 'GRAM_PRIYA' ? (
                          <div className="p-3 bg-white border border-rose-200 rounded-lg space-y-1">
                            <label className="text-xs font-bold text-rose-950 block">
                              Fixed Gram Priya Policy Term:
                            </label>
                            <div className="text-sm font-extrabold text-rose-700">
                              10 Years Fixed Term (Non-changeable)
                            </div>
                            <p className="text-[0.68rem] text-slate-500">
                              Payouts: 20% SA at Year 4, 20% SA at Year 7, 60% SA + Bonus at Year
                              10.
                            </p>
                          </div>
                        ) : policyType.includes('SUMANGAL') ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-bold text-orange-950 flex items-center gap-1.5">
                                <i className="ri-calendar-event-line text-orange-600 text-base"></i>
                                Money-Back Policy Term (15 or 20 Years)
                              </label>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                disabled={computedAge > 45}
                                onClick={() => {
                                  setTermInputMode('DURATION')
                                  setDuration(15)
                                }}
                                className={`p-3 rounded-lg text-center border-2 transition-all ${
                                  computedAge > 45
                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                                    : duration === 15
                                      ? 'border-orange-600 bg-white font-bold text-orange-950 shadow-xs'
                                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className="text-sm font-bold">15 Years Term</div>
                              </button>

                              <button
                                type="button"
                                disabled={computedAge > 40}
                                onClick={() => {
                                  setTermInputMode('DURATION')
                                  setDuration(20)
                                }}
                                className={`p-3 rounded-lg text-center border-2 transition-all ${
                                  computedAge > 40
                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                                    : duration === 20
                                      ? 'border-orange-600 bg-white font-bold text-orange-950 shadow-xs'
                                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className="text-sm font-bold">20 Years Term</div>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
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
                                  }`}
                                >
                                  Maturity Age
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setTermInputMode('DURATION')}
                                  className={`px-3 py-1 rounded-md transition-all ${
                                    termInputMode === 'DURATION'
                                      ? 'bg-white text-(--primary-dark) shadow-xs'
                                      : 'text-slate-600'
                                  }`}
                                >
                                  Duration (Years)
                                </button>
                              </div>
                            </div>

                            {termInputMode === 'MATURITY_AGE' ? (
                              <div className="space-y-3">
                                <div className="flex flex-wrap gap-1.5">
                                  {[35, 40, 45, 50, 55, 58, 60].map((mAge) => (
                                    <button
                                      key={mAge}
                                      type="button"
                                      disabled={mAge <= computedAge}
                                      onClick={() => setMaturityAge(mAge)}
                                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                                        mAge <= computedAge
                                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                          : maturityAge === mAge
                                            ? 'bg-(--primary-red) text-white shadow-xs'
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                      }`}
                                    >
                                      Age {mAge}
                                    </button>
                                  ))}
                                </div>
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
                                      onChange={(e) =>
                                        setMaturityAge(parseInt(e.target.value, 10) || 50)
                                      }
                                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="flex items-center justify-between text-xs font-semibold text-(--text-light) mb-1">
                                      <span>Calculated Policy Duration</span>
                                      <span className="text-[0.62rem] text-emerald-700 font-bold">Maturity Age – ANB</span>
                                    </label>
                                    <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-lg text-sm font-bold text-emerald-950 flex items-center justify-between">
                                      <span>{quotationResult.duration} Years</span>
                                      <span className="text-[0.7rem] text-slate-600 font-medium">({maturityAge} – {computedAge})</span>
                                    </div>
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
                                    onChange={(e) =>
                                      setDuration(parseInt(e.target.value, 10) || 20)
                                    }
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
                          </>
                        )}
                      </div>
                    )}
                </form>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-5 printable-card">
              <div className="sticky top-6 space-y-6">
                {/* Result Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-(--primary-dark) text-white p-6 relative">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Estimated {FREQUENCY_CONFIG[frequency].label} Net Premium
                      </span>
                      <span
                        className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {scheme === 'RPLI'
                          ? `Table: ${(quotationResult as RpliQuoteResult).rateTableVersion}`
                          : `${quotationResult.confidenceScore}% Confidence | ${quotationResult.premiumSource}`}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-extrabold text-(--accent-gold)">
                        {formatINR(quotationResult.netInstallmentPremium)}
                      </span>
                      <span className="text-sm font-medium text-slate-300">
                        / {FREQUENCY_CONFIG[frequency].label.toLowerCase().split(' ')[0]}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2">
                      Net Monthly Equivalent:{' '}
                      <strong>{formatINR(quotationResult.netMonthlyPremium)}</strong> | Annualized:{' '}
                      <strong>{formatINR(quotationResult.annualizedPremium)}</strong>
                    </p>
                  </div>

                  {/* Key Metrics Breakdown */}
                  <div className="p-6 space-y-3 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-(--text-light)">Declared Bonus Rate</span>
                      <span className="font-semibold text-(--text-dark)">
                        ₹{quotationResult.bonusRate} / ₹1,000 SA
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-(--text-light)">
                        Total Accrued Bonus ({quotationResult.duration} yrs)
                      </span>
                      <span className="font-semibold text-emerald-600">
                        +{formatINR(quotationResult.totalBonus)}
                      </span>
                    </div>

                    {/* Money-Back Periodic Survival Benefits Schedule */}
                    {quotationResult.survivalBenefits &&
                      quotationResult.survivalBenefits.length > 0 && (
                        <div className="mt-4 p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                              <i className="ri-hand-coin-line text-emerald-600 text-sm"></i>
                              Periodic Survival Benefits Schedule
                            </span>
                          </div>
                          <div className="space-y-1.5 text-xs">
                            {quotationResult.survivalBenefits.map((b, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center py-1 border-b border-emerald-100/70"
                              >
                                <span className="text-slate-700 font-medium">{b.description}</span>
                                <span className="font-bold text-emerald-700">
                                  {formatINR(b.amount)}
                                </span>
                              </div>
                            ))}
                            <div className="flex justify-between items-center py-2 font-bold text-slate-900 pt-2 border-t border-emerald-200">
                              <span>Final Maturity Payout ({quotationResult.duration} yrs)</span>
                              <span className="text-base text-(--primary-red) font-extrabold">
                                {formatINR(quotationResult.finalMaturityPayout ?? 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Maturity Highlight Box */}
                    <div className="bg-linear-to-br from-amber-50 to-orange-50/50 p-5 rounded-xl border border-amber-200 text-center mt-4">
                      <span className="text-xs uppercase tracking-wider text-amber-800 font-bold block mb-1">
                        Estimated Maturity Benefit (Age {quotationResult.maturityAge})
                      </span>
                      <span className="text-3xl font-extrabold text-(--primary-dark)">
                        {formatINR(quotationResult.maturityAmount)}
                      </span>
                    </div>

                    {/* Policy Facilities Bar */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-[0.72rem] mt-3">
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>Policy Facilities & Rules</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 font-medium text-slate-700">
                        {quotationResult.loanYears ? (
                          <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-semibold">
                            Loan: After {quotationResult.loanYears} Yrs
                          </span>
                        ) : (
                          <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                            No Loan Facility
                          </span>
                        )}
                        {quotationResult.surrenderYears ? (
                          <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-semibold">
                            Surrender: After {quotationResult.surrenderYears} Yrs
                          </span>
                        ) : (
                          <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-semibold">
                            No Surrender Option
                          </span>
                        )}
                        {scheme === 'RPLI' && (
                          <span
                            className={`px-2 py-0.5 rounded font-semibold ${
                              (quotationResult as RpliQuoteResult).medicalRequired
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {(quotationResult as RpliQuoteResult).medicalRuleStatus}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Official Table-Driven Mode Breakdown Grid (RPLI Standard) */}
                    {scheme === 'RPLI' && (quotationResult as RpliQuoteResult).modeDetails && (
                      <div className="mt-4 p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                              <i className="ri-table-line text-emerald-700 text-sm"></i>
                              Official RPLI Mode Breakdown Table
                            </span>
                            <span className="text-[0.65rem] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                              {(quotationResult as RpliQuoteResult).rateTableVersion}
                            </span>
                          </div>
                          <div className="text-[0.68rem] text-slate-600 space-y-0.5">
                            <p><strong>Rate Source:</strong> {(quotationResult as RpliQuoteResult).rateSource}</p>
                            <p><strong>Entry Age (ANB):</strong> {quotationResult.effectiveAge} Years | <strong>Target Maturity Age:</strong> {quotationResult.maturityAge} Years | <strong>Policy Duration (Term):</strong> {quotationResult.duration} Years ({quotationResult.maturityAge} – {quotationResult.effectiveAge})</p>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-[0.72rem] text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-200/70 text-slate-800 font-bold">
                                <th className="p-2 rounded-l">Mode</th>
                                <th className="p-2 text-right">Rate/₹1k</th>
                                <th className="p-2 text-right">Gross (₹)</th>
                                <th className="p-2 text-right">Rebate (₹)</th>
                                <th className="p-2 text-right">Tax (₹)</th>
                                <th className="p-2 text-right rounded-r">Net (₹)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 font-medium text-slate-700">
                              {(
                                [
                                  {
                                    label: 'Monthly',
                                    mode: 'MONTHLY',
                                    data: (quotationResult as RpliQuoteResult).modeDetails.monthly,
                                  },
                                  {
                                    label: 'Quarterly',
                                    mode: 'QUARTERLY',
                                    data: (quotationResult as RpliQuoteResult).modeDetails
                                      .quarterly,
                                  },
                                  {
                                    label: 'Half-Yearly',
                                    mode: 'HALF_YEARLY',
                                    data: (quotationResult as RpliQuoteResult).modeDetails
                                      .halfYearly,
                                  },
                                  {
                                    label: 'Yearly',
                                    mode: 'YEARLY',
                                    data: (quotationResult as RpliQuoteResult).modeDetails.yearly,
                                  },
                                ] as const
                              ).map((row, rIdx) => {
                                const isCurrentMode = frequency === row.mode
                                return (
                                  <tr
                                    key={rIdx}
                                    className={
                                      isCurrentMode
                                        ? 'bg-emerald-50/80 font-bold text-emerald-950'
                                        : 'hover:bg-slate-100/50'
                                    }
                                  >
                                    <td className="p-2 flex items-center gap-1">
                                      {isCurrentMode && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                      )}
                                      {row.label}
                                    </td>
                                    <td className="p-2 text-right">
                                      ₹{row.data.ratePer1000.toFixed(2)}
                                    </td>
                                    <td className="p-2 text-right">
                                      {formatINR(row.data.grossPremium)}
                                    </td>
                                    <td className="p-2 text-right text-emerald-700">
                                      -{formatINR(row.data.rebate)}
                                    </td>
                                    <td className="p-2 text-right">{formatINR(row.data.tax)}</td>
                                    <td className="p-2 text-right font-extrabold text-slate-900">
                                      {formatINR(row.data.netPremium)}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Toolbar */}
                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-2 justify-between no-print">
                    <button
                      onClick={handleCopySummary}
                      type="button"
                      className="flex-1 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-(--primary-dark) hover:bg-slate-100 flex items-center justify-center gap-1.5"
                    >
                      <i
                        className={
                          copied
                            ? 'ri-check-line text-green-600'
                            : 'ri-file-copy-line text-blue-600'
                        }
                      ></i>
                      {copied ? 'Copied!' : 'Copy Summary'}
                    </button>
                    <button
                      onClick={() => setIsCompareModalOpen(true)}
                      type="button"
                      className="flex-1 py-2.5 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-(--primary-dark) hover:bg-slate-100 flex items-center justify-center gap-1.5"
                    >
                      <i className="ri-scales-3-line text-amber-600"></i> Compare {scheme} Policies
                    </button>
                    <button
                      onClick={handlePrint}
                      type="button"
                      className="flex-1 py-2.5 px-3 bg-(--primary-red) text-white rounded-lg text-xs font-bold hover:bg-red-700 flex items-center justify-center gap-1.5"
                    >
                      <i className="ri-printer-line"></i> Print / PDF
                    </button>
                  </div>
                </div>

                {/* Audit Breakdown */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden no-print">
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    type="button"
                    className="w-full p-4 text-left font-bold text-sm text-(--primary-dark) flex items-center justify-between hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2">
                      <i className="ri-calculator-line text-(--primary-red)"></i>
                      How was this calculated? (Auditable Trace)
                    </span>
                    <i
                      className={showBreakdown ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}
                    ></i>
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
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 11-Step Mathematical Calculation Procedure Card */}
                {scheme === 'RPLI' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-3 text-xs no-print">
                    <h3 className="font-bold text-sm text-(--primary-dark) flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <i className="ri-functions text-emerald-700 text-base"></i>
                      RPLI Table-Driven Step-by-Step Calculation Procedure
                    </h3>

                    <div className="space-y-2 text-slate-700 font-mono text-[0.7rem]">
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">1. Entry Age (Age on Next Birthday - ANB):</span>
                        <code>DATEDIF({dateOfBirth || 'DOB'}, {effectiveDate}, &quot;Y&quot;) + 1 = {quotationResult.effectiveAge} Years (ANB)</code>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">2. Exact Maturity Age:</span>
                        <code>{quotationResult.maturityAge}</code>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">3. Policy Duration Parameter (Term):</span>
                        <code>Policy Term = Maturity Age ({quotationResult.maturityAge}) – Entry Age ANB ({quotationResult.effectiveAge}) = {quotationResult.duration} Years</code>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">4. Sum Assured Premium Units:</span>
                        <code>{formatINR(quotationResult.sumAssured)} / ₹1,000 = {quotationResult.sumAssured / 1000}</code>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">5. Exact Yearly Table Lookup:</span>
                        <code>Age {quotationResult.effectiveAge} → Age {quotationResult.maturityAge} = ₹{(quotationResult as RpliQuoteResult).modeDetails.yearly.ratePer1000.toFixed(2)} / ₹1,000</code>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">6. Gross Premium:</span>
                        <code>₹{(quotationResult as RpliQuoteResult).modeDetails[frequency === 'MONTHLY' ? 'monthly' : frequency === 'QUARTERLY' ? 'quarterly' : frequency === 'HALF_YEARLY' ? 'halfYearly' : 'yearly'].ratePer1000.toFixed(2)} × {quotationResult.sumAssured / 1000} = {formatINR(quotationResult.frequencyPremium)}</code>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">7. Mode Rebate:</span>
                        <code>{formatINR(quotationResult.rebate)}</code>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">8. Tax / GST:</span>
                        <code>{formatINR(quotationResult.tax)}</code>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">9. Net Payable Premium:</span>
                        <code>{formatINR(quotationResult.netInstallmentPremium)}</code>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <span className="font-bold text-slate-900 block font-sans">10. Accrued Bonus:</span>
                        <code>{quotationResult.sumAssured / 1000} × ₹{quotationResult.bonusRate} × {quotationResult.duration} = {formatINR(quotationResult.totalBonus)} (Declared bonus rate: ₹{quotationResult.bonusRate}/₹1k/yr)</code>
                      </div>

                      <div className="p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-950 font-bold">
                        <span className="font-bold text-emerald-900 block font-sans">11. Indicative Maturity Benefit:</span>
                        <code>{formatINR(quotationResult.sumAssured)} + {formatINR(quotationResult.totalBonus)} = {formatINR(quotationResult.maturityAmount)}</code>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 no-print">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-(--primary-dark)">
                  {scheme} Policy Options Comparison
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Effective Age {computedAge} years | Sum Assured {formatINR(sumAssured)}
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
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
                    <th className="p-3 font-semibold text-right">Total Bonus</th>
                    <th className="p-3 font-semibold text-right">Maturity Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {comparisonResults.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-(--primary-dark)">{item.policyName}</td>
                      <td className="p-3 text-right">₹{item.bonusRate}/₹1k</td>
                      <td className="p-3 text-right font-bold text-(--primary-red)">
                        {formatINR(item.netMonthlyPremium)}
                      </td>
                      <td className="p-3 text-right text-emerald-600">
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
          </div>
        </div>
      )}
    </main>
  )
}
