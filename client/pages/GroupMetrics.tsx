import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Bell,
  Settings,
  LogOut,
  HelpCircle,
  Timer,
  CalendarDays,
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  Download,
  User,
  Mic2,
  PauseCircle,
  Repeat2,
  AlignLeft,
  ArrowLeftRight,
  Layers,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

// ── Nav ───────────────────────────────────────────────────────────────────────
const navItems = [
  { icon: TrendingUp, label: 'Session Insights', path: '/dashboard' },
  { icon: Users, label: 'Group Metrics', path: '/group-metrics', active: true },
  { icon: TrendingUp, label: 'Patient Trends', path: '/patient-trends' },
];

// ── Session data ──────────────────────────────────────────────────────────────
type FluencyMetrics = {
  speechRate: number;        // WPM
  speechRateDelta: number;
  pauseRate: number;         // pauses/min
  pauseRateDelta: number;
  disfluencies: number;      // reps + self-corrections + fillers per min
  disfluenciesDelta: number;
  meanSpeechLength: number;  // seconds
  meanSpeechLengthDelta: number;
  turnEfficiency: number;    // %
  turnEfficiencyDelta: number;
  gapOverlap: number;        // avg gap/overlap in seconds (negative = overlap)
  gapOverlapDelta: number;
};

type SessionData = {
  id: string;
  label: string;
  date: string;
  engagementScore: number;
  scoreDelta: number;
  duration: string;
  totalTurns: number;
  participants: number;
  summary: string;
  fluency: FluencyMetrics;
};

const sessions: SessionData[] = [
  {
    id: 'oct-24',
    label: 'Session — Oct 24, 2023',
    date: 'Oct 24, 2023',
    engagementScore: 88,
    scoreDelta: 4,
    duration: '45m',
    totalTurns: 120,
    participants: 4,
    summary:
      'The group demonstrated high levels of interpersonal synchrony during the mindfulness exercises. Active listening phases showed significant improvement, with participants maintaining steady focus for longer intervals compared to the previous week.',
    fluency: {
      speechRate: 142,       speechRateDelta: +8,
      pauseRate: 3.2,        pauseRateDelta: -0.4,
      disfluencies: 1.8,     disfluenciesDelta: -0.3,
      meanSpeechLength: 12.4, meanSpeechLengthDelta: +1.1,
      turnEfficiency: 84,    turnEfficiencyDelta: +5,
      gapOverlap: 0.6,       gapOverlapDelta: -0.2,
    },
  },
  {
    id: 'oct-17',
    label: 'Session — Oct 17, 2023',
    date: 'Oct 17, 2023',
    engagementScore: 84,
    scoreDelta: 2,
    duration: '42m',
    totalTurns: 108,
    participants: 4,
    summary:
      'Participants showed steady engagement throughout the session. The structured dialogue exercises produced consistent turn-taking patterns, though initiation remained an area for growth. Overall cohesion improved from the prior week.',
    fluency: {
      speechRate: 134,       speechRateDelta: +5,
      pauseRate: 3.6,        pauseRateDelta: -0.2,
      disfluencies: 2.1,     disfluenciesDelta: -0.1,
      meanSpeechLength: 11.3, meanSpeechLengthDelta: +0.7,
      turnEfficiency: 79,    turnEfficiencyDelta: +3,
      gapOverlap: 0.8,       gapOverlapDelta: -0.1,
    },
  },
  {
    id: 'oct-10',
    label: 'Session — Oct 10, 2023',
    date: 'Oct 10, 2023',
    engagementScore: 79,
    scoreDelta: -1,
    duration: '40m',
    totalTurns: 94,
    participants: 3,
    summary:
      'A quieter session with one participant absent. The smaller group dynamic shifted turn distribution noticeably. Core exercises were completed but reflection time was shortened. Scores reflect the reduced group energy.',
    fluency: {
      speechRate: 126,       speechRateDelta: -3,
      pauseRate: 4.1,        pauseRateDelta: +0.3,
      disfluencies: 2.5,     disfluenciesDelta: +0.2,
      meanSpeechLength: 10.1, meanSpeechLengthDelta: -0.8,
      turnEfficiency: 72,    turnEfficiencyDelta: -2,
      gapOverlap: 1.1,       gapOverlapDelta: +0.3,
    },
  },
];

