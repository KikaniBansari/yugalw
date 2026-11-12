import fs from 'fs';

const files = [
  'src/components/onboarding/OnboardingFlow.tsx',
  'src/components/tabs/CycleTab.tsx',
  'src/components/tabs/JournalTab.tsx',
  'src/components/tabs/YugalAiTab.tsx',
  'src/components/tabs/ProfileTab.tsx',
  'src/components/modals/RewardsModal.tsx',
  'src/components/modals/SettingsModal.tsx',
  'src/components/modals/ExpertsModal.tsx',
  'src/components/modals/AffirmationModal.tsx',
  'src/components/modals/UiKitModal.tsx',
  'src/components/modals/StatesModal.tsx',
];

const pairs = [
  ['#04061A', '#F6EEE1'],
  ['#07121C', '#F6EEE1'],
  ['#0D1030', '#FFFBF4'],
  ['#0F1F2D', '#FFFBF4'],
  ['#16293A', '#FFF8EC'],
  ['#171A3F', '#FFE7A8'],
  ['#FFB800', '#FFB400'],
  ['#C9CCE0', '#5B6B7A'],
  ['#C9D3DC', '#5B6B7A'],
  ['#DFE0FE', '#04162A'],
  ['#2FA8F0', '#1FA9E0'],
  ['#D6469A', '#C94A9B'],
  ['#9B4FB5', '#8A4FB8'],
  ['#FF7A1A', '#F2711C'],
  ['#FF7A3D', '#F2711C'],
  ['#F2452F', '#E8452C'],
  ['#8B3FA8', '#8A4FB8'],
  ['#4FB3E8', '#1FA9E0'],
  ["font-['DM_Sans']", "font-['Outfit']"],
  ['hover:text-white', 'hover:text-[#04162A]'],
  ['text-white', 'text-[#04162A]'],
  ['border-white/10', 'border-transparent'],
  ['border-white/5', 'border-transparent'],
  ['bg-white/5', 'bg-[#F6EEE1]'],
  ['bg-white/10', 'bg-[#F6EEE1]'],
  ['divide-white/5', 'divide-[#04162A]/8'],
  ['border-white/20', 'border-[#04162A]/10'],
  ['bg-black/85', 'bg-[#04162A]/40'],
  ['bg-black/90', 'bg-[#04162A]/40'],
];

for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  for (const [a, b] of pairs) s = s.split(a).join(b);
  fs.writeFileSync(f, s);
  console.log('updated', f);
}
