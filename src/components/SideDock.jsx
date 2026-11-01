import { motion } from 'framer-motion';
import { LuHouse, LuFlaskConical, LuBug, LuNetwork, LuRocket, LuBookmark, LuSettings } from 'react-icons/lu';

const ITEMS = [
  { id: 'overview', tip: 'Overview', icon: LuHouse },
  { id: 'runs', tip: 'Test runs', icon: LuFlaskConical, view: 'overview' },
  { id: 'defects', tip: 'Defects', icon: LuBug },
  { id: 'traceability', tip: 'Traceability', icon: LuNetwork },
  { id: 'releases', tip: 'Releases', icon: LuRocket },
  { id: 'saved', tip: 'Saved views', icon: LuBookmark },
  { id: 'settings', tip: 'Settings', icon: LuSettings },
];

/** Vertical glass dock on desktop, floating bottom bar on phones. */
export default function SideDock({ tab, onTab }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="glass fixed bottom-3.5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full p-1.5 md:sticky md:top-28 md:bottom-auto md:left-auto md:mt-36 md:translate-x-0 md:flex-col md:self-start md:px-[7px] md:py-2.5"
    >
      {ITEMS.map(({ id, tip, icon: Icon, view }) => {
        const target = view ?? id;
        const navigable = ['overview', 'defects', 'traceability'].includes(target);
        const active = id === tab;
        return (
          <button
            key={id}
            data-tip={navigable ? tip : `${tip} (coming soon)`}
            aria-label={tip}
            onClick={() => navigable && onTab(target)}
            className={`dock-btn relative grid size-10 place-items-center rounded-full transition ${
              active ? 'bg-white text-[#1d150f]' : 'text-muted hover:bg-white/15 hover:text-ink'
            } ${['saved', 'settings', 'releases'].includes(id) ? 'hidden md:grid' : ''}`}
          >
            <Icon size={17} />
          </button>
        );
      })}
    </motion.aside>
  );
}
