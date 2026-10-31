import React, { useState } from 'react';
import { Briefcase, Building2, CheckCircle2, XCircle, AlertCircle, ExternalLink, Calculator, Copy, Check } from 'lucide-react';
import { JobOpportunity, INITIAL_JOBS } from '../data/spreadsheetData';
import { checkSalaryThreshold } from '../utils/calculations';

export const JobsSheet: React.FC = () => {
  const [jobs, setJobs] = useState<JobOpportunity[]>(INITIAL_JOBS);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const updateSalary = (id: string, salary: number) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, estimatedSalaryGbp: salary } : j))
    );
  };

  const toggleNewEntrant = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isNewEntrantDiscount: !j.isNewEntrantDiscount } : j))
    );
  };

  const updateStatus = (id: string, status: JobOpportunity['status']) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status } : j))
    );
  };

  const copyFormula = (formula: string, key: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <span>Sheet 5 of 6</span>
            <span aria-hidden="true">·</span>
            <span>UK Skilled Worker Sponsorship</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Edinburgh Job Opportunities &amp; Work Visa Tracker
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Verified Edinburgh employers with UKVI sponsor licenses, tested against post-April 2024 salary thresholds.
          </p>
        </div>

        <button
          onClick={() => copyFormula('=IF(E2>=IF(G2="Yes", 30960, 38700), "ELIGIBLE (SPONSORABLE)", "BELOW THRESHOLD")', 'jobformula')}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-medium rounded-lg flex items-center gap-1.5 transition-colors self-start md:self-auto"
        >
          {copiedKey === 'jobformula' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>Copy Threshold Formula</span>
        </button>
      </div>

      {/* Immigration Rules Overview: Standard vs New Entrant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Standard Skilled Worker Route
            </span>
            <span className="text-xs font-mono bg-blue-950 px-2 py-0.5 rounded text-amber-300">
              Threshold: £38,700 / year
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Effective April 4, 2024, the baseline salary threshold for a standard Skilled Worker Visa was increased from £26,200 to <strong className="text-white">£38,700</strong> (or the SOC occupation code going rate, whichever is higher). CoS sponsorship is mandatory.
          </p>
        </div>

        <div className="bg-emerald-950 text-white rounded-xl p-5 border border-emerald-900 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              New Entrant Concession (Graduate Switchers)
            </span>
            <span className="text-xs font-mono bg-emerald-900 px-2 py-0.5 rounded text-emerald-200">
              Threshold: £30,960 / year (70% Rate)
            </span>
          </div>
          <p className="text-xs text-emerald-100 leading-relaxed">
            If you graduate from a UK Master's (University of Edinburgh/Napier/Heriot-Watt) or are under 26 years old, you qualify for the <strong className="text-white">New Entrant 30% discount</strong>. This lowers the sponsorable salary bar to <strong className="text-white">£30,960</strong> for up to 3 years!
          </p>
        </div>
      </div>

      {/* Edinburgh Jobs Spreadsheet */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0B1D3A] text-white font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Company &amp; Edinburgh Location</th>
                <th className="py-3 px-4">Role / Title</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4 text-center">UKVI Sponsor?</th>
                <th className="py-3 px-4 text-right">Est. Salary (GBP)</th>
                <th className="py-3 px-4 text-center">New Entrant Discount?</th>
                <th className="py-3 px-4">Salary Threshold Check (Formula)</th>
                <th className="py-3 px-4">Required Stack</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {jobs.map((job) => {
                const thresholdResult = checkSalaryThreshold(job.estimatedSalaryGbp, job.isNewEntrantDiscount);
                return (
                  <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div>{job.companyName}</div>
                      <span className="text-[10px] text-slate-500 font-normal">Edinburgh, Scotland</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {job.role}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {job.industry}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        {job.isUkviSponsor}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1 font-mono font-bold text-slate-900 tabular-nums">
                        <span>£</span>
                        <input
                          type="number"
                          step={1000}
                          value={job.estimatedSalaryGbp}
                          onChange={(e) => updateSalary(job.id, Number(e.target.value))}
                          className="w-20 text-right bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs focus:outline-hidden focus:border-blue-500"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleNewEntrant(job.id)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                          job.isNewEntrantDiscount
                            ? 'bg-blue-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {job.isNewEntrantDiscount ? 'Yes (£30.9k)' : 'No (£38.7k)'}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      {thresholdResult.eligible ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>ELIGIBLE (SPONSORABLE)</span>
                          <span className="text-[10px] text-emerald-600 font-mono font-normal">
                            (+£{thresholdResult.margin.toLocaleString()})
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-600 font-bold">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>BELOW THRESHOLD</span>
                          <span className="text-[10px] text-red-500 font-mono font-normal">
                            (-£{Math.abs(thresholdResult.margin).toLocaleString()})
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 max-w-xs text-[11px] text-slate-600 font-mono">
                      {job.requiredSkills}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={job.status}
                        onChange={(e) => updateStatus(job.id, e.target.value as any)}
                        className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 font-medium text-slate-800 focus:outline-hidden"
                      >
                        <option value="Targeted">Targeted</option>
                        <option value="Networking">Networking</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
