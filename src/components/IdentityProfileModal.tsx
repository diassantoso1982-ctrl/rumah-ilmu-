import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  Heart,
  School,
  CheckCircle2,
  Sparkles,
  Users,
  ShieldCheck,
  Save
} from 'lucide-react';
import { UserProfile, StudentRecord, UserRole } from '../types';
import { soundManager } from '../services/soundEffects';
import { voiceGuideService } from '../services/voiceGuideService';

interface IdentityProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  students: StudentRecord[];
  currentRole: UserRole;
  onUpdateProfile: (newProfile: UserProfile) => void;
  onSelectStudent: (studentId: string) => void;
}

export const IdentityProfileModal: React.FC<IdentityProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  students,
  currentRole,
  onUpdateProfile,
  onSelectStudent,
}) => {
  const [teacherName, setTeacherName] = useState(profile.teacherName);
  const [parentName, setParentName] = useState(profile.parentName);
  const [schoolName, setSchoolName] = useState(profile.schoolName);
  const [activeStudentId, setActiveStudentId] = useState(profile.activeStudentId);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const currentStudent = students.find(s => s.id === activeStudentId) || students[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playStarSuccess();
    onUpdateProfile({
      teacherName: teacherName.trim() || 'Ibu Ratna Dewi, S.Pd.',
      parentName: parentName.trim() || 'Ibu Siti Rahmawati (Bunda)',
      schoolName: schoolName.trim() || 'SD Negeri Cempaka 01',
      activeStudentId,
    });
    onSelectStudent(activeStudentId);
    setSavedSuccess(true);
    voiceGuideService.speak(
      `Profil identitas berhasil disimpan. Guru: ${teacherName}, Orang Tua: ${parentName}, dan Siswa aktif: ${currentStudent?.name}.`
    );
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border-4 border-amber-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-2xs font-black uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" /> Profil Kemitraan Pendidikan
          </div>
          <h2 className="text-xl md:text-2xl font-black font-display">
            Pengaturan Identitas Belajar
          </h2>
          <p className="text-amber-100 text-xs mt-1">
            Cantumkan nama Guru, Orang Tua, dan Murid agar kegiatan & pantauan belajar tercatat rapi secara personal.
          </p>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5">
          {savedSuccess && (
            <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Data Guru, Orang Tua, dan Siswa berhasil disimpan!</span>
            </div>
          )}

          {/* 1. Nama Guru */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-black text-slate-800">
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                👩‍🏫
              </div>
              <span>Nama Lengkap Guru / Pendidik:</span>
            </label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Contoh: Ibu Ratna Dewi, S.Pd."
              className="w-full text-sm font-bold p-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:outline-none transition"
              required
            />
            <p className="text-3xs text-slate-400 font-semibold pl-1">
              Nama ini akan tampil di modul ajar, lembar LKPD, dan catatan pemantauan siswa.
            </p>
          </div>

          {/* 2. Nama Orang Tua */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-black text-slate-800">
              <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center text-xs">
                👨‍👩‍👧
              </div>
              <span>Nama Orang Tua / Wali Murid:</span>
            </label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Contoh: Ibu Siti Rahmawati (Bunda Faiz)"
              className="w-full text-sm font-bold p-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-rose-500 focus:outline-none transition"
              required
            />
            <p className="text-3xs text-slate-400 font-semibold pl-1">
              Digunakan saat memberi apresiasi bintang pendampingan dan pesan komunikasi ke guru.
            </p>
          </div>

          {/* 3. Nama Sekolah */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-black text-slate-800">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                🏫
              </div>
              <span>Nama Satuan Pendidikan / Sekolah:</span>
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Contoh: SD Negeri Cempaka 01"
              className="w-full text-sm font-bold p-3 rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition"
            />
          </div>

          {/* 4. Pilihan Siswa / Murid Aktif */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="flex items-center justify-between text-xs font-black text-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                  👦
                </div>
                <span>Nama Peserta Didik / Siswa yang Sedang Belajar:</span>
              </div>
              <span className="text-3xs text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                {students.length} Siswa Terdaftar
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto p-1">
              {students.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setActiveStudentId(st.id)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition flex items-center gap-3 ${
                    activeStudentId === st.id
                      ? 'border-amber-500 bg-amber-50/80 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl">{st.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-xs text-slate-900 truncate">
                      {st.name}
                    </h4>
                    <p className="text-3xs text-slate-500 font-medium truncate">
                      NISN: {st.nisn} • Kelas {st.grade} SD
                    </p>
                  </div>
                  {activeStudentId === st.id && (
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-3xs text-slate-500 italic">
              💡 Guru dan orang tua dapat memantau capaian materi, kuis, dan aktivitas khusus untuk nama anak yang dipilih.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition active:scale-95"
            >
              <Save className="w-4 h-4" /> Simpan Identitas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
