import { Link } from 'react-router-dom';
import { SITE } from '../data/config';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-dark text-white/85">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="mb-4 inline-flex rounded-md bg-cream p-2">
            <Logo className="h-12 w-auto" />
          </div>
          <p className="max-w-xs text-sm leading-relaxed">{SITE.tagline}</p>
          <p className="mt-4 text-xs text-white/60">{SITE.board} · {SITE.classes} · Est. {SITE.established}</p>
          <div className="mt-5 flex gap-3 text-sm font-bold">
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4 hover:text-accent">Facebook</a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4 hover:text-accent">Instagram</a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-accent">Explore</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li><Link to="/admissions" className="hover:text-accent">Admissions</Link></li>
            <li><Link to="/fees" className="hover:text-accent">Fee Structure</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/#faculty" className="hover:text-accent">Faculty</Link></li>
            <li><Link to="/#alumni" className="hover:text-accent">Alumni</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-accent">Campuses</h2>
          <ul className="space-y-4 text-sm">
            {SITE.campuses.map((c) => (
              <li key={c.id}>
                <strong className="block text-white">{c.name}</strong>
                {c.address}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-accent">Get in touch</h2>
          <ul className="space-y-2 text-sm">
            {SITE.phones.map((p) => (
              <li key={p.href}><a href={p.href} className="hover:text-accent">{p.label}</a></li>
            ))}
            <li><a href={`mailto:${SITE.email}`} className="break-all hover:text-accent">{SITE.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.fullName}. All rights reserved.</p>
          <p>
            Website made by <strong className="text-white">{SITE.credit.name}</strong>
            {' · '}
            <a href={`tel:+91${SITE.credit.phone}`} className="hover:text-accent">{SITE.credit.phone}</a>
            {' · '}
            <a href={`mailto:${SITE.credit.email}`} className="hover:text-accent">{SITE.credit.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
