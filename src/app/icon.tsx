import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

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
          background: '#112233',
          borderRadius: '50%',
        }}
      >
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
          <path
            d="M13 24.5C13 23.12 14.12 22 15.5 22H32.5C33.88 22 35 23.12 35 24.5C35 30.85 29.85 36 23.5 36H24.5C18.15 36 13 30.85 13 24.5Z"
            fill="#FF6B4A"
          />
          <path
            d="M19 14C17.5 15.8 17.5 17.2 19 19M24 12.5C22.5 14.3 22.5 15.7 24 17.5M29 14C27.5 15.8 27.5 17.2 29 19"
            stroke="#2E8B57"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
