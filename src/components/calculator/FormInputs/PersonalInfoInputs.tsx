import { ELIGIBILITY_CATEGORIES } from '@/lib/pli'
import { RPLI_ELIGIBILITY_CATEGORIES } from '@/lib/rpli'

interface PersonalInfoInputsProps {
  scheme: 'PLI' | 'RPLI'
  fullName: string
  onFullNameChange: (name: string) => void
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  onGenderChange?: (gender: 'MALE' | 'FEMALE' | 'OTHER') => void
  eligibilityCategory: string
  onCategoryChange: (cat: string) => void
  isRuralResident: boolean
  onRuralResidentChange: (isRural: boolean) => void
  ageProofType: 'STANDARD' | 'NON-STANDARD'
  onAgeProofTypeChange: (proof: 'STANDARD' | 'NON-STANDARD') => void
  bankAccountType: 'POSB' | 'SCHEDULED_BANK' | 'NONE'
  onBankAccountTypeChange: (type: 'POSB' | 'SCHEDULED_BANK' | 'NONE') => void
}

export function PersonalInfoInputs({
  scheme,
  fullName,
  onFullNameChange,
  gender = 'MALE',
  onGenderChange,
  eligibilityCategory,
  onCategoryChange,
  isRuralResident,
  onRuralResidentChange,
  ageProofType,
  onAgeProofTypeChange,
  bankAccountType,
  onBankAccountTypeChange,
}: PersonalInfoInputsProps) {
  const categories = scheme === 'RPLI' ? RPLI_ELIGIBILITY_CATEGORIES : ELIGIBILITY_CATEGORIES

  return (
    <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
      <label className="text-sm font-bold text-(--primary-dark) block">
        Customer & Eligibility Details
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
            Full Name (Optional)
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="e.g. Ramesh Kumar"
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => onGenderChange?.(e.target.value as 'MALE' | 'FEMALE' | 'OTHER')}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-(--text-dark) mb-1">
            Employment / Category
          </label>
          <select
            value={eligibilityCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* RPLI Specific Eligibility Toggles */}
      {scheme === 'RPLI' && (
        <div className="pt-3 border-t border-slate-200 space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1.5">
              <label className="font-bold text-slate-800 block">Rural Residency:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onRuralResidentChange(true)}
                  className={`flex-1 py-1.5 rounded font-bold transition-all ${
                    isRuralResident
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  YES (Rural Area)
                </button>
                <button
                  type="button"
                  onClick={() => onRuralResidentChange(false)}
                  className={`flex-1 py-1.5 rounded font-bold transition-all ${
                    !isRuralResident
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  NO (Urban / Other)
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-slate-200 rounded-lg space-y-1.5">
              <label className="font-bold text-slate-800 block">Age Proof Type:</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onAgeProofTypeChange('STANDARD')}
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
                  onClick={() => onAgeProofTypeChange('NON-STANDARD')}
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

          {/* Operative Savings Bank Account Expansion (OM No. 29-26/2024-LI dt 23.01.2025) */}
          {!isRuralResident && (
            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-blue-950 flex items-center gap-1.5">
                  <i className="ri-bank-card-line text-blue-600 text-base"></i>
                  Operative Savings Bank Account (OM No. 29-26/2024-LI)
                </label>
                <span className="text-[0.62rem] font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">
                  RPLI Expansion 2025
                </span>
              </div>
              <p className="text-[0.68rem] text-blue-900 leading-normal">
                Per DG Postal Services Order (23.01.2025), any person maintaining an active,
                KYC-compliant Operative Savings Bank Account with Post Office Savings Bank (POSB) or
                any Scheduled Bank in India is eligible for RPLI.
              </p>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => onBankAccountTypeChange('POSB')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[0.68rem] transition-all ${
                    bankAccountType === 'POSB'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🏛️ POSB Account
                </button>
                <button
                  type="button"
                  onClick={() => onBankAccountTypeChange('SCHEDULED_BANK')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[0.68rem] transition-all ${
                    bankAccountType === 'SCHEDULED_BANK'
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  🏦 Scheduled Bank
                </button>
                <button
                  type="button"
                  onClick={() => onBankAccountTypeChange('NONE')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[0.68rem] transition-all ${
                    bankAccountType === 'NONE'
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ❌ No Account
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
