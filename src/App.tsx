/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  Challenge,
  Badge,
  JournalEntry,
  CommunityPost,
  Affirmation,
  Expert,
  MoodType,
  LifePhase,
  CycleData,
} from './types/yugal';
import {
  INITIAL_USER,
  INITIAL_CHALLENGES,
  INITIAL_BADGES,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_AFFIRMATIONS,
  EXPERTS,
} from './data/yugalData';
import { Header } from './components/Header';
import { Navigation, YugalTab } from './components/Navigation';
import { HomeScreen } from './components/core/HomeScreen';
import { ScannerScreen } from './components/core/ScannerScreen';
import { ChallengeUnlockedScreen } from './components/core/ChallengeUnlockedScreen';
import { ChallengePracticeScreen } from './components/core/ChallengePracticeScreen';
import { ChallengeCompletionScreen } from './components/core/ChallengeCompletionScreen';
import { JournalTab } from './components/tabs/JournalTab';
import { YugalAiTab } from './components/tabs/YugalAiTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { CycleTab } from './components/tabs/CycleTab';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { ExpertsModal } from './components/modals/ExpertsModal';
import { AffirmationModal } from './components/modals/AffirmationModal';
import { RewardsModal } from './components/modals/RewardsModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { playSingingBowl, playSoftTap } from './utils/audio';

const ONBOARDING_COMPLETE_KEY = 'yugal_onboarding_complete_v1';
const CYCLE_DATA_KEY = 'yugal_cycle_data_v1';
const THEME_STORAGE_KEY = 'yugal_theme_v1';

// Firebase Auth & Firestore imports
import { auth, googleProvider } from './firebase/config';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  syncUserProfile,
  fetchUserProfile,
  saveChallengeCompletion,
  saveDbJournalEntry,
  saveDbAiVerification,
  saveDbCommunityPost,
  updateDbPostLikes,
} from './firebase/dbService';

