import React from 'react';
import { DietType } from '@/lib/types';

/** The familiar green (veg) / red (non-veg) bordered-square dot indicator used across Indian food-delivery apps. */
export function DietDot({ diet, size = 14 }: { diet: DietType; size?: number }) {
  const color = diet === 'veg' ? '#2E8B57' : '#E23744';
  return (
    <span
      className="inline-flex items-center justify-center rounded-[3px] border shrink-0"
      style={{ width: size, height: size, borderColor: color, borderWidth: Math.max(1, size / 10) }}
      role="img"
      aria-label={diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
      title={diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
    >
      <span
        className="rounded-full"
        style={{ width: size * 0.5, height: size * 0.5, backgroundColor: color }}
      />
    </span>
  );
}
