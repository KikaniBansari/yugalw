import React from 'react';
import { playSoftTap } from '../../utils/audio';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text' | 'ghost';
  size?: 'default' | 'compact' | 'sm';
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  fullWidth = true,
  children,
  icon,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      playSoftTap();
      if (onClick) onClick(e);
    }
  };

  const heightClass = size === 'default' ? 'h-[54px]' : size === 'compact' ? 'h-[48px]' : 'h-[40px]';
  const paddingClass = size === 'default' ? 'px-6' : size === 'compact' ? 'px-4' : 'px-3';
  const textClass = size === 'default' ? 'text-[15px] font-semibold' : size === 'compact' ? 'text-[13px] font-semibold' : 'text-[12px] font-semibold';

  if (variant === 'primary') {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`${fullWidth ? 'w-full' : 'inline-flex'} ${heightClass} ${paddingClass} ${textClass} rounded-full bg-[#FFB400] text-[#04162A] tracking-wide flex items-center justify-center gap-2.5 shadow-coral-halo active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`${fullWidth ? 'w-full' : 'inline-flex'} ${heightClass} ${paddingClass} ${textClass} rounded-full bg-transparent hover:bg-[#FFFBF4] border-[1.5px] border-[#04162A] text-[#04162A] tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }

  if (variant === 'text') {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-[#5B6B7A] hover:text-[#C93A22] transition-colors cursor-pointer disabled:opacity-50 ${className}`}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${fullWidth ? 'w-full' : 'inline-flex'} ${heightClass} ${paddingClass} ${textClass} rounded-full bg-[#FFFBF4] hover:bg-white text-[#04162A] flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-gold-halo ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
