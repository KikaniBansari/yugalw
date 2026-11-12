import React from 'react';
import { Challenge, Expert } from '../../types/yugal';
import { PHASE_CONFIG, NUMERAL_COLORS } from '../../data/yugalData';
import { PhaseTag, AttributeChip } from '../ui/Chips';
import { GlowingCircles } from '../ui/GlowingCircles';
import { Button } from '../ui/Button';
import { Clock, Shield, Sparkles, CheckCircle2, ChevronLeft, Play, Coins } from 'lucide-react';
import { playSoftTap } from '../../utils/audio';

interface ChallengeUnlockedScreenProps {
  challenge: Challenge;
  onBeginChallenge: () => void;
  onOpenExpertProfile: (expert: Expert) => void;
  onBack: () => void;
}

export const ChallengeUnlockedScreen: React.FC<ChallengeUnlockedScreenProps> = ({
  challenge,
  onBeginChallenge,
  onOpenExpertProfile,
  onBack,
}) => {
  const meta = PHASE_CONFIG[challenge.phase] || PHASE_CONFIG.CALM;
  const numeralColor = NUMERAL_COLORS[(challenge.number - 1) % 5];
  const sensitive = challenge.phase === 'MOVE' || challenge.number === 1;

  return (
    <div className="relative min-h-screen bg-[#F6EEE1] text-[#04162A] flex flex-col justify-between p-4 pb-32 select-none animate-in fade-in duration-300">
      <div className="relative z-20 flex items-center justify-between pt-2 pb-1">
        <button
          type="button"
          onClick={() => { playSoftTap(); onBack(); }}
          className="w-11 h-11 rounded-full bg-[#FFFBF4] shadow-gold-halo flex items-center justify-center text-[#04162A] cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="label-caps text-[11px]">Card {String(challenge.number).padStart(2, '0')}</span>
        <div className="w-11 h-11" />
      </div>

      <div className="space-y-4 pt-1">
        <div className="flex justify-center">
          <PhaseTag phase={challenge.phase} />
        </div>

        <div className="text-center">
          <span className="numeral-light text-[72px] leading-none" style={{ color: numeralColor }}>
            {String(challenge.number).padStart(2, '0')}
          </span>
        </div>

        <div className="relative my-1 flex justify-center items-center">
          <GlowingCircles size={168} pulsing colors={[meta.color, '#FFB400', '#1FA9E0']} />
        </div>

        <div className="text-center">
          <h1 className="text-[28px] headline-tight text-[#04162A]">
            {challenge.title}
          </h1>
          <button
            type="button"
            onClick={() => { playSoftTap(); onOpenExpertProfile(challenge.expert); }}
            className="inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-full bg-[#FFFBF4] shadow-gold-halo cursor-pointer"
          >
            <img src={challenge.expert.avatar} alt={challenge.expert.name} className="w-7 h-7 rounded-full object-cover" />
            <span className="text-xs font-semibold text-[#04162A]">{challenge.expert.name}</span>
          </button>
        </div>

        <p className="text-[15px] text-[#04162A] leading-relaxed text-center px-1">
          {challenge.shortDesc}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <AttributeChip label={challenge.duration} icon={<Clock size={13} />} />
          <AttributeChip label={challenge.intensity} icon={<Sparkles size={13} />} />
          <AttributeChip label={challenge.equipment} icon={<Shield size={13} />} />
        </div>

        <div className="p-4 rounded-[24px] bg-[#FFFBF4] shadow-gold-halo space-y-2.5">
          <span className="label-caps text-[11px] block">What you'll work on</span>
          <div className="space-y-2">
            {challenge.learningPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[13px] text-[#04162A]">
                <CheckCircle2 size={16} className="text-[#FFB400] flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFE7A8] text-xs font-semibold text-[#04162A]">
            <Coins size={13} /> Earn 10 coins
          </span>
        </div>

        {sensitive && (
          <p className="text-[11px] text-[#5B6B7A] text-center leading-relaxed px-4">
            Check with your doctor first if you are pregnant or postpartum.
          </p>
        )}
      </div>

      <div className="fixed bottom-0 inset-x-0 z-40 p-4 pb-6 bg-gradient-to-t from-[#F6EEE1] via-[#F6EEE1]/95 to-transparent flex justify-center">
        <div className="w-full max-w-[390px]">
          <Button variant="primary" onClick={onBeginChallenge} icon={<Play size={16} className="fill-current" />}>
            Begin Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};
