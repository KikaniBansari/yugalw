import React, { useState } from 'react';
import { Challenge, MoodType, UserProfile, Affirmation } from '../../types/yugal';
import { PHASE_CONFIG } from '../../data/yugalData';
import { RadialProgressRing } from '../RadialProgressRing';
import { MoodSelector } from '../ui/MoodSelector';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { Ticker } from '../ui/Ticker';
import {
  QrCode,
  Shuffle,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Flame,
  Coins,
  Send,
} from 'lucide-react';
import { playSoftTap } from '../../utils/audio';

interface HomeScreenProps {
  user: UserProfile;
  challenges: Challenge[];
  activeChallenge: Challenge;
  todayAffirmation: Affirmation;
  onOpenScanner: (challenge?: Challenge) => void;
  onPickRandom: () => void;
  onSelectChallenge: (challenge: Challenge) => void;
  onSaveJournalSnippet: (text: string, mood: MoodType) => void;
  onToggleSaveAffirmation: (id: string) => void;
  onNavigateTab: (tab: 'journal' | 'cycle' | 'yugal_ai') => void;
  onOpenProfile: () => void;
  coins?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  challenges,
  todayAffirmation,
  onOpenScanner,
  onPickRandom,
  onSaveJournalSnippet,
  onToggleSaveAffirmation,
  onNavigateTab,
  onOpenProfile,
  coins = 85,
}) => {
  const [currentMood, setCurrentMood] = useState<MoodType>('Good');
  const [privateThought, setPrivateThought] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Saved');

  const completedCount = challenges.filter((c) => c.status === 'completed').length;
  const meta = PHASE_CONFIG.CALM;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2800);
  };

  const handleSaveAffirmation = () => {
    playSoftTap();
    onToggleSaveAffirmation(todayAffirmation.id);
    triggerToast(todayAffirmation.isSaved ? 'Removed from saved' : 'Saved');
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="space-y-5 pb-28 animate-in fade-in duration-300">
      <Toast message={toastMessage} isVisible={showSavedToast} />

      <div className="pt-1 flex items-center justify-between">
        <div>
          <span className="label-caps text-[11px]">{formattedDate}</span>
          <h1 className="text-[28px] headline-tight text-[#04162A] mt-1">
            Hello, <span className="text-[#C93A22]">{user.name}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FFE7A8] text-[12px] text-[#04162A] font-semibold min-h-[36px]">
            <Coins size={13} />
            <span>{coins}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FFD9BF] text-[12px] text-[#04162A] font-semibold min-h-[36px]">
            <Flame size={13} className="text-[#F2711C]" />
            <span>{user.streakDays}</span>
          </div>
          <button
            type="button"
            onClick={onOpenProfile}
            className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#FFB400]/50 cursor-pointer"
          >
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <Ticker />

      <div className="p-5 rounded-[32px] bg-[#04162A] relative overflow-hidden flex items-center justify-between gap-3">
        <div className="absolute -top-8 -right-6 w-36 h-36 rounded-full bg-[#FFB400]/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 left-8 w-28 h-28 rounded-full bg-[#C94A9B]/20 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex-1">
          <span className="label-caps text-[10px]">Reset box</span>
          <h2 className="text-[22px] headline-tight text-[#F6EEE1] mt-2">
            <span className="numeral-light text-[40px] text-[#FFB400] leading-none block">{completedCount}</span>
            of 21 challenges completed
          </h2>
          <p className="text-xs text-[#F6EEE1]/70 mt-2 leading-relaxed">
            You are in CALM. One card at a time.
          </p>
        </div>
        <div className="relative z-10 flex-shrink-0">
          <RadialProgressRing
            completed={completedCount}
            total={21}
            currentPhaseColor={meta.color}
            size={128}
            strokeWidth={8}
            dark
          />
        </div>
      </div>

      <div className="space-y-2.5">
        <p className="text-[15px] font-extrabold text-[#04162A]">How are you feeling today?</p>
        <MoodSelector
          selectedMood={currentMood}
          onSelectMood={(m) => {
            setCurrentMood(m);
            triggerToast(`Mood logged: ${m}`);
          }}
        />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const entry = privateThought.trim();
          if (!entry) return;
          onSaveJournalSnippet(entry, currentMood);
          setPrivateThought('');
          triggerToast('Saved to your private journal');
        }}
        className="p-5 rounded-[28px] bg-[#FFFBF4] border border-[#04162A] space-y-3"
      >
        <div className="flex items-center justify-between">
          <label htmlFor="home-private-thought" className="text-sm font-extrabold text-[#04162A]">
            What's on your mind
          </label>
          <span className="text-xs font-medium text-[#5B6B7A]">{privateThought.length}/280</span>
        </div>
        <textarea
          id="home-private-thought"
          value={privateThought}
          onChange={(event) => setPrivateThought(event.target.value.slice(0, 280))}
          maxLength={280}
          rows={3}
          placeholder="Record a sensation, physical ease, or unsaid tension..."
          className="w-full resize-none rounded-2xl border border-[#04162A] bg-[#F6EEE1] px-4 py-3 text-sm text-[#04162A] placeholder-[#5B6B7A]/60 outline-none focus:border-[#FFB400]"
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] italic text-[#5B6B7A]">
            Encrypted &amp; strictly private to you
          </span>
          <button
            type="submit"
            disabled={!privateThought.trim()}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#FFB400] px-5 text-sm font-semibold text-[#04162A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save <Send size={14} />
          </button>
        </div>
      </form>

      <div
        className="dark-theme-highlight p-5 rounded-[28px] relative overflow-hidden min-h-[150px] flex flex-col"
        style={{ backgroundColor: '#FFE7A8' }}
      >
        <div className="flex items-center justify-between">
          <span className="label-caps text-[10px] text-[#04162A]/70">{todayAffirmation.authorOrPhase}</span>
          <button
            type="button"
            onClick={handleSaveAffirmation}
            className="p-2 rounded-full bg-white/50 cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            {todayAffirmation.isSaved ? <BookmarkCheck size={16} className="text-[#C93A22]" /> : <Bookmark size={16} className="text-[#04162A]" />}
          </button>
        </div>
        <p className="text-[18px] font-medium text-[#04162A] leading-relaxed text-center my-auto py-3">
          “{todayAffirmation.text}”
        </p>
        <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#04162A]/50 text-center">
          A Yugal wellness initiative
        </span>
      </div>

      <button
        onClick={() => { playSoftTap(); onNavigateTab('cycle'); }}
        className="w-full p-3.5 rounded-[24px] bg-[#CDEBF8] flex items-center justify-between cursor-pointer min-h-[64px]"
      >
        <div className="text-left">
          <p className="text-sm font-extrabold text-[#04162A]">Day 14 · Ovulation window</p>
          <p className="text-[12px] text-[#5B6B7A]">Energy is rising, a good day for MOVE challenges</p>
        </div>
        <ChevronRight size={16} className="text-[#04162A]" />
      </button>

      <div className="space-y-2.5">
        <Button variant="primary" onClick={() => onOpenScanner()} icon={<QrCode size={18} />}>
          Scan your card
        </Button>
        <Button variant="outline" onClick={onPickRandom} icon={<Shuffle size={16} />}>
          Pick at random
        </Button>
      </div>
    </div>
  );
};
