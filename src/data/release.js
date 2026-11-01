// All data in Prism is synthetic. "Meridian Bank" and every person below are fictional.
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

// Test execution per scope. Each point is one day (sprints) or one sprint (release).
export const scopes = {
  sprint15: {
    label: 'Sprint 15',
    caption: 'Test runs per day · this sprint',
    planned: 140,
    comparedTo: 'last sprint',
    series: [
      { label: 'Mon', passed: 14, failed: 2, blocked: 1 },
      { label: 'Tue', passed: 19, failed: 3, blocked: 0 },
      { label: 'Wed', passed: 16, failed: 1, blocked: 2 },
      { label: 'Thu', passed: 27, failed: 2, blocked: 0 },
      { label: 'Fri', passed: 22, failed: 1, blocked: 1 },
      { label: 'Sat', passed: 8, failed: 0, blocked: 0 },
      { label: 'Sun', passed: 4, failed: 1, blocked: 0 },
    ],
    previous: { executed: 112, passRate: 88.4, openDefects: 17, coverage: 87 },
  },
  sprint14: {
    label: 'Sprint 14',
    caption: 'Test runs per day · previous sprint',
    planned: 130,
    comparedTo: 'sprint 13',
    series: [
      { label: 'Mon', passed: 12, failed: 3, blocked: 1 },
      { label: 'Tue', passed: 15, failed: 4, blocked: 1 },
      { label: 'Wed', passed: 18, failed: 2, blocked: 0 },
      { label: 'Thu', passed: 14, failed: 3, blocked: 2 },
      { label: 'Fri', passed: 21, failed: 2, blocked: 0 },
      { label: 'Sat', passed: 6, failed: 1, blocked: 0 },
      { label: 'Sun', passed: 2, failed: 0, blocked: 0 },
    ],
    previous: { executed: 96, passRate: 85.1, openDefects: 22, coverage: 79 },
  },
  release: {
    label: 'Release',
    caption: 'Test runs per sprint · whole release',
    planned: 560,
    comparedTo: 'R4.1',
    series: [
      { label: 'S11', passed: 58, failed: 11, blocked: 4 },
      { label: 'S12', passed: 71, failed: 9, blocked: 3 },
      { label: 'S13', passed: 82, failed: 10, blocked: 4 },
      { label: 'S14', passed: 88, failed: 15, blocked: 4 },
      { label: 'S15', passed: 110, failed: 10, blocked: 4 },
    ],
    previous: { executed: 401, passRate: 86.2, openDefects: 31, coverage: 82 },
  },
};

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
