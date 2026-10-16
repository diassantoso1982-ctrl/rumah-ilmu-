import React, { useState } from 'react';
import {
  UserRole,
  GradeLevel,
  LearningMaterial,
  LKPD,
  StudentProgress,
  ParentTeacherNote,
  DailyLearningRecommendation,
  UserProfile,
  StudentRecord,
  StudentActivityLog
} from './types';
import {
  SAMPLE_MATERIALS,
  SAMPLE_LKPDS,
  INITIAL_STUDENT_PROGRESS,
  INITIAL_TEACHER_NOTES,
  DAILY_RECOMMENDATIONS,
  SUBJECTS,
  INITIAL_USER_PROFILE,
  INITIAL_STUDENTS
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { ClassSubjectSelector } from './components/ClassSubjectSelector';
import { MaterialViewer } from './components/MaterialViewer';
import { LkpdViewer } from './components/LkpdViewer';
import { EduGames } from './components/EduGames';
import { ParentGuideView } from './components/ParentGuideView';
import { StudentProgressView } from './components/StudentProgressView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { CommunicationCenter } from './components/CommunicationCenter';
import { SahabatIlmuChat } from './components/SahabatIlmuChat';
import { StudentProfileView } from './components/StudentProfileView';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutModal } from './components/ShareModal';
import { QuizInteractive } from './components/QuizInteractive';
import { AudioGuideModal } from './components/AudioGuideModal';
import { VoiceGuideFloatingButton } from './components/VoiceGuideFloatingButton';
import { InteractiveVideoPlayer } from './components/InteractiveVideoPlayer';
import { AudioNarratorButton } from './components/AudioNarratorButton';
import { IdentityProfileModal } from './components/IdentityProfileModal';
import { QuickTeacherMateriPromptBar } from './components/QuickTeacherMateriPromptBar';
import {
  BookOpen,
  FileText,
  Gamepad2,
  Video,
  HelpCircle,
  TrendingUp,
  Heart,
  School,
  Play,
  ArrowRight,
  Sparkles,
  Plus,
  Youtube,
  ExternalLink,
  Search
} from 'lucide-react';
import { resolveYouTubeVideo, getYouTubeSearchUrl } from './services/youtubeEducationService';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>('siswa');
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>(5);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('semua');
  const [activeNav, setActiveNav] = useState<string>('beranda');

  // Materials & LKPDs state
  const [materials, setMaterials] = useState<LearningMaterial[]>(SAMPLE_MATERIALS);
  const [selectedMaterial, setSelectedMaterial] = useState<LearningMaterial | null>(SAMPLE_MATERIALS[0]);
  const [lkpds, setLkpds] = useState<LKPD[]>(SAMPLE_LKPDS);
  const [selectedLkpd, setSelectedLkpd] = useState<LKPD | null>(SAMPLE_LKPDS[0]);

  // Identity & Students state
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [activeStudentId, setActiveStudentId] = useState<string>(INITIAL_USER_PROFILE.activeStudentId);
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);

  // Active student object
  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];

  // Student progress & gamification synced with activeStudent
  const studentProgress = activeStudent.progress;
  const [teacherNotes, setTeacherNotes] = useState<ParentTeacherNote[]>(INITIAL_TEACHER_NOTES);
  const [dailyTasks, setDailyTasks] = useState<DailyLearningRecommendation[]>(DAILY_RECOMMENDATIONS);

  // Modals
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAudioGuideOpen, setIsAudioGuideOpen] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<LearningMaterial | null>(null);
  const [videoSearchQuery, setVideoSearchQuery] = useState('');

  // Record an activity for the active student in real-time
  const handleLogActivity = (
    activityType: 'materi' | 'lkpd' | 'kuis' | 'video' | 'game' | 'pendampingan_ortu',
    title: string,
    subjectName: string,
    details: string,
    score?: number,
    stars = 10,
    accompaniedByParent = userRole === 'orang_tua'
  ) => {
    const newLog: StudentActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      activityType,
      title,
      subjectName,
      score,
      details,
      accompaniedByParent,
      starsEarned: stars
    };

    setStudents(prev =>
      prev.map(st => {
        if (st.id === activeStudentId) {
          return {
            ...st,
            activityLogs: [newLog, ...st.activityLogs],
            progress: {
              ...st.progress,
              totalStars: st.progress.totalStars + stars
            }
          };
        }
        return st;
      })
    );
  };

  // Handlers
  const handleAddStar = (amount = 5) => {
    setStudents(prev =>
      prev.map(st => {
        if (st.id === activeStudentId) {
          return {
            ...st,
            progress: {
              ...st.progress,
              totalStars: st.progress.totalStars + amount
            }
          };
        }
        return st;
      })
    );
  };

  const handleTeacherAddFeedback = (studentId: string, logId: string, feedback: string) => {
    setStudents(prev =>
      prev.map(st => {
        if (st.id === studentId) {
          return {
            ...st,
            activityLogs: st.activityLogs.map(l =>
              l.id === logId ? { ...l, teacherFeedback: feedback } : l
            )
          };
        }
        return st;
      })
    );
  };

  const handleTeacherAwardBonusStar = (studentId: string, amount: number, note: string) => {
    const bonusLog: StudentActivityLog = {
      id: `act-bonus-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      activityType: 'materi',
      title: `⭐ Bonus Bintang dari Guru (${userProfile.teacherName})`,
      subjectName: 'Apresiasi Karakter',
      details: note,
      accompaniedByParent: false,
      teacherFeedback: note,
      starsEarned: amount
    };

    setStudents(prev =>
      prev.map(st => {
        if (st.id === studentId) {
          return {
            ...st,
            activityLogs: [bonusLog, ...st.activityLogs],
            progress: {
              ...st.progress,
              totalStars: st.progress.totalStars + amount
            }
          };
        }
        return st;
      })
    );
  };

  const handleToggleDailyTask = (id: string) => {
    setDailyTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            handleAddStar(10);
            handleLogActivity('materi', `Misi Harian: ${t.title}`, 'Tantangan Belajar', 'Menyelesaikan misi harian terjadwal', undefined, 10);
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const handleSendTeacherNote = (newNoteOrText: ParentTeacherNote | string) => {
    if (typeof newNoteOrText === 'string') {
      const note: ParentTeacherNote = {
        id: `note-${Date.now()}`,
        senderName: userRole === 'guru' ? userProfile.teacherName : userProfile.parentName,
        senderRole: userRole === 'guru' ? 'guru' : 'orang_tua',
        date: new Date().toLocaleDateString('id-ID'),
        studentName: activeStudent.name,
        grade: currentGrade,
        subjectName: selectedMaterial?.title || 'Tematik',
        category: 'apresiasi',
        message: newNoteOrText,
        status: 'baru'
      };
      setTeacherNotes(prev => [note, ...prev]);
    } else {
      setTeacherNotes(prev => [newNoteOrText, ...prev]);
    }
  };

  const handleSaveNewMaterial = (newMat: LearningMaterial, autoOpen = false) => {
    setMaterials(prev => {
      const filtered = prev.filter(m => m.id !== newMat.id);
      return [newMat, ...filtered];
    });
    setSelectedMaterial(newMat);
    if (autoOpen) {
      setActiveNav('materi_detail');
    } else {
      setActiveNav('materi');
    }
  };

  const handleSaveNewLkpd = (newLkpd: LKPD) => {
    setLkpds(prev => {
      const filtered = prev.filter(l => l.id !== newLkpd.id);
      return [newLkpd, ...filtered];
    });
    setSelectedLkpd(newLkpd);
    setActiveNav('lkpd');
  };

  // Filtered materials for current grade & subject
  const currentGradeMaterials = materials.filter(m => m.grade === currentGrade);
  const filteredMaterials = selectedSubjectId === 'semua'
    ? currentGradeMaterials
    : currentGradeMaterials.filter(m => m.subjectId === selectedSubjectId);

  // Filtered LKPDs for current grade
  const currentGradeLkpds = lkpds.filter(l => l.grade === currentGrade);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* 2. Top Navigation Bar */}
      <Navbar
        currentRole={userRole}
        onSelectRole={setUserRole}
        currentGrade={currentGrade}
        onSelectGrade={setCurrentGrade}
        activeNav={activeNav}
        onSelectNav={setActiveNav}
        totalStars={studentProgress.totalStars}
        streakDays={studentProgress.streakDays}
        userProfile={userProfile}
        activeStudent={activeStudent}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenVoiceGuide={() => setIsAudioGuideOpen(true)}
        onOpenIdentitySettings={() => setIsIdentityModalOpen(true)}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: BERANDA */}
        {activeNav === 'beranda' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <HomeHero
              currentRole={userRole}
              onSelectRole={setUserRole}
              onSelectNav={setActiveNav}
              onSelectRuang={(ruangSubId) => {
                setSelectedSubjectId(ruangSubId);
                setActiveNav('materi');
              }}
              dailyTasks={dailyTasks}
              onToggleDailyTask={handleToggleDailyTask}
              onOpenAbout={() => setIsAboutModalOpen(true)}
              onOpenVoiceGuide={() => setIsAudioGuideOpen(true)}
              userProfile={userProfile}
              activeStudent={activeStudent}
              onOpenIdentitySettings={() => setIsIdentityModalOpen(true)}
            />

            {/* Quick Class & Subject Browser */}
            <ClassSubjectSelector
              currentGrade={currentGrade}
              onSelectGrade={setCurrentGrade}
              selectedSubjectId={selectedSubjectId}
              onSelectSubject={setSelectedSubjectId}
            />

            {/* Featured Materials Highlights */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    Materi Pilihan Kelas {currentGrade} SD
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    10 bagian materi lengkap dengan fitur “Belajar Bersama Orang Tua”
                  </p>
                </div>
                <button
                  onClick={() => setActiveNav('materi')}
                  className="flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  Lihat Semua Materi <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMaterials.map((mat) => (
                  <div
                    key={mat.id}
                    onClick={() => {
                      setSelectedMaterial(mat);
                      setActiveNav('materi_detail');
                    }}
                    className="group cursor-pointer bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-2xs font-extrabold uppercase bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                          Kelas {mat.grade} SD
                        </span>
                        <span className="text-2xs text-slate-400 font-bold truncate">
                          {mat.theme}
                        </span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base leading-snug group-hover:text-amber-600 transition">
                        {mat.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                        {mat.apperception}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-2xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-rose-600" /> Panduan Ortu
                      </span>
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        Pelajari <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: MATERI LIST */}
        {activeNav === 'materi' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {userRole === 'guru' && (
              <QuickTeacherMateriPromptBar
                currentGrade={currentGrade}
                onMaterialCreated={(mat, autoOpen) => handleSaveNewMaterial(mat, autoOpen)}
                onLkpdCreated={handleSaveNewLkpd}
                onSendNoteToParents={(title, subject, note) => handleSendTeacherNote(`[Materi Baru - ${subject}] ${title}: ${note}`)}
                userProfile={userProfile}
                students={students}
              />
            )}

            <ClassSubjectSelector
              currentGrade={currentGrade}
              onSelectGrade={setCurrentGrade}
              selectedSubjectId={selectedSubjectId}
              onSelectSubject={setSelectedSubjectId}
            />

            <div className="flex items-center justify-between pt-2">
              <h2 className="text-xl font-black text-slate-900 font-display">
                Daftar Modul Belajar ({filteredMaterials.length} Materi)
              </h2>
              {userRole === 'guru' && (
                <button
                  onClick={() => setActiveNav('ruang_guru')}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Buka Ruang Guru
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map((mat) => (
                <div
                  key={mat.id}
                  onClick={() => {
                    setSelectedMaterial(mat);
                    setActiveNav('materi_detail');
                  }}
                  className="group cursor-pointer bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-2xs font-extrabold uppercase bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                        Kelas {mat.grade} SD
                      </span>
                      <span className="text-2xs text-slate-400 font-bold truncate">
                        {mat.theme}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-900 text-base leading-snug group-hover:text-amber-600 transition">
                      {mat.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {mat.apperception}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-2xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-600" /> Belajar Bersama Ortu
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      Buka Materi <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: MATERI DETAIL (FULL 10 SECTIONS) */}
        {activeNav === 'materi_detail' && selectedMaterial && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <button
              onClick={() => setActiveNav('materi')}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5"
            >
              ← Kembali ke Daftar Materi
            </button>
            <MaterialViewer
              material={selectedMaterial}
              userRole={userRole}
              onOpenLkpd={() => {
                // Find matching or default LKPD
                const matchedLkpd = lkpds.find(l => l.subjectId === selectedMaterial.subjectId && l.grade === selectedMaterial.grade) || lkpds[0];
                setSelectedLkpd(matchedLkpd);
                setActiveNav('lkpd_detail');
              }}
              onOpenGame={() => setActiveNav('game')}
              onAddStar={() => {
                handleAddStar(5);
                handleLogActivity('materi', selectedMaterial.title, selectedMaterial.theme, 'Membaca dan menuntaskan materi pembelajaran 10 bagian.', undefined, 5);
              }}
              onSendTeacherNote={handleSendTeacherNote}
            />
          </div>
        )}

        {/* VIEW 4: LKPD LIST & VIEWER */}
        {activeNav === 'lkpd' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <ClassSubjectSelector
              currentGrade={currentGrade}
              onSelectGrade={setCurrentGrade}
              selectedSubjectId={selectedSubjectId}
              onSelectSubject={setSelectedSubjectId}
            />

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 font-display">
                  Lembar Kerja Peserta Didik (LKPD) Digital
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Bisa dikerjakan langsung di gawai atau dicetak rapi di kertas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGradeLkpds.map((lk) => (
                <div
                  key={lk.id}
                  className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-xs hover:border-amber-400 transition space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xs font-extrabold uppercase bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                        Kelas {lk.grade} SD • {lk.estimatedTime}
                      </span>
                      <span className="text-2xs text-slate-400 font-semibold">{lk.createdAt}</span>
                    </div>
                    <h4 className="font-black text-slate-900 text-base">{lk.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      🎯 {lk.learningGoal}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-2xs text-slate-500 font-bold">
                      {lk.activities.length} Misi Belajar
                    </span>
                    <button
                      onClick={() => {
                        setSelectedLkpd(lk);
                        setActiveNav('lkpd_detail');
                      }}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition"
                    >
                      Buka & Kerjakan LKPD →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: LKPD DETAIL */}
        {activeNav === 'lkpd_detail' && selectedLkpd && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <LkpdViewer
              lkpd={selectedLkpd}
              initialStudentName={activeStudent.name}
              initialCompanionName={userRole === 'guru' ? userProfile.teacherName : userProfile.parentName}
              onBack={() => setActiveNav('lkpd')}
              onAddStar={() => handleAddStar(10)}
              onSaveProgress={(stdName, lkTitle) => {
                handleLogActivity('lkpd', lkTitle, 'Lembar Kerja Siswa', `Mengerjakan dan menyimpan LKPD Digital atas nama ${stdName}.`, undefined, 15);
              }}
            />
          </div>
        )}

        {/* VIEW 6: EDU GAMES */}
        {activeNav === 'game' && (
          <div className="animate-in fade-in duration-200">
            <EduGames
              onAddStar={() => {
                handleAddStar(5);
                handleLogActivity('game', 'Bermain Game Edukasi', 'Arena Game', 'Bermain game edukasi interaktif dan mengasah daya nalar.', undefined, 5);
              }}
            />
          </div>
        )}

        {/* VIEW 7: VIDEO PEMBELAJARAN (SAMBUNG LANGSUNG DENGAN YOUTUBE) */}
        {activeNav === 'video' && (
          <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
            <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
                  <Youtube className="w-3.5 h-3.5" />
                  <span>Bioskop Mini Edukasi YouTube</span>
                </span>
                <h1 className="text-2xl md:text-4xl font-black font-display mt-2">
                  🎬 Video Pembelajaran Kelas {currentGrade} SD
                </h1>
                <p className="text-white/90 text-sm mt-1 max-w-xl">
                  Tersambung langsung dengan ribuan video YouTube edukatif resmi (Kemendikbud, TV Edukasi, Kok Bisa?) sesuai materi Kurikulum Merdeka.
                </p>
              </div>
              <div className="text-5xl hidden sm:block">
                🍿
              </div>
            </div>

            {/* Quick YouTube Search & Topic Connect Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-red-200 shadow-sm space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={videoSearchQuery}
                    onChange={(e) => setVideoSearchQuery(e.target.value)}
                    placeholder="Ketik topik apa saja... (contoh: Daur air, Pecahan senilai, Fotosintesis, Tata surya, Pancasila)"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-red-500"
                  />
                  {videoSearchQuery && (
                    <button
                      onClick={() => setVideoSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <a
                  href={getYouTubeSearchUrl(videoSearchQuery || `kelas ${currentGrade} SD`, currentGrade)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-2xl shadow-sm transition active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Youtube className="w-4 h-4" />
                  <span>Cari Langsung di YouTube ↗</span>
                </a>
              </div>

              {/* Quick Topic Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-2xs">
                <span className="font-extrabold text-slate-500 uppercase mr-1">Rekomendasi Cepat:</span>
                {[
                  'Daur Air & Hujan',
                  'Pecahan Senilai',
                  'Fotosintesis',
                  'Rantai Makanan',
                  'Gotong Royong',
                  'Huruf Vokal',
                  'Keliling Lingkaran'
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setVideoSearchQuery(chip)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 font-bold text-slate-700 border border-slate-200 transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <ClassSubjectSelector
              currentGrade={currentGrade}
              onSelectGrade={setCurrentGrade}
              selectedSubjectId={selectedSubjectId}
              onSelectSubject={setSelectedSubjectId}
            />

            {(() => {
              const displayVideos = filteredMaterials.filter(m => {
                if (!videoSearchQuery.trim()) return true;
                const q = videoSearchQuery.toLowerCase();
                return m.title.toLowerCase().includes(q) || m.video.title.toLowerCase().includes(q) || m.theme.toLowerCase().includes(q);
              });

              if (displayVideos.length === 0) {
                return (
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-3">
                    <p className="text-3xl">🔍</p>
                    <h3 className="font-bold text-slate-800 text-sm">Tidak ada video lokal untuk "{videoSearchQuery}"</h3>
                    <p className="text-xs text-slate-500">Klik tombol di bawah untuk langsung membuka pencarian video edukatif ini di YouTube!</p>
                    <a
                      href={getYouTubeSearchUrl(videoSearchQuery, currentGrade)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      <Youtube className="w-4 h-4" />
                      <span>Cari "{videoSearchQuery}" di YouTube ↗</span>
                    </a>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayVideos.map((mat) => {
                    const videoInfo = resolveYouTubeVideo(mat.video.title, mat.subjectId, mat.grade, mat.video.youtubeId);

                    return (
                      <div key={mat.id} className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-red-400 shadow-sm space-y-3 p-4 flex flex-col justify-between transition">
                        <div
                          onClick={() => {
                            setActiveVideoModal(mat);
                            handleLogActivity('video', mat.video.title, mat.theme, 'Menonton video edukasi interaktif beranimasi.', undefined, 10);
                          }}
                          className="bg-slate-950 rounded-2xl aspect-video overflow-hidden flex flex-col items-center justify-center text-white relative group cursor-pointer border-2 border-slate-800"
                        >
                          <img
                            src={videoInfo.thumbnailUrl}
                            alt={mat.video.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                          <div className="w-14 h-14 rounded-full bg-red-600 group-hover:scale-110 flex items-center justify-center shadow-lg transition relative z-10">
                            <Play className="w-6 h-6 fill-white ml-0.5 text-white" />
                          </div>
                          <span className="absolute bottom-3 right-3 bg-black/80 text-2xs px-2 py-0.5 rounded-md font-mono z-10">
                            {mat.video.duration}
                          </span>
                          <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-3xs px-2.5 py-0.5 rounded-md shadow-xs z-10 flex items-center gap-1">
                            <Youtube className="w-3 h-3" />
                            <span>YOUTUBE RESMI</span>
                          </span>
                          <span className="absolute bottom-3 left-3 bg-slate-900/80 text-amber-200 text-3xs px-2 py-0.5 rounded-md font-bold z-10 truncate max-w-[170px]">
                            📺 {videoInfo.channel}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-2xs font-extrabold uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                              Kelas {mat.grade} SD
                            </span>
                            <span className="text-2xs text-slate-400 font-semibold truncate">
                              {videoInfo.channel}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm mt-1">{mat.video.title}</h4>
                          <div className="mt-2 flex items-center justify-between bg-amber-50/70 p-2.5 rounded-xl border border-amber-100">
                            <p className="text-xs text-slate-600 italic">
                              💡 Refleksi: “{mat.video.reflectionPrompt}”
                            </p>
                            <AudioNarratorButton
                              textToSpeak={`Refleksi video: ${mat.video.reflectionPrompt}`}
                              label="Dengarkan"
                              variant="amber"
                              size="sm"
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          <button
                            onClick={() => {
                              setActiveVideoModal(mat);
                              handleLogActivity('video', mat.video.title, mat.theme, 'Menonton video edukasi interaktif.', undefined, 10);
                            }}
                            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Putar di Aplikasi 🔊</span>
                          </button>

                          <a
                            href={videoInfo.watchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center gap-1 border border-slate-300"
                            title="Tonton di YouTube langsung"
                          >
                            <Youtube className="w-3.5 h-3.5 text-red-600" />
                            <span>Buka YouTube</span>
                            <ExternalLink className="w-3 h-3 text-slate-500" />
                          </a>

                          <button
                            onClick={() => {
                              setSelectedMaterial(mat);
                              setActiveNav('materi_detail');
                            }}
                            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                          >
                            Materi Lengkap
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW 8: KUIS INTERAKTIF */}
        {activeNav === 'kuis' && (
          <div className="space-y-6 pb-12 animate-in fade-in duration-200">
            <ClassSubjectSelector
              currentGrade={currentGrade}
              onSelectGrade={setCurrentGrade}
              selectedSubjectId={selectedSubjectId}
              onSelectSubject={setSelectedSubjectId}
            />

            {selectedMaterial && (
              <QuizInteractive
                title={`Kuis: ${selectedMaterial.title}`}
                questions={selectedMaterial.practiceQuestions}
                onComplete={(score) => {
                  handleAddStar(score >= 80 ? 20 : 10);
                  handleLogActivity('kuis', `Kuis: ${selectedMaterial.title}`, selectedMaterial.theme, `Mengerjakan kuis latihan pemahaman dengan skor akhir ${score}/100.`, score, score >= 80 ? 20 : 10);
                }}
                onAddStar={() => handleAddStar(5)}
              />
            )}
          </div>
        )}

        {/* VIEW 9: PANDUAN ORANG TUA */}
        {activeNav === 'panduan_ortu' && (
          <div className="animate-in fade-in duration-200">
            <ParentGuideView />
          </div>
        )}

        {/* VIEW 10: PERKEMBANGAN SISWA */}
        {activeNav === 'perkembangan' && (
          <div className="animate-in fade-in duration-200">
            <StudentProgressView
              progress={studentProgress}
              userRole={userRole}
              onOpenMaterial={(id) => {
                const mat = materials.find(m => m.id === id);
                if (mat) {
                  setSelectedMaterial(mat);
                  setActiveNav('materi_detail');
                }
              }}
            />
          </div>
        )}

        {/* VIEW 11: RUANG GURU (DILENGKAPI PANTAUAN NAMA SISWA) */}
        {activeNav === 'ruang_guru' && (
          <div className="animate-in fade-in duration-200">
            <TeacherDashboard
              materials={materials}
              lkpds={lkpds}
              students={students}
              activeStudentId={activeStudentId}
              userProfile={userProfile}
              currentGrade={currentGrade}
              onSelectStudent={(id) => setActiveStudentId(id)}
              onAddTeacherFeedback={handleTeacherAddFeedback}
              onAwardBonusStar={handleTeacherAwardBonusStar}
              onSelectMaterial={(mat) => {
                setSelectedMaterial(mat);
                setActiveNav('materi_detail');
              }}
              onSelectLkpd={(lk) => {
                setSelectedLkpd(lk);
                setActiveNav('lkpd_detail');
              }}
              onSaveNewMaterial={handleSaveNewMaterial}
              onSaveNewLkpd={handleSaveNewLkpd}
              onOpenCommunication={() => setActiveNav('komunikasi')}
              onOpenIdentitySettings={() => setIsIdentityModalOpen(true)}
              onSendNoteToParents={(title, subject, note) => handleSendTeacherNote(`[Materi Baru - ${subject}] ${title}: ${note}`)}
            />
          </div>
        )}

        {/* VIEW 12: KOMUNIKASI GURU & ORANG TUA */}
        {activeNav === 'komunikasi' && (
          <div className="animate-in fade-in duration-200">
            <CommunicationCenter
              notes={teacherNotes}
              userRole={userRole}
              userProfile={userProfile}
              students={students}
              activeStudent={activeStudent}
              onSendNote={handleSendTeacherNote}
            />
          </div>
        )}

        {/* VIEW 13: PROFIL SISWA */}
        {activeNav === 'profil' && (
          <div className="animate-in fade-in duration-200">
            <StudentProfileView
              student={activeStudent}
              userProfile={userProfile}
              grade={currentGrade}
              onOpenMaterial={(id) => {
                const mat = materials.find(m => m.id === id);
                if (mat) {
                  setSelectedMaterial(mat);
                  setActiveNav('materi_detail');
                }
              }}
              onOpenIdentitySettings={() => setIsIdentityModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW 14: DASHBOARD ADMIN */}
        {activeNav === 'admin' && (
          <div className="animate-in fade-in duration-200">
            <AdminDashboard
              materials={materials}
              lkpds={lkpds}
            />
          </div>
        )}
      </main>

      {/* Floating 🤖 SAHABAT ILMU (AI Chat Assistant) */}
      <SahabatIlmuChat
        currentGrade={currentGrade}
        userRole={userRole}
        currentTopic={selectedMaterial?.title}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Floating Audio Voice Guide Button */}
      <VoiceGuideFloatingButton
        activeNav={activeNav}
        onOpenFullGuide={() => setIsAudioGuideOpen(true)}
      />

      {/* Full Interactive Audio Guide Modal */}
      <AudioGuideModal
        isOpen={isAudioGuideOpen}
        onClose={() => setIsAudioGuideOpen(false)}
        initialRole={userRole === 'admin' ? 'umum' : userRole}
        onNavigateToTab={(tab) => setActiveNav(tab)}
      />

      {/* Playable Interactive Video Modal */}
      {activeVideoModal && (
        <InteractiveVideoPlayer
          isOpen={!!activeVideoModal}
          onClose={() => setActiveVideoModal(null)}
          title={activeVideoModal.video.title}
          duration={activeVideoModal.video.duration}
          topicId={activeVideoModal.id}
          subjectId={activeVideoModal.subjectId}
          grade={activeVideoModal.grade}
          reflectionPrompt={activeVideoModal.video.reflectionPrompt}
          youtubeId={activeVideoModal.video.youtubeId}
          onAddStar={() => handleAddStar(10)}
        />
      )}

      {/* Identity Profile Modal (Nama Guru, Orang Tua, & Murid) */}
      <IdentityProfileModal
        isOpen={isIdentityModalOpen}
        onClose={() => setIsIdentityModalOpen(false)}
        profile={userProfile}
        students={students}
        currentRole={userRole}
        onUpdateProfile={(newProf) => setUserProfile(newProf)}
        onSelectStudent={(stId) => setActiveStudentId(stId)}
      />

      {/* Child-friendly Footer */}
      <footer className="no-print mt-auto bg-white border-t-2 border-amber-200 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 font-display text-slate-800 text-base font-black">
            <span>🏠</span>
            <span>RUMAH ILMU</span>
          </div>
          <p className="font-semibold text-amber-800">
            “Belajar di Sekolah, Lanjutkan di Rumah.”
          </p>
          <p className="max-w-lg mx-auto text-slate-500 leading-relaxed text-2xs">
            Media pembelajaran digital terpadu untuk jenjang SD kelas 1–6. Menghubungkan guru, orang tua, dan anak dalam menciptakan ekosistem belajar yang mandiri, bermakna, dan membahagiakan.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4 text-2xs font-bold text-slate-600">
            <button onClick={() => setIsAboutModalOpen(true)} className="hover:text-amber-600">Tentang Rumah Ilmu</button>
            <span>•</span>
            <button onClick={() => setActiveNav('panduan_ortu')} className="hover:text-amber-600">Panduan Orang Tua</button>
            <span>•</span>
            <button onClick={() => setActiveNav('ruang_guru')} className="hover:text-amber-600">Ruang Guru</button>
            <span>•</span>
            <button onClick={() => setActiveNav('game')} className="hover:text-amber-600">Game Edukasi</button>
          </div>
          <p className="text-3xs text-slate-400 pt-2">
            © 2026 Rumah Ilmu. Didesain ramah anak & responsif untuk Ponsel, Tablet, dan Komputer.
          </p>
        </div>
      </footer>
    </div>
  );
}
