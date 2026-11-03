// All data in QualityView is synthetic. "Meridian Bank" and every person below are fictional.
// The shape mirrors what a QA lead tracks on a real banking release: execution,
// defects, requirement traceability and the go/no-go gates agreed with the client.

export const release = {
  client: 'Meridian Bank',
  programme: 'Core Payments Modernisation',
  name: 'R4.2 · SEPA Instant Payments',
  goLiveInDays: 9,
};

export const people = {
  AR: { name: 'Ana Ribeiro', role: 'Development Lead', hue: ['#38bdf8', '#0284c7'] },
  TM: { name: 'Tiago Marques', role: 'Business Analyst', hue: ['#a78bfa', '#7c3aed'] },
  IC: { name: 'Inês Costa', role: 'UAT Lead · Payments Ops', hue: ['#f472b6', '#db2777'] },
  RA: { name: 'Rui Alves', role: 'Test Automation', hue: ['#34d399', '#059669'] },
  MS: { name: 'Marta Sousa', role: 'Project Manager', hue: ['#fbbf24', '#d97706'] },
  DS: { name: 'Diogo Santos', role: 'QA Consultant', hue: ['#f6b14a', '#e0702c'] },
};

// Test execution per scope: one-week sprints (one point per day) and the release to date
// (one point per sprint). `previous` holds the figures for the period before, used for deltas.
const day = (label, passed, failed, blocked) => ({ label, passed, failed, blocked });
const week = (rows) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => day(d, ...rows[i]));

export const scopes = {
  sprint15: {
    kind: 'sprint',
    label: 'Sprint 15',
    range: '26 Oct – 1 Nov',
    current: true,
    caption: 'Test runs per day · Sprint 15',
    planned: 140,
    comparedTo: 'Sprint 14',
    series: week([[14, 2, 1], [19, 3, 0], [16, 1, 2], [27, 2, 0], [22, 1, 1], [8, 0, 0], [4, 1, 0]]),
    previous: { executed: 107, passRate: 82.2, openDefects: 17, coverage: 87 },
  },
  sprint14: {
    kind: 'sprint',
    label: 'Sprint 14',
    range: '19 – 25 Oct',
    caption: 'Test runs per day · Sprint 14',
    planned: 130,
    comparedTo: 'Sprint 13',
    series: week([[12, 3, 1], [15, 4, 1], [18, 2, 0], [14, 3, 2], [21, 2, 0], [6, 1, 0], [2, 0, 0]]),
    previous: { executed: 96, passRate: 85.4, openDefects: 22, coverage: 79 },
  },
  sprint13: {
    kind: 'sprint',
    label: 'Sprint 13',
    range: '12 – 18 Oct',
    caption: 'Test runs per day · Sprint 13',
    planned: 110,
    comparedTo: 'Sprint 12',
    series: week([[10, 2, 1], [13, 1, 0], [15, 2, 1], [17, 2, 1], [18, 2, 1], [6, 1, 0], [3, 0, 0]]),
    previous: { executed: 83, passRate: 85.5, openDefects: 26, coverage: 72 },
  },
  sprint12: {
    kind: 'sprint',
    label: 'Sprint 12',
    range: '5 – 11 Oct',
    caption: 'Test runs per day · Sprint 12',
    planned: 100,
    comparedTo: 'Sprint 11',
    series: week([[8, 2, 0], [11, 1, 1], [13, 2, 0], [15, 1, 1], [16, 2, 1], [5, 1, 0], [3, 0, 0]]),
    previous: { executed: 73, passRate: 79.5, openDefects: 29, coverage: 64 },
  },
  sprint11: {
    kind: 'sprint',
    label: 'Sprint 11',
    range: '28 Sep – 4 Oct',
    caption: 'Test runs per day · Sprint 11',
    planned: 90,
    comparedTo: 'Sprint 10',
    series: week([[6, 2, 1], [9, 2, 0], [11, 2, 1], [12, 2, 1], [13, 2, 1], [5, 1, 0], [2, 0, 0]]),
    previous: { executed: 64, passRate: 76.6, openDefects: 31, coverage: 55 },
  },
  release: {
    kind: 'release',
    label: 'Release R4.2',
    range: '28 Sep – 1 Nov',
    caption: 'Test runs per sprint · release to date',
    planned: 560,
    comparedTo: 'R4.1',
    series: [
      day('S11', 58, 11, 4),
      day('S12', 71, 9, 3),
      day('S13', 82, 10, 4),
      day('S14', 88, 15, 4),
      day('S15', 110, 10, 4),
    ],
    previous: { executed: 401, passRate: 86.2, openDefects: 31, coverage: 82 },
  },
};

