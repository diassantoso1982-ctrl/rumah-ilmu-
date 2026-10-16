import React, { useState } from 'react';
import { ParentTeacherNote, UserRole, GradeLevel, UserProfile, StudentRecord } from '../types';
import { MessageSquare, Send, Heart, User, School, Sparkles, CheckCircle2, Users } from 'lucide-react';

interface CommunicationCenterProps {
  notes: ParentTeacherNote[];
  userRole: UserRole;
  userProfile?: UserProfile;
  students?: StudentRecord[];
  activeStudent?: StudentRecord;
  onSendNote: (newNote: ParentTeacherNote) => void;
}

export const CommunicationCenter: React.FC<CommunicationCenterProps> = ({
  notes,
  userRole,
  userProfile,
  students,
  activeStudent,
  onSendNote,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('semua');
  const [filterStudent, setFilterStudent] = useState<string>('semua');
  const [newMessage, setNewMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'apresiasi' | 'perkembangan' | 'tugas' | 'kendala' | 'saran'>('apresiasi');
  const [targetStudentName, setTargetStudentName] = useState(activeStudent?.name || 'Ahmad Faiz Fadillah');
  const [senderName, setSenderName] = useState(
    userRole === 'guru'
      ? (userProfile?.teacherName || 'Ibu Ratna Dewi, S.Pd.')
      : (userProfile?.parentName || 'Ibu Siti Rahmawati (Bunda)')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const note: ParentTeacherNote = {
      id: `note-${Date.now()}`,
      senderName,
      senderRole: userRole === 'guru' ? 'guru' : 'orang_tua',
      date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }),
      studentName: targetStudentName,
      grade: activeStudent?.grade || 5,
      subjectName: 'Matematika & Tematik',
      category: selectedCategory,
      message: newMessage,
      status: 'baru',
    };

    onSendNote(note);
    setNewMessage('');
  };

  const filteredNotes = notes.filter(n => {
    if (filterCategory === 'semua') return true;
    return n.category === filterCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Jembatan Kemitraan
          </span>
          <h1 className="text-2xl md:text-4xl font-black font-display mt-2">
            👨‍👩‍👧 Komunikasi Guru & Orang Tua
          </h1>
          <p className="text-white/90 text-sm mt-1">
            Ruang berbagi apresiasi, informasi tugas, dan perkembangan ananda secara hangat dan solutif.
          </p>
        </div>
        <div className="text-5xl hidden sm:block">
          💌
        </div>
      </div>

      {/* Write New Note Form */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-slate-100 space-y-4">
        <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          Kirim Catatan / Apresiasi Baru
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-2xs font-bold uppercase text-slate-600 mb-1">Pengirim:</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-2xs font-bold uppercase text-slate-600 mb-1">Nama Siswa / Murid:</label>
              {students && students.length > 0 ? (
                <select
                  value={targetStudentName}
                  onChange={(e) => setTargetStudentName(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={targetStudentName}
                  onChange={(e) => setTargetStudentName(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 bg-white"
                />
              )}
            </div>
            <div>
              <label className="block text-2xs font-bold uppercase text-slate-600 mb-1">Kategori Catatan:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 bg-white"
              >
                <option value="apresiasi">⭐ Apresiasi & Pujian</option>
                <option value="perkembangan">📈 Catatan Perkembangan</option>
                <option value="tugas">📋 Info Tugas & Aktivitas Rumah</option>
                <option value="saran">💡 Saran Pendampingan</option>
                <option value="kendala">💬 Kendala Belajar</option>
              </select>
            </div>
          </div>

          <div>
            <textarea
              rows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Tuliskan catatan yang santun dan membangun..."
              className="w-full text-sm p-3 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition active:scale-95"
            >
              <Send className="w-4 h-4" /> Kirim Catatan
            </button>
          </div>
        </form>
      </div>

      {/* Notes Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Riwayat Komunikasi & Catatan</h3>
          <div className="flex gap-1.5 text-xs">
            {['semua', 'apresiasi', 'perkembangan', 'tugas'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg font-bold capitalize transition ${
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`p-5 rounded-3xl border-2 transition ${
                note.senderRole === 'guru'
                  ? 'bg-blue-50/60 border-blue-200'
                  : 'bg-amber-50/60 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {note.senderRole === 'guru' ? '👩‍🏫' : '👨‍👩‍👧'}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{note.senderName}</h4>
                    <p className="text-2xs text-slate-500">
                      Siswa: {note.studentName} (Kelas {note.grade}) • {note.date}
                    </p>
                  </div>
                </div>

                <span className={`text-2xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                  note.category === 'apresiasi'
                    ? 'bg-rose-100 text-rose-800'
                    : note.category === 'perkembangan'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {note.category}
                </span>
              </div>

              <p className="text-sm text-slate-800 leading-relaxed bg-white/70 p-3 rounded-2xl border border-white">
                {note.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
