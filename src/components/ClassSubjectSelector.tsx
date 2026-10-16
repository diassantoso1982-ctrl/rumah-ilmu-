import React from 'react';
import { GradeLevel, Subject } from '../types';
import { SUBJECTS } from '../data/mockData';

interface ClassSubjectSelectorProps {
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  selectedSubjectId: string;
  onSelectSubject: (subjectId: string) => void;
}

export const ClassSubjectSelector: React.FC<ClassSubjectSelectorProps> = ({
  currentGrade,
  onSelectGrade,
  selectedSubjectId,
  onSelectSubject,
}) => {
  const gradeConfigs: { grade: GradeLevel; label: string; dot: string; colorClass: string }[] = [
    { grade: 1, label: 'Kelas 1', dot: '🟢', colorClass: 'border-emerald-400 bg-emerald-50 text-emerald-950' },
    { grade: 2, label: 'Kelas 2', dot: '🔵', colorClass: 'border-blue-400 bg-blue-50 text-blue-950' },
    { grade: 3, label: 'Kelas 3', dot: '🟡', colorClass: 'border-yellow-400 bg-yellow-50 text-yellow-950' },
    { grade: 4, label: 'Kelas 4', dot: '🟠', colorClass: 'border-orange-400 bg-orange-50 text-orange-950' },
    { grade: 5, label: 'Kelas 5', dot: '🟣', colorClass: 'border-purple-400 bg-purple-50 text-purple-950' },
    { grade: 6, label: 'Kelas 6', dot: '🔴', colorClass: 'border-rose-400 bg-rose-50 text-rose-950' },
  ];

  // Filter subjects available for current grade
  const availableSubjects = SUBJECTS.filter(s => s.grades.includes(currentGrade));

  return (
    <div className="space-y-6">
      {/* 3. PEMILIHAN KELAS BUTTONS */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border-2 border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-sm uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <span>🏫</span> PILIH TINGKAT KELAS:
          </h3>
          <span className="text-2xs font-extrabold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
            Jenjang Sekolah Dasar
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {gradeConfigs.map((cfg) => {
            const isSelected = currentGrade === cfg.grade;
            return (
              <button
                key={cfg.grade}
                onClick={() => onSelectGrade(cfg.grade)}
                className={`py-3 px-3 rounded-2xl font-black text-sm border-2 transition active:scale-95 flex items-center justify-center gap-2 shadow-2xs ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                    : `bg-white hover:bg-slate-50 border-slate-200 text-slate-800`
                }`}
              >
                <span>{cfg.dot}</span>
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MATA PELAJARAN UNTUK KELAS TERPILIH */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <span>📚</span> Mata Pelajaran Kelas {currentGrade} SD
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            {availableSubjects.length} Mata Pelajaran
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <button
            onClick={() => onSelectSubject('semua')}
            className={`p-3.5 rounded-2xl text-left border-2 transition active:scale-95 flex flex-col justify-between ${
              selectedSubjectId === 'semua'
                ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <span className="text-2xl mb-1">🌟</span>
            <div>
              <p className="font-black text-xs">Semua Mapel</p>
              <p className={`text-3xs mt-0.5 ${selectedSubjectId === 'semua' ? 'text-white/80' : 'text-slate-400'}`}>
                Lihat Semua
              </p>
            </div>
          </button>

          {availableSubjects.map((sub) => {
            const isSelected = selectedSubjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectSubject(sub.id)}
                className={`p-3.5 rounded-2xl text-left border-2 transition active:scale-95 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <span className="text-2xl mb-1">{sub.icon}</span>
                <div>
                  <p className="font-black text-xs leading-snug line-clamp-1">{sub.name}</p>
                  <p className={`text-3xs mt-0.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    {sub.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
