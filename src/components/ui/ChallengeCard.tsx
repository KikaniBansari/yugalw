import React from 'react';
import { Challenge } from '../../types/yugal';
import { PHASE_CONFIG } from '../../data/yugalData';
import { PhaseTag } from './Chips';
import { Check, Lock, Clock } from 'lucide-react';
import { playSoftTap } from '../../utils/audio';

interface ChallengeCardProps {
  challenge: Challenge;
  onClick?: (challenge: Challenge) => void;
  className?: string;
  variantOverride?: 'default' | 'locked' | 'completed';
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onClick,
  className = '',
  variantOverride,
}) => {
  const status = variantOverride || challenge.status;
  const meta = PHASE_CONFIG[challenge.phase] || PHASE_CONFIG.CALM;

  const handleClick = () => {
    playSoftTap();
    if (onClick) onClick(challenge);
  };

  const isCompleted = status === 'completed';
  const isLocked = status === 'locked';

  return (
    <div
      onClick={handleClick}
      className={`relative w-full rounded-[28px] p-4 transition-all duration-200 cursor-pointer overflow-hidden ${
        isCompleted
          ? 'bg-[#FFFBF4] shadow-gold-halo'
          : isLocked
          ? 'bg-[#FFFBF4] opacity-70'
          : 'bg-[#FFFBF4] shadow-card-active'
      } ${className}`}
    >
      {!isLocked && (
        <div
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full filter blur-xl pointer-events-none opacity-40"
          style={{ backgroundColor: meta.color }}
        />
      )}

      <div className="flex items-center justify-between mb-2.5 relative z-10">
        <PhaseTag
          phase={challenge.phase}
          labelOverride={`${challenge.phase} · ${String(challenge.number).padStart(2, '0')}`}
          size="sm"
        />

        <div className="flex items-center gap-1.5">
          {isCompleted ? (
            <div className="flex items-center gap-1 text-[11px] text-[#04162A] bg-[#CDEBF8] px-2 py-0.5 rounded-full">
              <Check size={12} className="stroke-[2.5]" />
              <span className="font-semibold">Done</span>
            </div>
          ) : isLocked ? (
            <div className="flex items-center gap-1 text-[11px] text-[#5B6B7A] bg-[#F6EEE1] px-2 py-0.5 rounded-full">
              <Lock size={11} />
              <span>Locked</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mb-3 relative z-10">
        <h4 className="text-[16px] font-extrabold text-[#04162A] tracking-tight leading-snug">
          {challenge.title}
        </h4>
        <p className="text-[13px] text-[#5B6B7A] mt-1 line-clamp-2 leading-relaxed">
          {challenge.shortDesc}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-[#04162A]/8 text-xs text-[#5B6B7A] relative z-10">
        <div className="flex items-center gap-2">
          <img
            src={challenge.expert.avatar}
            alt={challenge.expert.name}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-[11px] font-medium text-[#04162A] truncate max-w-[120px]">
            {challenge.expert.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px]">
          <Clock size={12} className="text-[#FFB400]" />
          <span>{challenge.duration}</span>
        </div>
      </div>

      {isLocked && (
        <div className="mt-2 text-[11px] text-[#5B6B7A]">
          Scan the QR on card {challenge.number} to unlock.
        </div>
      )}
    </div>
  );
};
