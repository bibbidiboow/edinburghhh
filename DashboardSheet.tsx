import React, { useState } from 'react';
import { Calendar, DollarSign, TrendingUp, Award, CheckCircle2, Clock, Info, Copy, Check, ArrowRight, ExternalLink } from 'lucide-react';
import { calculateCountdown, calculateFinancialRunway } from '../utils/calculations';
import { DocumentItem } from '../data/spreadsheetData';

interface DashboardSheetProps {
  targetDate: string;
  setTargetDate: (date: string) => void;
  savingsIdr: number;
  setSavingsIdr: (val: number) => void;
  savingsGbp: number;
  setSavingsGbp: (val: number) => void;
  exchangeRate: number;
  setExchangeRate: (val: number) => void;
  pathway: 'Self-Funded Master\'s' | 'Full Scholarship (LPDP/Chevening)' | 'Direct Skilled Worker Visa';
  setPathway: (val: 'Self-Funded Master\'s' | 'Full Scholarship (LPDP/Chevening)' | 'Direct Skilled Worker Visa') => void;
  documents: DocumentItem[];
  onOpenAppsScript: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const DashboardSheet: React.FC<DashboardSheetProps> = ({
  targetDate,
  setTargetDate,
  savingsIdr,
  setSavingsIdr,
  savingsGbp,
  setSavingsGbp,
  exchangeRate,
  setExchangeRate,
  pathway,
  setPathway,
  documents,
  onOpenAppsScript,
  onNavigateToTab,
}) => {
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  // Countdown calculations
  const countdown = calculateCountdown(targetDate);

  // Determine target goal based on pathway
  let pathwayCostGbp = 48500; // Self funded default (Tuition ~£30,000 + Living £14,000 + Visa/IHS/Flights £4,500)
  if (pathway === 'Full Scholarship (LPDP/Chevening)') {
    pathwayCostGbp = 6500; // Pre-departure expenses, deposit buffer before disbursement, emergency funds
  } else if (pathway === 'Direct Skilled Worker Visa') {
    pathwayCostGbp = 7200; // Visa fee + 3-yr IHS + 1st month flat deposit + flight + emergency runway
  }

  const runway = calculateFinancialRunway(
    {
      currentSavingsIdr: savingsIdr,
      currentSavingsGbp: savingsGbp,
      exchangeRateGbpIdr: exchangeRate,
      totalCostGbp: pathwayCostGbp,
    },
    countdown.daysRemaining
  );

  // Document completion metrics
  const totalDocs = documents.length;
  const doneDocs = documents.filter((d) => d.status === 'Done').length;
  const inProgressDocs = documents.filter((d) => d.status === 'In Progress').length;
  const docCompletionRate = Math.round((doneDocs / totalDocs) * 100);

  // UKVI 28-day compliance check (£27,500 unpaid tuition + £9,207 maintenance = £36,707)
  const ukviRequiredFundsGbp = 36707;
  const isUkviCompliant = runway.currentTotalGbp >= ukviRequiredFundsGbp;

  const copyFormula = (formula: string, label: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(label);
    setTimeout(() => setCopiedFormula(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Scottish Navy Welcome */}
      <div className="bg-[#0B1D3A] rounded-xl p-6 text-white shadow-sm border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
              <span>Sheet 1 of 6</span>
              <span aria-hidden="true">·</span>
              <span>Interactive Cockpit &amp; Daily Velocity</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Me Now vs. Future Me (Edinburgh Bound)
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              Real-time daily countdown, dynamic savings thermometer, and immigration milestone matrix for Indonesian applicants moving to Edinburgh, Scotland.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onOpenAppsScript}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              Export to Google Sheets
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Interactive Control Bar & Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Module 1: Timeline Switcher & Countdown */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                1. Target Departure Switcher
              </span>
              <button
                onClick={() => copyFormula('=DATEDIF(TODAY(), DATE(2027,12,1), "D")', 'countdown')}
                className="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1 font-mono"
                title="Copy Google Sheets Formula"
              >
                {copiedFormula === 'countdown' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Formula</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Target Departure Gate:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTargetDate('2027-12-01')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                      targetDate === '2027-12-01'
                        ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Dec 1, 2027 (Fast Track)
                  </button>
                  <button
                    onClick={() => setTargetDate('2028-12-01')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                      targetDate === '2028-12-01'
                        ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Dec 1, 2028 (2-Yr Runway)
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold font-mono text-blue-950 tabular-nums">
                      {countdown.daysRemaining}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 uppercase">Days</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-blue-950 tabular-nums">
                      {countdown.weeksRemaining}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 uppercase">Weeks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-blue-950 tabular-nums">
                      {countdown.monthsRemaining}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 uppercase">Months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Reference Date: Today</span>
            <span className="font-mono text-slate-700">{new Date().toISOString().slice(0, 10)}</span>
          </div>
        </div>

        {/* Module 2: Pathway & Savings Inputs */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                2. Pathway &amp; Liquid Input
              </span>
              <button
                onClick={() => copyFormula('=GOOGLEFINANCE("CURRENCY:GBPIDR")', 'fx')}
                className="text-xs text-blue-700 hover:text-blue-900 flex items-center gap-1 font-mono"
              >
                {copiedFormula === 'fx' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>FX Formula</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Relocation Pathway:
                </label>
                <select
                  value={pathway}
                  onChange={(e) => setPathway(e.target.value as any)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
                >
                  <option value="Self-Funded Master's">Self-Funded Master's (Tuition + Living + UKVI)</option>
                  <option value="Full Scholarship (LPDP/Chevening)">Full Scholarship (LPDP/Chevening Buffer)</option>
                  <option value="Direct Skilled Worker Visa">Direct Skilled Worker Visa (Sponsorship)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Current Savings (IDR):
                  </label>
                  <input
                    type="number"
                    value={savingsIdr}
                    step={5000000}
                    onChange={(e) => setSavingsIdr(Number(e.target.value))}
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:ring-1 focus:ring-blue-600 focus:outline-hidden tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">
                    Current Savings (GBP):
                  </label>
                  <input
                    type="number"
                    value={savingsGbp}
                    step={500}
                    onChange={(e) => setSavingsGbp(Number(e.target.value))}
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-900 focus:ring-1 focus:ring-blue-600 focus:outline-hidden tabular-nums"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-600">FX Rate (GBP/IDR):</span>
                <div className="flex items-center gap-1.5 font-mono font-semibold text-slate-900">
                  <span>1 GBP = Rp</span>
                  <input
                    type="number"
                    value={exchangeRate}
                    step={100}
                    onChange={(e) => setExchangeRate(Number(e.target.value))}
                    className="w-20 text-xs font-mono border-b border-slate-400 bg-transparent text-right focus:outline-hidden tabular-nums"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Total Liquid Equivalent:</span>
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              £{runway.currentTotalGbp.toLocaleString()} (~Rp {(runway.currentTotalIdr / 1000000).toFixed(1)}M)
            </span>
          </div>
        </div>

        {/* Module 3: Daily & Monthly Velocity Engine */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider">
                3. Savings Velocity Target
              </span>
              <button
                onClick={() => copyFormula('=ROUND(E10 / MAX(1, B7), 0)', 'velocity')}
                className="text-xs text-amber-900 hover:text-amber-950 flex items-center gap-1 font-mono"
              >
                {copiedFormula === 'velocity' ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Formula</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-white/80 backdrop-blur-xs rounded-lg p-3 border border-amber-200">
                <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-0.5">
                  Daily Savings Goal:
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold font-mono text-amber-950 tabular-nums">
                    £{runway.dailySavingsGbp.toLocaleString()} / day
                  </span>
                  <span className="text-xs font-mono text-amber-800 tabular-nums">
                    ~Rp {runway.dailySavingsIdr.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xs rounded-lg p-3 border border-amber-200">
                <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-0.5">
                  Monthly Savings Goal:
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold font-mono text-amber-950 tabular-nums">
                    £{runway.monthlySavingsGbp.toLocaleString()} / mo
                  </span>
                  <span className="text-xs font-mono text-amber-800 tabular-nums">
                    ~Rp {(runway.monthlySavingsIdr / 1000000).toFixed(1)}M / mo
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-amber-200/60 text-[11px] text-amber-900 flex items-center justify-between">
            <span>Remaining Gap:</span>
            <span className="font-mono font-bold text-amber-950 tabular-nums">
              £{runway.gapGbp.toLocaleString()} (Rp {(runway.gapIdr / 1000000).toFixed(1)}M)
            </span>
          </div>
        </div>

      </div>

      {/* Row 2: Financial Thermometer Progress Bar */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Financial Readiness Thermometer
            </h3>
            <p className="text-xs text-slate-500">
              Target Budget for {pathway}: <span className="font-mono font-semibold text-slate-800">£{runway.targetCostGbp.toLocaleString()}</span> (~Rp {(runway.targetCostIdr / 1000000).toFixed(1)} Million)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold font-mono text-blue-900 tabular-nums">
              {runway.percentReady}%
            </span>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Ready</span>
          </div>
        </div>

        {/* Progress bar container */}
        <div className="w-full h-5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              runway.percentReady >= 100
                ? 'bg-emerald-600'
                : runway.percentReady >= 60
                ? 'bg-blue-800'
                : 'bg-amber-600'
            }`}
            style={{ width: `${Math.max(4, Math.min(100, runway.percentReady))}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-500 block">Current Liquid:</span>
            <span className="font-mono font-semibold text-slate-900 tabular-nums">
              £{runway.currentTotalGbp.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Total Target:</span>
            <span className="font-mono font-semibold text-slate-900 tabular-nums">
              £{runway.targetCostGbp.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Deficit / Gap:</span>
            <span className="font-mono font-semibold text-red-600 tabular-nums">
              £{runway.gapGbp.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">UKVI 28-Day Holding:</span>
            <span className={`font-mono font-semibold tabular-nums ${isUkviCompliant ? 'text-emerald-700' : 'text-amber-700'}`}>
              {isUkviCompliant ? 'PASSED (>= £36.7k)' : 'DEFICIT (< £36.7k)'}
            </span>
          </div>
        </div>
      </div>

      {/* Row 3: Me Now vs Future Me Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-[#0B1D3A] text-white flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold tracking-wide uppercase">
              3. Me Now vs. Future Me (Edinburgh Readiness Matrix)
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              Live gap analysis linking documentation, English testing, financial compliance, and visa requirements.
            </p>
          </div>
          <button
            onClick={() => copyFormula('=SPARKLINE(E12*100, {"charttype","bar";"max",100;"color1","#0B1D3A"})', 'sparkline')}
            className="text-xs text-blue-300 hover:text-white flex items-center gap-1 font-mono"
            title="Copy Sparkline Formula"
          >
            {copiedFormula === 'sparkline' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Sparkline Formula</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Dimension</th>
                <th className="py-3 px-4">Me Now (Baseline 2026)</th>
                <th className="py-3 px-4">Future Me (Edinburgh Requirement)</th>
                <th className="py-3 px-4">Status / Gap Analysis</th>
                <th className="py-3 px-4">Readiness Visual</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              
              {/* Row 1: English */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  English Language (SELT)
                </td>
                <td className="py-3 px-4 font-mono text-slate-600">
                  IELTS Band 6.0 (Diagnostic)
                </td>
                <td className="py-3 px-4 font-mono text-slate-900">
                  IELTS for UKVI Band 7.0+ (No band &lt; 6.5)
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 text-amber-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Need +1.0 Band (Focus: Writing)
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="w-28 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-800 h-full w-[85%] rounded-full"></div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onNavigateToTab('timeline')}
                    className="text-blue-700 hover:text-blue-900 font-medium text-xs hover:underline"
                  >
                    View Prep Plan &rarr;
                  </button>
                </td>
              </tr>

              {/* Row 2: Financial Runway */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  UKVI 28-Day Bank Statement
                </td>
                <td className="py-3 px-4 font-mono text-slate-600">
                  £{runway.currentTotalGbp.toLocaleString()} Liquid
                </td>
                <td className="py-3 px-4 font-mono text-slate-900">
                  £{ukviRequiredFundsGbp.toLocaleString()} (SPP + £9,207)
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1.5 font-medium ${isUkviCompliant ? 'text-emerald-700' : 'text-red-700'}`}>
                    <span className={`w-2 h-2 rounded-full ${isUkviCompliant ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                    {isUkviCompliant ? 'Holding Rule Compliant' : `Deficit: £${(ukviRequiredFundsGbp - runway.currentTotalGbp).toLocaleString()}`}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="w-28 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isUkviCompliant ? 'bg-emerald-600' : 'bg-red-600'}`}
                      style={{ width: `${Math.min(100, Math.round((runway.currentTotalGbp / ukviRequiredFundsGbp) * 100))}%` }}
                    />
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onNavigateToTab('finance')}
                    className="text-blue-700 hover:text-blue-900 font-medium text-xs hover:underline"
                  >
                    Inspect Costs &rarr;
                  </button>
                </td>
              </tr>

              {/* Row 3: Documents */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  Indonesian Document Protocol
                </td>
                <td className="py-3 px-4 font-mono text-slate-600">
                  {doneDocs} of {totalDocs} Documents Ready
                </td>
                <td className="py-3 px-4 font-mono text-slate-900">
                  100% Sworn Translations + IOM TB + CAS
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 text-blue-800 font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    {docCompletionRate}% Complete ({inProgressDocs} in progress)
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="w-28 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-600 h-full rounded-full"
                      style={{ width: `${docCompletionRate}%` }}
                    />
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onNavigateToTab('documents')}
                    className="text-blue-700 hover:text-blue-900 font-medium text-xs hover:underline"
                  >
                    Checklist &rarr;
                  </button>
                </td>
              </tr>

              {/* Row 4: Scholarships */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  Scholarship Applications
                </td>
                <td className="py-3 px-4 font-mono text-slate-600">
                  Drafting Essays &amp; Referees
                </td>
                <td className="py-3 px-4 font-mono text-slate-900">
                  LPDP Reguler / Chevening Submission
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    Pipeline Active (Target: Jan / Aug)
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="w-28 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-800 h-full w-[40%] rounded-full"></div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onNavigateToTab('scholarships')}
                    className="text-blue-700 hover:text-blue-900 font-medium text-xs hover:underline"
                  >
                    Explore Grants &rarr;
                  </button>
                </td>
              </tr>

              {/* Row 5: Skilled Worker */}
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">
                  Edinburgh Job Market &amp; CoS
                </td>
                <td className="py-3 px-4 font-mono text-slate-600">
                  Shortlist 6 Registered Sponsors
                </td>
                <td className="py-3 px-4 font-mono text-slate-900">
                  Job Offer &gt;= £38,700 (or £30.9k Entrant)
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Targeting Tech &amp; Quant Roles
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="w-28 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[50%] rounded-full"></div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => onNavigateToTab('jobs')}
                    className="text-blue-700 hover:text-blue-900 font-medium text-xs hover:underline"
                  >
                    View Sponsors &rarr;
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
