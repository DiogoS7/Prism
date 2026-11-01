/**
 * Global search across defects, requirements and test cases.
 * Results whose id starts with the query rank first, then id matches, then title matches.
 */
export function searchAll(query, { defects = [], requirements = [], runs = [] }, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const items = [
    ...defects.map((d) => ({ type: 'defect', id: d.id, title: d.title, meta: `${d.severity} · ${d.status}`, view: 'defects' })),
    ...requirements.map((r) => ({ type: 'requirement', id: r.id, title: r.title, meta: `${r.priority} · ${r.tests.length} tests`, view: 'traceability' })),
    ...runs.map((t) => ({ type: 'test', id: t.id, title: t.title, meta: `${t.suite} · ${t.status}`, view: 'runs' })),
  ];
  const score = (it) => {
    const id = it.id.toLowerCase();
    if (id.startsWith(q)) return 0;
    if (id.includes(q)) return 1;
    if (it.title.toLowerCase().includes(q)) return 2;
    return -1;
  };
  return items
    .map((it) => ({ it, s: score(it) }))
    .filter((x) => x.s >= 0)
    .sort((a, b) => a.s - b.s || a.it.id.localeCompare(b.it.id))
    .slice(0, limit)
    .map((x) => x.it);
}
