import { useState } from 'react';
import Seo from '../components/Seo';
import CampusMap from '../components/CampusMap';
import { SITE } from '../data/config';

const CLASSES = ['Nursery', 'LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', cls: '', campus: SITE.campuses[0].name, message: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // No backend needed: opens the parent's email app with the message ready to send.
  const submit = (e) => {
    e.preventDefault();
    const body = [
      `Parent name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Class: ${form.cls}`,
      `Campus: ${form.campus}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Admission enquiry – ' + form.cls)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Seo
        title="Contact"
        description={`Contact ${SITE.fullName}: phone numbers, email, addresses and maps for our Dhar Road and Airport Road campuses in Indore.`}
        path="/contact"
      />

      <section className="border-b border-brand/10 bg-white">
        <div className="container-x py-12 sm:py-16">
          <p className="eyebrow">We’d love to hear from you</p>
          <h1 className="text-4xl font-bold sm:text-5xl">Contact us</h1>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold">Reach the school office</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li>
                <span className="block text-xs font-bold uppercase tracking-wider text-ink/60">Phone</span>
                {SITE.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block text-lg font-bold text-brand hover:underline">{p.label}</a>
                ))}
              </li>
              <li>
                <span className="block text-xs font-bold uppercase tracking-wider text-ink/60">Email</span>
                <a href={`mailto:${SITE.email}`} className="break-all text-lg font-bold text-brand hover:underline">{SITE.email}</a>
              </li>
              {SITE.campuses.map((c) => (
                <li key={c.id}>
                  <span className="block text-xs font-bold uppercase tracking-wider text-ink/60">{c.name}</span>
                  {c.address}
                </li>
              ))}
            </ul>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-accent mt-8">Chat on WhatsApp</a>
          </div>

          <form onSubmit={submit} className="rounded-md border border-brand/15 bg-white p-5 sm:p-7 lg:col-span-7">
            <h2 className="text-2xl font-bold">Admission enquiry</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-bold text-brand">Parent name</label>
                <input id="name" required className="field" value={form.name} onChange={set('name')} autoComplete="name" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-bold text-brand">Phone</label>
                <input id="phone" required type="tel" inputMode="tel" className="field" value={form.phone} onChange={set('phone')} autoComplete="tel" />
              </div>
              <div>
                <label htmlFor="cls" className="mb-1 block text-sm font-bold text-brand">Class applying for</label>
                <select id="cls" required className="field" value={form.cls} onChange={set('cls')}>
                  <option value="">Select class…</option>
                  {CLASSES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="campus" className="mb-1 block text-sm font-bold text-brand">Preferred campus</label>
                <select id="campus" className="field" value={form.campus} onChange={set('campus')}>
                  {SITE.campuses.map((c) => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1 block text-sm font-bold text-brand">Message (optional)</label>
                <textarea id="message" rows="4" className="field" value={form.message} onChange={set('message')} />
              </div>
            </div>
            <button type="submit" className="btn-primary mt-5">Send enquiry</button>
            <p className="mt-3 text-xs text-ink/60">This opens your email app with your details filled in.</p>
          </form>
        </div>
      </section>

      <section className="section bg-white pt-0 sm:pt-0">
        <div className="container-x pt-14 sm:pt-20">
          <h2 className="text-3xl font-bold">Find our campuses</h2>
          <div className="mt-6"><CampusMap /></div>
        </div>
      </section>
    </>
  );
}
