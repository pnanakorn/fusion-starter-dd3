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
  Timer,
  MessageSquare,
  Star,
  ChevronLeft,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// ── Shared nav items ──────────────────────────────────────────────────────────
const navItems = [
  { icon: TrendingUp, label: 'Session Insights', path: '/dashboard' },
  { icon: Users, label: 'Group Metrics', path: '/group-metrics' },
  { icon: TrendingUp, label: 'Patient Trends', path: '/patient-trends', active: true },
];

// ── Patient data ──────────────────────────────────────────────────────────────
const patients = [
  {
    id: 'ls-001',
    initials: 'LS',
    name: 'Leo S.',
    age: 8,
    tag: 'STEADY FOCUS',
    tagColor: '#e6f4e8',
    tagText: '#186a22',
    score: 92,
    scoreDelta: +4,
    duration: '42m',
    turns: 24,
    sessions: 7,
    lastSession: 'Oct 24',
    status: 'Active',
    trendStatus: 'Improving' as const,
    strengths: ['Turn-taking', 'Self-correction'],
  },
  {
    id: 'mk-002',
    initials: 'MK',
    name: 'Mia K.',
    age: 9,
    tag: 'HIGHLY RESPONSIVE',
    tagColor: '#d0f0f0',
    tagText: '#006868',
    score: 89,
    scoreDelta: +6,
    duration: '45m',
    turns: 31,
    sessions: 7,
    lastSession: 'Oct 24',
    status: 'Active',
    trendStatus: 'Improving' as const,
    strengths: ['Responsiveness', 'Vocabulary'],
  },
  {
    id: 'jr-003',
    initials: 'JR',
    name: 'Julian R.',
    age: 7,
    tag: 'MODERATE FLOW',
    tagColor: '#fff3e0',
    tagText: '#b45309',
    score: 76,
    scoreDelta: +3,
    duration: '38m',
    turns: 18,
    sessions: 7,
    lastSession: 'Oct 24',
    status: 'Active',
    trendStatus: 'Stable' as const,
    strengths: ['Listening', 'Patience'],
  },
  {
    id: 'st-004',
    initials: 'ST',
    name: 'Sarah T.',
    age: 10,
    tag: 'DEEP CONTRIBUTOR',
    tagColor: '#e6f4e8',
    tagText: '#186a22',
    score: 95,
    scoreDelta: +5,
    duration: '45m',
    turns: 47,
    sessions: 7,
    lastSession: 'Oct 24',
    status: 'Active',
    trendStatus: 'Improving' as const,
    strengths: ['Depth', 'Initiation'],
  },
  {
    id: 'am-005',
    initials: 'AM',
    name: 'Aiden M.',
    age: 8,
    tag: 'EMERGING',
    tagColor: '#f3e8ff',
    tagText: '#7c3aed',
    score: 61,
    scoreDelta: +8,
    duration: '30m',
    turns: 12,
    sessions: 4,
    lastSession: 'Oct 22',
    status: 'Active',
    trendStatus: 'Improving' as const,
    strengths: ['Listening', 'Eye contact'],
  },
  {
    id: 'cl-006',
    initials: 'CL',
    name: 'Clara L.',
    age: 9,
    tag: 'CONSISTENT',
    tagColor: '#e6f4e8',
    tagText: '#186a22',
    score: 83,
    scoreDelta: +2,
    duration: '40m',
    turns: 26,
    sessions: 6,
    lastSession: 'Oct 23',
    status: 'Active',
    trendStatus: 'Stable' as const,
    strengths: ['Clarity', 'Turn-taking'],
  },
];

const filterOptions = ['All Patients', 'High Performers', 'Needs Attention', 'Recently Active'];

// ── Trend badge ───────────────────────────────────────────────────────────────
const trendConfig = {
  Improving: { arrow: '↗', color: '#186a22', bg: '#e6f4e8' },
  Stable:    { arrow: '→', color: '#d97706', bg: '#fef3c7' },
  Declining: { arrow: '↘', color: '#dc2626', bg: '#fee2e2' },
} as const;

