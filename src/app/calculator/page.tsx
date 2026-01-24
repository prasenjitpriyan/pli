'use client';

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

    // Bonus Rate Lookup
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

    // Terminal Bonus
    let terminalBonus = 0;
    if (
      (policyType === 'EA' || policyType === 'WLA' || policyType === 'CWLA') &&
      term >= 20
    ) {
      terminalBonus = Math.min((sumAssured / 10000) * 20, 1000);
    }

    // Premium Interpolation
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
        // Recursive call for EA base, then scale
        // We need to implement EA logic here directly or recursively.
        // Let's copy EA logic for simplicity to avoid recursion issues if structure changes
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

    // Rebate
    let monthlyRebate = 0;
    if (sumAssured >= 20000) {
      monthlyRebate = Math.floor(sumAssured / 20000);
    }

    const netMonthlyPremium = grossMonthlyPremium - monthlyRebate;
    const finalPremium = netMonthlyPremium; // GST 0

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
    <main>
      <section className="hero bg-gradient-to-br from-[var(--primary-red)] via-[#a82333] to-[var(--primary-dark)] text-white py-16 px-8 text-center min-h-[40vh] flex flex-col justify-center">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Calculator
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-[var(--accent-gold)] mb-2">
            Plan Your Future
          </p>
          <p className="text-lg opacity-95">
            Estimate your premiums and returns instantly with our easy-to-use
            calculator w.e.f. April 2024 rates.
          </p>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="container-custom">
          <div className="max-w-[600px] mx-auto">
            <form
              onSubmit={handleCalculate}
              className="bg-white p-10 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
              <h2 className="text-3xl text-[var(--primary-red)] mb-6 text-center relative after:content-[''] after:block after:w-20 after:h-1 after:bg-[var(--accent-gold)] after:mx-auto after:mt-2">
                Calculate Your Premium
              </h2>

              <div className="mb-6">
                <label className="block font-semibold mb-2 text-[var(--primary-dark)]">
                  Policy Type
                </label>
                <select
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary-red)] focus:ring-1 focus:ring-[var(--primary-red)] outline-none"
                  value={formData.policyType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      policyType: e.target.value as PolicyType,
                    })
                  }>
                  <option value="" disabled>
                    Select a Policy
                  </option>
                  <option value="WLA">Whole Life Assurance (Suraksha)</option>
                  <option value="EA">Endowment Assurance (Santosh)</option>
                  <option value="CWLA">Convertible Whole Life (Suvidha)</option>
                  <option value="AEA">Anticipated Endowment (Sumangal)</option>
                  <option value="JLEA">Joint Life (Yugal Suraksha)</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2 text-[var(--primary-dark)]">
                  Age (Next Birthday)
                </label>
                <input
                  type="number"
                  min="19"
                  max="55"
                  required
                  placeholder="e.g., 30"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary-red)] focus:ring-1 focus:ring-[var(--primary-red)] outline-none"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2 text-[var(--primary-dark)]">
                  Policy Term (Years)
                </label>
                <input
                  type="number"
                  min="5"
                  max="40"
                  required
                  placeholder="e.g., 20"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary-red)] focus:ring-1 focus:ring-[var(--primary-red)] outline-none"
                  value={formData.term}
                  onChange={(e) =>
                    setFormData({ ...formData, term: e.target.value })
                  }
                />
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2 text-[var(--primary-dark)]">
                  Sum Assured (₹)
                </label>
                <input
                  type="number"
                  min="20000"
                  step="10000"
                  required
                  placeholder="e.g., 500000"
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary-red)] focus:ring-1 focus:ring-[var(--primary-red)] outline-none"
                  value={formData.sumAssured}
                  onChange={(e) =>
                    setFormData({ ...formData, sumAssured: e.target.value })
                  }
                />
                <small className="text-gray-500 text-sm mt-1 block">
                  Min: ₹20,000 | Max: ₹50 Lakhs
                </small>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--accent-gold)] text-[var(--primary-dark)] py-4 rounded-lg font-bold text-lg hover:-translate-y-0.5 hover:shadow-lg transition-all">
                Calculate Premium
              </button>
            </form>

            {result && (
              <div className="bg-gradient-to-br from-[var(--primary-dark)] to-[#2c3e50] text-white p-8 rounded-xl mt-8 shadow-2xl animate-[slideUp_0.5s_ease-out]">
                <h3 className="text-[var(--accent-gold)] border-b border-white/10 pb-4 mb-6 text-xl font-bold">
                  Estimated Premium
                </h3>

                <div className="flex justify-between items-center mb-4 text-lg">
                  <span>Monthly Premium:</span>
                  <span className="font-bold text-2xl">
                    ₹{Math.ceil(result.monthlyPremium).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4 text-lg">
                  <span>Yearly Premium:</span>
                  <span className="font-bold text-2xl">
                    ₹{Math.ceil(result.yearlyPremium).toLocaleString()}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-white/20 text-sm text-[#ccc]">
                  <div className="flex justify-between mb-2">
                    <span>Gross Monthly:</span>{' '}
                    <span>₹{result.grossMonthlyPremium}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Rebate:</span>{' '}
                    <span className="text-green-400">
                      -₹{result.monthlyRebate}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Total Bonus:</span>{' '}
                    <span className="text-[var(--accent-gold)]">
                      +₹{result.totalBonus.toLocaleString()}
                    </span>
                  </div>
                  {result.terminalBonus > 0 && (
                    <div className="flex justify-between mb-2">
                      <span>Terminal Bonus:</span>{' '}
                      <span className="text-[#fea47f]">
                        +₹{result.terminalBonus.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-white/10 p-6 rounded-lg mt-6 text-center">
                  <h4 className="text-sm uppercase tracking-wider opacity-90 mb-2">
                    Estimated Maturity Benefit
                  </h4>
                  <p className="text-4xl font-bold text-[var(--accent-gold)] my-2">
                    ₹{result.maturityAmount.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-70 italic">
                    * Includes estimated bonus based on current rates.
                  </p>
                </div>

                <div className="mt-6 text-sm opacity-80 flex gap-2">
                  <i className="ri-information-line"></i>
                  <p>
                    Note: These are indicative figures. Actual premium may vary
                    slightly based on rebates and taxes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
