import React from 'react';
import { Volume2, VolumeX, Cloud } from 'lucide-react';
import { playSoftTap, playSingingBowl } from '../utils/audio';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  isSignedIn?: boolean;
  userEmail?: string | null;
  onGoogleSignIn?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  isSignedIn = false,
  userEmail,
  onGoogleSignIn,
}) => {
  const handleSoundClick = () => {
    playSoftTap();
    if (!soundEnabled) playSingingBowl(432, 1.5);
    onToggleSound();
  };

  const chip =
    'px-2 py-1 rounded-full bg-[#FFFBF4] text-[10px] font-semibold tracking-wide flex items-center gap-1 cursor-pointer text-[#04162A] shadow-gold-halo min-h-[28px]';

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F6EEE1]/90 backdrop-blur-md px-3 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src="/assets/yugal-logo.png"
          alt="Yugal"
          className="w-9 h-9 rounded-full object-cover flex-shrink-0 shadow-focal-glow"
        />
        <div>
          <span className="text-sm font-extrabold tracking-tight text-[#04162A] leading-none">
            yugal
          </span>
          <span className="text-[10px] text-[#5B6B7A] tracking-[0.12em] uppercase block leading-tight mt-0.5">
            Harmony held in balance
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {onGoogleSignIn && (
          <button
            type="button"
            onClick={() => {
              playSoftTap();
              onGoogleSignIn();
            }}
            className={chip}
            title={isSignedIn ? `Synced (${userEmail || 'Google'})` : 'Sign in with Google'}
          >
            <Cloud size={11} className={isSignedIn ? 'text-[#1FA9E0]' : 'text-[#FFB400]'} />
            <span className="hidden sm:inline">{isSignedIn ? 'Synced' : 'Sync'}</span>
          </button>
        )}
        <button
          type="button"
          onClick={handleSoundClick}
          className="p-1.5 rounded-full bg-[#FFFBF4] text-[#04162A] cursor-pointer shadow-gold-halo"
        >
          {soundEnabled ? <Volume2 size={14} className="text-[#FFB400]" /> : <VolumeX size={14} />}
        </button>
      </div>
    </header>
  );
};
