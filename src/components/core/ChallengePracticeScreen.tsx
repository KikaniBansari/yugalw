import React, { useState, useEffect, useRef } from 'react';
import { Challenge } from '../../types/yugal';
import { PHASE_CONFIG } from '../../data/yugalData';
import { PhaseTag } from '../ui/Chips';
import { GlowingCircles } from '../ui/GlowingCircles';
import { Button } from '../ui/Button';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  Upload,
  ShieldCheck,
  FileVideo,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  PenLine,
  Lock,
} from 'lucide-react';
import { playSingingBowl, playSoftTap, playScanSuccessChime } from '../../utils/audio';

// ─── AI Verify Flow steps ────────────────────────────────────────────────────
type VerifyMethod = 'video' | 'reflection' | null;
type VerifyStep =
  | 'choose_method'   // Choose: record video or write reflection
  | 'consent'         // Consent screen (video only)
  | 'upload'          // Upload or record video
  | 'reflection'      // Write reflection (non-movement)
  | 'checking'        // Loading state
  | 'verified'        // Success
  | 'almost_there'    // "Not passed" — kind retry
  | 'error';          // No internet / AI busy

interface ChallengePracticeScreenProps {
  challenge: Challenge;
  onMarkAsDone: (verifiedWithAi?: boolean, aiNotes?: string, videoName?: string) => void;
  onBack: () => void;
}

