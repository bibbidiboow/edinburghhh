/**
 * Master Data Definitions for Edinburgh Relocation Hub
 * Grounded in actual UKVI rules, Indonesian administrative workflows, and Edinburgh living realities.
 */

export interface CostItem {
  id: string;
  category: 'A_PRE_DEPARTURE' | 'B_TUITION' | 'C_EDINBURGH_LIVING' | 'D_SCHOLARSHIP_BUFFER';
  categoryLabel: string;
  item: string;
  description: string;
  costGbp: number;
  costIdrOverride?: number; // Optional exact IDR fee (e.g. for Indonesian local fees)
  frequency: 'One-time' | 'Monthly' | 'Annual';
  monthsCount?: number;
  isMandatoryStudent: boolean;
  isMandatoryWorker: boolean;
  coveredByScholarship: 'Full' | 'Partial' | 'Reimbursed Later' | 'Self-Funded Only';
}

export const INITIAL_COST_ITEMS: CostItem[] = [
  // CATEGORY A: Pre-Departure Out-of-Pocket
  {
    id: 'c1',
    category: 'A_PRE_DEPARTURE',
    categoryLabel: 'Category A: Pre-Departure Out-of-Pocket',
    item: 'UKVI IELTS SELT Test Fee',
    description: 'Computer-delivered IELTS for UKVI (Academic) at British Council or IDP Indonesia (Rp ~3,850,000)',
    costGbp: 188,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: false,
    coveredByScholarship: 'Reimbursed Later',
  },
  {
    id: 'c2',
    category: 'A_PRE_DEPARTURE',
    categoryLabel: 'Category A: Pre-Departure Out-of-Pocket',
    item: 'Indonesian E-Passport Renewal (10-Year Validity)',
    description: 'Polikarbonat/Elektronik 10-year passport issued by Ditjen Imigrasi (Rp 650,000 - Rp 1,000,000)',
    costGbp: 45,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Self-Funded Only',
  },
  {
    id: 'c3',
    category: 'A_PRE_DEPARTURE',
    categoryLabel: 'Category A: Pre-Departure Out-of-Pocket',
    item: 'Sworn Translations & Apostille (Kemenkumham/Kemenlu)',
    description: 'Penerjemah Tersumpah for Ijazah & Transkrip S1 + Apostille sertifikat via Ditjen AHU (Rp 1.5M)',
    costGbp: 75,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Self-Funded Only',
  },
  {
    id: 'c4',
    category: 'A_PRE_DEPARTURE',
    categoryLabel: 'Category A: Pre-Departure Out-of-Pocket',
    item: 'IOM TB Screening Test (Jakarta / Surabaya)',
    description: 'Mandatory UKVI chest X-ray at IOM Menara BCA Jakarta or RS Premier Surabaya (~Rp 1,450,000)',
    costGbp: 72,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Reimbursed Later',
  },
  {
    id: 'c5',
    category: 'A_PRE_DEPARTURE',
    categoryLabel: 'Category A: Pre-Departure Out-of-Pocket',
    item: 'UK Student Visa Application Fee',
    description: 'Official UKVI entry clearance fee for Student Route (£490 standard processing)',
    costGbp: 490,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: false,
    coveredByScholarship: 'Full',
  },
  {
    id: 'c6',
    category: 'A_PRE_DEPARTURE',
    categoryLabel: 'Category A: Pre-Departure Out-of-Pocket',
    item: 'Immigration Health Surcharge (IHS) - Student',
    description: 'UKVI mandatory NHS access fee (£776/year for student visa + 4 months grace period = ~£1,164 for 1-yr MSc)',
    costGbp: 1164,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: false,
    coveredByScholarship: 'Full',
  },
  {
    id: 'c7',
    category: 'A_PRE_DEPARTURE',
    categoryLabel: 'Category A: Pre-Departure Out-of-Pocket',
    item: 'VFS Global Biometrics & User Pay Lounge (Jakarta/Bali)',
    description: 'VFS Global appointment booking fee, passport courier return, and document scanning',
    costGbp: 120,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Self-Funded Only',
  },
  {
    id: 'c8',
    category: 'A_PRE_DEPARTURE',
    categoryLabel: 'Category A: Pre-Departure Out-of-Pocket',
    item: 'One-Way Flight CGK (Jakarta) -> EDI (Edinburgh)',
    description: 'Qatar Airways, Emirates, or Turkish Airlines with 40kg student baggage allowance',
    costGbp: 750,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Full',
  },

  // CATEGORY B: University Tuition & Deposit (Self-Funded Master's)
  {
    id: 'c9',
    category: 'B_TUITION',
    categoryLabel: "Category B: University Tuition & Deposit (Self-Funded Master's)",
    item: 'Edinburgh MSc Tuition Fee Deposit',
    description: 'Advance deposit to secure Unconditional Offer & trigger CAS generation (£1,500 - £4,000)',
    costGbp: 2500,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: false,
    coveredByScholarship: 'Partial',
  },
  {
    id: 'c10',
    category: 'B_TUITION',
    categoryLabel: "Category B: University Tuition & Deposit (Self-Funded Master's)",
    item: 'Remaining Tuition Balance (Uni of Edinburgh / Heriot-Watt / Napier)',
    description: 'MSc Computer Science, Data Science, Finance, or Management typical international fee (£26,000 - £38,500 less deposit)',
    costGbp: 27500,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: false,
    coveredByScholarship: 'Full',
  },

  // CATEGORY C: UKVI 1-Year Edinburgh Living Costs (Outside London)
  {
    id: 'c11',
    category: 'C_EDINBURGH_LIVING',
    categoryLabel: 'Category C: UKVI 1-Year Edinburgh Living Costs (Outside London)',
    item: 'UKVI Statutory Maintenance Requirement (£1,023/mo x 9 months)',
    description: 'Official UKVI bank statement holding threshold for studies outside London (£1,023 x 9 months minimum)',
    costGbp: 9207,
    frequency: 'One-time',
    isMandatoryStudent: true,
    isMandatoryWorker: false,
    coveredByScholarship: 'Full',
  },
  {
    id: 'c12',
    category: 'C_EDINBURGH_LIVING',
    categoryLabel: 'Category C: UKVI 1-Year Edinburgh Living Costs (Outside London)',
    item: 'Realistic Edinburgh Accommodation (12 Months)',
    description: 'Average private student hall (PBSA) or 2-bed flatshare in Newington/Marchmont/Leith (£750/month)',
    costGbp: 9000,
    frequency: 'Annual',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Full',
  },
  {
    id: 'c13',
    category: 'C_EDINBURGH_LIVING',
    categoryLabel: 'Category C: UKVI 1-Year Edinburgh Living Costs (Outside London)',
    item: 'Groceries & Household Supplies (Lidl, Aldi, Sainsbury’s, Starlight Asian Mart)',
    description: 'Balanced student diet, Scottish salmon, halal meats, and Indonesian staples (~£220/month)',
    costGbp: 2640,
    frequency: 'Annual',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Full',
  },
  {
    id: 'c14',
    category: 'C_EDINBURGH_LIVING',
    categoryLabel: 'Category C: UKVI 1-Year Edinburgh Living Costs (Outside London)',
    item: 'Transport (Lothian Buses Student Ridacard)',
    description: 'Unlimited 24/7 travel on all Lothian Buses and Edinburgh Trams (£60/month with student discount)',
    costGbp: 720,
    frequency: 'Annual',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Full',
  },
  {
    id: 'c15',
    category: 'C_EDINBURGH_LIVING',
    categoryLabel: 'Category C: UKVI 1-Year Edinburgh Living Costs (Outside London)',
    item: 'Utilities, Gas/Electric & High-Speed Broadband (Virgin/BT)',
    description: 'Edinburgh winter heating (Scottish tenement insulation factor) & 1Gbps WiFi (~£120/month)',
    costGbp: 1440,
    frequency: 'Annual',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Full',
  },
  {
    id: 'c16',
    category: 'C_EDINBURGH_LIVING',
    categoryLabel: 'Category C: UKVI 1-Year Edinburgh Living Costs (Outside London)',
    item: 'Council Tax Exemption (Full-Time Students)',
    description: 'Scottish full-time enrolled students receive 100% Council Tax Exemption (Saving £1,400 - £2,200/year!)',
    costGbp: 0,
    frequency: 'Annual',
    isMandatoryStudent: true,
    isMandatoryWorker: false,
    coveredByScholarship: 'Full',
  },
  {
    id: 'c17',
    category: 'C_EDINBURGH_LIVING',
    categoryLabel: 'Category C: UKVI 1-Year Edinburgh Living Costs (Outside London)',
    item: 'Emergency Winter Warmth, Highland Trips & Buffer',
    description: 'Waterproof Gore-Tex gear, thermal base layers, Scottish Highlands exploration, emergency buffer',
    costGbp: 1500,
    frequency: 'Annual',
    isMandatoryStudent: true,
    isMandatoryWorker: true,
    coveredByScholarship: 'Self-Funded Only',
  },

  // CATEGORY D: Skilled Worker Visa Route items
  {
    id: 'c18',
    category: 'D_SCHOLARSHIP_BUFFER',
    categoryLabel: 'Category D: Direct Skilled Worker Relocation Specifics',
    item: 'UK Skilled Worker Visa Fee (Up to 3 Years)',
    description: 'Home Office application fee for shortage/standard occupation (£719 - £1,420)',
    costGbp: 827,
    frequency: 'One-time',
    isMandatoryStudent: false,
    isMandatoryWorker: true,
    coveredByScholarship: 'Self-Funded Only',
  },
  {
    id: 'c19',
    category: 'D_SCHOLARSHIP_BUFFER',
    categoryLabel: 'Category D: Direct Skilled Worker Relocation Specifics',
    item: 'Immigration Health Surcharge (IHS) - Worker (3 Years)',
    description: '£1,035/year for 3 years (£3,105 total upfront; often reimbursed or paid by high-tier employers)',
    costGbp: 3105,
    frequency: 'One-time',
    isMandatoryStudent: false,
    isMandatoryWorker: true,
    coveredByScholarship: 'Self-Funded Only',
  },
  {
    id: 'c20',
    category: 'D_SCHOLARSHIP_BUFFER',
    categoryLabel: 'Category D: Direct Skilled Worker Relocation Specifics',
    item: 'Initial Rental Tenancy Deposit (SafeDeposits Scotland)',
    description: '1 to 1.5 months rent held in Scottish statutory tenancy deposit scheme (~£1,200)',
    costGbp: 1200,
    frequency: 'One-time',
    isMandatoryStudent: false,
    isMandatoryWorker: true,
    coveredByScholarship: 'Self-Funded Only',
  },
];

