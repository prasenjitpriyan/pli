'use client'

import PageTransition from '@/components/common/PageTransition'
import { fadeUpVariant, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { useState } from 'react'

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: string
}

function LabelInput({ label, icon, className, ...props }: LabelInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
        {label}
      </label>
      <div
        className={cn(
          'relative rounded-xl border transition-all duration-200 bg-white/80 backdrop-blur-xs flex items-center overflow-hidden',
          isFocused
            ? 'border-(--primary-red) ring-3 ring-(--primary-red)/15 shadow-sm'
            : 'border-slate-200 hover:border-slate-300'
        )}
      >
        {icon && (
          <span className="pl-3.5 pr-1 text-slate-400 text-base shrink-0 flex items-center justify-center">
            <i className={icon}></i>
          </span>
        )}
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          className={cn(
            'w-full py-3 px-3.5 bg-transparent text-slate-900 text-xs sm:text-sm font-semibold placeholder:text-slate-400 focus:outline-none',
            className
          )}
        />
        {isFocused && (
          <motion.div
            layoutId="inputHighlight"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-(--primary-red) via-amber-400 to-(--primary-red)"
          />
        )}
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    schemeInterest: 'PLI',
    estimatedSA: '1000000',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 700)
  }

  return (
    <PageTransition className="min-h-screen bg-(--bg-light) pb-24 relative overflow-hidden">
      {/* Ambient Radial Grid & Glow Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Header Section */}
      <section className="bg-linear-to-r from-(--primary-dark) via-[#242f42] to-(--primary-dark) text-white py-16 px-6 relative overflow-hidden border-b border-red-950/40">
        <div className="container-custom text-center max-w-3xl mx-auto space-y-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-(--accent-gold) text-xs font-bold uppercase tracking-wider border border-white/10"
          >
            <i className="ri-customer-service-2-fill"></i>
            Government of India Postal Network • Official Helpdesk
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.05 }}
            className="text-3xl md:text-5xl font-black tracking-tight"
          >
            Contact & Advisory Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
            className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            Connect directly with authorized Postal Life Insurance division advisors. Get custom
            actuarial illustrations, loan guidance, and claims assistance.
          </motion.p>
        </div>
      </section>

      {/* Contact Form Grid with Details Block */}
      <section className="container-custom py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Details Grid (7 cols on large screens, full width on mobile) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6"
          >
            {/* Header intro card */}
            <motion.div
              variants={fadeUpVariant}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-(--primary-red) text-white flex items-center justify-center text-2xl shadow-md">
                  <i className="ri-mail-send-fill"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-(--primary-dark)">
                    Talk to Certified Advisors
                  </h2>
                  <p className="text-xs text-slate-500">
                    India Post Sovereign Portfolio (PLI & RPLI)
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you need assistance choosing between{' '}
                <strong className="text-slate-800">Whole Life</strong> and{' '}
                <strong className="text-slate-800">Endowment Assurance</strong>, understanding 0%
                GST savings, or claiming maturity returns, our verified advisors are ready to
                assist.
              </p>

              {/* Value proposition badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <i className="ri-shield-check-fill text-emerald-600"></i> 100% Sovereign Guarantee
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
                  <i className="ri-medal-fill text-amber-600"></i> ₹76/₹1k Peak Bonus
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold">
                  <i className="ri-percent-fill text-blue-600"></i> 0% GST Benefit
                </span>
              </div>
            </motion.div>

            {/* Dual WhatsApp Direct Connect Grid Cards */}
            <motion.div variants={fadeUpVariant} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Senior Advisor Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Senior Insurance Advisor
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Available
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base mt-1">Prasenjit Das</h3>
                  <a
                    href="tel:9038332076"
                    className="text-xs font-bold text-slate-600 hover:text-(--primary-red) transition-colors block mt-0.5"
                  >
                    +91 9038332076
                  </a>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://wa.me/919038332076?text=Hello%20Prasenjit%20Dey%2C%20I%20would%20like%20to%20consult%20regarding%20PLI%20policy%20options."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <i className="ri-whatsapp-fill text-base"></i>
                  <span>Chat on WhatsApp</span>
                </motion.a>
              </div>

              {/* Support Desk Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Helpdesk & Servicing
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-base mt-1">Pradipta Das</h3>
                  <a
                    href="tel:8620935473"
                    className="text-xs font-bold text-slate-600 hover:text-(--primary-red) transition-colors block mt-0.5"
                  >
                    +91 8620935473
                  </a>
                </div>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://wa.me/918620935473?text=Hello%2C%20I%20need%20assistance%20regarding%20Postal%20Life%20Insurance%20policy%20servicing."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <i className="ri-whatsapp-fill text-base"></i>
                  <span>Chat on WhatsApp</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Office Location & Details Grid Card */}
            <motion.div
              variants={fadeUpVariant}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <i className="ri-map-pin-2-fill text-(--primary-red)"></i> Office Address & Hours
                </span>
                <a
                  href="https://share.google/NHDWnZ0xIYZgnilIi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-(--primary-red) hover:underline flex items-center gap-1"
                >
                  <span>Google Profile</span>
                  <i className="ri-external-link-line"></i>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Kolkata Office</span>
                  <p className="text-slate-600 leading-relaxed">
                    Haltu, 57, P. Majumder Road, Opposite Moitre Sangha Club, Kolkata - 700078
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Working Hours</span>
                  <p className="text-slate-600 leading-relaxed">
                    Monday – Saturday: 09:30 AM – 06:00 PM (IST)
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Email Support</span>
                  <a
                    href="mailto:prasenjitpriyan@gmail.com"
                    className="text-slate-600 hover:text-(--primary-red) transition-colors font-medium"
                  >
                    prasenjitpriyan@gmail.com
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 block">Citizen Charter</span>
                  <p className="text-slate-600 leading-relaxed">
                    15-day resolution statutory timeline
                  </p>
                </div>
              </div>

              {/* Live Map Preview Link */}
              <div className="pt-2">
                <motion.a
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://share.google/NHDWnZ0xIYZgnilIi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <i className="ri-google-fill text-(--accent-gold) text-base"></i>
                  <span>View Verified Google Business Profile & Reviews</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Aceternity Contact Form Block with Micro-interactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-6 relative overflow-hidden">
              {/* Form Gradient Accent Header */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-(--primary-red) via-amber-400 to-(--primary-red)" />

              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-2xl font-black text-(--primary-dark) tracking-tight">
                  Request a Free Policy Illustration
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill out the details below and an authorized postal insurance advisor will
                  calculate your exact monthly premium and guaranteed maturity return.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-sm">
                    <i className="ri-check-line"></i>
                  </div>
                  <h3 className="text-xl font-black text-(--primary-dark)">
                    Consultation Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. An
                    authorized PLI advisor will contact you at{' '}
                    <strong className="text-slate-900">{formData.phone}</strong> with an official
                    actuarial illustration.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/919038332076?text=${encodeURIComponent(
                        `Hello! I just submitted an inquiry for ${formData.schemeInterest} (Sum Assured: ₹${formData.estimatedSA}). Please assist me.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <i className="ri-whatsapp-fill text-base"></i>
                      <span>Fast-Track on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          schemeInterest: 'PLI',
                          estimatedSA: '1000000',
                          message: '',
                        })
                      }}
                      className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and Phone Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <LabelInput
                      label="Full Name *"
                      icon="ri-user-3-line"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    <LabelInput
                      label="Mobile Number *"
                      icon="ri-phone-line"
                      type="tel"
                      required
                      placeholder="10-digit phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  {/* Email Input */}
                  <LabelInput
                    label="Email Address (Optional)"
                    icon="ri-mail-line"
                    type="email"
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  {/* Scheme Selection Tabs with Motion Shared Layout */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Scheme Category
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200 relative">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, schemeInterest: 'PLI' })}
                        className={`relative py-2.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer z-10 ${
                          formData.schemeInterest === 'PLI'
                            ? 'text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {formData.schemeInterest === 'PLI' && (
                          <motion.div
                            layoutId="contactSchemeTab"
                            className="absolute inset-0 bg-(--primary-red) rounded-lg shadow-xs -z-10"
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                          />
                        )}
                        <span>PLI (Govt / Urban)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, schemeInterest: 'RPLI' })}
                        className={`relative py-2.5 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer z-10 ${
                          formData.schemeInterest === 'RPLI'
                            ? 'text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {formData.schemeInterest === 'RPLI' && (
                          <motion.div
                            layoutId="contactSchemeTab"
                            className="absolute inset-0 bg-emerald-700 rounded-lg shadow-xs -z-10"
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                          />
                        )}
                        <span>RPLI (Rural Life)</span>
                      </button>
                    </div>
                  </div>

                  {/* Sum Assured Quick Selection Chips */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Desired Sum Assured
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: '₹2 Lakhs', val: '200000' },
                        { label: '₹5 Lakhs', val: '500000' },
                        { label: '₹10 Lakhs', val: '1000000' },
                        { label: '₹25 Lakhs', val: '2500000' },
                        { label: '₹50 Lakhs', val: '5000000' },
                      ].map((chip) => (
                        <motion.button
                          key={chip.val}
                          type="button"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFormData({ ...formData, estimatedSA: chip.val })}
                          className={cn(
                            'py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer border',
                            formData.estimatedSA === chip.val
                              ? 'bg-slate-900 text-(--accent-gold) border-slate-900 shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                          )}
                        >
                          {chip.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Question / Notes textarea */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Specific Questions or Preferred Policy Term
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Interested in Santosh policy for 20 years term, please provide monthly premium quote."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold placeholder:text-slate-400 focus:border-(--primary-red) focus:ring-3 focus:ring-(--primary-red)/15 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Submit Button with Tactile Feedback */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-(--primary-red) to-[#961b2d] hover:from-[#b01c2f] hover:to-[#7e1625] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin text-lg"></i>
                        <span>Generating Illustration...</span>
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-fill text-lg"></i>
                        <span>Request Official Actuarial Quote</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-[11px] text-center text-slate-400 pt-1">
                    🔒 Backed by Government of India Sovereign Guarantee. Your data is strictly
                    private.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
