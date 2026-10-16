export type UserRole = 'guru' | 'orang_tua' | 'siswa' | 'admin';

export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  grades: GradeLevel[];
}

export type LearningStyle = 'membaca' | 'video' | 'bermain' | 'mendengarkan';

export interface ParentCompanionGuide {
  summary: string;
  guidance: string;
  promptQuestions: string[];
  homeActivityDuration: string;
  homeActivity: string;
  exampleScenario: string;
  parentMindset: string;
}

export interface QuizQuestion {
  id: string;
  type: 'pilihan_ganda' | 'benar_salah' | 'menjodohkan' | 'isian';
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
  encouragement: string;
  pairs?: { left: string; right: string }[];
}

export interface LkpdActivity {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  promptQuestion?: string;
  studentInputType: 'text' | 'choice' | 'checklist' | 'drawing';
  choices?: string[];
  checklistItems?: string[];
}

export interface LKPD {
  id: string;
  title: string;
  subjectId: string;
  grade: GradeLevel;
  learningGoal: string;
  estimatedTime: string;
  instructions: string[];
  activities: LkpdActivity[];
  reflectionQuestions: string[];
  createdBy: string;
  createdAt: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  subjectId: string;
  grade: GradeLevel;
  theme: string;
  // 10 Section Structure
  learningGoals: string[];
  apperception: string; // Apersepsi
  coreContent: {
    sectionTitle: string;
    text: string;
    bulletPoints?: string[];
    visualDescription?: string;
    interactiveCheck?: { question: string; answer: string };
  }[];
  examples: {
    situation: string;
    explanation: string;
  }[];
  studentActivity: {
    title: string;
    instructions: string[];
    deliverable: string;
  };
  video: {
    title: string;
    duration: string;
    youtubeId?: string;
    reflectionPrompt: string;
  };
  practiceQuestions: QuizQuestion[];
  reflection: {
    questions: string[];
    reminder: string;
  };
  summary: string[]; // Rangkuman
  parentGuide: ParentCompanionGuide;
}

export interface EduGame {
  id: string;
  type: 'pilih_jawaban' | 'roda_pertanyaan' | 'susun_kata' | 'detektif_konsep' | 'dadu_edukasi';
  title: string;
  description: string;
  subjectId: string;
  grade: GradeLevel;
  icon: string;
  content: any;
}

export interface StudentProgress {
  literasi: number;
  numerasi: number;
  pemahaman: number;
  kemandirian: number;
  kolaborasi: number;
  kreativitas: number;
  karakter: number;
  totalStars: number;
  streakDays: number;
  completedMaterials: string[];
  completedLkpd: string[];
  quizScores: { quizId: string; score: number; date: string }[];
  badges: {
    id: string;
    title: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: string;
    description: string;
  }[];
  positiveNotes: string[];
}

export interface ParentGuideArticle {
  id: string;
  title: string;
  icon: string;
  category: string;
  summary: string;
  actionSteps: string[];
  dosAndDonts: {
    do: string;
    dont: string;
  }[];
  realLifeExample: string;
}

export interface ParentTeacherNote {
  id: string;
  senderName: string;
  senderRole: 'guru' | 'orang_tua';
  date: string;
  studentName: string;
  grade: GradeLevel;
  subjectName?: string;
  category: 'apresiasi' | 'perkembangan' | 'tugas' | 'kendala' | 'saran';
  message: string;
  status: 'baru' | 'dibalas' | 'selesai';
}

export interface DailyLearningRecommendation {
  id: string;
  taskType: 'membaca' | 'numerasi' | 'video' | 'aktivitas' | 'cerita_ortu';
  title: string;
  duration: string;
  completed: boolean;
  targetLink?: { type: string; id: string };
}

export interface UserProfile {
  teacherName: string;
  parentName: string;
  activeStudentId: string;
  schoolName: string;
}

export interface StudentActivityLog {
  id: string;
  timestamp: string;
  activityType: 'materi' | 'lkpd' | 'kuis' | 'video' | 'game' | 'pendampingan_ortu';
  title: string;
  subjectName: string;
  score?: number;
  details: string;
  accompaniedByParent: boolean;
  parentNote?: string;
  teacherFeedback?: string;
  starsEarned: number;
}

export interface StudentRecord {
  id: string;
  name: string;
  nisn: string;
  grade: GradeLevel;
  parentName: string;
  teacherName: string;
  avatar: string;
  progress: StudentProgress;
  activityLogs: StudentActivityLog[];
  attendanceRate: number;
}
