import React, { useState } from 'react';
import {
  StudentRecord,
  StudentActivityLog,
  UserProfile,
  GradeLevel
} from '../types';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Star,
  Award,
  BookOpen,
  FileText,
  Video,
  Gamepad2,
  Heart,
  MessageSquare,
  Sparkles,
  Download,
  Send,
  Calendar,
  AlertCircle,
  HelpCircle,
  Printer
} from 'lucide-react';
import { soundManager } from '../services/soundEffects';
import { voiceGuideService } from '../services/voiceGuideService';
import { AudioNarratorButton } from './AudioNarratorButton';

interface StudentMonitoringDashboardProps {
  students: StudentRecord[];
  activeStudentId: string;
  userProfile: UserProfile;
  currentGrade: GradeLevel;
  onSelectStudent: (id: string) => void;
  onAddTeacherFeedback: (studentId: string, logId: string, feedback: string) => void;
  onAwardBonusStar: (studentId: string, amount: number, note: string) => void;
  onOpenCommunication?: () => void;
}

export const StudentMonitoringDashboard: React.FC<StudentMonitoringDashboardProps> = ({
  students,
  activeStudentId,
  userProfile,
  currentGrade,
  onSelectStudent,
  onAddTeacherFeedback,
  onAwardBonusStar,
  onOpenCommunication,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('semua');
  const [feedbackInput, setFeedbackInput] = useState<Record<string, string>>({});
  const [showFeedbackModalForLog, setShowFeedbackModalForLog] = useState<StudentActivityLog | null>(null);
  const [tempFeedbackText, setTempFeedbackText] = useState('');
  const [bonusStarSent, setBonusStarSent] = useState(false);

  // Active selected student
  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];

  // Filter students based on search and grade
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.nisn.includes(searchQuery);
    return matchesSearch;
  });

  // Filter logs for the active student
  const logs = activeStudent?.activityLogs || [];
  const filteredLogs = logs.filter(log => {
    if (selectedTypeFilter === 'semua') return true;
    return log.activityType === selectedTypeFilter;
  });

  // Calculate statistics for active student
  const totalStars = activeStudent?.progress.totalStars || 0;
  const streak = activeStudent?.progress.streakDays || 0;
  const completedMaterialsCount = activeStudent?.progress.completedMaterials.length || 0;
  const completedLkpdCount = activeStudent?.progress.completedLkpd.length || 0;
  const avgQuizScore = activeStudent?.progress.quizScores.length
    ? Math.round(
        activeStudent.progress.quizScores.reduce((acc, curr) => acc + curr.score, 0) /
        activeStudent.progress.quizScores.length
      )
    : 0;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'materi':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'lkpd':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'kuis':
        return <HelpCircle className="w-4 h-4 text-emerald-600" />;
      case 'video':
        return <Video className="w-4 h-4 text-rose-600" />;
      case 'game':
        return <Gamepad2 className="w-4 h-4 text-purple-600" />;
      case 'pendampingan_ortu':
        return <Heart className="w-4 h-4 text-pink-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-600" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case 'materi':
        return 'bg-blue-100 text-blue-800';
      case 'lkpd':
        return 'bg-amber-100 text-amber-800';
      case 'kuis':
        return 'bg-emerald-100 text-emerald-800';
      case 'video':
        return 'bg-rose-100 text-rose-800';
      case 'game':
        return 'bg-purple-100 text-purple-800';
      case 'pendampingan_ortu':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const handleGiveQuickStar = () => {
    soundManager.playFanfare();
    onAwardBonusStar(activeStudent.id, 10, 'Apresiasi guru atas ketekunan dan kerja sama belajar.');
    setBonusStarSent(true);
    voiceGuideService.speak(
      `Bintang apresiasi guru berhasil diberikan kepada ${activeStudent.name}. Orang tua dan siswa akan melihat penghargaan ini.`
    );
    setTimeout(() => setBonusStarSent(false), 2500);
  };

  const handleSaveFeedback = (logId: string) => {
    const text = feedbackInput[logId]?.trim();
    if (!text) return;
    soundManager.playStarSuccess();
    onAddTeacherFeedback(activeStudent.id, logId, text);
    voiceGuideService.speak(`Catatan evaluasi guru berhasil dikirimkan untuk kegiatan ${activeStudent.name}.`);
    setFeedbackInput(prev => ({ ...prev, [logId]: '' }));
  };

  const handleExportRecap = () => {
    soundManager.playChime();
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" /> Sistem Pemantauan Belajar Peserta Didik
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display">
            Pantauan Aktivitas Siswa oleh Guru
          </h2>
          <p className="text-white/90 text-sm mt-1 max-w-2xl">
            Guru dapat memantau pengerjaan materi, LKPD, video, kuis, dan keterlibatan orang tua sesuai nama masing-masing murid secara langsung.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-bold text-amber-200">
            <span>👩‍🏫 Guru Kelas: {userProfile.teacherName}</span>
            <span>•</span>
            <span>🏫 {userProfile.schoolName}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportRecap}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl border border-white/40 transition text-xs shadow-xs"
          >
            <Printer className="w-4 h-4" /> Cetak / Unduh Rekap
          </button>
          <button
            onClick={handleGiveQuickStar}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-2xl shadow-md transition active:scale-95 text-xs"
          >
            <Star className="w-4 h-4 fill-amber-900 text-amber-900" />
            +10 Bintang Apresiasi Guru
          </button>
        </div>
      </div>

      {bonusStarSent && (
        <div className="p-4 bg-amber-100 text-amber-900 border-2 border-amber-300 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-sm font-bold">
            🎉 +10 Bintang apresiasi guru berhasil dikirimkan ke akun <strong>{activeStudent.name}</strong>!
          </p>
        </div>
      )}

      {/* Main Grid: Student Selector (Left) & Detailed Activity Feed (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Student List & Search (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Daftar Peserta Didik
              </h3>
              <span className="text-2xs font-extrabold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">
                {students.length} Siswa
              </span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama siswa / NISN..."
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Student Cards List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredStudents.map((std) => {
                const isSelected = std.id === activeStudent.id;
                return (
                  <div
                    key={std.id}
                    onClick={() => {
                      onSelectStudent(std.id);
                      soundManager.playPop();
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition text-left flex items-start gap-3 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-200'
                        : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/70'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{std.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-extrabold text-xs text-slate-900 truncate">
                          {std.name}
                        </h4>
                        {isSelected && (
                          <span className="text-3xs font-black uppercase text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-md shrink-0">
                            Dipilih
                          </span>
                        )}
                      </div>
                      <p className="text-3xs text-slate-500 font-medium truncate mt-0.5">
                        NISN: {std.nisn} • Wali: {std.parentName}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-3xs font-bold text-slate-600">
                        <span className="flex items-center gap-0.5 text-amber-600">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {std.progress.totalStars}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-600">
                          {std.activityLogs.length} Aktivitas
                        </span>
                        <span>•</span>
                        <span className="text-blue-600">
                          Kehadiran {std.attendanceRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Summary Card of Class */}
          <div className="bg-amber-50/80 rounded-3xl p-5 border border-amber-200 text-xs space-y-2.5">
            <h4 className="font-black text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Pedoman Pemantauan Guru
            </h4>
            <p className="text-amber-900/90 leading-relaxed text-2xs">
              Gunakan fitur ini untuk memeriksa apakah ananda telah didampingi orang tua saat belajar di rumah, mengulas tugas LKPD digital, dan memberikan umpan balik hangat secara berkala.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Monitoring of Selected Student (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Selected Student Banner */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-blue-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900 flex items-center justify-center text-3xl shadow-md border-2 border-amber-300">
                {activeStudent.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg md:text-xl font-black text-slate-900 font-display">
                    {activeStudent.name}
                  </h3>
                  <span className="bg-emerald-100 text-emerald-800 text-3xs font-extrabold px-2 py-0.5 rounded-full">
                    Kelas {activeStudent.grade} SD
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  NISN: {activeStudent.nisn} • Orang Tua/Wali: <strong className="text-slate-700">{activeStudent.parentName}</strong>
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs font-bold">
                  <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {totalStars} Bintang
                  </span>
                  <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200">
                    🔥 {streak} Hari Berturut
                  </span>
                  <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
                    Rata-rata Kuis: {avgQuizScore}/100
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <AudioNarratorButton
                textToSpeak={`Data pantauan siswa untuk ${activeStudent.name}. Orang tua pendamping adalah ${activeStudent.parentName}. Total bintang diraih ${totalStars}, materi selesai ${completedMaterialsCount}, dan terdapat ${logs.length} catatan aktivitas pembelajaran.`}
                label="Dengarkan Ringkasan"
                variant="blue"
                size="sm"
              />
            </div>
          </div>

          {/* Activity Category Filters */}
          <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 overflow-x-auto text-xs">
              {[
                { id: 'semua', label: 'Semua Aktivitas' },
                { id: 'pendampingan_ortu', label: '👨‍👩‍👧 Pendampingan Ortu' },
                { id: 'lkpd', label: '📝 LKPD Siswa' },
                { id: 'kuis', label: '❓ Kuis Interaktif' },
                { id: 'video', label: '🎬 Video Belajar' },
                { id: 'game', label: '🎮 Game Edukasi' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedTypeFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                    selectedTypeFilter === f.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-2xs font-extrabold text-slate-500">
              Menampilkan {filteredLogs.length} rekaman
            </span>
          </div>

          {/* Activity Log Feed */}
          <div className="space-y-3.5">
            {filteredLogs.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-2">
                <p className="text-2xl">📋</p>
                <p className="font-bold text-slate-700 text-sm">
                  Belum ada rekaman aktivitas untuk kategori ini.
                </p>
                <p className="text-xs text-slate-400">
                  Aktivitas siswa akan otomatis tercatat saat siswa atau orang tua membuka materi, kuis, atau LKPD.
                </p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200 space-y-3 hover:border-blue-300 transition"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-100">
                        {getActivityIcon(log.activityType)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-3xs font-black uppercase px-2 py-0.5 rounded-md ${getActivityBadgeColor(log.activityType)}`}>
                            {log.subjectName}
                          </span>
                          <span className="text-3xs text-slate-400 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {log.timestamp}
                          </span>
                        </div>
                        <h4 className="font-black text-slate-900 text-sm mt-0.5">
                          {log.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {log.score !== undefined && (
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                          Skor: {log.score}/100
                        </span>
                      )}
                      <span className="text-2xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-500" /> +{log.starsEarned}
                      </span>
                    </div>
                  </div>

                  {/* Detail description */}
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                    {log.details}
                  </p>

                  {/* Parent Accompaniment Status & Note */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-2xs">
                    {log.accompaniedByParent ? (
                      <span className="inline-flex items-center gap-1.5 font-bold text-pink-700 bg-pink-50 px-2.5 py-1 rounded-xl border border-pink-200">
                        <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                        Didampingi Orang Tua ({activeStudent.parentName})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl">
                        👤 Belajar Mandiri
                      </span>
                    )}

                    {log.parentNote && (
                      <div className="w-full mt-1 p-3 bg-pink-50/60 rounded-xl border border-pink-200 text-pink-950">
                        <strong className="block text-3xs uppercase tracking-wider text-pink-800">
                          Catatan dari Orang Tua ({activeStudent.parentName}):
                        </strong>
                        <p className="italic text-xs mt-0.5">“{log.parentNote}”</p>
                      </div>
                    )}
                  </div>

                  {/* Teacher Feedback Section */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    {log.teacherFeedback ? (
                      <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-blue-950 flex items-start gap-2.5">
                        <span className="text-base">👩‍🏫</span>
                        <div className="text-xs">
                          <strong className="block font-black text-blue-900">
                            Umpan Balik Guru ({userProfile.teacherName}):
                          </strong>
                          <p className="mt-0.5 text-blue-800 leading-relaxed">
                            {log.teacherFeedback}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-3xs font-extrabold uppercase text-slate-500 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-blue-600" />
                          Beri Komentar & Evaluasi Guru untuk {activeStudent.name}:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={feedbackInput[log.id] || ''}
                            onChange={(e) => setFeedbackInput(prev => ({ ...prev, [log.id]: e.target.value }))}
                            placeholder="Tulis pujian atau catatan perkembangan untuk ananda & orang tua..."
                            className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium"
                          />
                          <button
                            onClick={() => handleSaveFeedback(log.id)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" /> Kirim
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