// ── Speaking time data per session ───────────────────────────────────────────

type Speaker = { name: string; pct: number; color: string };

const speakingTimeMap: Record<string, Speaker[]> = {
  'oct-24': [
    { name: 'Leo S.',    pct: 28, color: '#186a22' },
    { name: 'Mia K.',    pct: 32, color: '#2d9e3a' },
    { name: 'Julian R.', pct: 20, color: '#1a6b6b' },
    { name: 'Sarah T.',  pct: 20, color: '#c0dcc0' },
  ],
  'oct-17': [
    { name: 'Leo S.',    pct: 26, color: '#186a22' },
    { name: 'Mia K.',    pct: 30, color: '#2d9e3a' },
    { name: 'Julian R.', pct: 22, color: '#1a6b6b' },
    { name: 'Sarah T.',  pct: 22, color: '#c0dcc0' },
  ],
  'oct-10': [
    { name: 'Leo S.',    pct: 35, color: '#186a22' },
    { name: 'Mia K.',    pct: 38, color: '#2d9e3a' },
    { name: 'Julian R.', pct: 27, color: '#1a6b6b' },
  ],
};

// ── Turns per person data ─────────────────────────────────────────────────────
const turnsMap: Record<string, { name: string; turns: number; color: string }[]> = {
  'oct-24': [
    { name: 'Leo S.',    turns: 24, color: '#186a22' },
    { name: 'Mia K.',    turns: 31, color: '#2d9e3a' },
    { name: 'Julian R.', turns: 18, color: '#1a6b6b' },
    { name: 'Sarah T.',  turns: 47, color: '#c0dcc0' },
  ],
  'oct-17': [
    { name: 'Leo S.',    turns: 22, color: '#186a22' },
    { name: 'Mia K.',    turns: 28, color: '#2d9e3a' },
    { name: 'Julian R.', turns: 16, color: '#1a6b6b' },
    { name: 'Sarah T.',  turns: 42, color: '#c0dcc0' },
  ],
  'oct-10': [
    { name: 'Leo S.',    turns: 20, color: '#186a22' },
    { name: 'Mia K.',    turns: 30, color: '#2d9e3a' },
    { name: 'Julian R.', turns: 14, color: '#1a6b6b' },
  ],
};

// ── Session timeline data ─────────────────────────────────────────────────────
type TimelineEvent = {
  time: string;
  label: string;
  type: 'start' | 'activity' | 'peak' | 'note' | 'end';
};

