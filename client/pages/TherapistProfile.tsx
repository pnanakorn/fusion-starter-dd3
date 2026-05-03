import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  Bell,
  Settings,
  LogOut,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Lock,
  User,
  Check,
  X,
  PlusCircle,
  Trash2,
} from 'lucide-react';

// ── Patient types ─────────────────────────────────────────────────────────────
type Patient = {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  sessionFrequency: string;
  status: 'Active' | 'On Hold' | 'Discharged';
  initials: string;
};

const initialPatients: Patient[] = [
  { id: 'ls-001', name: 'Leo S.',    age: 8,  diagnosis: 'Expressive Language Delay', sessionFrequency: 'Weekly',    status: 'Active',    initials: 'LS' },
  { id: 'mk-002', name: 'Mia K.',    age: 9,  diagnosis: 'Pragmatic Language Disorder', sessionFrequency: 'Bi-weekly', status: 'Active',    initials: 'MK' },
  { id: 'jr-003', name: 'Julian R.', age: 7,  diagnosis: 'Receptive Language Delay',  sessionFrequency: 'Weekly',    status: 'Active',    initials: 'JR' },
  { id: 'st-004', name: 'Sarah T.',  age: 10, diagnosis: 'Social Communication',       sessionFrequency: 'Weekly',    status: 'Active',    initials: 'ST' },
  { id: 'am-005', name: 'Aiden M.',  age: 8,  diagnosis: 'Articulation Disorder',      sessionFrequency: 'Bi-weekly', status: 'Active',    initials: 'AM' },
  { id: 'cl-006', name: 'Clara L.',  age: 9,  diagnosis: 'Fluency Disorder',           sessionFrequency: 'Weekly',    status: 'On Hold',   initials: 'CL' },
];

const statusColors: Record<Patient['status'], { bg: string; text: string }> = {
  'Active':     { bg: '#e6f4e8', text: '#186a22' },
  'On Hold':    { bg: '#fef3c7', text: '#d97706' },
  'Discharged': { bg: '#fee2e2', text: '#dc2626' },
};

const diagnosisOptions = [
  'Expressive Language Delay',
  'Receptive Language Delay',
  'Pragmatic Language Disorder',
  'Social Communication',
  'Articulation Disorder',
  'Fluency Disorder',
  'Autism Spectrum (Communication)',
  'Other',
];

const frequencyOptions = ['Weekly', 'Bi-weekly', 'Monthly'];
const statusOptions: Patient['status'][] = ['Active', 'On Hold', 'Discharged'];

const navItems = [
  { icon: TrendingUp, label: 'Session Insights', path: '/dashboard' },
  { icon: Users, label: 'Group Metrics', path: '/group-metrics' },
  { icon: TrendingUp, label: 'Patient Trends', path: '/patient-trends' },
];

