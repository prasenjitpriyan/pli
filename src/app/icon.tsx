import { ImageResponse } from 'next/og'

export const size = {
  width: 48,
  height: 48,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #961b2d 0%, #6b0f1d 100%)',
          borderRadius: '12px',
          border: '2px solid #d4af37',
          padding: '3px',
        }}
      >
        {/* Emblem high-contrast inner white badge */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '9px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Official PLI Hand & Seedling Silhouette */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34 76C34 76 34 82 50 82C66 82 66 76 66 76V64C66 64 74 61 74 48C74 41 71 39 69 39C67 39 66 42 66 46V25C66 21 62 21 62 25V41H59V18C59 14 55 14 55 18V41H52V14C52 10 48 10 48 14V41H45V21C45 17 41 17 41 21V53C37 49 33 51 32 55C31 59 34 64 34 76Z"
              fill="#961b2d"
            />
            {/* Plant in Palm */}
            <path
              d="M50 70V56"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M50 48C47 52 47 56 50 57C53 56 53 52 50 48Z"
              fill="#ffffff"
            />
            <path
              d="M48 57C42 54 39 58 41 62C45 63 47 60 48 57Z"
              fill="#ffffff"
            />
            <path
              d="M52 57C58 54 61 58 59 62C55 63 53 60 52 57Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