const timelineMap: Record<string, TimelineEvent[]> = {
  'oct-24': [
    { time: '0:00',  label: 'Session started — 4 participants joined',         type: 'start'    },
    { time: '0:04',  label: 'Warm-up: name & feeling check-in',                type: 'activity' },
    { time: '0:12',  label: 'Core exercise: structured dialogue pairs',        type: 'activity' },
    { time: '0:22',  label: 'Peak engagement — Sarah T. led group exchange',   type: 'peak'     },
    { time: '0:31',  label: 'Mindfulness listening segment',                   type: 'activity' },
    { time: '0:38',  label: 'Note: Julian R. showed reduced initiation',       type: 'note'     },
    { time: '0:41',  label: 'Reflection round — all participants contributed', type: 'activity' },
    { time: '0:45',  label: 'Session ended',                                   type: 'end'      },
  ],
  'oct-17': [
    { time: '0:00',  label: 'Session started — 4 participants joined',         type: 'start'    },
    { time: '0:05',  label: 'Warm-up: word association game',                  type: 'activity' },
    { time: '0:14',  label: 'Core exercise: turn-taking dialogue',             type: 'activity' },
    { time: '0:25',  label: 'Peak engagement — Mia K. initiated group topic',  type: 'peak'     },
    { time: '0:33',  label: 'Structured storytelling segment',                 type: 'activity' },
    { time: '0:38',  label: 'Reflection round',                                type: 'activity' },
    { time: '0:42',  label: 'Session ended',                                   type: 'end'      },
  ],
  'oct-10': [
    { time: '0:00',  label: 'Session started — 3 participants (1 absent)',     type: 'start'    },
    { time: '0:04',  label: 'Warm-up: brief check-in',                         type: 'activity' },
    { time: '0:11',  label: 'Core exercise: open dialogue',                    type: 'activity' },
    { time: '0:20',  label: 'Note: reduced group energy observed',             type: 'note'     },
    { time: '0:28',  label: 'Peak engagement — Leo S. extended turn',          type: 'peak'     },
    { time: '0:35',  label: 'Shortened reflection segment',                    type: 'activity' },
    { time: '0:40',  label: 'Session ended',                                   type: 'end'      },
  ],
};
function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[{ value: score }, { value: 100 - score }]}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.36}
            outerRadius={size * 0.47}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            paddingAngle={0}
          >
            <Cell fill="#186a22" strokeWidth={0} />
            <Cell fill="#c0dcc0" strokeWidth={0} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-black" style={{ fontSize: size * 0.2, color: '#0d2e10' }}>{score}%</span>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GroupMetrics() {
  const navigate = useNavigate();
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(sessions[0].id);
  const selectorRef = useRef<HTMLDivElement>(null);

  const session = sessions.find((s) => s.id === selectedId)!;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
        setSelectorOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #d3e4d3ff 0%, #c1ddd0ff 40%, #dbfde8ff 100%)' }}
    >
      {/* ── TOP NAV ── */}
      <header
        className="flex items-center gap-8 px-8 py-0 sticky top-0 z-30"
        style={{ background: '#ffffff', borderBottom: '1px solid #e8f0e8', height: 56 }}
      >
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-gray-100"
            style={{ color: '#0d2e10' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-lg tracking-tight" style={{ color: '#0d2e10' }}>
            Turnlea Therapist Portal
          </span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <button style={{ color: '#5a7a5c' }}><Bell className="w-5 h-5" /></button>
          <button style={{ color: '#5a7a5c' }}><Settings className="w-5 h-5" /></button>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: '#186a22' }}
          >
            DC
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── SIDEBAR ── */}
        <aside
          className="flex flex-col w-52 flex-shrink-0 py-6 px-4 gap-1"
          style={{ background: '#ffffff', borderRight: '1px solid #e8f0e8' }}
        >
          <div className="flex items-center gap-3 px-2 pb-5 mb-2" style={{ borderBottom: '1px solid #e8f0e8' }}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#e6f4e8', border: '1px solid #c0dcc0' }}
            >
              <Users className="w-4 h-4" style={{ color: '#186a22' }} />
            </div>
            <div>
              <p className="text-xs font-bold leading-none" style={{ color: '#0d2e10' }}>Dr. Clinical</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: '#5a7a5c' }}>
                Clinical Practitioner
              </p>
            </div>
          </div>

          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-left transition-colors"
              style={
                item.active
                  ? { background: '#e6f4e8', color: '#186a22', borderLeft: '3px solid #186a22' }
                  : { color: '#5a7a5c' }
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}

          <div className="mt-auto flex flex-col gap-1 pt-4" style={{ borderTop: '1px solid #e8f0e8' }}>
            <button
              onClick={() => navigate('/therapist/profile')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-colors hover:bg-[#f0f9f0]"
              style={{ color: '#5a7a5c' }}
            >
              <User className="w-4 h-4" /> Profile
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl" style={{ color: '#5a7a5c' }}>
              <HelpCircle className="w-4 h-4" /> Support
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl"
              style={{ color: '#5a7a5c' }}
              onClick={() => navigate('/')}
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-6">

          {/* Page heading + session selector */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight" style={{ color: '#0d2e10' }}>Group Metrics</h1>
              <p className="text-sm mt-0.5" style={{ color: '#5a7a5c' }}>
                {session.participants} participants · {session.date}
              </p>
            </div>

            {/* Session selector dropdown */}
            <div className="relative" ref={selectorRef} style={{ minWidth: 300 }}>
              <button
                onClick={() => setSelectorOpen((v) => !v)}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-base font-bold w-full"
                style={{ background: '#ffffff', border: '1.5px solid #d0e4d0', color: '#0d2e10', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <CalendarDays className="w-5 h-5 flex-shrink-0" style={{ color: '#186a22' }} />
                {session.label}
                <ChevronDown
                  className="w-5 h-5 ml-auto transition-transform"
                  style={{ color: '#5a7a5c', transform: selectorOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              {selectorOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-full rounded-2xl overflow-hidden z-50"
                  style={{ background: '#ffffff', border: '1.5px solid #d0e4d0', boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
                >
                  {sessions.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedId(s.id); setSelectorOpen(false); }}
                      className="flex items-center justify-between w-full px-5 py-3 text-sm text-left transition-colors hover:bg-[#f0f9f0]"
                      style={{
                        color: s.id === selectedId ? '#186a22' : '#0d2e10',
                        fontWeight: s.id === selectedId ? 700 : 500,
                        borderTop: i > 0 ? '1px solid #e8f0e8' : 'none',
                      }}
                    >
                      {s.label}
                      {s.id === selectedId && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#186a22" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── GROUP SUMMARY CARD ── */}
          <section
            className="rounded-2xl overflow-hidden flex"
            style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
          >
            {/* Score panel */}
            <div
              className="flex flex-col items-center justify-center gap-3 px-10 py-8 flex-shrink-0"
              style={{ background: '#e6f4e8', minWidth: 200 }}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#186a22' }}>
                Engagement Score
              </span>
              <ScoreRing score={session.engagementScore} size={120} />
              <span className="text-xs font-semibold" style={{ color: session.scoreDelta >= 0 ? '#186a22' : '#dc2626' }}>
                {session.scoreDelta >= 0 ? '↗' : '↘'} {session.scoreDelta >= 0 ? '+' : ''}{session.scoreDelta}% from last session
              </span>
            </div>

            {/* Summary text + stats */}
            <div className="flex flex-col justify-center px-8 py-8 gap-5 flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base" style={{ color: '#0d2e10' }}>Session Summary</h3>
                  <button
                    className="flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: '#186a22' }}
                  >
                    <Download className="w-3.5 h-3.5" /> Export Report
                  </button>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#5a7a5c', maxWidth: 520 }}>
                  {session.summary}
                </p>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>Duration</span>
                  <div className="flex items-center gap-1.5">
                    <Timer className="w-4 h-4" style={{ color: '#186a22' }} />
                    <span className="text-base font-bold" style={{ color: '#0d2e10' }}>{session.duration}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>Date</span>
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" style={{ color: '#186a22' }} />
                    <span className="text-base font-bold" style={{ color: '#0d2e10' }}>{session.date}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>Total Turns</span>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" style={{ color: '#186a22' }} />
                    <span className="text-base font-bold" style={{ color: '#0d2e10' }}>{session.totalTurns}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>Participants</span>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" style={{ color: '#186a22' }} />
                    <span className="text-base font-bold" style={{ color: '#0d2e10' }}>{session.participants}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FLUENCY METRICS KPI ROW ── */}
          <section>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3 px-0.5" style={{ color: '#5a7a5c' }}>
              Fluency Metrics
            </p>
            <div className="grid grid-cols-3 xl:grid-cols-6 gap-3">
              {[
                {
                  icon: <Mic2 className="w-4 h-4" />,
                  label: 'Speech Rate',
                  value: `${session.fluency.speechRate}`,
                  unit: 'WPM',
                  delta: session.fluency.speechRateDelta,
                  deltaLabel: 'vs last',
                  good: session.fluency.speechRateDelta >= 0,
                },
                {
                  icon: <PauseCircle className="w-4 h-4" />,
                  label: 'Pause Rate',
                  value: `${session.fluency.pauseRate}`,
                  unit: '/min',
                  delta: session.fluency.pauseRateDelta,
                  deltaLabel: 'vs last',
                  good: session.fluency.pauseRateDelta <= 0,
                },
                {
                  icon: <Repeat2 className="w-4 h-4" />,
                  label: 'Disfluencies',
                  value: `${session.fluency.disfluencies}`,
                  unit: '/min',
                  delta: session.fluency.disfluenciesDelta,
                  deltaLabel: 'vs last',
                  good: session.fluency.disfluenciesDelta <= 0,
                },
                {
                  icon: <AlignLeft className="w-4 h-4" />,
                  label: 'Mean Speech Len.',
                  value: `${session.fluency.meanSpeechLength}`,
                  unit: 'sec',
                  delta: session.fluency.meanSpeechLengthDelta,
                  deltaLabel: 'vs last',
                  good: session.fluency.meanSpeechLengthDelta >= 0,
                },
                {
                  icon: <ArrowLeftRight className="w-4 h-4" />,
                  label: 'Turn Efficiency',
                  value: `${session.fluency.turnEfficiency}`,
                  unit: '%',
                  delta: session.fluency.turnEfficiencyDelta,
                  deltaLabel: 'vs last',
                  good: session.fluency.turnEfficiencyDelta >= 0,
                },
                {
                  icon: <Layers className="w-4 h-4" />,
                  label: 'Gaps / Overlaps',
                  value: `${session.fluency.gapOverlap}`,
                  unit: 'sec avg',
                  delta: session.fluency.gapOverlapDelta,
                  deltaLabel: 'vs last',
                  good: session.fluency.gapOverlapDelta <= 0,
                },
              ].map((kpi) => {
                const isPositive = kpi.good;
                const deltaColor = isPositive ? '#186a22' : '#dc2626';
                const deltaBg   = isPositive ? '#e6f4e8'  : '#fee2e2';
                const arrow     = kpi.delta >= 0 ? '↑' : '↓';
                const deltaStr  = `${kpi.delta >= 0 ? '+' : ''}${kpi.delta}`;
                return (
                  <div
                    key={kpi.label}
                    className="rounded-2xl p-4 flex flex-col gap-2"
                    style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: '#e6f4e8', color: '#186a22' }}
                      >
                        {kpi.icon}
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: deltaBg, color: deltaColor }}
                      >
                        {arrow} {deltaStr}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black leading-none" style={{ color: '#0d2e10' }}>{kpi.value}</span>
                        <span className="text-[10px] font-semibold" style={{ color: '#5a7a5c' }}>{kpi.unit}</span>
                      </div>
                      <p className="text-[10px] font-semibold mt-1 leading-tight" style={{ color: '#5a7a5c' }}>{kpi.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── VISUALIZATIONS ROW ── */}
          <div className="grid grid-cols-2 gap-5 items-start">

            {/* ── SPEAKING TIME DONUT ── */}
            <div
              className="rounded-2xl p-5 self-start"
              style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <p className="text-sm font-bold" style={{ color: '#0d2e10' }}>Speaking Time</p>
              <p className="text-xs mt-0.5 mb-4" style={{ color: '#5a7a5c' }}>Active distribution per participant</p>

              <div className="flex items-center gap-5">
                {/* Donut */}
                <div className="relative flex-shrink-0" style={{ width: 120, height: 120 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={speakingTimeMap[session.id]}
                        cx="50%"
                        cy="50%"
                        innerRadius={36}
                        outerRadius={54}
                        dataKey="pct"
                        nameKey="name"
                        paddingAngle={3}
                        startAngle={90}
                        endAngle={-270}
                      >
                        {speakingTimeMap[session.id].map((s, i) => (
                          <Cell key={i} fill={s.color} strokeWidth={0} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) =>
                          active && payload?.length ? (
                            <div className="rounded-xl px-3 py-2 text-xs font-semibold shadow-lg" style={{ background: '#0d2e10', color: '#fff' }}>
                              {payload[0].name}: {payload[0].value}%
                            </div>
                          ) : null
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Centre label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-black leading-none" style={{ color: '#0d2e10' }}>{session.duration}</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest mt-0.5" style={{ color: '#5a7a5c' }}>Total</span>
                  </div>
                </div>

                {/* Legend — 2-column grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 flex-1">
                  {speakingTimeMap[session.id].map((s) => (
                    <div key={s.name} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-xs font-semibold leading-tight" style={{ color: '#0d2e10' }}>
                        {s.name} <span style={{ color: '#5a7a5c' }}>({s.pct}%)</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── TURNS PER PERSON ── */}
            <div
              className="rounded-2xl p-5 self-start"
              style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <p className="text-sm font-bold" style={{ color: '#0d2e10' }}>Turns per Person</p>
              <p className="text-xs mt-0.5 mb-4" style={{ color: '#5a7a5c' }}>Total conversational turns taken</p>
              <ResponsiveContainer width="100%" height={turnsMap[session.id].length * 36}>
                <BarChart
                  data={turnsMap[session.id]}
                  layout="vertical"
                  barSize={14}
                  margin={{ top: 0, right: 8, bottom: 0, left: 0 }}
                >
                  <CartesianGrid horizontal={false} stroke="#e8f0e8" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: '#5a7a5c' }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 'dataMax + 5']}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#0d2e10', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    width={64}
                  />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="rounded-xl px-3 py-2 text-xs font-semibold shadow-lg" style={{ background: '#0d2e10', color: '#fff' }}>
                          {payload[0].payload.name}: {payload[0].value} turns
                        </div>
                      ) : null
                    }
                    cursor={{ fill: '#f0f9f0' }}
                  />
                  <Bar dataKey="turns" radius={[0, 6, 6, 0]}>
                    {turnsMap[session.id].map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ── SESSION TIMELINE ── */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <p className="text-base font-bold" style={{ color: '#0d2e10' }}>Session Timeline</p>
              <p className="text-xs mt-0.5 mb-5" style={{ color: '#5a7a5c' }}>Key moments during the session</p>

              <div className="relative flex flex-col gap-0">
                {/* Vertical line */}
                <div
                  className="absolute left-[52px] top-2 bottom-2 w-px"
                  style={{ background: '#e8f0e8' }}
                />

                {timelineMap[session.id].map((event, i) => {
                  const dotColor =
                    event.type === 'start'    ? '#186a22' :
                    event.type === 'end'      ? '#186a22' :
                    event.type === 'peak'     ? '#2d9e3a' :
                    event.type === 'note'     ? '#d97706' :
                    '#c0dcc0';
                  const dotBg =
                    event.type === 'start'    ? '#e6f4e8' :
                    event.type === 'end'      ? '#e6f4e8' :
                    event.type === 'peak'     ? '#e6f4e8' :
                    event.type === 'note'     ? '#fef3c7' :
                    '#f4f9f4';
                  const labelColor =
                    event.type === 'note'     ? '#b45309' :
                    event.type === 'peak'     ? '#186a22' :
                    '#0d2e10';

                  return (
                    <div key={i} className="flex items-start gap-3 relative" style={{ paddingBottom: i < timelineMap[session.id].length - 1 ? 14 : 0 }}>
                      {/* Time stamp */}
                      <span
                        className="text-[10px] font-bold flex-shrink-0 pt-0.5 text-right"
                        style={{ width: 36, color: '#5a7a5c' }}
                      >
                        {event.time}
                      </span>
                      {/* Dot */}
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center z-10 mt-0.5"
                        style={{ background: dotBg, border: `2px solid ${dotColor}` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor }} />
                      </div>
                      {/* Label */}
                      <p className="text-xs leading-snug pt-0.5" style={{ color: labelColor, fontWeight: event.type === 'peak' || event.type === 'start' || event.type === 'end' ? 600 : 400 }}>
                        {event.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