export interface DocumentItem {
  id: string;
  category: 'Academic' | 'English Test' | 'Financial & UKVI' | 'Identity & Legal' | 'Scottish Institution & Visa';
  documentName: string;
  specificRequirements: string;
  issuingBody: string;
  status: 'Not Started' | 'In Progress' | 'Done' | 'Under Review';
  expiryDate: string;
  fileLink: string;
  priority: 'Critical' | 'High' | 'Medium';
}

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'd1',
    category: 'Academic',
    documentName: 'Ijazah S1 & Transkrip Akademik Asli',
    specificRequirements: 'Scan warna asli dari ijazah S1 & transkrip nilai resmi universitas Indonesia (IPK min 3.25/4.00 disarankan).',
    issuingBody: 'Universitas Asal (PTN/PTS di Indonesia)',
    status: 'Done',
    expiryDate: 'Lifetime',
    fileLink: 'https://drive.google.com/...',
    priority: 'Critical',
  },
  {
    id: 'd2',
    category: 'Academic',
    documentName: 'Sworn English Translation (Penerjemah Tersumpah)',
    specificRequirements: 'Diterjemahkan oleh Certified Sworn Translator dengan stempel basah, tanda tangan, nomor lisensi AHU, dan klausul akurasi.',
    issuingBody: 'Himpunan Penerjemah Indonesia (HPI) / Sworn Translator',
    status: 'In Progress',
    expiryDate: 'Lifetime',
    fileLink: '',
    priority: 'Critical',
  },
  {
    id: 'd3',
    category: 'Academic',
    documentName: 'Surat Rekomendasi Akademik & Profesional (2 Referees)',
    specificRequirements: 'Ditulis di atas kop surat resmi institusi, ber-email korporat/universitas resmi (.ac.id atau .edu), ditandatangani basah/digital.',
    issuingBody: 'Dosen Pembimbing Skripsi & Atasan Langsung',
    status: 'In Progress',
    expiryDate: 'Valid for 1-2 years',
    fileLink: '',
    priority: 'High',
  },
  {
    id: 'd4',
    category: 'Academic',
    documentName: 'Motivation Letter / Personal Statement (Scottish Tailored)',
    specificRequirements: 'SOP 500-1,000 kata yang secara spesifik menjelaskan mengapa University of Edinburgh / Heriot-Watt / Napier, riset fakultas, dan dampak ke Indonesia.',
    issuingBody: 'Mandiri (Applicant Crafted)',
    status: 'In Progress',
    expiryDate: 'N/A',
    fileLink: '',
    priority: 'Critical',
  },
  {
    id: 'd5',
    category: 'English Test',
    documentName: 'IELTS for UKVI (Academic SELT Certificate)',
    specificRequirements: 'HARUS tipe UKVI SELT (bukan General dan bukan IELTS Academic biasa jika ragu dengan universitas). Overall min 6.5 - 7.0, no band < 6.0.',
    issuingBody: 'British Council / IDP Education Indonesia',
    status: 'In Progress',
    expiryDate: '2027-04-15',
    fileLink: '',
    priority: 'Critical',
  },
  {
    id: 'd6',
    category: 'Identity & Legal',
    documentName: 'Paspor RI 10-Tahun (Elektronik/Polikarbonat)',
    specificRequirements: 'Masa berlaku minimal 6 bulan melewati akhir masa studi/kontrak visa. Disarankan memiliki paspor elektronik 10 tahun.',
    issuingBody: 'Direktorat Jenderal Imigrasi RI',
    status: 'Done',
    expiryDate: '2034-08-20',
    fileLink: '',
    priority: 'Critical',
  },
  {
    id: 'd7',
    category: 'Financial & UKVI',
    documentName: '28-Consecutive-Day Bank Statement (Mutasi Rekening Koran)',
    specificRequirements: 'Saldo tidak boleh jatuh 1 rupiah pun di bawah (Sisa SPP + £9,207) selama 28 HARI BERTURUT-TURUT. Tanggal akhir mutasi maks 31 hari sebelum submit visa!',
    issuingBody: 'Bank Mandiri / BCA / BNI / BRI (Bilingual + Stempel Cap Basah)',
    status: 'Not Started',
    expiryDate: '31 Days from printing',
    fileLink: '',
    priority: 'Critical',
  },
  {
    id: 'd8',
    category: 'Financial & UKVI',
    documentName: 'Bank Reference Letter (Surat Keterangan Bank)',
    specificRequirements: 'Surat resmi berbahasa Inggris menyatakan nama pemilik rekening, nomor rekening, dan mengonfirmasi saldo ditahan.',
    issuingBody: 'Customer Service Bank Nasional',
    status: 'Not Started',
    expiryDate: '31 Days from issuance',
    fileLink: '',
    priority: 'High',
  },
  {
    id: 'd9',
    category: 'Financial & UKVI',
    documentName: 'Surat Jaminan Pembiayaan (LPDP LoS / Chevening Letter)',
    specificRequirements: 'Letter of Sponsorship (LoS) resmi jika jalur beasiswa, mencakup SPP penuh, uang saku bulanan, dan asuransi kesehatan.',
    issuingBody: 'LPDP Kemenkeu RI / FCDO Chevening Secretariat',
    status: 'Not Started',
    expiryDate: 'Matches award year',
    fileLink: '',
    priority: 'Critical',
  },
  {
    id: 'd10',
    category: 'Scottish Institution & Visa',
    documentName: 'IOM TB Clearance Certificate',
    specificRequirements: 'Tes rontgen paru-paru di klinik IOM resmi (Jakarta: Menara BCA / Surabaya: RS Premier). Masa berlaku 6 bulan.',
    issuingBody: 'International Organization for Migration (IOM) Indonesia',
    status: 'Not Started',
    expiryDate: '6 Months from issuance',
    fileLink: '',
    priority: 'Critical',
  },
  {
    id: 'd11',
    category: 'Scottish Institution & Visa',
    documentName: 'CAS (Confirmation of Acceptance for Studies) / CoS',
    specificRequirements: 'Nomor referensi elektronik dari universitas Skotlandia (CAS untuk studi) atau Certificate of Sponsorship dari employer (CoS).',
    issuingBody: 'University of Edinburgh / Heriot-Watt / Napier OR UK Employer',
    status: 'Not Started',
    expiryDate: '6 Months validity',
    fileLink: '',
    priority: 'Critical',
  },
  {
    id: 'd12',
    category: 'Scottish Institution & Visa',
    documentName: 'ATAS Certificate (Academic Technology Approval Scheme)',
    specificRequirements: 'Wajib untuk jurusan STEM tertentu (Advanced AI, Robotics, Nuclear, Physics). Membutuhkan waktu proses 20-30 hari kerja.',
    issuingBody: 'Foreign, Commonwealth & Development Office (UK FCDO)',
    status: 'Not Started',
    expiryDate: '6 Months validity',
    fileLink: '',
    priority: 'High',
  },
  {
    id: 'd13',
    category: 'Identity & Legal',
    documentName: 'SKCK Mabes Polri (Police Clearance Certificate)',
    specificRequirements: 'Wajib untuk visa kerja di sektor pendidikan/kesehatan/finansial, diterbitkan langsung oleh Mabes Polri Jakarta.',
    issuingBody: 'Mabes Polri (Badan Intelijen Keamanan)',
    status: 'Not Started',
    expiryDate: '6 Months validity',
    fileLink: '',
    priority: 'Medium',
  },
];

