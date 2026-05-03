import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Lock,
  ChevronRight,
  PlusCircle,
  LogOut,
  Pencil,
  BarChart2,
  TrendingUp,
  Zap,
  User,
  X,
  Check,
} from 'lucide-react';

type Child = {
  name: string;
  age: number;
  gender: 'boy' | 'girl' | 'other';
};

const genderOptions: { value: Child['gender']; label: string; emoji: string }[] = [
  { value: 'boy', label: 'Boy', emoji: '👦' },
  { value: 'girl', label: 'Girl', emoji: '👧' },
  { value: 'other', label: 'Other', emoji: '🧒' },
];

type ModalMode = 'add' | 'edit';

function ChildIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#186a22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
}

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
            item.label === active
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

export default function ParentProfile() {
  const navigate = useNavigate();

  const [children, setChildren] = useState<Child[]>([
    { name: 'Leo', age: 5, gender: 'boy' },
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('add');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number | ''>('');
  const [newGender, setNewGender] = useState<Child['gender'] | null>(null);
  const [errors, setErrors] = useState<{ name?: string; age?: string; gender?: string }>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function openAdd() {
    setModalMode('add');
    setEditIndex(null);
    setNewName('');
    setNewAge('');
    setNewGender(null);
    setErrors({});
    setShowDeleteConfirm(false);
    setShowModal(true);
  }

  function openEdit(index: number) {
    const child = children[index];
    setModalMode('edit');
    setEditIndex(index);
    setNewName(child.name);
    setNewAge(child.age);
    setNewGender(child.gender);
    setErrors({});
    setShowDeleteConfirm(false);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setShowDeleteConfirm(false);
  }

  function validate() {
    const errs: typeof errors = {};
    if (!newName.trim()) errs.name = 'Name is required';
    if (newAge === '' || Number(newAge) < 1 || Number(newAge) > 18) errs.age = 'Enter a valid age (1–18)';
    if (!newGender) errs.gender = 'Please select a gender';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleAdd() {
    if (!validate()) return;
    setChildren((prev) => [...prev, { name: newName.trim(), age: Number(newAge), gender: newGender! }]);
    closeModal();
  }

  function handleSave() {
    if (!validate()) return;
    setChildren((prev) =>
      prev.map((c, i) => i === editIndex ? { name: newName.trim(), age: Number(newAge), gender: newGender! } : c)
    );
    closeModal();
  }

  function handleDelete() {
    setChildren((prev) => prev.filter((_, i) => i !== editIndex));
    closeModal();
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #c8e6c8 0%, #d8eed8 40%, #e8f4e8 100%)' }}
    >
      {/* ── ADD / EDIT CHILD MODAL ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6 space-y-5"
            style={{ background: '#ffffff', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold" style={{ color: '#0d2e10' }}>
                {modalMode === 'add' ? 'Add a child' : `Edit ${newName || 'child'}`}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
              >
                <X className="w-4 h-4" style={{ color: '#5a7a5c' }} />
              </button>
            </div>

            {/* Delete confirmation inline */}
            {showDeleteConfirm ? (
              <div className="space-y-4">
                <p className="text-sm text-center" style={{ color: '#5a7a5c' }}>
                  Remove <strong style={{ color: '#0d2e10' }}>{newName}</strong> from your family?
                  This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-3 rounded-full text-sm font-semibold"
                    style={{ background: '#f0f9f0', color: '#5a7a5c' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 py-3 rounded-full text-sm font-bold text-white"
                    style={{ background: '#c0392b' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>
                    Child's name
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => { setNewName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                    placeholder="e.g. Emma"
                    className="w-full px-4 py-3 rounded-2xl text-sm font-medium outline-none transition-all"
                    style={{
                      background: '#f0f9f0',
                      border: errors.name ? '1.5px solid #e53e3e' : '1.5px solid transparent',
                      color: '#0d2e10',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#186a22'; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.name ? '#e53e3e' : 'transparent'; }}
                  />
                  {errors.name && <p className="text-xs" style={{ color: '#e53e3e' }}>{errors.name}</p>}
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>
                    Age
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNewAge((v) => Math.max(1, Number(v || 1) - 1))}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                      style={{ background: '#e6f4e8', color: '#186a22' }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={18}
                      value={newAge}
                      onChange={(e) => { setNewAge(e.target.value === '' ? '' : Number(e.target.value)); setErrors((p) => ({ ...p, age: undefined })); }}
                      placeholder="—"
                      className="flex-1 text-center px-4 py-3 rounded-2xl text-sm font-bold outline-none transition-all"
                      style={{
                        background: '#f0f9f0',
                        border: errors.age ? '1.5px solid #e53e3e' : '1.5px solid transparent',
                        color: '#0d2e10',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#186a22'; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.age ? '#e53e3e' : 'transparent'; }}
                    />
                    <button
                      type="button"
                      onClick={() => setNewAge((v) => Math.min(18, Number(v || 0) + 1))}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                      style={{ background: '#e6f4e8', color: '#186a22' }}
                    >
                      +
                    </button>
                  </div>
                  {errors.age && <p className="text-xs" style={{ color: '#e53e3e' }}>{errors.age}</p>}
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#5a7a5c' }}>
                    Gender
                  </label>
                  <div className="flex gap-2">
                    {genderOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => { setNewGender(opt.value); setErrors((p) => ({ ...p, gender: undefined })); }}
                        className="flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl text-xs font-semibold transition-all"
                        style={
                          newGender === opt.value
                            ? { background: '#186a22', color: '#ffffff', boxShadow: '0 2px 8px rgba(24,106,34,0.30)' }
                            : { background: '#f0f9f0', color: '#5a7a5c' }
                        }
                      >
                        <span className="text-xl">{opt.emoji}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {errors.gender && <p className="text-xs" style={{ color: '#e53e3e' }}>{errors.gender}</p>}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  {modalMode === 'edit' ? (
                    <>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="py-3 px-4 rounded-full text-sm font-semibold transition-colors"
                        style={{ background: '#fff0ee', color: '#c0392b' }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex-1 py-3 rounded-full text-sm font-bold text-white flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
                        style={{ background: 'linear-gradient(90deg, #186a22 0%, #2d9e3a 100%)', boxShadow: '0 4px 14px rgba(24,106,34,0.30)' }}
                      >
                        <Check className="w-4 h-4" /> Save changes
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={closeModal}
                        className="flex-1 py-3 rounded-full text-sm font-semibold"
                        style={{ background: '#f0f9f0', color: '#5a7a5c' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAdd}
                        className="flex-1 py-3 rounded-full text-sm font-bold text-white flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
                        style={{ background: 'linear-gradient(90deg, #186a22 0%, #2d9e3a 100%)', boxShadow: '0 4px 14px rgba(24,106,34,0.30)' }}
                      >
                        <Check className="w-4 h-4" /> Add child
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto px-5 pt-10 pb-32 max-w-lg mx-auto w-full space-y-6">

        {/* Page header */}
        <div className="text-center space-y-1 mb-2">
          <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: '#0d2e10' }}>
            Your Profile
          </h1>
          <p className="text-sm" style={{ color: '#5a7a5c' }}>
            Manage your account and family tree
          </p>
        </div>

        {/* Profile card */}
        <div
          className="rounded-3xl p-6 flex flex-col items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
        >
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
              style={{ background: '#c8e6c8', border: '3px solid #ffffff' }}
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
          <div className="text-center">
            <p className="text-lg font-extrabold" style={{ color: '#0d2e10' }}>Sarah Miller</p>
            <p className="text-sm" style={{ color: '#5a7a5c' }}>sarah.miller@example.com</p>
          </div>
          <button
            className="w-full py-3 rounded-full text-white text-sm font-bold mt-1 transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, #186a22 0%, #2d9e3a 100%)', boxShadow: '0 4px 14px rgba(24,106,34,0.35)' }}
          >
            Edit Profile
          </button>
        </div>

        {/* Family section */}
        <section>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: '#5a7a5c' }}>
            Family
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            {children.map((child, i) => (
              <button
                key={i}
                onClick={() => openEdit(i)}
                className="flex items-center justify-between px-4 py-3.5 w-full transition-colors hover:bg-white/40"
                style={i > 0 ? { borderTop: '1px solid rgba(0,0,0,0.06)' } : {}}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#d4ead4' }}
                  >
                    <ChildIcon />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#0d2e10' }}>{child.name}</p>
                    <p className="text-xs" style={{ color: '#5a7a5c' }}>
                      {child.age} year{child.age !== 1 ? 's' : ''} old &bull; {genderOptions.find(g => g.value === child.gender)?.label}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: '#5a7a5c' }} />
              </button>
            ))}

            {/* Add child button */}
            <button
              onClick={openAdd}
              className="flex items-center gap-3 px-4 py-3.5 w-full transition-colors hover:bg-white/40"
              style={{ borderTop: children.length > 0 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}
            >
              <PlusCircle className="w-5 h-5" style={{ color: '#186a22' }} />
              <span className="text-sm font-medium" style={{ color: '#186a22' }}>Add another child</span>
            </button>
          </div>
        </section>

        {/* Preferences section */}
        <section>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1" style={{ color: '#5a7a5c' }}>
            Preferences
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            {[
              { icon: <Bell className="w-4 h-4" />, label: 'Notifications' },
              { icon: <Lock className="w-4 h-4" />, label: 'Privacy & Security' },
            ].map((item, i) => (
              <button
                key={item.label}
                className="flex items-center justify-between px-4 py-4 w-full transition-colors hover:bg-white/40"
                style={i > 0 ? { borderTop: '1px solid rgba(0,0,0,0.06)' } : {}}
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

        {/* Log Out */}
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 rounded-full flex items-center justify-center gap-2 text-sm font-bold transition-opacity hover:opacity-80"
          style={{ background: 'rgba(255, 245, 235, 0.85)', color: '#c0392b', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>

      </main>

      <BottomNav active="Profile" />
    </div>
  );
}
