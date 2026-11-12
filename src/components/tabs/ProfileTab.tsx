import React from 'react';
import { UserProfile, Challenge, Phase } from '../../types/yugal';
import { PHASE_CONFIG } from '../../data/yugalData';
import { RadialProgressRing } from '../RadialProgressRing';
import { PhaseTag } from '../ui/Chips';
import {
  Award,
  Bookmark,
  Settings,
  LogOut,
  ChevronRight,
  Check,
  Clock,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { playSoftTap } from '../../utils/audio';

interface ProfileTabProps {
  user: UserProfile;
  challenges: Challenge[];
  onOpenRewards: () => void;
  onOpenSavedAffirmations: () => void;
  onOpenSettings: () => void;
  onOpenExperts: () => void;
  onLogout: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  challenges,
  onOpenRewards,
  onOpenSavedAffirmations,
  onOpenSettings,
  onOpenExperts,
  onLogout,
}) => {
  const completedCount = challenges.filter((c) => c.status === 'completed').length;
  const currentPhase: Phase = 'CALM';
  const meta = PHASE_CONFIG[currentPhase];

  const weekDayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Five phases shown as completed / current / to come
  const phaseJourneyList: { phase: Phase; state: 'completed' | 'current' | 'to come' }[] = [
    { phase: 'MOVE', state: 'completed' },
    { phase: 'CALM', state: 'current' },
    { phase: 'FEEL', state: 'to come' },
    { phase: 'UNDERSTAND', state: 'to come' },
    { phase: 'CONNECT', state: 'to come' },
  ];

  return (
    <div className="space-y-6 pb-28 animate-in fade-in duration-300">
      {/* 1. Profile Header: Name, "Reset Box member", Join date */}
      <div className="p-5 rounded-3xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.12)] shadow-gold-halo relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB400]/10 rounded-full filter blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-16 h-16 rounded-full border-2 border-[#FFB400]/50 overflow-hidden shadow-focal-glow ring-2 ring-white/10 flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-[#04162A] tracking-tight truncate font-['Outfit']">
                {user.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#FFB400]/15 text-[#FFB400] text-[10px] font-semibold uppercase tracking-wider">
                Reset Box Member
              </span>
            </div>
            <p className="text-xs text-[#5B6B7A]/80 mt-0.5">
              Inner journey companion · Member since {user.joinDate}
            </p>
            <span className="inline-block font-mono text-[10px] text-emerald-400 mt-1">
              Box #{user.boxCode} Activated
            </span>
          </div>
        </div>
      </div>

      {/* 2. Progress Ring (Must Match Home Exactly) */}
      <div className="p-5 rounded-3xl bg-[#04162A] border border-[#FFB400]/15 shadow-gold-halo flex flex-col items-center text-center">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#FFB400] mb-1">
          EQUILIBRIUM PROGRESS
        </span>
        <RadialProgressRing
          completed={completedCount}
          total={21}
          currentPhaseColor={meta.color}
          size={160}
          strokeWidth={7}
          dark
        />
        <h3 className="text-base font-semibold text-[#F6EEE1] mt-1">
          {completedCount} of 21 challenges completed
        </h3>
        <p className="text-xs text-[#F6EEE1]/70 max-w-xs mt-0.5">
          "Harmony held in balance."
        </p>
      </div>

      {/* 3. "This Week" Row of Practised Days */}
      <div className="p-4 rounded-2xl bg-[#FFFBF4]/80 border border-transparent space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#04162A] tracking-wide">
            This Week Practised Days
          </span>
          <span className="text-[11px] text-[#FFB400] font-mono">
            7 of 7 days logged
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-1 text-center">
          {weekDayLabels.map((day, idx) => {
            const isDone = user.lastPracticedDays[idx];
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#5B6B7A]/60 font-medium">
                  {day}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDone
                      ? 'bg-spectrum-gradient text-[#04162A] shadow-[0_0_8px_rgba(255,184,0,0.4)]'
                      : 'bg-[#F6EEE1] text-[#5B6B7A]/30'
                    }`}
                >
                  {isDone ? <Check size={14} className="stroke-[3]" /> : '·'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Five Phases shown as Completed / Current / To Come */}
      <div className="p-4 rounded-2xl bg-[#FFFBF4]/80 border border-transparent space-y-3">
        <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#FFB400] block">
          Five Phases Progression
        </span>

        <div className="space-y-2.5">
          {phaseJourneyList.map((item) => {
            const pMeta = PHASE_CONFIG[item.phase];
            return (
              <div
                key={item.phase}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#F6EEE1]/60 border border-transparent"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: pMeta.color }}
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#04162A] block">
                      Phase {pMeta.number}: {item.phase}
                    </span>
                    <span className="text-[10px] text-[#5B6B7A]/60">
                      {pMeta.tagline}
                    </span>
                  </div>
                </div>

                <div>
                  {item.state === 'completed' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Completed
                    </span>
                  )}
                  {item.state === 'current' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFB400]/20 text-[#FFB400] border border-[#FFB400]/40">
                      Current Focus
                    </span>
                  )}
                  {item.state === 'to come' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F6EEE1] text-[#5B6B7A]/50">
                      To Come
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Navigation Links to Rewards, Saved Affirmations, Insights, Experts, Settings, Log Out */}
      <div className="rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.1)] divide-y divide-[#04162A]/8 overflow-hidden">
        <button
          type="button"
          onClick={() => {
            playSoftTap();
            onOpenRewards();
          }}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F6EEE1] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Award size={18} className="text-[#FFB400]" />
            <span className="text-xs font-medium text-[#04162A]">
              Rewards & Badges (12 total)
            </span>
          </div>
          <ChevronRight size={15} className="text-[#5B6B7A]/50" />
        </button>

        <button
          type="button"
          onClick={() => {
            playSoftTap();
            onOpenSavedAffirmations();
          }}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F6EEE1] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Bookmark size={18} className="text-[#C94A9B]" />
            <span className="text-xs font-medium text-[#04162A]">
              Saved Affirmations
            </span>
          </div>
          <ChevronRight size={15} className="text-[#5B6B7A]/50" />
        </button>

        <button
          type="button"
          onClick={() => {
            playSoftTap();
            onOpenExperts();
          }}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F6EEE1] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <UserCheck size={18} className="text-[#8A4FB8]" />
            <span className="text-xs font-medium text-[#04162A]">
              Women's Health Experts Directory
            </span>
          </div>
          <ChevronRight size={15} className="text-[#5B6B7A]/50" />
        </button>

        <button
          type="button"
          onClick={() => {
            playSoftTap();
            onOpenSettings();
          }}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F6EEE1] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Settings size={18} className="text-[#5B6B7A]" />
            <span className="text-xs font-medium text-[#04162A]">
              Settings & Privacy
            </span>
          </div>
          <ChevronRight size={15} className="text-[#5B6B7A]/50" />
        </button>

        <button
          type="button"
          onClick={() => {
            playSoftTap();
            onLogout();
          }}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-rose-500/10 transition-colors text-rose-400 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <LogOut size={18} />
            <span className="text-xs font-medium">Log out</span>
          </div>
          <ChevronRight size={15} className="opacity-50" />
        </button>
      </div>
    </div>
  );
};
