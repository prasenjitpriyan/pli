'use client';

import GooeyInput from '@/components/common/GooeyInput';
import PageTransition from '@/components/common/PageTransition';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface FaqItem {
  id: string;
  category:
    | 'Eligibility'
    | 'Bonus & Returns'
    | 'Claims & Maturity'
    | 'Loan & Surrender'
    | 'Tax Benefits'
    | 'Premium & Payments';
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  // Eligibility
  {
    id: 'eligibility-1',
    category: 'Eligibility',
    question: 'Who is eligible to purchase a Postal Life Insurance (PLI) policy?',
    answer:
      'PLI is open to employees of Central & State Governments, Defence & Paramilitary personnel, PSUs, Nationalized & Scheduled Commercial Banks, Reserve Bank of India, Local Bodies, Educational Institutions recognized by Govt/AICTE/UGC, as well as qualified professionals like Doctors, Engineers, Chartered Accountants, MBAs, and Advocates.',
  },
  {
    id: 'eligibility-2',
    category: 'Eligibility',
    question: 'Who is eligible for Rural Postal Life Insurance (RPLI)?',
    answer:
      'RPLI is open to all permanent residents of rural areas in India. There are no professional or educational constraints for RPLI, making it universally accessible for farmers, rural workers, artisans, and self-employed rural individuals.',
  },
  {
    id: 'eligibility-3',
    category: 'Eligibility',
    question: 'What is the minimum and maximum entry age for PLI and RPLI policies?',
    answer:
      'For standard policies (Whole Life & Endowment), the minimum entry age is 19 years (on next birthday) and the maximum entry age is 55 years. For Bal Jeevan Bima (Children policy), the child age must be between 5 and 20 years, with parent age under 45.',
  },

  // Bonus & Returns
  {
    id: 'bonus-1',
    category: 'Bonus & Returns',
    question: 'Why does Postal Life Insurance offer the highest bonus rates in India?',
    answer:
      'India Post incurs significantly lower operational, distribution, and agent acquisition overheads compared to commercial insurers. These operational savings are channeled back to policyholders in the form of declared simple reversionary bonuses (up to ₹76/₹1,000 SA for Whole Life PLI and ₹65/₹1,000 SA for RPLI).',
  },
  {
    id: 'bonus-2',
    category: 'Bonus & Returns',
    question: 'Are PLI and RPLI returns protected by a Sovereign Guarantee?',
    answer:
      'Yes, 100%. All investments and claims in PLI and RPLI are backed directly by the Consolidated Fund of India under the Government of India Sovereign Guarantee. There is zero risk of commercial default.',
  },
  {
    id: 'bonus-3',
    category: 'Bonus & Returns',
    question: 'Is GST applicable on PLI / RPLI premium payments?',
    answer:
      'No. PLI and RPLI policies enjoy a complete 0% GST exemption on premiums as per Government of India statutory notifications, unlike commercial private insurance policies which incur up to 18% GST.',
  },

  // Claims & Maturity
  {
    id: 'claims-1',
    category: 'Claims & Maturity',
    question: 'What is the process to claim policy maturity?',
    answer:
      'Policyholders receive a maturity intimation notice 2 months prior to the maturity date. To claim, submit the Original Policy Bond, Premium Receipt Book / Proof of last premium payment, Maturity Claim Form, and Cancelled Cheque / Bank Passbook copy at any Post Office / CPC across India.',
  },
  {
    id: 'claims-2',
    category: 'Claims & Maturity',
    question: 'How are death claims settled and within what timeframe?',
    answer:
      'Nominees must submit the Death Certificate, Original Policy Document, Claim Form, and KYC documents at the nearest Head Post Office. As per Citizen Charter guidelines, non-investigation death claims are settled within 15 to 30 working days directly into the nominee’s bank account via NEFT/RTGS.',
  },

  // Loan & Surrender
  {
    id: 'loan-1',
    category: 'Loan & Surrender',
    question: 'Can I take a loan against my PLI / RPLI policy?',
    answer:
      'Yes. Policy loan facilities are available after 3 years for Endowment Assurance (Santosh / Gram Santosh) and after 4 years for Whole Life Assurance (Suraksha / Gram Suraksha). Loans are granted at highly competitive interest rates (currently 10% p.a. calculated half-yearly).',
  },
  {
    id: 'loan-2',
    category: 'Loan & Surrender',
    question: 'Can I surrender my policy if I cannot continue paying premiums?',
    answer:
      'Policies can be surrendered after 36 months (3 years) of continuous premium payments. However, surrendering before maturity results in proportionate loss of full bonus benefits. Policyholders can alternatively opt to convert the policy into a Paid-Up policy to preserve value without ongoing premium obligations.',
  },

  // Tax Benefits
  {
    id: 'tax-1',
    category: 'Tax Benefits',
    question: 'What tax deductions are available for PLI / RPLI premiums?',
    answer:
      'Premiums paid towards PLI and RPLI qualify for tax deductions under Section 80C of the Income Tax Act, 1961, up to the maximum permissible threshold of ₹1,50,000 per financial year under the Old Tax Regime.',
  },
  {
    id: 'tax-2',
    category: 'Tax Benefits',
    question: 'Is the maturity amount received from PLI / RPLI taxable?',
    answer:
      'No. The lump-sum maturity proceeds and accrued bonus received are completely tax-free under Section 10(10D) of the Income Tax Act, subject to standard conditions (annual premium not exceeding 10% of the Sum Assured).',
  },

  // Premium & Payments
  {
    id: 'payments-1',
    category: 'Premium & Payments',
    question: 'What are the available modes of premium payment?',
    answer:
      'Premiums can be paid Monthly, Quarterly, Half-Yearly, or Annually. Payments can be deposited in cash/cheque at any of the 150,000+ Post Offices across India, deducted via direct salary deduction (for Govt employees), or paid online via the India Post Customer Portal using Net Banking, Debit Cards, and UPI.',
  },
  {
    id: 'payments-2',
    category: 'Premium & Payments',
    question: 'What is the grace period for premium payments?',
    answer:
      'A grace period of up to the last working day of the calendar month is provided for monthly payment frequencies. If premiums are paid quarterly, half-yearly, or annually, the grace period extends up to the end of the respective calendar month.',
  },
];