// ── Score ring ────────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 52 }: { score: number; size?: number }) {
  const color = score >= 85 ? '#186a22' : score >= 70 ? '#d97706' : '#dc2626';
  const trackColor = score >= 85 ? '#e6f4e8' : score >= 70 ? '#fef3c7' : '#fee2e2';
  const data = [
    { value: score, color },
    { value: 100 - score, color: trackColor },
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
          {score}
        </span>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PatientTrends() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Patients');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filtered = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === 'All Patients' ||
      (activeFilter === 'High Performers' && p.score >= 85) ||
      (activeFilter === 'Needs Attention' && p.score < 70) ||
      (activeFilter === 'Recently Active' && ['Oct 24', 'Oct 23'].includes(p.lastSession));
    return matchesSearch && matchesFilter;
  });

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
        <main className="flex-1 overflow-y-auto px-8 py-7 space-y-6" style={{ background: 'transparent' }}>

          {/* Page heading */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight" style={{ color: '#0d2e10' }}>
                Patient Trends
              </h1>
              <p className="text-sm mt-0.5" style={{ color: '#5a7a5c' }}>
                {patients.length} active patients · Oct 2023
              </p>
            </div>
          </div>

          {/* Summary stat pills */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: <Users className="w-4 h-4" />, label: 'Total Patients', value: '6', color: '#186a22', bg: '#e6f4e8' },
              { icon: <Star className="w-4 h-4" />, label: 'Avg. Score', value: '83', color: '#d97706', bg: '#fef3c7' },
              { icon: <TrendingUp className="w-4 h-4" />, label: 'Avg. Improvement', value: '+5%', color: '#186a22', bg: '#e6f4e8' },
              { icon: <Timer className="w-4 h-4" />, label: 'Avg. Duration', value: '40m', color: '#7c3aed', bg: '#f3e8ff' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.icon}
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>{s.label}</p>
                  <p className="text-lg font-black leading-tight" style={{ color: '#0d2e10' }}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Search + filter bar */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#5a7a5c' }} />
              <input
                type="text"
                placeholder="Search patients…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: '#ffffff',
                  border: '1px solid #d0e4d0',
                  color: '#0d2e10',
                }}
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 flex-shrink-0" style={{ color: '#5a7a5c' }} />
              {filterOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={
                    activeFilter === f
                      ? { background: '#186a22', color: '#ffffff' }
                      : { background: '#ffffff', color: '#5a7a5c', border: '1px solid #d0e4d0' }
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Patient grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Users className="w-10 h-10" style={{ color: '#c0dcc0' }} />
              <p className="text-sm font-semibold" style={{ color: '#5a7a5c' }}>No patients match your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => navigate(`/individual/${patient.id}`)}
                  onMouseEnter={() => setHoveredCard(patient.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="flex flex-col gap-0 rounded-2xl text-left overflow-hidden"
                  style={{
                    background: '#ffffff',
                    border: hoveredCard === patient.id ? '1.5px solid #186a22' : '1px solid #e8f0e8',
                    boxShadow: hoveredCard === patient.id
                      ? '0 8px 28px rgba(24,106,34,0.14), 0 2px 8px rgba(0,0,0,0.06)'
                      : '0 2px 8px rgba(0,0,0,0.04)',
                    transform: hoveredCard === patient.id ? 'translateY(-3px)' : 'translateY(0)',
                    transition: 'box-shadow 0.18s ease, border-color 0.18s ease, transform 0.18s ease',
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3 p-4 pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                        style={{ background: '#e6f4e8', color: '#186a22' }}
                      >
                        {patient.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-tight" style={{ color: '#0d2e10' }}>
                          {patient.name}
                        </p>
                        <p className="text-xs" style={{ color: '#5a7a5c' }}>Age {patient.age}</p>
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mt-1 inline-block"
                          style={{ background: patient.tagColor, color: patient.tagText }}
                        >
                          {patient.tag}
                        </span>
                      </div>
                    </div>
                    <ScoreRing score={patient.score} size={52} />
                  </div>

                  {/* Trend badge */}
                  <div
                    className="flex items-center justify-between px-4 py-2.5"
                    style={{ background: 'rgba(240,249,240,0.7)', borderTop: '1px solid #e8f0e8', borderBottom: '1px solid #e8f0e8' }}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>
                      Trend
                    </span>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                      style={{
                        background: trendConfig[patient.trendStatus].bg,
                        color: trendConfig[patient.trendStatus].color,
                      }}
                    >
                      {trendConfig[patient.trendStatus].arrow} {patient.trendStatus}
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 divide-x px-0" style={{ borderColor: '#e8f0e8' }}>
                    {[
                      { icon: <Timer className="w-3 h-3" />, label: 'Duration', value: patient.duration },
                      { icon: <MessageSquare className="w-3 h-3" />, label: 'Turns', value: patient.turns },
                      { icon: <BarChart2 className="w-3 h-3" />, label: 'Sessions', value: patient.sessions },
                    ].map((s) => (
                      <div key={s.label} className="flex flex-col items-center py-3 gap-0.5">
                        <div className="flex items-center gap-1" style={{ color: '#5a7a5c' }}>
                          {s.icon}
                          <span className="text-[9px] font-semibold uppercase tracking-wider">{s.label}</span>
                        </div>
                        <span className="text-sm font-black" style={{ color: '#0d2e10' }}>{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Strengths + last session */}
                  <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid #e8f0e8' }}>
                    <div className="flex gap-1.5 flex-wrap">
                      {patient.strengths.map((s) => (
                        <span
                          key={s}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: '#e6f4e8', color: '#186a22' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold flex-shrink-0 ml-2" style={{ color: '#5a7a5c' }}>
                      {patient.lastSession}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