export const SPRINT_KEYS = ['sprint15', 'sprint14', 'sprint13', 'sprint12', 'sprint11'];

export const sparklines = {
  executed: [6, 9, 8, 12, 11, 15, 14, 19, 22],
  passRate: [8, 9, 8, 11, 12, 13, 15, 16, 19],
  defects: [19, 16, 18, 13, 15, 11, 12, 9, 8],
  coverage: [5, 7, 8, 10, 12, 13, 15, 18, 21],
};

export const defects = [
  { id: 'DEF-1042', title: 'Instant transfer accepted above €100k scheme limit', severity: 'Critical', status: 'Open', module: 'Payment initiation', owner: 'AR', ageDays: 2, reqId: 'REQ-104' },
  { id: 'DEF-1038', title: 'Duplicate pacs.008 sent when user double-taps Confirm', severity: 'High', status: 'In progress', module: 'Payment initiation', owner: 'AR', ageDays: 4, reqId: 'REQ-106' },
  { id: 'DEF-1035', title: 'Beneficiary name check returns timeout after 5s', severity: 'High', status: 'Retest', module: 'Verification of Payee', owner: 'RA', ageDays: 5, reqId: 'REQ-103' },
  { id: 'DEF-1033', title: 'Rejection reason AM04 shown as raw code to customer', severity: 'Medium', status: 'Open', module: 'Notifications', owner: 'TM', ageDays: 6, reqId: 'REQ-109' },
  { id: 'DEF-1031', title: 'Fee line missing on PDF receipt for business accounts', severity: 'Medium', status: 'In progress', module: 'Receipts', owner: 'AR', ageDays: 7, reqId: 'REQ-110' },
  { id: 'DEF-1029', title: 'Push notification delayed when app is in background', severity: 'Medium', status: 'Retest', module: 'Notifications', owner: 'RA', ageDays: 8, reqId: 'REQ-108' },
  { id: 'DEF-1027', title: 'IBAN field accepts lowercase country code', severity: 'Low', status: 'Open', module: 'Payment initiation', owner: 'TM', ageDays: 9, reqId: 'REQ-101' },
  { id: 'DEF-1024', title: 'Daily limit counter not reset at midnight CET', severity: 'High', status: 'Open', module: 'Limits', owner: 'AR', ageDays: 10, reqId: 'REQ-105' },
  { id: 'DEF-1021', title: 'Accessibility: Confirm button lacks screen-reader label', severity: 'Low', status: 'In progress', module: 'Payment initiation', owner: 'IC', ageDays: 11, reqId: 'REQ-111' },
  { id: 'DEF-1018', title: 'Audit log misses operator ID on manual release', severity: 'Medium', status: 'Closed', module: 'Back office', owner: 'RA', ageDays: 13, reqId: 'REQ-112' },
  { id: 'DEF-1015', title: 'Fallback to SCT not triggered when TIPS unavailable', severity: 'Critical', status: 'Closed', module: 'Routing', owner: 'AR', ageDays: 15, reqId: 'REQ-107' },
  { id: 'DEF-1012', title: 'Transaction history sorts by value date, not booking date', severity: 'Low', status: 'Closed', module: 'History', owner: 'TM', ageDays: 17, reqId: 'REQ-110' },
  { id: 'DEF-1009', title: 'Session expires mid-SCA challenge on slow networks', severity: 'High', status: 'Closed', module: 'Authentication', owner: 'AR', ageDays: 19, reqId: 'REQ-102' },
  { id: 'DEF-1006', title: 'Typo in Portuguese confirmation screen copy', severity: 'Low', status: 'Open', module: 'Notifications', owner: 'IC', ageDays: 20, reqId: 'REQ-109' },
];

