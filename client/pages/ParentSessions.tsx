import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronDown,
  Check,
  Clock,
  MessageSquare,
  FileText,
  Lightbulb,
  BookOpen,
  Activity,
  BarChart2,
  TrendingUp,
  Zap,
  User,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// ── Types ─────────────────────────────────────────────────────────────────────

interface TranscriptLine {
  speaker: 'Therapist' | 'Leo';
  text: string;
}

interface FluencyBar {
  label: string;
  score: number;
}

interface SessionData {
  id: string;
  label: string;
  date: string;
  duration: string;
  engagement: number;
  turns: number;
  topics: string[];
  transcript: TranscriptLine[];
  fluency: FluencyBar[];
  avgPause: string;
  fluencyScore: string;
  therapistNote: string;
  focusArea: string;
  tips: string[];
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const sessions: SessionData[] = [
  {
    id: 'oct24',
    label: 'Oct 24, 2023 · 15 min',
    date: 'Oct 24, 2023',
    duration: '15 min',
    engagement: 87,
    turns: 24,
    topics: ['Animals 🐾', 'Colors 🎨', 'Family 👨‍👩‍👦', 'Food 🍎'],
    transcript: [
      { speaker: 'Therapist', text: 'Leo, can you tell me what sound a dog makes?' },
      { speaker: 'Leo', text: 'Woof woof! Dogs are big and fluffy.' },
      { speaker: 'Therapist', text: 'Great! What color is your favorite dog?' },
      { speaker: 'Leo', text: 'Brown! Like the one at grandma\'s house.' },
    ],
    fluency: [
      { label: '0–3m', score: 74 },
      { label: '3–6m', score: 80 },
      { label: '6–9m', score: 85 },
      { label: '9–12m', score: 88 },
      { label: '12–15m', score: 82 },
    ],
    avgPause: '1.8s',
    fluencyScore: '82%',
    therapistNote:
      'Leo showed strong engagement throughout the session. He spontaneously connected the animal topic to his personal experience with grandma\'s dog — a great sign of narrative linking. Minimal prompting was needed after the first two exchanges.',
    focusArea: 'Narrative Linking',
    tips: [
      'Ask Leo to describe a pet or animal he saw today using at least two details.',
      'Play a color-naming game at dinner — "What color is this food?"',
      'Encourage Leo to tell grandma about his favorite animal next visit.',
    ],
  },
  {
    id: 'oct22',
    label: 'Oct 22, 2023 · 12 min',
    date: 'Oct 22, 2023',
    duration: '12 min',
    engagement: 79,
    turns: 19,
    topics: ['Weather ☁️', 'Clothes 👕', 'Numbers 🔢', 'Shapes 🔷'],
    transcript: [
      { speaker: 'Therapist', text: 'What did you wear today, Leo? Is it cold outside?' },
      { speaker: 'Leo', text: 'I have my blue jacket. It\'s a little bit cold.' },
      { speaker: 'Therapist', text: 'How many buttons does your jacket have?' },
      { speaker: 'Leo', text: 'Um… one, two, three. Three buttons!' },
    ],
    fluency: [
      { label: '0–3m', score: 68 },
      { label: '3–6m', score: 75 },
      { label: '6–9m', score: 78 },
      { label: '9–12m', score: 72 },
    ],
    avgPause: '2.3s',
    fluencyScore: '73%',
    therapistNote:
      'Leo was slightly quieter at the start but warmed up well by the midpoint. He demonstrated good counting ability and self-corrected his pause before answering the button question. The session was shorter due to a brief attention dip around the 8-minute mark.',
    focusArea: 'Self-Correction',
    tips: [
      'Count objects together during daily routines — stairs, fruit in a bowl, socks.',
      'Ask Leo to describe the weather each morning in one full sentence.',
      'Let Leo pick his outfit and explain why he chose each item.',
    ],
  },
  {
    id: 'oct17',
    label: 'Oct 17, 2023 · 18 min',
    date: 'Oct 17, 2023',
    duration: '18 min',
    engagement: 92,
    turns: 31,
    topics: ['Vehicles 🚗', 'Places 🏫', 'Actions 🏃', 'Emotions 😊'],
    transcript: [
      { speaker: 'Therapist', text: 'Leo, where does a fire truck go when it hears an alarm?' },
      { speaker: 'Leo', text: 'It goes really fast to the fire! The firefighters jump on.' },
      { speaker: 'Therapist', text: 'How do you think the firefighters feel when they help someone?' },
      { speaker: 'Leo', text: 'Happy! And maybe a little scared too, because fire is hot.' },
    ],
    fluency: [
      { label: '0–3m', score: 80 },
      { label: '3–6m', score: 88 },
      { label: '6–9m', score: 91 },
      { label: '9–12m', score: 93 },
      { label: '12–15m', score: 90 },
      { label: '15–18m', score: 87 },
    ],
    avgPause: '1.4s',
    fluencyScore: '88%',
    therapistNote:
      'This was Leo\'s strongest session to date. He demonstrated complex emotional reasoning — identifying two simultaneous emotions unprompted. His sentence length increased noticeably, and he maintained topic focus for the full 18 minutes without redirection.',
    focusArea: 'Emotional Vocabulary',
    tips: [
      'Read a picture book together and ask "How does this character feel right now?"',
      'When Leo is excited or upset, name the emotion out loud together.',
      'Play pretend with toy vehicles — narrate the story as you go.',
    ],
  },
  {
    id: 'oct10',
    label: 'Oct 10, 2023 · 14 min',
    date: 'Oct 10, 2023',
    duration: '14 min',
    engagement: 74,
    turns: 17,
    topics: ['Food 🍎', 'Body 🦷', 'Routines 🛁', 'Questions ❓'],
    transcript: [
      { speaker: 'Therapist', text: 'What do you eat for breakfast, Leo?' },
      { speaker: 'Leo', text: 'Cereal. Sometimes eggs.' },
      { speaker: 'Therapist', text: 'Do you brush your teeth before or after breakfast?' },
      { speaker: 'Leo', text: 'After! Because… the food goes away.' },
    ],
    fluency: [
      { label: '0–3m', score: 60 },
      { label: '3–6m', score: 67 },
      { label: '6–9m', score: 71 },
      { label: '9–12m', score: 70 },
      { label: '12–14m', score: 65 },
    ],
    avgPause: '2.8s',
    fluencyScore: '67%',
    therapistNote:
      'Leo was tired at the start of this session and responses were shorter than usual. However, he showed good causal reasoning when explaining why he brushes after eating. We introduced routine-based questioning as a scaffold — this approach worked well and will be continued.',
    focusArea: 'Causal Reasoning',
    tips: [
      'Talk through your morning routine step-by-step with Leo, asking "What comes next?"',
      'Ask Leo to explain why we do everyday things — "Why do we wash hands?"',
      'Keep sessions short on tired days — 10 minutes of quality talk beats 20 of struggle.',
    ],
  },
];

// ── Bottom nav ────────────────────────────────────────────────────────────────

function BottomNav() {
  const navigate = useNavigate();
  const items = [
    { icon: <Zap className="w-5 h-5" />, label: 'Insights', path: '/parent' },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Sessions', path: '/parent/sessions', active: true },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Progress', path: '/parent/progress' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/parent/profile' },
  ];
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-4 py-3"
      style={{
        background: 'rgba(255,255,255,0.90)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
      }}
    >
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-full transition-all"
          style={
            item.active
              ? { background: '#186a22', color: '#ffffff' }
              : { color: '#5a7a5c' }
          }
        >
          {item.icon}
          <span className="text-[10px] font-semibold uppercase tracking-widest">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

// ── Card wrapper ──────────────────────────────────────────────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(255,255,255,0.70)',
        backdropFilter: 'blur(8px)',
        borderRadius: 24,
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        padding: '20px',
      }}
    >
      {children}
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: '#e6f4e8', color: '#186a22' }}
      >
        {icon}
      </div>
      <span className="text-sm font-extrabold" style={{ color: '#0d2e10' }}>
        {title}
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ParentSessions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('session') ?? sessions[0].id;
  const [selectedId, setSelectedId] = useState(
    sessions.find((s) => s.id === initialId) ? initialId : sessions[0].id
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const session = sessions.find((s) => s.id === selectedId)!;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #c8e6c8 0%, #d8eed8 40%, #e8f4e8 100%)' }}
    >
      {/* ── Top bar ── */}
      <header
        className="flex items-center gap-2 px-5 py-4 sticky top-0 z-20"
        style={{ background: 'transparent' }}
      >
        <button
          onClick={() => navigate('/parent')}
          className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/40"
          style={{ color: '#186a22' }}
          aria-label="Back to parent dashboard"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-base font-extrabold tracking-tight" style={{ color: '#186a22' }}>
          Leo's Sessions
        </span>
      </header>

      {/* ── Scrollable content ── */}
      <main className="flex-1 overflow-y-auto px-4 pb-28 max-w-lg mx-auto w-full space-y-4">

        {/* ── Session selector dropdown ── */}
        <div ref={dropdownRef} className="relative">
          <p className="text-xs font-bold uppercase tracking-widest mb-2 px-1" style={{ color: '#5a7a5c' }}>
            Select Session
          </p>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              border: dropdownOpen ? '1.5px solid #186a22' : '1.5px solid transparent',
            }}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#01695D' }} />
              <span className="text-sm font-bold" style={{ color: '#0d2e10' }}>
                {session.label}
              </span>
            </div>
            <ChevronDown
              className="w-4 h-4 flex-shrink-0 transition-transform"
              style={{
                color: '#5a7a5c',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>

          {dropdownOpen && (
            <div
              className="absolute left-0 right-0 mt-2 rounded-2xl overflow-hidden z-30"
              style={{
                background: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '1px solid rgba(24,106,34,0.12)',
              }}
              role="listbox"
            >
              {sessions.map((s, i) => (
                <button
                  key={s.id}
                  role="option"
                  aria-selected={s.id === selectedId}
                  onClick={() => {
                    setSelectedId(s.id);
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-green-50"
                  style={i > 0 ? { borderTop: '1px solid rgba(0,0,0,0.06)' } : {}}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: s.id === selectedId ? '#186a22' : '#0d2e10' }}
                  >
                    {s.label}
                  </span>
                  {s.id === selectedId && (
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#186a22' }} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── a. Session Overview ── */}
        <Card>
          <SectionHeader icon={<Activity className="w-4 h-4" />} title="Session Overview" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Date', value: session.date },
              { label: 'Time Spent', value: session.duration },
              { label: 'Engagement', value: String(session.engagement) },
              { label: 'Turns Taken', value: String(session.turns) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl px-4 py-3 flex flex-col gap-1"
                style={{ background: '#f0f9f0' }}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>
                  {stat.label}
                </span>
                <span className="text-base font-extrabold" style={{ color: '#0d2e10' }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── b. Topic Cards Used ── */}
        <Card>
          <SectionHeader icon={<BookOpen className="w-4 h-4" />} title="Topic Cards Used" />
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {session.topics.map((topic) => (
              <span
                key={topic}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #e6f4e8 0%, #d4ead4 100%)',
                  color: '#186a22',
                  border: '1px solid rgba(24,106,34,0.15)',
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </Card>

        {/* ── c. Key Transcript ── */}
        <Card>
          <SectionHeader icon={<MessageSquare className="w-4 h-4" />} title="Key Transcript" />
          <div className="flex flex-col gap-3">
            {session.transcript.map((line, i) => {
              const isTherapist = line.speaker === 'Therapist';
              return (
                <div
                  key={i}
                  className={`flex flex-col gap-1 ${isTherapist ? 'items-start' : 'items-end'}`}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-1"
                    style={{ color: '#5a7a5c' }}
                  >
                    {line.speaker}
                  </span>
                  <div
                    className="max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-snug"
                    style={
                      isTherapist
                        ? {
                            background: '#d4ead4',
                            color: '#0d2e10',
                            borderBottomLeftRadius: 6,
                          }
                        : {
                            background: '#ffffff',
                            color: '#0d2e10',
                            border: '1.5px solid #a8d5a8',
                            borderBottomRightRadius: 6,
                          }
                    }
                  >
                    {line.text}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── d. Fluency & Pauses ── */}
        <Card>
          <SectionHeader icon={<Activity className="w-4 h-4" />} title="Fluency & Pauses" />
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={session.fluency} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#e6f4e8" vertical={false} />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#5a7a5c' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#5a7a5c', fontWeight: 600 }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #e6f4e8',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#0d2e10',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                  }}
                  cursor={{ fill: 'rgba(1,105,93,0.06)' }}
                />
                <Bar dataKey="score" fill="#01695D" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-2 mt-3">
            {[
              { label: `Avg pause: ${session.avgPause}` },
              { label: `Fluency score: ${session.fluencyScore}` },
            ].map((pill) => (
              <span
                key={pill.label}
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: '#e6f4e8', color: '#01695D' }}
              >
                {pill.label}
              </span>
            ))}
          </div>
        </Card>

        {/* ── e. Therapist Notes ── */}
        <Card>
          <SectionHeader icon={<FileText className="w-4 h-4" />} title="Therapist Notes" />
          <div
            className="rounded-2xl px-4 py-4 mb-3"
            style={{
              background: '#f0f9f0',
              borderLeft: '3px solid #01695D',
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#0d2e10' }}>
              "{session.therapistNote}"
            </p>
          </div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: '#01695D', color: '#ffffff' }}
          >
            Focus area: {session.focusArea}
          </span>
        </Card>

        {/* ── f. Actionable Tips for Home ── */}
        <Card>
          <SectionHeader icon={<Lightbulb className="w-4 h-4" />} title="Actionable Tips for Home" />
          <div className="flex flex-col gap-3">
            {session.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: '#186a22' }}
                >
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-sm leading-snug" style={{ color: '#0d2e10' }}>
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </Card>

      </main>

      <BottomNav />
    </div>
  );
}
