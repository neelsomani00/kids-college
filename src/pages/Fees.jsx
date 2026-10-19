import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE } from '../data/config';
import { useSheet } from '../hooks/useSheet';
import { FALLBACK_FEES } from '../data/fallback';

const COLS = [
  ['admission_fee', 'Admission fee'],
  ['tuition_fee', 'Tuition (annual)'],
  ['annual_charges', 'Annual charges'],
  ['transport', 'Transport'],
];

export default function Fees() {
  const { data, status } = useSheet(SITE.sheetTabs.fees, FALLBACK_FEES);
  const [wing, setWing] = useState('All');
  const [cls, setCls] = useState('');

  const wings = useMemo(() => ['All', ...new Set(data.map((r) => r.wing).filter(Boolean))], [data]);
  const rows = data.filter((r) => wing === 'All' || r.wing === wing);
  const picked = data.find((r) => r.class === cls);

  return (
    <>
      <Seo
        title="Fee Structure"
        description={`Class-wise fee structure at ${SITE.fullName} for the ${SITE.admissionSession} session: admission, tuition, annual charges and transport.`}
        path="/fees"
      />

      <section className="border-b border-brand/10 bg-white">
        <div className="container-x py-12 sm:py-16">
          <p className="eyebrow">Session {SITE.admissionSession}</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Fee structure</h1>
          <p className="mt-4 max-w-2xl text-ink/75">
            Transparent, class-wise fees. Pick a wing or a class to see exactly what applies.
          </p>
          {status === 'placeholder' && (
            <p role="note" className="mt-4 inline-block rounded border border-accent bg-accent/15 px-3 py-2 text-sm font-bold text-brand-dark">
              Showing placeholder amounts. Connect the Google Sheet to display real fees.
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          {/* Dropdown filters */}
          <div className="grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
            <div>
              <label htmlFor="wing" className="mb-1 block text-sm font-bold text-brand">Wing</label>
              <select id="wing" className="field" value={wing} onChange={(e) => { setWing(e.target.value); setCls(''); }}>
                {wings.map((w) => <option key={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="cls" className="mb-1 block text-sm font-bold text-brand">Check a class</label>
              <select id="cls" className="field" value={cls} onChange={(e) => setCls(e.target.value)}>
                <option value="">Select class…</option>
                {rows.map((r) => <option key={r.class}>{r.class}</option>)}
              </select>
            </div>
          </div>

          {picked && (
            <div className="mt-6 rounded-md border-2 border-brand bg-white p-5">
              <h2 className="text-2xl font-bold">{picked.class} <span className="text-base font-sans text-leaf">· {picked.wing} Wing</span></h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {COLS.map(([k, label]) => (
                  <div key={k}>
                    <dt className="text-xs font-bold uppercase tracking-wider text-ink/60">{label}</dt>
                    <dd className="mt-1 font-display text-xl font-bold text-brand">{picked[k] || '—'}</dd>
                  </div>
                ))}
              </dl>
              {picked.notes && <p className="mt-4 text-sm text-ink/70">{picked.notes}</p>}
            </div>
          )}

          {/* Table */}
          <div className="mt-8 overflow-x-auto rounded-md border border-brand/15 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Class-wise fee structure</caption>
              <thead className="bg-brand text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">Class</th>
                  {COLS.map(([k, label]) => <th key={k} scope="col" className="px-4 py-3 font-bold">{label}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand/10">
                {rows.map((r) => (
                  <tr key={r.class} className={r.class === cls ? 'bg-accent/20' : 'odd:bg-cream/60'}>
                    <th scope="row" className="px-4 py-3 font-bold text-brand">{r.class}</th>
                    {COLS.map(([k]) => <td key={k} className="px-4 py-3">{r[k] || '—'}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-ink/60">
            Fees are subject to change by the school management. Please confirm the latest amounts with the school office.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/admissions" className="btn-primary">How to apply</Link>
            <Link to="/contact" className="btn-ghost">Ask the fee office</Link>
          </div>
        </div>
      </section>
    </>
  );
}
