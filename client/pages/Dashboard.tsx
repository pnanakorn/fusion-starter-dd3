import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  TrendingUp,
  Users,
  BarChart2,
  Bell,
  Settings,
  LogOut,
  HelpCircle,
  Download,
  Timer,
  CalendarDays,
  MessageSquare,
  ChevronLeft,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const navItems = [
  { icon: TrendingUp, label: 'Session Insights', active: true, path: '/dashboard' },
  { icon: Users, label: 'Group Metrics', path: '/group-metrics' },
  { icon: TrendingUp, label: 'Patient Trends', path: '/patient-trends' },
];

const individuals = [
  {
    initials: 'LS',
    name: 'Leo S.',
    tag: 'STEADY FOCUS',
    tagColor: '#e6f4e8',
    tagText: '#186a22',
    score: 92,
    duration: '42m',
    turns: 24,
    sessionId: 'ls-001',
  },
  {
    initials: 'MK',
    name: 'Mia K.',
    tag: 'HIGHLY RESPONSIVE',
    tagColor: '#d0f0f0',
    tagText: '#006868',
    score: 89,
    duration: '45m',
    turns: 31,
    sessionId: 'mk-002',
  },
  {
    initials: 'JR',
    name: 'Julian R.',
    tag: 'MODERATE FLOW',
    tagColor: '#e6f4e8',
    tagText: '#186a22',
    score: 76,
    duration: '38m',
    turns: 18,
    sessionId: 'jr-003',
  },
  {
    initials: 'ST',
    name: 'Sarah T.',
    tag: 'DEEP CONTRIBUTOR',
    tagColor: '#e6f4e8',
    tagText: '#186a22',
    score: 95,
    duration: '45m',
    turns: 47,
    sessionId: 'st-004',
  },
];

function ScoreRing({ score, size = 44 }: { score: number; size?: number }) {
  const data = [
    { value: score, color: '#186a22' },
    { value: 100 - score, color: '#e6f4e8' },
  ];
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.34}
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
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold" style={{ fontSize: size * 0.22, color: '#0d2e10' }}>
          {score}%
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #d3e4d3ff 0%, #c1ddd0ff 40%, #dbfde8ff 100%)' }}>

      {/* ── TOP NAV ── */}
      <header
        className="flex items-center gap-8 px-8 py-0 sticky top-0 z-30"
        style={{ background: '#ffffff', borderBottom: '1px solid #e8f0e8', height: 56 }}
      >
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-gray-100"
            style={{ color: '#0d2e10' }}
            aria-label="Back to login"
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
          {/* Profile */}
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

          {/* Nav items */}
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
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

          {/* Bottom links */}
          <div className="mt-auto flex flex-col gap-1 pt-4" style={{ borderTop: '1px solid #e8f0e8' }}>
            <button
              onClick={() => navigate('/therapist/profile')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-colors hover:bg-[#f0f9f0]"
              style={{ color: '#5a7a5c' }}
            >
              <Users className="w-4 h-4" /> Profile
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
        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-7">

          {/* Group Performance */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold" style={{ color: '#0d2e10' }}>Group Performance</h2>
              <button
                className="flex items-center gap-1.5 text-xs font-semibold"
                style={{ color: '#186a22' }}
                onClick={() => navigate('/reports/group-001')}
              >
                <Download className="w-3.5 h-3.5" /> Full Report
              </button>
            </div>

            <div
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
                <div className="relative" style={{ width: 120, height: 120 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{ value: 88 }, { value: 12 }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={44}
                        outerRadius={56}
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
                    <span className="text-2xl font-black" style={{ color: '#0d2e10' }}>88%</span>
                  </div>
                </div>
                <span className="text-xs font-semibold" style={{ color: '#186a22' }}>
                  ↗ +4% from last session
                </span>
              </div>

              {/* Summary panel */}
              <div className="flex flex-col justify-center px-8 py-8 gap-4 flex-1">
                <div>
                  <h3 className="font-bold text-base" style={{ color: '#0d2e10' }}>Session Summary</h3>
                  <p className="text-sm mt-1.5 leading-relaxed" style={{ color: '#5a7a5c', maxWidth: 480 }}>
                    The group demonstrated high levels of interpersonal synchrony during the mindfulness
                    exercises. Active listening phases showed significant improvement, with participants
                    maintaining steady focus for longer intervals compared to the previous week.
                  </p>
                </div>
                <div className="flex items-center gap-10">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>Duration</span>
                    <div className="flex items-center gap-1.5">
                      <Timer className="w-4 h-4" style={{ color: '#186a22' }} />
                      <span className="text-base font-bold" style={{ color: '#0d2e10' }}>45m</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>Date</span>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-4 h-4" style={{ color: '#186a22' }} />
                      <span className="text-base font-bold" style={{ color: '#0d2e10' }}>Oct 24, 2023</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#5a7a5c' }}>Total Turns</span>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" style={{ color: '#186a22' }} />
                      <span className="text-base font-bold" style={{ color: '#0d2e10' }}>120</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Individual Performance */}
          <section>
            <h2 className="text-base font-bold mb-3" style={{ color: '#0d2e10' }}>Individual Performance</h2>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {individuals.map((person) => (
                <button
                  key={person.sessionId}
                  onClick={() => navigate(`/individual/${person.sessionId}`)}
                  className="flex flex-col gap-4 p-4 rounded-2xl text-left transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e8f0e8',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: '#e6f4e8', color: '#186a22' }}
                      >
                        {person.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-none" style={{ color: '#0d2e10' }}>
                          {person.name}
                        </p>
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mt-1 inline-block"
                          style={{ background: person.tagColor, color: person.tagText }}
                        >
                          {person.tag}
                        </span>
                      </div>
                    </div>
                    <ScoreRing score={person.score} size={44} />
                  </div>

                  {/* Stats */}
                  <div
                    className="flex flex-col gap-2 pt-3"
                    style={{ borderTop: '1px solid #e8f0e8' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Timer className="w-3.5 h-3.5" style={{ color: '#5a7a5c' }} />
                        <span className="text-xs" style={{ color: '#5a7a5c' }}>Duration</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: '#0d2e10' }}>{person.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" style={{ color: '#5a7a5c' }} />
                        <span className="text-xs" style={{ color: '#5a7a5c' }}>Turns</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: '#0d2e10' }}>{person.turns}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

        </main>
      </div>

      {/* Log Session Insights FAB */}
      <button
        className="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-bold shadow-lg transition-opacity hover:opacity-90"
        style={{ background: '#0d2e10' }}
      >
        <BarChart2 className="w-4 h-4" />
        Log Session Insights
      </button>
    </div>
  );
}