export default function TherapistProfile() {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState('Dr. Clinical');
  const [email, setEmail] = useState('dr.clinical@turnlea.com');
  const [specialty, setSpecialty] = useState('Speech & Language Therapy');
  const [draftName, setDraftName] = useState(name);
  const [draftEmail, setDraftEmail] = useState(email);
  const [draftSpecialty, setDraftSpecialty] = useState(specialty);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientDiagnosis, setNewPatientDiagnosis] = useState('');
  const [newPatientFrequency, setNewPatientFrequency] = useState('Weekly');
  const [newPatientStatus, setNewPatientStatus] = useState<Patient['status']>('Active');

  function openEdit() {
    setDraftName(name);
    setDraftEmail(email);
    setDraftSpecialty(specialty);
    setEditOpen(true);
  }

  function saveEdit() {
    setName(draftName.trim() || name);
    setEmail(draftEmail.trim() || email);
    setSpecialty(draftSpecialty.trim() || specialty);
    setEditOpen(false);
  }

  function openAddPatient() {
    setNewPatientName('');
    setNewPatientAge('');
    setNewPatientDiagnosis('');
    setNewPatientFrequency('Weekly');
    setNewPatientStatus('Active');
    setAddPatientOpen(true);
  }

  function saveAddPatient() {
    if (!newPatientName.trim() || !newPatientAge.trim()) return;
    
    const initials = newPatientName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    const newPatient: Patient = {
      id: `patient-${Date.now()}`,
      name: newPatientName.trim(),
      age: parseInt(newPatientAge),
      diagnosis: newPatientDiagnosis.trim(),
      sessionFrequency: newPatientFrequency,
      status: newPatientStatus,
      initials,
    };
    
    setPatients([...patients, newPatient]);
    setAddPatientOpen(false);
  }

  function deletePatient(id: string) {
    setPatients(patients.filter(p => p.id !== id));
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #d3e4d3ff 0%, #c1ddd0ff 40%, #dbfde8ff 100%)' }}
    >
      {/* ── EDIT PROFILE MODAL ── */}
      {editOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setEditOpen(false); }}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 space-y-5"
            style={{ background: '#ffffff', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold" style={{ color: '#0d2e10' }}>Edit Profile</h3>
              <button
                onClick={() => setEditOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <X className="w-4 h-4" style={{ color: '#5a7a5c' }} />
              </button>
            </div>

            {[
              { label: 'Full name', value: draftName, set: setDraftName },
              { label: 'Email', value: draftEmail, set: setDraftEmail },
              { label: 'Specialty', value: draftSpecialty, set: setDraftSpecialty },
            ].map((field) => (
              <div key={field.label} className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none"
                  style={{ background: '#f0f9f0', border: '1.5px solid transparent', color: '#0d2e10' }}
                  onFocus={(e) => { e.target.style.borderColor = '#186a22'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'transparent'; }}
                />
              </div>
            ))}

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setEditOpen(false)}
                className="flex-1 py-3 rounded-full text-sm font-semibold"
                style={{ background: '#f0f9f0', color: '#5a7a5c' }}
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="flex-1 py-3 rounded-full text-sm font-bold text-white flex items-center justify-center gap-1.5 hover:opacity-90"
                style={{ background: 'linear-gradient(90deg, #186a22 0%, #2d9e3a 100%)', boxShadow: '0 4px 14px rgba(24,106,34,0.30)' }}
              >
                <Check className="w-4 h-4" /> Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD PATIENT MODAL ── */}
      {addPatientOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setAddPatientOpen(false); }}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 space-y-5"
            style={{ background: '#ffffff', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold" style={{ color: '#0d2e10' }}>Add Patient</h3>
              <button
                onClick={() => setAddPatientOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                <X className="w-4 h-4" style={{ color: '#5a7a5c' }} />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>
                Patient Name
              </label>
              <input
                type="text"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                placeholder="e.g., Leo S."
                className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none"
                style={{ background: '#f0f9f0', border: '1.5px solid transparent', color: '#0d2e10' }}
                onFocus={(e) => { e.target.style.borderColor = '#186a22'; }}
                onBlur={(e) => { e.target.style.borderColor = 'transparent'; }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>
                Age
              </label>
              <input
                type="number"
                value={newPatientAge}
                onChange={(e) => setNewPatientAge(e.target.value)}
                placeholder="e.g., 8"
                className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none"
                style={{ background: '#f0f9f0', border: '1.5px solid transparent', color: '#0d2e10' }}
                onFocus={(e) => { e.target.style.borderColor = '#186a22'; }}
                onBlur={(e) => { e.target.style.borderColor = 'transparent'; }}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>
                Status
              </label>
              <select
                value={newPatientStatus}
                onChange={(e) => setNewPatientStatus(e.target.value as Patient['status'])}
                className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none"
                style={{ background: '#f0f9f0', border: '1.5px solid transparent', color: '#0d2e10' }}
                onFocus={(e) => { e.target.style.borderColor = '#186a22'; }}
                onBlur={(e) => { e.target.style.borderColor = 'transparent'; }}
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setAddPatientOpen(false)}
                className="flex-1 py-3 rounded-full text-sm font-semibold"
                style={{ background: '#f0f9f0', color: '#5a7a5c' }}
              >
                Cancel
              </button>
              <button
                onClick={saveAddPatient}
                className="flex-1 py-3 rounded-full text-sm font-bold text-white flex items-center justify-center gap-1.5 hover:opacity-90"
                style={{ background: 'linear-gradient(90deg, #186a22 0%, #2d9e3a 100%)', boxShadow: '0 4px 14px rgba(24,106,34,0.30)' }}
              >
                <Check className="w-4 h-4" /> Add Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOP NAV ── */}
      <header
        className="flex items-center gap-8 px-8 py-0 sticky top-0 z-30"
        style={{ background: '#ffffff', borderBottom: '1px solid #e8f0e8', height: 56 }}
      >
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => navigate(-1)}
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
          {/* Profile identity */}
          <div className="flex items-center gap-3 px-2 pb-5 mb-2" style={{ borderBottom: '1px solid #e8f0e8' }}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#e6f4e8', border: '1px solid #c0dcc0' }}
            >
              <Users className="w-4 h-4" style={{ color: '#186a22' }} />
            </div>
            <div>
              <p className="text-xs font-bold leading-none" style={{ color: '#0d2e10' }}>{name}</p>
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
              style={{ color: '#5a7a5c' }}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}

          {/* Bottom links */}
          <div className="mt-auto flex flex-col gap-1 pt-4" style={{ borderTop: '1px solid #e8f0e8' }}>
            <button
              onClick={() => navigate('/therapist/profile')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl"
              style={{ background: '#e6f4e8', color: '#186a22', borderLeft: '3px solid #186a22' }}
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
        <main className="flex-1 overflow-y-auto px-8 py-10">

          {/* Page header — spans full width, titles side by side */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h1 className="text-xl font-extrabold tracking-tight" style={{ color: '#0d2e10' }}>Your Profile</h1>
              <p className="text-sm mt-0.5" style={{ color: '#5a7a5c' }}>Manage your account details and preferences</p>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight" style={{ color: '#0d2e10' }}>Your Patients</h2>
                <p className="text-xs mt-0.5" style={{ color: '#5a7a5c' }}>{patients.length} total · {patients.filter(p => p.status === 'Active').length} active</p>
              </div>
            </div>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-2 gap-6 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-6">

              {/* Profile card */}
              <div
                className="rounded-2xl p-6 flex items-center gap-6"
                style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: '#e6f4e8', border: '3px solid #ffffff', boxShadow: '0 0 0 2px #c0dcc0' }}
                  >
                    <User className="w-10 h-10" style={{ color: '#186a22' }} />
                  </div>
                  <div
                    className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: '#186a22', border: '2px solid #ffffff' }}
                  >
                    <Pencil className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xl font-extrabold leading-tight" style={{ color: '#0d2e10' }}>{name}</p>
                  <p className="text-sm mt-0.5" style={{ color: '#5a7a5c' }}>{email}</p>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block mt-2"
                    style={{ background: '#e6f4e8', color: '#186a22' }}
                  >
                    {specialty}
                  </span>
                </div>
                <button
                  onClick={openEdit}
                  className="px-5 py-2.5 rounded-full text-sm font-bold text-white flex-shrink-0 hover:opacity-90"
                  style={{ background: 'linear-gradient(90deg, #186a22 0%, #2d9e3a 100%)', boxShadow: '0 4px 14px rgba(24,106,34,0.30)' }}
                >
                  Edit Profile
                </button>
              </div>

              {/* Practice details */}
              <section>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: '#5a7a5c' }}>
                  Practice Details
                </p>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  {[
                    { label: 'Clinic', value: 'Turnlea Speech Centre' },
                    { label: 'License No.', value: 'SLT-2019-04821' },
                    { label: 'Active Patients', value: String(patients.filter(p => p.status === 'Active').length) },
                    { label: 'Sessions This Month', value: '24' },
                  ].map((row, i) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between px-5 py-3.5"
                      style={i > 0 ? { borderTop: '1px solid #e8f0e8' } : {}}
                    >
                      <span className="text-sm font-medium" style={{ color: '#5a7a5c' }}>{row.label}</span>
                      <span className="text-sm font-bold" style={{ color: '#0d2e10' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Preferences */}
              <section>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: '#5a7a5c' }}>
                  Preferences
                </p>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  {[
                    { icon: <Bell className="w-4 h-4" />, label: 'Notifications' },
                    { icon: <Lock className="w-4 h-4" />, label: 'Privacy & Security' },
                    { icon: <Settings className="w-4 h-4" />, label: 'Account Settings' },
                  ].map((item, i) => (
                    <button
                      key={item.label}
                      className="flex items-center justify-between px-5 py-4 w-full transition-colors hover:bg-[#f7faf7]"
                      style={i > 0 ? { borderTop: '1px solid #e8f0e8' } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <span style={{ color: '#186a22' }}>{item.icon}</span>
                        <span className="text-sm font-medium" style={{ color: '#0d2e10' }}>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" style={{ color: '#5a7a5c' }} />
                    </button>
                  ))}
                </div>
              </section>

              {/* Sign out */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-bold hover:opacity-80"
                style={{ background: 'rgba(255,245,235,0.9)', color: '#c0392b', border: '1px solid #fecaca' }}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>

            </div>{/* end left column */}

            {/* ── RIGHT COLUMN ── */}
            <div className="flex flex-col gap-6">

              {/* Patients section */}
              <section>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: '#ffffff', border: '1px solid #e8f0e8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  {patients.map((patient, i) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between px-5 py-4 hover:bg-[#f7faf7] transition-colors"
                      style={i > 0 ? { borderTop: '1px solid #e8f0e8' } : {}}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: '#e6f4e8', color: '#186a22' }}
                        >
                          {patient.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold" style={{ color: '#0d2e10' }}>{patient.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#5a7a5c' }}>{patient.sessionFrequency}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-xs font-semibold" style={{ color: '#5a7a5c' }}>Age {patient.age}</p>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full inline-block mt-1"
                            style={{ background: statusColors[patient.status].bg, color: statusColors[patient.status].text }}
                          >
                            {patient.status}
                          </span>
                        </div>
                        <button
                          onClick={() => deletePatient(patient.id)}
                          className="p-2 rounded-lg transition-colors hover:bg-red-50"
                          style={{ color: '#5a7a5c' }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Add patient row */}
                  <button
                    onClick={openAddPatient}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-[#f0f9f0]"
                    style={{ borderTop: '1px solid #e8f0e8', color: '#186a22' }}
                  >
                    <PlusCircle className="w-4 h-4" /> Add Patient
                  </button>
                </div>
              </section>

            </div>{/* end right column */}

          </div>{/* end grid */}
        </main>
      </div>
    </div>
  );
}
