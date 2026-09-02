'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import PageTransition from '@/components/common/PageTransition';
import { staggerContainer, fadeUpVariant } from '@/lib/animations';

interface PolicyDetail {
  id: string;
  scheme: 'PLI' | 'RPLI';
  name: string;
  hindiName: string;
  type: string;
  bonusRate: string;
  minAge: number;
  maxAge: number;
  minSA: string;
  maxSA: string;
  loanAfter: string;
  surrenderAfter: string;
  description: string;
  highlights: string[];
  recommendedFor: string;
  calculatorPolicyId: string;
}

const ALL_POLICIES: PolicyDetail[] = [
  // PLI Policies
  {
    id: 'pli-suraksha',
    scheme: 'PLI',
    name: 'Suraksha (Whole Life Assurance)',
    hindiName: 'सुरक्षा (सम्पूर्ण जीवन बीमा)',
    type: 'Whole Life Assurance',
    bonusRate: '₹76 / ₹1,000 SA per year',
    minAge: 19,
    maxAge: 55,
    minSA: '₹20,000',
    maxSA: '₹50,00,000',
    loanAfter: '4 Years',
    surrenderAfter: '3 Years',
    description:
      'Highest bonus-yielding plan in India with assured sum paid upon reaching 80 years of age or to nominees in the event of earlier death.',
    highlights: [
      'Highest declared bonus rate in India (₹76/₹1,000 SA)',
      'Convertible to Endowment Assurance up to age 59',
      'Loan facility available after 4 years',
      'Non-medical limit up to ₹5 Lakhs',
    ],
    recommendedFor: 'Maximum legacy wealth creation & long-term financial security for family.',
    calculatorPolicyId: 'SURAKSHA',
  },
  {
    id: 'pli-santosh',
    scheme: 'PLI',
    name: 'Santosh (Endowment Assurance)',
    hindiName: 'संतोष (संतोष बन्दोबस्ती बीमा)',
    type: 'Endowment Assurance',
    bonusRate: '₹52 / ₹1,000 SA per year',
    minAge: 19,
    maxAge: 55,
    minSA: '₹20,000',
    maxSA: '₹50,00,000',
    loanAfter: '3 Years',
    surrenderAfter: '3 Years',
    description:
      'Assured lump sum payout upon attaining predetermined maturity age (35, 40, 45, 50, 55, 58, 60 years) or to nominees upon earlier death.',
    highlights: [
      'Most popular life assurance scheme in India Post',
      'Maturity age options: 35, 40, 45, 50, 55, 58, 60',
      'Loan facility available after 3 years',
      '100% Tax-Free returns under Sec 10(10D)',
    ],
    recommendedFor: 'Goal-based financial planning (children education, marriage, home loan repayment).',
    calculatorPolicyId: 'SANTOSH',
  },
  {
    id: 'pli-suvidha',
    scheme: 'PLI',
    name: 'Suvidha (Convertible Whole Life Assurance)',
    hindiName: 'सुविधा (परिवर्तनीय सम्पूर्ण जीवन बीमा)',
    type: 'Convertible Whole Life',
    bonusRate: '₹76 / ₹1,000 SA (Before conversion)',
    minAge: 19,
    maxAge: 50,
    minSA: '₹20,000',
    maxSA: '₹50,00,000',
    loanAfter: '4 Years',
    surrenderAfter: '3 Years',
    description:
      'Offers high bonus rate of Whole Life with option to convert into an Endowment Assurance after completion of 5 years of policy term.',
    highlights: [
      'Whole Life premium rates initially with lower cost',
      'Option to convert to Endowment at the end of 5 years',
      'If not converted, continues as Whole Life plan',
      'Loan facility available after 4 years',
    ],
    recommendedFor: 'Young professionals wanting maximum coverage with flexibility to mature early.',
    calculatorPolicyId: 'SUVIDHA',
  },
  {
    id: 'pli-sumangal',
    scheme: 'PLI',
    name: 'Sumangal (Anticipated Endowment Assurance)',
    hindiName: 'सुमंगल (प्रत्याशित बन्दोबस्ती बीमा)',
    type: 'Money Back Assurance',
    bonusRate: '₹48 / ₹1,000 SA per year',
    minAge: 19,
    maxAge: 45,
    minSA: '₹20,000',
    maxSA: '₹50,00,000',
    loanAfter: 'Not Applicable',
    surrenderAfter: 'Not Applicable',
    description:
      'Periodic survival survival benefits (money-back installments) throughout policy duration + full sum assured on death irrespective of prior payouts.',
    highlights: [
      'Periodic survival cashbacks: 15-year (20%, 20%, 20%, 40%) or 20-year (20%, 20%, 20%, 20%, 20%)',
      'Full Sum Assured payable on death irrespective of survival benefits already paid',
      'Periodic liquidity for recurring milestones',
    ],
    recommendedFor: 'Individuals needing regular liquidity every few years with life cover.',
    calculatorPolicyId: 'SUMANGAL',
  },
  {
    id: 'pli-yugal-suraksha',
    scheme: 'PLI',
    name: 'Yugal Suraksha (Joint Life Assurance)',
    hindiName: 'युगल सुरक्षा (संयुक्त जीवन बीमा)',
    type: 'Joint Life Assurance',
    bonusRate: '₹52 / ₹1,000 SA per year',
    minAge: 21,
    maxAge: 45,
    minSA: '₹20,000',
    maxSA: '₹50,00,000',
    loanAfter: '3 Years',
    surrenderAfter: '3 Years',
    description:
      'Dual life protection under a single policy covering both spouses. Either one spouse should be eligible for PLI.',
    highlights: [
      'Single premium covers both husband and wife',
      'Full sum assured and accrued bonus paid on death of either spouse',
      'Loan facility available after 3 years',
    ],
    recommendedFor: 'Couples seeking unified financial protection under a single budget-friendly premium.',
    calculatorPolicyId: 'YUGAL_SURAKSHA',
  },
  {
    id: 'pli-bal-jeevan',
    scheme: 'PLI',
    name: 'Bal Jeevan Bima (Children Policy)',
    hindiName: 'बाल जीवन बीमा (बाल जीवन सुरक्षा)',
    type: 'Children Assurance',
    bonusRate: '₹52 / ₹1,000 SA per year',
    minAge: 5,
    maxAge: 20,
    minSA: '₹20,000',
    maxSA: '₹3,00,000',
    loanAfter: 'Not Applicable',
    surrenderAfter: 'Not Applicable',
    description:
      'Comprehensive life insurance for children (maximum 2 children) of PLI policyholders with waiver of future premiums upon parent demise.',
    highlights: [
      'Parent must hold an active PLI policy (age not over 45 years)',
      'No medical check-up required for child',
      'Future premiums waived on death of main policyholder',
    ],
    recommendedFor: 'PLI policyholders wanting guaranteed educational corpus for children.',
    calculatorPolicyId: 'BAL_JEEVAN_BIMA',
  },

  // RPLI Policies
  {
    id: 'rpli-gram-suraksha',
    scheme: 'RPLI',
    name: 'Gram Suraksha (Whole Life Assurance)',
    hindiName: 'ग्राम सुरक्षा (सम्पूर्ण जीवन बीमा)',
    type: 'Rural Whole Life Assurance',
    bonusRate: '₹65 / ₹1,000 SA per year',
    minAge: 19,
    maxAge: 55,
    minSA: '₹10,000',
    maxSA: '₹10,00,000',
    loanAfter: '4 Years',
    surrenderAfter: '3 Years',
    description:
      'Affordable rural whole life assurance plan providing India’s highest bonus rate in the rural category.',
    highlights: [
      'Top declared bonus in rural segment (₹65/₹1,000 SA)',
      'Low entry threshold (Sum Assured starting from ₹10,000)',
      '0% GST and sovereign guarantee by Government of India',
      'Loan facility after 4 years',
    ],
    recommendedFor: 'Rural residents, agriculturists and workers seeking lifetime family security.',
    calculatorPolicyId: 'GRAM_SURAKSHA',
  },
  {
    id: 'rpli-gram-santosh',
    scheme: 'RPLI',
    name: 'Gram Santosh (Endowment Assurance)',
    hindiName: 'ग्राम संतोष (बन्दोबस्ती बीमा)',
    type: 'Rural Endowment Assurance',
    bonusRate: '₹50 / ₹1,000 SA per year',
    minAge: 19,
    maxAge: 55,
    minSA: '₹10,000',
    maxSA: '₹10,00,000',
    loanAfter: '3 Years',
    surrenderAfter: '3 Years',
    description:
      'Fixed-term rural endowment policy designed for rural citizens to build disciplined savings with guaranteed bonus additions.',
    highlights: [
      'Maturity age options: 35, 40, 45, 50, 55, 58, 60 years',
      'Loan facility available after 3 years',
      'Full maturity sum assured + declared bonus payout',
    ],
    recommendedFor: 'Rural families saving for milestone events like agriculture expansion or weddings.',
    calculatorPolicyId: 'GRAM_SANTOSH',
  },
  {
    id: 'rpli-gram-suvidha',
    scheme: 'RPLI',
    name: 'Gram Suvidha (Convertible Whole Life)',
    hindiName: 'ग्राम सुविधा (परिवर्तनीय सम्पूर्ण जीवन)',
    type: 'Rural Convertible Whole Life',
    bonusRate: '₹65 / ₹1,000 SA (Before conversion)',
    minAge: 19,
    maxAge: 45,
    minSA: '₹10,000',
    maxSA: '₹10,00,000',
    loanAfter: '4 Years',
    surrenderAfter: '3 Years',
    description:
      'Budget-friendly rural whole life policy with flexibility to convert into Endowment Assurance at end of 5 years.',
    highlights: [
      'Low initial premium with highest whole life bonus',
      'Convertible to Gram Santosh at year 5',
      'Option to keep as Whole Life if unconverted',
    ],
    recommendedFor: 'Rural youth desiring low start-up cost with conversion flexibility.',
    calculatorPolicyId: 'GRAM_SUVIDHA',
  },
  {
    id: 'rpli-gram-sumangal',
    scheme: 'RPLI',
    name: 'Gram Sumangal (Anticipated Endowment)',
    hindiName: 'ग्राम सुमंगल (प्रत्याशित बन्दोबस्ती)',
    type: 'Rural Money Back Assurance',
    bonusRate: '₹45 / ₹1,000 SA per year',
    minAge: 19,
    maxAge: 45,
    minSA: '₹10,000',
    maxSA: '₹10,00,000',
    loanAfter: 'Not Applicable',
    surrenderAfter: 'Not Applicable',
    description:
      'Periodic money-back policy for rural households needing cash intervals for farming cycles and children expenses.',
    highlights: [
      'Periodic payouts at regular intervals (15 or 20 years term)',
      '100% death benefit regardless of survival claims already paid',
    ],
    recommendedFor: 'Rural entrepreneurs and farmers needing periodic cash influxes.',
    calculatorPolicyId: 'GRAM_SUMANGAL',
  },
  {
    id: 'rpli-gram-priya',
    scheme: 'RPLI',
    name: 'Gram Priya (10 Year Rural Policy)',
    hindiName: 'ग्राम प्रिया (10 वर्षीय ग्रामीण बीमा)',
    type: 'Short Term Anticipated Assurance',
    bonusRate: '₹45 / ₹1,000 SA per year',
    minAge: 20,
    maxAge: 45,
    minSA: '₹10,000',
    maxSA: '₹10,00,000',
    loanAfter: 'Not Applicable',
    surrenderAfter: 'Not Applicable',
    description:
      'Short-term 10-year money-back policy with survival payouts at 4th, 7th, and 10th year.',
    highlights: [
      'Compact 10-year term with swift returns',
      'Survival benefits: 20% at 4th yr, 20% at 7th yr, 60% + bonus at 10th yr',
      'Death relief cover available during drought/flood crises',
    ],
    recommendedFor: 'Individuals needing short-duration structured wealth generation.',
    calculatorPolicyId: 'GRAM_PRIYA',
  },
  {
    id: 'rpli-bal-jeevan',
    scheme: 'RPLI',
    name: 'Rural Bal Jeevan Bima (Child Plan)',
    hindiName: 'ग्रामीण बाल जीवन बीमा',
    type: 'Rural Children Assurance',
    bonusRate: '₹50 / ₹1,000 SA per year',
    minAge: 5,
    maxAge: 20,
    minSA: '₹10,000',
    maxSA: '₹3,00,000',
    loanAfter: 'Not Applicable',
    surrenderAfter: 'Not Applicable',
    description:
      'Rural child security cover under RPLI with premium waiver benefits upon parent demise.',
    highlights: [
      'Children cover for rural parents (maximum 2 children)',
      'No medical required for child under standard terms',
      'Waiver of all future premiums if parent passes away',
    ],
    recommendedFor: 'Rural parents aiming to safeguard child higher education.',
    calculatorPolicyId: 'BAL_JEEVAN_BIMA',
  },
];

