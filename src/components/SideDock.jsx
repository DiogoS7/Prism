import { motion } from 'framer-motion';
import { LuSearch } from 'react-icons/lu';
import { TABS } from './TopBar.jsx';

/** Vertical glass dock on desktop, floating bottom bar on phones. Every item goes somewhere. */
export default function SideDock({ tab, onTab, onOpenSearch }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="glass fixed bottom-3.5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full p-1.5 md:sticky md:top-28 md:bottom-auto md:left-auto md:mt-36 md:translate-x-0 md:flex-col md:self-start md:px-[7px] md:py-2.5"
    >
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          data-tip={label}
          aria-label={label}
          aria-current={tab === id ? 'page' : undefined}
          onClick={() => onTab(id)}
          className={`dock-btn relative grid size-10 place-items-center rounded-full transition ${
            tab === id ? 'bg-white text-[#1d150f]' : 'text-muted hover:bg-white/15 hover:text-ink'
          }`}
        >
          <Icon size={17} />
        </button>
      ))}
      <span className="mx-1 w-px self-stretch bg-white/15 md:mx-0 md:my-1 md:h-px md:w-auto" />
      <button
        data-tip="Search  Ctrl K"
        aria-label="Search"
        onClick={onOpenSearch}
        className="dock-btn relative grid size-10 place-items-center rounded-full text-muted transition hover:bg-white/15 hover:text-ink"
      >
        <LuSearch size={17} />
      </button>
    </motion.aside>
  );
}
