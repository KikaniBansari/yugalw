import React, { useState } from 'react';
import { UserProfile, LifePhase } from '../../types/yugal';
import { X, Bell, Lock, Heart, RefreshCw, HelpCircle, LogOut, Trash2, ChevronRight, Check, Sun, Moon } from 'lucide-react';
import { playSoftTap } from '../../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateLifePhase: (phase: LifePhase) => void;
  onRetakeAssessment: () => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateLifePhase,
  onRetakeAssessment,
  onLogout,
  theme,
  onThemeChange,
}) => {
  const [notifications, setNotifications] = useState(true);
  const [soundChimes, setSoundChimes] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLifePhaseSelect, setShowLifePhaseSelect] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#04162A]/40 backdrop-blur-md select-none">
      <div className="relative w-full max-w-md bg-[#F6EEE1] border border-[rgba(201,204,224,0.15)] rounded-3xl p-5 text-[#04162A] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-transparent">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#FFB400]">
              SANCTUARY CONFIGURATION
            </span>
            <h3 className="text-base font-semibold text-[#04162A]">
              Settings & Privacy
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

        {/* Settings List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
          <div className="p-4 rounded-2xl bg-[#FFFBF4] border border-transparent space-y-3">
            <span className="text-xs font-semibold text-[#FFB400] uppercase tracking-wider block">
              Appearance
            </span>
            <p className="text-[11px] text-[#5B6B7A]">Choose how Yugal looks on this device.</p>
            <div className="grid grid-cols-2 gap-2">
              {([
                { value: 'light', label: 'Light mode', Icon: Sun },
                { value: 'dark', label: 'Dark mode', Icon: Moon },
              ] as const).map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={theme === value}
                  onClick={() => {
                    playSoftTap();
                    onThemeChange(value);
                  }}
                  className={`min-h-[44px] rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-colors ${
                    theme === value
                      ? 'bg-[#FFB400]/20 border-[#FFB400]/60 text-[#04162A]'
                      : 'bg-[#F6EEE1] border-transparent text-[#5B6B7A]'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="p-4 rounded-2xl bg-[#FFFBF4] border border-transparent space-y-3">
            <span className="text-xs font-semibold text-[#FFB400] uppercase tracking-wider block">
              Preferences
            </span>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Bell size={16} className="text-[#5B6B7A]" />
                <div>
                  <span className="text-[#04162A] font-medium block">Daily Gentle Reminder</span>
                  <span className="text-[10px] text-[#5B6B7A]/60">Morning & dusk unhurried prompts</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="accent-[#FFB400] w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-transparent">
              <div className="flex items-center gap-2.5">
                <Lock size={16} className="text-[#5B6B7A]" />
                <div>
                  <span className="text-[#04162A] font-medium block">Privacy & End-to-End Vault</span>
                  <span className="text-[10px] text-[#5B6B7A]/60">Your journal entries never train public models</span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">LOCKED</span>
            </div>
          </div>

          {/* Life Phase Setting */}
          <div className="p-4 rounded-2xl bg-[#FFFBF4] border border-transparent space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Heart size={16} className="text-[#C94A9B]" />
                <div>
                  <span className="text-[#04162A] font-medium block">Current Life Phase</span>
                  <span className="text-[11px] text-[#FFB400]">{user.lifePhase}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLifePhaseSelect(!showLifePhaseSelect)}
                className="text-xs text-[#1FA9E0] underline"
              >
                Change
              </button>
            </div>

            {showLifePhaseSelect && (
              <div className="pt-2 space-y-1.5 border-t border-transparent">
                {(['Unmarried', 'Recently married', 'Pregnancy', 'Postpartum', 'Peri Menopause', 'Post Menopause', 'Prefer not to say'] as LifePhase[]).map((lp) => (
                  <button
                    key={lp}
                    type="button"
                    onClick={() => {
                      playSoftTap();
                      onUpdateLifePhase(lp);
                      setShowLifePhaseSelect(false);
                    }}
                    className={`w-full p-2 rounded-xl text-left text-xs transition-colors ${user.lifePhase === lp
                        ? 'bg-[#FFB400]/20 text-[#FFB400] font-semibold'
                        : 'bg-[#F6EEE1]/50 text-[#5B6B7A] hover:text-[#04162A]'
                      }`}
                  >
                    {lp}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Retake Assessment & Help */}
          <div className="rounded-2xl bg-[#FFFBF4] border border-transparent divide-y divide-[#04162A]/8 overflow-hidden">
            <button
              type="button"
              onClick={() => {
                playSoftTap();
                onClose();
                onRetakeAssessment();
              }}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F6EEE1] text-xs text-[#04162A] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <RefreshCw size={15} className="text-[#1FA9E0]" />
                <span>Retake Baseline Assessment</span>
              </div>
              <ChevronRight size={14} className="text-[#5B6B7A]/50" />
            </button>

            <button
              type="button"
              onClick={() => playSoftTap()}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F6EEE1] text-xs text-[#04162A] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle size={15} className="text-[#FFB400]" />
                <span>Reset Box Support & Guide FAQ</span>
              </div>
              <ChevronRight size={14} className="text-[#5B6B7A]/50" />
            </button>
          </div>

          {/* Account Actions: Log Out & Delete Account */}
          <div className="rounded-2xl bg-[#FFFBF4] border border-transparent divide-y divide-[#04162A]/8 overflow-hidden">
            <button
              type="button"
              onClick={() => {
                playSoftTap();
                onClose();
                onLogout();
              }}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-rose-500/10 text-xs text-rose-400 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <LogOut size={15} />
                <span>Log out</span>
              </div>
              <ChevronRight size={14} className="opacity-50" />
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-red-900/20 text-xs text-red-400 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Trash2 size={15} />
                <span>Delete Account & Inscriptions</span>
              </div>
              <ChevronRight size={14} className="opacity-50" />
            </button>
          </div>

          {showDeleteConfirm && (
            <div className="p-3.5 rounded-2xl bg-red-950/30 border border-red-500/30 text-xs space-y-2">
              <span className="font-semibold text-red-300 block">
                Are you sure?
              </span>
              <p className="text-[#5B6B7A]/80 leading-relaxed text-[11px]">
                This permanently erases all journal entries, challenge milestones, and paired box status from this device.
              </p>
              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="w-full py-2 rounded-xl bg-red-600 text-[#04162A] font-semibold text-xs"
              >
                Yes, Delete Permanently
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
