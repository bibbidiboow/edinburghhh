import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCountdown,
  calculateFinancialRunway,
  checkSalaryThreshold,
  calculateReadinessScore,
} from './calculations';

test('calculateCountdown computes days, weeks, and months correctly', () => {
  const result = calculateCountdown('2027-12-01', '2027-11-01');
  assert.equal(result.daysRemaining, 30);
  assert.equal(result.isPast, false);
  assert.ok(result.weeksRemaining >= 4.2 && result.weeksRemaining <= 4.3);
  assert.equal(result.monthsRemaining, 1);
});

test('calculateCountdown handles past dates gracefully', () => {
  const result = calculateCountdown('2025-01-01', '2026-10-31');
  assert.equal(result.isPast, true);
  assert.equal(result.daysRemaining, 0);
});

test('calculateFinancialRunway calculates gap, percentage, and savings targets', () => {
  const input = {
    currentSavingsIdr: 100000000, // 100M IDR @ 20,000 = £5,000
    currentSavingsGbp: 5000,       // £5,000 GBP
    exchangeRateGbpIdr: 20000,
    totalCostGbp: 20000,           // Total needed: £20,000
  };
  const daysRemaining = 100;
  const result = calculateFinancialRunway(input, daysRemaining);

  // current total = 5000 + 5000 = 10,000 GBP
  assert.equal(result.currentTotalGbp, 10000);
  assert.equal(result.targetCostGbp, 20000);
  assert.equal(result.gapGbp, 10000);
  assert.equal(result.percentReady, 50);
  assert.equal(result.dailySavingsGbp, 100); // 10000 / 100 days = £100/day
  assert.equal(result.dailySavingsIdr, 2000000); // 100 * 20000 = 2M IDR/day
});

test('checkSalaryThreshold validates standard vs new entrant threshold', () => {
  // Standard threshold is £38,700
  const standardPass = checkSalaryThreshold(40000, false);
  assert.equal(standardPass.eligible, true);
  assert.equal(standardPass.margin, 1300);

  const standardFail = checkSalaryThreshold(35000, false);
  assert.equal(standardFail.eligible, false);

  // New Entrant discount is £30,960
  const newEntrantPass = checkSalaryThreshold(35000, true);
  assert.equal(newEntrantPass.eligible, true);
  assert.equal(newEntrantPass.threshold, 30960);
});

test('calculateReadinessScore handles document statuses', () => {
  const docs = [
    { status: 'Done' },
    { status: 'Done' },
    { status: 'In Progress' },
    { status: 'Not Started' },
  ];
  const score = calculateReadinessScore(docs);
  assert.equal(score.total, 4);
  assert.equal(score.done, 2);
  assert.equal(score.inProgress, 1);
  assert.equal(score.notStarted, 1);
  // (2 + 0.5) / 4 = 2.5 / 4 = 62.5% -> rounded to 63%
  assert.equal(score.percentage, 63);
});
