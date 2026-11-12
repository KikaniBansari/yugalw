import React, { useState } from 'react';
import { Badge } from '../../types/yugal';
import { INITIAL_BADGES } from '../../data/yugalData';
import { X, Award, Sparkles, Footprints, Waves, Eye, Sun, Wind, Coffee, Flame, Heart, Shield, BookMarked, Crown, Coins, ShoppingBag, Star, ChevronRight, Lock, Check } from 'lucide-react';
import { playSoftTap, playSingingBowl } from '../../utils/audio';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges?: Badge[];
  coins?: number;
}

const BADGE_ICONS: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Footprints, Waves, Eye, Sun, Wind, Coffee, Flame, Heart, Sparkles, Shield, BookMarked, Crown,
};

const SKILL_SHOP_ITEMS = [
  { id: 's1', title: 'Bonus Expert Practice', desc: 'Unlock an exclusive 20-min deep practice with Dr. Priya Sharma', cost: 50, emoji: '🌿', category: 'Practice' },
  { id: 's2', title: 'Guided Audio Session', desc: 'A 15-min guided sleep restoration audio by Dr. Meera Kapoor', cost: 40, emoji: '🎵', category: 'Audio' },
  { id: 's3', title: 'Affirmation Pack: Radiance', desc: '21 new affirmations for your inner light, curated by Yugal experts', cost: 30, emoji: '✨', category: 'Affirmations' },
  { id: 's4', title: 'Profile Theme: Dawn', desc: 'A warm sunrise colour theme for your personal space', cost: 20, emoji: '🌅', category: 'Theme' },
  { id: 's5', title: 'Cycle Ritual Guide', desc: 'Phase-by-phase rituals aligned to your cycle, in PDF', cost: 60, emoji: '🌙', category: 'Guide' },
  { id: 's6', title: 'Profile Theme: Midnight', desc: 'Deep velvet theme with soft glow accents', cost: 20, emoji: '🌌', category: 'Theme' },
];

const COIN_HISTORY = [
  { label: 'Verified: Palm Over Heart', amount: +10, date: 'Today' },
  { label: 'Verified: Grounding Breath', amount: +10, date: 'Yesterday' },
  { label: '7-Day Streak Bonus', amount: +25, date: 'Oct 28' },
  { label: 'Verified: Body Scan Flow', amount: +10, date: 'Oct 27' },
  { label: 'First Scan Badge', amount: +15, date: 'Oct 26' },
];

type RewardTab = 'badges' | 'coins' | 'shop';

