import { useState } from 'react';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-brand/15 rounded-md border border-brand/15 bg-white">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <h3 className="font-sans">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-base font-bold text-brand sm:px-6"
              >
                {it.q}
                <span aria-hidden="true" className={`text-xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
            </h3>
            {isOpen && (
              <div id={`faq-${i}`} className="px-4 pb-5 text-sm leading-relaxed text-ink/80 sm:px-6">
                {it.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
