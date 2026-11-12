import React from 'react';
import { Challenge, Badge } from '../../types/yugal';
import { GlowingCircles } from '../ui/GlowingCircles';
import { Button } from '../ui/Button';
import { Sparkles, ArrowRight, Shuffle, Coins, Flame } from 'lucide-react';

interface ChallengeCompletionScreenProps {
  challenge: Challenge;
  badge?: Badge;
  onSeeProgress: () => void;
  onPickAnotherCard: () => void;
}

export const ChallengeCompletionScreen: React.FC<ChallengeCompletionScreenProps> = ({
  challenge,
  badge,
  onSeeProgress,
  onPickAnotherCard,
}) => {
  return (
    <div className="relative min-h-screen bg-[#F6EEE1] text-[#04162A] flex flex-col justify-between p-5 pb-10 select-none animate-in fade-in duration-500 overflow-hidden">
      <div className="absolute top-10 left-6 w-24 h-24 rounded-full bg-[#FFB400]/50 blur-2xl pointer-events-none animate-orb-drift" />
      <div className="absolute top-24 right-4 w-20 h-20 rounded-full bg-[#C94A9B]/45 blur-2xl pointer-events-none" />
      <div className="absolute top-40 left-1/2 w-16 h-16 rounded-full bg-[#1FA9E0]/45 blur-xl pointer-events-none" />
      <div className="absolute bottom-40 right-8 w-14 h-14 rounded-full bg-[#E8452C]/40 blur-xl pointer-events-none" />

      <div className="text-center my-auto space-y-5 relative z-10">
        <div className="relative flex justify-center items-center my-2">
          <GlowingCircles size={200} pulsing />
        </div>

        <div>
          <span className="label-caps text-[11px] block mb-2">Verified</span>
          <h1 className="text-[36px] headline-tight text-[#04162A]">
            Challenge <span className="text-[#C93A22]">completed</span>
          </h1>
          <p className="text-sm text-[#5B6B7A] mt-2">
            Card {String(challenge.number).padStart(2, '0')} · {challenge.title}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFE7A8]">
          <Coins size={16} className="text-[#F2711C]" />
          <span className="text-lg font-extrabold text-[#04162A]">+10 coins</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD9BF] ml-2">
          <Flame size={14} className="text-[#E8452C]" />
          <span className="text-sm font-semibold text-[#04162A]">Streak +1</span>
        </div>

        <div className="p-5 rounded-[28px] bg-[#FFFBF4] shadow-gold-halo max-w-sm mx-auto">
          <span className="label-caps text-[10px] block mb-2">Closing affirmation</span>
          <p className="text-[17px] font-medium text-[#04162A] leading-relaxed">
            “{challenge.closingAffirmation}”
          </p>
        </div>

        {badge && (
          <div className="p-3.5 rounded-[24px] bg-[#CDEBF8] max-w-sm mx-auto flex items-center gap-3 text-left">
            <div className="w-11 h-11 rounded-2xl bg-spectrum-gradient text-white flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="label-caps text-[10px] text-[#04162A] block">New badge</span>
              <h4 className="text-sm font-extrabold text-[#04162A]">{badge.title}</h4>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2.5 pt-4 max-w-md mx-auto w-full relative z-10">
        <Button variant="primary" onClick={onSeeProgress} icon={<ArrowRight size={16} />}>
          See Progress
        </Button>
        <Button variant="outline" onClick={onPickAnotherCard} icon={<Shuffle size={15} />}>
          Pick another card
        </Button>
      </div>
    </div>
  );
};
