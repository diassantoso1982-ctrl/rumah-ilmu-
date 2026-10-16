import React, { useState } from 'react';
import { LearningMaterial, LKPD, GradeLevel, StudentRecord, UserProfile } from '../types';
import {
  Sparkles,
  BookOpen,
  FileText,
  HelpCircle,
  Video,
  ListTodo,
  TrendingUp,
  MessageSquare,
  Lightbulb,
  Plus,
  Trash2,
  Share2,
  Eye,
  CheckCircle2,
  Users,
  UserCheck
} from 'lucide-react';
import { TeacherAiAssistantModal } from './TeacherAiAssistantModal';
import { LkpdGeneratorModal } from './LkpdGeneratorModal';
import { StudentMonitoringDashboard } from './StudentMonitoringDashboard';
import { QuickTeacherMateriPromptBar } from './QuickTeacherMateriPromptBar';

interface TeacherDashboardProps {
  materials: LearningMaterial[];
  lkpds: LKPD[];
  students: StudentRecord[];
  activeStudentId: string;
  userProfile: UserProfile;
  currentGrade: GradeLevel;
  onSelectStudent: (id: string) => void;
  onAddTeacherFeedback: (studentId: string, logId: string, feedback: string) => void;
  onAwardBonusStar: (studentId: string, amount: number, note: string) => void;
  onSelectMaterial: (m: LearningMaterial) => void;
  onSelectLkpd: (l: LKPD) => void;
  onSaveNewMaterial: (m: LearningMaterial, autoOpen?: boolean) => void;
  onSaveNewLkpd: (l: LKPD) => void;
  onOpenCommunication: () => void;
  onOpenIdentitySettings?: () => void;
  onSendNoteToParents?: (title: string, subject: string, notes: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  materials,
  lkpds,
  students,
  activeStudentId,
  userProfile,
  currentGrade,
  onSelectStudent,
  onAddTeacherFeedback,
  onAwardBonusStar,
  onSelectMaterial,
  onSelectLkpd,
  onSaveNewMaterial,
  onSaveNewLkpd,
  onOpenCommunication,
  onOpenIdentitySettings,
  onSendNoteToParents,
}) => {
  const [activeTab, setActiveTab] = useState<'pantau_siswa' | 'materi' | 'lkpd' | 'bank_ide' | 'nilai'>('pantau_siswa');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isLkpdGeneratorOpen, setIsLkpdGeneratorOpen] = useState(false);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<number>(0);

  // Filter materials by grade if selected
  const filteredMaterials = selectedGradeFilter === 0
    ? materials
    : materials.filter(m => m.grade === selectedGradeFilter);

  const filteredLkpds = selectedGradeFilter === 0
    ? lkpds
    : lkpds.filter(l => l.grade === selectedGradeFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Teacher Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Portal Pendidik Terpadu
          </span>
          <h1 className="text-2xl md:text-4xl font-black font-display mt-2">
            👩‍🏫 Ruang Guru Rumah Ilmu
          </h1>
          <p className="text-white/90 text-sm mt-1 max-w-xl">
            Kelola modul ajar, rancang LKPD diferensiasi, susun kuis interaktif, dan dampingi orang tua dengan asisten AI cerdas.
          </p>
        </div>

        {/* AI Action Quick Launchers */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="flex items-center gap-2 px-5 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-2xl shadow-lg transition active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-amber-900" />
            ✨ BANTUAN AI GURU
          </button>
          <button
            onClick={() => setIsLkpdGeneratorOpen(true)}
            className="flex items-center gap-2 px-4 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-2xl border border-white/40 transition active:scale-95 text-xs md:text-sm"
          >
            <FileText className="w-4 h-4" />
            ✨ Generate LKPD
          </button>
        </div>
      </div>

      {/* QUICK AI TEACHER MATERIAL GENERATOR - RESPONDS IMMEDIATELY TO COMMANDS */}
      <QuickTeacherMateriPromptBar
        currentGrade={currentGrade}
        onMaterialCreated={(mat, autoOpen) => onSaveNewMaterial(mat, autoOpen)}
        onLkpdCreated={onSaveNewLkpd}
        onSendNoteToParents={onSendNoteToParents}
        userProfile={userProfile}
        students={students}
      />

      {/* Navigation Sub-Tabs */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'pantau_siswa', label: '👀 Pantau Siswa', icon: Users, badge: 'Utama' },
            { id: 'materi', label: '📚 Kelola Materi', icon: BookOpen },
            { id: 'lkpd', label: '📝 LKPD Siswa', icon: FileText },
            { id: 'bank_ide', label: '💡 Bank Ide Belajar', icon: Lightbulb },
            { id: 'nilai', label: '📊 Nilai & Hasil Siswa', icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && activeTab !== tab.id && (
                <span className="text-3xs bg-amber-200 text-amber-900 font-black px-1.5 py-0.2 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={onOpenCommunication}
            className="px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap bg-indigo-50 hover:bg-indigo-100 text-indigo-800 transition"
          >
            👨‍👩‍👧 Komunikasi Ortu
          </button>
          {onOpenIdentitySettings && (
            <button
              onClick={onOpenIdentitySettings}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap bg-amber-50 hover:bg-amber-100 text-amber-900 transition flex items-center gap-1 border border-amber-200"
            >
              <span>⚙️ Atur Identitas</span>
            </button>
          )}
        </div>

        {/* Grade Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">Filter Kelas:</span>
          <select
            value={selectedGradeFilter}
            onChange={(e) => setSelectedGradeFilter(Number(e.target.value))}
            className="p-1.5 px-2.5 font-bold rounded-lg border border-slate-200 bg-white"
          >
            <option value={0}>Semua Kelas (1–6)</option>
            {[1, 2, 3, 4, 5, 6].map(g => (
              <option key={g} value={g}>Kelas {g} SD</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab 0: PANTAU AKTIVITAS SISWA */}
      {activeTab === 'pantau_siswa' && (
        <div className="animate-in fade-in duration-200">
          <StudentMonitoringDashboard
            students={filteredMaterials.length >= 0 ? students : students}
            activeStudentId={activeStudentId}
            userProfile={userProfile}
            currentGrade={currentGrade}
            onSelectStudent={onSelectStudent}
            onAddTeacherFeedback={onAddTeacherFeedback}
            onAwardBonusStar={onAwardBonusStar}
            onOpenCommunication={onOpenCommunication}
          />
        </div>
      )}

      {/* Tab 1: KELOLA MATERI */}
      {activeTab === 'materi' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Daftar Materi Pembelajaran Aktif ({filteredMaterials.length})
            </h3>
            <button
              onClick={() => setIsAiAssistantOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
            >
              <Plus className="w-4 h-4" /> Tambah Materi Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMaterials.map((mat) => (
              <div
                key={mat.id}
                className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-xs hover:border-blue-400 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-2xs font-extrabold uppercase bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                      Kelas {mat.grade} SD
                    </span>
                    <span className="text-2xs text-slate-500 font-medium truncate">
                      {mat.theme}
                    </span>
                  </div>
                  <h4 className="font-black text-slate-900 text-base leading-snug line-clamp-2">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {mat.apperception}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-2xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    ✓ 10 Bagian Lengkap
                  </span>
                  <button
                    onClick={() => onSelectMaterial(mat)}
                    className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-3.5 h-3.5" /> Buka Materi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: LKPD SISWA */}
      {activeTab === 'lkpd' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Daftar Lembar Kerja Peserta Didik (LKPD) ({filteredLkpds.length})
            </h3>
            <button
              onClick={() => setIsLkpdGeneratorOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition"
            >
              <Sparkles className="w-4 h-4" /> Generate LKPD dengan AI
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLkpds.map((lk) => (
              <div
                key={lk.id}
                className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-xs hover:border-amber-400 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-extrabold uppercase bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                    Kelas {lk.grade} SD • {lk.estimatedTime}
                  </span>
                  <span className="text-2xs text-slate-400 font-semibold">{lk.createdAt}</span>
                </div>
                <h4 className="font-black text-slate-900 text-base">{lk.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  🎯 {lk.learningGoal}
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-2xs text-slate-500">{lk.activities.length} Langkah Eksplorasi</span>
                  <button
                    onClick={() => onSelectLkpd(lk)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition"
                  >
                    Buka & Cetak LKPD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: BANK IDE BELAJAR */}
      {activeTab === 'bank_ide' && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">
            💡 Bank Ide Pembelajaran & Eksperimen Praktis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Eksperimen Kertas Lipat Pecahan',
                mapel: 'Matematika Kelas 5',
                desc: 'Memanfaatkan kertas lipat origami untuk membuktikan pecahan senilai 1/2, 2/4, 4/8 tanpa rumus rumit.',
                icon: '📐'
              },
              {
                title: 'Detektif Fotosintesis Daun Terpal',
                mapel: 'IPAS Kelas 4',
                desc: 'Mengamati perbedaan daun yang terkena matahari vs tertutup lakban hitam selama 3 hari di taman sekolah.',
                icon: '🌿'
              },
              {
                title: 'Operasi Semut Gotong Royong',
                mapel: 'Pendidikan Pancasila Kelas 3',
                desc: 'Aktivitas 10 menit membersihkan kelas dengan pembagian tugas bergiliran dan refleksi rasa bangga bersama.',
                icon: '🐜'
              },
              {
                title: 'Tebak Vokal Senyum Lebar',
                mapel: 'Bahasa Indonesia Kelas 1',
                desc: 'Permainan fonemik ekspresi bibir dan kartu bergambar hewan untuk melatih pelafalan A-I-U-E-O dengan riang.',
                icon: '🗣️'
              },
              {
                title: 'Misteri Pengukuran Keliling Lingkaran',
                mapel: 'Matematika Kelas 6',
                desc: 'Menggunakan benang rafia dan meteran kain untuk mengukur tutup toples dan menemukan konstanta pi 3,14.',
                icon: '⭕'
              },
              {
                title: 'Dadu Kebaikan Harian',
                mapel: 'Budi Pekerti Kelas 1–6',
                desc: 'Misi harian acak setiap pagi untuk mempraktikkan gotong royong dan kesantunan kepada sesama.',
                icon: '🎲'
              }
            ].map((ide, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-3xl">{ide.icon}</span>
                <span className="block text-2xs font-extrabold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md w-fit">
                  {ide.mapel}
                </span>
                <h4 className="font-black text-slate-900 text-sm">{ide.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ide.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: NILAI & HASIL SISWA */}
      {activeTab === 'nilai' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Buku Nilai & Refleksi Belajar Siswa
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              Kelas 5A • 28 Siswa Terdaftar
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3">Nama Siswa</th>
                  <th className="p-3">Materi Dipelajari</th>
                  <th className="p-3">Skor Kuis</th>
                  <th className="p-3">LKPD Digital</th>
                  <th className="p-3">Aktivitas Bersama Ortu</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {[
                  { name: 'Ahmad Faiz Fadillah', mat: 'Pecahan Senilai', score: 95, lkpd: 'Selesai', ortu: '✅ Didampingi', status: 'Sangat Baik' },
                  { name: 'Aisyah Putri Rahma', mat: 'Pecahan Senilai', score: 90, lkpd: 'Selesai', ortu: '✅ Didampingi', status: 'Sangat Baik' },
                  { name: 'Bima Satria Wicaksono', mat: 'Pecahan Senilai', score: 85, lkpd: 'Selesai', ortu: '✅ Didampingi', status: 'Baik' },
                  { name: 'Cantika Dewi Anjani', mat: 'Pecahan Senilai', score: 90, lkpd: 'Selesai', ortu: '✅ Didampingi', status: 'Sangat Baik' },
                  { name: 'Dimas Bagus Pratama', mat: 'Pecahan Senilai', score: 80, lkpd: 'Proses', ortu: '💬 Perlu Konfirmasi', status: 'Baik' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold">{row.name}</td>
                    <td className="p-3">{row.mat}</td>
                    <td className="p-3 font-bold text-amber-600">{row.score}</td>
                    <td className="p-3">{row.lkpd}</td>
                    <td className="p-3">{row.ortu}</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-2xs">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Modals */}
      <TeacherAiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onSaveMaterial={onSaveNewMaterial}
        onSaveLkpd={onSaveNewLkpd}
      />

      <LkpdGeneratorModal
        isOpen={isLkpdGeneratorOpen}
        onClose={() => setIsLkpdGeneratorOpen(false)}
        onSaveLkpd={onSaveNewLkpd}
      />
    </div>
  );
};