// Each requirement lists the test cases linked to it and their latest result.
export const requirements = [
  { id: 'REQ-101', title: 'Validate IBAN format and checksum before submission', priority: 'Must', tests: [{ id: 'TC-201', status: 'passed' }, { id: 'TC-202', status: 'passed' }, { id: 'TC-203', status: 'failed' }] },
  { id: 'REQ-102', title: 'Strong Customer Authentication on every instant payment', priority: 'Must', tests: [{ id: 'TC-210', status: 'passed' }, { id: 'TC-211', status: 'passed' }] },
  { id: 'REQ-103', title: 'Verification of Payee before the customer confirms', priority: 'Must', tests: [{ id: 'TC-220', status: 'passed' }, { id: 'TC-221', status: 'blocked' }] },
  { id: 'REQ-104', title: 'Enforce €100k scheme limit per transaction', priority: 'Must', tests: [{ id: 'TC-230', status: 'failed' }, { id: 'TC-231', status: 'passed' }] },
  { id: 'REQ-105', title: 'Customer-defined daily instant payment limit', priority: 'Must', tests: [{ id: 'TC-240', status: 'passed' }, { id: 'TC-241', status: 'failed' }] },
  { id: 'REQ-106', title: 'Idempotent submission – no duplicate payments', priority: 'Must', tests: [{ id: 'TC-250', status: 'passed' }, { id: 'TC-251', status: 'not run' }] },
  { id: 'REQ-107', title: 'Fall back to standard SEPA transfer if TIPS is down', priority: 'Must', tests: [{ id: 'TC-260', status: 'passed' }, { id: 'TC-261', status: 'passed' }] },
  { id: 'REQ-108', title: 'Push notification within 10 seconds of settlement', priority: 'Should', tests: [{ id: 'TC-270', status: 'passed' }] },
  { id: 'REQ-109', title: 'Human-readable rejection reasons (PT and EN)', priority: 'Should', tests: [{ id: 'TC-280', status: 'failed' }, { id: 'TC-281', status: 'passed' }] },
  { id: 'REQ-110', title: 'PDF receipt with fees and timestamps', priority: 'Should', tests: [{ id: 'TC-290', status: 'passed' }] },
  { id: 'REQ-111', title: 'WCAG 2.2 AA on the payment journey', priority: 'Should', tests: [] },
  { id: 'REQ-112', title: 'Full audit trail for back-office manual actions', priority: 'Could', tests: [{ id: 'TC-300', status: 'passed' }] },
];

// Manual gates agreed with the client; automatic gates are computed in lib/metrics.js.
export const manualGates = [
  { id: 'uat', label: 'UAT sign-off from Payments Ops', met: false, note: 'Session booked for today 11:00' },
  { id: 'rollback', label: 'Rollback plan approved by CAB', met: true, note: 'Approved 28 Oct' },
];

export const agenda = [
  { time: '09:30', title: 'Defect triage', range: '09:30 – 10:00', color: '#4f8bff', people: ['AR', 'TM', 'RA'] },
  { time: '11:00', title: 'UAT session – Payments Ops', range: '11:00 – 12:30', color: '#f5a524', people: ['IC'] },
  { time: '14:30', title: 'Regression run – automated suite', range: '14:30 – 15:15', color: '#34d399', people: ['RA'] },
  { time: '16:00', title: 'Go / No-Go prep with PM', range: '16:00 – 16:30', color: '#8b7bff', people: ['MS'] },
];

export const activity = [
  { who: 'RA', text: ['Regression suite finished: ', '214 passed, 6 failed'], when: '12m ago' },
  { who: 'AR', text: ['Moved ', 'DEF-1035', ' to Retest'], when: '40m ago' },
  { who: 'TM', text: ['Linked ', 'TC-251', ' to ', 'REQ-106'], when: '1h ago' },
  { who: 'IC', text: ['Raised ', 'DEF-1042', ' as Critical'], when: '2h ago' },
];

