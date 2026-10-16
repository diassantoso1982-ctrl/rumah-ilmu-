import React, { useState } from 'react';
import { Heart, Star, CheckCircle2, MessageSquare, Clock, Lightbulb, HelpCircle, X, Sparkles, Send } from 'lucide-react';
import { ParentCompanionGuide } from '../types';
import { AudioNarratorButton } from './AudioNarratorButton';
import { soundManager } from '../services/soundEffects';
import { voiceGuideService } from '../services/voiceGuideService';

interface BelajarBersamaOrangTuaModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialTitle: string;
  guide: ParentCompanionGuide;
  onAddStar?: () => void;
  onSendTeacherNote?: (noteText: string) => void;
}

export const BelajarBersamaOrangTuaModal: React.FC<BelajarBersamaOrangTuaModalProps> = ({
  isOpen,
  onClose,
  materialTitle,
  guide,
  onAddStar,
  onSendTeacherNote,
}) => {
  const [completedTogether, setCompletedTogether] = useState(false);
  const [starGiven, setStarGiven] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteSent, setNoteSent] = useState(false);

  if (!isOpen) return null;

  const handleMarkCompleted = () => {
    soundManager.playStarSuccess();
    setCompletedTogether(true);
    voiceGuideService.speak('Alhamdulillah! Terima kasih Ayah Bunda sudah mendampingi ananda belajar dengan penuh cinta hari ini.');
  };

  const handleGiveAppreciation = () => {
    soundManager.playFanfare();
    setStarGiven(true);
    if (onAddStar) onAddStar();
    voiceGuideService.speak('Bintang apresiasi berhasil dikirimkan untuk ananda! Terus dampingi ananda dengan penuh senyuman!');
  };

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    soundManager.playChime();
    if (onSendTeacherNote) onSendTeacherNote(noteContent);
    setNoteSent(true);
    voiceGuideService.speak('Catatan Ayah Bunda telah berhasil diteruskan ke guru kelas. Terima kasih atas kerja samanya.');
    setTimeout(() => {
      setShowNoteForm(false);
      setNoteSent(false);
      setNoteContent('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border-4 border-rose-300 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-6 text-white relative">
          <button
            onClick={() => {
              voiceGuideService.stop();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-white" /> Fitur Unggulan Rumah Ilmu
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight">
            ❤️ Belajar Bersama Orang Tua
          </h2>
          <p className="text-white/90 text-sm mt-1 font-medium">
            Materi: <span className="underline decoration-white/40">{materialTitle}</span>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Mindset Card */}
          <div className="bg-rose-50 border-2 border-rose-200 p-4 rounded-2xl flex items-start justify-between gap-3 text-rose-900">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-bold text-sm text-rose-900">
                  ORANG TUA TIDAK PERLU MENGAJARKAN SEPERTI GURU
                </p>
                <p className="text-xs text-rose-800/90 mt-0.5 leading-relaxed">
                  {guide.parentMindset || 'Orang tua cukup mendampingi, bertanya, mendengarkan, dan memberikan motivasi hangat.'}
                </p>
              </div>
            </div>
            <AudioNarratorButton
              textToSpeak={`Pesan untuk orang tua: Orang tua tidak perlu mengajarkan seperti guru. ${guide.parentMindset || 'Cukup mendampingi, bertanya, dan memotivasi hangat.'}`}
              label="Dengarkan Pesan"
              variant="rose"
              size="sm"
            />
          </div>

          {/* 1. Apa yang Dipelajari? */}
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-base">
                <span className="p-1 rounded-lg bg-amber-500 text-white text-xs font-black">1</span>
                APA YANG DIPELAJARI?
              </h3>
              <AudioNarratorButton
                textToSpeak={`Apa yang dipelajari ananda: ${guide.summary}`}
                label="Dengarkan"
                variant="amber"
                size="sm"
              />
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {guide.summary}
            </p>
          </div>

          {/* 2. Apa yang Bisa Dilakukan Orang Tua? */}
          <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-base">
                <span className="p-1 rounded-lg bg-blue-500 text-white text-xs font-black">2</span>
                APA YANG BISA DILAKUKAN ORANG TUA?
              </h3>
              <AudioNarratorButton
                textToSpeak={`Apa yang bisa dilakukan orang tua: ${guide.guidance}`}
                label="Dengarkan"
                variant="blue"
                size="sm"
              />
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {guide.guidance}
            </p>
          </div>

          {/* 3. Contoh Pertanyaan Pemantik */}
          <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-base">
                <span className="p-1 rounded-lg bg-emerald-500 text-white text-xs font-black">3</span>
                CONTOH PERTANYAAN UNTUK ANAK
              </h3>
              <AudioNarratorButton
                textToSpeak={`Contoh pertanyaan untuk anak: ${guide.promptQuestions.join('. ')}`}
                label="Bacakan Pertanyaan"
                variant="emerald"
                size="sm"
              />
            </div>
            <p className="text-xs text-emerald-800 font-medium">
              Tanyakan dengan nada santai dan tersenyum, bukan seperti menguji:
            </p>
            <ul className="space-y-2">
              {guide.promptQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start justify-between gap-2 text-sm text-slate-800 bg-white/80 p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">💬</span>
                    <span className="italic">{q}</span>
                  </div>
                  <AudioNarratorButton
                    textToSpeak={q}
                    label=""
                    variant="ghost"
                    size="sm"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Aktivitas 10-15 Menit */}
          <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-200 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 flex items-center gap-2 text-base">
                <span className="p-1 rounded-lg bg-purple-500 text-white text-xs font-black">4</span>
                AKTIVITAS {guide.homeActivityDuration || '10–15 MENIT'}
              </h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-purple-200/80 text-purple-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <Clock className="w-3.5 h-3.5" /> Tanpa Alat Khusus
                </span>
                <AudioNarratorButton
                  textToSpeak={`Aktivitas santai di rumah: ${guide.homeActivity}. Contoh situasinya: ${guide.exampleScenario}`}
                  label="Dengarkan Langkah"
                  variant="purple"
                  size="sm"
                />
              </div>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed bg-white/80 p-3 rounded-xl border border-purple-100">
              {guide.homeActivity}
            </p>
            {guide.exampleScenario && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Contoh Nyata:</strong> {guide.exampleScenario}
              </div>
            )}
          </div>

          {/* Action Triggers for Parents */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={handleMarkCompleted}
                className={`p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border-2 transition active:scale-95 cursor-pointer ${
                  completedTogether
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedTogether ? '✅ Sudah Belajar Bersama' : 'Sudah Belajar Bersama'}</span>
              </button>

              <button
                onClick={handleGiveAppreciation}
                className={`p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border-2 transition active:scale-95 cursor-pointer ${
                  starGiven
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200'
                }`}
              >
                <Star className={`w-4 h-4 ${starGiven ? 'fill-white' : ''}`} />
                <span>{starGiven ? '⭐ Bintang Terkirim!' : 'Berikan Apresiasi (+5 ⭐)'}</span>
              </button>

              <button
                onClick={() => setShowNoteForm(!showNoteForm)}
                className="p-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-900 border-2 border-blue-200 transition active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Catatan untuk Guru</span>
              </button>
            </div>

            {/* Note to Teacher Form */}
            {showNoteForm && (
              <form onSubmit={handleSendNote} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
                <label className="block text-xs font-bold text-slate-700">
                  Tuliskan perkembangan, kebahagiaan anak, atau kendala belajar untuk guru kelas:
                </label>
                <textarea
                  rows={3}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Contoh: Ananda sangat senang memotong roti tawar dan sekarang sudah paham pecahan senilai..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNoteForm(false)}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim ke Guru</span>
                  </button>
                </div>
              </form>
            )}

            {noteSent && (
              <div className="p-3 bg-blue-100 text-blue-900 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Pesan untuk guru berhasil dikirimkan!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
