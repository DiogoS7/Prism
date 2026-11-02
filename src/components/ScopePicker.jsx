import { LuCalendarRange, LuChevronDown, LuCheck, LuRocket } from 'react-icons/lu';
import Popover from './Popover.jsx';
import { scopes, SPRINT_KEYS } from '../data/release.js';
import { passRate, summariseExecution } from '../lib/metrics.js';

function Option({ k, active, onPick }) {
  const s = scopes[k];
  const rate = passRate(summariseExecution(s.series));
  const Icon = s.kind === 'release' ? LuRocket : LuCalendarRange;
  return (
    <li>
      <button
        role="option"
        aria-selected={active}
        onClick={() => onPick(k)}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/[0.07] ${active ? 'bg-white/10' : ''}`}
      >
        <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${active ? 'bg-white text-[#14141c]' : 'glass-inset text-muted'}`}>
          <Icon size={15} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-xs font-semibold">
            {s.label}
            {s.current && <span className="rounded-full bg-accent/20 px-1.5 py-px text-[9px] font-bold tracking-wide text-[#a9c6ff] uppercase">Current</span>}
          </span>
          <span className="block text-[11px] text-muted">{s.range}</span>
        </span>
        <span className="text-right text-[11px]">
          <b className={`block font-semibold ${rate >= 90 ? 'text-pass' : rate >= 85 ? 'text-blocked' : 'text-fail'}`}>{rate}%</b>
          <span className="text-faint">pass rate</span>
        </span>
        <LuCheck size={14} className={active ? 'text-ink' : 'invisible'} />
      </button>
    </li>
  );
}

/** Reporting-period picker: any sprint of the release, or the release to date. */
export default function ScopePicker({ value, onChange }) {
  const s = scopes[value];
  return (
    <Popover
      width={330}
      trigger={({ open, toggle }) => (
        <button
          onClick={toggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`glass flex items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-left transition hover:bg-white/15 ${open ? '!bg-white/15 border-white/30' : ''}`}
        >
          <span className="grid size-8 place-items-center rounded-full bg-white text-[#14141c]">
            {s.kind === 'release' ? <LuRocket size={15} /> : <LuCalendarRange size={15} />}
          </span>
          <span className="leading-tight">
            <span className="flex items-center gap-1.5 text-xs font-semibold">
              {s.label}
              {s.current && <i className="size-1.5 rounded-full bg-pass shadow-[0_0_6px_#4ade80]" title="Current sprint" />}
            </span>
            <span className="block text-[11px] text-muted">{s.range}</span>
          </span>
          <LuChevronDown size={15} className={`ml-1 text-muted transition ${open ? 'rotate-180' : ''}`} />
        </button>
      )}
    >
      {(close) => {
        const pick = (k) => {
          onChange(k);
          close();
        };
        return (
          <div role="listbox" aria-label="Reporting period">
            <p className="px-3 pt-2 pb-1 text-[10px] font-semibold tracking-[0.14em] text-faint uppercase">Sprints</p>
            <ul>
              {SPRINT_KEYS.map((k) => (
                <Option key={k} k={k} active={k === value} onPick={pick} />
              ))}
            </ul>
            <div className="mx-3 my-1.5 h-px bg-white/10" />
            <p className="px-3 pt-1 pb-1 text-[10px] font-semibold tracking-[0.14em] text-faint uppercase">Whole release</p>
            <ul>
              <Option k="release" active={value === 'release'} onPick={pick} />
            </ul>
          </div>
        );
      }}
    </Popover>
  );
}