export interface ScholarshipItem {
  id: string;
  name: string;
  fundingBody: string;
  coverage: string;
  minGpa: string;
  minIelts: string;
  workExperience: string;
  applicationWindow: string;
  keyRequirements: string;
  status: 'Researching' | 'Eligible' | 'Preparing Essays' | 'Submitted' | 'Interview' | 'Awarded';
  officialUrl: string;
}

export const INITIAL_SCHOLARSHIPS: ScholarshipItem[] = [
  {
    id: 's1',
    name: 'LPDP Beasiswa Reguler (Magister Luar Negeri)',
    fundingBody: 'Lembaga Pengelola Dana Pendidikan (Kemenkeu RI)',
    coverage: '100% Tuition, Monthly Living Allowance (~£1,250 - £1,450/mo), Flights, Visa, IHS, Settlement Allowance',
    minGpa: '3.00 / 4.00 (S1)',
    minIelts: '6.5 (min 6.0 each)',
    workExperience: 'Tidak wajib (Fresh graduate diperbolehkan)',
    applicationWindow: 'Tahap 1: Jan - Feb | Tahap 2: Jun - Jul',
    keyRequirements: 'Komitmen kembali ke Indonesia (Aturan 2n+1), Essay Kontribusi & Personal Statement, LoA Unconditional opsional (memberi kemudahan lolos substantif).',
    status: 'Preparing Essays',
    officialUrl: 'https://lpdp.kemenkeu.go.id',
  },
  {
    id: 's2',
    name: 'Chevening Scholarship (UK Government)',
    fundingBody: 'Foreign, Commonwealth & Development Office (FCDO)',
    coverage: '100% Tuition (capped for MBA), Monthly Stipend, Flights, Visa application fee, Arrival allowance',
    minGpa: 'Upper Second-Class Honours equivalent (IPK ~3.00+)',
    minIelts: 'Mengikuti syarat universitas (Chevening hapus syarat bahasa tersendiri)',
    workExperience: 'Minimal 2 tahun (setara 2,800 jam kerja akumulatif)',
    applicationWindow: 'Buka Awal Agustus - Tutup Awal November',
    keyRequirements: '4 Esai Wajib: Leadership & Influence, Networking, Study in the UK, Career Plan. Memilih 3 universitas (misal: Edinburgh MSc, Heriot-Watt, Napier).',
    status: 'Eligible',
    officialUrl: 'https://www.chevening.org/scholarship/indonesia/',
  },
  {
    id: 's3',
    name: 'GREAT Scholarships (British Council x Uni of Edinburgh)',
    fundingBody: 'British Council & Participating UK Universities',
    coverage: '£10,000 potongan langsung terhadap biaya SPP (Tuition Fee Waiver)',
    minGpa: '3.25+ / 4.00',
    minIelts: '7.0 (no band < 6.5)',
    workExperience: 'Direkomendasikan 1-2 tahun',
    applicationWindow: 'Desember - Mei setiap tahun',
    keyRequirements: 'Harus memegang offer dari University of Edinburgh. Bertindak sebagai duta GREAT Ambassador British Council.',
    status: 'Researching',
    officialUrl: 'https://study-uk.britishcouncil.org/scholarships-funding/great-scholarships',
  },
  {
    id: 's4',
    name: 'Edinburgh Global Postgraduate Merit / Masters Scholarship',
    fundingBody: 'University of Edinburgh College of Science & Engineering / Arts',
    coverage: '£5,000 - £10,000 tuition fee discount',
    minGpa: 'First Class / 3.50+ IPK',
    minIelts: '7.0 overall',
    workExperience: 'Tidak wajib',
    applicationWindow: 'Februari - Mei',
    keyRequirements: 'Berdasarkan prestasi akademik luar biasa saat S1. Diajukan via portal MyEd setelah menerima tawaran studi.',
    status: 'Researching',
    officialUrl: 'https://www.ed.ac.uk/student-funding/postgraduate/uk-eu',
  },
  {
    id: 's5',
    name: 'Commonwealth Shared Scholarships',
    fundingBody: 'Commonwealth Scholarship Commission in the UK (CSC)',
    coverage: 'Full Tuition, Monthly Stipend, Return Flights, Warm Clothing Allowance, Study Travel Grant',
    minGpa: 'IPK 3.30+ (Upper Second Class)',
    minIelts: '6.5 - 7.0',
    workExperience: 'Dipersyaratkan untuk beberapa program',
    applicationWindow: 'September - Desember',
    keyRequirements: 'Untuk program yang mendukung Sustainable Development Goals (SDGs) di negara berkembang.',
    status: 'Researching',
    officialUrl: 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-shared-scholarships/',
  },
];