export const ChallengePracticeScreen: React.FC<ChallengePracticeScreenProps> = ({
  challenge,
  onMarkAsDone,
  onBack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [encouragement, setEncouragement] = useState<string | null>(null);

  // AI Verify multi-step state
  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>(null);
  const [verifyStep, setVerifyStep] = useState<VerifyStep | null>(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const [aiProgress, setAiProgress] = useState(0);
  const [aiStatusMessage, setAiStatusMessage] = useState('');
  const [almostThereMsg, setAlmostThereMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const meta = PHASE_CONFIG[challenge.phase] || PHASE_CONFIG.CALM;

  // Encouraging messages during practice
  const ENCOURAGEMENTS = [
    'You\'re doing beautifully 🌸',
    'Take it at your own pace. You\'re exactly where you need to be.',
    'Your body is wise. Trust it.',
    'Every breath is a return to yourself.',
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => {
          const next = prev + 1;
          // Show an encouraging message every 20 seconds
          if (next % 20 === 0) {
            const idx = Math.floor(next / 20 - 1) % ENCOURAGEMENTS.length;
            setEncouragement(ENCOURAGEMENTS[idx]);
            setTimeout(() => setEncouragement(null), 4000);
          }
          return next;
        });
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    playSoftTap();
    if (!isPlaying && soundEnabled) playSingingBowl(432, 2.5);
    setIsPlaying(!isPlaying);
  };

  const handleWatchAgain = () => {
    playSoftTap();
    setIsPlaying(false);
    setSecondsElapsed(0);
    setActiveStepIndex(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { playSoftTap(); setSelectedVideoFile(file); }
  };

  // ── AI checking simulation ─────────────────────────────────────────────────
  const runAiCheck = (passed: boolean) => {
    setVerifyStep('checking');
    setAiProgress(10);
    setAiStatusMessage('Extracting posture orientation...');
    setTimeout(() => { setAiProgress(48); setAiStatusMessage('Evaluating somatic alignment and breath rhythm...'); }, 1200);
    setTimeout(() => { setAiProgress(85); setAiStatusMessage('Cross-referencing with expert guidance...'); }, 2400);
    setTimeout(() => {
      setAiProgress(100);
      playScanSuccessChime();
      if (passed) {
        setVerifyStep('verified');
        setTimeout(() => {
          onMarkAsDone(true, 'Somatic posture and breath rhythm verified by Yugal AI.', selectedVideoFile?.name || 'practice.mp4');
        }, 1800);
      } else {
        setVerifyStep('almost_there');
        setAlmostThereMsg('Your palm position looked great. Try relaxing your shoulders a little more and let your breath guide the movement rather than the other way around.');
      }
    }, 3500);
  };

  const handleRunVerification = () => {
    if (verifyMethod === 'video' && !selectedVideoFile) return;
    if (verifyMethod === 'reflection' && reflectionText.trim().length < 10) return;
    playSoftTap();
    // 80% pass rate for demo
    runAiCheck(Math.random() > 0.2);
  };

  // ── Render AI Verification overlay ────────────────────────────────────────
  const renderVerifyOverlay = () => {
    if (!verifyStep) return null;

    return (
      <div className="fixed inset-0 z-[70] bg-[#04162A]/98 backdrop-blur-sm flex flex-col justify-center items-center p-5 text-[#F6EEE1]">
        <div className="w-full max-w-sm space-y-5">

          {/* STEP: choose method */}
          {verifyStep === 'choose_method' && (
            <>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-3" style={{ background: 'linear-gradient(135deg, #FFB400, #D6469A)' }}>
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-xl font-bold text-white">Verify with AI</h2>
                <p className="text-xs text-[#C9D3DC]/70 mt-1">Choose how you'd like to verify your practice</p>
              </div>
              <button
                onClick={() => { playSoftTap(); setVerifyMethod('video'); setVerifyStep('consent'); }}
                className="w-full p-4 rounded-2xl bg-[#0F1F2D] border border-[rgba(201,204,224,0.12)] flex items-center gap-3 hover:border-[#FFB400]/40 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFB400]/15 text-[#FFB400] flex items-center justify-center flex-shrink-0"><FileVideo size={18} /></div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Short practice video</p>
                  <p className="text-[11px] text-[#C9D3DC]/60">Record a 10–30s clip of your practice</p>
                </div>
              </button>
              <button
                onClick={() => { playSoftTap(); setVerifyMethod('reflection'); setVerifyStep('reflection'); }}
                className="w-full p-4 rounded-2xl bg-[#0F1F2D] border border-[rgba(201,204,224,0.12)] flex items-center gap-3 hover:border-[#8B3FA8]/40 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#8B3FA8]/15 text-[#8B3FA8] flex items-center justify-center flex-shrink-0"><PenLine size={18} /></div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">Written reflection</p>
                  <p className="text-[11px] text-[#C9D3DC]/60">Describe your experience in a few sentences</p>
                </div>
              </button>
              <button onClick={() => { playSoftTap(); setVerifyStep(null); }} className="w-full text-center text-xs text-[#C9D3DC]/50 hover:text-white cursor-pointer py-2">Cancel</button>
            </>
          )}

          {/* STEP: consent (video only) */}
          {verifyStep === 'consent' && (
            <>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-3 bg-[#0F1F2D] border-2 border-[#FFB400]/30">
                  <Lock size={22} className="text-[#FFB400]" />
                </div>
                <h2 className="text-xl font-bold text-white">Privacy first</h2>
                <p className="text-xs text-[#C9D3DC]/70 mt-1">Before you record</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F1F2D] border border-[rgba(201,204,224,0.12)] space-y-3 text-sm text-[#C9D3DC]/80 leading-relaxed">
                <p>Your video is <strong className="text-white">used only to check your practice</strong> and is then permanently deleted. It is never stored, shared, or used to train any model.</p>
                <p className="text-xs text-[#C9D3DC]/50">You can verify by written reflection instead if you prefer.</p>
              </div>
              <Button onClick={() => { playSoftTap(); setVerifyStep('upload'); }} variant="primary" icon={<ShieldCheck size={16} />}>
                I understand — continue
              </Button>
              <button onClick={() => { playSoftTap(); setVerifyMethod('reflection'); setVerifyStep('reflection'); }} className="w-full text-center text-xs text-[#FFB400] cursor-pointer">
                Switch to written reflection instead
              </button>
            </>
          )}

          {/* STEP: upload video */}
          {verifyStep === 'upload' && (
            <>
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">Upload your practice</h2>
                <p className="text-xs text-[#C9D3DC]/70 mt-1">A 10–30 second clip works perfectly</p>
              </div>
              <input ref={fileInputRef} type="file" accept="video/*" capture="user" onChange={handleFileChange} className="hidden" />
              {!selectedVideoFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-8 rounded-2xl border-2 border-dashed border-[#FFB400]/40 hover:border-[#FFB400] bg-[#0F1F2D] flex flex-col items-center cursor-pointer transition-colors"
                >
                  <Upload size={28} className="text-[#FFB400] mb-3" />
                  <span className="text-sm font-semibold text-white">Tap to record or select</span>
                  <span className="text-[11px] text-[#C9D3DC]/50 mt-1">MP4, MOV or WebM</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSoftTap();
                      // Demo: simulate a file
                      const f = new File([new Blob(['v'])], 'practice.mp4', { type: 'video/mp4' });
                      setSelectedVideoFile(f);
                    }}
                    className="mt-4 px-4 py-1.5 rounded-full bg-[#16293A] border border-[#FFB400]/20 text-[11px] text-[#FFB400] cursor-pointer"
                  >
                    Use demo clip instead
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#0F1F2D] border border-emerald-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><FileVideo size={18} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{selectedVideoFile.name}</p>
                    <p className="text-[11px] text-emerald-400">Ready to verify</p>
                  </div>
                  <button onClick={() => { playSoftTap(); setSelectedVideoFile(null); }} className="text-[11px] text-[#C9D3DC]/50 hover:text-white cursor-pointer">Change</button>
                </div>
              )}
              {selectedVideoFile && (
                <Button onClick={handleRunVerification} variant="primary" icon={<Sparkles size={16} />}>
                  Verify with Yugal AI
                </Button>
              )}
              <button onClick={() => { playSoftTap(); setVerifyStep('choose_method'); }} className="w-full text-center text-xs text-[#C9D3DC]/50 cursor-pointer py-2">Back</button>
            </>
          )}

          {/* STEP: written reflection */}
          {verifyStep === 'reflection' && (
            <>
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">Your reflection</h2>
                <p className="text-xs text-[#C9D3DC]/70 mt-1">Describe what you noticed during the practice</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F1F2D] border border-[rgba(201,204,224,0.12)] focus-within:border-[#FFB400]/60 transition-colors">
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  rows={5}
                  maxLength={500}
                  placeholder="e.g. I felt my breath slow naturally around the second minute. There was a warmth in my chest…"
                  className="w-full bg-transparent text-sm text-white placeholder-[#C9D3DC]/30 outline-none resize-none"
                />
                <div className="text-right mt-1">
                  <span className="text-[10px] text-[#C9D3DC]/40 font-mono">{reflectionText.length}/500</span>
                </div>
              </div>
              <Button
                onClick={handleRunVerification}
                variant="primary"
                icon={<Sparkles size={16} />}
              >
                Submit reflection
              </Button>
              <button onClick={() => { playSoftTap(); setVerifyStep('choose_method'); }} className="w-full text-center text-xs text-[#C9D3DC]/50 cursor-pointer py-2">Back</button>
            </>
          )}

          {/* STEP: checking */}
          {verifyStep === 'checking' && (
            <div className="text-center space-y-5">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background: 'radial-gradient(circle, #FFB400, transparent 70%)' }} />
                <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#FFB400] border-r-[#D6469A] border-b-[#8B3FA8] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={22} className="text-[#FFB400]" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Checking your practice</h2>
                <p className="text-xs text-[#C9D3DC]/70 mt-1">{aiStatusMessage}</p>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-2 rounded-full transition-all duration-700" style={{ width: `${aiProgress}%`, background: 'linear-gradient(90deg, #FFB400, #D6469A, #8B3FA8)' }} />
              </div>
              <span className="text-[11px] font-mono text-[#FFB400]">{aiProgress}%</span>
            </div>
          )}

          {/* STEP: verified */}
          {verifyStep === 'verified' && (
            <div className="text-center space-y-5">
              <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-amber-400/20 border-2 border-amber-400/40">
                <CheckCircle2 size={36} className="text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Verified ✨</h2>
                <p className="text-xs text-[#C9D3DC]/70 mt-1">We can see you showed up fully for yourself today. Beautiful.</p>
              </div>
              <p className="text-sm text-[#C9D3DC]/80 italic leading-relaxed">
                "Somatic posture and breath rhythm verified. Your practice was authentic and complete."
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-[#FFB400] font-bold">
                <Sparkles size={16} />
                <span>+10 coins unlocking...</span>
              </div>
            </div>
          )}

          {/* STEP: almost there */}
          {verifyStep === 'almost_there' && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-amber-400/10 border-2 border-amber-400/20">
                <Heart size={28} className="text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Almost there.</h2>
                <p className="text-sm text-[#C9D3DC]/70 mt-1">Let's try once more — you're very close.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0F1F2D] border border-[rgba(201,204,224,0.10)] text-left">
                <p className="text-xs font-semibold text-[#FFB400] mb-1">A gentle tip</p>
                <p className="text-xs text-[#C9D3DC]/80 leading-relaxed">{almostThereMsg}</p>
              </div>
              <div className="space-y-2">
                <Button onClick={() => { playSoftTap(); setVerifyStep('choose_method'); setSelectedVideoFile(null); setReflectionText(''); }} variant="primary">
                  Try again
                </Button>
                <Button onClick={handleWatchAgain} variant="outline" icon={<RotateCcw size={14} />}>
                  Watch video again
                </Button>
              </div>
            </div>
          )}

          {/* STEP: error */}
          {verifyStep === 'error' && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-orange-400/10 border-2 border-orange-400/20">
                <AlertCircle size={28} className="text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Something went wrong</h2>
                <p className="text-xs text-[#C9D3DC]/70 mt-1">We couldn't reach the AI right now — it might be a network hiccup. Your progress is safe.</p>
              </div>
              <Button onClick={() => { playSoftTap(); runAiCheck(true); }} variant="primary" icon={<RefreshCw size={14} />}>
                Try again
              </Button>
              <button onClick={() => { playSoftTap(); setVerifyStep(null); }} className="text-xs text-[#C9D3DC]/50 cursor-pointer">Back to practice</button>
            </div>
          )}

        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#04162A] text-[#F6EEE1] flex flex-col justify-between p-4 pb-36 select-none animate-in fade-in duration-300">
      {/* Encouragement floating toast */}
      {encouragement && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs text-white font-medium shadow-lg animate-in fade-in slide-in-from-top-3 duration-300"
          style={{ background: 'linear-gradient(135deg, #FFB400, #D6469A)' }}>
          {encouragement}
        </div>
      )}

      {/* Top Bar */}
      <div className="relative z-20 flex items-center justify-between pt-2 pb-2">
        <button
          type="button"
          onClick={() => { playSoftTap(); onBack(); }}
          className="w-9 h-9 rounded-full bg-[#0F1F2D] border border-white/10 flex items-center justify-center text-[#C9D3DC] hover:text-white cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>

        <PhaseTag phase={challenge.phase} labelOverride={`Card #${challenge.number} · ${challenge.phase}`} size="sm" />

        <button
          type="button"
          onClick={() => { playSoftTap(); setSoundEnabled(!soundEnabled); }}
          className="w-9 h-9 rounded-full bg-[#0F1F2D] border border-white/10 flex items-center justify-center text-[#C9D3DC]"
        >
          {soundEnabled ? <Volume2 size={16} className="text-[#FFB400]" /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {/* VARIANT A: Video */}
        {challenge.hasVideo ? (
          <div className="space-y-3">
            <div className="relative w-full aspect-video rounded-3xl bg-[#0F1F2D] border border-[#FFB400]/30 overflow-hidden flex items-center justify-center group">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
                alt="Practice session"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07121C] via-transparent to-black/30 pointer-events-none" />
              <button
                type="button"
                onClick={handleTogglePlay}
                className="relative z-10 w-16 h-16 rounded-full text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,180,0,0.4)]"
                style={{ background: 'linear-gradient(135deg, #FFB400, #FF7A3D, #D6469A, #8B3FA8)' }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1 fill-current" />}
              </button>
              <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                <span className="bg-[#07121C]/80 backdrop-blur-md px-2 py-0.5 rounded-md">{formatTime(secondsElapsed)} / {challenge.duration}</span>
                <span className="text-[#FFB400] bg-[#07121C]/80 backdrop-blur-md px-2 py-0.5 rounded-md">{isPlaying ? 'FLOWING' : 'PAUSED'}</span>
              </div>
            </div>
            <div className="text-center px-2">
              <h2 className="text-xl font-semibold text-white tracking-tight">{challenge.title}</h2>
              <p className="text-xs text-[#C9D3DC] mt-0.5">Guided by {challenge.expert.name} · {challenge.expert.speciality}</p>
            </div>
          </div>
        ) : (
          /* VARIANT B: No-video */
          <div className="p-6 rounded-3xl bg-[#0F1F2D] border border-[#FFB400]/35 text-center relative overflow-hidden space-y-4">
            <div className="flex justify-center">
              <GlowingCircles size={140} pulsing={true} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FFB400] block mb-1">{challenge.noVideoType?.toUpperCase()} INVITATION</span>
              <h2 className="text-xl font-semibold text-white tracking-tight">{challenge.title}</h2>
            </div>
            <div className="p-4 rounded-2xl bg-[#07121C]/70 border border-white/5 text-xs text-[#C9D3DC] leading-relaxed italic">
              "{challenge.noVideoPrompt || challenge.shortDesc}"
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-[#C9D3DC]">
              <Heart size={14} className="text-[#D6469A]" />
              <span>Take as much unhurried time as your body desires</span>
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#FFB400] px-1">FOLLOW-ALONG PROGRESSION</span>
          <div className="space-y-2">
            {challenge.steps.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isDone = idx < activeStepIndex;
              return (
                <div
                  key={step.title}
                  onClick={() => { playSoftTap(); setActiveStepIndex(idx); }}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer ${isActive ? 'bg-[#0F1F2D] border border-[#FFB400]/50' : 'bg-[#0F1F2D]/60 border border-white/5 hover:border-white/10'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {isDone && (
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #FFB400, #D6469A)' }}>
                          ✓
                        </span>
                      )}
                      <span className="text-xs font-semibold text-white">{step.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#FFB400]">{step.time}</span>
                  </div>
                  <p className="text-xs text-[#C9D3DC]/80 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pinned Bottom */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-4 pb-safe bg-gradient-to-t from-[#04162A] via-[#04162A]/95 to-transparent flex justify-center">
        <div className="w-full max-w-md space-y-2">
          {/* PRIMARY: Verify with AI (compulsory — Mark as Done locked until passed) */}
          <Button
            variant="primary"
            onClick={() => { playSoftTap(); setVerifyStep('choose_method'); }}
            icon={<ShieldCheck size={16} />}
          >
            Verify with AI
          </Button>

          {/* Locked "Mark as Done" — greyed out to show it requires verification */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#C9D3DC]/40">
            <Lock size={10} />
            <span>"Mark as Done" unlocks after AI verification</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="compact" onClick={handleWatchAgain} icon={<RotateCcw size={13} />}>
              Watch Again
            </Button>
            <Button variant="outline" size="compact" onClick={handleTogglePlay} icon={isPlaying ? <Pause size={13} /> : <Play size={13} />}>
              {isPlaying ? 'Pause' : 'Practise'}
            </Button>
          </div>
        </div>
      </div>

      {/* AI Verify Multi-step Overlay */}
      {renderVerifyOverlay()}
    </div>
  );
};
