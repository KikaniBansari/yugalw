import React from 'react';

interface GlowingLoaderProps {
  label?: string;
  size?: number;
}

export const GlowingLoader: React.FC<GlowingLoaderProps> = ({
  label = 'A moment, please…',
  size = 72,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full bg-spectrum-gradient opacity-40 filter blur-xl animate-ping" />
        <div className="w-full h-full rounded-full border-2 border-transparent border-t-[#FFB400] border-r-[#C94A9B] border-b-[#1FA9E0] animate-spin" />
        <div className="absolute w-[60%] h-[60%] rounded-full bg-[#FFFBF4] flex items-center justify-center shadow-gold-halo">
          <div className="w-3 h-3 rounded-full bg-spectrum-gradient animate-pulse" />
        </div>
      </div>

      {label && (
        <span className="text-xs font-medium text-[#5B6B7A] mt-4 tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
};
