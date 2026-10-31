import React from 'react';
import { Compass, Download, Code2, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAppsScript: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAppsScript }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'finance', label: 'Financial Engine' },
    { id: 'documents', label: 'Documents' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'jobs', label: 'Jobs & Visas' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'blueprint', label: 'Apps Script' },
    { id: 'advice', label: 'Strategic Advice' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B1D3A] text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-inner">
              🏴󠁧󠁢󠁳󠁣󠁴󠁿
            </div>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
              className="text-base font-bold tracking-tight text-white whitespace-nowrap hover:text-blue-200 transition-colors"
            >
              Edinburgh Mobility OS
            </a>
          </div>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium py-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-900 text-white font-semibold shadow-xs border border-blue-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAppsScript}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="View & Copy 1-Click Google Apps Script"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>1-Click Google Script</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab scroller */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800 no-scrollbar text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 rounded whitespace-nowrap shrink-0 ${
                activeTab === item.id
                  ? 'bg-blue-800 text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