export interface JobOpportunity {
  id: string;
  companyName: string;
  role: string;
  industry: 'Tech & Software' | 'Data & AI' | 'Finance & Asset Mgmt' | 'Consulting & Energy';
  isUkviSponsor: 'Yes' | 'No';
  estimatedSalaryGbp: number;
  isNewEntrantDiscount: boolean;
  requiredSkills: string;
  cvTailored: 'Yes' | 'In Progress' | 'No';
  applicationDeadline: string;
  status: 'Targeted' | 'Networking' | 'Applied' | 'Interview' | 'Offer';
}

export const INITIAL_JOBS: JobOpportunity[] = [
  {
    id: 'j1',
    companyName: 'Skyscanner',
    role: 'Software Engineer II (Backend / Distributed Systems)',
    industry: 'Tech & Software',
    isUkviSponsor: 'Yes',
    estimatedSalaryGbp: 48000,
    isNewEntrantDiscount: false,
    requiredSkills: 'Java / Python, AWS, Microservices, Kubernetes, REST APIs',
    cvTailored: 'In Progress',
    applicationDeadline: 'Rolling / Dec 2026',
    status: 'Targeted',
  },
  {
    id: 'j2',
    companyName: 'Rockstar North',
    role: 'Gameplay Programmer / Engine Tools Developer',
    industry: 'Tech & Software',
    isUkviSponsor: 'Yes',
    estimatedSalaryGbp: 44000,
    isNewEntrantDiscount: false,
    requiredSkills: 'C++, Physics Engines, 3D Mathematics, Memory Optimization',
    cvTailored: 'No',
    applicationDeadline: 'Openings Q1 2027',
    status: 'Targeted',
  },
  {
    id: 'j3',
    companyName: 'Amazon Development Centre Scotland',
    role: 'Applied Machine Learning Scientist / SDE',
    industry: 'Data & AI',
    isUkviSponsor: 'Yes',
    estimatedSalaryGbp: 62000,
    isNewEntrantDiscount: false,
    requiredSkills: 'PyTorch, LLM Fine-Tuning, Distributed Training, C++/Python',
    cvTailored: 'In Progress',
    applicationDeadline: 'Rolling Intake',
    status: 'Networking',
  },
  {
    id: 'j4',
    companyName: 'NatWest Group (Gogarburn HQ)',
    role: 'Quantitative Risk & Data Analyst',
    industry: 'Finance & Asset Mgmt',
    isUkviSponsor: 'Yes',
    estimatedSalaryGbp: 42000,
    isNewEntrantDiscount: false,
    requiredSkills: 'SQL, Python, Risk Modeling (Basel/IFRS 9), Tableau/PowerBI',
    cvTailored: 'Yes',
    applicationDeadline: 'March 2027',
    status: 'Targeted',
  },
  {
    id: 'j5',
    companyName: 'Baillie Gifford',
    role: 'Investment Technology Analyst',
    industry: 'Finance & Asset Mgmt',
    isUkviSponsor: 'Yes',
    estimatedSalaryGbp: 45000,
    isNewEntrantDiscount: false,
    requiredSkills: 'Python, Azure Data Lakes, Portfolio Analytics, SQL',
    cvTailored: 'No',
    applicationDeadline: 'Autumn Graduate/Experienced',
    status: 'Targeted',
  },
  {
    id: 'j6',
    companyName: 'CodeBase Incubator Startups',
    role: 'Junior Fullstack Engineer (Graduate Visa Switcher)',
    industry: 'Tech & Software',
    isUkviSponsor: 'Yes',
    estimatedSalaryGbp: 34000,
    isNewEntrantDiscount: true, // Eligible for £30,960 New Entrant rule!
    requiredSkills: 'React, TypeScript, Node.js, PostgreSQL, Cloud Run',
    cvTailored: 'Yes',
    applicationDeadline: 'Rolling',
    status: 'Targeted',
  },
];

