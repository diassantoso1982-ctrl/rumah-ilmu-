import React, { useState } from 'react';
import { LKPD } from '../types';
import { Printer, Share2, Check, ArrowLeft, Save, Sparkles, User, Calendar, CheckSquare, MessageSquare } from 'lucide-react';
import { ShareModal } from './ShareModal';
import { AudioNarratorButton } from './AudioNarratorButton';

interface LkpdViewerProps {
  lkpd: LKPD;
  initialStudentName?: string;
  initialCompanionName?: string;
  onBack?: () => void;
  onAddStar?: () => void;
  onSaveProgress?: (studentName: string, lkpdTitle: string) => void;
}

export const LkpdViewer: React.FC<LkpdViewerProps> = ({
  lkpd,
  initialStudentName = 'Ahmad Faiz Fadillah',
  initialCompanionName = 'Bunda / Ayah',
  onBack,
  onAddStar,
  onSaveProgress,
}) => {
  const [studentName, setStudentName] = useState(initialStudentName);
  const [companionName, setCompanionName] = useState(initialCompanionName);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    setSavedSuccess(true);
    if (onAddStar) onAddStar();
    if (onSaveProgress) onSaveProgress(studentName, lkpd.title);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Action Bar (Hidden when printing) */}
      <div className="no-print bg-white p-4 rounded-3xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          )}
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase">
            LKPD Digital & Cetak
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            <Share2 className="w-4 h-4" /> Bagikan
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold transition"
          >
            <Printer className="w-4 h-4" /> Cetak Lembar Kerja
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition active:scale-95"
          >
            <Save className="w-4 h-4" /> Simpan Jawaban
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="no-print p-4 bg-emerald-100 text-emerald-900 border-2 border-emerald-300 rounded-2xl flex items-center gap-3 animate-in fade-in">
          <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-bold">
            🎉 Jawaban LKPD kamu berhasil disimpan secara digital! Mendapatkan +10 Bintang Belajar!
          </p>
        </div>
      )}

      {/* Printable LKPD Container */}
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-md border-4 border-amber-200 print:border-none print:shadow-none print:p-0 space-y-6">
        {/* Official Header */}
        <div className="border-b-4 border-slate-800 pb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-3xl">🏠</span>
            <span className="font-extrabold text-xl tracking-wider text-slate-800 uppercase">
              RUMAH ILMU • LEMBAR KERJA PESERTA DIDIK
            </span>
          </div>
          <p className="text-xs text-slate-500 italic">
            Kurikulum Terpadu Ramah Anak • Jenjang Sekolah Dasar (SD)
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 font-display">
            {lkpd.title}
          </h1>
          <p className="text-xs font-bold text-amber-700 mt-1">
            Waktu Pengerjaan: {lkpd.estimatedTime} • Kelas {lkpd.grade} SD
          </p>
        </div>

        {/* Student Identity Box */}
        <div className="bg-amber-50/70 p-4 md:p-5 rounded-2xl border-2 border-dashed border-amber-300 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-2xs font-bold uppercase text-slate-600 mb-1">
              Nama Peserta Didik:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full text-sm font-bold bg-white p-2 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500"
              placeholder="Tuliskan nama lengkapmu"
            />
          </div>

          <div>
            <label className="block text-2xs font-bold uppercase text-slate-600 mb-1">
              Didampingi Oleh (Guru / Orang Tua):
            </label>
            <input
              type="text"
              value={companionName}
              onChange={(e) => setCompanionName(e.target.value)}
              className="w-full text-sm font-bold bg-white p-2 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500"
              placeholder="Nama Pendamping"
            />
          </div>

          <div>
            <label className="block text-2xs font-bold uppercase text-slate-600 mb-1">
              Hari / Tanggal:
            </label>
            <input
              type="text"
              defaultValue="Rabu, 07 Oktober 2026"
              className="w-full text-xs font-medium bg-white p-2 rounded-xl border border-amber-300"
            />
          </div>

          <div>
            <label className="block text-2xs font-bold uppercase text-slate-600 mb-1">
              Pendidik Penyusun:
            </label>
            <p className="text-xs font-semibold text-slate-700 pt-1">
              {lkpd.createdBy}
            </p>
          </div>
        </div>

        {/* Learning Goal */}
        <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-1">
              🎯 Tujuan Pembelajaran:
            </h3>
            <p className="text-sm text-blue-950 font-medium">
              {lkpd.learningGoal}
            </p>
          </div>
          <AudioNarratorButton
            textToSpeak={`Tujuan pembelajaran lembar kerja: ${lkpd.learningGoal}`}
            label="Dengarkan Tujuan"
            variant="blue"
          />
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
              📌 Petunjuk Pengerjaan:
            </h3>
            <AudioNarratorButton
              textToSpeak={`Petunjuk pengerjaan: ${lkpd.instructions.join('. ')}`}
              label="Bacakan Petunjuk"
              variant="ghost"
              size="sm"
            />
          </div>
          <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 pl-1">
            {lkpd.instructions.map((ins, idx) => (
              <li key={idx}>{ins}</li>
            ))}
          </ol>
        </div>

        {/* Activities Steps */}
        <div className="space-y-6 pt-2">
          <h2 className="text-lg font-black text-slate-900 border-b pb-2 font-display">
            Langkah-Langkah Eksplorasi (Kinestetik & Mandiri)
          </h2>

          {lkpd.activities.map((act) => (
            <div key={act.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                    {act.stepNumber}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">
                    {act.title}
                  </h4>
                </div>
                <AudioNarratorButton
                  textToSpeak={`Langkah ${act.stepNumber}: ${act.title}. ${act.instruction}. ${act.promptQuestion ? act.promptQuestion : ''}`}
                  label="Dengarkan Langkah"
                  variant="amber"
                  size="sm"
                />
              </div>

              <p className="text-xs md:text-sm text-slate-700 pl-8">
                {act.instruction}
              </p>

              {act.promptQuestion && (
                <p className="text-xs font-bold text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 pl-8">
                  👉 {act.promptQuestion}
                </p>
              )}

              {/* Student Input Choices */}
              <div className="pl-8 pt-1">
                {act.studentInputType === 'choice' && act.choices && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {act.choices.map((ch, cIdx) => (
                      <label
                        key={cIdx}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs md:text-sm font-semibold transition ${
                          answers[act.id] === ch
                            ? 'bg-amber-100 border-amber-500 text-amber-900 font-bold'
                            : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`choice-${act.id}`}
                          value={ch}
                          checked={answers[act.id] === ch}
                          onChange={() => setAnswers(prev => ({ ...prev, [act.id]: ch }))}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span>{ch}</span>
                      </label>
                    ))}
                  </div>
                )}

                {act.studentInputType === 'text' && (
                  <textarea
                    rows={3}
                    placeholder="Tuliskan jawaban atau langkah pengamatanmu di sini..."
                    value={answers[act.id] || ''}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [act.id]: e.target.value }))}
                    className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                )}

                {act.studentInputType === 'checklist' && act.checklistItems && (
                  <div className="space-y-2">
                    {act.checklistItems.map((item, itIdx) => (
                      <label
                        key={itIdx}
                        className="flex items-center gap-2.5 text-xs md:text-sm text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedItems[`${act.id}-${itIdx}`]}
                          onChange={(e) => setCheckedItems(prev => ({ ...prev, [`${act.id}-${itIdx}`]: e.target.checked }))}
                          className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reflection */}
        {lkpd.reflectionQuestions && lkpd.reflectionQuestions.length > 0 && (
          <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 space-y-3">
            <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Refleksi & Catatan Siswa
            </h3>
            {lkpd.reflectionQuestions.map((q, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-xs font-semibold text-emerald-950">
                  {idx + 1}. {q}
                </p>
                <input
                  type="text"
                  placeholder="Ketik refleksimu..."
                  className="w-full text-xs p-2 rounded-xl bg-white border border-emerald-200"
                />
              </div>
            ))}
          </div>
        )}

        {/* Signature Line for Print */}
        <div className="pt-8 border-t grid grid-cols-2 text-center text-xs text-slate-600">
          <div>
            <p>Orang Tua / Wali Pendamping,</p>
            <div className="h-16" />
            <p className="font-bold underline">({companionName || '...............................'})</p>
          </div>
          <div>
            <p>Guru Pembimbing,</p>
            <div className="h-16" />
            <p className="font-bold underline">({lkpd.createdBy.split('(')[0].trim()})</p>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={lkpd.title}
        category="LKPD Interaktif"
      />
    </div>
  );
};
