import { LuPlus } from 'react-icons/lu';
import GlassCard, { CardHeader } from './GlassCard.jsx';
import { AvatarStack } from './Avatar.jsx';

export default function TodayTimeline({ agenda, delay = 0, className = '' }) {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
  return (
    <GlassCard delay={delay} className={`flex flex-col gap-3 p-5 ${className}`}>
      <CardHeader title="Today" subtitle={today}>
        <button aria-label="Add event" className="glass-inset grid size-[30px] place-items-center rounded-full transition hover:bg-white/15">
          <LuPlus size={14} />
        </button>
      </CardHeader>
      <ol className="flex flex-col gap-2.5">
        {agenda.map((e) => (
          <li key={e.title} className="grid grid-cols-[38px_1fr] gap-2.5">
            <time className="pt-3 text-[10px] text-faint">{e.time}</time>
            <div
              className="glass-inset rounded-[14px] border-l-[3px] px-3.5 py-3 transition hover:bg-white/10"
              style={{ borderLeftColor: e.color }}
            >
              <p className="text-xs font-semibold">{e.title}</p>
              <p className="text-[10px] text-muted">{e.range}</p>
              <div className="mt-2">
                <AvatarStack ids={e.people} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </GlassCard>
  );
}