export interface RoadmapPhase {
  id: string;
  phaseNumber: string;
  title: string;
  period: string;
  description: string;
  tasks: Array<{
    id: string;
    task: string;
    owner: string;
    isMilestone: boolean;
    completed: boolean;
  }>;
}

export const INITIAL_ROADMAP: RoadmapPhase[] = [
  {
    id: 'p1',
    phaseNumber: 'Phase 1',
    title: 'Diagnostic & Foundation (Month 1 - 6)',
    period: 'Nov 2026 - April 2027',
    description: 'Target selection between MSc vs Skilled Worker, diagnostic tests, and financial habit establishment.',
    tasks: [
      { id: 't1', task: 'Ambil Diagnostic Test IELTS Academic (evaluasi baseline band saat ini)', owner: 'Self', isMilestone: true, completed: true },
      { id: 't2', task: 'Tentukan shortlist program: MSc CS/Data Uni of Edinburgh, Heriot-Watt, Napier', owner: 'Self', isMilestone: false, completed: true },
      { id: 't3', task: 'Mulai rekening tabungan khusus "Edinburgh Vault" (komitmen nabung bulanan)', owner: 'Finance', isMilestone: true, completed: false },
      { id: 't4', task: 'Audit paspor RI: jika < 2 tahun masa berlaku, jadwalkan perpanjangan 10 tahun', owner: 'Immigration', isMilestone: false, completed: true },
    ],
  },
  {
    id: 'p2',
    phaseNumber: 'Phase 2',
    title: 'Credentials & Test Mastery (Month 7 - 12)',
    period: 'May 2027 - Oct 2027',
    description: 'Amankan skor IELTS SELT UKVI, terjemahan ijazah tersumpah, dan draf esai beasiswa.',
    tasks: [
      { id: 't5', task: 'Ambil Official Computer-Delivered IELTS for UKVI (Target: 7.0+ overall)', owner: 'Academic', isMilestone: true, completed: false },
      { id: 't6', task: 'Selesaikan Sworn Translation ijazah & transkrip S1 dari penerjemah berlisensi AHU', owner: 'Legal', isMilestone: false, completed: false },
      { id: 't7', task: 'Hubungi 2 calon referee (dosen pembimbing & manajer kantor) untuk surat rekomendasi', owner: 'Academic', isMilestone: false, completed: false },
      { id: 't8', task: 'Tulis draf 4 esai Chevening & proposal kontribusi LPDP', owner: 'Scholarship', isMilestone: true, completed: false },
    ],
  },
  {
    id: 'p3',
    phaseNumber: 'Phase 3',
    title: 'Applications Blitz (Month 13 - 16)',
    period: 'Nov 2027 - Feb 2028',
    description: 'Submit aplikasi universitas Skotlandia saat portal buka, submit pendaftaran beasiswa.',
    tasks: [
      { id: 't9', task: 'Submit aplikasi University of Edinburgh Degree Finder portal (MyEd)', owner: 'University', isMilestone: true, completed: false },
      { id: 't10', task: 'Submit Chevening Scholarship online application (sebelum deadline Nov)', owner: 'Scholarship', isMilestone: true, completed: false },
      { id: 't11', task: 'Submit LPDP Tahap 1 (Januari - Februari)', owner: 'Scholarship', isMilestone: true, completed: false },
      { id: 't12', task: 'Jaringan dengan diaspora PPI Edinburgh / alumni Skotlandia di LinkedIn', owner: 'Networking', isMilestone: false, completed: false },
    ],
  },
  {
    id: 'p4',
    phaseNumber: 'Phase 4',
    title: 'Offers, Funding & Visa Prep (Month 17 - 20)',
    period: 'Mar 2028 - Jun 2028',
    description: 'Terima tawaran Unconditional Offer, bayar deposit, mulai 28-day financial holding period.',
    tasks: [
      { id: 't13', task: 'Konversi Conditional Offer ke Unconditional Offer & bayar tuition deposit', owner: 'University', isMilestone: true, completed: false },
      { id: 't14', task: 'Request CAS (Confirmation of Acceptance for Studies) dari Admission Team', owner: 'University', isMilestone: true, completed: false },
      { id: 't15', task: 'Holding 28 Hari Berturut-turut di rekening bank (Sisa SPP + £9,207) tanpa drop', owner: 'Financial', isMilestone: true, completed: false },
      { id: 't16', task: 'Booking & jalani IOM TB Screening di Menara BCA Jakarta / RS Premier Surabaya', owner: 'Medical', isMilestone: true, completed: false },
    ],
  },
  {
    id: 'p5',
    phaseNumber: 'Phase 5',
    title: 'Final Logistics & Relocation (Month 21 - 24)',
    period: 'Jul 2028 - Dec 2028',
    description: 'Submit visa online, bayar IHS, booking akomodasi Edinburgh, dan tiket penerbangan.',
    tasks: [
      { id: 't17', task: 'Submit UK Student/Skilled Worker Visa online & bayar IHS (£776/£1,035 per tahun)', owner: 'UKVI', isMilestone: true, completed: false },
      { id: 't18', task: 'Biometrics appointment di VFS Global Kuningan City Jakarta', owner: 'VFS Global', isMilestone: true, completed: false },
      { id: 't19', task: 'Amankan akomodasi Edinburgh (PBSA/Flat) sebelum peak season Festival Fringe', owner: 'Housing', isMilestone: true, completed: false },
      { id: 't20', task: 'Beli tiket penerbangan Jakarta (CGK) ke Edinburgh (EDI) dengan bagasi ekstra', owner: 'Travel', isMilestone: false, completed: false },
    ],
  },
];
