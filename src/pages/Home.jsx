import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import ImageSlot from '../components/ImageSlot';
import { SITE } from '../data/config';
import { useSheet } from '../hooks/useSheet';
import { FALLBACK_ALUMNI, FALLBACK_FACULTY } from '../data/fallback';

const FACILITIES = [
  { title: 'Swimming pool', file: 'pool.jpg', text: 'A safe, supervised pool where children learn water confidence and fitness.' },
  { title: 'Sports arena', file: 'sports.jpg', text: 'Open grounds and coached sessions that build stamina, teamwork and sportsmanship.' },
  { title: 'Mess & dining', file: 'mess.jpg', text: 'Hygienic kitchen and a dining hall serving fresh, balanced meals.' },
  { title: 'School transport', file: 'bus.jpg', text: 'Bus routes across Indore so the journey to school is simple for parents.' },
  { title: 'Medical room', file: 'medical.jpg', text: 'First-aid and basic medical care on campus during school hours.' },
  { title: 'Music & dance', file: 'music.jpg', text: 'Stage practice, music and dance programmes that give every child a voice.' },
];

const REASONS = [
  ['Child-centric teaching', 'We teach to each child’s pace and strengths, with personal attention in every class.'],
  ['Strong CBSE foundation', 'Concept-based learning that builds clarity and problem-solving from the early years.'],
  ['More than marks', 'Communication skills, hobby clubs, sports and values sit alongside academics.'],
  ['Parents as partners', 'Regular communication so you always know how your child is doing.'],
];

export default function Home() {
  const faculty = useSheet(SITE.sheetTabs.faculty, FALLBACK_FACULTY);
  const alumni = useSheet(SITE.sheetTabs.alumni, FALLBACK_ALUMNI);

  return (
    <>
      <Seo
        description={`${SITE.fullName} is a ${SITE.board} school for ${SITE.classes} with two campuses in Indore, a swimming pool, sports arena, mess and transport. Admissions open for ${SITE.admissionSession}.`}
        path="/"
      />

      {/* Hero */}
      <section className="border-b border-brand/10">
        <div className="container-x grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">{SITE.board} school · Indore</p>
            <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Where every child’s spark finds room to grow.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/80 sm:text-lg">
              {SITE.fullName} teaches {SITE.classes.toLowerCase()} across two campuses, with a swimming pool,
              sports arena, mess and caring teachers who know every child by name.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admissions" className="btn-primary">Admissions {SITE.admissionSession}</Link>
              <Link to="/fees" className="btn-ghost">See fee structure</Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative">
              <ImageSlot file="hero.jpg" label="Main hero photo – school building or students" ratio="aspect-[5/4]" alt="Kids College campus" />
              <div className="absolute -bottom-5 left-4 hidden w-40 sm:block">
                <ImageSlot file="hero-small.jpg" label="Small photo – classroom" ratio="aspect-square" className="border-4 border-cream" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <section aria-label="School at a glance" className="bg-brand text-white">
        <dl className="container-x grid grid-cols-2 gap-6 py-8 text-center md:grid-cols-4">
          {[
            ['Since', SITE.established],
            ['Board', SITE.board],
            ['Classes', 'Nursery–12'],
            ['Campuses', '2 in Indore'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{k}</dt>
              <dd className="mt-1 font-display text-2xl font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Why Kids College</p>
            <h2 className="text-3xl font-bold sm:text-4xl">A school that sees the child, not just the report card.</h2>
            <p className="mt-4 leading-relaxed text-ink/80">
              Run by {SITE.trust}, we believe education is the foundation of all human excellence, and that a
              school should shape confident, thoughtful people.
            </p>
            <div className="mt-6">
              <ImageSlot file="about.jpg" label="Students in class / assembly" ratio="aspect-[4/3]" />
            </div>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {REASONS.map(([t, d], i) => (
              <li key={t} className="border-t-2 border-brand pt-4">
                <span className="font-display text-sm font-bold text-accent">0{i + 1}</span>
                <h3 className="mt-1 text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="section bg-white">
        <div className="container-x">
          <p className="eyebrow">Campus life</p>
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Facilities built around childhood</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map((f) => (
              <article key={f.title}>
                <ImageSlot file={f.file} label={f.title} ratio="aspect-[3/2]" />
                <h3 className="mt-4 text-xl font-bold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty (Google Sheet: Faculty) */}
      <section id="faculty" className="section">
        <div className="container-x">
          <p className="eyebrow">Our teachers</p>
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">The people who guide your child</h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {faculty.data.map((p, i) => (
              <li key={`${p.name}-${i}`}>
                <ImageSlot file={p.photo || undefined} label="Faculty photo" ratio="aspect-[4/5]" alt={p.name} />
                <h3 className="mt-3 font-sans text-base font-bold text-brand">{p.name}</h3>
                <p className="text-sm font-bold text-leaf">{p.role}</p>
                {p.qualification && <p className="text-sm text-ink/70">{p.qualification}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alumni (Google Sheet: Alumni) */}
      <section id="alumni" className="section bg-brand text-white">
        <div className="container-x">
          <p className="eyebrow !border-accent !text-accent">Alumni</p>
          <h2 className="max-w-xl text-3xl font-bold !text-white sm:text-4xl">Where Kids College takes you</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {alumni.data.map((a, i) => (
              <li key={`${a.name}-${i}`} className="rounded-md bg-white/10 p-4">
                <ImageSlot file={a.photo || undefined} label="Alumni photo" ratio="aspect-square" alt={a.name} className="!border-white/40 !bg-white/5" />
                <h3 className="mt-4 font-sans text-lg font-bold !text-white">{a.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-accent">{a.batch}</p>
                {a.now && <p className="mt-1 text-sm text-white/85">{a.now}</p>}
                {a.quote && <p className="mt-3 border-l-2 border-accent pl-3 text-sm italic text-white/80">{a.quote}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Campuses */}
      <section id="campuses" className="section">
        <div className="container-x">
          <p className="eyebrow">Find us</p>
          <h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Two campuses, one family</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SITE.campuses.map((c) => (
              <article key={c.id} className="rounded-md border border-brand/15 bg-white p-5">
                <ImageSlot file={`campus-${c.id}.jpg`} label={`${c.name} building`} ratio="aspect-[16/9]" />
                <h3 className="mt-4 text-2xl font-bold">{c.name}</h3>
                <p className="text-sm font-bold text-leaf">{c.level}</p>
                <p className="mt-2 text-sm text-ink/75">{c.address}</p>
                <a href={c.mapLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-bold text-brand underline underline-offset-4">
                  Open in Google Maps
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="pb-16 sm:pb-24" aria-label="Photo gallery">
        <div className="container-x">
          <p className="eyebrow">Moments</p>
          <h2 className="text-3xl font-bold sm:text-4xl">A day at Kids College</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <ImageSlot key={n} file={`gallery-${n}.jpg`} label={`Gallery photo ${n}`} ratio="aspect-square" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="container-x flex flex-col items-start justify-between gap-5 py-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold !text-brand-dark sm:text-3xl">Admissions open for {SITE.admissionSession}</h2>
            <p className="mt-1 text-brand-dark/80">Visit a campus, meet our teachers and see where your child will learn.</p>
          </div>
          <Link to="/contact" className="btn-primary shrink-0">Book a campus visit</Link>
        </div>
      </section>
    </>
  );
}
