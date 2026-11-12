import React from 'react';

interface GlowingCirclesProps {
  size?: number;
  className?: string;
  colors?: [string, string, string];
  opacity?: number;
  pulsing?: boolean;
}

export const GlowingCircles: React.FC<GlowingCirclesProps> = ({
  size = 200,
  className = '',
  colors = ['#FFB400', '#C94A9B', '#1FA9E0'],
  opacity = 0.55,
  pulsing = false,
}) => {
  return (
    <div
      className={`relative pointer-events-none select-none flex items-center justify-center overflow-visible ${className} ${
        pulsing ? 'animate-orb-drift' : ''
      }`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute w-[65%] h-[65%] rounded-full filter blur-xl"
        style={{
          backgroundColor: colors[0],
          opacity: opacity * 0.9,
          top: '12%',
          left: '12%',
        }}
      />
      <div
        className="absolute w-[70%] h-[70%] rounded-full filter blur-2xl"
        style={{
          backgroundColor: colors[1],
          opacity,
          bottom: '8%',
          right: '8%',
        }}
      />
      <div
        className="absolute w-[60%] h-[60%] rounded-full filter blur-xl"
        style={{
          backgroundColor: colors[2],
          opacity: opacity * 0.8,
          top: '25%',
          right: '18%',
        }}
      />
      <div className="absolute w-[40%] h-[40%] rounded-full filter blur-md bg-white/40" />
    </div>
  );
};
