import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { PhaseTag, FilterChip, AttributeChip } from '../ui/Chips';
import { MoodSelector } from '../ui/MoodSelector';
import { ChallengeCard } from '../ui/ChallengeCard';
import { GlowingCircles } from '../ui/GlowingCircles';
import { GlowingLoader } from '../ui/GlowingLoader';
import { Toast } from '../ui/Toast';
import { RadialProgressRing } from '../RadialProgressRing';
import { INITIAL_CHALLENGES, INITIAL_BADGES, EXPERTS, PHASE_CONFIG } from '../../data/yugalData';
import { Phase, MoodType } from '../../types/yugal';
import { X, Sparkles, Heart, Clock, Award, Shield, Check, MessageSquare, Bot, User } from 'lucide-react';
import { playSoftTap } from '../../utils/audio';

interface UiKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UiKitModal: React.FC<UiKitModalProps> = ({ isOpen, onClose }) => {
  const [demoMood, setDemoMood] = useState<MoodType>('Radiant');
  const [showDemoToast, setShowDemoToast] = useState(false);
  const [activeSection, setActiveSection] = useState<'foundations' | 'buttons' | 'cards' | 'inputs' | 'feedback'>('foundations');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#04162A]/40 backdrop-blur-md select-none">
      <Toast message="Saved to your private sanctuary" isVisible={showDemoToast} />

