import React, { useState } from 'react';
import {
  LearningMaterial,
  LearningStyle,
  UserRole
} from '../types';
import {
  Heart,
  BookOpen,
  Video,
  Gamepad2,
  Volume2,
  VolumeX,
  Share2,
  CheckCircle,
  HelpCircle,
  Play,
  ArrowRight,
  Sparkles,
  FileText,
  Lightbulb,
  Award,
  Eye,
  Ear,
  Hand,
  Youtube,
  ExternalLink,
  Search
} from 'lucide-react';
import { BelajarBersamaOrangTuaModal } from './BelajarBersamaOrangTuaModal';
import { ShareModal } from './ShareModal';
import { InteractiveVideoPlayer } from './InteractiveVideoPlayer';
import { AudioNarratorButton } from './AudioNarratorButton';
import { voiceGuideService } from '../services/voiceGuideService';
import { resolveYouTubeVideo } from '../services/youtubeEducationService';

interface MaterialViewerProps {
  material: LearningMaterial;
  userRole: UserRole;
  onOpenLkpd?: () => void;
  onOpenGame?: () => void;
  onAddStar?: () => void;
  onSendTeacherNote?: (noteText: string) => void;
}

export const MaterialViewer: React.FC<MaterialViewerProps> = ({
  material,
  userRole,
  onOpenLkpd,
  onOpenGame,
  onAddStar,
  onSendTeacherNote,
}) => {
  const [learningStyle, setLearningStyle] = useState<LearningStyle>('membaca');
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [isSpeakingFull, setIsSpeakingFull] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<string, { correct: boolean; text: string }>>({});
  const [revealedCheck, setRevealedCheck] = useState<Record<number, boolean>>({});

  // Full Material Audio Read Aloud
  const toggleFullSpeech = () => {
    if (isSpeakingFull) {
      voiceGuideService.stop();
      setIsSpeakingFull(false);
    } else {
      const textToRead = `${material.title}. Tema: ${material.theme}. Apersepsi: ${material.apperception}. ${material.coreContent.map(c => `${c.sectionTitle}. ${c.text}`).join('. ')}. Rangkuman: ${material.summary.join('. ')}`;
      voiceGuideService.speak(textToRead, () => setIsSpeakingFull(false));
      setIsSpeakingFull(true);
    }
  };

  const handleSelectAnswer = (qId: string, answer: any, correct: any, explanation: string, encouragement: string) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: answer }));
    const isCorrect = String(answer).toLowerCase() === String(correct).toLowerCase();
    const feedbackMsg = isCorrect
      ? `${encouragement} ${explanation}`
      : `Tidak apa-apa. Yuk, coba pahami kembali materi ini. ${explanation}`;

    setQuizFeedback(prev => ({
      ...prev,
      [qId]: {
        correct: isCorrect,
        text: feedbackMsg
      }
    }));

    // Voice feedback
    voiceGuideService.speak(feedbackMsg);

    if (isCorrect && onAddStar) {
      onAddStar();
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Kelas {material.grade} SD
            </span>
            <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full">
              {material.theme}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullSpeech}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition shadow-2xs"
              title="Dengarkan Seluruh Materi"
            >
              {isSpeakingFull ? <VolumeX className="w-4 h-4 text-rose-200" /> : <Volume2 className="w-4 h-4" />}
              {isSpeakingFull ? 'Hentikan Audio' : 'Dengarkan Seluruh Materi'}
            </button>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition"
            >
              <Share2 className="w-4 h-4" />
              Bagikan
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl md:text-4xl font-black font-display tracking-tight text-white mb-3">
            {material.title}
          </h1>
          <AudioNarratorButton
            textToSpeak={`${material.title}. Tema: ${material.theme}.`}
            label="Suara Judul"
            size="md"
            variant="ghost"
          />
        </div>

        {/* Highlight Feature Button: BELAJAR BERSAMA ORANG TUA */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsParentModalOpen(true)}
            className="flex items-center gap-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-rose-900/30 transition hover:scale-102 active:scale-98 animate-bounce-subtle"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>BELAJAR BERSAMA ORANG TUA</span>
          </button>

          <button
            onClick={() => setIsVideoPlayerOpen(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold px-4 py-3 rounded-2xl shadow-lg transition active:scale-98"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Putar Video Animasi 🎬</span>
          </button>

          {onOpenLkpd && (
            <button
              onClick={onOpenLkpd}
              className="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-800 font-bold px-4 py-3 rounded-2xl shadow transition"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              Buka LKPD Digital
            </button>
          )}

          {onOpenGame && (
            <button
              onClick={onOpenGame}
              className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white font-bold px-4 py-3 rounded-2xl shadow transition"
            >
              <Gamepad2 className="w-4 h-4" />
              Main Game Topik Ini
            </button>
          )}
        </div>
      </div>

      {/* FITUR DIFERENSIASI PEMBELAJARAN (VAK: Visual, Auditori, Kinestetik) */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border-2 border-amber-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">
              Diferensiasi Pembelajaran (Gaya Belajar Ramah Anak)
            </h3>
          </div>
          <span className="text-2xs font-extrabold text-slate-400 hidden sm:inline">
            Fasilitasi Visual, Auditori & Kinestetik
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {/* Gaya 1: Visual / Membaca */}
          <button
            onClick={() => setLearningStyle('membaca')}
            className={`p-3.5 rounded-2xl text-left border-2 transition active:scale-98 flex flex-col justify-between ${
              learningStyle === 'membaca'
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                : 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200 text-emerald-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">👁️</span>
              <span className={`text-3xs font-extrabold uppercase px-2 py-0.5 rounded-full ${
                learningStyle === 'membaca' ? 'bg-white/20 text-white' : 'bg-emerald-200 text-emerald-900'
              }`}>
                Visual
              </span>
            </div>
            <p className="font-black text-xs">Membaca & Gambar</p>
            <p className={`text-3xs mt-0.5 line-clamp-1 ${learningStyle === 'membaca' ? 'text-white/80' : 'text-slate-500'}`}>
              Bagan & teks warna-warni
            </p>
          </button>

          {/* Gaya 2: Visual / Video */}
          <button
            onClick={() => {
              setLearningStyle('video');
              setIsVideoPlayerOpen(true);
            }}
            className={`p-3.5 rounded-2xl text-left border-2 transition active:scale-98 flex flex-col justify-between ${
              learningStyle === 'video'
                ? 'bg-blue-500 border-blue-500 text-white shadow-md'
                : 'bg-blue-50/70 hover:bg-blue-100/70 border-blue-200 text-blue-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">🎬</span>
              <span className={`text-3xs font-extrabold uppercase px-2 py-0.5 rounded-full ${
                learningStyle === 'video' ? 'bg-white/20 text-white' : 'bg-blue-200 text-blue-900'
              }`}>
                Visual & Audio
              </span>
            </div>
            <p className="font-black text-xs">Menonton Video</p>
            <p className={`text-3xs mt-0.5 line-clamp-1 ${learningStyle === 'video' ? 'text-white/80' : 'text-slate-500'}`}>
              Animasi interaktif bersuara
            </p>
          </button>

          {/* Gaya 3: Kinestetik / Sambil Bermain & Praktik */}
          <button
            onClick={() => {
              setLearningStyle('bermain');
              if (onOpenGame) onOpenGame();
            }}
            className={`p-3.5 rounded-2xl text-left border-2 transition active:scale-98 flex flex-col justify-between ${
              learningStyle === 'bermain'
                ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                : 'bg-amber-50/70 hover:bg-amber-100/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">✋</span>
              <span className={`text-3xs font-extrabold uppercase px-2 py-0.5 rounded-full ${
                learningStyle === 'bermain' ? 'bg-white/20 text-white' : 'bg-amber-200 text-amber-900'
              }`}>
                Kinestetik
              </span>
            </div>
            <p className="font-black text-xs">Sambil Bermain</p>
            <p className={`text-3xs mt-0.5 line-clamp-1 ${learningStyle === 'bermain' ? 'text-white/80' : 'text-slate-500'}`}>
              Gerak tangan, roda & dadu
            </p>
          </button>

          {/* Gaya 4: Auditori / Mendengarkan Suara */}
          <button
            onClick={() => {
              setLearningStyle('mendengarkan');
              toggleFullSpeech();
            }}
            className={`p-3.5 rounded-2xl text-left border-2 transition active:scale-98 flex flex-col justify-between ${
              learningStyle === 'mendengarkan'
                ? 'bg-purple-500 border-purple-500 text-white shadow-md'
                : 'bg-purple-50/70 hover:bg-purple-100/70 border-purple-200 text-purple-950'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl">👂</span>
              <span className={`text-3xs font-extrabold uppercase px-2 py-0.5 rounded-full ${
                learningStyle === 'mendengarkan' ? 'bg-white/20 text-white' : 'bg-purple-200 text-purple-900'
              }`}>
                Auditori
              </span>
            </div>
            <p className="font-black text-xs">Mendengar Suara</p>
            <p className={`text-3xs mt-0.5 line-clamp-1 ${learningStyle === 'mendengarkan' ? 'text-white/80' : 'text-slate-500'}`}>
              Narator lisan ramah anak
            </p>
          </button>
        </div>
      </div>

      {/* 2. TUJUAN PEMBELAJARAN (AUDITORI + VISUAL) */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2.5 font-display">
            <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
              🎯
            </span>
            Tujuan Pembelajaran
          </h2>
          <AudioNarratorButton
            textToSpeak={`Tujuan pembelajaran: ${material.learningGoals.join('. ')}`}
            label="Bacakan Tujuan"
            variant="amber"
          />
        </div>
        <ul className="space-y-2">
          {material.learningGoals.map((goal, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100">
              <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. APERSEPSI (AUDITORI + KINESTETIK/VISUAL) */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-3xl p-6 border-2 border-blue-200 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-blue-900 flex items-center gap-2.5 font-display">
            <span className="w-7 h-7 rounded-xl bg-blue-200 text-blue-800 flex items-center justify-center text-sm font-bold">
              🤔
            </span>
            Apersepsi (Mari Mengamati)
          </h2>
          <AudioNarratorButton
            textToSpeak={`Mari mengamati: ${material.apperception}`}
            label="Bacakan Apersepsi"
            variant="blue"
          />
        </div>
        <p className="text-sm md:text-base text-blue-950 font-medium leading-relaxed italic bg-white/70 p-4 rounded-2xl border border-blue-200">
          “{material.apperception}”
        </p>
      </section>

      {/* 4. MATERI INTI (DENGAN SUARA DI SETIAP SUB-BAGIAN) */}
      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2.5 font-display">
            <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
              📖
            </span>
            Materi Inti Berilustrasi
          </h2>
          <span className="text-2xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Tersedia Suara Narator 🔊
          </span>
        </div>

        {material.coreContent.map((sec, idx) => (
          <div key={idx} className="space-y-3 pb-5 border-b border-slate-100 last:border-b-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base md:text-lg font-bold text-slate-900">
                {sec.sectionTitle}
              </h3>
              <AudioNarratorButton
                textToSpeak={`${sec.sectionTitle}. ${sec.text}. ${sec.bulletPoints ? sec.bulletPoints.join('. ') : ''}`}
                label="Bacakan Bagian Ini"
                variant="emerald"
              />
            </div>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              {sec.text}
            </p>

            {sec.bulletPoints && (
              <ul className="space-y-1.5 pl-2">
                {sec.bulletPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 p-2 rounded-xl">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}

            {sec.visualDescription && (
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs md:text-sm text-amber-900 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🖼️</span>
                  <span><strong>Gambaran Visual:</strong> {sec.visualDescription}</span>
                </div>
                <AudioNarratorButton
                  textToSpeak={`Gambaran visual: ${sec.visualDescription}`}
                  label="Dengarkan"
                  variant="amber"
                  size="sm"
                />
              </div>
            )}

            {sec.interactiveCheck && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cek Pemahaman Cepat</p>
                  <AudioNarratorButton
                    textToSpeak={`Pertanyaan: ${sec.interactiveCheck.question}. Jawabannya adalah: ${sec.interactiveCheck.answer}`}
                    label="Bacakan Pertanyaan & Jawaban"
                    variant="ghost"
                  />
                </div>
                <p className="text-sm font-bold text-slate-800">❓ {sec.interactiveCheck.question}</p>
                {revealedCheck[idx] ? (
                  <div className="bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-200 text-sm font-medium animate-in fade-in duration-150">
                    💡 {sec.interactiveCheck.answer}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setRevealedCheck(prev => ({ ...prev, [idx]: true }));
                      if (sec.interactiveCheck) {
                        voiceGuideService.speak(sec.interactiveCheck.answer);
                      }
                    }}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Buka Jawaban & Dengarkan Suara 🔊</span>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* 5. CONTOH NYATA SEHARI-HARI (AUDITORI + VISUAL) */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2.5 font-display">
            <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
              🌟
            </span>
            Contoh Nyata Sehari-hari
          </h2>
          <AudioNarratorButton
            textToSpeak={material.examples.map((ex, i) => `Contoh ${i + 1}: ${ex.situation}. Penjelasannya: ${ex.explanation}`).join('. ')}
            label="Bacakan Semua Contoh"
            variant="purple"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {material.examples.map((ex, idx) => (
            <div key={idx} className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-bold text-xs uppercase tracking-wider text-purple-800">Situasi {idx + 1}</p>
                <AudioNarratorButton
                  textToSpeak={`Situasi: ${ex.situation}. Penjelasan: ${ex.explanation}`}
                  label="Dengarkan"
                  variant="purple"
                  size="sm"
                />
              </div>
              <p className="text-sm font-semibold text-slate-900">“{ex.situation}”</p>
              <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-2.5 rounded-xl">
                {ex.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. AKTIVITAS SISWA (KINESTETIK + SUARA PANDUAN) */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2.5 font-display">
            <span className="w-7 h-7 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-sm font-bold">
              ✂️
            </span>
            Aktivitas Praktis Siswa (Kinestetik): {material.studentActivity.title}
          </h2>
          <AudioNarratorButton
            textToSpeak={`Aktivitas Praktis: ${material.studentActivity.title}. Langkah-langkahnya: ${material.studentActivity.instructions.join('. ')}. Keluaran: ${material.studentActivity.deliverable}`}
            label="Bacakan Langkah Aktivitas"
            variant="rose"
          />
        </div>
        <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100 space-y-3">
          <div className="flex items-center gap-2 text-2xs font-bold text-rose-900 uppercase">
            <span>✋ Gerak Tangan & Eksplorasi Nyata:</span>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 pl-1">
            {material.studentActivity.instructions.map((ins, idx) => (
              <li key={idx} className="bg-white/80 p-2 rounded-xl border border-rose-100">
                {ins}
              </li>
            ))}
          </ol>
          <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs text-rose-950 font-medium">
            <strong>Keluaran/Aksi:</strong> {material.studentActivity.deliverable}
          </div>
        </div>
      </section>

      {/* 7. VIDEO PEMBELAJARAN (SAMBUNG LANGSUNG DENGAN YOUTUBE) */}
      {(() => {
        const videoInfo = resolveYouTubeVideo(
          material.video.title,
          material.subjectId,
          material.grade,
          material.video.youtubeId
        );

        return (
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                  <Youtube className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-lg font-black text-slate-800 font-display">
                    Video Pembelajaran YouTube Edukasi
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Sumber Resmi: <strong className="text-slate-800">{videoInfo.channel}</strong> • Durasi: {material.video.duration}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={videoInfo.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition active:scale-95"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>Buka di YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setIsVideoPlayerOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Putar di Aplikasi 🔊</span>
                </button>
              </div>
            </div>

            {/* Video Card Clickable to Play with YouTube Thumbnail */}
            <div
              onClick={() => setIsVideoPlayerOpen(true)}
              className="bg-slate-950 rounded-3xl overflow-hidden aspect-video flex flex-col items-center justify-center text-white p-6 text-center relative group cursor-pointer border-4 border-slate-800 shadow-xl"
            >
              {/* YouTube Thumbnail Background */}
              <img
                src={videoInfo.thumbnailUrl}
                alt={material.video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-red-600 group-hover:scale-110 flex items-center justify-center shadow-2xl transition duration-300 border-4 border-white/60 mb-3">
                  <Play className="w-9 h-9 fill-white ml-1 text-white" />
                </div>
                <span className="text-3xs uppercase tracking-wider bg-red-600/90 text-white font-extrabold px-3 py-1 rounded-full mb-1 border border-white/30">
                  ▶️ YouTube HD Video • {videoInfo.channel}
                </span>
                <h4 className="text-lg md:text-xl font-bold font-display text-white max-w-lg leading-snug drop-shadow-md">
                  {material.video.title}
                </h4>
                <p className="text-xs text-amber-200 mt-1 font-semibold">
                  Klik untuk Memutar Langsung Video YouTube & Jawaban Refleksi
                </p>
              </div>
            </div>

            {/* Quick Links Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <a
                href={videoInfo.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Cari Video Edukasi Tambahan Topik Ini di YouTube ↗</span>
              </a>

              <span className="text-2xs text-slate-500 font-medium">
                Dilengkapi subtitel & refleksi berhadiah +10 Bintang
              </span>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs md:text-sm text-amber-900 flex items-center justify-between">
              <span><strong>Refleksi Setelah Video:</strong> “{material.video.reflectionPrompt}”</span>
              <AudioNarratorButton
                textToSpeak={`Refleksi setelah video: ${material.video.reflectionPrompt}`}
                label="Dengarkan"
                variant="amber"
                size="sm"
              />
            </div>
          </section>
        );
      })()}

      {/* 8. LATIHAN INTERAKTIF (DENGAN SUARA DI TIAP SOAL & PILIHAN) */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2.5 font-display">
            <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
              ❓
            </span>
            Latihan Soal Ceria (Bisa Didengarkan)
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {material.practiceQuestions.length} Soal
          </span>
        </div>

        <div className="space-y-4">
          {material.practiceQuestions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <p className="font-bold text-sm text-slate-900">
                  {idx + 1}. {q.question}
                </p>
                <AudioNarratorButton
                  textToSpeak={`Soal nomor ${idx + 1}: ${q.question}. ${q.options ? `Pilihannya adalah: ${q.options.join(', ')}` : ''}`}
                  label="Bacakan Soal"
                  variant="blue"
                  size="sm"
                />
              </div>

              {q.type === 'pilihan_ganda' && q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectAnswer(q.id, opt, q.correctAnswer, q.explanation, q.encouragement)}
                      className={`p-3 rounded-xl text-left text-xs md:text-sm font-semibold border transition active:scale-98 flex items-center justify-between ${
                        quizAnswers[q.id] === opt
                          ? quizFeedback[q.id]?.correct
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-amber-500 text-white border-amber-500'
                          : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                      }`}
                    >
                      <span>{opt}</span>
                      <AudioNarratorButton
                        textToSpeak={`Pilihan: ${opt}`}
                        label=""
                        size="sm"
                        variant="ghost"
                      />
                    </button>
                  ))}
                </div>
              )}

              {q.type === 'benar_salah' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSelectAnswer(q.id, true, q.correctAnswer, q.explanation, q.encouragement)}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm border transition ${
                      quizAnswers[q.id] === true
                        ? quizFeedback[q.id]?.correct
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    Benar
                  </button>
                  <button
                    onClick={() => handleSelectAnswer(q.id, false, q.correctAnswer, q.explanation, q.encouragement)}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm border transition ${
                      quizAnswers[q.id] === false
                        ? quizFeedback[q.id]?.correct
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    Salah
                  </button>
                </div>
              )}

              {quizFeedback[q.id] && (
                <div className={`p-3 rounded-xl text-xs md:text-sm font-medium ${
                  quizFeedback[q.id].correct
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-100 text-amber-900 border border-amber-200'
                }`}>
                  {quizFeedback[q.id].text}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. REFLEKSI KARAKTER */}
      <section className="bg-teal-50/70 rounded-3xl p-6 border-2 border-teal-200 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-teal-900 flex items-center gap-2.5 font-display">
            <span className="w-7 h-7 rounded-xl bg-teal-200 text-teal-800 flex items-center justify-center text-sm font-bold">
              🌱
            </span>
            Refleksi Belajar Hari Ini
          </h2>
          <AudioNarratorButton
            textToSpeak={`Refleksi belajar: ${material.reflection.questions.join('. ')}. Pesan karakter: ${material.reflection.reminder}`}
            label="Bacakan Refleksi"
            variant="emerald"
          />
        </div>
        <ul className="space-y-2 mb-3">
          {material.reflection.questions.map((rf, idx) => (
            <li key={idx} className="text-sm text-teal-950 font-semibold flex items-center gap-2">
              <span>✨</span> {rf}
            </li>
          ))}
        </ul>
        <div className="p-3 bg-white/80 rounded-xl border border-teal-200 text-xs text-teal-900 italic">
          ❤️ <strong>Pesan Karakter:</strong> {material.reflection.reminder}
        </div>
      </section>

      {/* 10. RANGKUMAN POIN KUNCI */}
      <section className="bg-amber-50 rounded-3xl p-6 border border-amber-200 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-amber-950 flex items-center gap-2.5 font-display">
            <span className="w-7 h-7 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center text-sm font-bold">
              📝
            </span>
            Rangkuman Poin Kunci
          </h2>
          <AudioNarratorButton
            textToSpeak={`Rangkuman materi: ${material.summary.join('. ')}`}
            label="Bacakan Rangkuman"
            variant="amber"
          />
        </div>
        <ul className="space-y-1.5 pl-1">
          {material.summary.map((sum, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-amber-950">
              <span className="font-bold text-amber-600">✓</span>
              <span>{sum}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Interactive Video Player Modal */}
      <InteractiveVideoPlayer
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
        title={material.video.title}
        duration={material.video.duration}
        topicId={material.id}
        subjectId={material.subjectId}
        grade={material.grade}
        reflectionPrompt={material.video.reflectionPrompt}
        youtubeId={material.video.youtubeId}
        onAddStar={onAddStar}
      />

      {/* Parent Companion Modal */}
      <BelajarBersamaOrangTuaModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        materialTitle={material.title}
        guide={material.parentGuide}
        onAddStar={onAddStar}
        onSendTeacherNote={onSendTeacherNote}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={material.title}
        category="Materi Pelajaran"
      />
    </div>
  );
};
