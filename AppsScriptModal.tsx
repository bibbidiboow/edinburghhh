import React, { useState } from 'react';
import { Code2, Copy, Check, Download, ExternalLink, Terminal, Layers, BookOpen, AlertCircle } from 'lucide-react';
import { APPS_SCRIPT_CODE, SPREADSHEET_BLUEPRINT_DOCUMENTATION } from '../data/appsScriptCode';

export const AppsScriptModal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'script' | 'blueprint'>('script');

  const handleCopy = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const blob = new Blob([APPS_SCRIPT_CODE], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Code.gs';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#0B1D3A] rounded-xl p-6 text-white shadow-xs border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <span>Automation Engine</span>
              <span aria-hidden="true">·</span>
              <span>1-Click Google Sheets Builder</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Google Apps Script (`Code.gs`) &amp; Master Blueprint
            </h1>
            <p className="text-slate-300 text-xs mt-1 max-w-2xl">
              Production-ready JavaScript code for Google Apps Script that automatically provisions, formats with Scottish Navy styling, validates, and binds formulas across all 6 sheets with one click.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Code.gs'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download .gs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('script')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeSubTab === 'script'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Full Google Apps Script (`Code.gs`)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('blueprint')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeSubTab === 'blueprint'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Architectural Schema &amp; Formulas Blueprint</span>
        </button>
      </div>

      {/* Content 1: Code.gs */}
      {activeSubTab === 'script' && (
        <div className="space-y-4">
          
          {/* Quick Setup Instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-950 text-xs">
            <h3 className="font-bold text-sm text-amber-900 mb-2 flex items-center gap-1.5">
              <span>🚀 3-Step 1-Click Deployment Instructions:</span>
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-amber-900 font-medium">
              <li>
                Open a new blank Google Sheet at{' '}
                <a
                  href="https://sheets.new"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-bold underline text-amber-950 hover:text-blue-900"
                >
                  sheets.new
                </a>
              </li>
              <li>
                Click <strong className="text-amber-950">Extensions</strong> &gt; <strong className="text-amber-950">Apps Script</strong> from the top menu.
              </li>
              <li>
                Delete any default code in <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono">Code.gs</code>, paste the code below, and click <strong className="text-amber-950">Save</strong>. Then select <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono">buildEdinburghMasterSpreadsheet</code> from the function dropdown and click <strong className="text-amber-950">Run</strong>!
              </li>
            </ol>
            <p className="mt-2 text-[11px] text-amber-800 italic">
              *When prompted for authorization, click Advanced &gt; Go to Untitled Project (unsafe) &gt; Allow. Google Apps Script requires this permission once to create the tabs and format cells.
            </p>
          </div>

          {/* Script Code Viewer */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-xs font-mono text-slate-400 ml-2">Code.gs — Google Apps Script</span>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-mono transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-[600px] leading-relaxed select-all">
              {APPS_SCRIPT_CODE}
            </pre>
          </div>
        </div>
      )}

      {/* Content 2: Blueprint & Formula Catalog */}
      {activeSubTab === 'blueprint' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              {SPREADSHEET_BLUEPRINT_DOCUMENTATION.title}
            </h2>
            <p className="text-xs text-slate-600 mb-6">
              {SPREADSHEET_BLUEPRINT_DOCUMENTATION.overview}
            </p>

            <div className="space-y-6">
              {SPREADSHEET_BLUEPRINT_DOCUMENTATION.sheets.map((sheet, idx) => (
                <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{sheet.sheetName}</span>
                      <span className="text-[11px] font-mono text-slate-500">Tab Color: {sheet.tabColor}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-slate-600">
                      <strong>Core Purpose:</strong> {sheet.purpose}
                    </p>

                    <div>
                      <span className="text-xs font-bold text-slate-800 block mb-1">
                        Key Google Sheets Formulas Bound:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {sheet.keyFormulas.map((f, fIdx) => (
                          <div key={fIdx} className="bg-slate-50 p-2.5 rounded border border-slate-200">
                            <span className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                              {f.label}:
                            </span>
                            <code className="text-xs font-mono text-blue-900 font-bold break-all">
                              {f.formula}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
