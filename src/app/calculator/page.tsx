'use client';

import Link from 'next/link';
import { useState } from 'react';

type PolicyType = 'WLA' | 'EA' | 'CWLA' | 'AEA' | 'JLEA' | '';

interface Result {
  monthlyPremium: number;
  yearlyPremium: number;
  maturityAmount: number;
  grossMonthlyPremium: number;
  monthlyRebate: number;
  totalBonus: number;
  terminalBonus: number;
}

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    policyType: '' as PolicyType,
    age: '',
    term: '',
    sumAssured: '',
  });

  const [result, setResult] = useState<Result | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseInt(formData.age);
    const term = parseInt(formData.term);
    const sumAssured = parseInt(formData.sumAssured);
    const policyType = formData.policyType;

    if (!age || !term || !sumAssured || !policyType) return;
    if (sumAssured % 1000 !== 0) {
      alert('Sum Assured must be in multiples of ₹1,000');
      return;
    }

    // --- LOGIC PORTED FROM calculator.js ---
    let bonusRate = 0;
    switch (policyType) {
      case 'WLA':
        bonusRate = 76;
        break;
      case 'EA':
        bonusRate = 52;
        break;
      case 'CWLA':
        bonusRate = 76;
        break;
      case 'AEA':
        bonusRate = 48;
        break;
      case 'JLEA':
        bonusRate = 52;
        break;
      default:
        bonusRate = 52;
    }

    const bonusUnits = sumAssured / 1000;
    const annualBonus = bonusUnits * bonusRate;
    const totalBonus = annualBonus * term;

    let terminalBonus = 0;
    if (
      (policyType === 'EA' || policyType === 'WLA' || policyType === 'CWLA') &&
      term >= 20
    ) {
      terminalBonus = Math.min((sumAssured / 10000) * 20, 1000);
    }

    const getMonthlyPremiumFor1Lakh = (type: string, t: number) => {
      const interpolate = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x: number
      ) => {
        return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
      };

      if (type === 'EA' || type === 'JLEA') {
        if (t <= 5) return 1720;
        if (t <= 10) return interpolate(5, 1720, 10, 835, t);
        if (t <= 20) return interpolate(10, 835, 20, 395, t);
        return interpolate(20, 395, 30, 255, t);
      }
      if (type === 'AEA') {
        if (t <= 15) return 655;
        return 495;
      }
      if (type === 'CWLA' || type === 'WLA') {
        let eaPrem = 0;
        if (t <= 5) eaPrem = 1720;
        else if (t <= 10) eaPrem = interpolate(5, 1720, 10, 835, t);
        else if (t <= 20) eaPrem = interpolate(10, 835, 20, 395, t);
        else eaPrem = interpolate(20, 395, 30, 255, t);
        return eaPrem * 0.76;
      }
      return 0;
    };

    const basePrem1Lakh = getMonthlyPremiumFor1Lakh(policyType, term);
    const saFactor = sumAssured / 100000;
    const grossMonthlyPremium = Math.ceil(basePrem1Lakh * saFactor);

    let monthlyRebate = 0;
    if (sumAssured >= 20000) {
      monthlyRebate = Math.floor(sumAssured / 20000);
    }

    const netMonthlyPremium = grossMonthlyPremium - monthlyRebate;
    const finalPremium = netMonthlyPremium;

    const maturityAmount = sumAssured + totalBonus + terminalBonus;

    setResult({
      monthlyPremium: finalPremium,
      yearlyPremium: finalPremium * 12,
      maturityAmount,
      grossMonthlyPremium,
      monthlyRebate,
      totalBonus,
      terminalBonus,
    });
  };

  return (
    <main className="min-h-screen bg-[var(--bg-light)]">
      {/* Header */}
      <section className="bg-[var(--primary-dark)] text-white py-12 px-6">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Premium Calculator</h1>
            <p className="opacity-80">
              Plan your financial future with accuracy
            </p>
          </div>
          <Link
            href="/"
            className="text-[var(--accent-gold)] hover:text-white transition-colors mt-4 md:mt-0 font-medium">
            <i className="ri-arrow-left-line mr-2"></i> Back to Home
          </Link>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[var(--primary-red)] text-white flex items-center justify-center text-sm">
                    1
                  </span>
                  Enter Details
                </h2>
                <form onSubmit={handleCalculate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
                        Policy Type
                      </label>
                      <select
                        required
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[var(--primary-red)] focus:ring-2 focus:ring-[var(--primary-red)]/10 outline-none transition-all"
                        value={formData.policyType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            policyType: e.target.value as PolicyType,
                          })
                        }>
                        <option value="">Select Policy</option>
                        <option value="WLA">
                          Whole Life Assurance (Suraksha)
                        </option>
                        <option value="EA">
                          Endowment Assurance (Santosh)
                        </option>
                        <option value="CWLA">
                          Convertible Whole Life (Suvidha)
                        </option>
                        <option value="AEA">
                          Anticipated Endowment (Sumangal)
                        </option>
                        <option value="JLEA">
                          Joint Life (Yugal Suraksha)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
                        My Age
                      </label>
                      <input
                        type="number"
                        min="19"
                        max="55"
                        required
                        placeholder="Years"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[var(--primary-red)] focus:ring-2 focus:ring-[var(--primary-red)]/10 outline-none transition-all"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
                        Policy Term
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="40"
                        required
                        placeholder="Years"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[var(--primary-red)] focus:ring-2 focus:ring-[var(--primary-red)]/10 outline-none transition-all"
                        value={formData.term}
                        onChange={(e) =>
                          setFormData({ ...formData, term: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--text-dark)] mb-2">
                        Sum Assured (₹)
                      </label>
                      <input
                        type="number"
                        min="20000"
                        step="10000"
                        required
                        placeholder="Min ₹20,000"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[var(--primary-red)] focus:ring-2 focus:ring-[var(--primary-red)]/10 outline-none transition-all"
                        value={formData.sumAssured}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sumAssured: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full md:w-auto md:min-w-[200px] bg-[var(--primary-red)] text-white py-4 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all">
                      Calculate Quote
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Result Section */}
            <div className="lg:col-span-5">
              {result ? (
                <div className="bg-white rounded-2xl shadow-[var(--shadow-card-hover)] overflow-hidden animate-[fadeIn_0.5s_ease-out]">
                  <div className="bg-[var(--primary-dark)] text-white p-6">
                    <h3 className="text-lg font-medium opacity-90">
                      Estimated Premium
                    </h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-bold">
                        ₹{Math.ceil(result.monthlyPremium).toLocaleString()}
                      </span>
                      <span className="text-sm">/ month</span>
                    </div>
                    <p className="text-sm mt-1 opacity-70">
                      ₹{Math.ceil(result.yearlyPremium).toLocaleString()} / year
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                        <span className="text-[var(--text-light)]">
                          Gross Monthly
                        </span>
                        <span className="font-medium">
                          ₹{result.grossMonthlyPremium}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                        <span className="text-[var(--text-light)]">
                          Rebate Benefit
                        </span>
                        <span className="font-medium text-green-600">
                          -₹{result.monthlyRebate}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm py-2 border-b border-gray-100 bg-orange-50/50 -mx-6 px-6">
                        <span className="text-[var(--text-dark)] font-semibold">
                          Total Bonus
                        </span>
                        <span className="font-bold text-[var(--primary-red)]">
                          +₹{result.totalBonus.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[var(--bg-light)] p-5 rounded-xl text-center border border-[var(--accent-gold)]/20">
                      <p className="text-sm text-[var(--text-light)] uppercase tracking-wider font-semibold mb-2">
                        Maturity Benefit
                      </p>
                      <p className="text-3xl font-bold text-[var(--accent-gold)]">
                        ₹{result.maturityAmount.toLocaleString()}
                      </p>
                    </div>

                    <p className="text-xs text-center text-gray-400 mt-6 mt-4">
                      * Indicative figures. Actual returns may vary slightly.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full bg-white/50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400 text-2xl">
                    <i className="ri-calculator-line"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-light)]">
                    No Calculation Yet
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 max-w-[200px]">
                    Fill in the details to see your premium and returns.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
