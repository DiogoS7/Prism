import { useId } from 'react';

/** QualityView mark: an open "Q" ring with a check mark breaking out of it. */
export default function LogoMark({ size = 36, className = '' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a9c1ff" />
          <stop offset="1" stopColor="#3a62d8" />
        </linearGradient>
      </defs>
      <path d="M45.4 18.6A20 20 0 1 0 50 30" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="6" strokeLinecap="round" />
      <path d="M21 31.5 28.5 39 54 13.5" fill="none" stroke="#e6b25c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** QA Agent icon: a chat bubble holding a small check. */
export function AgentIcon({ size = 26, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.3c-.5.4-1.3 0-1.3-.6V17A2.5 2.5 0 0 1 4 14.5z" />
      <path d="M8.6 10.6l2.3 2.3 4.6-4.6" stroke="#e6b25c" />
    </svg>
  );
}
