import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Postal Life Insurance (PLI) & Rural Postal Life Insurance (RPLI)'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #801323 0%, #5c0f1b 50%, #0f172a 100%)',
          padding: '60px 80px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Ambient background decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0) 70%)',
          }}
        />

        {/* Top Bar: Ministry of Communications & Sovereign Guarantee Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1.5px solid rgba(212, 175, 55, 0.5)',
              padding: '8px 20px',
              borderRadius: '9999px',
              color: '#fef08a',
              fontSize: '18px',
              fontWeight: 'bold',
              letterSpacing: '1px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#34d399',
              }}
            />
            <span>Government of India • Ministry of Communications • Sovereign Guarantee</span>
          </div>
        </div>

        {/* Center: Logos & Main Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            {/* PLI Badge Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: '#ffffff',
                padding: '12px 24px',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#961b2d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '26px',
                  fontWeight: '900',
                }}
              >
                PLI
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#961b2d', fontSize: '24px', fontWeight: '900' }}>
                  POSTAL LIFE INSURANCE
                </span>
                <span style={{ color: '#64748b', fontSize: '15px', fontWeight: 'bold' }}>
                  डाक जीवन बीमा • Estd. 1884
                </span>
              </div>
            </div>

            <span style={{ fontSize: '32px', color: '#d4af37', fontWeight: '300' }}>&</span>

            {/* RPLI Badge Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: '#ffffff',
                padding: '12px 24px',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#15803d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: '900',
                }}
              >
                RPLI
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#15803d', fontSize: '24px', fontWeight: '900' }}>
                  RURAL POSTAL LIFE INSURANCE
                </span>
                <span style={{ color: '#64748b', fontSize: '15px', fontWeight: 'bold' }}>
                  ग्रामीण डाक जीवन बीमा • Rural Security
                </span>
              </div>
            </div>
          </div>

          <h1
            style={{
              fontSize: '52px',
              fontWeight: '900',
              lineHeight: 1.15,
              color: '#ffffff',
              margin: 0,
              maxWidth: '1000px',
            }}
          >
            India&apos;s Highest Bonus & Sovereign Guaranteed Life Insurance
          </h1>
        </div>

        {/* Bottom Bar: Key USPs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '24px',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#fef08a', fontSize: '26px', fontWeight: '900' }}>
                ₹76 / ₹1,000 SA
              </span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>Highest Declared Bonus</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#34d399', fontSize: '26px', fontWeight: '900' }}>
                0% GST
              </span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>100% Tax Free Premiums</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#ffffff', fontSize: '26px', fontWeight: '900' }}>
                ₹50 Lakhs
              </span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>Maximum Sum Assured</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#60a5fa', fontSize: '26px', fontWeight: '900' }}>
                140+ Years
              </span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>Serving Since 1884</span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#d4af37',
              color: '#0f172a',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '900',
            }}
          >
            Calculate Quote Online →
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
