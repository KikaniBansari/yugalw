import React from 'react';
import { Home, ActivitySquare, QrCode, Bot, BookOpen } from 'lucide-react';
import { playSoftTap } from '../utils/audio';

export type YugalTab = 'home' | 'cycle' | 'yugal_ai' | 'journal';

interface NavigationProps {
  activeTab: YugalTab;
  onTabChange: (tab: YugalTab) => void;
  onOpenScanner: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  onOpenScanner,
}) => {
  const handleTabClick = (tab: YugalTab) => {
    playSoftTap();
    onTabChange(tab);
  };

  const tabs = [
    { id: 'home' as YugalTab, label: 'Home', Icon: Home },
    { id: 'cycle' as YugalTab, label: 'Phases', Icon: ActivitySquare },
  ];
  const rightTabs = [
    { id: 'journal' as YugalTab, label: 'Journal', Icon: BookOpen },
    { id: 'yugal_ai' as YugalTab, label: 'Yugal AI', Icon: Bot },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-0 inset-x-0 z-40 flex justify-center pointer-events-none pb-4"
    >
      <div className="w-[min(100%,390px)] px-4 pointer-events-auto relative">
        <div className="h-[64px] bg-white rounded-full px-3 flex items-center justify-between relative shadow-[0_12px_40px_rgba(4,22,42,0.16)]">
          <div className="flex items-center flex-1 justify-around pr-8">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleTabClick(id)}
                className="flex flex-col items-center justify-center py-1 min-h-[48px] min-w-[48px] transition-all cursor-pointer"
              >
                <Icon
                  size={20}
                  className={activeTab === id ? 'text-[#FFB400]' : 'text-[#5B6B7A]'}
                />
                <span
                  className={`text-[10px] font-semibold tracking-wide mt-0.5 ${
                    activeTab === id ? 'text-[#FFB400]' : 'text-[#5B6B7A]'
                  }`}
                >
                  {label}
                </span>
                {activeTab === id && <span className="w-1.5 h-1.5 rounded-full bg-[#FFB400] mt-0.5" />}
              </button>
            ))}
          </div>

          <div className="absolute left-1/2 -top-[18px] -translate-x-1/2 flex flex-col items-center">
            <div className="absolute -inset-1 rounded-full opacity-50 blur-md animate-pulse pointer-events-none bg-spectrum-gradient" />
            <button
              type="button"
              onClick={() => {
                playSoftTap();
                onOpenScanner();
              }}
              title="Scan your card"
              className="relative w-[60px] h-[60px] rounded-full text-white flex items-center justify-center ring-4 ring-[#F6EEE1] active:scale-95 transition-all cursor-pointer shadow-focal-glow bg-spectrum-gradient"
            >
              <QrCode size={24} />
            </button>
          </div>

          <div className="flex items-center flex-1 justify-around pl-8">
            {rightTabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleTabClick(id)}
                className="flex flex-col items-center justify-center py-1 min-h-[48px] min-w-[48px] transition-all cursor-pointer"
              >
                <Icon
                  size={20}
                  className={activeTab === id ? 'text-[#FFB400]' : 'text-[#5B6B7A]'}
                />
                <span
                  className={`text-[10px] font-semibold tracking-wide mt-0.5 ${
                    activeTab === id ? 'text-[#FFB400]' : 'text-[#5B6B7A]'
                  }`}
                >
                  {label}
                </span>
                {activeTab === id && <span className="w-1.5 h-1.5 rounded-full bg-[#FFB400] mt-0.5" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
