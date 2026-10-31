/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardSheet } from './components/DashboardSheet';
import { FinancialSheet } from './components/FinancialSheet';
import { DocumentsSheet } from './components/DocumentsSheet';
import { ScholarshipsSheet } from './components/ScholarshipsSheet';
import { JobsSheet } from './components/JobsSheet';
import { TimelineSheet } from './components/TimelineSheet';
import { AppsScriptModal } from './components/AppsScriptModal';
import { StrategicAdvice } from './components/StrategicAdvice';
import { INITIAL_DOCUMENTS, DocumentItem } from './data/spreadsheetData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [targetDate, setTargetDate] = useState<string>('2027-12-01');
  const [savingsIdr, setSavingsIdr] = useState<number>(150000000); // 150M IDR baseline
  const [savingsGbp, setSavingsGbp] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(20500); // 1 GBP = 20,500 IDR
  const [pathway, setPathway] = useState<'Self-Funded Master\'s' | 'Full Scholarship (LPDP/Chevening)' | 'Direct Skilled Worker Visa'>("Self-Funded Master's");
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-900 selection:text-white">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAppsScript={() => setActiveTab('blueprint')}
      />

      {/* Main Workspace Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardSheet
            targetDate={targetDate}
            setTargetDate={setTargetDate}
            savingsIdr={savingsIdr}
            setSavingsIdr={setSavingsIdr}
            savingsGbp={savingsGbp}
            setSavingsGbp={setSavingsGbp}
            exchangeRate={exchangeRate}
            setExchangeRate={setExchangeRate}
            pathway={pathway}
            setPathway={setPathway}
            documents={documents}
            onOpenAppsScript={() => setActiveTab('blueprint')}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'finance' && (
          <FinancialSheet
            exchangeRate={exchangeRate}
            setExchangeRate={setExchangeRate}
            savingsGbp={savingsGbp}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsSheet
            documents={documents}
            setDocuments={setDocuments}
          />
        )}

        {activeTab === 'scholarships' && <ScholarshipsSheet />}

        {activeTab === 'jobs' && <JobsSheet />}

        {activeTab === 'timeline' && <TimelineSheet />}

        {activeTab === 'blueprint' && <AppsScriptModal />}

        {activeTab === 'advice' && <StrategicAdvice />}
      </main>

      {/* Minimalistic Editorial Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">Edinburgh Mobility OS</span>
            <span>·</span>
            <span>Indonesian Applicant Master Planning System</span>
            <span>·</span>
            <span className="font-mono">Dec 2027 / Dec 2028 Gate</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>UKVI Rules: Post-April 2024 Thresholds</span>
            <span>·</span>
            <span>Google Apps Script Automated</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
