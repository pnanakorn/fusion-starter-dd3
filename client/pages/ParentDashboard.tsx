import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  Zap,
  Star,
  Home,
  CheckCircle2,
  RotateCcw,
  BarChart2,
  TrendingUp,
  User,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const recentSessions = [
  {
    date: 'Oct 24',
    duration: '15 min',
    note: 'More responsive, needed fewer prompts',
    id: 'oct24',
  },
  {
    date: 'Oct 22',
    duration: '12 min',
    note: 'Focused on visual aids, playful tone',
    id: 'oct22',
  },
];

const highlights = [
  {
    icon: <User className="w-4 h-4" style={{ color: '#186a22' }} />,
    title: 'Self-Correction Win',
    desc: 'Leo noticed confusion and clarified his story without prompting.',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#186a22" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Turn-taking',
    desc: 'Took more turns than last session during our forest walk talk.',
  },
];

const stats = [
  { icon: <CalendarDays className="w-4 h-4" />, label: 'Sessions', value: '5 this week' },
  { icon: <Zap className="w-4 h-4" />, label: 'Engagement', value: 'High Avg.' },
  { icon: <Star className="w-4 h-4" />, label: 'Top Skill', value: 'Turn-taking' },
];

const homeActivities = [
  'Ask Leo to describe 3 objects using short sentences',
  'Practice taking turns in a short story game.',
];

function ScoreRing({ score }: { score: number }) {
  const data = [
    { value: score, color: '#186a22' },
    { value: 100 - score, color: '#d4ead4' },
  ];
  return (
    <div className="relative mx-auto" style={{ width: 96, height: 96 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={36}
            outerRadius={46}
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
        <span className="text-2xl font-black leading-none" style={{ color: '#186a22' }}>{score}</span>
        <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>Score</span>
      </div>
    </div>
  );
}

export default function ParentDashboard() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #c8e6c8 0%, #d8eed8 40%, #e8f4e8 100%)' }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-5 py-4 sticky top-0 z-20"
        style={{ background: 'transparent' }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/40"
            style={{ color: '#186a22' }}
            aria-label="Back to login"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-base font-extrabold tracking-tight" style={{ color: '#186a22' }}>
            Turnlea Parent Portal
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button style={{ color: '#186a22' }}>
            <Bell className="w-5 h-5" />
          </button>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: '#0d2e10' }}
          >
            P
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-4 pb-28 space-y-4 max-w-lg mx-auto w-full">

        {/* Today's Session hero card */}
        <div
          className="rounded-3xl p-6 flex flex-col items-center text-center gap-3"
          style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(12px)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>
            Today's Session
          </span>
          <ScoreRing score={87} />
          <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: '#0d2e10' }}>
            Leo was a star today!
          </h2>
          <p className="text-sm" style={{ color: '#5a7a5c' }}>
            He showed strong focus during storytelling.
          </p>
        </div>

        {/* Highlights & Wins */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold" style={{ color: '#0d2e10' }}>Highlights &amp; Wins</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl p-4 flex flex-col gap-2"
                style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: '#e6f4e8' }}
                >
                  {h.icon}
                </div>
                <p className="text-xs font-bold leading-tight" style={{ color: '#0d2e10' }}>{h.title}</p>
                <p className="text-xs leading-snug" style={{ color: '#5a7a5c' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-3 flex flex-col gap-1.5 items-start"
              style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: '#e6f4e8', color: '#186a22' }}
              >
                {s.icon}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>{s.label}</p>
              <p className="text-xs font-bold" style={{ color: '#0d2e10' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Try This at Home */}
        <div
          className="rounded-2xl p-4 flex flex-col gap-3"
          style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#e6f4e8' }}
            >
              <Home className="w-4 h-4" style={{ color: '#186a22' }} />
            </div>
            <span className="text-sm font-bold" style={{ color: '#0d2e10' }}>Try This at Home</span>
          </div>
          <div className="flex flex-col gap-2">
            {homeActivities.map((activity) => (
              <div key={activity} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#186a22' }} />
                <span className="text-xs leading-snug" style={{ color: '#3a5c3a' }}>{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <section>
          <h2 className="text-base font-extrabold mb-3" style={{ color: '#0d2e10' }}>Recent Sessions</h2>
          <div className="flex flex-col gap-3">
            {recentSessions.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl px-4 py-3.5 flex items-center justify-between gap-3"
                style={{ background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#e6f4e8' }}
                  >
                    <RotateCcw className="w-4 h-4" style={{ color: '#186a22' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#0d2e10' }}>
                      {s.date} &bull; {s.duration}
                    </p>
                    <p className="text-xs" style={{ color: '#5a7a5c' }}>{s.note}</p>
                  </div>
                </div>
                <button
                  className="text-xs font-semibold flex-shrink-0"
                  style={{ color: '#186a22' }}
                  onClick={() => navigate(`/parent/sessions?session=${s.id}`)}
                >
                  Details →
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-4 py-3"
        style={{
          background: 'rgba(255,255,255,0.90)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {[
          { icon: <Zap className="w-5 h-5" />, label: 'Insights', active: true, path: '/parent' },
          { icon: <BarChart2 className="w-5 h-5" />, label: 'Sessions', active: false, path: '/parent/sessions' },
          { icon: <TrendingUp className="w-5 h-5" />, label: 'Progress', active: false, path: '/parent/progress' },
          { icon: <User className="w-5 h-5" />, label: 'Profile', active: false, path: '/parent/profile' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => item.path && navigate(item.path)}
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
    </div>
  );
}
