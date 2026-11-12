export type Phase = 'MOVE' | 'CALM' | 'FEEL' | 'UNDERSTAND' | 'CONNECT';

export type MoodType = 'Low' | 'Tired' | 'Okay' | 'Good' | 'Radiant';

export interface Expert {
  id: string;
  name: string;
  role: string;
  speciality: string;
  avatar: string;
  bio: string;
  challengesLed: number[];
}

export interface PracticeStep {
  time: string;
  title: string;
  desc: string;
}

export interface Challenge {
  id: string;
  number: number;
  phase: Phase;
  phaseNumber: number;
  title: string;
  shortDesc: string;
  expert: Expert;
  duration: string; // e.g. "12 min"
  intensity: 'Gentle' | 'Restorative' | 'Moderate';
  equipment: string; // e.g. "No equipment"
  learningPoints: [string, string, string];
  hasVideo: boolean;
  videoType?: 'yoga' | 'breath' | 'somatic' | 'sound';
  videoDurationSec?: number;
  noVideoType?: 'journal' | 'mirror' | 'consult';
  noVideoPrompt?: string;
  steps: PracticeStep[];
  closingAffirmation: string;
  rewardBadgeId: string;
  code: string; // 4-digit code e.g. "0206"
  status: 'locked' | 'default' | 'completed';
  completedAt?: string;
}

export type LifePhase =
  | 'Unmarried'
  | 'Recently married'
  | 'Pregnancy'
  | 'Postpartum'
  | 'Peri Menopause'
  | 'Post Menopause'
  | 'Prefer not to say';

export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';
export type CycleMode = 'regular' | 'pregnancy' | 'perimenopause' | 'menopause';
export type FlowLevel = 'Light' | 'Medium' | 'Heavy';
export type CycleSymptom = 'Cramps' | 'Bloating' | 'Headache' | 'Fatigue' | 'Mood swings' | 'Hot flashes' | 'Sleep issues';

export interface CycleDayLog {
  date: string; // ISO date string
  flowLevel?: FlowLevel;
  symptoms?: CycleSymptom[];
  quickSymptoms?: string[];
  otherSymptoms?: string[];
  mood?: MoodType;
  sleepHours?: number;
  notes?: string;
}

export interface CycleData {
  mode: CycleMode;
  lastPeriodStart?: string; // ISO date
  averageCycleLength: number; // days
  currentDayInCycle: number;
  currentPhase: CyclePhase;
  logs: CycleDayLog[];
  // Pregnancy mode fields
  dueDateEstimate?: string;
  trimester?: 1 | 2 | 3;
  pregnancyWeek?: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  emailOrPhone: string;
  boxCode: string;
  isBoxActivated: boolean;
  lifePhase: LifePhase;
  joinDate: string;
  completedChallengesCount: number;
  streakDays: number;
  lastPracticedDays: boolean[]; // Mon - Sun
  savedAffirmationIds: string[];
}

export interface JournalEntry {
  id: string;
  date: string;
  time: string;
  mood: MoodType;
  title: string;
  preview: string;
  content: string;
  phaseTag?: Phase;
  linkedChallengeId?: string;
  isPrivate: true;
}

export interface CommunityReply {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  isAnonymous?: boolean;
  timeAgo: string;
  content: string;
  phaseTag?: Phase;
  challengeTag?: string;
  likes: number;
  reposts: number;
  replies: CommunityReply[];
  userLiked?: boolean;
  userReposted?: boolean;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isUrgentAlert?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  phase?: Phase;
  status: 'earned' | 'in_progress' | 'locked';
  iconName: string;
  earnedDate?: string;
}

export interface HealthMetric {
  day: string;
  mood: number; // 1-5
  energy: number; // %
  stress: number; // % (lower is better)
  sleep: number; // hours
  practicesCount: number;
}

export interface Affirmation {
  id: string;
  text: string;
  authorOrPhase: string;
  isSaved: boolean;
}
