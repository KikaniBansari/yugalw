import React, { useState } from 'react';
import { Expert, Challenge } from '../../types/yugal';
import { EXPERTS } from '../../data/yugalData';
import { X, ChevronLeft, Sparkles, BookOpen, Clock, Heart } from 'lucide-react';
import { playSoftTap } from '../../utils/audio';

interface ExpertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExpert?: Expert | null;
  challenges: Challenge[];
  onSelectChallenge: (challenge: Challenge) => void;
}

export const ExpertsModal: React.FC<ExpertsModalProps> = ({
  isOpen,
  onClose,
  selectedExpert: initialExpert,
  challenges,
  onSelectChallenge,
}) => {
  const [activeExpert, setActiveExpert] = useState<Expert | null>(initialExpert || null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#04162A]/40 backdrop-blur-md select-none">
      <div className="relative w-full max-w-md bg-[#F6EEE1] border border-[rgba(201,204,224,0.15)] rounded-3xl p-5 text-[#04162A] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-transparent relative z-10">
          <div className="flex items-center gap-2">
            {activeExpert ? (
              <button
                type="button"
                onClick={() => {
                  playSoftTap();
                  setActiveExpert(null);
                }}
                className="w-8 h-8 rounded-full bg-[#FFFBF4] flex items-center justify-center text-[#5B6B7A]"
              >
                <ChevronLeft size={16} />
              </button>
            ) : null}
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FFB400]">
                WOMEN’S WELLNESS GUIDES
              </span>
              <h3 className="text-base font-semibold text-[#04162A]">
                {activeExpert ? activeExpert.name : 'Experts Directory'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFFBF4] hover:bg-[#F6EEE1] text-[#5B6B7A] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
          {activeExpert ? (
            /* DETAILED EXPERT PROFILE (Screen 16) */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center p-5 rounded-3xl bg-[#FFFBF4] border border-[#FFB400]/30 shadow-gold-halo relative overflow-hidden">
                <div className="w-20 h-20 rounded-full mx-auto border-2 border-[#FFB400] overflow-hidden shadow-focal-glow mb-2">
                  <img
                    src={activeExpert.avatar}
                    alt={activeExpert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold text-[#04162A]">
                  {activeExpert.name}
                </h4>
                <span className="text-xs text-[#FFB400] font-medium block">
                  {activeExpert.role}
                </span>
                <span className="text-[11px] text-[#5B6B7A]/70 font-mono mt-0.5 block">
                  {activeExpert.speciality}
                </span>

                {/* 50-80 word bio */}
                <p className="text-xs text-[#04162A]/90 leading-relaxed mt-3 pt-3 border-t border-transparent font-['Outfit']">
                  "{activeExpert.bio}"
                </p>
              </div>

              {/* Challenges Led by Expert */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#FFB400] px-1">
                  Challenges Led by {activeExpert.name}
                </span>

                <div className="space-y-2">
                  {challenges
                    .filter((c) => activeExpert.challengesLed.includes(c.number))
                    .map((chal) => (
                      <div
                        key={chal.id}
                        onClick={() => {
                          onClose();
                          onSelectChallenge(chal);
                        }}
                        className="p-3.5 rounded-2xl bg-[#FFFBF4] border border-transparent hover:border-[#FFB400]/50 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-[#FFB400]">
                              Card #{chal.number}
                            </span>
                            <span className="text-[10px] uppercase font-semibold text-[#1FA9E0]">
                              {chal.phase}
                            </span>
                          </div>
                          <h5 className="text-xs font-semibold text-[#04162A]">
                            {chal.title}
                          </h5>
                          <span className="text-[11px] text-[#5B6B7A]/60">
                            {chal.duration} · {chal.intensity}
                          </span>
                        </div>
                        <span className="text-xs text-[#FFB400] font-medium">
                          Open →
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            /* EXPERTS LIST */
            <div className="space-y-3">
              {EXPERTS.map((expert) => (
                <div
                  key={expert.id}
                  onClick={() => {
                    playSoftTap();
                    setActiveExpert(expert);
                  }}
                  className="p-4 rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.1)] hover:border-[#FFB400]/50 transition-all cursor-pointer flex items-center gap-3.5 shadow-gold-halo group"
                >
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/15 group-hover:ring-[#FFB400]/60 transition-all flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#04162A] group-hover:text-[#FFB400] transition-colors truncate">
                      {expert.name}
                    </h4>
                    <span className="text-xs text-[#04162A]/80 block truncate">
                      {expert.role}
                    </span>
                    <span className="text-[10px] text-[#5B6B7A]/60 font-mono block truncate">
                      {expert.speciality}
                    </span>
                  </div>
                  <span className="text-xs text-[#5B6B7A]/50 group-hover:text-[#04162A]">
                    →
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
