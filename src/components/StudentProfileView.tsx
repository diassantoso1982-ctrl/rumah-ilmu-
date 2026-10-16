import React from 'react';
import { StudentRecord, UserProfile, GradeLevel } from '../types';
import {
  Star,
  Flame,
  Trophy,
  Award,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Heart,
  User,
  Users,
  School,
  Clock,
  Sparkles,
  Edit3
} from 'lucide-react';
import { AudioNarratorButton } from './AudioNarratorButton';

interface StudentProfileViewProps {
  student: StudentRecord;
  userProfile: UserProfile;
  grade: GradeLevel;
  onOpenMaterial?: (id: string) => void;
  onOpenIdentitySettings?: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  student,
  userProfile,
  grade,
  onOpenMaterial,
  onOpenIdentitySettings,
}) => {
  const { progress } = student;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-amber-200 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 text-slate-900 flex items-center justify-center text-4xl shadow-md border-4 border-amber-200">
            {student.avatar || '👦'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 font-display">
                {student.name}
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-2xs font-bold px-2.5 py-0.5 rounded-full">
                Siswa Aktif
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              NISN: {student.nisn} • Kelas {student.grade || grade} SD • {userProfile.schoolName}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {progress.totalStars} Bintang
              </span>
              <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> {progress.streakDays} Hari Streak
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {onOpenIdentitySettings && (
            <button
              onClick={onOpenIdentitySettings}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl transition"
            >
              <Edit3 className="w-3.5 h-3.5" /> Ganti / Atur Nama
            </button>
          )}
          <AudioNarratorButton
            textToSpeak={`Profil peserta didik ${student.name}, didampingi oleh orang tua ${student.parentName}, dan dibimbing oleh ${userProfile.teacherName}. Total bintang ${progress.totalStars}.`}
            label="Dengarkan Profil"
            variant="amber"
            size="sm"
          />
        </div>
      </div>

      {/* Tri Sentra Pendidikan: Identitas Guru, Orang Tua & Murid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Guru */}
        <div className="bg-blue-50/70 p-5 rounded-3xl border-2 border-blue-200 space-y-2">
          <div className="flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-wider">
            <span className="text-xl">👩‍🏫</span>
            <span>Guru Pembimbing</span>
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm">
            {userProfile.teacherName}
          </h4>
          <p className="text-3xs text-blue-800 font-medium leading-relaxed">
            Wali Kelas & Pendidik aktif di {userProfile.schoolName}. Memantau aktivitas belajar ananda.
          </p>
        </div>

        {/* Orang Tua */}
        <div className="bg-rose-50/70 p-5 rounded-3xl border-2 border-rose-200 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-black text-xs uppercase tracking-wider">
            <span className="text-xl">👨‍👩‍👧</span>
            <span>Orang Tua / Wali</span>
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm">
            {student.parentName || userProfile.parentName}
          </h4>
          <p className="text-3xs text-rose-800 font-medium leading-relaxed">
            Mitra setia di rumah dalam mendampingi aktivitas 10-15 menit dan memberikan afirmasi positif.
          </p>
        </div>

        {/* Target Murid */}
        <div className="bg-emerald-50/70 p-5 rounded-3xl border-2 border-emerald-200 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-black text-xs uppercase tracking-wider">
            <span className="text-xl">🎯</span>
            <span>Fokus Belajar Minggu Ini</span>
          </div>
          <h4 className="font-extrabold text-slate-900 text-sm">
            Numerasi & Eksplorasi Sains
          </h4>
          <p className="text-3xs text-emerald-800 font-medium leading-relaxed">
            Menuntaskan LKPD pecahan konkret dan eksperimen daun hijau bersama keluarga di rumah.
          </p>
        </div>
      </div>

      {/* Rekaman Aktivitas Belajar Terbaru Siswa */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Riwayat Aktivitas Belajar ({student.activityLogs.length} Kegiatan Tercatat)
          </h3>
          <span className="text-2xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Terkoneksi Pantauan Guru
          </span>
        </div>

        <div className="space-y-3">
          {student.activityLogs.map((act) => (
            <div
              key={act.id}
              className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-100 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-3xs font-extrabold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
                    {act.subjectName}
                  </span>
                  <span className="text-3xs text-slate-400 font-semibold">{act.timestamp}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{act.title}</h4>
                <p className="text-xs text-slate-600">{act.details}</p>
                {act.teacherFeedback && (
                  <p className="text-3xs text-blue-700 bg-blue-50 p-2 rounded-xl border border-blue-100 mt-1">
                    👩‍🏫 <strong>Catatan Guru:</strong> “{act.teacherFeedback}”
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {act.score !== undefined && (
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    Nilai: {act.score}
                  </span>
                )}
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> +{act.starsEarned}
                </span>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lencana Siswa */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Koleksi Lencana Penghargaan
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {progress.badges.map((b) => (
            <div key={b.id} className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200 text-center">
              <span className="text-3xl">{b.icon}</span>
              <h5 className="font-extrabold text-xs text-slate-900 mt-1">{b.title}</h5>
              <p className="text-3xs text-slate-500 mt-0.5">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Keamanan & Privasi Note */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-600 text-2xs flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-slate-500 shrink-0" />
        <p>
          <strong>Keamanan & Privasi Terjaga:</strong> Data perkembangan ananda dilindungi dan dipantau langsung oleh guru kelas ({userProfile.teacherName}) serta orang tua ({student.parentName}). Rumah Ilmu fokus pada pertumbuhan pribadi dan rasa percaya diri setiap anak.
        </p>
      </div>
    </div>
  );
};
