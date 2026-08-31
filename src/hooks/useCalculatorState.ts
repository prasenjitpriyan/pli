'use client'

import {
  calculateAge,
  calculatePliQuote,
  FREQUENCY_CONFIG,
  mapToCanonicalPolicy,
  PliPolicy,
  PliQuoteResult,
  PremiumFrequency,
} from '@/lib/pli'
import {
  calculateRpliQuote,
  mapToCanonicalRpliPolicy,
  RpliPolicy,
  RpliQuoteResult,
} from '@/lib/rpli'
import { formatINR } from '@/lib/pli'
import { useEffect, useMemo, useState } from 'react'

export function useCalculatorState() {
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
  const [bankAccountType, setBankAccountType] = useState<'POSB' | 'SCHEDULED_BANK' | 'NONE'>('POSB')
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
        isRuralResident,
        hasOperativeSBAccount: isRuralResident ? true : bankAccountType !== 'NONE',
        bankAccountType,
        ageProofType,
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
    isRuralResident,
    bankAccountType,
    ageProofType,
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

  return {
    scheme,
    setScheme,
    handleSchemeChange,
    policyType,
    setPolicyType,
    effectiveDate,
    setEffectiveDate,
    frequency,
    setFrequency,
    fullName,
    setFullName,
    gender,
    setGender,
    eligibilityCategory,
    setEligibilityCategory,
    pincode,
    setPincode,
    ageInputMode,
    setAgeInputMode,
    dateOfBirth,
    setDateOfBirth,
    manualAge,
    setManualAge,
    firstLifeAge,
    setFirstLifeAge,
    secondLifeAge,
    setSecondLifeAge,
    childDateOfBirth,
    setChildDateOfBirth,
    childAge,
    setChildAge,
    parentAge,
    setParentAge,
    isParentDeceased,
    setIsParentDeceased,
    isRuralResident,
    setIsRuralResident,
    bankAccountType,
    setBankAccountType,
    ageProofType,
    setAgeProofType,
    premiumCeasingAge,
    setPremiumCeasingAge,
    isConverted,
    setIsConverted,
    sumAssured,
    setSumAssured,
    customSumAssured,
    handleSumAssuredPreset,
    handleCustomSumAssuredChange,
    termInputMode,
    setTermInputMode,
    maturityAge,
    setMaturityAge,
    duration,
    setDuration,
    showBreakdown,
    setShowBreakdown,
    isCompareModalOpen,
    setIsCompareModalOpen,
    copied,
    handleResetForm,
    handleCopySummary,
    handlePrint,
    computedAge,
    quotationResult,
    comparisonResults,
  }
}

export type CalculatorState = ReturnType<typeof useCalculatorState>
