import React from 'react';

interface RadialProgressRingProps {
  completed: number;
  total?: number;
  currentPhaseColor?: string;
  size?: number;
  strokeWidth?: number;
  dark?: boolean;
}

export const RadialProgressRing: React.FC<RadialProgressRingProps> = ({
  completed,
  total = 21,
  currentPhaseColor = '#FFB400',
  size = 200,
  strokeWidth = 7,
  dark = false,
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(Math.max(completed / total, 0), 1);
  const strokeDashoffset = circumference - progressRatio * circumference;
  const ink = dark ? '#F6EEE1' : '#04162A';
  const muted = dark ? 'rgba(246,238,225,0.62)' : '#5B6B7A';

  return (
    <div className="relative flex items-center justify-center my-2" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full filter blur-xl transition-all duration-700 pointer-events-none opacity-40"
        style={{ background: `radial-gradient(circle, ${currentPhaseColor} 0%, transparent 70%)` }}
      />

      <svg width={size} height={size} className="transform -rotate-90 relative z-10 overflow-visible">
        <defs>
          <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB400" />
            <stop offset="25%" stopColor="#F2711C" />
            <stop offset="50%" stopColor="#E8452C" />
            <stop offset="75%" stopColor="#C94A9B" />
            <stop offset="100%" stopColor="#1FA9E0" />
          </linearGradient>
          <filter id="progressGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFB400" floodOpacity="0.45" />
          </filter>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={dark ? 'rgba(246,238,225,0.12)' : 'rgba(4,22,42,0.08)'}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#spectrumGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          filter="url(#progressGlow)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-0.5" style={{ color: muted }}>
          {completed} of {total}
        </span>
        <div className="flex items-baseline">
          <span className="text-4xl numeral-light tracking-tight" style={{ color: ink }}>
            {completed}
          </span>
          <span className="text-lg font-extralight ml-0.5" style={{ color: muted }}>
            /{total}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.15em] text-[#FFB400] font-semibold mt-0.5">
          Challenges
        </span>
      </div>
    </div>
  );
};
