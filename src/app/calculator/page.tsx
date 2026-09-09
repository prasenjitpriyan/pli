'use client'

import {
  AgeAndDobInputs,
  AuditBreakdown,
  CalculationProcedure,
  CalculatorHeader,
  ChildPolicyInputs,
  JointLifeInputs,
  PersonalInfoInputs,
  PolicyComparisonModal,
  PolicySelector,
  PremiumSummaryCard,
  PrintableQuotationSheet,
  SchemeSelector,
  SpecialPolicyOptions,
  SumAssuredSelector,
  TermSelector,
  ValidationNotice,
} from '@/components/calculator'
import { useCalculatorState } from '@/hooks/useCalculatorState'
import { RpliQuoteResult } from '@/lib/rpli'
import { useState } from 'react'

export default function CalculatorPage() {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const {
    scheme,
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
    ageInputMode,
    setAgeInputMode,
    dateOfBirth,
    setDateOfBirth,
    manualAge,
    setManualAge,
    jointAgeMode,
    setJointAgeMode,
    firstLifeDob,
    setFirstLifeDob,
    secondLifeDob,
    setSecondLifeDob,
    firstLifeAge,
    setFirstLifeAge,
    secondLifeAge,
    setSecondLifeAge,
    firstLifeEffectiveAge,
    secondLifeEffectiveAge,
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
  } = useCalculatorState()

  return (
    <main className="min-h-screen bg-(--bg-light) pb-20 print:bg-white print:pb-0">
      {/* 1. Header & Print Styling */}
      <CalculatorHeader
        scheme={scheme}
        calculationVersion={quotationResult.calculationVersion}
        effectiveDate={effectiveDate}
      />

      {/* 2. Scheme Selector Tabs */}
      <SchemeSelector scheme={scheme} onSchemeChange={handleSchemeChange} />

      {/* 3. Regulatory / Estimation Notice */}
      <ValidationNotice scheme={scheme} />

      {/* 4. Calculator Main Grid Layout */}
      <section className="py-8 px-6 calculator-main-grid">
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
                    className="text-xs text-slate-500 hover:text-(--primary-red) flex items-center gap-1 font-medium transition-colors cursor-pointer"
                  >
                    <i className="ri-refresh-line"></i> Reset Form
                  </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {/* 1. Policy Selection Cards */}
                  <PolicySelector
                    scheme={scheme}
                    policyType={policyType}
                    isConverted={isConverted}
                    onSelectPolicy={setPolicyType}
                  />

                  {/* 2. Dynamic Age Inputs based on Policy Type */}
                  {policyType === 'YUGAL_SURAKSHA' ? (
                    <JointLifeInputs
                      jointAgeMode={jointAgeMode}
                      onJointAgeModeChange={setJointAgeMode}
                      firstLifeDob={firstLifeDob}
                      onFirstLifeDobChange={setFirstLifeDob}
                      secondLifeDob={secondLifeDob}
                      onSecondLifeDobChange={setSecondLifeDob}
                      firstLifeAge={firstLifeAge}
                      onFirstLifeAgeChange={setFirstLifeAge}
                      secondLifeAge={secondLifeAge}
                      onSecondLifeAgeChange={setSecondLifeAge}
                      firstLifeEffectiveAge={firstLifeEffectiveAge}
                      secondLifeEffectiveAge={secondLifeEffectiveAge}
                      computedAge={computedAge}
                    />
                  ) : policyType === 'BAL_JEEVAN_BIMA' ? (
                    <ChildPolicyInputs
                      scheme={scheme}
                      childDateOfBirth={childDateOfBirth}
                      onChildDobChange={setChildDateOfBirth}
                      effectiveDate={effectiveDate}
                      childAge={childAge}
                      onChildAgeChange={setChildAge}
                      parentAge={parentAge}
                      onParentAgeChange={setParentAge}
                      isParentDeceased={isParentDeceased}
                      onToggleParentDeceased={() => setIsParentDeceased(!isParentDeceased)}
                    />
                  ) : (
                    <AgeAndDobInputs
                      ageInputMode={ageInputMode}
                      onAgeInputModeChange={setAgeInputMode}
                      dateOfBirth={dateOfBirth}
                      onDateOfBirthChange={setDateOfBirth}
                      effectiveDate={effectiveDate}
                      manualAge={manualAge}
                      onManualAgeChange={setManualAge}
                      computedAge={computedAge}
                    />
                  )}

                  {/* 3. Sum Assured Input with Steppers */}
                  <SumAssuredSelector
                    scheme={scheme}
                    policyType={policyType}
                    sumAssured={sumAssured}
                    customSumAssured={customSumAssured}
                    onSelectPreset={handleSumAssuredPreset}
                    onCustomSumAssuredChange={handleCustomSumAssuredChange}
                  />

                  {/* 4. Policy Term / Maturity Duration Controls */}
                  <TermSelector
                    policyType={policyType}
                    isConverted={isConverted}
                    computedAge={computedAge}
                    termInputMode={termInputMode}
                    onTermInputModeChange={setTermInputMode}
                    maturityAge={maturityAge}
                    onMaturityAgeChange={setMaturityAge}
                    duration={duration}
                    onDurationChange={setDuration}
                    calculatedDuration={quotationResult.duration}
                    calculatedMaturityAge={quotationResult.maturityAge}
                  />

                  {/* 5. Special Policy Options (Frequency & Conversion) */}
                  <SpecialPolicyOptions
                    scheme={scheme}
                    policyType={policyType}
                    frequency={frequency}
                    onFrequencyChange={setFrequency}
                    isConverted={isConverted}
                    onToggleConverted={setIsConverted}
                    premiumCeasingAge={premiumCeasingAge}
                    onPremiumCeasingAgeChange={setPremiumCeasingAge}
                    computedAge={computedAge}
                  />

                  {/* 6. Advanced Proposer Details Accordion */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                      className="w-full p-4 flex items-center justify-between text-left font-bold text-xs text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <i className="ri-user-settings-line text-(--primary-red) text-base"></i>
                        <span>Proposer Identity & Commencement Details (Optional)</span>
                      </div>
                      <i className={`ri-arrow-down-s-line text-lg transition-transform duration-200 ${showAdvancedOptions ? 'rotate-180' : ''}`}></i>
                    </button>

                    {showAdvancedOptions && (
                      <div className="p-4 pt-2 border-t border-slate-200/80 space-y-4 bg-white">
                        <PersonalInfoInputs
                          scheme={scheme}
                          fullName={fullName}
                          onFullNameChange={setFullName}
                          gender={gender}
                          onGenderChange={setGender}
                          eligibilityCategory={eligibilityCategory}
                          onCategoryChange={setEligibilityCategory}
                          isRuralResident={isRuralResident}
                          onRuralResidentChange={setIsRuralResident}
                          ageProofType={ageProofType}
                          onAgeProofTypeChange={setAgeProofType}
                          bankAccountType={bankAccountType}
                          onBankAccountTypeChange={setBankAccountType}
                        />

                        <div>
                          <label className="block text-xs font-semibold text-(--text-dark) mb-1.5">
                            Effective Date of Quotation / Policy Commencement Date
                          </label>
                          <input
                            type="date"
                            value={effectiveDate}
                            suppressHydrationWarning
                            onChange={(e) => setEffectiveDate(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:border-(--primary-red) outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-5 no-print">
              <div className="sticky top-6 space-y-6">
                {/* Premium & Benefits Summary Card */}
                <PremiumSummaryCard
                  scheme={scheme}
                  frequency={frequency}
                  quotationResult={quotationResult}
                  copied={copied}
                  onCopySummary={handleCopySummary}
                  onOpenCompareModal={() => setIsCompareModalOpen(true)}
                  onPrint={handlePrint}
                />

                {/* Audit Breakdown Trace */}
                <AuditBreakdown
                  showBreakdown={showBreakdown}
                  onToggleBreakdown={() => setShowBreakdown(!showBreakdown)}
                  quotationResult={quotationResult}
                />

                {/* Step-by-Step Calculation Procedure */}
                <CalculationProcedure
                  scheme={scheme}
                  dateOfBirth={dateOfBirth}
                  effectiveDate={effectiveDate}
                  frequency={frequency}
                  quotationResult={quotationResult as RpliQuoteResult}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Vibrant A4 Printable Quotation Sheet */}
      <PrintableQuotationSheet
        scheme={scheme}
        fullName={fullName}
        gender={gender}
        eligibilityCategory={eligibilityCategory}
        dateOfBirth={dateOfBirth}
        effectiveDate={effectiveDate}
        computedAge={computedAge}
        firstLifeDob={firstLifeDob}
        secondLifeDob={secondLifeDob}
        firstLifeEffectiveAge={firstLifeEffectiveAge}
        secondLifeEffectiveAge={secondLifeEffectiveAge}
        ageProofType={ageProofType}
        isRuralResident={isRuralResident}
        bankAccountType={bankAccountType}
        policyType={policyType}
        isConverted={isConverted}
        premiumCeasingAge={premiumCeasingAge}
        sumAssured={sumAssured}
        frequency={frequency}
        quotationResult={quotationResult}
      />

      {/* Comparison Modal */}
      <PolicyComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        scheme={scheme}
        computedAge={computedAge}
        sumAssured={sumAssured}
        comparisonResults={comparisonResults}
      />
    </main>
  )
}
