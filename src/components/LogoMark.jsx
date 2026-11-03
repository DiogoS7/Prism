import { useId } from 'react';

/** QualityView mark: a lens (eye) whose iris holds a check mark. */
export default function LogoMark({ size = 36, className = '' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a9c1ff" />
          <stop offset="1" stopColor="#3a62d8" />
        </linearGradient>
        <linearGradient id={`${id}-iris`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7aa2ff" />
          <stop offset="1" stopColor="#2f55c9" />
        </linearGradient>
      </defs>
      <path d="M5 32C14.5 17 49.5 17 59 32C49.5 47 14.5 47 5 32Z" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="4.5" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="11.5" fill={`url(#${id}-iris)`} />
      <path d="M26.6 32.4 30.6 36.4 38 28.6" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44.5" cy="23.5" r="2.6" fill="#e6b25c" />
    </svg>
  );
}
