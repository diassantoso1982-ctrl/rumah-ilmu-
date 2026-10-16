import React from 'react';
import { UserRole, GradeLevel, DailyLearningRecommendation, UserProfile, StudentRecord } from '../types';
import {
  BookOpen,
  FileText,
  Gamepad2,
  Video,
  HelpCircle,
  TrendingUp,
  Lightbulb,
  Sparkles,
  Heart,
  CheckCircle2,
  ArrowRight,
  School,
  Users,
  Compass,
  Star,
  Edit3
} from 'lucide-react';

interface HomeHeroProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onSelectNav: (tab: string) => void;
  onSelectRuang: (ruangSubjectId: string, customNav?: string) => void;
  dailyTasks: DailyLearningRecommendation[];
  onToggleDailyTask: (id: string) => void;
  onOpenAbout: () => void;
  onOpenVoiceGuide?: () => void;
  userProfile?: UserProfile;
  activeStudent?: StudentRecord;
  onOpenIdentitySettings?: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  currentRole,
  onSelectRole,
  onSelectNav,
  onSelectRuang,
  dailyTasks,
  onToggleDailyTask,
  onOpenAbout,
  onOpenVoiceGuide,
  userProfile,
  activeStudent,
  onOpenIdentitySettings,
}) => {
  const completedTaskCount = dailyTasks.filter(t => t.completed).length;

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-6 md:p-10 text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-black uppercase tracking-wider backdrop-blur-xs">
            <span className="text-base">🏠</span>
            <span>Platform Edukasi Terpadu Kelas 1–6 SD</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
            RUMAH ILMU
          </h1>

          <p className="text-lg md:text-xl font-bold text-amber-100">
            “Teman Belajar Guru, Orang Tua, dan Anak”
          </p>

          <p className="text-sm md:text-base text-white/95 font-medium leading-relaxed max-w-2xl">
            Belajar di sekolah, lanjutkan di rumah. Menghubungkan bimbingan guru yang terarah, eksplorasi belajar anak yang riang, dan kehangatan pendampingan orang tua.
          </p>

          {/* Role Quick Selector Cards */}
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-100 mb-2">
              Pilih Peranmu Sekarang:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => {
                  onSelectRole('guru');
                  onSelectNav('ruang_guru');
                }}
                className={`p-3.5 rounded-2xl text-left border-2 transition active:scale-95 flex items-center gap-3 ${
                  currentRole === 'guru'
                    ? 'bg-white text-slate-900 border-white shadow-lg'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                }`}
              >
                <span className="text-3xl">👩‍🏫</span>
                <div>
                  <h4 className="font-extrabold text-sm">GURU</h4>
                  <p className="text-2xs opacity-80">Modul, LKPD & AI</p>
                </div>
              </button>

              <button
                onClick={() => {
                  onSelectRole('orang_tua');
                  onSelectNav('panduan_ortu');
                }}
                className={`p-3.5 rounded-2xl text-left border-2 transition active:scale-95 flex items-center gap-3 ${
                  currentRole === 'orang_tua'
                    ? 'bg-white text-slate-900 border-white shadow-lg'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                }`}
              >
                <span className="text-3xl">👨‍👩‍👧</span>
                <div>
                  <h4 className="font-extrabold text-sm">ORANG TUA</h4>
                  <p className="text-2xs opacity-80">Panduan 10–15 Mnt</p>
                </div>
              </button>

              <button
                onClick={() => {
                  onSelectRole('siswa');
                  onSelectNav('materi');
                }}
                className={`p-3.5 rounded-2xl text-left border-2 transition active:scale-95 flex items-center gap-3 ${
                  currentRole === 'siswa'
                    ? 'bg-white text-slate-900 border-white shadow-lg'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                }`}
              >
                <span className="text-3xl">🧒</span>
                <div>
                  <h4 className="font-extrabold text-sm">SISWA</h4>
                  <p className="text-2xs opacity-80">Materi, Video & Game</p>
                </div>
              </button>
            </div>

            {/* Voice Guide Quick Launch Bar */}
            <div className="pt-3 flex flex-wrap items-center gap-2">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-amber-100 flex items-center gap-1">
                <span>🔊</span> Pemandu Suara:
              </span>
              <button
                onClick={() => {
                  onSelectRole('guru');
                  onSelectNav('ruang_guru');
                  if (onOpenVoiceGuide) onOpenVoiceGuide();
                }}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-2xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>👩‍🏫</span>
                <span>Pemandu Guru</span>
              </button>
              <button
                onClick={() => {
                  onSelectRole('orang_tua');
                  onSelectNav('panduan_ortu');
                  if (onOpenVoiceGuide) onOpenVoiceGuide();
                }}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-2xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>👨‍👩‍👧</span>
                <span>Pemandu Orang Tua</span>
              </button>
              <button
                onClick={() => {
                  onSelectRole('siswa');
                  onSelectNav('materi');
                  if (onOpenVoiceGuide) onOpenVoiceGuide();
                }}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-2xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>🧒</span>
                <span>Pemandu Murid</span>
              </button>
              {onOpenVoiceGuide && (
                <button
                  onClick={onOpenVoiceGuide}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-300 text-slate-900 font-black text-2xs transition hover:bg-amber-200 flex items-center gap-1 shadow-md cursor-pointer ml-auto"
                >
                  <span>🎙️</span>
                  <span>Buka Tur Suara Lengkap →</span>
                </button>
              )}
            </div>

            {/* Tri Sentra Pendidikan: Profil Guru, Siswa & Orang Tua */}
            {userProfile && activeStudent && (
              <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 bg-black/15 backdrop-blur-xs p-3 rounded-2xl">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">👩‍🏫</span>
                    <div>
                      <span className="block text-3xs text-amber-200 uppercase font-black">Guru:</span>
                      <strong className="text-white text-xs">{userProfile.teacherName}</strong>
                    </div>
                  </div>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{activeStudent.avatar || '👦'}</span>
                    <div>
                      <span className="block text-3xs text-amber-200 uppercase font-black">Siswa Aktif:</span>
                      <strong className="text-white text-xs">{activeStudent.name}</strong>
                    </div>
                  </div>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">👨‍👩‍👧</span>
                    <div>
                      <span className="block text-3xs text-amber-200 uppercase font-black">Wali / Ortu:</span>
                      <strong className="text-white text-xs">{activeStudent.parentName || userProfile.parentName}</strong>
                    </div>
                  </div>
                </div>

                {onOpenIdentitySettings && (
                  <button
                    onClick={onOpenIdentitySettings}
                    className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white font-bold text-2xs rounded-xl transition cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Ganti / Atur Nama</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Floating Background Accent Shapes */}
        <div className="absolute -bottom-8 -right-8 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Teacher Quick Command Callout Banner */}
      {currentRole === 'guru' && (
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-4 md:p-5 text-slate-950 shadow-lg flex flex-wrap items-center justify-between gap-3 border-2 border-amber-300">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/60 flex items-center justify-center text-xl shadow-xs">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-slate-950 text-amber-300 text-3xs font-black px-2 py-0.5 rounded-full uppercase">
                  Perintah Guru Aktif
                </span>
                <span className="text-xs font-black text-slate-900">
                  Respon Kilat AI Rumah Ilmu
                </span>
              </div>
              <p className="text-xs text-slate-900/90 font-medium mt-0.5">
                Ketik instruksi atau topik mata pelajaran apa saja, AI langsung menyusun materi, kuis, dan panduan ortu dalam hitungan detik.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectNav('ruang_guru')}
            className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md transition active:scale-95 flex items-center gap-2"
          >
            <span>🚀 Tulis Perintah Guru Sekarang</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      )}

      {/* Quick Feature Action Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
        {[
          { id: 'materi', label: 'Materi', icon: '📚', color: 'hover:border-emerald-400 bg-emerald-50 text-emerald-900' },
          { id: 'lkpd', label: 'LKPD', icon: '📝', color: 'hover:border-amber-400 bg-amber-50 text-amber-900' },
          { id: 'game', label: 'Game Edukasi', icon: '🎮', color: 'hover:border-purple-400 bg-purple-50 text-purple-900' },
          { id: 'video', label: 'Video', icon: '🎬', color: 'hover:border-red-400 bg-red-50 text-red-900' },
          { id: 'kuis', label: 'Kuis', icon: '❓', color: 'hover:border-blue-400 bg-blue-50 text-blue-900' },
          { id: 'perkembangan', label: 'Perkembangan', icon: '📊', color: 'hover:border-teal-400 bg-teal-50 text-teal-900' },
          { id: 'panduan_ortu', label: 'Tips Belajar', icon: '💡', color: 'hover:border-pink-400 bg-pink-50 text-pink-900' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => onSelectNav(btn.id)}
            className={`p-3.5 rounded-2xl border-2 border-slate-200/80 transition active:scale-95 text-center flex flex-col items-center justify-center gap-1.5 shadow-2xs ${btn.color}`}
          >
            <span className="text-2xl">{btn.icon}</span>
            <span className="font-extrabold text-xs">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* 14. FITUR: REKOMENDASI BELAJAR HARI INI */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-amber-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🌟</span>
            <div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 font-display">
                BELAJAR HARI INI
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Target belajar ringan & realistis untuk menjaga ritme belajar menyenangkan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            <span className="text-xs font-bold text-amber-800">
              {completedTaskCount} dari {dailyTasks.length} Tuntas
            </span>
            <div className="w-16 bg-amber-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(completedTaskCount / dailyTasks.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {dailyTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => onToggleDailyTask(task.id)}
              className={`p-4 rounded-2xl border-2 text-left transition active:scale-98 flex flex-col justify-between ${
                task.completed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-black text-slate-400">⏱️ {task.duration}</span>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  task.completed ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300'
                }`}>
                  {task.completed && '✓'}
                </span>
              </div>
              <p className={`text-xs font-bold leading-snug ${task.completed ? 'line-through text-emerald-800' : ''}`}>
                {task.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* METAFORA RUMAH ILMU: RUANGAN-RUANGAN RUMAH */}
      <div className="bg-gradient-to-b from-amber-50/70 to-orange-50/40 rounded-3xl p-6 md:p-8 border-2 border-amber-200 space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-black text-amber-800 uppercase tracking-wider bg-amber-200/80 px-3 py-1 rounded-full">
            Jelajah Rumah Belajar
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display">
            🏡 Ruangan-Ruangan di Rumah Ilmu
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            Setiap sudut rumah dirancang khusus untuk mengasah berbagai potensi kecerdasan ananda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {/* 1. Ruang Literasi */}
          <div
            onClick={() => onSelectRuang('b_indonesia', 'materi')}
            className="group cursor-pointer bg-white p-5 rounded-3xl border-2 border-emerald-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition">
              📖
            </div>
            <h4 className="font-black text-slate-900 text-base">Ruang Literasi</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Membaca nyaring, memperkaya kosakata, dongeng fabel, dan menulis cerita kreatif.
            </p>
            <span className="inline-flex items-center gap-1 text-2xs font-bold text-emerald-600 mt-3 group-hover:translate-x-1 transition">
              Masuk ke Ruangan →
            </span>
          </div>

          {/* 2. Ruang Numerasi */}
          <div
            onClick={() => onSelectRuang('matematika', 'materi')}
            className="group cursor-pointer bg-white p-5 rounded-3xl border-2 border-blue-200 shadow-xs hover:shadow-md hover:border-blue-400 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition">
              🔢
            </div>
            <h4 className="font-black text-slate-900 text-base">Ruang Numerasi</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Logika angka, pecahan senilai, geometri bangun ruang, dan tantangan matematika nyata.
            </p>
            <span className="inline-flex items-center gap-1 text-2xs font-bold text-blue-600 mt-3 group-hover:translate-x-1 transition">
              Masuk ke Ruangan →
            </span>
          </div>

          {/* 3. Ruang Sains */}
          <div
            onClick={() => onSelectRuang('ipas', 'materi')}
            className="group cursor-pointer bg-white p-5 rounded-3xl border-2 border-amber-200 shadow-xs hover:shadow-md hover:border-amber-400 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition">
              🌱
            </div>
            <h4 className="font-black text-slate-900 text-base">Ruang Sains (IPAS)</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Fotosintesis, ekosistem alam, eksperimen daun, energi, dan keajaiban bumi.
            </p>
            <span className="inline-flex items-center gap-1 text-2xs font-bold text-amber-600 mt-3 group-hover:translate-x-1 transition">
              Masuk ke Ruangan →
            </span>
          </div>

          {/* 4. Ruang Kreativitas */}
          <div
            onClick={() => onSelectRuang('seni', 'materi')}
            className="group cursor-pointer bg-white p-5 rounded-3xl border-2 border-purple-200 shadow-xs hover:shadow-md hover:border-purple-400 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition">
              🎨
            </div>
            <h4 className="font-black text-slate-900 text-base">Ruang Kreativitas</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Seni rupa, prakarya, melipat kertas origami, koding dasar, dan karya imajinatif.
            </p>
            <span className="inline-flex items-center gap-1 text-2xs font-bold text-purple-600 mt-3 group-hover:translate-x-1 transition">
              Masuk ke Ruangan →
            </span>
          </div>

          {/* 5. Ruang Karakter */}
          <div
            onClick={() => onSelectRuang('pancasila', 'materi')}
            className="group cursor-pointer bg-white p-5 rounded-3xl border-2 border-rose-200 shadow-xs hover:shadow-md hover:border-rose-400 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition">
              ❤️
            </div>
            <h4 className="font-black text-slate-900 text-base">Ruang Karakter</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Gotong royong, adab santun, cinta tanah air, toleransi, dan budi pekerti luhur.
            </p>
            <span className="inline-flex items-center gap-1 text-2xs font-bold text-rose-600 mt-3 group-hover:translate-x-1 transition">
              Masuk ke Ruangan →
            </span>
          </div>

          {/* 6. Ruang Bermain */}
          <div
            onClick={() => onSelectNav('game')}
            className="group cursor-pointer bg-white p-5 rounded-3xl border-2 border-pink-200 shadow-xs hover:shadow-md hover:border-pink-400 transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition">
              🎮
            </div>
            <h4 className="font-black text-slate-900 text-base">Ruang Bermain</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Roda kuis angka, tebak susun kata kosa kata, detektif konsep, dan dadu kebaikan.
            </p>
            <span className="inline-flex items-center gap-1 text-2xs font-bold text-pink-600 mt-3 group-hover:translate-x-1 transition">
              Mulai Bermain →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
