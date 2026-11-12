import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  submessage?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  submessage,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-16 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className="bg-[#04162A] rounded-full py-2.5 px-4 shadow-gold-halo flex items-center gap-2.5 max-w-sm pointer-events-auto">
        <div className="w-5 h-5 rounded-full bg-[#FFB400] text-[#04162A] flex items-center justify-center flex-shrink-0">
          <Check size={12} className="stroke-[3]" />
        </div>
        <div className="text-left">
          <span className="text-xs font-semibold text-[#F6EEE1] block leading-tight">
            {message}
          </span>
          {submessage && (
            <span className="text-[10px] text-[#F6EEE1]/70 block leading-tight mt-0.5">
              {submessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