export const RewardsModal: React.FC<RewardsModalProps> = ({
  isOpen,
  onClose,
  badges = INITIAL_BADGES,
  coins = 85,
}) => {
  const [activeTab, setActiveTab] = useState<RewardTab>('badges');
  const [filter, setFilter] = useState<'ALL' | 'earned' | 'in_progress' | 'locked'>('ALL');
  const [purchaseItem, setPurchaseItem] = useState<typeof SKILL_SHOP_ITEMS[0] | null>(null);
  const [ownedIds, setOwnedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const filteredBadges = badges.filter((b) => filter === 'ALL' || b.status === filter);
  const earnedCount = badges.filter((b) => b.status === 'earned').length;

  const handlePurchase = () => {
    if (!purchaseItem) return;
    playSingingBowl(528, 2);
    setOwnedIds((prev) => [...prev, purchaseItem.id]);
    setPurchaseItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-[#04162A]/40 backdrop-blur-md select-none">
      <div className="relative w-full max-w-md bg-[#F6EEE1] border border-[rgba(201,204,224,0.12)] rounded-3xl p-5 text-[#04162A] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-transparent">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#FFB400]">REWARDS</span>
            <h3 className="text-base font-bold text-[#04162A]">Coins · Badges · Shop</h3>
          </div>
          <div className="flex items-center gap-3">
            {/* Coin pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFB400]/15 border border-[#FFB400]/30">
              <span className="text-sm">🪙</span>
              <span className="text-sm font-bold text-[#FFB400]">{coins}</span>
            </div>
            <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-[#FFFBF4] flex items-center justify-center text-[#5B6B7A] cursor-pointer hover:text-[#04162A]">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 pt-3 pb-1">
          {(['badges', 'coins', 'shop'] as RewardTab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { playSoftTap(); setActiveTab(t); }}
              className={`flex-1 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${activeTab === t ? 'text-[#F6EEE1]' : 'bg-[#FFFBF4] text-[#5B6B7A]'}`}
              style={activeTab === t ? { background: 'linear-gradient(135deg, #FFB400, #F2711C, #C94A9B, #8A4FB8)' } : {}}
            >
              {t === 'shop' ? 'Skill Shop' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── BADGES ── */}
        {activeTab === 'badges' && (
          <>
            <p className="text-[11px] text-[#5B6B7A]/60 pt-1">{earnedCount} of {badges.length} earned</p>
            <div className="flex items-center gap-1.5 py-2 overflow-x-auto scrollbar-none">
              {(['ALL', 'earned', 'in_progress', 'locked'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => { playSoftTap(); setFilter(st); }}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap capitalize transition-all cursor-pointer ${filter === st ? 'text-[#F6EEE1]' : 'bg-[#FFFBF4] text-[#5B6B7A] border border-transparent'}`}
                  style={filter === st ? { background: 'linear-gradient(135deg, #FFB400, #C94A9B)' } : {}}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-3 pr-1 pb-2">
              {filteredBadges.map((badge) => {
                const IconComp = BADGE_ICONS[badge.iconName] || Award;
                const isEarned = badge.status === 'earned';
                const isInProgress = badge.status === 'in_progress';
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl flex flex-col justify-between text-left transition-all ${isEarned ? 'bg-[#FFFBF4] border border-[#FFB400]/40 shadow-[0_0_12px_rgba(255,180,0,0.15)]'
                        : isInProgress ? 'bg-[#FFFBF4]/80 border border-[#1FA9E0]/30'
                          : 'bg-[#FFFBF4]/40 border border-transparent opacity-55'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEarned ? 'text-[#F6EEE1]' : isInProgress ? 'bg-[#1FA9E0]/20 text-[#1FA9E0]' : 'bg-[#F6EEE1] text-[#5B6B7A]/30'
                          }`}
                        style={isEarned ? { background: 'linear-gradient(135deg, #FFB400, #F2711C, #C94A9B, #8A4FB8)' } : {}}
                      >
                        <IconComp size={18} />
                      </div>
                      <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${isEarned ? 'text-emerald-400 bg-emerald-500/10' : isInProgress ? 'text-[#FFB400] bg-[#FFB400]/10' : 'text-[#5B6B7A]/30'}`}>
                        {isEarned ? '✓ EARNED' : isInProgress ? 'IN PROGRESS' : '🔒 LOCKED'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#04162A] leading-tight">{badge.title}</h4>
                      <p className="text-[10px] text-[#5B6B7A]/60 mt-1 leading-snug line-clamp-2">{badge.description}</p>
                    </div>
                    {badge.earnedDate && (
                      <span className="text-[9px] text-[#FFB400]/70 font-mono mt-2 block">Earned {badge.earnedDate}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── COINS ── */}
        {activeTab === 'coins' && (
          <div className="flex-1 overflow-y-auto space-y-4 pt-3 pr-1">
            {/* Balance */}
            <div className="p-5 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, #FFB400/20, #C94A9B/10)', border: '1px solid rgba(255,180,0,0.2)' }}>
              <span className="text-4xl">🪙</span>
              <p className="text-4xl font-black text-[#FFB400] mt-1">{coins}</p>
              <p className="text-xs text-[#5B6B7A]/70">coins available</p>
              <p className="text-[10px] text-[#5B6B7A]/50 mt-1">Earn 10 coins per verified challenge · 25 bonus for streaks</p>
            </div>

            {/* Streak/weekly goal */}
            <div className="p-4 rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.08)] space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[#04162A]">Weekly Goal</p>
                <p className="text-xs text-[#FFB400] font-mono">4 / 5 done</p>
              </div>
              <div className="w-full h-2 rounded-full bg-[#F6EEE1]">
                <div className="h-2 rounded-full" style={{ width: '80%', background: 'linear-gradient(90deg, #FFB400, #C94A9B)' }} />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#5B6B7A]/60">
                <span className="flex items-center gap-1"><Flame size={10} className="text-orange-400" /> 7-day streak 🔥</span>
                <button onClick={() => playSoftTap()} className="text-[#FFB400] cursor-pointer hover:underline">Take a rest day</button>
              </div>
            </div>

            {/* Coin history */}
            <div>
              <p className="text-xs font-bold text-[#04162A] mb-2">Coin history</p>
              <div className="space-y-2">
                {COIN_HISTORY.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#FFFBF4] border border-transparent">
                    <div>
                      <p className="text-xs font-medium text-[#04162A]">{item.label}</p>
                      <p className="text-[10px] text-[#5B6B7A]/50">{item.date}</p>
                    </div>
                    <span className={`text-sm font-bold ${item.amount > 0 ? 'text-[#FFB400]' : 'text-rose-400'}`}>
                      {item.amount > 0 ? '+' : ''}{item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SKILL SHOP ── */}
        {activeTab === 'shop' && (
          <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-1">
            <p className="text-xs text-[#5B6B7A]/60">Spend your coins on expert extras and personal touches</p>
            {SKILL_SHOP_ITEMS.map((item) => {
              const owned = ownedIds.includes(item.id);
              const canAfford = coins >= item.cost;
              return (
                <div key={item.id} className={`p-4 rounded-2xl border transition-all ${owned ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-[#FFFBF4] border-[rgba(201,204,224,0.08)]'}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-[#04162A]">{item.title}</p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${owned ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#FFB400]/15 text-[#FFB400]'}`}>
                          {owned ? '✓ Owned' : `🪙 ${item.cost}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5B6B7A]/60 mt-0.5 leading-snug">{item.desc}</p>
                      {!owned && (
                        <div className="mt-2 flex items-center gap-2">
                          {canAfford ? (
                            <button
                              onClick={() => { playSoftTap(); setPurchaseItem(item); }}
                              className="px-3 py-1 rounded-full text-[11px] font-semibold text-[#F6EEE1] cursor-pointer"
                              style={{ background: 'linear-gradient(135deg, #FFB400, #F2711C)' }}
                            >
                              Unlock
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 text-[10px] text-[#5B6B7A]/50">
                              <Lock size={10} />
                              <span>You're {item.cost - coins} coins away</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirm Purchase Sheet */}
      {purchaseItem && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60">
          <div className="w-full max-w-md bg-[#FFFBF4] rounded-t-3xl border-t border-[rgba(201,204,224,0.12)] p-6 space-y-4 pb-10">
            <div className="w-10 h-1 rounded-full bg-white/20 mx-auto" />
            <div className="text-center">
              <span className="text-3xl">{purchaseItem.emoji}</span>
              <h3 className="text-lg font-bold text-[#04162A] mt-2">{purchaseItem.title}</h3>
              <p className="text-xs text-[#5B6B7A]/70 mt-1">{purchaseItem.desc}</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F6EEE1] border border-[rgba(201,204,224,0.08)] flex items-center justify-between">
              <span className="text-sm text-[#5B6B7A]">Cost</span>
              <span className="text-sm font-bold text-[#FFB400]">🪙 {purchaseItem.cost} coins</span>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-[#F6EEE1] cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #FFB400, #F2711C, #C94A9B)' }}
            >
              Confirm — Unlock now
            </button>
            <button onClick={() => { playSoftTap(); setPurchaseItem(null); }} className="w-full text-center text-xs text-[#5B6B7A]/50 cursor-pointer py-1">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
