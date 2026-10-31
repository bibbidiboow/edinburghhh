import React, { useState } from 'react';
import { Award, ExternalLink, Calendar, BookOpen, CheckCircle, Clock, FileCheck } from 'lucide-react';
import { ScholarshipItem, INITIAL_SCHOLARSHIPS } from '../data/spreadsheetData';

export const ScholarshipsSheet: React.FC = () => {
  const [scholarships, setScholarships] = useState<ScholarshipItem[]>(INITIAL_SCHOLARSHIPS);

  const updateStatus = (id: string, status: ScholarshipItem['status']) => {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <span>Sheet 4 of 6</span>
            <span aria-hidden="true">·</span>
            <span>Funding Pipeline</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Scholarships Directory &amp; Application Pipeline
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Top full-funding and tuition waiver opportunities for Indonesian applicants pursuing Master's studies in Edinburgh.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl self-start md:self-auto text-xs">
          <span className="text-amber-800 font-semibold block uppercase text-[10px]">Pipeline Health:</span>
          <span className="font-mono font-bold text-amber-950 text-base">
            {scholarships.filter((s) => s.status !== 'Researching').length} of {scholarships.length} In Progress
          </span>
        </div>
      </div>

      {/* Grid of Scholarships Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((schol) => (
          <div
            key={schol.id}
            className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {schol.name}
                </h3>
                <a
                  href={schol.officialUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-slate-400 hover:text-blue-600 transition-colors shrink-0"
                  title="Visit official scholarship portal"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="text-[11px] text-slate-500 font-medium mb-3">
                {schol.fundingBody}
              </div>

              {/* Status Selector */}
              <div className="mb-4">
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Application Status:
                </label>
                <select
                  value={schol.status}
                  onChange={(e) => updateStatus(schol.id, e.target.value as any)}
                  className={`w-full text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-hidden ${
                    schol.status === 'Awarded'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : schol.status === 'Submitted' || schol.status === 'Interview'
                      ? 'bg-purple-50 text-purple-800 border-purple-300'
                      : schol.status === 'Preparing Essays' || schol.status === 'Eligible'
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <option value="Researching">Researching</option>
                  <option value="Eligible">Eligible</option>
                  <option value="Preparing Essays">Preparing Essays</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Interview">Interview</option>
                  <option value="Awarded">Awarded 🎉</option>
                </select>
              </div>

              {/* Specs */}
              <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-medium">Coverage:</span>
                  <span className="text-slate-900 font-medium leading-tight block mt-0.5">
                    {schol.coverage}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-medium">Min GPA:</span>
                    <span className="font-mono text-slate-800">{schol.minGpa}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-medium">Min IELTS:</span>
                    <span className="font-mono text-slate-800">{schol.minIelts}</span>
                  </div>
                </div>
                <div className="pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500 block text-[10px] uppercase font-medium">Work Experience:</span>
                  <span className="text-slate-800">{schol.workExperience}</span>
                </div>
                <div className="pt-1 border-t border-slate-200/60">
                  <span className="text-slate-500 block text-[10px] uppercase font-medium">Application Window:</span>
                  <span className="text-blue-900 font-semibold">{schol.applicationWindow}</span>
                </div>
              </div>

              {/* Key Rules / Essays */}
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-medium mb-1">Key Requirements &amp; Essays:</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {schol.keyRequirements}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Targeting Uni of Edinburgh</span>
              <a
                href={schol.officialUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-blue-700 hover:text-blue-900 font-medium flex items-center gap-1 hover:underline"
              >
                <span>Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
