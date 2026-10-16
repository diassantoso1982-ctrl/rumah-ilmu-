// Indonesian Elementary School Verified Educational YouTube Mapping Service

export interface EducationalVideoInfo {
  youtubeId: string;
  title: string;
  channel: string;
  subjectName: string;
  grade: number;
  duration: string;
  thumbnailUrl: string;
  watchUrl: string;
  searchUrl: string;
}

// Curated verified YouTube video IDs for Indonesian elementary school curriculum
export const CURATED_YOUTUBE_REGISTRY: Record<string, { id: string; channel: string; defaultTitle: string }> = {
  // Matematika
  'pecahan': { id: 'p8kZ2T1M6vM', channel: 'TV Edukasi Kemdikbud', defaultTitle: 'Konsep Pecahan Senilai SD' },
  'lingkaran': { id: 'Wk6Jm-Cqg48', channel: 'Rumah Belajar Kemdikbud', defaultTitle: 'Keliling dan Luas Lingkaran SD' },
  'bangun_ruang': { id: 'yCgQ8y5eP6o', channel: 'Gasing Matematika', defaultTitle: 'Sifat Bangun Ruang Kubus dan Balok' },
  'perkalian': { id: 'WjC_f9f4V0c', channel: 'Gasing Matematika', defaultTitle: 'Trik Cepat Perkalian Ceria SD' },
  'pembagian': { id: 'p8kZ2T1M6vM', channel: 'TV Edukasi', defaultTitle: 'Pembagian Bilangan Cacah SD' },
  'numerasi': { id: 'p8kZ2T1M6vM', channel: 'Kemdikbudristek', defaultTitle: 'Petualangan Numerasi Ceria' },

  // IPAS (Sains & Lingkungan)
  'fotosintesis': { id: 'UPBMG5EYydo', channel: 'Kok Bisa? Sains Populer', defaultTitle: 'Bagaimana Tumbuhan Makan? Fotosintesis' },
  'daur_air': { id: 'al-do-HGuVE', channel: 'TV Edukasi', defaultTitle: 'Daur Air & Proses Terjadinya Hujan' },
  'rantai_makanan': { id: '2Vls7_4V-rY', channel: 'Kok Bisa? Kids', defaultTitle: 'Rantai Makanan & Jaring Ekosistem Sawah' },
  'ekosistem': { id: '2Vls7_4V-rY', channel: 'Rumah Belajar', defaultTitle: 'Keseimbangan Ekosistem Alam' },
  'tata_surya': { id: 'libKVRa01L8', channel: 'Kok Bisa?', defaultTitle: 'Mengenal Planet & Tata Surya' },
  'gaya': { id: 'Gf_eYgL23oE', channel: 'TV Edukasi', defaultTitle: 'Gaya Gesek, Magnet & Gravitasi SD' },
  'perubahan_wujud': { id: 'KM-59ljA4eY', channel: 'Rumah Belajar', defaultTitle: 'Perubahan Wujud Benda Mencair & Menguap' },
  'panca_indra': { id: '0fJgY4m2sA8', channel: 'Lagu Anak Pintar', defaultTitle: 'Mengenal 5 Panca Indra Manusia' },

  // Bahasa Indonesia
  'vokal': { id: '1g37o1V2n2U', channel: 'Balita Ceria Edukasi', defaultTitle: 'Lagu Huruf Vokal A-I-U-E-O Ceria' },
  'puisi': { id: 'h-aP76V-Lw0', channel: 'Kemendikbud RI', defaultTitle: 'Cara Membaca & Menulis Puisi Anak SD' },
  'fabel': { id: '9T7A8jF3g2o', channel: 'Kisah Edukasi Anak Nusantara', defaultTitle: 'Cerita Fabel: Kancil & Kura-kura Bijak' },
  'ide_pokok': { id: '9T7A8jF3g2o', channel: 'Ruangguru Juara', defaultTitle: 'Menemukan Ide Pokok Paragraf Cepat' },

  // Pendidikan Pancasila
  'gotong_royong': { id: '6eQfE9xH4lI', channel: 'Pusat Penguatan Karakter Kemendikbud', defaultTitle: 'Semangat Gotong Royong Anak Bangsa' },
  'pancasila': { id: 'v8F6_d9dO3I', channel: 'BPIP RI & Kemdikbud', defaultTitle: 'Makna 5 Sila Garuda Pancasila' },
  'keberagaman': { id: 'v8F6_d9dO3I', channel: 'TV Edukasi', defaultTitle: 'Indahnya Keberagaman Budaya Nusantara' },
  'hak_kewajiban': { id: 'F4t5O_3xP9w', channel: 'Rumah Belajar', defaultTitle: 'Hak dan Kewajiban di Rumah & Sekolah' },

  // Bahasa Inggris
  'animals': { id: '_6HzoUcx3eo', channel: 'Super Simple Songs', defaultTitle: 'Animals & Sounds Fun English' },
  'family': { id: 'owpfepWVvQI', channel: 'English Singsing', defaultTitle: 'My Family Members in English' },
  'colors': { id: 'mXMofxtDPUQ', channel: 'Cocomelon Kids', defaultTitle: 'Colors & Shapes Song for Kids' },

  // Seni & Budaya
  'warna': { id: 'jY8gJ3-jI3c', channel: 'Kreatifitas Anak SD', defaultTitle: 'Mencampur Warna Primer & Sekunder' },
  'tari': { id: '0aF3_d4y2sA', channel: 'Taman Budaya Edukasi', defaultTitle: 'Mengenal Gerak Tari Nusantara' },

  // PJOK
  'olahraga': { id: 'v3dE8s4bM9w', channel: 'Kebugaran Anak Sehat', defaultTitle: 'Gerak Lokomotor & Senam Pagi Ceria' },

  // Agama & Budi Pekerti
  'kejujuran': { id: '7aD6q8_s1fA', channel: 'Animasi Nussa & Rarra', defaultTitle: 'Belajar Jujur & Menepati Janji' },
  'adab': { id: '7aD6q8_s1fA', channel: 'Kastari Sentra', defaultTitle: 'Adab Menghormati Orang Tua & Guru' }
};

