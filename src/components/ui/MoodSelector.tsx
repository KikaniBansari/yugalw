import React from 'react';
import { MoodType } from '../../types/yugal';
import { playSoftTap } from '../../utils/audio';
import { MoodFace } from './MoodFace';

const MOODS: MoodType[] = ['Low', 'Tired', 'Okay', 'Good', 'Radiant'];

const TINT: Record<MoodType, string> = {
  Low: '#E8D7F5',
  Tired: '#CDEBF8',
  Okay: '#FFD9BF',
  Good: '#FFE7A8',
  Radiant: '#F7D3E8',
};

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onSelectMood: (mood: MoodType) => void;
  className?: string;
  compact?: boolean;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelectMood,
  className = '',
  compact = false,
}) => {
  return (
    <div className={`flex items-center justify-between gap-2 w-full ${className}`}>
      {MOODS.map((m) => {
        const isSelected = selectedMood === m;
        return (
          <button
            key={m}
            type="button"
            onClick={() => {
              playSoftTap();
              onSelectMood(m);
            }}
            className={`flex-1 flex flex-col items-center justify-center rounded-full transition-all cursor-pointer min-h-[48px] ${
              compact ? 'py-1.5 px-1' : 'py-2 px-1'
            } ${isSelected ? 'scale-[1.04] ring-2 ring-[#FFB400]' : ''}`}
            style={{ backgroundColor: TINT[m] }}
          >
            <MoodFace mood={m} size={compact ? 28 : 34} />
            <span
              className={`text-[10px] font-semibold tracking-wide mt-0.5 ${
                isSelected ? 'text-[#04162A]' : 'text-[#5B6B7A]'
              }`}
            >
              {m}
            </span>
          </button>
        );
      })}
    </div>
  );
};