// Default cycle data
const INITIAL_CYCLE_DATA: CycleData = {
  mode: 'regular',
  lastPeriodStart: '2026-10-21',
  averageCycleLength: 28,
  currentDayInCycle: 14,
  currentPhase: 'Ovulation',
  logs: [],
};

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('yugal_user_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_USER;
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
      const saved = localStorage.getItem('yugal_challenges_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_CHALLENGES;
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('yugal_badges_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_BADGES;
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem('yugal_journal_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_JOURNAL_ENTRIES;
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('yugal_posts_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return INITIAL_COMMUNITY_POSTS;
  });

  const [affirmations, setAffirmations] = useState<Affirmation[]>(INITIAL_AFFIRMATIONS);

  const [cycleData, setCycleData] = useState<CycleData>(() => {
    try {
      const saved = localStorage.getItem(CYCLE_DATA_KEY);
      if (saved) return JSON.parse(saved);
    } catch (error) {
      console.error('Failed to load cycle data', error);
    }
    return INITIAL_CYCLE_DATA;
  });

  // Coins state
  const [coins, setCoins] = useState(85);

  // Flow state
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try {
      localStorage.removeItem(ONBOARDING_COMPLETE_KEY);
    } catch (error) {
      console.error('Failed to reset onboarding status', error);
    }
    return true;
  });
  const [activeTab, setActiveTab] = useState<YugalTab>('home');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch (error) {
      console.error('Failed to load appearance setting', error);
      return 'light';
    }
  });

  // Challenge flow
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(challenges[7] || challenges[0]);
  const [challengeStep, setChallengeStep] = useState<'none' | 'scanner' | 'unlocked' | 'practice' | 'completed'>('none');
  const [flowTargetChallenge, setFlowTargetChallenge] = useState<Challenge | null>(null);
  const [completedRewardBadge, setCompletedRewardBadge] = useState<Badge | undefined>(undefined);

  // Modals — Profile is now an overlay, Insights is removed
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExpertsModalOpen, setIsExpertsModalOpen] = useState(false);
  const [selectedExpertForModal, setSelectedExpertForModal] = useState<Expert | null>(null);
  const [isAffirmationModalOpen, setIsAffirmationModalOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fUser) => {
      setFirebaseUser(fUser);
      if (fUser) {
        const remoteProfile = await fetchUserProfile(fUser.uid);
        if (remoteProfile) {
          setUser((prev) => ({
            ...prev,
            ...remoteProfile,
            name: remoteProfile.name || fUser.displayName || prev.name,
            avatar: remoteProfile.avatar || fUser.photoURL || prev.avatar,
            emailOrPhone: fUser.email || prev.emailOrPhone,
          }));
        } else {
          syncUserProfile({ ...user, name: fUser.displayName || user.name, avatar: fUser.photoURL || user.avatar, emailOrPhone: fUser.email || user.emailOrPhone }, fUser.uid);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync local storage
  useEffect(() => {
    try {
      localStorage.setItem('yugal_user_v1', JSON.stringify(user));
      localStorage.setItem('yugal_challenges_v1', JSON.stringify(challenges));
      localStorage.setItem('yugal_badges_v1', JSON.stringify(badges));
      localStorage.setItem('yugal_journal_v1', JSON.stringify(journalEntries));
      localStorage.setItem('yugal_posts_v1', JSON.stringify(communityPosts));
    } catch (e) { }
    if (firebaseUser) syncUserProfile(user, firebaseUser.uid);
  }, [user, challenges, badges, journalEntries, communityPosts, firebaseUser]);

  useEffect(() => {
    try {
      localStorage.setItem(CYCLE_DATA_KEY, JSON.stringify(cycleData));
    } catch (error) {
      console.error('Failed to save cycle data', error);
    }
  }, [cycleData]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error('Failed to save appearance setting', error);
    }
  }, [theme]);

  const handleGoogleSignIn = async () => {
    try {
      playSoftTap();
      const res = await signInWithPopup(auth, googleProvider);
      if (res.user) {
        setUser((prev) => ({ ...prev, name: res.user.displayName || prev.name, avatar: res.user.photoURL || prev.avatar, emailOrPhone: res.user.email || prev.emailOrPhone }));
        playSingingBowl(528, 2);
      }
    } catch (err) {
      console.warn('Google sign-in completed or closed', err);
    }
  };

  const handleLogout = async () => {
    try {
      playSoftTap();
      await signOut(auth);
      setFirebaseUser(null);
      try {
        localStorage.removeItem(ONBOARDING_COMPLETE_KEY);
      } catch (error) {
        console.error('Failed to reset onboarding status', error);
      }
      setShowOnboarding(true);
    } catch (e) { }
  };

  const startOnboarding = () => {
    try {
      localStorage.removeItem(ONBOARDING_COMPLETE_KEY);
    } catch (error) {
      console.error('Failed to reset onboarding status', error);
    }
    setShowOnboarding(true);
  };

  const handleOpenScanner = (target?: Challenge) => {
    setFlowTargetChallenge(target || currentChallenge);
    setChallengeStep('scanner');
  };

  const handleCardFoundInScanner = (challenge: Challenge) => {
    setFlowTargetChallenge(challenge);
    setChallengeStep('unlocked');
  };

  const handleBeginChallenge = () => setChallengeStep('practice');

  const handleMarkAsDone = (verifiedWithAi: boolean = false, aiNotes: string = '', videoName: string = '') => {
    playSingingBowl(528, 3.0);
    const target = flowTargetChallenge || currentChallenge;

    const updatedChallenges = challenges.map((c) =>
      c.id === target.id ? { ...c, status: 'completed' as const, completedAt: new Date().toISOString() } : c
    );
    setChallenges(updatedChallenges);

    const newCount = updatedChallenges.filter((c) => c.status === 'completed').length;
    setUser((prev) => ({ ...prev, completedChallengesCount: newCount, streakDays: prev.streakDays + 1 }));

    // Award coins for verified challenge
    if (verifiedWithAi) setCoins((prev) => prev + 10);

    const matchedBadge = badges.find((b) => b.id === target.rewardBadgeId);
    if (matchedBadge) {
      setBadges((prev) => prev.map((b) => b.id === matchedBadge.id ? { ...b, status: 'earned' as const, earnedDate: 'Just now' } : b));
      setCompletedRewardBadge(matchedBadge);
    }

    if (firebaseUser) {
      saveChallengeCompletion(firebaseUser.uid, target, verifiedWithAi, aiNotes, videoName);
      if (verifiedWithAi) {
        saveDbAiVerification(firebaseUser.uid, {
          id: `verify-${Date.now()}`,
          challengeId: target.id,
          challengeNumber: target.number,
          status: 'verified',
          feedback: aiNotes || 'Somatic posture and rhythm verified by Yugal AI.',
          confidenceScore: 98,
          videoName: videoName || 'practice.mp4',
        });
      }
    }

    setChallengeStep('completed');
  };

  const handlePickRandom = () => {
    playSoftTap();
    const pending = challenges.filter((c) => c.status !== 'completed');
    const pool = pending.length > 0 ? pending : challenges;
    const randomCard = pool[Math.floor(Math.random() * pool.length)];
    setFlowTargetChallenge(randomCard);
    setChallengeStep('unlocked');
  };

  const handleSelectChallenge = (c: Challenge) => {
    setFlowTargetChallenge(c);
    setChallengeStep('unlocked');
  };

  const handleToggleSaveAffirmation = (id: string) => {
    setAffirmations((prev) => prev.map((a) => (a.id === id ? { ...a, isSaved: !a.isSaved } : a)));
  };

  const handleSaveJournalSnippet = (text: string, mood: MoodType) => {
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood,
      title: 'Daily Reflection Snippet',
      preview: text.slice(0, 100) + '...',
      content: text,
      phaseTag: currentChallenge.phase,
      linkedChallengeId: currentChallenge.id,
      isPrivate: true,
    };
    setJournalEntries([newEntry, ...journalEntries]);
    if (firebaseUser) saveDbJournalEntry(firebaseUser.uid, newEntry);
  };

  const handleAddCommunityPost = (postData: Omit<CommunityPost, 'id' | 'likes' | 'reposts' | 'replies' | 'timeAgo'>) => {
    const newPost: CommunityPost = { ...postData, id: `post-${Date.now()}`, timeAgo: 'Just now', likes: 0, reposts: 0, replies: [] };
    setCommunityPosts([newPost, ...communityPosts]);
    if (firebaseUser) saveDbCommunityPost(newPost, firebaseUser.uid);
  };

  const handleLikePost = (postId: string) => {
    const targetPost = communityPosts.find((p) => p.id === postId);
    if (!targetPost) return;
    const isLiked = targetPost.userLiked;
    const newLikesCount = isLiked ? targetPost.likes - 1 : targetPost.likes + 1;
    setCommunityPosts((prev) => prev.map((p) => p.id === postId ? { ...p, userLiked: !isLiked, likes: newLikesCount } : p));
    if (firebaseUser) updateDbPostLikes(postId, newLikesCount);
  };

  if (showOnboarding) {
    return (
      <div className={`min-h-screen bg-[#F6EEE1] text-[#04162A] flex justify-center selection:bg-[#FFB400]/30 ${theme === 'dark' ? 'dark-theme' : ''}`}>
        <div className="w-full max-w-[390px] min-h-screen flex flex-col bg-[#F6EEE1] shadow-[0_0_60px_rgba(4,22,42,0.12)]">
          <OnboardingFlow
            onComplete={(updates) => {
              setUser((prev) => ({ ...prev, ...updates }));
              try {
                localStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
              } catch (error) {
                console.error('Failed to save onboarding status', error);
              }
              setShowOnboarding(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#E8DCC8] text-[#04162A] flex justify-center relative overflow-x-hidden selection:bg-[#FFB400]/30 ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <div className="fixed -top-24 -left-24 w-[380px] h-[380px] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #FFB400 0%, transparent 70%)', filter: 'blur(90px)', opacity: 0.28 }} />
      <div className="fixed bottom-10 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #1FA9E0 0%, transparent 70%)', filter: 'blur(90px)', opacity: 0.22 }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, #C94A9B 0%, transparent 70%)', filter: 'blur(100px)', opacity: 0.14 }} />

      <div className="w-full max-w-[390px] relative z-10 min-h-[844px] shadow-[0_20px_60px_rgba(4,22,42,0.18)] bg-[#F6EEE1] flex flex-col">
        <Header
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          isSignedIn={!!firebaseUser}
          userEmail={firebaseUser?.email}
          onGoogleSignIn={handleGoogleSignIn}
        />

        <main className="flex-1 px-4 pt-3 pb-8">
          {activeTab === 'home' && (
            <HomeScreen
              user={user}
              challenges={challenges}
              activeChallenge={currentChallenge}
              todayAffirmation={affirmations[0]}
              onOpenScanner={handleOpenScanner}
              onPickRandom={handlePickRandom}
              onSelectChallenge={handleSelectChallenge}
              onSaveJournalSnippet={handleSaveJournalSnippet}
              onToggleSaveAffirmation={handleToggleSaveAffirmation}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenProfile={() => setIsProfileOpen(true)}
              coins={coins}
            />
          )}

          {activeTab === 'cycle' && (
            <CycleTab
              cycleData={cycleData}
              onCycleDataUpdate={(updates) => setCycleData((prev) => ({ ...prev, ...updates }))}
              onNavigateToJournal={() => setActiveTab('journal')}
              onNavigateToAI={() => setActiveTab('yugal_ai')}
            />
          )}

          {activeTab === 'journal' && (
            <JournalTab
              entries={journalEntries}
              posts={communityPosts}
              challenges={challenges}
              user={user}
              onAddJournalEntry={(e) => {
                const newE = { ...e, id: `j-${Date.now()}` };
                setJournalEntries([newE, ...journalEntries]);
                if (firebaseUser) saveDbJournalEntry(firebaseUser.uid, newE);
              }}
              onAddCommunityPost={handleAddCommunityPost}
              onLikePost={handleLikePost}
            />
          )}

          {activeTab === 'yugal_ai' && (
            <YugalAiTab userName={user.name} />
          )}
        </main>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} onOpenScanner={() => handleOpenScanner()} />

        {/* Challenge Flow Overlays */}
        {challengeStep === 'scanner' && (
          <ScannerScreen
            challenges={challenges}
            targetChallenge={flowTargetChallenge}
            onCardFound={handleCardFoundInScanner}
            onClose={() => setChallengeStep('none')}
            onPickRandom={handlePickRandom}
          />
        )}

        {challengeStep === 'unlocked' && flowTargetChallenge && (
          <div className="fixed inset-0 z-50 bg-[#F6EEE1] overflow-y-auto">
            <ChallengeUnlockedScreen
              challenge={flowTargetChallenge}
              onBeginChallenge={handleBeginChallenge}
              onOpenExpertProfile={(expert) => { setSelectedExpertForModal(expert); setIsExpertsModalOpen(true); }}
              onBack={() => setChallengeStep('none')}
            />
          </div>
        )}

        {challengeStep === 'practice' && flowTargetChallenge && (
          <div className="fixed inset-0 z-50 bg-[#04162A] overflow-y-auto">
            <ChallengePracticeScreen
              challenge={flowTargetChallenge}
              onMarkAsDone={handleMarkAsDone}
              onBack={() => setChallengeStep('unlocked')}
            />
          </div>
        )}

        {challengeStep === 'completed' && flowTargetChallenge && (
          <div className="fixed inset-0 z-50 bg-[#F6EEE1] overflow-y-auto">
            <ChallengeCompletionScreen
              challenge={flowTargetChallenge}
              badge={completedRewardBadge}
              onSeeProgress={() => { setChallengeStep('none'); setActiveTab('home'); }}
              onPickAnotherCard={() => setChallengeStep('scanner')}
            />
          </div>
        )}

        {/* Profile overlay (from Home avatar tap) */}
        {isProfileOpen && (
          <div className="fixed inset-0 z-50 bg-[#F6EEE1] overflow-y-auto">
            <div className="p-4 pt-12">
              <button
                onClick={() => { playSoftTap(); setIsProfileOpen(false); }}
                className="mb-4 flex items-center gap-2 text-xs text-[#5B6B7A] hover:text-[#04162A] cursor-pointer"
              >
                ← Back to Home
              </button>
              <ProfileTab
                user={user}
                challenges={challenges}
                onOpenRewards={() => setIsRewardsModalOpen(true)}
                onOpenSavedAffirmations={() => setIsAffirmationModalOpen(true)}
                onOpenSettings={() => setIsSettingsModalOpen(true)}
                onOpenExperts={() => { setSelectedExpertForModal(null); setIsExpertsModalOpen(true); }}
                onLogout={handleLogout}
              />
            </div>
          </div>
        )}

        {/* Modals */}
        <ExpertsModal
          isOpen={isExpertsModalOpen}
          onClose={() => setIsExpertsModalOpen(false)}
          selectedExpert={selectedExpertForModal}
          challenges={challenges}
          onSelectChallenge={(c) => { setIsExpertsModalOpen(false); handleSelectChallenge(c); }}
        />

        <AffirmationModal
          isOpen={isAffirmationModalOpen}
          onClose={() => setIsAffirmationModalOpen(false)}
          affirmation={affirmations[0]}
          onToggleSave={handleToggleSaveAffirmation}
        />

        <RewardsModal
          isOpen={isRewardsModalOpen}
          onClose={() => setIsRewardsModalOpen(false)}
          badges={badges}
          coins={coins}
        />

        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          user={user}
          onUpdateLifePhase={(lp) => setUser((prev) => ({ ...prev, lifePhase: lp }))}
          onRetakeAssessment={startOnboarding}
          onLogout={handleLogout}
          theme={theme}
          onThemeChange={setTheme}
        />

      </div>
    </div>
  );
}
