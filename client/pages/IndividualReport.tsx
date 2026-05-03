import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Settings,
  CalendarDays,
  BarChart2 as BarChartIcon,
  Timer,
  MessageSquare,
  Star,
  TrendingUp,
  ChevronDown,
  Utensils,
  GraduationCap,
  PartyPopper,
  PawPrint,
  TreePine,
  Music,
  Heart,
  Globe,
} from 'lucide-react';

// ── Per-individual mock data ──────────────────────────────────────────────────
const progressData: Record<string, { week: string; score: number; turns: number; duration: number }[]> = {
  'ls-001': [
    { week: 'Sep 3', score: 70, turns: 14, duration: 30 },
    { week: 'Sep 10', score: 74, turns: 16, duration: 32 },
    { week: 'Sep 17', score: 78, turns: 18, duration: 35 },
    { week: 'Sep 24', score: 80, turns: 20, duration: 38 },
    { week: 'Oct 1', score: 83, turns: 21, duration: 38 },
    { week: 'Oct 8', score: 87, turns: 22, duration: 40 },
    { week: 'Oct 24', score: 92, turns: 24, duration: 42 },
  ],
  'mk-002': [
    { week: 'Sep 3', score: 65, turns: 18, duration: 35 },
    { week: 'Sep 10', score: 70, turns: 22, duration: 38 },
    { week: 'Sep 17', score: 73, turns: 24, duration: 40 },
    { week: 'Sep 24', score: 76, turns: 26, duration: 42 },
    { week: 'Oct 1', score: 80, turns: 28, duration: 43 },
    { week: 'Oct 8', score: 85, turns: 30, duration: 44 },
    { week: 'Oct 24', score: 89, turns: 31, duration: 45 },
  ],
  'jr-003': [
    { week: 'Sep 3', score: 55, turns: 10, duration: 25 },
    { week: 'Sep 10', score: 58, turns: 11, duration: 27 },
    { week: 'Sep 17', score: 60, turns: 13, duration: 28 },
    { week: 'Sep 24', score: 63, turns: 14, duration: 30 },
    { week: 'Oct 1', score: 67, turns: 15, duration: 32 },
    { week: 'Oct 8', score: 71, turns: 17, duration: 35 },
    { week: 'Oct 24', score: 76, turns: 18, duration: 38 },
  ],
  'st-004': [
    { week: 'Sep 3', score: 78, turns: 30, duration: 38 },
    { week: 'Sep 10', score: 81, turns: 33, duration: 40 },
    { week: 'Sep 17', score: 84, turns: 36, duration: 42 },
    { week: 'Sep 24', score: 87, turns: 39, duration: 43 },
    { week: 'Oct 1', score: 89, turns: 42, duration: 44 },
    { week: 'Oct 8', score: 92, turns: 45, duration: 45 },
    { week: 'Oct 24', score: 95, turns: 47, duration: 45 },
  ],
};

const metrics = [
  { key: 'score', label: 'Engagement Score', color: '#01695D', unit: '' },
  { key: 'turns', label: 'Turns', color: '#01695D', unit: '' },
  { key: 'duration', label: 'Duration (min)', color: '#01695D', unit: 'm' },
] as const;

