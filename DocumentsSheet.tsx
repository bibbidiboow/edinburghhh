import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, AlertTriangle, Clock, ExternalLink, ShieldCheck, FileText, Check, Copy } from 'lucide-react';
import { DocumentItem } from '../data/spreadsheetData';
import { calculateReadinessScore } from '../utils/calculations';

interface DocumentsSheetProps {
  documents: DocumentItem[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentItem[]>>;
}

export const DocumentsSheet: React.FC<DocumentsSheetProps> = ({
  documents,
  setDocuments,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const readiness = calculateReadinessScore(documents);

  const categories = ['All', 'Academic', 'English Test', 'Financial & UKVI', 'Identity & Legal', 'Scottish Institution & Visa'];
  const statuses = ['All', 'Not Started', 'In Progress', 'Done', 'Under Review'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;
    const matchesSearch =
      doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specificRequirements.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.issuingBody.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const updateStatus = (id: string, newStatus: DocumentItem['status']) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  const updateFileLink = (id: string, link: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, fileLink: link } : d))
    );
  };

  const copyFormula = (formula: string, key: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
            <span>Sheet 3 of 6</span>
            <span aria-hidden="true">·</span>
            <span>Indonesian Applicant Protocol</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Master Document Checklist &amp; UKVI Verification
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Compliant with UKVI Home Office guidelines, Scottish university admissions (MyEd), and Indonesian legal translation standards.
          </p>
        </div>

        {/* Readiness Meter */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-4 shrink-0">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Verification Readiness:
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-bold font-mono text-blue-900 tabular-nums">
                {readiness.percentage}%
              </span>
              <span className="text-xs text-slate-500 font-mono">
                ({readiness.done}/{readiness.total} Done)
              </span>
            </div>
          </div>

          <div className="w-24 bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-blue-800 h-full rounded-full transition-all duration-300"
              style={{ width: `${readiness.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Control & Filter Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents, issuing body, or requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-1 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          {/* Quick CountIF formula copy */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => copyFormula('=COUNTIF(E2:E15, "Done") & " / " & COUNTA(B2:B15)', 'countif')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 font-mono text-xs transition-colors"
              title="Copy Google Sheets CountIF Formula"
            >
              {copiedKey === 'countif' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy =COUNTIF Formula</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-medium mr-1 text-[11px]">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0B1D3A] text-white font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Specific Requirements &amp; Indonesian Protocol</th>
                <th className="py-3 px-4">Issuing Body</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Expiry / Validity</th>
                <th className="py-3 px-4">Drive URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span
                      className={`text-[11px] font-bold ${
                        doc.priority === 'Critical'
                          ? 'text-red-700'
                          : doc.priority === 'High'
                          ? 'text-amber-700'
                          : 'text-slate-600'
                      }`}
                    >
                      {doc.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div>{doc.documentName}</div>
                    <span className="text-[10px] text-slate-500 font-normal">{doc.category}</span>
                  </td>
                  <td className="py-3 px-4 max-w-md">
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {doc.specificRequirements}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-[11px]">
                    {doc.issuingBody}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={doc.status}
                      onChange={(e) => updateStatus(doc.id, e.target.value as any)}
                      className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-hidden ${
                        doc.status === 'Done'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : doc.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : doc.status === 'Under Review'
                          ? 'bg-purple-50 text-purple-800 border-purple-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">
                    {doc.expiryDate}
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      placeholder="Paste Drive link..."
                      value={doc.fileLink}
                      onChange={(e) => updateFileLink(doc.id, e.target.value)}
                      className="w-32 text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-hidden focus:border-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
