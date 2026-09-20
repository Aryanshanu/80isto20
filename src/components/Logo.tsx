import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** 'light' = for use on cream/white backgrounds (navy wordmark). 'dark' = for use on navy backgrounds (cream wordmark). */
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: { mark: 36, word: 'text-2xl', tagline: 'text-[9px]' },
  md: { mark: 44, word: 'text-3xl', tagline: 'text-[10px]' },
  lg: { mark: 60, word: 'text-4xl sm:text-5xl', tagline: 'text-xs' },
};

/** Bowl-and-steam mark: a stylized nutrition bowl with a leaf/steam accent, echoing the 80isto20 brand icon. */
function LogoMark({ size, theme }: { size: number; theme: 'light' | 'dark' }) {
  const ringColor = theme === 'dark' ? '#F9F8F6' : '#112233';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="23" fill={theme === 'dark' ? '#F9F8F6' : '#112233'} />
      <path
        d="M13 24.5C13 23.12 14.12 22 15.5 22H32.5C33.88 22 35 23.12 35 24.5C35 30.85 29.85 36 23.5 36H24.5C18.15 36 13 30.85 13 24.5Z"
        fill="#FF6B4A"
      />
      <path
        d="M13 24.5C13 23.12 14.12 22 15.5 22H32.5C33.88 22 35 23.12 35 24.5"
        stroke={ringColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 14C17.5 15.8 17.5 17.2 19 19M24 12.5C22.5 14.3 22.5 15.7 24 17.5M29 14C27.5 15.8 27.5 17.2 29 19"
        stroke="#2E8B57"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ theme = 'light', size = 'md', showTagline = true, className }: LogoProps) {
  const s = SIZE_MAP[size];
  const wordColor = theme === 'dark' ? 'text-white' : 'text-brand-navy';
  const taglineColor = theme === 'dark' ? 'text-brand-coral/90' : 'text-brand-green';

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoMark size={s.mark} theme={theme} />
      <div className="leading-none">
        <span className={cn('font-script leading-none block', s.word, wordColor)}>
          80isto20
        </span>
        {showTagline && (
          <span className={cn('font-black uppercase tracking-[0.18em] block mt-0.5', s.tagline, taglineColor)}>
            Nutritious Meals • Happier You
          </span>
        )}
      </div>
    </div>
  );
}
