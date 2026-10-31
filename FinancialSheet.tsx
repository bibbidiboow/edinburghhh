import React, { useState } from 'react';
import { DollarSign, ShieldAlert, ArrowUpDown, Filter, Copy, Check, Plus, AlertCircle, Info } from 'lucide-react';
import { CostItem, INITIAL_COST_ITEMS } from '../data/spreadsheetData';

interface FinancialSheetProps {
  exchangeRate: number;
  setExchangeRate: (rate: number) => void;
  savingsGbp: number;
}

export const FinancialSheet: React.FC<FinancialSheetProps> = ({
  exchangeRate,
  setExchangeRate,
  savingsGbp,
}) => {
  const [items, setItems] = useState<CostItem[]>(INITIAL_COST_ITEMS);
  const [filterType, setFilterType] = useState<'All' | 'Student' | 'Worker'>('All');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredItems = items.filter((item) => {
    if (filterType === 'Student') return item.isMandatoryStudent;
    if (filterType === 'Worker') return item.isMandatoryWorker;
    return true;
  });

  const totalGbp = filteredItems.reduce((acc, curr) => acc + curr.costGbp, 0);
  const totalIdr = Math.round(totalGbp * exchangeRate);

  // UKVI 28-Day funds: Unpaid tuition (£27,500) + 9 months maintenance (£1,023 x 9 = £9,207)
  const tuitionBalance = items.find((i) => i.id === 'c10')?.costGbp || 27500;
  const ukviMaintenance = 9207;
  const ukvi28DayTotalGbp = tuitionBalance + ukviMaintenance;
  const ukvi28DayTotalIdr = Math.round(ukvi28DayTotalGbp * exchangeRate);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const updateCost = (id: string, newCost: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, costGbp: Math.max(0, newCost) } : item))
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Exchange Rate Control */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <span>Sheet 2 of 6</span>
            <span aria-hidden="true">·</span>
            <span>Edinburgh Reality &amp; UKVI Verification</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Financial Engine &amp; 1-Year Cost of Living
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Granular line-item breakdown calculated in British Pounds (GBP) with live Indonesian Rupiah (IDR) conversion.
          </p>
        </div>

        {/* Live FX Badge */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl self-start md:self-auto">
          <div>
            <div className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider">
              Live Google Finance Rate:
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-amber-800">1 GBP =</span>
              <span className="font-mono text-base font-bold text-amber-950 tabular-nums">
                Rp {exchangeRate.toLocaleString()}
              </span>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard('=GOOGLEFINANCE("CURRENCY:GBPIDR")', 'fx')}
            className="p-1.5 text-amber-800 hover:text-amber-950 hover:bg-amber-100 rounded transition-colors"
            title="Copy =GOOGLEFINANCE('CURRENCY:GBPIDR') formula"
          >
            {copiedKey === 'fx' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* UKVI 28-Day Rule Statutory Alert Box */}
      <div className="bg-blue-900 text-white rounded-xl p-5 shadow-xs border border-blue-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-slate-950 rounded uppercase">
                UKVI Statutory Rule
              </span>
              <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                28-Consecutive-Day Bank Holding Rule
              </span>
            </div>
            <p className="text-sm text-slate-100 font-medium">
              Formula: <span className="font-mono bg-blue-950/60 px-2 py-0.5 rounded text-amber-300">= Unpaid Tuition (£{tuitionBalance.toLocaleString()}) + £9,207 (£1,023/mo x 9)</span>
            </p>
            <p className="text-xs text-blue-200 leading-relaxed max-w-2xl">
              For Scottish universities outside London, you must maintain this minimum in a single bank account for at least 28 consecutive days before visa submission. The statement must not be older than 31 days.
            </p>
          </div>

          <div className="bg-blue-950/80 p-4 rounded-lg border border-blue-700/60 shrink-0 text-right">
            <span className="text-[11px] text-blue-300 block uppercase font-medium">Statutory Minimum Required:</span>
            <div className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
              £{ukvi28DayTotalGbp.toLocaleString()}
            </div>
            <div className="text-xs font-mono text-blue-200 tabular-nums">
              ~Rp {(ukvi28DayTotalIdr / 1000000).toFixed(1)} Million
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Summary Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        {/* Pathway Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium mr-1">Filter View:</span>
          {(['All', 'Student', 'Worker'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterType === type
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type === 'All' ? 'All Expenditures' : type === 'Student' ? "Master's Student" : 'Skilled Worker'}
            </button>
          ))}
        </div>

        {/* Subtotals */}
        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-500">Filtered Total (GBP): </span>
            <span className="font-mono font-bold text-slate-900 tabular-nums">
              £{totalGbp.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-slate-500">IDR Equivalent: </span>
            <span className="font-mono font-bold text-emerald-700 tabular-nums">
              Rp {(totalIdr / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Spreadsheet Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0B1D3A] text-white font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Line Item / Expenditure</th>
                <th className="py-3 px-4 text-right">Cost (GBP)</th>
                <th className="py-3 px-4 text-right">Cost (IDR Formula)</th>
                <th className="py-3 px-4 text-center">Frequency</th>
                <th className="py-3 px-4">Scholarship / Out-of-Pocket Coverage</th>
                <th className="py-3 px-4 text-center">Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredItems.map((item, idx) => {
                const itemCostIdr = Math.round(item.costGbp * exchangeRate);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-500 text-[11px]">
                      {item.category === 'A_PRE_DEPARTURE' && 'A. Pre-Departure'}
                      {item.category === 'B_TUITION' && 'B. Tuition & Deposit'}
                      {item.category === 'C_EDINBURGH_LIVING' && 'C. 1-Yr Edinburgh Living'}
                      {item.category === 'D_SCHOLARSHIP_BUFFER' && 'D. Relocation Specifics'}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div>{item.item}</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">{item.description}</div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1 font-mono font-bold text-slate-900 tabular-nums">
                        <span>£</span>
                        <input
                          type="number"
                          value={item.costGbp}
                          onChange={(e) => updateCost(item.id, Number(e.target.value))}
                          className="w-20 text-right bg-transparent border-b border-slate-300 hover:border-slate-500 focus:border-blue-600 focus:outline-hidden py-0.5 font-mono"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-slate-700 tabular-nums">
                      Rp {itemCostIdr.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center text-slate-500 font-medium">
                      {item.frequency}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-medium ${
                          item.coveredByScholarship === 'Full'
                            ? 'text-emerald-700'
                            : item.coveredByScholarship === 'Reimbursed Later'
                            ? 'text-blue-700'
                            : item.coveredByScholarship === 'Partial'
                            ? 'text-amber-700'
                            : 'text-slate-600'
                        }`}
                      >
                        {item.coveredByScholarship}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => copyToClipboard(`=C${idx + 6} * $B$3`, `row-${item.id}`)}
                        className="p-1 text-slate-400 hover:text-slate-800 transition-colors"
                        title="Copy Sheet formula"
                      >
                        {copiedKey === `row-${item.id}` ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 inline" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 inline" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white font-bold text-xs">
                <td colSpan={2} className="py-3.5 px-4 text-right uppercase tracking-wider">
                  Total Expenditure:
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-sm tabular-nums">
                  £{totalGbp.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-sm tabular-nums">
                  Rp {totalIdr.toLocaleString()}
                </td>
                <td colSpan={3} className="py-3.5 px-4 text-slate-400 font-normal">
                  Formula: <span className="font-mono text-amber-300">=SUM(C6:C21)</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
};
