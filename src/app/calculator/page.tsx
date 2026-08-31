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
  SchemeSelector,
  SpecialPolicyOptions,
  SumAssuredSelector,
  TermSelector,
  ValidationNotice,
} from '@/components/calculator'
import { useCalculatorState } from '@/hooks/useCalculatorState'
import { RpliQuoteResult } from '@/lib/rpli'

export default function CalculatorPage() {
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
                    className="text-xs text-slate-500 hover:text-(--primary-red) flex items-center gap-1 font-medium transition-colors cursor-pointer"
                  >
                    <i className="ri-refresh-line"></i> Reset Form
                  </button>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {/* Policy Selection Cards */}
                  <PolicySelector
                    scheme={scheme}
                    policyType={policyType}
                    isConverted={isConverted}
                    onSelectPolicy={setPolicyType}
                  />

                  {/* Customer Information & Category */}
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

                  {/* Special Policy Options (Frequency, Suvidha Conversion, Ceasing Age) */}
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

                  {/* Effective Date of Quotation */}
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
                    <JointLifeInputs
                      firstLifeAge={firstLifeAge}
                      onFirstLifeAgeChange={setFirstLifeAge}
                      secondLifeAge={secondLifeAge}
                      onSecondLifeAgeChange={setSecondLifeAge}
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

                  {/* Sum Assured Input */}
                  <SumAssuredSelector
                    scheme={scheme}
                    policyType={policyType}
                    sumAssured={sumAssured}
                    customSumAssured={customSumAssured}
                    onSelectPreset={handleSumAssuredPreset}
                    onCustomSumAssuredChange={handleCustomSumAssuredChange}
                  />

                  {/* Policy Term / Maturity Duration Controls */}
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
                </form>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-5 printable-card">
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
