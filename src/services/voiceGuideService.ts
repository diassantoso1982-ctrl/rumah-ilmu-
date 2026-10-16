import { soundManager } from './soundEffects';

export interface GuideStep {
  title: string;
  targetRole: 'umum' | 'guru' | 'orang_tua' | 'siswa';
  speechText: string;
  displaySummary: string;
  highlightAction?: string;
  suggestedNav?: string;
}

export type VoiceCharacter = 'ceria' | 'ramah' | 'cilik';

export const VOICE_GUIDE_SCRIPTS: Record<string, GuideStep[]> = {
  umum: [
    {
      title: 'Selamat Datang di Rumah Ilmu',
      targetRole: 'umum',
      speechText: 'Halo Sahabat Rumah Ilmu! Selamat datang di aplikasi pembelajaran terpadu untuk Sekolah Dasar kelas satu sampai enam. Di sini guru, orang tua, dan murid saling terhubung. Di bagian atas layar, kamu bisa memilih peranmu: Guru, Orang Tua, atau Siswa.',
      displaySummary: 'Rumah Ilmu adalah jembatan belajar terpadu SD kelas 1–6 yang menghubungkan guru, orang tua, dan anak.',
      highlightAction: 'Ganti Peran di bilah navigasi atas',
      suggestedNav: 'beranda'
    },
    {
      title: 'Memilih Tingkat Kelas 1 sampai 6',
      targetRole: 'umum',
      speechText: 'Langkah pertama, pilih tingkat kelas ananda dari kelas satu sampai kelas enam SD. Setiap kelas menyajikan mata pelajaran lengkap sesuai kurikulum: Matematika, Bahasa Indonesia, IPAS, Pendidikan Pancasila, Seni, Bahasa Inggris, hingga Koding.',
      displaySummary: 'Pilih tombol 🟢 Kelas 1 hingga 🔴 Kelas 6 untuk menyesuaikan materi ajar dan lembar tugas.',
      highlightAction: 'Klik nomor kelas di menu bar atau beranda',
      suggestedNav: 'materi'
    },
    {
      title: 'Diferensiasi Gaya Belajar: Visual, Auditori & Kinestetik',
      targetRole: 'umum',
      speechText: 'Setiap anak istimewa! Di Rumah Ilmu, materi difasilitasi untuk anak visual melalui membaca dan video animasi, anak auditori melalui narasi suara lisan di setiap kegiatan, dan anak kinestetik melalui aktivitas gerak nyata serta permainan edukasi.',
      displaySummary: 'Tersedia pilihan gaya belajar Visual (baca & video), Auditori (suara lisan), dan Kinestetik (praktik & game).',
      highlightAction: 'Pilih tab gaya belajar di dalam materi',
      suggestedNav: 'materi'
    },
    {
      title: 'Menjelajah Ruangan Rumah Metafora',
      targetRole: 'umum',
      speechText: 'Di beranda, kamu bisa menjelajahi enam ruangan rumah metafora: Ruang Literasi, Ruang Numerasi, Ruang Sains, Ruang Kreativitas, Ruang Karakter, dan Ruang Bermain. Setiap ruangan mengasah kecerdasan anak dengan cara yang menggembirakan.',
      displaySummary: 'Setiap ruangan mengasah potensi anak secara menyeluruh dan menyenangkan.',
      highlightAction: 'Pilih kartu ruangan di Beranda',
      suggestedNav: 'beranda'
    }
  ],
  guru: [
    {
      title: 'Panduan Guru: Membuka Ruang Guru',
      targetRole: 'guru',
      speechText: 'Halo Bapak dan Ibu Guru hebat! Di menu Ruang Guru, Bapak dan Ibu dapat mengelola modul ajar, menyusun LKPD, membuat kuis, dan memantau kemajuan belajar siswa tanpa beban administrasi yang rumit.',
      displaySummary: 'Akses menu "Ruang Guru" untuk mengelola modul ajar dan lembar tugas secara terintegrasi.',
      highlightAction: 'Buka menu Ruang Guru',
      suggestedNav: 'ruang_guru'
    },
    {
      title: 'Fitur Ajaib: Bantuan AI Guru',
      targetRole: 'guru',
      speechText: 'Bapak dan Ibu cukup mengetikkan satu kalimat sederhana, misalnya: Buatkan materi pecahan kelas lima. AI cerdas Rumah Ilmu akan langsung menyusun sepuluh bagian modul lengkap, tujuan, apersepsi, kuis, aktivitas kinestetik, dan panduan untuk orang tua.',
      displaySummary: 'Gunakan tombol kuning "✨ BANTUAN AI GURU" untuk merancang pembelajaran berdiferensiasi dalam sekejap.',
      highlightAction: 'Klik ✨ BANTUAN AI GURU',
      suggestedNav: 'ruang_guru'
    },
    {
      title: 'Generator LKPD Otomatis & Siap Cetak',
      targetRole: 'guru',
      speechText: 'Bapak dan Ibu juga dapat membuat Lembar Kerja Peserta Didik atau LKPD secara otomatis. LKPD ini bisa dikerjakan murid secara digital di layar gawai atau langsung dicetak rapi di atas kertas untuk kegiatan di kelas.',
      displaySummary: 'Fitur Generate LKPD menghasilkan lembar tugas interaktif dan siap cetak (print-ready) lengkap dengan format penilaian.',
      highlightAction: 'Klik ✨ Generate LKPD',
      suggestedNav: 'ruang_guru'
    },
    {
      title: 'Buku Nilai & Kemitraan Orang Tua',
      targetRole: 'guru',
      speechText: 'Pantau pencapaian siswa di tab Nilai Siswa, dan jalin komunikasi hangat dengan wali murid melalui menu Komunikasi Orang Tua. Bapak dan Ibu bisa mengirimkan apresiasi positif dan saran belajar.',
      displaySummary: 'Jalin komunikasi harmonis dengan wali murid untuk mendampingi perkembangan ananda di rumah.',
      highlightAction: 'Buka tab Komunikasi Orang Tua',
      suggestedNav: 'komunikasi'
    }
  ],
  orang_tua: [
    {
      title: 'Panduan Orang Tua: Belajar Bersama Tanpa Stres',
      targetRole: 'orang_tua',
      speechText: 'Halo Ayah dan Bunda! Di Rumah Ilmu, orang tua tidak perlu mengajar seperti guru di sekolah. Ayah Bunda cukup mendampingi ananda, bertanya santai, mendengarkan ceritanya, dan memberikan pelukan motivasi.',
      displaySummary: 'Peran orang tua di rumah adalah pendengar setia dan motivator kasih sayang, bukan penguji yang menuntut.',
      highlightAction: 'Pilih peran Orang Tua',
      suggestedNav: 'panduan_ortu'
    },
    {
      title: 'Fitur Unggulan: Tombol Merah Hati “Belajar Bersama Orang Tua”',
      targetRole: 'orang_tua',
      speechText: 'Pada setiap materi pelajaran, ada tombol merah hati bertuliskan Belajar Bersama Orang Tua. Ketika diklik, Ayah Bunda mendapatkan ringkasan materi singkat, tiga pertanyaan pemantik santai, dan aktivitas seru sepuluh sampai lima belas menit di rumah tanpa perlu alat khusus.',
      displaySummary: 'Panduan aktivitas praktis 10–15 menit di rumah seperti mengamati benda bangun ruang atau mengamati tanaman.',
      highlightAction: 'Klik tombol ❤️ BELAJAR BERSAMA ORANG TUA di materi',
      suggestedNav: 'materi'
    },
    {
      title: 'Apresiasi Bintang & Catatan untuk Guru',
      targetRole: 'orang_tua',
      speechText: 'Setelah beraktivitas bersama ananda, Ayah Bunda dapat mengklik tombol Sudah Belajar Bersama, memberikan bintang apresiasi, dan mengirimkan catatan atau kendala ananda langsung kepada guru kelas.',
      displaySummary: 'Kirimkan apresiasi dan respon agar guru mengetahui perkembangan positif anak di rumah.',
      highlightAction: 'Gunakan tombol apresiasi di modal orang tua',
      suggestedNav: 'materi'
    },
    {
      title: 'Sebelas Panduan Praktis Orang Tua',
      targetRole: 'orang_tua',
      speechText: 'Buka menu Panduan Orang Tua untuk membaca tips harian: cara menghadapi anak yang sulit fokus, cara memuji proses, membuat jadwal belajar riang, dan bijak menggunakan gawai.',
      displaySummary: '11 artikel praktis dengan contoh kalimat percakapan hangat yang bisa langsung dipraktikkan.',
      highlightAction: 'Buka menu Panduan Orang Tua di navigasi',
      suggestedNav: 'panduan_ortu'
    }
  ],
  siswa: [
    {
      title: 'Panduan Siswa: Belajar Ceria di Rumah Ilmu',
      targetRole: 'siswa',
      speechText: 'Halo Sahabat Hebat! Di Rumah Ilmu, kamu bebas belajar dengan cara yang paling kamu sukai. Pilih kelasmu, lalu pilih mata pelajaran favoritmu hari ini!',
      displaySummary: 'Pilih kelas dan mata pelajaran yang ingin kamu jelajahi dengan riang gembira.',
      highlightAction: 'Pilih Kelas dan Mata Pelajaran',
      suggestedNav: 'materi'
    },
    {
      title: 'Pilih Gaya Belajarmu Sendiri',
      targetRole: 'siswa',
      speechText: 'Kamu suka membaca teks bergambar, menonton video animasi bersuara, bermain game edukasi, atau mendengarkan suara pemandu? Klik pilihan gaya belajarmu di atas materi. Setiap kali selesai belajar, kamu akan mendapatkan bintang penghargaan!',
      displaySummary: 'Tersedia 4 gaya belajar: Membaca, Menonton Video, Sambil Bermain, dan Mendengarkan audio.',
      highlightAction: 'Pilih tab gaya belajar hijau, biru, kuning, atau ungu',
      suggestedNav: 'materi'
    },
    {
      title: 'Nonton Bioskop Mini & Putar Video Bersuara',
      targetRole: 'siswa',
      speechText: 'Buka menu Video Pembelajaran untuk menonton video animasi edukatif yang seru. Kamu bisa memutar video, mendengarkan ceritanya, dan menjawab tantangan refleksi untuk mengumpulkan sepuluh bintang!',
      displaySummary: 'Video animasi dilengkapi suara, subtitel, kontrol putar, dan tantangan refleksi berhadiah bintang.',
      highlightAction: 'Buka menu Video',
      suggestedNav: 'video'
    },
    {
      title: 'Kerjakan LKPD Digital & Kuis Seru',
      targetRole: 'siswa',
      speechText: 'Buka lembar kerja LKPD untuk mengisi jawaban langsung di layar atau dicetak. Kamu juga bisa menguji kemampuanmu di kuis ceria tanpa takut salah. Di setiap aktivitas, ada tombol pengeras suara untuk membacakan soal kepadamu!',
      displaySummary: 'LKPD digital dan kuis interaktif dengan skor positif dan lencana kebanggaan.',
      highlightAction: 'Buka menu LKPD atau Kuis',
      suggestedNav: 'lkpd'
    },
    {
      title: 'Tanya Robot Sahabat Ilmu Kapan Saja',
      targetRole: 'siswa',
      speechText: 'Kalau kamu bingung atau punya pertanyaan pelajaran, klik tombol robot kuning di kanan bawah bernama Sahabat Ilmu. Dia akan memberikan petunjuk pintar langkah demi langkah!',
      displaySummary: 'AI Sahabat Ilmu siap membantu membimbing pikiranmu tanpa membocorkan contekan.',
      highlightAction: 'Klik ikon 🤖 Sahabat Ilmu di sudut kanan bawah',
      suggestedNav: 'beranda'
    }
  ]
};