const individuals: Record<string, {
  name: string;
  initials: string;
  tag: string;
  tagColor: string;
  tagText: string;
  score: number;
  duration: string;
  durationMin: number;
  turns: number;
  date: string;
  focus: string;
  status: string;
  strengths: string[];
  notes: string;
  flowData: { time: string; density: number }[];
  skillData: { skill: string; value: number }[];
  speakingPct: number; // % of session this child spoke
  sessions: { id: string; label: string }[];
  fluency: {
    speechRate: number;       // WPM
    speechRateData: { t: string; v: number }[];
    pauseRate: number;        // pauses/min
    pauseRateData: { t: string; v: number }[];
  };
  topics: { label: string; icon: React.ReactNode }[];
}> = {
  'ls-001': {
    name: 'Leo S.',
    initials: 'LS',
    tag: 'STEADY FOCUS',
    tagColor: '#e6f4e8',
    tagText: '#186a22',
    score: 92,
    duration: '42m',
    durationMin: 42,
    turns: 24,
    date: 'Oct 24, 2023',
    focus: 'Storytelling',
    status: 'Completed',
    strengths: ['Turn-taking', 'Self-correction', 'Eye contact'],
    notes: 'Leo maintained steady focus throughout the session. He self-corrected twice without prompting and showed strong narrative sequencing during the storytelling activity.',
    flowData: [
      { time: '0m', density: 15 },
      { time: '10m', density: 55 },
      { time: '20m', density: 70 },
      { time: '30m', density: 85 },
      { time: '42m', density: 60 },
    ],
    skillData: [
      { skill: 'Focus', value: 92 },
      { skill: 'Turns', value: 80 },
      { skill: 'Clarity', value: 75 },
      { skill: 'Response', value: 88 },
      { skill: 'Initiation', value: 65 },
    ],
    speakingPct: 35,
    sessions: [
      { id: 's1', label: 'Oct 24, 2023 — Storytelling' },
      { id: 's2', label: 'Oct 8, 2023 — Narrative Sequencing' },
      { id: 's3', label: 'Sep 24, 2023 — Turn-Taking' },
      { id: 's4', label: 'Sep 10, 2023 — Free Conversation' },
    ],
    fluency: {
      speechRate: 138,
      speechRateData: [{ t: '0m', v: 110 }, { t: '10m', v: 125 }, { t: '20m', v: 140 }, { t: '30m', v: 148 }, { t: '42m', v: 138 }],
      pauseRate: 2.8,
      pauseRateData: [{ t: '0m', v: 4.2 }, { t: '10m', v: 3.5 }, { t: '20m', v: 2.8 }, { t: '30m', v: 2.4 }, { t: '42m', v: 2.8 }],
    },
    topics: [
      { label: 'Favorite Foods',   icon: <Utensils className="w-6 h-6" /> },
      { label: 'School Stories',   icon: <GraduationCap className="w-6 h-6" /> },
      { label: 'Birthday Wishes',  icon: <PartyPopper className="w-6 h-6" /> },
      { label: 'Pet Adventures',   icon: <PawPrint className="w-6 h-6" /> },
    ],
  },
  'mk-002': {
    name: 'Mia K.',
    initials: 'MK',
    tag: 'HIGHLY RESPONSIVE',
    tagColor: '#d0f0f0',
    tagText: '#006868',
    score: 89,
    duration: '45m',
    durationMin: 45,
    turns: 31,
    date: 'Oct 24, 2023',
    focus: 'Responsive Listening',
    status: 'Completed',
    strengths: ['Responsiveness', 'Vocabulary', 'Engagement'],
    notes: 'Mia was highly responsive to prompts and demonstrated above-average vocabulary use. She initiated conversation 8 times unprompted, a significant improvement from last session.',
    flowData: [
      { time: '0m', density: 30 },
      { time: '10m', density: 60 },
      { time: '20m', density: 50 },
      { time: '30m', density: 95 },
      { time: '45m', density: 75 },
    ],
    skillData: [
      { skill: 'Focus', value: 78 },
      { skill: 'Turns', value: 95 },
      { skill: 'Clarity', value: 82 },
      { skill: 'Response', value: 96 },
      { skill: 'Initiation', value: 88 },
    ],
    speakingPct: 25,
    sessions: [
      { id: 's1', label: 'Oct 24, 2023 — Responsive Listening' },
      { id: 's2', label: 'Oct 8, 2023 — Vocabulary Building' },
      { id: 's3', label: 'Sep 24, 2023 — Peer Dialogue' },
      { id: 's4', label: 'Sep 10, 2023 — Initiation Practice' },
    ],
    fluency: {
      speechRate: 152,
      speechRateData: [{ t: '0m', v: 130 }, { t: '10m', v: 145 }, { t: '20m', v: 155 }, { t: '30m', v: 162 }, { t: '45m', v: 152 }],
      pauseRate: 2.2,
      pauseRateData: [{ t: '0m', v: 3.8 }, { t: '10m', v: 3.0 }, { t: '20m', v: 2.5 }, { t: '30m', v: 2.0 }, { t: '45m', v: 2.2 }],
    },
    topics: [
      { label: 'School Stories',  icon: <GraduationCap className="w-6 h-6" /> },
      { label: 'Pet Adventures',  icon: <PawPrint className="w-6 h-6" /> },
      { label: 'Music & Songs',   icon: <Music className="w-6 h-6" /> },
      { label: 'Feelings',        icon: <Heart className="w-6 h-6" /> },
    ],
  },
  'jr-003': {
    name: 'Julian R.',
    initials: 'JR',
    tag: 'MODERATE FLOW',
    tagColor: '#e6f4e8',
    tagText: '#186a22',
    score: 76,
    duration: '38m',
    durationMin: 38,
    turns: 18,
    date: 'Oct 24, 2023',
    focus: 'Forest Walk Talk',
    status: 'Completed',
    strengths: ['Listening', 'Patience', 'Vocabulary'],
    notes: 'Julian showed moderate engagement with some periods of distraction. He responded well to visual cues and demonstrated improved patience during peer turns. Recommend more structured prompts next session.',
    flowData: [
      { time: '0m', density: 10 },
      { time: '10m', density: 35 },
      { time: '20m', density: 55 },
      { time: '30m', density: 40 },
      { time: '38m', density: 30 },
    ],
    skillData: [
      { skill: 'Focus', value: 65 },
      { skill: 'Turns', value: 60 },
      { skill: 'Clarity', value: 70 },
      { skill: 'Response', value: 72 },
      { skill: 'Initiation', value: 50 },
    ],
    speakingPct: 20,
    sessions: [
      { id: 's1', label: 'Oct 24, 2023 — Forest Walk Talk' },
      { id: 's2', label: 'Oct 8, 2023 — Visual Cue Practice' },
      { id: 's3', label: 'Sep 24, 2023 — Structured Prompts' },
      { id: 's4', label: 'Sep 10, 2023 — Peer Listening' },
    ],
    fluency: {
      speechRate: 118,
      speechRateData: [{ t: '0m', v: 95 }, { t: '10m', v: 108 }, { t: '20m', v: 122 }, { t: '30m', v: 115 }, { t: '38m', v: 118 }],
      pauseRate: 4.1,
      pauseRateData: [{ t: '0m', v: 5.5 }, { t: '10m', v: 4.8 }, { t: '20m', v: 4.0 }, { t: '30m', v: 4.3 }, { t: '38m', v: 4.1 }],
    },
    topics: [
      { label: 'Nature Walk',     icon: <TreePine className="w-6 h-6" /> },
      { label: 'Favorite Foods',  icon: <Utensils className="w-6 h-6" /> },
      { label: 'Pet Adventures',  icon: <PawPrint className="w-6 h-6" /> },
    ],
  },
  'st-004': {
    name: 'Sarah T.',
    initials: 'ST',
    tag: 'DEEP CONTRIBUTOR',
    tagColor: '#e6f4e8',
    tagText: '#186a22',
    score: 95,
    duration: '45m',
    durationMin: 45,
    turns: 47,
    date: 'Oct 24, 2023',
    focus: 'Mindfulness Dialogue',
    status: 'Completed',
    strengths: ['Depth', 'Initiation', 'Empathy'],
    notes: 'Sarah was the standout contributor this session. She initiated 14 conversation turns and demonstrated exceptional empathy during peer sharing. Her narrative depth has improved significantly over the past 3 sessions.',
    flowData: [
      { time: '0m', density: 40 },
      { time: '10m', density: 70 },
      { time: '20m', density: 85 },
      { time: '30m', density: 90 },
      { time: '45m', density: 95 },
    ],
    skillData: [
      { skill: 'Focus', value: 95 },
      { skill: 'Turns', value: 98 },
      { skill: 'Clarity', value: 90 },
      { skill: 'Response', value: 92 },
      { skill: 'Initiation', value: 96 },
    ],
    speakingPct: 20,
    sessions: [
      { id: 's1', label: 'Oct 24, 2023 — Mindfulness Dialogue' },
      { id: 's2', label: 'Oct 8, 2023 — Empathy Circle' },
      { id: 's3', label: 'Sep 24, 2023 — Narrative Depth' },
      { id: 's4', label: 'Sep 10, 2023 — Peer Sharing' },
    ],
    fluency: {
      speechRate: 158,
      speechRateData: [{ t: '0m', v: 140 }, { t: '10m', v: 152 }, { t: '20m', v: 160 }, { t: '30m', v: 165 }, { t: '45m', v: 158 }],
      pauseRate: 1.9,
      pauseRateData: [{ t: '0m', v: 3.2 }, { t: '10m', v: 2.6 }, { t: '20m', v: 2.0 }, { t: '30m', v: 1.7 }, { t: '45m', v: 1.9 }],
    },
    topics: [
      { label: 'Feelings',        icon: <Heart className="w-6 h-6" /> },
      { label: 'School Stories',  icon: <GraduationCap className="w-6 h-6" /> },
      { label: 'Birthday Wishes', icon: <PartyPopper className="w-6 h-6" /> },
      { label: 'World Places',    icon: <Globe className="w-6 h-6" /> },
    ],
  },
};