      <div className="relative w-full max-w-lg bg-[#F6EEE1] border border-[rgba(201,204,224,0.2)] rounded-3xl p-5 text-[#04162A] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-transparent">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB400] animate-ping" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FFB400]">
                DESIGN SYSTEM & UI KIT
              </span>
            </div>
            <h3 className="text-base font-semibold text-[#04162A]">
              Yugal Components & Foundations
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

        {/* Section Tabs */}
        <div className="py-2.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-b border-transparent">
          {(['foundations', 'buttons', 'cards', 'inputs', 'feedback'] as const).map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => {
                playSoftTap();
                setActiveSection(sec);
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all cursor-pointer ${
                activeSection === sec
                  ? 'bg-spectrum-gradient text-[#04162A] font-semibold shadow-coral-halo'
                  : 'bg-[#FFFBF4] text-[#5B6B7A] hover:text-[#04162A]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto py-3 space-y-5 pr-1 text-xs">
          {/* SECTION 1: FOUNDATIONS */}
          {activeSection === 'foundations' && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  1. Color Tokens & Brand Gradient
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#F6EEE1] border border-[#04162A]/10 flex items-center justify-between">
                    <span>Background</span>
                    <span className="font-mono text-[#5B6B7A]">#F6EEE1</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFFBF4] border border-[#04162A]/10 flex items-center justify-between">
                    <span>Surface (Cards/Panels)</span>
                    <span className="font-mono text-[#5B6B7A]">#FFFBF4</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-spectrum-gradient text-[#04162A] font-semibold col-span-2 text-center py-2 shadow-coral-halo">
                    Brand Accent Gradient (Gold → Orange → Coral → Magenta → Violet → Sky Blue)
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  2. Five Phase Spectrum Tokens ("Inner Journey")
                </span>
                <div className="space-y-1.5">
                  {(Object.keys(PHASE_CONFIG) as Phase[]).map((p) => {
                    const meta = PHASE_CONFIG[p];
                    return (
                      <div
                        key={p}
                        className="p-2.5 rounded-xl bg-[#FFFBF4] border border-transparent flex items-center justify-between"
                      >
                        <PhaseTag phase={p} />
                        <span className="text-[11px] text-[#5B6B7A]">{meta.tagline}</span>
                        <span className="font-mono text-[10px]" style={{ color: meta.color }}>
                          {meta.color}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  3. Overlapping Glowing Circles Motif
                </span>
                <div className="p-4 rounded-2xl bg-[#FFFBF4] flex items-center justify-around">
                  <GlowingCircles size={100} />
                  <GlowingCircles size={100} colors={['#1FA9E0', '#C94A9B', '#FFB400']} />
                  <GlowingCircles size={100} colors={['#F2711C', '#E8452C', '#8A4FB8']} />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: BUTTONS & CTAS */}
          {activeSection === 'buttons' && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Primary Gradient CTA (Pill 9999px, Height 54px, Scale 0.98 on press)
                </span>
                <Button variant="primary">
                  Begin Restorative Challenge
                </Button>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Outline / Ghost Button
                </span>
                <Button variant="outline">
                  Enter Code Manually
                </Button>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Quiet Text Links
                </span>
                <div className="flex gap-4">
                  <Button variant="text">Skip for now</Button>
                  <Button variant="text">Prefer not to say</Button>
                  <Button variant="text">Watch again</Button>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Phase Filter Chips & Attribute Chips
                </span>
                <div className="flex flex-wrap gap-2">
                  <FilterChip label="All Phases" active={true} />
                  <FilterChip label="MOVE" phase="MOVE" active={false} />
                  <FilterChip label="CALM" phase="CALM" active={true} />
                  <AttributeChip label="12 min" icon={<Clock size={12} />} />
                  <AttributeChip label="No equipment" icon={<Shield size={12} />} />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: CARDS & PROGRESS */}
          {activeSection === 'cards' && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Gradient Progress Ring (0-21 Meter)
                </span>
                <div className="flex justify-center p-3 rounded-2xl bg-[#FFFBF4]">
                  <RadialProgressRing completed={7} total={21} size={130} />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Challenge Card Variants (Default, Completed, Locked)
                </span>
                <div className="space-y-2.5">
                  <ChallengeCard challenge={INITIAL_CHALLENGES[7]} variantOverride="default" />
                  <ChallengeCard challenge={INITIAL_CHALLENGES[0]} variantOverride="completed" />
                  <ChallengeCard challenge={INITIAL_CHALLENGES[8]} variantOverride="locked" />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: INPUTS & MOOD */}
          {activeSection === 'inputs' && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Mood Selector (Low, Tired, Okay, Good, Radiant)
                </span>
                <MoodSelector selectedMood={demoMood} onSelectMood={setDemoMood} />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Journal Input with Character Counter
                </span>
                <div className="rounded-2xl bg-[#FFFBF4] p-3 border border-[rgba(201,204,224,0.12)]">
                  <textarea
                    rows={2}
                    placeholder="What's on your mind?..."
                    className="w-full bg-transparent text-xs text-[#04162A] placeholder-[#5B6B7A]/40 outline-none resize-none"
                  />
                  <div className="text-right text-[10px] text-[#5B6B7A]/50 font-mono">
                    0/280
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Chat Bubbles (User vs AI)
                </span>
                <div className="space-y-2 p-3 rounded-2xl bg-[#FFFBF4]">
                  <div className="flex justify-end">
                    <div className="p-2.5 rounded-2xl bg-spectrum-gradient text-[#04162A] max-w-[80%] rounded-tr-xs">
                      How can I ease my evening cortisol spikes?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="p-2.5 rounded-2xl bg-[#F6EEE1] border border-transparent text-[#04162A] max-w-[80%] rounded-tl-xs">
                      Notice where your shoulders are resting right now. Let's do 3 cycles of Card #5 ocean breathing.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: FEEDBACK & LOADERS */}
          {activeSection === 'feedback' && (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Glowing-Circle Loader
                </span>
                <div className="p-4 rounded-2xl bg-[#FFFBF4] flex justify-center">
                  <GlowingLoader label="Harmonizing sanctuary state..." />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Confirmation Toast
                </span>
                <Button
                  variant="outline"
                  size="compact"
                  onClick={() => {
                    setShowDemoToast(true);
                    setTimeout(() => setShowDemoToast(false), 2400);
                  }}
                >
                  Trigger "Saved" Toast
                </Button>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#FFB400] uppercase tracking-wider block mb-2">
                  Badge Variants (Earned, In Progress, Locked)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#FFFBF4] border border-[#FFB400]/40 text-center">
                    <span className="text-xs font-semibold text-[#04162A] block">Earned</span>
                    <span className="text-[9px] text-emerald-400 font-mono">EARNED</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFFBF4] border border-[#1FA9E0]/40 text-center">
                    <span className="text-xs font-semibold text-[#04162A] block">Active</span>
                    <span className="text-[9px] text-[#FFB400] font-mono">IN PROGRESS</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FFFBF4] border border-transparent opacity-60 text-center">
                    <span className="text-xs font-semibold text-[#04162A] block">Locked</span>
                    <span className="text-[9px] text-[#5B6B7A]/40 font-mono">LOCKED</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