export default function SchemesPage() {
  const [selectedScheme, setSelectedScheme] = useState<'ALL' | 'PLI' | 'RPLI'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPolicies = useMemo(() => {
    return ALL_POLICIES.filter((p) => {
      const matchesScheme = selectedScheme === 'ALL' || p.scheme === selectedScheme;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesScheme && matchesSearch;
    });
  }, [selectedScheme, searchQuery]);

  return (
    <PageTransition className="min-h-screen bg-(--bg-light) pb-24">
      {/* Header Banner with Motion */}
      <section className="bg-linear-to-r from-(--primary-dark) via-[#242f42] to-(--primary-dark) text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-(--primary-red)/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="container-custom relative z-10 text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-(--accent-gold) text-xs font-bold uppercase tracking-wider border border-white/10">
            <i className="ri-shield-star-fill"></i>
            100% Sovereign Guaranteed Portfolio
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Official Postal Life Insurance Policies
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Choose from India Post’s sovereign portfolio offering India’s highest declared bonus rates (up to ₹76/₹1,000 SA), 0% GST on premiums, and full tax exemptions under Sections 80C & 10(10D).
          </p>
        </motion.div>
      </section>

      {/* Filter and Search Bar with Shared Layout Motion */}
      <section className="sticky top-18 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-6 shadow-xs">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Scheme Filter Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-full border border-slate-200 w-full md:w-auto relative">
            {(['ALL', 'PLI', 'RPLI'] as const).map((tab) => {
              const label =
                tab === 'ALL'
                  ? `All Schemes (${ALL_POLICIES.length})`
                  : tab === 'PLI'
                  ? 'PLI Schemes (6)'
                  : 'RPLI Schemes (6)';
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedScheme(tab)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-colors cursor-pointer flex-1 md:flex-none z-10 ${
                    selectedScheme === tab ? 'text-white' : 'text-slate-600 hover:text-(--primary-dark)'
                  }`}>
                  {selectedScheme === tab && (
                    <motion.div
                      layoutId="schemesTabPill"
                      className="absolute inset-0 bg-(--primary-red) rounded-full shadow-md -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search policy name, term, bonus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs md:text-sm focus:border-(--primary-red) outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer">
                <i className="ri-close-circle-fill"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Policy Grid with Stagger Animation */}
      <section className="container-custom py-10 px-6">
        {filteredPolicies.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-3xl text-slate-400 mb-4">
              <i className="ri-file-search-line"></i>
            </div>
            <h3 className="text-lg font-bold text-(--primary-dark)">No policies found</h3>
            <p className="text-sm text-slate-500 mt-1">
              Try adjusting your search keywords or clear the filter.
            </p>
            <button
              onClick={() => {
                setSelectedScheme('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-full text-(--primary-dark) cursor-pointer">
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPolicies.map((policy) => (
              <motion.div
                key={policy.id}
                variants={fadeUpVariant}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between overflow-hidden group">
                {/* Card Top Banner */}
                <div>
                  <div className="p-6 border-b border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] font-black tracking-wider uppercase px-3 py-1 rounded-full ${
                          policy.scheme === 'PLI'
                            ? 'bg-(--primary-red)/10 text-(--primary-red) border border-(--primary-red)/20'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                        {policy.scheme} • {policy.type}
                      </span>
                      <span className="text-xs font-bold text-(--accent-gold) flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/50">
                        <i className="ri-award-fill"></i>
                        {policy.bonusRate}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-(--primary-dark) group-hover:text-(--primary-red) transition-colors">
                        {policy.name}
                      </h2>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">
                        {policy.hindiName}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {policy.description}
                    </p>
                  </div>

                  {/* Specifications Pill Grid */}
                  <div className="p-6 bg-slate-50/50 border-b border-slate-100 grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Age Eligibility
                      </span>
                      <span className="font-bold text-(--primary-dark)">
                        {policy.minAge} – {policy.maxAge} Years
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Max Sum Assured
                      </span>
                      <span className="font-bold text-(--primary-dark)">
                        {policy.maxSA}
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Loan Facility
                      </span>
                      <span className="font-bold text-(--primary-dark)">
                        {policy.loanAfter}
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Surrender Facility
                      </span>
                      <span className="font-bold text-(--primary-dark)">
                        {policy.surrenderAfter}
                      </span>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="p-6 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Highlights
                    </span>
                    {policy.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <i className="ri-checkbox-circle-fill text-emerald-500 mt-0.5 shrink-0"></i>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 mt-2">
                  <div className="mb-4 p-3 bg-amber-50/60 rounded-xl border border-amber-100 text-[11px] text-amber-900 flex items-start gap-2">
                    <i className="ri-user-heart-line text-amber-600 mt-0.5 shrink-0"></i>
                    <span><strong>Recommended For:</strong> {policy.recommendedFor}</span>
                  </div>

                  <Link
                    href={`/calculator?scheme=${policy.scheme.toLowerCase()}&policy=${policy.calculatorPolicyId.toLowerCase().replace('_', '-')}`}
                    className="w-full py-3 px-4 rounded-xl bg-linear-to-r from-(--primary-red) to-[#961b2d] hover:from-[#b01c2f] hover:to-[#7e1625] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98">
                    <i className="ri-calculator-line text-sm"></i>
                    Calculate Instant Quote
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </PageTransition>
  );
}
