import Link from 'next/link'

export function CtaBannerSection() {
  return (
    <section className="py-24 px-6 bg-(--primary-red) text-white text-center" id="contact">
      <div className="container-custom max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Secure Your Family&apos;s Financial Future Today
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-light">
          Join millions of satisfied policyholders who trust Postal Life Insurance and Rural Postal
          Life Insurance for guaranteed security, highest returns, and zero GST premiums.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/calculator"
            className="bg-white text-(--primary-red) py-4 px-10 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Calculate Instant Quote
          </Link>
          <a
            href="https://share.google/NHDWnZ0xIYZgnilIi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <i className="ri-google-line text-xl"></i> Google Business Profile
          </a>
        </div>
      </div>
    </section>
  )
}
