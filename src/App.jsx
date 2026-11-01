import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuDownload } from 'react-icons/lu';
import Scene from './components/Scene.jsx';
import TopBar, { TABS } from './components/TopBar.jsx';
import SideDock from './components/SideDock.jsx';
import Overview from './views/Overview.jsx';
import Defects from './views/Defects.jsx';
import Traceability from './views/Traceability.jsx';
import { release, scopes, defects, requirements, manualGates } from './data/release.js';
import {
  summariseExecution,
  passRate,
  openBySeverity,
  traceability,
  evaluateGates,
  readinessVerdict,
  filterDefects,
  requirementStatus,
  greeting,
} from './lib/metrics.js';
import { toCsv, downloadCsv } from './lib/csv.js';

const SCOPE_KEYS = ['sprint15', 'sprint14', 'release'];
const VIEW_IDS = TABS.map((t) => t.id);
const DEFAULT_FILTERS = { query: '', severity: 'All', status: 'All' };

const tabFromHash = () => {
  const h = window.location.hash.slice(1);
  return VIEW_IDS.includes(h) ? h : 'overview';
};

export default function App() {
  const [tab, setTab] = useState(tabFromHash);
  const [scopeKey, setScopeKey] = useState('sprint15');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Keep the view in the URL hash so a view can be bookmarked or shared.
  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (id, filterPatch) => {
    if (filterPatch) setFilters({ ...DEFAULT_FILTERS, status: 'Open', ...filterPatch });
    window.location.hash = id === 'overview' ? '' : id;
    setTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scope = scopes[scopeKey];
  const m = useMemo(() => {
    const execution = summariseExecution(scope.series);
    const severity = openBySeverity(defects);
    const gates = evaluateGates({ execution, planned: scope.planned, defects, requirements, manualGates });
    return {
      execution,
      rate: passRate(execution),
      severity,
      openTotal: Object.values(severity).reduce((a, b) => a + b, 0),
      trace: traceability(requirements),
      gates,
      readiness: readinessVerdict(gates),
    };
  }, [scope]);

  const exportCsv = () => {
    if (tab === 'defects') {
      downloadCsv('prism-defects.csv', toCsv(filterDefects(defects, filters), ['id', 'title', 'severity', 'status', 'module', 'owner', 'ageDays', 'reqId']));
    } else if (tab === 'traceability') {
      const rows = requirements.map((r) => ({ ...r, status: requirementStatus(r), tests: r.tests.map((t) => `${t.id}:${t.status}`).join(' ') }));
      downloadCsv('prism-traceability.csv', toCsv(rows, ['id', 'title', 'priority', 'tests', 'status']));
    } else {
      downloadCsv(`prism-execution-${scopeKey}.csv`, toCsv(scope.series, ['label', 'passed', 'failed', 'blocked']));
    }
  };

  const titles = {
    overview: `${greeting()}, Diogo`,
    defects: 'Defects',
    traceability: 'Traceability',
  };

  return (
    <>
      <Scene />
      <div className="relative z-10 min-h-full px-3.5 pt-4 pb-24 sm:px-7 md:pb-8">
        <TopBar tab={tab} onTab={navigate} alerts={m.severity.Critical + m.severity.High} />

        <div className="grid gap-6 md:grid-cols-[56px_1fr]">
          <SideDock tab={tab} onTab={navigate} />

          <main className="min-w-0">
            <motion.section
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex flex-wrap items-end justify-between gap-4"
            >
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-faint uppercase">
                  {release.client} · {release.programme}
                </p>
                <h1 className="mt-1 text-[22px] font-semibold tracking-tight sm:text-[26px]">{titles[tab]}</h1>
                <p className="mt-1 text-[13px] text-muted">
                  Release {release.name} — go-live in {release.goLiveInDays} days
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                {tab === 'overview' && (
                  <div className="glass flex gap-0.5 rounded-full p-1" role="tablist" aria-label="Scope">
                    {SCOPE_KEYS.map((k) => (
                      <button
                        key={k}
                        role="tab"
                        aria-selected={scopeKey === k}
                        onClick={() => setScopeKey(k)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:px-4 ${
                          scopeKey === k ? 'bg-white text-[#1d150f] shadow-[0_4px_14px_rgba(0,0,0,0.25)]' : 'text-faint hover:text-ink'
                        }`}
                      >
                        {scopes[k].label}
                      </button>
                    ))}
                  </div>
                )}
                <button onClick={exportCsv} className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition hover:bg-white/15">
                  <LuDownload size={14} /> Export
                </button>
              </div>
            </motion.section>

            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {tab === 'overview' && <Overview scopeKey={scopeKey} scope={scope} m={m} onNavigate={navigate} />}
                {tab === 'defects' && <Defects defects={defects} filters={filters} onFilters={setFilters} />}
                {tab === 'traceability' && <Traceability requirements={requirements} trace={m.trace} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  );
}
