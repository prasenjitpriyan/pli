import { PliLogo } from './common/PliLogo'

export default function Footer() {
  return (
    <footer className="bg-(--primary-dark) text-[#e0e0e0] pt-16 mt-20 text-[0.95rem]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 pb-12 border-b border-white/10">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <PliLogo variant="combined" size="md" showText={true} showSubtitle={true} />
            </div>
            <p className="mb-6 leading-relaxed opacity-80">
              Postal Life Insurance & Rural Postal Life Insurance, serving the nation since 1884.
              Providing financial security with sovereign guarantee and GST-free premiums.
            </p>
            <div className="flex gap-4">
              {['facebook-fill', 'twitter-x-line', 'instagram-line', 'linkedin-fill'].map(
                (icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="flex items-center justify-center w-9 h-9 bg-white/10 rounded-full text-white transition-all hover:bg-(--primary-red) hover:-translate-y-1"
                    aria-label={icon}
                  >
                    <i className={`ri-${icon}`}></i>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-6 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-10 after:h-0.5 after:bg-(--accent-gold)">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block"
                >
                  Our Products
                </a>
              </li>
              <li>
                <a
                  href="#why"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block"
                >
                  Why Choose PLI
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-6 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-10 after:h-0.5 after:bg-(--accent-gold)">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://share.google/NHDWnZ0xIYZgnilIi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--accent-gold) hover:underline hover:translate-x-1 transition-all inline-flex items-center gap-1 font-bold"
                >
                  <i className="ri-google-fill"></i> Google Business Profile
                </a>
              </li>
              <li>
                <a
                  href="/calculator"
                  className="text-white hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block font-semibold"
                >
                  Premium Calculator
                </a>
              </li>
              <li>
                <a
                  href="#rates"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block"
                >
                  Declared Bonus Rates
                </a>
              </li>
              <li>
                <a
                  href="#eligibility"
                  className="text-[#ccc] hover:text-(--accent-gold) hover:translate-x-1 transition-all inline-block"
                >
                  Eligibility Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-6 text-xl relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-10 after:h-0.5 after:bg-(--accent-gold)">
              Contact Us
            </h3>
            <ul className="space-y-4 text-[#ccc]">
              <li className="flex gap-4 items-start">
                <i className="ri-map-pin-line text-(--accent-gold) text-xl mt-0.5"></i>
                <span>
                  Haltu, 57, P. Majumder Road
                  <br />
                  Opposite Moitre Sangha Club, Kolkata - 700078
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <i className="ri-phone-line text-(--accent-gold) text-xl mt-0.5"></i>
                <a href="tel:18002666868" className="hover:text-white transition-colors">
                  9038332076 || 8620935473
                </a>
              </li>
              <li className="flex gap-4 items-start">
                <i className="ri-mail-line text-(--accent-gold) text-xl mt-0.5"></i>
                <a
                  href="mailto:pli@indiapost.gov.in"
                  className="hover:text-white transition-colors"
                >
                  prasenjitpriyan@gmail.com
                </a>
              </li>
              <li className="flex gap-4 items-start">
                <i className="ri-global-line text-(--accent-gold) text-xl mt-0.5"></i>
                <a
                  href="https://pli.indiapost.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  pli.indiapost.gov.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 flex flex-col md:flex-row justify-between items-center text-sm opacity-70 gap-4 text-center md:text-left">
          <p>
            &copy; <span id="current-year">{new Date().getFullYear()}</span> PLI & RPLI - PD. All
            Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
            <a href="#" className="hover:underline">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
