import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import {
  BarChart2,
  TrendingUp,
  Zap,
  User,
  Star,
  MessageSquare,
  Timer,
  ChevronLeft,
} from 'lucide-react';

// ── Mock data ─────────────────────────────────────────────────────────────────

const weeklyScores = [
  { week: 'Sep 3', score: 68, participation: 12, duration: 28 },
  { week: 'Sep 10', score: 72, participation: 15, duration: 30 },
  { week: 'Sep 17', score: 75, participation: 17, duration: 33 },
  { week: 'Sep 24', score: 79, participation: 19, duration: 36 },
  { week: 'Oct 1', score: 82, participation: 21, duration: 38 },
  { week: 'Oct 8', score: 85, participation: 22, duration: 40 },
  { week: 'Oct 15', score: 87, participation: 23, duration: 41 },
  { week: 'Oct 24', score: 91, participation: 24, duration: 42 },
];

const monthlyParticipation = [
  { month: 'Aug', sessions: 3 },
  { month: 'Sep', sessions: 5 },
  { month: 'Oct', sessions: 7 },
];

const milestones = [
  { label: 'First unprompted sentence', date: 'Sep 10', done: true },
  { label: 'Held 3-turn conversation', date: 'Sep 24', done: true },
  { label: 'Self-corrected without prompting', date: 'Oct 8', done: true },
  { label: 'Initiated topic change', date: 'Oct 24', done: true },
  { label: 'Sustained 5-turn exchange', date: 'Upcoming', done: false },
  { label: 'Used descriptive language unprompted', date: 'Upcoming', done: false },
];

const BAR_COLORS = ['#b8d8be', '#6aad7a', '#01695D'];

