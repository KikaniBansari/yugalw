import React from 'react';
import { MoodType } from '../../types/yugal';

const FACE: Record<MoodType, { bg: string; stroke: string }> = {
  Low: { bg: '#E8D7F5', stroke: '#8A4FB8' },
  Tired: { bg: '#CDEBF8', stroke: '#1FA9E0' },
  Okay: { bg: '#FFD9BF', stroke: '#F2711C' },
  Good: { bg: '#FFE7A8', stroke: '#FFB400' },
  Radiant: { bg: '#F7D3E8', stroke: '#C94A9B' },
};

export const MoodFace: React.FC<{ mood: MoodType; size?: number }> = ({ mood, size = 36 }) => {
  const c = FACE[mood];
  const mouth =
    mood === 'Low' ? 'M10 22 Q16 18 22 22' :
    mood === 'Tired' ? 'M11 21 H21' :
    mood === 'Okay' ? 'M11 21 Q16 23 21 21' :
    mood === 'Good' ? 'M10 20 Q16 26 22 20' :
    'M9 19 Q16 28 23 19';

  const eyes =
    mood === 'Tired'
      ? (
        <>
          <path d="M10 13 H14" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 13 H22" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" />
        </>
      )
      : (
        <>
          <circle cx="12" cy="13" r="1.6" fill={c.stroke} />
          <circle cx="20" cy="13" r="1.6" fill={c.stroke} />
        </>
      );

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="15" fill={c.bg} />
      {eyes}
      <path d={mouth} fill="none" stroke={c.stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};
