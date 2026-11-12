import React, { useState } from 'react';
import { CycleData, CycleDayLog, CycleSymptom, FlowLevel, MoodType } from '../../types/yugal';
import { MoodSelector } from '../ui/MoodSelector';
import { Button } from '../ui/Button';
import {
    Droplets,
    Heart,
    Moon,
    ZapOff,
    ChevronRight,
    ChevronLeft,
    Baby,
    Thermometer,
    X,
    Bot,
    Plus,
} from 'lucide-react';
import { playSoftTap, playSingingBowl } from '../../utils/audio';

// ─── Helpers ────────────────────────────────────────────────────────────────

const PHASE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
    Menstrual: { bg: 'bg-rose-500/20', text: 'text-rose-400', dot: 'bg-rose-500' },
    Follicular: { bg: 'bg-amber-400/20', text: 'text-amber-400', dot: 'bg-amber-400' },
    Ovulation: { bg: 'bg-emerald-400/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
    Luteal: { bg: 'bg-violet-500/20', text: 'text-violet-400', dot: 'bg-violet-500' },
};

const PHASE_TIPS: Record<string, string> = {
    Menstrual: 'Rest and restore. A gentle CALM practice supports you today.',
    Follicular: 'Energy is rising — a great day for MOVE challenges.',
    Ovulation: 'You\'re at your peak vitality. Explore CONNECT practices.',
    Luteal: 'Turn inward. FEEL and UNDERSTAND are your allies now.',
};

function toLocalIsoDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getCalendarCells(month: Date) {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstWeekday = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    return [
        ...Array.from({ length: firstWeekday }, () => null),
        ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, monthIndex, index + 1)),
    ];
}

// ─── Sub-screens ─────────────────────────────────────────────────────────────

const SYMPTOMS: CycleSymptom[] = ['Cramps', 'Bloating', 'Headache', 'Fatigue', 'Mood swings', 'Hot flashes', 'Sleep issues'];
const FLOW_LEVELS: FlowLevel[] = ['Light', 'Medium', 'Heavy'];
const QUICK_SENSATIONS = [
    'Restful sleep',
    'High stamina',
    'Sensory clarity',
    'Deep intuition',
    'Tender breasts',
    'Pelvic warmth',
    'Light cramping',
    'Sweet cravings',
];

function QuickSymptomLog({
    selectedDate,
    onSave,
}: {
    selectedDate: string;
    onSave: (date: string, symptoms: string[], otherSymptoms: string[]) => void;
}) {
    const [date, setDate] = useState(selectedDate);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [otherText, setOtherText] = useState('');
    const otherSymptoms = otherText
        .split(/[,\n]/)
        .map((symptom) => symptom.trim())
        .filter(Boolean);

    const toggleSymptom = (symptom: string) => {
        setSelectedSymptoms((previous) =>
            previous.includes(symptom)
                ? previous.filter((item) => item !== symptom)
                : [...previous, symptom]
        );
    };

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                onSave(date, selectedSymptoms, otherSymptoms);
                setSelectedSymptoms([]);
                setOtherText('');
                playSingingBowl(528, 1.5);
            }}
            className="p-5 rounded-3xl bg-[#FFFBF4] border border-[#04162A] space-y-4"
        >
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#04162A]">
                Quick symptom &amp; sensation log
            </h2>
            <div className="flex flex-wrap gap-2">
                {QUICK_SENSATIONS.map((symptom) => {
                    const selected = selectedSymptoms.includes(symptom);
                    return (
                        <button
                            key={symptom}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                                playSoftTap();
                                toggleSymptom(symptom);
                            }}
                            className={`rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                                selected
                                    ? 'bg-[#04162A] text-[#FFE7A8]'
                                    : 'bg-[#F6EEE1] text-[#04162A] hover:bg-[#FFE7A8]'
                            }`}
                        >
                            {selected ? '✓ ' : '+ '}{symptom}
                        </button>
                    );
                })}
            </div>

            <div className="space-y-2">
                <label htmlFor="other-cycle-symptoms" className="text-xs font-semibold text-[#04162A]">
                    Others
                </label>
                <textarea
                    id="other-cycle-symptoms"
                    value={otherText}
                    onChange={(event) => setOtherText(event.target.value)}
                    rows={2}
                    placeholder="Type your own symptom or sensation..."
                    className="w-full resize-none rounded-2xl border border-[#04162A] bg-[#F6EEE1] px-4 py-3 text-sm text-[#04162A] placeholder-[#5B6B7A]/60 outline-none focus:border-[#FFB400]"
                />
                <p className="text-[10px] text-[#5B6B7A]">Separate multiple entries with commas or new lines.</p>
            </div>

            <div className="flex items-center justify-between gap-3">
                <input
                    aria-label="Date to save symptom log"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    className="min-h-[42px] min-w-0 rounded-xl border border-[#04162A]/20 bg-[#F6EEE1] px-3 text-xs text-[#04162A]"
                />
                <button
                    type="submit"
                    disabled={!date || (!selectedSymptoms.length && !otherSymptoms.length)}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#FFB400] px-4 text-xs font-semibold text-[#04162A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Plus size={14} /> Save to calendar
                </button>
            </div>
        </form>
    );
}

