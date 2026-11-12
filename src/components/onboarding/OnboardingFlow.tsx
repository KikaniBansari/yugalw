import React, { useState, useEffect } from 'react';
import { LifePhase, UserProfile } from '../../types/yugal';
import { GlowingCircles } from '../ui/GlowingCircles';
import { Button } from '../ui/Button';
import { QrCode, ArrowRight, Check, ChevronLeft, Camera, ShieldCheck, Heart } from 'lucide-react';
import { playSingingBowl, playSoftTap } from '../../utils/audio';

interface OnboardingFlowProps {
  onComplete: (userUpdates: Partial<UserProfile>) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
}) => {
  // Current screen step: 1 (Splash) to 7 (Quick Tour)
  const [step, setStep] = useState<number>(1);

  // Form states
  const [name, setName] = useState('Ananya');
  const [emailOrPhone, setEmailOrPhone] = useState('ananya.sharma@example.com');
  const [otpCode, setOtpCode] = useState('7408');
  const [boxCode, setBoxCode] = useState('YUGAL-RESET-0842');
  const [selectedLifePhase, setSelectedLifePhase] = useState<LifePhase>('Recently married');


  // Tour slide index (0 to 3)
  const [tourIndex, setTourIndex] = useState(0);

  // Splash auto-advance after 2.5 seconds
  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        setStep(2);
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNext = () => {
    playSoftTap();
    if (step < 7) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    playSoftTap();
    if (step > 2) {
      setStep(step - 1);
    }
  };

  const finishOnboarding = () => {
    playSingingBowl(528, 2.5);
    onComplete({
      name: name.trim() || 'Ananya',
      emailOrPhone,
      boxCode: boxCode || 'YUGAL-RESET-0842',
      isBoxActivated: true,
      lifePhase: selectedLifePhase,
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F6EEE1] text-[#04162A] flex flex-col justify-between p-5 overflow-hidden select-none">
      {/* Background Living Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FFB400]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#1FA9E0]/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* STEP 1: SPLASH SCREEN (2 seconds) */}
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-1000">
          <div className="relative my-8">
            <GlowingCircles size={240} pulsing={true} />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/assets/yugal-logo.png"
                alt="Yugal — Harmony held in balance"
                className="w-52 h-52 rounded-3xl object-cover shadow-[0_16px_48px_rgba(4,22,42,0.28)]"
              />
            </div>
          </div>
          <p className="max-w-[260px] text-xs font-medium uppercase tracking-[0.14em] text-[#5B6B7A]">
            Curated by women from all phases of life
          </p>

          <div className="mt-8">
            <button
              onClick={() => setStep(2)}
              className="text-xs text-[#5B6B7A]/60 hover:text-[#04162A] underline underline-offset-4"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Top Bar for steps 2 to 7 */}
      {step > 1 && (
        <div className="relative z-20 flex items-center justify-between pt-2 pb-3">
          {step > 2 ? (
            <button
              type="button"
              onClick={handleBack}
              className="w-9 h-9 rounded-full bg-[#FFFBF4] border border-transparent flex items-center justify-center text-[#5B6B7A] hover:text-[#04162A] cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}

          {/* Step indicator bar */}
          <div className="flex items-center gap-1.5">
            {[2, 3, 4, 5, 6, 7].map((s) => (
              <span
                key={s}
                className={`h-1 rounded-full transition-all duration-300 ${s === step
                  ? 'w-6 bg-spectrum-gradient'
                  : s < step
                    ? 'w-2 bg-[#FFB400]/60'
                    : 'w-2 bg-[#F6EEE1]'
                  }`}
              />
            ))}
          </div>

          <span className="text-[11px] font-mono text-[#5B6B7A]/60">
            {step - 1}/6
          </span>
        </div>
      )}

      {/* STEP 2: WELCOME */}
      {step === 2 && (
        <div className="flex-1 flex flex-col justify-between py-6 relative z-10 animate-in fade-in duration-300">
          <div className="text-center my-auto">
            <div className="my-6 flex justify-center">
              <GlowingCircles size={180} />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFB400] block mb-2">
              Welcome to Yugal
            </span>
            <h2 className="text-3xl font-semibold text-[#04162A] tracking-tight leading-tight">
              A private sanctuary for your 21-day Reset Box
            </h2>
            <p className="text-sm text-[#5B6B7A] max-w-xs mx-auto mt-3 leading-relaxed">
              Scan physical cards, practise short restorative rituals with women's health experts, and gently restore your natural rhythm.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button onClick={() => setStep(3)}>
              Get Started
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: SIGN UP */}
      {step === 3 && (
        <div className="flex-1 flex flex-col justify-between py-2 relative z-10 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFB400] block mb-1">
              Step 1 of 5
            </span>
            <h2 className="text-2xl font-semibold text-[#04162A] tracking-tight">
              Create your private space
            </h2>
            <p className="text-xs text-[#5B6B7A] mt-1">
              Your details remain strictly encrypted and confidential.
            </p>

            {/* Optional Photo Avatar */}
            <div className="my-6 flex flex-col items-center">
              <div className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-[#FFFBF4] border-2 border-[#FFB400]/40 flex items-center justify-center overflow-hidden shadow-gold-halo">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-spectrum-gradient text-[#04162A] flex items-center justify-center shadow-sm">
                  <Camera size={12} />
                </div>
              </div>
              <span className="text-[11px] text-[#5B6B7A]/60 mt-1.5">
                Photo (optional)
              </span>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#5B6B7A] font-medium block mb-1">
                  Your First Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya"
                  className="w-full h-[50px] rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.14)] focus:border-[#FFB400] px-4 text-sm text-[#04162A] placeholder-[#5B6B7A]/40 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-[#5B6B7A] font-medium block mb-1">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="e.g. ananya@example.com"
                  className="w-full h-[50px] rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.14)] focus:border-[#FFB400] px-4 text-sm text-[#04162A] placeholder-[#5B6B7A]/40 outline-none transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#5B6B7A] font-medium">
                    One-Time Code
                  </label>
                  <span className="text-[10px] text-[#FFB400] font-mono">
                    Code sent
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="4-digit OTP"
                  className="w-full h-[50px] rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.14)] focus:border-[#FFB400] px-4 text-sm text-[#04162A] placeholder-[#5B6B7A]/40 outline-none transition-colors font-mono tracking-widest"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={() => setStep(4)}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: ACTIVATE YOUR BOX */}
      {step === 4 && (
        <div className="flex-1 flex flex-col justify-between py-2 relative z-10 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFB400] block mb-1">
              Step 2 of 5
            </span>
            <h2 className="text-2xl font-semibold text-[#04162A] tracking-tight">
              Activate your Reset Box
            </h2>
            <p className="text-xs text-[#5B6B7A] mt-1 leading-relaxed">
              Find the 8-character activation code printed on the inner lid of your physical 21-card box.
            </p>

            <div className="my-6 p-5 rounded-2xl bg-[#FFFBF4] border border-[#FFB400]/30 shadow-gold-halo text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#FFB400]/15 rounded-full filter blur-xl" />
              <div className="w-12 h-12 rounded-full bg-spectrum-gradient mx-auto flex items-center justify-center text-[#04162A] mb-2 shadow-focal-glow">
                <QrCode size={22} />
              </div>
              <span className="text-xs font-medium text-[#FFB400] block uppercase tracking-wider">
                Box Pairing Ready
              </span>
              <p className="text-[11px] text-[#5B6B7A]/70 mt-1 max-w-[220px] mx-auto">
                Align the box QR code or verify the code stamped inside.
              </p>
            </div>

            <div>
              <label className="text-xs text-[#5B6B7A] font-medium block mb-1">
                Enter Box Activation Code
              </label>
              <input
                type="text"
                value={boxCode}
                onChange={(e) => setBoxCode(e.target.value)}
                placeholder="e.g. YUGAL-RESET-0842"
                className="w-full h-[50px] rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.14)] focus:border-[#FFB400] px-4 text-sm text-[#04162A] placeholder-[#5B6B7A]/40 outline-none transition-colors font-mono"
              />
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Button onClick={() => setStep(5)}>
              Pair & Activate Box
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep(5)}
                className="text-xs text-[#5B6B7A]/60 hover:text-[#04162A]"
              >
                I don’t have my box right now (Activate later)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: LIFE PHASE */}
      {step === 5 && (
        <div className="flex-1 flex flex-col justify-between py-2 relative z-10 animate-in fade-in duration-300">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFB400] block mb-1">
              Step 3 of 5
            </span>
            <h2 className="text-2xl font-semibold text-[#04162A] tracking-tight">
              Where are you in life right now?
            </h2>
            <p className="text-xs text-[#5B6B7A] mt-1">
              This gently personalizes the tone and pacing of your reflections.
            </p>

            {/* Three large cards with glowing-circle art */}
            <div className="space-y-3 my-5">
              {[
                {
                  phase: 'Unmarried' as LifePhase,
                  title: 'Unmarried / Solo Sanctuary',
                  desc: 'Cultivating somatic self-attunement, personal rhythm, and hormonal balance.',
                  colors: ['#F2711C', '#FFB400', '#1FA9E0'] as [string, string, string],
                },
                {
                  phase: 'Recently married' as LifePhase,
                  title: 'Recently Married',
                  desc: 'Navigating emotional integration, home transition, and shared energy dynamics.',
                  colors: ['#C94A9B', '#FFB400', '#8A4FB8'] as [string, string, string],
                },
                {
                  phase: 'Postpartum' as LifePhase,
                  title: 'Postpartum Recovery',
                  desc: 'Gently rebuilding the pelvic basin, restoring sleep, and honoring mother identity.',
                  colors: ['#1FA9E0', '#C94A9B', '#68D391'] as [string, string, string],
                },
                {
                  phase: 'Pregnancy' as LifePhase,
                  title: 'Pregnancy Journey',
                  desc: 'Supporting hormonal shifts, nurturing growth, and preparing for motherhood.',
                  colors: ['#F2711C', '#FFB400', '#1FA9E0'] as [string, string, string],
                },
                {
                  phase: 'Peri Menopause' as LifePhase,
                  title: 'Peri Menopause Transition',
                  desc: 'Balancing energy, mood, and body changes during the peri‑menopausal phase.',
                  colors: ['#C94A9B', '#FFB400', '#8A4FB8'] as [string, string, string],
                },
                {
                  phase: 'Post Menopause' as LifePhase,
                  title: 'Post Menopause Harmony',
                  desc: 'Embracing new rhythms, vitality, and holistic well‑being after menopause.',
                  colors: ['#1FA9E0', '#C94A9B', '#68D391'] as [string, string, string],
                },
              ].map((item) => {
                const isSelected = selectedLifePhase === item.phase;
                return (
                  <div
                    key={item.phase}
                    onClick={() => {
                      playSoftTap();
                      setSelectedLifePhase(item.phase);
                    }}
                    className={`p-4 rounded-2xl flex items-center gap-3.5 transition-all cursor-pointer relative overflow-hidden ${isSelected
                      ? 'bg-[#FFFBF4] border-2 border-[#FFB400] shadow-gold-halo'
                      : 'bg-[#FFFBF4]/60 border border-[rgba(201,204,224,0.1)] hover:border-[#04162A]/10'
                      }`}
                  >
                    {/* Glowing-circle art badge */}
                    <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                      <GlowingCircles size={46} colors={item.colors} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-6 h-6 rounded-full bg-[#F6EEE1]/80 flex items-center justify-center text-[#FFB400]">
                          <Heart size={12} />
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-[#04162A]">
                          {item.title}
                        </h4>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-spectrum-gradient text-[#04162A] flex items-center justify-center">
                            <Check size={12} className="stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5B6B7A]/75 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button onClick={() => setStep(6)}>
              Save & Continue
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedLifePhase('Prefer not to say');
                  setStep(6);
                }}
                className="text-xs text-[#5B6B7A]/60 hover:text-[#04162A]"
              >
                Prefer not to say
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: SELF-ASSESSMENT — redirect to external assessment */}
      {step === 6 && (
        <div className="flex-1 flex flex-col justify-between py-2 relative z-10 animate-in fade-in duration-300">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFB400]">
                Step 4 of 5
              </span>
              <button
                type="button"
                onClick={() => {
                  playSoftTap();
                  setStep(7);
                }}
                className="text-xs font-medium text-[#5B6B7A]/70 hover:text-[#FFB400] underline"
              >
                Skip for now
              </button>
            </div>

            <h2 className="text-2xl font-semibold text-[#04162A] tracking-tight mt-1">
              Your Wellness Assessment
            </h2>
            <p className="text-xs text-[#5B6B7A] mt-1 leading-relaxed">
              A short assessment helps us personalise your Reset Box experience — timing, rituals, and guidance curated just for you.
            </p>

            {/* Assessment card */}
            <div className="my-6 rounded-3xl bg-[#FFFBF4] border border-[#FFB400]/30 shadow-gold-halo overflow-hidden relative">
              {/* Decorative glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FFB400]/15 rounded-full filter blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#1FA9E0]/10 rounded-full filter blur-2xl pointer-events-none" />

              <div className="p-6 text-center relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-spectrum-gradient mx-auto flex items-center justify-center text-[#04162A] mb-4 shadow-focal-glow">
                  <ShieldCheck size={26} />
                </div>

                <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#FFB400] block mb-2">
                  Yugal Wellness
                </span>
                <h3 className="text-lg font-semibold text-[#04162A] leading-snug">
                  Understand your body's unique needs
                </h3>
                <p className="text-[11px] text-[#5B6B7A]/75 mt-2 leading-relaxed max-w-[240px] mx-auto">
                  Takes about 3 minutes · Private &amp; secure · Results personalise your 21-day journey
                </p>

                {/* Badges */}
                <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                  {['Sleep', 'Stress', 'Hormonal Rhythm', 'Energy'].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-[#FFB400]/10 border border-[#FFB400]/25 text-[#FFB400]/90 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={() => {
                playSoftTap();
                window.open('https://assessment.yugalwellness.com', '_blank', 'noopener,noreferrer');
              }}
            >
              <span className="flex items-center justify-center gap-2">
                Take Your Assessment
                <ArrowRight size={16} />
              </span>
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  playSoftTap();
                  setStep(7);
                }}
                className="text-xs text-[#5B6B7A]/60 hover:text-[#04162A] transition-colors py-1"
              >
                Skip for now — I'll do it later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: QUICK TOUR (4 swipeable/skippable cards) */}
      {step === 7 && (
        <div className="flex-1 flex flex-col justify-between py-2 relative z-10 animate-in fade-in duration-300">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFB400]">
                Quick Tour · {tourIndex + 1} of 4
              </span>
              <button
                type="button"
                onClick={finishOnboarding}
                className="text-xs font-medium text-[#5B6B7A]/70 hover:text-[#FFB400] underline"
              >
                Skip to Sanctuary
              </button>
            </div>

            {/* Tour Cards Content */}
            <div className="my-6">
              {[
                {
                  badge: 'TACTILE FREEDOM',
                  title: 'Pick any card from your box. There is no right order.',
                  desc: 'Draw whatever card calls to you each morning or evening. You are in complete control of your sacred rhythm.',
                  colors: ['#F2711C', '#FFB400', '#1FA9E0'] as [string, string, string],
                },
                {
                  badge: 'SEAMLESS SCAN',
                  title: 'Scan the QR and your challenge opens.',
                  desc: 'Point your camera at the physical card stamp to immediately unlock the video, somatic guidance, and reflection.',
                  colors: ['#FFB400', '#E8452C', '#C94A9B'] as [string, string, string],
                },
                {
                  badge: 'EXPERT GUIDANCE',
                  title: 'Practise with an expert, then mark it done.',
                  desc: 'Gentle, zero-pressure somatic flows led by OB/GYNs, somatic movement therapists, and psychologists.',
                  colors: ['#1FA9E0', '#8A4FB8', '#FFB400'] as [string, string, string],
                },
                {
                  badge: 'INNER EQUILIBRIUM',
                  title: 'Watch how you are growing, and ask Yugal AI anything, privately.',
                  desc: 'Track your 0 to 21 reset progress, reflect in your encrypted journal, and chat with your calm, judgment-free companion.',
                  colors: ['#C94A9B', '#8A4FB8', '#1FA9E0'] as [string, string, string],
                },
              ].map((card, idx) => {
                if (idx !== tourIndex) return null;
                return (
                  <div
                    key={card.title}
                    className="p-6 rounded-3xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.14)] shadow-gold-halo text-center min-h-[340px] flex flex-col justify-between"
                  >
                    <div className="flex justify-center my-4">
                      <GlowingCircles size={130} colors={card.colors} />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#FFB400] block mb-1">
                        {card.badge}
                      </span>
                      <h3 className="text-xl font-semibold text-[#04162A] tracking-tight leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs text-[#5B6B7A]/80 mt-2 leading-relaxed max-w-xs mx-auto">
                        {card.desc}
                      </p>
                    </div>

                    {/* Dot indicators */}
                    <div className="flex justify-center gap-1.5 pt-4">
                      {[0, 1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          onClick={() => setTourIndex(dot)}
                          className={`h-1.5 rounded-full cursor-pointer transition-all ${dot === tourIndex
                            ? 'w-6 bg-spectrum-gradient'
                            : 'w-1.5 bg-white/20'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {tourIndex < 3 ? (
              <Button onClick={() => setTourIndex(tourIndex + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={finishOnboarding}>
                Enter Your Sanctuary
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
