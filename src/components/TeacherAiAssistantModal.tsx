import React, { useState } from 'react';
import { X, Sparkles, Loader2, Check, BookOpen, Heart, HelpCircle, CheckCircle } from 'lucide-react';
import { GradeLevel, LearningMaterial, LKPD } from '../types';
import { SUBJECTS } from '../data/mockData';
import { generateMateriWithAi } from '../services/geminiService';

interface TeacherAiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveMaterial: (material: LearningMaterial) => void;
  onSaveLkpd?: (lkpd: LKPD) => void;
}

export const TeacherAiAssistantModal: React.FC<TeacherAiAssistantModalProps> = ({
  isOpen,
  onClose,
  onSaveMaterial,
  onSaveLkpd,
}) => {
  const [promptText, setPromptText] = useState('Buatkan materi daur air dan presipitasi kelas 4 IPAS lengkap dengan percobaan');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(4);
  const [selectedSubjectId, setSelectedSubjectId] = useState('ipas');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedMaterial, setGeneratedMaterial] = useState<LearningMaterial | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsLoading(true);
    const subjectObj = SUBJECTS.find(s => s.id === selectedSubjectId);
    const subjectName = subjectObj ? subjectObj.name : 'Matematika';

    try {
      const data = await generateMateriWithAi(promptText, selectedGrade, subjectName);
      setGeneratedMaterial(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (!generatedMaterial) return;

    const id = `mat-ai-${Date.now()}`;
    const newMat: LearningMaterial = {
      id,
      title: generatedMaterial.title || promptText,
      subjectId: selectedSubjectId,
      grade: selectedGrade,
      theme: generatedMaterial.theme || 'Pembelajaran Tematik Terpadu',
      learningGoals: generatedMaterial.learningGoals || ['Memahami konsep inti', 'Mempraktikkan dalam kehidupan nyata'],
      apperception: generatedMaterial.apperception || 'Mari amati hal di sekitarmu!',
      coreContent: generatedMaterial.coreContent || [
        {
          sectionTitle: 'Mengenal Konsep',
          text: 'Penjelasan terpadu materi yang menyenangkan.',
        }
      ],
      examples: generatedMaterial.examples || [
        {
          situation: 'Contoh nyata di rumah',
          explanation: 'Penerapan konsep secara konkret.',
        }
      ],
      studentActivity: generatedMaterial.studentActivity || {
        title: 'Aktivitas Mandiri',
        instructions: ['Amati', 'Catat', 'Ceritakan'],
        deliverable: 'Jurnal belajar',
      },
      video: generatedMaterial.video || {
        title: `Video Pembelajaran: ${promptText}`,
        duration: '3 menit',
        reflectionPrompt: 'Apa yang kamu pelajari dari video?',
      },
      practiceQuestions: generatedMaterial.practiceQuestions || [
        {
          id: 'q1',
          type: 'pilihan_ganda',
          question: 'Soal pemahaman dasar?',
          options: ['Jawaban A', 'Jawaban B', 'Jawaban C', 'Jawaban D'],
          correctAnswer: 'Jawaban A',
          explanation: 'Penjelasan jawaban benar.',
          encouragement: 'Hebat sekali!',
        }
      ],
      reflection: generatedMaterial.reflection || {
        questions: ['Bagian mana yang paling kamu sukai?'],
        reminder: 'Teruslah bersemangat belajar!',
      },
      summary: generatedMaterial.summary || ['Kesimpulan materi pembelajaran.'],
      parentGuide: generatedMaterial.parentGuide || {
        summary: 'Ringkasan untuk orang tua.',
        guidance: 'Dampingi dengan santai dan hangat.',
        promptQuestions: ['Pertanyaan 1', 'Pertanyaan 2'],
        homeActivityDuration: '10–15 Menit',
        homeActivity: 'Aktivitas sederhana bersama orang tua.',
        exampleScenario: 'Di ruang makan atau ruang tamu.',
        parentMindset: 'Dengarkan dan beri motivasi.',
      },
    };

    onSaveMaterial(newMat);

    // Also auto-create a matching LKPD if handler provided
    if (onSaveLkpd) {
      const newLkpd: LKPD = {
        id: `lkpd-${id}`,
        title: `LKPD: ${newMat.title}`,
        subjectId: selectedSubjectId,
        grade: selectedGrade,
        learningGoal: newMat.learningGoals[0] || 'Mencapai pemahaman kompetensi materi',
        estimatedTime: '20 Menit',
        instructions: [
          'Tuliskan namamu dengan lengkap',
          'Ikuti instruksi aktivitas tahap demi tahap',
          'Diskusikan bersama orang tua di rumah'
        ],
        activities: [
          {
            id: 'act-1',
            stepNumber: 1,
            title: newMat.studentActivity.title,
            instruction: newMat.studentActivity.instructions.join('. '),
            promptQuestion: 'Apa kesimpulan yang kamu peroleh?',
            studentInputType: 'text',
          }
        ],
        reflectionQuestions: newMat.reflection.questions,
        createdBy: 'Bapak/Ibu Guru (Bantuan AI Rumah Ilmu)',
        createdAt: new Date().toISOString().split('T')[0],
      };
      onSaveLkpd(newLkpd);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-auto overflow-hidden shadow-2xl border-4 border-amber-300 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              ✨
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black font-display">BANTUAN AI GURU</h3>
              <p className="text-xs text-white/90">
                Ketik satu kalimat perintah, AI menyusun 10 bagian materi, LKPD, kuis & panduan orang tua!
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {!generatedMaterial ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                💡 <strong>Contoh Perintah Guru:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    'Buatkan materi pecahan kelas 5',
                    'Buatkan materi siklus air kelas 4 IPAS',
                    'Buatkan materi dongeng fabel kelas 2 Bahasa Indonesia',
                    'Buatkan materi gotong royong kelas 3 Pancasila'
                  ].map((eg, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPromptText(eg)}
                      className="bg-white px-2.5 py-1 rounded-lg border border-amber-300 font-semibold text-amber-800 hover:bg-amber-100 transition"
                    >
                      {eg}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Kalimat Permintaan Guru:
                </label>
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Misal: Buatkan materi bangun ruang kubus dan balok kelas 5"
                  className="w-full text-base font-bold p-3.5 rounded-2xl border-2 border-slate-300 bg-white focus:border-amber-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                    Sasaran Kelas:
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(Number(e.target.value) as GradeLevel)}
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
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-full text-sm font-bold p-3 rounded-xl border border-slate-300 bg-white"
                  >
                    {SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Sedang Meracik Materi Lengkap dengan AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    ✨ BUAT MATERI & PERANGKAT LENGKAP
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-5 bg-emerald-50 rounded-2xl border-2 border-emerald-300">
                <span className="text-2xs font-extrabold uppercase bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full">
                  Sukses Dibuat oleh AI
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-2 font-display">
                  {generatedMaterial.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Kelas {selectedGrade} SD • {generatedMaterial.theme}
                </p>
              </div>

              {/* Sections summary preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <p className="font-bold text-slate-800">🎯 Tujuan Pembelajaran ({generatedMaterial.learningGoals?.length || 0})</p>
                  <p className="text-slate-600 mt-0.5 truncate">{generatedMaterial.learningGoals?.[0]}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <p className="font-bold text-slate-800">❤️ Panduan Orang Tua (10–15 Menit)</p>
                  <p className="text-slate-600 mt-0.5 truncate">{generatedMaterial.parentGuide?.homeActivity}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <p className="font-bold text-slate-800">✂️ Aktivitas Siswa</p>
                  <p className="text-slate-600 mt-0.5 truncate">{generatedMaterial.studentActivity?.title}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border">
                  <p className="font-bold text-slate-800">❓ Latihan & Kuis ({generatedMaterial.practiceQuestions?.length || 0} Soal)</p>
                  <p className="text-slate-600 mt-0.5">Latihan interaktif ramah anak dengan feedback</p>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setGeneratedMaterial(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl"
                >
                  Ubah Permintaan
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <Check className="w-4 h-4" />
                  Terbitkan Materi & Perangkat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
