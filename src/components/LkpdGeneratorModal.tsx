import React, { useState } from 'react';
import { X, Sparkles, Loader2, Check, FileText } from 'lucide-react';
import { GradeLevel, LKPD } from '../types';
import { SUBJECTS } from '../data/mockData';
import { generateLkpdWithAi } from '../services/geminiService';

interface LkpdGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveLkpd: (newLkpd: LKPD) => void;
  initialGrade?: GradeLevel;
  initialSubjectId?: string;
}

export const LkpdGeneratorModal: React.FC<LkpdGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSaveLkpd,
  initialGrade = 5,
  initialSubjectId = 'matematika',
}) => {
  const [grade, setGrade] = useState<GradeLevel>(initialGrade);
  const [subjectId, setSubjectId] = useState(initialSubjectId);
  const [topic, setTopic] = useState('Pecahan Senilai dan Perbandingan');
  const [learningGoal, setLearningGoal] = useState('Peserta didik mampu membuktikan dan menentukan pecahan senilai melalui model konkret dan visual');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<Partial<LKPD> | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    const subjectObj = SUBJECTS.find(s => s.id === subjectId);
    const subjectName = subjectObj ? subjectObj.name : 'Tematik';

    try {
      const data = await generateLkpdWithAi(topic, grade, subjectName, learningGoal);
      setGeneratedResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (!generatedResult) return;

    const newLkpd: LKPD = {
      id: `lkpd-custom-${Date.now()}`,
      title: generatedResult.title || `LKPD: ${topic}`,
      subjectId,
      grade,
      learningGoal: generatedResult.learningGoal || learningGoal,
      estimatedTime: generatedResult.estimatedTime || '20 Menit',
      instructions: generatedResult.instructions || ['Baca petunjuk dengan teliti', 'Jawab setiap pertanyaan'],
      activities: generatedResult.activities || [
        {
          id: 'act-1',
          stepNumber: 1,
          title: 'Pengamatan Mandiri',
          instruction: 'Amati contoh yang ada di sekitarmu.',
          promptQuestion: 'Apa kesimpulan yang kamu dapatkan?',
          studentInputType: 'text',
        }
      ],
      reflectionQuestions: generatedResult.reflectionQuestions || ['Apa yang kamu pelajari hari ini?'],
      createdBy: 'Bapak/Ibu Guru (Dibuat dengan Bantuan AI Rumah Ilmu)',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSaveLkpd(newLkpd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto overflow-hidden shadow-2xl border-4 border-amber-300 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display">✨ GENERATE LKPD DENGAN AI</h3>
              <p className="text-xs text-white/90">Buat Lembar Kerja Peserta Didik digital & siap cetak otomatis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {!generatedResult ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Pilih Kelas SD:
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full text-sm font-bold p-3 rounded-xl border border-slate-300 bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map(g => (
                      <option key={g} value={g}>Kelas {g} SD</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Mata Pelajaran:
                  </label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="w-full text-sm font-bold p-3 rounded-xl border border-slate-300 bg-white"
                  >
                    {SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Materi / Topik Pembelajaran:
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Contoh: Pecahan Senilai, Fotosintesis, Huruf Vokal..."
                  className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Tujuan Pembelajaran:
                </label>
                <textarea
                  rows={2}
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  placeholder="Tujuan yang ingin dicapai siswa..."
                  className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition active:scale-98"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sedang Merancang LKPD Cerdas...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    ✨ GENERATE LKPD
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Hasil LKPD Berhasil Dibuat</span>
                <h4 className="font-black text-slate-900 text-lg mt-0.5">{generatedResult.title}</h4>
                <p className="text-xs text-slate-600 mt-1">🎯 {generatedResult.learningGoal}</p>
                <p className="text-xs text-amber-700 font-semibold mt-0.5">⏱️ Waktu: {generatedResult.estimatedTime}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-slate-500">Pratinjau Aktivitas:</p>
                {generatedResult.activities?.map((act, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <p className="font-bold text-slate-800">{i + 1}. {act.title}</p>
                    <p className="text-slate-600 mt-0.5">{act.instruction}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setGeneratedResult(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl"
                >
                  Ubah Parameter
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30"
                >
                  <Check className="w-4 h-4" />
                  Simpan & Terbitkan LKPD
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
