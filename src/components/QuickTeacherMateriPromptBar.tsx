import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  BookOpen,
  FileText,
  Share2,
  ArrowRight,
  Flame,
  Lightbulb,
  Heart,
  HelpCircle,
  Video,
  Eye,
  RefreshCw,
  Plus
} from 'lucide-react';
import { LearningMaterial, LKPD, GradeLevel, UserProfile, StudentRecord } from '../types';
import { SUBJECTS } from '../data/mockData';
import { generateMateriWithAi } from '../services/geminiService';
import { detectCurriculumIntent, createInstantLkpdFromMaterial } from '../services/curriculumGenerator';

interface QuickTeacherMateriPromptBarProps {
  currentGrade: GradeLevel;
  onMaterialCreated: (material: LearningMaterial, autoOpen?: boolean) => void;
  onLkpdCreated?: (lkpd: LKPD) => void;
  onSendNoteToParents?: (title: string, subject: string, notes: string) => void;
  userProfile?: UserProfile;
  students?: StudentRecord[];
}

export const QuickTeacherMateriPromptBar: React.FC<QuickTeacherMateriPromptBarProps> = ({
  currentGrade,
  onMaterialCreated,
  onLkpdCreated,
  onSendNoteToParents,
  userProfile,
  students = []
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('matematika');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(currentGrade || 5);
  const [teachingStyle, setTeachingStyle] = useState<'kontekstual' | 'eksperimen' | 'cerita' | 'ortu'>('kontekstual');

  const [isLoading, setIsLoading] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [lastGeneratedMaterial, setLastGeneratedMaterial] = useState<LearningMaterial | null>(null);
  const [showResultCard, setShowResultCard] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Auto-detect subject and grade when teacher types
  useEffect(() => {
    if (promptInput.length >= 4) {
      const { detectedGrade, detectedSubjectId } = detectCurriculumIntent(promptInput, selectedGrade, selectedSubjectId);
      if (detectedGrade && detectedGrade !== selectedGrade) {
        setSelectedGrade(detectedGrade);
      }
      if (detectedSubjectId && detectedSubjectId !== selectedSubjectId) {
        setSelectedSubjectId(detectedSubjectId);
      }
    }
  }, [promptInput]);

  const quickPromptPresets = [
    {
      label: '💧 Daur Air & Hujan (IPAS)',
      prompt: 'Buatkan materi daur air dan proses terjadinya hujan untuk kelas 4 IPAS lengkap dengan percobaan es batu dan 2 kuis',
      subjectId: 'ipas',
      grade: 4 as GradeLevel
    },
    {
      label: '🍕 Pecahan Senilai Pizza (Matematika)',
      prompt: 'Jelaskan materi pecahan senilai dengan analogi pizza dan martabak untuk kelas 5 Matematika',
      subjectId: 'matematika',
      grade: 5 as GradeLevel
    },
    {
      label: '🌾 Rantai Makanan Sawah (IPAS)',
      prompt: 'Materi rantai makanan ekosistem sawah dan peran pengurai untuk kelas 5 IPAS lengkap dengan bagan makan-dimakan',
      subjectId: 'ipas',
      grade: 5 as GradeLevel
    },
    {
      label: '🏛️ Gotong Royong & Toleransi (Pancasila)',
      prompt: 'Penerapan gotong royong dan musyawarah di lingkungan sekolah dan rumah untuk kelas 3 Pendidikan Pancasila',
      subjectId: 'pancasila',
      grade: 3 as GradeLevel
    },
    {
      label: '📖 Puisi Keindahan Alam (B. Indonesia)',
      prompt: 'Materi cara menulis puisi anak tentang keindahan alam dan menemukan ide pokok cerita untuk kelas 4 Bahasa Indonesia',
      subjectId: 'b_indonesia',
      grade: 4 as GradeLevel
    },
    {
      label: '🐱 Animals & Daily Pets (English)',
      prompt: 'Materi Fun English vocabulary tentang pets, animal sounds, and loving family untuk kelas 2 SD',
      subjectId: 'b_inggris',
      grade: 2 as GradeLevel
    },
    {
      label: '📦 Bangun Ruang Kubus & Balok (Matematika)',
      prompt: 'Mengenal sifat kubus dan balok beserta jaring-jaringnya di rumah untuk kelas 6 Matematika',
      subjectId: 'matematika',
      grade: 6 as GradeLevel
    }
  ];

  const handleSelectPreset = (preset: typeof quickPromptPresets[0]) => {
    setPromptInput(preset.prompt);
    setSelectedSubjectId(preset.subjectId);
    setSelectedGrade(preset.grade);
  };

  const handleExecuteGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim()) return;

    setIsLoading(true);
    setShowResultCard(false);
    setGenerationStep('⚡ Membaca perintah guru...');

    const timer1 = setTimeout(() => {
      setGenerationStep('🧠 Merangkai konsep, apersepsi & analogi ramah anak...');
    }, 400);

    const timer2 = setTimeout(() => {
      setGenerationStep('🎯 Menyusun kuis interaktif & panduan orang tua...');
    }, 900);

    const subjectObj = SUBJECTS.find(s => s.id === selectedSubjectId);
    const subjectName = subjectObj ? subjectObj.name : 'Mata Pelajaran';

    let promptWithStyle = promptInput;
    if (teachingStyle === 'eksperimen') {
      promptWithStyle += ' (fokuskan pada aktivitas eksperimen/inkuiri praktis)';
    } else if (teachingStyle === 'cerita') {
      promptWithStyle += ' (fokuskan pada narasi cerita inspiratif ramah anak)';
    } else if (teachingStyle === 'ortu') {
      promptWithStyle += ' (sertakan panduan pendampingan orang tua yang mendalam di rumah)';
    }

    try {
      const generated = await generateMateriWithAi(
        promptWithStyle,
        selectedGrade,
        subjectName
      );

      clearTimeout(timer1);
      clearTimeout(timer2);
      setGenerationStep('✨ Selesai!');
      setLastGeneratedMaterial(generated);
      setShowResultCard(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyAndOpen = () => {
    if (!lastGeneratedMaterial) return;
    onMaterialCreated(lastGeneratedMaterial, true);
  };

  const handleSaveToCollection = () => {
    if (!lastGeneratedMaterial) return;
    onMaterialCreated(lastGeneratedMaterial, false);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handleAutoCreateLkpd = () => {
    if (!lastGeneratedMaterial || !onLkpdCreated) return;
    const lkpd = createInstantLkpdFromMaterial(lastGeneratedMaterial);
    onLkpdCreated(lkpd);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const handleNotifyParents = () => {
    if (!lastGeneratedMaterial || !onSendNoteToParents) return;
    const noteText = `Bapak/Ibu Orang Tua, materi baru "${lastGeneratedMaterial.title}" telah diterbitkan untuk ananda. Mari dampingi ananda selama 10-15 menit dengan panduan hangat di Rumah Ilmu. Terima kasih!`;
    const subjectName = SUBJECTS.find(s => s.id === lastGeneratedMaterial.subjectId)?.name || 'Mata Pelajaran';
    onSendNoteToParents(lastGeneratedMaterial.title, subjectName, noteText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-3xl p-5 md:p-7 shadow-xl border-2 border-indigo-500/40 space-y-5">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-700/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xs font-extrabold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                Fitur Unggulan Pendidik
              </span>
              <span className="text-2xs text-indigo-200 font-semibold hidden sm:inline">
                • Respon Kilat AI Rumah Ilmu
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black font-display tracking-tight text-white mt-0.5">
              ⚡ Pembuat Materi Kilat Berdasarkan Perintah Guru
            </h2>
            <p className="text-xs text-indigo-200/90 max-w-2xl mt-0.5">
              Tuliskan perintah atau topik apa pun, aplikasi segera merespon dan menyusun modul lengkap: tujuan belajar, apersepsi, isi konsep, aktivitas siswa, kuis, dan panduan orang tua!
            </p>
          </div>
        </div>

        {userProfile && (
          <div className="bg-indigo-800/60 border border-indigo-600/40 px-3.5 py-2 rounded-2xl flex items-center gap-2.5">
            <span className="text-lg">👩‍🏫</span>
            <div className="text-right sm:text-left">
              <p className="text-3xs uppercase font-extrabold text-indigo-300">Pendidik Pengampu</p>
              <p className="text-xs font-bold text-white">{userProfile.teacherName}</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Command Input Box */}
      <form onSubmit={handleExecuteGenerate} className="space-y-4">
        <div className="relative">
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleExecuteGenerate();
              }
            }}
            placeholder="Tuliskan perintah guru di sini... Contoh: 'Buatkan materi daur air dan presipitasi untuk kelas 4 IPAS lengkap dengan percobaan es batu dan 2 kuis latihan'"
            rows={3}
            className="w-full bg-indigo-950/70 border-2 border-indigo-400/50 hover:border-amber-400 focus:border-amber-400 rounded-2xl p-4 text-white text-sm md:text-base placeholder:text-indigo-300/60 focus:outline-hidden transition shadow-inner leading-relaxed resize-none"
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button
              type="submit"
              disabled={isLoading || !promptInput.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-xs md:text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Merespon Kilat...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>🚀 Buat Materi Sekarang</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter & Attribute Selectors (Mata Pelajaran, Tingkat Kelas, & Gaya Belajar) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Subject Picker */}
          <div>
            <label className="block text-2xs font-extrabold uppercase text-indigo-300 mb-1.5 flex items-center gap-1">
              <span>🎯 Mata Pelajaran:</span>
              <span className="text-amber-300 font-bold">(Auto-deteksi)</span>
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="w-full bg-indigo-950/80 border border-indigo-500/50 text-white rounded-xl px-3 py-2 text-xs font-bold focus:border-amber-400 focus:outline-hidden"
            >
              {SUBJECTS.map((sub) => (
                <option key={sub.id} value={sub.id} className="bg-slate-900 text-white">
                  {sub.icon} {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Picker */}
          <div>
            <label className="block text-2xs font-extrabold uppercase text-indigo-300 mb-1.5 flex items-center gap-1">
              <span>🎓 Jenjang Kelas SD:</span>
              <span className="text-amber-300 font-bold">(Auto-deteksi)</span>
            </label>
            <div className="grid grid-cols-6 gap-1">
              {([1, 2, 3, 4, 5, 6] as GradeLevel[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGrade(g)}
                  className={`py-2 rounded-xl text-xs font-black transition ${
                    selectedGrade === g
                      ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                      : 'bg-indigo-950/60 text-indigo-200 hover:bg-indigo-800'
                  }`}
                >
                  Kls {g}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Approach / Teaching Style */}
          <div>
            <label className="block text-2xs font-extrabold uppercase text-indigo-300 mb-1.5">
              💡 Gaya Pendekatan Pembelajaran:
            </label>
            <div className="grid grid-cols-2 gap-1 text-2xs font-bold">
              {[
                { id: 'kontekstual', label: '🎈 Kontekstual', desc: 'Sehari-hari' },
                { id: 'eksperimen', label: '🔬 Eksperimen', desc: 'Inkuiri praktis' },
                { id: 'cerita', label: '📖 Fabel / Kisah', desc: 'Naratif anak' },
                { id: 'ortu', label: '🤝 Dampingi Ortu', desc: 'Tugas rumah' },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setTeachingStyle(style.id as any)}
                  className={`px-2.5 py-1.5 rounded-xl border text-left transition ${
                    teachingStyle === style.id
                      ? 'bg-blue-600/90 border-blue-400 text-white shadow-xs'
                      : 'bg-indigo-950/40 border-indigo-700/50 text-indigo-300 hover:bg-indigo-900/50'
                  }`}
                >
                  <p className="font-extrabold">{style.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preset Prompt Recommendations (1-Click Fill) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xs font-extrabold uppercase text-amber-300 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-300" /> Contoh Perintah Cepat Guru (Klik untuk Memuat):
            </span>
            <span className="text-3xs text-indigo-300 font-medium hidden sm:inline">
              Merespon instan dalam 1 detik
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPromptPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="text-2xs font-bold px-3 py-1.5 rounded-xl bg-indigo-950/70 hover:bg-indigo-800 text-indigo-200 hover:text-white border border-indigo-700/50 transition active:scale-95 flex items-center gap-1"
              >
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Generation Status Banner (Live Visual Feedback) */}
      {isLoading && (
        <div className="bg-indigo-950/90 border-2 border-amber-400/60 rounded-2xl p-4 flex items-center gap-3 animate-pulse">
          <Loader2 className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-black text-amber-300 uppercase tracking-wide">
              {generationStep || 'Memproses Perintah Guru...'}
            </p>
            <p className="text-2xs text-indigo-200 mt-0.5">
              AI sedang menyusun bahan ajar terpadu Kurikulum Merdeka untuk jenjang SD.
            </p>
          </div>
        </div>
      )}

      {/* Generated Result Card (Instant Response Action Center) */}
      {showResultCard && lastGeneratedMaterial && (
        <div className="bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 md:p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
          {/* Result Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <span className="text-3xs font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  🎉 Materi Berhasil Dibuat Sesuai Perintah Guru
                </span>
                <h3 className="text-base md:text-lg font-black text-white mt-1">
                  {lastGeneratedMaterial.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xs font-bold bg-indigo-950 text-indigo-200 border border-indigo-700/60 px-3 py-1 rounded-full">
                Kelas {lastGeneratedMaterial.grade} SD • {SUBJECTS.find(s => s.id === lastGeneratedMaterial.subjectId)?.name || 'Mata Pelajaran'}
              </span>
            </div>
          </div>

          {/* Quick Curriculum Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Learning Goals */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1.5">
              <p className="text-2xs font-black uppercase text-amber-400 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> 3 Tujuan Pembelajaran:
              </p>
              <ul className="list-disc list-inside text-2xs text-slate-300 space-y-1">
                {lastGeneratedMaterial.learningGoals.slice(0, 3).map((goal, i) => (
                  <li key={i} className="line-clamp-2">{goal}</li>
                ))}
              </ul>
            </div>

            {/* Practical Activity & Video */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1.5">
              <p className="text-2xs font-black uppercase text-sky-400 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5" /> Aktivitas Praktis Siswa:
              </p>
              <p className="text-2xs font-bold text-white line-clamp-1">
                {lastGeneratedMaterial.studentActivity.title}
              </p>
              <p className="text-3xs text-slate-300 line-clamp-2">
                {lastGeneratedMaterial.studentActivity.instructions.join(' ')}
              </p>
              <p className="text-3xs text-sky-300 font-semibold flex items-center gap-1 pt-0.5">
                <Video className="w-3 h-3" /> Video: {lastGeneratedMaterial.video.title} ({lastGeneratedMaterial.video.duration})
              </p>
            </div>

            {/* Parent Guide & Quiz */}
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1.5">
              <p className="text-2xs font-black uppercase text-rose-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" /> Dampingan Orang Tua di Rumah:
              </p>
              <p className="text-3xs text-slate-300 line-clamp-2">
                {lastGeneratedMaterial.parentGuide.guidance}
              </p>
              <p className="text-3xs text-amber-300 font-bold flex items-center gap-1 pt-1">
                <HelpCircle className="w-3 h-3" /> Dilengkapi {lastGeneratedMaterial.practiceQuestions.length} Soal Kuis Latihan Pemahaman
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleApplyAndOpen}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md transition active:scale-95"
              >
                <Eye className="w-4 h-4" />
                <span>🚀 Buka & Pelajari Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleSaveToCollection}
                className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan ke Modul Kelas</span>
              </button>

              {onLkpdCreated && (
                <button
                  onClick={handleAutoCreateLkpd}
                  className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>Buat Lembar LKPD Otomatis</span>
                </button>
              )}

              {onSendNoteToParents && (
                <button
                  onClick={handleNotifyParents}
                  className="px-3.5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Kirim Pesan ke Orang Tua</span>
                </button>
              )}
            </div>

            {copiedNotification && (
              <span className="text-2xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/40 animate-in fade-in">
                ✅ Berhasil Disimpan & Diterbitkan!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
