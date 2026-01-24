'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const scrollObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Scroll Animation similar to script.js
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    scrollObserver.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation =
            'fadeIn 0.6s ease-in-out forwards';
          (entry.target as HTMLElement).style.opacity = '1';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = '0'; // Initial state
      scrollObserver.current?.observe(el);
    });

    return () => {
      scrollObserver.current?.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero bg-gradient-to-br from-[var(--primary-red)] via-[#a82333] to-[var(--primary-dark)] text-white py-32 px-8 text-center">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">
            Postal Life Insurance
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-[var(--accent-gold)] mb-2">
            Insuring Lives, Assuring Happiness Since 1884
          </p>
          <p className="text-xl opacity-95 mb-8 leading-relaxed max-w-3xl mx-auto">
            India&apos;s Oldest Life Insurer | Sovereign Guarantee | High Bonus
            | Low Premium
            <br />
            <strong>Guaranteed by President of India</strong>
          </p>
          <button
            onClick={() => scrollToSection('about')}
            className="inline-block bg-[var(--accent-gold)] text-[var(--primary-dark)] py-4 px-10 rounded-full font-bold text-lg hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(212,175,55,0.4)] transition-all cursor-pointer">
            Learn More
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-8" id="about">
        <div className="container-custom">
          <h2 className="section-title">About Postal Life Insurance</h2>
          <div className="mt-12 animate-on-scroll">
            <p className="text-[1.1rem] text-[var(--text-light)] leading-loose mb-6">
              Postal Life Insurance (PLI), introduced in 1884, is the oldest
              life insurance scheme in India. Backed by the Government of India,
              PLI offers a unique combination of financial security, attractive
              bonuses, and affordable premiums, making it one of the most
              reliable insurance products in the country.
            </p>
            <div className="bg-[var(--accent-gold)] text-white p-8 rounded-xl mt-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-2 text-white mt-0">
                Key Highlight: GST-Free Premiums (Effective 22.09.2025)
              </h3>
              <p className="mb-0 text-white">
                No GST is applicable on PLI premiums, making PLI policies even
                more economical compared to other life insurance products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose PLI */}
      <section className="py-16 md:py-24 px-8 bg-[var(--bg-light)]" id="why">
        <div className="container-custom">
          <h2 className="section-title">Why Choose Postal Life Insurance?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: '🛡️ Sovereign Guarantee',
                desc: "All PLI policies are fully backed by the Government of India, ensuring complete safety of policyholders' funds.",
              },
              {
                title: '💰 Low Premium, High Bonus',
                desc: 'Operated through the extensive postal network with minimal administrative costs, allowing higher benefits to customers.',
              },
              {
                title: '📈 Consistently High Bonus',
                desc: 'PLI regularly declares bonus rates that are higher than many commercial life insurers.',
              },
              {
                title: '💳 Tax Benefits',
                desc: 'Premiums eligible for deduction under Section 80C. Maturity & death benefits tax-free under Section 10(10D).',
              },
              {
                title: '🆓 GST-Free Premiums',
                desc: 'No GST applicable on PLI premiums since 22.09.2025, making it more economical than other insurers.',
              },
              {
                title: '🎯 Systematic Investment',
                desc: 'Small investments towards big goals without any risk. Transparent and reliable returns.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="feature-card bg-white p-8 rounded-xl shadow-md border-l-4 border-[var(--primary-red)] hover:-translate-y-2 hover:shadow-xl transition-all animate-on-scroll">
                <h3 className="text-xl font-bold text-[var(--primary-red)] mb-4">
                  {item.title}
                </h3>
                <p className="text-[var(--text-light)] text-[0.95rem]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 md:py-24 px-8 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Who Is Eligible for PLI?</h2>
          <p className="text-center text-[var(--text-light)] mb-8">
            PLI coverage is available to a wide range of employees and
            professionals
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              {
                title: 'Government & Public Sector',
                items: [
                  'Central & State Government employees',
                  'Defence and Paramilitary Forces',
                  'Local Bodies and Autonomous Bodies',
                  'Nationalized & Commercial Banks',
                  'Reserve Bank of India',
                  'Public Sector Undertakings (PSUs)',
                ],
              },
              {
                title: 'Institutions',
                items: [
                  'Government-aided Educational Institutions',
                  'AICTE/CBSE Accredited Institutions',
                  'Recognized Educational Bodies',
                ],
              },
              {
                title: 'Private Sector (Listed Companies)',
                items: [
                  'NSE/BSE Listed Companies',
                  'IT, Banking, Pharma, Energy',
                  'Manufacturing & Other Sectors',
                ],
              },
              {
                title: 'Professionals',
                items: [
                  'Doctors, Engineers, CAs',
                  'Company Secretaries',
                  'Architects, Lawyers, Journalists',
                  'Bankers, Management Consultants',
                  'Nurses, Paramedical Staff',
                  'ITI/AMIE/Graduate/Diploma Holders',
                ],
              },
            ].map((category, idx) => (
              <div
                key={idx}
                className="bg-[var(--bg-light)] p-6 rounded-lg border-t-[3px] border-[var(--primary-red)] animate-on-scroll">
                <h4 className="text-[var(--primary-red)] font-bold mb-4 text-lg">
                  {category.title}
                </h4>
                <ul className="list-none pl-0">
                  {category.items.map((item, i) => (
                    <li
                      key={i}
                      className="py-2 pl-6 relative text-[var(--text-light)] text-sm">
                      <span className="absolute left-0 text-[var(--primary-red)] font-bold">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        className="py-16 md:py-24 px-8 bg-[var(--bg-light)]"
        id="products">
        <div className="container-custom">
          <h2 className="section-title">Our Product Suite</h2>

          <div className="bg-white p-8 rounded-xl mt-8 mb-8 shadow-md border-l-4 border-[var(--accent-gold)] animate-on-scroll">
            <h3 className="text-[var(--primary-red)] mb-4 font-bold text-xl">
              Sum Assured Limits
            </h3>
            <p className="my-2">
              <strong>Minimum:</strong> ₹20,000
            </p>
            <p className="my-2">
              <strong>Maximum:</strong> ₹50,00,000 (including existing PLI/RPLI
              policies)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[
              {
                title: 'Suraksha',
                sub: 'Whole Life Assurance (WLA)',
                features: [
                  'Lifelong protection with wealth creation',
                  'Premium payable for limited period',
                  'Matures at age 80 or on death',
                  'High bonus earning potential',
                  'Loan facility after 4 years',
                ],
              },
              {
                title: 'Santosh',
                sub: 'Endowment Assurance (EA)',
                features: [
                  'Ideal for retirement and planned savings',
                  'Lump sum of Sum Assured + Bonus at maturity',
                  'Loan available after 3 years',
                  'Policy with profit',
                  'Guaranteed returns on maturity',
                ],
              },
              {
                title: 'Suvidha',
                sub: 'Convertible Whole Life (CWLA)',
                features: [
                  'Suitable for young earners',
                  'Lower initial premium',
                  'Convert to Endowment after 5 years',
                  'Loan admissible on conditions',
                  'Rising income flexibility',
                ],
              },
              {
                title: 'Sumangal',
                sub: 'Anticipated Endowment (AEA)',
                features: [
                  'Money-back policy with periodic payouts',
                  'Interim survival benefits during term',
                  'Full Sum Assured on death (anytime)',
                  'No loan or surrender facility',
                  'Regular income stream',
                ],
              },
              {
                title: 'Yugal Suraksha',
                sub: 'Joint Life Endowment (JLEA)',
                features: [
                  'Joint coverage for spouses',
                  'Single policy premium',
                  'Payable on first death or maturity',
                  'Loan available after 3 years',
                  'Combined security for couples',
                ],
              },
              {
                title: 'Bal Jeevan Bima',
                sub: 'Children Policy',
                features: [
                  'Financial security for children',
                  'Coverage up to 2 children',
                  'Premium waiver on parent&apos;s death',
                  'Educational funds assistance',
                  'Future-proof investment',
                ],
              },
            ].map((prod, idx) => (
              <div
                key={idx}
                className="product-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all animate-on-scroll">
                <div className="bg-gradient-to-br from-[var(--primary-red)] to-[#a82333] text-white p-6">
                  <h3 className="text-xl font-bold m-0">{prod.title}</h3>
                  <p className="m-0 mt-2 opacity-90 text-sm">{prod.sub}</p>
                </div>
                <div className="p-8">
                  <ul className="list-none p-0">
                    {prod.features.map((feat, i) => (
                      <li
                        key={i}
                        className="py-2 pl-6 relative text-[var(--text-light)] text-[0.95rem]">
                        <span className="absolute left-0 text-[var(--primary-red)] font-bold">
                          →
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Eligibility */}
      <section className="py-16 md:py-24 px-8 bg-[var(--bg-light)]">
        <div className="container-custom">
          <h2 className="section-title">Age Eligibility (At Next Birthday)</h2>
          <div className="overflow-x-auto mt-6 rounded-lg shadow-sm animate-on-scroll bg-white">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  <th className="bg-gradient-to-br from-[var(--primary-red)] to-[#a82333] text-white p-5 text-left font-semibold">
                    Policy Type
                  </th>
                  <th className="bg-gradient-to-br from-[var(--primary-red)] to-[#a82333] text-white p-5 text-left font-semibold">
                    Eligible Age Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Endowment Assurance (EA)', '19 – 55 years'],
                  ['Convertible Whole Life (CWLA)', '19 – 50 years'],
                  ['Whole Life Assurance (WLA)', '19 – 55 years'],
                  ['20-Year AEA (Sumangal)', '18 – 40 years'],
                  ['15-Year AEA (Sumangal)', '18 – 45 years'],
                  ['Yugal Suraksha (JLEA)', '21 – 45 years'],
                  ['Children Policy (Bal Jeevan Bima)', '05 – 20 years'],
                ].map(([type, range], i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 pl-6 text-[var(--text-light)]">
                      {type}
                    </td>
                    <td className="p-4 pl-6 text-[var(--text-light)]">
                      {range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bonus Rates */}
      <section className="py-16 md:py-24 px-8 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Current Bonus Rates</h2>
          <p className="text-center text-[var(--text-light)] mb-8">
            Declared by Government of India
          </p>
          <div className="overflow-x-auto mt-8 rounded-lg shadow-md animate-on-scroll">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  <th className="bg-gradient-to-br from-[var(--primary-red)] to-[#a82333] text-white p-5 text-left font-semibold">
                    Policy Type
                  </th>
                  <th className="bg-gradient-to-br from-[var(--primary-red)] to-[#a82333] text-white p-5 text-left font-semibold">
                    Bonus Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    'Whole Life Assurance (Suraksha)',
                    '₹76 per ₹1,000 Sum Assured',
                  ],
                  [
                    'Endowment Assurance (Santosh)',
                    '₹52 per ₹1,000 Sum Assured',
                  ],
                  [
                    'Anticipated Endowment (Sumangal)',
                    '₹48 per ₹1,000 Sum Assured',
                  ],
                ].map(([type, rate], i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-[var(--text-light)]">
                      {type}
                    </td>
                    <td className="p-4 pl-6 font-bold text-[var(--text-light)]">
                      {rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Facilities */}
      <section className="py-16 md:py-24 px-8 bg-[var(--bg-light)]">
        <div className="container-custom">
          <h2 className="section-title">Key Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: '💳',
                title: 'Digital Payments',
                desc: 'Online premium payment through UPI, Debit Card, Credit Card, and Net Banking.',
              },
              {
                icon: '💸',
                title: 'Loan Facility',
                desc: 'Available at 10% interest with half-yearly compounding on eligible policies.',
              },
              {
                icon: '🌍',
                title: 'Portability',
                desc: 'Policy portability across India. Claim maturity benefits from anywhere in the country.',
              },
              {
                icon: '♻️',
                title: 'Policy Revival',
                desc: 'Revival of lapsed policies permitted up to two times. Flexible terms available.',
              },
              {
                icon: '📋',
                title: 'Nomination Services',
                desc: 'Nomination and assignment facilities with unlimited changes allowed as needed.',
              },
              {
                icon: '⚡',
                title: 'Quick Settlement',
                desc: 'Maturity and death claims settled promptly, generally within 30 days of submission.',
              },
            ].map((fac, i) => (
              <div
                key={i}
                className="feature-card bg-white p-8 rounded-xl shadow-md border-l-4 border-[var(--primary-red)] hover:-translate-y-2 hover:shadow-xl transition-all animate-on-scroll">
                <h3 className="text-xl font-bold text-[var(--primary-red)] mb-4 flex items-center gap-2">
                  <span>{fac.icon}</span> {fac.title}
                </h3>
                <p className="text-[var(--text-light)] text-[0.95rem]">
                  {fac.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 md:py-24 px-8 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Documents Required for New Policy</h2>
          <div className="max-w-[700px] mx-auto mt-12 animate-on-scroll">
            <div className="bg-white border-l-4 border-[var(--primary-red)] p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <ul className="list-none p-0">
                {[
                  'Duly filled proposal form',
                  'Proof of age (Birth Certificate, Passport, Driving License)',
                  'Identity & address proof (PAN Card, Aadhar, Voter ID)',
                  'Income proof (Salary slips, IT returns, bank statements)',
                  'Medical reports (where applicable for higher sum assured)',
                ].map((doc, i) => (
                  <li
                    key={i}
                    className="py-3 pl-8 relative text-[var(--text-light)]">
                    <span className="absolute left-0 text-[var(--primary-red)] font-bold">
                      ✓
                    </span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-16 md:py-24 px-8 bg-[var(--bg-light)] text-center"
        id="contact">
        <div className="container-custom">
          <h2 className="section-title">Contact & Assistance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-md animate-on-scroll">
              <h4 className="text-[var(--primary-red)] mb-4 text-xl font-bold">
                📱 Toll-Free Helpline
              </h4>
              <a
                href="tel:1800266686"
                className="text-[var(--primary-red)] font-bold text-lg hover:underline">
                1800 266 6868
              </a>
              <p className="mt-4 text-[var(--text-light)] text-sm">
                Available 24/7 for assistance
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md animate-on-scroll">
              <h4 className="text-[var(--primary-red)] mb-4 text-xl font-bold">
                🌐 Official Website
              </h4>
              <a
                href="https://pli.indiapost.gov.in"
                target="_blank"
                className="text-[var(--primary-red)] font-bold text-lg hover:underline">
                pli.indiapost.gov.in
              </a>
              <p className="mt-4 text-[var(--text-light)] text-sm">
                For policy information and updates
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md animate-on-scroll">
              <h4 className="text-[var(--primary-red)] mb-4 text-xl font-bold">
                🏤 Visit Us
              </h4>
              <p className="m-0 text-[var(--text-light)]">
                Nearest Head Post Office or Sub Post Office
              </p>
              <p className="mt-4 text-[var(--text-light)] text-sm">
                Available across India
              </p>
            </div>
          </div>

          <div className="bg-[var(--accent-gold)] text-white p-8 rounded-xl mt-12 shadow-md animate-on-scroll">
            <h3 className="text-white text-2xl font-bold mt-0 mb-2">
              For Rural Areas
            </h3>
            <p className="text-white mb-0">
              Rural Postal Life Insurance (RPLI) offers similar benefits with a
              maximum Sum Assured of ₹10 Lakhs, tailored for rural residents.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