// ── Shared bottom nav ─────────────────────────────────────────────────────────
function BottomNav({ active }: { active: string }) {
  const navigate = useNavigate();
  const items = [
    { icon: <Zap className="w-5 h-5" />, label: 'Insights', path: '/parent' },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Sessions', path: '/parent/sessions' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Progress', path: '/parent/progress' },
    { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/parent/profile' },
  ];
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-4 py-3"
      style={{
        background: 'rgba(255,255,255,0.92)',
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
            item.label === active
              ? { background: '#186a22', color: '#ffffff' }
              : { color: '#5a7a5c' }
          }
        >
          {item.icon}
          <span className="text-[10px] font-semibold uppercase tracking-widest">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ── Metric pill tabs ──────────────────────────────────────────────────────────
const trendMetrics = [
  { key: 'score', label: 'Score' },
  { key: 'duration', label: 'Duration' },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ParentProgress() {
  const navigate = useNavigate();
  const [activeTrend, setActiveTrend] = useState<'score' | 'duration'>('score');

  const first = weeklyScores[0][activeTrend];
  const last = weeklyScores[weeklyScores.length - 1][activeTrend];
  const delta = last - first;
  const pct = Math.round((delta / first) * 100);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #c8e6c8 0%, #d8eed8 40%, #e8f4e8 100%)' }}
    >
      {/* Top bar */}
      <header
        className="flex items-center gap-2 px-5 py-4 sticky top-0 z-20"
        style={{ background: 'transparent' }}
      >
        <button
          onClick={() => navigate('/parent')}
          className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/40"
          style={{ color: '#186a22' }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-base font-extrabold tracking-tight" style={{ color: '#186a22' }}>
          Leo's Progress
        </span>
      </header>

      <main className="flex-1 overflow-y-auto px-4 pb-28 space-y-4 max-w-lg mx-auto w-full">

        {/* ── Top summary box ── */}
        <div
          className="rounded-3xl p-5 flex items-start gap-4"
          style={{
            background: '#ffffff',
            border: '1.5px solid #e6f4e8',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          }}
        >
          <span className="text-3xl flex-shrink-0 mt-0.5">😊</span>
          <div>
            <p className="text-base font-extrabold leading-snug" style={{ color: '#0d2e10' }}>
              Leo is becoming more confident in conversations
            </p>
            <p className="text-sm mt-1 leading-relaxed" style={{ color: '#5a7a5c' }}>
              Over the past 4 weeks his engagement score has risen from <strong style={{ color: '#01695D' }}>68 → 91</strong> and he's taking more turns each session. Keep it up!
            </p>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Star className="w-4 h-4" />, label: 'Avg Score', value: '82', color: '#01695D', bgColor: '#e6f4e8' },
            { icon: <MessageSquare className="w-4 h-4" />, label: 'Total Participation', value: '153', color: '#3b82f6', bgColor: '#dbeafe' },
            { icon: <Timer className="w-4 h-4" />, label: 'Total Time', value: '278m', color: '#f97316', bgColor: '#ffedd5' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-3.5 flex flex-col gap-1.5"
              style={{ background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: s.bgColor, color: s.color }}>
                {s.icon}
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>{s.label}</span>
              <span className="text-base font-black" style={{ color: '#0d2e10' }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Weekly trend chart */}
        <div
          className="rounded-3xl p-5 space-y-4"
          style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
        >
          <div>
            <h3 className="font-bold text-base" style={{ color: '#0d2e10' }}>Weekly Trend</h3>
            <p className="text-xs" style={{ color: '#5a7a5c' }}>4-week rolling view</p>
          </div>

          {/* Interpretation */}
          <div
            className="rounded-2xl px-4 py-3 flex items-start gap-2"
            style={{ background: '#dbeafe' }}
          >
            <span className="text-base flex-shrink-0">📈</span>
            <p className="text-xs leading-relaxed" style={{ color: '#1e3a5f' }}>
              <strong>Steady upward trend.</strong> Leo's score has improved every week — a sign that consistent sessions are building real confidence.
            </p>
          </div>

          {/* Pill tabs */}
          <div className="flex gap-1.5 p-1 rounded-full" style={{ background: '#f3f4f6' }}>
            {trendMetrics.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveTrend(m.key)}
                className="flex-1 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={
                  activeTrend === m.key
                    ? { background: '#186a22', color: '#ffffff', boxShadow: '0 2px 6px rgba(24,106,34,0.25)' }
                    : { background: 'transparent', color: '#5a7a5c' }
                }
              >
                {m.label}
              </button>
            ))}
          </div>

          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyScores} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
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
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#0d2e10',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                  }}
                  cursor={{ stroke: '#01695D', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Line
                  type="monotone"
                  dataKey={activeTrend}
                  stroke="#01695D"
                  strokeWidth={2.5}
                  dot={{ fill: '#01695D', r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 2, stroke: '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Delta badge */}
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full inline-block"
            style={{ background: delta >= 0 ? '#e6f4e8' : '#fff0ee', color: delta >= 0 ? '#01695D' : '#c0392b' }}
          >
            {delta >= 0 ? '↗' : '↘'} {delta >= 0 ? '+' : ''}{delta} ({delta >= 0 ? '+' : ''}{pct}%) over 4 weeks
          </span>
        </div>

        {/* Participation bar chart */}
        <div
          className="rounded-3xl p-5 space-y-3"
          style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
        >
          <div>
            <h3 className="font-bold text-base" style={{ color: '#0d2e10' }}>Participation</h3>
            <p className="text-xs" style={{ color: '#5a7a5c' }}>How often Leo participated</p>
          </div>

          {/* Interpretation */}
          <div
            className="rounded-2xl px-4 py-3 flex items-start gap-2"
            style={{ background: '#ffedd5' }}
          >
            <span className="text-base flex-shrink-0">💬</span>
            <p className="text-xs leading-relaxed" style={{ color: '#7c2d12' }}>
              <strong>More conversations = more confidence.</strong> Leo's session count nearly doubled from August to October — each session is a chance to practice and grow.
            </p>
          </div>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyParticipation} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="#e6f4e8" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#5a7a5c' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#5a7a5c', fontWeight: 600 }}
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
                <Bar dataKey="sessions" radius={[8, 8, 0, 0]}>
                  {monthlyParticipation.map((_, i) => (
                    <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Milestones */}
        <div
          className="rounded-3xl p-5 space-y-3"
          style={{ background: '#ffffffff', backdropFilter: 'blur(8px)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
        >
          <div>
            <h3 className="font-bold text-base" style={{ color: '#0d2e10' }}>Milestones</h3>
            <p className="text-xs" style={{ color: '#5a7a5c' }}>Key achievements and upcoming goals</p>
          </div>
          <div className="space-y-2">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2.5 rounded-2xl"
                style={{ background: m.done ? '#e6f4e8' : 'rgba(0,0,0,0.03)' }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: m.done ? '#01695D' : '#d4e8d0' }}
                >
                  {m.done ? (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div className="w-2 h-2 rounded-full" style={{ background: '#5a7a5c' }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-semibold leading-tight"
                    style={{ color: m.done ? '#0d2e10' : '#5a7a5c' }}
                  >
                    {m.label}
                  </p>
                </div>
                <span
                  className="text-[10px] font-bold flex-shrink-0"
                  style={{ color: m.done ? '#01695D' : '#5a7a5c' }}
                >
                  {m.date}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      <BottomNav active="Progress" />
    </div>
  );
}
