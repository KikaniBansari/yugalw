import React, { useState } from 'react';
import { GlowingLoader } from '../ui/GlowingLoader';
import { ChallengeCard } from '../ui/ChallengeCard';
import { INITIAL_CHALLENGES } from '../../data/yugalData';
import { Button } from '../ui/Button';
import { X, Lock, CheckCircle2, ShieldAlert, Sparkles, Inbox, RotateCcw } from 'lucide-react';
import { playSoftTap } from '../../utils/audio';

interface StatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatesModal: React.FC<StatesModalProps> = ({ isOpen, onClose }) => {
  const [activeState, setActiveState] = useState<'all' | 'loading' | 'locked' | 'completed' | 'empty' | 'error'>('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#04162A]/40 backdrop-blur-md select-none">
      <div className="relative w-full max-w-md bg-[#F6EEE1] border border-[rgba(201,204,224,0.2)] rounded-3xl p-5 text-[#04162A] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-transparent">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#FFB400]">
              STATE MATRIX SPECIFICATION
            </span>
            <h3 className="text-base font-semibold text-[#04162A]">
              Screen States Showcase
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFFBF4] flex items-center justify-center text-[#5B6B7A]"
          >
            <X size={16} />
          </button>
        </div>

        {/* State Filter Tabs */}
        <div className="py-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-b border-transparent">
          {(['all', 'loading', 'locked', 'completed', 'empty', 'error'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                playSoftTap();
                setActiveState(st);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all cursor-pointer ${
                activeState === st
                  ? 'bg-spectrum-gradient text-[#04162A] font-semibold'
                  : 'bg-[#FFFBF4] text-[#5B6B7A] hover:text-[#04162A]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1 text-xs">
          {/* 1. LOADING STATE */}
          {(activeState === 'all' || activeState === 'loading') && (
            <div className="p-4 rounded-2xl bg-[#FFFBF4] border border-transparent space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#FFB400] block">
                STATE: LOADING (PULSING GLOWING CIRCLE)
              </span>
              <GlowingLoader label="Preparing calm restorative sequence..." size={64} />
            </div>
          )}

          {/* 2. LOCKED STATE */}
          {(activeState === 'all' || activeState === 'locked') && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#FFB400] block px-1">
                STATE: LOCKED (DIMMED CARD, LOCK, ONE LINE ON HOW TO UNLOCK)
              </span>
              <ChallengeCard challenge={INITIAL_CHALLENGES[8]} variantOverride="locked" />
            </div>
          )}

          {/* 3. COMPLETED STATE */}
          {(activeState === 'all' || activeState === 'completed') && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#FFB400] block px-1">
                STATE: COMPLETED (TICK, FILLED GRADIENT RING)
              </span>
              <ChallengeCard challenge={INITIAL_CHALLENGES[0]} variantOverride="completed" />
            </div>
          )}

          {/* 4. EMPTY STATE */}
          {(activeState === 'all' || activeState === 'empty') && (
            <div className="p-5 rounded-2xl bg-[#FFFBF4] border border-transparent text-center space-y-2.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#FFB400] block">
                STATE: EMPTY (FRIENDLY INVITATION)
              </span>
              <div className="w-10 h-10 rounded-full bg-[#1FA9E0]/15 text-[#1FA9E0] mx-auto flex items-center justify-center">
                <Inbox size={20} />
              </div>
              <h4 className="text-sm font-semibold text-[#04162A]">
                Your first reflection starts here
              </h4>
              <p className="text-xs text-[#5B6B7A] max-w-xs mx-auto leading-relaxed">
                Check in for a few days or inscribe a fleeting sensation to see your sanctuary blossom.
              </p>
              <Button size="compact" fullWidth={false}>
                Inscribe Reflection
              </Button>
            </div>
          )}

          {/* 5. ERROR STATE */}
          {(activeState === 'all' || activeState === 'error') && (
            <div className="p-5 rounded-2xl bg-[#FFFBF4] border border-red-500/30 text-center space-y-2.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-red-400 block">
                STATE: ERROR (PLAIN WORDS: WHAT WENT WRONG AND WHAT TO DO NEXT)
              </span>
              <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
                <ShieldAlert size={20} />
              </div>
              <h4 className="text-sm font-semibold text-[#04162A]">
                This isn't a Yugal card.
              </h4>
              <p className="text-xs text-[#5B6B7A] max-w-xs mx-auto leading-relaxed">
                We couldn't recognize this QR stamp. Make sure you are scanning a card from your physical Yugal Reset Box, or type the 4-digit code stamped inside.
              </p>
              <div className="flex gap-2 justify-center pt-1">
                <Button size="compact" fullWidth={false} icon={<RotateCcw size={13} />}>
                  Scan Again
                </Button>
                <Button variant="outline" size="compact" fullWidth={false}>
                  Enter Code
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
