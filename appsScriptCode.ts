/**
 * Complete Google Apps Script (Code.gs) generator and Spreadsheet Blueprint
 * Designed for 1-click execution in Google Sheets: Extensions -> Apps Script -> Paste & Run.
 */

export const APPS_SCRIPT_CODE = `/**
 * ============================================================================
 * EDINBURGH BOUND: MASTER RELOCATION & IMMIGRATION SPREADSHEET BUILDER
 * Dual-Expert: Senior UK Immigration Specialist & Google Sheets Architect
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Click "Extensions" > "Apps Script"
 * 3. Delete any default code in Code.gs, paste this ENTIRE script, and click "Save" (Floppy disk icon)
 * 4. In the function dropdown, select "buildEdinburghMasterSpreadsheet" and click "Run"
 * 5. Grant permissions when prompted. The script will generate all 6 integrated tabs with
 *    Scottish Navy & Tartan themes, live formulas, dropdowns, and formatting.
 * ============================================================================
 */

function buildEdinburghMasterSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Theme Color Palette (Scottish Tartan & Royal Navy)
  const NAVY_DARK = "#0B1D3A";       // Royal Scottish Navy
  const NAVY_ACCENT = "#1E3A8A";     // Blue Ribbon
  const GOLD_TARTAN = "#D97706";     // Highland Gold
  const EMERALD_TARTAN = "#059669";  // Scottish Pine Forest
  const SLATE_BG = "#F8FAFC";        // Muted Off-White
  const BORDER_COLOR = "#CBD5E1";    // Subtle hairline
  
  // Set default spreadsheet locale and timezone
  ss.setSpreadsheetTimeZone("Asia/Jakarta");

  // Helper to get or create sheet
  function getOrCreateSheet(sheetName) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    } else {
      sheet.clear();
      sheet.clearFormats();
      sheet.clearConditionalFormatRules();
    }
    return sheet;
  }

  // --------------------------------------------------------------------------
  // SHEET 1: 📊 DASHBOARD "ME NOW vs FUTURE ME (EDINBURGH BOUND)"
  // --------------------------------------------------------------------------
  const s1 = getOrCreateSheet("📊 Dashboard");
  s1.setTabColor(NAVY_DARK);
  s1.showGridlines(true);

  // Title Block
  s1.getRange("A1:H1").merge()
    .setValue("EDINBURGH BOUND: RELOCATION MASTER COCKPIT")
    .setFontFamily("Plus Jakarta Sans")
    .setFontSize(16)
    .setFontWeight("bold")
    .setFontColor("#FFFFFF")
    .setBackground(NAVY_DARK)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  s1.setRowHeight(1, 45);

  s1.getRange("A2:H2").merge()
    .setValue("Dual-Pathway Engine: MSc at University of Edinburgh / Heriot-Watt / Napier OR Direct UK Skilled Worker Sponsorship")
    .setFontSize(10)
    .setFontColor("#E2E8F0")
    .setBackground(NAVY_ACCENT)
    .setHorizontalAlignment("center");

  // Section 1: Timeline & Countdown Switcher
  s1.getRange("A4:B4").merge().setValue("1. TIMELINE & COUNTDOWN").setFontWeight("bold").setBackground(SLATE_BG);
  s1.getRange("A5").setValue("Target Relocation Date:");
  s1.getRange("B5").setValue(new Date("2027-12-01"));
  s1.getRange("B5").setNumberFormat("yyyy-mm-dd");

  // Validation dropdown for target date
  const dateRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["2027-12-01", "2028-12-01"], true)
    .setAllowInvalid(false)
    .build();
  s1.getRange("B5").setDataValidation(dateRule);

  s1.getRange("A6").setValue("Today's Date:");
  s1.getRange("B6").setFormula("=TODAY()").setNumberFormat("yyyy-mm-dd");

  s1.getRange("A7").setValue("Days Remaining:");
  s1.getRange("B7").setFormula('=DATEDIF(B6, B5, "D")').setFontWeight("bold").setFontSize(12).setFontColor(NAVY_ACCENT);

  s1.getRange("A8").setValue("Weeks Remaining:");
  s1.getRange("B8").setFormula('=ROUND(B7 / 7, 1)');

  s1.getRange("A9").setValue("Months Remaining:");
  s1.getRange("B9").setFormula('=ROUND(B7 / 30.41, 1)');

  // Section 2: Financial Thermometer
  s1.getRange("D4:H4").merge().setValue("2. FINANCIAL THERMOMETER & DAILY SAVINGS ENGINE").setFontWeight("bold").setBackground(SLATE_BG);
  
  s1.getRange("D5").setValue("Pathway Mode:");
  s1.getRange("E5").setValue("Self-Funded Master's");
  const pathwayRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Self-Funded Master's", "Full Scholarship (LPDP/Chevening)", "Direct Skilled Worker Visa"], true)
    .build();
  s1.getRange("E5").setDataValidation(pathwayRule);

  s1.getRange("D6").setValue("Current Liquid Savings (IDR):");
  s1.getRange("E6").setValue(150000000).setNumberFormat('"Rp"#,##0');

  s1.getRange("D7").setValue("Current Liquid Savings (GBP):");
  s1.getRange("E7").setValue(0).setNumberFormat('"£"#,##0');

  s1.getRange("D8").setValue("Total Current Liquid (GBP):");
  s1.getRange("E8").setFormula('=E7 + (E6 / \'💰 Financial Engine\'!B3)').setNumberFormat('"£"#,##0').setFontWeight("bold");

  s1.getRange("D9").setValue("Total Required Budget (GBP):");
  s1.getRange("E9").setFormula('=IF(E5="Self-Funded Master\'s", \'💰 Financial Engine\'!C19, IF(E5="Full Scholarship (LPDP/Chevening)", 6500, 7200))').setNumberFormat('"£"#,##0');

  s1.getRange("D10").setValue("Financial Gap (GBP):");
  s1.getRange("E10").setFormula('=MAX(0, E9 - E8)').setNumberFormat('"£"#,##0').setFontWeight("bold").setFontColor("#DC2626");

  s1.getRange("D11").setValue("Financial Gap (IDR):");
  s1.getRange("E11").setFormula('=E10 * \'💰 Financial Engine\'!B3').setNumberFormat('"Rp"#,##0');

  s1.getRange("D12").setValue("Financial Readiness %:");
  s1.getRange("E12").setFormula('=IF(E9>0, MIN(1, E8 / E9), 1)').setNumberFormat('0.0%').setFontWeight("bold").setFontColor(EMERALD_TARTAN);

  s1.getRange("D13").setValue("Progress Sparkline:");
  s1.getRange("E13").setFormula('=SPARKLINE(E12*100, {"charttype","bar";"max",100;"color1","#0B1D3A"})');

  // Daily & Monthly Savings Targets
  s1.getRange("D14").setValue("DAILY Savings Target:");
  s1.getRange("E14").setFormula('=ROUND(E10 / MAX(1, B7), 0)').setNumberFormat('"£"#,##0').setFontWeight("bold").setBackground("#FEF3C7");
  s1.getRange("F14").setFormula('=E14 * \'💰 Financial Engine\'!B3').setNumberFormat('"Rp"#,##0').setFontWeight("bold").setBackground("#FEF3C7");

  s1.getRange("D15").setValue("MONTHLY Savings Target:");
  s1.getRange("E15").setFormula('=ROUND(E10 / MAX(0.1, B9), 0)').setNumberFormat('"£"#,##0').setFontWeight("bold").setBackground("#FEF3C7");
  s1.getRange("F15").setFormula('=E15 * \'💰 Financial Engine\'!B3').setNumberFormat('"Rp"#,##0').setFontWeight("bold").setBackground("#FEF3C7");

  // Section 3: Me Now vs Future Me Matrix
  s1.getRange("A17:H17").merge().setValue("3. ME NOW vs FUTURE ME (EDINBURGH READINESS MATRIX)").setFontWeight("bold").setBackground(NAVY_DARK).setFontColor("#FFFFFF");
  
  const matrixHeaders = [["Dimension", "Me Now (Baseline)", "Future Me (Edinburgh Requirement)", "Status / Gap", "Sparkline / Progress", "", "", ""]];
  s1.getRange("A18:H18").setValues(matrixHeaders).setFontWeight("bold").setBackground(SLATE_BG);

  const matrixData = [
    ["English Proficiency", "IELTS Band 6.0", "IELTS for UKVI Band 7.0+ (No band < 6.5)", '=IF(\'📑 Document Checklist\'!E6="Done", "READY", "GAP: +1.0 Band")', '=SPARKLINE(85, {"charttype","bar";"max",100;"color1","#1E3A8A"})', "", "", ""],
    ["UKVI 28-Day Bank Runway", '=TEXT(E8, "£#,##0")', "£36,707 (Tuition + £9,207 Maintenance)", '=IF(E8>=36707, "COMPLIANT", "UNDER-SEASONED")', '=SPARKLINE(MIN(100, E8/36707*100), {"charttype","bar";"max",100;"color1","#059669"})', "", "", ""],
    ["Document Readiness", '=COUNTIF(\'📑 Document Checklist\'!E2:E14, "Done") & " / " & COUNTA(\'📑 Document Checklist\'!B2:B14) & " Completed"', "100% Verified Originals + Sworn Translations", '=COUNTIF(\'📑 Document Checklist\'!E2:E14, "Done")/COUNTA(\'📑 Document Checklist\'!B2:B14)', '=SPARKLINE(COUNTIF(\'📑 Document Checklist\'!E2:E14, "Done")/COUNTA(\'📑 Document Checklist\'!B2:B14)*100, {"charttype","bar";"max",100;"color1","#D97706"})', "", "", ""],
    ["Scholarship Pipeline", "Preparing Drafts", "1 Submitted Unconditional Offer / LoS", '=IF(COUNTIF(\'🎓 Scholarships\'!G2:G7, "Awarded")>0, "AWARDED", "IN PIPELINE")', '=SPARKLINE(40, {"charttype","bar";"max",100;"color1","#1E3A8A"})', "", "", ""],
    ["Edinburgh Job / Sponsor", "Targeting 6 Employers", "Eligible UKVI Skilled Worker Offer (£38.7k+)", '=IF(COUNTIF(\'💼 Edinburgh Jobs\'!F2:F7, "ELIGIBLE (SPONSORABLE)")>0, "ELIGIBLE", "BELOW THRESHOLD")', '=SPARKLINE(50, {"charttype","bar";"max",100;"color1","#059669"})', "", "", ""],
  ];
  s1.getRange("A19:H23").setValues(matrixData);
  s1.getRange("D21").setNumberFormat("0.0%");

  s1.setColumnWidth(1, 220);
  s1.setColumnWidth(2, 220);
  s1.setColumnWidth(3, 300);
  s1.setColumnWidth(4, 180);
  s1.setColumnWidth(5, 180);

  // --------------------------------------------------------------------------
  // SHEET 2: 💰 FINANCIAL ENGINE & 1-YEAR COST OF LIVING
  // --------------------------------------------------------------------------
  const s2 = getOrCreateSheet("💰 Financial Engine");
  s2.setTabColor(EMERALD_TARTAN);
  s2.showGridlines(true);

  s2.getRange("A1:G1").merge()
    .setValue("FINANCIAL ENGINE: 1-YEAR REALISTIC EDINBURGH EXPENDITURE & UKVI PROOF")
    .setFontFamily("Plus Jakarta Sans")
    .setFontSize(14)
    .setFontWeight("bold")
    .setFontColor("#FFFFFF")
    .setBackground(NAVY_DARK)
    .setHorizontalAlignment("center");

  s2.getRange("A3").setValue("Live FX Rate (GBP/IDR):").setFontWeight("bold");
  s2.getRange("B3").setFormula('=IFERROR(GOOGLEFINANCE("CURRENCY:GBPIDR"), 20500)').setNumberFormat('"Rp"#,##0').setFontWeight("bold").setBackground("#FEF3C7");
  s2.getRange("C3").setValue("Source: Google Finance live market rate (Fallback: Rp 20,500)");

  const finHeaders = [["Category", "Line Item / Expenditure", "Cost (GBP)", "Cost (IDR)", "Frequency", "Coverage Note", "Mandatory for UKVI"]];
  s2.getRange("A5:G5").setValues(finHeaders).setFontWeight("bold").setBackground(SLATE_BG);

  const finRows = [
    // Pre-Departure
    ["Pre-Departure Out-of-Pocket", "UKVI IELTS SELT Test Fee (British Council/IDP)", 188, '=C6*$B$3', "One-time", "Reimbursable by LPDP upon award", "Yes"],
    ["Pre-Departure Out-of-Pocket", "Passport Renewal (10-Year E-Passport)", 45, '=C7*$B$3', "One-time", "Self-funded out-of-pocket", "Yes"],
    ["Pre-Departure Out-of-Pocket", "Sworn Translation & Apostille (Ijazah & Transkrip S1)", 75, '=C8*$B$3', "One-time", "Penerjemah Tersumpah resmi Kemenkumham", "Yes"],
    ["Pre-Departure Out-of-Pocket", "IOM TB Screening Test (Menara BCA Jakarta / RS Premier)", 72, '=C9*$B$3', "One-time", "Mandatory for UK stay > 6 months", "Yes"],
    ["Pre-Departure Out-of-Pocket", "UK Student Visa Application Fee", 490, '=C10*$B$3', "One-time", "Paid to UKVI online", "Yes"],
    ["Pre-Departure Out-of-Pocket", "Immigration Health Surcharge (IHS - 1.3 Years)", 1164, '=C11*$B$3', "One-time", "£776/year + 4 months grace period", "Yes"],
    ["Pre-Departure Out-of-Pocket", "VFS Global Biometrics & Passport Courier", 120, '=C12*$B$3', "One-time", "VFS Jakarta / Bali appointment", "Yes"],
    ["Pre-Departure Out-of-Pocket", "One-Way Flight CGK -> EDI (Edinburgh Airport)", 750, '=C13*$B$3', "One-time", "Qatar/Emirates 40kg baggage", "Yes"],
    // Tuition
    ["University Tuition & Deposit", "Edinburgh MSc Tuition Deposit (Secures CAS)", 2500, '=C14*$B$3', "One-time", "Deducted from total tuition fee", "Yes"],
    ["University Tuition & Deposit", "Remaining MSc Tuition Balance (Uni of Edinburgh)", 27500, '=C15*$B$3', "One-time", "Science & Engineering typical fee", "Yes"],
    // Living Costs
    ["1-Year Edinburgh Living", "Student Accommodation / Flat (12 mos @ £750/mo)", 9000, '=C16*$B$3', "Annual", "Typical Marchmont/Newington flatshare", "Realistic"],
    ["1-Year Edinburgh Living", "Groceries & Food (12 mos @ £220/mo)", 2640, '=C17*$B$3', "Annual", "Lidl, Aldi, Asian Supermarket", "Realistic"],
    ["1-Year Edinburgh Living", "Lothian Buses Student Ridacard (12 mos @ £60/mo)", 720, '=C18*$B$3', "Annual", "Unlimited 24/7 travel in Edinburgh", "Realistic"],
    ["1-Year Edinburgh Living", "Utilities & Gas/Electric Heating (Tenement buffer)", 1440, '=C19*$B$3', "Annual", "Winter heating factor (~£120/mo)", "Realistic"],
    ["1-Year Edinburgh Living", "Full-Time Student Council Tax Exemption", 0, '=C20*$B$3', "Annual", "Scottish statutory 100% exemption", "Exempt"],
    ["1-Year Edinburgh Living", "Winter Clothing, Highlands Travel & Buffer", 1500, '=C21*$B$3', "Annual", "Gore-Tex jacket, boots, emergency buffer", "Buffer"],
  ];

  s2.getRange("A6:G21").setValues(finRows);

  // Totals Row
  s2.getRange("A22:B22").merge().setValue("TOTAL 1-YEAR SELF-FUNDED BUDGET REQUIRED:").setFontWeight("bold").setBackground(NAVY_DARK).setFontColor("#FFFFFF");
  s2.getRange("C22").setFormula("=SUM(C6:C21)").setFontWeight("bold").setBackground(NAVY_DARK).setFontColor("#FFFFFF");
  s2.getRange("D22").setFormula("=SUM(D6:D21)").setFontWeight("bold").setBackground(NAVY_DARK).setFontColor("#FFFFFF");

  // Format currency
  s2.getRange("C6:C22").setNumberFormat('"£"#,##0');
  s2.getRange("D6:D22").setNumberFormat('"Rp"#,##0');

  // UKVI 28-day holding rule callout
  s2.getRange("A24:G24").merge().setValue("UKVI 28-CONSECUTIVE-DAY CASH REQUIREMENT FORMULA").setFontWeight("bold").setBackground(SLATE_BG);
  s2.getRange("A25:C25").merge().setValue("UKVI Minimum Funds Required = Sisa SPP + £9,207 Maintenance:");
  s2.getRange("D25").setFormula("=C15 + 9207").setNumberFormat('"£"#,##0').setFontWeight("bold").setFontColor("#DC2626");
  s2.getRange("E25").setFormula("=D25 * $B$3").setNumberFormat('"Rp"#,##0').setFontWeight("bold").setFontColor("#DC2626");

  s2.setColumnWidth(1, 200);
  s2.setColumnWidth(2, 320);
  s2.setColumnWidth(3, 130);
  s2.setColumnWidth(4, 160);
  s2.setColumnWidth(5, 110);
  s2.setColumnWidth(6, 260);
  s2.setColumnWidth(7, 140);

  // --------------------------------------------------------------------------
  // SHEET 3: 📑 MASTER DOCUMENT CHECKLIST
  // --------------------------------------------------------------------------
  const s3 = getOrCreateSheet("📑 Document Checklist");
  s3.setTabColor(NAVY_ACCENT);
  s3.showGridlines(true);

  const docHeaders = [["Category", "Document Name", "Specific Requirements & UKVI Rules", "Issuing Body", "Current Status", "Expiry Date", "Drive / File URL", "Priority"]];
  s3.getRange("A1:H1").setValues(docHeaders).setFontWeight("bold").setBackground(NAVY_DARK).setFontColor("#FFFFFF");
  s3.setRowHeight(1, 35);

  const docRows = [
    ["Academic", "Ijazah S1 Asli", "Scan warna asli universitas Indonesia. IPK min 3.00-3.25.", "Universitas Asal PTN/PTS", "Done", "Lifetime", "", "Critical"],
    ["Academic", "Transkrip Nilai Akademik S1", "Scan transkrip lengkap semester 1-8 dengan stempel kampus.", "Universitas Asal PTN/PTS", "Done", "Lifetime", "", "Critical"],
    ["Academic", "Sworn English Translation (Ijazah & Transkrip)", "Penerjemah Tersumpah tersertifikasi Kemenkumham dengan klausul akurasi resmi.", "HPI / Certified Sworn Translator", "In Progress", "Lifetime", "", "Critical"],
    ["Academic", "Academic / Professional Reference Letters (2x)", "Di atas kop surat institusi, email resmi (.ac.id / corporate), tanda tangan.", "Dosen Pembimbing & Atasan Kantor", "In Progress", "Valid 2 Years", "", "High"],
    ["Academic", "Motivation Letter / SOP (Edinburgh Tailored)", "Menjawab: Mengapa Edinburgh, fit kurikulum, rencana kontribusi pasca-studi.", "Mandiri (Applicant)", "In Progress", "N/A", "", "Critical"],
    ["English Test", "IELTS for UKVI (Academic SELT Certificate)", "Overall min 6.5 - 7.0 (No sub-band < 6.0 / 6.5). Wajib tipe SELT UKVI.", "British Council / IDP", "In Progress", "2027-04-15", "", "Critical"],
    ["Identity & Legal", "Paspor RI 10-Tahun", "Elektronik/Polikarbonat dengan sisa masa berlaku min 6 bulan setelah studi.", "Ditjen Imigrasi", "Done", "2034-08-20", "", "Critical"],
    ["Financial & UKVI", "28-Day Consecutive Bank Statement (Rekening Koran)", "Saldo tidak boleh turun 1 detik pun di bawah syarat selama 28 hari berturut-turut.", "Bank Mandiri / BCA / BNI (Cap Basah)", "Not Started", "31 Days from print", "", "Critical"],
    ["Financial & UKVI", "Bank Reference Letter", "Surat keterangan bank dalam Bahasa Inggris mengonfirmasi pemilik dan dana cair.", "Customer Service Bank", "Not Started", "31 Days from print", "", "High"],
    ["Financial & UKVI", "Letter of Sponsorship (LoS)", "Surat jaminan resmi jika jalur LPDP / Chevening / Beasiswa Institusi.", "LPDP / Chevening Secretariat", "Not Started", "Award period", "", "Critical"],
    ["Medical & Clearance", "IOM TB Clearance Certificate", "Pemeriksaan rontgen paru di klinik resmi IOM Jakarta / Surabaya. Berlaku 6 bln.", "IOM Indonesia (Menara BCA)", "Not Started", "6 Months", "", "Critical"],
    ["Scottish Uni / Visa", "CAS (Confirmation of Acceptance for Studies)", "Nomor referensi elektronik dari universitas untuk submit visa pelajar.", "University of Edinburgh / Heriot-Watt", "Not Started", "6 Months", "", "Critical"],
    ["Scottish Uni / Visa", "ATAS Clearance Certificate", "Wajib jika program MSc masuk dalam kategori STEM / riset sensitif UKVI.", "UK FCDO", "Not Started", "6 Months", "", "High"],
    ["Identity & Legal", "SKCK Mabes Polri (Police Clearance)", "Dibutuhkan untuk jalur visa kerja langsung (Skilled Worker).", "Mabes Polri Jakarta", "Not Started", "6 Months", "", "Medium"],
  ];

  s3.getRange("A2:H15").setValues(docRows);

  // Status Dropdown validation
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Not Started", "In Progress", "Done", "Under Review"], true)
    .build();
  s3.getRange("E2:E15").setDataValidation(statusRule);

  // Priority Dropdown validation
  const priorityRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Critical", "High", "Medium", "Low"], true)
    .build();
  s3.getRange("H2:H15").setDataValidation(priorityRule);

  s3.setColumnWidth(1, 140);
  s3.setColumnWidth(2, 240);
  s3.setColumnWidth(3, 340);
  s3.setColumnWidth(4, 200);
  s3.setColumnWidth(5, 120);
  s3.setColumnWidth(6, 130);
  s3.setColumnWidth(7, 180);
  s3.setColumnWidth(8, 100);

  // --------------------------------------------------------------------------
  // SHEET 4: 🎓 SCHOLARSHIPS DIRECTORY & PIPELINE
  // --------------------------------------------------------------------------
  const s4 = getOrCreateSheet("🎓 Scholarships");
  s4.setTabColor(GOLD_TARTAN);
  s4.showGridlines(true);

  const scholHeaders = [["Scholarship Name", "Funding Body", "Coverage", "Min GPA", "Min IELTS", "Work Experience", "Application Status", "Official Website"]];
  s4.getRange("A1:H1").setValues(scholHeaders).setFontWeight("bold").setBackground(NAVY_DARK).setFontColor("#FFFFFF");
  s4.setRowHeight(1, 35);

  const scholRows = [
    ["LPDP Beasiswa Reguler", "Kemenkeu RI", "Full SPP, Uang Saku (~£1,350/mo), Tiket PP, Visa, IHS, Asuransi", "3.00 / 4.00", "6.5 (min 6.0)", "Tidak wajib", "Preparing Essays", "https://lpdp.kemenkeu.go.id"],
    ["Chevening Scholarship", "UK FCDO", "Full SPP (capped MBA), Living Stipend, Flights, Visa, Arrival grant", "3.00+ equivalent", "Mengikuti uni", "Min 2 Tahun (2,800 jam)", "Eligible", "https://www.chevening.org"],
    ["GREAT Scholarships", "British Council x Uni of Edinburgh", "£10,000 potongan langsung biaya kuliah (Tuition fee waiver)", "3.25+", "7.0 (no band < 6.5)", "Direkomendasikan", "Researching", "https://study-uk.britishcouncil.org"],
    ["Edinburgh Global Postgraduate Merit", "Uni of Edinburgh", "£5,000 - £10,000 tuition discount untuk mahasiswa berprestasi", "3.50+ (First Class)", "7.0 overall", "Tidak wajib", "Researching", "https://www.ed.ac.uk/student-funding"],
    ["Commonwealth Shared Scholarships", "CSC UK", "Full Tuition, Monthly Stipend, Flights, Warm clothes allowance", "3.30+", "6.5 - 7.0", "Tergantung prodi", "Researching", "https://cscuk.fcdo.gov.uk"],
  ];
  s4.getRange("A2:H6").setValues(scholRows);

  const scholStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Researching", "Eligible", "Preparing Essays", "Submitted", "Interview", "Awarded"], true)
    .build();
  s4.getRange("G2:G6").setDataValidation(scholStatusRule);

  s4.setColumnWidth(1, 240);
  s4.setColumnWidth(2, 180);
  s4.setColumnWidth(3, 300);
  s4.setColumnWidth(4, 110);
  s4.setColumnWidth(5, 110);
  s4.setColumnWidth(6, 160);
  s4.setColumnWidth(7, 140);
  s4.setColumnWidth(8, 220);

  // --------------------------------------------------------------------------
  // SHEET 5: 💼 EDINBURGH JOB OPPORTUNITIES & WORK VISA TRACKER
  // --------------------------------------------------------------------------
  const s5 = getOrCreateSheet("💼 Edinburgh Jobs");
  s5.setTabColor(NAVY_DARK);
  s5.showGridlines(true);

  const jobHeaders = [["Company Name", "Role / Job Title", "Industry", "UKVI Sponsor?", "Est. Base Salary (GBP)", "Meets Salary Threshold?", "New Entrant 70% Rate?", "Tech Stack / Skills", "Status"]];
  s5.getRange("A1:I1").setValues(jobHeaders).setFontWeight("bold").setBackground(NAVY_DARK).setFontColor("#FFFFFF");
  s5.setRowHeight(1, 35);

  const jobRows = [
    ["Skyscanner", "Software Engineer II (Distributed Systems)", "Tech & Software", "Yes", 48000, '=IF(E2>=IF(G2="Yes", 30960, 38700), "ELIGIBLE (SPONSORABLE)", "BELOW THRESHOLD")', "No", "Java, Python, AWS, Microservices", "Targeted"],
    ["Rockstar North", "Gameplay Programmer / Tools Developer", "Tech & Gaming", "Yes", 44000, '=IF(E3>=IF(G3="Yes", 30960, 38700), "ELIGIBLE (SPONSORABLE)", "BELOW THRESHOLD")', "No", "C++, Physics, 3D Mathematics", "Targeted"],
    ["Amazon Dev Centre Scotland", "Applied Machine Learning Scientist", "Data & AI", "Yes", 62000, '=IF(E4>=IF(G4="Yes", 30960, 38700), "ELIGIBLE (SPONSORABLE)", "BELOW THRESHOLD")', "No", "PyTorch, LLM Tuning, C++", "Networking"],
    ["NatWest Group (Gogarburn)", "Quantitative Risk & Data Analyst", "Finance & Banking", "Yes", 42000, '=IF(E5>=IF(G5="Yes", 30960, 38700), "ELIGIBLE (SPONSORABLE)", "BELOW THRESHOLD")', "No", "SQL, Python, Risk Modeling", "Targeted"],
    ["Baillie Gifford", "Investment Technology Analyst", "Asset Management", "Yes", 45000, '=IF(E6>=IF(G6="Yes", 30960, 38700), "ELIGIBLE (SPONSORABLE)", "BELOW THRESHOLD")', "No", "Python, Azure, Financial Markets", "Targeted"],
    ["CodeBase Startups", "Junior Fullstack Engineer (Graduate Switcher)", "Tech & Startups", "Yes", 34000, '=IF(E7>=IF(G7="Yes", 30960, 38700), "ELIGIBLE (SPONSORABLE)", "BELOW THRESHOLD")', "Yes", "TypeScript, React, Node, PostgreSQL", "Targeted"],
  ];
  s5.getRange("A2:I7").setValues(jobRows);

  s5.getRange("E2:E7").setNumberFormat('"£"#,##0');
  
  const yesNoRule = SpreadsheetApp.newDataValidation().requireValueInList(["Yes", "No"], true).build();
  s5.getRange("D2:D7").setDataValidation(yesNoRule);
  s5.getRange("G2:G7").setDataValidation(yesNoRule);

  const jobStatusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Targeted", "Networking", "Applied", "Interview", "Offer"], true)
    .build();
  s5.getRange("I2:I7").setDataValidation(jobStatusRule);

  s5.setColumnWidth(1, 200);
  s5.setColumnWidth(2, 260);
  s5.setColumnWidth(3, 160);
  s5.setColumnWidth(4, 110);
  s5.setColumnWidth(5, 140);
  s5.setColumnWidth(6, 180);
  s5.setColumnWidth(7, 140);
  s5.setColumnWidth(8, 260);
  s5.setColumnWidth(9, 120);

  // --------------------------------------------------------------------------
  // SHEET 6: 🗓️ MASTER TIMELINE & ACTION ROADMAP
  // --------------------------------------------------------------------------
  const s6 = getOrCreateSheet("🗓️ Master Timeline");
  s6.setTabColor(NAVY_ACCENT);
  s6.showGridlines(true);

  const timeHeaders = [["Phase", "Milestone / Action Item", "Quarter / Period", "Responsible", "Key Gate / Critical Milestone", "Done?"]];
  s6.getRange("A1:F1").setValues(timeHeaders).setFontWeight("bold").setBackground(NAVY_DARK).setFontColor("#FFFFFF");
  s6.setRowHeight(1, 35);

  const timeRows = [
    ["Phase 1: Diagnostic & Foundation", "Ambil Diagnostic Test IELTS Academic (evaluasi baseline)", "Nov 2026 - Jan 2027", "Self", "Yes", true],
    ["Phase 1: Diagnostic & Foundation", "Shortlist prodi Edinburgh/Heriot-Watt & perpanjang paspor 10 thn", "Feb 2027 - Apr 2027", "Self / Imigrasi", "Yes", true],
    ["Phase 2: Credentials & Test", "Ambil Official Computer-Delivered IELTS for UKVI (Target 7.0+)", "May 2027 - Jul 2027", "Academic", "Yes", false],
    ["Phase 2: Credentials & Test", "Selesaikan Sworn Translation ijazah & kontak 2 referee", "Aug 2027 - Oct 2027", "Legal / Dosen", "No", false],
    ["Phase 3: Applications Blitz", "Submit aplikasi universitas via MyEd / portal admissions", "Nov 2027 - Dec 2027", "University", "Yes", false],
    ["Phase 3: Applications Blitz", "Submit aplikasi Chevening & LPDP Tahap 1", "Jan 2028 - Feb 2028", "Scholarship", "Yes", false],
    ["Phase 4: Offers & Visa Prep", "Konversi Unconditional Offer, bayar deposit, dan request CAS", "Mar 2028 - May 2028", "University", "Yes", false],
    ["Phase 4: Offers & Visa Prep", "Holding 28 hari berturut-turut di rekening bank tanpa drop", "Jun 2028 - Jul 2028", "Finance / Bank", "Yes", false],
    ["Phase 4: Offers & Visa Prep", "Jalani IOM TB Screening di Menara BCA Jakarta", "Jul 2028", "Medical IOM", "Yes", false],
    ["Phase 5: Logistics & Relocation", "Submit UK Visa online, bayar IHS, & biometrics di VFS", "Aug 2028", "UKVI / VFS", "Yes", false],
    ["Phase 5: Logistics & Relocation", "Booking akomodasi Edinburgh sebelum peak Festival Fringe", "Aug 2028 - Sep 2028", "Housing", "Yes", false],
    ["Phase 5: Logistics & Relocation", "Penerbangan Jakarta (CGK) -> Edinburgh (EDI) & selamat datang!", "Dec 2028", "Travel", "Yes", false],
  ];
  s6.getRange("A2:F13").setValues(timeRows);

  s6.setColumnWidth(1, 220);
  s6.setColumnWidth(2, 380);
  s6.setColumnWidth(3, 170);
  s6.setColumnWidth(4, 130);
  s6.setColumnWidth(5, 170);
  s6.setColumnWidth(6, 80);

  // Activate Dashboard
  ss.setActiveSheet(s1);
  SpreadsheetApp.getUi().alert("Edinburgh Relocation Master Spreadsheet successfully generated with all 6 sheets!");
}
`;