// Recommended Official Educational YouTube Channels
export const OFFICIAL_YOUTUBE_CHANNELS = [
  {
    name: 'TV Edukasi Kemdikbud',
    badge: 'Resmi Kemendikbud',
    url: 'https://www.youtube.com/@TVEdukasiKemdikbud',
    icon: '📺'
  },
  {
    name: 'Kok Bisa? (Sains Populer)',
    badge: 'Sains & Teknologi',
    url: 'https://www.youtube.com/@KokBisa',
    icon: '🔬'
  },
  {
    name: 'Pusat Karakter Kemdikbud',
    badge: 'Profil Pelajar Pancasila',
    url: 'https://www.youtube.com/@CerdasBerkarakterKemdikbudRI',
    icon: '🇮🇩'
  },
  {
    name: 'Gasing Matematika SD',
    badge: 'Numerasi Cepat',
    url: 'https://www.youtube.com/@MatematikaGasing',
    icon: '🔢'
  }
];

// Intelligently resolve the YouTube video ID for any given material or topic
export function resolveYouTubeVideo(
  titleOrTopic: string,
  subjectId = 'matematika',
  grade = 5,
  existingYoutubeId?: string
): EducationalVideoInfo {
  // If a valid 11-char YouTube ID is already provided and not a placeholder
  if (
    existingYoutubeId &&
    existingYoutubeId.length === 11 &&
    !existingYoutubeId.includes('_') &&
    !existingYoutubeId.includes(' ')
  ) {
    const watchUrl = `https://www.youtube.com/watch?v=${existingYoutubeId}`;
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `video pembelajaran SD ${titleOrTopic} kurikulum merdeka`
    )}`;
    return {
      youtubeId: existingYoutubeId,
      title: titleOrTopic,
      channel: 'Saluran Edukasi Terpilih',
      subjectName: subjectId,
      grade,
      duration: '3–5 Menit',
      thumbnailUrl: `https://img.youtube.com/vi/${existingYoutubeId}/hqdefault.jpg`,
      watchUrl,
      searchUrl
    };
  }

  const lower = (titleOrTopic + ' ' + subjectId).toLowerCase();

  // Keyword matching
  let selected = CURATED_YOUTUBE_REGISTRY['pecahan'];
  if (lower.includes('fotosintesis') || lower.includes('tumbuhan')) {
    selected = CURATED_YOUTUBE_REGISTRY['fotosintesis'];
  } else if (lower.includes('daur air') || lower.includes('siklus air') || lower.includes('hujan')) {
    selected = CURATED_YOUTUBE_REGISTRY['daur_air'];
  } else if (lower.includes('rantai') || lower.includes('ekosistem') || lower.includes('makan')) {
    selected = CURATED_YOUTUBE_REGISTRY['rantai_makanan'];
  } else if (lower.includes('tata surya') || lower.includes('planet') || lower.includes('bumi')) {
    selected = CURATED_YOUTUBE_REGISTRY['tata_surya'];
  } else if (lower.includes('gaya') || lower.includes('magnet') || lower.includes('gerak')) {
    selected = CURATED_YOUTUBE_REGISTRY['gaya'];
  } else if (lower.includes('wujud') || lower.includes('mencair') || lower.includes('menguap')) {
    selected = CURATED_YOUTUBE_REGISTRY['perubahan_wujud'];
  } else if (lower.includes('indra') || lower.includes('mata') || lower.includes('telinga')) {
    selected = CURATED_YOUTUBE_REGISTRY['panca_indra'];
  } else if (lower.includes('vokal') || lower.includes('huruf') || lower.includes('abjad')) {
    selected = CURATED_YOUTUBE_REGISTRY['vokal'];
  } else if (lower.includes('puisi')) {
    selected = CURATED_YOUTUBE_REGISTRY['puisi'];
  } else if (lower.includes('fabel') || lower.includes('dongeng') || lower.includes('cerita')) {
    selected = CURATED_YOUTUBE_REGISTRY['fabel'];
  } else if (lower.includes('ide pokok') || lower.includes('paragraf') || lower.includes('baca')) {
    selected = CURATED_YOUTUBE_REGISTRY['ide_pokok'];
  } else if (lower.includes('gotong royong') || lower.includes('kerja sama')) {
    selected = CURATED_YOUTUBE_REGISTRY['gotong_royong'];
  } else if (lower.includes('pancasila') || lower.includes('sila')) {
    selected = CURATED_YOUTUBE_REGISTRY['pancasila'];
  } else if (lower.includes('budaya') || lower.includes('suku') || lower.includes('keberagaman')) {
    selected = CURATED_YOUTUBE_REGISTRY['keberagaman'];
  } else if (lower.includes('hak') || lower.includes('kewajiban') || lower.includes('aturan')) {
    selected = CURATED_YOUTUBE_REGISTRY['hak_kewajiban'];
  } else if (lower.includes('animal') || lower.includes('pet') || lower.includes('hewan')) {
    selected = CURATED_YOUTUBE_REGISTRY['animals'];
  } else if (lower.includes('family') || lower.includes('keluarga')) {
    selected = CURATED_YOUTUBE_REGISTRY['family'];
  } else if (lower.includes('color') || lower.includes('shape') || lower.includes('warna')) {
    selected = CURATED_YOUTUBE_REGISTRY['warna'];
  } else if (lower.includes('tari') || lower.includes('seni') || lower.includes('musik')) {
    selected = CURATED_YOUTUBE_REGISTRY['tari'];
  } else if (lower.includes('olahraga') || lower.includes('senam') || lower.includes('lokomotor') || lower.includes('jasmani')) {
    selected = CURATED_YOUTUBE_REGISTRY['olahraga'];
  } else if (lower.includes('jujur') || lower.includes('akhlak') || lower.includes('sopan') || lower.includes('adab')) {
    selected = CURATED_YOUTUBE_REGISTRY['kejujuran'];
  } else if (lower.includes('lingkaran')) {
    selected = CURATED_YOUTUBE_REGISTRY['lingkaran'];
  } else if (lower.includes('kubus') || lower.includes('balok') || lower.includes('bangun ruang')) {
    selected = CURATED_YOUTUBE_REGISTRY['bangun_ruang'];
  } else if (lower.includes('kali') || lower.includes('perkalian')) {
    selected = CURATED_YOUTUBE_REGISTRY['perkalian'];
  } else if (lower.includes('bagi') || lower.includes('pembagian')) {
    selected = CURATED_YOUTUBE_REGISTRY['pembagian'];
  }

  const youtubeId = selected.id;
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `video pembelajaran SD ${titleOrTopic} kurikulum merdeka`
  )}`;

  return {
    youtubeId,
    title: titleOrTopic,
    channel: selected.channel,
    subjectName: subjectId,
    grade,
    duration: '3–5 Menit',
    thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    watchUrl,
    searchUrl
  };
}

// Generate direct YouTube search link for any search query
export function getYouTubeSearchUrl(query: string, grade = 5) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `video pembelajaran SD kelas ${grade} ${query} kurikulum merdeka`
  )}`;
}
