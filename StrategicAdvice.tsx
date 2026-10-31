import React, { useState } from 'react';
import { ShieldAlert, Home, Stethoscope, AlertTriangle, CheckCircle2, ChevronRight, BookOpen, Lightbulb, ExternalLink } from 'lucide-react';

export const StrategicAdvice: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(1);

  return (
    <div className="space-y-6">
      
      {/* Executive Header */}
      <div className="bg-[#0B1D3A] rounded-xl p-6 text-white shadow-xs border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
          <span>Senior UK Mobility Specialist Advisory</span>
          <span aria-hidden="true">·</span>
          <span>Indonesian Applicant Protocol</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Strategic Advisory: The Top 3 Edinburgh &amp; UKVI Relocation Pitfalls
        </h1>
        <p className="text-slate-300 text-xs mt-1 max-w-3xl">
          Actionable, high-stakes guidance on navigating the UKVI 28-day financial holding rule, Edinburgh's HMO rental crisis, and the IOM TB screening bottlenecks in Jakarta and Surabaya.
        </p>
      </div>

      {/* Advisory Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: 28-Day Financial Rule */}
        <div
          onClick={() => setActiveCard(1)}
          className={`bg-white rounded-xl border p-5 shadow-xs cursor-pointer transition-all ${
            activeCard === 1
              ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Pitfall 01</span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                The 28-Consecutive-Day Bank Rule
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The #1 cause of visa refusals for Indonesian students. The account balance cannot drop below the statutory threshold for even 1 second.
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-800">
            <span>Read Deep Dive</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: Edinburgh Housing */}
        <div
          onClick={() => setActiveCard(2)}
          className={`bg-white rounded-xl border p-5 shadow-xs cursor-pointer transition-all ${
            activeCard === 2
              ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Pitfall 02</span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                Edinburgh Rental Crisis &amp; HMO Laws
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Scottish private residential tenancy (PRT) and HMO licensing make Edinburgh one of the UK's most competitive student rental markets.
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-800">
            <span>Read Deep Dive</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: IOM TB Clinic */}
        <div
          onClick={() => setActiveCard(3)}
          className={`bg-white rounded-xl border p-5 shadow-xs cursor-pointer transition-all ${
            activeCard === 3
              ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Pitfall 03</span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                IOM TB Clinic Bottlenecks (JKT / SUB)
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Only 2 certified clinics in Indonesia. Slots completely vanish between June and August right before UK intake deadlines.
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-800">
            <span>Read Deep Dive</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* Deep Dive Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        
        {/* Deep Dive 1: 28-Day Rule */}
        {activeCard === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <h2 className="text-base font-bold text-slate-900">
                1. The UKVI 28-Consecutive-Day Bank Holding Rule (Detailed Protocol)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>The "Not Even 1 Single Second" Strict Threshold</span>
                </h4>
                <p>
                  UKVI requires you to hold your exact required funds (<strong className="text-slate-900">Remaining Tuition + £9,207 Maintenance</strong> outside London) for a minimum of 28 consecutive days.
                </p>
                <p>
                  If your balance drops by even <strong>Rp 1,000</strong> on Day 27 due to an automatic monthly bank administration fee or debit card transaction, the entire 28-day clock resets to Day 0.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>The OANDA Currency Fluctuation Factor</span>
                </h4>
                <p>
                  Home Office caseworkers exclusively use the <a href="https://www.oanda.com/currency-converter/en/" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold">OANDA spot exchange rate</a> on the exact day you pay the visa application fee online.
                </p>
                <p>
                  <strong>Specialist Strategy:</strong> Always maintain a <strong className="text-emerald-800">10% to 15% safety buffer</strong> in your Indonesian bank account to insulate against Rupiah depreciation against the British Pound.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  <span>The 31-Day Printing &amp; Submission Window</span>
                </h4>
                <p>
                  Your bank statement must be dated no more than <strong>31 days</strong> before the date you submit and pay your UKVI visa application online.
                </p>
                <p>
                  Do not print your Rekening Koran too early! The optimal window is: print the statement on Day 29 or 30, and submit your online visa application within the next 3 to 7 days.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Indonesian Bank Paperwork Requirements</span>
                </h4>
                <p>
                  Obtain a bilingual <strong>Rekening Koran</strong> from Bank Mandiri, BCA, BNI, or BRI with official wet-ink branch stamps (<em className="italic">cap basah</em>) on each page.
                </p>
                <p>
                  Request a separate <strong>Bank Reference Letter</strong> on official bank letterhead stating that the funds are unencumbered and immediately accessible.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Deep Dive 2: Edinburgh Housing */}
        {activeCard === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Home className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">
                2. Edinburgh's Accommodation Shortage &amp; Scottish HMO Legislation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">
                  Scottish HMO (House in Multiple Occupation) Law
                </h4>
                <p>
                  In Scotland, any flat occupied by 3 or more unrelated tenants is legally classified as an HMO and requires an expensive council license.
                </p>
                <p>
                  Consequently, finding a 3-4 bedroom flat to share with other Indonesian students is exceptionally difficult. Landlords prefer letting to families or professional couples.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">
                  The August Festival Fringe Catastrophe
                </h4>
                <p>
                  Edinburgh hosts the world-famous Festival Fringe throughout August. City-wide short-term accommodation prices spike by 300% to 500%.
                </p>
                <p>
                  <strong>Never</strong> arrive in Edinburgh in August expecting to find a flat from a temporary Airbnb. Lock in your lease by May or June, or book University accommodation directly.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">
                  The UK Guarantor Dilemma
                </h4>
                <p>
                  Private letting agencies in Edinburgh (e.g. DJ Alexander, Clan Gordon, Rettie) require a UK-based homeowner as a financial guarantor.
                </p>
                <p>
                  If you have no UK relatives, agencies will demand <strong>6 months of rent upfront in cash</strong> or require you to use an approved institutional guarantor like <strong className="text-slate-900">Housing Hand</strong> or <strong className="text-slate-900">RentGuard</strong> (fee: ~£350 - £500).
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">
                  Top Recommended Student Accommodation Strategy
                </h4>
                <p>
                  For Year 1, prioritize Purpose-Built Student Accommodation (PBSA):
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li><strong>University of Edinburgh Halls:</strong> Deaconess, Salisbury Green, Richmond Place.</li>
                  <li><strong>Private PBSAs:</strong> Unite Students, Novel Student (Silk Mill), iQ Student Accommodation.</li>
                  <li><strong>Advantage:</strong> No UK guarantor needed, all bills included (heating, high-speed WiFi), 100% Council Tax exempt.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Deep Dive 3: IOM TB Test */}
        {activeCard === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Stethoscope className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                3. IOM TB Screening Logistics &amp; Appointment Bottlenecks in Indonesia
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">
                  Only 2 Certified Clinics Across All of Indonesia
                </h4>
                <p>
                  UKVI does NOT accept TB tests from general hospitals (Siloam, RS Pondok Indah, RSUP). You must book strictly with:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li><strong>Jakarta:</strong> IOM Indonesia, Menara BCA Lt. 12, Grand Indonesia, Jl. M.H. Thamrin.</li>
                  <li><strong>Surabaya:</strong> RS Premier Surabaya, Jl. Nginden Intan Barat.</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">
                  The Summer Rush Trap (June - August)
                </h4>
                <p>
                  Every year between June and August, thousands of Indonesian students heading to the UK, Australia, and Canada compete for slots.
                </p>
                <p>
                  Appointment calendars routinely become completely fully booked 4 to 8 weeks out. Do not wait for your university CAS to book the TB test!
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">
                  6-Month Validity Strategy
                </h4>
                <p>
                  Your IOM TB Clearance Certificate is valid for exactly <strong>6 months</strong> from the date of the chest X-ray.
                </p>
                <p>
                  <strong>Optimal Strategy:</strong> Take your test in <strong className="text-emerald-800">April or May</strong>. It will be fully valid for an August/September visa submission, and you will avoid the summer bottleneck entirely.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">
                  The Inconclusive X-Ray Risk (Sputum Test)
                </h4>
                <p>
                  If your chest X-ray reveals any lung scarring (common from past childhood bronchitis or pollution in Jakarta), IOM cannot issue an immediate certificate.
                </p>
                <p>
                  You will be referred for a sputum smear &amp; culture test, which takes <strong>8 to 10 weeks</strong> to culture. Booking early is your insurance against missing your university course start date!
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