export const SPREADSHEET_BLUEPRINT_DOCUMENTATION = {
  title: "Edinburgh Relocation Master Spreadsheet Architecture Blueprint",
  overview: "This architectural blueprint defines the structural schema, mathematical calculation engines, data validation constraints, and Google Sheets formula bindings across all 6 tabs.",
  sheets: [
    {
      sheetName: "📊 Dashboard",
      tabColor: "#0B1D3A (Scottish Royal Navy)",
      purpose: "Single-pane-of-glass executive summary calculating exact time remaining, live financial runway, daily/monthly savings velocity, and readiness matrix.",
      columns: [
        { col: "A - B", name: "Countdown Module", formula: '=DATEDIF(B6, B5, "D")' },
        { col: "D - F", name: "Financial Runway & Daily Velocity", formula: '=ROUND(E10 / MAX(1, B7), 0)' },
        { col: "A - E", name: "Me Now vs Future Me Matrix", formula: '=SPARKLINE(D14, {"charttype","bar";"max",100;"color1","#1E3A8A"})' },
      ],
      keyFormulas: [
        { label: "Target Countdown (Days)", formula: '=DATEDIF(TODAY(), B5, "D")' },
        { label: "Financial Gap (GBP)", formula: '=MAX(0, E9 - E8)' },
        { label: "Daily Savings Target (GBP)", formula: '=ROUND(E10 / MAX(1, B7), 0)' },
        { label: "Monthly Savings Target (IDR)", formula: '=E15 * \'💰 Financial Engine\'!B3' },
        { label: "Document Progress %", formula: '=COUNTIF(\'📑 Document Checklist\'!E2:E15, "Done") / COUNTA(\'📑 Document Checklist\'!B2:B15)' },
        { label: "Dynamic Sparkline", formula: '=SPARKLINE(E12*100, {"charttype","bar";"max",100;"color1","#0B1D3A"})' },
      ],
    },
    {
      sheetName: "💰 Financial Engine",
      tabColor: "#059669 (Scottish Pine Forest)",
      purpose: "Detailed line-item expenditure for Pre-Departure, Tuition, Living, and Skilled Worker costs with live currency conversion.",
      columns: [
        { col: "A", name: "Category", description: "Expense grouping" },
        { col: "B", name: "Line Item", description: "Granular cost description" },
        { col: "C", name: "Cost (GBP)", description: "Base cost in British Pounds" },
        { col: "D", name: "Cost (IDR)", description: "Calculated with live FX rate: =C6 * $B$3" },
        { col: "E", name: "Frequency", description: "One-time, Monthly, Annual" },
        { col: "F", name: "Coverage Note", description: "LPDP/Chevening vs Out-of-Pocket" },
        { col: "G", name: "Mandatory for UKVI", description: "Yes, Realistic, Buffer" },
      ],
      keyFormulas: [
        { label: "Live Exchange Rate", formula: '=GOOGLEFINANCE("CURRENCY:GBPIDR")' },
        { label: "IDR Cost Converter", formula: '=C6 * $B$3' },
        { label: "Total Self-Funded GBP", formula: '=SUM(C6:C21)' },
        { label: "UKVI 28-Day Holding Target", formula: '=C15 + 9207 (Tuition Balance + 9-mo maintenance)' },
      ],
    },
    {
      sheetName: "📑 Document Checklist",
      tabColor: "#1E3A8A (Blue Ribbon)",
      purpose: "Indonesian Applicant Protocol tracking academic records, sworn translations, 28-day bank letters, and TB clearance.",
      columns: [
        { col: "A", name: "Category", description: "Academic, English, Financial, Medical, Visa" },
        { col: "B", name: "Document Name", description: "Official document title" },
        { col: "C", name: "Specific Requirements", description: "UKVI strict rules & legal compliance" },
        { col: "D", name: "Issuing Body", description: "Indonesian/UK authority" },
        { col: "E", name: "Current Status", description: "Not Started / In Progress / Done / Under Review" },
        { col: "F", name: "Expiry Date", description: "Validity window (e.g. 28-day rule, 6-mo TB)" },
        { col: "G", name: "Drive URL", description: "Link to cloud storage" },
        { col: "H", name: "Priority", description: "Critical / High / Medium" },
      ],
      keyFormulas: [
        { label: "Completed Count", formula: '=COUNTIF(E2:E15, "Done")' },
        { label: "Completion Rate", formula: '=COUNTIF(E2:E15, "Done") / COUNTA(B2:B15)' },
      ],
    },
    {
      sheetName: "🎓 Scholarships",
      tabColor: "#D97706 (Highland Gold)",
      purpose: "Directory and tracking pipeline for LPDP, Chevening, GREAT, and Edinburgh institutional awards.",
      columns: [
        { col: "A", name: "Scholarship Name" },
        { col: "B", name: "Funding Body" },
        { col: "C", name: "Coverage" },
        { col: "D", name: "Min GPA" },
        { col: "E", name: "Min IELTS" },
        { col: "F", name: "Work Experience" },
        { col: "G", name: "Application Status" },
        { col: "H", name: "Official Website" },
      ],
      keyFormulas: [
        { label: "Active Pipeline Count", formula: '=COUNTIF(G2:G6, "<>Researching")' },
      ],
    },
    {
      sheetName: "💼 Edinburgh Jobs",
      tabColor: "#0B1D3A (Scottish Navy)",
      purpose: "Edinburgh tech, finance, and consulting employer directory with post-April 2024 UKVI Skilled Worker salary threshold validator.",
      columns: [
        { col: "A", name: "Company Name" },
        { col: "B", name: "Role / Job Title" },
        { col: "C", name: "Industry" },
        { col: "D", name: "UKVI Sponsor?" },
        { col: "E", name: "Est. Base Salary (GBP)" },
        { col: "F", name: "Meets Salary Threshold?" },
        { col: "G", name: "New Entrant 70% Rate?" },
        { col: "H", name: "Tech Stack / Skills" },
        { col: "I", name: "Status" },
      ],
      keyFormulas: [
        { label: "Threshold Validator", formula: '=IF(E2>=IF(G2="Yes", 30960, 38700), "ELIGIBLE (SPONSORABLE)", "BELOW THRESHOLD")' },
      ],
    },
    {
      sheetName: "🗓️ Master Timeline",
      tabColor: "#1E3A8A (Blue Ribbon)",
      purpose: "Phased Gantt action roadmap from 2026 baseline through Dec 2027/2028 departure gates.",
      columns: [
        { col: "A", name: "Phase" },
        { col: "B", name: "Milestone / Action Item" },
        { col: "C", name: "Quarter / Period" },
        { col: "D", name: "Responsible" },
        { col: "E", name: "Key Gate?" },
        { col: "F", name: "Done?" },
      ],
      keyFormulas: [
        { label: "Milestones Cleared", formula: '=COUNTIF(F2:F13, TRUE) & " of " & COUNTIF(E2:E13, "Yes")' },
      ],
    },
  ],
};
