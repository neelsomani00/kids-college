import { useState } from 'react';

/**
 * A photo slot. Drop a file into public/images/ with the name given in `file` and it appears.
 * Until then, a clearly labelled placeholder is shown so you know what to shoot.
 */
export default function ImageSlot({ file, label, alt, ratio = 'aspect-[4/3]', className = '' }) {
  const [failed, setFailed] = useState(false);

  if (file && !failed) {
    return (
      <img
        src={`/images/${file}`}
        alt={alt || label}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${ratio} w-full rounded-md object-cover ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={`${ratio} flex w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-brand/30 bg-brand/5 p-3 text-center ${className}`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-brand/50" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="M21 16l-5-5-8 8" />
      </svg>
      <span className="text-xs font-bold uppercase tracking-wide text-brand/70">{label}</span>
      {file && <span className="text-[11px] text-ink/50">public/images/{file}</span>}
    </div>
  );
}