// Details for every test case linked in `requirements`. The latest result lives on the
// requirement link above, so each status is recorded in one place only.
export const testCases = {
  'TC-201': { title: 'Valid Portuguese IBAN is accepted', suite: 'Functional', tester: 'DS', lastRun: 'Today 09:12', durationSec: 42 },
  'TC-202': { title: 'IBAN with bad checksum is rejected inline', suite: 'Functional', tester: 'DS', lastRun: 'Today 09:15', durationSec: 38 },
  'TC-203': { title: 'Lowercase country code is normalised', suite: 'Functional', tester: 'DS', lastRun: 'Today 09:19', durationSec: 35 },
  'TC-210': { title: 'SCA challenge shown before every instant payment', suite: 'Regression', tester: 'RA', lastRun: 'Today 14:31', durationSec: 64 },
  'TC-211': { title: 'Payment cancelled when SCA fails three times', suite: 'Regression', tester: 'RA', lastRun: 'Today 14:33', durationSec: 71 },
  'TC-220': { title: 'Matching beneficiary name shows green check', suite: 'Functional', tester: 'DS', lastRun: 'Yesterday 16:40', durationSec: 55 },
  'TC-221': { title: 'Verification of Payee timeout falls back gracefully', suite: 'Functional', tester: 'DS', lastRun: 'Yesterday 16:52', durationSec: 0, note: 'Blocked: VoP stub down in SIT' },
  'TC-230': { title: '€100,000.01 transfer is rejected', suite: 'Functional', tester: 'DS', lastRun: 'Today 10:05', durationSec: 47 },
  'TC-231': { title: '€100,000.00 transfer is accepted', suite: 'Functional', tester: 'DS', lastRun: 'Today 10:08', durationSec: 44 },
  'TC-240': { title: 'Customer can lower the daily limit in-app', suite: 'UAT', tester: 'IC', lastRun: 'Yesterday 11:20', durationSec: 180 },
  'TC-241': { title: 'Daily limit resets at midnight CET', suite: 'Regression', tester: 'RA', lastRun: 'Today 00:05', durationSec: 95 },
  'TC-250': { title: 'Double-tap on Confirm sends one payment', suite: 'Regression', tester: 'RA', lastRun: 'Today 14:36', durationSec: 58 },
  'TC-251': { title: 'Retry after network drop does not duplicate', suite: 'Regression', tester: 'RA', lastRun: '—', durationSec: 0 },
  'TC-260': { title: 'TIPS outage routes payment to standard SCT', suite: 'Regression', tester: 'RA', lastRun: 'Today 14:40', durationSec: 122 },
  'TC-261': { title: 'Customer told payment will arrive next business day', suite: 'UAT', tester: 'IC', lastRun: 'Yesterday 11:45', durationSec: 150 },
  'TC-270': { title: 'Push notification within 10 s of settlement', suite: 'Regression', tester: 'RA', lastRun: 'Today 14:44', durationSec: 33 },
  'TC-280': { title: 'Reason AM04 shown in plain Portuguese', suite: 'Functional', tester: 'DS', lastRun: 'Today 11:02', durationSec: 29 },
  'TC-281': { title: 'Reason AM04 shown in plain English', suite: 'Functional', tester: 'DS', lastRun: 'Today 11:04', durationSec: 27 },
  'TC-290': { title: 'PDF receipt lists fees and timestamps', suite: 'UAT', tester: 'IC', lastRun: 'Yesterday 12:10', durationSec: 140 },
  'TC-300': { title: 'Manual release logs the operator ID', suite: 'Functional', tester: 'DS', lastRun: 'Yesterday 15:30', durationSec: 61 },
};

export const messages = [
  { from: 'MS', text: 'Can you share the go/no-go summary before the 16:00 prep?', when: '10m', unread: true },
  { from: 'IC', text: 'UAT room is booked – four Payments Ops testers confirmed.', when: '1h', unread: true },
  { from: 'AR', text: 'Fix for DEF-1042 is in the 14:00 build, ready for retest.', when: '2h', unread: false },
];

// Public links shown in the profile menu.
export const profileLinks = {
  github: 'https://github.com/DiogoS7',
  repo: 'https://github.com/DiogoS7/QualityView',
  linkedin: 'https://www.linkedin.com/in/diogo-santos-b22801243',
  portfolio: 'https://diogos7.github.io',
};
