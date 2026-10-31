/**
 * Pure calculation utilities for the Edinburgh Relocation Master Spreadsheet
 */

export interface CountdownResult {
  targetDateStr: string;
  daysRemaining: number;
  weeksRemaining: number;
  monthsRemaining: number;
  isPast: boolean;
}

export function calculateCountdown(targetDateStr: string, fromDateStr?: string): CountdownResult {
  const target = new Date(targetDateStr + 'T00:00:00');
  const now = fromDateStr ? new Date(fromDateStr + 'T00:00:00') : new Date();
  
  // Strip time for exact day calculation
  const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = targetDay.getTime() - nowDay.getTime();
  const days = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  const isPast = days < 0;
  const daysRemaining = Math.max(0, days);
  const weeksRemaining = Math.round((daysRemaining / 7) * 10) / 10;
  const monthsRemaining = Math.round((daysRemaining / 30.41) * 10) / 10;

  return {
    targetDateStr,
    daysRemaining,
    weeksRemaining,
    monthsRemaining,
    isPast,
  };
}

export interface FinancialRunwayInput {
  currentSavingsIdr: number;
  currentSavingsGbp: number;
  exchangeRateGbpIdr: number; // e.g. 20500
  totalCostGbp: number;
}

export interface FinancialRunwayResult {
  currentTotalGbp: number;
  currentTotalIdr: number;
  targetCostGbp: number;
  targetCostIdr: number;
  gapGbp: number;
  gapIdr: number;
  percentReady: number;
  dailySavingsGbp: number;
  dailySavingsIdr: number;
  monthlySavingsGbp: number;
  monthlySavingsIdr: number;
}

export function calculateFinancialRunway(
  input: FinancialRunwayInput,
  daysRemaining: number
): FinancialRunwayResult {
  const { currentSavingsIdr, currentSavingsGbp, exchangeRateGbpIdr, totalCostGbp } = input;
  
  // Convert IDR portion to GBP and sum
  const idrConvertedToGbp = currentSavingsIdr / (exchangeRateGbpIdr || 1);
  const currentTotalGbp = Math.round(currentSavingsGbp + idrConvertedToGbp);
  const currentTotalIdr = Math.round(currentTotalGbp * exchangeRateGbpIdr);

  const targetCostGbp = totalCostGbp;
  const targetCostIdr = Math.round(targetCostGbp * exchangeRateGbpIdr);

  const gapGbp = Math.max(0, targetCostGbp - currentTotalGbp);
  const gapIdr = Math.round(gapGbp * exchangeRateGbpIdr);

  const percentReady = targetCostGbp > 0 ? Math.min(100, Math.round((currentTotalGbp / targetCostGbp) * 100)) : 100;

  const validDays = Math.max(1, daysRemaining);
  const dailySavingsGbp = Math.round(gapGbp / validDays);
  const dailySavingsIdr = Math.round(gapIdr / validDays);

  const monthsRemaining = validDays / 30.41;
  const monthlySavingsGbp = Math.round(gapGbp / Math.max(0.1, monthsRemaining));
  const monthlySavingsIdr = Math.round(gapIdr / Math.max(0.1, monthsRemaining));

  return {
    currentTotalGbp,
    currentTotalIdr,
    targetCostGbp,
    targetCostIdr,
    gapGbp,
    gapIdr,
    percentReady,
    dailySavingsGbp,
    dailySavingsIdr,
    monthlySavingsGbp,
    monthlySavingsIdr,
  };
}

export function checkSalaryThreshold(
  salaryGbp: number,
  isNewEntrant: boolean = false
): { eligible: boolean; threshold: number; margin: number } {
  // Post-April 2024 UKVI rules: Standard skilled worker general threshold is £38,700
  // New entrants (recent graduates, under 26, postdoc) have a 30% discount -> £30,960 minimum
  const threshold = isNewEntrant ? 30960 : 38700;
  const eligible = salaryGbp >= threshold;
  const margin = salaryGbp - threshold;
  return { eligible, threshold, margin };
}

export function calculateReadinessScore(docs: Array<{ status: string; priority?: string }>): {
  total: number;
  done: number;
  inProgress: number;
  notStarted: number;
  percentage: number;
} {
  const total = docs.length;
  if (total === 0) return { total: 0, done: 0, inProgress: 0, notStarted: 0, percentage: 0 };

  let score = 0;
  let done = 0;
  let inProgress = 0;
  let notStarted = 0;

  for (const doc of docs) {
    if (doc.status === 'Done') {
      score += 1;
      done++;
    } else if (doc.status === 'In Progress') {
      score += 0.5;
      inProgress++;
    } else {
      notStarted++;
    }
  }

  const percentage = Math.round((score / total) * 100);
  return { total, done, inProgress, notStarted, percentage };
}
