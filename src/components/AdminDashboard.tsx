import React, { useState } from 'react';
import { Subject, LearningMaterial, LKPD } from '../types';
import { SUBJECTS } from '../data/mockData';
import { ShieldCheck, Plus, Trash2, Edit3, Settings, Bell, BookOpen, Layers, Users } from 'lucide-react';

interface AdminDashboardProps {
  materials: LearningMaterial[];
  lkpds: LKPD[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ materials, lkpds }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'ringkasan' | 'mapel' | 'pengumuman'>('ringkasan');
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Peluncuran Modul Digital Semester Ganjil', date: '2026-10-01', target: 'Semua Pengguna' },
    { id: 2, title: 'Jadwal Pendampingan Belajar Bersama Orang Tua', date: '2026-10-05', target: 'Orang Tua & Guru' },
  ]);
  const [newAnnounceTitle, setNewAnnounceTitle] = useState('');

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnounceTitle.trim()) return;
    setAnnouncements(prev => [
      ...prev,
      {
        id: Date.now(),
        title: newAnnounceTitle,
        date: new Date().toISOString().split('T')[0],
        target: 'Semua Pengguna'
      }
    ]);
    setNewAnnounceTitle('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Pengaturan Sistem
          </span>
          <h1 className="text-2xl md:text-3xl font-black font-display mt-2">
            ⚙️ Dashboard Admin Rumah Ilmu
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Manajemen kelas 1–6, mata pelajaran kurikulum, materi, video, kuis, dan pengumuman sekolah.
          </p>
        </div>
        <div className="text-4xl">
          🛡️
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'ringkasan', label: '📊 Ringkasan Data' },
          { id: 'mapel', label: '📚 Kurikulum & Mapel' },
          { id: 'pengumuman', label: '📢 Pengumuman Sekolah' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-4 py-2 font-bold text-xs md:text-sm rounded-xl transition ${
              activeAdminTab === tab.id
                ? 'bg-slate-900 text-white'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeAdminTab === 'ringkasan' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-2xs font-extrabold uppercase text-slate-400">Total Materi</span>
            <p className="text-3xl font-black text-blue-600 font-display mt-1">{materials.length}</p>
            <p className="text-2xs text-slate-500 mt-1">Kelas 1 s.d. 6 SD</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-2xs font-extrabold uppercase text-slate-400">LKPD Digital</span>
            <p className="text-3xl font-black text-amber-600 font-display mt-1">{lkpds.length}</p>
            <p className="text-2xs text-slate-500 mt-1">Siap dikerjakan & dicetak</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-2xs font-extrabold uppercase text-slate-400">Mata Pelajaran</span>
            <p className="text-3xl font-black text-emerald-600 font-display mt-1">{SUBJECTS.length}</p>
            <p className="text-2xs text-slate-500 mt-1">Kurikulum Merdeka</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-2xs font-extrabold uppercase text-slate-400">Game Edukasi</span>
            <p className="text-3xl font-black text-purple-600 font-display mt-1">4</p>
            <p className="text-2xs text-slate-500 mt-1">Roda, Kata, Dadu, Detektif</p>
          </div>
        </div>
      )}

      {activeAdminTab === 'mapel' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Mata Pelajaran Terdaftar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SUBJECTS.map(s => (
              <div key={s.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{s.name}</h5>
                    <p className="text-3xs text-slate-500">Kelas {s.grades.join(', ')}</p>
                  </div>
                </div>
                <span className="text-2xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Aktif
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeAdminTab === 'pengumuman' && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
          <h3 className="font-bold text-slate-900 text-sm">Kelola Pengumuman Sekolah & Portal</h3>

          <form onSubmit={handleAddAnnouncement} className="flex gap-2">
            <input
              type="text"
              placeholder="Tuliskan judul pengumuman baru..."
              value={newAnnounceTitle}
              onChange={(e) => setNewAnnounceTitle(e.target.value)}
              className="flex-1 text-xs p-3 rounded-xl border border-slate-300"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
            >
              Tambah
            </button>
          </form>

          <div className="space-y-2">
            {announcements.map(ann => (
              <div key={ann.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{ann.title}</h4>
                  <p className="text-3xs text-slate-500 mt-0.5">{ann.date} • Sasaran: {ann.target}</p>
                </div>
                <button
                  onClick={() => setAnnouncements(prev => prev.filter(a => a.id !== ann.id))}
                  className="text-slate-400 hover:text-rose-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
