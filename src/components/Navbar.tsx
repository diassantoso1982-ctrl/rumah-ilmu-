import React, { useState } from 'react';
import { UserRole, GradeLevel, UserProfile, StudentRecord } from '../types';
import {
  Menu,
  X,
  Star,
  Flame,
  BookOpen,
  FileText,
  Gamepad2,
  Video,
  HelpCircle,
  TrendingUp,
  Heart,
  School,
  Users,
  Settings,
  Info,
  ChevronDown,
  Volume2,
  UserCheck,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  totalStars: number;
  streakDays: number;
  userProfile: UserProfile;
  activeStudent: StudentRecord;
  onOpenAbout: () => void;
  onOpenVoiceGuide?: () => void;
  onOpenIdentitySettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  currentGrade,
  onSelectGrade,
  activeNav,
  onSelectNav,
  totalStars,
  streakDays,
  userProfile,
  activeStudent,
  onOpenAbout,
  onOpenVoiceGuide,
  onOpenIdentitySettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: string }[] = [
    { role: 'guru', label: 'Guru', icon: '👩‍🏫' },
    { role: 'orang_tua', label: 'Orang Tua', icon: '👨‍👩‍👧' },
    { role: 'siswa', label: 'Siswa', icon: '🧒' },
    { role: 'admin', label: 'Admin', icon: '⚙️' },
  ];

  const currentRoleObj = roles.find(r => r.role === currentRole) || roles[2];

  const navLinks = [
    { id: 'beranda', label: 'Beranda', icon: '🏠' },
    { id: 'materi', label: 'Materi', icon: '📚' },
    { id: 'lkpd', label: 'LKPD', icon: '📝' },
    { id: 'game', label: 'Game', icon: '🎮' },
    { id: 'video', label: 'Video', icon: '🎬' },
    { id: 'kuis', label: 'Kuis', icon: '❓' },
    { id: 'panduan_ortu', label: 'Panduan Ortu', icon: '👨‍👩‍👧' },
    { id: 'perkembangan', label: 'Perkembangan', icon: '📊' },
    ...(currentRole === 'guru' ? [{ id: 'ruang_guru', label: 'Ruang Guru', icon: '👩‍🏫' }] : []),
    ...(currentRole === 'admin' ? [{ id: 'admin', label: 'Dashboard Admin', icon: '⚙️' }] : []),
    { id: 'profil', label: 'Profil Siswa', icon: '👦' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectNav('beranda')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-2xl shadow-md border-2 border-amber-300 group-hover:scale-105 transition">
                🏠
              </div>
              <div>
                <span className="block text-xl font-black font-display tracking-tight text-slate-900 group-hover:text-amber-600 transition">
                  RUMAH ILMU
                </span>
                <span className="block text-3xs font-bold text-amber-700 tracking-wider">
                  TEMAN BELAJAR GURU, ORTU & ANAK
                </span>
              </div>
            </button>

            {/* Grade Badge Selector Dropdown */}
            <div className="hidden md:flex items-center gap-1 ml-3 bg-amber-50 px-2 py-1 rounded-xl border border-amber-200 text-xs">
              <span className="text-2xs font-extrabold text-amber-900 uppercase">Kelas:</span>
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <button
                  key={g}
                  onClick={() => onSelectGrade(g as GradeLevel)}
                  className={`w-6 h-6 rounded-lg font-black text-2xs transition ${
                    currentGrade === g
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-amber-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-extrabold">
            {navLinks.slice(0, 7).map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectNav(item.id)}
                className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  activeNav === item.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Header Action: Role Switcher & Stars */}
          <div className="flex items-center gap-2.5">
            {/* Gamification Stars & Streak */}
            <div className="hidden sm:flex items-center gap-2 bg-amber-50/80 px-3 py-1.5 rounded-2xl border border-amber-200 text-xs font-black">
              <span className="flex items-center gap-1 text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {totalStars}
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-orange-600">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                {streakDays} Hari
              </span>
            </div>

            {/* Identity Profile Badge (Nama Guru, Ortu & Siswa) */}
            {onOpenIdentitySettings && (
              <button
                onClick={onOpenIdentitySettings}
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-slate-800 text-xs font-bold border border-amber-200 transition shadow-2xs group"
                title="Kelola Nama Guru, Siswa, dan Orang Tua"
              >
                <div className="flex -space-x-1 text-sm">
                  <span>👩‍🏫</span>
                  <span>👨‍👩‍👧</span>
                  <span>{activeStudent.avatar || '👦'}</span>
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-3xs font-extrabold text-amber-900 uppercase">
                    Siswa: {activeStudent.name.split(' ')[0]}
                  </span>
                  <span className="block text-3xs text-slate-500 font-medium truncate max-w-[110px]">
                    {userProfile.teacherName.split(',')[0]}
                  </span>
                </div>
                <span className="text-3xs bg-amber-200 text-amber-900 font-black px-1.5 py-0.5 rounded-md group-hover:bg-amber-300">
                  Ubah
                </span>
              </button>
            )}

            {/* Quick Perintah Guru button when role is guru */}
            {currentRole === 'guru' && (
              <button
                onClick={() => onSelectNav('ruang_guru')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-xs transition active:scale-95"
                title="Tulis Perintah Guru untuk Buat Materi Kilat"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden md:inline">Perintah Guru</span>
              </button>
            )}

            {/* Audio Voice Guide Button */}
            {onOpenVoiceGuide && (
              <button
                onClick={onOpenVoiceGuide}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-black shadow-xs transition active:scale-95"
                title="Pemandu Suara Aplikasi"
              >
                <Volume2 className="w-4 h-4 text-slate-900" />
                <span className="hidden sm:inline">Pemandu Suara</span>
              </button>
            )}

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black border border-slate-300 transition"
              >
                <span>{currentRoleObj.icon}</span>
                <span className="uppercase">{currentRoleObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border-2 border-amber-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <p className="px-3 py-1 text-3xs font-extrabold uppercase tracking-wider text-slate-400">
                    Ganti Peran Pengguna:
                  </p>
                  {roles.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        onSelectRole(r.role);
                        setRoleDropdownOpen(false);
                        if (r.role === 'guru') onSelectNav('ruang_guru');
                        if (r.role === 'orang_tua') onSelectNav('panduan_ortu');
                        if (r.role === 'siswa') onSelectNav('materi');
                        if (r.role === 'admin') onSelectNav('admin');
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center gap-2 hover:bg-amber-50 ${
                        currentRole === r.role ? 'text-amber-600 bg-amber-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span className="text-base">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Modal trigger button */}
            <button
              onClick={onOpenAbout}
              className="hidden sm:flex p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              title="Tentang Rumah Ilmu"
            >
              <Info className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-amber-200 p-4 space-y-3 animate-in slide-in-from-top-2">
          {/* Mobile Grade selector */}
          <div className="p-3 bg-amber-50 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-black text-amber-900">PILIH KELAS SD:</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    onSelectGrade(g as GradeLevel);
                  }}
                  className={`w-7 h-7 rounded-xl font-bold text-xs ${
                    currentGrade === g ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectNav(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-left flex items-center gap-2 ${
                  activeNav === item.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-50 text-slate-800'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {onOpenVoiceGuide && (
            <button
              onClick={() => {
                onOpenVoiceGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Buka Pemandu Suara Aplikasi 🎙️</span>
            </button>
          )}

          <button
            onClick={() => {
              onOpenAbout();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 text-center text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            ℹ️ Tentang Rumah Ilmu
          </button>
        </div>
      )}
    </header>
  );
};
