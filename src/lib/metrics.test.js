import { describe, it, expect } from 'vitest';
import {
  summariseExecution,
  percent,
  passRate,
  openBySeverity,
  requirementStatus,
  traceability,
  filterDefects,
  evaluateGates,
  readinessVerdict,
  delta,
  niceCeil,
  niceAxis,
  sparkPath,
  greeting,
} from './metrics.js';
import { scopes, defects, requirements, manualGates } from '../data/release.js';

const series = [
  { label: 'Mon', passed: 8, failed: 1, blocked: 1 },
  { label: 'Tue', passed: 10, failed: 0, blocked: 0 },
];

describe('summariseExecution', () => {
  it('adds up every status and derives executed', () => {
    expect(summariseExecution(series)).toEqual({ passed: 18, failed: 1, blocked: 1, executed: 20 });
  });

  it('returns zeros for an empty series', () => {
    expect(summariseExecution([])).toEqual({ passed: 0, failed: 0, blocked: 0, executed: 0 });
  });
});

describe('percent and passRate', () => {
  it('rounds to one decimal', () => {
    expect(percent(1, 3)).toBe(33.3);
  });

  it('never divides by zero', () => {
    expect(percent(5, 0)).toBe(0);
    expect(passRate({ passed: 0, executed: 0 })).toBe(0);
  });

  it('counts blocked tests as executed but not passed', () => {
    expect(passRate(summariseExecution(series))).toBe(90);
  });
});

describe('openBySeverity', () => {
  it('ignores closed defects and keeps every severity key', () => {
    const counts = openBySeverity([
      { severity: 'High', status: 'Open' },
      { severity: 'High', status: 'Retest' },
      { severity: 'Critical', status: 'Closed' },
    ]);
    expect(counts).toEqual({ Critical: 0, High: 2, Medium: 0, Low: 0 });
  });
});

describe('requirementStatus', () => {
  it.each([
    [[], 'gap'],
    [[{ status: 'passed' }, { status: 'failed' }], 'failing'],
    [[{ status: 'passed' }, { status: 'blocked' }], 'pending'],
    [[{ status: 'passed' }, { status: 'not run' }], 'pending'],
    [[{ status: 'passed' }, { status: 'passed' }], 'verified'],
  ])('classifies %j as %s', (tests, expected) => {
    expect(requirementStatus({ tests })).toBe(expected);
  });
});

describe('traceability', () => {
  it('summarises coverage for the sample release', () => {
    const t = traceability(requirements);
    expect(t.total).toBe(12);
    expect(t.covered).toBe(11);
    expect(t.coverage).toBe(91.7);
    expect(t.mustGaps).toBe(5);
  });
});

describe('filterDefects', () => {
  it('matches text across id, title, module and requirement', () => {
    expect(filterDefects(defects, { query: 'req-104' }).map((d) => d.id)).toEqual(['DEF-1042']);
    expect(filterDefects(defects, { query: 'notifications' })).toHaveLength(3);
  });

  it('combines severity and open/closed filters', () => {
    const openCritical = filterDefects(defects, { severity: 'Critical', status: 'Open' });
    expect(openCritical.map((d) => d.id)).toEqual(['DEF-1042']);
    expect(filterDefects(defects, { status: 'Closed' }).every((d) => d.status === 'Closed')).toBe(true);
  });

  it('returns everything with no filters', () => {
    expect(filterDefects(defects)).toHaveLength(defects.length);
  });
});

describe('go / no-go readiness', () => {
  const base = {
    execution: { passed: 95, failed: 3, blocked: 2, executed: 100 },
    planned: 100,
    defects: [],
    requirements: [{ priority: 'Must', tests: [{ status: 'passed' }] }],
  };

  it('is Go when every gate is met', () => {
    const gates = evaluateGates(base);
    expect(readinessVerdict(gates)).toMatchObject({ verdict: 'Go', score: 100 });
  });

  it('is No-Go while a Critical defect is open', () => {
    const gates = evaluateGates({ ...base, defects: [{ severity: 'Critical', status: 'Open' }] });
    expect(readinessVerdict(gates).verdict).toBe('No-Go');
  });

  it('is Conditional when only non-blocking gates fail', () => {
    const gates = evaluateGates({ ...base, manualGates: [{ id: 'uat', met: false }] });
    expect(readinessVerdict(gates).verdict).toBe('Conditional');
  });

  it('flags the sample release as No-Go because of DEF-1042', () => {
    const s = scopes.sprint15;
    const gates = evaluateGates({
      execution: summariseExecution(s.series),
      planned: s.planned,
      defects,
      requirements,
      manualGates,
    });
    expect(gates).toHaveLength(6);
    expect(readinessVerdict(gates).verdict).toBe('No-Go');
  });
});

describe('delta', () => {
  it('treats a drop as good news when lower is better', () => {
    expect(delta(12, 17, { higherIsBetter: false })).toEqual({ diff: -5, good: true, up: false });
  });

  it('treats a rise as good news by default', () => {
    expect(delta(91.2, 88.4)).toEqual({ diff: 2.8, good: true, up: true });
  });
});

describe('niceCeil', () => {
  it.each([
    [0, 1],
    [7, 10],
    [18, 20],
    [23, 25],
    [31, 50],
    [124, 200],
  ])('rounds %d up to %d', (n, expected) => {
    expect(niceCeil(n)).toBe(expected);
  });
});

describe('niceAxis', () => {
  it('fits the axis snugly above the data', () => {
    expect(niceAxis(29)).toEqual({ max: 30, ticks: [30, 20, 10, 0] });
    expect(niceAxis(124)).toEqual({ max: 150, ticks: [150, 100, 50, 0] });
  });

  it('still returns a usable axis for zero', () => {
    expect(niceAxis(0).ticks.at(-1)).toBe(0);
  });
});

describe('sparkPath', () => {
  it('starts at the first point and ends at the right edge', () => {
    const d = sparkPath([0, 10], 100, 40);
    expect(d.startsWith('M0,36')).toBe(true);
    expect(d.endsWith('100,4')).toBe(true);
  });

  it('returns an empty path for fewer than two points', () => {
    expect(sparkPath([5], 100, 40)).toBe('');
  });
});

describe('greeting', () => {
  it.each([
    [8, 'Good morning'],
    [14, 'Good afternoon'],
    [21, 'Good evening'],
  ])('at %d:00 says %s', (hour, expected) => {
    expect(greeting(new Date(2026, 0, 1, hour))).toBe(expected);
  });
});
