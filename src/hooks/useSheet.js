import { useEffect, useState } from 'react';
import { SITE } from '../data/config';

// Minimal CSV parser (handles quotes, commas and newlines inside quotes).
function parseCSV(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim() !== '')) rows.push(row);
  return rows;
}

const slug = (s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

/**
 * Reads a tab from the school's Google Sheet. Header row = field names.
 * Falls back to `fallback` when no sheet is configured or the request fails.
 */
export function useSheet(tab, fallback) {
  const [data, setData] = useState(fallback);
  const [status, setStatus] = useState(SITE.sheetId ? 'loading' : 'placeholder');

  useEffect(() => {
    if (!SITE.sheetId) return;
    const ctrl = new AbortController();
    const url = `https://docs.google.com/spreadsheets/d/${SITE.sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`;
    fetch(url, { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error('Sheet request failed');
        return r.text();
      })
      .then((text) => {
        const [head, ...body] = parseCSV(text);
        const keys = head.map(slug);
        const items = body.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] || '').trim()])));
        if (items.length) { setData(items); setStatus('live'); }
        else setStatus('placeholder');
      })
      .catch((e) => { if (e.name !== 'AbortError') setStatus('error'); });
    return () => ctrl.abort();
  }, [tab]);

  return { data, status };
}
