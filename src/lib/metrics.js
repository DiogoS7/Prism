// Pure functions behind every number on the dashboard. Kept free of React so they
// can be unit tested on their own (see metrics.test.js).

export const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'];
export const OPEN_STATUSES = ['Open', 'In progress', 'Retest'];

const round1 = (n) => Math.round(n * 10) / 10;

/** Total passed / failed / blocked across a series, plus executed = all three. */
export function summariseExecution(series) {
  const totals = series.reduce(
    (acc, d) => ({
      passed: acc.passed + d.passed,
      failed: acc.failed + d.failed,
      blocked: acc.blocked + d.blocked,
    }),
    { passed: 0, failed: 0, blocked: 0 },
  );
  return { ...totals, executed: totals.passed + totals.failed + totals.blocked };
}

/** Percentage with one decimal; 0 when there is nothing to divide by. */
export function percent(part, whole) {
  if (!whole) return 0;
  return round1((part / whole) * 100);
}

/** Pass rate over executed tests (blocked tests count as executed but not passed). */
export function passRate({ passed, executed }) {
  return percent(passed, executed);
}

export const isOpen = (defect) => OPEN_STATUSES.includes(defect.status);

/** Open defects counted per severity, always returning every severity key. */
export function openBySeverity(defects) {
  const counts = Object.fromEntries(SEVERITIES.map((s) => [s, 0]));
  for (const d of defects) if (isOpen(d)) counts[d.severity] += 1;
  return counts;
}

/**
 * Classify a requirement from its linked tests:
 * - "gap"      no tests linked
 * - "failing"  at least one failed test
 * - "pending"  nothing failed, but something is blocked or not run
 * - "verified" every linked test passed
 */
export function requirementStatus(req) {
  if (!req.tests.length) return 'gap';
  if (req.tests.some((t) => t.status === 'failed')) return 'failing';
  if (req.tests.every((t) => t.status === 'passed')) return 'verified';
  return 'pending';
}

/** Coverage = requirements with at least one test; verified = all tests passed. */
export function traceability(requirements) {
  const total = requirements.length;
  const statuses = requirements.map(requirementStatus);
  const covered = statuses.filter((s) => s !== 'gap').length;
  const verified = statuses.filter((s) => s === 'verified').length;
  const mustGaps = requirements.filter(
    (r, i) => r.priority === 'Must' && statuses[i] !== 'verified',
  ).length;
  return {
    total,
    covered,
    verified,
    coverage: percent(covered, total),
    verifiedRate: percent(verified, total),
    mustGaps,
  };
}

/** Free-text + severity + status filter used by the Defects view. */
export function filterDefects(defects, { query = '', severity = 'All', status = 'All' } = {}) {
  const q = query.trim().toLowerCase();
  return defects.filter((d) => {
    if (severity !== 'All' && d.severity !== severity) return false;
    if (status === 'Open' && !isOpen(d)) return false;
    if (status === 'Closed' && isOpen(d)) return false;
    if (!q) return true;
    return [d.id, d.title, d.module, d.reqId].some((v) => v.toLowerCase().includes(q));
  });
}

/**
 * Go/no-go gates. Automatic gates come from the metrics; manual gates
 * (UAT sign-off, CAB approval) are passed in as data.
 */
export function evaluateGates({ execution, planned, defects, requirements, manualGates = [] }) {
  const progress = percent(execution.executed, planned);
  const rate = passRate(execution);
  const criticalOpen = openBySeverity(defects).Critical;
  const { mustGaps } = traceability(requirements);

  const automatic = [
    { id: 'execution', label: 'Execution ≥ 90% of planned tests', met: progress >= 90, note: `${progress}% executed` },
    { id: 'passrate', label: 'Pass rate ≥ 90%', met: rate >= 90, note: `${rate}% passing` },
    { id: 'critical', label: 'No open Critical defects', met: criticalOpen === 0, note: criticalOpen ? `${criticalOpen} open` : 'None open' },
    { id: 'must', label: 'Every Must-have requirement verified', met: mustGaps === 0, note: mustGaps ? `${mustGaps} not verified` : 'All verified' },
  ];
  return [...automatic, ...manualGates];
}

/** "Go" when every gate is met, "No-Go" when a Critical defect is open, otherwise "Conditional". */
export function readinessVerdict(gates) {
  const met = gates.filter((g) => g.met).length;
  const score = percent(met, gates.length);
  const blocking = gates.some((g) => g.id === 'critical' && !g.met);
  const verdict = met === gates.length ? 'Go' : blocking ? 'No-Go' : 'Conditional';
  return { met, total: gates.length, score, verdict };
}

/** Change between two values, with whether the change is good news for this metric. */
export function delta(current, previous, { higherIsBetter = true } = {}) {
  const diff = round1(current - previous);
  const good = diff === 0 ? true : higherIsBetter ? diff > 0 : diff < 0;
  return { diff, good, up: diff >= 0 };
}

/** Round an axis maximum up to a friendly number (1, 2, 2.5, 5 × 10ⁿ). */
export function niceCeil(n) {
  if (n <= 0) return 1;
  const exp = 10 ** Math.floor(Math.log10(n));
  const f = n / exp;
  const step = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return step * exp;
}

/** Smooth SVG path through points scaled into a width × height box. */
export function sparkPath(points, width, height, pad = 4) {
  if (points.length < 2) return '';
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const xy = points.map((v, i) => [
    round1((i * width) / (points.length - 1)),
    round1(height - pad - ((v - min) / span) * (height - pad * 2)),
  ]);
  let d = `M${xy[0][0]},${xy[0][1]}`;
  for (let i = 1; i < xy.length; i++) {
    const [x0, y0] = xy[i - 1];
    const [x1, y1] = xy[i];
    const cx = round1((x0 + x1) / 2);
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

/** Axis with ~`target` evenly spaced ticks: niceAxis(29) → { max: 30, ticks: [30, 20, 10, 0] }. */
export function niceAxis(maxValue, target = 4) {
  const step = niceCeil(maxValue / target);
  const max = Math.max(step, Math.ceil(maxValue / step) * step);
  const ticks = [];
  for (let v = max; v >= 0; v -= step) ticks.push(round1(v));
  return { max, ticks };
}

export function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}
