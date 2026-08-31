export function OfficeLocationSection() {
  return (
    <section
      className="py-20 md:py-24 px-6 bg-white border-t border-slate-200"
      id="google-business"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 text-(--primary-red) px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <i className="ri-map-pin-user-line text-sm"></i> Official Google Business Profile
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-(--primary-dark)">
            Visit Our Authorized Business Portal
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Connect directly with our authorized Postal Life Insurance advisory location on Google
            Maps for in-person consultation, policy servicing, and documentation assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Google Business Profile Information Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-8 rounded-3xl shadow-xl space-y-6 border border-slate-700">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-(--primary-red) flex items-center justify-center text-white text-2xl shadow-md">
                    <i className="ri-google-fill"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">PLI & RPLI Business Portal</h3>
                    <p className="text-xs text-(--accent-gold) font-medium">
                      Verified Google Business Profile
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <i className="ri-map-pin-2-fill text-(--accent-gold) text-lg shrink-0 mt-0.5"></i>
                  <div>
                    <strong className="text-white block">Address:</strong>
                    <span>
                      Haltu, 57, P. Majumder Road, Opposite Moitre Sangha Club, Kolkata - 700078
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="ri-time-fill text-(--accent-gold) text-lg shrink-0 mt-0.5"></i>
                  <div>
                    <strong className="text-white block">Business Operating Hours:</strong>
                    <span>Monday – Sunday: 09:00 AM – 09:00 PM (IST)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="ri-phone-fill text-(--accent-gold) text-lg shrink-0 mt-0.5"></i>
                  <div>
                    <strong className="text-white block">Contact Number:</strong>
                    <a
                      href="tel:18002666868"
                      className="text-white hover:text-(--accent-gold) font-bold"
                    >
                      90-3833-2076 || 86-2093-5473
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="ri-mail-send-fill text-(--accent-gold) text-lg shrink-0 mt-0.5"></i>
                  <div>
                    <strong className="text-white block">Email:</strong>
                    <a
                      href="mailto:pli@indiapost.gov.in"
                      className="text-slate-200 hover:underline"
                    >
                      prasenjitpriyan@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Action Buttons for Google Business Link */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://share.google/NHDWnZ0xIYZgnilIi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-(--primary-red) hover:bg-red-700 text-white font-bold rounded-xl text-center text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <i className="ri-google-line text-base"></i> Open Google Business Profile
                </a>
                <a
                  href="https://share.google/NHDWnZ0xIYZgnilIi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-center text-xs transition-colors flex items-center justify-center gap-2 border border-white/20"
                >
                  <i className="ri-direction-line text-base"></i> Get Live Directions
                </a>
              </div>
            </div>
          </div>

          {/* Live Interactive Google Map Frame */}
          <div className="lg:col-span-7">
            <div className="bg-white p-3 rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative group">
              <div className="w-full h-112 rounded-2xl overflow-hidden relative">
                <iframe
                  title="Postal Life Insurance Google Business Profile Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.923485098236!2d88.381395!3d22.50654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027110e527b137%3A0x6b8404a3f81e359!2s57%2C%20P.%20Majumder%20Rd%2C%20Haltu%2C%20Kolkata%2C%20West%20Bengal%20700078!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-2xl"
                ></iframe>
              </div>

              <div className="p-4 bg-slate-50 rounded-b-2xl flex items-center justify-between text-xs text-slate-700">
                <span className="font-semibold flex items-center gap-1.5">
                  <i className="ri-checkbox-circle-fill text-emerald-600"></i> Live Interactive
                  Location Map
                </span>
                <a
                  href="https://share.google/NHDWnZ0xIYZgnilIi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-(--primary-red) hover:underline flex items-center gap-1"
                >
                  View on Google Business Profile <i className="ri-external-link-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