export const CONTEXTUAL_VOICE_PROMPTS: Record<string, string> = {
  beranda: 'Selamat datang di Beranda Rumah Ilmu! Silakan pilih peranmu di kanan atas: Guru, Orang Tua, atau Siswa. Lalu pilih tingkat kelas dan ruangan belajar yang ingin kamu masuki hari ini.',
  materi: 'Di halaman Materi ini, kamu dapat membaca penjelasan konsep lengkap sepuluh bagian. Jangan lupa klik tombol merah hati: Belajar Bersama Orang Tua, untuk panduan aktivitas seru di rumah!',
  materi_detail: 'Kamu sedang membuka materi lengkap. Pilih gaya belajarmu: membaca, video animasi, game kinestetik, atau mendengarkan suara. Ada juga latihan soal ceria dan rangkuman poin penting di bagian bawah.',
  lkpd: 'Ini adalah halaman LKPD atau Lembar Kerja Peserta Didik digital. Kamu bisa mengetikkan jawabanmu langsung di gawai atau mengklik tombol Cetak untuk dicetak rapi di kertas.',
  lkpd_detail: 'Isi identitas nama dan pendampingmu, lalu ikuti langkah-langkah eksplorasi satu per satu. Klik tombol dengarkan untuk mendengar panduan suara tiap langkah!',
  game: 'Selamat datang di Arena Game Edukasi! Ayo putar Roda Pertanyaan, susun kata sains, pecahkan misteri detektif fakta, atau kocok Dadu Karakter untuk mengumpulkan poin dan piala!',
  video: 'Di sini kamu bisa menonton video animasi edukasi yang seru. Klik tombol Putar Video untuk menonton video dengan suara narasi dan animasi interaktif!',
  kuis: 'Ayo uji pemahamanmu dengan kuis interaktif! Jawab setiap pertanyaan dengan teliti. Ingat, tidak ada kata gagal, setiap usaha membuatmu semakin pintar!',
  panduan_ortu: 'Ayah dan Bunda, di sini tersedia sebelas panduan praktis mendampingi ananda belajar di rumah tanpa stres. Klik tombol dengarkan untuk mendengarkan artikel panduan!',
  perkembangan: 'Di sini Ayah Bunda dan ananda dapat melihat kemajuan belajar, tujuh dimensi profil pelajar, streak belajar, serta lencana kebanggaan yang telah diraih.',
  ruang_guru: 'Bapak dan Ibu Guru, gunakan tombol kuning Bantuan AI Guru untuk membuat modul otomatis, atau tombol Generate LKPD untuk menyusun lembar tugas dalam hitungan detik.',
  komunikasi: 'Ini adalah Pusat Komunikasi Guru dan Orang Tua. Guru dan orang tua dapat bertukar apresiasi, perkembangan anak, dan saran belajar harian.',
  profil: 'Ini adalah halaman profil belajarmu. Lihat total bintang, hari belajar beruntun, materi yang sudah tuntas, serta koleksi lencana hebatmu!'
};