const fallbackPerson = individuals['ls-001'];

function ScoreRing({ score, size = 100 }: { score: number; size?: number }) {
  const data = [
    { value: score, color: '#186a22' },
    { value: 100 - score, color: '#d4ead4' },
  ];
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.36}
            outerRadius={size * 0.48}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            paddingAngle={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black" style={{ fontSize: size * 0.24, color: '#0d2e10', lineHeight: 1 }}>
          {score}
        </span>
        <span className="font-bold uppercase tracking-widest" style={{ fontSize: size * 0.09, color: '#5a7a5c' }}>
          Score
        </span>
      </div>
    </div>
  );
}

export default function IndividualReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const person = (id && individuals[id]) ? individuals[id] : fallbackPerson;
  const progress = (id && progressData[id]) ? progressData[id] : progressData['ls-001'];
  const [activeMetric, setActiveMetric] = useState<'score' | 'turns' | 'duration'>('score');
  const [selectedSession, setSelectedSession] = useState(person.sessions[0].id);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #d3e4d3ff 0%, #c1ddd0ff 40%, #dbfde8ff 100%)' }}>

      {/* Top bar */}
      <header
        className="flex items-center justify-between px-5 py-3 sticky top-0 z-20"
        style={{ background: 'transparent', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm font-semibold"
          style={{ color: '#186a22' }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-base font-bold" style={{ color: '#0d2e10' }}>
          Individual Metrics
        </span>
        <button style={{ color: '#186a22' }}>
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Session selector */}
      <div
        className="px-5 py-2.5 sticky top-[53px] z-10"
        style={{ background: 'transparent', borderBottom: '1px solid rgba(0,0,0,0.04)' }}
      >
        <div className="max-w-lg mx-auto w-full relative">
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="w-full appearance-none rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold cursor-pointer outline-none transition-all"
            style={{
              background: '#ffffff',
              color: '#0d2e10',
              border: '1.5px solid #d4ead4',
              boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
            }}
          >
            {person.sessions.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
          <ChevronDown
            className="w-4 h-4 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
            style={{ color: '#186a22' }}
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-5 py-4 pb-8 max-w-lg mx-auto w-full space-y-4">

        {/* Hero card — identity + score + stats inline */}
        <div
          className="rounded-2xl p-5"
          style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
        >
          {/* Identity row */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-base font-black flex-shrink-0"
              style={{ background: '#e6f4e8', color: '#186a22' }}
            >
              {person.initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-extrabold tracking-tight leading-tight" style={{ color: '#0d2e10' }}>
                {person.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{ background: person.tagColor, color: person.tagText }}
                >
                  {person.tag}
                </span>
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" style={{ color: '#5a7a5c' }} />
                  <span className="text-xs" style={{ color: '#5a7a5c' }}>{person.date}</span>
                </div>
                <span className="text-xs" style={{ color: '#5a7a5c' }}>· {person.focus}</span>
              </div>
            </div>
            <ScoreRing score={person.score} size={80} />
          </div>

          {/* Stats inline */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { icon: <Timer className="w-4 h-4" />, label: 'Duration', value: person.duration },
              { icon: <MessageSquare className="w-4 h-4" />, label: 'Turns', value: person.turns },
              { icon: <TrendingUp className="w-4 h-4" />, label: 'Speaking', value: `${person.speakingPct}%` },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl px-3.5 py-2.5 flex items-center gap-2.5"
                style={{ background: '#f0f9f0' }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#e6f4e8', color: '#186a22' }}
                >
                  {s.icon}
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>{s.label}</div>
                  <div className="text-base font-black leading-tight" style={{ color: '#0d2e10' }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Cards Explored */}
        <div
          className="rounded-2xl p-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
        >
          <h3 className="font-bold text-sm mb-3" style={{ color: '#0d2e10' }}>Topic Cards Explored</h3>
          <div className="grid grid-cols-2 gap-3">
            {person.topics.map((topic) => (
              <div
                key={topic.label}
                className="rounded-2xl px-4 pt-4 pb-3 flex flex-col gap-2"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e8f0e8',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                  borderBottom: '3px solid #186a22',
                }}
              >
                <span style={{ color: '#186a22' }}>{topic.icon}</span>
                <span className="text-sm font-bold leading-tight" style={{ color: '#0d2e10' }}>{topic.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation Flow + Fluency Metrics — side by side */}
        <div className="grid grid-cols-2 gap-4">

          {/* Conversation Flow */}
          <div
            className="rounded-2xl p-4 space-y-2.5"
            style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm" style={{ color: '#0d2e10' }}>Conv. Flow</h3>
                <p className="text-xs" style={{ color: '#5a7a5c' }}>Engagement density</p>
              </div>
              <BarChartIcon className="w-4 h-4" style={{ color: '#186a22' }} />
            </div>
            <div style={{ height: 113 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={person.flowData}>
                  <Line
                    type="monotone"
                    dataKey="density"
                    stroke="#186a22"
                    strokeWidth={2}
                    dot={{ fill: '#186a22', r: 3, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>
              {person.flowData.map((d) => <span key={d.time}>{d.time}</span>)}
            </div>
          </div>

          {/* Fluency Metrics */}
          <div
            className="rounded-2xl p-4 space-y-3"
            style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            <div>
              <h3 className="font-bold text-sm" style={{ color: '#0d2e10' }}>Fluency</h3>
              <p className="text-xs" style={{ color: '#5a7a5c' }}>Rate metrics</p>
            </div>

            {/* Speech Rate */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>Speech Rate</span>
                <span className="text-sm font-black" style={{ color: '#0d2e10' }}>{person.fluency.speechRate} <span className="text-[10px] font-semibold" style={{ color: '#5a7a5c' }}>WPM</span></span>
              </div>
              <div style={{ height: 52 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={person.fluency.speechRateData} barSize={10} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                      {person.fluency.speechRateData.map((_, i) => (
                        <Cell key={i} fill={i === person.fluency.speechRateData.length - 1 ? '#186a22' : '#c0dcc0'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #e8f0e8' }} />

            {/* Pause Rate */}
            <div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>Pause Rate</span>
                <span className="text-sm font-black" style={{ color: '#0d2e10' }}>{person.fluency.pauseRate} <span className="text-[10px] font-semibold" style={{ color: '#5a7a5c' }}>/min</span></span>
              </div>
              <div style={{ height: 52 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={person.fluency.pauseRateData} barSize={10} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                      {person.fluency.pauseRateData.map((_, i) => (
                        <Cell key={i} fill={i === person.fluency.pauseRateData.length - 1 ? '#1a6b6b' : '#b2d8d8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Over Time */}
        <div
          className="rounded-2xl p-4 space-y-2.5"
          style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm" style={{ color: '#0d2e10' }}>Progress Over Time</h3>
              <p className="text-xs" style={{ color: '#5a7a5c' }}>Weekly trend across sessions</p>
            </div>
            {/* Metric selector pills */}
            <div
              className="flex gap-1 p-0.5 rounded-full"
              style={{ background: '#f0f9f0' }}
            >
              {metrics.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setActiveMetric(m.key)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all"
                  style={
                    activeMetric === m.key
                      ? { background: '#186a22', color: '#ffffff', boxShadow: '0 2px 6px rgba(24,106,34,0.25)' }
                      : { background: 'transparent', color: '#5a7a5c' }
                  }
                >
                  {m.key === 'score' ? 'Score' : m.key === 'turns' ? 'Turns' : 'Duration'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: 188 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progress} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6f4e8" vertical={false} />
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#5a7a5c', fontWeight: 600 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#5a7a5c', fontWeight: 600 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff',
                    border: '1px solid #e6f4e8',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#0d2e10',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                  }}
                  formatter={(value: number) => {
                    const m = metrics.find(m => m.key === activeMetric);
                    return [`${value}${m?.unit ?? ''}`, m?.label];
                  }}
                  labelStyle={{ color: '#5a7a5c', fontWeight: 700, marginBottom: 4 }}
                  cursor={{ stroke: '#01695D', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Line
                  type="monotone"
                  dataKey={activeMetric}
                  stroke="#01695D"
                  strokeWidth={2.5}
                  dot={{ fill: '#01695D', r: 3.5, strokeWidth: 0 }}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Delta badge */}
          {(() => {
            const first = progress[0][activeMetric];
            const last = progress[progress.length - 1][activeMetric];
            const delta = last - first;
            const pct = Math.round((delta / first) * 100);
            const m = metrics.find(m => m.key === activeMetric)!;
            return (
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full inline-block"
                style={{ background: delta >= 0 ? '#e6f4e8' : '#fff0ee', color: delta >= 0 ? '#01695D' : '#c0392b' }}
              >
                {delta >= 0 ? '↗' : '↘'} {delta >= 0 ? '+' : ''}{delta}{m.unit} ({delta >= 0 ? '+' : ''}{pct}%) since first session
              </span>
            );
          })()}
        </div>

        {/* Strengths + Therapist Notes — side by side */}
        <div className="grid grid-cols-2 gap-4">

          {/* Strengths */}
          <div
            className="rounded-2xl p-4 space-y-2.5"
            style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            <h3 className="font-bold text-sm" style={{ color: '#0d2e10' }}>Strengths</h3>
            <div className="flex flex-col gap-2">
              {person.strengths.map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: '#e6f4e8' }}
                >
                  <Star className="w-3 h-3 flex-shrink-0" style={{ color: '#186a22' }} />
                  <span className="text-xs font-semibold" style={{ color: '#186a22' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Therapist Notes */}
          <div
            className="rounded-2xl p-4 space-y-2.5"
            style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
          >
            <h3 className="font-bold text-sm" style={{ color: '#0d2e10' }}>Therapist Notes</h3>
            <p className="text-xs leading-relaxed" style={{ color: '#5a7a5c' }}>
              {person.notes}
            </p>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block"
              style={{ background: '#e6f4e8', color: '#186a22' }}
            >
              {person.status}
            </span>
          </div>
        </div>

      </main>
    </div>
  );
}
