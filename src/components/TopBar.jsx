import { LuHouse, LuBug, LuNetwork, LuMail, LuBell, LuSearch } from 'react-icons/lu';
import Avatar from './Avatar.jsx';

export const TABS = [
  { id: 'overview', label: 'Overview', icon: LuHouse },
  { id: 'defects', label: 'Defects', icon: LuBug },
  { id: 'traceability', label: 'Traceability', icon: LuNetwork },
];

function IconButton({ label, children, className = '' }) {
  return (
    <button aria-label={label} className={`glass relative grid size-10 place-items-center rounded-full transition hover:bg-white/15 ${className}`}>
      {children}
    </button>
  );
}

export default function TopBar({ tab, onTab, alerts }) {
  return (
    <header className="mb-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 64 64" className="size-9" aria-hidden="true">
          <defs>
            <linearGradient id="logo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6aa2ff" />
              <stop offset=".5" stopColor="#8b7bff" />
              <stop offset="1" stopColor="#f5a524" />
            </linearGradient>
          </defs>
          <path d="M32 10 54 50H10Z" fill="none" stroke="url(#logo)" strokeWidth="5" strokeLinejoin="round" />
          <path d="M20 38h24" stroke="url(#logo)" strokeWidth="4" strokeLinecap="round" opacity=".8" />
        </svg>
        <span className="hidden text-lg font-bold tracking-tight lg:inline">Prism</span>
      </div>

      <nav className="flex gap-1.5 sm:gap-2" aria-label="Views">
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              aria-current={active ? 'page' : undefined}
              className={`glass flex items-center gap-2 rounded-full px-3 py-2.5 text-[13px] font-medium transition sm:px-[18px] ${
                active ? 'border-white/30 !bg-white/15 text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-2 sm:gap-2.5">
        <IconButton label="Messages" className="hidden md:grid">
          <LuMail size={17} className="opacity-85" />
        </IconButton>
        <IconButton label={`${alerts} alerts`}>
          <LuBell size={17} className="opacity-85" />
          {alerts > 0 && (
            <span className="absolute top-1.5 right-1.5 grid h-[15px] min-w-[15px] place-items-center rounded-full border-2 border-[#2a1d14]/80 bg-red-500 px-1 text-[9px] font-bold">
              {alerts}
            </span>
          )}
        </IconButton>
        <IconButton label="Search" className="hidden md:grid">
          <LuSearch size={17} className="opacity-85" />
        </IconButton>
        <Avatar id="DS" size={40} online ring={false} className="shadow-[0_0_0_2px_rgba(255,255,255,0.25)]" />
      </div>
    </header>
  );
}