const CATEGORIES = [
  'All',
  'Eligibility',
  'Bonus & Returns',
  'Claims & Maturity',
  'Loan & Surrender',
  'Tax Benefits',
  'Premium & Payments',
] as const;

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'eligibility-1': true,
    'bonus-1': true,
  });

  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <PageTransition className="min-h-screen bg-(--bg-light) pb-24">
      {/* Hero Header with Gooey Search Input */}
      <section className="bg-linear-to-r from-(--primary-dark) via-[#242f42] to-(--primary-dark) text-white py-16 px-6 relative overflow-hidden">
        <div className="container-custom text-center max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-(--accent-gold) text-xs font-bold uppercase tracking-wider border border-white/10">
            <i className="ri-questionnaire-fill"></i>
            Postal Life Insurance Helpdesk
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Find verified answers on PLI and RPLI eligibility, bonus rates, sovereign guarantee,
            claims settlement, tax benefits under 80C & 10(10D), and online portals.
          </p>

          {/* Aceternity Gooey Search Input */}
          <div className="pt-6">
            <GooeyInput
              value={searchQuery}
              onChange={setSearchQuery}
              resultCount={filteredFaqs.length}
              placeholder="Search topics (e.g. loan, bonus rates, surrender, 80C, claims)..."
              suggestions={[
                'Loan Terms',
                'Bonus Rates',
                'Section 80C',
                'Maturity Claim',
                '0% GST',
                'Surrender Policy',
              ]}
              onSelectSuggestion={(suggestion) => setSearchQuery(suggestion)}
            />
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="sticky top-18 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-6">
        <div className="container-custom overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-(--primary-red) text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:text-(--primary-dark) hover:bg-slate-200'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="container-custom py-12 px-6 max-w-4xl mx-auto">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-3xl text-slate-400 mb-4">
              <i className="ri-search-eye-line"></i>
            </div>
            <h3 className="text-lg font-bold text-(--primary-dark)">
              No matching answers found
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Try searching with different terms or contact our helpline directly.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-full text-(--primary-dark) cursor-pointer">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-(--accent-gold)/80 transition-all overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-(--primary-red) bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                        {faq.category}
                      </span>
                      <h2 className="text-sm md:text-base font-bold text-(--primary-dark) mt-1">
                        {faq.question}
                      </h2>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-(--primary-red) text-white' : ''
                      }`}>
                      <i className="ri-arrow-down-s-line text-lg"></i>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 md:px-6 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Still Have Questions CTA */}
        <div className="mt-12 bg-linear-to-br from-amber-50 to-orange-50/60 border border-amber-200 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-(--primary-dark) flex items-center justify-center md:justify-start gap-2">
              <i className="ri-customer-service-2-fill text-(--primary-red)"></i>
              Still have specific questions?
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              Speak with an authorized Postal Life Insurance officer or calculate custom quotes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-(--primary-red) hover:bg-[#b01c2f] text-white font-bold text-xs shadow-md transition-all">
              Contact Helpdesk
            </Link>
            <Link
              href="/calculator"
              className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-(--primary-dark) border border-slate-300 font-bold text-xs transition-all">
              Calculate Quote
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