class VoiceGuideService {
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: ((speaking: boolean, text: string) => void)[] = [];
  private currentText = '';
  private rate = 0.92; // Default rate
  private pitch = 1.05; // Default friendly pitch
  private voiceCharacter: VoiceCharacter = 'ceria';

  constructor() {
    // Warm up voices if supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Voices loaded in background
      };
    }
  }

  setRate(newRate: number) {
    this.rate = Math.max(0.6, Math.min(1.5, newRate));
  }

  getRate() {
    return this.rate;
  }

  setPitch(newPitch: number) {
    this.pitch = Math.max(0.7, Math.min(1.6, newPitch));
  }

  setVoiceCharacter(character: VoiceCharacter) {
    this.voiceCharacter = character;
    if (character === 'ceria') {
      this.rate = 0.95;
      this.pitch = 1.1;
    } else if (character === 'ramah') {
      this.rate = 0.88;
      this.pitch = 0.98;
    } else if (character === 'cilik') {
      this.rate = 1.02;
      this.pitch = 1.25;
    }
  }

  getVoiceCharacter(): VoiceCharacter {
    return this.voiceCharacter;
  }

  subscribe(listener: (speaking: boolean, text: string) => void) {
    this.listeners.push(listener);
    listener(this.isSpeaking, this.currentText);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.isSpeaking, this.currentText));
  }

  speak(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Play a gentle sound cue first
    soundManager.playGentleBell();

    this.currentText = text;
    this.isSpeaking = true;
    this.notify();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;

    // Pick best matching Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID') || v.name.toLowerCase().includes('indonesia'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.notify();
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech error/interrupted:', e);
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.notify();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.notify();
  }

  toggle(text: string, onEnd?: () => void) {
    if (this.isSpeaking && this.currentText === text) {
      this.stop();
    } else {
      this.speak(text, onEnd);
    }
  }

  getSpeakingState() {
    return this.isSpeaking;
  }

  getCurrentText() {
    return this.currentText;
  }
}

export const voiceGuideService = new VoiceGuideService();
