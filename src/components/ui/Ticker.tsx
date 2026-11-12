import React from 'react';

export const Ticker: React.FC<{ messages?: string[] }> = ({
  messages = [
    'Stop guessing. Start understanding.',
    'Harmony held in balance.',
    'Your health deserves more than guesswork.',
    'One card. One gentle practice.',
  ],
}) => {
  const loop = [...messages, ...messages];
  return (
    <div className="w-full overflow-hidden rounded-full bg-[#FFB400] py-2">
      <div className="flex whitespace-nowrap animate-ticker">
        {loop.map((msg, i) => (
          <span key={i} className="px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#04162A]">
            {msg} ·
          </span>
        ))}
      </div>
    </div>
  );
};