function LogSheet({
    onSave,
    onClose,
}: {
    onSave: (log: CycleDayLog) => void;
    onClose: () => void;
}) {
    const [flow, setFlow] = useState<FlowLevel | undefined>();
    const [symptoms, setSymptoms] = useState<CycleSymptom[]>([]);
    const [mood, setMood] = useState<MoodType>('Okay');
    const [sleep, setSleep] = useState(7);

    const toggleSymptom = (s: CycleSymptom) => {
        setSymptoms((prev) =>
            prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
        );
    };

    const handleSave = () => {
        playSingingBowl(528, 1.5);
        onSave({
            date: toLocalIsoDate(new Date()),
            flowLevel: flow,
            symptoms,
            mood,
            sleepHours: sleep,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] bg-[#F6EEE1]/95 backdrop-blur-sm flex flex-col justify-end">
            <div className="bg-[#FFFBF4] rounded-t-3xl border-t border-[rgba(201,204,224,0.12)] p-6 space-y-5 max-h-[85vh] overflow-y-auto pb-10">
                {/* Handle */}
                <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-2" />

                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#04162A]">Log Today</h3>
                    <button onClick={onClose} className="p-1 rounded-full bg-[#F6EEE1] text-[#5B6B7A] cursor-pointer hover:text-[#04162A]">
                        <X size={18} />
                    </button>
                </div>

                {/* Flow */}
                <div>
                    <p className="text-xs font-semibold text-[#FFB400] uppercase tracking-wider mb-2">Flow</p>
                    <div className="flex gap-2">
                        {FLOW_LEVELS.map((f) => (
                            <button
                                key={f}
                                onClick={() => { playSoftTap(); setFlow(f); }}
                                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${flow === f
                                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                                        : 'bg-[#F6EEE1] text-[#5B6B7A] border-transparent hover:border-[#04162A]/10'
                                    }`}
                            >
                                <Droplets size={14} className="mx-auto mb-1" />
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Symptoms */}
                <div>
                    <p className="text-xs font-semibold text-[#FFB400] uppercase tracking-wider mb-2">Symptoms</p>
                    <div className="flex flex-wrap gap-2">
                        {SYMPTOMS.map((s) => (
                            <button
                                key={s}
                                onClick={() => { playSoftTap(); toggleSymptom(s); }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${symptoms.includes(s)
                                        ? 'bg-[#C94A9B]/20 text-[#C94A9B] border-[#C94A9B]/40'
                                        : 'bg-[#F6EEE1] text-[#5B6B7A] border-transparent'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mood */}
                <div>
                    <p className="text-xs font-semibold text-[#FFB400] uppercase tracking-wider mb-2">Mood</p>
                    <MoodSelector selectedMood={mood} onSelectMood={(m) => { playSoftTap(); setMood(m); }} compact={false} />
                </div>

                {/* Sleep */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-[#FFB400] uppercase tracking-wider">Sleep</p>
                        <span className="text-sm font-bold text-[#04162A]">{sleep}h</span>
                    </div>
                    <input
                        type="range" min={3} max={12} step={0.5}
                        value={sleep}
                        onChange={(e) => setSleep(parseFloat(e.target.value))}
                        className="w-full accent-[#FFB400]"
                    />
                </div>

                <Button onClick={handleSave} variant="primary">Save Today's Log</Button>
            </div>
        </div>
    );
}

function CycleCalendar({
    cycleData,
    mode,
    month,
    selectedDate,
    onMonthChange,
    onSelectDate,
}: {
    cycleData: CycleData;
    mode: CycleData['mode'];
    month: Date;
    selectedDate: string;
    onMonthChange: (month: Date) => void;
    onSelectDate: (date: string) => void;
}) {
    const cells = getCalendarCells(month);
    const selectedDayLogs = cycleData.logs.filter((log) => log.date === selectedDate);

    return (
        <div className="p-4 rounded-2xl bg-[#F6EEE1] border border-[rgba(4,22,42,0.10)]">
            <div className="flex items-center justify-between mb-3">
                <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                    className="p-1 rounded-full text-[#5B6B7A] hover:bg-[#F6EEE1]"
                >
                    <ChevronLeft size={16} />
                </button>
                <p className="text-xs font-semibold text-[#04162A]">
                    {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(month)}
                </p>
                <button
                    type="button"
                    aria-label="Next month"
                    onClick={() => onMonthChange(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                    className="p-1 rounded-full text-[#5B6B7A] hover:bg-[#F6EEE1]"
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <span key={`${day}-${index}`} className="text-[9px] text-[#5B6B7A]/50 font-medium">{day}</span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {cells.map((date, index) => {
                    if (!date) return <span key={`empty-${index}`} />;
                    const dateKey = toLocalIsoDate(date);
                    const dayLogs = cycleData.logs.filter((log) => log.date === dateKey);
                    const eventLabels = dayLogs.flatMap((log) => [
                        ...(log.quickSymptoms || []),
                        ...(log.otherSymptoms || []),
                        ...(log.symptoms || []),
                    ]);
                    const hasFlowLog = dayLogs.some((log) => log.flowLevel);
                    const selected = dateKey === selectedDate;
                    const cycleLength = Math.max(1, cycleData.averageCycleLength || 28);
                    const periodStart = cycleData.lastPeriodStart
                        ? new Date(`${cycleData.lastPeriodStart}T12:00:00`)
                        : null;
                    const calendarDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
                    const cycleOffset = periodStart
                        ? Math.floor((calendarDate.getTime() - periodStart.getTime()) / 86400000)
                        : -1;
                    const cycleDay = cycleOffset >= 0
                        ? (cycleOffset % cycleLength) + 1
                        : 0;
                    const isPeriodDay = hasFlowLog || (
                        mode === 'regular' &&
                        cycleOffset >= 0 &&
                        Math.floor(cycleOffset / cycleLength) === 0 &&
                        cycleDay <= 5
                    );
                    const isPredictedPeriodDay = mode === 'regular' && cycleDay >= Math.max(1, cycleLength - 2);
                    const ovulationDay = Math.max(1, cycleLength - 14);
                    const isOvulationDay = mode === 'regular' && cycleDay === ovulationDay;
                    const isFertileDay = mode === 'regular' &&
                        cycleDay >= Math.max(1, ovulationDay - 4) &&
                        cycleDay <= ovulationDay + 4 &&
                        !isOvulationDay;
                    const dayFill = isPeriodDay
                        ? 'bg-[#E8452C] text-white'
                        : isPredictedPeriodDay
                            ? 'border-[1.5px] border-[#E8452C] bg-[#F6EEE1] text-[#04162A]'
                            : isOvulationDay
                                ? 'bg-[#FFB400] text-[#04162A]'
                                : isFertileDay
                                    ? 'bg-[#1FA9E0] text-white'
                                    : 'bg-[#FFFBF4] text-[#04162A]';

                    return (
                        <button
                            key={dateKey}
                            type="button"
                            aria-label={`${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}${eventLabels.length ? `, ${eventLabels.join(', ')}` : ''}`}
                            aria-pressed={selected}
                            onClick={() => onSelectDate(dateKey)}
                            className="min-h-[54px] rounded-lg px-0.5 py-1 flex flex-col items-center justify-start text-[11px] text-[#04162A] transition-colors hover:bg-[#FFFBF4]/70"
                        >
                            <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    selected
                                        ? 'p-[2.5px] shadow-[0_0_12px_rgba(201,74,155,0.28)]'
                                        : dayFill
                                }`}
                                style={selected ? {
                                    background: 'linear-gradient(135deg, #FFB400 0%, #F2711C 25%, #E8452C 50%, #C94A9B 75%, #1FA9E0 100%)',
                                    boxShadow: '0 0 12px rgba(201, 74, 155, 0.28)',
                                } : undefined}
                            >
                                <span className={`w-full h-full rounded-full flex items-center justify-center font-bold ${
                                    selected ? 'bg-[#FFFBF4] text-[#04162A]' : ''
                                }`}>
                                    {date.getDate()}
                                </span>
                            </span>
                            {eventLabels.length > 0 && (
                                <span
                                    title={eventLabels.join(', ')}
                                    className="mt-0.5 w-full truncate rounded bg-[#FFB400] px-0.5 text-[7px] leading-3 text-[#04162A]"
                                >
                                    {eventLabels[0]}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 border-t border-[#04162A]/10 pt-3">
                <p className="text-xs font-semibold text-[#04162A]">
                    {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(new Date(`${selectedDate}T12:00:00`))}
                </p>
                {selectedDayLogs.length > 0 ? (
                    <div className="mt-2 space-y-2">
                        {selectedDayLogs.map((log, index) => {
                            const entries = [
                                ...(log.quickSymptoms || []),
                                ...(log.otherSymptoms || []),
                                ...(log.symptoms || []),
                            ];
                            return (
                                <div key={`${log.date}-${index}`} className="rounded-xl bg-[#CDEBF8]/60 p-2.5 text-xs text-[#04162A]">
                                    {entries.length > 0 ? entries.join(' · ') : 'Cycle log'}
                                    {log.flowLevel && <span className="block mt-1 text-[10px] text-[#5B6B7A]">Flow: {log.flowLevel}</span>}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="mt-1 text-[11px] text-[#5B6B7A]">No entries saved for this day.</p>
                )}
            </div>
        </div>
    );
}

// ─── Mood Bottom Sheet ───────────────────────────────────────────────────────

function MoodInsightsSheet({ onClose, onGoToJournal }: { onClose: () => void; onGoToJournal: () => void }) {
    const moods = ['😰', '😴', '😐', '😊', '✨'];
    const moodByPhase = [
        { phase: 'Menstrual', mood: 'Tired', bar: 30 },
        { phase: 'Follicular', mood: 'Good', bar: 72 },
        { phase: 'Ovulation', mood: 'Radiant', bar: 90 },
        { phase: 'Luteal', mood: 'Okay', bar: 55 },
    ];

    return (
        <div className="fixed inset-0 z-[60] bg-[#F6EEE1]/90 backdrop-blur-sm flex flex-col justify-end">
            <div className="bg-[#FFFBF4] rounded-t-3xl border-t border-[rgba(201,204,224,0.12)] p-6 pb-10 space-y-5 max-h-[80vh] overflow-y-auto">
                <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-2" />
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#04162A]">This is how you felt this month</h3>
                    <button onClick={onClose} className="p-1 rounded-full bg-[#F6EEE1] text-[#5B6B7A] cursor-pointer hover:text-[#04162A]">
                        <X size={18} />
                    </button>
                </div>

                {/* Mood mini timeline */}
                <div>
                    <p className="text-xs text-[#5B6B7A]/60 mb-2">Mood over the month</p>
                    <div className="flex items-end gap-1.5 h-14">
                        {Array.from({ length: 28 }).map((_, i) => {
                            const h = 20 + Math.sin(i * 0.4) * 16 + Math.random() * 12;
                            return (
                                <div
                                    key={i}
                                    className="flex-1 rounded-sm"
                                    style={{ height: `${h}px`, background: `linear-gradient(180deg, #FFB400, #C94A9B)`, opacity: 0.7 + (i % 3) * 0.1 }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Most common mood */}
                <div className="p-3 rounded-2xl bg-[#FFF8EC] border border-[rgba(201,204,224,0.08)]">
                    <p className="text-[10px] text-[#5B6B7A]/60 uppercase tracking-wider">Most common mood</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl">😊</span>
                        <div>
                            <p className="text-sm font-bold text-[#04162A]">Good</p>
                            <p className="text-[10px] text-[#5B6B7A]/60">12 days this month</p>
                        </div>
                    </div>
                </div>

                {/* Mood by phase */}
                <div>
                    <p className="text-xs font-semibold text-[#FFB400] uppercase tracking-wider mb-2">Mood by cycle phase</p>
                    <div className="space-y-2">
                        {moodByPhase.map(({ phase, mood, bar }) => (
                            <div key={phase} className="flex items-center gap-3">
                                <span className="text-[10px] text-[#5B6B7A] w-20 shrink-0">{phase}</span>
                                <div className="flex-1 h-2 rounded-full bg-[#F6EEE1]">
                                    <div
                                        className="h-2 rounded-full"
                                        style={{ width: `${bar}%`, background: 'linear-gradient(90deg, #FFB400, #C94A9B)' }}
                                    />
                                </div>
                                <span className="text-[10px] text-[#5B6B7A]/70 w-14 text-right">{mood}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => { playSoftTap(); onGoToJournal(); }}
                    className="w-full text-center text-xs text-[#FFB400] underline underline-offset-2 cursor-pointer"
                >
                    Go to Journal →
                </button>
            </div>
        </div>
    );
}

// ─── Pregnancy Mode ──────────────────────────────────────────────────────────

function PregnancyMode({ cycleData }: { cycleData: CycleData }) {
    const week = cycleData.pregnancyWeek ?? 24;
    const trimester = week <= 12 ? 1 : week <= 27 ? 2 : 3;
    const trimesterProgress = trimester === 1 ? week / 12 : trimester === 2 ? (week - 12) / 15 : (week - 27) / 13;

    const babySize = week < 8 ? 'a blueberry' : week < 12 ? 'a lime' : week < 20 ? 'an avocado' : week < 28 ? 'a papaya' : 'a small pumpkin';

    return (
        <div className="space-y-4">
            {/* Week counter ring */}
            <div className="p-5 rounded-3xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.12)] flex items-center gap-5">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <svg viewBox="0 0 96 96" className="w-24 h-24 -rotate-90">
                        <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,180,0,0.1)" strokeWidth="8" />
                        <circle
                            cx="48" cy="48" r="40"
                            fill="none"
                            stroke="url(#pregGrad)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${trimesterProgress * 251} 251`}
                        />
                        <defs>
                            <linearGradient id="pregGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FFB400" />
                                <stop offset="100%" stopColor="#C94A9B" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-[#04162A]">{week}</span>
                        <span className="text-[9px] text-[#5B6B7A]/70 font-medium">weeks</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-[#FFB400] font-semibold">Trimester {trimester}</p>
                    <h3 className="text-lg font-bold text-[#04162A]">Week {week}</h3>
                    <p className="text-xs text-[#5B6B7A]/80 mt-1">
                        Your baby is about the size of <strong className="text-[#04162A]">{babySize}</strong>.
                    </p>
                    <p className="text-[10px] text-[#5B6B7A]/60 mt-1">
                        Due: {cycleData.dueDateEstimate ?? 'Not set — tap to add'}
                    </p>
                </div>
            </div>

            {/* Weekly tip */}
            <div className="p-4 rounded-2xl bg-[#F4EBDD]/5 border border-[#F4EBDD]/20">
                <p className="text-[10px] uppercase tracking-wider text-[#FFB400] font-semibold mb-1">This Week's Tip</p>
                <p className="text-sm text-[#F4EBDD]/90 leading-relaxed">
                    Gentle pelvic floor exercises and side-lying rest are wonderful right now. Honour your body's wisdom.
                </p>
            </div>

            {/* Symptom log */}
            <div className="p-4 rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.10)] space-y-2">
                <p className="text-xs font-semibold text-[#04162A]">Log symptoms</p>
                <div className="flex flex-wrap gap-2">
                    {['Nausea', 'Fatigue', 'Heartburn', 'Backache', 'Swelling', 'Mood swings'].map((s) => (
                        <button
                            key={s}
                            onClick={() => playSoftTap()}
                            className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#F6EEE1] text-[#5B6B7A] border border-transparent hover:border-[#FFB400]/40 hover:text-[#04162A] transition-all cursor-pointer"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Perimenopause / Menopause Mode ──────────────────────────────────────────

function MenopauseMode({ mode }: { mode: 'perimenopause' | 'menopause' }) {
    const label = mode === 'perimenopause' ? 'Perimenopause' : 'Menopause';
    const symptoms = ['Hot flashes', 'Night sweats', 'Sleep issues', 'Mood swings', 'Brain fog', 'Irregular periods'];

    return (
        <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.12)]">
                <p className="text-[10px] uppercase tracking-wider text-[#8A4FB8] font-semibold mb-1">{label} Support</p>
                <h3 className="text-xl font-bold text-[#04162A]">Your body is <span className="text-[#FFB400]">wise</span> and changing.</h3>
                <p className="text-xs text-[#5B6B7A]/80 mt-2 leading-relaxed">
                    Track your patterns gently. Every body's journey through this transition is unique and valid.
                </p>
            </div>

            {/* Symptom log */}
            <div className="p-4 rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.10)] space-y-3">
                <p className="text-xs font-semibold text-[#04162A]">How are you today? Log your experience</p>
                <div className="flex flex-wrap gap-2">
                    {symptoms.map((s) => (
                        <button
                            key={s}
                            onClick={() => playSoftTap()}
                            className="px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#F6EEE1] text-[#5B6B7A] border border-transparent hover:border-[#8A4FB8]/60 hover:text-[#04162A] transition-all cursor-pointer"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gentle summary */}
            <div className="p-4 rounded-2xl bg-[#8A4FB8]/10 border border-[#8A4FB8]/20 space-y-2">
                <p className="text-xs font-semibold text-[#8A4FB8]">Pattern this month</p>
                <p className="text-xs text-[#5B6B7A]/80">Hot flashes appear most often in the evening. Sleep quality has been moderate. Your patterns are your guide — not a diagnosis.</p>
                <button
                    onClick={() => playSoftTap()}
                    className="flex items-center gap-2 text-[11px] text-[#FFB400] font-medium cursor-pointer hover:underline mt-1"
                >
                    <Bot size={13} />
                    Talk to Yugal AI about this
                    <ChevronRight size={12} />
                </button>
            </div>
        </div>
    );
}

// ─── Main CycleTab ────────────────────────────────────────────────────────────

interface CycleTabProps {
    cycleData: CycleData;
    onCycleDataUpdate: (data: Partial<CycleData>) => void;
    onNavigateToJournal: () => void;
    onNavigateToAI: () => void;
}

export const CycleTab: React.FC<CycleTabProps> = ({
    cycleData,
    onCycleDataUpdate,
    onNavigateToJournal,
    onNavigateToAI,
}) => {
    const [showLogSheet, setShowLogSheet] = useState(false);
    const [showMoodInsights, setShowMoodInsights] = useState(false);
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => toLocalIsoDate(new Date()));
    const [calendarMonth, setCalendarMonth] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    });

    const { currentPhase, currentDayInCycle, mode } = cycleData;
    const phaseColors = PHASE_COLORS[currentPhase];

    const handleLog = (log: CycleDayLog) => {
        const existingLog = cycleData.logs.find((item) => item.date === log.date);
        const otherLogs = cycleData.logs.filter((item) => item.date !== log.date);
        onCycleDataUpdate({
            logs: [
                ...otherLogs,
                {
                    ...existingLog,
                    ...log,
                    flowLevel: log.flowLevel || existingLog?.flowLevel,
                    symptoms: [...new Set([...(existingLog?.symptoms || []), ...(log.symptoms || [])])],
                    quickSymptoms: existingLog?.quickSymptoms,
                    otherSymptoms: existingLog?.otherSymptoms,
                },
            ],
        });
    };

    const handleQuickSymptomSave = (date: string, symptoms: string[], otherSymptoms: string[]) => {
        const existingLog = cycleData.logs.find((log) => log.date === date);
        const otherLogs = cycleData.logs.filter((log) => log.date !== date);
        onCycleDataUpdate({
            logs: [
                ...otherLogs,
                {
                    ...existingLog,
                    date,
                    quickSymptoms: [...new Set([...(existingLog?.quickSymptoms || []), ...symptoms])],
                    otherSymptoms: [...new Set([...(existingLog?.otherSymptoms || []), ...otherSymptoms])],
                },
            ],
        });
        setSelectedCalendarDate(date);
        const savedDate = new Date(`${date}T12:00:00`);
        setCalendarMonth(new Date(savedDate.getFullYear(), savedDate.getMonth(), 1));
    };

    // Determine ring gradient angle based on cycle day
    const ringProgress = Math.min((currentDayInCycle / (cycleData.averageCycleLength || 28)) * 100, 100);
    const circumference = 2 * Math.PI * 52;

    return (
        <div className="space-y-5 pb-28 animate-in fade-in duration-300">
            {/* Header */}
            <div className="pt-2 flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-medium text-[#FFB400] tracking-wide uppercase">Phases</span>
                    <h1 className="text-2xl font-bold text-[#04162A] tracking-tight leading-snug">
                        Your <span className="text-[#FFB400]">Rhythm</span>
                    </h1>
                </div>
                {/* Mini Mood Icon — top right */}
                <button
                    onClick={() => { playSoftTap(); setShowMoodInsights(true); }}
                    className="flex flex-col items-center gap-0.5 cursor-pointer group"
                    title="How you felt this month"
                >
                    <div className="w-11 h-11 rounded-full bg-[#FFFBF4] border-2 border-[#FFB400]/30 flex items-center justify-center text-xl group-hover:border-[#FFB400] transition-all shadow-[0_0_12px_rgba(255,180,0,0.2)]">
                        😊
                    </div>
                    <span className="text-[9px] text-[#5B6B7A]/60">This month</span>
                </button>
            </div>

            {/* Cycle modes */}
            <div className="flex gap-2">
                {(['regular', 'pregnancy', 'perimenopause', 'menopause'] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => { playSoftTap(); onCycleDataUpdate({ mode: m }); }}
                        className={`flex-1 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wide transition-all cursor-pointer border ${mode === m
                                ? 'bg-[#FFB400]/20 text-[#FFB400] border-[#FFB400]/40'
                                : 'bg-[#F6EEE1] text-[#5B6B7A]/50 border-transparent hover:border-[#04162A]/10'
                            }`}
                    >
                        {m === 'regular' ? 'Cycle' : m === 'pregnancy' ? 'Preg.' : m === 'perimenopause' ? 'Peri' : 'Meno'}
                    </button>
                ))}
            </div>

            {/* Mode switcher — only for regular mode show ring + calendar */}
            {mode === 'pregnancy' && <PregnancyMode cycleData={cycleData} />}
            {(mode === 'perimenopause' || mode === 'menopause') && <MenopauseMode mode={mode} />}

            {mode === 'regular' && (
                <>
                    {/* Glowing Cycle Ring */}
                    <div className="p-5 rounded-3xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.12)] flex flex-col items-center relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#FFB400]/10 blur-2xl pointer-events-none" />

                        <div className="relative w-[140px] h-[140px]">
                            {/* Outer ambient glow */}
                            <div className="absolute inset-0 rounded-full blur-xl opacity-30" style={{ background: 'radial-gradient(circle, #FFB400 0%, transparent 70%)' }} />
                            <svg viewBox="0 0 120 120" className="w-[140px] h-[140px] -rotate-90">
                                {/* Track */}
                                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                                {/* Progress */}
                                <circle
                                    cx="60" cy="60" r="52"
                                    fill="none"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(ringProgress / 100) * circumference} ${circumference}`}
                                    style={{ stroke: 'url(#cycleGrad)' }}
                                />
                                <defs>
                                    <linearGradient id="cycleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#FFB400" />
                                        <stop offset="33%" stopColor="#F2711C" />
                                        <stop offset="66%" stopColor="#C94A9B" />
                                        <stop offset="100%" stopColor="#8A4FB8" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-black text-[#04162A]">{currentDayInCycle}</span>
                                <span className="text-[10px] text-[#5B6B7A]/70 font-medium">Day {currentDayInCycle}</span>
                            </div>
                        </div>

                        {/* Phase label */}
                        <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${phaseColors.bg} ${phaseColors.text}`}>
                            {currentPhase} Phase
                        </div>
                        <p className="text-xs text-[#5B6B7A]/80 text-center mt-2 max-w-[220px] leading-relaxed">
                            {PHASE_TIPS[currentPhase]}
                        </p>
                    </div>

                    {/* Quick Log Chips */}
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-[#FFB400] px-1 mb-2">Quick Log</p>
                        <div className="flex gap-2 flex-wrap">
                            {[
                                { label: 'Flow', icon: Droplets, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
                                { label: 'Symptoms', icon: ZapOff, color: 'text-violet-400 border-violet-500/30 bg-violet-500/10' },
                                { label: 'Mood', icon: Heart, color: 'text-[#C94A9B] border-[#C94A9B]/30 bg-[#C94A9B]/10' },
                                { label: 'Sleep', icon: Moon, color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
                            ].map(({ label, icon: Icon, color }) => (
                                <button
                                    key={label}
                                    onClick={() => { playSoftTap(); setShowLogSheet(true); }}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border cursor-pointer hover:opacity-80 transition-opacity ${color}`}
                                >
                                    <Icon size={12} />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Log Period Button */}
                    <Button variant="primary" onClick={() => { playSoftTap(); setShowLogSheet(true); }} icon={<Droplets size={16} />}>
                        Log period
                    </Button>

                    {/* Cycle insights teaser */}
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { label: 'Avg cycle', value: `${cycleData.averageCycleLength} days` },
                            { label: 'Next period', value: 'In ~14 days*' },
                            { label: 'Luteal length', value: '~14 days' },
                            { label: 'Last logged', value: 'Today' },
                        ].map(({ label, value }) => (
                            <div key={label} className="p-3 rounded-2xl bg-[#FFFBF4] border border-[rgba(201,204,224,0.08)]">
                                <p className="text-[10px] text-[#5B6B7A]/60">{label}</p>
                                <p className="text-sm font-bold text-[#04162A] mt-0.5">{value}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-[#5B6B7A]/40 text-center px-4">
                        *Estimates only — not a medical diagnosis. Consult your healthcare provider for guidance.
                    </p>
                </>
            )}

            <CycleCalendar
                cycleData={cycleData}
                mode={mode}
                month={calendarMonth}
                selectedDate={selectedCalendarDate}
                onMonthChange={setCalendarMonth}
                onSelectDate={setSelectedCalendarDate}
            />

            <QuickSymptomLog
                key={selectedCalendarDate}
                selectedDate={selectedCalendarDate}
                onSave={handleQuickSymptomSave}
            />

            {/* Overlays */}
            {showLogSheet && (
                <LogSheet
                    onSave={handleLog}
                    onClose={() => setShowLogSheet(false)}
                />
            )}
            {showMoodInsights && (
                <MoodInsightsSheet
                    onClose={() => setShowMoodInsights(false)}
                    onGoToJournal={() => { setShowMoodInsights(false); onNavigateToJournal(); }}
                />
            )}
        </div>
    );
};
