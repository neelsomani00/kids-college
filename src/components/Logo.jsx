import { useState } from 'react';
import { SITE } from '../data/config';

// Tries /public/logo.webp first, then the logo hosted on the school's current site, then a text monogram.
export default function Logo({ className = 'h-12 w-auto' }) {
  const sources = [SITE.logoLocal, SITE.logoRemote];
  const [i, setI] = useState(0);

  if (i >= sources.length) {
    return (
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-md bg-brand font-display text-lg font-bold text-accent"
      >
        KC
      </span>
    );
  }
  return (
    <img
      src={sources[i]}
      alt={`${SITE.fullName} logo`}
      className={className}
      onError={() => setI(i + 1)}
      width="64"
      height="48"
    />
  );
}
