'use client';

import { useState } from 'react';
import PageTransition from '@/components/common/PageTransition';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    schemeInterest: 'PLI',
    estimatedSA: '1000000',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <PageTransition className="min-h-screen bg-(--bg-light) pb-24">
      {/* Hero Header */}
      <section className="bg-linear-to-r from-(--primary-dark) via-[#242f42] to-(--primary-dark) text-white py-16 px-6 relative overflow-hidden">
        <div className="container-custom text-center max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-(--accent-gold) text-xs font-bold uppercase tracking-wider border border-white/10">
            <i className="ri-customer-service-2-fill"></i>
            Government of India Postal Network
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Contact & Support Center
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Connect with our authorized Postal Life Insurance division officers, schedule policy consultations, or track grievance redressal.
          </p>
        </div>
      </section>

      {/* Main Grid: Info Cards + Form */}
      <section className="container-custom py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Contacts & Office Locator */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Office Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-(--primary-red) text-white flex items-center justify-center text-2xl shadow-md">
                  <i className="ri-map-pin-2-fill"></i>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-(--primary-dark)">
                    Kolkata Divisional Branch
                  </h2>
                  <p className="text-xs text-slate-500">
                    Authorized PLI & RPLI Service Point
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <i className="ri-building-line text-(--primary-red) text-base mt-0.5 shrink-0"></i>
                  <span>
                    Haltu, 57, P. Majumder Road, Opposite Moitre Sangha Club, Kolkata - 700078, West Bengal, India
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-phone-fill text-(--primary-red) text-base mt-0.5 shrink-0"></i>
                  <div className="space-y-2 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Senior Advisor</span>
                        <a
                          href="tel:9038332076"
                          className="text-(--primary-dark) font-bold hover:text-(--primary-red) transition-colors">
                          +91 9038332076
                        </a>
                      </div>
                      <a
                        href="https://wa.me/919038332076?text=Hello%2C%20I%20want%20to%20consult%20regarding%20Postal%20Life%20Insurance%20policy."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all">
                        <i className="ri-whatsapp-fill"></i> Chat
                      </a>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Support Desk</span>
                        <a
                          href="tel:8620935473"
                          className="text-(--primary-dark) font-bold hover:text-(--primary-red) transition-colors">
                          +91 8620935473
                        </a>
                      </div>
                      <a
                        href="https://wa.me/918620935473?text=Hello%2C%20I%20want%20to%20consult%20regarding%20Postal%20Life%20Insurance%20policy."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-all">
                        <i className="ri-whatsapp-fill"></i> Chat
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-mail-fill text-(--primary-red) text-base mt-0.5 shrink-0"></i>
                  <a
                    href="mailto:prasenjitpriyan@gmail.com"
                    className="text-(--primary-dark) font-medium hover:text-(--primary-red) transition-colors break-all">
                    prasenjitpriyan@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-time-line text-(--primary-red) text-base mt-0.5 shrink-0"></i>
                  <span>Monday – Saturday: 09:30 AM – 06:00 PM</span>
                </div>
              </div>

              {/* Google Business Profile Button */}
              <div className="pt-2">
                <a
                  href="https://share.google/NHDWnZ0xIYZgnilIi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all">
                  <i className="ri-google-fill text-(--accent-gold) text-sm"></i>
                  View on Google Maps & Reviews
                </a>
              </div>
            </div>

            {/* Grievance Redressal Mechanism */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-3">
              <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                <i className="ri-shield-check-line text-amber-700"></i>
                Grievance Redressal & Citizen Charter
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                As per the Department of Posts Citizen Charter, all policyholder grievances are resolved within a stipulated 15-day timeline.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] font-bold text-amber-900">
                <i className="ri-check-line text-emerald-600"></i>
                <span>Toll Free Portal Support: 1800-266-6868</span>
              </div>
            </div>
          </div>

          {/* Right Column: Consultation Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-2xl font-black text-(--primary-dark)">
                  Request a Free Policy Consultation
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Our certified Postal Life Insurance advisor will prepare an actuarial quote tailored to your age and savings goals.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                    <i className="ri-check-line"></i>
                  </div>
                  <h3 className="text-xl font-bold text-(--primary-dark)">
                    Consultation Request Received!
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong>{formData.fullName}</strong>. An authorized PLI advisor will contact you at <strong>{formData.phone}</strong> with a sovereign guaranteed illustration.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        schemeInterest: 'PLI',
                        estimatedSA: '1000000',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold text-(--primary-dark) cursor-pointer">
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-(--primary-dark) mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Chandra"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:border-(--primary-red) outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-(--primary-dark) mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:border-(--primary-red) outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-(--primary-dark) mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:border-(--primary-red) outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-(--primary-dark) mb-1">
                        Scheme Category
                      </label>
                      <select
                        value={formData.schemeInterest}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            schemeInterest: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:border-(--primary-red) outline-none cursor-pointer">
                        <option value="PLI">PLI (Postal Life Insurance - Salaried/Prof.)</option>
                        <option value="RPLI">RPLI (Rural Postal Life Insurance)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-(--primary-dark) mb-1">
                      Desired Sum Assured (Coverage)
                    </label>
                    <select
                      value={formData.estimatedSA}
                      onChange={(e) =>
                        setFormData({ ...formData, estimatedSA: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:border-(--primary-red) outline-none cursor-pointer">
                      <option value="200000">₹2,00,000 (₹2 Lakhs)</option>
                      <option value="500000">₹5,00,000 (₹5 Lakhs)</option>
                      <option value="1000000">₹10,00,000 (₹10 Lakhs)</option>
                      <option value="2500000">₹25,00,000 (₹25 Lakhs)</option>
                      <option value="5000000">₹50,00,000 (₹50 Lakhs - Max)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-(--primary-dark) mb-1">
                      Any specific questions or preferred maturity age?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Interested in Santosh policy for 20 years term, please provide monthly premium quote."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:border-(--primary-red) outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-(--primary-red) to-[#961b2d] hover:from-[#b01c2f] hover:to-[#7e1625] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-fill"></i>
                        Request Free Policy Quote
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
